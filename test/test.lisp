#!/usr/bin/env sibilant -x

(defvar sibilant (require "../lib/sibilant")
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
	    "//   return hello;\n"
	    "// })"))

; new

(assert-translation "(new (prototype a b c))" "(new prototype(a, b, c))")

(assert-translation "(thunk a b c)" "(function() {
  a;
  b;
  return c;
})")

(assert-translation "(keys some-object)" "Object.keys(someObject)")

(assert-translation "(delete (get foo 'bar))" "delete (foo)[\"bar\"]")

(assert-translation "(defvar a b c d)" "var a = b,\n    c = d;")

(assert-translation "(function? x)" "typeof(x) === 'function'")

(assert-translation "(number? x)" "typeof(x) === 'number'")

(assert-translation "(defun foo.bar (a) (* a 2))" "foo.bar = (function(a) {
  // a:required
  return (a * 2);
});")

(assert-translation "(each-key key hash a b c)"
"(function() {
  for (var key in hash) (function() {
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
  a;
  b;
  return c;
})()")

(assert-translation "(arguments)" "(Array.prototype.slice.apply(arguments))")

(assert-translation "(set hash k1 v1 k2 v2)"
"(hash)[k1] = v1;
(hash)[k2] = v2;")

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

(assert-translation "(switch a (q 1))"
"(function() {
  switch(a) {
  case q:
    return 1;
  }
})()")

(assert-translation "(switch a ('q 2))"
"(function() {
  switch(a) {
  case \"q\":
    return 2;
  }
})()"
)
(assert-translation "(switch a ((a b) t))"
"(function() {
  switch(a) {
  case a:
  case b:
    return t;
  }
})()")

(assert-translation "(switch a ((r 's) l))"
"(function() {
  switch(a) {
  case r:
  case \"s\":
    return l;
  }
})()")

(assert-translation "(switch 1 ((1 2) 'one))"
"(function() {
  switch(1) {
  case 1:
  case 2:
    return \"one\";
  }
})()")

(assert-translation "(switch (+ 5 2) ('(u v) (wibble) (foo bar)))"
"(function() {
  switch((5 + 2)) {
  case \"u\":
  case \"v\":
    wibble();
    return foo(bar);
  }
})()")


(assert-translation "(match? /regexp/ foo)" "foo.match(/regexp/)")

(assert-translation
 "(before-include)
  (include \"test/includeFile1\")
  (after-include-1)
  (include \"test/includeFile2\")
  (after-include-2)"

"beforeInclude();

1

after-include-1();

2

after-include-2();")

(assert-equal 2 (switch 'a ('a 1 2)))
(assert-equal 'default (switch 27 ('foo 1) (default 'default)))
(assert-equal undefined (switch 10 (1 1)))
(assert-equal 'hello (switch (+ 5 2)
			     ((1 7) (concat 'he 'llo))
			     (7 "doesn't match because it's second")
			     (default 10)))

(assert-translation "(thunk (setf b c d e))"
"(function() {
  b = c;
  return d = e;;
})")

(assert-translation "(thunk (set b c d e f))"
"(function() {
  (b)[c] = d;
  return (b)[e] = f;;
})")


(assert-translation
 "(defmacro foo? () 1) (foo?) (delmacro foo?) (foo?)"
 "1\nfooQ();")