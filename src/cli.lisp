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

(console.log cli-options)

(defvar output-dir
  (if cli-options.output (first cli-options.output) (process.cwd)))

(defun sibilant.translate-file (file-name)
  (sibilant.translate-all (fs.read-file-sync file-name "utf8")))

(each (input-file) (or cli-options.input (list))
      (defvar input-path (path.join (process.cwd) input-file)
	input-basename (path.basename input-path ".lisp")
	output-path (concat (path.join output-dir input-basename) ".js"))
      (fs.write-file output-path (sibilant.translate-file input-path)))
