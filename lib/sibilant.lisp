(defvar sibilant exports
        sys      (require 'sys)
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
		 (match /(\/(\\\/|[^\/\n])+\/[glim]*)|(;.*)|("(([^"]|(\\"))*[^\\])?")|(-?[0-9.]+)|[&']?[*.a-z-]+\??|([><=!\+\/\*-]+)|(\'?\()|\)/g)
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

(set macros 'let
     (lambda (assignments &rest body)
       (set body (- body.length 1)
	    (list 'return (get body (- body.length 1))))
       (defvar content
	 (indent
	  (concat "var "
		  (join ",\n "
			(map assignments
			     (lambda (kv)
			       (concat
				(first kv)
				" = "
				(translate (second kv))))))
		  ";")
	  (join "\n"
		(map body
		     (lambda (arg)
		       (concat (translate arg) ";"))))))
       (concat "(function() {" content "})();\n")))
					    

			
(set macros 'statement
     (lambda (&rest args)
       (concat (apply macros.call args) ";\n")))



(set macros 'progn
     (lambda (&rest body)
       (set body (- body.length 1)
	    (list 'return (get body (- body.length 1))))
       (join "\n"
	     (map body (lambda (arg)
			 (concat (translate arg) ";"))))))

(set macros 'call
     (lambda (fn-name &rest args)
       (concat (translate fn-name)
	       "(" (join ", " (map args translate)) ")")))

(set macros 'defun
     (lambda (fn-name &rest args-and-body)
       (concat "var " (translate fn-name) " = "
	       (apply macros.lambda args-and-body)
	       ";\n")))

(set macros 'defmacro
     (lambda (name &rest args-and-body)
       (defvar js (apply macros.lambda args-and-body))
       (try (set macros name (eval js))
	    (error (concat "error in parsing macro "
		   name ":\n" (indent js))))
       undefined))

(set macros 'concat
     (lambda (&rest args)
       (concat "(" (join " + " (map args translate)) ")")))

(defun transform-args (arglist)
  (defvar last undefined
          args (list))
  (dolist arglist
    (lambda (arg)
      (if (= (first arg) "&") (setf last (send arg slice 1))
	(progn
	  (send args push (list (or last 'required) arg))
	  (setf last null)))))

  (when last
    (error (concat "unexpected argument modifier: " last)))

  args)


(set macros 'reverse
     (lambda (arr)
       (defvar reversed (list))
       (dolist arr (lambda (item) (send reversed unshift item)))
       reversed))
(defvar reverse macros.reverse)


(defun build-args-string (args rest)
  (defvar args-string ""
          optional-count 0)

  (dolist args
    (lambda (arg option-index)
      (when (= (first arg) 'optional)
	(setf
	 args-string
	 (concat
	  args-string
	  "if (arguments.length < "
	  (- args.length optional-count) ")"
	  " // if " (second arg) " is missing"
	  (indent
	   (concat "var "
		   (chain
		    (map
		     (send args slice (+ option-index 1))
		     (lambda (arg arg-index)
		       (concat (second arg) " = "
			       (second
				(get args
				     (+ option-index
					arg-index))))))
		    (reverse)
		    (concat (concat (second arg) " = undefined"))
		    (join ", "))
		   ";"))))
	(incr optional-count))))

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
			 (send (call reverse arg) join ":")))))))

;; brain 'splode
(set macros 'lambda
     (lambda (arglist &rest body)

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
	       "})")))
			     

(set macros 'quote
     (lambda (item)
       (if (= "Array" item.constructor.name)
	   (concat "[ " (join ", " (map item macros.quote)) " ]")
	 (if (= 'number (typeof item)) item
	   (concat "\"" (literal item) "\"")))))

(set macros 'hash
     (lambda (&rest pairs)
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
	 (concat "{" (indent (join ",\n" pair-strings)) "}"))))


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
  (dolist (tokenize contents)
    (lambda (token)
      (defvar line (translate token "statement"))
      (when line (setf buffer (concat buffer line "\n")))))
  buffer)

(set sibilant 'translate-all translate-all)


(defun include (file)
  (load file (lambda (contents)
	       (emit (translate-all contents)))))

(set sibilant 'include include)

(set macros 'include
     (lambda (file)
       (call include (eval (translate file)))))

(call include (concat **dirname "/macros.lisp"))
