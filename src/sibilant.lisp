(defvar sibilant exports
        sys      (require 'util)
        import   (require "sibilant/import")
        error    (lambda (str) (throw str))
        inspect  sys.inspect)

(import (require "sibilant/functional"))

(include (concat **dirname "/../src/core.lisp"))

(defun include (file)
  (defvar fs (require 'fs)
    data (fs.read-file-sync file 'utf8))
  (translate-all data))

(set sibilant 'include include)

(defun macros.include (file)
  (sibilant.include (eval (translate file))))

(defun sibilant.package-info ()
  (defvar fs (require 'fs)
    json (meta "JSON"))
  (json.parse (fs.read-file-sync (concat **dirname "/../package.json"))))

(defun sibilant.version-string ()
  (defvar package (sibilant.package-info)
    path (require 'path))
  (concat package.name " version " package.version
		       "\n(at " (path.join **dirname "..") ")"))

(defun sibilant.version ()
  (get (sibilant.package-info) 'version))

(sibilant.include (concat **dirname "/macros.lisp"))
