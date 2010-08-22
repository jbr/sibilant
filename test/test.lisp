(defvar sibilant (require 'sibilant))
(defvar assert   (require 'assert))
(defvar sys      (require 'sys))

(defun trim (string)
  (send string trim))

(defun tr (sibilant-code js-code)
  (defvar expected (trim js-code))
  (defvar actual   (trim (sibilant.translate-all sibilant-code)))
  (sys.print (if (= expected actual) "."
	       (concat "F\n\nexpected: " expected
		       "\n\nbut got: " actual "\n\n"))))

(tr "5"        "5")
(tr "-10.2"    "-10.2")
(tr "hello"    "hello")
(tr "hi-world" "hiWorld")
(tr "*hello*"  "_hello_")
(tr "hello?"   "helloQ")
(tr "-math"    "Math")
(tr "\"string\"" "\"string\"")

; regex literals
(tr "/regex/"   "/regex/")

; quoting

(tr "'hello"        "\"hello\"")
(tr "(quote hello)" "\"hello\"")

(tr "'(hello world)"
    "[ \"hello\", \"world\" ]")
(tr "(quote (a b c))"
    "[ \"a\", \"b\", \"c\" ]")

; lists
(tr "(list)" "[  ]")

(tr "(list a b)"
    "[ a, b ]")

; hashes
(tr "(hash)" "{  }")
(tr "(hash a b)"
    "{ a: b }")
(tr "(hash a b c d)"
    "{\n  a: b,\n  c: d\n}")


; when
(tr "(when a b)"
"(function() {
  if (a) {
    return b;
  };
})()")

(tr "(when a b c d)"
"(function() {
  if (a) {
    b;
    c;
    return d;
  };
})()")


; if

(tr "(if a b c)"
"(function() {
  if (a) {
    return b;
  } else {
    return c;
  };
})()")

; progn

(tr "(progn a b c d e)"
    "a;\nb;\nc;\nd;\nreturn e;")


; join

(tr "(join \" \" (list a b c))"
    "([ a, b, c ]).join(\" \")")

