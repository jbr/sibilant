(defmacro join (glue arr)
  (concat "(" (translate arr) ").join(" (translate glue) ")"))

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

(defmacro mod (&rest args)
  (concat "(" (join " % " (map args translate)) ")"))

(defmacro incr-by (item increment)
  (concat (translate item) " += " (translate increment)))

(defmacro incr (item)
  (concat "((" (translate item) ")++)"))

(defmacro get (arr i) (concat "(" (translate arr) ")[" (translate i) "]"))
(defmacro set (arr i val)
  (concat "(" (translate arr) ")[" (translate i) "] = " (translate val) ";"))

(defmacro send (object method &rest args)
  (concat (translate object) "." (translate method)
	  "(" (join ", " (map args translate)) ")"))

(defmacro apply (fn arglist)
  (macros.send fn 'apply 'undefined arglist))

(defmacro zero? (item)
  ((get macros "=") (translate item) 0))

(defmacro empty? (arr)
  (concat "((" (translate arr) ").length === 0)"))

(defmacro odd? (number)
  ((get macros "!=") 0
   (macros.mod (translate number) 2)))

(defmacro even? (number)
  ((get macros "=") 0
   (macros.mod (translate number) 2)))


(defmacro undefined? (thing)
  (concat "typeof(" (translate thing) ") === \"undefined\""))

(defmacro defined? (thing)
  (concat "typeof(" (translate thing) ") !== \"undefined\""))


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

(defmacro length (arr)
  (macros.get arr "\"length\""))

(defmacro last (arr)
  (macros.get (macros.send arr 'slice -1) 0))

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


(defmacro defvar (name &optional value)
  (if (defined? value)
      (concat "var " (translate name) " = " (translate value) ";")
    (concat "var " (translate name) ";")))

(defmacro string? (thing)
  (concat "typeof(" (translate thing) ") === \"string\""))

(defmacro array? (thing)
  (defvar translated (concat "(" (translate thing) ")"))
  (concat translated " && "
	  translated ".constructor.name === \"Array\""))


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

(defmacro setf (name value)
  (concat (translate name) " = " (translate value)))

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

(defmacro force-semi () (concat ";\n"))

(defmacro chain (object &rest calls)
  (concat (translate object) " // chain"
	  (apply indent
		(map calls
		     (lambda (call)
		       (defvar method (first call))
		       (defvar args (rest call))
		       (concat "." (translate method)
			       "(" (join ", " (map args translate)) ")"))))))

(defmacro try (tryblock catchblock)
  (concat
   "(function() {"
   (indent (concat
	    "try {"
	    (indent (macros.progn tryblock))
	    "} catch (e) {"
	    (indent (macros.progn catchblock))
	    "}"))
   "})()"))


(defmacro while (condition &rest block)
  (concat "(function() {"
	  (indent
	   "var __returnValue__;"
	   (concat "while (" (translate condition) ") {"
		   (indent (join "\n"
				 (map block (lambda (stmt)
					      (concat "__returnValue__ = "
						      (translate stmt)
						      ";")))))
		   "}")
	   "return __returnValue__;")
	  "})()"))

(defmacro until (condition &rest block)
  (defvar condition (list 'not condition))
  (send block unshift condition)
  (apply (get macros 'while) block))