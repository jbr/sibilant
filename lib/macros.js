var macros = {  };
(sibilant)["macros"] = macros;
(sibilant)["debug"] = false;
var recurseIndent = (function recurseIndent$(args) {
  /* recurse-indent /Users/jbr/code/sibilant/src/macros.sibilant:5:0 */

  var args = Array.prototype.slice.call(arguments, 0);

  return map(args, (function(arg) {
    /* /Users/jbr/code/sibilant/src/macros.sibilant:7:10 */
  
    return (function() {
      if (node__QUERY(arg)) {
        (arg)["contents"] = recurseIndent.apply(this, compact(flatten(arg.contents)));
        return arg;
      } else if (((arg) && typeof (arg) === "object" && (arg).constructor.name === "Array")) {
        return recurseIndent.apply(this, arg);
      } else if ((typeof arg === "number")) {
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
  /* indent /Users/jbr/code/sibilant/src/macros.sibilant:18:0 */

  var args = Array.prototype.slice.call(arguments, 0);

  return [ "\n  ", recurseIndent(args), "\n" ];
});
var escapeRegex = (function escapeRegex$(string) {
  /* escape-regex /Users/jbr/code/sibilant/src/macros.sibilant:22:0 */

  return string.replace((new RegExp("[\\-\\[\\]\\/\\{\\}\\(\\)\\*\\+\\?\\.\\\\\^\\$\\|]", "g")), "\\$&");
});
macros.return = (function macros$return$(token) {
  /* ^return /Users/jbr/code/sibilant/src/macros.sibilant:25:0 */

  (function() {
    if (sibilant.debug) {
      return console.log("returning ", prettify(token));
    }
  })();
  var defaultReturn = asStatement([ "return ", transpile(token) ]);
  return (function() {
    if ((token && token.contents && token.contents.length)) {
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
var statement__QUERY = (function statement__QUERY$(transpiled) {
  /* statement? /Users/jbr/code/sibilant/src/macros.sibilant:62:0 */

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
  /* as-statement /Users/jbr/code/sibilant/src/macros.sibilant:68:0 */

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
  /* ^do /Users/jbr/code/sibilant/src/macros.sibilant:75:0 */

  var body = Array.prototype.slice.call(arguments, 0);

  return (function() {
    if ((1 === body.length)) {
      return macros.return((body)[0]);
    } else if (body.length) {
      return [ interleave("\n", map(body.slice(0, -1), (function() {
        /* /Users/jbr/code/sibilant/src/macros.sibilant:77:63 */
      
        return asStatement((arguments)[0]);
      }))), "\n", macros.return((body.slice(-1))[0]) ];
    } else {
      return "";
    }
  })();
});
macros.emptyList = (function macros$emptyList$() {
  /* ^empty-list /Users/jbr/code/sibilant/src/macros.sibilant:82:0 */

  return "null";
});
macros.def = (function macros$def$(fnName, args, body) {
  /* ^def /Users/jbr/code/sibilant/src/macros.sibilant:84:0 */

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
  /* ^macro /Users/jbr/code/sibilant/src/macros.sibilant:92:0 */

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
macros.meta = (function macros$meta$(body) {
  /* ^meta /Users/jbr/code/sibilant/src/macros.sibilant:105:0 */

  var body = Array.prototype.slice.call(arguments, 0);

  var js = outputFormatter(macros.scoped.apply(this, body));
  (function() {
    if (sibilant.debug) {
      return console.log(js);
    }
  })();
  return outputFormatter(eval(js));
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

  (function() {
    if (sibilant.debug) {
      return console.log(argsOrOptions);
    }
  })();
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
      rest = detect(args, (function() {
    /* /Users/jbr/code/sibilant/src/macros.sibilant:134:23 */
  
    return node__QUERY((arguments)[0], "dots");
  }));
  var thisNode = this,
      node = detect([ argsOrOptions.node, thisNode, argsOrOptions.name, args, (body)[0] ], (function(n) {
    /* /Users/jbr/code/sibilant/src/macros.sibilant:139:16 */
  
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
    if (((typeof rest !== "undefined") && (rest !== null))) {
      return indent(asStatement([ "var ", transpile(rest), " = Array.prototype.slice.call(arguments, ", (args.length - 1), ")" ]));
    }
  })(), indent(macros.do.apply(this, body)), "})" ];
});
(macros)["#"] = macros.lambda;
macros.quotedHash = (function macros$quotedHash$(pairs) {
  /* ^quoted-hash /Users/jbr/code/sibilant/src/macros.sibilant:157:0 */

  var pairs = Array.prototype.slice.call(arguments, 0);

  var cachedQuoteValue = macros.hash.quoteKeys;
  (macros.hash)["quoteKeys"] = true;
  var value = macros.hash.apply(this, pairs);
  (macros.hash)["quoteKeys"] = cachedQuoteValue;
  return value;
});
macros.hash = (function macros$hash$(pairs) {
  /* ^hash /Users/jbr/code/sibilant/src/macros.sibilant:164:0 */

  var pairs = Array.prototype.slice.call(arguments, 0);

  (function() {
    if ((1 === (pairs.length % 2))) {
      return error(("odd number of key-value pairs in hash: " + inspect(pairs)));
    }
  })();
  var quoteKeys = macros.hash.quoteKeys,
      pairStrings = bulkMap(pairs, (function(key, value) {
    /* /Users/jbr/code/sibilant/src/macros.sibilant:170:39 */
  
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
  /* qescape /Users/jbr/code/sibilant/src/macros.sibilant:181:0 */

  return (function() {
    if ((!((typeof content !== "undefined") && (content !== null)))) {
      return "";
    } else if (typeof(content) === "string") {
      return content.replace((new RegExp("\"", "g")), "\\\"")
        .replace((new RegExp("\\n", "g")), "\\n\" +\n\"");
    } else {
      return content;
    }
  })();
});
var logPretty = (function logPretty$(label, arg) {
  /* log-pretty /Users/jbr/code/sibilant/src/macros.sibilant:188:0 */

  console.log((label + ": " + prettify(arg)));
  return arg;
});
var prettyLog = logPretty;
macros.quote = (function macros$quote$(content) {
  /* ^quote /Users/jbr/code/sibilant/src/macros.sibilant:194:0 */

  return (function() {
    if (typeof(content) === "string") {
      return ("\"" + qescape(content) + "\"");
    } else if ((typeof content === "number")) {
      return macros.quote(content.toString());
    } else if (node__QUERY(content, "literal")) {
      return [ "\"", transpile(content), "\"" ];
    } else if (node__QUERY(content, "expression")) {
      return (function() {
        if ((Object.keys(findUnquotes(content)))["length"]) {
          return macros.call("macros.expandQuote.call", "this", macros.quote(content.nodeId), macros.quotedHash.apply(this, alternatingKeysAndValues(findUnquotes(content))));
        } else {
          return [ "\"", mapNode(transpile(content), qescape), "\"" ];
        }
      })();
    } else if (node__QUERY(content, "bracket")) {
      return (function() {
        if ((Object.keys(findUnquotes(content)))["length"]) {
          return macros.call("macros.expandQuote.call", "this", macros.quote(content.nodeId), macros.quotedHash.apply(this, alternatingKeysAndValues(findUnquotes(content))));
        } else {
          return macros.list.apply(this, map(content.contents, macros.quote));
        }
      })();
    } else if (node__QUERY(content, "brace")) {
      return (function() {
        if ((Object.keys(findUnquotes(content)))["length"]) {
          return macros.call("macros.expandQuote.call", "this", macros.quote(content.nodeId), macros.quotedHash.apply(this, alternatingKeysAndValues(findUnquotes(content))));
        } else {
          return macros.hash.apply(this, map(content.contents, macros.quote));
        }
      })();
    } else {
      console.log(("unknown content" + prettify(content)));
      return content;
    }
  })();
});
macros.debug = (function macros$debug$(val) {
  /* ^debug /Users/jbr/code/sibilant/src/macros.sibilant:220:0 */

  (sibilant)["debug"] = eval(outputFormatter(transpile(val)));
  return null;
});
var mapNode = (function mapNode$(node, fn) {
  /* map-node /Users/jbr/code/sibilant/src/macros.sibilant:223:0 */

  return (function() {
    if (node__QUERY(node)) {
      var mappedNode = fn(node);
      (function() {
        if (node__QUERY(mappedNode)) {
          return (mappedNode)["contents"] = mapNode(mappedNode.contents, fn);
        }
      })();
      return mappedNode;
    } else if (((node) && typeof (node) === "object" && (node).constructor.name === "Array")) {
      return map(node, (function() {
        /* /Users/jbr/code/sibilant/src/macros.sibilant:232:32 */
      
        return mapNode((arguments)[0], fn);
      }));
    } else {
      return fn(node);
    }
  })();
});
var eachNode = (function eachNode$(node, fn) {
  /* each-node /Users/jbr/code/sibilant/src/macros.sibilant:235:0 */

  return (function() {
    if (node__QUERY(node)) {
      return (function() {
        if (fn(node)) {
          return eachNode(node.contents, fn);
        }
      })();
    } else if (((node) && typeof (node) === "object" && (node).constructor.name === "Array")) {
      return node.forEach((function(c) {
        /* /Users/jbr/code/sibilant/src/macros.sibilant:237:22 */
      
        return eachNode(c, fn);
      }));
    } else {
      return fn(node);
    }
  })();
});
var mapNodeForQuoteExpansion = (function mapNodeForQuoteExpansion$(node, expansions) {
  /* map-node-for-quote-expansion /Users/jbr/code/sibilant/src/macros.sibilant:241:0 */

  return (function() {
    if (node__QUERY(node)) {
      var mappedNode = (function() {
        if (expansions.hasOwnProperty(node.nodeId)) {
          return (expansions)[node.nodeId];
        } else {
          return clone(node);
        }
      })();
      (function() {
        if (node__QUERY(mappedNode)) {
          return (mappedNode)["contents"] = mapNodeForQuoteExpansion(mappedNode.contents, expansions);
        }
      })();
      mappedNode = spliceDots(mappedNode);
      return mappedNode;
    } else if (((node) && typeof (node) === "object" && (node).constructor.name === "Array")) {
      return map(node, (function() {
        /* /Users/jbr/code/sibilant/src/macros.sibilant:252:21 */
      
        return mapNodeForQuoteExpansion((arguments)[0], expansions);
      }));
    } else {
      return node;
    }
  })();
});
macros.expandQuote = (function macros$expandQuote$(nodeId, expansions) {
  /* ^expand-quote /Users/jbr/code/sibilant/src/macros.sibilant:257:0 */

  var expandedNodes = mapNodeForQuoteExpansion((sibilant.nodeCache)[nodeId], expansions);
  return transpile(expandedNodes);
});
var unquote__QUERY = (function unquote__QUERY$(node) {
  /* unquote? /Users/jbr/code/sibilant/src/macros.sibilant:263:0 */

  return node__QUERY(node, "at");
});
var findUnquotes = (function findUnquotes$(node) {
  /* find-unquotes /Users/jbr/code/sibilant/src/macros.sibilant:265:0 */

  var unquotes = {  };
  eachNode(node, (function(n) {
    /* /Users/jbr/code/sibilant/src/macros.sibilant:267:21 */
  
    (function() {
      if (unquote__QUERY(n)) {
        return (unquotes)[n.nodeId] = transpile(n);
      }
    })();
    return (!node__QUERY(n, "tick"));
  }));
  return unquotes;
});
var spliceDots = (function spliceDots$(node) {
  /* splice-dots /Users/jbr/code/sibilant/src/macros.sibilant:273:0 */

  (function() {
    if ((node && ((node.contents) && typeof (node.contents) === "object" && (node.contents).constructor.name === "Array"))) {
      var contents = [];
      node.contents.forEach((function(content) {
        /* /Users/jbr/code/sibilant/src/macros.sibilant:276:11 */
      
        return (function() {
          if ((node__QUERY(content, "dots") && ((content.contents) && typeof (content.contents) === "object" && (content.contents).constructor.name === "Array") && (content.contents.length === 1) && (((content.contents)[0]) && typeof ((content.contents)[0]) === "object" && ((content.contents)[0]).constructor.name === "Array"))) {
            return contents.push.apply(contents, (content.contents)[0]);
          } else {
            return contents.push(content);
          }
        })();
      }));
      return (node)["contents"] = contents;
    }
  })();
  return node;
});
var alternatingKeysAndValues = (function alternatingKeysAndValues$(hash) {
  /* alternating-keys-and-values /Users/jbr/code/sibilant/src/macros.sibilant:288:0 */

  return flatten(map(Object.keys(hash), (function(key) {
    /* /Users/jbr/code/sibilant/src/macros.sibilant:290:19 */
  
    return [ key, (hash)[key] ];
  })));
});
macros.list = (function macros$list$(args) {
  /* ^list /Users/jbr/code/sibilant/src/macros.sibilant:293:0 */

  var args = Array.prototype.slice.call(arguments, 0);

  var argSegments = [];
  return (function() {
    if (((args).length === 0)) {
      return "[]";
    } else {
      var simpleList = (function simpleList$(args) {
        /* simple-list /Users/jbr/code/sibilant/src/macros.sibilant:297:12 */
      
        return [ "[ ", interleave(", ", map(args, (function(arg) {
          /* /Users/jbr/code/sibilant/src/macros.sibilant:298:50 */
        
          return arg.transpiled;
        }))), " ]" ];
      });
      args.forEach((function(arg) {
        /* /Users/jbr/code/sibilant/src/macros.sibilant:300:27 */
      
        return (function() {
          if (node__QUERY(arg, "dots")) {
            return argSegments.push({ transpiled: transpile(arg) });
          } else if ((((argSegments.slice(-1))[0]) && typeof ((argSegments.slice(-1))[0]) === "object" && ((argSegments.slice(-1))[0]).constructor.name === "Array")) {
            return (argSegments.slice(-1))[0].push({ transpiled: transpile(arg) });
          } else {
            return argSegments.push([ { transpiled: transpile(arg) } ]);
          }
        })();
      }));
      argSegments = map(argSegments, (function(segment) {
        /* /Users/jbr/code/sibilant/src/macros.sibilant:306:38 */
      
        return (function() {
          if (((segment) && typeof (segment) === "object" && (segment).constructor.name === "Array")) {
            return simpleList(segment);
          } else {
            return segment.transpiled;
          }
        })();
      }));
      return (function() {
        if ((1 === (argSegments)["length"])) {
          return (argSegments)[0];
        } else {
          return [ (argSegments)[0], ".concat(", interleave(", ", argSegments.slice(1)), ")" ];
        }
      })();
    }
  })();
});
macros.call = (function macros$call$(fnName, args) {
  /* ^call /Users/jbr/code/sibilant/src/macros.sibilant:316:0 */

  var args = Array.prototype.slice.call(arguments, 1);

  return (function() {
    if (any__QUERY(args, (function() {
      /* /Users/jbr/code/sibilant/src/macros.sibilant:317:20 */
    
      return node__QUERY((arguments)[0], "dots");
    }))) {
      return macros.apply(fnName, macros.list.apply(this, args));
    } else {
      return [ transpile(fnName), "(", interleave(", ", map(args, transpile)), ")" ];
    }
  })();
});
macros.dots = (function macros$dots$(contents) {
  /* ^dots /Users/jbr/code/sibilant/src/macros.sibilant:322:0 */

  var contents = Array.prototype.slice.call(arguments, 0);

  return transpile(contents);
});