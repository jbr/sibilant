(defvar stream (process.open-stdin)
  script (get (process.binding 'evals) "Script")
  readline (send (require 'readline) create-interface stream)
  sibilant (require (concat **dirname "/sibilant"))
  eval-in-context script.run-in-context
  context undefined
  cmd-buffer ""
  sys (require 'util)
  display-prompt-on-drain false)

(defun create-context ()
  (defvar context (script.create-context))
  (setf context.initialized? true)
  (set module 'filename (concat (process.cwd) "/exec"))
  (set context 'module module)
  (set context 'require require)
  (each-key key global (set context key (get global key)))
  context)

(setf context (create-context))

(stream.on 'data (lambda (data) (readline.write data)))

(defun display-prompt ()
  (readline.set-prompt
   (concat (if (> cmd-buffer.length 10)
	       (concat "..." (cmd-buffer.slice -10))
	     (if (> cmd-buffer.length 0) cmd-buffer "sibilant"))
	   "> "))
  (readline.prompt))

(readline.on 'line
     (lambda (cmd)
       (defvar js-line ""
	 flushed true)

       (try
	(progn
	  (setf cmd-buffer (concat cmd-buffer cmd))
	  (each (stmt) (sibilant.tokenize cmd-buffer)
		(setf js-line (concat js-line
				      (sibilant.translate stmt 'statement))))
	  (defvar result (eval-in-context js-line context "sibilant-repl"))
	  (set readline.history 0 cmd-buffer)
	  (when (defined? result)
	    (setf flushed
		  (stream.write (concat "result: "
					(sys.inspect result) "\n"))))
	  (set context "_" result)
	  (setf cmd-buffer ""))
	(progn
	  (if (e.message.match "unexpected EOF")
	      (progn (setf cmd-buffer (concat cmd-buffer " "))
		     (readline.history.shift))
	    (progn (set readline.history 0 cmd-buffer)
		   (setf flushed (stream.write e.message)
			 cmd-buffer "")))))
       
       (if flushed (display-prompt)
	 (setf display-prompt-on-drain true))))

(readline.on 'close stream.destroy)

(stream.on 'drain
    (lambda ()
      (when display-prompt-on-drain
	(display-prompt)
	(setf display-prompt-on-drain false))))

(display-prompt)

	 