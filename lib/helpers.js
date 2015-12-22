var recurseIndent = (function recurseIndent$(args) {
  /* recurse-indent /Users/jbr/code/sibilant/src/helpers.sibilant:1:0 */

  var args = Array.prototype.slice.call(arguments, 0);

  return map(args, (function(arg) {
    /* /Users/jbr/code/sibilant/src/helpers.sibilant:3:10 */
  
    return (function() {
      if (node__QUERY(arg)) {
        return mergeInto(arg, { contents: recurseIndent.apply(this, compact(flatten(arg.contents))) });
      } else if (((arg) && typeof (arg) === "object" && (arg).constructor.name === "Array")) {
        return recurseIndent.apply(this, arg);
      } else if (typeof arg === "number") {
        return arg.toString();
      } else if (typeof arg === "string") {
        return arg.replace((new RegExp("\\n", "g")), "\n  ")
          .replace((new RegExp("\\n\\s+\\n", "g")), "\n\n");
      } else {
        return arg;
      }
    }).call(this);
  }));
});
var indent = (function indent$(args) {
  /* indent /Users/jbr/code/sibilant/src/helpers.sibilant:15:0 */

  var args = Array.prototype.slice.call(arguments, 0);

  return [ "\n  ", recurseIndent(args), "\n" ];
});
var escapeRegex = (function escapeRegex$(string) {
  /* escape-regex /Users/jbr/code/sibilant/src/helpers.sibilant:18:0 */

  return string.replace((new RegExp("[\\-\\[\\]\\/\\{\\}\\(\\)\\*\\+\\?\\.\\\\\^\\$\\|]", "g")), "\\$&");
});
var qescape = (function qescape$(content) {
  /* qescape /Users/jbr/code/sibilant/src/helpers.sibilant:21:0 */

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
  /* map-node /Users/jbr/code/sibilant/src/helpers.sibilant:30:0 */

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
        /* /Users/jbr/code/sibilant/src/helpers.sibilant:39:32 */
      
        return mapNode(arguments[0], fn);
      }));
    } else {
      return fn(node);
    }
  }).call(this);
});
var eachNode = (function eachNode$(node, fn) {
  /* each-node /Users/jbr/code/sibilant/src/helpers.sibilant:42:0 */

  return (function() {
    if (node__QUERY(node)) {
      return (function() {
        if (fn(node)) {
          return eachNode(node.contents, fn);
        }
      }).call(this);
    } else if (((node) && typeof (node) === "object" && (node).constructor.name === "Array")) {
      return node.forEach((function(c) {
        /* /Users/jbr/code/sibilant/src/helpers.sibilant:44:22 */
      
        return eachNode(c, fn);
      }));
    } else {
      return fn(node);
    }
  }).call(this);
});
var statement__QUERY = (function statement__QUERY$(transpiled) {
  /* statement? /Users/jbr/code/sibilant/src/helpers.sibilant:47:0 */

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
  /* as-statement /Users/jbr/code/sibilant/src/helpers.sibilant:53:0 */

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
  /* unquote? /Users/jbr/code/sibilant/src/helpers.sibilant:60:0 */

  return node__QUERY(node, "at");
});
var findUnquotes = (function findUnquotes$(node) {
  /* find-unquotes /Users/jbr/code/sibilant/src/helpers.sibilant:62:0 */

  var unquotes = {  };
  eachNode(node, (function(n) {
    /* /Users/jbr/code/sibilant/src/helpers.sibilant:64:21 */
  
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
  /* splice-dots /Users/jbr/code/sibilant/src/helpers.sibilant:70:0 */

  (function() {
    if ((node && ((node.contents) && typeof (node.contents) === "object" && (node.contents).constructor.name === "Array"))) {
      var contents = [];
      node.contents.forEach((function(content) {
        /* /Users/jbr/code/sibilant/src/helpers.sibilant:73:11 */
      
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
  /* alternating-keys-and-values /Users/jbr/code/sibilant/src/helpers.sibilant:85:0 */

  return flatten(map(Object.keys(hash), (function(key) {
    /* /Users/jbr/code/sibilant/src/helpers.sibilant:87:19 */
  
    return [ key, hash[key] ];
  })));
});
var mapNodeForQuoteExpansion = (function mapNodeForQuoteExpansion$(node, expansions) {
  /* map-node-for-quote-expansion /Users/jbr/code/sibilant/src/helpers.sibilant:90:0 */

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
        /* /Users/jbr/code/sibilant/src/helpers.sibilant:101:21 */
      
        return mapNodeForQuoteExpansion(arguments[0], expansions);
      }));
    } else {
      return node;
    }
  }).call(this);
});