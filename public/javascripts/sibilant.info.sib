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


    (switch window.location.hash
            (("" "#")
             (setf window.location.hash
                   (chain items (first) (attr 'id)))))

    (defvar textarea ($ 'textarea))

    (chain textarea
	   (focus)
	   (keyup (lambda (evt)
                    (defvar output ($ "#output"))
		    (try (chain output
				(text (sibilant.translate-all (textarea.val)))
				(remove-class 'error))
			 (chain output
				(text e.stack)
				(add-class 'error))))))
    (check-hash)))


