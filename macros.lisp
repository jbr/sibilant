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

(defmacro > (lhs rhs)
  (concat "(" (translate lhs) " > " (translate rhs) ")"))

(defmacro < (lhs rhs)
  (concat "(" (translate lhs) " < " (translate rhs) ")"))

(defmacro = (lhs rhs)
  (concat "(" (translate lhs) " === " (translate rhs) ")"))

(defmacro != (lhs rhs)
  (concat "(" (translate lhs) " !== " (translate rhs) ")"))

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

