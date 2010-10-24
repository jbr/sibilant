(defvar sibilant (require 'sibilant)
  path (require 'path)
  options (require "sibilant/options"))

(defvar cli
  (hash h 'help
	unhandled 'help
	i 'input
	f 'file
	file 'input
	o 'output
	unlabeled 'file))

(setf cli.help
      (lambda (args)
	(console.log "help text here")
	(process.exit)))

(setf cli.input
      (lambda (&rest files)
	(files.for-each (lambda (file)
			  (defvar file-path
			    (path.join (process.cwd) file))
			  (sibilant.include file-path)))))

(setf cli.repl
      (lambda (&rest args)
	(require "sibilant/repl")))

(options cli)
