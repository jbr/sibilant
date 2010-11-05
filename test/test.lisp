#!/usr/bin/env sibilant -x

(defvar sibilant (require "../lib/sibilant")
        assert   (require 'assert)
        sys      (require 'util))

(console.log (concat "Testing " (sibilant.version-string)))

(defun trim (string)
  (send string trim))

(defun tr (sibilant-code js-code)
  (defvar expected (trim js-code)
          actual   (trim (sibilant.translate-all sibilant-code)))

  (sys.print (if (= expected actual) "."
	       (concat "F\n\nexpected: " expected
		       "\n\nbut got: " actual "\n\n"))))

(tr "5"        "5")
(tr "$"        "$")
(tr "-10.2"    "-10.2")
(tr "hello"    "hello")
(tr "hi-world" "hiWorld")
(tr "1two"     "1\ntwo")
(tr "t1"       "t1")
(tr "'t1"      "\"t1\"")
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

; meta

(tr "(meta (+ 5 2))" "7")

; comment

(tr "(comment hello)" "// hello")

(tr "(comment (lambda () hello))"
    (concat "// (function() {\n"
	    "//   if (arguments.length > 0)\n"
	    "//     throw new Error(\"argument count mismatch: "
	                             "expected no arguments\");\n"
	    "//   \n"
	    "//   return hello;\n"
	    "// })"))

; new

(tr "(new (prototype a b c))" "(new prototype(a, b, c))")

(tr "(thunk a b c)" "(function() {
  if (arguments.length > 0)
    throw new Error(\"argument count mismatch: expected no arguments\");
  
  a;
  b;
  return c;
})")

(tr "(keys some-object)" "Object.keys(someObject)")

(tr "(delete (get foo 'bar))" "delete (foo)[\"bar\"]")

(tr "(defvar a b c d)" "var a = b,\n    c = d;")

(tr "(function? x)" "(typeof x === 'function')")

(tr "(defun foo.bar (a) (* a 2))" "foo.bar = (function(a) {
  // a:required
  return (a * 2);
});")

(tr "(each-key key hash a b c)"
"(function() {
  for (var key in hash) (function() {
    if (arguments.length > 0)
      throw new Error(\"argument count mismatch: expected no arguments\");
    
    a;
    b;
    return c;
  })();
})();")

(tr "(lambda (&optional first-arg second-arg) true)" "(function(firstArg, secondArg) {
  // firstArg:optional secondArg:required
  if (arguments.length < 2) // if firstArg is missing
    var secondArg = firstArg, firstArg = undefined;
  
  return true;
})")


(tr "(scoped a b c)"
"(function() {
  if (arguments.length > 0)
    throw new Error(\"argument count mismatch: expected no arguments\");
  
  a;
  b;
  return c;
})()")

(tr "(arguments)" "(Array.prototype.slice.apply(arguments))")

(tr "(set hash k1 v1 k2 v2)" "(hash)[k1] = v1;\n(hash)[k2] = v2;")

(tr "(defhash hash a b c d)"
"var hash = {
  a: b,
  c: d
};")

(tr "(each (x) arr a b c)"
"arr.forEach((function(x) {
  // x:required
  a;
  b;
  return c;
}))")
