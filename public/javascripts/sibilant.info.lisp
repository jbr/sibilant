(defmacro trim (item)
  (macros.send item 'replace "/^\\s*|\\s*$/g" "\"\""))

(defmacro contains? (item arr)
  ((get macros "!=") -1 (macros.send (translate arr) 'index-of item)))


($ (thunk
    (defvar $window ($ window))

    (defun check-hash ()
      (when (defined? check-hash.timeout)
	(clear-timeout check-hash.timeout)
	(delete check-hash.timeout))

      
      (when (!= window.location.hash ($window.data 'last-hash))
        (chain $window
          (data 'last-hash window.location.hash)
          (trigger 'hash-change window.location.hash)))

      (setf check-hash.timeout (set-timeout check-hash 500)))
    
    (defvar items ($ "script[language=sibilant/example]"))

    ($window.click (thunk (set-timeout check-hash 25)))

    ($window.bind 'hash-change
                  (lambda (evt hash)
                    (defvar item (send items filter hash))
                    (when (< 0 item.length)
                      (defvar content (chain item
                                             (text)
                                             (replace "<![CDATA[\n", "")
                                             (replace "]]>" "")))
                      (defvar title (send item attr "data-title"))
                      (send ($ "header h2") html title)
                      (defvar next (send item next items.selector))
                      (defvar prev (send item prev items.selector))
                      
                      (if (> next.length 0)
                          (chain ($ "#next")
                                 (attr 'href (concat "#" (send next attr 'id)))
                                 (show))
                        (send ($ "#next") hide))
                      
                      (if (> prev.length 0)
                          (chain ($ "#prev")
                                 (attr 'href (concat "#" (send prev attr 'id)))
                                 (show))
                        (send ($ "#prev") hide))

                      (chain ($ "textarea")
                             (val (trim content))
                             (keyup)))))


    (when (contains? window.location.hash (list "" "#"))
    	(setf window.location.hash
    	      (chain items (first) (attr 'id))))

    (defun calculate-height ()
	(chain ($ "textarea, #output")
	       (each (lambda (&rest args)
		       (defvar block ($ this)
                               value (+ (send block val)
					(send block text))
                               lines (length
				      (or (list)
					  (send value match /[^\s]\n/g))))
		       (block.height (* (+ 1 lines) 20))))))

    (defvar textarea ($ 'textarea))

    (defun determine-tab-stop (value)
      (defvar lines       (send value split "\n")
              open-parens (list))
      (each (line) lines
	  (each (char offset) (line.split "")
                (switch char
                        ("(" (open-parens.push offset))
                        (")" (open-parens.pop)))))
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
			(defvar prev-value (chain textarea (val))
                          tab "  "
                          cursor-position (send textarea attr 'selection-start))

			(when (<= prev-value.length cursor-position)
			  (defvar tab
			    (repeat (determine-tab-stop prev-value) " "))
			  (when (= 13 evt.key-code)
			    (setf tab (concat "\n" tab)))
			  (send textarea val (concat prev-value tab)))
			false)))
	   (keyup (lambda (evt)
                    (defvar output ($ "#output"))
		    (try (chain output
				(text (sibilant.translate-all (textarea.val)))
				(remove-class 'error))
			 (chain output
				(text e.stack)
				(add-class 'error))))))
    (check-hash)))


