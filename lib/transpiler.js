var recurseTranspile = (function recurseTranspile$(node) {
  /* recurse-transpile src/transpiler.sibilant:1:0 */

  return (function() {
    if (((node) && typeof (node) === "object" && (node).constructor.name === "Array")) {
      return map(node, recurseTranspile);
    } else if (node__QUERY(node, "output")) {
      return mergeInto(node, { contents: recurseTranspile(node.contents) });
    } else if (node__QUERY(node)) {
      return transpile(node);
    } else {
      return node;
    }
  }).call(this);
});
var transpile = (function transpile$(node, preprocessor) {
  /* transpile src/transpiler.sibilant:13:0 */

  (function() {
    if (typeof node === "string") {
      return node = {
        type: "js",
        token: node,
        contents: []
      };
    } else if (typeof node === "number") {
      return node = {
        type: "number",
        token: node.toString(),
        contents: []
      };
    }
  }).call(this);
  return (function() {
    if (((node) && typeof (node) === "object" && (node).constructor.name === "Array")) {
      return node;
    } else if ((typeof node !== "undefined" && node !== null)) {
      var transpiler = (transpile[node.type] || transpile.default),
          result = transpiler(node),
          resultNode = recurseTranspile((function() {
        if (node__QUERY(result)) {
          return result;
        } else {
          return {
            contents: result,
            type: "output"
          };
        }
      }).call(this));
      (function() {
        if (typeof resultNode === "undefined") {
          console.log(("" + node.file + ":" + node.line + ":" + node.col + "\n" + prettify(node) + ""));
          console.log(prettify(result));
          console.log(prettify(transpile(result)));
          throw (new Error(("Encountered an undefined return from recursive transpile.\n" + "Please report this bug at " + "https://github.com/jbr/sibilant/issues/new")))
        }
      }).call(this);
      resultNode.contents = compact(flatten(resultNode.contents));
      resultNode.source = node;
      (function() {
        if (5 > sibilant.debug) {
          return console.log(prettify(node), red("->"), prettify(resultNode));
        }
      }).call(this);
      return (function() {
        if (emptyNode__QUERY(resultNode)) {
          return undefined;
        } else {
          return resultNode;
        }
      }).call(this);
    }
  }).call(this);
});
sibilant.transpile = transpile;
var readerMacros = {  };
transpile.hat = (function transpile$hat$(node) {
  /* transpile.hat src/transpiler.sibilant:60:0 */

  var token = node.contents[0].token,
      temp$23 = (function() {
    if (token.match((new RegExp("\/", undefined)))) {
      return token.split("/");
    } else {
      return [ sibilant.macros.searchPath[0], token ];
    }
  }).call(this),
      namespace = temp$23[0],
      macro = temp$23[1],
      temp$23 = undefined;
  return sibilant.macros.namespaces.core.get.call(node, "sibilant.macros.namespaces", sibilant.macros.namespaces.core.quote(transpile.literal({ token: namespace })), sibilant.macros.namespaces.core.quote(transpile.literal({ token: macro })));
});
transpile.tick = (function transpile$tick$(node) {
  /* transpile.tick src/transpiler.sibilant:71:0 */

  return sibilant.macros.namespaces.core.quote.apply(node, node.contents);
});
transpile.at = (function transpile$at$(node) {
  /* transpile.at src/transpiler.sibilant:74:0 */

  return transpile(node.contents[0]);
});
transpile.dots = (function transpile$dots$(node) {
  /* transpile.dots src/transpiler.sibilant:77:0 */

  return sibilant.macros.namespaces.core.dots.apply(node, node.contents);
});
transpile.default = (function transpile$default$(node) {
  /* transpile.default src/transpiler.sibilant:80:0 */

  return node.token;
});
transpile.output = (function transpile$output$(node) {
  /* transpile.output src/transpiler.sibilant:83:0 */

  return node;
});
transpile.number = (function transpile$number$(node) {
  /* transpile.number src/transpiler.sibilant:86:0 */

  return parseFloat(node.token.replace((new RegExp(",", "g")), "")).toString();
});
transpile.root = (function transpile$root$(node) {
  /* transpile.root src/transpiler.sibilant:91:0 */

  return (function() {
    if (1 === node.contents.length) {
      return transpile(node.contents[0]);
    } else {
      return interleave(compact(map(node.contents, asStatement)), "\n");
    }
  }).call(this);
});
transpile.expression = (function transpile$expression$(node, preprocessor) {
  /* transpile.expression src/transpiler.sibilant:100:0 */

  return (function() {
    if (node.contents.length) {
      var head = node.contents[0],
          args = node.contents,
          macro = sibilant.resolveMacro("call");
      (function() {
        if (node__QUERY(head, "string")) {
          return macro = sibilant.resolveMacro("concat");
        } else if (node__QUERY(head, "dots")) {
          macro = sibilant.resolveMacro("send");
          return args = [ node.contents[1], head.contents[0] ].concat(node.contents.slice(2));
        } else if (node__QUERY(head, "literal", "otherChar")) {
          var resolvedMacro = sibilant.resolveMacro(outputFormatter(transpile(head)));
          return (function() {
            if (resolvedMacro) {
              head.hint = "macro";
              macro = resolvedMacro;
              return args = node.contents.slice(1);
            }
          }).call(this);
        }
      }).call(this);
      return macro.apply(node, args);
    } else {
      return "null";
    }
  }).call(this);
});
transpile.bracket = (function transpile$bracket$(node) {
  /* transpile.bracket src/transpiler.sibilant:131:0 */

  return sibilant.macros.namespaces.core.list.apply(this, node.contents);
});
transpile.brace = (function transpile$brace$(node) {
  /* transpile.brace src/transpiler.sibilant:134:0 */

  return sibilant.macros.namespaces.core.hash.apply(this, node.contents);
});
transpile.literal = (function transpile$literal$(node) {
  /* transpile.literal src/transpiler.sibilant:136:0 */

  var string = node.token.replace((new RegExp("\\*", "g")), "_").replace((new RegExp("\\?$", undefined)), "__QUERY").replace((new RegExp("!$", undefined)), "__BANG");
  return inject(string, string.match((new RegExp("-(.)", "g"))), (function(returnString, match) {
    /* src/transpiler.sibilant:143:13 */
  
    var letter = match[1];
    return returnString.replace(match, (function() {
      if (letter.match((new RegExp("[A-Z]", undefined)))) {
        return ("_" + letter);
      } else {
        return letter.toUpperCase();
      }
    }).call(this));
  }));
});
transpile.string = (function transpile$string$(node) {
  /* transpile.string src/transpiler.sibilant:149:0 */

  return node.token.split("\n").join("\\n\" +\n\"");
});
transpile.comment = (function transpile$comment$(node) {
  /* transpile.comment src/transpiler.sibilant:154:0 */

  return null;
});