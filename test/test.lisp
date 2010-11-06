#!/usr/bin/env sibilant -x

(defvar sibilant (require "../lib/sibilant")
        assert   (require 'assert)
        sys      (require 'util))

(console.log (concat "Testing " (sibilant.version-string)))

(defun trim (string)
  (send string trim))

(defun assert-equal (expected actual &optional message)
  (sys.print (if (= expected actual) "."
	       (concat "F\n\n" (if message (concat message "\n\n") "") "expected "expected 
		        "\n\nbut got " actual "\n\n"))))

(defun assert-translation (sibilant-code js-code)
  (assert-equal (trim js-code)
		(trim (sibilant.translate-all sibilant-code))))

(defun assert-true (&rest args)
  (args.unshift true)
  (apply assert-equal args))

(defun assert-false (&rest args)
  (args.unshift false)
  (apply assert-equal args))


(assert-translation "5"        "5")
(assert-translation "$"        "$")
(assert-translation "-10.2"    "-10.2")
(assert-translation "hello"    "hello")
(assert-translation "hi-world" "hiWorld")
(assert-translation "1two"     "1\ntwo")
(assert-translation "t1"       "t1")
(assert-translation "'t1"      "\"t1\"")
(assert-translation "*hello*"  "_hello_")
(assert-translation "hello?"   "helloQ")
(assert-translation "-math"    "Math")
(assert-translation "\"string\"" "\"string\"")

; regex literals
(assert-translation "/regex/"   "/regex/")

; quoting

(assert-translation "'hello"        "\"hello\"")
(assert-translation "(quote hello)" "\"hello\"")

(assert-translation "'(hello world)"
    "[ \"hello\", \"world\" ]")
(assert-translation "(quote (a b c))"
    "[ \"a\", \"b\", \"c\" ]")

; lists
(assert-translation "(list)" "[  ]")

(assert-translation "(list a b)"
    "[ a, b ]")

; hashes
(assert-translation "(hash)" "{  }")
(assert-translation "(hash a b)"
    "{ a: b }")
(assert-translation "(hash a b c d)"
    "{\n  a: b,\n  c: d\n}")


; when
(assert-translation "(when a b)"
"(function() {
  if (a) {
    return b;
  };
})()")

(assert-translation "(when a b c d)"
"(function() {
  if (a) {
    b;
    c;
    return d;
  };
})()")


; if

(assert-translation "(if a b c)"
"(function() {
  if (a) {
    return b;
  } else {
    return c;
  };
})()")

; progn

(assert-translation "(progn a b c d e)"
    "a;\nb;\nc;\nd;\nreturn e;")


; join

(assert-translation "(join \" \" (list a b c))"
    "([ a, b, c ]).join(\" \")")

; meta

(assert-translation "(meta (+ 5 2))" "7")

; comment

(assert-translation "(comment hello)" "// hello")

(assert-translation "(comment (lambda () hello))"
    (concat "// (function() {\n"
	    "//   if (arguments.length > 0)\n"
	    "//     throw new Error(\"argument count mismatch: "
	                             "expected no arguments\");\n"
	    "//   \n"
	    "//   return hello;\n"
	    "// })"))

; new

(assert-translation "(new (prototype a b c))" "(new prototype(a, b, c))")

(assert-translation "(thunk a b c)" "(function() {
  if (arguments.length > 0)
    throw new Error(\"argument count mismatch: expected no arguments\");
  
  a;
  b;
  return c;
})")

(assert-translation "(keys some-object)" "Object.keys(someObject)")

(assert-translation "(delete (get foo 'bar))" "delete (foo)[\"bar\"]")

(assert-translation "(defvar a b c d)" "var a = b,\n    c = d;")

(assert-translation "(function? x)" "(typeof x === 'function')")

(assert-translation "(defun foo.bar (a) (* a 2))" "foo.bar = (function(a) {
  // a:required
  return (a * 2);
});")

(assert-translation "(each-key key hash a b c)"
"(function() {
  for (var key in hash) (function() {
    if (arguments.length > 0)
      throw new Error(\"argument count mismatch: expected no arguments\");
    
    a;
    b;
    return c;
  })();
})();")

(assert-translation "(lambda (&optional first-arg second-arg) true)" "(function(firstArg, secondArg) {
  // firstArg:optional secondArg:required
  if (arguments.length < 2) // if firstArg is missing
    var secondArg = firstArg, firstArg = undefined;
  
  return true;
})")


(assert-translation "(scoped a b c)"
"(function() {
  if (arguments.length > 0)
    throw new Error(\"argument count mismatch: expected no arguments\");
  
  a;
  b;
  return c;
})()")

(assert-translation "(arguments)" "(Array.prototype.slice.apply(arguments))")

(assert-translation "(set hash k1 v1 k2 v2)" "(hash)[k1] = v1;\n(hash)[k2] = v2;")

(assert-translation "(defhash hash a b c d)"
"var hash = {
  a: b,
  c: d
};")

(assert-translation "(each (x) arr a b c)"
"arr.forEach((function(x) {
  // x:required
  a;
  b;
  return c;
}))")


(assert-translation "(switch a (10 4) ('a (foo) (bar)) (default 1))"
"(function() {
  switch(a) {
  
  case 10:
    return 4;
  
  case \"a\":
    foo();
    return bar();
  
  default:
    return 1;
  
  }
})()")

(assert-equal 2 (switch 'a ('a 1 2)))
(assert-equal 'default (switch 27 ('foo 1) (default 'default)))