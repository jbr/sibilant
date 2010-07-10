(defmacro get (arr i)
  (concat "(" (translate arr) ")[" (translate i) "]"))

(defmacro set (arr i val)
  (concat "(" (translate arr) ")[" (translate i) "] = " (translate val)))

(defmacro if (arg truebody falsebody)
  (concat
   "(function(){"
   (indent (concat
	    "if (" (translate arg) ") {"
	    (indent (translate truebody))
	    "} else {"
	    (indent (translate falsebody))
	    "};"))
   "})()"))

(defmacro when (arg body)
  (concat
   "if (" (translate arg) ") {"
   (indent (translate body))
   "};"))

(defmacro infix (lhs operator rhs)
  (concat "(" (translate lhs) " " operator " " (translate rhs) ")"))

(defmacro >  (lhs rhs) (macros.infix lhs ">" rhs))
(defmacro <  (lhs rhs) (macros.infix lhs "<" rhs))
(defmacro <= (lhs rhs) (macros.infix lhs "<=" rhs))
(defmacro >= (lhs rhs) (macros.infix lhs ">=" rhs))
(defmacro =  (lhs rhs) (macros.infix lhs "===" rhs))
(defmacro != (lhs rhs) (macros.infix lhs "!==" rhs))

(defmacro not (exp)
  (concat "(!" (translate exp) ")"))

(defmacro join (glue arr)
  (concat "(" (translate arr) ").join(" (translate glue) ")"))

(defmacro send (object method &rest args)
  (concat (translate object) "." (translate method)
	  "(" (join ", " (map args translate)) ")"))

(defmacro index (arr i)
  (concat "(" (translate arr) ")[" i "]"))

(defmacro slice (arr start &optional end)
  (macros.send (translate arr) "slice" start end))

(defmacro inspect (&rest args)
  (join " + \"\\n\" +\n  "
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

(defmacro apply (fn arglist)
  (macros.send fn 'apply 'undefined arglist))

(defmacro macro-list ()
  (concat "["
	  (indent (join ",\n"
			(map (-object.keys macros)
			     macros.quote)))
	  "]"))

(defmacro macroexpand (name)
  (let ((macro (get macros name)))
    (if macro (send macro to-string) "undefined")))
