(defmacro join (glue arr)
  (concat "(" (translate arr) ").join(" (translate glue) ")"))

(defmacro parens (stmt) (concat "(" (translate stmt) ")"))
(defmacro brackets (stmt) (concat "["  (translate stmt) "]"))

(defmacro +   (&rest args)
  (concat "(" (join " + " (map args translate)) ")"))
(defmacro -   (&rest args)
  (concat "(" (join " - " (map args translate)) ")"))
(defmacro *   (&rest args)
  (concat "(" (join " * " (map args translate)) ")"))
(defmacro /   (&rest args)
  (concat "(" (join " / " (map args translate)) ")"))
(defmacro or  (&rest args)
  (concat "(" (join " || " (map args translate)) ")"))
(defmacro and (&rest args)
  (concat "(" (join " && " (map args translate)) ")"))
(defmacro >   (&rest args)
  (concat "(" (join " > " (map args translate)) ")"))
(defmacro <   (&rest args)
  (concat "(" (join " < " (map args translate)) ")"))
(defmacro <=  (&rest args)
  (concat "(" (join " <= " (map args translate)) ")"))
(defmacro >=  (&rest args)
  (concat "(" (join " >= " (map args translate)) ")"))
(defmacro =   (&rest args)
  (concat "(" (join " === " (map args translate)) ")"))
(defmacro !=  (&rest args)
  (concat "(" (join " !== " (map args translate)) ")"))


(defmacro get (arr i) (concat "(" (translate arr) ")[" (translate i) "]"))
(defmacro set (arr i val)
  (concat "(" (translate arr) ")[" (translate i) "] = " (translate val)))

(defmacro send (object method &rest args)
  (concat (translate object) "." (translate method)
	  "(" (join ", " (map args translate)) ")"))

(defmacro apply (fn arglist)
  (macros.send fn 'apply 'undefined arglist))

(defmacro zero? (item)
  ((get macros "=") (translate item) 0))

(defmacro first (arr) (macros.get arr 0))
(defmacro second (arr) (macros.get arr 1))
(defmacro third (arr) (macros.get arr 2))
(defmacro fourth (arr) (macros.get arr 3))
(defmacro fifth (arr) (macros.get arr 4))
(defmacro sixth (arr) (macros.get arr 5))
(defmacro seventh (arr) (macros.get arr 6))
(defmacro eighth (arr) (macros.get arr 7))
(defmacro ninth (arr) (macros.get arr 8))

(defmacro rest (arr)
  (macros.send arr 'slice 1))

(defmacro if (arg truebody falsebody)
  (concat
   "(function() {"
   (indent (concat
	    "if (" (translate arg) ") {"
	    (indent (macros.progn truebody))
	    "} else {"
	    (indent (macros.progn falsebody))
	    "};"))
   "})()"))

(defmacro when (arg &rest body)
  (concat
   "(function() {"
   (indent (concat
	    "if (" (translate arg) ") {"
	    (indent (apply macros.progn body))
	    "};"))
   "})()"))



(defmacro not (exp)
  (concat "(!" (translate exp) ")"))

(defmacro slice (arr start &optional end)
  (macros.send (translate arr) "slice" start end))

(defmacro inspect (&rest args)
  (join " + \"\\n\" + "
   (map args
	(lambda (arg)
	  (concat "\"" arg ":\" + " (translate arg))))))

(defmacro dolist (list iterator)
  (macros.send list 'for-each iterator))

(defmacro defvar (name value)
  (concat "var " (translate name) " = " (translate value) ";\n"))

(defmacro setf (name value)
  (concat (translate name) " = " (translate value) ";\n"))

(defmacro list (&rest args)
  (concat "[ " (join ", " (map args translate)) " ]"))

(defmacro macro-list ()
  (concat "["
	  (indent (join ",\n"
			(map (-object.keys macros)
			     macros.quote)))
	  "]"))

(defmacro macroexpand (name)
  (let ((macro (get macros name)))
    (if macro (send macro to-string) "undefined")))

(defmacro throw (&rest string)
  (concat "throw new Error (" (join " " (map string translate)) ")"))

(defmacro bool (expr)
  (concat "(!!(" (translate expr) "))"))

(defmacro chain (object &rest calls)
  (concat (translate object) " // chain"
	  (apply indent
		(map calls
		     (lambda (call)
		       (defvar method (first call))
		       (defvar args (rest call))
		       (concat "." (translate method)
			       "(" (join ", " (map args translate)) ")"))))))
