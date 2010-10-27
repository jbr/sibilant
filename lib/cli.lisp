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

(defun cli.help ()
  (console.log "help text here")
  (process.exit))

(defun cli.input (&rest files)
  (files.for-each (lambda (file)
		    (defvar file-path
		      (path.join (process.cwd) file))
		    (sibilant.include file-path))))

(defun cli.repl (&rest args)
  (require "sibilant/repl"))

(options cli)
