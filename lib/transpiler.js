var node__QUERY = (function node__QUERY$(thing, type) {
  /* node? /Users/jbr/code/sibilant/src/transpiler.sibilant:1:0 */

  return (((typeof thing !== "undefined") && (thing !== null)) && ("object" === typeof thing) && typeof(thing.type) === "string" && ((typeof type === "undefined") || (thing.type === type)) && thing.hasOwnProperty("contents"));
});
var emptyNode__QUERY = (function emptyNode__QUERY$(item) {
  /* empty-node? /Users/jbr/code/sibilant/src/transpiler.sibilant:9:0 */

  return (function() {
    if (node__QUERY(item)) {
      return emptyNode__QUERY(item.contents);
    } else if (((item) && typeof (item) === "object" && (item).constructor.name === "Array")) {
      return all__QUERY(item, emptyNode__QUERY);
    } else if (typeof(item) === "string") {
      return item.match((new RegExp("^\\s*$", undefined)));
    } else {
      return ((null === item) || (typeof item === "undefined") || (false === item));
    }
  })();
});
var compactNode = (function compactNode$(item) {
  /* compact-node /Users/jbr/code/sibilant/src/transpiler.sibilant:17:0 */

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
  /* recurse-transpile /Users/jbr/code/sibilant/src/transpiler.sibilant:26:0 */

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
  /* transpile /Users/jbr/code/sibilant/src/transpiler.sibilant:34:0 */

  (function() {
    if (typeof(node) === "string") {
      return node = {
        type: "js",
        token: node,
        contents: []
      };
    } else if ((typeof node === "number")) {
      return node = {
        type: "number",
        token: node.toString(),
        contents: []
      };
    }
  })();
  return (function() {
    if (((node) && typeof (node) === "object" && (node).constructor.name === "Array")) {
      return node;
    } else if (((typeof node !== "undefined") && (node !== null))) {
      var transpiler = ((transpile)[node.type] || transpile.default);
      var result = transpiler(node);
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
transpile.hat = (function transpile$hat$(node) {
  /* transpile.hat /Users/jbr/code/sibilant/src/transpiler.sibilant:68:0 */

  var output = transpile((node.contents)[0]);
  (output)["contents"] = [ "sibilant.macros.namespace[\"", (output.contents)[0], "\"]" ];
  return output;
});
transpile.tick = (function transpile$tick$(node) {
  /* transpile.tick /Users/jbr/code/sibilant/src/transpiler.sibilant:73:0 */

  return sibilant.macros.namespaces.core.quote.apply(node, node.contents);
});
transpile.at = (function transpile$at$(node) {
  /* transpile.at /Users/jbr/code/sibilant/src/transpiler.sibilant:76:0 */

  return transpile((node.contents)[0]);
});
transpile.dots = (function transpile$dots$(node) {
  /* transpile.dots /Users/jbr/code/sibilant/src/transpiler.sibilant:79:0 */

  return sibilant.macros.namespaces.core.dots.apply(node, node.contents);
});
transpile.default = (function transpile$default$(node) {
  /* transpile.default /Users/jbr/code/sibilant/src/transpiler.sibilant:82:0 */

  return node.token;
});
transpile.output = (function transpile$output$(node) {
  /* transpile.output /Users/jbr/code/sibilant/src/transpiler.sibilant:85:0 */

  return node;
});
transpile.number = (function transpile$number$(node) {
  /* transpile.number /Users/jbr/code/sibilant/src/transpiler.sibilant:88:0 */

  return parseFloat(node.token.replace((new RegExp(",", "g")), "")).toString();
});
transpile.root = (function transpile$root$(node) {
  /* transpile.root /Users/jbr/code/sibilant/src/transpiler.sibilant:91:0 */

  return (function() {
    if ((1 === node.contents.length)) {
      return transpile((node.contents)[0]);
    } else {
      return interleave("\n", compact(map(node.contents, asStatement)));
    }
  })();
});
transpile.expression = (function transpile$expression$(node, preprocessor) {
  /* transpile.expression /Users/jbr/code/sibilant/src/transpiler.sibilant:96:0 */

  return (function() {
    if (node.contents.length) {
      var head = (node.contents)[0],
          args = node.contents,
          macro = sibilant.resolveMacro("call");
      (function() {
        if ((head && ("string" === head.type))) {
          return macro = sibilant.resolveMacro("concat");
        } else {
          var resolvedMacro = sibilant.resolveMacro(outputFormatter(transpile(head)));
          return (function() {
            if (resolvedMacro) {
              (head)["hint"] = "macro";
              macro = resolvedMacro;
              return args = node.contents.slice(1);
            }
          })();
        }
      })();
      return macro.apply(node, args);
    } else {
      return "null";
    }
  })();
});
transpile.bracket = (function transpile$bracket$(node) {
  /* transpile.bracket /Users/jbr/code/sibilant/src/transpiler.sibilant:115:0 */

  return sibilant.macros.namespaces.core.list.apply(this, node.contents);
});
transpile.brace = (function transpile$brace$(node) {
  /* transpile.brace /Users/jbr/code/sibilant/src/transpiler.sibilant:118:0 */

  return sibilant.macros.namespaces.core.hash.apply(this, node.contents);
});
transpile.literal = (function transpile$literal$(node) {
  /* transpile.literal /Users/jbr/code/sibilant/src/transpiler.sibilant:120:0 */

  var string = node.token;
  return inject(string.replace((new RegExp("\\*", "g")), "_")
    .replace((new RegExp("\\?$", undefined)), "__QUERY")
    .replace((new RegExp("!$", undefined)), "__BANG"), string.match((new RegExp("-(.)", "g"))), (function(returnString, match) {
    /* /Users/jbr/code/sibilant/src/transpiler.sibilant:127:13 */
  
    return returnString.replace(match, (match)[1].toUpperCase());
  }));
});
transpile.string = (function transpile$string$(node) {
  /* transpile.string /Users/jbr/code/sibilant/src/transpiler.sibilant:131:0 */

  return node.token.split("\n")
    .join("\\n\" +\n\"");
});
transpile.comment = (function transpile$comment$(node) {
  /* transpile.comment /Users/jbr/code/sibilant/src/transpiler.sibilant:135:0 */

  return null;
});