var transpile = (function transpile$(node, preprocessor) {
  /* transpile /Users/jbr/code/sibilant/src/transpiler.sibilant:1:0 */

  (function() {
    if (typeof(node) === "string") {
      return node = {
        type: "js",
        token: node,
        contents: [],
        modifiers: []
      };
    } else if ((typeof node === 'number')) {
      return node = {
        type: "number",
        token: node.toString(),
        contents: [],
        modifiers: []
      };
    }
  })();
  ;
  ;
  ;
  ;
  ;
  ;
  return (function() {
    if (((node) && typeof (node) === "object" && (node).constructor.name === "Array")) {
      return node;
    } else if ((typeof node !== 'undefined')) {
      var transpiler = ((transpile)[node.type] || transpile.default);
      (node.modifiers || []).forEach((function(modifier) {
        /* /Users/jbr/code/sibilant/src/transpiler.sibilant:20:12 */

        var readerMacro = (readerMacros)[modifier.type],
            previousTranspiler = transpiler;
        (function() {
          if ((typeof readerMacro === 'undefined')) {
            return console.log("NO READER MACRO", modifier.type);
          }
        })();
        return transpiler = (function(node) {
          /* /Users/jbr/code/sibilant/src/transpiler.sibilant:24:18 */

          return readerMacro(node, previousTranspiler);
        });
      }));
      (node)["transpiled"] = transpiler(node, preprocessor);
      ;
      ;
      ;
      ;
      ;
      ;
      ;
      ;
      return node.transpiled;
    }
  })();
});
(sibilant)["transpile"] = transpile;
var readerMacros = {  };
readerMacros.hat = (function readerMacros$hat$(node, transpiler) {
  /* reader-macros.hat /Users/jbr/code/sibilant/src/transpiler.sibilant:42:1 */

  return ("macros." + transpiler(node));
});
readerMacros.tick = (function readerMacros$tick$(node, transpiler) {
  /* reader-macros.tick /Users/jbr/code/sibilant/src/transpiler.sibilant:43:1 */

  return (function() {
    if (("literal" === node.type)) {
      return ("\"" + transpiler(node) + "\"");
    }
  })();
});
readerMacros.dots = (function readerMacros$dots$(node, transpiler) {
  /* reader-macros.dots /Users/jbr/code/sibilant/src/transpiler.sibilant:45:1 */

  return transpiler(node);
});
transpile.default = (function transpile$default$(node) {
  /* transpile.default */

  return node.token;
});
transpile.number = (function transpile$number$(node) {
  /* transpile.number /Users/jbr/code/sibilant/src/transpiler.sibilant:51:1 */

  return parseFloat(node.token.replace((new RegExp(",", "g")), "")).toString();
});
transpile.root = (function transpile$root$(node) {
  /* transpile.root /Users/jbr/code/sibilant/src/transpiler.sibilant:54:1 */

  return (function() {
    if ((1 === node.contents.length)) {
      return transpile((node.contents)[0]);
    } else {
      return interleave("\n", map(compact(map(node.contents, transpile)), asStatement));
    }
  })();
});
transpile.expression = (function transpile$expression$(node, preprocessor) {
  /* transpile.expression /Users/jbr/code/sibilant/src/transpiler.sibilant:59:1 */

  return (function() {
    if (node.contents.length) {
      var head = (node.contents)[0],
          args = node.contents.slice(1),
          macro = (macros)[transpile(head)];
      (function() {
        if (((typeof macro !== 'undefined') && (macro !== null))) {

          return (head)["hint"] = "macro";
        }
      })();
      (function() {
        if ((head && ("string" === head.type))) {
          macro = macros.concat;
          return args = node.contents;
        }
      })();
      (function() {
        if ((typeof macro === 'undefined')) {
          macro = macros.call;
          return args = node.contents;
        }
      })();
      return macro.apply(node, args);
    } else {
      return "null";
    }
  })();
});
transpile.bracket = (function transpile$bracket$(node) {
  /* transpile.bracket /Users/jbr/code/sibilant/src/transpiler.sibilant:79:1 */

  return macros.list.apply(undefined, node.contents);
});
transpile.brace = (function transpile$brace$(node) {
  /* transpile.brace /Users/jbr/code/sibilant/src/transpiler.sibilant:81:1 */

  return macros.hash.apply(undefined, node.contents);
});
transpile.literal = (function transpile$literal$(node) {
  /* transpile.literal /Users/jbr/code/sibilant/src/transpiler.sibilant:83:1 */

  var string = node.token;
  return inject(string.replace((new RegExp("\\*", "g")), "_")
    .replace((new RegExp("\\?$", undefined)), "__QUERY")
    .replace((new RegExp("!$", undefined)), "__BANG")
  , string.match((new RegExp("-(.)", "g"))), (function(returnString, match) {
    /* /Users/jbr/code/sibilant/src/transpiler.sibilant:85:6 */

    return returnString.replace(match, (match)[1].toUpperCase());
  }));
});
transpile.string = (function transpile$string$(node) {
  /* transpile.string /Users/jbr/code/sibilant/src/transpiler.sibilant:94:1 */

  return node.token.split("\n")
    .join("\\n\" +\n\"");
});
transpile.comment = (function transpile$comment$(node) {
  /* transpile.comment */

  return null;
});