sibilant.macros.namespaces.core.return = (function sibilant$macros$namespaces$core$return$(token) {
  /* ^return /Users/jbr/code/sibilant/src/core.sibilant:1:0 */

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
        
        case "def":
          return [ transpile(token), "\n", sibilant.macros.namespaces.core.return(token.contents[1]) ];
        
        case "assign":
          return (function() {
            if (token.contents.length < 4) {
              return defaultReturn;
            } else {
              var result = clone(transpile(token));
              result.contents = result.contents.slice(0, -4).concat([ "return " ], result.contents.slice(-4));
              return result;
            }
          }).call(this);
        
        case "var":
          return [ transpile(token), "\n", sibilant.macros.namespaces.core.return((function() {
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
  /* ^do /Users/jbr/code/sibilant/src/core.sibilant:48:0 */

  var body = Array.prototype.slice.call(arguments, 0);

  return (function() {
    if (1 === body.length) {
      return sibilant.macros.namespaces.core.return(body[0]);
    } else if (body.length) {
      return [ interleave(map(body.slice(0, -1), (function() {
        /* /Users/jbr/code/sibilant/src/core.sibilant:56:19 */
      
        return asStatement(arguments[0]);
      })), "\n"), "\n", sibilant.macros.namespaces.core.return(body.slice(-1)[0]) ];
    } else {
      return "";
    }
  }).call(this);
});
sibilant.macros.namespaces.core.emptyList = (function sibilant$macros$namespaces$core$emptyList$() {
  /* ^empty-list /Users/jbr/code/sibilant/src/core.sibilant:63:0 */

  return "null";
});
sibilant.macros.namespaces.core.def = (function sibilant$macros$namespaces$core$def$(fnName, args, body) {
  /* ^def /Users/jbr/code/sibilant/src/core.sibilant:65:0 */

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
  sibilant.docs.record("function", sibilant.macros.searchPath[0], fnName, this);
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
  /* ^macro /Users/jbr/code/sibilant/src/core.sibilant:77:0 */

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
  sibilant.docs.record("macro", sibilant.macros.searchPath[0], name, this);
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
  /* ^meta /Users/jbr/code/sibilant/src/core.sibilant:91:0 */

  var body = Array.prototype.slice.call(arguments, 0);

  var js = outputFormatter(transpile(sibilant.macros.namespaces.core.scoped.apply(this, body)));
  (function() {
    if (sibilant.debug) {
      return console.log(js);
    }
  }).call(this);
  return outputFormatter(eval(js));
});
sibilant.macros.namespaces.core.concat = (function sibilant$macros$namespaces$core$concat$(args) {
  /* ^concat /Users/jbr/code/sibilant/src/core.sibilant:97:0 */

  var args = Array.prototype.slice.call(arguments, 0);

  return [ "(", interleave(" + ", map(args, transpile)), ")" ];
});
sibilant.macros.namespaces.core.reverse = (function sibilant$macros$namespaces$core$reverse$(arr) {
  /* ^reverse /Users/jbr/code/sibilant/src/core.sibilant:100:0 */

  var reversed = [];
  arr.forEach((function(item) {
    /* /Users/jbr/code/sibilant/src/core.sibilant:102:5 */
  
    return reversed.unshift(item);
  }));
  return reversed;
});
var reverse = sibilant.macros.namespaces.core.reverse;
sibilant.macros.namespaces.core.lambda = (function sibilant$macros$namespaces$core$lambda$(argsOrOptions, body) {
  /* ^lambda /Users/jbr/code/sibilant/src/core.sibilant:107:0 */

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
      return outputFormatter(transpile(argsOrOptions.name)).replace((new RegExp("\\W+", "g")), "$").concat("$");
    }
  }).call(this),
      rest = detect(args, (function() {
    /* /Users/jbr/code/sibilant/src/core.sibilant:122:23 */
  
    return node__QUERY(arguments[0], "dots");
  }));
  var thisNode = this,
      node = detect([ argsOrOptions.node, thisNode, argsOrOptions.name, args, body[0] ], (function(n) {
    /* /Users/jbr/code/sibilant/src/core.sibilant:127:16 */
  
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
  /* ^quoted-hash /Users/jbr/code/sibilant/src/core.sibilant:145:0 */

  var pairs = Array.prototype.slice.call(arguments, 0);

  var cachedQuoteValue = sibilant.quoteHashKeys;
  sibilant.quoteHashKeys = true;
  var value = sibilant.macros.namespaces.core.hash.apply(this, pairs);
  sibilant.quoteHashKeys = cachedQuoteValue;
  return value;
});
sibilant.macros.namespaces.core.hash = (function sibilant$macros$namespaces$core$hash$(pairs) {
  /* ^hash /Users/jbr/code/sibilant/src/core.sibilant:152:0 */

  var pairs = Array.prototype.slice.call(arguments, 0);

  (function() {
    if (1 === (pairs.length % 2)) {
      return error(("odd number of key-value pairs in hash: " + inspect(pairs)));
    }
  }).call(this);
  var quoteKeys = sibilant.quoteHashKeys,
      pairStrings = bulkMap(pairs, (function(key, value) {
    /* /Users/jbr/code/sibilant/src/core.sibilant:158:39 */
  
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
var replace__BANG = (function replace__BANG$(content) {
  /* replace! /Users/jbr/code/sibilant/src/core.sibilant:168:0 */

  return (function() {
    if ((node__QUERY(content, "dots") && 3 === content.token.length && node__QUERY(content.contents[0], "at"))) {
      return mergeInto(clone(content), { contents: [ transpile(content.contents[0]) ] });
    } else if (node__QUERY(content, "at")) {
      return transpile(content.contents[0]);
    } else if (node__QUERY(content, "tick")) {
      return JSON.stringify(content);
    } else if (("object" === typeof content && content !== null && content.constructor.name !== "Array")) {
      return sibilant.macros.namespaces.core.hash.apply(this, Object.keys(content).reduce((function() {
        /* /Users/jbr/code/sibilant/src/core.sibilant:185:21 */
      
        return arguments[0].concat([ arguments[1], replace__BANG(content[arguments[1]]) ]);
      }), []));
    } else if (((content) && typeof (content) === "object" && (content).constructor.name === "Array")) {
      return sibilant.macros.namespaces.core.list.apply(this, map(content, replace__BANG));
    } else if (typeof content === "undefined") {
      return "undefined";
    } else {
      return JSON.stringify(content);
    }
  }).call(this);
});
var prettyLogAndReturn = (function prettyLogAndReturn$(content) {
  /* pretty-log-and-return /Users/jbr/code/sibilant/src/core.sibilant:197:0 */

  console.log(sibilant.prettyPrint(content));
  return content;
});
sibilant.macros.namespaces.core.quote = (function sibilant$macros$namespaces$core$quote$(content) {
  /* ^quote /Users/jbr/code/sibilant/src/core.sibilant:201:0 */

  var unquotes = findUnquotes(content);
  return (function() {
    if (typeof content === "string") {
      return ("\"" + qescape(content) + "\"");
    } else if (typeof content === "number") {
      return sibilant.macros.namespaces.core.quote(content.toString());
    } else if (node__QUERY(content, "literal", "otherChar")) {
      return [ "\"", transpile(content), "\"" ];
    } else if (Object.keys(unquotes).length) {
      return replace__BANG(content, unquotes);
    } else if (node__QUERY(content, "expression")) {
      return [ "\"", mapNode(transpile(content), qescape), "\"" ];
    } else if (node__QUERY(content, "bracket")) {
      return sibilant.macros.namespaces.core.list.apply(this, map(content.contents, sibilant.macros.namespaces.core.quote));
    } else if (node__QUERY(content, "brace")) {
      return sibilant.macros.namespaces.core.hash.apply(this, map(content.contents, sibilant.macros.namespaces.core.quote));
    } else {
      console.log(("unknown content" + inspect(content)));
      return content;
    }
  }).call(this);
});
sibilant.macros.namespaces.core.debug = (function sibilant$macros$namespaces$core$debug$(val) {
  /* ^debug /Users/jbr/code/sibilant/src/core.sibilant:224:0 */

  sibilant.debug = eval(outputFormatter(transpile(val)));
  return null;
});
sibilant.macros.namespaces.core.expandQuote = (function sibilant$macros$namespaces$core$expandQuote$(node, expansions) {
  /* ^expand-quote /Users/jbr/code/sibilant/src/core.sibilant:227:0 */

  return transpile(mapNodeForQuoteExpansion((function() {
    if (node__QUERY(node)) {
      return node;
    } else {
      return sibilant.nodeCache[node];
    }
  }).call(this), expansions));
});
sibilant.macros.namespaces.core.list = (function sibilant$macros$namespaces$core$list$(args) {
  /* ^list /Users/jbr/code/sibilant/src/core.sibilant:233:0 */

  var args = Array.prototype.slice.call(arguments, 0);

  var argSegments = [];
  return (function() {
    if (0 === args.length) {
      return "[]";
    } else {
      var simpleList = (function simpleList$(args) {
        /* simple-list /Users/jbr/code/sibilant/src/core.sibilant:237:12 */
      
        return [ "[ ", interleave(", ", map(args, (function(arg) {
          /* /Users/jbr/code/sibilant/src/core.sibilant:238:50 */
        
          return arg.transpiled;
        }))), " ]" ];
      });
      args.forEach((function(arg) {
        /* /Users/jbr/code/sibilant/src/core.sibilant:240:27 */
      
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
        /* /Users/jbr/code/sibilant/src/core.sibilant:246:38 */
      
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
  /* ^call /Users/jbr/code/sibilant/src/core.sibilant:256:0 */

  var args = Array.prototype.slice.call(arguments, 1);

  return (function() {
    if (any__QUERY(args, (function() {
      /* /Users/jbr/code/sibilant/src/core.sibilant:257:20 */
    
      return node__QUERY(arguments[0], "dots");
    }))) {
      return macros.apply(fnName, macros.list.apply(this, args));
    } else {
      return [ transpile(fnName), "(", interleave(", ", map(args, transpile)), ")" ];
    }
  }).call(this);
});
sibilant.macros.namespaces.core.dots = (function sibilant$macros$namespaces$core$dots$(contents) {
  /* ^dots /Users/jbr/code/sibilant/src/core.sibilant:262:0 */

  var contents = Array.prototype.slice.call(arguments, 0);

  return transpile(contents);
});
sibilant.macros.namespaces.core.include = (function sibilant$macros$namespaces$core$include$(files) {
  /* ^include /Users/jbr/code/sibilant/src/core.sibilant:265:0 */

  var files = Array.prototype.slice.call(arguments, 0);

  return interleave(files.map((function(file) {
    /* /Users/jbr/code/sibilant/src/core.sibilant:267:17 */
  
    return sibilant.withDefaultSearchPath((function() {
      /* /Users/jbr/code/sibilant/src/core.sibilant:269:20 */
    
      return sibilant.include(eval(outputFormatter(transpile(file))));
    }));
  })), "\n");
});
sibilant.macros.namespaces.core.docs = (function sibilant$macros$namespaces$core$docs$(options) {
  /* ^docs /Users/jbr/code/sibilant/src/core.sibilant:276:0 */

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
    /* /Users/jbr/code/sibilant/src/core.sibilant:287:23 */
  
    return optionsHash[outputFormatter(transpile(key))] = value;
  }));
  [ "examples", "references" ].forEach((function(listAttribute) {
    /* /Users/jbr/code/sibilant/src/core.sibilant:290:5 */
  
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
    if (optionsHash.hasOwnProperty("tags")) {
      return optionsHash.tags = eval(outputFormatter(transpile(sibilant.macros.namespaces.core.quote(optionsHash.tags))));
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