//# sourceMappingURL=../maps/browser.map
;
(function(root) {
  /* /Users/jbr/code/sibilant/src/browser.sibilant:5:1 */

  var sibilant = {  },
      exports = sibilant;
  var error = (function error$(str) {
    /* error /Users/jbr/code/sibilant/src/browser.sibilant:7:3 */
  
    throw str
  });
  var inspect = (function inspect$(item) {
    /* inspect /Users/jbr/code/sibilant/src/browser.sibilant:8:3 */
  
    return (function() {
      if (item.toSource) {
        return item.toSource();
      } else {
        return item.toString();
      }
    }).call(this);
  });
  root.sibilant = sibilant;
  var bulkMap = (function bulkMap$(arr, fn) {
    /* bulk-map /Users/jbr/code/sibilant/include/functional.sibilant:1:0 */
  
    var index = 0,
        groupSize = fn.length,
        retArr = [];
    (function() {
      var $_symbol1_$ = undefined;
      while (index < arr.length) {
        $_symbol1_$ = (function() {
          retArr.push(fn.apply(this, arr.slice(index, (index + groupSize))));
          return index += groupSize;
        }).call(this);
      };
      return $_symbol1_$;
    }).call(this);
    return retArr;
  });
  var inject = (function inject$(start, items, fn) {
    /* inject /Users/jbr/code/sibilant/include/functional.sibilant:13:0 */
  
    var value = start;
    (function() {
      if (((items) && typeof (items) === "object" && (items).constructor.name === "Array")) {
        return items.forEach((function(item, index) {
          /* /Users/jbr/code/sibilant/include/functional.sibilant:16:4 */
        
          return value = fn(value, item, index);
        }));
      }
    }).call(this);
    return value;
  });
  var map = (function map$(items, fn) {
    /* map /Users/jbr/code/sibilant/include/functional.sibilant:20:0 */
  
    return inject([], items, (function(collector, item, index) {
      /* /Users/jbr/code/sibilant/include/functional.sibilant:22:10 */
    
      collector.push(fn(item, index));
      return collector;
    }));
  });
  var select = (function select$(items, fn) {
    /* select /Users/jbr/code/sibilant/include/functional.sibilant:26:0 */
  
    return inject([], items, (function(collector, item, index) {
      /* /Users/jbr/code/sibilant/include/functional.sibilant:28:10 */
    
      (function() {
        if (fn(item, index)) {
          return collector.push(item);
        }
      }).call(this);
      return collector;
    }));
  });
  var detect = (function detect$(items, fn) {
    /* detect /Users/jbr/code/sibilant/include/functional.sibilant:33:0 */
  
    var returnItem = undefined,
        index = 0,
        items = (items || []);
    (function() {
      var $_symbol2_$ = undefined;
      while (!((items.length === index || returnItem))) {
        $_symbol2_$ = (function() {
          (function() {
            if (fn(items[index], index)) {
              return returnItem = items[index];
            }
          }).call(this);
          return ((index)++);
        }).call(this);
      };
      return $_symbol2_$;
    }).call(this);
    return returnItem;
  });
  var all__QUERY = (function all__QUERY$(items, fn) {
    /* all? /Users/jbr/code/sibilant/include/functional.sibilant:45:0 */
  
    return typeof detect(items, (function(item, index) {
      /* /Users/jbr/code/sibilant/include/functional.sibilant:46:31 */
    
      return !(fn(item, index));
    })) === "undefined";
  });
  var none__QUERY = (function none__QUERY$(items, fn) {
    /* none? /Users/jbr/code/sibilant/include/functional.sibilant:48:0 */
  
    return typeof detect(items, fn) === "undefined";
  });
  var any__QUERY = (function any__QUERY$(items, fn) {
    /* any? /Users/jbr/code/sibilant/include/functional.sibilant:51:0 */
  
    return typeof detect(items, fn) !== "undefined";
  });
  var reject = (function reject$(items, fn) {
    /* reject /Users/jbr/code/sibilant/include/functional.sibilant:54:0 */
  
    var args = [ items, fn ];
    return select(items, (function() {
      /* /Users/jbr/code/sibilant/include/functional.sibilant:56:16 */
    
      return !(fn.apply(this, arguments));
    }));
  });
  var compact = (function compact$(arr) {
    /* compact /Users/jbr/code/sibilant/include/functional.sibilant:58:0 */
  
    return select(arr, (function(item) {
      /* /Users/jbr/code/sibilant/include/functional.sibilant:59:17 */
    
      return (null !== item && false !== item && typeof item !== "undefined");
    }));
  });
  var interleave = (function interleave$(glue, arr) {
    /* interleave /Users/jbr/code/sibilant/include/functional.sibilant:65:0 */
  
    (function() {
      if ((typeof arr === "string" && ((glue) && typeof (glue) === "object" && (glue).constructor.name === "Array"))) {
        var temp = glue;
        glue = arr;
        return arr = temp;
      }
    }).call(this);
    return (function() {
      if (((glue) && typeof (glue) === "object" && (glue).constructor.name === "Array")) {
        return inject([], arr, (function(collector, item, index) {
          /* /Users/jbr/code/sibilant/include/functional.sibilant:72:13 */
        
          return collector.concat([ item, glue[index] ]);
        }));
      } else {
        return inject([ arr[0] ], arr.slice(1), (function(collector, item, index) {
          /* /Users/jbr/code/sibilant/include/functional.sibilant:77:13 */
        
          return collector.concat([ glue, item ]);
        }));
      }
    }).call(this);
  });
  var flatten = (function flatten$(items) {
    /* flatten /Users/jbr/code/sibilant/include/functional.sibilant:80:0 */
  
    var items = Array.prototype.slice.call(arguments, 0);
  
    return inject([], items, (function(collector, item) {
      /* /Users/jbr/code/sibilant/include/functional.sibilant:82:10 */
    
      return collector.concat((function() {
        if (((item) && typeof (item) === "object" && (item).constructor.name === "Array")) {
          return flatten.apply(this, item);
        } else {
          return item;
        }
      }).call(this));
    }));
  });
  var recurseMap = (function recurseMap$(item, fn) {
    /* recurse-map /Users/jbr/code/sibilant/include/functional.sibilant:89:0 */
  
    return (function() {
      if (((item) && typeof (item) === "object" && (item).constructor.name === "Array")) {
        return map(item, (function(subitem) {
          /* /Users/jbr/code/sibilant/include/functional.sibilant:90:32 */
        
          return recurseMap(subitem, fn);
        }));
      } else {
        return fn(item);
      }
    }).call(this);
  });
  var pluck = (function pluck$(items, attribute) {
    /* pluck /Users/jbr/code/sibilant/include/functional.sibilant:93:0 */
  
    return map(items, (function(item) {
      /* /Users/jbr/code/sibilant/include/functional.sibilant:94:16 */
    
      return item[attribute];
    }));
  });
  var mergeInto = (function mergeInto$(into, from) {
    /* merge-into /Users/jbr/code/sibilant/include/functional.sibilant:96:0 */
  
    Object.keys(from).forEach((function(key) {
      /* /Users/jbr/code/sibilant/include/functional.sibilant:97:5 */
    
      return into[key] = from[key];
    }));
    return into;
  });
  var clone = (function clone$(object) {
    /* clone /Users/jbr/code/sibilant/include/functional.sibilant:100:0 */
  
    return inject({  }, Object.keys(object), (function(collector, key) {
      /* /Users/jbr/code/sibilant/include/functional.sibilant:102:13 */
    
      collector[key] = object[key];
      return collector;
    }));
  });
  var mapValues = (function mapValues$(object, fn) {
    /* map-values /Users/jbr/code/sibilant/include/functional.sibilant:106:0 */
  
    return inject({  }, Object.keys(object), (function(collector, key, index) {
      /* /Users/jbr/code/sibilant/include/functional.sibilant:108:13 */
    
      collector[key] = fn(object[key], key);
      return collector;
    }));
  });
  var mergeWith = (function mergeWith$(into, from) {
    /* merge-with /Users/jbr/code/sibilant/include/functional.sibilant:112:0 */
  
    return mergeInto(clone(into), from);
  });
  var log__BANG = (function log__BANG$(args) {
    /* log! /Users/jbr/code/sibilant/src/colors.sibilant:1:0 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    return inspect__BANG.apply(this, args).forEach((function() {
      /* /Users/jbr/code/sibilant/src/colors.sibilant:2:35 */
    
      return console.log(arguments[0]);
    }));
  });
  var inspect__BANG = (function inspect__BANG$(args) {
    /* inspect! /Users/jbr/code/sibilant/src/colors.sibilant:4:0 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    return args.map((function() {
      /* /Users/jbr/code/sibilant/src/colors.sibilant:5:15 */
    
      return util.inspect(arguments[0], {
        colors: false,
        depth: 3
      });
    }));
  });
  var color = (function color$(code, items, depth) {
    /* color /Users/jbr/code/sibilant/src/colors.sibilant:7:0 */
  
    return (code + items.join("") + "\033[0m");
  });
  var black = (function black$(args) {
    /* black /Users/jbr/code/sibilant/src/colors.sibilant:10:0 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    return color("\033[0;30m", args);
  });
  var red = (function red$(args) {
    /* red /Users/jbr/code/sibilant/src/colors.sibilant:11:0 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    return color("\033[0;31m", args);
  });
  var green = (function green$(args) {
    /* green /Users/jbr/code/sibilant/src/colors.sibilant:12:0 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    return color("\033[0;32m", args);
  });
  var brown = (function brown$(args) {
    /* brown /Users/jbr/code/sibilant/src/colors.sibilant:13:0 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    return color("\033[0;33m", args);
  });
  var blue = (function blue$(args) {
    /* blue /Users/jbr/code/sibilant/src/colors.sibilant:14:0 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    return color("\033[0;34m", args);
  });
  var purple = (function purple$(args) {
    /* purple /Users/jbr/code/sibilant/src/colors.sibilant:15:0 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    return color("\033[0;35m", args);
  });
  var cyan = (function cyan$(args) {
    /* cyan /Users/jbr/code/sibilant/src/colors.sibilant:16:0 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    return color("\033[0;36m", args);
  });
  var gray = (function gray$(args) {
    /* gray /Users/jbr/code/sibilant/src/colors.sibilant:17:0 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    return color("\033[0;37m", args);
  });
  var boldGray = (function boldGray$(args) {
    /* bold-gray /Users/jbr/code/sibilant/src/colors.sibilant:18:0 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    return color("\033[1;30m", args);
  });
  var boldRed = (function boldRed$(args) {
    /* bold-red /Users/jbr/code/sibilant/src/colors.sibilant:19:0 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    return color("\033[1;31m", args);
  });
  var boldGreen = (function boldGreen$(args) {
    /* bold-green /Users/jbr/code/sibilant/src/colors.sibilant:20:0 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    return color("\033[1;32m", args);
  });
  var yellow = (function yellow$(args) {
    /* yellow /Users/jbr/code/sibilant/src/colors.sibilant:21:0 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    return color("\033[1;33m", args);
  });
  var boldBlue = (function boldBlue$(args) {
    /* bold-blue /Users/jbr/code/sibilant/src/colors.sibilant:22:0 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    return color("\033[1;34m", args);
  });
  var boldPurple = (function boldPurple$(args) {
    /* bold-purple /Users/jbr/code/sibilant/src/colors.sibilant:23:0 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    return color("\033[1;35m", args);
  });
  var boldCyan = (function boldCyan$(args) {
    /* bold-cyan /Users/jbr/code/sibilant/src/colors.sibilant:24:0 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    return color("\033[1;36m", args);
  });
  var white = (function white$(args) {
    /* white /Users/jbr/code/sibilant/src/colors.sibilant:25:0 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    return color("\033[1;37m", args);
  });
  sibilant.prettyPrint = (function sibilant$prettyPrint$(node, color, entry) {
    /* sibilant.pretty-print /Users/jbr/code/sibilant/src/pretty-printer.sibilant:3:0 */
  
    entry = (typeof entry !== "undefined") ? entry : true;
    color = (typeof color !== "undefined") ? color : true;
    return realNewlines((function() {
      if (node__QUERY(node)) {
        var prettyPrinter = (sibilant.prettyPrint[node.type] || sibilant.prettyPrint.default);
        return prettyPrinter(node, color, entry);
      } else if (((node) && typeof (node) === "object" && (node).constructor.name === "Array")) {
        return ((function() {
          if (color) {
            return black("[");
          } else {
            return "";
          }
        }).call(this) + map(node, (function() {
          /* /Users/jbr/code/sibilant/include/macros.sibilant:620:30 */
        
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
        return red(util.inspect(node));
      } else {
        return realNewlines(util.inspect(node));
      }
    }).call(this));
  });
  var prettify = sibilant.prettyPrint;
  sibilant.prettyPrint.default = (function sibilant$prettyPrint$default$(node, color, entry) {
    /* sibilant.pretty-print.default /Users/jbr/code/sibilant/src/pretty-printer.sibilant:23:0 */
  
    return realNewlines(sibilant.prettyPrint.colorize(node, color, ((function() {
      if ((!(entry) && node.precedingIgnored && node.precedingIgnored.length)) {
        return map(node.precedingIgnored, (function() {
          /* /Users/jbr/code/sibilant/include/macros.sibilant:620:30 */
        
          return prettify(arguments[0], color, false);
        })).join("");
      } else {
        return "";
      }
    }).call(this) + (function() {
      if ((node.modifiers && node.modifiers.length)) {
        return map(node.modifiers, (function() {
          /* /Users/jbr/code/sibilant/include/macros.sibilant:620:30 */
        
          return prettify(arguments[0], color, false);
        })).join("");
      } else {
        return "";
      }
    }).call(this) + node.token + (function() {
      if ((node.contents && node.contents.length)) {
        return map(node.contents, (function() {
          /* /Users/jbr/code/sibilant/include/macros.sibilant:620:30 */
        
          return prettify(arguments[0], color, false);
        })).join("");
      } else {
        return "";
      }
    }).call(this) + (function() {
      if ((node.closingIgnored && node.closingIgnored.length)) {
        return map(node.closingIgnored, (function() {
          /* /Users/jbr/code/sibilant/include/macros.sibilant:620:30 */
        
          return prettify(arguments[0], color, false);
        })).join("");
      } else {
        return "";
      }
    }).call(this) + ((node.closed && acceptablePairs[node.token]) || ""))));
  });
  sibilant.prettyPrint.root = (function sibilant$prettyPrint$root$(node, color, entry) {
    /* sibilant.pretty-print.root /Users/jbr/code/sibilant/src/pretty-printer.sibilant:47:0 */
  
    return map(node.contents, (function() {
      /* /Users/jbr/code/sibilant/include/macros.sibilant:620:30 */
    
      return prettify(arguments[0], color, false);
    })).join("\n");
  });
  sibilant.prettyPrint.output = (function sibilant$prettyPrint$output$(node, color) {
    /* sibilant.pretty-print.output /Users/jbr/code/sibilant/src/pretty-printer.sibilant:52:0 */
  
    return ((function() {
      if (color) {
        return black("{");
      } else {
        return "";
      }
    }).call(this) + (function() {
      if (((node.contents) && typeof (node.contents) === "object" && (node.contents).constructor.name === "Array")) {
        return map(node.contents, (function() {
          /* /Users/jbr/code/sibilant/src/pretty-printer.sibilant:56:28 */
        
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
    /* real-newlines /Users/jbr/code/sibilant/src/pretty-printer.sibilant:62:0 */
  
    return node.split("\\n")
      .join("\n");
  });
  sibilant.prettyPrint.colorize = (function sibilant$prettyPrint$colorize$(node, color, string) {
    /* sibilant.pretty-print.colorize /Users/jbr/code/sibilant/src/pretty-printer.sibilant:66:0 */
  
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
    /* output-formatter /Users/jbr/code/sibilant/src/output-formatter.sibilant:1:0 */
  
    return (function() {
      if (((node) && typeof (node) === "object" && (node).constructor.name === "Array")) {
        return map(node, outputFormatter).join("");
      } else if (node__QUERY(node, "output")) {
        return outputFormatter(node.contents);
      } else if ((typeof node === "string" || typeof node === "number")) {
        return node;
      } else if (!((typeof node !== "undefined" && node !== null))) {
        return "";
      } else if (node__QUERY(node)) {
        console.log("WE SHOULD NOT BE HERE");
        return outputFormatter(transpile(node));
      }
    }).call(this);
  });
  sibilant.outputFormatter = outputFormatter;
  var bulkMap = (function bulkMap$(arr, fn) {
    /* bulk-map /Users/jbr/code/sibilant/include/functional.sibilant:1:0 */
  
    var index = 0,
        groupSize = fn.length,
        retArr = [];
    (function() {
      var $_symbol3_$ = undefined;
      while (index < arr.length) {
        $_symbol3_$ = (function() {
          retArr.push(fn.apply(this, arr.slice(index, (index + groupSize))));
          return index += groupSize;
        }).call(this);
      };
      return $_symbol3_$;
    }).call(this);
    return retArr;
  });
  var inject = (function inject$(start, items, fn) {
    /* inject /Users/jbr/code/sibilant/include/functional.sibilant:13:0 */
  
    var value = start;
    (function() {
      if (((items) && typeof (items) === "object" && (items).constructor.name === "Array")) {
        return items.forEach((function(item, index) {
          /* /Users/jbr/code/sibilant/include/functional.sibilant:16:4 */
        
          return value = fn(value, item, index);
        }));
      }
    }).call(this);
    return value;
  });
  var map = (function map$(items, fn) {
    /* map /Users/jbr/code/sibilant/include/functional.sibilant:20:0 */
  
    return inject([], items, (function(collector, item, index) {
      /* /Users/jbr/code/sibilant/include/functional.sibilant:22:10 */
    
      collector.push(fn(item, index));
      return collector;
    }));
  });
  var select = (function select$(items, fn) {
    /* select /Users/jbr/code/sibilant/include/functional.sibilant:26:0 */
  
    return inject([], items, (function(collector, item, index) {
      /* /Users/jbr/code/sibilant/include/functional.sibilant:28:10 */
    
      (function() {
        if (fn(item, index)) {
          return collector.push(item);
        }
      }).call(this);
      return collector;
    }));
  });
  var detect = (function detect$(items, fn) {
    /* detect /Users/jbr/code/sibilant/include/functional.sibilant:33:0 */
  
    var returnItem = undefined,
        index = 0,
        items = (items || []);
    (function() {
      var $_symbol4_$ = undefined;
      while (!((items.length === index || returnItem))) {
        $_symbol4_$ = (function() {
          (function() {
            if (fn(items[index], index)) {
              return returnItem = items[index];
            }
          }).call(this);
          return ((index)++);
        }).call(this);
      };
      return $_symbol4_$;
    }).call(this);
    return returnItem;
  });
  var all__QUERY = (function all__QUERY$(items, fn) {
    /* all? /Users/jbr/code/sibilant/include/functional.sibilant:45:0 */
  
    return typeof detect(items, (function(item, index) {
      /* /Users/jbr/code/sibilant/include/functional.sibilant:46:31 */
    
      return !(fn(item, index));
    })) === "undefined";
  });
  var none__QUERY = (function none__QUERY$(items, fn) {
    /* none? /Users/jbr/code/sibilant/include/functional.sibilant:48:0 */
  
    return typeof detect(items, fn) === "undefined";
  });
  var any__QUERY = (function any__QUERY$(items, fn) {
    /* any? /Users/jbr/code/sibilant/include/functional.sibilant:51:0 */
  
    return typeof detect(items, fn) !== "undefined";
  });
  var reject = (function reject$(items, fn) {
    /* reject /Users/jbr/code/sibilant/include/functional.sibilant:54:0 */
  
    var args = [ items, fn ];
    return select(items, (function() {
      /* /Users/jbr/code/sibilant/include/functional.sibilant:56:16 */
    
      return !(fn.apply(this, arguments));
    }));
  });
  var compact = (function compact$(arr) {
    /* compact /Users/jbr/code/sibilant/include/functional.sibilant:58:0 */
  
    return select(arr, (function(item) {
      /* /Users/jbr/code/sibilant/include/functional.sibilant:59:17 */
    
      return (null !== item && false !== item && typeof item !== "undefined");
    }));
  });
  var interleave = (function interleave$(glue, arr) {
    /* interleave /Users/jbr/code/sibilant/include/functional.sibilant:65:0 */
  
    (function() {
      if ((typeof arr === "string" && ((glue) && typeof (glue) === "object" && (glue).constructor.name === "Array"))) {
        var temp = glue;
        glue = arr;
        return arr = temp;
      }
    }).call(this);
    return (function() {
      if (((glue) && typeof (glue) === "object" && (glue).constructor.name === "Array")) {
        return inject([], arr, (function(collector, item, index) {
          /* /Users/jbr/code/sibilant/include/functional.sibilant:72:13 */
        
          return collector.concat([ item, glue[index] ]);
        }));
      } else {
        return inject([ arr[0] ], arr.slice(1), (function(collector, item, index) {
          /* /Users/jbr/code/sibilant/include/functional.sibilant:77:13 */
        
          return collector.concat([ glue, item ]);
        }));
      }
    }).call(this);
  });
  var flatten = (function flatten$(items) {
    /* flatten /Users/jbr/code/sibilant/include/functional.sibilant:80:0 */
  
    var items = Array.prototype.slice.call(arguments, 0);
  
    return inject([], items, (function(collector, item) {
      /* /Users/jbr/code/sibilant/include/functional.sibilant:82:10 */
    
      return collector.concat((function() {
        if (((item) && typeof (item) === "object" && (item).constructor.name === "Array")) {
          return flatten.apply(this, item);
        } else {
          return item;
        }
      }).call(this));
    }));
  });
  var recurseMap = (function recurseMap$(item, fn) {
    /* recurse-map /Users/jbr/code/sibilant/include/functional.sibilant:89:0 */
  
    return (function() {
      if (((item) && typeof (item) === "object" && (item).constructor.name === "Array")) {
        return map(item, (function(subitem) {
          /* /Users/jbr/code/sibilant/include/functional.sibilant:90:32 */
        
          return recurseMap(subitem, fn);
        }));
      } else {
        return fn(item);
      }
    }).call(this);
  });
  var pluck = (function pluck$(items, attribute) {
    /* pluck /Users/jbr/code/sibilant/include/functional.sibilant:93:0 */
  
    return map(items, (function(item) {
      /* /Users/jbr/code/sibilant/include/functional.sibilant:94:16 */
    
      return item[attribute];
    }));
  });
  var mergeInto = (function mergeInto$(into, from) {
    /* merge-into /Users/jbr/code/sibilant/include/functional.sibilant:96:0 */
  
    Object.keys(from).forEach((function(key) {
      /* /Users/jbr/code/sibilant/include/functional.sibilant:97:5 */
    
      return into[key] = from[key];
    }));
    return into;
  });
  var clone = (function clone$(object) {
    /* clone /Users/jbr/code/sibilant/include/functional.sibilant:100:0 */
  
    return inject({  }, Object.keys(object), (function(collector, key) {
      /* /Users/jbr/code/sibilant/include/functional.sibilant:102:13 */
    
      collector[key] = object[key];
      return collector;
    }));
  });
  var mapValues = (function mapValues$(object, fn) {
    /* map-values /Users/jbr/code/sibilant/include/functional.sibilant:106:0 */
  
    return inject({  }, Object.keys(object), (function(collector, key, index) {
      /* /Users/jbr/code/sibilant/include/functional.sibilant:108:13 */
    
      collector[key] = fn(object[key], key);
      return collector;
    }));
  });
  var mergeWith = (function mergeWith$(into, from) {
    /* merge-with /Users/jbr/code/sibilant/include/functional.sibilant:112:0 */
  
    return mergeInto(clone(into), from);
  });
  var parser = {  };
  sibilant.parser = parser;
  parser.tokens = {
    "regex": "(\\/(\\\\\\\/|[^\\/\\n])+\\/[glim]*)",
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
    "whitespace": "\\s",
    "ignored": "."
  };
  parser.tokenPrecedence = [ "regex", "comment", "string", "number", "dots", "tick", "hat", "at", "special", "literal", "argPlaceholder", "otherChar", "openExpression", "closeExpression", "newline", "whitespace", "ignored" ];
  parser.orderedRegexes = parser.tokenPrecedence.map((function(x) {
    /* /Users/jbr/code/sibilant/src/parser.sibilant:41:23 */
  
    return mergeInto((new RegExp(("^" + parser.tokens[x]), undefined)), { name: x });
  }));
  var orderedRegexes = parser.orderedRegexes;
  sibilant.nodeCache = (sibilant.nodeCache || {  });
  var nodeId = (function nodeId$(node) {
    /* node-id /Users/jbr/code/sibilant/src/parser.sibilant:48:0 */
  
    return ((nodeId.lastId)++);
  });
  var cacheNode = (function cacheNode$(node) {
    /* cache-node /Users/jbr/code/sibilant/src/parser.sibilant:51:0 */
  
    var id = nodeId(node);
    sibilant.nodeCache[id] = node;
    return mergeInto(node, { nodeId: id });
  });
  nodeId.lastId = 0;
  parser.parse = (function parser$parse$(string, context) {
    /* parser.parse /Users/jbr/code/sibilant/src/parser.sibilant:58:0 */
  
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
      var $_symbol5_$ = undefined;
      while (match) {
        $_symbol5_$ = (function() {
          detect(orderedRegexes, (function(r) {
            /* /Users/jbr/code/sibilant/src/parser.sibilant:70:20 */
          
            regexName = r.name;
            return match = r.exec(remainingInput);
          }));
          return (function() {
            if ((typeof match !== "undefined" && match !== null)) {
              var matchString = match[0],
                  length = matchString.length;
              context.stack.push(cacheNode({
                contents: [],
                dir: sibilant.dir,
                file: sibilant.file,
                token: matchString,
                type: regexName,
                start: context.position,
                line: context.line,
                col: context.col,
                length: length
              }));
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
                if (remainingInput.length) {
                  return remainingInput.slice(length);
                } else {
                  return "";
                }
              }).call(this);
            }
          }).call(this);
        }).call(this);
      };
      return $_symbol5_$;
    }).call(this);
    return context.stack;
  });
  var parse = parser.parse;
  var restructurers = {  },
      acceptablePairs = {
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
    /* restructure /Users/jbr/code/sibilant/src/restructurer.sibilant:7:0 */
  
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
      ignoredTokens: [],
      specials: 0
    };
    inject(context, input, (function(context, token, index) {
      /* /Users/jbr/code/sibilant/src/restructurer.sibilant:20:13 */
    
      var restructurer = (restructurers[token.type] || restructurers.default);
      return restructurer(token, context, index);
    }));
    (function() {
      if (!(1 === context.parseStack.length)) {
        throw ("unclosed node: " + prettify(context.parseStack[0], false))
      }
    }).call(this);
    return output;
  });
  sibilant.restructure = restructure;
  restructurers.openExpression = (function restructurers$openExpression$(token, context) {
    /* restructurers.open-expression /Users/jbr/code/sibilant/src/restructurer.sibilant:31:0 */
  
    var first = context.parseStack[0];
    token.contents = [];
    token.type = bracketTypes[token.token];
    token.parent = first;
    acceptIgnoredTokens(token, context);
    acceptSpecials(token, context);
    first.contents.push(token);
    context.parseStack.unshift(token);
    return context;
  });
  restructurers.closeExpression = (function restructurers$closeExpression$(node, context, index) {
    /* restructurers.close-expression /Users/jbr/code/sibilant/src/restructurer.sibilant:44:0 */
  
    var first = context.parseStack[0];
    (function() {
      if (node__QUERY(first, "root")) {
        throw ("unexpected " + node.token + " on " + node.file + ":" + node.line + ":" + node.col)
      }
    }).call(this);
    (function() {
      if (acceptablePairs[first.token] !== node.token) {
        throw ("trying to close " + yellow(sibilant.prettyPrint(first)) + "\n   on " + first.file + ":" + first.line + ":" + first.col + "\n   with " + sibilant.prettyPrint(node) + "\n   on " + node.file + ":" + node.line + ":" + node.col + "\n")
      }
    }).call(this);
    first.end = node.end;
    first.closed = true;
    first.closingIgnored = context.ignoredTokens;
    context.ignoredTokens = [];
    context.parseStack.shift();
    closeSpecials(first, context);
    (function() {
      if (context.parseStack.length === 0) {
        throw ("unbalanced parens:\n" + inspect(parseStack))
      }
    }).call(this);
    return context;
  });
  var openSpecial = (function openSpecial$(node, context) {
    /* open-special /Users/jbr/code/sibilant/src/restructurer.sibilant:69:0 */
  
    ((context.specials)++);
    acceptIgnoredTokens(node, context);
    var first = context.parseStack[0];
    node.contents = [];
    node.parent = first;
    first.contents.push(node);
    context.parseStack.unshift(node);
    return context;
  });
  var acceptSpecials = (function acceptSpecials$(node, context) {
    /* accept-specials /Users/jbr/code/sibilant/src/restructurer.sibilant:83:0 */
  
    node.specials = context.specials;
    context.specials = 0;
    return context;
  });
  var acceptIgnoredTokens = (function acceptIgnoredTokens$(node, context) {
    /* accept-ignored-tokens /Users/jbr/code/sibilant/src/restructurer.sibilant:88:0 */
  
    node.precedingIgnored = context.ignoredTokens;
    context.ignoredTokens = [];
    return context;
  });
  var closeSpecials = (function closeSpecials$(node, context) {
    /* close-specials /Users/jbr/code/sibilant/src/restructurer.sibilant:93:0 */
  
    (function() {
      if (node.specials > 0) {
        ((node.specials)--);
        context.parseStack.shift();
        return closeSpecials(node, context);
      }
    }).call(this);
    return context;
  });
  var accumulateIgnoredToken = (function accumulateIgnoredToken$(token, context, index) {
    /* accumulate-ignored-token /Users/jbr/code/sibilant/src/restructurer.sibilant:101:0 */
  
    context.ignoredTokens.push(token);
    return context;
  });
  [ "hat", "dots", "tick", "at" ].forEach((function(special) {
    /* /Users/jbr/code/sibilant/src/restructurer.sibilant:105:0 */
  
    return restructurers[special] = openSpecial;
  }));
  [ "whitespace", "newline", "ignored" ].forEach((function(ignored) {
    /* /Users/jbr/code/sibilant/src/restructurer.sibilant:108:0 */
  
    return restructurers[ignored] = accumulateIgnoredToken;
  }));
  restructurers.default = (function restructurers$default$(token, context, index) {
    /* restructurers.default /Users/jbr/code/sibilant/src/restructurer.sibilant:111:0 */
  
    acceptSpecials(token, context);
    acceptIgnoredTokens(token, context);
    context.parseStack[0].contents.push(token);
    return closeSpecials(token, context);
  });
  var coreNamespace = {  },
      macroNamespaces = { core: coreNamespace };
  sibilant.state = {  };
  sibilant.macros = {
    "namespaces": macroNamespaces,
    "defaultSearchPath": [ "core" ],
    "searchPath": [ "core" ],
    "namespace": coreNamespace
  };
  var namespace = sibilant.macros.namespace,
      macros = sibilant.macros.namespace;
  sibilant.macros.currentNamespace = (function sibilant$macros$currentNamespace$() {
    /* sibilant.macros.current-namespace /Users/jbr/code/sibilant/src/macros.sibilant:14:0 */
  
    return sibilant.macros.namespaces[sibilant.macros.searchPath[0]];
  });
  sibilant.resolveMacro = (function sibilant$resolveMacro$(macroName) {
    /* sibilant.resolve-macro /Users/jbr/code/sibilant/src/macros.sibilant:17:0 */
  
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
          /* /Users/jbr/code/sibilant/src/macros.sibilant:29:28 */
        
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
    /* sibilant.with-default-search-path /Users/jbr/code/sibilant/src/macros.sibilant:34:0 */
  
    var searchPathBefore = sibilant.macros.searchPath;
    sibilant.macros.searchPath = sibilant.macros.defaultSearchPath;
    var returnValue = fn();
    sibilant.macros.searchPath = searchPathBefore;
    return returnValue;
  });
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
        return content.replace((new RegExp("\"", "g")), "\\\"")
          .replace((new RegExp("\\n", "g")), "\\n\" +\n\"");
      } else {
        return content;
      }
    }).call(this);
  });
  var mapNode = (function mapNode$(node, fn) {
    /* map-node /Users/jbr/code/sibilant/src/helpers.sibilant:28:0 */
  
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
          /* /Users/jbr/code/sibilant/src/helpers.sibilant:37:32 */
        
          return mapNode(arguments[0], fn);
        }));
      } else {
        return fn(node);
      }
    }).call(this);
  });
  var eachNode = (function eachNode$(node, fn) {
    /* each-node /Users/jbr/code/sibilant/src/helpers.sibilant:40:0 */
  
    return (function() {
      if (node__QUERY(node)) {
        return (function() {
          if (fn(node)) {
            return eachNode(node.contents, fn);
          }
        }).call(this);
      } else if (((node) && typeof (node) === "object" && (node).constructor.name === "Array")) {
        return node.forEach((function(c) {
          /* /Users/jbr/code/sibilant/src/helpers.sibilant:42:22 */
        
          return eachNode(c, fn);
        }));
      } else {
        return fn(node);
      }
    }).call(this);
  });
  var statement__QUERY = (function statement__QUERY$(transpiled) {
    /* statement? /Users/jbr/code/sibilant/src/helpers.sibilant:45:0 */
  
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
    /* as-statement /Users/jbr/code/sibilant/src/helpers.sibilant:51:0 */
  
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
    /* unquote? /Users/jbr/code/sibilant/src/helpers.sibilant:58:0 */
  
    return node__QUERY(node, "at");
  });
  var findUnquotes = (function findUnquotes$(node) {
    /* find-unquotes /Users/jbr/code/sibilant/src/helpers.sibilant:60:0 */
  
    var unquotes = {  };
    eachNode(node, (function(n) {
      /* /Users/jbr/code/sibilant/src/helpers.sibilant:62:21 */
    
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
    /* splice-dots /Users/jbr/code/sibilant/src/helpers.sibilant:68:0 */
  
    (function() {
      if ((node && ((node.contents) && typeof (node.contents) === "object" && (node.contents).constructor.name === "Array"))) {
        var contents = [];
        node.contents.forEach((function(content) {
          /* /Users/jbr/code/sibilant/src/helpers.sibilant:71:11 */
        
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
    /* alternating-keys-and-values /Users/jbr/code/sibilant/src/helpers.sibilant:83:0 */
  
    return flatten(map(Object.keys(hash), (function(key) {
      /* /Users/jbr/code/sibilant/src/helpers.sibilant:85:19 */
    
      return [ key, hash[key] ];
    })));
  });
  var mapNodeForQuoteExpansion = (function mapNodeForQuoteExpansion$(node, expansions) {
    /* map-node-for-quote-expansion /Users/jbr/code/sibilant/src/helpers.sibilant:88:0 */
  
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
          /* /Users/jbr/code/sibilant/src/helpers.sibilant:99:21 */
        
          return mapNodeForQuoteExpansion(arguments[0], expansions);
        }));
      } else {
        return node;
      }
    }).call(this);
  });
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
    sibilant.docs.record(("function " + prettify(fnName)), this);
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
    sibilant.docs.record(("macro " + sibilant.macros.searchPath[0] + "/" + prettify(name)), this);
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
  var node__QUERY = (function node__QUERY$(thing, types) {
    /* node? /Users/jbr/code/sibilant/src/transpiler.sibilant:1:0 */
  
    var types = Array.prototype.slice.call(arguments, 1);
  
    return ((typeof thing !== "undefined" && thing !== null) && "object" === typeof thing && typeof thing.type === "string" && (0 === types.length || types.indexOf(thing.type) !== -1) && thing.hasOwnProperty("contents"));
  });
  var emptyNode__QUERY = (function emptyNode__QUERY$(item) {
    /* empty-node? /Users/jbr/code/sibilant/src/transpiler.sibilant:9:0 */
  
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
    /* compact-node /Users/jbr/code/sibilant/src/transpiler.sibilant:17:0 */
  
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
  var recurseTranspile = (function recurseTranspile$(node) {
    /* recurse-transpile /Users/jbr/code/sibilant/src/transpiler.sibilant:26:0 */
  
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
    /* transpile /Users/jbr/code/sibilant/src/transpiler.sibilant:38:0 */
  
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
        resultNode.contents = compact(flatten(resultNode.contents));
        resultNode.source = node;
        (function() {
          if (sibilant.debug) {
            return console.log(prettify(node), red("->"), prettify(resultNode));
          }
        }).call(this);
        node.transpiled = resultNode;
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
    /* transpile.hat /Users/jbr/code/sibilant/src/transpiler.sibilant:72:0 */
  
    var token = node.contents[0].token,
        $_symbol6_$ = (function() {
      if (token.match((new RegExp("\/", undefined)))) {
        return token.split("/");
      } else {
        return [ sibilant.macros.searchPath[0], token ];
      }
    }).call(this),
        namespace = $_symbol6_$[0],
        macro = $_symbol6_$[1],
        $_symbol6_$ = undefined;
    return sibilant.macros.namespaces.core.get.call(node, "sibilant.macros.namespaces", sibilant.macros.namespaces.core.quote(transpile.literal({ token: namespace })), sibilant.macros.namespaces.core.quote(transpile.literal({ token: macro })));
  });
  transpile.tick = (function transpile$tick$(node) {
    /* transpile.tick /Users/jbr/code/sibilant/src/transpiler.sibilant:83:0 */
  
    return sibilant.macros.namespaces.core.quote.apply(node, node.contents);
  });
  transpile.at = (function transpile$at$(node) {
    /* transpile.at /Users/jbr/code/sibilant/src/transpiler.sibilant:86:0 */
  
    return transpile(node.contents[0]);
  });
  transpile.dots = (function transpile$dots$(node) {
    /* transpile.dots /Users/jbr/code/sibilant/src/transpiler.sibilant:89:0 */
  
    return sibilant.macros.namespaces.core.dots.apply(node, node.contents);
  });
  transpile.default = (function transpile$default$(node) {
    /* transpile.default /Users/jbr/code/sibilant/src/transpiler.sibilant:92:0 */
  
    return node.token;
  });
  transpile.output = (function transpile$output$(node) {
    /* transpile.output /Users/jbr/code/sibilant/src/transpiler.sibilant:95:0 */
  
    return node;
  });
  transpile.number = (function transpile$number$(node) {
    /* transpile.number /Users/jbr/code/sibilant/src/transpiler.sibilant:98:0 */
  
    return parseFloat(node.token.replace((new RegExp(",", "g")), "")).toString();
  });
  transpile.root = (function transpile$root$(node) {
    /* transpile.root /Users/jbr/code/sibilant/src/transpiler.sibilant:104:0 */
  
    return (function() {
      if (1 === node.contents.length) {
        return transpile(node.contents[0]);
      } else {
        return interleave(compact(map(node.contents, asStatement)), "\n");
      }
    }).call(this);
  });
  transpile.expression = (function transpile$expression$(node, preprocessor) {
    /* transpile.expression /Users/jbr/code/sibilant/src/transpiler.sibilant:113:0 */
  
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
    /* transpile.bracket /Users/jbr/code/sibilant/src/transpiler.sibilant:139:0 */
  
    return sibilant.macros.namespaces.core.list.apply(this, node.contents);
  });
  transpile.brace = (function transpile$brace$(node) {
    /* transpile.brace /Users/jbr/code/sibilant/src/transpiler.sibilant:142:0 */
  
    return sibilant.macros.namespaces.core.hash.apply(this, node.contents);
  });
  transpile.literal = (function transpile$literal$(node) {
    /* transpile.literal /Users/jbr/code/sibilant/src/transpiler.sibilant:144:0 */
  
    var string = node.token;
    return inject(string.replace((new RegExp("\\*", "g")), "_")
      .replace((new RegExp("\\?$", undefined)), "__QUERY")
      .replace((new RegExp("!$", undefined)), "__BANG"), string.match((new RegExp("-(.)", "g"))), (function(returnString, match) {
      /* /Users/jbr/code/sibilant/src/transpiler.sibilant:151:13 */
    
      return returnString.replace(match, match[1].toUpperCase());
    }));
  });
  transpile.string = (function transpile$string$(node) {
    /* transpile.string /Users/jbr/code/sibilant/src/transpiler.sibilant:155:0 */
  
    return node.token.split("\n")
      .join("\\n\" +\n\"");
  });
  transpile.comment = (function transpile$comment$(node) {
    /* transpile.comment /Users/jbr/code/sibilant/src/transpiler.sibilant:160:0 */
  
    return null;
  });
  sibilant.docs = {
    definitions: [],
    undocumented: {  }
  };
  sibilant.docs.record = (function sibilant$docs$record$(name, node) {
    /* sibilant.docs.record /Users/jbr/code/sibilant/src/docs.sibilant:4:0 */
  
    var doc = sibilant.docs.lastDoc;
    (function() {
      if (typeof doc !== "undefined") {
        delete sibilant.docs.undocumented[name];
        return sibilant.docs.definitions.push(mergeInto(doc, {
          name: name,
          definition: node
        }));
      } else {
        return sibilant.docs.undocumented[name] = true;
      }
    }).call(this);
    return delete sibilant.docs.lastDoc;
  });
  sibilant.docs.asText = (function sibilant$docs$asText$() {
    /* sibilant.docs.as-text /Users/jbr/code/sibilant/src/docs.sibilant:13:0 */
  
    sibilant.docs.definitions.forEach((function(definition) {
      /* /Users/jbr/code/sibilant/src/docs.sibilant:14:5 */
    
      return (function() {
        try {
          return console.log(("name: " + definition.name + "\n" + "description: " + definition.docString + "\n" + (function() {
            if (definition.references) {
              return ("references:\n" + (definition.references.map((function() {
                /* /Users/jbr/code/sibilant/src/docs.sibilant:20:63 */
              
                return eval(outputFormatter(transpile(arguments[0])));
              })).join("\n") + "\n"));
            } else {
              return "";
            }
          }).call(this) + "arguments: " + prettify(definition.definition.contents[2]) + "\n" + "examples: \n" + map(definition.examples, (function() {
            /* /Users/jbr/code/sibilant/src/docs.sibilant:26:49 */
          
            return (prettify(arguments[0], true) + "\n" + outputFormatter(transpile(arguments[0])));
          })).join("\n\n") + "\n\n"));
        } catch (e) {
          console.log(definition);
          throw e
        }
      }).call(this);
    }));
    console.log(("undocumented (" + Object.keys(sibilant.docs.undocumented).length + "):\n"));
    return Object.keys(sibilant.docs.undocumented).forEach((function(name) {
      /* /Users/jbr/code/sibilant/src/docs.sibilant:31:5 */
    
      return console.log(name);
    }));
  });
  var sibilize = (function sibilize$(input) {
    /* sibilize /Users/jbr/code/sibilant/src/require-and-include.sibilant:1:0 */
  
    sibilant.initialize();
    return outputFormatter(transpile(restructure(parse(input))));
  });
  var sourcemap = (function sourcemap$(input) {
    /* sourcemap /Users/jbr/code/sibilant/src/require-and-include.sibilant:5:0 */
  
    sibilant.initialize();
    return sourcemapper(transpile(restructure(parse(input))));
  });
  sibilant.sibilize = sibilize;
  sibilant.version = (function sibilant$version$() {
    /* sibilant.version /Users/jbr/code/sibilant/src/require-and-include.sibilant:11:0 */
  
    return sibilant.packageInfo().version;
  });
  sibilant.stripShebang = (function sibilant$stripShebang$(data) {
    /* sibilant.strip-shebang /Users/jbr/code/sibilant/src/require-and-include.sibilant:14:0 */
  
    return data.replace((new RegExp("^#!.*\\n", undefined)), "\n");
  });
  sibilant.file = "eval.sibilant";
  var withDirAndFile = (function withDirAndFile$(dir, file, fn) {
    /* with-dir-and-file /Users/jbr/code/sibilant/src/require-and-include.sibilant:19:0 */
  
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
    /* sibilant.sibilize-file /Users/jbr/code/sibilant/src/require-and-include.sibilant:36:0 */
  
    return outputFormatter(sibilant.transpileFile(fileName));
  });
  sibilant.sibilizeJson = (function sibilant$sibilizeJson$(fileName) {
    /* sibilant.sibilize-json /Users/jbr/code/sibilant/src/require-and-include.sibilant:39:0 */
  
    sibilant.initialize();
    var before = sibilant.macros.namespaces.core.hash.quoteKeys;
    sibilant.macros.namespaces.core.hash.quoteKeys = true;
    var content = sibilant.sibilizeFile(fileName);
    sibilant.macros.namespaces.core.hash.quoteKeys = before;
    return content;
  });
  
  
  sibilant.macros.namespaces.core.ternary = (function ternary$(cond, ifTrue, ifFalse) {
    /* ternary /Users/jbr/code/sibilant/include/macros.sibilant:8:0 */
  
    return [ "(", transpile(cond), ") ? ", transpile(ifTrue), " : ", transpile(ifFalse) ];
  });
  sibilant.macros.namespaces.core.set = (function set$(arr, kvPairs) {
    /* set /Users/jbr/code/sibilant/include/macros.sibilant:18:0 */
  
    var kvPairs = Array.prototype.slice.call(arguments, 1);
  
    return interleave("\n", bulkMap(kvPairs, (function(k, v) {
      /* /Users/jbr/code/sibilant/include/macros.sibilant:20:34 */
    
      return asStatement([ "(", transpile(arr), ")", "[", transpile(k), "] = ", transpile(v) ]);
    })));
  });
  sibilant.macros.namespaces.core.var = (function var$(pairs) {
    /* var /Users/jbr/code/sibilant/include/macros.sibilant:24:0 */
  
    var pairs = Array.prototype.slice.call(arguments, 0);
  
    return asStatement([ "var ", interleave(",\n    ", bulkMap(pairs, (function(name, value) {
      /* /Users/jbr/code/sibilant/include/macros.sibilant:29:25 */
    
      return [ transpile(name), " = ", transpile(value) ];
    }))) ]);
  });
  sibilant.macros.namespaces.core.get = (function get$(obj, keys) {
    /* get /Users/jbr/code/sibilant/include/macros.sibilant:34:0 */
  
    var keys = Array.prototype.slice.call(arguments, 1);
  
    return [ "(", transpile(obj), ")", map(keys, (function(key) {
      /* /Users/jbr/code/sibilant/include/macros.sibilant:35:42 */
    
      return [ "[", transpile(key), "]" ];
    })) ];
  });
  sibilant.macros.namespaces.core.aliasMacro = (function aliasMacro$(currentMacroName, newMacroName) {
    /* alias-macro /Users/jbr/code/sibilant/include/macros.sibilant:45:0 */
  
    var currentMacroName = outputFormatter(transpile(currentMacroName)),
        newMacroName = outputFormatter(transpile(newMacroName));
    sibilant.macros.namespace[newMacroName] = sibilant.macros.namespace[currentMacroName];
    return null;
  });
  sibilant.macros.namespaces.core.send = (function send$(object, method, args) {
    /* send /Users/jbr/code/sibilant/include/macros.sibilant:59:0 */
  
    var args = Array.prototype.slice.call(arguments, 2);
  
    return [ transpile(object), ".", transpile(method), "(", interleave(", ", map(args, transpile)), ")" ];
  });
  sibilant.macros.namespaces.core.apply = (function apply$(fn, arglist) {
    /* apply /Users/jbr/code/sibilant/include/macros.sibilant:70:0 */
  
    return macros.expandQuote.call(this, "37443", {
      "37447": fn,
      "37452": arglist
    });
  });
  sibilant.macros.namespaces.core.cons = (function cons$(first, rest) {
    /* cons /Users/jbr/code/sibilant/include/macros.sibilant:81:0 */
  
    return [ "[ ", transpile(first), " ].concat(", transpile(rest), ")" ];
  });
  sibilant.macros.namespaces.core.append = (function append$(list, additional) {
    /* append /Users/jbr/code/sibilant/include/macros.sibilant:89:0 */
  
    var additional = Array.prototype.slice.call(arguments, 1);
  
    return macros.expandQuote.call(this, "37583", {
      "37587": list,
      "37594": additional
    });
  });
  sibilant.macros.namespaces.core.length = (function length$(arr) {
    /* length /Users/jbr/code/sibilant/include/macros.sibilant:95:0 */
  
    return macros.expandQuote.call(this, "37647", { "37650": arr });
  });
  sibilant.macros.namespaces.core.scoped = (function scoped$(body) {
    /* scoped /Users/jbr/code/sibilant/include/macros.sibilant:102:0 */
  
    var body = Array.prototype.slice.call(arguments, 0);
  
    return macros.expandQuote.call(this, "37720", {
      "37727": {
        node: this,
        args: []
      },
      "37740": body
    });
  });
  sibilant.macros.namespaces.core["_scopedWithoutSource"] = (function _scopedWithoutSource$(body) {
    /* *scoped-without-source /Users/jbr/code/sibilant/include/macros.sibilant:106:0 */
  
    var body = Array.prototype.slice.call(arguments, 0);
  
    return [ "(function() {", indent(macros.expandQuote.call(this, "37775", { "37779": body })), "}).call(this)" ];
  });
  sibilant.macros.namespaces.core["_numberWords"] = (function _numberWords$(numberWords) {
    /* *number-words /Users/jbr/code/sibilant/include/macros.sibilant:109:0 */
  
    var numberWords = Array.prototype.slice.call(arguments, 0);
  
    return numberWords.forEach((function(word, index) {
      /* /Users/jbr/code/sibilant/include/macros.sibilant:110:31 */
    
      macros.expandQuote.call(this, "37854", {
        "37857": ("fetches the " + outputFormatter(transpile(word)) + " element from `arr`"),
        "37915": word
      });
      return macros.expandQuote.call(this, "37956", {
        "37959": word,
        "37971": index
      });
    }));
  });
  sibilant.macros.namespaces.core.rest = (function rest$(arr) {
    /* rest /Users/jbr/code/sibilant/include/macros.sibilant:120:0 */
  
    return macros.expandQuote.call(this, "38058", { "38062": arr });
  });
  sibilant.macros.namespaces.core.last = (function last$(arr) {
    /* last /Users/jbr/code/sibilant/include/macros.sibilant:124:0 */
  
    return macros.expandQuote.call(this, "38108", { "38115": arr });
  });
  sibilant.macros.namespaces.core["="] = (function $$(a, b) {
    /* = /Users/jbr/code/sibilant/include/macros.sibilant:127:0 */
  
    return [ transpile(a), " === ", transpile(b) ];
  });
  sibilant.macros.namespaces.core["+"] = (function $$(args) {
    /* + /Users/jbr/code/sibilant/include/macros.sibilant:133:0 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    return [ "(", interleave(" + ", map(args, transpile)), ")" ];
  });
  sibilant.macros.namespaces.core["-"] = (function $$(args) {
    /* - /Users/jbr/code/sibilant/include/macros.sibilant:139:0 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    return [ "(", interleave(" - ", map(args, transpile)), ")" ];
  });
  sibilant.macros.namespaces.core["_"] = (function _$(args) {
    /* * /Users/jbr/code/sibilant/include/macros.sibilant:144:0 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    return [ "(", interleave(" * ", map(args, transpile)), ")" ];
  });
  sibilant.macros.namespaces.core["/"] = (function $$(args) {
    /* / /Users/jbr/code/sibilant/include/macros.sibilant:150:0 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    return [ "(", interleave(" / ", map(args, transpile)), ")" ];
  });
  sibilant.macros.namespaces.core.or = (function or$(args) {
    /* or /Users/jbr/code/sibilant/include/macros.sibilant:156:0 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    return [ "(", interleave(" || ", map(args, transpile)), ")" ];
  });
  sibilant.macros.namespaces.core.and = (function and$(args) {
    /* and /Users/jbr/code/sibilant/include/macros.sibilant:163:0 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    return (1 === args.length) ? transpile(args[0]) : [ "(", interleave(" && ", map(args, transpile)), ")" ];
  });
  sibilant.macros.namespaces.core.mod = (function mod$(args) {
    /* mod /Users/jbr/code/sibilant/include/macros.sibilant:168:0 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    return [ "(", interleave(" % ", map(args, transpile)), ")" ];
  });
  sibilant.macros.namespaces.core["_defInfix"] = (function _defInfix$(macroName, word, jsComparator) {
    /* *def-infix /Users/jbr/code/sibilant/include/macros.sibilant:178:0 */
  
    var docstring = ("compares `args` from left to right, " + "returning true if each element is " + word.token.slice(1, -1) + " than the next");
    macros.expandQuote.call(this, "38865", {
      "38868": docstring,
      "38876": macroName,
      "38887": macroName
    });
    return macros.expandQuote.call(this, "38914", {
      "38917": macroName,
      "38945": (jsComparator || [ "\"", macroName, "\"" ])
    });
  });
  sibilant.macros.namespaces.core[">"] = (function $$(args) {
    /* > /Users/jbr/code/sibilant/include/macros.sibilant:186:8 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    var jsComparator = ">";
    return macros.expandQuote.call(this, "2432", { "2436": map(args.slice(0, -1), (function(item, index) {
      /* /Users/jbr/code/sibilant/include/macros.sibilant:189:30 */
    
      return [ item, " ", jsComparator, " ", args[(1 + index)] ];
    })) });
  });
  sibilant.macros.namespaces.core["<"] = (function $$(args) {
    /* < /Users/jbr/code/sibilant/include/macros.sibilant:186:8 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    var jsComparator = "<";
    return macros.expandQuote.call(this, "2432", { "2436": map(args.slice(0, -1), (function(item, index) {
      /* /Users/jbr/code/sibilant/include/macros.sibilant:189:30 */
    
      return [ item, " ", jsComparator, " ", args[(1 + index)] ];
    })) });
  });
  sibilant.macros.namespaces.core["<="] = (function $$(args) {
    /* <= /Users/jbr/code/sibilant/include/macros.sibilant:186:8 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    var jsComparator = "<=";
    return macros.expandQuote.call(this, "2432", { "2436": map(args.slice(0, -1), (function(item, index) {
      /* /Users/jbr/code/sibilant/include/macros.sibilant:189:30 */
    
      return [ item, " ", jsComparator, " ", args[(1 + index)] ];
    })) });
  });
  sibilant.macros.namespaces.core[">="] = (function $$(args) {
    /* >= /Users/jbr/code/sibilant/include/macros.sibilant:186:8 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    var jsComparator = ">=";
    return macros.expandQuote.call(this, "2432", { "2436": map(args.slice(0, -1), (function(item, index) {
      /* /Users/jbr/code/sibilant/include/macros.sibilant:189:30 */
    
      return [ item, " ", jsComparator, " ", args[(1 + index)] ];
    })) });
  });
  sibilant.macros.namespaces.core["!="] = (function $$(args) {
    /* != /Users/jbr/code/sibilant/include/macros.sibilant:186:8 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    var jsComparator = "!==";
    return macros.expandQuote.call(this, "2432", { "2436": map(args.slice(0, -1), (function(item, index) {
      /* /Users/jbr/code/sibilant/include/macros.sibilant:189:30 */
    
      return [ item, " ", jsComparator, " ", args[(1 + index)] ];
    })) });
  });
  sibilant.macros.namespaces.core["="] = (function $$(args) {
    /* = /Users/jbr/code/sibilant/include/macros.sibilant:186:8 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    var jsComparator = "===";
    return macros.expandQuote.call(this, "2432", { "2436": map(args.slice(0, -1), (function(item, index) {
      /* /Users/jbr/code/sibilant/include/macros.sibilant:189:30 */
    
      return [ item, " ", jsComparator, " ", args[(1 + index)] ];
    })) });
  });
  sibilant.macros.namespaces.core.incrBy = (function incrBy$(item, increment) {
    /* incr-by /Users/jbr/code/sibilant/include/macros.sibilant:211:0 */
  
    return [ transpile(item), " += ", transpile(increment) ];
  });
  sibilant.macros.namespaces.core.incr = (function incr$(item) {
    /* incr /Users/jbr/code/sibilant/include/macros.sibilant:218:0 */
  
    return [ "((", transpile(item), ")++)" ];
  });
  sibilant.macros.namespaces.core.decr = (function decr$(item) {
    /* decr /Users/jbr/code/sibilant/include/macros.sibilant:226:0 */
  
    return [ "((", transpile(item), ")--)" ];
  });
  sibilant.macros.namespaces.core.new = (function new$(constructor, args) {
    /* new /Users/jbr/code/sibilant/include/macros.sibilant:232:0 */
  
    var args = Array.prototype.slice.call(arguments, 1);
  
    return [ "(new ", macros.expandQuote.call(this, "39397", {
      "39400": constructor,
      "39404": args
    }), ")" ];
  });
  sibilant.macros.namespaces.core.regex = (function regex$(pattern, flags) {
    /* regex /Users/jbr/code/sibilant/include/macros.sibilant:239:0 */
  
    return macros.expandQuote.call(this, "39466", {
      "39471": pattern,
      "39474": (flags || "undefined")
    });
  });
  sibilant.macros.namespaces.core.timestamp = (function timestamp$() {
    /* timestamp /Users/jbr/code/sibilant/include/macros.sibilant:246:0 */
  
    return [ "\"", (new Date()).toString(), "\"" ];
  });
  sibilant.macros.namespaces.core["zero__QUERY"] = (function zero__QUERY$(item) {
    /* zero? /Users/jbr/code/sibilant/include/macros.sibilant:252:0 */
  
    return macros.expandQuote.call(this, "39574", { "39577": item });
  });
  sibilant.macros.namespaces.core["empty__QUERY"] = (function empty__QUERY$(arr) {
    /* empty? /Users/jbr/code/sibilant/include/macros.sibilant:257:0 */
  
    return macros.expandQuote.call(this, "39625", { "39633": arr });
  });
  sibilant.macros.namespaces.core["odd__QUERY"] = (function odd__QUERY$(number) {
    /* odd? /Users/jbr/code/sibilant/include/macros.sibilant:263:0 */
  
    return macros.expandQuote.call(this, "39678", { "39686": number });
  });
  sibilant.macros.namespaces.core["even__QUERY"] = (function even__QUERY$(number) {
    /* even? /Users/jbr/code/sibilant/include/macros.sibilant:269:0 */
  
    return macros.expandQuote.call(this, "39733", { "39741": number });
  });
  sibilant.macros.namespaces.core.typeof = (function typeof$(thing) {
    /* typeof /Users/jbr/code/sibilant/include/macros.sibilant:276:0 */
  
    return [ "typeof ", transpile(thing) ];
  });
  sibilant.macros.namespaces.core["string__QUERY"] = (function string__QUERY$(things) {
    /* string? /Users/jbr/code/sibilant/include/macros.sibilant:281:0 */
  
    var things = Array.prototype.slice.call(arguments, 0);
  
    return macros.expandQuote.call(this, "39850", { "39854": map(things, (function(thing) {
      /* /Users/jbr/code/sibilant/include/macros.sibilant:282:29 */
    
      return macros.expandQuote.call(this, "39867", { "39873": thing });
    })) });
  });
  sibilant.macros.namespaces.core["function__QUERY"] = (function function__QUERY$(things) {
    /* function? /Users/jbr/code/sibilant/include/macros.sibilant:287:0 */
  
    var things = Array.prototype.slice.call(arguments, 0);
  
    return macros.expandQuote.call(this, "39938", { "39942": map(things, (function(thing) {
      /* /Users/jbr/code/sibilant/include/macros.sibilant:288:29 */
    
      return macros.expandQuote.call(this, "39955", { "39961": thing });
    })) });
  });
  sibilant.macros.namespaces.core["undefined__QUERY"] = (function undefined__QUERY$(things) {
    /* undefined? /Users/jbr/code/sibilant/include/macros.sibilant:296:0 */
  
    var things = Array.prototype.slice.call(arguments, 0);
  
    return macros.expandQuote.call(this, "40046", { "40050": map(things, (function(thing) {
      /* /Users/jbr/code/sibilant/include/macros.sibilant:297:29 */
    
      return macros.expandQuote.call(this, "40063", { "40069": thing });
    })) });
  });
  sibilant.macros.namespaces.core["defined__QUERY"] = (function defined__QUERY$(things) {
    /* defined? /Users/jbr/code/sibilant/include/macros.sibilant:304:0 */
  
    var things = Array.prototype.slice.call(arguments, 0);
  
    return macros.expandQuote.call(this, "40154", { "40158": map(things, (function(thing) {
      /* /Users/jbr/code/sibilant/include/macros.sibilant:305:29 */
    
      return macros.expandQuote.call(this, "40171", { "40177": thing });
    })) });
  });
  sibilant.macros.namespaces.core["number__QUERY"] = (function number__QUERY$(things) {
    /* number? /Users/jbr/code/sibilant/include/macros.sibilant:311:0 */
  
    var things = Array.prototype.slice.call(arguments, 0);
  
    return macros.expandQuote.call(this, "40244", { "40248": map(things, (function(thing) {
      /* /Users/jbr/code/sibilant/include/macros.sibilant:312:29 */
    
      return macros.expandQuote.call(this, "40261", { "40267": thing });
    })) });
  });
  sibilant.macros.namespaces.core.if = (function if$(arg, truebody, falsebody) {
    /* if /Users/jbr/code/sibilant/include/macros.sibilant:316:0 */
  
    return [ "(function() {", indent([ "if (", transpile(arg), ") {", indent(macros.expandQuote.call(this, "40356", { "40360": truebody })), "} else {", indent(macros.expandQuote.call(this, "40419", { "40423": falsebody })), "}" ]), "}).call(this)" ];
  });
  sibilant.macros.namespaces.core.pipe = (function pipe$(calls) {
    /* pipe /Users/jbr/code/sibilant/include/macros.sibilant:343:0 */
  
    var calls = Array.prototype.slice.call(arguments, 0);
  
    return inject(undefined, calls, (function(value, item) {
      /* /Users/jbr/code/sibilant/include/macros.sibilant:345:15 */
    
      return (function() {
        if (typeof value === "undefined") {
          return item;
        } else {
          return (function() {
            /* /Users/jbr/code/sibilant/include/macros.sibilant:347:21 */
          
            var cloned = (function() {
              if (node__QUERY(item, "literal", "dots")) {
                return macros.expandQuote.call(this, "40989", { "40990": item }).source;
              } else {
                return clone(item);
              }
            }).call(this);
            return mergeInto(cloned, { contents: [ cloned.contents[0], value ].concat(cloned.contents.slice(1)) });
          }).call(this);
        }
      }).call(this);
    }));
  });
  sibilant.macros.namespaces.core.comment = (function comment$(contents) {
    /* comment /Users/jbr/code/sibilant/include/macros.sibilant:363:0 */
  
    var contents = Array.prototype.slice.call(arguments, 0);
  
    return map(contents, (function(content) {
      /* /Users/jbr/code/sibilant/include/macros.sibilant:364:21 */
    
      return [ "// ", recurseMap(transpile(content), (function(item) {
        /* /Users/jbr/code/sibilant/include/macros.sibilant:366:36 */
      
        return (item) ? outputFormatter(transpile(item)).replace((new RegExp("\n", "g")), "\n// ") : null;
      })) ];
    }));
  });
  sibilant.macros.namespaces.core["array__QUERY"] = (function array__QUERY$(thing) {
    /* array? /Users/jbr/code/sibilant/include/macros.sibilant:385:0 */
  
    var transpiled = transpile(thing);
    return [ "((", transpiled, ") && typeof (", transpiled, ") === \"object\" && (", transpiled, ").constructor.name === \"Array\")" ];
  });
  sibilant.macros.namespaces.core.when = (function when$(condition, body) {
    /* when /Users/jbr/code/sibilant/include/macros.sibilant:397:0 */
  
    var body = Array.prototype.slice.call(arguments, 1);
  
    return [ "(function() {", indent([ "if (", transpile(condition), ") {", indent(macros.expandQuote.call(this, "41839", { "41843": body })), "}" ]), "}).call(this)" ];
  });
  sibilant.macros.namespaces.core.not = (function not$(exp) {
    /* not /Users/jbr/code/sibilant/include/macros.sibilant:410:0 */
  
    return [ "!(", transpile(exp), ")" ];
  });
  sibilant.macros.namespaces.core.unless = (function unless$(condition, body) {
    /* unless /Users/jbr/code/sibilant/include/macros.sibilant:422:0 */
  
    var body = Array.prototype.slice.call(arguments, 1);
  
    return [ "(function() {", indent([ "if (", macros.expandQuote.call(this, "42066", { "42069": condition }), ") {", indent(macros.expandQuote.call(this, "42103", { "42107": body })), "}" ]), "}).call(this)" ];
  });
  sibilant.macros.namespaces.core.assign = (function assign$(args) {
    /* assign /Users/jbr/code/sibilant/include/macros.sibilant:435:0 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    return interleave("\n", bulkMap(args, (function(name, value) {
      /* /Users/jbr/code/sibilant/include/macros.sibilant:437:28 */
    
      return asStatement([ transpile(name), " = ", transpile(value) ]);
    })));
  });
  sibilant.macros.namespaces.core.logPretty = (function logPretty$(label, arg) {
    /* log-pretty /Users/jbr/code/sibilant/include/macros.sibilant:448:0 */
  
    var node = this;
    (function() {
      if (typeof arg === "undefined") {
        arg = label;
        return label = [ "\"", prettify(label, false), "\"" ];
      }
    }).call(this);
    return macros.expandQuote.call(this, "42517", {
      "42523": [ "\"", node.file, ":", node.line, "\"" ],
      "42538": label,
      "42546": arg
    });
  });
  sibilant.macros.namespaces.core.each = (function each$(item, array, body) {
    /* each /Users/jbr/code/sibilant/include/macros.sibilant:466:0 */
  
    var body = Array.prototype.slice.call(arguments, 2);
  
    return macros.expandQuote.call(this, "42764", {
      "42768": array,
      "42793": {
        node: this,
        args: (function() {
          if (node__QUERY(item, "expression")) {
            return item;
          } else {
            return [ item ];
          }
        }).call(this)
      },
      "42881": body
    });
  });
  sibilant.macros.namespaces.core.macroExpand = (function macroExpand$(name) {
    /* macro-expand /Users/jbr/code/sibilant/include/macros.sibilant:481:0 */
  
    var macro = macros[outputFormatter(transpile(name))];
    return (function() {
      if (macro) {
        return macro.toString();
      } else {
        return "undefined";
      }
    }).call(this);
  });
  sibilant.macros.namespaces.core.throw = (function throw$(error) {
    /* throw /Users/jbr/code/sibilant/include/macros.sibilant:493:0 */
  
    return [ "throw ", transpile(error) ];
  });
  sibilant.macros.namespaces.core.asBoolean = (function asBoolean$(expr) {
    /* as-boolean /Users/jbr/code/sibilant/include/macros.sibilant:502:0 */
  
    return [ "(!!(", transpile(expr), "))" ];
  });
  sibilant.macros.namespaces.core.try = (function try$(tryblock, catchblock) {
    /* try /Users/jbr/code/sibilant/include/macros.sibilant:508:0 */
  
    return [ "(function() {", indent([ "try {", indent(macros.expandQuote.call(this, "43164", { "43167": tryblock })), "} catch (e) {", indent(macros.expandQuote.call(this, "43212", { "43215": catchblock })), "}" ]), "}).call(this)" ];
  });
  sibilant.macros.namespaces.core.state = (function state$(pairs) {
    /* state /Users/jbr/code/sibilant/include/macros.sibilant:525:0 */
  
    var pairs = Array.prototype.slice.call(arguments, 0);
  
    return (function() {
      if (1 === pairs.length) {
        return sibilant.state[outputFormatter(transpile(pairs[0]))];
      } else {
        bulkMap(pairs, (function(k, v) {
          /* /Users/jbr/code/sibilant/include/macros.sibilant:528:31 */
        
          return sibilant.state[outputFormatter(transpile(k))] = eval(outputFormatter(transpile(v)));
        }));
        return null;
      }
    }).call(this);
  });
  sibilant.macros.namespaces.core.symbol = (function symbol$() {
    /* symbol /Users/jbr/code/sibilant/include/macros.sibilant:534:0 */
  
    var symbolCount = (sibilant.state.symbolCount || 0),
        newSymbolCount = (1 + symbolCount);
    sibilant.macros.namespaces.core.state("symbolCount", newSymbolCount);
    return [ "$_symbol", newSymbolCount, "_$" ];
  });
  sibilant.macros.namespaces.core.while = (function while$(condition, body) {
    /* while /Users/jbr/code/sibilant/include/macros.sibilant:548:0 */
  
    var body = Array.prototype.slice.call(arguments, 1);
  
    var symbol = sibilant.macros.namespaces.core.symbol();
    return macros.expandQuote.call(this, "43587", {
      "43602": symbol,
      "43615": [ "while (", transpile(condition), ") {", indent(macros.expandQuote.call(this, "43642", {
        "43645": symbol,
        "43652": body
      })), "}" ],
      "43682": symbol
    });
  });
  sibilant.macros.namespaces.core.until = (function until$(condition, body) {
    /* until /Users/jbr/code/sibilant/include/macros.sibilant:565:0 */
  
    var body = Array.prototype.slice.call(arguments, 1);
  
    return macros.expandQuote.call(this, "43751", {
      "43757": condition,
      "43762": body
    });
  });
  sibilant.macros.namespaces.core["match__QUERY"] = (function match__QUERY$(regexp, string) {
    /* match? /Users/jbr/code/sibilant/include/macros.sibilant:574:0 */
  
    return macros.expandQuote.call(this, "43821", {
      "43825": string,
      "43828": regexp
    });
  });
  sibilant.macros.namespaces.core["matchRegex__QUERY"] = (function matchRegex__QUERY$(string, pattern, flags) {
    /* match-regex? /Users/jbr/code/sibilant/include/macros.sibilant:579:0 */
  
    return macros.expandQuote.call(this, "43881", {
      "43887": pattern,
      "43890": flags,
      "43894": string
    });
  });
  sibilant.macros.namespaces.core.replace = (function replace$(string, pattern, replacement) {
    /* replace /Users/jbr/code/sibilant/include/macros.sibilant:585:0 */
  
    return macros.expandQuote.call(this, "43947", {
      "43951": string,
      "43971": pattern,
      "43989": replacement
    });
  });
  sibilant.macros.namespaces.core.replaceAll = (function replaceAll$(string, pattern, replacement) {
    /* replace-all /Users/jbr/code/sibilant/include/macros.sibilant:592:0 */
  
    return macros.expandQuote.call(this, "44041", {
      "44045": string,
      "44051": pattern,
      "44058": replacement
    });
  });
  sibilant.macros.namespaces.core.thunk = (function thunk$(body) {
    /* thunk /Users/jbr/code/sibilant/include/macros.sibilant:605:0 */
  
    var body = Array.prototype.slice.call(arguments, 0);
  
    return macros.expandQuote.call(this, "44168", {
      "44171": {
        node: this,
        args: []
      },
      "44193": mapNode(body, (function(node) {
        /* /Users/jbr/code/sibilant/include/macros.sibilant:608:17 */
      
        return (function() {
          if (node__QUERY(node, "argPlaceholder")) {
            return macros.expandQuote.call(this, "44277", { "44280": node.token.replace((new RegExp("^#", undefined)), "") });
          } else {
            return node;
          }
        }).call(this);
      }))
    });
  });
  sibilant.macros.namespaces.core.pipeThunk = (function pipeThunk$(calls) {
    /* pipe-thunk /Users/jbr/code/sibilant/include/macros.sibilant:620:0 */
  
    var calls = Array.prototype.slice.call(arguments, 0);
  
    return macros.expandQuote.call(this, "44395", { "44404": calls });
  });
  sibilant.macros.namespaces.core.keys = (function keys$(obj) {
    /* keys /Users/jbr/code/sibilant/include/macros.sibilant:631:0 */
  
    return macros.expandQuote.call(this, "44486", { "44489": obj });
  });
  sibilant.macros.namespaces.core.delete = (function delete$(objects) {
    /* delete /Users/jbr/code/sibilant/include/macros.sibilant:643:0 */
  
    var objects = Array.prototype.slice.call(arguments, 0);
  
    return interleave("\n", map(objects, (function(obj) {
      /* /Users/jbr/code/sibilant/include/macros.sibilant:644:37 */
    
      return asStatement([ "delete ", transpile(obj) ]);
    })));
  });
  sibilant.macros.namespaces.core.deleteMacro = (function deleteMacro$(macroNames) {
    /* delete-macro /Users/jbr/code/sibilant/include/macros.sibilant:654:0 */
  
    var macroNames = Array.prototype.slice.call(arguments, 0);
  
    macroNames.forEach((function(macroName) {
      /* /Users/jbr/code/sibilant/include/macros.sibilant:655:7 */
    
      return delete sibilant.macros.namespace[outputFormatter(transpile(macroName))];
    }));
    return null;
  });
  sibilant.macros.namespaces.core.renameMacro = (function renameMacro$(currentMacroName, newMacroName) {
    /* rename-macro /Users/jbr/code/sibilant/include/macros.sibilant:666:0 */
  
    sibilant.macros.namespaces.core.aliasMacro(currentMacroName, newMacroName);
    sibilant.macros.namespaces.core.deleteMacro(currentMacroName);
    return null;
  });
  sibilant.macros.namespaces.core.arguments = (function arguments$() {
    /* arguments /Users/jbr/code/sibilant/include/macros.sibilant:680:0 */
  
    return [ "(Array.prototype.slice.apply(arguments))" ];
  });
  sibilant.macros.namespaces.core.argument = (function argument$(index) {
    /* argument /Users/jbr/code/sibilant/include/macros.sibilant:691:0 */
  
    return macros.expandQuote.call(this, "44889", { "44894": index });
  });
  sibilant.macros.namespaces.core.eachKey = (function eachKey$(as, obj, body) {
    /* each-key /Users/jbr/code/sibilant/include/macros.sibilant:699:0 */
  
    var body = Array.prototype.slice.call(arguments, 2);
  
    return macros.expandQuote.call(this, "44963", {
      "44966": obj,
      "44994": {
        args: (function() {
          if (node__QUERY(as, "expression")) {
            return as;
          } else {
            return [ as ];
          }
        }).call(this),
        node: this
      },
      "45096": body
    });
  });
  sibilant.macros.namespaces.core.switch = (function switch$(obj, cases) {
    /* switch /Users/jbr/code/sibilant/include/macros.sibilant:721:0 */
  
    var cases = Array.prototype.slice.call(arguments, 1);
  
    return [ "(function() {", indent([ "switch(", transpile(obj), ") {", map(cases, (function(caseDef) {
      /* /Users/jbr/code/sibilant/include/macros.sibilant:724:30 */
    
      var caseNameNode = caseDef.contents[0],
          caseLabels = (function() {
        if (node__QUERY(caseNameNode, "expression", "bracket")) {
          return caseNameNode.contents;
        } else {
          return [ caseNameNode ];
        }
      }).call(this),
          caseString = interleave("\n", map(caseLabels, (function(c) {
        /* /Users/jbr/code/sibilant/include/macros.sibilant:730:78 */
      
        return (function() {
          if ("default" === c.token) {
            return "default:";
          } else {
            return [ "case ", transpile(c), ":" ];
          }
        }).call(this);
      })));
      return [ "\n", caseString, indent(macros.expandQuote.call(this, "46062", { "46066": caseDef.contents.slice(1) })) ];
    })), "}" ]), "}).call(this)" ];
  });
  sibilant.macros.namespaces.core.if = (function if$(alternatingConditionsAndBranches) {
    /* if /Users/jbr/code/sibilant/include/macros.sibilant:765:0 */
  
    var alternatingConditionsAndBranches = Array.prototype.slice.call(arguments, 0);
  
    return [ "(function() {", indent(interleave(" else ", bulkMap(alternatingConditionsAndBranches, (function(cond, val) {
      /* /Users/jbr/code/sibilant/include/macros.sibilant:770:25 */
    
      return (function() {
        if (typeof val !== "undefined") {
          return [ "if (", transpile(cond), ") {", indent(macros.expandQuote.call(this, "46687", { "46690": val })), "}" ];
        } else {
          return [ "{", indent(macros.expandQuote.call(this, "46773", { "46776": cond })), "}" ];
        }
      }).call(this);
    })))), "}).call(this)" ];
  });
  sibilant.macros.namespaces.core.chain = (function chain$(object, calls) {
    /* chain /Users/jbr/code/sibilant/include/macros.sibilant:794:0 */
  
    var calls = Array.prototype.slice.call(arguments, 1);
  
    return (function() {
      if (0 === calls.length) {
        return transpile(object);
      } else if (1 === calls.length) {
        return macros.expandQuote.call(this, "46915", {
          "46918": object,
          "46922": calls[0].contents
        });
      } else {
        var lines = map(calls, (function(call, index) {
          /* /Users/jbr/code/sibilant/include/macros.sibilant:798:34 */
        
          return [ ".", transpile(call.contents[0]), "(", interleave(", ", map(call.contents.slice(1), transpile)), ")" ];
        }));
        return [ transpile(object), lines[0], "\n  ", recurseIndent(interleave("\n", lines.slice(1))) ];
      }
    }).call(this);
  });
  sibilant.macros.namespaces.core.chainable = (function chainable$(names) {
    /* chainable /Users/jbr/code/sibilant/include/macros.sibilant:815:0 */
  
    var names = Array.prototype.slice.call(arguments, 0);
  
    return names.forEach((function(name) {
      /* /Users/jbr/code/sibilant/include/macros.sibilant:816:7 */
    
      return macros.expandQuote.call(this, "47252", { "47255": name });
    }));
  });
  sibilant.macros.namespaces.core["instanceOf__QUERY"] = (function instanceOf__QUERY$(item, type) {
    /* instance-of? /Users/jbr/code/sibilant/include/macros.sibilant:825:0 */
  
    return [ "(", transpile(item), " instanceof ", transpile(type), ")" ];
  });
  sibilant.macros.namespaces.core["includes__QUERY"] = (function includes__QUERY$(haystack, needle) {
    /* includes? /Users/jbr/code/sibilant/include/macros.sibilant:835:0 */
  
    return macros.expandQuote.call(this, "47447", {
      "47450": haystack,
      "47457": needle
    });
  });
  sibilant.macros.namespaces.core["excludes__QUERY"] = (function excludes__QUERY$(haystack, needle) {
    /* excludes? /Users/jbr/code/sibilant/include/macros.sibilant:847:0 */
  
    return macros.expandQuote.call(this, "47539", {
      "47542": haystack,
      "47549": needle
    });
  });
  sibilant.macros.namespaces.core["exists__QUERY"] = (function exists__QUERY$(thing) {
    /* exists? /Users/jbr/code/sibilant/include/macros.sibilant:857:0 */
  
    return macros.expandQuote.call(this, "47604", {
      "47610": thing,
      "47617": thing
    });
  });
  sibilant.macros.namespaces.core.withState = (function withState$(k, v, body) {
    /* with-state /Users/jbr/code/sibilant/include/macros.sibilant:864:0 */
  
    var body = Array.prototype.slice.call(arguments, 2);
  
    var before = sibilant.macros.namespaces.core.state(k);
    sibilant.macros.namespaces.core.state(k, v);
    var returnValue = interleave("\n", map(body, transpile));
    sibilant.macros.namespaces.core.state(k, before);
    return returnValue;
  });
  sibilant.macros.namespaces.core.join = (function join$(arr, glue) {
    /* join /Users/jbr/code/sibilant/include/macros.sibilant:885:0 */
  
    (function() {
      if ((typeof glue !== "undefined" && typeof arr === "undefined")) {
        arr = glue;
        return glue = undefined;
      }
    }).call(this);
    return macros.expandQuote.call(this, "47891", {
      "47895": arr,
      "47898": (glue || "\"\"")
    });
  });
  sibilant.macros.namespaces.core.var = (function var$(pairs) {
    /* var /Users/jbr/code/sibilant/include/macros.sibilant:899:0 */
  
    var pairs = Array.prototype.slice.call(arguments, 0);
  
    var destructured = [];
    bulkMap(pairs, (function(lhs, rhs) {
      /* /Users/jbr/code/sibilant/include/macros.sibilant:901:23 */
    
      return (function() {
        switch(lhs.type) {
        case "bracket":
          var symbol = sibilant.macros.namespaces.core.symbol();
          destructured.push([ symbol, transpile(rhs) ]);
          lhs.contents.forEach((function(item, index) {
            /* /Users/jbr/code/sibilant/include/macros.sibilant:906:34 */
          
            return destructured.push([ transpile(item), macros.expandQuote.call(this, "48373", {
              "48376": symbol,
              "48379": index
            }) ]);
          }));
          return destructured.push([ symbol, "undefined" ]);
        
        case "brace":
          var symbol = sibilant.macros.namespaces.core.symbol();
          destructured.push([ symbol, transpile(rhs) ]);
          lhs.contents.forEach((function(item, index) {
            /* /Users/jbr/code/sibilant/include/macros.sibilant:912:34 */
          
            var trItem = transpile(item);
            return destructured.push([ trItem, macros.expandQuote.call(this, "48706", {
              "48709": symbol,
              "48712": [ "\"", trItem, "\"" ]
            }) ]);
          }));
          return destructured.push([ symbol, "undefined" ]);
        
        default:
          return destructured.push([ transpile(lhs), (function() {
            if (rhs) {
              return transpile(rhs);
            } else {
              return "undefined";
            }
          }).call(this) ]);
        }
      }).call(this);
    }));
    return asStatement([ "var ", interleave(",\n    ", map(destructured, (function(pair) {
      /* /Users/jbr/code/sibilant/include/macros.sibilant:924:16 */
    
      return [ pair[0], " = ", pair[1] ];
    }))) ]);
  });
  sibilant.macros.namespaces.core.default = (function default$(pairs) {
    /* default /Users/jbr/code/sibilant/include/macros.sibilant:931:0 */
  
    var pairs = Array.prototype.slice.call(arguments, 0);
  
    return interleave("\n", bulkMap(pairs, (function(name, value) {
      /* /Users/jbr/code/sibilant/include/macros.sibilant:932:40 */
    
      return macros.expandQuote.call(this, "49149", {
        "49152": name,
        "49161": name,
        "49165": name,
        "49168": value
      });
    })));
  });
  sibilant.macros.namespaces.core.importNamespace = (function importNamespace$(namespace) {
    /* import-namespace /Users/jbr/code/sibilant/include/macros.sibilant:936:0 */
  
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
    /* namespace /Users/jbr/code/sibilant/include/macros.sibilant:944:0 */
  
    macros.expandQuote.call(this, "49296", { "49299": namespace });
    sibilant.macros.namespace = sibilant.macros.namespaces[outputFormatter(transpile(namespace))];
    return undefined;
  });
  sibilant.macros.namespaces.core["hasKey__QUERY"] = (function hasKey__QUERY$(object, key) {
    /* has-key? /Users/jbr/code/sibilant/include/macros.sibilant:957:0 */
  
    return macros.expandQuote.call(this, "49394", {
      "49398": object,
      "49401": key
    });
  });
  sibilant.macros.namespaces.core.get = (function get$(obj, keys) {
    /* get /Users/jbr/code/sibilant/include/macros.sibilant:978:0 */
  
    var keys = Array.prototype.slice.call(arguments, 1);
  
    return [ transpile(obj), map(keys, (function(key) {
      /* /Users/jbr/code/sibilant/include/macros.sibilant:980:19 */
    
      var transpiled = transpile(key),
          output = outputFormatter(transpiled);
      return (function() {
        if (output.match((new RegExp("^\"[a-zA-Z0-9]+\"$", undefined)))) {
          return [ ".", output.replace((new RegExp("\"", "g")), "") ];
        } else {
          return [ "[", transpiled, "]" ];
        }
      }).call(this);
    })) ];
  });
  sibilant.macros.namespaces.core.set = (function set$(arr, kvPairs) {
    /* set /Users/jbr/code/sibilant/include/macros.sibilant:1006:0 */
  
    var kvPairs = Array.prototype.slice.call(arguments, 1);
  
    return interleave("\n", bulkMap(kvPairs, (function(k, v) {
      /* /Users/jbr/code/sibilant/include/macros.sibilant:1007:43 */
    
      return macros.expandQuote.call(this, "50021", {
        "50027": arr,
        "50030": k,
        "50034": v
      });
    })));
  });
  sibilant.macros.namespaces.core["lowerCase__QUERY"] = (function lowerCase__QUERY$(str) {
    /* lower-case? /Users/jbr/code/sibilant/include/macros.sibilant:1011:0 */
  
    return macros.expandQuote.call(this, "50080", {
      "50087": str,
      "50091": str
    });
  });
  sibilant.macros.namespaces.core["upperCase__QUERY"] = (function upperCase__QUERY$(str) {
    /* upper-case? /Users/jbr/code/sibilant/include/macros.sibilant:1018:0 */
  
    return macros.expandQuote.call(this, "50136", {
      "50143": str,
      "50147": str
    });
  });
  
  var package = {
    name: "sibilant",
    version: "0.3.6",
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
      colors: ">=1.1.2",
      cardinal: ">=0.6.0"
    },
    dependencies: {
      "source-map": ">=0.5.3",
      "source-map-support": ">=0.3.3"
    },
    scripts: { test: "bin/sibilant -x stool.sibilant -- test" }
  };
  sibilant.packageInfo = (function sibilant$packageInfo$() {
    /* sibilant.package-info /Users/jbr/code/sibilant/src/browser.sibilant:38:3 */
  
    return package;
  });
  sibilant.versionString = (function sibilant$versionString$() {
    /* sibilant.version-string /Users/jbr/code/sibilant/src/browser.sibilant:40:3 */
  
    return (package.name + " browser version " + package.version);
  });
  sibilant.dir = "browser";
  return $((function() {
    /* /Users/jbr/code/sibilant/src/browser.sibilant:45:6 */
  
    var sibilant = root.sibilant,
        scripts = $.makeArray($("script[type=\"application/sibilant\"][src]").map((function() {
      /* /Users/jbr/code/sibilant/src/browser.sibilant:48:42 */
    
      return this.src;
    })));
    sibilant.initialize = (function sibilant$initialize$() {
      /* sibilant.initialize /Users/jbr/code/sibilant/src/browser.sibilant:50:7 */
    
      return false;
    });
    var evalCode = (function evalCode$(js) {
      /* eval-code /Users/jbr/code/sibilant/src/browser.sibilant:52:7 */
    
      return (new Function(js))();
    });
    sibilant.include = (function sibilant$include$(url) {
      /* sibilant.include /Users/jbr/code/sibilant/src/browser.sibilant:55:7 */
    
      return $.get(url).done((function() {
        /* /Users/jbr/code/sibilant/src/browser.sibilant:56:29 */
      
        return evalCode(sibilize(arguments[0]));
      }));
    });
    return map(scripts, sibilant.include);
  }));
})(this);