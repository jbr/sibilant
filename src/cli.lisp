(defvar sibilant (require 'sibilant)
  path (require 'path)
  options (require "sibilant/options")
  fs (require 'fs)
  script (get (process.binding 'evals) "Script")
  context (script.create-context))

(defun create-context ()
  (setf context.initialized? true)
  (set module 'filename (concat (process.cwd) "/exec"))
  (set context 'module module)
  (set context 'require require)
  (each-key key global
	    (set context key (get global key))))

(defun run-in-sandbox (js &optional input-path)
  (when (not context.initialized?) (create-context))
  (when (defined? input-path)
    (set context '**dirname (path.dirname input-path))
    (set module 'filename input-path))
  (script.run-in-context js context 'sibilant))

(defhash cli
  v         'version
  h         'help
  unhandled 'help
  i         'input
  o         'output
  x         'execute
  e         'eval
  execute   false
  unlabeled 'input)

(defun cli.version (&rest args)
  (console.log (sibilant.version-string)))

(defun cli.repl (&rest args) (require "sibilant/repl"))

(defun cli.eval (&rest args)
  (if (empty? args)
      (progn
	(defvar stdin (process.open-stdin)
	  data "")

	(stdin.set-encoding "utf8")
	(stdin.on 'data (lambda (chunk) (setf data (concat data chunk))))
	(stdin.on 'end (lambda (&rest args)
			 (run-in-sandbox (sibilant.translate-all data)))))
    (each (arg) args
	  (run-in-sandbox (sibilant.translate-all arg)))))


(defun cli.help (&rest args)
  (console.log
"Hi there!  Thanks for installing sibilant.
Please leave feedback on github issues (http://github.com/jbr/sibilant/issues)

The current commandline options are:
--------------------------------------------------------------------------------

-v / --version         Print out a version string and exit

-h / --help            This message

--repl / [no args]     Sibilant interactive command prompt

--eval [optional STRING] / -e [optional STRING]
                       Evaluate STRING if provided, otherwise evaluate STDIN.

--execute / -x         This is a flag. Execute input files in order supplied.

--output DIR / -o DIR  Output input files to this dir, replacing .lisp with .js.

--input FILE / -i FILE / FILE
                       Add this file to the input files. If the execute flag is
                       set, input files will be executed.  If an output dir is
                       specified, each file will be written to that dir.
                       Otherwise, each file will be written to STDOUT.

--------------------------------------------------------------------------------

Examples

to compile sibilant
$ git clone git://github.com/jbr/sibilant.git
$ npm link .
$ sibilant src/*.lisp -o lib
$ sibilant -x test/test.lisp # you're now running a sibilant you just compiled.

to compile one file to stdout
$ sibilant test/test.lisp

to compile a file to a directory
$ sibilant test/test.lisp -o . # put test.js here
or
$ sibilant --input test/test.lisp --output .

to run a file
$ sibilant -x test/test.lisp

to enter the repl
$ sibilant
or
$ sibilant --repl

"))

(defvar cli-options (options cli))

(when (empty? (keys cli-options))
  (cli.repl))

(defvar output-dir
  (when cli-options.output (first cli-options.output)))

(defun strip-shebang (data)
  (data.replace /^#!.*\n/ ""))

(defun sibilant.translate-file (file-name)
  (sibilant.translate-all (strip-shebang (fs.read-file-sync file-name "utf8"))))

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
