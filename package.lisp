(hash 'name 'sibilant
      'version "0.0.9"
      'keywords '(lisp javascript language)
      'description "javascript with a lisp"
      'contributors (hash 'name "Jacob Rothstein"
      			  'web  "http://jacobrothstein.com")
      'repositories (hash 'type 'git
      			  'url  "http://github.com/jbr/sibilant")
      'bugs (hash 'web "http://github.com/jbr/sibilant/issues")
      'bin (hash 'sibilant "./bin/sibilant")
      'modules (hash 'repl       "./lib/repl"
		     'functional "./lib/functional"
		     'options    "./lib/options"
		     'cli        "./lib/cli"
		     'import     "./lib/import")
      'main "./lib/sibilant")

