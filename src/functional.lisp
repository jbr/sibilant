(defvar functional exports)

(defun bulk-map (arr fn)
  (defvar index 0)
  (defvar group-size fn.length)
  (defvar ret-arr (list))
  (while (< index arr.length)
    (send ret-arr push
	  (apply fn (send arr slice
			  index (+ index group-size))))
    (incr-by index group-size))
  ret-arr)

(defun inject (start items fn)
  (defvar value start)
  (when (array? items)
      (each (item index) items
	    (setf value (fn value item index))))
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
  (defvar return-item undefined
    index 0
    items items)

  (until (or (= items.length index) return-item)
    (when (fn (get items index) index)
      (setf return-item (get items index)))
    (incr index)))

(defun reject (items fn)
  (defvar args (list items fn))
  (select items (lambda () (not (apply fn args)))))

(defun compact (arr)
  (select arr (lambda (item) (bool item))))

(each (export-function)
      '(inject map select detect reject compact bulk-map)
      (set exports export-function
	   (eval export-function)))
		  
     

		      