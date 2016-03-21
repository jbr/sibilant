var tap = (function tap$(item, fn) {
  /* tap src/helpers.sibilant:3:0 */

  fn(item);
  return item;
});
var recurseIndent = (function recurseIndent$(args) {
  /* recurse-indent src/helpers.sibilant:7:0 */

  var args = Array.prototype.slice.call(arguments, 0);

  return map(args, (function(arg) {
    /* src/helpers.sibilant:9:10 */
  
    return (function() {
      if (node__QUERY(arg)) {
        return mergeInto(arg, { contents: recurseIndent.apply(this, compact(flatten(arg.contents))) });
      } else if (((arg) && typeof (arg) === "object" && (arg).constructor.name === "Array")) {
        return recurseIndent.apply(this, arg);
      } else if (typeof arg === "number") {
        return arg.toString();
      } else if (typeof arg === "string") {
        return arg.replace((new RegExp("\\n", "g")), "\n  ").replace((new RegExp("\\n\\s+\\n", "g")), "\n\n");
      } else {
        return arg;
      }
    }).call(this);
  }));
});
var indent = (function indent$(args) {
  /* indent src/helpers.sibilant:24:0 */

  var args = Array.prototype.slice.call(arguments, 0);

  return [ "\n  ", recurseIndent(map(args, transpile)), "\n" ];
});
var escapeRegex = (function escapeRegex$(string) {
  /* escape-regex src/helpers.sibilant:27:0 */

  return string.replace((new RegExp("[\\-\\[\\]\\/\\{\\}\\(\\)\\*\\+\\?\\.\\\\\^\\$\\|]", "g")), "\\$&");
});
var qescape = (function qescape$(content) {
  /* qescape src/helpers.sibilant:30:0 */

  return (function() {
    if (!((typeof content !== "undefined" && content !== null))) {
      return "";
    } else if (typeof content === "string") {
      return content.split("\\\\ "[0]).join("\\\\ ".slice(0, -1)).replace((new RegExp("\"", "g")), "\\\"").replace((new RegExp("\\n", "g")), "\\n\" +\n\"");
    } else {
      return content;
    }
  }).call(this);
});
var mapNode = (function mapNode$(node, fn) {
  /* map-node src/helpers.sibilant:39:0 */

  return (function() {
    if (node__QUERY(node)) {
      var mappedNode = fn(node);
      (function() {
        if (node__QUERY(mappedNode)) {
          return mappedNode.contents = mapNode(mappedNode.contents, fn);
        }
      }).call(this);
      return mappedNode;
    } else if (((node) && typeof (node) === "object" && (node).constructor.name === "Array")) {
      return map(node, (function() {
        /* src/helpers.sibilant:48:32 */
      
        return mapNode(arguments[0], fn);
      }));
    } else {
      return fn(node);
    }
  }).call(this);
});
var eachNode = (function eachNode$(node, fn) {
  /* each-node src/helpers.sibilant:51:0 */

  return (function() {
    if (node__QUERY(node)) {
      return (function() {
        if (fn(node)) {
          return eachNode(node.contents, fn);
        }
      }).call(this);
    } else if (((node) && typeof (node) === "object" && (node).constructor.name === "Array")) {
      return node.forEach((function(c) {
        /* src/helpers.sibilant:53:22 */
      
        return eachNode(c, fn);
      }));
    } else {
      return fn(node);
    }
  }).call(this);
});
var statement__QUERY = (function statement__QUERY$(transpiled) {
  /* statement? src/helpers.sibilant:56:0 */

  return (function() {
    if (node__QUERY(transpiled)) {
      return statement__QUERY(transpiled.contents);
    } else if (((transpiled) && typeof (transpiled) === "object" && (transpiled).constructor.name === "Array")) {
      return statement__QUERY(transpiled.slice(-1)[0]);
    } else if (typeof transpiled === "string") {
      return ";" === transpiled.slice(-1)[0];
    } else {
      return false;
    }
  }).call(this);
});
var asStatement = (function asStatement$(node) {
  /* as-statement src/helpers.sibilant:62:0 */

  var transpiled = transpile(node);
  return (function() {
    if (emptyNode__QUERY(transpiled)) {
      return undefined;
    } else if (statement__QUERY(transpiled)) {
      return transpiled;
    } else {
      return [ transpiled, ";" ];
    }
  }).call(this);
});
var unquote__QUERY = (function unquote__QUERY$(node) {
  /* unquote? src/helpers.sibilant:69:0 */

  return node__QUERY(node, "at");
});
var findUnquotes = (function findUnquotes$(node) {
  /* find-unquotes src/helpers.sibilant:71:0 */

  var unquotes = {  };
  eachNode(node, (function(n) {
    /* src/helpers.sibilant:73:21 */
  
    (function() {
      if (unquote__QUERY(n)) {
        return unquotes[n.nodeId] = transpile(n);
      }
    }).call(this);
    return !(node__QUERY(n, "tick"));
  }));
  return unquotes;
});
var spliceDots = (function spliceDots$(node) {
  /* splice-dots src/helpers.sibilant:79:0 */

  (function() {
    if ((node && ((node.contents) && typeof (node.contents) === "object" && (node.contents).constructor.name === "Array"))) {
      var contents = [];
      node.contents.forEach((function(content) {
        /* src/helpers.sibilant:82:11 */
      
        return (function() {
          if ((node__QUERY(content, "dots") && ((content.contents) && typeof (content.contents) === "object" && (content.contents).constructor.name === "Array") && content.contents.length === 1 && ((content.contents[0]) && typeof (content.contents[0]) === "object" && (content.contents[0]).constructor.name === "Array"))) {
            return contents.push.apply(contents, content.contents[0]);
          } else {
            return contents.push(content);
          }
        }).call(this);
      }));
      return node.contents = contents;
    }
  }).call(this);
  return node;
});
var alternatingKeysAndValues = (function alternatingKeysAndValues$(hash) {
  /* alternating-keys-and-values src/helpers.sibilant:94:0 */

  return flatten(map(Object.keys(hash), (function(key) {
    /* src/helpers.sibilant:96:19 */
  
    return [ key, hash[key] ];
  })));
});
var mapNodeForQuoteExpansion = (function mapNodeForQuoteExpansion$(node, expansions) {
  /* map-node-for-quote-expansion src/helpers.sibilant:99:0 */

  return (function() {
    if (node__QUERY(node)) {
      var mappedNode = (function() {
        if (expansions.hasOwnProperty(node.nodeId)) {
          return expansions[node.nodeId];
        } else {
          return clone(node);
        }
      }).call(this);
      (function() {
        if (node__QUERY(mappedNode)) {
          return mappedNode.contents = mapNodeForQuoteExpansion(mappedNode.contents, expansions);
        }
      }).call(this);
      mappedNode = spliceDots(mappedNode);
      return mappedNode;
    } else if (((node) && typeof (node) === "object" && (node).constructor.name === "Array")) {
      return map(node, (function() {
        /* src/helpers.sibilant:110:19 */
      
        return mapNodeForQuoteExpansion(arguments[0], expansions);
      }));
    } else {
      return node;
    }
  }).call(this);
});
var replace__BANG = (function replace__BANG$(content) {
  /* replace! src/helpers.sibilant:114:0 */

  return (function() {
    if ((node__QUERY(content, "dots") && 3 === content.token.length && node__QUERY(content.contents[0], "at"))) {
      return mergeInto(clone(content), { contents: [ transpile(content.contents[0]) ] });
    } else if (node__QUERY(content, "at")) {
      return transpile(content.contents[0]);
    } else if (node__QUERY(content, "tick")) {
      return JSON.stringify(content);
    } else if (("object" === typeof content && content !== null && content.constructor.name !== "Array")) {
      return sibilant.macros.namespaces.core.hash.apply(this, Object.keys(content).reduce((function() {
        /* src/helpers.sibilant:131:21 */
      
        return arguments[0].concat([ arguments[1], replace__BANG(content[arguments[1]]) ]);
      }), []));
    } else if (((content) && typeof (content) === "object" && (content).constructor.name === "Array")) {
      return sibilant.macros.namespaces.core.list.apply(this, map(content, replace__BANG));
    } else if (typeof content === "undefined") {
      return "undefined";
    } else if (typeof content === "number") {
      return content.toString();
    } else {
      return JSON.stringify(content);
    }
  }).call(this);
});
var node__QUERY = (function node__QUERY$(thing, types) {
  /* node? src/helpers.sibilant:146:0 */

  var types = Array.prototype.slice.call(arguments, 1);

  return ((typeof thing !== "undefined" && thing !== null) && "object" === typeof thing && typeof thing.type === "string" && (0 === types.length || types.indexOf(thing.type) !== -1) && thing.hasOwnProperty("contents"));
});
var emptyNode__QUERY = (function emptyNode__QUERY$(item) {
  /* empty-node? src/helpers.sibilant:154:0 */

  return (function() {
    if (node__QUERY(item)) {
      return emptyNode__QUERY(item.contents);
    } else if (((item) && typeof (item) === "object" && (item).constructor.name === "Array")) {
      return all__QUERY(item, emptyNode__QUERY);
    } else if (typeof item === "string") {
      return item.match((new RegExp("^\\s*$", undefined)));
    } else {
      return (null === item || typeof item === "undefined" || false === item);
    }
  }).call(this);
});
var compactNode = (function compactNode$(item) {
  /* compact-node src/helpers.sibilant:162:0 */

  return (function() {
    if (node__QUERY(item)) {
      item.contents = compactNode(item.contents);
      return (function() {
        if ((item.contents && item.contents.length)) {
          return item;
        } else {
          return null;
        }
      }).call(this);
    } else if (((item) && typeof (item) === "object" && (item).constructor.name === "Array")) {
      var compacted = compact(map(item, compactNode));
      return (function() {
        if ((compacted && compacted.length)) {
          return compacted;
        } else {
          return null;
        }
      }).call(this);
    } else {
      return (function() {
        if ((item === "" || item === false)) {
          return null;
        } else {
          return item;
        }
      }).call(this);
    }
  }).call(this);
});
var generateSymbol = (function generateSymbol$(clue) {
  /* generate-symbol src/helpers.sibilant:172:0 */

  var state = sibilant.state;
  clue = (typeof clue !== "undefined") ? clue : "temp";
  state.symbolCounts = (typeof state.symbolCounts !== "undefined") ? state.symbolCounts : {  };
  var count = ((state.symbolCounts[clue] || 0) + 1);
  state.symbolCounts[clue] = count;
  return [ ("" + clue + "$" + count) ];
});
var makeSymbolClue = (function makeSymbolClue$(node) {
  /* make-symbol-clue src/helpers.sibilant:183:0 */

  return outputFormatter(transpile((function() {
    if ((node__QUERY(node, "expression") && node.contents[0].token === "require")) {
      return node.contents[1];
    } else if (node__QUERY(node, "expression")) {
      return node.contents[0];
    } else {
      return node;
    }
  }).call(this))).replace((new RegExp("[^a-zA-Z]+", "g")), "_").replace((new RegExp("^_|_$", "g")), "");
});
var destructure = (function destructure$(pairs) {
  /* destructure src/helpers.sibilant:193:0 */

  var destructured = [];
  bulkMap(pairs, (function(lhs, rhs) {
    /* src/helpers.sibilant:195:21 */
  
    var transpiledRhs = transpile(rhs);
    return (function() {
      switch(lhs.type) {
      case "bracket":
        var literalRhs__QUERY = outputFormatter(transpiledRhs).match((new RegExp("^[\._a-zA-Z0-9]+$", undefined))),
            source = (function() {
          if (literalRhs__QUERY) {
            return transpiledRhs;
          } else {
            var symbol = generateSymbol(makeSymbolClue(rhs));
            destructured.push([ symbol, transpiledRhs ]);
            return symbol;
          }
        }).call(this);
        lhs.contents.forEach((function(item, index) {
          /* src/helpers.sibilant:205:32 */
        
          return destructured.push([ transpile(item), {
            dir: "src",
            file: "src/helpers.sibilant",
            token: "(",
            type: "expression",
            start: 6778,
            line: 206,
            col: 76,
            length: 1,
            contents: [ {
              dir: "src",
              file: "src/helpers.sibilant",
              token: "get",
              type: "literal",
              start: 6779,
              line: 206,
              col: 77,
              length: 3,
              contents: [],
              specials: 0,
              precedingIgnored: []
            }, source, index ],
            precedingIgnored: [],
            specials: 0,
            end: undefined,
            closed: true,
            closingIgnored: []
          } ]);
        }));
        return (function() {
          if (!(literalRhs__QUERY)) {
            return destructured.push([ source, "undefined" ]);
          }
        }).call(this);
      
      case "brace":
        var literalRhs__QUERY = outputFormatter(transpiledRhs).match((new RegExp("^[\._a-zA-Z0-9]+$", undefined))),
            source = (function() {
          if (literalRhs__QUERY) {
            return transpiledRhs;
          } else if (1 === lhs.contents.length) {
            return [ "(", rhs, ")" ];
          } else {
            var symbol = generateSymbol(makeSymbolClue(rhs));
            destructured.push([ symbol, transpiledRhs ]);
            return symbol;
          }
        }).call(this);
        lhs.contents.forEach((function(item, index) {
          /* src/helpers.sibilant:218:32 */
        
          var trItem = transpile(item);
          return destructured.push([ trItem, {
            dir: "src",
            file: "src/helpers.sibilant",
            token: "(",
            type: "expression",
            start: 7900,
            line: 220,
            col: 67,
            length: 1,
            contents: [ {
              dir: "src",
              file: "src/helpers.sibilant",
              token: "get",
              type: "literal",
              start: 7901,
              line: 220,
              col: 68,
              length: 3,
              contents: [],
              specials: 0,
              precedingIgnored: []
            }, source, [ "\"", trItem, "\"" ] ],
            precedingIgnored: [],
            specials: 0,
            end: undefined,
            closed: true,
            closingIgnored: []
          } ]);
        }));
        return (function() {
          if (!((literalRhs__QUERY || 1 === lhs.contents.length))) {
            return destructured.push([ source, "undefined" ]);
          }
        }).call(this);
      
      default:
        return destructured.push([ transpile(lhs), (function() {
          if (rhs) {
            return transpiledRhs;
          } else {
            return "undefined";
          }
        }).call(this) ]);
      }
    }).call(this);
  }));
  return destructured;
});