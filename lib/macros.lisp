(defmacro join (glue arr)
  (concat "(" (translate arr) ").join(" (translate glue) ")"))

(defmacro parens (stmt) (concat "(" (translate stmt) ")"))
(defmacro brackets (stmt) (concat "[" (translate stmt) "]"))

(defmacro +   (&rest args) (parens (join " + " args)))
(defmacro -   (&rest args) (parens (join " - " args)))
(defmacro *   (&rest args) (parens (join " * " args)))
(defmacro /   (&rest args)
  (parens (join " / " args)))
(defmacro or  (&rest args) (parens (join " || " args)))
(defmacro and (&rest args) (parens (join " && " args)))
(defmacro >   (&rest args) (parens (join " > " args)))
(defmacro <   (&rest args) (parens (join " < " args)))
(defmacro <=  (&rest args) (parens (join " <= " args)))
(defmacro >=  (&rest args) (parens (join " >= " args)))
(defmacro =   (&rest args) (parens (join " === " args)))
(defmacro !=  (&rest args) (parens (join " !== " args)))


(defmacro get (arr i) (concat (parens arr) (brackets i)))
(defmacro set (arr i val)
  (concat (parens arr) (brackets i) " = " (translate val)))

(defmacro send (object method &rest args)
  (concat (translate object) "." (translate method)
	  "(" (join ", " (map args translate)) ")"))

(defmacro apply (fn arglist)
  (macros.send fn 'apply 'undefined arglist))


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
  (macros.send list for-each iterator))

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
