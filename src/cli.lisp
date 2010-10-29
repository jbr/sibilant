(defvar sibilant (require 'sibilant)
  path (require 'path)
  options (require "sibilant/options")
  fs (require 'fs)
  script (get (process.binding 'evals) "Script")
  context (script.create-context))

(defhash cli
  h         'help
  unhandled 'help
  i         'input
  o         'output
  x         'execute
  execute   false
  unlabeled 'input)

(defun cli.repl (&rest args)
  (require "sibilant/repl"))

(defvar cli-options (options cli))

(defvar output-dir
  (when cli-options.output (first cli-options.output)))

(defun sibilant.translate-file (file-name)
  (sibilant.translate-all (fs.read-file-sync file-name "utf8")))

(defun create-context ()
  (setf context.initialized? true)
  (set module 'filename (concat (process.cwd) "/exec"))
  (set context 'module module)
  (set context 'require require)
  (each-key key global
	    (set context key (get global key))))

(defun run-in-sandbox (js input-path)
  (when (not context.initialized?) (create-context))
  (set context '**dirname (path.dirname input-path))
  (set module 'filename input-path)
  (script.run-in-context js context 'sibilant))

(each (input-file) (or cli-options.input (list))
      (defvar input-path (path.join (process.cwd) input-file)
	translated (sibilant.translate-file input-path))

      (if output-dir
	  (progn
	    (defvar
	      input-basename (path.basename input-path ".lisp")
	      output-path (concat (path.join output-dir input-basename) ".js"))
	    (fs.write-file output-path translated))
	(if cli-options.execute
	    (run-in-sandbox translated input-path)
	  (console.log translated))))
