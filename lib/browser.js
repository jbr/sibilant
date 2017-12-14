//# sourceMappingURL=../maps/browser.map
;
this.sibilant = (function() {
  /* src/browser.sibilant:4:5 */

  var sibilant = {  },
      exports = sibilant;
  var error = (function error$(str) {
    /* error src/browser.sibilant:6:6 */
  
    throw str
  });
  var inspect = (function inspect$(item) {
    /* inspect src/browser.sibilant:7:6 */
  
    return (function() {
      if (item.toSource) {
        return item.toSource();
      } else {
        return item.toString();
      }
    }).call(this);
  });
  var bulkMap = (function bulkMap$(arr, fn) {
    /* bulk-map include/functional.sibilant:1:0 */
  
    var index = 0,
        groupSize = fn.length,
        retArr = [];
    (function() {
      var while$5 = undefined;
      while (index < arr.length) {
        while$5 = (function() {
          retArr.push(fn.apply(this, arr.slice(index, (index + groupSize))));
          return index += groupSize;
        }).call(this);
      };
      return while$5;
    }).call(this);
    return retArr;
  });
  var inject = (function inject$(start, items, fn) {
    /* inject include/functional.sibilant:13:0 */
  
    return (function() {
      if ((items && "object" === typeof items && "Array" === items.constructor.name)) {
        return items.reduce(fn, start);
      } else {
        return start;
      }
    }).call(this);
  });
  var map = (function map$(items, fn) {
    /* map include/functional.sibilant:18:0 */
  
    return (function() {
      if ((items && "object" === typeof items && "Array" === items.constructor.name)) {
        return items.map(fn);
      } else {
        return [];
      }
    }).call(this);
  });
  var select = (function select$(items, fn) {
    /* select include/functional.sibilant:23:0 */
  
    return (function() {
      if ((items && "object" === typeof items && "Array" === items.constructor.name)) {
        return items.filter(fn);
      } else {
        return [];
      }
    }).call(this);
  });
  var detect = (function detect$(items, fn) {
    /* detect include/functional.sibilant:28:0 */
  
    return (function() {
      if ((items && "object" === typeof items && "Array" === items.constructor.name)) {
        return items.find(fn);
      }
    }).call(this);
  });
  var all__QUERY = (function all__QUERY$(items, fn) {
    /* all? include/functional.sibilant:32:0 */
  
    return (function() {
      if ((items && "object" === typeof items && "Array" === items.constructor.name)) {
        return items.every(fn);
      }
    }).call(this);
  });
  var none__QUERY = (function none__QUERY$(items, fn) {
    /* none? include/functional.sibilant:36:0 */
  
    return (function() {
      if ((items && "object" === typeof items && "Array" === items.constructor.name)) {
        return !(items.some(fn));
      }
    }).call(this);
  });
  var any__QUERY = (function any__QUERY$(items, fn) {
    /* any? include/functional.sibilant:40:0 */
  
    return (function() {
      if ((items && "object" === typeof items && "Array" === items.constructor.name)) {
        return items.some(fn);
      }
    }).call(this);
  });
  var reject = (function reject$(items, fn) {
    /* reject include/functional.sibilant:44:0 */
  
    return select(items, (function() {
      /* include/functional.sibilant:45:16 */
    
      return !(fn.apply(this, arguments));
    }));
  });
  var compact = (function compact$(arr) {
    /* compact include/functional.sibilant:48:0 */
  
    return select(arr, (function(item) {
      /* include/functional.sibilant:49:17 */
    
      return (null !== item && false !== item && typeof item !== "undefined");
    }));
  });
  var unique = (function unique$(arr) {
    /* unique include/functional.sibilant:55:0 */
  
    return inject([], arr, (function(coll, item) {
      /* include/functional.sibilant:57:13 */
    
      return (function() {
        if (coll.indexOf(item) !== -1) {
          return coll;
        } else {
          return coll.concat([ item ]);
        }
      }).call(this);
    }));
  });
  var interleave = (function interleave$(glue, arr) {
    /* interleave include/functional.sibilant:63:0 */
  
    (function() {
      if ((typeof arr === "string" && (glue && "object" === typeof glue && "Array" === glue.constructor.name))) {
        var temp = glue;
        glue = arr;
        return arr = temp;
      }
    }).call(this);
    return (function() {
      if ((glue && "object" === typeof glue && "Array" === glue.constructor.name)) {
        return inject([], arr, (function(collector, item, index) {
          /* include/functional.sibilant:69:13 */
        
          return collector.concat([ item, glue[index] ]);
        }));
      } else {
        return inject([ arr[0] ], arr.slice(1), (function(collector, item, index) {
          /* include/functional.sibilant:73:13 */
        
          return collector.concat([ glue, item ]);
        }));
      }
    }).call(this);
  });
  var flatten = (function flatten$(items, predicate) {
    /* flatten include/functional.sibilant:76:0 */
  
    return (function() {
      if ((items && "object" === typeof items && "Array" === items.constructor.name)) {
        return inject([], items, (function(collector, item) {
          /* include/functional.sibilant:79:17 */
        
          return (function() {
            if ((!(predicate) || predicate(item))) {
              return collector.concat((function() {
                if ((item && "object" === typeof item && "Array" === item.constructor.name)) {
                  return flatten(item, predicate);
                } else {
                  return item;
                }
              }).call(this));
            } else {
              return collector;
            }
          }).call(this);
        }));
      } else if ((!(predicate) || predicate(items))) {
        return [ items ];
      } else {
        return [];
      }
    }).call(this);
  });
  var flatCompact = (function flatCompact$(items) {
    /* flat-compact include/functional.sibilant:89:0 */
  
    return flatten(items, (function(item) {
      /* include/functional.sibilant:90:20 */
    
      return (null !== item && false !== item && typeof item !== "undefined");
    }));
  });
  var recurseMap = (function recurseMap$(item, fn) {
    /* recurse-map include/functional.sibilant:96:0 */
  
    return (function() {
      if ((item && "object" === typeof item && "Array" === item.constructor.name)) {
        return map(item, (function(subitem) {
          /* include/functional.sibilant:97:32 */
        
          return recurseMap(subitem, fn);
        }));
      } else {
        return fn(item);
      }
    }).call(this);
  });
  var pluck = (function pluck$(items, attribute) {
    /* pluck include/functional.sibilant:100:0 */
  
    return map(items, (function(item) {
      /* include/functional.sibilant:101:16 */
    
      return item[attribute];
    }));
  });
  var mergeInto = (function mergeInto$(into, from) {
    /* merge-into include/functional.sibilant:103:0 */
  
    return Object.assign(into, from);
  });
  var clone = (function clone$(object) {
    /* clone include/functional.sibilant:106:0 */
  
    return Object.assign({  }, object);
  });
  var values = (function values$(object) {
    /* values include/functional.sibilant:109:0 */
  
    return map(Object.keys(object), (function() {
      /* include/functional.sibilant:110:26 */
    
      return object[arguments[0]];
    }));
  });
  var mapValues = (function mapValues$(object, fn) {
    /* map-values include/functional.sibilant:112:0 */
  
    return inject({  }, Object.keys(object), (function(collector, key, index) {
      /* include/functional.sibilant:114:13 */
    
      collector[key] = fn(object[key], key);
      return collector;
    }));
  });
  var mergeWith = (function mergeWith$(into, from) {
    /* merge-with include/functional.sibilant:118:0 */
  
    return Object.assign({  }, into, from);
  });
  var log__BANG = (function log__BANG$(args) {
    /* log! src/colors.sibilant:1:0 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    return inspect__BANG.apply(this, args).forEach((function() {
      /* src/colors.sibilant:2:35 */
    
      return console.log(arguments[0]);
    }));
  });
  var inspect__BANG = (function inspect__BANG$(args) {
    /* inspect! src/colors.sibilant:4:0 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    return args.map((function() {
      /* src/colors.sibilant:5:15 */
    
      return util.inspect(arguments[0], {
        colors: false,
        depth: 3
      });
    }));
  });
  var color = (function color$(code, items, depth) {
    /* color src/colors.sibilant:7:0 */
  
    return (code + items.join("") + "\033[0m");
  });
  var black = (function black$(args) {
    /* black src/colors.sibilant:10:0 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    return color("\033[0;30m", args);
  });
  var red = (function red$(args) {
    /* red src/colors.sibilant:11:0 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    return color("\033[0;31m", args);
  });
  var green = (function green$(args) {
    /* green src/colors.sibilant:12:0 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    return color("\033[0;32m", args);
  });
  var brown = (function brown$(args) {
    /* brown src/colors.sibilant:13:0 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    return color("\033[0;33m", args);
  });
  var blue = (function blue$(args) {
    /* blue src/colors.sibilant:14:0 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    return color("\033[0;34m", args);
  });
  var purple = (function purple$(args) {
    /* purple src/colors.sibilant:15:0 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    return color("\033[0;35m", args);
  });
  var cyan = (function cyan$(args) {
    /* cyan src/colors.sibilant:16:0 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    return color("\033[0;36m", args);
  });
  var gray = (function gray$(args) {
    /* gray src/colors.sibilant:17:0 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    return color("\033[0;37m", args);
  });
  var boldGray = (function boldGray$(args) {
    /* bold-gray src/colors.sibilant:18:0 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    return color("\033[1;30m", args);
  });
  var boldRed = (function boldRed$(args) {
    /* bold-red src/colors.sibilant:19:0 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    return color("\033[1;31m", args);
  });
  var boldGreen = (function boldGreen$(args) {
    /* bold-green src/colors.sibilant:20:0 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    return color("\033[1;32m", args);
  });
  var yellow = (function yellow$(args) {
    /* yellow src/colors.sibilant:21:0 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    return color("\033[1;33m", args);
  });
  var boldBlue = (function boldBlue$(args) {
    /* bold-blue src/colors.sibilant:22:0 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    return color("\033[1;34m", args);
  });
  var boldPurple = (function boldPurple$(args) {
    /* bold-purple src/colors.sibilant:23:0 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    return color("\033[1;35m", args);
  });
  var boldCyan = (function boldCyan$(args) {
    /* bold-cyan src/colors.sibilant:24:0 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    return color("\033[1;36m", args);
  });
  var white = (function white$(args) {
    /* white src/colors.sibilant:25:0 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    return color("\033[1;37m", args);
  });
  sibilant.prettyPrint = (function sibilant$prettyPrint$(node, color, entry) {
    /* sibilant.pretty-print src/pretty-printer.sibilant:3:0 */
  
    entry = (typeof entry !== "undefined") ? entry : true;
    color = (typeof color !== "undefined") ? color : true;
    return realNewlines((function() {
      if (node__QUERY(node)) {
        var prettyPrinter = (sibilant.prettyPrint[node.type] || sibilant.prettyPrint.default);
        return prettyPrinter(node, color, entry);
      } else if ((node && "object" === typeof node && "Array" === node.constructor.name)) {
        return ((function() {
          if (color) {
            return black("[");
          } else {
            return "";
          }
        }).call(this) + map(node, (function() {
          /* src/pretty-printer.sibilant:14:28 */
        
          return prettify(arguments[0], color, false);
        })).join((function() {
          if (color) {
            return black(",");
          } else {
            return "";
          }
        }).call(this)) + (function() {
          if (color) {
            return black("]");
          } else {
            return "";
          }
        }).call(this));
      } else if (color) {
        return red(inspect(node));
      } else {
        return realNewlines(inspect(node));
      }
    }).call(this));
  });
  var prettify = sibilant.prettyPrint;
  sibilant.prettyPrint.default = (function sibilant$prettyPrint$default$(node, color, entry) {
    /* sibilant.pretty-print.default src/pretty-printer.sibilant:23:0 */
  
    var mapPretty = (function mapPretty$(attr) {
      /* map-pretty src/pretty-printer.sibilant:24:5 */
    
      var arr = node[attr];
      return (function() {
        if ((arr && arr.length)) {
          return map(arr, (function() {
            /* src/pretty-printer.sibilant:27:27 */
          
            return prettify(arguments[0], color, false);
          })).join("");
        } else {
          return "";
        }
      }).call(this);
    });
    return realNewlines(sibilant.prettyPrint.colorize(node, color, ((function() {
      if (entry) {
        return "";
      } else {
        return mapPretty("precedingIgnored");
      }
    }).call(this) + mapPretty("modifiers") + node.token + mapPretty("contents") + mapPretty("closingIgnored") + ((node.closed && acceptablePairs[node.token]) || ""))));
  });
  sibilant.prettyPrint.root = (function sibilant$prettyPrint$root$(node, color, entry) {
    /* sibilant.pretty-print.root src/pretty-printer.sibilant:39:0 */
  
    return map(node.contents, (function() {
      /* src/pretty-printer.sibilant:41:16 */
    
      return prettify(arguments[0], color, false);
    })).join("\n");
  });
  sibilant.prettyPrint.output = (function sibilant$prettyPrint$output$(node, color) {
    /* sibilant.pretty-print.output src/pretty-printer.sibilant:44:0 */
  
    return ((function() {
      if (color) {
        return black("{");
      } else {
        return "";
      }
    }).call(this) + (function() {
      if ((node.contents && "object" === typeof node.contents && "Array" === node.contents.constructor.name)) {
        return map(node.contents, (function() {
          /* src/pretty-printer.sibilant:48:28 */
        
          return sibilant.prettyPrint.colorize(node, color, prettify(arguments[0], color, false));
        })).join((function() {
          if (color) {
            return black(",");
          } else {
            return "";
          }
        }).call(this));
      } else {
        return sibilant.prettyPrint.colorize(node, color, node.contents);
      }
    }).call(this) + (function() {
      if (color) {
        return black("}");
      } else {
        return "";
      }
    }).call(this));
  });
  var realNewlines = (function realNewlines$(node) {
    /* real-newlines src/pretty-printer.sibilant:54:0 */
  
    return node.split("\\n").join("\n");
  });
  sibilant.prettyPrint.colorize = (function sibilant$prettyPrint$colorize$(node, color, string) {
    /* sibilant.pretty-print.colorize src/pretty-printer.sibilant:59:0 */
  
    return (function() {
      if (!(color)) {
        return string;
      } else if (node.hint === "macro") {
        return yellow(string);
      } else if (node__QUERY(node, "output")) {
        return purple(string);
      } else {
        return green(string);
      }
    }).call(this);
  });
  var outputFormatter = (function outputFormatter$(node) {
    /* output-formatter src/output-formatter.sibilant:1:0 */
  
    return (function() {
      if ((node && "object" === typeof node && "Array" === node.constructor.name)) {
        return map(node, outputFormatter).join("");
      } else if (node__QUERY(node, "output")) {
        return outputFormatter(node.contents);
      } else if ((typeof node === "string" || typeof node === "number")) {
        return node;
      } else if (!((typeof node !== "undefined" && node !== null))) {
        return "";
      } else if (node__QUERY(node)) {
        console.log(("warning: We ran into an unexpected node that never got transpiled at " + node.file + ":" + node.line + ":" + node.col + "."));
        return outputFormatter(transpile(node));
      }
    }).call(this);
  });
  sibilant.outputFormatter = outputFormatter;
  var bulkMap = (function bulkMap$(arr, fn) {
    /* bulk-map include/functional.sibilant:1:0 */
  
    var index = 0,
        groupSize = fn.length,
        retArr = [];
    (function() {
      var while$6 = undefined;
      while (index < arr.length) {
        while$6 = (function() {
          retArr.push(fn.apply(this, arr.slice(index, (index + groupSize))));
          return index += groupSize;
        }).call(this);
      };
      return while$6;
    }).call(this);
    return retArr;
  });
  var inject = (function inject$(start, items, fn) {
    /* inject include/functional.sibilant:13:0 */
  
    return (function() {
      if ((items && "object" === typeof items && "Array" === items.constructor.name)) {
        return items.reduce(fn, start);
      } else {
        return start;
      }
    }).call(this);
  });
  var map = (function map$(items, fn) {
    /* map include/functional.sibilant:18:0 */
  
    return (function() {
      if ((items && "object" === typeof items && "Array" === items.constructor.name)) {
        return items.map(fn);
      } else {
        return [];
      }
    }).call(this);
  });
  var select = (function select$(items, fn) {
    /* select include/functional.sibilant:23:0 */
  
    return (function() {
      if ((items && "object" === typeof items && "Array" === items.constructor.name)) {
        return items.filter(fn);
      } else {
        return [];
      }
    }).call(this);
  });
  var detect = (function detect$(items, fn) {
    /* detect include/functional.sibilant:28:0 */
  
    return (function() {
      if ((items && "object" === typeof items && "Array" === items.constructor.name)) {
        return items.find(fn);
      }
    }).call(this);
  });
  var all__QUERY = (function all__QUERY$(items, fn) {
    /* all? include/functional.sibilant:32:0 */
  
    return (function() {
      if ((items && "object" === typeof items && "Array" === items.constructor.name)) {
        return items.every(fn);
      }
    }).call(this);
  });
  var none__QUERY = (function none__QUERY$(items, fn) {
    /* none? include/functional.sibilant:36:0 */
  
    return (function() {
      if ((items && "object" === typeof items && "Array" === items.constructor.name)) {
        return !(items.some(fn));
      }
    }).call(this);
  });
  var any__QUERY = (function any__QUERY$(items, fn) {
    /* any? include/functional.sibilant:40:0 */
  
    return (function() {
      if ((items && "object" === typeof items && "Array" === items.constructor.name)) {
        return items.some(fn);
      }
    }).call(this);
  });
  var reject = (function reject$(items, fn) {
    /* reject include/functional.sibilant:44:0 */
  
    return select(items, (function() {
      /* include/functional.sibilant:45:16 */
    
      return !(fn.apply(this, arguments));
    }));
  });
  var compact = (function compact$(arr) {
    /* compact include/functional.sibilant:48:0 */
  
    return select(arr, (function(item) {
      /* include/functional.sibilant:49:17 */
    
      return (null !== item && false !== item && typeof item !== "undefined");
    }));
  });
  var unique = (function unique$(arr) {
    /* unique include/functional.sibilant:55:0 */
  
    return inject([], arr, (function(coll, item) {
      /* include/functional.sibilant:57:13 */
    
      return (function() {
        if (coll.indexOf(item) !== -1) {
          return coll;
        } else {
          return coll.concat([ item ]);
        }
      }).call(this);
    }));
  });
  var interleave = (function interleave$(glue, arr) {
    /* interleave include/functional.sibilant:63:0 */
  
    (function() {
      if ((typeof arr === "string" && (glue && "object" === typeof glue && "Array" === glue.constructor.name))) {
        var temp = glue;
        glue = arr;
        return arr = temp;
      }
    }).call(this);
    return (function() {
      if ((glue && "object" === typeof glue && "Array" === glue.constructor.name)) {
        return inject([], arr, (function(collector, item, index) {
          /* include/functional.sibilant:69:13 */
        
          return collector.concat([ item, glue[index] ]);
        }));
      } else {
        return inject([ arr[0] ], arr.slice(1), (function(collector, item, index) {
          /* include/functional.sibilant:73:13 */
        
          return collector.concat([ glue, item ]);
        }));
      }
    }).call(this);
  });
  var flatten = (function flatten$(items, predicate) {
    /* flatten include/functional.sibilant:76:0 */
  
    return (function() {
      if ((items && "object" === typeof items && "Array" === items.constructor.name)) {
        return inject([], items, (function(collector, item) {
          /* include/functional.sibilant:79:17 */
        
          return (function() {
            if ((!(predicate) || predicate(item))) {
              return collector.concat((function() {
                if ((item && "object" === typeof item && "Array" === item.constructor.name)) {
                  return flatten(item, predicate);
                } else {
                  return item;
                }
              }).call(this));
            } else {
              return collector;
            }
          }).call(this);
        }));
      } else if ((!(predicate) || predicate(items))) {
        return [ items ];
      } else {
        return [];
      }
    }).call(this);
  });
  var flatCompact = (function flatCompact$(items) {
    /* flat-compact include/functional.sibilant:89:0 */
  
    return flatten(items, (function(item) {
      /* include/functional.sibilant:90:20 */
    
      return (null !== item && false !== item && typeof item !== "undefined");
    }));
  });
  var recurseMap = (function recurseMap$(item, fn) {
    /* recurse-map include/functional.sibilant:96:0 */
  
    return (function() {
      if ((item && "object" === typeof item && "Array" === item.constructor.name)) {
        return map(item, (function(subitem) {
          /* include/functional.sibilant:97:32 */
        
          return recurseMap(subitem, fn);
        }));
      } else {
        return fn(item);
      }
    }).call(this);
  });
  var pluck = (function pluck$(items, attribute) {
    /* pluck include/functional.sibilant:100:0 */
  
    return map(items, (function(item) {
      /* include/functional.sibilant:101:16 */
    
      return item[attribute];
    }));
  });
  var mergeInto = (function mergeInto$(into, from) {
    /* merge-into include/functional.sibilant:103:0 */
  
    return Object.assign(into, from);
  });
  var clone = (function clone$(object) {
    /* clone include/functional.sibilant:106:0 */
  
    return Object.assign({  }, object);
  });
  var values = (function values$(object) {
    /* values include/functional.sibilant:109:0 */
  
    return map(Object.keys(object), (function() {
      /* include/functional.sibilant:110:26 */
    
      return object[arguments[0]];
    }));
  });
  var mapValues = (function mapValues$(object, fn) {
    /* map-values include/functional.sibilant:112:0 */
  
    return inject({  }, Object.keys(object), (function(collector, key, index) {
      /* include/functional.sibilant:114:13 */
    
      collector[key] = fn(object[key], key);
      return collector;
    }));
  });
  var mergeWith = (function mergeWith$(into, from) {
    /* merge-with include/functional.sibilant:118:0 */
  
    return Object.assign({  }, into, from);
  });
  var parser = {  };
  sibilant.parser = parser;
  parser.tokens = {
    "comment": "(;.*)",
    "string": "(\"(([^\"]|(\\\\\"))*[^\\\\])?\")",
    "number": "(-?[0-9][0-9.,]*)",
    "literal": "(-?[*.$a-zA-Z_][/*.a-zA-Z0-9-_]*(\\?|!)?)",
    "special": "([&'])",
    "at": "@",
    "tick": "[`']",
    "hat": "(\\^)",
    "dots": "(\\.+)",
    "argPlaceholder": "(#[0-9]+)",
    "otherChar": "([\\|#><=!\\+\\/\\*-]+)",
    "openExpression": "(\\(|\\{|\\[)",
    "closeExpression": "(\\)|\\}|\\])",
    "newline": "\\n",
    "whitespace": "\\s+",
    "ignored": "."
  };
  parser.tokens.head = ("(\\.*[*$a-zA-Z_\\|><=\\+\\/\\*-]+" + "[/*.a-zA-Z0-9-_\\|><=\\+\\/\\*-]*" + "(\\?|!)?\\()");
  parser.tokenPrecedence = [ "comment", "string", "number", "tick", "hat", "at", "special", "head", "dots", "literal", "argPlaceholder", "otherChar", "openExpression", "closeExpression", "newline", "whitespace", "ignored" ];
  parser.orderedRegexes = parser.tokenPrecedence.map((function(x) {
    /* src/parser.sibilant:43:23 */
  
    return mergeInto((new RegExp(("^" + parser.tokens[x]), undefined)), { name: x });
  }));
  var orderedRegexes = parser.orderedRegexes;
  parser.parse = (function parser$parse$(string, context) {
    /* parser.parse src/parser.sibilant:48:0 */
  
    context = (typeof context !== "undefined") ? context : {
      position: 0,
      stack: [],
      line: 1,
      lastNewline: 0,
      col: 0
    };
    var match = true,
        regexName = null,
        remainingInput = string;
    (function() {
      var while$7 = undefined;
      while (match) {
        while$7 = (function() {
          detect(orderedRegexes, (function(r) {
            /* src/parser.sibilant:59:20 */
          
            regexName = r.name;
            return match = r.exec(remainingInput);
          }));
          return (function() {
            if ((typeof match !== "undefined" && match !== null)) {
              var matchString = match[0],
                  length = matchString.length;
              context.stack.push({
                file: sibilant.file,
                token: matchString,
                type: regexName,
                line: context.line,
                col: context.col,
                contents: []
              });
              (function() {
                if ("newline" === regexName) {
                  ((context.line)++);
                  context.col = 0;
                  return context.lastNewline = context.position;
                } else if (("string" === regexName && matchString.indexOf("\n") !== -1)) {
                  var stringNewlineCount = (matchString.split("\n").length - 1);
                  context.line += stringNewlineCount;
                  return context.col = (length - matchString.lastIndexOf("\n"));
                } else {
                  return context.col += length;
                }
              }).call(this);
              context.position += length;
              return remainingInput = (function() {
                if ((remainingInput && remainingInput.length)) {
                  return remainingInput.slice(length);
                } else {
                  return "";
                }
              }).call(this);
            }
          }).call(this);
        }).call(this);
      };
      return while$7;
    }).call(this);
    return context.stack;
  });
  var parse = parser.parse;
  var acceptablePairs = {
    "(": ")",
    "[": "]",
    "{": "}"
  },
      bracketTypes = {
    "(": "expression",
    "[": "bracket",
    "{": "brace"
  };
  var restructure = (function restructure$(input) {
    /* restructure src/restructurer.sibilant:6:0 */
  
    var output = {
      type: "root",
      contents: [],
      file: sibilant.file,
      col: 0,
      line: 1
    },
        context = {
      parseStack: [ output ],
      output: output,
      input: input,
      ignoredNodes: [],
      specials: 0
    };
    inject(context, input, restructurers);
    (function() {
      if (!(1 === context.parseStack.length)) {
        var unclosedNode = context.parseStack[0];
        throw (new Error(("unclosed node at " + unclosedNode.file + ":" + unclosedNode.line + ":" + unclosedNode.col + "\n  " + prettify(unclosedNode, false).slice(0, 100))))
      }
    }).call(this);
    return output;
  });
  var restructurers = (function restructurers$(context, node) {
    /* restructurers src/restructurer.sibilant:29:0 */
  
    var restructurer = (restructurers[node.type] || restructurers.default);
    return restructurer(node, context);
  });
  sibilant.restructure = restructure;
  restructurers.head = (function restructurers$head$(node, context) {
    /* restructurers.head src/restructurer.sibilant:35:0 */
  
    var head = mergeWith(node, {
      token: node.token.slice(0, -1),
      type: "literal"
    }),
        expression = mergeWith(node, {
      token: "(",
      type: "openExpression"
    });
    return restructurers(restructurers(context, expression), head);
  });
  restructurers.openExpression = (function restructurers$openExpression$(node, context) {
    /* restructurers.open-expression src/restructurer.sibilant:44:42 */
  
    var first = context.parseStack[0];
    node.contents = [];
    node.type = bracketTypes[node.token];
    acceptIgnoredNodes(node, context);
    acceptSpecials(node, context);
    first.contents.push(node);
    context.parseStack.unshift(node);
    return context;
  });
  restructurers.closeExpression = (function restructurers$closeExpression$(node, context) {
    /* restructurers.close-expression src/restructurer.sibilant:56:0 */
  
    var first = context.parseStack[0];
    (function() {
      if (node__QUERY(first, "root")) {
        throw (new Error(("unexpected " + node.token + " on " + node.file + ":" + node.line + ":" + node.col)))
      }
    }).call(this);
    (function() {
      if (acceptablePairs[first.token] !== node.token) {
        throw (new Error(("trying to close " + yellow(sibilant.prettyPrint(first)) + "\n   on " + first.file + ":" + first.line + ":" + first.col + "\n   with " + sibilant.prettyPrint(node) + "\n   on " + node.file + ":" + node.line + ":" + node.col + "\n")))
      }
    }).call(this);
    first.end = node.end;
    first.closed = true;
    first.closingIgnored = context.ignoredNodes;
    context.ignoredNodes = [];
    context.parseStack.shift();
    closeSpecials(first, context);
    (function() {
      if (context.parseStack.length === 0) {
        throw (new Error(("unbalanced parens:\n" + inspect(parseStack))))
      }
    }).call(this);
    return context;
  });
  var openSpecial = (function openSpecial$(node, context) {
    /* open-special src/restructurer.sibilant:81:0 */
  
    ((context.specials)++);
    acceptIgnoredNodes(node, context);
    var first = context.parseStack[0];
    node.contents = [];
    first.contents.push(node);
    context.parseStack.unshift(node);
    return context;
  });
  var acceptSpecials = (function acceptSpecials$(node, context) {
    /* accept-specials src/restructurer.sibilant:94:0 */
  
    node.specials = context.specials;
    context.specials = 0;
    return context;
  });
  var acceptIgnoredNodes = (function acceptIgnoredNodes$(node, context) {
    /* accept-ignored-nodes src/restructurer.sibilant:99:0 */
  
    node.precedingIgnored = context.ignoredNodes;
    context.ignoredNodes = [];
    return context;
  });
  var closeSpecials = (function closeSpecials$(node, context) {
    /* close-specials src/restructurer.sibilant:104:0 */
  
    (function() {
      if (node.specials > 0) {
        ((node.specials)--);
        context.parseStack.shift();
        return closeSpecials(node, context);
      }
    }).call(this);
    return context;
  });
  var accumulateIgnoredNode = (function accumulateIgnoredNode$(node, context) {
    /* accumulate-ignored-node src/restructurer.sibilant:112:0 */
  
    context.ignoredNodes.push(node);
    return context;
  });
  [ "hat", "dots", "tick", "at" ].forEach((function(special) {
    /* src/restructurer.sibilant:116:0 */
  
    return restructurers[special] = openSpecial;
  }));
  [ "whitespace", "newline", "ignored", "comment" ].forEach((function(ignored) {
    /* src/restructurer.sibilant:119:0 */
  
    return restructurers[ignored] = accumulateIgnoredNode;
  }));
  restructurers.default = (function restructurers$default$(node, context) {
    /* restructurers.default src/restructurer.sibilant:122:0 */
  
    acceptSpecials(node, context);
    acceptIgnoredNodes(node, context);
    context.parseStack[0].contents.push(node);
    return closeSpecials(node, context);
  });
  var coreNamespace = {  },
      macroNamespaces = { core: coreNamespace };
  sibilant.state = {
    symbolCount: 0,
    functionComments: true
  };
  sibilant.macros = {
    "namespaces": macroNamespaces,
    "defaultSearchPath": [ "core" ],
    "searchPath": [ "core" ],
    "namespace": coreNamespace
  };
  var namespace = sibilant.macros.namespace,
      macros = sibilant.macros.namespace;
  sibilant.macros.currentNamespace = (function sibilant$macros$currentNamespace$() {
    /* sibilant.macros.current-namespace src/precompiled-macros.sibilant:15:0 */
  
    return sibilant.macros.namespaces[sibilant.macros.searchPath[0]];
  });
  sibilant.resolveMacro = (function sibilant$resolveMacro$(macroName) {
    /* sibilant.resolve-macro src/precompiled-macros.sibilant:18:0 */
  
    return (function() {
      if ((macroName.indexOf("/") !== -1 && 1 < macroName.length && !(macroName.indexOf("\n") !== -1))) {
        var pathComponents = macroName.split("/"),
            macro = (sibilant.macros.namespaces.hasOwnProperty(pathComponents[0]) && sibilant.macros.namespaces[pathComponents[0]][pathComponents.slice(1).join("/")]);
        return (function() {
          if (macro) {
            return macro;
          } else {
            return error(("called namespaced macro " + macroName + " but could not find namespace " + pathComponents[0] + ". you might need to include the file that defines it first."));
          }
        }).call(this);
      } else {
        var namespace = detect(sibilant.macros.searchPath, (function(namespace) {
          /* src/precompiled-macros.sibilant:30:33 */
        
          return sibilant.macros.namespaces[namespace].hasOwnProperty(macroName);
        }));
        return (function() {
          if (namespace) {
            return sibilant.macros.namespaces[namespace][macroName];
          }
        }).call(this);
      }
    }).call(this);
  });
  sibilant.withDefaultSearchPath = (function sibilant$withDefaultSearchPath$(fn) {
    /* sibilant.with-default-search-path src/precompiled-macros.sibilant:35:0 */
  
    var searchPathBefore = sibilant.macros.searchPath;
    sibilant.macros.searchPath = sibilant.macros.defaultSearchPath;
    var returnValue = fn();
    sibilant.macros.searchPath = searchPathBefore;
    return returnValue;
  });
  sibilant.macros.namespaces.core.case = (function case$(subject, cases) {
    /* case src/macros/case.sibilant:1:0 */
  
    var cases = Array.prototype.slice.call(arguments, 1);
  
    return {
      file: "src/macros/case.sibilant",
      token: "(",
      type: "expression",
      line: 2,
      col: 8,
      contents: [ {
        file: "src/macros/case.sibilant",
        token: "if",
        type: "literal",
        line: 2,
        col: 9,
        contents: [],
        specials: 0,
        precedingIgnored: []
      } ].concat(flatten(bulkMap(cases, (function(predicate, body) {
        /* src/macros/case.sibilant:3:30 */
      
        return (function() {
          if (body) {
            return [ {
              file: "src/macros/case.sibilant",
              token: "(",
              type: "expression",
              line: 5,
              col: 38,
              contents: [ {
                file: "src/macros/case.sibilant",
                token: "|>",
                type: "otherChar",
                line: 5,
                col: 39,
                contents: [],
                specials: 0,
                precedingIgnored: []
              }, subject, predicate ],
              precedingIgnored: [],
              specials: 0,
              end: undefined,
              closed: true,
              closingIgnored: []
            }, body ];
          } else {
            return predicate;
          }
        }).call(this);
      })))),
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core[">"] = (function $$(args) {
    /* > src/macros/comparison.sibilant:3:0 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    var jsComparator = ">";
    return {
      file: "src/macros/comparison.sibilant",
      token: "(",
      type: "expression",
      line: 5,
      col: 8,
      contents: [ {
        file: "src/macros/comparison.sibilant",
        token: "and",
        type: "literal",
        line: 5,
        col: 9,
        contents: [],
        specials: 0,
        precedingIgnored: []
      } ].concat(map(args.slice(0, -1), (function(item, index) {
        /* src/macros/comparison.sibilant:6:22 */
      
        return [ item, " ", jsComparator, " ", args[(1 + index)] ];
      }))),
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core["<"] = (function $$(args) {
    /* < src/macros/comparison.sibilant:10:0 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    var jsComparator = "<";
    return {
      file: "src/macros/comparison.sibilant",
      token: "(",
      type: "expression",
      line: 12,
      col: 8,
      contents: [ {
        file: "src/macros/comparison.sibilant",
        token: "and",
        type: "literal",
        line: 12,
        col: 9,
        contents: [],
        specials: 0,
        precedingIgnored: []
      } ].concat(map(args.slice(0, -1), (function(item, index) {
        /* src/macros/comparison.sibilant:13:22 */
      
        return [ item, " ", jsComparator, " ", args[(1 + index)] ];
      }))),
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core["<="] = (function $$(args) {
    /* <= src/macros/comparison.sibilant:16:0 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    var jsComparator = "<=";
    return {
      file: "src/macros/comparison.sibilant",
      token: "(",
      type: "expression",
      line: 18,
      col: 8,
      contents: [ {
        file: "src/macros/comparison.sibilant",
        token: "and",
        type: "literal",
        line: 18,
        col: 9,
        contents: [],
        specials: 0,
        precedingIgnored: []
      } ].concat(map(args.slice(0, -1), (function(item, index) {
        /* src/macros/comparison.sibilant:19:22 */
      
        return [ item, " ", jsComparator, " ", args[(1 + index)] ];
      }))),
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core[">="] = (function $$(args) {
    /* >= src/macros/comparison.sibilant:22:0 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    var jsComparator = ">=";
    return {
      file: "src/macros/comparison.sibilant",
      token: "(",
      type: "expression",
      line: 24,
      col: 8,
      contents: [ {
        file: "src/macros/comparison.sibilant",
        token: "and",
        type: "literal",
        line: 24,
        col: 9,
        contents: [],
        specials: 0,
        precedingIgnored: []
      } ].concat(map(args.slice(0, -1), (function(item, index) {
        /* src/macros/comparison.sibilant:25:22 */
      
        return [ item, " ", jsComparator, " ", args[(1 + index)] ];
      }))),
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core["!="] = (function $$(args) {
    /* != src/macros/comparison.sibilant:27:0 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    var jsComparator = "!==";
    return {
      file: "src/macros/comparison.sibilant",
      token: "(",
      type: "expression",
      line: 29,
      col: 8,
      contents: [ {
        file: "src/macros/comparison.sibilant",
        token: "and",
        type: "literal",
        line: 29,
        col: 9,
        contents: [],
        specials: 0,
        precedingIgnored: []
      } ].concat(map(args.slice(0, -1), (function(item, index) {
        /* src/macros/comparison.sibilant:30:22 */
      
        return [ item, " ", jsComparator, " ", args[(1 + index)] ];
      }))),
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core["="] = (function $$(args) {
    /* = src/macros/comparison.sibilant:33:0 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    var jsComparator = "===";
    return {
      file: "src/macros/comparison.sibilant",
      token: "(",
      type: "expression",
      line: 35,
      col: 8,
      contents: [ {
        file: "src/macros/comparison.sibilant",
        token: "and",
        type: "literal",
        line: 35,
        col: 9,
        contents: [],
        specials: 0,
        precedingIgnored: []
      } ].concat(map(args.slice(0, -1), (function(item, index) {
        /* src/macros/comparison.sibilant:36:22 */
      
        return [ item, " ", jsComparator, " ", args[(1 + index)] ];
      }))),
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core.ternary = (function ternary$(cond, ifTrue, ifFalse) {
    /* ternary src/macros/flow-control.sibilant:9:0 */
  
    return [ "(", transpile(cond), ") ? ", transpile(ifTrue), " : ", transpile(ifFalse) ];
  });
  sibilant.macros.namespaces.core.when = (function when$(condition, body) {
    /* when src/macros/flow-control.sibilant:21:0 */
  
    var body = Array.prototype.slice.call(arguments, 1);
  
    return sibilant.macros.namespaces.core._scopedWithoutReturn("if (", condition, ") {", indent({
      file: "src/macros/flow-control.sibilant",
      token: "(",
      type: "expression",
      line: 24,
      col: 18,
      contents: [ {
        file: "src/macros/flow-control.sibilant",
        token: "do",
        type: "literal",
        line: 24,
        col: 19,
        contents: [],
        specials: 0,
        precedingIgnored: []
      } ].concat(body),
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    }), "}");
  });
  sibilant.macros.namespaces.core.unless = (function unless$(condition, body) {
    /* unless src/macros/flow-control.sibilant:33:0 */
  
    var body = Array.prototype.slice.call(arguments, 1);
  
    return [ "(function() {", indent([ "if (", {
      file: "src/macros/flow-control.sibilant",
      token: "(",
      type: "expression",
      line: 35,
      col: 25,
      contents: [ {
        file: "src/macros/flow-control.sibilant",
        token: "not",
        type: "literal",
        line: 35,
        col: 26,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, condition ],
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    }, ") {", indent({
      file: "src/macros/flow-control.sibilant",
      token: "(",
      type: "expression",
      line: 36,
      col: 33,
      contents: [ {
        file: "src/macros/flow-control.sibilant",
        token: "do",
        type: "literal",
        line: 36,
        col: 34,
        contents: [],
        specials: 0,
        precedingIgnored: []
      } ].concat(body),
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    }), "}" ]), "}).call(this)" ];
  });
  sibilant.macros.namespaces.core.if = (function if$(alternatingConditionsAndBranches) {
    /* if src/macros/flow-control.sibilant:58:0 */
  
    var alternatingConditionsAndBranches = Array.prototype.slice.call(arguments, 0);
  
    return [ "(function() {", indent(interleave(" else ", bulkMap(alternatingConditionsAndBranches, (function(cond, val) {
      /* src/macros/flow-control.sibilant:63:25 */
    
      return (function() {
        if (typeof val !== "undefined") {
          return [ "if (", transpile(cond), ") {", indent({
            file: "src/macros/flow-control.sibilant",
            token: "(",
            type: "expression",
            line: 66,
            col: 44,
            contents: [ {
              file: "src/macros/flow-control.sibilant",
              token: "do",
              type: "literal",
              line: 66,
              col: 45,
              contents: [],
              specials: 0,
              precedingIgnored: []
            }, val ],
            precedingIgnored: [],
            specials: 0,
            end: undefined,
            closed: true,
            closingIgnored: []
          }), "}" ];
        } else {
          return [ "{", indent({
            file: "src/macros/flow-control.sibilant",
            token: "(",
            type: "expression",
            line: 68,
            col: 47,
            contents: [ {
              file: "src/macros/flow-control.sibilant",
              token: "do",
              type: "literal",
              line: 68,
              col: 48,
              contents: [],
              specials: 0,
              precedingIgnored: []
            }, cond ],
            precedingIgnored: [],
            specials: 0,
            end: undefined,
            closed: true,
            closingIgnored: []
          }), "}" ];
        }
      }).call(this);
    })))), "}).call(this)" ];
  });
  sibilant.macros.namespaces.core.quotedHash = (function quotedHash$(pairs) {
    /* quoted-hash src/macros/hash.sibilant:3:0 */
  
    var pairs = Array.prototype.slice.call(arguments, 0);
  
    var cachedQuoteValue = sibilant.quoteHashKeys;
    sibilant.quoteHashKeys = true;
    var value = sibilant.macros.namespaces.core.hash.apply(this, pairs);
    sibilant.quoteHashKeys = cachedQuoteValue;
    return value;
  });
  sibilant.macros.namespaces.core.hash = (function hash$(pairs) {
    /* hash src/macros/hash.sibilant:18:7 */
  
    var pairs = Array.prototype.slice.call(arguments, 0);
  
    pairs = pairs.map((function(p, i) {
      /* src/macros/hash.sibilant:19:32 */
    
      return (function() {
        if ((p.token === "&" && node__QUERY(p, "special"))) {
          var double = pairs[(function() {
            if (0 === (i % 2)) {
              return (1 + i);
            } else {
              return (i - 1);
            }
          }).call(this)];
          return (function() {
            if ((node__QUERY(double, "tick") && double.token === "`")) {
              return double.contents[0];
            } else {
              return double;
            }
          }).call(this);
        } else {
          return p;
        }
      }).call(this);
    }));
    (function() {
      if (1 === (pairs.length % 2)) {
        return error(("odd number of key-value pairs in hash: " + inspect(pairs)));
      }
    }).call(this);
    var pairs_reduce$2 = pairs.reduce((function(o, item, i) {
      /* src/macros/hash.sibilant:32:26 */
    
      return (function() {
        if ((0 === (i % 2) && node__QUERY(item, "tick") && item.token === "`")) {
          return Object.assign({  }, o, { dynamicKeys: o.dynamicKeys.concat([ item.contents[0] ]) });
        } else if ((1 === (o.dynamicKeys.length % 2) && 1 === (i % 2))) {
          return Object.assign({  }, o, { dynamicKeys: o.dynamicKeys.concat([ item ]) });
        } else {
          return Object.assign({  }, o, { staticKeys: o.staticKeys.concat([ item ]) });
        }
      }).call(this);
    }), {
      dynamicKeys: [],
      staticKeys: []
    }),
        dynamicKeys = pairs_reduce$2.dynamicKeys,
        staticKeys = pairs_reduce$2.staticKeys,
        pairs_reduce$2 = undefined;
    var quoteKeys = sibilant.quoteHashKeys,
        pairStrings = bulkMap(staticKeys, (function(key, value) {
      /* src/macros/hash.sibilant:43:47 */
    
      return [ (function() {
        if ((quoteKeys && !(node__QUERY(key, "string")))) {
          return [ "\"", transpile(key), "\"" ];
        } else {
          return transpile(key);
        }
      }).call(this), ": ", transpile(value) ];
    }));
    return (function() {
      if (dynamicKeys.length) {
        var symbol = generateSymbol("hash");
        return {
          file: "src/macros/hash.sibilant",
          token: "(",
          type: "expression",
          line: 53,
          col: 13,
          contents: [ {
            file: "src/macros/hash.sibilant",
            token: "*scoped-without-source",
            type: "literal",
            line: 53,
            col: 14,
            contents: [],
            specials: 0,
            precedingIgnored: []
          }, {
            file: "src/macros/hash.sibilant",
            token: "(",
            type: "expression",
            line: 54,
            col: 14,
            contents: [ {
              file: "src/macros/hash.sibilant",
              token: "var",
              type: "literal",
              line: 54,
              col: 15,
              contents: [],
              specials: 0,
              precedingIgnored: []
            }, symbol, {
              file: "src/macros/hash.sibilant",
              token: "(",
              type: "expression",
              line: 54,
              col: 27,
              contents: [ {
                file: "src/macros/hash.sibilant",
                token: "hash",
                type: "literal",
                line: 54,
                col: 28,
                contents: [],
                specials: 0,
                precedingIgnored: []
              } ].concat(staticKeys),
              precedingIgnored: [ {
                file: "src/macros/hash.sibilant",
                token: " ",
                type: "whitespace",
                line: 54,
                col: 26,
                contents: []
              } ],
              specials: 0,
              end: undefined,
              closed: true,
              closingIgnored: []
            } ],
            precedingIgnored: [ {
              file: "src/macros/hash.sibilant",
              token: "\n",
              type: "newline",
              line: 53,
              col: 36,
              contents: []
            }, {
              file: "src/macros/hash.sibilant",
              token: "              ",
              type: "whitespace",
              line: 54,
              col: 0,
              contents: []
            } ],
            specials: 0,
            end: undefined,
            closed: true,
            closingIgnored: []
          }, {
            file: "src/macros/hash.sibilant",
            token: "(",
            type: "expression",
            line: 55,
            col: 14,
            contents: [ {
              file: "src/macros/hash.sibilant",
              token: "set",
              type: "literal",
              line: 55,
              col: 15,
              contents: [],
              specials: 0,
              precedingIgnored: []
            }, symbol ].concat(dynamicKeys),
            precedingIgnored: [ {
              file: "src/macros/hash.sibilant",
              token: "\n",
              type: "newline",
              line: 54,
              col: 50,
              contents: []
            }, {
              file: "src/macros/hash.sibilant",
              token: "              ",
              type: "whitespace",
              line: 55,
              col: 0,
              contents: []
            } ],
            specials: 0,
            end: undefined,
            closed: true,
            closingIgnored: []
          }, symbol ],
          precedingIgnored: [],
          specials: 0,
          end: undefined,
          closed: true,
          closingIgnored: []
        };
      } else if (1 >= pairStrings.length) {
        return [ "{ ", interleave(", ", pairStrings), " }" ];
      } else {
        return [ "{", indent(interleave(",\n", pairStrings)), "}" ];
      }
    }).call(this);
  });
  sibilant.macros.namespaces.core.get = (function get$(obj, keys) {
    /* get src/macros/hash.sibilant:76:0 */
  
    var keys = Array.prototype.slice.call(arguments, 1);
  
    return [ transpile(obj), map(keys, (function(key) {
      /* src/macros/hash.sibilant:78:19 */
    
      var transpiled = transpile(key),
          output = outputFormatter(transpiled);
      return (function() {
        if (output.match((new RegExp("^\"[a-zA-Z0-9_]+\"$", undefined)))) {
          return [ ".", output.replace((new RegExp("\"", "g")), "") ];
        } else {
          return [ "[", transpiled, "]" ];
        }
      }).call(this);
    })) ];
  });
  sibilant.macros.namespaces.core.set = (function set$(arr, kvPairs) {
    /* set src/macros/hash.sibilant:96:0 */
  
    var kvPairs = Array.prototype.slice.call(arguments, 1);
  
    return interleave("\n", bulkMap(kvPairs, (function(k, v) {
      /* src/macros/hash.sibilant:97:43 */
    
      return {
        file: "src/macros/hash.sibilant",
        token: "(",
        type: "expression",
        line: 97,
        col: 52,
        contents: [ {
          file: "src/macros/hash.sibilant",
          token: "assign",
          type: "literal",
          line: 97,
          col: 53,
          contents: [],
          specials: 0,
          precedingIgnored: []
        }, {
          file: "src/macros/hash.sibilant",
          token: "(",
          type: "expression",
          line: 97,
          col: 60,
          contents: [ {
            file: "src/macros/hash.sibilant",
            token: "get",
            type: "literal",
            line: 97,
            col: 61,
            contents: [],
            specials: 0,
            precedingIgnored: []
          }, arr, k ],
          precedingIgnored: [ {
            file: "src/macros/hash.sibilant",
            token: " ",
            type: "whitespace",
            line: 97,
            col: 59,
            contents: []
          } ],
          specials: 0,
          end: undefined,
          closed: true,
          closingIgnored: []
        }, v ],
        precedingIgnored: [],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      };
    })));
  });
  sibilant.macros.namespaces.core.keys = (function keys$(obj) {
    /* keys src/macros/hash.sibilant:105:0 */
  
    return {
      file: "src/macros/hash.sibilant",
      token: "(",
      type: "expression",
      line: 106,
      col: 8,
      contents: [ {
        file: "src/macros/hash.sibilant",
        token: "Object.keys",
        type: "literal",
        line: 106,
        col: 9,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, obj ],
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core.delete = (function delete$(objects) {
    /* delete src/macros/hash.sibilant:114:0 */
  
    var objects = Array.prototype.slice.call(arguments, 0);
  
    return interleave("\n", map(objects, (function(obj) {
      /* src/macros/hash.sibilant:115:37 */
    
      return asStatement([ "delete ", transpile(obj) ]);
    })));
  });
  sibilant.macros.namespaces.core.eachKey = (function eachKey$(as, obj, body) {
    /* each-key src/macros/hash.sibilant:122:0 */
  
    var body = Array.prototype.slice.call(arguments, 2);
  
    return {
      file: "src/macros/hash.sibilant",
      token: "(",
      type: "expression",
      line: 123,
      col: 8,
      contents: [ {
        file: "src/macros/hash.sibilant",
        token: "pipe",
        type: "literal",
        line: 123,
        col: 9,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, obj, {
        file: "src/macros/hash.sibilant",
        token: "(",
        type: "expression",
        line: 123,
        col: 19,
        contents: [ {
          file: "src/macros/hash.sibilant",
          token: "keys",
          type: "literal",
          line: 123,
          col: 20,
          contents: [],
          specials: 0,
          precedingIgnored: []
        } ],
        precedingIgnored: [ {
          file: "src/macros/hash.sibilant",
          token: " ",
          type: "whitespace",
          line: 123,
          col: 18,
          contents: []
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      }, {
        file: "src/macros/hash.sibilant",
        token: "(",
        type: "expression",
        line: 124,
        col: 14,
        contents: [ {
          file: "src/macros/hash.sibilant",
          token: ".",
          type: "dots",
          line: 124,
          col: 15,
          contents: [ {
            file: "src/macros/hash.sibilant",
            token: "for-each",
            type: "literal",
            line: 124,
            col: 16,
            contents: [],
            specials: 0,
            precedingIgnored: []
          } ],
          precedingIgnored: []
        }, {
          file: "src/macros/hash.sibilant",
          token: "(",
          type: "expression",
          line: 124,
          col: 25,
          contents: [ {
            file: "src/macros/hash.sibilant",
            token: "lambda",
            type: "literal",
            line: 124,
            col: 26,
            contents: [],
            specials: 0,
            precedingIgnored: []
          }, {
            args: (function() {
              if (node__QUERY(as, "expression")) {
                return as;
              } else {
                return [ as ];
              }
            }).call(this),
            node: this
          } ].concat(body),
          precedingIgnored: [ {
            file: "src/macros/hash.sibilant",
            token: " ",
            type: "whitespace",
            line: 124,
            col: 24,
            contents: []
          } ],
          specials: 0,
          end: undefined,
          closed: true,
          closingIgnored: []
        } ],
        precedingIgnored: [ {
          file: "src/macros/hash.sibilant",
          token: "\n",
          type: "newline",
          line: 123,
          col: 25,
          contents: []
        }, {
          file: "src/macros/hash.sibilant",
          token: "              ",
          type: "whitespace",
          line: 124,
          col: 0,
          contents: []
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      } ],
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core.lambda = (function lambda$(argsOrOptions, body) {
    /* lambda src/macros/lambda.sibilant:21:8 */
  
    var body = Array.prototype.slice.call(arguments, 1);
  
    debug__BANG(3, argsOrOptions);
    var args = (argsOrOptions.args || argsOrOptions),
        body = (argsOrOptions.body || body),
        node = (argsOrOptions.node || this),
        args = (function() {
      if (node__QUERY(args, "expression", "bracket")) {
        return args.contents;
      } else if ((node__QUERY(args) && 0 === body.length)) {
        body = [ args ];
        return [];
      } else if (node__QUERY(args, "brace")) {
        return [ args ];
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
      /* src/macros/lambda.sibilant:36:30 */
    
      return node__QUERY(arguments[0], "dots");
    })),
        destructuredArgs = map(args, (function(arg) {
      /* src/macros/lambda.sibilant:38:40 */
    
      return (function() {
        if (node__QUERY(arg, "bracket", "brace")) {
          var argName = generateSymbol(makeSymbolClue(arg));
          return {
            argName: argName,
            destructuredPair: [ arg, argName ]
          };
        } else {
          return { argName: arg };
        }
      }).call(this);
    })),
        destructuredStatements = flatCompact([ (function() {
      if ((typeof rest !== "undefined" && rest !== null)) {
        return [ rest, {
          file: "src/macros/lambda.sibilant",
          token: "(",
          type: "expression",
          line: 45,
          col: 71,
          contents: [ {
            file: "src/macros/lambda.sibilant",
            token: "Array.prototype.slice.call",
            type: "literal",
            line: 45,
            col: 72,
            contents: [],
            specials: 0,
            precedingIgnored: []
          }, {
            file: "src/macros/lambda.sibilant",
            token: "arguments",
            type: "literal",
            line: 45,
            col: 99,
            contents: [],
            specials: 0,
            precedingIgnored: [ {
              file: "src/macros/lambda.sibilant",
              token: " ",
              type: "whitespace",
              line: 45,
              col: 98,
              contents: []
            } ]
          }, (args.length - 1) ],
          precedingIgnored: [],
          specials: 0,
          end: undefined,
          closed: true,
          closingIgnored: []
        } ];
      }
    }).call(this) ].concat(map(destructuredArgs, (function() {
      /* src/macros/lambda.sibilant:46:68 */
    
      return arguments[0].destructuredPair;
    }))));
    node = detect([ node, argsOrOptions.name, args, body[0] ], (function(n) {
      /* src/macros/lambda.sibilant:51:21 */
    
      return (node__QUERY(n) && n.file);
    }));
    return [ "(function", (function() {
      if (name) {
        return (" " + name);
      } else {
        return "";
      }
    }).call(this), "(", interleave(", ", map(destructuredArgs, (function() {
      /* src/macros/lambda.sibilant:55:49 */
    
      return arguments[0].argName;
    }))), ") {", (function() {
      if ((sibilant.state.functionComments && (name || node))) {
        return indent([ "/*", (function() {
          if (name) {
            return (" " + sibilant.prettyPrint(argsOrOptions.name, false));
          }
        }).call(this), (function() {
          if (node) {
            return (" " + node.file + ":" + node.line + ":" + node.col);
          }
        }).call(this), " */" ]);
      }
    }).call(this), (function() {
      if (destructuredStatements.length) {
        return indent({
          file: "src/macros/lambda.sibilant",
          token: "(",
          type: "expression",
          line: 61,
          col: 55,
          contents: [ {
            file: "src/macros/lambda.sibilant",
            token: "var",
            type: "literal",
            line: 61,
            col: 56,
            contents: [],
            specials: 0,
            precedingIgnored: []
          } ].concat(destructuredStatements),
          precedingIgnored: [],
          specials: 0,
          end: undefined,
          closed: true,
          closingIgnored: []
        });
      }
    }).call(this), indent(sibilant.macros.namespaces.core.do.apply(this, body)), "})" ];
  });
  sibilant.macros.namespaces.core["#"] = sibilant.macros.namespaces.core.lambda;
  sibilant.macros.namespaces.core.thunk = (function thunk$(body) {
    /* thunk src/macros/lambda.sibilant:72:0 */
  
    var body = Array.prototype.slice.call(arguments, 0);
  
    var node = this,
        lambdaOptions = {
      node: node,
      args: []
    };
    (function() {
      if (!(node__QUERY(body[0]))) {
        mergeInto(lambdaOptions, body[0]);
        return body = body.slice(1);
      }
    }).call(this);
    return {
      file: "src/macros/lambda.sibilant",
      token: "(",
      type: "expression",
      line: 80,
      col: 8,
      contents: [ {
        file: "src/macros/lambda.sibilant",
        token: "lambda",
        type: "literal",
        line: 80,
        col: 9,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, lambdaOptions ].concat(mapNode(body, (function(node) {
        /* src/macros/lambda.sibilant:82:17 */
      
        return (function() {
          if (node__QUERY(node, "argPlaceholder")) {
            return {
              file: "src/macros/lambda.sibilant",
              token: "(",
              type: "expression",
              line: 84,
              col: 24,
              contents: [ {
                file: "src/macros/lambda.sibilant",
                token: "argument",
                type: "literal",
                line: 84,
                col: 25,
                contents: [],
                specials: 0,
                precedingIgnored: []
              }, node.token.replace((new RegExp("^#", undefined)), "") ],
              precedingIgnored: [],
              specials: 0,
              end: undefined,
              closed: true,
              closingIgnored: []
            };
          } else {
            return node;
          }
        }).call(this);
      }))),
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core["#>"] = sibilant.macros.namespaces.core.thunk;
  sibilant.macros.namespaces.core.return = (function return$(token) {
    /* return src/macros/lambda.sibilant:88:0 */
  
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
  sibilant.macros.namespaces.core.do = (function do$(body) {
    /* do src/macros/lambda.sibilant:135:0 */
  
    var body = Array.prototype.slice.call(arguments, 0);
  
    return (function() {
      if (1 === body.length) {
        return sibilant.macros.namespaces.core.return(body[0]);
      } else if (body.length) {
        return [ interleave(map(body.slice(0, -1), (function() {
          /* src/macros/lambda.sibilant:143:19 */
        
          return asStatement(arguments[0]);
        })), "\n"), "\n", sibilant.macros.namespaces.core.return(body.slice(-1)[0]) ];
      } else {
        return "";
      }
    }).call(this);
  });
  sibilant.macros.namespaces.core.def = (function def$(name, args, body) {
    /* def src/macros/lambda.sibilant:160:0 */
  
    var body = Array.prototype.slice.call(arguments, 2);
  
    var node = this;
    (function() {
      if (node__QUERY(name, "expression")) {
        body = [ args ].concat(body);
        args = mergeWith(name, { contents: name.contents.slice(1) });
        return name = name.contents[0];
      }
    }).call(this);
    (function() {
      if (typeof name === "undefined") {
        return error("invalid function definition. missing name.");
      } else if (typeof args === "undefined") {
        return error("invalid function definition. missing arguments or return value.");
      }
    }).call(this);
    sibilant.docs.record("function", sibilant.macros.searchPath[0], name, node);
    return (function() {
      if (outputFormatter(transpile(name)).match((new RegExp("\\.", undefined)))) {
        return {
          file: "src/macros/lambda.sibilant",
          token: "(",
          type: "expression",
          line: 173,
          col: 10,
          contents: [ {
            file: "src/macros/lambda.sibilant",
            token: "assign",
            type: "literal",
            line: 173,
            col: 11,
            contents: [],
            specials: 0,
            precedingIgnored: []
          }, name, {
            file: "src/macros/lambda.sibilant",
            token: "(",
            type: "expression",
            line: 173,
            col: 24,
            contents: [ {
              file: "src/macros/lambda.sibilant",
              token: "lambda",
              type: "literal",
              line: 173,
              col: 25,
              contents: [],
              specials: 0,
              precedingIgnored: []
            }, {
              name: name,
              args: args,
              node: node,
              body: body
            } ],
            precedingIgnored: [ {
              file: "src/macros/lambda.sibilant",
              token: " ",
              type: "whitespace",
              line: 173,
              col: 23,
              contents: []
            } ],
            specials: 0,
            end: undefined,
            closed: true,
            closingIgnored: []
          } ],
          precedingIgnored: [],
          specials: 0,
          end: undefined,
          closed: true,
          closingIgnored: []
        };
      } else {
        return {
          file: "src/macros/lambda.sibilant",
          token: "(",
          type: "expression",
          line: 174,
          col: 10,
          contents: [ {
            file: "src/macros/lambda.sibilant",
            token: "var",
            type: "literal",
            line: 174,
            col: 11,
            contents: [],
            specials: 0,
            precedingIgnored: []
          }, name, {
            file: "src/macros/lambda.sibilant",
            token: "(",
            type: "expression",
            line: 174,
            col: 21,
            contents: [ {
              file: "src/macros/lambda.sibilant",
              token: "lambda",
              type: "literal",
              line: 174,
              col: 22,
              contents: [],
              specials: 0,
              precedingIgnored: []
            }, {
              name: name,
              args: args,
              node: node,
              body: body
            } ],
            precedingIgnored: [ {
              file: "src/macros/lambda.sibilant",
              token: " ",
              type: "whitespace",
              line: 174,
              col: 20,
              contents: []
            } ],
            specials: 0,
            end: undefined,
            closed: true,
            closingIgnored: []
          } ],
          precedingIgnored: [],
          specials: 0,
          end: undefined,
          closed: true,
          closingIgnored: []
        };
      }
    }).call(this);
  });
  sibilant.macros.namespaces.core.call = (function call$(fnName, args) {
    /* call src/macros/lambda.sibilant:185:0 */
  
    var args = Array.prototype.slice.call(arguments, 1);
  
    return (function() {
      if (any__QUERY(args, (function() {
        /* src/macros/lambda.sibilant:186:20 */
      
        return node__QUERY(arguments[0], "dots");
      }))) {
        return macros.apply(fnName, macros.list.apply(this, args));
      } else {
        return [ transpile(fnName), "(", interleave(", ", map(args, transpile)), ")" ];
      }
    }).call(this);
  });
  sibilant.macros.namespaces.core.send = (function send$(object, method, args) {
    /* send src/macros/lambda.sibilant:194:0 */
  
    var args = Array.prototype.slice.call(arguments, 2);
  
    return [ transpile(object), ".", transpile(method), "(", interleave(", ", map(args, transpile)), ")" ];
  });
  sibilant.macros.namespaces.core.apply = (function apply$(fn, arglist) {
    /* apply src/macros/lambda.sibilant:206:0 */
  
    return {
      file: "src/macros/lambda.sibilant",
      token: "(",
      type: "expression",
      line: 207,
      col: 8,
      contents: [ {
        file: "src/macros/lambda.sibilant",
        token: ".",
        type: "dots",
        line: 207,
        col: 9,
        contents: [ {
          file: "src/macros/lambda.sibilant",
          token: "apply",
          type: "literal",
          line: 207,
          col: 10,
          contents: [],
          specials: 0,
          precedingIgnored: []
        } ],
        precedingIgnored: []
      }, fn, {
        file: "src/macros/lambda.sibilant",
        token: "this",
        type: "literal",
        line: 207,
        col: 20,
        contents: [],
        specials: 0,
        precedingIgnored: [ {
          file: "src/macros/lambda.sibilant",
          token: " ",
          type: "whitespace",
          line: 207,
          col: 19,
          contents: []
        } ]
      }, arglist ],
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core.scoped = (function scoped$(body) {
    /* scoped src/macros/lambda.sibilant:213:0 */
  
    var body = Array.prototype.slice.call(arguments, 0);
  
    return {
      file: "src/macros/lambda.sibilant",
      token: "(",
      type: "expression",
      line: 214,
      col: 8,
      contents: [ {
        file: "src/macros/lambda.sibilant",
        token: ".",
        type: "dots",
        line: 214,
        col: 9,
        contents: [ {
          file: "src/macros/lambda.sibilant",
          token: "call",
          type: "literal",
          line: 214,
          col: 10,
          contents: [],
          specials: 0,
          precedingIgnored: []
        } ],
        precedingIgnored: []
      }, {
        file: "src/macros/lambda.sibilant",
        token: "(",
        type: "expression",
        line: 214,
        col: 15,
        contents: [ {
          file: "src/macros/lambda.sibilant",
          token: "lambda",
          type: "literal",
          line: 214,
          col: 16,
          contents: [],
          specials: 0,
          precedingIgnored: []
        }, {
          node: this,
          args: []
        } ].concat(body),
        precedingIgnored: [ {
          file: "src/macros/lambda.sibilant",
          token: " ",
          type: "whitespace",
          line: 214,
          col: 14,
          contents: []
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      }, {
        file: "src/macros/lambda.sibilant",
        token: "this",
        type: "literal",
        line: 214,
        col: 54,
        contents: [],
        specials: 0,
        precedingIgnored: [ {
          file: "src/macros/lambda.sibilant",
          token: " ",
          type: "whitespace",
          line: 214,
          col: 53,
          contents: []
        } ]
      } ],
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core._scopedWithoutReturn = (function _scopedWithoutReturn$(body) {
    /* *scoped-without-return src/macros/lambda.sibilant:217:0 */
  
    var body = Array.prototype.slice.call(arguments, 0);
  
    return [ "(function() {", indent.apply(this, body), "}).call(this)" ];
  });
  sibilant.macros.namespaces.core._scopedWithoutSource = (function _scopedWithoutSource$(body) {
    /* *scoped-without-source src/macros/lambda.sibilant:221:0 */
  
    var body = Array.prototype.slice.call(arguments, 0);
  
    return {
      file: "src/macros/lambda.sibilant",
      token: "(",
      type: "expression",
      line: 222,
      col: 8,
      contents: [ {
        file: "src/macros/lambda.sibilant",
        token: "*scoped-without-return",
        type: "literal",
        line: 222,
        col: 9,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, {
        file: "src/macros/lambda.sibilant",
        token: "(",
        type: "expression",
        line: 222,
        col: 32,
        contents: [ {
          file: "src/macros/lambda.sibilant",
          token: "do",
          type: "literal",
          line: 222,
          col: 33,
          contents: [],
          specials: 0,
          precedingIgnored: []
        } ].concat(body),
        precedingIgnored: [ {
          file: "src/macros/lambda.sibilant",
          token: " ",
          type: "whitespace",
          line: 222,
          col: 31,
          contents: []
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      } ],
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core.arguments = (function arguments$(args) {
    /* arguments src/macros/lambda.sibilant:227:0 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    return {
      file: "src/macros/lambda.sibilant",
      token: "(",
      type: "expression",
      line: 228,
      col: 8,
      contents: [ {
        file: "src/macros/lambda.sibilant",
        token: "Array.prototype.slice.call",
        type: "literal",
        line: 228,
        col: 9,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, {
        file: "src/macros/lambda.sibilant",
        token: "arguments",
        type: "literal",
        line: 228,
        col: 36,
        contents: [],
        specials: 0,
        precedingIgnored: [ {
          file: "src/macros/lambda.sibilant",
          token: " ",
          type: "whitespace",
          line: 228,
          col: 35,
          contents: []
        } ]
      } ].concat(args),
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core.argument = (function argument$(index) {
    /* argument src/macros/lambda.sibilant:234:0 */
  
    return {
      file: "src/macros/lambda.sibilant",
      token: "(",
      type: "expression",
      line: 235,
      col: 8,
      contents: [ {
        file: "src/macros/lambda.sibilant",
        token: "get",
        type: "literal",
        line: 235,
        col: 9,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, {
        file: "src/macros/lambda.sibilant",
        token: "arguments",
        type: "literal",
        line: 235,
        col: 13,
        contents: [],
        specials: 0,
        precedingIgnored: [ {
          file: "src/macros/lambda.sibilant",
          token: " ",
          type: "whitespace",
          line: 235,
          col: 12,
          contents: []
        } ]
      }, index ],
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core.list = (function list$(args) {
    /* list src/macros/lists.sibilant:11:7 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    var argSegments = [];
    return (function() {
      if (0 === args.length) {
        return "[]";
      } else {
        var simpleList = (function simpleList$(args) {
          /* simple-list src/macros/lists.sibilant:15:12 */
        
          return [ "[ ", interleave(", ", map(args, (function(arg) {
            /* src/macros/lists.sibilant:16:50 */
          
            return arg.transpiled;
          }))), " ]" ];
        });
        args.forEach((function(arg) {
          /* src/macros/lists.sibilant:18:27 */
        
          return (function() {
            if (node__QUERY(arg, "dots")) {
              return argSegments.push({ transpiled: transpile(arg) });
            } else if ((argSegments.slice(-1)[0] && "object" === typeof argSegments.slice(-1)[0] && "Array" === argSegments.slice(-1)[0].constructor.name)) {
              return argSegments.slice(-1)[0].push({ transpiled: transpile(arg) });
            } else {
              return argSegments.push([ { transpiled: transpile(arg) } ]);
            }
          }).call(this);
        }));
        argSegments = map(argSegments, (function(segment) {
          /* src/macros/lists.sibilant:24:38 */
        
          return (function() {
            if ((segment && "object" === typeof segment && "Array" === segment.constructor.name)) {
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
  sibilant.macros.namespaces.core.length = (function length$(arr) {
    /* length src/macros/lists.sibilant:36:0 */
  
    return {
      file: "src/macros/lists.sibilant",
      token: "(",
      type: "expression",
      line: 37,
      col: 8,
      contents: [ {
        file: "src/macros/lists.sibilant",
        token: "get",
        type: "literal",
        line: 37,
        col: 9,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, arr, {"file":"src/macros/lists.sibilant","token":"'","type":"tick","line":37,"col":18,"contents":[{"file":"src/macros/lists.sibilant","token":"length","type":"literal","line":37,"col":19,"contents":[],"specials":0,"precedingIgnored":[]}],"precedingIgnored":[{"file":"src/macros/lists.sibilant","token":" ","type":"whitespace","line":37,"col":17,"contents":[]}]} ],
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core.first = (function first$(arr) {
    /* first src/macros/lists.sibilant:43:0 */
  
    return {
      file: "src/macros/lists.sibilant",
      token: "(",
      type: "expression",
      line: 43,
      col: 20,
      contents: [ {
        file: "src/macros/lists.sibilant",
        token: "get",
        type: "literal",
        line: 43,
        col: 21,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, arr, {
        file: "src/macros/lists.sibilant",
        token: "0",
        type: "number",
        line: 43,
        col: 30,
        contents: [],
        specials: 0,
        precedingIgnored: [ {
          file: "src/macros/lists.sibilant",
          token: " ",
          type: "whitespace",
          line: 43,
          col: 29,
          contents: []
        } ]
      } ],
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core.second = (function second$(arr) {
    /* second src/macros/lists.sibilant:48:0 */
  
    return {
      file: "src/macros/lists.sibilant",
      token: "(",
      type: "expression",
      line: 48,
      col: 21,
      contents: [ {
        file: "src/macros/lists.sibilant",
        token: "get",
        type: "literal",
        line: 48,
        col: 22,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, arr, {
        file: "src/macros/lists.sibilant",
        token: "1",
        type: "number",
        line: 48,
        col: 31,
        contents: [],
        specials: 0,
        precedingIgnored: [ {
          file: "src/macros/lists.sibilant",
          token: " ",
          type: "whitespace",
          line: 48,
          col: 30,
          contents: []
        } ]
      } ],
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core.third = (function third$(arr) {
    /* third src/macros/lists.sibilant:53:0 */
  
    return {
      file: "src/macros/lists.sibilant",
      token: "(",
      type: "expression",
      line: 53,
      col: 20,
      contents: [ {
        file: "src/macros/lists.sibilant",
        token: "get",
        type: "literal",
        line: 53,
        col: 21,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, arr, {
        file: "src/macros/lists.sibilant",
        token: "2",
        type: "number",
        line: 53,
        col: 30,
        contents: [],
        specials: 0,
        precedingIgnored: [ {
          file: "src/macros/lists.sibilant",
          token: " ",
          type: "whitespace",
          line: 53,
          col: 29,
          contents: []
        } ]
      } ],
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core.rest = (function rest$(arr) {
    /* rest src/macros/lists.sibilant:59:0 */
  
    return {
      file: "src/macros/lists.sibilant",
      token: "(",
      type: "expression",
      line: 59,
      col: 19,
      contents: [ {
        file: "src/macros/lists.sibilant",
        token: ".",
        type: "dots",
        line: 59,
        col: 20,
        contents: [ {
          file: "src/macros/lists.sibilant",
          token: "slice",
          type: "literal",
          line: 59,
          col: 21,
          contents: [],
          specials: 0,
          precedingIgnored: []
        } ],
        precedingIgnored: []
      }, arr, {
        file: "src/macros/lists.sibilant",
        token: "1",
        type: "number",
        line: 59,
        col: 32,
        contents: [],
        specials: 0,
        precedingIgnored: [ {
          file: "src/macros/lists.sibilant",
          token: " ",
          type: "whitespace",
          line: 59,
          col: 31,
          contents: []
        } ]
      } ],
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core.last = (function last$(arr) {
    /* last src/macros/lists.sibilant:64:0 */
  
    return {
      file: "src/macros/lists.sibilant",
      token: "(",
      type: "expression",
      line: 64,
      col: 19,
      contents: [ {
        file: "src/macros/lists.sibilant",
        token: "first",
        type: "literal",
        line: 64,
        col: 20,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, {
        file: "src/macros/lists.sibilant",
        token: "(",
        type: "expression",
        line: 64,
        col: 26,
        contents: [ {
          file: "src/macros/lists.sibilant",
          token: ".",
          type: "dots",
          line: 64,
          col: 27,
          contents: [ {
            file: "src/macros/lists.sibilant",
            token: "slice",
            type: "literal",
            line: 64,
            col: 28,
            contents: [],
            specials: 0,
            precedingIgnored: []
          } ],
          precedingIgnored: []
        }, arr, {
          file: "src/macros/lists.sibilant",
          token: "-1",
          type: "number",
          line: 64,
          col: 39,
          contents: [],
          specials: 0,
          precedingIgnored: [ {
            file: "src/macros/lists.sibilant",
            token: " ",
            type: "whitespace",
            line: 64,
            col: 38,
            contents: []
          } ]
        } ],
        precedingIgnored: [ {
          file: "src/macros/lists.sibilant",
          token: " ",
          type: "whitespace",
          line: 64,
          col: 25,
          contents: []
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      } ],
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core.cons = (function cons$(first, rest) {
    /* cons src/macros/lists.sibilant:74:0 */
  
    return {
      file: "src/macros/lists.sibilant",
      token: "(",
      type: "expression",
      line: 75,
      col: 8,
      contents: [ {
        file: "src/macros/lists.sibilant",
        token: "pipe",
        type: "literal",
        line: 75,
        col: 9,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, {
        file: "src/macros/lists.sibilant",
        token: "(",
        type: "expression",
        line: 76,
        col: 9,
        contents: [ {
          file: "src/macros/lists.sibilant",
          token: "list",
          type: "literal",
          line: 76,
          col: 10,
          contents: [],
          specials: 0,
          precedingIgnored: []
        }, first ],
        precedingIgnored: [ {
          file: "src/macros/lists.sibilant",
          token: "\n",
          type: "newline",
          line: 75,
          col: 13,
          contents: []
        }, {
          file: "src/macros/lists.sibilant",
          token: "         ",
          type: "whitespace",
          line: 76,
          col: 0,
          contents: []
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      }, {
        file: "src/macros/lists.sibilant",
        token: "(",
        type: "expression",
        line: 77,
        col: 9,
        contents: [ {
          file: "src/macros/lists.sibilant",
          token: ".",
          type: "dots",
          line: 77,
          col: 10,
          contents: [ {
            file: "src/macros/lists.sibilant",
            token: "concat",
            type: "literal",
            line: 77,
            col: 11,
            contents: [],
            specials: 0,
            precedingIgnored: []
          } ],
          precedingIgnored: []
        }, rest ],
        precedingIgnored: [ {
          file: "src/macros/lists.sibilant",
          token: "\n",
          type: "newline",
          line: 76,
          col: 22,
          contents: []
        }, {
          file: "src/macros/lists.sibilant",
          token: "         ",
          type: "whitespace",
          line: 77,
          col: 0,
          contents: []
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      } ],
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core.append = (function append$(list, additional) {
    /* append src/macros/lists.sibilant:83:0 */
  
    var additional = Array.prototype.slice.call(arguments, 1);
  
    return {
      file: "src/macros/lists.sibilant",
      token: "(",
      type: "expression",
      line: 84,
      col: 8,
      contents: [ {
        file: "src/macros/lists.sibilant",
        token: ".",
        type: "dots",
        line: 84,
        col: 9,
        contents: [ {
          file: "src/macros/lists.sibilant",
          token: "concat",
          type: "literal",
          line: 84,
          col: 10,
          contents: [],
          specials: 0,
          precedingIgnored: []
        } ],
        precedingIgnored: []
      }, list, {
        file: "src/macros/lists.sibilant",
        token: "(",
        type: "expression",
        line: 84,
        col: 23,
        contents: [ {
          file: "src/macros/lists.sibilant",
          token: "list",
          type: "literal",
          line: 84,
          col: 24,
          contents: [],
          specials: 0,
          precedingIgnored: []
        } ].concat(additional),
        precedingIgnored: [ {
          file: "src/macros/lists.sibilant",
          token: " ",
          type: "whitespace",
          line: 84,
          col: 22,
          contents: []
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      } ],
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core.each = (function each$(item, array, body) {
    /* each src/macros/lists.sibilant:97:0 */
  
    var body = Array.prototype.slice.call(arguments, 2);
  
    var node = this,
        args = (function() {
      if (node__QUERY(item, "expression")) {
        return item;
      } else {
        return [ item ];
      }
    }).call(this);
    return {
      file: "src/macros/lists.sibilant",
      token: "(",
      type: "expression",
      line: 100,
      col: 8,
      contents: [ {
        file: "src/macros/lists.sibilant",
        token: "|>",
        type: "otherChar",
        line: 100,
        col: 9,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, array, {
        file: "src/macros/lists.sibilant",
        token: "(",
        type: "expression",
        line: 101,
        col: 12,
        contents: [ {
          file: "src/macros/lists.sibilant",
          token: ".",
          type: "dots",
          line: 101,
          col: 13,
          contents: [ {
            file: "src/macros/lists.sibilant",
            token: "for-each",
            type: "literal",
            line: 101,
            col: 14,
            contents: [],
            specials: 0,
            precedingIgnored: []
          } ],
          precedingIgnored: []
        }, {
          file: "src/macros/lists.sibilant",
          token: "(",
          type: "expression",
          line: 101,
          col: 23,
          contents: [ {
            file: "src/macros/lists.sibilant",
            token: "lambda",
            type: "literal",
            line: 101,
            col: 24,
            contents: [],
            specials: 0,
            precedingIgnored: []
          }, {
            node: node,
            args: args,
            body: body
          } ],
          precedingIgnored: [ {
            file: "src/macros/lists.sibilant",
            token: " ",
            type: "whitespace",
            line: 101,
            col: 22,
            contents: []
          } ],
          specials: 0,
          end: undefined,
          closed: true,
          closingIgnored: []
        } ],
        precedingIgnored: [ {
          file: "src/macros/lists.sibilant",
          token: "\n",
          type: "newline",
          line: 100,
          col: 18,
          contents: []
        }, {
          file: "src/macros/lists.sibilant",
          token: "            ",
          type: "whitespace",
          line: 101,
          col: 0,
          contents: []
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      } ],
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core.includes__QUERY = (function includes__QUERY$(haystack, needle) {
    /* includes? src/macros/lists.sibilant:107:0 */
  
    return {
      file: "src/macros/lists.sibilant",
      token: "(",
      type: "expression",
      line: 108,
      col: 8,
      contents: [ {
        file: "src/macros/lists.sibilant",
        token: "pipe",
        type: "literal",
        line: 108,
        col: 9,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, haystack, {
        file: "src/macros/lists.sibilant",
        token: "(",
        type: "expression",
        line: 108,
        col: 24,
        contents: [ {
          file: "src/macros/lists.sibilant",
          token: ".",
          type: "dots",
          line: 108,
          col: 25,
          contents: [ {
            file: "src/macros/lists.sibilant",
            token: "index-of",
            type: "literal",
            line: 108,
            col: 26,
            contents: [],
            specials: 0,
            precedingIgnored: []
          } ],
          precedingIgnored: []
        }, needle ],
        precedingIgnored: [ {
          file: "src/macros/lists.sibilant",
          token: " ",
          type: "whitespace",
          line: 108,
          col: 23,
          contents: []
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      }, {
        file: "src/macros/lists.sibilant",
        token: "(",
        type: "expression",
        line: 108,
        col: 44,
        contents: [ {
          file: "src/macros/lists.sibilant",
          token: "!=",
          type: "otherChar",
          line: 108,
          col: 45,
          contents: [],
          specials: 0,
          precedingIgnored: []
        }, {
          file: "src/macros/lists.sibilant",
          token: "-1",
          type: "number",
          line: 108,
          col: 48,
          contents: [],
          specials: 0,
          precedingIgnored: [ {
            file: "src/macros/lists.sibilant",
            token: " ",
            type: "whitespace",
            line: 108,
            col: 47,
            contents: []
          } ]
        } ],
        precedingIgnored: [ {
          file: "src/macros/lists.sibilant",
          token: " ",
          type: "whitespace",
          line: 108,
          col: 43,
          contents: []
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      } ],
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core.excludes__QUERY = (function excludes__QUERY$(haystack, needle) {
    /* excludes? src/macros/lists.sibilant:114:0 */
  
    return {
      file: "src/macros/lists.sibilant",
      token: "(",
      type: "expression",
      line: 115,
      col: 8,
      contents: [ {
        file: "src/macros/lists.sibilant",
        token: "pipe",
        type: "literal",
        line: 115,
        col: 9,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, haystack, {
        file: "src/macros/lists.sibilant",
        token: "(",
        type: "expression",
        line: 115,
        col: 24,
        contents: [ {
          file: "src/macros/lists.sibilant",
          token: ".",
          type: "dots",
          line: 115,
          col: 25,
          contents: [ {
            file: "src/macros/lists.sibilant",
            token: "index-of",
            type: "literal",
            line: 115,
            col: 26,
            contents: [],
            specials: 0,
            precedingIgnored: []
          } ],
          precedingIgnored: []
        }, needle ],
        precedingIgnored: [ {
          file: "src/macros/lists.sibilant",
          token: " ",
          type: "whitespace",
          line: 115,
          col: 23,
          contents: []
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      }, {
        file: "src/macros/lists.sibilant",
        token: "(",
        type: "expression",
        line: 115,
        col: 44,
        contents: [ {
          file: "src/macros/lists.sibilant",
          token: "=",
          type: "otherChar",
          line: 115,
          col: 45,
          contents: [],
          specials: 0,
          precedingIgnored: []
        }, {
          file: "src/macros/lists.sibilant",
          token: "-1",
          type: "number",
          line: 115,
          col: 47,
          contents: [],
          specials: 0,
          precedingIgnored: [ {
            file: "src/macros/lists.sibilant",
            token: " ",
            type: "whitespace",
            line: 115,
            col: 46,
            contents: []
          } ]
        } ],
        precedingIgnored: [ {
          file: "src/macros/lists.sibilant",
          token: " ",
          type: "whitespace",
          line: 115,
          col: 43,
          contents: []
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      } ],
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core.while = (function while$(condition, body) {
    /* while src/macros/loops.sibilant:8:0 */
  
    var body = Array.prototype.slice.call(arguments, 1);
  
    var symbol = generateSymbol("while");
    return {
      file: "src/macros/loops.sibilant",
      token: "(",
      type: "expression",
      line: 10,
      col: 8,
      contents: [ {
        file: "src/macros/loops.sibilant",
        token: "*scoped-without-source",
        type: "literal",
        line: 10,
        col: 9,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, {
        file: "src/macros/loops.sibilant",
        token: "(",
        type: "expression",
        line: 11,
        col: 9,
        contents: [ {
          file: "src/macros/loops.sibilant",
          token: "var",
          type: "literal",
          line: 11,
          col: 10,
          contents: [],
          specials: 0,
          precedingIgnored: []
        }, symbol ],
        precedingIgnored: [ {
          file: "src/macros/loops.sibilant",
          token: "\n",
          type: "newline",
          line: 10,
          col: 31,
          contents: []
        }, {
          file: "src/macros/loops.sibilant",
          token: "         ",
          type: "whitespace",
          line: 11,
          col: 0,
          contents: []
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      }, {
        type: "output",
        contents: [ "while (", transpile(condition), ") {", indent({
          file: "src/macros/loops.sibilant",
          token: "(",
          type: "expression",
          line: 14,
          col: 35,
          contents: [ {
            file: "src/macros/loops.sibilant",
            token: "assign",
            type: "literal",
            line: 14,
            col: 36,
            contents: [],
            specials: 0,
            precedingIgnored: []
          }, symbol, {
            file: "src/macros/loops.sibilant",
            token: "(",
            type: "expression",
            line: 14,
            col: 51,
            contents: [ {
              file: "src/macros/loops.sibilant",
              token: "*scoped-without-source",
              type: "literal",
              line: 14,
              col: 52,
              contents: [],
              specials: 0,
              precedingIgnored: []
            } ].concat(body),
            precedingIgnored: [ {
              file: "src/macros/loops.sibilant",
              token: " ",
              type: "whitespace",
              line: 14,
              col: 50,
              contents: []
            } ],
            specials: 0,
            end: undefined,
            closed: true,
            closingIgnored: []
          } ],
          precedingIgnored: [],
          specials: 0,
          end: undefined,
          closed: true,
          closingIgnored: []
        }), "}" ]
      }, symbol ],
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core.until = (function until$(condition, body) {
    /* until src/macros/loops.sibilant:27:0 */
  
    var body = Array.prototype.slice.call(arguments, 1);
  
    return {
      file: "src/macros/loops.sibilant",
      token: "(",
      type: "expression",
      line: 28,
      col: 8,
      contents: [ {
        file: "src/macros/loops.sibilant",
        token: "while",
        type: "literal",
        line: 28,
        col: 9,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, {
        file: "src/macros/loops.sibilant",
        token: "(",
        type: "expression",
        line: 28,
        col: 15,
        contents: [ {
          file: "src/macros/loops.sibilant",
          token: "not",
          type: "literal",
          line: 28,
          col: 16,
          contents: [],
          specials: 0,
          precedingIgnored: []
        }, condition ],
        precedingIgnored: [ {
          file: "src/macros/loops.sibilant",
          token: " ",
          type: "whitespace",
          line: 28,
          col: 14,
          contents: []
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      } ].concat(body),
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core.macro = (function macro$(name, args, body) {
    /* macro src/macros/macros.sibilant:12:0 */
  
    var body = Array.prototype.slice.call(arguments, 2);
  
    var nameTr = outputFormatter(transpile(name)),
        options = {
      name: name,
      args: args,
      node: this
    },
        js = outputFormatter(transpile({
      file: "src/macros/macros.sibilant",
      token: "(",
      type: "expression",
      line: 15,
      col: 18,
      contents: [ {
        file: "src/macros/macros.sibilant",
        token: "lambda",
        type: "literal",
        line: 15,
        col: 19,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, options ].concat(body),
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    }));
    debug__BANG(2, js);
    sibilant.docs.record("macro", sibilant.macros.searchPath[0], name, this);
    var evaledJs = (function() {
      try {
        return eval(js);
      } catch (e) {
        console.log(e.message);
        console.log(red(e.stack.split("\n")[1]));
        return console.log(("error in parsing macro " + sibilant.prettyPrint(name) + ":\n" + js));
      }
    }).call(this);
    sibilant.macros.namespace[nameTr] = evaledJs;
    return undefined;
  });
  sibilant.macros.namespaces.core.meta = (function meta$(body) {
    /* meta src/macros/macros.sibilant:42:0 */
  
    var body = Array.prototype.slice.call(arguments, 0);
  
    var js = outputFormatter(transpile(sibilant.macros.namespaces.core.scoped.apply(this, body)));
    (function() {
      if (sibilant.debug) {
        return console.log(js);
      }
    }).call(this);
    return outputFormatter(eval(js));
  });
  sibilant.macros.namespaces.core.aliasMacro = (function aliasMacro$(currentMacroName, newMacroName) {
    /* alias-macro src/macros/macros.sibilant:50:0 */
  
    var currentMacroName = outputFormatter(transpile(currentMacroName)),
        newMacroName = outputFormatter(transpile(newMacroName));
    sibilant.macros.namespace[newMacroName] = sibilant.macros.namespace[currentMacroName];
    return null;
  });
  sibilant.macros.namespaces.core.deleteMacro = (function deleteMacro$(macroNames) {
    /* delete-macro src/macros/macros.sibilant:61:0 */
  
    var macroNames = Array.prototype.slice.call(arguments, 0);
  
    macroNames.forEach((function(macroName) {
      /* src/macros/macros.sibilant:62:7 */
    
      return delete sibilant.macros.namespace[outputFormatter(transpile(macroName))];
    }));
    return null;
  });
  sibilant.macros.namespaces.core.delmacro = sibilant.macros.namespaces.core.deleteMacro;
  sibilant.macros.namespaces.core.renameMacro = (function renameMacro$(currentMacroName, newMacroName) {
    /* rename-macro src/macros/macros.sibilant:74:0 */
  
    sibilant.macros.namespaces.core.aliasMacro(currentMacroName, newMacroName);
    sibilant.macros.namespaces.core.deleteMacro(currentMacroName);
    return null;
  });
  sibilant.macros.namespaces.core.importNamespace = (function importNamespace$(namespace) {
    /* import-namespace src/macros/macros.sibilant:80:0 */
  
    var namespaceAsString = outputFormatter(transpile(namespace));
    (function() {
      if (!(sibilant.macros.namespaces.hasOwnProperty(namespaceAsString))) {
        return sibilant.macros.namespaces[namespaceAsString] = {  };
      }
    }).call(this);
    sibilant.macros.searchPath.unshift(namespaceAsString);
    return undefined;
  });
  sibilant.macros.namespaces.core.namespace = (function namespace$(namespace) {
    /* namespace src/macros/macros.sibilant:88:0 */
  
    sibilant.macros.namespaces.core.importNamespace(namespace);
    sibilant.macros.namespace = sibilant.macros.namespaces[outputFormatter(transpile(namespace))];
    return undefined;
  });
  sibilant.macros.namespaces.core.quote = (function quote$(content) {
    /* quote src/macros/macros.sibilant:95:0 */
  
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
  sibilant.macros.namespaces.core.docs = (function docs$(options) {
    /* docs src/macros/macros.sibilant:118:0 */
  
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
      /* src/macros/macros.sibilant:129:23 */
    
      return optionsHash[outputFormatter(transpile(key))] = value;
    }));
    [ "examples", "references" ].forEach((function(listAttribute) {
      /* src/macros/macros.sibilant:132:5 */
    
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
  sibilant.macros.namespaces.core["+"] = (function $$(args) {
    /* + src/macros/math.sibilant:8:0 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    return [ "(", interleave(" + ", map(args, transpile)), ")" ];
  });
  sibilant.macros.namespaces.core.concat = sibilant.macros.namespaces.core["+"];
  sibilant.macros.namespaces.core["-"] = (function $$(args) {
    /* - src/macros/math.sibilant:16:0 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    return [ "(", interleave(" - ", map(args, transpile)), ")" ];
  });
  sibilant.macros.namespaces.core._ = (function _$(args) {
    /* * src/macros/math.sibilant:22:0 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    return [ "(", interleave(" * ", map(args, transpile)), ")" ];
  });
  sibilant.macros.namespaces.core["/"] = (function $$(args) {
    /* / src/macros/math.sibilant:29:0 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    return [ "(", interleave(" / ", map(args, transpile)), ")" ];
  });
  sibilant.macros.namespaces.core.mod = (function mod$(args) {
    /* mod src/macros/math.sibilant:35:0 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    return [ "(", interleave(" % ", map(args, transpile)), ")" ];
  });
  sibilant.macros.namespaces.core.incrBy = (function incrBy$(item, increment) {
    /* incr-by src/macros/math.sibilant:42:0 */
  
    return [ transpile(item), " += ", transpile(increment) ];
  });
  sibilant.macros.namespaces.core.incr = (function incr$(item) {
    /* incr src/macros/math.sibilant:48:0 */
  
    return [ "((", transpile(item), ")++)" ];
  });
  sibilant.macros.namespaces.core.decr = (function decr$(item) {
    /* decr src/macros/math.sibilant:55:0 */
  
    return [ "((", transpile(item), ")--)" ];
  });
  sibilant.macros.namespaces.core.or = (function or$(args) {
    /* or src/macros/math.sibilant:61:0 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    return [ "(", interleave(" || ", map(args, transpile)), ")" ];
  });
  sibilant.macros.namespaces.core.and = (function and$(args) {
    /* and src/macros/math.sibilant:69:0 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    return (function() {
      if (1 === args.length) {
        return transpile(args[0]);
      } else {
        return {
          file: "src/macros/math.sibilant",
          token: "(",
          type: "expression",
          line: 72,
          col: 12,
          contents: [ {
            file: "src/macros/math.sibilant",
            token: "parens",
            type: "literal",
            line: 72,
            col: 13,
            contents: [],
            specials: 0,
            precedingIgnored: []
          } ].concat(interleave(" && ", map(args, transpile))),
          precedingIgnored: [],
          specials: 0,
          end: undefined,
          closed: true,
          closingIgnored: []
        };
      }
    }).call(this);
  });
  sibilant.macros.namespaces.core.not = (function not$(exp) {
    /* not src/macros/math.sibilant:79:0 */
  
    return [ "!", {
      file: "src/macros/math.sibilant",
      token: "(",
      type: "expression",
      line: 80,
      col: 13,
      contents: [ {
        file: "src/macros/math.sibilant",
        token: "parens",
        type: "literal",
        line: 80,
        col: 14,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, exp ],
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    } ];
  });
  sibilant.macros.namespaces.core.asBoolean = (function asBoolean$(expr) {
    /* as-boolean src/macros/math.sibilant:88:0 */
  
    return {
      file: "src/macros/math.sibilant",
      token: "(",
      type: "expression",
      line: 89,
      col: 8,
      contents: [ {
        file: "src/macros/math.sibilant",
        token: "parens",
        type: "literal",
        line: 89,
        col: 9,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, "!!", {
        file: "src/macros/math.sibilant",
        token: "(",
        type: "expression",
        line: 89,
        col: 22,
        contents: [ {
          file: "src/macros/math.sibilant",
          token: "parens",
          type: "literal",
          line: 89,
          col: 23,
          contents: [],
          specials: 0,
          precedingIgnored: []
        }, expr ],
        precedingIgnored: [ {
          file: "src/macros/math.sibilant",
          token: " ",
          type: "whitespace",
          line: 89,
          col: 21,
          contents: []
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      } ],
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core.asNumber = (function asNumber$(expr) {
    /* as-number src/macros/math.sibilant:96:0 */
  
    return {
      file: "src/macros/math.sibilant",
      token: "(",
      type: "expression",
      line: 96,
      col: 25,
      contents: [ {
        file: "src/macros/math.sibilant",
        token: "Number",
        type: "literal",
        line: 96,
        col: 26,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, expr ],
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core.statement__BANG = (function statement__BANG$(node) {
    /* statement! src/macros/misc.sibilant:3:0 */
  
    return (function() {
      if (emptyNode__QUERY(transpiled)) {
        return undefined;
      } else {
        return [ node, ";" ];
      }
    }).call(this);
  });
  sibilant.macros.namespaces.core.new = (function new$(constructor, args) {
    /* new src/macros/misc.sibilant:13:0 */
  
    var args = Array.prototype.slice.call(arguments, 1);
  
    return [ "(new ", {
      file: "src/macros/misc.sibilant",
      token: "(",
      type: "expression",
      line: 14,
      col: 17,
      contents: [ {
        file: "src/macros/misc.sibilant",
        token: "call",
        type: "literal",
        line: 14,
        col: 18,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, constructor ].concat(args),
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    }, ")" ];
  });
  sibilant.macros.namespaces.core.typeof = (function typeof$(thing) {
    /* typeof src/macros/misc.sibilant:20:0 */
  
    return [ "typeof ", transpile(thing) ];
  });
  sibilant.macros.namespaces.core.comment = (function comment$(contents) {
    /* comment src/macros/misc.sibilant:26:0 */
  
    var contents = Array.prototype.slice.call(arguments, 0);
  
    return map(contents, (function(content) {
      /* src/macros/misc.sibilant:27:21 */
    
      return [ "// ", recurseMap(transpile(content), (function(item) {
        /* src/macros/misc.sibilant:29:36 */
      
        return (item) ? outputFormatter(transpile(item)).replace((new RegExp("\n", "g")), "\n// ") : null;
      })) ];
    }));
  });
  sibilant.macros.namespaces.core.logPretty = (function logPretty$(label, arg) {
    /* log-pretty src/macros/misc.sibilant:42:0 */
  
    var node = this;
    (function() {
      if (typeof arg === "undefined") {
        arg = label;
        return label = [ "\"", prettify(label, false), "\"" ];
      }
    }).call(this);
    return {
      file: "src/macros/misc.sibilant",
      token: "(",
      type: "expression",
      line: 47,
      col: 8,
      contents: [ {
        file: "src/macros/misc.sibilant",
        token: "console.log",
        type: "literal",
        line: 47,
        col: 9,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, {
        file: "src/macros/misc.sibilant",
        token: "(",
        type: "expression",
        line: 47,
        col: 21,
        contents: [ {
          file: "src/macros/misc.sibilant",
          token: "concat",
          type: "literal",
          line: 47,
          col: 22,
          contents: [],
          specials: 0,
          precedingIgnored: []
        }, [ "\"", node.file, ":", node.line, "\"" ], {
          file: "src/macros/misc.sibilant",
          token: "\" \"",
          type: "string",
          line: 47,
          col: 66,
          contents: [],
          specials: 0,
          precedingIgnored: [ {
            file: "src/macros/misc.sibilant",
            token: " ",
            type: "whitespace",
            line: 47,
            col: 65,
            contents: []
          } ]
        }, label, {
          file: "src/macros/misc.sibilant",
          token: "\" = \"",
          type: "string",
          line: 47,
          col: 77,
          contents: [],
          specials: 0,
          precedingIgnored: [ {
            file: "src/macros/misc.sibilant",
            token: " ",
            type: "whitespace",
            line: 47,
            col: 76,
            contents: []
          } ]
        }, {
          file: "src/macros/misc.sibilant",
          token: "(",
          type: "expression",
          line: 47,
          col: 83,
          contents: [ {
            file: "src/macros/misc.sibilant",
            token: "prettify",
            type: "literal",
            line: 47,
            col: 84,
            contents: [],
            specials: 0,
            precedingIgnored: []
          }, arg ],
          precedingIgnored: [ {
            file: "src/macros/misc.sibilant",
            token: " ",
            type: "whitespace",
            line: 47,
            col: 82,
            contents: []
          } ],
          specials: 0,
          end: undefined,
          closed: true,
          closingIgnored: []
        } ],
        precedingIgnored: [ {
          file: "src/macros/misc.sibilant",
          token: " ",
          type: "whitespace",
          line: 47,
          col: 20,
          contents: []
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      } ],
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core.prettyLog = sibilant.macros.namespaces.core.logPretty;
  sibilant.macros.namespaces.core.throw = (function throw$(error) {
    /* throw src/macros/misc.sibilant:55:0 */
  
    return [ "throw ", transpile(error) ];
  });
  sibilant.macros.namespaces.core.try = (function try$(tryblock, catchblock) {
    /* try src/macros/misc.sibilant:60:0 */
  
    return [ "(function() {", indent([ "try {", indent({
      file: "src/macros/misc.sibilant",
      token: "(",
      type: "expression",
      line: 63,
      col: 26,
      contents: [ {
        file: "src/macros/misc.sibilant",
        token: "do",
        type: "literal",
        line: 63,
        col: 27,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, tryblock ],
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    }), "} catch (e) {", indent({
      file: "src/macros/misc.sibilant",
      token: "(",
      type: "expression",
      line: 65,
      col: 26,
      contents: [ {
        file: "src/macros/misc.sibilant",
        token: "do",
        type: "literal",
        line: 65,
        col: 27,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, catchblock ],
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    }), "}" ]), "}).call(this)" ];
  });
  sibilant.macros.namespaces.core.withState = (function withState$(k, v, body) {
    /* with-state src/macros/misc.sibilant:69:0 */
  
    var body = Array.prototype.slice.call(arguments, 2);
  
    var state = sibilant.state,
        $2 = map([ k, v ], (function() {
      /* src/macros/misc.sibilant:71:41 */
    
      return outputFormatter(transpile(arguments[0]));
    })),
        key = $2[0],
        value = $2[1],
        $2 = undefined,
        before = state[key];
    state[key] = value;
    var returnValue = interleave("\n", map(body, transpile));
    state[key] = before;
    return returnValue;
  });
  sibilant.macros.namespaces.core.join = (function join$(arr, glue) {
    /* join src/macros/misc.sibilant:87:0 */
  
    (function() {
      if ((typeof glue !== "undefined" && typeof arr === "undefined")) {
        arr = glue;
        return glue = undefined;
      }
    }).call(this);
    return {
      file: "src/macros/misc.sibilant",
      token: "(",
      type: "expression",
      line: 90,
      col: 8,
      contents: [ {
        file: "src/macros/misc.sibilant",
        token: ".",
        type: "dots",
        line: 90,
        col: 9,
        contents: [ {
          file: "src/macros/misc.sibilant",
          token: "join",
          type: "literal",
          line: 90,
          col: 10,
          contents: [],
          specials: 0,
          precedingIgnored: []
        } ],
        precedingIgnored: []
      }, arr, (glue || "\"\"") ],
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core.parens = (function parens$(contents) {
    /* parens src/macros/misc.sibilant:92:0 */
  
    var contents = Array.prototype.slice.call(arguments, 0);
  
    return [ "(" ].concat(contents, [ ")" ]);
  });
  sibilant.macros.namespaces.core.sourceMappingUrl = (function sourceMappingUrl$(url) {
    /* source-mapping-url src/macros/misc.sibilant:99:0 */
  
    return [ "//# sourceMappingURL=", eval(outputFormatter(transpile(url))), "\n" ];
  });
  sibilant.macros.namespaces.core.require__BANG = (function require__BANG$(requires) {
    /* require! src/macros/misc.sibilant:102:0 */
  
    var requires = Array.prototype.slice.call(arguments, 0);
  
    return {
      file: "src/macros/misc.sibilant",
      token: "(",
      type: "expression",
      line: 103,
      col: 8,
      contents: [ {
        file: "src/macros/misc.sibilant",
        token: "var",
        type: "literal",
        line: 103,
        col: 9,
        contents: [],
        specials: 0,
        precedingIgnored: []
      } ].concat(inject([], requires, (function(pairs, node) {
        /* src/macros/misc.sibilant:104:25 */
      
        return pairs.concat((function() {
          if ((0 === (pairs.length % 2) && node__QUERY(node, "tick", "string"))) {
            return [ mergeInto(clone(node), {
              token: outputFormatter(transpile(node)).slice(1, -1),
              contents: [],
              type: "literal"
            }), {
              file: "src/macros/misc.sibilant",
              token: "(",
              type: "expression",
              line: 114,
              col: 33,
              contents: [ {
                file: "src/macros/misc.sibilant",
                token: "require",
                type: "literal",
                line: 114,
                col: 34,
                contents: [],
                specials: 0,
                precedingIgnored: []
              }, node ],
              precedingIgnored: [],
              specials: 0,
              end: undefined,
              closed: true,
              closingIgnored: []
            } ];
          } else if (1 === (pairs.length % 2)) {
            return [ {
              file: "src/macros/misc.sibilant",
              token: "(",
              type: "expression",
              line: 117,
              col: 36,
              contents: [ {
                file: "src/macros/misc.sibilant",
                token: "require",
                type: "literal",
                line: 117,
                col: 37,
                contents: [],
                specials: 0,
                precedingIgnored: []
              }, node ],
              precedingIgnored: [],
              specials: 0,
              end: undefined,
              closed: true,
              closingIgnored: []
            } ];
          } else {
            return [ node ];
          }
        }).call(this));
      }))),
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core.export = (function export$(localVars) {
    /* export src/macros/misc.sibilant:122:0 */
  
    var localVars = Array.prototype.slice.call(arguments, 0);
  
    var pairs = localVars.reduce((function(acc, value) {
      /* src/macros/misc.sibilant:124:19 */
    
      return acc.concat([ sibilant.macros.namespaces.core.quote(value), value ]);
    }), []);
    return {
      file: "src/macros/misc.sibilant",
      token: "(",
      type: "expression",
      line: 126,
      col: 8,
      contents: [ {
        file: "src/macros/misc.sibilant",
        token: "set",
        type: "literal",
        line: 126,
        col: 9,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, {
        file: "src/macros/misc.sibilant",
        token: "exports",
        type: "literal",
        line: 126,
        col: 13,
        contents: [],
        specials: 0,
        precedingIgnored: [ {
          file: "src/macros/misc.sibilant",
          token: " ",
          type: "whitespace",
          line: 126,
          col: 12,
          contents: []
        } ]
      } ].concat(pairs),
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core.emptyList = (function emptyList$() {
    /* empty-list src/macros/misc.sibilant:128:0 */
  
    return "null";
  });
  sibilant.macros.namespaces.core.debug = (function debug$(val) {
    /* debug src/macros/misc.sibilant:131:0 */
  
    sibilant.debug = eval(outputFormatter(transpile(val)));
    return null;
  });
  sibilant.macros.namespaces.core.dots = (function dots$(contents) {
    /* dots src/macros/misc.sibilant:135:0 */
  
    var contents = Array.prototype.slice.call(arguments, 0);
  
    return transpile(contents);
  });
  sibilant.macros.namespaces.core.include = (function include$(files) {
    /* include src/macros/misc.sibilant:150:0 */
  
    var files = Array.prototype.slice.call(arguments, 0);
  
    return interleave(files.map((function(file) {
      /* src/macros/misc.sibilant:152:17 */
    
      return sibilant.withDefaultSearchPath((function() {
        /* src/macros/misc.sibilant:154:20 */
      
        return sibilant.include(eval(outputFormatter(transpile(file))));
      }));
    })), "\n");
  });
  sibilant.macros.namespaces.core.pipe = (function pipe$(calls) {
    /* pipe src/macros/pipe.sibilant:25:0 */
  
    var calls = Array.prototype.slice.call(arguments, 0);
  
    return inject(undefined, calls, (function(value, item) {
      /* src/macros/pipe.sibilant:27:15 */
    
      return (function() {
        if (typeof value === "undefined") {
          return item;
        } else {
          return (function() {
            /* src/macros/pipe.sibilant:29:21 */
          
            var cloned = (function() {
              if (node__QUERY(item, "literal", "dots")) {
                return {
                  file: "src/macros/pipe.sibilant",
                  token: "(",
                  type: "expression",
                  line: 31,
                  col: 39,
                  contents: [ item ],
                  precedingIgnored: [],
                  specials: 0,
                  end: undefined,
                  closed: true,
                  closingIgnored: []
                };
              } else {
                return clone(item);
              }
            }).call(this);
            var placeholder = detect(cloned.contents, (function(node) {
              /* src/macros/pipe.sibilant:35:47 */
            
              return (node__QUERY(node, "otherChar") && "#" === node.token);
            })),
                placeholderIndex = cloned.contents.indexOf(placeholder),
                placeholderBoundaries = (function() {
              if (placeholder) {
                return [ placeholderIndex, (1 + placeholderIndex) ];
              } else {
                return [ 1, 1 ];
              }
            }).call(this);
            return mergeInto(cloned, { contents: cloned.contents.slice(0, placeholderBoundaries[0]).concat([ value ], cloned.contents.slice(placeholderBoundaries[1])) });
          }).call(this);
        }
      }).call(this);
    }));
  });
  sibilant.macros.namespaces.core["|>"] = sibilant.macros.namespaces.core.pipe;
  sibilant.macros.namespaces.core.pipeThunk = (function pipeThunk$(calls) {
    /* pipe-thunk src/macros/pipe.sibilant:55:0 */
  
    var calls = Array.prototype.slice.call(arguments, 0);
  
    return {
      file: "src/macros/pipe.sibilant",
      token: "(",
      type: "expression",
      line: 55,
      col: 30,
      contents: [ {
        file: "src/macros/pipe.sibilant",
        token: "thunk",
        type: "literal",
        line: 55,
        col: 31,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, { node: this }, {
        file: "src/macros/pipe.sibilant",
        token: "(",
        type: "expression",
        line: 55,
        col: 52,
        contents: [ {
          file: "src/macros/pipe.sibilant",
          token: "pipe",
          type: "literal",
          line: 55,
          col: 53,
          contents: [],
          specials: 0,
          precedingIgnored: []
        }, {
          file: "src/macros/pipe.sibilant",
          token: "#0",
          type: "argPlaceholder",
          line: 55,
          col: 58,
          contents: [],
          specials: 0,
          precedingIgnored: [ {
            file: "src/macros/pipe.sibilant",
            token: " ",
            type: "whitespace",
            line: 55,
            col: 57,
            contents: []
          } ]
        } ].concat(calls),
        precedingIgnored: [ {
          file: "src/macros/pipe.sibilant",
          token: " ",
          type: "whitespace",
          line: 55,
          col: 51,
          contents: []
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      } ],
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core["#->"] = sibilant.macros.namespaces.core.pipeThunk;
  sibilant.macros.namespaces.core.tap = (function tap$(thing, body) {
    /* tap src/macros/pipe.sibilant:65:0 */
  
    var body = Array.prototype.slice.call(arguments, 1);
  
    return {
      file: "src/macros/pipe.sibilant",
      token: "(",
      type: "expression",
      line: 66,
      col: 8,
      contents: [ {
        file: "src/macros/pipe.sibilant",
        token: "(",
        type: "expression",
        line: 66,
        col: 9,
        contents: [ {
          file: "src/macros/pipe.sibilant",
          token: "#>",
          type: "otherChar",
          line: 66,
          col: 10,
          contents: [],
          specials: 0,
          precedingIgnored: []
        }, {
          file: "src/macros/pipe.sibilant",
          token: "(",
          type: "expression",
          line: 66,
          col: 13,
          contents: [ {
            file: "src/macros/pipe.sibilant",
            token: "|>",
            type: "otherChar",
            line: 66,
            col: 14,
            contents: [],
            specials: 0,
            precedingIgnored: []
          }, {
            file: "src/macros/pipe.sibilant",
            token: "#0",
            type: "argPlaceholder",
            line: 66,
            col: 17,
            contents: [],
            specials: 0,
            precedingIgnored: [ {
              file: "src/macros/pipe.sibilant",
              token: " ",
              type: "whitespace",
              line: 66,
              col: 16,
              contents: []
            } ]
          } ].concat(body),
          precedingIgnored: [ {
            file: "src/macros/pipe.sibilant",
            token: " ",
            type: "whitespace",
            line: 66,
            col: 12,
            contents: []
          } ],
          specials: 0,
          end: undefined,
          closed: true,
          closingIgnored: []
        }, {
          file: "src/macros/pipe.sibilant",
          token: "#0",
          type: "argPlaceholder",
          line: 66,
          col: 30,
          contents: [],
          specials: 0,
          precedingIgnored: [ {
            file: "src/macros/pipe.sibilant",
            token: " ",
            type: "whitespace",
            line: 66,
            col: 29,
            contents: []
          } ]
        } ],
        precedingIgnored: [],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      }, thing ],
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core.distribute = (function distribute$(thing, macro, alternatives) {
    /* distribute src/macros/pipe.sibilant:69:0 */
  
    var alternatives = Array.prototype.slice.call(arguments, 2);
  
    return {
      file: "src/macros/pipe.sibilant",
      token: "(",
      type: "expression",
      line: 70,
      col: 8,
      contents: [ macro ].concat(map(alternatives, (function(alt) {
        /* src/macros/pipe.sibilant:70:38 */
      
        return (function() {
          if (node__QUERY(alt, "expression")) {
            return {
              file: "src/macros/pipe.sibilant",
              token: "(",
              type: "expression",
              line: 72,
              col: 45,
              contents: [ {
                file: "src/macros/pipe.sibilant",
                token: "|>",
                type: "otherChar",
                line: 72,
                col: 46,
                contents: [],
                specials: 0,
                precedingIgnored: []
              }, thing, alt ],
              precedingIgnored: [],
              specials: 0,
              end: undefined,
              closed: true,
              closingIgnored: []
            };
          } else {
            return {
              file: "src/macros/pipe.sibilant",
              token: "(",
              type: "expression",
              line: 73,
              col: 45,
              contents: [ {
                file: "src/macros/pipe.sibilant",
                token: "|>",
                type: "otherChar",
                line: 73,
                col: 46,
                contents: [],
                specials: 0,
                precedingIgnored: []
              }, thing ].concat(alt),
              precedingIgnored: [],
              specials: 0,
              end: undefined,
              closed: true,
              closingIgnored: []
            };
          }
        }).call(this);
      }))),
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core.zero__QUERY = (function zero__QUERY$(item) {
    /* zero? src/macros/predicates.sibilant:5:0 */
  
    return {
      file: "src/macros/predicates.sibilant",
      token: "(",
      type: "expression",
      line: 5,
      col: 21,
      contents: [ {
        file: "src/macros/predicates.sibilant",
        token: "=",
        type: "otherChar",
        line: 5,
        col: 22,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, item, {
        file: "src/macros/predicates.sibilant",
        token: "0",
        type: "number",
        line: 5,
        col: 30,
        contents: [],
        specials: 0,
        precedingIgnored: [ {
          file: "src/macros/predicates.sibilant",
          token: " ",
          type: "whitespace",
          line: 5,
          col: 29,
          contents: []
        } ]
      } ],
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core.empty__QUERY = (function empty__QUERY$(arr) {
    /* empty? src/macros/predicates.sibilant:11:0 */
  
    return {
      file: "src/macros/predicates.sibilant",
      token: "(",
      type: "expression",
      line: 12,
      col: 8,
      contents: [ {
        file: "src/macros/predicates.sibilant",
        token: "=",
        type: "otherChar",
        line: 12,
        col: 9,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, {
        file: "src/macros/predicates.sibilant",
        token: "0",
        type: "number",
        line: 12,
        col: 11,
        contents: [],
        specials: 0,
        precedingIgnored: [ {
          file: "src/macros/predicates.sibilant",
          token: " ",
          type: "whitespace",
          line: 12,
          col: 10,
          contents: []
        } ]
      }, {
        file: "src/macros/predicates.sibilant",
        token: "(",
        type: "expression",
        line: 12,
        col: 13,
        contents: [ {
          file: "src/macros/predicates.sibilant",
          token: "length",
          type: "literal",
          line: 12,
          col: 14,
          contents: [],
          specials: 0,
          precedingIgnored: []
        }, arr ],
        precedingIgnored: [ {
          file: "src/macros/predicates.sibilant",
          token: " ",
          type: "whitespace",
          line: 12,
          col: 12,
          contents: []
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      } ],
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core.odd__QUERY = (function odd__QUERY$(number) {
    /* odd? src/macros/predicates.sibilant:18:0 */
  
    return {
      file: "src/macros/predicates.sibilant",
      token: "(",
      type: "expression",
      line: 19,
      col: 8,
      contents: [ {
        file: "src/macros/predicates.sibilant",
        token: "=",
        type: "otherChar",
        line: 19,
        col: 9,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, {
        file: "src/macros/predicates.sibilant",
        token: "1",
        type: "number",
        line: 19,
        col: 11,
        contents: [],
        specials: 0,
        precedingIgnored: [ {
          file: "src/macros/predicates.sibilant",
          token: " ",
          type: "whitespace",
          line: 19,
          col: 10,
          contents: []
        } ]
      }, {
        file: "src/macros/predicates.sibilant",
        token: "(",
        type: "expression",
        line: 19,
        col: 13,
        contents: [ {
          file: "src/macros/predicates.sibilant",
          token: "mod",
          type: "literal",
          line: 19,
          col: 14,
          contents: [],
          specials: 0,
          precedingIgnored: []
        }, number, {
          file: "src/macros/predicates.sibilant",
          token: "2",
          type: "number",
          line: 19,
          col: 26,
          contents: [],
          specials: 0,
          precedingIgnored: [ {
            file: "src/macros/predicates.sibilant",
            token: " ",
            type: "whitespace",
            line: 19,
            col: 25,
            contents: []
          } ]
        } ],
        precedingIgnored: [ {
          file: "src/macros/predicates.sibilant",
          token: " ",
          type: "whitespace",
          line: 19,
          col: 12,
          contents: []
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      } ],
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core.even__QUERY = (function even__QUERY$(number) {
    /* even? src/macros/predicates.sibilant:25:0 */
  
    return {
      file: "src/macros/predicates.sibilant",
      token: "(",
      type: "expression",
      line: 26,
      col: 8,
      contents: [ {
        file: "src/macros/predicates.sibilant",
        token: "=",
        type: "otherChar",
        line: 26,
        col: 9,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, {
        file: "src/macros/predicates.sibilant",
        token: "0",
        type: "number",
        line: 26,
        col: 11,
        contents: [],
        specials: 0,
        precedingIgnored: [ {
          file: "src/macros/predicates.sibilant",
          token: " ",
          type: "whitespace",
          line: 26,
          col: 10,
          contents: []
        } ]
      }, {
        file: "src/macros/predicates.sibilant",
        token: "(",
        type: "expression",
        line: 26,
        col: 13,
        contents: [ {
          file: "src/macros/predicates.sibilant",
          token: "mod",
          type: "literal",
          line: 26,
          col: 14,
          contents: [],
          specials: 0,
          precedingIgnored: []
        }, number, {
          file: "src/macros/predicates.sibilant",
          token: "2",
          type: "number",
          line: 26,
          col: 26,
          contents: [],
          specials: 0,
          precedingIgnored: [ {
            file: "src/macros/predicates.sibilant",
            token: " ",
            type: "whitespace",
            line: 26,
            col: 25,
            contents: []
          } ]
        } ],
        precedingIgnored: [ {
          file: "src/macros/predicates.sibilant",
          token: " ",
          type: "whitespace",
          line: 26,
          col: 12,
          contents: []
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      } ],
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core.string__QUERY = (function string__QUERY$(things) {
    /* string? src/macros/predicates.sibilant:30:0 */
  
    var things = Array.prototype.slice.call(arguments, 0);
  
    return {
      file: "src/macros/predicates.sibilant",
      token: "(",
      type: "expression",
      line: 31,
      col: 8,
      contents: [ {
        file: "src/macros/predicates.sibilant",
        token: "and",
        type: "literal",
        line: 31,
        col: 9,
        contents: [],
        specials: 0,
        precedingIgnored: []
      } ].concat(map(things, (function(thing) {
        /* src/macros/predicates.sibilant:31:29 */
      
        return {
          file: "src/macros/predicates.sibilant",
          token: "(",
          type: "expression",
          line: 31,
          col: 40,
          contents: [ {
            file: "src/macros/predicates.sibilant",
            token: "=",
            type: "otherChar",
            line: 31,
            col: 41,
            contents: [],
            specials: 0,
            precedingIgnored: []
          }, {
            file: "src/macros/predicates.sibilant",
            token: "(",
            type: "expression",
            line: 31,
            col: 43,
            contents: [ {
              file: "src/macros/predicates.sibilant",
              token: "typeof",
              type: "literal",
              line: 31,
              col: 44,
              contents: [],
              specials: 0,
              precedingIgnored: []
            }, thing ],
            precedingIgnored: [ {
              file: "src/macros/predicates.sibilant",
              token: " ",
              type: "whitespace",
              line: 31,
              col: 42,
              contents: []
            } ],
            specials: 0,
            end: undefined,
            closed: true,
            closingIgnored: []
          }, {"file":"src/macros/predicates.sibilant","token":"'","type":"tick","line":31,"col":59,"contents":[{"file":"src/macros/predicates.sibilant","token":"string","type":"literal","line":31,"col":60,"contents":[],"specials":0,"precedingIgnored":[]}],"precedingIgnored":[{"file":"src/macros/predicates.sibilant","token":" ","type":"whitespace","line":31,"col":58,"contents":[]}]} ],
          precedingIgnored: [],
          specials: 0,
          end: undefined,
          closed: true,
          closingIgnored: []
        };
      }))),
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core.function__QUERY = (function function__QUERY$(things) {
    /* function? src/macros/predicates.sibilant:37:0 */
  
    var things = Array.prototype.slice.call(arguments, 0);
  
    return {
      file: "src/macros/predicates.sibilant",
      token: "(",
      type: "expression",
      line: 38,
      col: 8,
      contents: [ {
        file: "src/macros/predicates.sibilant",
        token: "and",
        type: "literal",
        line: 38,
        col: 9,
        contents: [],
        specials: 0,
        precedingIgnored: []
      } ].concat(map(things, (function(thing) {
        /* src/macros/predicates.sibilant:38:29 */
      
        return {
          file: "src/macros/predicates.sibilant",
          token: "(",
          type: "expression",
          line: 38,
          col: 40,
          contents: [ {
            file: "src/macros/predicates.sibilant",
            token: "=",
            type: "otherChar",
            line: 38,
            col: 41,
            contents: [],
            specials: 0,
            precedingIgnored: []
          }, {
            file: "src/macros/predicates.sibilant",
            token: "(",
            type: "expression",
            line: 38,
            col: 43,
            contents: [ {
              file: "src/macros/predicates.sibilant",
              token: "typeof",
              type: "literal",
              line: 38,
              col: 44,
              contents: [],
              specials: 0,
              precedingIgnored: []
            }, thing ],
            precedingIgnored: [ {
              file: "src/macros/predicates.sibilant",
              token: " ",
              type: "whitespace",
              line: 38,
              col: 42,
              contents: []
            } ],
            specials: 0,
            end: undefined,
            closed: true,
            closingIgnored: []
          }, {"file":"src/macros/predicates.sibilant","token":"'","type":"tick","line":38,"col":59,"contents":[{"file":"src/macros/predicates.sibilant","token":"function","type":"literal","line":38,"col":60,"contents":[],"specials":0,"precedingIgnored":[]}],"precedingIgnored":[{"file":"src/macros/predicates.sibilant","token":" ","type":"whitespace","line":38,"col":58,"contents":[]}]} ],
          precedingIgnored: [],
          specials: 0,
          end: undefined,
          closed: true,
          closingIgnored: []
        };
      }))),
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core.undefined__QUERY = (function undefined__QUERY$(things) {
    /* undefined? src/macros/predicates.sibilant:45:0 */
  
    var things = Array.prototype.slice.call(arguments, 0);
  
    return {
      file: "src/macros/predicates.sibilant",
      token: "(",
      type: "expression",
      line: 46,
      col: 8,
      contents: [ {
        file: "src/macros/predicates.sibilant",
        token: "and",
        type: "literal",
        line: 46,
        col: 9,
        contents: [],
        specials: 0,
        precedingIgnored: []
      } ].concat(map(things, (function(thing) {
        /* src/macros/predicates.sibilant:46:29 */
      
        return {
          file: "src/macros/predicates.sibilant",
          token: "(",
          type: "expression",
          line: 46,
          col: 40,
          contents: [ {
            file: "src/macros/predicates.sibilant",
            token: "=",
            type: "otherChar",
            line: 46,
            col: 41,
            contents: [],
            specials: 0,
            precedingIgnored: []
          }, {
            file: "src/macros/predicates.sibilant",
            token: "(",
            type: "expression",
            line: 46,
            col: 43,
            contents: [ {
              file: "src/macros/predicates.sibilant",
              token: "typeof",
              type: "literal",
              line: 46,
              col: 44,
              contents: [],
              specials: 0,
              precedingIgnored: []
            }, thing ],
            precedingIgnored: [ {
              file: "src/macros/predicates.sibilant",
              token: " ",
              type: "whitespace",
              line: 46,
              col: 42,
              contents: []
            } ],
            specials: 0,
            end: undefined,
            closed: true,
            closingIgnored: []
          }, {"file":"src/macros/predicates.sibilant","token":"'","type":"tick","line":46,"col":59,"contents":[{"file":"src/macros/predicates.sibilant","token":"undefined","type":"literal","line":46,"col":60,"contents":[],"specials":0,"precedingIgnored":[]}],"precedingIgnored":[{"file":"src/macros/predicates.sibilant","token":" ","type":"whitespace","line":46,"col":58,"contents":[]}]} ],
          precedingIgnored: [],
          specials: 0,
          end: undefined,
          closed: true,
          closingIgnored: []
        };
      }))),
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core.defined__QUERY = (function defined__QUERY$(things) {
    /* defined? src/macros/predicates.sibilant:53:0 */
  
    var things = Array.prototype.slice.call(arguments, 0);
  
    return {
      file: "src/macros/predicates.sibilant",
      token: "(",
      type: "expression",
      line: 54,
      col: 8,
      contents: [ {
        file: "src/macros/predicates.sibilant",
        token: "and",
        type: "literal",
        line: 54,
        col: 9,
        contents: [],
        specials: 0,
        precedingIgnored: []
      } ].concat(map(things, (function(thing) {
        /* src/macros/predicates.sibilant:54:29 */
      
        return {
          file: "src/macros/predicates.sibilant",
          token: "(",
          type: "expression",
          line: 54,
          col: 40,
          contents: [ {
            file: "src/macros/predicates.sibilant",
            token: "!=",
            type: "otherChar",
            line: 54,
            col: 41,
            contents: [],
            specials: 0,
            precedingIgnored: []
          }, {
            file: "src/macros/predicates.sibilant",
            token: "(",
            type: "expression",
            line: 54,
            col: 44,
            contents: [ {
              file: "src/macros/predicates.sibilant",
              token: "typeof",
              type: "literal",
              line: 54,
              col: 45,
              contents: [],
              specials: 0,
              precedingIgnored: []
            }, thing ],
            precedingIgnored: [ {
              file: "src/macros/predicates.sibilant",
              token: " ",
              type: "whitespace",
              line: 54,
              col: 43,
              contents: []
            } ],
            specials: 0,
            end: undefined,
            closed: true,
            closingIgnored: []
          }, {"file":"src/macros/predicates.sibilant","token":"'","type":"tick","line":54,"col":60,"contents":[{"file":"src/macros/predicates.sibilant","token":"undefined","type":"literal","line":54,"col":61,"contents":[],"specials":0,"precedingIgnored":[]}],"precedingIgnored":[{"file":"src/macros/predicates.sibilant","token":" ","type":"whitespace","line":54,"col":59,"contents":[]}]} ],
          precedingIgnored: [],
          specials: 0,
          end: undefined,
          closed: true,
          closingIgnored: []
        };
      }))),
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core.number__QUERY = (function number__QUERY$(things) {
    /* number? src/macros/predicates.sibilant:61:0 */
  
    var things = Array.prototype.slice.call(arguments, 0);
  
    return {
      file: "src/macros/predicates.sibilant",
      token: "(",
      type: "expression",
      line: 62,
      col: 8,
      contents: [ {
        file: "src/macros/predicates.sibilant",
        token: "and",
        type: "literal",
        line: 62,
        col: 9,
        contents: [],
        specials: 0,
        precedingIgnored: []
      } ].concat(map(things, (function(thing) {
        /* src/macros/predicates.sibilant:62:29 */
      
        return {
          file: "src/macros/predicates.sibilant",
          token: "(",
          type: "expression",
          line: 62,
          col: 40,
          contents: [ {
            file: "src/macros/predicates.sibilant",
            token: "=",
            type: "otherChar",
            line: 62,
            col: 41,
            contents: [],
            specials: 0,
            precedingIgnored: []
          }, {
            file: "src/macros/predicates.sibilant",
            token: "(",
            type: "expression",
            line: 62,
            col: 43,
            contents: [ {
              file: "src/macros/predicates.sibilant",
              token: "typeof",
              type: "literal",
              line: 62,
              col: 44,
              contents: [],
              specials: 0,
              precedingIgnored: []
            }, thing ],
            precedingIgnored: [ {
              file: "src/macros/predicates.sibilant",
              token: " ",
              type: "whitespace",
              line: 62,
              col: 42,
              contents: []
            } ],
            specials: 0,
            end: undefined,
            closed: true,
            closingIgnored: []
          }, {"file":"src/macros/predicates.sibilant","token":"'","type":"tick","line":62,"col":59,"contents":[{"file":"src/macros/predicates.sibilant","token":"number","type":"literal","line":62,"col":60,"contents":[],"specials":0,"precedingIgnored":[]}],"precedingIgnored":[{"file":"src/macros/predicates.sibilant","token":" ","type":"whitespace","line":62,"col":58,"contents":[]}]} ],
          precedingIgnored: [],
          specials: 0,
          end: undefined,
          closed: true,
          closingIgnored: []
        };
      }))),
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core.array__QUERY = (function array__QUERY$(thing) {
    /* array? src/macros/predicates.sibilant:70:0 */
  
    return {
      file: "src/macros/predicates.sibilant",
      token: "(",
      type: "expression",
      line: 71,
      col: 8,
      contents: [ {
        file: "src/macros/predicates.sibilant",
        token: "and",
        type: "literal",
        line: 71,
        col: 9,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, thing, {
        file: "src/macros/predicates.sibilant",
        token: "(",
        type: "expression",
        line: 73,
        col: 9,
        contents: [ {
          file: "src/macros/predicates.sibilant",
          token: "=",
          type: "otherChar",
          line: 73,
          col: 10,
          contents: [],
          specials: 0,
          precedingIgnored: []
        }, {"file":"src/macros/predicates.sibilant","token":"'","type":"tick","line":73,"col":12,"contents":[{"file":"src/macros/predicates.sibilant","token":"object","type":"literal","line":73,"col":13,"contents":[],"specials":0,"precedingIgnored":[]}],"precedingIgnored":[{"file":"src/macros/predicates.sibilant","token":" ","type":"whitespace","line":73,"col":11,"contents":[]}]}, {
          file: "src/macros/predicates.sibilant",
          token: "(",
          type: "expression",
          line: 73,
          col: 20,
          contents: [ {
            file: "src/macros/predicates.sibilant",
            token: "typeof",
            type: "literal",
            line: 73,
            col: 21,
            contents: [],
            specials: 0,
            precedingIgnored: []
          }, thing ],
          precedingIgnored: [ {
            file: "src/macros/predicates.sibilant",
            token: " ",
            type: "whitespace",
            line: 73,
            col: 19,
            contents: []
          } ],
          specials: 0,
          end: undefined,
          closed: true,
          closingIgnored: []
        } ],
        precedingIgnored: [ {
          file: "src/macros/predicates.sibilant",
          token: "\n",
          type: "newline",
          line: 72,
          col: 15,
          contents: []
        }, {
          file: "src/macros/predicates.sibilant",
          token: "         ",
          type: "whitespace",
          line: 73,
          col: 0,
          contents: []
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      }, {
        file: "src/macros/predicates.sibilant",
        token: "(",
        type: "expression",
        line: 74,
        col: 9,
        contents: [ {
          file: "src/macros/predicates.sibilant",
          token: "=",
          type: "otherChar",
          line: 74,
          col: 10,
          contents: [],
          specials: 0,
          precedingIgnored: []
        }, {"file":"src/macros/predicates.sibilant","token":"'","type":"tick","line":74,"col":12,"contents":[{"file":"src/macros/predicates.sibilant","token":"Array","type":"literal","line":74,"col":13,"contents":[],"specials":0,"precedingIgnored":[]}],"precedingIgnored":[{"file":"src/macros/predicates.sibilant","token":" ","type":"whitespace","line":74,"col":11,"contents":[]}]}, {
          file: "src/macros/predicates.sibilant",
          token: "(",
          type: "expression",
          line: 74,
          col: 19,
          contents: [ {
            file: "src/macros/predicates.sibilant",
            token: "get",
            type: "literal",
            line: 74,
            col: 20,
            contents: [],
            specials: 0,
            precedingIgnored: []
          }, thing, {"file":"src/macros/predicates.sibilant","token":"'","type":"tick","line":74,"col":31,"contents":[{"file":"src/macros/predicates.sibilant","token":"constructor","type":"literal","line":74,"col":32,"contents":[],"specials":0,"precedingIgnored":[]}],"precedingIgnored":[{"file":"src/macros/predicates.sibilant","token":" ","type":"whitespace","line":74,"col":30,"contents":[]}]}, {"file":"src/macros/predicates.sibilant","token":"'","type":"tick","line":74,"col":44,"contents":[{"file":"src/macros/predicates.sibilant","token":"name","type":"literal","line":74,"col":45,"contents":[],"specials":0,"precedingIgnored":[]}],"precedingIgnored":[{"file":"src/macros/predicates.sibilant","token":" ","type":"whitespace","line":74,"col":43,"contents":[]}]} ],
          precedingIgnored: [ {
            file: "src/macros/predicates.sibilant",
            token: " ",
            type: "whitespace",
            line: 74,
            col: 18,
            contents: []
          } ],
          specials: 0,
          end: undefined,
          closed: true,
          closingIgnored: []
        } ],
        precedingIgnored: [ {
          file: "src/macros/predicates.sibilant",
          token: "\n",
          type: "newline",
          line: 73,
          col: 36,
          contents: []
        }, {
          file: "src/macros/predicates.sibilant",
          token: "         ",
          type: "whitespace",
          line: 74,
          col: 0,
          contents: []
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      } ],
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core.list__QUERY = sibilant.macros.namespaces.core.array__QUERY;
  sibilant.macros.namespaces.core.hash__QUERY = (function hash__QUERY$(thing) {
    /* hash? src/macros/predicates.sibilant:83:0 */
  
    return {
      file: "src/macros/predicates.sibilant",
      token: "(",
      type: "expression",
      line: 84,
      col: 8,
      contents: [ {
        file: "src/macros/predicates.sibilant",
        token: "and",
        type: "literal",
        line: 84,
        col: 9,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, {
        file: "src/macros/predicates.sibilant",
        token: "(",
        type: "expression",
        line: 84,
        col: 13,
        contents: [ {
          file: "src/macros/predicates.sibilant",
          token: "=",
          type: "otherChar",
          line: 84,
          col: 14,
          contents: [],
          specials: 0,
          precedingIgnored: []
        }, {"file":"src/macros/predicates.sibilant","token":"'","type":"tick","line":84,"col":16,"contents":[{"file":"src/macros/predicates.sibilant","token":"object","type":"literal","line":84,"col":17,"contents":[],"specials":0,"precedingIgnored":[]}],"precedingIgnored":[{"file":"src/macros/predicates.sibilant","token":" ","type":"whitespace","line":84,"col":15,"contents":[]}]}, {
          file: "src/macros/predicates.sibilant",
          token: "(",
          type: "expression",
          line: 84,
          col: 24,
          contents: [ {
            file: "src/macros/predicates.sibilant",
            token: "typeof",
            type: "literal",
            line: 84,
            col: 25,
            contents: [],
            specials: 0,
            precedingIgnored: []
          }, thing ],
          precedingIgnored: [ {
            file: "src/macros/predicates.sibilant",
            token: " ",
            type: "whitespace",
            line: 84,
            col: 23,
            contents: []
          } ],
          specials: 0,
          end: undefined,
          closed: true,
          closingIgnored: []
        } ],
        precedingIgnored: [ {
          file: "src/macros/predicates.sibilant",
          token: " ",
          type: "whitespace",
          line: 84,
          col: 12,
          contents: []
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      }, {
        file: "src/macros/predicates.sibilant",
        token: "(",
        type: "expression",
        line: 85,
        col: 13,
        contents: [ {
          file: "src/macros/predicates.sibilant",
          token: "!=",
          type: "otherChar",
          line: 85,
          col: 14,
          contents: [],
          specials: 0,
          precedingIgnored: []
        }, thing, {
          file: "src/macros/predicates.sibilant",
          token: "null",
          type: "literal",
          line: 85,
          col: 24,
          contents: [],
          specials: 0,
          precedingIgnored: [ {
            file: "src/macros/predicates.sibilant",
            token: " ",
            type: "whitespace",
            line: 85,
            col: 23,
            contents: []
          } ]
        } ],
        precedingIgnored: [ {
          file: "src/macros/predicates.sibilant",
          token: "\n",
          type: "newline",
          line: 84,
          col: 40,
          contents: []
        }, {
          file: "src/macros/predicates.sibilant",
          token: "             ",
          type: "whitespace",
          line: 85,
          col: 0,
          contents: []
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      }, {
        file: "src/macros/predicates.sibilant",
        token: "(",
        type: "expression",
        line: 86,
        col: 13,
        contents: [ {
          file: "src/macros/predicates.sibilant",
          token: "!=",
          type: "otherChar",
          line: 86,
          col: 14,
          contents: [],
          specials: 0,
          precedingIgnored: []
        }, {
          file: "src/macros/predicates.sibilant",
          token: "(",
          type: "expression",
          line: 86,
          col: 17,
          contents: [ {
            file: "src/macros/predicates.sibilant",
            token: "get",
            type: "literal",
            line: 86,
            col: 18,
            contents: [],
            specials: 0,
            precedingIgnored: []
          }, thing, {"file":"src/macros/predicates.sibilant","token":"'","type":"tick","line":86,"col":29,"contents":[{"file":"src/macros/predicates.sibilant","token":"constructor","type":"literal","line":86,"col":30,"contents":[],"specials":0,"precedingIgnored":[]}],"precedingIgnored":[{"file":"src/macros/predicates.sibilant","token":" ","type":"whitespace","line":86,"col":28,"contents":[]}]}, {"file":"src/macros/predicates.sibilant","token":"'","type":"tick","line":86,"col":42,"contents":[{"file":"src/macros/predicates.sibilant","token":"name","type":"literal","line":86,"col":43,"contents":[],"specials":0,"precedingIgnored":[]}],"precedingIgnored":[{"file":"src/macros/predicates.sibilant","token":" ","type":"whitespace","line":86,"col":41,"contents":[]}]} ],
          precedingIgnored: [ {
            file: "src/macros/predicates.sibilant",
            token: " ",
            type: "whitespace",
            line: 86,
            col: 16,
            contents: []
          } ],
          specials: 0,
          end: undefined,
          closed: true,
          closingIgnored: []
        }, {"file":"src/macros/predicates.sibilant","token":"'","type":"tick","line":86,"col":49,"contents":[{"file":"src/macros/predicates.sibilant","token":"Array","type":"literal","line":86,"col":50,"contents":[],"specials":0,"precedingIgnored":[]}],"precedingIgnored":[{"file":"src/macros/predicates.sibilant","token":" ","type":"whitespace","line":86,"col":48,"contents":[]}]} ],
        precedingIgnored: [ {
          file: "src/macros/predicates.sibilant",
          token: "\n",
          type: "newline",
          line: 85,
          col: 29,
          contents: []
        }, {
          file: "src/macros/predicates.sibilant",
          token: "             ",
          type: "whitespace",
          line: 86,
          col: 0,
          contents: []
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      } ],
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core.object__QUERY = sibilant.macros.namespaces.core.hash__QUERY;
  sibilant.macros.namespaces.core.instanceOf__QUERY = (function instanceOf__QUERY$(item, type) {
    /* instance-of? src/macros/predicates.sibilant:93:0 */
  
    return "(transpile(item)\" instanceof \"transpile(type))";
  });
  sibilant.macros.namespaces.core.exists__QUERY = (function exists__QUERY$(thing) {
    /* exists? src/macros/predicates.sibilant:101:0 */
  
    return {
      file: "src/macros/predicates.sibilant",
      token: "(",
      type: "expression",
      line: 102,
      col: 8,
      contents: [ {
        file: "src/macros/predicates.sibilant",
        token: "and",
        type: "literal",
        line: 102,
        col: 9,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, {
        file: "src/macros/predicates.sibilant",
        token: "(",
        type: "expression",
        line: 102,
        col: 13,
        contents: [ {
          file: "src/macros/predicates.sibilant",
          token: "defined?",
          type: "literal",
          line: 102,
          col: 14,
          contents: [],
          specials: 0,
          precedingIgnored: []
        }, thing ],
        precedingIgnored: [ {
          file: "src/macros/predicates.sibilant",
          token: " ",
          type: "whitespace",
          line: 102,
          col: 12,
          contents: []
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      }, {
        file: "src/macros/predicates.sibilant",
        token: "(",
        type: "expression",
        line: 102,
        col: 31,
        contents: [ {
          file: "src/macros/predicates.sibilant",
          token: "!=",
          type: "otherChar",
          line: 102,
          col: 32,
          contents: [],
          specials: 0,
          precedingIgnored: []
        }, thing, {
          file: "src/macros/predicates.sibilant",
          token: "null",
          type: "literal",
          line: 102,
          col: 42,
          contents: [],
          specials: 0,
          precedingIgnored: [ {
            file: "src/macros/predicates.sibilant",
            token: " ",
            type: "whitespace",
            line: 102,
            col: 41,
            contents: []
          } ]
        } ],
        precedingIgnored: [ {
          file: "src/macros/predicates.sibilant",
          token: " ",
          type: "whitespace",
          line: 102,
          col: 30,
          contents: []
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      } ],
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core.hasKey__QUERY = (function hasKey__QUERY$(object, key) {
    /* has-key? src/macros/predicates.sibilant:109:0 */
  
    return {
      file: "src/macros/predicates.sibilant",
      token: "(",
      type: "expression",
      line: 110,
      col: 8,
      contents: [ {
        file: "src/macros/predicates.sibilant",
        token: ".",
        type: "dots",
        line: 110,
        col: 9,
        contents: [ {
          file: "src/macros/predicates.sibilant",
          token: "has-own-property",
          type: "literal",
          line: 110,
          col: 10,
          contents: [],
          specials: 0,
          precedingIgnored: []
        } ],
        precedingIgnored: []
      }, object, key ],
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core.lowerCase__QUERY = (function lowerCase__QUERY$(str) {
    /* lower-case? src/macros/predicates.sibilant:115:0 */
  
    return {
      file: "src/macros/predicates.sibilant",
      token: "(",
      type: "expression",
      line: 116,
      col: 8,
      contents: [ {
        file: "src/macros/predicates.sibilant",
        token: "and",
        type: "literal",
        line: 116,
        col: 9,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, {
        file: "src/macros/predicates.sibilant",
        token: "(",
        type: "expression",
        line: 117,
        col: 9,
        contents: [ {
          file: "src/macros/predicates.sibilant",
          token: "!=",
          type: "otherChar",
          line: 117,
          col: 10,
          contents: [],
          specials: 0,
          precedingIgnored: []
        }, {
          file: "src/macros/predicates.sibilant",
          token: "(",
          type: "expression",
          line: 117,
          col: 13,
          contents: [ {
            file: "src/macros/predicates.sibilant",
            token: ".",
            type: "dots",
            line: 117,
            col: 14,
            contents: [ {
              file: "src/macros/predicates.sibilant",
              token: "to-upper-case",
              type: "literal",
              line: 117,
              col: 15,
              contents: [],
              specials: 0,
              precedingIgnored: []
            } ],
            precedingIgnored: []
          }, str ],
          precedingIgnored: [ {
            file: "src/macros/predicates.sibilant",
            token: " ",
            type: "whitespace",
            line: 117,
            col: 12,
            contents: []
          } ],
          specials: 0,
          end: undefined,
          closed: true,
          closingIgnored: []
        }, str ],
        precedingIgnored: [ {
          file: "src/macros/predicates.sibilant",
          token: "\n",
          type: "newline",
          line: 116,
          col: 12,
          contents: []
        }, {
          file: "src/macros/predicates.sibilant",
          token: "         ",
          type: "whitespace",
          line: 117,
          col: 0,
          contents: []
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      }, {
        file: "src/macros/predicates.sibilant",
        token: "(",
        type: "expression",
        line: 118,
        col: 9,
        contents: [ {
          file: "src/macros/predicates.sibilant",
          token: "=",
          type: "otherChar",
          line: 118,
          col: 10,
          contents: [],
          specials: 0,
          precedingIgnored: []
        }, {
          file: "src/macros/predicates.sibilant",
          token: "(",
          type: "expression",
          line: 118,
          col: 12,
          contents: [ {
            file: "src/macros/predicates.sibilant",
            token: ".",
            type: "dots",
            line: 118,
            col: 13,
            contents: [ {
              file: "src/macros/predicates.sibilant",
              token: "to-lower-case",
              type: "literal",
              line: 118,
              col: 14,
              contents: [],
              specials: 0,
              precedingIgnored: []
            } ],
            precedingIgnored: []
          }, str ],
          precedingIgnored: [ {
            file: "src/macros/predicates.sibilant",
            token: " ",
            type: "whitespace",
            line: 118,
            col: 11,
            contents: []
          } ],
          specials: 0,
          end: undefined,
          closed: true,
          closingIgnored: []
        }, str ],
        precedingIgnored: [ {
          file: "src/macros/predicates.sibilant",
          token: "\n",
          type: "newline",
          line: 117,
          col: 40,
          contents: []
        }, {
          file: "src/macros/predicates.sibilant",
          token: "         ",
          type: "whitespace",
          line: 118,
          col: 0,
          contents: []
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      } ],
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core.upperCase__QUERY = (function upperCase__QUERY$(str) {
    /* upper-case? src/macros/predicates.sibilant:125:0 */
  
    return {
      file: "src/macros/predicates.sibilant",
      token: "(",
      type: "expression",
      line: 126,
      col: 8,
      contents: [ {
        file: "src/macros/predicates.sibilant",
        token: "and",
        type: "literal",
        line: 126,
        col: 9,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, {
        file: "src/macros/predicates.sibilant",
        token: "(",
        type: "expression",
        line: 127,
        col: 9,
        contents: [ {
          file: "src/macros/predicates.sibilant",
          token: "!=",
          type: "otherChar",
          line: 127,
          col: 10,
          contents: [],
          specials: 0,
          precedingIgnored: []
        }, {
          file: "src/macros/predicates.sibilant",
          token: "(",
          type: "expression",
          line: 127,
          col: 13,
          contents: [ {
            file: "src/macros/predicates.sibilant",
            token: ".",
            type: "dots",
            line: 127,
            col: 14,
            contents: [ {
              file: "src/macros/predicates.sibilant",
              token: "to-lower-case",
              type: "literal",
              line: 127,
              col: 15,
              contents: [],
              specials: 0,
              precedingIgnored: []
            } ],
            precedingIgnored: []
          }, str ],
          precedingIgnored: [ {
            file: "src/macros/predicates.sibilant",
            token: " ",
            type: "whitespace",
            line: 127,
            col: 12,
            contents: []
          } ],
          specials: 0,
          end: undefined,
          closed: true,
          closingIgnored: []
        }, str ],
        precedingIgnored: [ {
          file: "src/macros/predicates.sibilant",
          token: "\n",
          type: "newline",
          line: 126,
          col: 12,
          contents: []
        }, {
          file: "src/macros/predicates.sibilant",
          token: "         ",
          type: "whitespace",
          line: 127,
          col: 0,
          contents: []
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      }, {
        file: "src/macros/predicates.sibilant",
        token: "(",
        type: "expression",
        line: 128,
        col: 9,
        contents: [ {
          file: "src/macros/predicates.sibilant",
          token: "=",
          type: "otherChar",
          line: 128,
          col: 10,
          contents: [],
          specials: 0,
          precedingIgnored: []
        }, {
          file: "src/macros/predicates.sibilant",
          token: "(",
          type: "expression",
          line: 128,
          col: 12,
          contents: [ {
            file: "src/macros/predicates.sibilant",
            token: ".",
            type: "dots",
            line: 128,
            col: 13,
            contents: [ {
              file: "src/macros/predicates.sibilant",
              token: "to-upper-case",
              type: "literal",
              line: 128,
              col: 14,
              contents: [],
              specials: 0,
              precedingIgnored: []
            } ],
            precedingIgnored: []
          }, str ],
          precedingIgnored: [ {
            file: "src/macros/predicates.sibilant",
            token: " ",
            type: "whitespace",
            line: 128,
            col: 11,
            contents: []
          } ],
          specials: 0,
          end: undefined,
          closed: true,
          closingIgnored: []
        }, str ],
        precedingIgnored: [ {
          file: "src/macros/predicates.sibilant",
          token: "\n",
          type: "newline",
          line: 127,
          col: 40,
          contents: []
        }, {
          file: "src/macros/predicates.sibilant",
          token: "         ",
          type: "whitespace",
          line: 128,
          col: 0,
          contents: []
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      } ],
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core.match__QUERY = (function match__QUERY$(regexp, string) {
    /* match? src/macros/regex.sibilant:6:0 */
  
    return {
      file: "src/macros/regex.sibilant",
      token: "(",
      type: "expression",
      line: 7,
      col: 8,
      contents: [ {
        file: "src/macros/regex.sibilant",
        token: ".",
        type: "dots",
        line: 7,
        col: 9,
        contents: [ {
          file: "src/macros/regex.sibilant",
          token: "match",
          type: "literal",
          line: 7,
          col: 10,
          contents: [],
          specials: 0,
          precedingIgnored: []
        } ],
        precedingIgnored: []
      }, string, regexp ],
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core.matchRegex__QUERY = (function matchRegex__QUERY$(string, pattern, flags) {
    /* match-regex? src/macros/regex.sibilant:12:0 */
  
    return {
      file: "src/macros/regex.sibilant",
      token: "(",
      type: "expression",
      line: 13,
      col: 8,
      contents: [ {
        file: "src/macros/regex.sibilant",
        token: "match?",
        type: "literal",
        line: 13,
        col: 9,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, {
        file: "src/macros/regex.sibilant",
        token: "(",
        type: "expression",
        line: 13,
        col: 16,
        contents: [ {
          file: "src/macros/regex.sibilant",
          token: "regex",
          type: "literal",
          line: 13,
          col: 17,
          contents: [],
          specials: 0,
          precedingIgnored: []
        }, pattern, flags ],
        precedingIgnored: [ {
          file: "src/macros/regex.sibilant",
          token: " ",
          type: "whitespace",
          line: 13,
          col: 15,
          contents: []
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      }, string ],
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core.replace = (function replace$(string, pattern, replacement) {
    /* replace src/macros/regex.sibilant:19:0 */
  
    return {
      file: "src/macros/regex.sibilant",
      token: "(",
      type: "expression",
      line: 20,
      col: 8,
      contents: [ {
        file: "src/macros/regex.sibilant",
        token: ".",
        type: "dots",
        line: 20,
        col: 9,
        contents: [ {
          file: "src/macros/regex.sibilant",
          token: "replace",
          type: "literal",
          line: 20,
          col: 10,
          contents: [],
          specials: 0,
          precedingIgnored: []
        } ],
        precedingIgnored: []
      }, string, {
        file: "src/macros/regex.sibilant",
        token: "(",
        type: "expression",
        line: 21,
        col: 14,
        contents: [ {
          file: "src/macros/regex.sibilant",
          token: "regex",
          type: "literal",
          line: 21,
          col: 15,
          contents: [],
          specials: 0,
          precedingIgnored: []
        }, pattern ],
        precedingIgnored: [ {
          file: "src/macros/regex.sibilant",
          token: "\n",
          type: "newline",
          line: 20,
          col: 25,
          contents: []
        }, {
          file: "src/macros/regex.sibilant",
          token: "              ",
          type: "whitespace",
          line: 21,
          col: 0,
          contents: []
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      }, replacement ],
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core.replaceAll = (function replaceAll$(string, pattern, replacement) {
    /* replace-all src/macros/regex.sibilant:27:0 */
  
    return {
      file: "src/macros/regex.sibilant",
      token: "(",
      type: "expression",
      line: 28,
      col: 8,
      contents: [ {
        file: "src/macros/regex.sibilant",
        token: ".",
        type: "dots",
        line: 28,
        col: 9,
        contents: [ {
          file: "src/macros/regex.sibilant",
          token: "replace",
          type: "literal",
          line: 28,
          col: 10,
          contents: [],
          specials: 0,
          precedingIgnored: []
        } ],
        precedingIgnored: []
      }, string, {
        file: "src/macros/regex.sibilant",
        token: "(",
        type: "expression",
        line: 28,
        col: 26,
        contents: [ {
          file: "src/macros/regex.sibilant",
          token: "regex",
          type: "literal",
          line: 28,
          col: 27,
          contents: [],
          specials: 0,
          precedingIgnored: []
        }, pattern, {"file":"src/macros/regex.sibilant","token":"'","type":"tick","line":28,"col":42,"contents":[{"file":"src/macros/regex.sibilant","token":"g","type":"literal","line":28,"col":43,"contents":[],"specials":0,"precedingIgnored":[]}],"precedingIgnored":[{"file":"src/macros/regex.sibilant","token":" ","type":"whitespace","line":28,"col":41,"contents":[]}]} ],
        precedingIgnored: [ {
          file: "src/macros/regex.sibilant",
          token: " ",
          type: "whitespace",
          line: 28,
          col: 25,
          contents: []
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      }, replacement ],
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core.regex = (function regex$(pattern, flags) {
    /* regex src/macros/regex.sibilant:33:0 */
  
    return {
      file: "src/macros/regex.sibilant",
      token: "(",
      type: "expression",
      line: 34,
      col: 8,
      contents: [ {
        file: "src/macros/regex.sibilant",
        token: "new",
        type: "literal",
        line: 34,
        col: 9,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, {
        file: "src/macros/regex.sibilant",
        token: "RegExp",
        type: "literal",
        line: 34,
        col: 13,
        contents: [],
        specials: 0,
        precedingIgnored: [ {
          file: "src/macros/regex.sibilant",
          token: " ",
          type: "whitespace",
          line: 34,
          col: 12,
          contents: []
        } ]
      }, pattern, (flags || "undefined") ],
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core.switch = (function switch$(obj, cases) {
    /* switch src/macros/switch.sibilant:13:0 */
  
    var cases = Array.prototype.slice.call(arguments, 1);
  
    return [ "(function() {", indent([ "switch(", transpile(obj), ") {", map(cases, (function(caseDef) {
      /* src/macros/switch.sibilant:16:30 */
    
      var caseNameNode = caseDef.contents[0],
          caseLabels = (function() {
        if (node__QUERY(caseNameNode, "expression", "bracket")) {
          return caseNameNode.contents;
        } else {
          return [ caseNameNode ];
        }
      }).call(this),
          caseString = interleave("\n", map(caseLabels, (function(c) {
        /* src/macros/switch.sibilant:22:78 */
      
        return (function() {
          if ("default" === c.token) {
            return "default:";
          } else {
            return [ "case ", transpile(c), ":" ];
          }
        }).call(this);
      })));
      return [ "\n", caseString, indent({
        file: "src/macros/switch.sibilant",
        token: "(",
        type: "expression",
        line: 26,
        col: 59,
        contents: [ {
          file: "src/macros/switch.sibilant",
          token: "do",
          type: "literal",
          line: 26,
          col: 60,
          contents: [],
          specials: 0,
          precedingIgnored: []
        } ].concat(caseDef.contents.slice(1)),
        precedingIgnored: [],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      }) ];
    })), "}" ]), "}).call(this)" ];
  });
  sibilant.macros.namespaces.core.var = (function var$(pairs) {
    /* var src/macros/variables.sibilant:15:0 */
  
    var pairs = Array.prototype.slice.call(arguments, 0);
  
    return asStatement([ "var ", interleave(map(destructure(pairs), (function(pair) {
      /* src/macros/variables.sibilant:19:25 */
    
      return [ pair[0], " = ", pair[1] ];
    })), ",\n    ") ]);
  });
  sibilant.macros.namespaces.core.const = (function const$(pairs) {
    /* const src/macros/variables.sibilant:35:0 */
  
    var pairs = Array.prototype.slice.call(arguments, 0);
  
    return asStatement([ "const ", interleave(map(destructure(pairs), (function(pair) {
      /* src/macros/variables.sibilant:39:25 */
    
      return [ pair[0], " = ", pair[1] ];
    })), ",\n    ") ]);
  });
  sibilant.macros.namespaces.core.assign = (function assign$(pairs) {
    /* assign src/macros/variables.sibilant:56:0 */
  
    var pairs = Array.prototype.slice.call(arguments, 0);
  
    return interleave(map(destructure(pairs), (function(pair) {
      /* src/macros/variables.sibilant:59:17 */
    
      return asStatement([ pair[0], " = ", pair[1] ]);
    })), "\n");
  });
  sibilant.macros.namespaces.core.default = (function default$(pairs) {
    /* default src/macros/variables.sibilant:67:0 */
  
    var pairs = Array.prototype.slice.call(arguments, 0);
  
    return interleave("\n", bulkMap(pairs, (function(name, value) {
      /* src/macros/variables.sibilant:68:40 */
    
      return {
        file: "src/macros/variables.sibilant",
        token: "(",
        type: "expression",
        line: 69,
        col: 35,
        contents: [ {
          file: "src/macros/variables.sibilant",
          token: "assign",
          type: "literal",
          line: 69,
          col: 36,
          contents: [],
          specials: 0,
          precedingIgnored: []
        }, name, {
          file: "src/macros/variables.sibilant",
          token: "(",
          type: "expression",
          line: 69,
          col: 49,
          contents: [ {
            file: "src/macros/variables.sibilant",
            token: "ternary",
            type: "literal",
            line: 69,
            col: 50,
            contents: [],
            specials: 0,
            precedingIgnored: []
          }, {
            file: "src/macros/variables.sibilant",
            token: "(",
            type: "expression",
            line: 69,
            col: 58,
            contents: [ {
              file: "src/macros/variables.sibilant",
              token: "defined?",
              type: "literal",
              line: 69,
              col: 59,
              contents: [],
              specials: 0,
              precedingIgnored: []
            }, name ],
            precedingIgnored: [ {
              file: "src/macros/variables.sibilant",
              token: " ",
              type: "whitespace",
              line: 69,
              col: 57,
              contents: []
            } ],
            specials: 0,
            end: undefined,
            closed: true,
            closingIgnored: []
          }, name, value ],
          precedingIgnored: [ {
            file: "src/macros/variables.sibilant",
            token: " ",
            type: "whitespace",
            line: 69,
            col: 48,
            contents: []
          } ],
          specials: 0,
          end: undefined,
          closed: true,
          closingIgnored: []
        } ],
        precedingIgnored: [],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      };
    })));
  });
  var docs = sibilant.docs = {
    definitions: [],
    undocumented: {  }
  };
  docs.record = (function docs$record$(type, namespace, name, node) {
    /* docs.record src/docs.sibilant:4:0 */
  
    var doc = docs.lastDoc;
    (function() {
      if (typeof doc !== "undefined") {
        delete sibilant.docs.undocumented[name];
        return sibilant.docs.definitions.push(mergeInto(doc, {
          name: name,
          type: type,
          namespace: namespace,
          definition: node
        }));
      } else {
        return sibilant.docs.undocumented[name] = true;
      }
    }).call(this);
    return delete sibilant.docs.lastDoc;
  });
  docs.tags = (function docs$tags$() {
    /* docs.tags src/docs.sibilant:16:0 */
  
    var tags = flatten(pluck(docs.definitions, "tags")),
        counts = {  };
    tags.forEach((function(tag) {
      /* src/docs.sibilant:19:5 */
    
      return counts[tag] = ((counts[tag] || 0) + 1);
    }));
    return counts;
  });
  docs.text = (function docs$text$() {
    /* docs.text src/docs.sibilant:27:0 */
  
    return docs.definitions.sort((function(a, b) {
      /* src/docs.sibilant:29:16 */
    
      return prettify(a.name, false).localeCompare(prettify(b.name, false));
    })).map((function(definition) {
      /* src/docs.sibilant:34:15 */
    
      return ("name: " + definition.type + " " + definition.namespace + "/" + prettify(definition.name) + "\n" + "description: " + definition.docString + "\n" + (function() {
        if (definition.references) {
          return ("references:\n  " + (definition.references.map((function() {
            /* src/docs.sibilant:40:51 */
          
            return eval(outputFormatter(transpile(arguments[0])));
          })).join("\n  ") + "\n"));
        } else {
          return "";
        }
      }).call(this) + (function() {
        if (definition.tags) {
          return ("tags: " + definition.tags.join(", ") + "\n");
        } else {
          return "";
        }
      }).call(this) + "arguments: " + prettify(definition.definition.contents[2]) + "\n" + "examples: \n" + (definition.examples || []).map((function() {
        /* src/docs.sibilant:51:43 */
      
        return (prettify(arguments[0], true) + "\n" + outputFormatter(transpile(arguments[0])));
      })).join("\n\n") + "\n\n");
    })).join("");
  });
  docs.textNoColor = (function docs$textNoColor$() {
    /* docs.text-no-color src/docs.sibilant:58:0 */
  
    var stripAnsi = require("strip-ansi");
    return stripAnsi(docs.text());
  });
  docs.json = (function docs$json$() {
    /* docs.json src/docs.sibilant:63:0 */
  
    return JSON.stringify(docs.data());
  });
  docs.data = (function docs$data$() {
    /* docs.data src/docs.sibilant:66:0 */
  
    return docs.definitions.map((function(definition) {
      /* src/docs.sibilant:68:6 */
    
      return {
        name: prettify(definition.name, false),
        namespace: definition.namespace,
        type: definition.type,
        description: definition.docString,
        references: (function() {
          if (definition.references) {
            return definition.references.map((function() {
              /* src/docs.sibilant:74:52 */
            
              return arguments[0].token.slice(1, -1);
            }));
          } else {
            return [];
          }
        }).call(this),
        arguments: definition.definition.contents[2].contents.map((function() {
          /* src/docs.sibilant:79:30 */
        
          return prettify(arguments[0], false);
        })),
        definition: prettify(definition.definition, false),
        examples: (definition.examples || []).map((function() {
          /* src/docs.sibilant:82:29 */
        
          return {
            javascript: outputFormatter(transpile(arguments[0])),
            sibilant: prettify(arguments[0], false)
          };
        })),
        tags: definition.tags
      };
    }));
  });
  var debug__BANG = (function debug__BANG$(level, message) {
    /* debug! src/helpers.sibilant:1:0 */
  
    var message = Array.prototype.slice.call(arguments, 1);
  
    var debug = sibilant.debug;
    return (function() {
      if ((debug && level <= debug)) {
        return message.forEach((function() {
          /* src/helpers.sibilant:4:29 */
        
          return console.log(arguments[0]);
        }));
      }
    }).call(this);
  });
  var recurseIndent = (function recurseIndent$(arg) {
    /* recurse-indent src/helpers.sibilant:6:0 */
  
    return (function() {
      if (node__QUERY(arg)) {
        return mergeInto(arg, { contents: recurseIndent(flatCompact(arg.contents)) });
      } else if ((arg && "object" === typeof arg && "Array" === arg.constructor.name)) {
        return map(arg, recurseIndent);
      } else if (typeof arg === "number") {
        return arg.toString();
      } else if (typeof arg === "string") {
        return arg.replace((new RegExp("\\n", "g")), "\n  ").replace((new RegExp("\\n\\s+\\n", "g")), "\n\n");
      } else {
        return arg;
      }
    }).call(this);
  });
  var indent = (function indent$(args) {
    /* indent src/helpers.sibilant:16:0 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    return [ "\n  ", recurseIndent(map(args, transpile)), "\n" ];
  });
  var escapeRegex = (function escapeRegex$(string) {
    /* escape-regex src/helpers.sibilant:19:0 */
  
    return string.replace((new RegExp("[\\-\\[\\]\\/\\{\\}\\(\\)\\*\\+\\?\\.\\\\\^\\$\\|]", "g")), "\\$&");
  });
  var qescape = (function qescape$(content) {
    /* qescape src/helpers.sibilant:22:0 */
  
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
    /* map-node src/helpers.sibilant:32:0 */
  
    return (function() {
      if (node__QUERY(node)) {
        var mappedNode = fn(node);
        (function() {
          if (node__QUERY(mappedNode)) {
            return mappedNode.contents = mapNode(mappedNode.contents, fn);
          }
        }).call(this);
        return mappedNode;
      } else if ((node && "object" === typeof node && "Array" === node.constructor.name)) {
        return map(node, (function() {
          /* src/helpers.sibilant:41:27 */
        
          return mapNode(arguments[0], fn);
        }));
      } else {
        return fn(node);
      }
    }).call(this);
  });
  var eachNode = (function eachNode$(node, fn) {
    /* each-node src/helpers.sibilant:45:0 */
  
    return (function() {
      if (node__QUERY(node)) {
        return (function() {
          if (fn(node)) {
            return eachNode(node.contents, fn);
          }
        }).call(this);
      } else if ((node && "object" === typeof node && "Array" === node.constructor.name)) {
        return node.forEach((function(c) {
          /* src/helpers.sibilant:48:17 */
        
          return eachNode(c, fn);
        }));
      } else {
        return fn(node);
      }
    }).call(this);
  });
  var statement__QUERY = (function statement__QUERY$(transpiled) {
    /* statement? src/helpers.sibilant:51:0 */
  
    return (function() {
      if (node__QUERY(transpiled)) {
        return statement__QUERY(transpiled.contents);
      } else if ((transpiled && "object" === typeof transpiled && "Array" === transpiled.constructor.name)) {
        return statement__QUERY(transpiled.slice(-1)[0]);
      } else if (typeof transpiled === "string") {
        return ";" === transpiled.slice(-1)[0];
      } else {
        return false;
      }
    }).call(this);
  });
  var asStatement = (function asStatement$(node) {
    /* as-statement src/helpers.sibilant:58:0 */
  
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
    /* unquote? src/helpers.sibilant:65:0 */
  
    return node__QUERY(node, "at");
  });
  var findUnquotes = (function findUnquotes$(node) {
    /* find-unquotes src/helpers.sibilant:67:0 */
  
    var unquotes = {  };
    eachNode(node, (function(n) {
      /* src/helpers.sibilant:69:21 */
    
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
    /* splice-dots src/helpers.sibilant:75:0 */
  
    (function() {
      if ((node && (node.contents && "object" === typeof node.contents && "Array" === node.contents.constructor.name))) {
        var contents = [];
        node.contents.forEach((function(content) {
          /* src/helpers.sibilant:78:11 */
        
          return (function() {
            if ((node__QUERY(content, "dots") && (content.contents && "object" === typeof content.contents && "Array" === content.contents.constructor.name) && content.contents.length === 1 && (content.contents[0] && "object" === typeof content.contents[0] && "Array" === content.contents[0].constructor.name))) {
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
    /* alternating-keys-and-values src/helpers.sibilant:90:0 */
  
    return flatten(map(Object.keys(hash), (function(key) {
      /* src/helpers.sibilant:92:14 */
    
      return [ key, hash[key] ];
    })));
  });
  var mapNodeForQuoteExpansion = (function mapNodeForQuoteExpansion$(node, expansions) {
    /* map-node-for-quote-expansion src/helpers.sibilant:95:0 */
  
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
      } else if ((node && "object" === typeof node && "Array" === node.constructor.name)) {
        return map(node, (function() {
          /* src/helpers.sibilant:105:27 */
        
          return mapNodeForQuoteExpansion(arguments[0], expansions);
        }));
      } else {
        return node;
      }
    }).call(this);
  });
  var dotsAndAt = (function dotsAndAt$(content) {
    /* dots-and-at src/helpers.sibilant:109:0 */
  
    return (node__QUERY(content, "dots") && 3 === content.token.length && node__QUERY(content.contents[0], "at"));
  });
  var replace__BANG = (function replace__BANG$(content) {
    /* replace! src/helpers.sibilant:114:0 */
  
    return (function() {
      if (dotsAndAt(content)) {
        return mergeWith(content, { contents: [ transpile(content.contents[0]) ] });
      } else if (node__QUERY(content, "at")) {
        return transpile(content.contents[0]);
      } else if (node__QUERY(content, "tick")) {
        return JSON.stringify(content);
      } else if (("object" === typeof content && content !== null && content.constructor.name !== "Array")) {
        return sibilant.macros.namespaces.core.hash.apply(this, Object.keys(content).reduce((function() {
          /* src/helpers.sibilant:123:34 */
        
          return arguments[0].concat([ arguments[1], replace__BANG(content[arguments[1]]) ]);
        }), []));
      } else if ((content && "object" === typeof content && "Array" === content.constructor.name)) {
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
  var node__QUERY = (function node__QUERY$(thing, type, type2, type3, type4, testArg) {
    /* node? src/helpers.sibilant:132:0 */
  
    var a = arguments;
    return (thing && thing.type && thing.contents && (function() {
      if (testArg) {
        return Array.prototype.slice.call(a, 1).indexOf(thing.type) !== -1;
      } else if (type) {
        return (thing.type === type || thing.type === type2 || thing.type === type3 || thing.type === type4);
      } else {
        return true;
      }
    }).call(this));
  });
  var emptyNode__QUERY = (function emptyNode__QUERY$(item) {
    /* empty-node? src/helpers.sibilant:148:0 */
  
    return (function() {
      if (item === null) {
        return true;
      } else if (typeof item === "undefined") {
        return true;
      } else if (item === false) {
        return true;
      } else if (typeof item === "string") {
        return item.match((new RegExp("^\\s*$", undefined)));
      } else if ((item && "object" === typeof item && "Array" === item.constructor.name)) {
        return all__QUERY(item, emptyNode__QUERY);
      } else if (node__QUERY(item)) {
        return emptyNode__QUERY(item.contents);
      } else {
        return false;
      }
    }).call(this);
  });
  var compactNode = (function compactNode$(item) {
    /* compact-node src/helpers.sibilant:158:0 */
  
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
      } else if ((item && "object" === typeof item && "Array" === item.constructor.name)) {
        var compacted = compact(map(item, compactNode));
        return (function() {
          if ((compacted && compacted.length)) {
            return compacted;
          } else {
            return null;
          }
        }).call(this);
      } else if ((item === "" || item === false)) {
        return null;
      } else {
        return item;
      }
    }).call(this);
  });
  var generateSymbol = (function generateSymbol$(clue) {
    /* generate-symbol src/helpers.sibilant:171:0 */
  
    var state = sibilant.state;
    clue = (typeof clue !== "undefined") ? clue : "temp";
    state.symbolCounts = (typeof state.symbolCounts !== "undefined") ? state.symbolCounts : {  };
    var count = ((state.symbolCounts[clue] || 0) + 1);
    state.symbolCounts[clue] = count;
    return [ ("" + clue + "$" + count) ];
  });
  var makeSymbolClue = (function makeSymbolClue$(node) {
    /* make-symbol-clue src/helpers.sibilant:182:0 */
  
    var targetNode = (function() {
      if ((node__QUERY(node, "expression") && node.contents[0].token === "require")) {
        return node.contents[1];
      } else if (node__QUERY(node, "expression")) {
        return node.contents[0];
      } else {
        return node;
      }
    }).call(this);
    return (function() {
      try {
        return outputFormatter(transpile(targetNode));
      } catch (e) {
        return sibilant.prettyPrint(node, false);
      }
    }).call(this).replace((new RegExp("[^a-zA-Z]+", "g")), "_").replace((new RegExp("^_|_$", "g")), "").slice(0, 15);
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
          var literalRhs__QUERY = outputFormatter(transpiledRhs).match((new RegExp("^[\._a-zA-Z0-9$]+$", undefined))),
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
              file: "src/helpers.sibilant",
              token: "(",
              type: "expression",
              line: 206,
              col: 76,
              contents: [ {
                file: "src/helpers.sibilant",
                token: "get",
                type: "literal",
                line: 206,
                col: 77,
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
          var literalRhs__QUERY = outputFormatter(transpiledRhs).match((new RegExp("^[\._a-zA-Z0-9$]+$", undefined))),
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
              file: "src/helpers.sibilant",
              token: "(",
              type: "expression",
              line: 220,
              col: 67,
              contents: [ {
                file: "src/helpers.sibilant",
                token: "get",
                type: "literal",
                line: 220,
                col: 68,
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
  var recurseTranspile = (function recurseTranspile$(node) {
    /* recurse-transpile src/transpiler.sibilant:1:0 */
  
    return (function() {
      if ((node && "object" === typeof node && "Array" === node.constructor.name)) {
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
      if ((node && "object" === typeof node && "Array" === node.constructor.name)) {
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
        resultNode.contents = flatCompact(resultNode.contents);
        resultNode.source = node;
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
    /* transpile.hat src/transpiler.sibilant:55:0 */
  
    var token = node.contents[0].token,
        if$2 = (function() {
      if (token.match((new RegExp("\/", undefined)))) {
        return token.split("/");
      } else {
        return [ sibilant.macros.searchPath[0], token ];
      }
    }).call(this),
        namespace = if$2[0],
        macro = if$2[1],
        if$2 = undefined;
    return sibilant.macros.namespaces.core.get.call(node, "sibilant.macros.namespaces", sibilant.macros.namespaces.core.quote(transpile.literal({ token: namespace })), sibilant.macros.namespaces.core.quote(transpile.literal({ token: macro })));
  });
  transpile.tick = (function transpile$tick$(node) {
    /* transpile.tick src/transpiler.sibilant:66:0 */
  
    return sibilant.macros.namespaces.core.quote.apply(node, node.contents);
  });
  transpile.at = (function transpile$at$(node) {
    /* transpile.at src/transpiler.sibilant:69:0 */
  
    return transpile(node.contents[0]);
  });
  transpile.dots = (function transpile$dots$(node) {
    /* transpile.dots src/transpiler.sibilant:72:0 */
  
    return sibilant.macros.namespaces.core.dots.apply(node, node.contents);
  });
  transpile.default = (function transpile$default$(node) {
    /* transpile.default src/transpiler.sibilant:75:0 */
  
    return node.token;
  });
  transpile.output = (function transpile$output$(node) {
    /* transpile.output src/transpiler.sibilant:78:0 */
  
    return node;
  });
  transpile.number = (function transpile$number$(node) {
    /* transpile.number src/transpiler.sibilant:81:0 */
  
    return parseFloat(node.token.replace((new RegExp(",", "g")), "")).toString();
  });
  transpile.root = (function transpile$root$(node) {
    /* transpile.root src/transpiler.sibilant:86:0 */
  
    return (function() {
      if (1 === node.contents.length) {
        return transpile(node.contents[0]);
      } else {
        return interleave(compact(map(node.contents, asStatement)), "\n");
      }
    }).call(this);
  });
  transpile.expression = (function transpile$expression$(node, preprocessor) {
    /* transpile.expression src/transpiler.sibilant:95:0 */
  
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
          } else if ((node__QUERY(head, "literal") && head.token[0] === ".")) {
            macro = sibilant.resolveMacro("send");
            return args = [ node.contents[1], mergeInto(head, { token: head.token.slice(1) }) ].concat(node.contents.slice(2));
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
    /* transpile.bracket src/transpiler.sibilant:133:0 */
  
    return sibilant.macros.namespaces.core.list.apply(this, node.contents);
  });
  transpile.brace = (function transpile$brace$(node) {
    /* transpile.brace src/transpiler.sibilant:136:0 */
  
    return sibilant.macros.namespaces.core.hash.apply(this, node.contents);
  });
  transpile.literal = (function transpile$literal$(node) {
    /* transpile.literal src/transpiler.sibilant:138:0 */
  
    var string = node.token.replace((new RegExp("\\*", "g")), "_"),
        lastChar = string.slice(-1)[0];
    string = (function() {
      if (lastChar === "?") {
        return (string.slice(0, -1) + "__QUERY");
      } else if (lastChar === "!") {
        return (string.slice(0, -1) + "__BANG");
      } else {
        return string;
      }
    }).call(this);
    return inject(string, string.match((new RegExp("-([a-zA-Z0-9])", "g"))), (function(returnString, match) {
      /* src/transpiler.sibilant:147:13 */
    
      var letter = match[1];
      return returnString.replace(match, (function() {
        if ((letter === letter.toUpperCase() && letter !== letter.toLowerCase())) {
          return ("_" + letter);
        } else {
          return letter.toUpperCase();
        }
      }).call(this));
    }));
  });
  transpile.string = (function transpile$string$(node) {
    /* transpile.string src/transpiler.sibilant:154:0 */
  
    return node.token.split("\n").join("\\n\" +\n\"");
  });
  transpile.comment = (function transpile$comment$(node) {
    /* transpile.comment src/transpiler.sibilant:159:0 */
  
    return null;
  });
  var docs = sibilant.docs = {
    definitions: [],
    undocumented: {  }
  };
  docs.record = (function docs$record$(type, namespace, name, node) {
    /* docs.record src/docs.sibilant:4:0 */
  
    var doc = docs.lastDoc;
    (function() {
      if (typeof doc !== "undefined") {
        delete sibilant.docs.undocumented[name];
        return sibilant.docs.definitions.push(mergeInto(doc, {
          name: name,
          type: type,
          namespace: namespace,
          definition: node
        }));
      } else {
        return sibilant.docs.undocumented[name] = true;
      }
    }).call(this);
    return delete sibilant.docs.lastDoc;
  });
  docs.tags = (function docs$tags$() {
    /* docs.tags src/docs.sibilant:16:0 */
  
    var tags = flatten(pluck(docs.definitions, "tags")),
        counts = {  };
    tags.forEach((function(tag) {
      /* src/docs.sibilant:19:5 */
    
      return counts[tag] = ((counts[tag] || 0) + 1);
    }));
    return counts;
  });
  docs.text = (function docs$text$() {
    /* docs.text src/docs.sibilant:27:0 */
  
    return docs.definitions.sort((function(a, b) {
      /* src/docs.sibilant:29:16 */
    
      return prettify(a.name, false).localeCompare(prettify(b.name, false));
    })).map((function(definition) {
      /* src/docs.sibilant:34:15 */
    
      return ("name: " + definition.type + " " + definition.namespace + "/" + prettify(definition.name) + "\n" + "description: " + definition.docString + "\n" + (function() {
        if (definition.references) {
          return ("references:\n  " + (definition.references.map((function() {
            /* src/docs.sibilant:40:51 */
          
            return eval(outputFormatter(transpile(arguments[0])));
          })).join("\n  ") + "\n"));
        } else {
          return "";
        }
      }).call(this) + (function() {
        if (definition.tags) {
          return ("tags: " + definition.tags.join(", ") + "\n");
        } else {
          return "";
        }
      }).call(this) + "arguments: " + prettify(definition.definition.contents[2]) + "\n" + "examples: \n" + (definition.examples || []).map((function() {
        /* src/docs.sibilant:51:43 */
      
        return (prettify(arguments[0], true) + "\n" + outputFormatter(transpile(arguments[0])));
      })).join("\n\n") + "\n\n");
    })).join("");
  });
  docs.textNoColor = (function docs$textNoColor$() {
    /* docs.text-no-color src/docs.sibilant:58:0 */
  
    var stripAnsi = require("strip-ansi");
    return stripAnsi(docs.text());
  });
  docs.json = (function docs$json$() {
    /* docs.json src/docs.sibilant:63:0 */
  
    return JSON.stringify(docs.data());
  });
  docs.data = (function docs$data$() {
    /* docs.data src/docs.sibilant:66:0 */
  
    return docs.definitions.map((function(definition) {
      /* src/docs.sibilant:68:6 */
    
      return {
        name: prettify(definition.name, false),
        namespace: definition.namespace,
        type: definition.type,
        description: definition.docString,
        references: (function() {
          if (definition.references) {
            return definition.references.map((function() {
              /* src/docs.sibilant:74:52 */
            
              return arguments[0].token.slice(1, -1);
            }));
          } else {
            return [];
          }
        }).call(this),
        arguments: definition.definition.contents[2].contents.map((function() {
          /* src/docs.sibilant:79:30 */
        
          return prettify(arguments[0], false);
        })),
        definition: prettify(definition.definition, false),
        examples: (definition.examples || []).map((function() {
          /* src/docs.sibilant:82:29 */
        
          return {
            javascript: outputFormatter(transpile(arguments[0])),
            sibilant: prettify(arguments[0], false)
          };
        })),
        tags: definition.tags
      };
    }));
  });
  var sibilize = (function sibilize$(input) {
    /* sibilize src/require-and-include.sibilant:1:0 */
  
    var result = outputFormatter(transpile(restructure(parse(input))));
    return result;
  });
  var sourcemap = (function sourcemap$(input) {
    /* sourcemap src/require-and-include.sibilant:9:0 */
  
    return sourcemapper(transpile(restructure(parse(input))));
  });
  sibilant.sibilize = sibilize;
  sibilant.version = (function sibilant$version$() {
    /* sibilant.version src/require-and-include.sibilant:14:0 */
  
    return sibilant.packageInfo().version;
  });
  sibilant.stripShebang = (function sibilant$stripShebang$(data) {
    /* sibilant.strip-shebang src/require-and-include.sibilant:17:0 */
  
    return data.replace((new RegExp("^#!.*\\n", undefined)), "\n");
  });
  sibilant.file = "eval.sibilant";
  var withDirAndFile = (function withDirAndFile$(dir, file, fn) {
    /* with-dir-and-file src/require-and-include.sibilant:22:0 */
  
    var before = {
      dir: sibilant.dir,
      file: sibilant.file
    };
    sibilant.dir = dir;
    sibilant.file = file;
    var retval = fn();
    sibilant.dir = before.dir;
    sibilant.file = before.file;
    return retval;
  });
  sibilant.sourceCache = {  };
  sibilant.sibilizeFile = (function sibilant$sibilizeFile$(fileName) {
    /* sibilant.sibilize-file src/require-and-include.sibilant:39:0 */
  
    return outputFormatter(sibilant.transpileFile(fileName));
  });
  sibilant.sibilizeJson = (function sibilant$sibilizeJson$(fileName) {
    /* sibilant.sibilize-json src/require-and-include.sibilant:44:0 */
  
    var before = sibilant.quoteHashKeys;
    sibilant.quoteHashKeys = true;
    var content = sibilant.sibilizeFile(fileName);
    sibilant.quoteHashKeys = before;
    return content;
  });
  var package = {
    name: "sibilant",
    version: "0.5.5",
    keywords: [ "lisp", "javascript", "language" ],
    description: "javascript with a lisp",
    contributors: [ "Jacob Rothstein <hi@jbr.me> (http://jbr.me)", "Matthew Phillips (http://www.matthewphillips.info/)", "Yuest Wang (http://yue.st/)", "Lyndon Tremblay (http://www.hoovy.org)", "David Sargeant (https://github.com/dubiousdavid)" ],
    repository: {
      type: "git",
      url: "http://github.com/jbr/sibilant.git"
    },
    bugs: {
      mail: "sibilant@librelist.com",
      url: "http://github.com/jbr/sibilant/issues"
    },
    bin: { sibilant: "./bin/sibilant" },
    main: "./lib/sibilant.js",
    license: "MIT",
    devDependencies: {
      stool: ">=0.0.7",
      diff: ">=2.2.1",
      "strip-ansi": ">=3.0.0",
      colors: ">=1.1.2"
    },
    dependencies: {
      "source-map": ">=0.5.3",
      "source-map-support": ">=0.3.3",
      cardinal: ">=0.6.0"
    },
    scripts: { test: "bin/sibilant -x stool.sibilant -- test" }
  };
  sibilant.packageInfo = (function sibilant$packageInfo$() {
    /* sibilant.package-info src/browser.sibilant:24:6 */
  
    return package;
  });
  sibilant.versionString = (function sibilant$versionString$() {
    /* sibilant.version-string src/browser.sibilant:26:6 */
  
    return (package.name + " browser version " + package.version);
  });
  sibilant.dir = "browser";
  sibilant.initialize = (function sibilant$initialize$() {
    /* sibilant.initialize src/browser.sibilant:31:6 */
  
    return false;
  });
  var evalCode = (function evalCode$(js) {
    /* eval-code src/browser.sibilant:32:13 */
  
    return (new Function(js))();
  });
  sibilant.include = (function sibilant$include$(url) {
    /* sibilant.include src/browser.sibilant:35:6 */
  
    return $.get(url).done((function() {
      /* src/browser.sibilant:36:32 */
    
      return evalCode(sibilize(arguments[0]));
    }));
  });
  (function() {
    if (typeof $ === "function") {
      return $((function() {
        /* src/browser.sibilant:39:15 */
      
        return map($.makeArray($("script[type=\"application/sibilant\"][src]").map((function() {
          /* src/browser.sibilant:42:26 */
        
          return this.src;
        }))), sibilant.include);
      }));
    }
  }).call(this);
  return sibilant;
}).call(this);