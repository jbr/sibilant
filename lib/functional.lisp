(defvar functional exports)

(defun inject (start items fn)
  (defvar value start)
  (when (array? items)
      (dolist items
	(lambda (item index)
	  (setf value (fn value item index)))))
  value)

(defun map (items fn)
  (inject (list) items
	  (lambda (collector item index)
	    (send collector push (fn item index))
	    collector)))

(defun select (items fn)
  (inject (list) items
	  (lambda (collector item index)
	    (when (fn item index)
	      (send collector push item))
	    collector)))

(defun detect (items fn)
  (defvar return-item)
  (defvar index 0)
  (defvar items items)
  (until (or (= items.length index) return-item)
    (when (fn (get items index) index)
      (setf return-item (get items index)))
    (incr index)))

(defun reject (items fn)
  (defvar args (list items fn))
  (select items (lambda () (not (apply fn args)))))

(defun compact (arr)
  (select arr (lambda (item) (bool item))))

(dolist '(inject map select detect reject compact)
  (lambda (export-function)
    (set exports export-function
	 (eval export-function))))
		  
     

		      