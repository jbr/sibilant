var macros = {  };
(sibilant)["macros"] = macros;
var recurseIndent = (function recurseIndent$(args) {
  /* recurse-indent /Users/jbr/code/sibilant/src/macros.sibilant:4:0 */

  var args = Array.prototype.slice.call(arguments, 0);

  return map(args, (function(arg) {
    /* /Users/jbr/code/sibilant/src/macros.sibilant:6:10 */
  
    return (function() {
      if (node__QUERY(arg)) {
        (arg)["contents"] = recurseIndent.apply(this, compact(flatten(arg.contents)));
        return arg;
      } else if (((arg) && typeof (arg) === "object" && (arg).constructor.name === "Array")) {
        return recurseIndent.apply(this, arg);
      } else if ((typeof arg === 'number')) {
        return arg.toString();
      } else if (typeof(arg) === "string") {
        return arg.replace((new RegExp("\\n", "g")), "\n  ")
          .replace((new RegExp("\\n\\s+\\n", "g")), "\n\n");
      } else {
        return arg;
      }
    })();
  }));
});
var indent = (function indent$(args) {
  /* indent /Users/jbr/code/sibilant/src/macros.sibilant:17:0 */

  var args = Array.prototype.slice.call(arguments, 0);

  return [ "\n  ", recurseIndent(args), "\n" ];
});
var escapeRegex = (function escapeRegex$(string) {
  /* escape-regex /Users/jbr/code/sibilant/src/macros.sibilant:21:0 */

  return string.replace((new RegExp("[\\-\\[\\]\\/\\{\\}\\(\\)\\*\\+\\?\\.\\\\\^\\$\\|]", "g")), "\\$&");
});
macros.return = (function macros$return$(token) {
  /* ^return /Users/jbr/code/sibilant/src/macros.sibilant:24:0 */

  (function() {
    if (sibilant.debug) {
      return console.log("returning ", prettify(token));
    }
  })();
  var defaultReturn = asStatement([ "return ", transpile(token) ]);
  return (function() {
    if ((token && token.contents && token.contents.length && ((((token.contents)[0])["modifiers"]).length === 0))) {
      return (function() {
        switch(((token.contents)[0])["token"]) {
        case "return":
        case "throw":
        case "do":
          return transpile(token);
        
        case "delete":
          var deleteMacro = (macros)["delete"];
          return (function() {
            if ((token.contents.length < 3)) {
              return defaultReturn;
            } else {
              return [ asStatement(deleteMacro.apply(this, token.contents.slice(1, -1))), "\nreturn ", asStatement(deleteMacro((token.contents.slice(-1))[0])) ];
            }
          })();
        
        case "assign":
          return (function() {
            if ((token.contents.length < 4)) {
              return defaultReturn;
            } else {
              return [ macros.assign.apply(this, token.contents.slice(1, (token.contents.length - 2))), "\nreturn ", macros.assign.apply(this, token.contents.slice(-2)) ];
            }
          })();
        
        case "var":
          return [ transpile(token), "\nreturn ", transpile((function() {
            if ((0 === (token.contents.length % 2))) {
              return (token.contents.slice(-1))[0];
            } else {
              return (token.contents.slice(-2))[0];
            }
          })()) ];
        
        case "set":
          return (function() {
            if ((token.contents.length < 5)) {
              return defaultReturn;
            } else {
              var obj = (token.contents)[1],
                  nonReturnPart = token.contents.slice(2, (token.contents.length - 2)),
                  returnPart = token.contents.slice(-2);
              nonReturnPart.unshift(obj);
              returnPart.unshift(obj);
              return [ macros.set.apply(this, nonReturnPart), "\nreturn ", macros.set.apply(this, returnPart) ];
            }
          })();
        
        default:
          return defaultReturn;
        }
      })();
    } else {
      return defaultReturn;
    }
  })();
});
macros.list = (function macros$list$(args) {
  /* ^list /Users/jbr/code/sibilant/src/macros.sibilant:62:0 */

  var args = Array.prototype.slice.call(arguments, 0);

  return [ "[ ", interleave(", ", map(args, transpile)), " ]" ];
});
var statement__QUERY = (function statement__QUERY$(transpiled) {
  /* statement? /Users/jbr/code/sibilant/src/macros.sibilant:64:0 */

  return (function() {
    if (node__QUERY(transpiled)) {
      return statement__QUERY(transpiled.contents);
    } else if (((transpiled) && typeof (transpiled) === "object" && (transpiled).constructor.name === "Array")) {
      return statement__QUERY((transpiled.slice(-1))[0]);
    } else if (typeof(transpiled) === "string") {
      return (";" === (transpiled.slice(-1))[0]);
    } else {
      return false;
    }
  })();
});
var asStatement = (function asStatement$(node) {
  /* as-statement /Users/jbr/code/sibilant/src/macros.sibilant:70:0 */

  var transpiled = transpile(node);
  return (function() {
    if (emptyNode__QUERY(transpiled)) {
      return undefined;
    } else if (statement__QUERY(transpiled)) {
      return transpiled;
    } else {
      return [ transpiled, ";" ];
    }
  })();
});
macros.do = (function macros$do$(body) {
  /* ^do /Users/jbr/code/sibilant/src/macros.sibilant:77:0 */

  var body = Array.prototype.slice.call(arguments, 0);

  return (function() {
    if ((1 === body.length)) {
      return macros.return((body)[0]);
    } else if (body.length) {
      return [ interleave("\n", map(body.slice(0, -1), (function(node) {
        /* /Users/jbr/code/sibilant/src/macros.sibilant:79:63 */
      
        return asStatement(node);
      }))), "\n", macros.return((body.slice(-1))[0]) ];
    } else {
      return "";
    }
  })();
});
macros.emptyList = (function macros$emptyList$() {
  /* ^empty-list /Users/jbr/code/sibilant/src/macros.sibilant:84:0 */

  return "null";
});
macros.call = (function macros$call$(fnName, args) {
  /* ^call /Users/jbr/code/sibilant/src/macros.sibilant:86:0 */

  var args = Array.prototype.slice.call(arguments, 1);

  return [ transpile(fnName), "(", interleave(", ", map(args, transpile)), ")" ];
});
macros.def = (function macros$def$(fnName, args, body) {
  /* ^def /Users/jbr/code/sibilant/src/macros.sibilant:90:0 */

  var body = Array.prototype.slice.call(arguments, 2);

  var fnNameTr = transpile(fnName),
      thisNode = this;
  return asStatement([ (function() {
    if (outputFormatter(fnNameTr).match((new RegExp("\\.", undefined)))) {
      return "";
    } else {
      return "var ";
    }
  })(), fnNameTr, " = ", macros.lambda.apply(this, [ {
    name: fnName,
    args: args,
    node: thisNode
  } ].concat(body)) ]);
});
macros.macro = (function macros$macro$(name, args, body) {
  /* ^macro /Users/jbr/code/sibilant/src/macros.sibilant:98:0 */

  var body = Array.prototype.slice.call(arguments, 2);

  var nameTr = outputFormatter(transpile(name)),
      options = {
    name: name,
    args: args,
    node: this
  },
      js = outputFormatter(macros.lambda.apply(this, [ options ].concat(body)));
  (function() {
    if (sibilant.debug) {
      return console.log(js);
    }
  })();
  (function() {
    try {
      return (macros)[nameTr] = eval(js);
    } catch (e) {
      return error(("error in parsing macro " + sibilant.prettyPrint(name) + ":\n" + js));
    }
  })();
  return undefined;
});
macros.concat = (function macros$concat$(args) {
  /* ^concat /Users/jbr/code/sibilant/src/macros.sibilant:111:0 */

  var args = Array.prototype.slice.call(arguments, 0);

  return [ "(", interleave(" + ", map(args, transpile)), ")" ];
});
macros.reverse = (function macros$reverse$(arr) {
  /* ^reverse /Users/jbr/code/sibilant/src/macros.sibilant:114:0 */

  var reversed = [];
  arr.forEach((function(item) {
    /* /Users/jbr/code/sibilant/src/macros.sibilant:116:5 */
  
    return reversed.unshift(item);
  }));
  return reversed;
});
var reverse = macros.reverse;
macros.lambda = (function macros$lambda$(argsOrOptions, body) {
  /* ^lambda /Users/jbr/code/sibilant/src/macros.sibilant:121:0 */

  var body = Array.prototype.slice.call(arguments, 1);

  var args = ((argsOrOptions)["args"] || argsOrOptions),
      body = ((argsOrOptions)["body"] || body),
      args = (function() {
    if (node__QUERY(args, "expression")) {
      return args.contents;
    } else if ((node__QUERY(args) && ((body).length === 0))) {
      body = [ args ];
      return [];
    } else {
      return args;
    }
  })(),
      name = (function() {
    if (argsOrOptions.name) {
      return outputFormatter(transpile(argsOrOptions.name)).replace((new RegExp("\\W+", "g")), "$")
        .concat("$");
    }
  })(),
      rest = detect(args, (function(arg) {
    /* /Users/jbr/code/sibilant/src/macros.sibilant:132:23 */
  
    return (function() {
      if (arg.modifiers) {
        var mod = (arg.modifiers)[0];
        return (mod && ("..." === mod.token));
      }
    })();
  }));
  var thisNode = this,
      node = detect([ thisNode, argsOrOptions.node, argsOrOptions.name, args, (body)[0] ], (function(n) {
    /* /Users/jbr/code/sibilant/src/macros.sibilant:140:16 */
  
    return (node__QUERY(n) && (n)["file"]);
  }));
  return [ "(function", (function() {
    if (name) {
      return (" " + name);
    } else {
      return "";
    }
  })(), "(", interleave(", ", map(args, transpile)), ") {", (function() {
    if ((argsOrOptions.name || node)) {
      return indent([ "/*", (function() {
        if (argsOrOptions.name) {
          return (" " + sibilant.prettyPrint(argsOrOptions.name, false));
        } else {
          return "";
        }
      })(), (function() {
        if (node) {
          return (" " + node.file + ":" + node.line + ":" + node.col);
        } else {
          return "";
        }
      })(), " */" ]);
    } else {
      return "";
    }
  })(), (function() {
    if (((typeof rest !== 'undefined') && (rest !== null))) {
      return indent(asStatement([ "var ", transpile(rest), " = Array.prototype.slice.call(arguments, ", (args.length - 1), ")" ]));
    }
  })(), indent(macros.do.apply(this, body)), "})" ];
});
(macros)["#"] = macros.lambda;
macros.hash = (function macros$hash$(pairs) {
  /* ^hash /Users/jbr/code/sibilant/src/macros.sibilant:158:0 */

  var pairs = Array.prototype.slice.call(arguments, 0);

  (function() {
    if ((0 !== (pairs.length % 2))) {
      return error(("odd number of key-value pairs in hash: " + inspect(pairs)));
    }
  })();
  var quoteKeys = macros.hash.quoteKeys,
      pairStrings = bulkMap(pairs, (function(key, value) {
    /* /Users/jbr/code/sibilant/src/macros.sibilant:164:39 */
  
    return [ (function() {
      if ((quoteKeys && (!node__QUERY(key, "string")))) {
        return [ "\"", transpile(key), "\"" ];
      } else {
        return transpile(key);
      }
    })(), ": ", transpile(value) ];
  }));
  return (function() {
    if ((1 >= pairStrings.length)) {
      return [ "{ ", interleave(", ", pairStrings), " }" ];
    } else {
      return [ "{", indent(interleave(",\n", pairStrings)), "}" ];
    }
  })();
});
var qescape = (function qescape$(content) {
  /* qescape /Users/jbr/code/sibilant/src/macros.sibilant:175:0 */

  return (function() {
    if ((!((typeof content !== 'undefined') && (content !== null)))) {
      return "";
    } else if (typeof(content) === "string") {
      return content.replace((new RegExp("\"", "g")), "\\\"");
    } else if ((!(typeof content.unquote !== 'undefined'))) {
      (content)["contents"] = qescape(content.contents);
      return content;
    } else if (((content) && typeof (content) === "object" && (content).constructor.name === "Array")) {
      return map(content, qescape);
    } else {
      return content;
    }
  })();
});
macros.quote = (function macros$quote$(content) {
  /* ^quote /Users/jbr/code/sibilant/src/macros.sibilant:189:0 */

  return (function() {
    if (typeof(content) === "string") {
      return ("\"" + qescape(content) + "\"");
    } else {
      return [ "[\"", qescape(transpile(content)), "\"]" ];
    }
  })();
});
macros.unquote = (function macros$unquote$(content) {
  /* ^unquote /Users/jbr/code/sibilant/src/macros.sibilant:195:0 */

  return {
    type: "output",
    contents: [ "\", ", transpile(content), ", \"" ],
    unquote: true
  };
});
macros.debug = (function macros$debug$(val) {
  /* ^debug /Users/jbr/code/sibilant/src/macros.sibilant:198:0 */

  (sibilant)["debug"] = eval(outputFormatter(transpile(val)));
  return null;
});