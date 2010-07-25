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

      (chain (jq 'textarea)
	     (focus)
	     (keyup (lambda (evt)
		      (defvar textarea (jq this))
		      (try (send (jq "#output") text
				 (sibilant.translate-all (send textarea val)))
			   (send (jq "#output") text e.stack)))))
      (check-hash)))
