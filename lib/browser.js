//# sourceMappingURL=../maps/browser.map
;
this.sibilant = (function() {
  /* /Users/jbr/code/sibilant/src/browser.sibilant:4:5 */

  var sibilant = {  },
      exports = sibilant;
  var error = (function error$(str) {
    /* error /Users/jbr/code/sibilant/src/browser.sibilant:6:6 */
  
    throw str
  });
  var inspect = (function inspect$(item) {
    /* inspect /Users/jbr/code/sibilant/src/browser.sibilant:7:6 */
  
    return (function() {
      if (item.toSource) {
        return item.toSource();
      } else {
        return item.toString();
      }
    }).call(this);
  });
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
          /* /Users/jbr/code/sibilant/include/macros.sibilant:668:30 */
        
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
    /* sibilant.pretty-print.default /Users/jbr/code/sibilant/src/pretty-printer.sibilant:23:0 */
  
    return realNewlines(sibilant.prettyPrint.colorize(node, color, ((function() {
      if ((!(entry) && node.precedingIgnored && node.precedingIgnored.length)) {
        return map(node.precedingIgnored, (function() {
          /* /Users/jbr/code/sibilant/include/macros.sibilant:668:30 */
        
          return prettify(arguments[0], color, false);
        })).join("");
      } else {
        return "";
      }
    }).call(this) + (function() {
      if ((node.modifiers && node.modifiers.length)) {
        return map(node.modifiers, (function() {
          /* /Users/jbr/code/sibilant/include/macros.sibilant:668:30 */
        
          return prettify(arguments[0], color, false);
        })).join("");
      } else {
        return "";
      }
    }).call(this) + node.token + (function() {
      if ((node.contents && node.contents.length)) {
        return map(node.contents, (function() {
          /* /Users/jbr/code/sibilant/include/macros.sibilant:668:30 */
        
          return prettify(arguments[0], color, false);
        })).join("");
      } else {
        return "";
      }
    }).call(this) + (function() {
      if ((node.closingIgnored && node.closingIgnored.length)) {
        return map(node.closingIgnored, (function() {
          /* /Users/jbr/code/sibilant/include/macros.sibilant:668:30 */
        
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
      /* /Users/jbr/code/sibilant/include/macros.sibilant:668:30 */
    
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
        throw (new Error(("unclosed node: " + prettify(context.parseStack[0], false))))
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
    first.closingIgnored = context.ignoredTokens;
    context.ignoredTokens = [];
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
  var docs = sibilant.docs = {
    definitions: [],
    undocumented: {  }
  };
  docs.record = (function docs$record$(type, namespace, name, node) {
    /* docs.record /Users/jbr/code/sibilant/src/docs.sibilant:4:0 */
  
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
    /* docs.tags /Users/jbr/code/sibilant/src/docs.sibilant:16:0 */
  
    var tags = flatten(pluck(docs.definitions, "tags")),
        counts = {  };
    tags.forEach((function(tag) {
      /* /Users/jbr/code/sibilant/src/docs.sibilant:19:5 */
    
      return counts[tag] = ((counts[tag] || 0) + 1);
    }));
    return counts;
  });
  docs.text = (function docs$text$() {
    /* docs.text /Users/jbr/code/sibilant/src/docs.sibilant:25:0 */
  
    return docs.definitions.map((function(definition) {
      /* /Users/jbr/code/sibilant/src/docs.sibilant:27:15 */
    
      return ("name: " + definition.type + " " + definition.namespace + "/" + prettify(definition.name) + "\n" + "description: " + definition.docString + "\n" + (function() {
        if (definition.references) {
          return ("references:\n  " + (definition.references.map((function() {
            /* /Users/jbr/code/sibilant/include/macros.sibilant:668:30 */
          
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
        /* /Users/jbr/code/sibilant/src/docs.sibilant:45:43 */
      
        return (prettify(arguments[0], true) + "\n" + outputFormatter(transpile(arguments[0])));
      })).join("\n\n") + "\n\n");
    })).join("");
  });
  docs.json = (function docs$json$() {
    /* docs.json /Users/jbr/code/sibilant/src/docs.sibilant:52:0 */
  
    return JSON.stringify(docs.data());
  });
  docs.data = (function docs$data$() {
    /* docs.data /Users/jbr/code/sibilant/src/docs.sibilant:55:0 */
  
    return docs.definitions.map((function(definition) {
      /* /Users/jbr/code/sibilant/src/docs.sibilant:57:6 */
    
      return {
        name: prettify(definition.name, false),
        namespace: definition.namespace,
        type: definition.type,
        description: definition.docString,
        references: (function() {
          if (definition.references) {
            return definition.references.map((function() {
              /* /Users/jbr/code/sibilant/include/macros.sibilant:668:30 */
            
              return arguments[0].token.slice(1, -1);
            }));
          } else {
            return [];
          }
        }).call(this),
        arguments: definition.definition.contents[2].contents.map((function() {
          /* /Users/jbr/code/sibilant/include/macros.sibilant:668:30 */
        
          return prettify(arguments[0], false);
        })),
        definition: prettify(definition.definition, false),
        examples: (definition.examples || []).map((function() {
          /* /Users/jbr/code/sibilant/src/docs.sibilant:71:30 */
        
          return {
            javascript: outputFormatter(transpile(arguments[0])),
            sibilant: prettify(arguments[0], false)
          };
        })),
        tags: definition.tags
      };
    }));
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
    /* sibilant.macros.namespaces.core.docs /Users/jbr/code/sibilant/src/core.sibilant:236:0 */
  
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
      /* /Users/jbr/code/sibilant/src/core.sibilant:247:23 */
    
      return optionsHash[outputFormatter(transpile(key))] = value;
    }));
    [ "examples", "references" ].forEach((function(listAttribute) {
      /* /Users/jbr/code/sibilant/src/core.sibilant:250:5 */
    
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
  var docs = sibilant.docs = {
    definitions: [],
    undocumented: {  }
  };
  docs.record = (function docs$record$(type, namespace, name, node) {
    /* docs.record /Users/jbr/code/sibilant/src/docs.sibilant:4:0 */
  
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
    /* docs.tags /Users/jbr/code/sibilant/src/docs.sibilant:16:0 */
  
    var tags = flatten(pluck(docs.definitions, "tags")),
        counts = {  };
    tags.forEach((function(tag) {
      /* /Users/jbr/code/sibilant/src/docs.sibilant:19:5 */
    
      return counts[tag] = ((counts[tag] || 0) + 1);
    }));
    return counts;
  });
  docs.text = (function docs$text$() {
    /* docs.text /Users/jbr/code/sibilant/src/docs.sibilant:25:0 */
  
    return docs.definitions.map((function(definition) {
      /* /Users/jbr/code/sibilant/src/docs.sibilant:27:15 */
    
      return ("name: " + definition.type + " " + definition.namespace + "/" + prettify(definition.name) + "\n" + "description: " + definition.docString + "\n" + (function() {
        if (definition.references) {
          return ("references:\n  " + (definition.references.map((function() {
            /* /Users/jbr/code/sibilant/include/macros.sibilant:668:30 */
          
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
        /* /Users/jbr/code/sibilant/src/docs.sibilant:45:43 */
      
        return (prettify(arguments[0], true) + "\n" + outputFormatter(transpile(arguments[0])));
      })).join("\n\n") + "\n\n");
    })).join("");
  });
  docs.json = (function docs$json$() {
    /* docs.json /Users/jbr/code/sibilant/src/docs.sibilant:52:0 */
  
    return JSON.stringify(docs.data());
  });
  docs.data = (function docs$data$() {
    /* docs.data /Users/jbr/code/sibilant/src/docs.sibilant:55:0 */
  
    return docs.definitions.map((function(definition) {
      /* /Users/jbr/code/sibilant/src/docs.sibilant:57:6 */
    
      return {
        name: prettify(definition.name, false),
        namespace: definition.namespace,
        type: definition.type,
        description: definition.docString,
        references: (function() {
          if (definition.references) {
            return definition.references.map((function() {
              /* /Users/jbr/code/sibilant/include/macros.sibilant:668:30 */
            
              return arguments[0].token.slice(1, -1);
            }));
          } else {
            return [];
          }
        }).call(this),
        arguments: definition.definition.contents[2].contents.map((function() {
          /* /Users/jbr/code/sibilant/include/macros.sibilant:668:30 */
        
          return prettify(arguments[0], false);
        })),
        definition: prettify(definition.definition, false),
        examples: (definition.examples || []).map((function() {
          /* /Users/jbr/code/sibilant/src/docs.sibilant:71:30 */
        
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
  var package = {
    name: "sibilant",
    version: "0.3.7",
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
    /* sibilant.package-info /Users/jbr/code/sibilant/src/browser.sibilant:25:6 */
  
    return package;
  });
  sibilant.versionString = (function sibilant$versionString$() {
    /* sibilant.version-string /Users/jbr/code/sibilant/src/browser.sibilant:27:6 */
  
    return (package.name + " browser version " + package.version);
  });
  sibilant.dir = "browser";
  sibilant.initialize = (function sibilant$initialize$() {
    /* sibilant.initialize /Users/jbr/code/sibilant/src/browser.sibilant:32:6 */
  
    return false;
  });
  var evalCode = (function evalCode$(js) {
    /* eval-code /Users/jbr/code/sibilant/src/browser.sibilant:34:6 */
  
    return (new Function(js))();
  });
  sibilant.include = (function sibilant$include$(url) {
    /* sibilant.include /Users/jbr/code/sibilant/src/browser.sibilant:37:6 */
  
    return $.get(url).done((function() {
      /* /Users/jbr/code/sibilant/include/macros.sibilant:668:30 */
    
      return evalCode(sibilize(arguments[0]));
    }));
  });
  sibilant.sibilize("(namespace core)\n" +
  "\n" +
  "(docs \"the simplest way to conditionally execute code.\"\n" +
  "      tags [ conditional flow-control ]\n" +
  "      example (ternary (< 50 100)\n" +
  "         \"fifty is less than 100\"\n" +
  "         \"fifty is more than 100\"))\n" +
  "\n" +
  "(macro ternary (cond if-true if-false)\n" +
  "       [\"(\" (transpile cond) \") ? \"\n" +
  "            (transpile if-true) \" : \"\n" +
  "            (transpile if-false)])\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  ";; nodoc\n" +
  "(macro set (arr ...kv-pairs)\n" +
  "       (interleave \"\\n\" (bulk-map kv-pairs\n" +
  "                                  (#(k v)\n" +
  "                                    (as-statement [\"(\" (transpile arr) \")\"\n" +
  "                                                    \"[\" (transpile k) \"] = \" (transpile v) ])))))\n" +
  ";; nodoc\n" +
  "(macro var (...pairs)\n" +
  "       (as-statement\n" +
  "        [\"var \"\n" +
  "         (interleave \",\\n    \"\n" +
  "               (bulk-map pairs\n" +
  "                         (#(name value)\n" +
  "                           [ (transpile name) \" = \" (transpile value) ])))\n" +
  "         ]))\n" +
  "\n" +
  ";; nodoc\n" +
  "(macro get (obj ...keys)\n" +
  "       [\"(\" (transpile obj) \")\" (map keys (#(key)\n" +
  "                                            [\"[\" (transpile key) \"]\"]))])\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "(docs \"stores a duplicate copy of `current-macro-name` as\n" +
  "`new-macro-name` in current namespace.  No output.\"\n" +
  "      tags [macros])\n" +
  "\n" +
  "(macro alias-macro (current-macro-name new-macro-name)\n" +
  "       (var current-macro-name (output-formatter (transpile current-macro-name))\n" +
  "            new-macro-name (output-formatter (transpile new-macro-name)))\n" +
  "       (set sibilant.macros.namespace\n" +
  "            new-macro-name (get sibilant.macros.namespace current-macro-name))\n" +
  "       null)\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "(docs \"calls the `method` on `object` as a function with `args` as the arguments\"\n" +
  "      tags [ functions ]\n" +
  "      example (send object method first-argument second-argument third-argument))\n" +
  "\n" +
  "(macro send (object method ...args)\n" +
  "       [(transpile object) \".\" (transpile method)\n" +
  "               \"(\" (interleave \", \" (map args transpile)) \")\"])\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "(docs \"calls the function `fn` with arguments passed as an array in `arglist`\"\n" +
  "      tags [functions]\n" +
  "      example (apply my-function [ first-arg second-arg third-arg ]))\n" +
  "\n" +
  "(macro apply (fn arglist)\n" +
  "       '(.apply @fn this @arglist))\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "(docs \"builds an array with `first` as the zeroth index and the\n" +
  "elements provided by array `rest` as the subsequent elements, as\n" +
  "siblings with `first`.\"\n" +
  "      tags [arrays collections deprecated]\n" +
  "      example (cons 1 [ 2 3 4 ]))\n" +
  "\n" +
  "(macro cons (first rest)\n" +
  "       [\"[ \" (transpile first) \" ].concat(\" (transpile rest) \")\"])\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "(docs \"adds `additional` elements onto the right-side (tail) of `list`. deprecated\"\n" +
  "      tags [ arrays collections deprecated ]\n" +
  "      example (append [ 1 2 3 ] 4 5 6))\n" +
  "(macro append (list ...additional)\n" +
  "       '(.concat @list (list ...@additional)))\n" +
  "\n" +
  "\n" +
  "(docs \"fetches length attribute from `arr`\"\n" +
  "      tags [ arrays collections ]\n" +
  "      example (length [ 1 2 3 ]))\n" +
  "(macro length (arr)\n" +
  "       '(get @arr 'length))\n" +
  "\n" +
  "(docs \"executes the `body` inside of a self-executing function. The\n" +
  "last statement/expression of the body is returned.\"\n" +
  "      tags [functions]\n" +
  "      examples [(scoped true) (scoped (var a 1) (+ a 2))])\n" +
  "(macro scoped (...body)\n" +
  "       '(.call (lambda @{node this args []} ...@body) this))\n" +
  "\n" +
  ";;nodoc\n" +
  "(macro *scoped-without-source (...body)\n" +
  "       [\"(function() {\" (indent '(do ...@body)) \"}).call(this)\"])\n" +
  "\n" +
  "(macro *number-words (...number-words)\n" +
  "       (.for-each number-words (#(word index)\n" +
  "                                 `(docs @(\"fetches the \"(output-formatter (transpile word))\" element from `arr`\")\n" +
  "                                        tags [arrays collections]\n" +
  "                                        example (@word my-array))\n" +
  "                                 `(macro @word (arr) (var index @index) `(get @arr @index)))))\n" +
  "(*number-words first second third fourth fifth sixth seventh eighth ninth)\n" +
  "(delete-macro *number-words)\n" +
  "\n" +
  "\n" +
  "(docs \"fetches all but the first item of `arr`\"\n" +
  "      tags [arrays collections]\n" +
  "      example (rest [ 1 2 3 ]))\n" +
  "(macro rest (arr) '(.slice @arr 1))\n" +
  "\n" +
  "(docs \"fetches just the last element of `arr` by slicing.\"\n" +
  "      tags [arrays collections]\n" +
  "      example (last [ 1 2 3 ]))\n" +
  "(macro last (arr) '(first (.slice @arr -1)))\n" +
  "\n" +
  ";;nodoc\n" +
  "(macro = (a b) [ (transpile a) \" === \" (transpile b) ])\n" +
  "\n" +
  "(docs \"adds `args` using the javascript `+` operator. Since javascript\n" +
  "overloads this for string concatenation, this macro can be used for\n" +
  "this as well.\"\n" +
  "      tags [ strings numbers ]\n" +
  "      examples [ (+ 1 2 3) (+ 'hello 'world) ])\n" +
  "(macro +   (...args)\n" +
  "       [\"(\" (interleave \" + \" (map args transpile)) \")\"])\n" +
  "\n" +
  "\n" +
  "(docs \"subtracts each subsequent element of `args`\"\n" +
  "      tags [numbers]\n" +
  "      examples [ (- 2 1) (- 10 5 1) ])\n" +
  "(macro -   (...args)\n" +
  "       [\"(\" (interleave \" - \" (map args transpile)) \")\"])\n" +
  "\n" +
  "(docs \"multiplies elements of `args`\"\n" +
  "      tags [numbers]\n" +
  "      example (* 3 4 5))\n" +
  "(macro *   (...args)\n" +
  "       [\"(\" (interleave \" * \" (map args transpile)) \")\"])\n" +
  "\n" +
  "(docs \"divides each subsequent element of `args`\"\n" +
  "      tags [numbers]\n" +
  "      examples [ (/ 1 2)\n" +
  "                 (/ 1 2 3) ])\n" +
  "(macro /   (...args)\n" +
  "           [\"(\" (interleave \" / \" (map args transpile)) \")\"])\n" +
  "\n" +
  "\n" +
  "(docs \"short circuiting operator returns the first element of `args` that evaluates to be truthy\"\n" +
  "      tags [ conditional flow-control booleans ]\n" +
  "      example (or (= 1 2) (string? []) \"one is not two and an array is not a string\"))\n" +
  "(macro or  (...args)\n" +
  "       [\"(\" (interleave \" || \" (map args transpile)) \")\"])\n" +
  "\n" +
  "\n" +
  "(docs \"returns the last element if all elements of `args` are truthy, or the\n" +
  "first non-truthy element if it exists\"\n" +
  "      tags [ booleans ]\n" +
  "      example (and (string? \"string\") (number? 10) (= 1 1)))\n" +
  "(macro and (...args)\n" +
  "       (ternary (= 1 (length args)) (transpile (first args))\n" +
  "                [\"(\" (interleave \" && \" (map args transpile)) \")\"]))\n" +
  "\n" +
  "(docs \"modulus operator\"\n" +
  "      tags [numbers]\n" +
  "      example (mod 10 2))\n" +
  "(macro mod (...args)\n" +
  "       [\"(\" (interleave \" % \" (map args transpile)) \")\"])\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "(macro *def-infix (macro-name word js-comparator)\n" +
  "       (var docstring (\"compares `args` from left to right, \"\n" +
  "                       \"returning true if each element is \"\n" +
  "                       (.slice word.token 1 -1)\n" +
  "                       \" than the next\"))\n" +
  "       \n" +
  "       `(docs @docstring\n" +
  "              tags [comparison]\n" +
  "              examples [ (@macro-name a b c) (@macro-name a b) ])\n" +
  "       \n" +
  "       `(macro @macro-name (...args)\n" +
  "               (var js-comparator @(or js-comparator [\"\\\"\" macro-name \"\\\"\"]))\n" +
  "               `(and ...@(map (args.slice 0 -1)\n" +
  "                              (#(item index)\n" +
  "                                [ item \" \" js-comparator \" \"\n" +
  "                                  (get args (+ 1 index)) ])))))\n" +
  "\n" +
  "(*def-infix > \"greater than\")\n" +
  "(*def-infix <  \"less than\")\n" +
  "(*def-infix <= \"less than or equal\")\n" +
  "(*def-infix >= \"greater than or equal\")\n" +
  "(*def-infix != \"not equal (using threequals)\" \"!==\")\n" +
  "(*def-infix = \"equal (using threequals)\" \"===\")\n" +
  "\n" +
  "(delete-macro *def-infix)\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "(docs \"increments `item` by `increment`\"\n" +
  "      tags [numbers]\n" +
  "      example (incr-by n 5))\n" +
  "(macro incr-by (item increment)\n" +
  "       [ (transpile item) \" += \" (transpile increment)])\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "(docs \"increments item by 1\",\n" +
  "      tags [numbers],\n" +
  "      example (incr i))\n" +
  "(macro incr (item)\n" +
  "       [\"((\" (transpile item) \")++)\"])\n" +
  "\n" +
  "\n" +
  "(docs \"decrements item by 1\",\n" +
  "      tags [numbers],\n" +
  "      example (decr i))\n" +
  "(macro decr (item) [\"((\" (transpile item) \")--)\"])\n" +
  "\n" +
  "(docs \"uses the javascript new keyword to construct an object using\n" +
  "      `constructor`, with `args` passed as arguments to the constructor.\"\n" +
  "      tags [functions]\n" +
  "      example (new RegExp \"hello\" 'g))\n" +
  "\n" +
  "(macro new (constructor ...args)\n" +
  "       [\"(new \" '(call @constructor ...@args) \")\"])\n" +
  "\n" +
  "\n" +
  "\n" +
  "(docs \"builds a regex using `pattern` and `flags` as arguments to the RegExp constructor\"\n" +
  "      tags [regex]\n" +
  "      examples [ (regex \"[0-9]+\") (regex \"0x[0-9a-f]+\" 'i)])\n" +
  "(macro regex (pattern flags)\n" +
  "       '(new RegExp @pattern @(or flags 'undefined)))\n" +
  "\n" +
  "\n" +
  "\n" +
  "(docs \"predicate to test for equality with zero\"\n" +
  "      tags [numbers]\n" +
  "      example: (zero? n))\n" +
  "(macro zero? (item) '(= @item 0))\n" +
  "\n" +
  "\n" +
  "(docs \"returns true if the array `arr` has a length of zero\"\n" +
  "      tags [arrays collections]\n" +
  "      example: (empty? []))\n" +
  "(macro empty? (arr)\n" +
  "       `(= 0 (length @arr)))\n" +
  "\n" +
  "\n" +
  "(docs \"returns true if `number` is not divisible by 2\"\n" +
  "      tags [numbers]\n" +
  "      example (odd? 5))\n" +
  "(macro odd? (number)\n" +
  "       '(= 1 (mod @number 2)))\n" +
  "\n" +
  "\n" +
  "(docs \"returns true if `number` is divisible by 2 with no remainder\"\n" +
  "      tags [numbers]\n" +
  "      example (even? 10))\n" +
  "(macro even? (number)\n" +
  "       '(= 0 (mod @number 2)))\n" +
  "\n" +
  "\n" +
  "(docs \"exposes the javascript typeof operator. most often, predicates\n" +
  "such as `string?`, `function?`, `number?`, etc are preferred.\"\n" +
  "      tags [type]\n" +
  "      example: (typeof 5))\n" +
  "(macro typeof (thing) [\"typeof \" (transpile thing)])\n" +
  "\n" +
  "\n" +
  "(docs \"returns true if all of the `things` are javascript strings\"\n" +
  "      tags [strings type]\n" +
  "      examples: [ (string? test-object) (string? 'yes 'yes 'yes) ])\n" +
  "(macro string? (...things)\n" +
  "       '(and ...@(map things (#(thing) '(= (typeof @thing) 'string)))))\n" +
  "\n" +
  "\n" +
  "(docs \"returns true if all of the `things` are functions\"\n" +
  "      tags [functions type]\n" +
  "      examples: [ (function? fn) (function? err cb) ])\n" +
  "(macro function? (...things)\n" +
  "       '(and ...@(map things (#(thing) '(= (typeof @thing) 'function)))))\n" +
  "\n" +
  "\n" +
  "(docs \"returns true if all of the `things` are undefined, as tested\n" +
  "with `typeof`, not equality with literal undefined. This is the\n" +
  "inverse of `defined?`\"\n" +
  "      tags [type]\n" +
  "      examples: [ (undefined? argument)\n" +
  "                  (undefined? 1 2 undefined) ])\n" +
  "(macro undefined? (...things)\n" +
  "       '(and ...@(map things (#(thing) '(= (typeof @thing) 'undefined)))))\n" +
  "\n" +
  "\n" +
  "(docs \"returns true if none of the `things` are undefined, as tested\n" +
  "with `typeof`. This is the inverse of `defined?`\"\n" +
  "      tags [type]\n" +
  "      examples: [ (defined? variable)\n" +
  "                  (defined? var1 var2 var3) ])\n" +
  "(macro defined? (...things)\n" +
  "       '(and ...@(map things (#(thing) '(!= (typeof @thing) 'undefined)))))\n" +
  "\n" +
  "\n" +
  "(docs \"returns true if all of the `things` are numbers, as tested\n" +
  "with `typeof`\"\n" +
  "      tags [numbers type]\n" +
  "      examples: [ (number? 1) (number? 1 2 3) ])\n" +
  "(macro number? (...things)\n" +
  "       '(and ...@(map things (#(thing) '(= (typeof @thing) 'number)))))\n" +
  "\n" +
  "\n" +
  ";;nodoc\n" +
  "(macro if (arg truebody falsebody)\n" +
  "       [\"(function() {\"\n" +
  "        (indent [\"if (\" (transpile arg) \") {\"\n" +
  "                        (indent '(do ...@truebody))\n" +
  "                        \"} else {\"\n" +
  "                        (indent '(do ...@falsebody))\n" +
  "                        \"}\"])\n" +
  "         \"}).call(this)\"])\n" +
  "\n" +
  "\n" +
  "(docs \"inserts the result of each subsequent call in `calls` as the\n" +
  "second argument to the next macro. This is very much akin to clojure's thread-first arrow or elixir's pipe operator\"\n" +
  "      tags [language]\n" +
  "      examples: [\n" +
  "                 (pipe \"a b c d\"\n" +
  "                     .to-upper-case\n" +
  "                     (.replace \"A\" \"X\")\n" +
  "                     (.split \" \")\n" +
  "                     first\n" +
  "                     (concat \" marks the spot\"))\n" +
  "\n" +
  "                  (pipe \"{\\\"a\\\": {\\\"b\\\": [ 1, 2, 3 ]}}\"\n" +
  "                        JSON.parse\n" +
  "                        (get 'a)\n" +
  "                        JSON.stringify)\n" +
  "                  ]\n" +
  "     references: [ \"https://clojuredocs.org/clojure.core/-%3E\"\n" +
  "                   \"http://elixir-lang.org/docs/v1.0/elixir/Kernel.html#|>/2\" ])\n" +
  "(macro pipe (...calls)\n" +
  "       (inject undefined calls\n" +
  "               (#(value item)\n" +
  "                 (if (undefined? value) item\n" +
  "                     (scoped\n" +
  "                      (var cloned (if (node? item 'literal 'dots)\n" +
  "                                      (get `(@item) 'source)\n" +
  "                                      (clone item)))\n" +
  "                     \n" +
  "                      (merge-into cloned\n" +
  "                                  { contents [ (first cloned.contents)\n" +
  "                                               value\n" +
  "                                               ...(rest cloned.contents) ] }))))))\n" +
  "\n" +
  "(alias-macro pipe |>)\n" +
  "\n" +
  "\n" +
  "(docs \"inserts `contents` transpiled to javascript as a comment in the\n" +
  "output file, removing it from execution.\"\n" +
  "      tags [language]\n" +
  "      example (comment (scoped 1)))\n" +
  "(macro comment (...contents)\n" +
  "       (map contents (#(content)\n" +
  "                       [\"// \"(recurse-map (transpile content)\n" +
  "                                    (#(item)\n" +
  "                                      (ternary item\n" +
  "                                               (pipe item transpile output-formatter\n" +
  "                                                     (.replace (regex \"\\n\" 'g) \"\\n// \"))\n" +
  "                                               null)))])))\n" +
  "\n" +
  "\n" +
  ";; (docs \"checks if `first-thing` is equal to all of the `other-things`.\n" +
  ";; Most of the time, there is only one other thing. Javascript threequals\n" +
  ";; is always used.  Please note that if evaluating `first-thing` has\n" +
  ";; side-effects, they will be called `(length other-things)` times.\"\n" +
  ";;       examples [ (= 1 2)\n" +
  ";;                  (= 10 (+ 5 5) (- 15 5)) ])\n" +
  "\n" +
  "\n" +
  "(docs \"returns true if `thing` is an array in javascript. aliased as\n" +
  "`list?`.\"\n" +
  "      tags [type arrays]\n" +
  "      example: (array? arr))\n" +
  "\n" +
  "(macro array? (thing)\n" +
  "       (var transpiled (transpile thing))\n" +
  "       [\"((\" transpiled \") && typeof (\" transpiled \") === \\\"object\\\" && (\"\n" +
  "               transpiled \").constructor.name === \\\"Array\\\")\"])\n" +
  "(alias-macro array? list?)\n" +
  "\n" +
  "\n" +
  "(docs \"evaluates statements in `body` if `condition` is true. `body`\n" +
  "      is `scoped` in a self-evaluating function to support having a\n" +
  "      return value from the if statement.\"\n" +
  "      tags [ conditional flow-control language ]\n" +
  "      example: (when (< 3 i) (console.log i) (get arr i)))\n" +
  "\n" +
  "(macro when (condition ...body)\n" +
  "       [\"(function() {\"\n" +
  "        (indent [\"if (\" (transpile condition) \") {\"\n" +
  "                        (indent '(do ...@body))\n" +
  "                        \"}\"])\n" +
  "        \"}).call(this)\"])\n" +
  "\n" +
  "\n" +
  "\n" +
  "(docs \"boolean negation, as determined by javascript truthiness\"\n" +
  "      tags [booleans]\n" +
  "      example: (not (string? 1))\n" +
  "      references: [ \"https://developer.mozilla.org/en-US/docs/Glossary/Truthy\"\n" +
  "                    \"https://developer.mozilla.org/en-US/docs/Glossary/Falsy\" ])\n" +
  "(macro not (exp)\n" +
  "       [\"!(\" (transpile exp) \")\"])\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "(docs \"evaluates statements in `body` if `condition` is falsy. `body`\n" +
  "      is `scoped` in a self-evaluating function to support having a\n" +
  "      return value from the if statement.\"\n" +
  "      tags [conditional flow-control]\n" +
  "      example: (unless (< 3 i) (console.log i) (get arr i)))\n" +
  "\n" +
  "(macro unless (condition ...body)\n" +
  "       [\"(function() {\"\n" +
  "        (indent [\"if (\" '(not @condition) \") {\"\n" +
  "                        (indent '(do ...@body))\n" +
  "                        \"}\"])\n" +
  "        \"}).call(this)\"])\n" +
  "\n" +
  "(docs \"assigns alternating keys and values in `args`.  This works much\n" +
  "like `var`, but without the var keyword.  It is important to\n" +
  "understand variable scope in javascript in order to use this macro safely.\n" +
  "note that this macro does not currently support destructuring like `var` does\"\n" +
  "      tags [language variables]\n" +
  "      examples [ (assign a 1) (assign a 1 b 2) ])\n" +
  "\n" +
  "(macro assign (...args)\n" +
  "       (interleave \"\\n\"\n" +
  "             (bulk-map args (#(name value)\n" +
  "                              (as-statement [ (transpile name) \" = \"\n" +
  "                                                    (transpile value)])))))\n" +
  "\n" +
  "\n" +
  "\n" +
  "(docs \"outputs debug information about `arg`.  If `label` is\n" +
  "omitted (only one argument is provided), the name of the variable or\n" +
  "expression of that first expression will be logged. Aliased as `pretty-log`\"\n" +
  "      tags [language]\n" +
  "      examples: [ (log-pretty 'my-label value)\n" +
  "                  (log-pretty (+ 1 2)) ])\n" +
  "(macro log-pretty (label arg)\n" +
  "       (var node this)\n" +
  "       (when (undefined? arg)\n" +
  "             (assign arg label\n" +
  "                     label [\"\\\"\" (prettify label false) \"\\\"\"]))\n" +
  "       `(console.log (concat @[\"\\\"\" node.file \":\" node.line \"\\\"\"] \" \" @label \" = \" (prettify @arg))))\n" +
  "(alias-macro log-pretty pretty-log)\n" +
  "\n" +
  "(docs \"iterates over `array`, evaluating `body` once for each value in\n" +
  "`array`.  If `item` is a literal name, that will be the variable into\n" +
  "which the `array` element is yielded (current value).  If `item` is an expression, it\n" +
  "can contain the current value, the index, and the `array`.\"\n" +
  "      tags [ arrays language collections ]\n" +
  "      references [\"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach\"]\n" +
  "      examples [ (each number [ 1 2 3 ] (console.log number))\n" +
  "                 (each (letter index) `[ a b c d ]\n" +
  "                       (set letters letter index)\n" +
  "                       (pipe letter (.to-upper-case) (console.log))) ])\n" +
  "                \n" +
  "(macro each (item array ...body)\n" +
  "       '(.for-each @array\n" +
  "                   (lambda @{ node this\n" +
  "                              args (if (node? item 'expression) item [item]) }\n" +
  "                           ...@body)))\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  ";;nodoc\n" +
  ";;deprecated\n" +
  "(macro macro-expand (name)\n" +
  "       (var macro (get macros (output-formatter (transpile name))))\n" +
  "       (if macro\n" +
  "           (macro.to-string)\n" +
  "           \"undefined\"))\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "(docs \"throws a new javascript error with arguments as the string\"\n" +
  "      tags [language]\n" +
  "      example (throw (new Error \"could not find matching socks\")))\n" +
  "\n" +
  "(macro throw (error)\n" +
  "       [\"throw \" (transpile error)])\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "(docs \"double-negates `expr`, converting it to a boolean\"\n" +
  "      tags [type booleans]\n" +
  "      examples: [ (as-boolean 0)\n" +
  "                  (as-boolean true) ])\n" +
  "(macro as-boolean (expr)\n" +
  "       [\"(!!(\" (transpile expr) \"))\"])\n" +
  "\n" +
  "\n" +
  ";;nodoc because this needs attention\n" +
  ";;todo\n" +
  "(macro try (tryblock catchblock)\n" +
  "       [\"(function() {\"\n" +
  "        (indent [\"try {\"\n" +
  "                 (indent '(do @tryblock))\n" +
  "                 \"} catch (e) {\"\n" +
  "                 (indent '(do @catchblock))\n" +
  "                 \"}\"])\n" +
  "         \"}).call(this)\"])\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  ";; (docs \"sets or gets sibilant state. If one arg is provided, this macro\n" +
  ";; gets the value.  If more than two args are provided, sibilant state is\n" +
  ";; set in pairs.  deprecated. internal.\")\n" +
  "\n" +
  "(macro state (...pairs)\n" +
  "       (if (= 1 (length pairs))\n" +
  "           (get sibilant.state (output-formatter (transpile (first pairs))))\n" +
  "           (do (bulk-map pairs (#(k v) (set sibilant.state (output-formatter (transpile k)) (eval (output-formatter (transpile v))))))\n" +
  "               null)))\n" +
  "\n" +
  "\n" +
  ";;nodoc\n" +
  ";;internal\n" +
  "(macro symbol ()\n" +
  "       (var symbol-count (or (get sibilant.state 'symbol-count) 0)\n" +
  "            new-symbol-count (+ 1 symbol-count))\n" +
  "       (^state 'symbol-count new-symbol-count)\n" +
  "       [\"$_symbol\" new-symbol-count \"_$\"])\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "(docs \"evaluates the `body` as long as `condition` is truthy,\n" +
  "returning the value of the last expression in `block` when `condition`\n" +
  "ceases to be truthy. See also `until`\"\n" +
  "      tags [loops flow-control]\n" +
  "      example: (while (> 5 i) (console.log i) (decr i)))\n" +
  "(macro while (condition ...body)\n" +
  "       (var symbol (^symbol))\n" +
  "       '(*scoped-without-source\n" +
  "         (var @symbol)\n" +
  "         @[\"while (\" (transpile condition) \") {\"\n" +
  "           (indent '(assign @symbol (*scoped-without-source ...@body)))\n" +
  "            \"}\"]\n" +
  "         @symbol))\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "(docs \"evaluates the `body` as long as `condition` is falsy,\n" +
  "returning the value of the last expression in `block` when `condition`\n" +
  "ceases to be falsy. See also `while`\"\n" +
  "      tags [loops flow-control]\n" +
  "      example: (until (< 5 i) (console.log i) (incr i)))\n" +
  "\n" +
  "(macro until (condition ...body)\n" +
  "       '(while (not @condition) ...@body))\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "(docs \"returns true if the `string` matches `regexp`.  Deprecated in\n" +
  "      preference to `.match` (`send` dot-invocation).\"\n" +
  "      tags [regex strings]\n" +
  "      example: (match? (regex \"^[a-z]+$\" 'i) 'word))\n" +
  "(macro match? (regexp string)\n" +
  "       '(.match @string @regexp))\n" +
  "\n" +
  "(docs \"similar to `match?` but builds a regex out of the `pattern` and `flags`.\"\n" +
  "      tags [regex strings]\n" +
  "      example (match-regex? 'word \"^[a-z]+$\" 'i))\n" +
  "(macro match-regex? (string pattern flags)\n" +
  "       '(match? (regex @pattern @flags) @string))\n" +
  "\n" +
  "\n" +
  "(docs \"replaces the first occurance of `pattern` (as a regex) with `replacement`\"\n" +
  "      tags [regex strings]\n" +
  "      example: (replace \"hello world\" \"l+o\" \"y there,\"))\n" +
  "(macro replace (string pattern replacement)\n" +
  "       '(.replace @string\n" +
  "              (regex @pattern)\n" +
  "              @replacement))\n" +
  "\n" +
  "(docs \"replaces all occurrances of `pattern` (as a regex) with `replacement`\"\n" +
  "      tags [regex strings]\n" +
  "      example: (replace-all \"503-555-1212\" \"[0-9]\" \"#\"))\n" +
  "(macro replace-all (string pattern replacement)\n" +
  "       '(.replace @string (regex @pattern 'g) @replacement))\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "(docs \"most often called as its alias, `#>`, thunk creates a function\n" +
  "with no named arguments. To refer to arguments anonymously, use #n,\n" +
  "such as #0 for the first argument.\"\n" +
  "      tags [functions language]\n" +
  "      examples: [ (.map [ 1 2 3 ] (#> (+ 1 #0)))\n" +
  "                  (window.set-timeout (#> (console.log 'here)) 10) ])\n" +
  "(macro thunk (...body)\n" +
  "       '(lambda @{ node this args [] }\n" +
  "       ...@(map-node body\n" +
  "                 (#(node)\n" +
  "                   (if (node? node 'arg-placeholder)\n" +
  "                       '(argument @(replace node.token \"^#\" \"\"))\n" +
  "                       node)))))\n" +
  "(alias-macro thunk #>)\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "(docs \"most often called as its alias, `#->`, pipe-thunk applies a pipe chain to the argument of a function and returns the result\"\n" +
  "      tags [functions language]\n" +
  "      examples [ (.map `[ a b c ] (#-> (.to-upper-case) (concat \" is a letter\"))) ])\n" +
  "(macro pipe-thunk (...calls) `(thunk (pipe #0 ...@calls)))\n" +
  "(alias-macro pipe-thunk #->)\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "(docs \"returns the property names of `obj`.\"\n" +
  "      tags [objects collections]\n" +
  "      references: [ \"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys\" ]\n" +
  "      example (keys { a 1 b 2 }))\n" +
  "(macro keys (obj)\n" +
  "       '(Object.keys @obj))\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "(docs \"uses the javascript delete keyword on any number of `objects`.\n" +
  "      Use in conjunction with `get` or dotted literal notation (a.b).\"\n" +
  "      tags [objects collections]\n" +
  "      examples [ (delete object.a object.b)\n" +
  "                 (delete (get object attribute) (get object \"other attribute\")) ])\n" +
  "(macro delete (...objects)\n" +
  "       (interleave \"\\n\" (map objects (#(obj)\n" +
  "                                 (as-statement [\"delete \" (transpile obj)])))))\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "(docs \"deletes each macro name in `macro-names` from the current namespace. Use carefully\"\n" +
  "      tags [macros language])\n" +
  "(macro delete-macro (...macro-names)\n" +
  "       (each macro-name macro-names\n" +
  "             (delete (get sibilant.macros.namespace (output-formatter (transpile macro-name)))))\n" +
  "       null)\n" +
  "(alias-macro delete-macro delmacro)\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "(docs \"moves macro from `current-macro-name` to `new-macro-name`. Use carefully\"\n" +
  "      tags [macros language])\n" +
  "(macro rename-macro (current-macro-name new-macro-name)\n" +
  "       (^alias-macro current-macro-name new-macro-name)\n" +
  "       (^delete-macro current-macro-name)\n" +
  "       null)\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "(docs \"transforms function arguments into an array, using the Array prototype's slice\"\n" +
  "      tags [functions]\n" +
  "      example (arguments))\n" +
  "(macro arguments ()\n" +
  "       [\"(Array.prototype.slice.apply(arguments))\"])\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "(docs \"`get`s the argument at `index` in the current function context. Inside of a `thunk` (`#>`), this can be abbreviated with `#n`, where `n` is the argument index.\"\n" +
  "      tags [functions]\n" +
  "      example (argument 3))\n" +
  "(macro argument (index)\n" +
  "       '(get arguments @index))\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "(docs \"iterates over each attribute in `obj`\"\n" +
  "      tags [objects collections]\n" +
  "      example (each-key key { a 1 b 2 } (console.log key)))\n" +
  "(macro each-key (as obj ...body)\n" +
  "       `(pipe @obj (keys)\n" +
  "              (.for-each (lambda @{ args: (if (node? as 'expression) as [as])\n" +
  "                                    node: this }\n" +
  "                                 ...@body))))\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "(docs \"uses the javascript switch construction to test equality.  documentation todo: needs better description\"\n" +
  "      tags [flow-control conditional deprecated]\n" +
  "      examples: [\n" +
  "                 (switch char\n" +
  "                         ('a \"it was an a\")\n" +
  "                         ('b (console.log \"found a b!\")\n" +
  "                             \"it was a b\")\n" +
  "                         ([1 2 3 4 5] \"it was an integer from one to five\")\n" +
  "                         (default \"not sure\"))\n" +
  "                 ])\n" +
  "\n" +
  "(macro switch (obj ...cases)\n" +
  "       [\"(function() {\"\n" +
  "         (indent [\"switch(\" (transpile obj) \") {\"\n" +
  "                   (map cases (#(case-def)\n" +
  "                                (var case-name-node (first case-def.contents)\n" +
  "                                     case-labels (if (node? case-name-node 'expression 'bracket)\n" +
  "                                                     case-name-node.contents\n" +
  "                                                     [case-name-node])\n" +
  "                                     case-string (interleave \"\\n\"\n" +
  "                                                             (map case-labels (#(c)\n" +
  "                                                                                (if (= 'default c.token)\n" +
  "                                                                                    \"default:\"\n" +
  "                                                                                    [\"case \" (transpile c) \":\"])))))\n" +
  "                                [\"\\n\" case-string (indent '(do ...@(rest case-def.contents)))]))\n" +
  "                   \"}\"])\n" +
  "         \"}).call(this)\"])\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "(docs \"tests any number of `alternating-conditions-and-branches`.  If\n" +
  "      an odd number of branches are supplied, the final branch is a\n" +
  "      default else clause.  To evaluate more than one expression as a\n" +
  "      branch, use the `do` macro, as shown in the examples:\"\n" +
  "      tags [conditional flow-control]\n" +
  "      examples [ (if true (console.log 'here))\n" +
  "                 (if (= 1 arguments.length) (console.log \"one argument\")\n" +
  "                     (= 'blue favorite-color) (console.log \"blue\")\n" +
  "                     (assign examples 'difficult))\n" +
  "                 (if (foo?) (do (a b)\n" +
  "                                (c))\n" +
  "                     (bar?) (do (baz)\n" +
  "                                (wibble))\n" +
  "                     (do (d e)\n" +
  "                         (console.log 'default))) ])\n" +
  "\n" +
  "\n" +
  "\n" +
  "(macro if (...alternating-conditions-and-branches)\n" +
  "       [\"(function() {\"\n" +
  "        (indent\n" +
  "         (interleave \" else \"\n" +
  "               (bulk-map alternating-conditions-and-branches\n" +
  "                         (#(cond val)\n" +
  "                           (if (!= (typeof val) 'undefined)\n" +
  "                                 [\"if (\" (transpile cond) \") {\"\n" +
  "                                   (indent '(do @val))\n" +
  "                                   \"}\"]\n" +
  "                                 [\"{\" (indent '(do @cond)) \"}\"])))))\n" +
  "        \"}).call(this)\"])\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "(docs \"similar to `pipe`, this macro allows function calls to be applied\n" +
  "in sequence, as is common in fluent interfaces. deprecated in preference to `pipe`\"\n" +
  "      tags [deprecated language]\n" +
  "      example (chain a (b c d) (e) (f g)))\n" +
  "      \n" +
  "\n" +
  "(macro chain (object ...calls)\n" +
  "       (if (= 0 calls.length) (transpile object)\n" +
  "           (= 1 calls.length) '(send @object ...@(get (first calls) 'contents))\n" +
  "           (do\n" +
  "            (var lines (map calls (#(call index)\n" +
  "                                    [\".\" (transpile (first call.contents))\n" +
  "                                         \"(\" (interleave \", \" (map (rest call.contents) transpile)) \")\"])))\n" +
  "\n" +
  "            [ (transpile object)\n" +
  "              (first lines)\n" +
  "              \"\\n  \"\n" +
  "              (recurse-indent\n" +
  "               (interleave \"\\n\" (rest lines)))])))\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  ";;nodoc, deprecated\n" +
  "(macro chainable (...names)\n" +
  "       (each (name) names\n" +
  "             '(macro @name (target ...calls)\n" +
  "                     '(chain (call @name @target) ...@calls))))\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "(docs \"uses the javascript `instanceof` operator to check if `item` is of `type`.\"\n" +
  "      tags [language type]\n" +
  "      example (instance-of? (new Date) Date))\n" +
  "(macro instance-of? (item type)\n" +
  "       [\"(\" (transpile item) \" instanceof \" (transpile type) \")\"])\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "(docs \"returns true if `haystack` includes `needle`.  `haystack` can be a string or array/list.\"\n" +
  "      tags [arrays collections]\n" +
  "      examples [ (includes? 'hello 'h) (includes? `[ Veni vidi vici] 'vidi) ])\n" +
  "(macro includes? (haystack needle)\n" +
  "       '(pipe @haystack (.index-of @needle) (!= -1)))\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "(docs \"returns true if `haystack` does NOT include `needle`.\n" +
  "`haystack` can be a string or array/list\"\n" +
  "      tags [arrays collections]\n" +
  "      examples [ (excludes? 'hello 10) (excludes? `[ Veni vidi vici] 'attenti) ])\n" +
  "(macro excludes? (haystack needle)\n" +
  "       `(pipe @haystack (.index-of @needle) (= -1)))\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "(docs \"similar to the javascript truthiness predicate `as-boolean`, returns true unless the `thing` is undefined or null\"\n" +
  "      tags [type]\n" +
  "      example (exists? window))\n" +
  "(macro exists? (thing)\n" +
  "       `(and (defined? @thing) (!= @thing null)))\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "(macro with-state (k v ...body)\n" +
  "       (var before (^state k))\n" +
  "       (^state k v)\n" +
  "       (var return-value\n" +
  "            (interleave \"\\n\" (map body transpile)))\n" +
  "       (^state k before)\n" +
  "       return-value)\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "(docs \"combines elements of array `arr` into a string, inserting\n" +
  "`glue` string between each element.  if `glue` is omitted (only one\n" +
  "argument provided), the elements of `arr` are joined with an empty\n" +
  "string\"\n" +
  "\n" +
  "      tags [arrays collections strings]\n" +
  "      examples [ (join `[ a few words ]  \", \" )\n" +
  "                 (join `[ several more words ]) ])\n" +
  "\n" +
  "(macro join (arr glue)\n" +
  "       (if (and (defined? glue) (undefined? arr))\n" +
  "           (assign arr glue glue undefined))\n" +
  "       `(.join @arr @(or glue \"\\\"\\\"\")))\n" +
  "\n" +
  "\n" +
  "(docs \"registers variables in `pairs` inside of the current scope using the javascript var keyword.\n" +
  "destructuring from arrays and objects is also supported, as shown in the examples\"\n" +
  "      tags [ variables language ]\n" +
  "      examples: [ (var a 1 b 2)\n" +
  "                  (var a 1)\n" +
  "                  (var a)\n" +
  "                  (var {a} {a 1 b 2} c 3)\n" +
  "                  (var a 1 [b c] [2 3]) ])\n" +
  "\n" +
  "(macro var (...pairs)\n" +
  "       (var destructured [])\n" +
  "       (bulk-map pairs (#(lhs rhs)\n" +
  "                         (switch lhs.type\n" +
  "                                 ('bracket\n" +
  "                                  (var symbol (^symbol))\n" +
  "                                  (destructured.push [symbol (transpile rhs)])\n" +
  "                                  (each (item index) lhs.contents\n" +
  "                                        (destructured.push [(transpile item) '(get @symbol @index)]))\n" +
  "                                  (destructured.push [symbol 'undefined]))\n" +
  "                                 ('brace\n" +
  "                                  (var symbol (^symbol))\n" +
  "                                  (destructured.push [symbol (transpile rhs)])\n" +
  "                                  (each (item index) lhs.contents\n" +
  "                                        (var tr-item (transpile item))\n" +
  "                                        (destructured.push [tr-item '(get @symbol @[\"\\\"\" tr-item \"\\\"\"])]))\n" +
  "                                  (destructured.push [symbol 'undefined]))\n" +
  "\n" +
  "                                 (default\n" +
  "                                  (destructured.push [(transpile lhs)\n" +
  "                                                       (if rhs (transpile rhs) 'undefined)])))))\n" +
  "\n" +
  "       (as-statement\n" +
  "        [\"var \" (interleave \",\\n    \"\n" +
  "           (map destructured\n" +
  "                (#(pair)\n" +
  "                  [(first pair) \" = \" (second pair)]\n" +
  "                  )))]))\n" +
  "\n" +
  "(docs \"sets default values for variables in current scope. `pairs` are\n" +
  "alternating variable names and default values\"\n" +
  "      tags [variables language]\n" +
  "      example (default a 10 b 20))\n" +
  "(macro default (...pairs)\n" +
  "       (interleave \"\\n\" (bulk-map pairs (#(name value)\n" +
  "                                  '(assign @name (ternary (defined? @name) @name @value))))))\n" +
  "\n" +
  "\n" +
  "(macro import-namespace (namespace)\n" +
  "       (var namespace-as-string (output-formatter (transpile namespace)))\n" +
  "       (unless (sibilant.macros.namespaces.has-own-property namespace-as-string)\n" +
  "               (set sibilant.macros.namespaces namespace-as-string {}))\n" +
  "       (sibilant.macros.search-path.unshift namespace-as-string)\n" +
  "       undefined)\n" +
  "\n" +
  "\n" +
  "(macro namespace (namespace)\n" +
  "       `(import-namespace @namespace)\n" +
  "       (set sibilant.macros 'namespace (get sibilant.macros.namespaces (output-formatter (transpile namespace))))\n" +
  "       undefined)\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "(docs \"checks if `object` has property `key`.  returns true or false.\"\n" +
  "      tags [collections objects]\n" +
  "      example (has-key? object 'a))\n" +
  "\n" +
  "(macro has-key? (object key)\n" +
  "       `(.has-own-property @object @key))\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "(docs \"retreives object properties, potentially deeply. If more than one `keys` are provided,\n" +
  "`get` fetches deeply into nested objects or arrays.\n" +
  "When javascript dot notation can be used (`a.b = 3`), it is.\n" +
  "Otherwise, bracket notation is used.\"\n" +
  "      tags [collections objects]\n" +
  "      examples [ (get an-object 'static-attribute-name)\n" +
  "                 (get object dynamic-attribute-name)\n" +
  "                 (get object \"these attributes\" \"can't be dotted\")\n" +
  "                 (get array 0)\n" +
  "                 (get object 'a 'b c)\n" +
  "                 (get array 0 1 2) ])\n" +
  "\n" +
  "\n" +
  "(macro get (obj ...keys)\n" +
  "       [(transpile obj)\n" +
  "         (map keys (#(key)\n" +
  "                     (var transpiled (transpile key)\n" +
  "                          output (output-formatter transpiled))\n" +
  "\n" +
  "                     (if (match-regex? output \"^\\\"[a-zA-Z0-9]+\\\"$\")\n" +
  "                         [\".\" (replace-all output \"\\\"\" \"\") ]\n" +
  "                         [\"[\" transpiled \"]\"])))])\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "(docs \"assigns object properties to `arr` in pairs, alternating between keys and values.\n" +
  "When javascript dot notation can be used (`a.b = 3`), it is.  Otherwise, bracket notation is used\"\n" +
  "      tags [collections objects]\n" +
  "      examples [ (set an-object 'static-attribute-name 'value)\n" +
  "                 (set object dynamic-attribute-name \"key name determined at runtime\")\n" +
  "                 (set array 0 \"first element of array\")\n" +
  "                 (set object \"can't be dotted\" 'value)\n" +
  "                 (set object 'first-attribute 'first-value\n" +
  "                      'second-attribute 'second-value) ])\n" +
  "\n" +
  "(macro set (arr ...kv-pairs)\n" +
  "       (interleave \"\\n\" (bulk-map kv-pairs (#(k v) `(assign (get @arr @k) @v)))))\n" +
  "\n" +
  "(docs \"checks if a string is identical to the lower-cased version of itself\"\n" +
  "      tags [strings]\n" +
  "      example (lower-case? \"abc\"))\n" +
  "(macro lower-case? (str)\n" +
  "       `(= (.to-lower-case @str) @str))\n" +
  "\n" +
  "\n" +
  "\n" +
  "(docs \"checks if a string is identical to the upper-cased version of itself\"\n" +
  "      tags [strings]\n" +
  "      example (lower-case? \"abc\"))\n" +
  "(macro upper-case? (str)\n" +
  "       `(= (.to-upper-case @str) @str))\n" +
  "\n" +
  "\n" +
  "(docs \"inserts a pragma for source-mapping-url\"\n" +
  "      tags []\n" +
  "      example (source-mapping-url \"/example.map\"))\n" +
  "\n" +
  "(macro source-mapping-url (url)\n" +
  "       [ \"//# sourceMappingURL=\" (|> url transpile output-formatter eval) \"\\n\" ])\n" +
  "\n" +
  "\n" +
  "(docs \"sorts `array-of-objects` by `attribute` using locale-compare\"\n" +
  "      tags [collections objects arrays experimental]\n" +
  "      example (|> [ {state 'ca} {state 'or} {state 'ny} ] (sort-by 'state))\n" +
  "      references [\"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare\"])\n" +
  "\n" +
  "(macro sort-by (array-of-objects attribute)\n" +
  "       `(.sort @array-of-objects (#-> (get @attribute)\n" +
  "                                      .to-string\n" +
  "                                      (.locale-compare (get #1 @attribute)))))\n" +
  "");
  $((function() {
    /* /Users/jbr/code/sibilant/src/browser.sibilant:44:9 */
  
    return map($.makeArray($("script[type=\"application/sibilant\"][src]").map((function() {
      /* /Users/jbr/code/sibilant/src/browser.sibilant:47:22 */
    
      return this.src;
    }))), sibilant.include);
  }));
  return sibilant;
}).call(this);