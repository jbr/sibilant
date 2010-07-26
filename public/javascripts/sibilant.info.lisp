(defmacro trim (item)
  (macros.send item 'replace "/^\\s*|\\s*$/g" "\"\""))

(defmacro contains? (item arr)
  ((get macros "!=") -1 (macros.send (translate arr) 'index-of item)))


(when (undefined? console)
  (setf console (hash log (lambda (&rest ignored) true))))

(j-query (lambda (jq)
    (defun check-hash (&rest ignored)
      (when (defined? check-hash.timeout)
	(clear-timeout check-hash.timeout)
	(delete check-hash.timeout))
      
      (when (!= window.location.hash (send (jq window) data 'last-hash))
	  (chain (jq window)
	    (data 'last-hash window.location.hash)
	    (trigger 'hash-change window.location.hash)))
	(setf check-hash.timeout (set-timeout check-hash 500)))
    
    (defvar items (jq "script[language=sibilant/example]"))

    (send (jq window) click
	  (lambda (evt)
	    (set-timeout check-hash 25)))

    (send (jq window) bind 'hash-change
	  (lambda (evt hash)
	    (defvar item (send items filter hash))
	    (when (< 0 item.length)
	      (defvar content (chain item
				     (text)
				     (replace "<![CDATA[\n", "")
				     (replace "]]>" "")))
	      (defvar title (send item attr "data-title"))
	      (send (jq "header h2") html title)

	      (defvar next (send item next items.selector))
	      (defvar prev (send item prev items.selector))

	      (if (> next.length 0)
		  (chain (jq "#next")
			 (attr 'href (concat "#" (send next attr 'id)))
			 (show))
		(send (jq "#next") hide))

	      (if (> prev.length 0)
		  (chain (jq "#prev")
			 (attr 'href (concat "#" (send prev attr 'id)))
			 (show))
		(send (jq "#prev") hide))

	      (chain (jq "textarea")
		     (val (trim content))
		     (keyup)))))


    (when (contains? window.location.hash (list "" "#"))
    	(setf window.location.hash
    	      (chain items (first) (attr 'id))))

    (defun calculate-height ()
	(chain (jq "textarea, #output")
	       (each (lambda (&rest args)
		       (defvar block (jq this))
		       (defvar value (+ (send block val)
					(send block text)))
		       (defvar lines (length
				      (or (list)
					  (send value match /[^\s]\n/g))))
		       (send block height
			     (* (+ 1 lines) 20))))))

    (defvar textarea (jq 'textarea))

    (defun determine-tab-stop (value)
      (defvar lines (send value split "\n"))
      (defvar open-parens (list))
      (dolist lines
	(lambda (line)
	  (dolist (send line split "")
	    (lambda (char offset)
	      (when (= "(" char) (send open-parens push offset))
	      (when (= ")" char) (send open-parens pop))))))
      (+ 2 (last open-parens)))

    (defun repeat (times string)
      (defvar return-buffer "")
      (while (< 0 times)
	(incr-by return-buffer string)
	(setf times (- times 1)))
      return-buffer)

    (chain textarea
	   (focus)
	   (keydown (lambda (evt)
		      (when (contains? evt.key-code (list 13 9))
			(defvar prev-value (chain textarea (val)))
			(defvar tab "  ")
			(defvar cursor-position
			  (send textarea attr 'selection-start))
			(when (<= prev-value.length cursor-position)
			  (defvar tab
			    (repeat (determine-tab-stop prev-value) " "))
			  (when (= 13 evt.key-code)
			    (setf tab (concat "\n" tab)))
			  (send textarea val (concat prev-value tab)))
			false)))
	   (keyup (lambda (evt)
		    (try (send (jq "#output") text
			       (sibilant.translate-all (send textarea val)))
			 (send (jq "#output") text e.stack)))))
    (check-hash)))


