sibilant.macros.namespaces.core.return = (function sibilant$macros$namespaces$core$return$(token) {
  /* sibilant.macros.namespaces.core.return /Users/jbr/code/sibilant/src/core.sibilant:1:0 */

  (function() {
    if (sibilant.debug) {
      return console.log("returning ", prettify(token));
    }
  }).call(this);
  var defaultReturn = asStatement([ "return ", transpile(token) ]);
  return (function() {
    if ((token && token.contents && token.contents.length)) {
      return (function() {
        switch(token.contents[0].token) {
        case "return":
        case "throw":
        case "do":
          return transpile(token);
        
        case "delete":
          var deleteMacro = macros.delete;
          return (function() {
            if (token.contents.length < 3) {
              return defaultReturn;
            } else {
              return [ asStatement(deleteMacro.apply(this, token.contents.slice(1, -1))), "\nreturn ", asStatement(deleteMacro(token.contents.slice(-1)[0])) ];
            }
          }).call(this);
        
        case "assign":
          return (function() {
            if (token.contents.length < 4) {
              return defaultReturn;
            } else {
              return [ sibilant.macros.namespaces.core.assign.apply(this, token.contents.slice(1, (token.contents.length - 2))), "\nreturn ", sibilant.macros.namespaces.core.assign.apply(this, token.contents.slice(-2)) ];
            }
          }).call(this);
        
        case "var":
          return [ transpile(token), "\nreturn ", transpile((function() {
            if (0 === (token.contents.length % 2)) {
              return token.contents.slice(-1)[0];
            } else {
              return token.contents.slice(-2)[0];
            }
          }).call(this)) ];
        
        case "set":
          return (function() {
            if (token.contents.length < 5) {
              return defaultReturn;
            } else {
              var obj = token.contents[1],
                  nonReturnPart = token.contents.slice(2, (token.contents.length - 2)),
                  returnPart = token.contents.slice(-2);
              nonReturnPart.unshift(obj);
              returnPart.unshift(obj);
              return [ sibilant.macros.namespaces.core.set.apply(this, nonReturnPart), "\nreturn ", sibilant.macros.namespaces.core.set.apply(this, returnPart) ];
            }
          }).call(this);
        
        default:
          return defaultReturn;
        }
      }).call(this);
    } else {
      return defaultReturn;
    }
  }).call(this);
});
sibilant.macros.namespaces.core.do = (function sibilant$macros$namespaces$core$do$(body) {
  /* sibilant.macros.namespaces.core.do /Users/jbr/code/sibilant/src/core.sibilant:43:0 */

  var body = Array.prototype.slice.call(arguments, 0);

  return (function() {
    if (1 === body.length) {
      return sibilant.macros.namespaces.core.return(body[0]);
    } else if (body.length) {
      return [ interleave("\n", map(body.slice(0, -1), (function() {
        /* /Users/jbr/code/sibilant/src/core.sibilant:46:63 */
      
        return asStatement(arguments[0]);
      }))), "\n", sibilant.macros.namespaces.core.return(body.slice(-1)[0]) ];
    } else {
      return "";
    }
  }).call(this);
});
sibilant.macros.namespaces.core.emptyList = (function sibilant$macros$namespaces$core$emptyList$() {
  /* sibilant.macros.namespaces.core.empty-list /Users/jbr/code/sibilant/src/core.sibilant:51:0 */

  return "null";
});
sibilant.macros.namespaces.core.def = (function sibilant$macros$namespaces$core$def$(fnName, args, body) {
  /* sibilant.macros.namespaces.core.def /Users/jbr/code/sibilant/src/core.sibilant:53:0 */

  var body = Array.prototype.slice.call(arguments, 2);

  (function() {
    if (typeof fnName === "undefined") {
      return error("invalid function definition. missing name.");
    } else if (typeof args === "undefined") {
      return error("invalid function definition. missing arguments or return value.");
    }
  }).call(this);
  var fnNameTr = transpile(fnName),
      thisNode = this;
  sibilant.docs.record(("function " + prettify(fnName, false)), this);
  return asStatement([ (function() {
    if (outputFormatter(fnNameTr).match((new RegExp("\\.", undefined)))) {
      return "";
    } else {
      return "var ";
    }
  }).call(this), fnNameTr, " = ", sibilant.macros.namespaces.core.lambda.apply(this, [ {
    name: fnName,
    args: args,
    node: thisNode
  } ].concat(body)) ]);
});
sibilant.macros.namespaces.core.macro = (function sibilant$macros$namespaces$core$macro$(name, args, body) {
  /* sibilant.macros.namespaces.core.macro /Users/jbr/code/sibilant/src/core.sibilant:65:0 */

  var body = Array.prototype.slice.call(arguments, 2);

  var nameTr = outputFormatter(transpile(name)),
      options = {
    name: name,
    args: args,
    node: this
  },
      js = outputFormatter(sibilant.macros.namespaces.core.lambda.apply(this, [ options ].concat(body)));
  (function() {
    if (sibilant.debug) {
      return console.log(js);
    }
  }).call(this);
  sibilant.docs.record(("macro " + sibilant.macros.searchPath[0] + "/" + prettify(name, false)), this);
  (function() {
    try {
      return sibilant.macros.namespace[nameTr] = eval(js);
    } catch (e) {
      return error(("error in parsing macro " + sibilant.prettyPrint(name) + ":\n" + js));
    }
  }).call(this);
  return undefined;
});
sibilant.macros.namespaces.core.meta = (function sibilant$macros$namespaces$core$meta$(body) {
  /* sibilant.macros.namespaces.core.meta /Users/jbr/code/sibilant/src/core.sibilant:80:0 */

  var body = Array.prototype.slice.call(arguments, 0);

  var js = outputFormatter(sibilant.macros.namespaces.core.scoped.apply(this, body));
  (function() {
    if (sibilant.debug) {
      return console.log(js);
    }
  }).call(this);
  return outputFormatter(eval(js));
});
sibilant.macros.namespaces.core.concat = (function sibilant$macros$namespaces$core$concat$(args) {
  /* sibilant.macros.namespaces.core.concat /Users/jbr/code/sibilant/src/core.sibilant:86:0 */

  var args = Array.prototype.slice.call(arguments, 0);

  return [ "(", interleave(" + ", map(args, transpile)), ")" ];
});
sibilant.macros.namespaces.core.reverse = (function sibilant$macros$namespaces$core$reverse$(arr) {
  /* sibilant.macros.namespaces.core.reverse /Users/jbr/code/sibilant/src/core.sibilant:89:0 */

  var reversed = [];
  arr.forEach((function(item) {
    /* /Users/jbr/code/sibilant/src/core.sibilant:91:5 */
  
    return reversed.unshift(item);
  }));
  return reversed;
});
var reverse = sibilant.macros.namespaces.core.reverse;
sibilant.macros.namespaces.core.lambda = (function sibilant$macros$namespaces$core$lambda$(argsOrOptions, body) {
  /* sibilant.macros.namespaces.core.lambda /Users/jbr/code/sibilant/src/core.sibilant:96:0 */

  var body = Array.prototype.slice.call(arguments, 1);

  (function() {
    if (sibilant.debug) {
      return console.log(argsOrOptions);
    }
  }).call(this);
  var args = (argsOrOptions.args || argsOrOptions),
      body = (argsOrOptions.body || body),
      args = (function() {
    if (node__QUERY(args, "expression")) {
      return args.contents;
    } else if ((node__QUERY(args) && 0 === body.length)) {
      body = [ args ];
      return [];
    } else {
      return args;
    }
  }).call(this),
      name = (function() {
    if (argsOrOptions.name) {
      return outputFormatter(transpile(argsOrOptions.name)).replace((new RegExp("\\W+", "g")), "$")
        .concat("$");
    }
  }).call(this),
      rest = detect(args, (function() {
    /* /Users/jbr/code/sibilant/src/core.sibilant:109:23 */
  
    return node__QUERY(arguments[0], "dots");
  }));
  var thisNode = this,
      node = detect([ argsOrOptions.node, thisNode, argsOrOptions.name, args, body[0] ], (function(n) {
    /* /Users/jbr/code/sibilant/src/core.sibilant:114:16 */
  
    return (node__QUERY(n) && n.file);
  }));
  return [ "(function", (function() {
    if (name) {
      return (" " + name);
    } else {
      return "";
    }
  }).call(this), "(", interleave(", ", map(args, transpile)), ") {", (function() {
    if ((argsOrOptions.name || node)) {
      return indent([ "/*", (function() {
        if (argsOrOptions.name) {
          return (" " + sibilant.prettyPrint(argsOrOptions.name, false));
        } else {
          return "";
        }
      }).call(this), (function() {
        if (node) {
          return (" " + node.file + ":" + node.line + ":" + node.col);
        } else {
          return "";
        }
      }).call(this), " */" ]);
    } else {
      return "";
    }
  }).call(this), (function() {
    if ((typeof rest !== "undefined" && rest !== null)) {
      return indent(asStatement([ "var ", transpile(rest), " = Array.prototype.slice.call(arguments, ", (args.length - 1), ")" ]));
    }
  }).call(this), indent(sibilant.macros.namespaces.core.do.apply(this, body)), "})" ];
});
sibilant.macros.namespaces.core["#"] = sibilant.macros.namespaces.core.lambda;
sibilant.macros.namespaces.core.quotedHash = (function sibilant$macros$namespaces$core$quotedHash$(pairs) {
  /* sibilant.macros.namespaces.core.quoted-hash /Users/jbr/code/sibilant/src/core.sibilant:132:0 */

  var pairs = Array.prototype.slice.call(arguments, 0);

  var cachedQuoteValue = sibilant.macros.namespaces.core.hash.quoteKeys;
  sibilant.macros.namespaces.core.hash.quoteKeys = true;
  var value = sibilant.macros.namespaces.core.hash.apply(this, pairs);
  sibilant.macros.namespaces.core.hash.quoteKeys = cachedQuoteValue;
  return value;
});
sibilant.macros.namespaces.core.hash = (function sibilant$macros$namespaces$core$hash$(pairs) {
  /* sibilant.macros.namespaces.core.hash /Users/jbr/code/sibilant/src/core.sibilant:139:0 */

  var pairs = Array.prototype.slice.call(arguments, 0);

  (function() {
    if (1 === (pairs.length % 2)) {
      return error(("odd number of key-value pairs in hash: " + inspect(pairs)));
    }
  }).call(this);
  var quoteKeys = sibilant.macros.namespaces.core.hash.quoteKeys,
      pairStrings = bulkMap(pairs, (function(key, value) {
    /* /Users/jbr/code/sibilant/src/core.sibilant:145:39 */
  
    return [ (function() {
      if ((quoteKeys && !(node__QUERY(key, "string")))) {
        return [ "\"", transpile(key), "\"" ];
      } else {
        return transpile(key);
      }
    }).call(this), ": ", transpile(value) ];
  }));
  return (function() {
    if (1 >= pairStrings.length) {
      return [ "{ ", interleave(", ", pairStrings), " }" ];
    } else {
      return [ "{", indent(interleave(",\n", pairStrings)), "}" ];
    }
  }).call(this);
});
sibilant.macros.namespaces.core.quote = (function sibilant$macros$namespaces$core$quote$(content) {
  /* sibilant.macros.namespaces.core.quote /Users/jbr/code/sibilant/src/core.sibilant:156:0 */

  return (function() {
    if (typeof content === "string") {
      return ("\"" + qescape(content) + "\"");
    } else if (typeof content === "number") {
      return sibilant.macros.namespaces.core.quote(content.toString());
    } else if (node__QUERY(content, "literal")) {
      return [ "\"", transpile(content), "\"" ];
    } else if (node__QUERY(content, "expression")) {
      return (function() {
        if (Object.keys(findUnquotes(content)).length) {
          return sibilant.macros.namespaces.core.call("macros.expandQuote.call", "this", sibilant.macros.namespaces.core.quote(content.nodeId), sibilant.macros.namespaces.core.quotedHash.apply(this, alternatingKeysAndValues(findUnquotes(content))));
        } else {
          return [ "\"", mapNode(transpile(content), qescape), "\"" ];
        }
      }).call(this);
    } else if (node__QUERY(content, "bracket")) {
      return (function() {
        if (Object.keys(findUnquotes(content)).length) {
          return sibilant.macros.namespaces.core.call("macros.expandQuote.call", "this", sibilant.macros.namespaces.core.quote(content.nodeId), sibilant.macros.namespaces.core.quotedHash.apply(this, alternatingKeysAndValues(findUnquotes(content))));
        } else {
          return sibilant.macros.namespaces.core.list.apply(this, map(content.contents, sibilant.macros.namespaces.core.quote));
        }
      }).call(this);
    } else if (node__QUERY(content, "brace")) {
      return (function() {
        if (Object.keys(findUnquotes(content)).length) {
          return sibilant.macros.namespaces.core.call("macros.expandQuote.call", "this", sibilant.macros.namespaces.core.quote(content.nodeId), sibilant.macros.namespaces.core.quotedHash.apply(this, alternatingKeysAndValues(findUnquotes(content))));
        } else {
          return sibilant.macros.namespaces.core.hash.apply(this, map(content.contents, sibilant.macros.namespaces.core.quote));
        }
      }).call(this);
    } else {
      console.log(("unknown content" + prettify(content)));
      return content;
    }
  }).call(this);
});
sibilant.macros.namespaces.core.debug = (function sibilant$macros$namespaces$core$debug$(val) {
  /* sibilant.macros.namespaces.core.debug /Users/jbr/code/sibilant/src/core.sibilant:183:0 */

  sibilant.debug = eval(outputFormatter(transpile(val)));
  return null;
});
sibilant.macros.namespaces.core.expandQuote = (function sibilant$macros$namespaces$core$expandQuote$(nodeId, expansions) {
  /* sibilant.macros.namespaces.core.expand-quote /Users/jbr/code/sibilant/src/core.sibilant:186:0 */

  var expandedNodes = mapNodeForQuoteExpansion(sibilant.nodeCache[nodeId], expansions);
  return transpile(expandedNodes);
});
sibilant.macros.namespaces.core.list = (function sibilant$macros$namespaces$core$list$(args) {
  /* sibilant.macros.namespaces.core.list /Users/jbr/code/sibilant/src/core.sibilant:193:0 */

  var args = Array.prototype.slice.call(arguments, 0);

  var argSegments = [];
  return (function() {
    if (0 === args.length) {
      return "[]";
    } else {
      var simpleList = (function simpleList$(args) {
        /* simple-list /Users/jbr/code/sibilant/src/core.sibilant:197:12 */
      
        return [ "[ ", interleave(", ", map(args, (function(arg) {
          /* /Users/jbr/code/sibilant/src/core.sibilant:198:50 */
        
          return arg.transpiled;
        }))), " ]" ];
      });
      args.forEach((function(arg) {
        /* /Users/jbr/code/sibilant/src/core.sibilant:200:27 */
      
        return (function() {
          if (node__QUERY(arg, "dots")) {
            return argSegments.push({ transpiled: transpile(arg) });
          } else if (((argSegments.slice(-1)[0]) && typeof (argSegments.slice(-1)[0]) === "object" && (argSegments.slice(-1)[0]).constructor.name === "Array")) {
            return argSegments.slice(-1)[0].push({ transpiled: transpile(arg) });
          } else {
            return argSegments.push([ { transpiled: transpile(arg) } ]);
          }
        }).call(this);
      }));
      argSegments = map(argSegments, (function(segment) {
        /* /Users/jbr/code/sibilant/src/core.sibilant:206:38 */
      
        return (function() {
          if (((segment) && typeof (segment) === "object" && (segment).constructor.name === "Array")) {
            return simpleList(segment);
          } else {
            return segment.transpiled;
          }
        }).call(this);
      }));
      return (function() {
        if (1 === argSegments.length) {
          return argSegments[0];
        } else {
          return [ argSegments[0], ".concat(", interleave(", ", argSegments.slice(1)), ")" ];
        }
      }).call(this);
    }
  }).call(this);
});
sibilant.macros.namespaces.core.call = (function sibilant$macros$namespaces$core$call$(fnName, args) {
  /* sibilant.macros.namespaces.core.call /Users/jbr/code/sibilant/src/core.sibilant:216:0 */

  var args = Array.prototype.slice.call(arguments, 1);

  return (function() {
    if (any__QUERY(args, (function() {
      /* /Users/jbr/code/sibilant/src/core.sibilant:217:20 */
    
      return node__QUERY(arguments[0], "dots");
    }))) {
      return macros.apply(fnName, macros.list.apply(this, args));
    } else {
      return [ transpile(fnName), "(", interleave(", ", map(args, transpile)), ")" ];
    }
  }).call(this);
});
sibilant.macros.namespaces.core.dots = (function sibilant$macros$namespaces$core$dots$(contents) {
  /* sibilant.macros.namespaces.core.dots /Users/jbr/code/sibilant/src/core.sibilant:222:0 */

  var contents = Array.prototype.slice.call(arguments, 0);

  return transpile(contents);
});
sibilant.macros.namespaces.core.include = (function sibilant$macros$namespaces$core$include$(files) {
  /* sibilant.macros.namespaces.core.include /Users/jbr/code/sibilant/src/core.sibilant:225:0 */

  var files = Array.prototype.slice.call(arguments, 0);

  return interleave(files.map((function(file) {
    /* /Users/jbr/code/sibilant/src/core.sibilant:227:17 */
  
    return sibilant.withDefaultSearchPath((function() {
      /* /Users/jbr/code/sibilant/src/core.sibilant:229:20 */
    
      return sibilant.include(eval(outputFormatter(transpile(file))));
    }));
  })), "\n");
});
sibilant.macros.namespaces.core.docs = (function sibilant$macros$namespaces$core$docs$(options) {
  /* sibilant.macros.namespaces.core.docs /Users/jbr/code/sibilant/src/core.sibilant:237:0 */

  var options = Array.prototype.slice.call(arguments, 0);

  var optionsString = undefined,
      optionsHash = {  };
  (function() {
    if (1 === (options.length % 2)) {
      return (function() {
        if ((node__QUERY(options[0], "string") || typeof options[0] === "string")) {
          return optionsString = options.shift();
        } else if ((node__QUERY(options.slice(-1)[0], "string") || typeof options.slice(-1)[0] === "string")) {
          return optionsString = options.pop();
        }
      }).call(this);
    }
  }).call(this);
  bulkMap(options, (function(key, value) {
    /* /Users/jbr/code/sibilant/src/core.sibilant:248:23 */
  
    return optionsHash[outputFormatter(transpile(key))] = value;
  }));
  [ "examples", "references" ].forEach((function(listAttribute) {
    /* /Users/jbr/code/sibilant/src/core.sibilant:251:5 */
  
    return (function() {
      if ((optionsHash.hasOwnProperty(listAttribute) && node__QUERY(optionsHash[listAttribute], "bracket"))) {
        return optionsHash[listAttribute] = optionsHash[listAttribute].contents;
      }
    }).call(this);
  }));
  (function() {
    if (optionsHash.hasOwnProperty("example")) {
      (function() {
        if (optionsHash.hasOwnProperty("examples")) {
          return error("please provide example OR examples, not both");
        }
      }).call(this);
      optionsHash.examples = [ optionsHash.example ];
      return delete optionsHash.example;
    }
  }).call(this);
  (function() {
    if (node__QUERY(optionsString, "string")) {
      return optionsHash.docString = eval(outputFormatter(transpile(optionsString)));
    } else if (typeof optionsString === "string") {
      return optionsHash.docString = optionsString;
    }
  }).call(this);
  sibilant.docs.lastDoc = optionsHash;
  return null;
});