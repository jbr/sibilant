(defvar sys (require 'sys))
(defvar sibilant exports)
(defvar import (require "sibilant/import"))
(import (require "sibilant/functional"))

(defvar error (lambda (str) (throw str)))
(defvar inspect sys.inspect)
(defvar emit sys.puts)
(defvar load
  (lambda (file, callback)
    (send (require 'fs)
	  read-file (concat **dirname "/" file) "utf8"
	  (lambda (err data)
	    (if err (error data)
	      (callback data))))))


;;; below this line is not node specific
(defvar tokenize
  (setf sibilant.tokenize
	(lambda (string)
	  (defvar tokens (list))
	  (defvar parse-stack (list tokens))
	  (defvar specials (list))

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
	    (defvar special (first token))
	    (defvar token token)
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
		 (match /(\/(\\\/|[^\/\n])+\/[glim]*)|(;.*)|("([^"]|(\\"))*?[^\\]")|[&']?[*.a-z-]+\??|[><=!\+\/\*-]+|-?[0-9.]+|(\'?\()|\)/g)
                 (for-each handle-token))

	  (when (> parse-stack.length 1)
	    (error "unexpected EOF, probably missing a )\n"
		   (call inspect (first parse-stack))))
	  tokens)))

(force-semi)

(defun indent (&rest args)
  (join (chain (compact args)
	       (join "\n")
	       (replace /^/ "\n")
	       (replace /\n/g "\n  ")) "\n"))

(defun construct-hash (array-of-arrays)
  (inject (hash) array-of-arrays
	  (lambda (object item)
	    (set object (first item) (get object (second item)))
	    object)))

