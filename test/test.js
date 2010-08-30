
var sibilant = require("../lib/sibilant");
var assert = require("assert");
var sys = require("sys");
var trim = (function(string) {
  // string:required
  return string.trim();
});

var tr = (function(sibilantCode, jsCode) {
  // sibilant-code:required js-code:required
  var expected = trim(jsCode);;
  var actual = trim(sibilant.translateAll(sibilantCode));;
  return sys.print((function() {
    if ((expected === actual)) {
      return ".";
    } else {
      return ("F\n\nexpected: " + expected + "\n\nbut got: " + actual + "\n\n");
    };
  })());
});

tr("5", "5");

tr("-10.2", "-10.2");

tr("hello", "hello");

tr("hi-world", "hiWorld");

tr("*hello*", "_hello_");

tr("hello?", "helloQ");

tr("-math", "Math");

tr("\"string\"", "\"string\"");

// regex literals
tr("/regex/", "/regex/");

// quoting
tr("'hello", "\"hello\"");

tr("(quote hello)", "\"hello\"");

tr("'(hello world)", "[ \"hello\", \"world\" ]");

tr("(quote (a b c))", "[ \"a\", \"b\", \"c\" ]");

// lists
tr("(list)", "[  ]");

tr("(list a b)", "[ a, b ]");

// hashes
tr("(hash)", "{  }");

tr("(hash a b)", "{ a: b }");

tr("(hash a b c d)", "{\n  a: b,\n  c: d\n}");

// when
tr("(when a b)", "(function() {\n  if (a) {\n    return b;\n  };\n})()");

tr("(when a b c d)", "(function() {\n  if (a) {\n    b;\n    c;\n    return d;\n  };\n})()");

// if
tr("(if a b c)", "(function() {\n  if (a) {\n    return b;\n  } else {\n    return c;\n  };\n})()");

// progn
tr("(progn a b c d e)", "a;\nb;\nc;\nd;\nreturn e;");

// join
tr("(join \" \" (list a b c))", "([ a, b, c ]).join(\" \")");

// meta
tr("(meta (+ 5 2))", "7");

// comment
tr("(comment hello)", "// hello");

tr("(comment (lambda () hello))", ("// (function() {\n" + "//   if (arguments.length > 0)\n" + "//     throw new Error(\"argument count mismatch: " + "expected no arguments\");\n" + "//   \n" + "//   return hello;\n" + "// })"));

// new
tr("(new (prototype a b c))", "(new prototype(a, b, c))");

tr("(thunk a b c)", "(function() {\n  if (arguments.length > 0)\n    throw new Error(\"argument count mismatch: expected no arguments\");\n  \n  a;\n  b;\n  return c;\n})");

tr("(keys some-object)", "Object.keys(someObject)");

tr("(delete (get foo 'bar))", "delete (foo)[\"bar\"]");


