(defvar sibilant (require 'sibilant)
  path (require 'path)
  options (require "sibilant/options")
  fs (require 'fs))

(defhash cli
  h         'help
  unhandled 'help
  i         'input
  o         'output
  unlabeled 'input)

(defun cli.repl (&rest args)
  (require "sibilant/repl"))

(defvar cli-options (options cli))

(defvar output-dir
  (when cli-options.output (first cli-options.output)))

(defun sibilant.translate-file (file-name)
  (sibilant.translate-all (fs.read-file-sync file-name "utf8")))

(each (input-file) (or cli-options.input (list))
      (defvar input-path (path.join (process.cwd) input-file)
	translated (sibilant.translate-file input-path))

      (if output-dir
	  (progn
	    (defvar
	      input-basename (path.basename input-path ".lisp")
	      output-path (concat (path.join output-dir input-basename) ".js"))
	    (fs.write-file output-path translated))
	(console.log translated)))
