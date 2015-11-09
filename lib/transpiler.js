var node__QUERY = (function node__QUERY$(thing, type) {
  /* node? /Users/jbr/code/sibilant/src/transpiler.sibilant:8:0 */

  return (((typeof thing !== 'undefined') && (thing !== null)) && ("object" === typeof thing) && typeof(thing.type) === "string" && ((typeof type === 'undefined') || (thing.type === type)) && thing.hasOwnProperty("contents"));
});
var emptyNode__QUERY = (function emptyNode__QUERY$(item) {
  /* empty-node? /Users/jbr/code/sibilant/src/transpiler.sibilant:16:0 */

  return (function() {
    if (node__QUERY(item)) {
      return emptyNode__QUERY(item.contents);
    } else if (((item) && typeof (item) === "object" && (item).constructor.name === "Array")) {
      return all__QUERY(item, emptyNode__QUERY);
    } else if (typeof(item) === "string") {
      return item.match((new RegExp("^\\s*$", undefined)));
    } else {
      return ((null === item) || (typeof item === 'undefined') || (false === item));
    }
  })();
});
var compactNode = (function compactNode$(item) {
  /* compact-node /Users/jbr/code/sibilant/src/transpiler.sibilant:24:0 */

  return (function() {
    if (node__QUERY(item)) {
      (item)["contents"] = compactNode(item.contents);
      return (function() {
        if ((item.contents && item.contents.length)) {
          return item;
        } else {
          return null;
        }
      })();
    } else if (((item) && typeof (item) === "object" && (item).constructor.name === "Array")) {
      var compacted = compact(map(item, compactNode));
      return (function() {
        if ((compacted && compacted.length)) {
          return compacted;
        } else {
          return null;
        }
      })();
    } else {
      return (function() {
        if (((item === "") || (item === false))) {
          return null;
        } else {
          return item;
        }
      })();
    }
  })();
});
var recurseTranspile = (function recurseTranspile$(node) {
  /* recurse-transpile /Users/jbr/code/sibilant/src/transpiler.sibilant:33:0 */

  return (function() {
    if (((node) && typeof (node) === "object" && (node).constructor.name === "Array")) {
      return map(node, recurseTranspile);
    } else if ((node__QUERY(node) && ("output" !== node.type))) {
      return transpile(node);
    } else if ((node__QUERY(node) && ("output" === node.type))) {
      (node)["contents"] = recurseTranspile(node.contents);
      return node;
    } else {
      return node;
    }
  })();
});
var transpile = (function transpile$(node, preprocessor) {
  /* transpile /Users/jbr/code/sibilant/src/transpiler.sibilant:41:0 */

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
  return (function() {
    if (((node) && typeof (node) === "object" && (node).constructor.name === "Array")) {
      return node;
    } else if (((typeof node !== 'undefined') && (node !== null))) {
      var transpiler = ((transpile)[node.type] || transpile.default);
      (node.modifiers || []).forEach((function(modifier) {
        /* /Users/jbr/code/sibilant/src/transpiler.sibilant:52:25 */
      
        var readerMacro = (readerMacros)[modifier.type],
            previousTranspiler = transpiler;
        (function() {
          if ((typeof readerMacro === 'undefined')) {
            return console.log("NO READER MACRO", modifier.type);
          }
        })();
        return transpiler = (function(node) {
          /* /Users/jbr/code/sibilant/src/transpiler.sibilant:56:50 */
        
          return readerMacro(node, previousTranspiler);
        });
      }));
      var result = transpiler(node, preprocessor);
      var resultNode = recurseTranspile((function() {
        if (node__QUERY(result)) {
          return result;
        } else {
          return {
            contents: result,
            type: "output"
          };
        }
      })());
      (resultNode)["contents"] = compact(flatten(resultNode.contents));
      (resultNode)["source"] = node;
      (function() {
        if (sibilant.debug) {
          return console.log(prettify(node), red("->"), prettify(resultNode));
        }
      })();
      (node)["transpiled"] = resultNode;
      return (function() {
        if (emptyNode__QUERY(resultNode)) {
          return undefined;
        } else {
          return resultNode;
        }
      })();
    }
  })();
});
(sibilant)["transpile"] = transpile;
var readerMacros = {  };
readerMacros.hat = (function readerMacros$hat$(node, transpiler) {
  /* reader-macros.hat /Users/jbr/code/sibilant/src/transpiler.sibilant:80:0 */

  return ("macros." + transpiler(node));
});
readerMacros.tick = (function readerMacros$tick$(node, transpiler) {
  /* reader-macros.tick /Users/jbr/code/sibilant/src/transpiler.sibilant:81:0 */

  return macros.quote(transpiler(node));
});
readerMacros.at = (function readerMacros$at$(node, transpiler) {
  /* reader-macros.at /Users/jbr/code/sibilant/src/transpiler.sibilant:83:0 */

  return macros.unquote(transpiler(node));
});
readerMacros.dots = (function readerMacros$dots$(node, transpiler) {
  /* reader-macros.dots /Users/jbr/code/sibilant/src/transpiler.sibilant:85:0 */

  return transpiler(node);
});
transpile.default = (function transpile$default$(node) {
  /* transpile.default /Users/jbr/code/sibilant/src/transpiler.sibilant:88:0 */

  return node.token;
});
transpile.output = (function transpile$output$(node) {
  /* transpile.output /Users/jbr/code/sibilant/src/transpiler.sibilant:91:0 */

  return node;
});
transpile.number = (function transpile$number$(node) {
  /* transpile.number /Users/jbr/code/sibilant/src/transpiler.sibilant:94:0 */

  return parseFloat(node.token.replace((new RegExp(",", "g")), "")).toString();
});
transpile.root = (function transpile$root$(node) {
  /* transpile.root /Users/jbr/code/sibilant/src/transpiler.sibilant:97:0 */

  return (function() {
    if ((1 === node.contents.length)) {
      return transpile((node.contents)[0]);
    } else {
      return interleave("\n", compact(map(node.contents, asStatement)));
    }
  })();
});
transpile.expression = (function transpile$expression$(node, preprocessor) {
  /* transpile.expression /Users/jbr/code/sibilant/src/transpiler.sibilant:102:0 */

  return (function() {
    if (node.contents.length) {
      var head = (node.contents)[0],
          args = node.contents.slice(1),
          macro = (macros)[outputFormatter(transpile(head))];
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
  /* transpile.bracket /Users/jbr/code/sibilant/src/transpiler.sibilant:121:0 */

  return macros.list.apply(this, node.contents);
});
transpile.brace = (function transpile$brace$(node) {
  /* transpile.brace /Users/jbr/code/sibilant/src/transpiler.sibilant:123:0 */

  return macros.hash.apply(this, node.contents);
});
transpile.literal = (function transpile$literal$(node) {
  /* transpile.literal /Users/jbr/code/sibilant/src/transpiler.sibilant:125:0 */

  var string = node.token;
  return inject(string.replace((new RegExp("\\*", "g")), "_")
    .replace((new RegExp("\\?$", undefined)), "__QUERY")
    .replace((new RegExp("!$", undefined)), "__BANG"), string.match((new RegExp("-(.)", "g"))), (function(returnString, match) {
    /* /Users/jbr/code/sibilant/src/transpiler.sibilant:132:13 */
  
    return returnString.replace(match, (match)[1].toUpperCase());
  }));
});
transpile.string = (function transpile$string$(node) {
  /* transpile.string /Users/jbr/code/sibilant/src/transpiler.sibilant:136:0 */

  return node.token.split("\n")
    .join("\\n\" +\n\"");
});
transpile.comment = (function transpile$comment$(node) {
  /* transpile.comment /Users/jbr/code/sibilant/src/transpiler.sibilant:140:0 */

  return null;
});