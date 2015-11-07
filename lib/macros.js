var macros = {  };
(sibilant)["macros"] = macros;
var escapeRegex = (function escapeRegex$(string) {
  /* escape-regex /Users/jbr/code/sibilant/src/macros.sibilant:4:1 */

  return string.replace((new RegExp("[\\-\\[\\]\\/\\{\\}\\(\\)\\*\\+\\?\\.\\\\\^\\$\\|]", "g")), "\\$&");
});
macros.return = (function macros$return$(token) {
  /* ^return /Users/jbr/code/sibilant/src/macros.sibilant:7:1 */

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
            if ((token.length < 3)) {
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
            if ((token.length < 5)) {
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
  /* ^list /Users/jbr/code/sibilant/src/macros.sibilant:44:1 */

  var args = Array.prototype.slice.call(arguments, 0);

  return [ "[ ", interleave(", ", map(args, transpile)), " ]" ];
});
var statement__QUERY = (function statement__QUERY$(transpiled) {
  /* statement? /Users/jbr/code/sibilant/src/macros.sibilant:46:1 */

  return (function() {
    if (((transpiled) && typeof (transpiled) === "object" && (transpiled).constructor.name === "Array")) {
      return statement__QUERY((compact(transpiled).slice(-1))[0]);
    } else if (typeof(transpiled) === "string") {
      return (";" === (transpiled.slice(-1))[0]);
    } else {
      return false;
    }
  })();
});
var asStatement = (function asStatement$(node) {
  /* as-statement /Users/jbr/code/sibilant/src/macros.sibilant:51:1 */

  var transpiled = transpile(node);
  return (function() {
    if (((compact(flatten(transpiled))).length === 0)) {
      return transpiled;
    } else if ((transpiled && transpiled.length && statement__QUERY(transpiled))) {
      return transpiled;
    } else {
      return [ transpiled, ";" ];
    }
  })();
});
macros.statement = (function macros$statement$(args) {
  /* ^statement /Users/jbr/code/sibilant/src/macros.sibilant:57:1 */

  var args = Array.prototype.slice.call(arguments, 0);

  return [ macros.call.apply(this, args), ";\n" ];
});
macros.do = (function macros$do$(body) {
  /* ^do /Users/jbr/code/sibilant/src/macros.sibilant:60:1 */

  var body = Array.prototype.slice.call(arguments, 0);

  return (function() {
    if ((1 === body.length)) {
      return macros.return((body)[0]);
    } else if (body.length) {
      return [ interleave("\n", map(Array.prototype.slice.call(body, 0, -1), (function(node) {
        /* /Users/jbr/code/sibilant/src/macros.sibilant:62:41 */
      
        return asStatement(transpile(node));
      }))), "\n", macros.return((body.slice(-1))[0]) ];
    } else {
      return "";
    }
  })();
});
macros.emptyList = (function macros$emptyList$() {
  /* ^empty-list */

  return "null";
});
macros.call = (function macros$call$(fnName, args) {
  /* ^call /Users/jbr/code/sibilant/src/macros.sibilant:69:1 */

  var args = Array.prototype.slice.call(arguments, 1);

  return [ transpile(fnName), "(", interleave(", ", map(args, transpile)), ")" ];
});
macros.def = (function macros$def$(fnName, args, body) {
  /* ^def /Users/jbr/code/sibilant/src/macros.sibilant:73:1 */

  var body = Array.prototype.slice.call(arguments, 2);

  var fnNameTr = transpile(fnName);
  return asStatement([ (function() {
    if (fnNameTr.match((new RegExp("\\.", undefined)))) {
      return "";
    } else {
      return "var ";
    }
  })(), fnNameTr, " = ", macros.lambda.apply(this, [ {
    name: fnName,
    args: args
  } ].concat(body)) ]);
});
macros.macro = (function macros$macro$(name, args, body) {
  /* ^macro /Users/jbr/code/sibilant/src/macros.sibilant:81:1 */

  var body = Array.prototype.slice.call(arguments, 2);

  var nameTr = transpile(name),
      options = {
    name: name,
    args: args
  },
      js = (flatten(macros.lambda.apply(this, [ options ].concat(body)))).join("");
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
  /* ^concat /Users/jbr/code/sibilant/src/macros.sibilant:92:1 */

  var args = Array.prototype.slice.call(arguments, 0);

  return [ "(", interleave(" + ", map(args, transpile)), ")" ];
});
macros.reverse = (function macros$reverse$(arr) {
  /* ^reverse /Users/jbr/code/sibilant/src/macros.sibilant:95:1 */

  var reversed = [];
  arr.forEach((function(item) {
    /* /Users/jbr/code/sibilant/src/macros.sibilant:97:6 */
  
    return reversed.unshift(item);
  }));
  return reversed;
});
var reverse = macros.reverse;
macros.lambda = (function macros$lambda$(argsOrOptions, body) {
  /* ^lambda /Users/jbr/code/sibilant/src/macros.sibilant:102:1 */

  var body = Array.prototype.slice.call(arguments, 1);

  var args = ((argsOrOptions)["args"] || argsOrOptions),
      body = ((argsOrOptions)["body"] || body),
      args = (args.contents || args),
      name = (function() {
    if (argsOrOptions.name) {
      return transpile(argsOrOptions.name).replace((new RegExp("\\W+", "g")), "$")
        .concat("$");
    }
  })(),
      rest = detect(args, (function(arg) {
    /* /Users/jbr/code/sibilant/src/macros.sibilant:110:16 */
  
    return (function() {
      if (arg.modifiers) {
        var mod = (arg.modifiers)[0];
        return (mod && ("..." === mod.token));
      }
    })();
  }));
  var thisNode = this,
      node = detect(map([ thisNode, argsOrOptions.name, args, (body)[0] ], (function(n) {
    /* /Users/jbr/code/sibilant/src/macros.sibilant:118:17 */
  
    return (function() {
      if (n) {
        return n.parent;
      } else {
        return n;
      }
    })();
  })), (function(n) {
    /* /Users/jbr/code/sibilant/src/macros.sibilant:117:16 */
  
    return (n && (n)["file"]);
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
          return (" " + sibilant.prettyPrint(argsOrOptions.name));
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
      return indent([ "var ", transpile(rest), " = Array.prototype.slice.call(arguments, ", (args.length - 1), ");" ]);
    }
  })(), indent(macros.do.apply(this, body)), "})" ];
});
(macros)["#"] = macros.lambda;
macros.hash = (function macros$hash$(pairs) {
  /* ^hash /Users/jbr/code/sibilant/src/macros.sibilant:138:1 */

  var pairs = Array.prototype.slice.call(arguments, 0);

  (function() {
    if ((0 !== (pairs.length % 2))) {
      return error(("odd number of key-value pairs in hash: " + inspect(pairs)));
    }
  })();
  var quoteKeys = macros.hash.quoteKeys,
      pairStrings = bulkMap(pairs, (function(key, value) {
    /* /Users/jbr/code/sibilant/src/macros.sibilant:144:24 */
  
    return [ (function() {
      if (quoteKeys) {
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