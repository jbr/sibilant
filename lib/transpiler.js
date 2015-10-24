var transpile = (function transpile$(node, preprocessor) {
  /* transpile .../sibilant/src/transpiler.sibilant:1:0 */

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
    } else if (((node) && typeof (node) === "object" && (node).constructor.name === "Array")) {
      var contents = node;
      return node = {
        token: "(",
        type: "expression",
        contents: contents,
        modifiers: []
      };
    }
  })();
  return (function() {
    if ((typeof node !== 'undefined')) {
      var transpiler = ((transpile)[node.type] || transpile.default);
      (node.modifiers || []).forEach((function(modifier) {
        /* .../sibilant/src/transpiler.sibilant:16:12 */

        var readerMacro = (readerMacros)[modifier.type],
            previousTranspiler = transpiler;
        (function() {
          if ((typeof readerMacro === 'undefined')) {
            return console.log("NO READER MACRO", modifier.type);
          }
        })();
        return transpiler = (function(node) {
          /* .../sibilant/src/transpiler.sibilant:19:18 */

          return readerMacro(node, previousTranspiler);
        });
      }));

      return (node)["transpiled"] = transpiler(node, preprocessor);
    }
  })();
});
(sibilant)["transpile"] = transpile;
var readerMacros = {  };
readerMacros.hat = (function readerMacros$hat$(node, transpiler) {
  /* reader-macros.hat .../sibilant/src/transpiler.sibilant:27:1 */

  return ("macros." + transpiler(node));
});
readerMacros.tick = (function readerMacros$tick$(node, transpiler) {
  /* reader-macros.tick .../sibilant/src/transpiler.sibilant:28:1 */

  return (function() {
    if (("literal" === node.type)) {
      return ("\"" + transpiler(node) + "\"");
    }
  })();
});
readerMacros.dots = (function readerMacros$dots$(node, transpiler) {
  /* reader-macros.dots .../sibilant/src/transpiler.sibilant:30:1 */

  return transpiler(node);
});
transpile.default = (function transpile$default$(node) {
  /* transpile.default */

  return node.token;
});
transpile.number = (function transpile$number$(node) {
  /* transpile.number .../sibilant/src/transpiler.sibilant:36:1 */

  return parseFloat(node.token.replace((new RegExp(",", "g")), ""));
});
transpile.root = (function transpile$root$(node) {
  /* transpile.root .../sibilant/src/transpiler.sibilant:39:1 */

  return (function() {
    if ((1 === node.contents.length)) {
      return transpile((node.contents)[0]);
    } else {
      return (map(compact(map(node.contents, transpile)), asStatement)).join("\n");
    }
  })();
});
transpile.expression = (function transpile$expression$(node, preprocessor) {
  /* transpile.expression .../sibilant/src/transpiler.sibilant:44:1 */

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
  /* transpile.bracket .../sibilant/src/transpiler.sibilant:63:1 */

  return macros.list.apply(undefined, node.contents);
});
transpile.brace = (function transpile$brace$(node) {
  /* transpile.brace .../sibilant/src/transpiler.sibilant:64:1 */

  return macros.hash.apply(undefined, node.contents);
});
transpile.literal = (function transpile$literal$(node) {
  /* transpile.literal .../sibilant/src/transpiler.sibilant:66:1 */

  var string = node.token;
  return inject(string.replace((new RegExp("\\*", "g")), "_")
    .replace((new RegExp("\\?$", undefined)), "__QUERY")
    .replace((new RegExp("!$", undefined)), "__BANG")
  , string.match((new RegExp("-(.)", "g"))), (function(returnString, match) {
    /* .../sibilant/src/transpiler.sibilant:68:6 */

    return returnString.replace(match, (match)[1].toUpperCase());
  }));
});
transpile.string = (function transpile$string$(node) {
  /* transpile.string .../sibilant/src/transpiler.sibilant:77:1 */

  return node.token.split("\n")
    .join("\\n\" +\n\"");
});
transpile.comment = (function transpile$comment$(node) {
  /* transpile.comment */

  return undefined;
});