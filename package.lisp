;;
;; Please do not directly update package.json. Make
;; Make changes to package.lisp, and then export
;; your changes by running
;;   sibilant package.lisp > package.json
;; These two files should always be kept in sync.
;;

(hash 'name 'sibilant
      'version "0.0.2"
      'keywords '(lisp javascript language)
      'description "javascript with a lisp"
      'contributors (hash 'name "Jacob Rothstein"
      			  'web "http://jacobrothstein.com")
      'repositories (hash 'type 'git
      			  'url "http://github.com/jbr/sibilant.js")
      'bugs (hash 'web "http://github.com/jbr/sibilant.js/issues")
      'bin (hash 'sibilant "./bin/sibilant")
      'directories (hash 'lib "./lib")
      'main "./lib/sibilant")

