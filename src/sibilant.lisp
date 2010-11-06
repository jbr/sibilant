(defvar sibilant exports
        sys      (require 'util)
        import   (require "sibilant/import"))

(import (require "sibilant/functional"))

(defvar
  error   (lambda (str) (throw str))
  inspect sys.inspect
  emit    sys.puts
  load    (lambda (file, callback)
            (defvar data (send (require 'fs)
			       read-file-sync file "utf8"))
            (callback data)))


;;; below this line is not node specific
(defvar tokenize
  (setf sibilant.tokenize
	(lambda (string)
	  (defvar tokens (list)
	    parse-stack (list tokens)
	    specials (list))

	  (defun accept-token (token)
	    (send (get parse-stack 0) push token))

	  (defun increase-nesting ()
	    (defvar new-arr (list))
	    (accept-token new-arr)
	    (send parse-stack unshift new-arr))

	  (defun decrease-nesting ()
	    (send specials shift)
	    (send parse-stack shift)
	    (when (zero? parse-stack.length)
	      (throw (concat "unbalanced parens:\n"
			     (call inspect parse-stack)))))

	  (defun handle-token (token)
	    (defvar special (first token)
	      token token)
	    (if (= special "'")
		(progn
		  (setf token (send token slice 1))
		  (increase-nesting)
		  (accept-token 'quote))
	      (setf special false))
	    (send specials unshift (bool special))
	    (if (= token "(") (increase-nesting)
	      (progn
		(if (= token ")") (decrease-nesting)
		  (if (send token match /^-?[0-9.]+$/)
		      (accept-token (parse-float token))
		    (accept-token token)))
		(when (send specials shift)
		  (decrease-nesting)))))

	  (chain string
		 (match /(\/(\\\/|[^\/\n])+\/[glim]*)|(;.*)|("(([^"]|(\\"))*[^\\])?")|(-?[0-9.]+)|[&']?[*.$a-z-][*.a-z0-9-]*\??|([><=!\+\/\*-]+)|(\'?\()|\)/g)
                 (for-each handle-token))
			     
	  (when (> parse-stack.length 1)
	    (error "unexpected EOF, probably missing a )\n"
		   (call inspect (first parse-stack))))
	  tokens)))

(force-semi)

(defun indent (&rest args)
  (concat
   (chain (compact args)
	  (join "\n")
	  (replace /^/ "\n")
	  (replace /\n/g "\n  "))
   "\n"))

(defun construct-hash (array-of-arrays)
  (inject (hash) array-of-arrays
	  (lambda (object item)
	    (set object (first item) (get object (second item)))
	    object)))

(defvar macros (hash))
(set sibilant 'macros macros)

(set macros 'return
     (lambda (token)
       (if (and token
		(= "Array" token.constructor.name)
		(or (= (first token) 'return)
		    (= (first token) 'throw)
		    (= (first token) 'progn)))
	   (translate token)
	 (concat "return " (translate token)))))


(defun macros.statement (&rest args)
  (concat (apply macros.call args) ";\n"))

(defun macros.progn (&rest body)
  (set body (- body.length 1)
       (list 'return (get body (- body.length 1))))
  (join "\n"
	(map body (lambda (arg)
		    (concat (translate arg) ";")))))

(defun macros.call (fn-name &rest args)
  (concat (translate fn-name)
	  "(" (join ", " (map args translate)) ")"))

(defun macros.defun (fn-name &rest args-and-body)
  (defvar fn-name-tr (translate fn-name)
    start (if (/\./ fn-name-tr) "" "var "))
  (concat start fn-name-tr " = "
	  (apply macros.lambda args-and-body)
	  ";\n"))

(defun macros.defmacro (name &rest args-and-body)
  (defvar js (apply macros.lambda args-and-body))
  (try (set macros name (eval js))
       (error (concat "error in parsing macro "
		      name ":\n" (indent js))))
  undefined)

(defun macros.concat (&rest args)
  (concat "(" (join " + " (map args translate)) ")"))

(defun transform-args (arglist)
  (defvar last undefined
          args (list))
  (each (arg) arglist
	(if (= (first arg) "&") (setf last (send arg slice 1))
	  (progn
	    (send args push (list (or last 'required) arg))
	    (setf last null))))

  (when last
    (error (concat "unexpected argument modifier: " last)))

  args)


(defun macros.reverse (arr)
  (defvar reversed (list))
  (each (item) arr (send reversed unshift item))
  reversed)

(defvar reverse macros.reverse)

(defun build-args-string (args rest)
  (defvar args-string ""
          optional-count 0)

  (each (arg option-index) args
      (when (= (first arg) 'optional)
	(setf
	 args-string
	 (concat
	  args-string
	  "if (arguments.length < "
	  (- args.length optional-count) ")"
	  " // if " (translate (second arg)) " is missing"
	  (indent
	   (concat "var "
		   (chain
		    (map
		     (send args slice (+ option-index 1))
		     (lambda (arg arg-index)
		       (concat (translate (second arg)) " = "
			       (translate (second (get args (+ option-index arg-index)))))))
		    (reverse)
		    (concat (concat (translate (second arg)) " = undefined"))
		    (join ", "))
		   ";"))))
	(incr optional-count)))

  (defun argument-count-mismatch (&rest msg)
    (indent (concat
	     "throw new Error(\"argument "
	     "count mismatch: " (join " " msg) "\");")))
  
  (if (defined? rest)
    (progn
      (when (> (- args.length optional-count) 0)
	(setf args-string
	      (concat args-string
		      "if (arguments.length < "
		      (- args.length optional-count)
		      ")" (argument-count-mismatch
			   "expected no fewer than"
			   (- args.length optional-count)
			   "arguments"))))
      (setf args-string
	    (concat args-string
		    "var " (translate (second rest))
		    " = Array.prototype.slice.call(arguments, "
		    args.length ");\n")))

    (if (empty? args)
	(setf args-string
	      (concat args-string
		      "if (arguments.length > 0)"
		      (argument-count-mismatch
		       "expected no arguments")))
      (when (> 0 optional-count)
	  (setf args-string
		(concat args-string
			"if (argument.length < "
			(- args.length optional-count)
			" || arguments.length > "
			args.length
			")" (argument-count-mismatch
			     "expected between"
			     (- args.length optional-count)
			     'and args.length 'arguments))))))
  
  args-string)


(defun build-comment-string (args)
  (if (empty? args) ""
    (concat "// "
	    (join " "
		  (map args
		       (lambda (arg)
			 (concat (translate (second arg)) ":" (first arg))))))))

;; brain 'splode
(defun macros.lambda (arglist &rest body)
  (defvar args (transform-args arglist)
    rest (first (select args
			(lambda (arg)
			  (= 'rest (first arg)))))
    doc-string undefined)

  (set body (- body.length 1)
       (list 'return (get body (- body.length 1))))

  (when (and (= (typeof (first body)) 'string)
	     (send (first body) match /^".*"$/))
    (setf doc-string
	  (concat "/* " (eval (send body shift)) " */\n")))

  (defvar no-rest-args (if rest (send args slice 0 -1) args)
    args-string (build-args-string no-rest-args rest)
    comment-string (build-comment-string args))

  (concat "(function("
	  (join ", " (map args (lambda (arg) (translate (second arg)))))
	  ") {"
	  (indent comment-string doc-string args-string
		  (join "\n"
			(map body
			     (lambda (stmt)
			       (concat (translate stmt) ";")))))
	  "})"))


(defun macros.quote (item)
  (if (= "Array" item.constructor.name)
      (concat "[ " (join ", " (map item macros.quote)) " ]")
    (if (= 'number (typeof item)) item
      (concat "\"" (literal item) "\""))))

(defun macros.hash (&rest pairs)
  (when (odd? pairs.length)
    (error (concat
	    "odd number of key-value pairs in hash: "
	    (call inspect pairs))))
  (defvar pair-strings
    (bulk-map pairs (lambda (key value)
		      (concat (translate key) ": "
			      (translate value)))))
  (if (>= 1 pair-strings.length)
      (concat "{ " (join ", " pair-strings) " }")
    (concat "{" (indent (join ",\n" pair-strings)) "}")))


(defun literal (string)
  (inject (chain string
		 (replace /\*/g "_")
		 (replace /\?$/ "Q"))
	  (send string match /-(.)/g)
	  (lambda (return-string match)
	    (send return-string replace match
		  (send (second match) to-upper-case)))))


(defun translate (token hint)
  (defvar hint hint)
  (when (and hint (undefined? (get macros hint)))
    (setf hint undefined))

  (when (defined? token)
    (try
     (if (= "Array" token.constructor.name)
	 (if (undefined? (get macros (first token)))
	     (apply (get macros (or hint 'call)) token)
	   (apply (get macros (first token)) (send token slice 1)))
       (if (and (string? token) (send token match /^[*\.a-z-]+\??$/))
	   (literal token)
	 (if (and (string? token) (send token match /^;/
					))
	     (send token replace /^;+/ "//"
		   )
	   (if (and (string? token) (= "\"" (first token)))
	       (chain token (split "\n") (join "\\n"))
	     token))))
     (error (concat e.stack "\n"
		    "Encountered when attempting to process:\n"
		    (indent (call inspect token)))))))


(set sibilant 'translate translate)

(defun translate-all (contents)
  (defvar buffer "")
  (each (token) (tokenize contents)
	(defvar line (translate token "statement"))
	(when line (setf buffer (concat buffer line "\n"))))
  buffer)

(set sibilant 'translate-all translate-all)


(defun include (file)
  (defvar fs (require 'fs)
    data (fs.read-file-sync file 'utf8))
  (translate-all data))

(set sibilant 'include include)

(defun macros.include (file)
  (sibilant.include (eval (translate file))))

(defun sibilant.package-info ()
  (defvar fs (require 'fs))
  (-j-s-o-n.parse (fs.read-file-sync (concat **dirname "/../package.json"))))

(defun sibilant.version-string ()
  (defvar package (sibilant.package-info)
    path (require 'path))
  (concat package.name " version " package.version
		       "\n(at " (path.join **dirname "..") ")"))

(defun sibilant.version ()
  (get (sibilant.package-info) 'version))

(sibilant.include (concat **dirname "/macros.lisp"))
