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
          /* /Users/jbr/code/sibilant/include/functional.sibilant:71:13 */
        
          return collector.concat([ item, glue[index] ]);
        }));
      } else {
        return inject([ arr[0] ], arr.slice(1), (function(collector, item, index) {
          /* /Users/jbr/code/sibilant/include/functional.sibilant:75:13 */
        
          return collector.concat([ glue, item ]);
        }));
      }
    }).call(this);
  });
  var flatten = (function flatten$(items) {
    /* flatten /Users/jbr/code/sibilant/include/functional.sibilant:78:0 */
  
    var items = Array.prototype.slice.call(arguments, 0);
  
    return inject([], items, (function(collector, item) {
      /* /Users/jbr/code/sibilant/include/functional.sibilant:80:10 */
    
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
    /* recurse-map /Users/jbr/code/sibilant/include/functional.sibilant:87:0 */
  
    return (function() {
      if (((item) && typeof (item) === "object" && (item).constructor.name === "Array")) {
        return map(item, (function(subitem) {
          /* /Users/jbr/code/sibilant/include/functional.sibilant:88:32 */
        
          return recurseMap(subitem, fn);
        }));
      } else {
        return fn(item);
      }
    }).call(this);
  });
  var pluck = (function pluck$(items, attribute) {
    /* pluck /Users/jbr/code/sibilant/include/functional.sibilant:91:0 */
  
    return map(items, (function(item) {
      /* /Users/jbr/code/sibilant/include/functional.sibilant:92:16 */
    
      return item[attribute];
    }));
  });
  var mergeInto = (function mergeInto$(into, from) {
    /* merge-into /Users/jbr/code/sibilant/include/functional.sibilant:94:0 */
  
    Object.keys(from).forEach((function(key) {
      /* /Users/jbr/code/sibilant/include/functional.sibilant:95:5 */
    
      return into[key] = from[key];
    }));
    return into;
  });
  var clone = (function clone$(object) {
    /* clone /Users/jbr/code/sibilant/include/functional.sibilant:98:0 */
  
    return inject({  }, Object.keys(object), (function(collector, key) {
      /* /Users/jbr/code/sibilant/include/functional.sibilant:100:13 */
    
      collector[key] = object[key];
      return collector;
    }));
  });
  var mapValues = (function mapValues$(object, fn) {
    /* map-values /Users/jbr/code/sibilant/include/functional.sibilant:104:0 */
  
    return inject({  }, Object.keys(object), (function(collector, key, index) {
      /* /Users/jbr/code/sibilant/include/functional.sibilant:106:13 */
    
      collector[key] = fn(object[key], key);
      return collector;
    }));
  });
  var mergeWith = (function mergeWith$(into, from) {
    /* merge-with /Users/jbr/code/sibilant/include/functional.sibilant:110:0 */
  
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
          /* /Users/jbr/code/sibilant/src/pretty-printer.sibilant:14:28 */
        
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
  
    var mapPretty = (function mapPretty$(attr) {
      /* map-pretty /Users/jbr/code/sibilant/src/pretty-printer.sibilant:24:5 */
    
      var arr = node[attr];
      return (function() {
        if ((arr && arr.length)) {
          return map(arr, (function() {
            /* /Users/jbr/code/sibilant/src/pretty-printer.sibilant:27:27 */
          
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
    /* sibilant.pretty-print.root /Users/jbr/code/sibilant/src/pretty-printer.sibilant:39:0 */
  
    return map(node.contents, (function() {
      /* /Users/jbr/code/sibilant/src/pretty-printer.sibilant:41:16 */
    
      return prettify(arguments[0], color, false);
    })).join("\n");
  });
  sibilant.prettyPrint.output = (function sibilant$prettyPrint$output$(node, color) {
    /* sibilant.pretty-print.output /Users/jbr/code/sibilant/src/pretty-printer.sibilant:44:0 */
  
    return ((function() {
      if (color) {
        return black("{");
      } else {
        return "";
      }
    }).call(this) + (function() {
      if (((node.contents) && typeof (node.contents) === "object" && (node.contents).constructor.name === "Array")) {
        return map(node.contents, (function() {
          /* /Users/jbr/code/sibilant/src/pretty-printer.sibilant:48:28 */
        
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
    /* real-newlines /Users/jbr/code/sibilant/src/pretty-printer.sibilant:54:0 */
  
    return node.split("\\n").join("\n");
  });
  sibilant.prettyPrint.colorize = (function sibilant$prettyPrint$colorize$(node, color, string) {
    /* sibilant.pretty-print.colorize /Users/jbr/code/sibilant/src/pretty-printer.sibilant:59:0 */
  
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
        console.log("node");
        console.log(prettify(node));
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
          /* /Users/jbr/code/sibilant/include/functional.sibilant:71:13 */
        
          return collector.concat([ item, glue[index] ]);
        }));
      } else {
        return inject([ arr[0] ], arr.slice(1), (function(collector, item, index) {
          /* /Users/jbr/code/sibilant/include/functional.sibilant:75:13 */
        
          return collector.concat([ glue, item ]);
        }));
      }
    }).call(this);
  });
  var flatten = (function flatten$(items) {
    /* flatten /Users/jbr/code/sibilant/include/functional.sibilant:78:0 */
  
    var items = Array.prototype.slice.call(arguments, 0);
  
    return inject([], items, (function(collector, item) {
      /* /Users/jbr/code/sibilant/include/functional.sibilant:80:10 */
    
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
    /* recurse-map /Users/jbr/code/sibilant/include/functional.sibilant:87:0 */
  
    return (function() {
      if (((item) && typeof (item) === "object" && (item).constructor.name === "Array")) {
        return map(item, (function(subitem) {
          /* /Users/jbr/code/sibilant/include/functional.sibilant:88:32 */
        
          return recurseMap(subitem, fn);
        }));
      } else {
        return fn(item);
      }
    }).call(this);
  });
  var pluck = (function pluck$(items, attribute) {
    /* pluck /Users/jbr/code/sibilant/include/functional.sibilant:91:0 */
  
    return map(items, (function(item) {
      /* /Users/jbr/code/sibilant/include/functional.sibilant:92:16 */
    
      return item[attribute];
    }));
  });
  var mergeInto = (function mergeInto$(into, from) {
    /* merge-into /Users/jbr/code/sibilant/include/functional.sibilant:94:0 */
  
    Object.keys(from).forEach((function(key) {
      /* /Users/jbr/code/sibilant/include/functional.sibilant:95:5 */
    
      return into[key] = from[key];
    }));
    return into;
  });
  var clone = (function clone$(object) {
    /* clone /Users/jbr/code/sibilant/include/functional.sibilant:98:0 */
  
    return inject({  }, Object.keys(object), (function(collector, key) {
      /* /Users/jbr/code/sibilant/include/functional.sibilant:100:13 */
    
      collector[key] = object[key];
      return collector;
    }));
  });
  var mapValues = (function mapValues$(object, fn) {
    /* map-values /Users/jbr/code/sibilant/include/functional.sibilant:104:0 */
  
    return inject({  }, Object.keys(object), (function(collector, key, index) {
      /* /Users/jbr/code/sibilant/include/functional.sibilant:106:13 */
    
      collector[key] = fn(object[key], key);
      return collector;
    }));
  });
  var mergeWith = (function mergeWith$(into, from) {
    /* merge-with /Users/jbr/code/sibilant/include/functional.sibilant:110:0 */
  
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
    "whitespace": "\\s+",
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
            /* /Users/jbr/code/sibilant/src/parser.sibilant:69:20 */
          
            regexName = r.name;
            return match = r.exec(remainingInput);
          }));
          return (function() {
            if ((typeof match !== "undefined" && match !== null)) {
              var matchString = match[0],
                  length = matchString.length;
              context.stack.push(cacheNode({
                dir: sibilant.dir,
                file: sibilant.file,
                token: matchString,
                type: regexName,
                start: context.position,
                line: context.line,
                col: context.col,
                length: length,
                contents: []
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
        var unclosedNode = context.parseStack[0];
        throw (new Error(("unclosed node at " + unclosedNode.file + ":" + unclosedNode.line + ":" + unclosedNode.col + "\n  " + prettify(unclosedNode, false).slice(0, 100))))
      }
    }).call(this);
    return output;
  });
  sibilant.restructure = restructure;
  restructurers.openExpression = (function restructurers$openExpression$(token, context) {
    /* restructurers.open-expression /Users/jbr/code/sibilant/src/restructurer.sibilant:35:0 */
  
    var first = context.parseStack[0];
    token.contents = [];
    token.type = bracketTypes[token.token];
    acceptIgnoredTokens(token, context);
    acceptSpecials(token, context);
    first.contents.push(token);
    context.parseStack.unshift(token);
    return context;
  });
  restructurers.closeExpression = (function restructurers$closeExpression$(node, context, index) {
    /* restructurers.close-expression /Users/jbr/code/sibilant/src/restructurer.sibilant:47:0 */
  
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
    /* open-special /Users/jbr/code/sibilant/src/restructurer.sibilant:72:0 */
  
    ((context.specials)++);
    acceptIgnoredTokens(node, context);
    var first = context.parseStack[0];
    node.contents = [];
    first.contents.push(node);
    context.parseStack.unshift(node);
    return context;
  });
  var acceptSpecials = (function acceptSpecials$(node, context) {
    /* accept-specials /Users/jbr/code/sibilant/src/restructurer.sibilant:85:0 */
  
    node.specials = context.specials;
    context.specials = 0;
    return context;
  });
  var acceptIgnoredTokens = (function acceptIgnoredTokens$(node, context) {
    /* accept-ignored-tokens /Users/jbr/code/sibilant/src/restructurer.sibilant:90:0 */
  
    node.precedingIgnored = context.ignoredTokens;
    context.ignoredTokens = [];
    return context;
  });
  var closeSpecials = (function closeSpecials$(node, context) {
    /* close-specials /Users/jbr/code/sibilant/src/restructurer.sibilant:95:0 */
  
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
    /* accumulate-ignored-token /Users/jbr/code/sibilant/src/restructurer.sibilant:103:0 */
  
    context.ignoredTokens.push(token);
    return context;
  });
  [ "hat", "dots", "tick", "at" ].forEach((function(special) {
    /* /Users/jbr/code/sibilant/src/restructurer.sibilant:107:0 */
  
    return restructurers[special] = openSpecial;
  }));
  [ "whitespace", "newline", "ignored" ].forEach((function(ignored) {
    /* /Users/jbr/code/sibilant/src/restructurer.sibilant:110:0 */
  
    return restructurers[ignored] = accumulateIgnoredToken;
  }));
  restructurers.default = (function restructurers$default$(token, context, index) {
    /* restructurers.default /Users/jbr/code/sibilant/src/restructurer.sibilant:113:0 */
  
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
          /* /Users/jbr/code/sibilant/src/macros.sibilant:29:33 */
        
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
  sibilant.macros.namespaces.core.ternary = (function ternary$(cond, ifTrue, ifFalse) {
    /* ternary /Users/jbr/code/sibilant/include/macros.sibilant:9:0 */
  
    return [ "(", transpile(cond), ") ? ", transpile(ifTrue), " : ", transpile(ifFalse) ];
  });
  sibilant.macros.namespaces.core.set = (function set$(arr, kvPairs) {
    /* set /Users/jbr/code/sibilant/include/macros.sibilant:19:0 */
  
    var kvPairs = Array.prototype.slice.call(arguments, 1);
  
    return interleave("\n", bulkMap(kvPairs, (function(k, v) {
      /* /Users/jbr/code/sibilant/include/macros.sibilant:21:34 */
    
      return asStatement([ "(", transpile(arr), ")", "[", transpile(k), "] = ", transpile(v) ]);
    })));
  });
  sibilant.macros.namespaces.core.var = (function var$(pairs) {
    /* var /Users/jbr/code/sibilant/include/macros.sibilant:25:0 */
  
    var pairs = Array.prototype.slice.call(arguments, 0);
  
    return asStatement([ "var ", interleave(",\n    ", bulkMap(pairs, (function(name, value) {
      /* /Users/jbr/code/sibilant/include/macros.sibilant:30:25 */
    
      return [ transpile(name), " = ", transpile(value) ];
    }))) ]);
  });
  sibilant.macros.namespaces.core.get = (function get$(obj, keys) {
    /* get /Users/jbr/code/sibilant/include/macros.sibilant:35:0 */
  
    var keys = Array.prototype.slice.call(arguments, 1);
  
    return [ "(", transpile(obj), ")", map(keys, (function(key) {
      /* /Users/jbr/code/sibilant/include/macros.sibilant:36:42 */
    
      return [ "[", transpile(key), "]" ];
    })) ];
  });
  sibilant.macros.namespaces.core.aliasMacro = (function aliasMacro$(currentMacroName, newMacroName) {
    /* alias-macro /Users/jbr/code/sibilant/include/macros.sibilant:47:0 */
  
    var currentMacroName = outputFormatter(transpile(currentMacroName)),
        newMacroName = outputFormatter(transpile(newMacroName));
    sibilant.macros.namespace[newMacroName] = sibilant.macros.namespace[currentMacroName];
    return null;
  });
  sibilant.macros.namespaces.core.send = (function send$(object, method, args) {
    /* send /Users/jbr/code/sibilant/include/macros.sibilant:62:0 */
  
    var args = Array.prototype.slice.call(arguments, 2);
  
    return [ transpile(object), ".", transpile(method), "(", interleave(", ", map(args, transpile)), ")" ];
  });
  sibilant.macros.namespaces.core.apply = (function apply$(fn, arglist) {
    /* apply /Users/jbr/code/sibilant/include/macros.sibilant:74:0 */
  
    return {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 2119,
      line: 75,
      col: 8,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: ".",
        type: "dots",
        start: 2120,
        line: 75,
        col: 9,
        length: 1,
        contents: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "apply",
          type: "literal",
          start: 2121,
          line: 75,
          col: 10,
          length: 5,
          contents: [],
          nodeId: 6496,
          specials: 0,
          precedingIgnored: []
        } ],
        nodeId: 6495,
        precedingIgnored: []
      }, fn, {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "this",
        type: "literal",
        start: 2131,
        line: 75,
        col: 20,
        length: 4,
        contents: [],
        nodeId: 6501,
        specials: 0,
        precedingIgnored: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 2130,
          line: 75,
          col: 19,
          length: 1,
          contents: [],
          nodeId: 6500
        } ]
      }, arglist ],
      nodeId: 6494,
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core.cons = (function cons$(first, rest) {
    /* cons /Users/jbr/code/sibilant/include/macros.sibilant:86:0 */
  
    return [ "[ ", transpile(first), " ].concat(", transpile(rest), ")" ];
  });
  sibilant.macros.namespaces.core.append = (function append$(list, additional) {
    /* append /Users/jbr/code/sibilant/include/macros.sibilant:95:0 */
  
    var additional = Array.prototype.slice.call(arguments, 1);
  
    return {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 2690,
      line: 96,
      col: 8,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: ".",
        type: "dots",
        start: 2691,
        line: 96,
        col: 9,
        length: 1,
        contents: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "concat",
          type: "literal",
          start: 2692,
          line: 96,
          col: 10,
          length: 6,
          contents: [],
          nodeId: 6644,
          specials: 0,
          precedingIgnored: []
        } ],
        nodeId: 6643,
        precedingIgnored: []
      }, list, {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 2705,
        line: 96,
        col: 23,
        length: 1,
        contents: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "list",
          type: "literal",
          start: 2706,
          line: 96,
          col: 24,
          length: 4,
          contents: [],
          nodeId: 6650,
          specials: 0,
          precedingIgnored: []
        } ].concat(additional),
        nodeId: 6649,
        precedingIgnored: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 2704,
          line: 96,
          col: 22,
          length: 1,
          contents: [],
          nodeId: 6648
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      } ],
      nodeId: 6642,
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core.length = (function length$(arr) {
    /* length /Users/jbr/code/sibilant/include/macros.sibilant:102:0 */
  
    return {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 2871,
      line: 103,
      col: 8,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "get",
        type: "literal",
        start: 2872,
        line: 103,
        col: 9,
        length: 3,
        contents: [],
        nodeId: 6707,
        specials: 0,
        precedingIgnored: []
      }, arr, {"dir":"/Users/jbr/code/sibilant/include","file":"/Users/jbr/code/sibilant/include/macros.sibilant","token":"'","type":"tick","start":2881,"line":103,"col":18,"length":1,"contents":[{"dir":"/Users/jbr/code/sibilant/include","file":"/Users/jbr/code/sibilant/include/macros.sibilant","token":"length","type":"literal","start":2882,"line":103,"col":19,"length":6,"contents":[],"nodeId":6713,"specials":0,"precedingIgnored":[]}],"nodeId":6712,"precedingIgnored":[{"dir":"/Users/jbr/code/sibilant/include","file":"/Users/jbr/code/sibilant/include/macros.sibilant","token":" ","type":"whitespace","start":2880,"line":103,"col":17,"length":1,"contents":[],"nodeId":6711}]} ],
      nodeId: 6706,
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core.scoped = (function scoped$(body) {
    /* scoped /Users/jbr/code/sibilant/include/macros.sibilant:109:0 */
  
    var body = Array.prototype.slice.call(arguments, 0);
  
    return {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 3126,
      line: 110,
      col: 8,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: ".",
        type: "dots",
        start: 3127,
        line: 110,
        col: 9,
        length: 1,
        contents: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "call",
          type: "literal",
          start: 3128,
          line: 110,
          col: 10,
          length: 4,
          contents: [],
          nodeId: 6776,
          specials: 0,
          precedingIgnored: []
        } ],
        nodeId: 6775,
        precedingIgnored: []
      }, {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 3133,
        line: 110,
        col: 15,
        length: 1,
        contents: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "lambda",
          type: "literal",
          start: 3134,
          line: 110,
          col: 16,
          length: 6,
          contents: [],
          nodeId: 6779,
          specials: 0,
          precedingIgnored: []
        }, {
          node: this,
          args: []
        } ].concat(body),
        nodeId: 6778,
        precedingIgnored: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 3132,
          line: 110,
          col: 14,
          length: 1,
          contents: [],
          nodeId: 6777
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      }, {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "this",
        type: "literal",
        start: 3172,
        line: 110,
        col: 54,
        length: 4,
        contents: [],
        nodeId: 6798,
        specials: 0,
        precedingIgnored: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 3171,
          line: 110,
          col: 53,
          length: 1,
          contents: [],
          nodeId: 6797
        } ]
      } ],
      nodeId: 6774,
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core.first = (function first$(arr) {
    /* first /Users/jbr/code/sibilant/include/macros.sibilant:130:0 */
  
    return {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 3954,
      line: 130,
      col: 20,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "get",
        type: "literal",
        start: 3955,
        line: 130,
        col: 21,
        length: 3,
        contents: [],
        nodeId: 6849,
        specials: 0,
        precedingIgnored: []
      }, arr, {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "0",
        type: "number",
        start: 3964,
        line: 130,
        col: 30,
        length: 1,
        contents: [],
        nodeId: 6854,
        specials: 0,
        precedingIgnored: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 3963,
          line: 130,
          col: 29,
          length: 1,
          contents: [],
          nodeId: 6853
        } ]
      } ],
      nodeId: 6848,
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core.second = (function second$(arr) {
    /* second /Users/jbr/code/sibilant/include/macros.sibilant:131:0 */
  
    return {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 3989,
      line: 131,
      col: 21,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "get",
        type: "literal",
        start: 3990,
        line: 131,
        col: 22,
        length: 3,
        contents: [],
        nodeId: 6869,
        specials: 0,
        precedingIgnored: []
      }, arr, {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "1",
        type: "number",
        start: 3999,
        line: 131,
        col: 31,
        length: 1,
        contents: [],
        nodeId: 6874,
        specials: 0,
        precedingIgnored: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 3998,
          line: 131,
          col: 30,
          length: 1,
          contents: [],
          nodeId: 6873
        } ]
      } ],
      nodeId: 6868,
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core.third = (function third$(arr) {
    /* third /Users/jbr/code/sibilant/include/macros.sibilant:132:0 */
  
    return {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 4023,
      line: 132,
      col: 20,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "get",
        type: "literal",
        start: 4024,
        line: 132,
        col: 21,
        length: 3,
        contents: [],
        nodeId: 6889,
        specials: 0,
        precedingIgnored: []
      }, arr, {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "2",
        type: "number",
        start: 4033,
        line: 132,
        col: 30,
        length: 1,
        contents: [],
        nodeId: 6894,
        specials: 0,
        precedingIgnored: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 4032,
          line: 132,
          col: 29,
          length: 1,
          contents: [],
          nodeId: 6893
        } ]
      } ],
      nodeId: 6888,
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core.rest = (function rest$(arr) {
    /* rest /Users/jbr/code/sibilant/include/macros.sibilant:138:0 */
  
    return {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 4170,
      line: 138,
      col: 19,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: ".",
        type: "dots",
        start: 4171,
        line: 138,
        col: 20,
        length: 1,
        contents: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "slice",
          type: "literal",
          start: 4172,
          line: 138,
          col: 21,
          length: 5,
          contents: [],
          nodeId: 6944,
          specials: 0,
          precedingIgnored: []
        } ],
        nodeId: 6943,
        precedingIgnored: []
      }, arr, {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "1",
        type: "number",
        start: 4183,
        line: 138,
        col: 32,
        length: 1,
        contents: [],
        nodeId: 6949,
        specials: 0,
        precedingIgnored: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 4182,
          line: 138,
          col: 31,
          length: 1,
          contents: [],
          nodeId: 6948
        } ]
      } ],
      nodeId: 6942,
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core.last = (function last$(arr) {
    /* last /Users/jbr/code/sibilant/include/macros.sibilant:143:0 */
  
    return {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 4330,
      line: 143,
      col: 19,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "first",
        type: "literal",
        start: 4331,
        line: 143,
        col: 20,
        length: 5,
        contents: [],
        nodeId: 6997,
        specials: 0,
        precedingIgnored: []
      }, {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 4337,
        line: 143,
        col: 26,
        length: 1,
        contents: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: ".",
          type: "dots",
          start: 4338,
          line: 143,
          col: 27,
          length: 1,
          contents: [ {
            dir: "/Users/jbr/code/sibilant/include",
            file: "/Users/jbr/code/sibilant/include/macros.sibilant",
            token: "slice",
            type: "literal",
            start: 4339,
            line: 143,
            col: 28,
            length: 5,
            contents: [],
            nodeId: 7001,
            specials: 0,
            precedingIgnored: []
          } ],
          nodeId: 7000,
          precedingIgnored: []
        }, arr, {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "-1",
          type: "number",
          start: 4350,
          line: 143,
          col: 39,
          length: 2,
          contents: [],
          nodeId: 7006,
          specials: 0,
          precedingIgnored: [ {
            dir: "/Users/jbr/code/sibilant/include",
            file: "/Users/jbr/code/sibilant/include/macros.sibilant",
            token: " ",
            type: "whitespace",
            start: 4349,
            line: 143,
            col: 38,
            length: 1,
            contents: [],
            nodeId: 7005
          } ]
        } ],
        nodeId: 6999,
        precedingIgnored: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 4336,
          line: 143,
          col: 25,
          length: 1,
          contents: [],
          nodeId: 6998
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      } ],
      nodeId: 6996,
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core["="] = (function $$(a, b) {
    /* = /Users/jbr/code/sibilant/include/macros.sibilant:146:0 */
  
    return [ transpile(a), " === ", transpile(b) ];
  });
  sibilant.macros.namespaces.core["+"] = (function $$(args) {
    /* + /Users/jbr/code/sibilant/include/macros.sibilant:153:0 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    return [ "(", interleave(" + ", map(args, transpile)), ")" ];
  });
  sibilant.macros.namespaces.core["-"] = (function $$(args) {
    /* - /Users/jbr/code/sibilant/include/macros.sibilant:160:0 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    return [ "(", interleave(" - ", map(args, transpile)), ")" ];
  });
  sibilant.macros.namespaces.core["_"] = (function _$(args) {
    /* * /Users/jbr/code/sibilant/include/macros.sibilant:166:0 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    return [ "(", interleave(" * ", map(args, transpile)), ")" ];
  });
  sibilant.macros.namespaces.core["/"] = (function $$(args) {
    /* / /Users/jbr/code/sibilant/include/macros.sibilant:173:0 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    return [ "(", interleave(" / ", map(args, transpile)), ")" ];
  });
  sibilant.macros.namespaces.core.or = (function or$(args) {
    /* or /Users/jbr/code/sibilant/include/macros.sibilant:180:0 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    return [ "(", interleave(" || ", map(args, transpile)), ")" ];
  });
  sibilant.macros.namespaces.core.and = (function and$(args) {
    /* and /Users/jbr/code/sibilant/include/macros.sibilant:188:0 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    return (1 === args.length) ? transpile(args[0]) : [ "(", interleave(" && ", map(args, transpile)), ")" ];
  });
  sibilant.macros.namespaces.core.mod = (function mod$(args) {
    /* mod /Users/jbr/code/sibilant/include/macros.sibilant:195:0 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    return [ "(", interleave(" % ", map(args, transpile)), ")" ];
  });
  sibilant.macros.namespaces.core[">"] = (function $$(args) {
    /* > /Users/jbr/code/sibilant/include/macros.sibilant:230:0 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    var jsComparator = ">";
    return {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 7292,
      line: 232,
      col: 8,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "and",
        type: "literal",
        start: 7293,
        line: 232,
        col: 9,
        length: 3,
        contents: [],
        nodeId: 7640,
        specials: 0,
        precedingIgnored: []
      } ].concat(map(args.slice(0, -1), (function(item, index) {
        /* /Users/jbr/code/sibilant/include/macros.sibilant:233:22 */
      
        return [ item, " ", jsComparator, " ", args[(1 + index)] ];
      }))),
      nodeId: 7639,
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core["<"] = (function $$(args) {
    /* < /Users/jbr/code/sibilant/include/macros.sibilant:237:0 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    var jsComparator = "<";
    return {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 7504,
      line: 239,
      col: 8,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "and",
        type: "literal",
        start: 7505,
        line: 239,
        col: 9,
        length: 3,
        contents: [],
        nodeId: 7719,
        specials: 0,
        precedingIgnored: []
      } ].concat(map(args.slice(0, -1), (function(item, index) {
        /* /Users/jbr/code/sibilant/include/macros.sibilant:240:22 */
      
        return [ item, " ", jsComparator, " ", args[(1 + index)] ];
      }))),
      nodeId: 7718,
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core["<="] = (function $$(args) {
    /* <= /Users/jbr/code/sibilant/include/macros.sibilant:243:0 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    var jsComparator = "<=";
    return {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 7717,
      line: 245,
      col: 8,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "and",
        type: "literal",
        start: 7718,
        line: 245,
        col: 9,
        length: 3,
        contents: [],
        nodeId: 7797,
        specials: 0,
        precedingIgnored: []
      } ].concat(map(args.slice(0, -1), (function(item, index) {
        /* /Users/jbr/code/sibilant/include/macros.sibilant:246:22 */
      
        return [ item, " ", jsComparator, " ", args[(1 + index)] ];
      }))),
      nodeId: 7796,
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core[">="] = (function $$(args) {
    /* >= /Users/jbr/code/sibilant/include/macros.sibilant:249:0 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    var jsComparator = ">=";
    return {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 7930,
      line: 251,
      col: 8,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "and",
        type: "literal",
        start: 7931,
        line: 251,
        col: 9,
        length: 3,
        contents: [],
        nodeId: 7875,
        specials: 0,
        precedingIgnored: []
      } ].concat(map(args.slice(0, -1), (function(item, index) {
        /* /Users/jbr/code/sibilant/include/macros.sibilant:252:22 */
      
        return [ item, " ", jsComparator, " ", args[(1 + index)] ];
      }))),
      nodeId: 7874,
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core["!="] = (function $$(args) {
    /* != /Users/jbr/code/sibilant/include/macros.sibilant:254:0 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    var jsComparator = "!==";
    return {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 8143,
      line: 256,
      col: 8,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "and",
        type: "literal",
        start: 8144,
        line: 256,
        col: 9,
        length: 3,
        contents: [],
        nodeId: 7952,
        specials: 0,
        precedingIgnored: []
      } ].concat(map(args.slice(0, -1), (function(item, index) {
        /* /Users/jbr/code/sibilant/include/macros.sibilant:257:22 */
      
        return [ item, " ", jsComparator, " ", args[(1 + index)] ];
      }))),
      nodeId: 7951,
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core["="] = (function $$(args) {
    /* = /Users/jbr/code/sibilant/include/macros.sibilant:260:0 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    var jsComparator = "===";
    return {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 8356,
      line: 262,
      col: 8,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "and",
        type: "literal",
        start: 8357,
        line: 262,
        col: 9,
        length: 3,
        contents: [],
        nodeId: 8030,
        specials: 0,
        precedingIgnored: []
      } ].concat(map(args.slice(0, -1), (function(item, index) {
        /* /Users/jbr/code/sibilant/include/macros.sibilant:263:22 */
      
        return [ item, " ", jsComparator, " ", args[(1 + index)] ];
      }))),
      nodeId: 8029,
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core.incrBy = (function incrBy$(item, increment) {
    /* incr-by /Users/jbr/code/sibilant/include/macros.sibilant:270:0 */
  
    return [ transpile(item), " += ", transpile(increment) ];
  });
  sibilant.macros.namespaces.core.incr = (function incr$(item) {
    /* incr /Users/jbr/code/sibilant/include/macros.sibilant:279:0 */
  
    return [ "((", transpile(item), ")++)" ];
  });
  sibilant.macros.namespaces.core.decr = (function decr$(item) {
    /* decr /Users/jbr/code/sibilant/include/macros.sibilant:286:0 */
  
    return [ "((", transpile(item), ")--)" ];
  });
  sibilant.macros.namespaces.core.new = (function new$(constructor, args) {
    /* new /Users/jbr/code/sibilant/include/macros.sibilant:293:0 */
  
    var args = Array.prototype.slice.call(arguments, 1);
  
    return [ "(new ", {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 9213,
      line: 294,
      col: 17,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "call",
        type: "literal",
        start: 9214,
        line: 294,
        col: 18,
        length: 4,
        contents: [],
        nodeId: 8287,
        specials: 0,
        precedingIgnored: []
      }, constructor ].concat(args),
      nodeId: 8286,
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    }, ")" ];
  });
  sibilant.macros.namespaces.core.regex = (function regex$(pattern, flags) {
    /* regex /Users/jbr/code/sibilant/include/macros.sibilant:301:0 */
  
    return {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 9458,
      line: 302,
      col: 8,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "new",
        type: "literal",
        start: 9459,
        line: 302,
        col: 9,
        length: 3,
        contents: [],
        nodeId: 8352,
        specials: 0,
        precedingIgnored: []
      }, {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "RegExp",
        type: "literal",
        start: 9463,
        line: 302,
        col: 13,
        length: 6,
        contents: [],
        nodeId: 8354,
        specials: 0,
        precedingIgnored: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 9462,
          line: 302,
          col: 12,
          length: 1,
          contents: [],
          nodeId: 8353
        } ]
      }, pattern, (flags || "undefined") ],
      nodeId: 8351,
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core["zero__QUERY"] = (function zero__QUERY$(item) {
    /* zero? /Users/jbr/code/sibilant/include/macros.sibilant:309:0 */
  
    return {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 9624,
      line: 309,
      col: 21,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "=",
        type: "otherChar",
        start: 9625,
        line: 309,
        col: 22,
        length: 1,
        contents: [],
        nodeId: 8408,
        specials: 0,
        precedingIgnored: []
      }, item, {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "0",
        type: "number",
        start: 9633,
        line: 309,
        col: 30,
        length: 1,
        contents: [],
        nodeId: 8413,
        specials: 0,
        precedingIgnored: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 9632,
          line: 309,
          col: 29,
          length: 1,
          contents: [],
          nodeId: 8412
        } ]
      } ],
      nodeId: 8407,
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core["empty__QUERY"] = (function empty__QUERY$(arr) {
    /* empty? /Users/jbr/code/sibilant/include/macros.sibilant:315:0 */
  
    return {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 9788,
      line: 316,
      col: 8,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "=",
        type: "otherChar",
        start: 9789,
        line: 316,
        col: 9,
        length: 1,
        contents: [],
        nodeId: 8457,
        specials: 0,
        precedingIgnored: []
      }, {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "0",
        type: "number",
        start: 9791,
        line: 316,
        col: 11,
        length: 1,
        contents: [],
        nodeId: 8459,
        specials: 0,
        precedingIgnored: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 9790,
          line: 316,
          col: 10,
          length: 1,
          contents: [],
          nodeId: 8458
        } ]
      }, {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 9793,
        line: 316,
        col: 13,
        length: 1,
        contents: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "length",
          type: "literal",
          start: 9794,
          line: 316,
          col: 14,
          length: 6,
          contents: [],
          nodeId: 8462,
          specials: 0,
          precedingIgnored: []
        }, arr ],
        nodeId: 8461,
        precedingIgnored: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 9792,
          line: 316,
          col: 12,
          length: 1,
          contents: [],
          nodeId: 8460
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      } ],
      nodeId: 8456,
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core["odd__QUERY"] = (function odd__QUERY$(number) {
    /* odd? /Users/jbr/code/sibilant/include/macros.sibilant:322:0 */
  
    return {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 9940,
      line: 323,
      col: 8,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "=",
        type: "otherChar",
        start: 9941,
        line: 323,
        col: 9,
        length: 1,
        contents: [],
        nodeId: 8506,
        specials: 0,
        precedingIgnored: []
      }, {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "1",
        type: "number",
        start: 9943,
        line: 323,
        col: 11,
        length: 1,
        contents: [],
        nodeId: 8508,
        specials: 0,
        precedingIgnored: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 9942,
          line: 323,
          col: 10,
          length: 1,
          contents: [],
          nodeId: 8507
        } ]
      }, {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 9945,
        line: 323,
        col: 13,
        length: 1,
        contents: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "mod",
          type: "literal",
          start: 9946,
          line: 323,
          col: 14,
          length: 3,
          contents: [],
          nodeId: 8511,
          specials: 0,
          precedingIgnored: []
        }, number, {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "2",
          type: "number",
          start: 9958,
          line: 323,
          col: 26,
          length: 1,
          contents: [],
          nodeId: 8516,
          specials: 0,
          precedingIgnored: [ {
            dir: "/Users/jbr/code/sibilant/include",
            file: "/Users/jbr/code/sibilant/include/macros.sibilant",
            token: " ",
            type: "whitespace",
            start: 9957,
            line: 323,
            col: 25,
            length: 1,
            contents: [],
            nodeId: 8515
          } ]
        } ],
        nodeId: 8510,
        precedingIgnored: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 9944,
          line: 323,
          col: 12,
          length: 1,
          contents: [],
          nodeId: 8509
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      } ],
      nodeId: 8505,
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core["even__QUERY"] = (function even__QUERY$(number) {
    /* even? /Users/jbr/code/sibilant/include/macros.sibilant:329:0 */
  
    return {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 10111,
      line: 330,
      col: 8,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "=",
        type: "otherChar",
        start: 10112,
        line: 330,
        col: 9,
        length: 1,
        contents: [],
        nodeId: 8557,
        specials: 0,
        precedingIgnored: []
      }, {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "0",
        type: "number",
        start: 10114,
        line: 330,
        col: 11,
        length: 1,
        contents: [],
        nodeId: 8559,
        specials: 0,
        precedingIgnored: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 10113,
          line: 330,
          col: 10,
          length: 1,
          contents: [],
          nodeId: 8558
        } ]
      }, {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 10116,
        line: 330,
        col: 13,
        length: 1,
        contents: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "mod",
          type: "literal",
          start: 10117,
          line: 330,
          col: 14,
          length: 3,
          contents: [],
          nodeId: 8562,
          specials: 0,
          precedingIgnored: []
        }, number, {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "2",
          type: "number",
          start: 10129,
          line: 330,
          col: 26,
          length: 1,
          contents: [],
          nodeId: 8567,
          specials: 0,
          precedingIgnored: [ {
            dir: "/Users/jbr/code/sibilant/include",
            file: "/Users/jbr/code/sibilant/include/macros.sibilant",
            token: " ",
            type: "whitespace",
            start: 10128,
            line: 330,
            col: 25,
            length: 1,
            contents: [],
            nodeId: 8566
          } ]
        } ],
        nodeId: 8561,
        precedingIgnored: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 10115,
          line: 330,
          col: 12,
          length: 1,
          contents: [],
          nodeId: 8560
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      } ],
      nodeId: 8556,
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core.typeof = (function typeof$(thing) {
    /* typeof /Users/jbr/code/sibilant/include/macros.sibilant:337:0 */
  
    return [ "typeof ", transpile(thing) ];
  });
  sibilant.macros.namespaces.core["string__QUERY"] = (function string__QUERY$(things) {
    /* string? /Users/jbr/code/sibilant/include/macros.sibilant:343:0 */
  
    var things = Array.prototype.slice.call(arguments, 0);
  
    return {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 10565,
      line: 344,
      col: 8,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "and",
        type: "literal",
        start: 10566,
        line: 344,
        col: 9,
        length: 3,
        contents: [],
        nodeId: 8674,
        specials: 0,
        precedingIgnored: []
      } ].concat(map(things, (function(thing) {
        /* /Users/jbr/code/sibilant/include/macros.sibilant:344:29 */
      
        return {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "(",
          type: "expression",
          start: 10597,
          line: 344,
          col: 40,
          length: 1,
          contents: [ {
            dir: "/Users/jbr/code/sibilant/include",
            file: "/Users/jbr/code/sibilant/include/macros.sibilant",
            token: "=",
            type: "otherChar",
            start: 10598,
            line: 344,
            col: 41,
            length: 1,
            contents: [],
            nodeId: 8691,
            specials: 0,
            precedingIgnored: []
          }, {
            dir: "/Users/jbr/code/sibilant/include",
            file: "/Users/jbr/code/sibilant/include/macros.sibilant",
            token: "(",
            type: "expression",
            start: 10600,
            line: 344,
            col: 43,
            length: 1,
            contents: [ {
              dir: "/Users/jbr/code/sibilant/include",
              file: "/Users/jbr/code/sibilant/include/macros.sibilant",
              token: "typeof",
              type: "literal",
              start: 10601,
              line: 344,
              col: 44,
              length: 6,
              contents: [],
              nodeId: 8694,
              specials: 0,
              precedingIgnored: []
            }, thing ],
            nodeId: 8693,
            precedingIgnored: [ {
              dir: "/Users/jbr/code/sibilant/include",
              file: "/Users/jbr/code/sibilant/include/macros.sibilant",
              token: " ",
              type: "whitespace",
              start: 10599,
              line: 344,
              col: 42,
              length: 1,
              contents: [],
              nodeId: 8692
            } ],
            specials: 0,
            end: undefined,
            closed: true,
            closingIgnored: []
          }, {"dir":"/Users/jbr/code/sibilant/include","file":"/Users/jbr/code/sibilant/include/macros.sibilant","token":"'","type":"tick","start":10616,"line":344,"col":59,"length":1,"contents":[{"dir":"/Users/jbr/code/sibilant/include","file":"/Users/jbr/code/sibilant/include/macros.sibilant","token":"string","type":"literal","start":10617,"line":344,"col":60,"length":6,"contents":[],"nodeId":8701,"specials":0,"precedingIgnored":[]}],"nodeId":8700,"precedingIgnored":[{"dir":"/Users/jbr/code/sibilant/include","file":"/Users/jbr/code/sibilant/include/macros.sibilant","token":" ","type":"whitespace","start":10615,"line":344,"col":58,"length":1,"contents":[],"nodeId":8699}]} ],
          nodeId: 8690,
          precedingIgnored: [],
          specials: 0,
          end: undefined,
          closed: true,
          closingIgnored: []
        };
      }))),
      nodeId: 8673,
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core["function__QUERY"] = (function function__QUERY$(things) {
    /* function? /Users/jbr/code/sibilant/include/macros.sibilant:350:0 */
  
    var things = Array.prototype.slice.call(arguments, 0);
  
    return {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 10809,
      line: 351,
      col: 8,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "and",
        type: "literal",
        start: 10810,
        line: 351,
        col: 9,
        length: 3,
        contents: [],
        nodeId: 8760,
        specials: 0,
        precedingIgnored: []
      } ].concat(map(things, (function(thing) {
        /* /Users/jbr/code/sibilant/include/macros.sibilant:351:29 */
      
        return {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "(",
          type: "expression",
          start: 10841,
          line: 351,
          col: 40,
          length: 1,
          contents: [ {
            dir: "/Users/jbr/code/sibilant/include",
            file: "/Users/jbr/code/sibilant/include/macros.sibilant",
            token: "=",
            type: "otherChar",
            start: 10842,
            line: 351,
            col: 41,
            length: 1,
            contents: [],
            nodeId: 8777,
            specials: 0,
            precedingIgnored: []
          }, {
            dir: "/Users/jbr/code/sibilant/include",
            file: "/Users/jbr/code/sibilant/include/macros.sibilant",
            token: "(",
            type: "expression",
            start: 10844,
            line: 351,
            col: 43,
            length: 1,
            contents: [ {
              dir: "/Users/jbr/code/sibilant/include",
              file: "/Users/jbr/code/sibilant/include/macros.sibilant",
              token: "typeof",
              type: "literal",
              start: 10845,
              line: 351,
              col: 44,
              length: 6,
              contents: [],
              nodeId: 8780,
              specials: 0,
              precedingIgnored: []
            }, thing ],
            nodeId: 8779,
            precedingIgnored: [ {
              dir: "/Users/jbr/code/sibilant/include",
              file: "/Users/jbr/code/sibilant/include/macros.sibilant",
              token: " ",
              type: "whitespace",
              start: 10843,
              line: 351,
              col: 42,
              length: 1,
              contents: [],
              nodeId: 8778
            } ],
            specials: 0,
            end: undefined,
            closed: true,
            closingIgnored: []
          }, {"dir":"/Users/jbr/code/sibilant/include","file":"/Users/jbr/code/sibilant/include/macros.sibilant","token":"'","type":"tick","start":10860,"line":351,"col":59,"length":1,"contents":[{"dir":"/Users/jbr/code/sibilant/include","file":"/Users/jbr/code/sibilant/include/macros.sibilant","token":"function","type":"literal","start":10861,"line":351,"col":60,"length":8,"contents":[],"nodeId":8787,"specials":0,"precedingIgnored":[]}],"nodeId":8786,"precedingIgnored":[{"dir":"/Users/jbr/code/sibilant/include","file":"/Users/jbr/code/sibilant/include/macros.sibilant","token":" ","type":"whitespace","start":10859,"line":351,"col":58,"length":1,"contents":[],"nodeId":8785}]} ],
          nodeId: 8776,
          precedingIgnored: [],
          specials: 0,
          end: undefined,
          closed: true,
          closingIgnored: []
        };
      }))),
      nodeId: 8759,
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core["undefined__QUERY"] = (function undefined__QUERY$(things) {
    /* undefined? /Users/jbr/code/sibilant/include/macros.sibilant:360:0 */
  
    var things = Array.prototype.slice.call(arguments, 0);
  
    return {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 11176,
      line: 361,
      col: 8,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "and",
        type: "literal",
        start: 11177,
        line: 361,
        col: 9,
        length: 3,
        contents: [],
        nodeId: 8847,
        specials: 0,
        precedingIgnored: []
      } ].concat(map(things, (function(thing) {
        /* /Users/jbr/code/sibilant/include/macros.sibilant:361:29 */
      
        return {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "(",
          type: "expression",
          start: 11208,
          line: 361,
          col: 40,
          length: 1,
          contents: [ {
            dir: "/Users/jbr/code/sibilant/include",
            file: "/Users/jbr/code/sibilant/include/macros.sibilant",
            token: "=",
            type: "otherChar",
            start: 11209,
            line: 361,
            col: 41,
            length: 1,
            contents: [],
            nodeId: 8864,
            specials: 0,
            precedingIgnored: []
          }, {
            dir: "/Users/jbr/code/sibilant/include",
            file: "/Users/jbr/code/sibilant/include/macros.sibilant",
            token: "(",
            type: "expression",
            start: 11211,
            line: 361,
            col: 43,
            length: 1,
            contents: [ {
              dir: "/Users/jbr/code/sibilant/include",
              file: "/Users/jbr/code/sibilant/include/macros.sibilant",
              token: "typeof",
              type: "literal",
              start: 11212,
              line: 361,
              col: 44,
              length: 6,
              contents: [],
              nodeId: 8867,
              specials: 0,
              precedingIgnored: []
            }, thing ],
            nodeId: 8866,
            precedingIgnored: [ {
              dir: "/Users/jbr/code/sibilant/include",
              file: "/Users/jbr/code/sibilant/include/macros.sibilant",
              token: " ",
              type: "whitespace",
              start: 11210,
              line: 361,
              col: 42,
              length: 1,
              contents: [],
              nodeId: 8865
            } ],
            specials: 0,
            end: undefined,
            closed: true,
            closingIgnored: []
          }, {"dir":"/Users/jbr/code/sibilant/include","file":"/Users/jbr/code/sibilant/include/macros.sibilant","token":"'","type":"tick","start":11227,"line":361,"col":59,"length":1,"contents":[{"dir":"/Users/jbr/code/sibilant/include","file":"/Users/jbr/code/sibilant/include/macros.sibilant","token":"undefined","type":"literal","start":11228,"line":361,"col":60,"length":9,"contents":[],"nodeId":8874,"specials":0,"precedingIgnored":[]}],"nodeId":8873,"precedingIgnored":[{"dir":"/Users/jbr/code/sibilant/include","file":"/Users/jbr/code/sibilant/include/macros.sibilant","token":" ","type":"whitespace","start":11226,"line":361,"col":58,"length":1,"contents":[],"nodeId":8872}]} ],
          nodeId: 8863,
          precedingIgnored: [],
          specials: 0,
          end: undefined,
          closed: true,
          closingIgnored: []
        };
      }))),
      nodeId: 8846,
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core["defined__QUERY"] = (function defined__QUERY$(things) {
    /* defined? /Users/jbr/code/sibilant/include/macros.sibilant:369:0 */
  
    var things = Array.prototype.slice.call(arguments, 0);
  
    return {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 11503,
      line: 370,
      col: 8,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "and",
        type: "literal",
        start: 11504,
        line: 370,
        col: 9,
        length: 3,
        contents: [],
        nodeId: 8934,
        specials: 0,
        precedingIgnored: []
      } ].concat(map(things, (function(thing) {
        /* /Users/jbr/code/sibilant/include/macros.sibilant:370:29 */
      
        return {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "(",
          type: "expression",
          start: 11535,
          line: 370,
          col: 40,
          length: 1,
          contents: [ {
            dir: "/Users/jbr/code/sibilant/include",
            file: "/Users/jbr/code/sibilant/include/macros.sibilant",
            token: "!=",
            type: "otherChar",
            start: 11536,
            line: 370,
            col: 41,
            length: 2,
            contents: [],
            nodeId: 8951,
            specials: 0,
            precedingIgnored: []
          }, {
            dir: "/Users/jbr/code/sibilant/include",
            file: "/Users/jbr/code/sibilant/include/macros.sibilant",
            token: "(",
            type: "expression",
            start: 11539,
            line: 370,
            col: 44,
            length: 1,
            contents: [ {
              dir: "/Users/jbr/code/sibilant/include",
              file: "/Users/jbr/code/sibilant/include/macros.sibilant",
              token: "typeof",
              type: "literal",
              start: 11540,
              line: 370,
              col: 45,
              length: 6,
              contents: [],
              nodeId: 8954,
              specials: 0,
              precedingIgnored: []
            }, thing ],
            nodeId: 8953,
            precedingIgnored: [ {
              dir: "/Users/jbr/code/sibilant/include",
              file: "/Users/jbr/code/sibilant/include/macros.sibilant",
              token: " ",
              type: "whitespace",
              start: 11538,
              line: 370,
              col: 43,
              length: 1,
              contents: [],
              nodeId: 8952
            } ],
            specials: 0,
            end: undefined,
            closed: true,
            closingIgnored: []
          }, {"dir":"/Users/jbr/code/sibilant/include","file":"/Users/jbr/code/sibilant/include/macros.sibilant","token":"'","type":"tick","start":11555,"line":370,"col":60,"length":1,"contents":[{"dir":"/Users/jbr/code/sibilant/include","file":"/Users/jbr/code/sibilant/include/macros.sibilant","token":"undefined","type":"literal","start":11556,"line":370,"col":61,"length":9,"contents":[],"nodeId":8961,"specials":0,"precedingIgnored":[]}],"nodeId":8960,"precedingIgnored":[{"dir":"/Users/jbr/code/sibilant/include","file":"/Users/jbr/code/sibilant/include/macros.sibilant","token":" ","type":"whitespace","start":11554,"line":370,"col":59,"length":1,"contents":[],"nodeId":8959}]} ],
          nodeId: 8950,
          precedingIgnored: [],
          specials: 0,
          end: undefined,
          closed: true,
          closingIgnored: []
        };
      }))),
      nodeId: 8933,
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core["number__QUERY"] = (function number__QUERY$(things) {
    /* number? /Users/jbr/code/sibilant/include/macros.sibilant:377:0 */
  
    var things = Array.prototype.slice.call(arguments, 0);
  
    return {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 11764,
      line: 378,
      col: 8,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "and",
        type: "literal",
        start: 11765,
        line: 378,
        col: 9,
        length: 3,
        contents: [],
        nodeId: 9022,
        specials: 0,
        precedingIgnored: []
      } ].concat(map(things, (function(thing) {
        /* /Users/jbr/code/sibilant/include/macros.sibilant:378:29 */
      
        return {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "(",
          type: "expression",
          start: 11796,
          line: 378,
          col: 40,
          length: 1,
          contents: [ {
            dir: "/Users/jbr/code/sibilant/include",
            file: "/Users/jbr/code/sibilant/include/macros.sibilant",
            token: "=",
            type: "otherChar",
            start: 11797,
            line: 378,
            col: 41,
            length: 1,
            contents: [],
            nodeId: 9039,
            specials: 0,
            precedingIgnored: []
          }, {
            dir: "/Users/jbr/code/sibilant/include",
            file: "/Users/jbr/code/sibilant/include/macros.sibilant",
            token: "(",
            type: "expression",
            start: 11799,
            line: 378,
            col: 43,
            length: 1,
            contents: [ {
              dir: "/Users/jbr/code/sibilant/include",
              file: "/Users/jbr/code/sibilant/include/macros.sibilant",
              token: "typeof",
              type: "literal",
              start: 11800,
              line: 378,
              col: 44,
              length: 6,
              contents: [],
              nodeId: 9042,
              specials: 0,
              precedingIgnored: []
            }, thing ],
            nodeId: 9041,
            precedingIgnored: [ {
              dir: "/Users/jbr/code/sibilant/include",
              file: "/Users/jbr/code/sibilant/include/macros.sibilant",
              token: " ",
              type: "whitespace",
              start: 11798,
              line: 378,
              col: 42,
              length: 1,
              contents: [],
              nodeId: 9040
            } ],
            specials: 0,
            end: undefined,
            closed: true,
            closingIgnored: []
          }, {"dir":"/Users/jbr/code/sibilant/include","file":"/Users/jbr/code/sibilant/include/macros.sibilant","token":"'","type":"tick","start":11815,"line":378,"col":59,"length":1,"contents":[{"dir":"/Users/jbr/code/sibilant/include","file":"/Users/jbr/code/sibilant/include/macros.sibilant","token":"number","type":"literal","start":11816,"line":378,"col":60,"length":6,"contents":[],"nodeId":9049,"specials":0,"precedingIgnored":[]}],"nodeId":9048,"precedingIgnored":[{"dir":"/Users/jbr/code/sibilant/include","file":"/Users/jbr/code/sibilant/include/macros.sibilant","token":" ","type":"whitespace","start":11814,"line":378,"col":58,"length":1,"contents":[],"nodeId":9047}]} ],
          nodeId: 9038,
          precedingIgnored: [],
          specials: 0,
          end: undefined,
          closed: true,
          closingIgnored: []
        };
      }))),
      nodeId: 9021,
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core.if = (function if$(arg, truebody, falsebody) {
    /* if /Users/jbr/code/sibilant/include/macros.sibilant:382:0 */
  
    return [ "(function() {", indent([ "if (", transpile(arg), ") {", indent({
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 11976,
      line: 385,
      col: 33,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "do",
        type: "literal",
        start: 11977,
        line: 385,
        col: 34,
        length: 2,
        contents: [],
        nodeId: 9098,
        specials: 0,
        precedingIgnored: []
      } ].concat(truebody),
      nodeId: 9097,
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    }), "} else {", indent({
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 12063,
      line: 387,
      col: 33,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "do",
        type: "literal",
        start: 12064,
        line: 387,
        col: 34,
        length: 2,
        contents: [],
        nodeId: 9115,
        specials: 0,
        precedingIgnored: []
      } ].concat(falsebody),
      nodeId: 9114,
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    }), "}" ]), "}).call(this)" ];
  });
  sibilant.macros.namespaces.core.pipe = (function pipe$(calls) {
    /* pipe /Users/jbr/code/sibilant/include/macros.sibilant:410:0 */
  
    var calls = Array.prototype.slice.call(arguments, 0);
  
    return inject(undefined, calls, (function(value, item) {
      /* /Users/jbr/code/sibilant/include/macros.sibilant:412:15 */
    
      return (function() {
        if (typeof value === "undefined") {
          return item;
        } else {
          return (function() {
            /* /Users/jbr/code/sibilant/include/macros.sibilant:414:21 */
          
            var cloned = (function() {
              if (node__QUERY(item, "literal", "dots")) {
                return {
                  dir: "/Users/jbr/code/sibilant/include",
                  file: "/Users/jbr/code/sibilant/include/macros.sibilant",
                  token: "(",
                  type: "expression",
                  start: 13178,
                  line: 416,
                  col: 39,
                  length: 1,
                  contents: [ item ],
                  nodeId: 9297,
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
            return mergeInto(cloned, { contents: [ cloned.contents[0], value ].concat(cloned.contents.slice(1)) });
          }).call(this);
        }
      }).call(this);
    }));
  });
  sibilant.macros.namespaces.core["|>"] = sibilant.macros.namespaces.core.pipe;
  sibilant.macros.namespaces.core.comment = (function comment$(contents) {
    /* comment /Users/jbr/code/sibilant/include/macros.sibilant:430:0 */
  
    var contents = Array.prototype.slice.call(arguments, 0);
  
    return map(contents, (function(content) {
      /* /Users/jbr/code/sibilant/include/macros.sibilant:431:21 */
    
      return [ "// ", recurseMap(transpile(content), (function(item) {
        /* /Users/jbr/code/sibilant/include/macros.sibilant:433:36 */
      
        return (item) ? outputFormatter(transpile(item)).replace((new RegExp("\n", "g")), "\n// ") : null;
      })) ];
    }));
  });
  sibilant.macros.namespaces.core["array__QUERY"] = (function array__QUERY$(thing) {
    /* array? /Users/jbr/code/sibilant/include/macros.sibilant:453:0 */
  
    var transpiled = transpile(thing);
    return [ "((", transpiled, ") && typeof (", transpiled, ") === \"object\" && (", transpiled, ").constructor.name === \"Array\")" ];
  });
  sibilant.macros.namespaces.core["list__QUERY"] = sibilant.macros.namespaces.core["array__QUERY"];
  sibilant.macros.namespaces.core["hash__QUERY"] = (function hash__QUERY$(thing) {
    /* hash? /Users/jbr/code/sibilant/include/macros.sibilant:465:0 */
  
    return {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 15078,
      line: 466,
      col: 8,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "and",
        type: "literal",
        start: 15079,
        line: 466,
        col: 9,
        length: 3,
        contents: [],
        nodeId: 9604,
        specials: 0,
        precedingIgnored: []
      }, {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 15083,
        line: 466,
        col: 13,
        length: 1,
        contents: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "=",
          type: "otherChar",
          start: 15084,
          line: 466,
          col: 14,
          length: 1,
          contents: [],
          nodeId: 9607,
          specials: 0,
          precedingIgnored: []
        }, {"dir":"/Users/jbr/code/sibilant/include","file":"/Users/jbr/code/sibilant/include/macros.sibilant","token":"'","type":"tick","start":15086,"line":466,"col":16,"length":1,"contents":[{"dir":"/Users/jbr/code/sibilant/include","file":"/Users/jbr/code/sibilant/include/macros.sibilant","token":"object","type":"literal","start":15087,"line":466,"col":17,"length":6,"contents":[],"nodeId":9610,"specials":0,"precedingIgnored":[]}],"nodeId":9609,"precedingIgnored":[{"dir":"/Users/jbr/code/sibilant/include","file":"/Users/jbr/code/sibilant/include/macros.sibilant","token":" ","type":"whitespace","start":15085,"line":466,"col":15,"length":1,"contents":[],"nodeId":9608}]}, {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "(",
          type: "expression",
          start: 15094,
          line: 466,
          col: 24,
          length: 1,
          contents: [ {
            dir: "/Users/jbr/code/sibilant/include",
            file: "/Users/jbr/code/sibilant/include/macros.sibilant",
            token: "typeof",
            type: "literal",
            start: 15095,
            line: 466,
            col: 25,
            length: 6,
            contents: [],
            nodeId: 9613,
            specials: 0,
            precedingIgnored: []
          }, thing ],
          nodeId: 9612,
          precedingIgnored: [ {
            dir: "/Users/jbr/code/sibilant/include",
            file: "/Users/jbr/code/sibilant/include/macros.sibilant",
            token: " ",
            type: "whitespace",
            start: 15093,
            line: 466,
            col: 23,
            length: 1,
            contents: [],
            nodeId: 9611
          } ],
          specials: 0,
          end: undefined,
          closed: true,
          closingIgnored: []
        } ],
        nodeId: 9606,
        precedingIgnored: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 15082,
          line: 466,
          col: 12,
          length: 1,
          contents: [],
          nodeId: 9605
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      }, {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 15124,
        line: 467,
        col: 13,
        length: 1,
        contents: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "!=",
          type: "otherChar",
          start: 15125,
          line: 467,
          col: 14,
          length: 2,
          contents: [],
          nodeId: 9622,
          specials: 0,
          precedingIgnored: []
        }, thing, {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "null",
          type: "literal",
          start: 15135,
          line: 467,
          col: 24,
          length: 4,
          contents: [],
          nodeId: 9627,
          specials: 0,
          precedingIgnored: [ {
            dir: "/Users/jbr/code/sibilant/include",
            file: "/Users/jbr/code/sibilant/include/macros.sibilant",
            token: " ",
            type: "whitespace",
            start: 15134,
            line: 467,
            col: 23,
            length: 1,
            contents: [],
            nodeId: 9626
          } ]
        } ],
        nodeId: 9621,
        precedingIgnored: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "\n",
          type: "newline",
          start: 15110,
          line: 466,
          col: 40,
          length: 1,
          contents: [],
          nodeId: 9619
        }, {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "             ",
          type: "whitespace",
          start: 15111,
          line: 467,
          col: 0,
          length: 13,
          contents: [],
          nodeId: 9620
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      }, {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 15154,
        line: 468,
        col: 13,
        length: 1,
        contents: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "!=",
          type: "otherChar",
          start: 15155,
          line: 468,
          col: 14,
          length: 2,
          contents: [],
          nodeId: 9632,
          specials: 0,
          precedingIgnored: []
        }, {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "(",
          type: "expression",
          start: 15158,
          line: 468,
          col: 17,
          length: 1,
          contents: [ {
            dir: "/Users/jbr/code/sibilant/include",
            file: "/Users/jbr/code/sibilant/include/macros.sibilant",
            token: "get",
            type: "literal",
            start: 15159,
            line: 468,
            col: 18,
            length: 3,
            contents: [],
            nodeId: 9635,
            specials: 0,
            precedingIgnored: []
          }, thing, {"dir":"/Users/jbr/code/sibilant/include","file":"/Users/jbr/code/sibilant/include/macros.sibilant","token":"'","type":"tick","start":15170,"line":468,"col":29,"length":1,"contents":[{"dir":"/Users/jbr/code/sibilant/include","file":"/Users/jbr/code/sibilant/include/macros.sibilant","token":"constructor","type":"literal","start":15171,"line":468,"col":30,"length":11,"contents":[],"nodeId":9641,"specials":0,"precedingIgnored":[]}],"nodeId":9640,"precedingIgnored":[{"dir":"/Users/jbr/code/sibilant/include","file":"/Users/jbr/code/sibilant/include/macros.sibilant","token":" ","type":"whitespace","start":15169,"line":468,"col":28,"length":1,"contents":[],"nodeId":9639}]}, {"dir":"/Users/jbr/code/sibilant/include","file":"/Users/jbr/code/sibilant/include/macros.sibilant","token":"'","type":"tick","start":15183,"line":468,"col":42,"length":1,"contents":[{"dir":"/Users/jbr/code/sibilant/include","file":"/Users/jbr/code/sibilant/include/macros.sibilant","token":"name","type":"literal","start":15184,"line":468,"col":43,"length":4,"contents":[],"nodeId":9644,"specials":0,"precedingIgnored":[]}],"nodeId":9643,"precedingIgnored":[{"dir":"/Users/jbr/code/sibilant/include","file":"/Users/jbr/code/sibilant/include/macros.sibilant","token":" ","type":"whitespace","start":15182,"line":468,"col":41,"length":1,"contents":[],"nodeId":9642}]} ],
          nodeId: 9634,
          precedingIgnored: [ {
            dir: "/Users/jbr/code/sibilant/include",
            file: "/Users/jbr/code/sibilant/include/macros.sibilant",
            token: " ",
            type: "whitespace",
            start: 15157,
            line: 468,
            col: 16,
            length: 1,
            contents: [],
            nodeId: 9633
          } ],
          specials: 0,
          end: undefined,
          closed: true,
          closingIgnored: []
        }, {"dir":"/Users/jbr/code/sibilant/include","file":"/Users/jbr/code/sibilant/include/macros.sibilant","token":"'","type":"tick","start":15190,"line":468,"col":49,"length":1,"contents":[{"dir":"/Users/jbr/code/sibilant/include","file":"/Users/jbr/code/sibilant/include/macros.sibilant","token":"Array","type":"literal","start":15191,"line":468,"col":50,"length":5,"contents":[],"nodeId":9648,"specials":0,"precedingIgnored":[]}],"nodeId":9647,"precedingIgnored":[{"dir":"/Users/jbr/code/sibilant/include","file":"/Users/jbr/code/sibilant/include/macros.sibilant","token":" ","type":"whitespace","start":15189,"line":468,"col":48,"length":1,"contents":[],"nodeId":9646}]} ],
        nodeId: 9631,
        precedingIgnored: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "\n",
          type: "newline",
          start: 15140,
          line: 467,
          col: 29,
          length: 1,
          contents: [],
          nodeId: 9629
        }, {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "             ",
          type: "whitespace",
          start: 15141,
          line: 468,
          col: 0,
          length: 13,
          contents: [],
          nodeId: 9630
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      } ],
      nodeId: 9603,
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core["object__QUERY"] = sibilant.macros.namespaces.core["hash__QUERY"];
  sibilant.macros.namespaces.core["_scopedWithoutReturn"] = (function _scopedWithoutReturn$(body) {
    /* *scoped-without-return /Users/jbr/code/sibilant/include/macros.sibilant:471:0 */
  
    var body = Array.prototype.slice.call(arguments, 0);
  
    return [ "(function() {", indent.apply(this, body), "}).call(this)" ];
  });
  sibilant.macros.namespaces.core["_scopedWithoutSource"] = (function _scopedWithoutSource$(body) {
    /* *scoped-without-source /Users/jbr/code/sibilant/include/macros.sibilant:475:0 */
  
    var body = Array.prototype.slice.call(arguments, 0);
  
    return {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 15378,
      line: 476,
      col: 8,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "*scoped-without-return",
        type: "literal",
        start: 15379,
        line: 476,
        col: 9,
        length: 22,
        contents: [],
        nodeId: 9702,
        specials: 0,
        precedingIgnored: []
      }, {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 15402,
        line: 476,
        col: 32,
        length: 1,
        contents: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "do",
          type: "literal",
          start: 15403,
          line: 476,
          col: 33,
          length: 2,
          contents: [],
          nodeId: 9705,
          specials: 0,
          precedingIgnored: []
        } ].concat(body),
        nodeId: 9704,
        precedingIgnored: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 15401,
          line: 476,
          col: 31,
          length: 1,
          contents: [],
          nodeId: 9703
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      } ],
      nodeId: 9701,
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core.when = (function when$(condition, body) {
    /* when /Users/jbr/code/sibilant/include/macros.sibilant:485:0 */
  
    var body = Array.prototype.slice.call(arguments, 1);
  
    return sibilant.macros.namespaces.core["_scopedWithoutReturn"]("if (", condition, ") {", indent({
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 15824,
      line: 488,
      col: 18,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "do",
        type: "literal",
        start: 15825,
        line: 488,
        col: 19,
        length: 2,
        contents: [],
        nodeId: 9797,
        specials: 0,
        precedingIgnored: []
      } ].concat(body),
      nodeId: 9796,
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    }), "}");
  });
  sibilant.macros.namespaces.core.not = (function not$(exp) {
    /* not /Users/jbr/code/sibilant/include/macros.sibilant:497:0 */
  
    return [ "!(", transpile(exp), ")" ];
  });
  sibilant.macros.namespaces.core.unless = (function unless$(condition, body) {
    /* unless /Users/jbr/code/sibilant/include/macros.sibilant:510:0 */
  
    var body = Array.prototype.slice.call(arguments, 1);
  
    return [ "(function() {", indent([ "if (", {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 16557,
      line: 512,
      col: 25,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "not",
        type: "literal",
        start: 16558,
        line: 512,
        col: 26,
        length: 3,
        contents: [],
        nodeId: 9951,
        specials: 0,
        precedingIgnored: []
      }, condition ],
      nodeId: 9950,
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    }, ") {", indent({
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 16613,
      line: 513,
      col: 33,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "do",
        type: "literal",
        start: 16614,
        line: 513,
        col: 34,
        length: 2,
        contents: [],
        nodeId: 9965,
        specials: 0,
        precedingIgnored: []
      } ].concat(body),
      nodeId: 9964,
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    }), "}" ]), "}).call(this)" ];
  });
  sibilant.macros.namespaces.core.assign = (function assign$(args) {
    /* assign /Users/jbr/code/sibilant/include/macros.sibilant:518:0 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    return interleave("\n", bulkMap(args, (function(name, value) {
      /* /Users/jbr/code/sibilant/include/macros.sibilant:520:28 */
    
      return asStatement([ transpile(name), " = ", transpile(value) ]);
    })));
  });
  sibilant.macros.namespaces.core.logPretty = (function logPretty$(label, arg) {
    /* log-pretty /Users/jbr/code/sibilant/include/macros.sibilant:532:0 */
  
    var node = this;
    (function() {
      if (typeof arg === "undefined") {
        arg = label;
        return label = [ "\"", prettify(label, false), "\"" ];
      }
    }).call(this);
    return {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 17436,
      line: 537,
      col: 8,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "console.log",
        type: "literal",
        start: 17437,
        line: 537,
        col: 9,
        length: 11,
        contents: [],
        nodeId: 10149,
        specials: 0,
        precedingIgnored: []
      }, {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 17449,
        line: 537,
        col: 21,
        length: 1,
        contents: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "concat",
          type: "literal",
          start: 17450,
          line: 537,
          col: 22,
          length: 6,
          contents: [],
          nodeId: 10152,
          specials: 0,
          precedingIgnored: []
        }, [ "\"", node.file, ":", node.line, "\"" ], {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "\" \"",
          type: "string",
          start: 17494,
          line: 537,
          col: 66,
          length: 3,
          contents: [],
          nodeId: 10167,
          specials: 0,
          precedingIgnored: [ {
            dir: "/Users/jbr/code/sibilant/include",
            file: "/Users/jbr/code/sibilant/include/macros.sibilant",
            token: " ",
            type: "whitespace",
            start: 17493,
            line: 537,
            col: 65,
            length: 1,
            contents: [],
            nodeId: 10166
          } ]
        }, label, {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "\" = \"",
          type: "string",
          start: 17505,
          line: 537,
          col: 77,
          length: 5,
          contents: [],
          nodeId: 10172,
          specials: 0,
          precedingIgnored: [ {
            dir: "/Users/jbr/code/sibilant/include",
            file: "/Users/jbr/code/sibilant/include/macros.sibilant",
            token: " ",
            type: "whitespace",
            start: 17504,
            line: 537,
            col: 76,
            length: 1,
            contents: [],
            nodeId: 10171
          } ]
        }, {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "(",
          type: "expression",
          start: 17511,
          line: 537,
          col: 83,
          length: 1,
          contents: [ {
            dir: "/Users/jbr/code/sibilant/include",
            file: "/Users/jbr/code/sibilant/include/macros.sibilant",
            token: "prettify",
            type: "literal",
            start: 17512,
            line: 537,
            col: 84,
            length: 8,
            contents: [],
            nodeId: 10175,
            specials: 0,
            precedingIgnored: []
          }, arg ],
          nodeId: 10174,
          precedingIgnored: [ {
            dir: "/Users/jbr/code/sibilant/include",
            file: "/Users/jbr/code/sibilant/include/macros.sibilant",
            token: " ",
            type: "whitespace",
            start: 17510,
            line: 537,
            col: 82,
            length: 1,
            contents: [],
            nodeId: 10173
          } ],
          specials: 0,
          end: undefined,
          closed: true,
          closingIgnored: []
        } ],
        nodeId: 10151,
        precedingIgnored: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 17448,
          line: 537,
          col: 20,
          length: 1,
          contents: [],
          nodeId: 10150
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      } ],
      nodeId: 10148,
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core.prettyLog = sibilant.macros.namespaces.core.logPretty;
  sibilant.macros.namespaces.core.each = (function each$(item, array, body) {
    /* each /Users/jbr/code/sibilant/include/macros.sibilant:550:17 */
  
    var body = Array.prototype.slice.call(arguments, 2);
  
    return {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 18306,
      line: 551,
      col: 8,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: ".",
        type: "dots",
        start: 18307,
        line: 551,
        col: 9,
        length: 1,
        contents: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "for-each",
          type: "literal",
          start: 18308,
          line: 551,
          col: 10,
          length: 8,
          contents: [],
          nodeId: 10318,
          specials: 0,
          precedingIgnored: []
        } ],
        nodeId: 10317,
        precedingIgnored: []
      }, array, {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 18343,
        line: 552,
        col: 19,
        length: 1,
        contents: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "lambda",
          type: "literal",
          start: 18344,
          line: 552,
          col: 20,
          length: 6,
          contents: [],
          nodeId: 10325,
          specials: 0,
          precedingIgnored: []
        }, {
          node: this,
          args: (function() {
            if (node__QUERY(item, "expression")) {
              return item;
            } else {
              return [ item ];
            }
          }).call(this)
        } ].concat(body),
        nodeId: 10324,
        precedingIgnored: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "\n",
          type: "newline",
          start: 18323,
          line: 551,
          col: 25,
          length: 1,
          contents: [],
          nodeId: 10322
        }, {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "                   ",
          type: "whitespace",
          start: 18324,
          line: 552,
          col: 0,
          length: 19,
          contents: [],
          nodeId: 10323
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      } ],
      nodeId: 10316,
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core.macroExpand = (function macroExpand$(name) {
    /* macro-expand /Users/jbr/code/sibilant/include/macros.sibilant:565:0 */
  
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
    /* throw /Users/jbr/code/sibilant/include/macros.sibilant:578:0 */
  
    return [ "throw ", transpile(error) ];
  });
  sibilant.macros.namespaces.core.asBoolean = (function asBoolean$(expr) {
    /* as-boolean /Users/jbr/code/sibilant/include/macros.sibilant:589:0 */
  
    return [ "(!!(", transpile(expr), "))" ];
  });
  sibilant.macros.namespaces.core.try = (function try$(tryblock, catchblock) {
    /* try /Users/jbr/code/sibilant/include/macros.sibilant:595:0 */
  
    return [ "(function() {", indent([ "try {", indent({
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 19276,
      line: 598,
      col: 26,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "do",
        type: "literal",
        start: 19277,
        line: 598,
        col: 27,
        length: 2,
        contents: [],
        nodeId: 10578,
        specials: 0,
        precedingIgnored: []
      }, tryblock ],
      nodeId: 10577,
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    }), "} catch (e) {", indent({
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 19351,
      line: 600,
      col: 26,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "do",
        type: "literal",
        start: 19352,
        line: 600,
        col: 27,
        length: 2,
        contents: [],
        nodeId: 10594,
        specials: 0,
        precedingIgnored: []
      }, catchblock ],
      nodeId: 10593,
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    }), "}" ]), "}).call(this)" ];
  });
  sibilant.macros.namespaces.core.state = (function state$(pairs) {
    /* state /Users/jbr/code/sibilant/include/macros.sibilant:612:0 */
  
    var pairs = Array.prototype.slice.call(arguments, 0);
  
    return (function() {
      if (1 === pairs.length) {
        return sibilant.state[outputFormatter(transpile(pairs[0]))];
      } else {
        bulkMap(pairs, (function(k, v) {
          /* /Users/jbr/code/sibilant/include/macros.sibilant:615:31 */
        
          return sibilant.state[outputFormatter(transpile(k))] = eval(outputFormatter(transpile(v)));
        }));
        return null;
      }
    }).call(this);
  });
  sibilant.macros.namespaces.core.symbol = (function symbol$() {
    /* symbol /Users/jbr/code/sibilant/include/macros.sibilant:621:0 */
  
    var symbolCount = (sibilant.state.symbolCount || 0),
        newSymbolCount = (1 + symbolCount);
    sibilant.macros.namespaces.core.state("symbolCount", newSymbolCount);
    return [ ("$_symbol" + newSymbolCount + "_$") ];
  });
  sibilant.macros.namespaces.core.while = (function while$(condition, body) {
    /* while /Users/jbr/code/sibilant/include/macros.sibilant:636:0 */
  
    var body = Array.prototype.slice.call(arguments, 1);
  
    var symbol = sibilant.macros.namespaces.core.symbol();
    return {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 20489,
      line: 638,
      col: 8,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "*scoped-without-source",
        type: "literal",
        start: 20490,
        line: 638,
        col: 9,
        length: 22,
        contents: [],
        nodeId: 10870,
        specials: 0,
        precedingIgnored: []
      }, {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 20522,
        line: 639,
        col: 9,
        length: 1,
        contents: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "var",
          type: "literal",
          start: 20523,
          line: 639,
          col: 10,
          length: 3,
          contents: [],
          nodeId: 10874,
          specials: 0,
          precedingIgnored: []
        }, symbol ],
        nodeId: 10873,
        precedingIgnored: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "\n",
          type: "newline",
          start: 20512,
          line: 638,
          col: 31,
          length: 1,
          contents: [],
          nodeId: 10871
        }, {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "         ",
          type: "whitespace",
          start: 20513,
          line: 639,
          col: 0,
          length: 9,
          contents: [],
          nodeId: 10872
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      }, {
        type: "output",
        contents: [ "while (", transpile(condition), ") {", indent({
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "(",
          type: "expression",
          start: 20659,
          line: 642,
          col: 35,
          length: 1,
          contents: [ {
            dir: "/Users/jbr/code/sibilant/include",
            file: "/Users/jbr/code/sibilant/include/macros.sibilant",
            token: "assign",
            type: "literal",
            start: 20660,
            line: 642,
            col: 36,
            length: 6,
            contents: [],
            nodeId: 10909,
            specials: 0,
            precedingIgnored: []
          }, symbol, {
            dir: "/Users/jbr/code/sibilant/include",
            file: "/Users/jbr/code/sibilant/include/macros.sibilant",
            token: "(",
            type: "expression",
            start: 20675,
            line: 642,
            col: 51,
            length: 1,
            contents: [ {
              dir: "/Users/jbr/code/sibilant/include",
              file: "/Users/jbr/code/sibilant/include/macros.sibilant",
              token: "*scoped-without-source",
              type: "literal",
              start: 20676,
              line: 642,
              col: 52,
              length: 22,
              contents: [],
              nodeId: 10915,
              specials: 0,
              precedingIgnored: []
            } ].concat(body),
            nodeId: 10914,
            precedingIgnored: [ {
              dir: "/Users/jbr/code/sibilant/include",
              file: "/Users/jbr/code/sibilant/include/macros.sibilant",
              token: " ",
              type: "whitespace",
              start: 20674,
              line: 642,
              col: 50,
              length: 1,
              contents: [],
              nodeId: 10913
            } ],
            specials: 0,
            end: undefined,
            closed: true,
            closingIgnored: []
          } ],
          nodeId: 10908,
          precedingIgnored: [],
          specials: 0,
          end: undefined,
          closed: true,
          closingIgnored: []
        }), "}" ]
      }, symbol ],
      nodeId: 10869,
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core.until = (function until$(condition, body) {
    /* until /Users/jbr/code/sibilant/include/macros.sibilant:655:0 */
  
    var body = Array.prototype.slice.call(arguments, 1);
  
    return {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 21068,
      line: 656,
      col: 8,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "while",
        type: "literal",
        start: 21069,
        line: 656,
        col: 9,
        length: 5,
        contents: [],
        nodeId: 10999,
        specials: 0,
        precedingIgnored: []
      }, {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 21075,
        line: 656,
        col: 15,
        length: 1,
        contents: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "not",
          type: "literal",
          start: 21076,
          line: 656,
          col: 16,
          length: 3,
          contents: [],
          nodeId: 11002,
          specials: 0,
          precedingIgnored: []
        }, condition ],
        nodeId: 11001,
        precedingIgnored: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 21074,
          line: 656,
          col: 14,
          length: 1,
          contents: [],
          nodeId: 11000
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      } ].concat(body),
      nodeId: 10998,
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core["match__QUERY"] = (function match__QUERY$(regexp, string) {
    /* match? /Users/jbr/code/sibilant/include/macros.sibilant:665:0 */
  
    return {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 21349,
      line: 666,
      col: 8,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: ".",
        type: "dots",
        start: 21350,
        line: 666,
        col: 9,
        length: 1,
        contents: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "match",
          type: "literal",
          start: 21351,
          line: 666,
          col: 10,
          length: 5,
          contents: [],
          nodeId: 11068,
          specials: 0,
          precedingIgnored: []
        } ],
        nodeId: 11067,
        precedingIgnored: []
      }, string, regexp ],
      nodeId: 11066,
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core["matchRegex__QUERY"] = (function matchRegex__QUERY$(string, pattern, flags) {
    /* match-regex? /Users/jbr/code/sibilant/include/macros.sibilant:671:0 */
  
    return {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 21585,
      line: 672,
      col: 8,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "match?",
        type: "literal",
        start: 21586,
        line: 672,
        col: 9,
        length: 6,
        contents: [],
        nodeId: 11125,
        specials: 0,
        precedingIgnored: []
      }, {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 21593,
        line: 672,
        col: 16,
        length: 1,
        contents: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "regex",
          type: "literal",
          start: 21594,
          line: 672,
          col: 17,
          length: 5,
          contents: [],
          nodeId: 11128,
          specials: 0,
          precedingIgnored: []
        }, pattern, flags ],
        nodeId: 11127,
        precedingIgnored: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 21592,
          line: 672,
          col: 15,
          length: 1,
          contents: [],
          nodeId: 11126
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      }, string ],
      nodeId: 11124,
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core.replace = (function replace$(string, pattern, replacement) {
    /* replace /Users/jbr/code/sibilant/include/macros.sibilant:678:0 */
  
    return {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 21847,
      line: 679,
      col: 8,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: ".",
        type: "dots",
        start: 21848,
        line: 679,
        col: 9,
        length: 1,
        contents: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "replace",
          type: "literal",
          start: 21849,
          line: 679,
          col: 10,
          length: 7,
          contents: [],
          nodeId: 11190,
          specials: 0,
          precedingIgnored: []
        } ],
        nodeId: 11189,
        precedingIgnored: []
      }, string, {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 21879,
        line: 680,
        col: 14,
        length: 1,
        contents: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "regex",
          type: "literal",
          start: 21880,
          line: 680,
          col: 15,
          length: 5,
          contents: [],
          nodeId: 11197,
          specials: 0,
          precedingIgnored: []
        }, pattern ],
        nodeId: 11196,
        precedingIgnored: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "\n",
          type: "newline",
          start: 21864,
          line: 679,
          col: 25,
          length: 1,
          contents: [],
          nodeId: 11194
        }, {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "              ",
          type: "whitespace",
          start: 21865,
          line: 680,
          col: 0,
          length: 14,
          contents: [],
          nodeId: 11195
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      }, replacement ],
      nodeId: 11188,
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core.replaceAll = (function replaceAll$(string, pattern, replacement) {
    /* replace-all /Users/jbr/code/sibilant/include/macros.sibilant:686:0 */
  
    return {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 22144,
      line: 687,
      col: 8,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: ".",
        type: "dots",
        start: 22145,
        line: 687,
        col: 9,
        length: 1,
        contents: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "replace",
          type: "literal",
          start: 22146,
          line: 687,
          col: 10,
          length: 7,
          contents: [],
          nodeId: 11256,
          specials: 0,
          precedingIgnored: []
        } ],
        nodeId: 11255,
        precedingIgnored: []
      }, string, {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 22162,
        line: 687,
        col: 26,
        length: 1,
        contents: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "regex",
          type: "literal",
          start: 22163,
          line: 687,
          col: 27,
          length: 5,
          contents: [],
          nodeId: 11262,
          specials: 0,
          precedingIgnored: []
        }, pattern, {"dir":"/Users/jbr/code/sibilant/include","file":"/Users/jbr/code/sibilant/include/macros.sibilant","token":"'","type":"tick","start":22178,"line":687,"col":42,"length":1,"contents":[{"dir":"/Users/jbr/code/sibilant/include","file":"/Users/jbr/code/sibilant/include/macros.sibilant","token":"g","type":"literal","start":22179,"line":687,"col":43,"length":1,"contents":[],"nodeId":11268,"specials":0,"precedingIgnored":[]}],"nodeId":11267,"precedingIgnored":[{"dir":"/Users/jbr/code/sibilant/include","file":"/Users/jbr/code/sibilant/include/macros.sibilant","token":" ","type":"whitespace","start":22177,"line":687,"col":41,"length":1,"contents":[],"nodeId":11266}]} ],
        nodeId: 11261,
        precedingIgnored: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 22161,
          line: 687,
          col: 25,
          length: 1,
          contents: [],
          nodeId: 11260
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      }, replacement ],
      nodeId: 11254,
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core.thunk = (function thunk$(body) {
    /* thunk /Users/jbr/code/sibilant/include/macros.sibilant:700:0 */
  
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
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 22767,
      line: 708,
      col: 8,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "lambda",
        type: "literal",
        start: 22768,
        line: 708,
        col: 9,
        length: 6,
        contents: [],
        nodeId: 11435,
        specials: 0,
        precedingIgnored: []
      }, lambdaOptions ].concat(mapNode(body, (function(node) {
        /* /Users/jbr/code/sibilant/include/macros.sibilant:710:17 */
      
        return (function() {
          if (node__QUERY(node, "argPlaceholder")) {
            return {
              dir: "/Users/jbr/code/sibilant/include",
              file: "/Users/jbr/code/sibilant/include/macros.sibilant",
              token: "(",
              type: "expression",
              start: 22920,
              line: 712,
              col: 24,
              length: 1,
              contents: [ {
                dir: "/Users/jbr/code/sibilant/include",
                file: "/Users/jbr/code/sibilant/include/macros.sibilant",
                token: "argument",
                type: "literal",
                start: 22921,
                line: 712,
                col: 25,
                length: 8,
                contents: [],
                nodeId: 11471,
                specials: 0,
                precedingIgnored: []
              }, node.token.replace((new RegExp("^#", undefined)), "") ],
              nodeId: 11470,
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
      nodeId: 11434,
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core["#>"] = sibilant.macros.namespaces.core.thunk;
  sibilant.macros.namespaces.core.pipeThunk = (function pipeThunk$(calls) {
    /* pipe-thunk /Users/jbr/code/sibilant/include/macros.sibilant:723:0 */
  
    var calls = Array.prototype.slice.call(arguments, 0);
  
    return {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 23301,
      line: 723,
      col: 30,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "thunk",
        type: "literal",
        start: 23302,
        line: 723,
        col: 31,
        length: 5,
        contents: [],
        nodeId: 11571,
        specials: 0,
        precedingIgnored: []
      }, { node: this }, {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 23323,
        line: 723,
        col: 52,
        length: 1,
        contents: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "pipe",
          type: "literal",
          start: 23324,
          line: 723,
          col: 53,
          length: 4,
          contents: [],
          nodeId: 11583,
          specials: 0,
          precedingIgnored: []
        }, {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "#0",
          type: "argPlaceholder",
          start: 23329,
          line: 723,
          col: 58,
          length: 2,
          contents: [],
          nodeId: 11585,
          specials: 0,
          precedingIgnored: [ {
            dir: "/Users/jbr/code/sibilant/include",
            file: "/Users/jbr/code/sibilant/include/macros.sibilant",
            token: " ",
            type: "whitespace",
            start: 23328,
            line: 723,
            col: 57,
            length: 1,
            contents: [],
            nodeId: 11584
          } ]
        } ].concat(calls),
        nodeId: 11582,
        precedingIgnored: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 23322,
          line: 723,
          col: 51,
          length: 1,
          contents: [],
          nodeId: 11581
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      } ],
      nodeId: 11570,
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core["#->"] = sibilant.macros.namespaces.core.pipeThunk;
  sibilant.macros.namespaces.core.keys = (function keys$(obj) {
    /* keys /Users/jbr/code/sibilant/include/macros.sibilant:735:0 */
  
    return {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 23635,
      line: 736,
      col: 8,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "Object.keys",
        type: "literal",
        start: 23636,
        line: 736,
        col: 9,
        length: 11,
        contents: [],
        nodeId: 11664,
        specials: 0,
        precedingIgnored: []
      }, obj ],
      nodeId: 11663,
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core.delete = (function delete$(objects) {
    /* delete /Users/jbr/code/sibilant/include/macros.sibilant:748:0 */
  
    var objects = Array.prototype.slice.call(arguments, 0);
  
    return interleave("\n", map(objects, (function(obj) {
      /* /Users/jbr/code/sibilant/include/macros.sibilant:749:37 */
    
      return asStatement([ "delete ", transpile(obj) ]);
    })));
  });
  sibilant.macros.namespaces.core.deleteMacro = (function deleteMacro$(macroNames) {
    /* delete-macro /Users/jbr/code/sibilant/include/macros.sibilant:760:0 */
  
    var macroNames = Array.prototype.slice.call(arguments, 0);
  
    macroNames.forEach((function(macroName) {
      /* /Users/jbr/code/sibilant/include/macros.sibilant:761:7 */
    
      return delete sibilant.macros.namespace[outputFormatter(transpile(macroName))];
    }));
    return null;
  });
  sibilant.macros.namespaces.core.delmacro = sibilant.macros.namespaces.core.deleteMacro;
  sibilant.macros.namespaces.core.renameMacro = (function renameMacro$(currentMacroName, newMacroName) {
    /* rename-macro /Users/jbr/code/sibilant/include/macros.sibilant:773:0 */
  
    sibilant.macros.namespaces.core.aliasMacro(currentMacroName, newMacroName);
    sibilant.macros.namespaces.core.deleteMacro(currentMacroName);
    return null;
  });
  sibilant.macros.namespaces.core.arguments = (function arguments$() {
    /* arguments /Users/jbr/code/sibilant/include/macros.sibilant:788:0 */
  
    return [ "(Array.prototype.slice.apply(arguments))" ];
  });
  sibilant.macros.namespaces.core.argument = (function argument$(index) {
    /* argument /Users/jbr/code/sibilant/include/macros.sibilant:800:0 */
  
    return {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 25221,
      line: 801,
      col: 8,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "get",
        type: "literal",
        start: 25222,
        line: 801,
        col: 9,
        length: 3,
        contents: [],
        nodeId: 11985,
        specials: 0,
        precedingIgnored: []
      }, {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "arguments",
        type: "literal",
        start: 25226,
        line: 801,
        col: 13,
        length: 9,
        contents: [],
        nodeId: 11987,
        specials: 0,
        precedingIgnored: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 25225,
          line: 801,
          col: 12,
          length: 1,
          contents: [],
          nodeId: 11986
        } ]
      }, index ],
      nodeId: 11984,
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core.eachKey = (function eachKey$(as, obj, body) {
    /* each-key /Users/jbr/code/sibilant/include/macros.sibilant:809:0 */
  
    var body = Array.prototype.slice.call(arguments, 2);
  
    return {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 25429,
      line: 810,
      col: 8,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "pipe",
        type: "literal",
        start: 25430,
        line: 810,
        col: 9,
        length: 4,
        contents: [],
        nodeId: 12057,
        specials: 0,
        precedingIgnored: []
      }, obj, {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 25440,
        line: 810,
        col: 19,
        length: 1,
        contents: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "keys",
          type: "literal",
          start: 25441,
          line: 810,
          col: 20,
          length: 4,
          contents: [],
          nodeId: 12063,
          specials: 0,
          precedingIgnored: []
        } ],
        nodeId: 12062,
        precedingIgnored: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 25439,
          line: 810,
          col: 18,
          length: 1,
          contents: [],
          nodeId: 12061
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      }, {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 25461,
        line: 811,
        col: 14,
        length: 1,
        contents: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: ".",
          type: "dots",
          start: 25462,
          line: 811,
          col: 15,
          length: 1,
          contents: [ {
            dir: "/Users/jbr/code/sibilant/include",
            file: "/Users/jbr/code/sibilant/include/macros.sibilant",
            token: "for-each",
            type: "literal",
            start: 25463,
            line: 811,
            col: 16,
            length: 8,
            contents: [],
            nodeId: 12069,
            specials: 0,
            precedingIgnored: []
          } ],
          nodeId: 12068,
          precedingIgnored: []
        }, {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "(",
          type: "expression",
          start: 25472,
          line: 811,
          col: 25,
          length: 1,
          contents: [ {
            dir: "/Users/jbr/code/sibilant/include",
            file: "/Users/jbr/code/sibilant/include/macros.sibilant",
            token: "lambda",
            type: "literal",
            start: 25473,
            line: 811,
            col: 26,
            length: 6,
            contents: [],
            nodeId: 12072,
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
          nodeId: 12071,
          precedingIgnored: [ {
            dir: "/Users/jbr/code/sibilant/include",
            file: "/Users/jbr/code/sibilant/include/macros.sibilant",
            token: " ",
            type: "whitespace",
            start: 25471,
            line: 811,
            col: 24,
            length: 1,
            contents: [],
            nodeId: 12070
          } ],
          specials: 0,
          end: undefined,
          closed: true,
          closingIgnored: []
        } ],
        nodeId: 12067,
        precedingIgnored: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "\n",
          type: "newline",
          start: 25446,
          line: 810,
          col: 25,
          length: 1,
          contents: [],
          nodeId: 12065
        }, {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "              ",
          type: "whitespace",
          start: 25447,
          line: 811,
          col: 0,
          length: 14,
          contents: [],
          nodeId: 12066
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      } ],
      nodeId: 12056,
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core.switch = (function switch$(obj, cases) {
    /* switch /Users/jbr/code/sibilant/include/macros.sibilant:832:0 */
  
    var cases = Array.prototype.slice.call(arguments, 1);
  
    return [ "(function() {", indent([ "switch(", transpile(obj), ") {", map(cases, (function(caseDef) {
      /* /Users/jbr/code/sibilant/include/macros.sibilant:835:30 */
    
      var caseNameNode = caseDef.contents[0],
          caseLabels = (function() {
        if (node__QUERY(caseNameNode, "expression", "bracket")) {
          return caseNameNode.contents;
        } else {
          return [ caseNameNode ];
        }
      }).call(this),
          caseString = interleave("\n", map(caseLabels, (function(c) {
        /* /Users/jbr/code/sibilant/include/macros.sibilant:841:78 */
      
        return (function() {
          if ("default" === c.token) {
            return "default:";
          } else {
            return [ "case ", transpile(c), ":" ];
          }
        }).call(this);
      })));
      return [ "\n", caseString, indent({
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 27118,
        line: 845,
        col: 59,
        length: 1,
        contents: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "do",
          type: "literal",
          start: 27119,
          line: 845,
          col: 60,
          length: 2,
          contents: [],
          nodeId: 12351,
          specials: 0,
          precedingIgnored: []
        } ].concat(caseDef.contents.slice(1)),
        nodeId: 12350,
        precedingIgnored: [],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      }) ];
    })), "}" ]), "}).call(this)" ];
  });
  sibilant.macros.namespaces.core.if = (function if$(alternatingConditionsAndBranches) {
    /* if /Users/jbr/code/sibilant/include/macros.sibilant:877:0 */
  
    var alternatingConditionsAndBranches = Array.prototype.slice.call(arguments, 0);
  
    return [ "(function() {", indent(interleave(" else ", bulkMap(alternatingConditionsAndBranches, (function(cond, val) {
      /* /Users/jbr/code/sibilant/include/macros.sibilant:882:25 */
    
      return (function() {
        if (typeof val !== "undefined") {
          return [ "if (", transpile(cond), ") {", indent({
            dir: "/Users/jbr/code/sibilant/include",
            file: "/Users/jbr/code/sibilant/include/macros.sibilant",
            token: "(",
            type: "expression",
            start: 28394,
            line: 885,
            col: 44,
            length: 1,
            contents: [ {
              dir: "/Users/jbr/code/sibilant/include",
              file: "/Users/jbr/code/sibilant/include/macros.sibilant",
              token: "do",
              type: "literal",
              start: 28395,
              line: 885,
              col: 45,
              length: 2,
              contents: [],
              nodeId: 12605,
              specials: 0,
              precedingIgnored: []
            }, val ],
            nodeId: 12604,
            precedingIgnored: [],
            specials: 0,
            end: undefined,
            closed: true,
            closingIgnored: []
          }), "}" ];
        } else {
          return [ "{", indent({
            dir: "/Users/jbr/code/sibilant/include",
            file: "/Users/jbr/code/sibilant/include/macros.sibilant",
            token: "(",
            type: "expression",
            start: 28492,
            line: 887,
            col: 47,
            length: 1,
            contents: [ {
              dir: "/Users/jbr/code/sibilant/include",
              file: "/Users/jbr/code/sibilant/include/macros.sibilant",
              token: "do",
              type: "literal",
              start: 28493,
              line: 887,
              col: 48,
              length: 2,
              contents: [],
              nodeId: 12625,
              specials: 0,
              precedingIgnored: []
            }, cond ],
            nodeId: 12624,
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
  sibilant.macros.namespaces.core.chain = (function chain$(object, calls) {
    /* chain /Users/jbr/code/sibilant/include/macros.sibilant:906:0 */
  
    var calls = Array.prototype.slice.call(arguments, 1);
  
    console.log("DEPRECATION WARNING: DO NOT USE CHAIN");
    console.log(("  " + this.file + ":" + this.line + ":" + this.col));
    return (function() {
      if (0 === calls.length) {
        return transpile(object);
      } else if (1 === calls.length) {
        return {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "(",
          type: "expression",
          start: 29035,
          line: 910,
          col: 31,
          length: 1,
          contents: [ {
            dir: "/Users/jbr/code/sibilant/include",
            file: "/Users/jbr/code/sibilant/include/macros.sibilant",
            token: "send",
            type: "literal",
            start: 29036,
            line: 910,
            col: 32,
            length: 4,
            contents: [],
            nodeId: 12733,
            specials: 0,
            precedingIgnored: []
          }, object ].concat(calls[0].contents),
          nodeId: 12732,
          precedingIgnored: [],
          specials: 0,
          end: undefined,
          closed: true,
          closingIgnored: []
        };
      } else {
        var lines = map(calls, (function(call, index) {
          /* /Users/jbr/code/sibilant/include/macros.sibilant:912:34 */
        
          return [ ".", transpile(call.contents[0]), "(", interleave(", ", map(call.contents.slice(1), transpile)), ")" ];
        }));
        return [ transpile(object), lines[0], "\n  ", recurseIndent(interleave("\n", lines.slice(1))) ];
      }
    }).call(this);
  });
  sibilant.macros.namespaces.core["instanceOf__QUERY"] = (function instanceOf__QUERY$(item, type) {
    /* instance-of? /Users/jbr/code/sibilant/include/macros.sibilant:931:0 */
  
    return [ "(", transpile(item), " instanceof ", transpile(type), ")" ];
  });
  sibilant.macros.namespaces.core["includes__QUERY"] = (function includes__QUERY$(haystack, needle) {
    /* includes? /Users/jbr/code/sibilant/include/macros.sibilant:942:0 */
  
    return {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 30014,
      line: 943,
      col: 8,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "pipe",
        type: "literal",
        start: 30015,
        line: 943,
        col: 9,
        length: 4,
        contents: [],
        nodeId: 12999,
        specials: 0,
        precedingIgnored: []
      }, haystack, {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 30030,
        line: 943,
        col: 24,
        length: 1,
        contents: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: ".",
          type: "dots",
          start: 30031,
          line: 943,
          col: 25,
          length: 1,
          contents: [ {
            dir: "/Users/jbr/code/sibilant/include",
            file: "/Users/jbr/code/sibilant/include/macros.sibilant",
            token: "index-of",
            type: "literal",
            start: 30032,
            line: 943,
            col: 26,
            length: 8,
            contents: [],
            nodeId: 13006,
            specials: 0,
            precedingIgnored: []
          } ],
          nodeId: 13005,
          precedingIgnored: []
        }, needle ],
        nodeId: 13004,
        precedingIgnored: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 30029,
          line: 943,
          col: 23,
          length: 1,
          contents: [],
          nodeId: 13003
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      }, {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 30050,
        line: 943,
        col: 44,
        length: 1,
        contents: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "!=",
          type: "otherChar",
          start: 30051,
          line: 943,
          col: 45,
          length: 2,
          contents: [],
          nodeId: 13013,
          specials: 0,
          precedingIgnored: []
        }, {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "-1",
          type: "number",
          start: 30054,
          line: 943,
          col: 48,
          length: 2,
          contents: [],
          nodeId: 13015,
          specials: 0,
          precedingIgnored: [ {
            dir: "/Users/jbr/code/sibilant/include",
            file: "/Users/jbr/code/sibilant/include/macros.sibilant",
            token: " ",
            type: "whitespace",
            start: 30053,
            line: 943,
            col: 47,
            length: 1,
            contents: [],
            nodeId: 13014
          } ]
        } ],
        nodeId: 13012,
        precedingIgnored: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 30049,
          line: 943,
          col: 43,
          length: 1,
          contents: [],
          nodeId: 13011
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      } ],
      nodeId: 12998,
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core["excludes__QUERY"] = (function excludes__QUERY$(haystack, needle) {
    /* excludes? /Users/jbr/code/sibilant/include/macros.sibilant:955:0 */
  
    return {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 30327,
      line: 956,
      col: 8,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "pipe",
        type: "literal",
        start: 30328,
        line: 956,
        col: 9,
        length: 4,
        contents: [],
        nodeId: 13089,
        specials: 0,
        precedingIgnored: []
      }, haystack, {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 30343,
        line: 956,
        col: 24,
        length: 1,
        contents: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: ".",
          type: "dots",
          start: 30344,
          line: 956,
          col: 25,
          length: 1,
          contents: [ {
            dir: "/Users/jbr/code/sibilant/include",
            file: "/Users/jbr/code/sibilant/include/macros.sibilant",
            token: "index-of",
            type: "literal",
            start: 30345,
            line: 956,
            col: 26,
            length: 8,
            contents: [],
            nodeId: 13096,
            specials: 0,
            precedingIgnored: []
          } ],
          nodeId: 13095,
          precedingIgnored: []
        }, needle ],
        nodeId: 13094,
        precedingIgnored: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 30342,
          line: 956,
          col: 23,
          length: 1,
          contents: [],
          nodeId: 13093
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      }, {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 30363,
        line: 956,
        col: 44,
        length: 1,
        contents: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "=",
          type: "otherChar",
          start: 30364,
          line: 956,
          col: 45,
          length: 1,
          contents: [],
          nodeId: 13103,
          specials: 0,
          precedingIgnored: []
        }, {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "-1",
          type: "number",
          start: 30366,
          line: 956,
          col: 47,
          length: 2,
          contents: [],
          nodeId: 13105,
          specials: 0,
          precedingIgnored: [ {
            dir: "/Users/jbr/code/sibilant/include",
            file: "/Users/jbr/code/sibilant/include/macros.sibilant",
            token: " ",
            type: "whitespace",
            start: 30365,
            line: 956,
            col: 46,
            length: 1,
            contents: [],
            nodeId: 13104
          } ]
        } ],
        nodeId: 13102,
        precedingIgnored: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 30362,
          line: 956,
          col: 43,
          length: 1,
          contents: [],
          nodeId: 13101
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      } ],
      nodeId: 13088,
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core["exists__QUERY"] = (function exists__QUERY$(thing) {
    /* exists? /Users/jbr/code/sibilant/include/macros.sibilant:966:0 */
  
    return {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 30581,
      line: 967,
      col: 8,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "and",
        type: "literal",
        start: 30582,
        line: 967,
        col: 9,
        length: 3,
        contents: [],
        nodeId: 13150,
        specials: 0,
        precedingIgnored: []
      }, {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 30586,
        line: 967,
        col: 13,
        length: 1,
        contents: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "defined?",
          type: "literal",
          start: 30587,
          line: 967,
          col: 14,
          length: 8,
          contents: [],
          nodeId: 13153,
          specials: 0,
          precedingIgnored: []
        }, thing ],
        nodeId: 13152,
        precedingIgnored: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 30585,
          line: 967,
          col: 12,
          length: 1,
          contents: [],
          nodeId: 13151
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      }, {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 30604,
        line: 967,
        col: 31,
        length: 1,
        contents: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "!=",
          type: "otherChar",
          start: 30605,
          line: 967,
          col: 32,
          length: 2,
          contents: [],
          nodeId: 13160,
          specials: 0,
          precedingIgnored: []
        }, thing, {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "null",
          type: "literal",
          start: 30615,
          line: 967,
          col: 42,
          length: 4,
          contents: [],
          nodeId: 13165,
          specials: 0,
          precedingIgnored: [ {
            dir: "/Users/jbr/code/sibilant/include",
            file: "/Users/jbr/code/sibilant/include/macros.sibilant",
            token: " ",
            type: "whitespace",
            start: 30614,
            line: 967,
            col: 41,
            length: 1,
            contents: [],
            nodeId: 13164
          } ]
        } ],
        nodeId: 13159,
        precedingIgnored: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 30603,
          line: 967,
          col: 30,
          length: 1,
          contents: [],
          nodeId: 13158
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      } ],
      nodeId: 13149,
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core.withState = (function withState$(k, v, body) {
    /* with-state /Users/jbr/code/sibilant/include/macros.sibilant:973:0 */
  
    var body = Array.prototype.slice.call(arguments, 2);
  
    var before = sibilant.macros.namespaces.core.state(k);
    sibilant.macros.namespaces.core.state(k, v);
    var returnValue = interleave("\n", map(body, transpile));
    sibilant.macros.namespaces.core.state(k, before);
    return returnValue;
  });
  sibilant.macros.namespaces.core.join = (function join$(arr, glue) {
    /* join /Users/jbr/code/sibilant/include/macros.sibilant:995:0 */
  
    (function() {
      if ((typeof glue !== "undefined" && typeof arr === "undefined")) {
        arr = glue;
        return glue = undefined;
      }
    }).call(this);
    return {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 31315,
      line: 998,
      col: 8,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: ".",
        type: "dots",
        start: 31316,
        line: 998,
        col: 9,
        length: 1,
        contents: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "join",
          type: "literal",
          start: 31317,
          line: 998,
          col: 10,
          length: 4,
          contents: [],
          nodeId: 13364,
          specials: 0,
          precedingIgnored: []
        } ],
        nodeId: 13363,
        precedingIgnored: []
      }, arr, (glue || "\"\"") ],
      nodeId: 13362,
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core["_destructure"] = (function _destructure$(pairs) {
    /* *destructure /Users/jbr/code/sibilant/include/macros.sibilant:1003:0 */
  
    var destructured = [];
    bulkMap(pairs, (function(lhs, rhs) {
      /* /Users/jbr/code/sibilant/include/macros.sibilant:1005:21 */
    
      var transpiledRhs = transpile(rhs);
      return (function() {
        switch(lhs.type) {
        case "bracket":
          var literalRhs__QUERY = outputFormatter(transpiledRhs).match((new RegExp("^[\._a-zA-Z0-9]+$", undefined))),
              source = (function() {
            if (literalRhs__QUERY) {
              return transpiledRhs;
            } else {
              var symbol = sibilant.macros.namespaces.core.symbol();
              destructured.push([ symbol, transpiledRhs ]);
              return symbol;
            }
          }).call(this);
          lhs.contents.forEach((function(item, index) {
            /* /Users/jbr/code/sibilant/include/macros.sibilant:1015:32 */
          
            return destructured.push([ transpile(item), {
              dir: "/Users/jbr/code/sibilant/include",
              file: "/Users/jbr/code/sibilant/include/macros.sibilant",
              token: "(",
              type: "expression",
              start: 32273,
              line: 1016,
              col: 76,
              length: 1,
              contents: [ {
                dir: "/Users/jbr/code/sibilant/include",
                file: "/Users/jbr/code/sibilant/include/macros.sibilant",
                token: "get",
                type: "literal",
                start: 32274,
                line: 1016,
                col: 77,
                length: 3,
                contents: [],
                nodeId: 13531,
                specials: 0,
                precedingIgnored: []
              }, source, index ],
              nodeId: 13530,
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
            } else {
              var symbol = sibilant.macros.namespaces.core.symbol();
              destructured.push([ symbol, transpiledRhs ]);
              return symbol;
            }
          }).call(this);
          lhs.contents.forEach((function(item, index) {
            /* /Users/jbr/code/sibilant/include/macros.sibilant:1026:32 */
          
            var trItem = transpile(item);
            return destructured.push([ trItem, {
              dir: "/Users/jbr/code/sibilant/include",
              file: "/Users/jbr/code/sibilant/include/macros.sibilant",
              token: "(",
              type: "expression",
              start: 33224,
              line: 1028,
              col: 67,
              length: 1,
              contents: [ {
                dir: "/Users/jbr/code/sibilant/include",
                file: "/Users/jbr/code/sibilant/include/macros.sibilant",
                token: "get",
                type: "literal",
                start: 33225,
                line: 1028,
                col: 68,
                length: 3,
                contents: [],
                nodeId: 13667,
                specials: 0,
                precedingIgnored: []
              }, source, [ "\"", trItem, "\"" ] ],
              nodeId: 13666,
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
  sibilant.macros.namespaces.core.var = (function var$(pairs) {
    /* var /Users/jbr/code/sibilant/include/macros.sibilant:1047:0 */
  
    var pairs = Array.prototype.slice.call(arguments, 0);
  
    return asStatement([ "var ", interleave(map(sibilant.macros.namespaces.core["_destructure"](pairs), (function(pair) {
      /* /Users/jbr/code/sibilant/include/macros.sibilant:1051:25 */
    
      return [ pair[0], " = ", pair[1] ];
    })), ",\n    ") ]);
  });
  sibilant.macros.namespaces.core.assign = (function assign$(pairs) {
    /* assign /Users/jbr/code/sibilant/include/macros.sibilant:1069:0 */
  
    var pairs = Array.prototype.slice.call(arguments, 0);
  
    return interleave(map(sibilant.macros.namespaces.core["_destructure"](pairs), (function(pair) {
      /* /Users/jbr/code/sibilant/include/macros.sibilant:1072:17 */
    
      return asStatement([ pair[0], " = ", pair[1] ]);
    })), "\n");
  });
  sibilant.macros.namespaces.core.default = (function default$(pairs) {
    /* default /Users/jbr/code/sibilant/include/macros.sibilant:1080:0 */
  
    var pairs = Array.prototype.slice.call(arguments, 0);
  
    return interleave("\n", bulkMap(pairs, (function(name, value) {
      /* /Users/jbr/code/sibilant/include/macros.sibilant:1081:40 */
    
      return {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 35213,
        line: 1082,
        col: 35,
        length: 1,
        contents: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "assign",
          type: "literal",
          start: 35214,
          line: 1082,
          col: 36,
          length: 6,
          contents: [],
          nodeId: 14179,
          specials: 0,
          precedingIgnored: []
        }, name, {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "(",
          type: "expression",
          start: 35227,
          line: 1082,
          col: 49,
          length: 1,
          contents: [ {
            dir: "/Users/jbr/code/sibilant/include",
            file: "/Users/jbr/code/sibilant/include/macros.sibilant",
            token: "ternary",
            type: "literal",
            start: 35228,
            line: 1082,
            col: 50,
            length: 7,
            contents: [],
            nodeId: 14185,
            specials: 0,
            precedingIgnored: []
          }, {
            dir: "/Users/jbr/code/sibilant/include",
            file: "/Users/jbr/code/sibilant/include/macros.sibilant",
            token: "(",
            type: "expression",
            start: 35236,
            line: 1082,
            col: 58,
            length: 1,
            contents: [ {
              dir: "/Users/jbr/code/sibilant/include",
              file: "/Users/jbr/code/sibilant/include/macros.sibilant",
              token: "defined?",
              type: "literal",
              start: 35237,
              line: 1082,
              col: 59,
              length: 8,
              contents: [],
              nodeId: 14188,
              specials: 0,
              precedingIgnored: []
            }, name ],
            nodeId: 14187,
            precedingIgnored: [ {
              dir: "/Users/jbr/code/sibilant/include",
              file: "/Users/jbr/code/sibilant/include/macros.sibilant",
              token: " ",
              type: "whitespace",
              start: 35235,
              line: 1082,
              col: 57,
              length: 1,
              contents: [],
              nodeId: 14186
            } ],
            specials: 0,
            end: undefined,
            closed: true,
            closingIgnored: []
          }, name, value ],
          nodeId: 14184,
          precedingIgnored: [ {
            dir: "/Users/jbr/code/sibilant/include",
            file: "/Users/jbr/code/sibilant/include/macros.sibilant",
            token: " ",
            type: "whitespace",
            start: 35226,
            line: 1082,
            col: 48,
            length: 1,
            contents: [],
            nodeId: 14183
          } ],
          specials: 0,
          end: undefined,
          closed: true,
          closingIgnored: []
        } ],
        nodeId: 14178,
        precedingIgnored: [],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      };
    })));
  });
  sibilant.macros.namespaces.core.importNamespace = (function importNamespace$(namespace) {
    /* import-namespace /Users/jbr/code/sibilant/include/macros.sibilant:1085:0 */
  
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
    /* namespace /Users/jbr/code/sibilant/include/macros.sibilant:1093:0 */
  
    sibilant.macros.namespaces.core.importNamespace(namespace);
    sibilant.macros.namespace = sibilant.macros.namespaces[outputFormatter(transpile(namespace))];
    return undefined;
  });
  sibilant.macros.namespaces.core["hasKey__QUERY"] = (function hasKey__QUERY$(object, key) {
    /* has-key? /Users/jbr/code/sibilant/include/macros.sibilant:1108:0 */
  
    return {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 36021,
      line: 1109,
      col: 8,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: ".",
        type: "dots",
        start: 36022,
        line: 1109,
        col: 9,
        length: 1,
        contents: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "has-own-property",
          type: "literal",
          start: 36023,
          line: 1109,
          col: 10,
          length: 16,
          contents: [],
          nodeId: 14367,
          specials: 0,
          precedingIgnored: []
        } ],
        nodeId: 14366,
        precedingIgnored: []
      }, object, key ],
      nodeId: 14365,
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core.get = (function get$(obj, keys) {
    /* get /Users/jbr/code/sibilant/include/macros.sibilant:1130:0 */
  
    var keys = Array.prototype.slice.call(arguments, 1);
  
    return [ transpile(obj), map(keys, (function(key) {
      /* /Users/jbr/code/sibilant/include/macros.sibilant:1132:19 */
    
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
    /* set /Users/jbr/code/sibilant/include/macros.sibilant:1159:0 */
  
    var kvPairs = Array.prototype.slice.call(arguments, 1);
  
    return interleave("\n", bulkMap(kvPairs, (function(k, v) {
      /* /Users/jbr/code/sibilant/include/macros.sibilant:1160:43 */
    
      return {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 37689,
        line: 1160,
        col: 52,
        length: 1,
        contents: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "assign",
          type: "literal",
          start: 37690,
          line: 1160,
          col: 53,
          length: 6,
          contents: [],
          nodeId: 14703,
          specials: 0,
          precedingIgnored: []
        }, {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "(",
          type: "expression",
          start: 37697,
          line: 1160,
          col: 60,
          length: 1,
          contents: [ {
            dir: "/Users/jbr/code/sibilant/include",
            file: "/Users/jbr/code/sibilant/include/macros.sibilant",
            token: "get",
            type: "literal",
            start: 37698,
            line: 1160,
            col: 61,
            length: 3,
            contents: [],
            nodeId: 14706,
            specials: 0,
            precedingIgnored: []
          }, arr, k ],
          nodeId: 14705,
          precedingIgnored: [ {
            dir: "/Users/jbr/code/sibilant/include",
            file: "/Users/jbr/code/sibilant/include/macros.sibilant",
            token: " ",
            type: "whitespace",
            start: 37696,
            line: 1160,
            col: 59,
            length: 1,
            contents: [],
            nodeId: 14704
          } ],
          specials: 0,
          end: undefined,
          closed: true,
          closingIgnored: []
        }, v ],
        nodeId: 14702,
        precedingIgnored: [],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      };
    })));
  });
  sibilant.macros.namespaces.core["lowerCase__QUERY"] = (function lowerCase__QUERY$(str) {
    /* lower-case? /Users/jbr/code/sibilant/include/macros.sibilant:1165:0 */
  
    return {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 37886,
      line: 1166,
      col: 8,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "=",
        type: "otherChar",
        start: 37887,
        line: 1166,
        col: 9,
        length: 1,
        contents: [],
        nodeId: 14758,
        specials: 0,
        precedingIgnored: []
      }, {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 37889,
        line: 1166,
        col: 11,
        length: 1,
        contents: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: ".",
          type: "dots",
          start: 37890,
          line: 1166,
          col: 12,
          length: 1,
          contents: [ {
            dir: "/Users/jbr/code/sibilant/include",
            file: "/Users/jbr/code/sibilant/include/macros.sibilant",
            token: "to-lower-case",
            type: "literal",
            start: 37891,
            line: 1166,
            col: 13,
            length: 13,
            contents: [],
            nodeId: 14762,
            specials: 0,
            precedingIgnored: []
          } ],
          nodeId: 14761,
          precedingIgnored: []
        }, str ],
        nodeId: 14760,
        precedingIgnored: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 37888,
          line: 1166,
          col: 10,
          length: 1,
          contents: [],
          nodeId: 14759
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      }, str ],
      nodeId: 14757,
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core["upperCase__QUERY"] = (function upperCase__QUERY$(str) {
    /* upper-case? /Users/jbr/code/sibilant/include/macros.sibilant:1173:0 */
  
    return {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 38087,
      line: 1174,
      col: 8,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "=",
        type: "otherChar",
        start: 38088,
        line: 1174,
        col: 9,
        length: 1,
        contents: [],
        nodeId: 14810,
        specials: 0,
        precedingIgnored: []
      }, {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 38090,
        line: 1174,
        col: 11,
        length: 1,
        contents: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: ".",
          type: "dots",
          start: 38091,
          line: 1174,
          col: 12,
          length: 1,
          contents: [ {
            dir: "/Users/jbr/code/sibilant/include",
            file: "/Users/jbr/code/sibilant/include/macros.sibilant",
            token: "to-upper-case",
            type: "literal",
            start: 38092,
            line: 1174,
            col: 13,
            length: 13,
            contents: [],
            nodeId: 14814,
            specials: 0,
            precedingIgnored: []
          } ],
          nodeId: 14813,
          precedingIgnored: []
        }, str ],
        nodeId: 14812,
        precedingIgnored: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 38089,
          line: 1174,
          col: 10,
          length: 1,
          contents: [],
          nodeId: 14811
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      }, str ],
      nodeId: 14809,
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core.sourceMappingUrl = (function sourceMappingUrl$(url) {
    /* source-mapping-url /Users/jbr/code/sibilant/include/macros.sibilant:1181:0 */
  
    return [ "//# sourceMappingURL=", eval(outputFormatter(transpile(url))), "\n" ];
  });
  sibilant.macros.namespaces.core.sortBy = (function sortBy$(arrayOfObjects, attribute) {
    /* sort-by /Users/jbr/code/sibilant/include/macros.sibilant:1190:0 */
  
    return {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 38726,
      line: 1191,
      col: 8,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: ".",
        type: "dots",
        start: 38727,
        line: 1191,
        col: 9,
        length: 1,
        contents: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "sort",
          type: "literal",
          start: 38728,
          line: 1191,
          col: 10,
          length: 4,
          contents: [],
          nodeId: 14963,
          specials: 0,
          precedingIgnored: []
        } ],
        nodeId: 14962,
        precedingIgnored: []
      }, arrayOfObjects, {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 38766,
        line: 1192,
        col: 15,
        length: 1,
        contents: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "#->",
          type: "otherChar",
          start: 38767,
          line: 1192,
          col: 16,
          length: 3,
          contents: [],
          nodeId: 14970,
          specials: 0,
          precedingIgnored: []
        }, {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "(",
          type: "expression",
          start: 38771,
          line: 1192,
          col: 20,
          length: 1,
          contents: [ {
            dir: "/Users/jbr/code/sibilant/include",
            file: "/Users/jbr/code/sibilant/include/macros.sibilant",
            token: "get",
            type: "literal",
            start: 38772,
            line: 1192,
            col: 21,
            length: 3,
            contents: [],
            nodeId: 14973,
            specials: 0,
            precedingIgnored: []
          }, attribute ],
          nodeId: 14972,
          precedingIgnored: [ {
            dir: "/Users/jbr/code/sibilant/include",
            file: "/Users/jbr/code/sibilant/include/macros.sibilant",
            token: " ",
            type: "whitespace",
            start: 38770,
            line: 1192,
            col: 19,
            length: 1,
            contents: [],
            nodeId: 14971
          } ],
          specials: 0,
          end: undefined,
          closed: true,
          closingIgnored: []
        }, {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: ".",
          type: "dots",
          start: 38808,
          line: 1193,
          col: 20,
          length: 1,
          contents: [ {
            dir: "/Users/jbr/code/sibilant/include",
            file: "/Users/jbr/code/sibilant/include/macros.sibilant",
            token: "to-string",
            type: "literal",
            start: 38809,
            line: 1193,
            col: 21,
            length: 9,
            contents: [],
            nodeId: 14981,
            specials: 0,
            precedingIgnored: []
          } ],
          nodeId: 14980,
          precedingIgnored: [ {
            dir: "/Users/jbr/code/sibilant/include",
            file: "/Users/jbr/code/sibilant/include/macros.sibilant",
            token: "\n",
            type: "newline",
            start: 38787,
            line: 1192,
            col: 36,
            length: 1,
            contents: [],
            nodeId: 14978
          }, {
            dir: "/Users/jbr/code/sibilant/include",
            file: "/Users/jbr/code/sibilant/include/macros.sibilant",
            token: "                    ",
            type: "whitespace",
            start: 38788,
            line: 1193,
            col: 0,
            length: 20,
            contents: [],
            nodeId: 14979
          } ]
        }, {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "(",
          type: "expression",
          start: 38839,
          line: 1194,
          col: 20,
          length: 1,
          contents: [ {
            dir: "/Users/jbr/code/sibilant/include",
            file: "/Users/jbr/code/sibilant/include/macros.sibilant",
            token: ".",
            type: "dots",
            start: 38840,
            line: 1194,
            col: 21,
            length: 1,
            contents: [ {
              dir: "/Users/jbr/code/sibilant/include",
              file: "/Users/jbr/code/sibilant/include/macros.sibilant",
              token: "locale-compare",
              type: "literal",
              start: 38841,
              line: 1194,
              col: 22,
              length: 14,
              contents: [],
              nodeId: 14986,
              specials: 0,
              precedingIgnored: []
            } ],
            nodeId: 14985,
            precedingIgnored: []
          }, {
            dir: "/Users/jbr/code/sibilant/include",
            file: "/Users/jbr/code/sibilant/include/macros.sibilant",
            token: "(",
            type: "expression",
            start: 38856,
            line: 1194,
            col: 37,
            length: 1,
            contents: [ {
              dir: "/Users/jbr/code/sibilant/include",
              file: "/Users/jbr/code/sibilant/include/macros.sibilant",
              token: "get",
              type: "literal",
              start: 38857,
              line: 1194,
              col: 38,
              length: 3,
              contents: [],
              nodeId: 14989,
              specials: 0,
              precedingIgnored: []
            }, {
              dir: "/Users/jbr/code/sibilant/include",
              file: "/Users/jbr/code/sibilant/include/macros.sibilant",
              token: "#1",
              type: "argPlaceholder",
              start: 38861,
              line: 1194,
              col: 42,
              length: 2,
              contents: [],
              nodeId: 14991,
              specials: 0,
              precedingIgnored: [ {
                dir: "/Users/jbr/code/sibilant/include",
                file: "/Users/jbr/code/sibilant/include/macros.sibilant",
                token: " ",
                type: "whitespace",
                start: 38860,
                line: 1194,
                col: 41,
                length: 1,
                contents: [],
                nodeId: 14990
              } ]
            }, attribute ],
            nodeId: 14988,
            precedingIgnored: [ {
              dir: "/Users/jbr/code/sibilant/include",
              file: "/Users/jbr/code/sibilant/include/macros.sibilant",
              token: " ",
              type: "whitespace",
              start: 38855,
              line: 1194,
              col: 36,
              length: 1,
              contents: [],
              nodeId: 14987
            } ],
            specials: 0,
            end: undefined,
            closed: true,
            closingIgnored: []
          } ],
          nodeId: 14984,
          precedingIgnored: [ {
            dir: "/Users/jbr/code/sibilant/include",
            file: "/Users/jbr/code/sibilant/include/macros.sibilant",
            token: "\n",
            type: "newline",
            start: 38818,
            line: 1193,
            col: 30,
            length: 1,
            contents: [],
            nodeId: 14982
          }, {
            dir: "/Users/jbr/code/sibilant/include",
            file: "/Users/jbr/code/sibilant/include/macros.sibilant",
            token: "                    ",
            type: "whitespace",
            start: 38819,
            line: 1194,
            col: 0,
            length: 20,
            contents: [],
            nodeId: 14983
          } ],
          specials: 0,
          end: undefined,
          closed: true,
          closingIgnored: []
        } ],
        nodeId: 14969,
        precedingIgnored: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "\n",
          type: "newline",
          start: 38750,
          line: 1191,
          col: 32,
          length: 1,
          contents: [],
          nodeId: 14967
        }, {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "               ",
          type: "whitespace",
          start: 38751,
          line: 1192,
          col: 0,
          length: 15,
          contents: [],
          nodeId: 14968
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      } ],
      nodeId: 14961,
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
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
    /* docs.text /Users/jbr/code/sibilant/src/docs.sibilant:27:0 */
  
    return docs.definitions.map((function(definition) {
      /* /Users/jbr/code/sibilant/src/docs.sibilant:29:15 */
    
      return ("name: " + definition.type + " " + definition.namespace + "/" + prettify(definition.name) + "\n" + "description: " + definition.docString + "\n" + (function() {
        if (definition.references) {
          return ("references:\n  " + (definition.references.map((function() {
            /* /Users/jbr/code/sibilant/src/docs.sibilant:35:51 */
          
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
        /* /Users/jbr/code/sibilant/src/docs.sibilant:46:43 */
      
        return (prettify(arguments[0], true) + "\n" + outputFormatter(transpile(arguments[0])));
      })).join("\n\n") + "\n\n");
    })).join("");
  });
  docs.textNoColor = (function docs$textNoColor$() {
    /* docs.text-no-color /Users/jbr/code/sibilant/src/docs.sibilant:53:0 */
  
    var stripAnsi = require("strip-ansi");
    return stripAnsi(docs.text());
  });
  docs.json = (function docs$json$() {
    /* docs.json /Users/jbr/code/sibilant/src/docs.sibilant:57:0 */
  
    return JSON.stringify(docs.data());
  });
  docs.data = (function docs$data$() {
    /* docs.data /Users/jbr/code/sibilant/src/docs.sibilant:60:0 */
  
    return docs.definitions.map((function(definition) {
      /* /Users/jbr/code/sibilant/src/docs.sibilant:62:6 */
    
      return {
        name: prettify(definition.name, false),
        namespace: definition.namespace,
        type: definition.type,
        description: definition.docString,
        references: (function() {
          if (definition.references) {
            return definition.references.map((function() {
              /* /Users/jbr/code/sibilant/src/docs.sibilant:68:52 */
            
              return arguments[0].token.slice(1, -1);
            }));
          } else {
            return [];
          }
        }).call(this),
        arguments: definition.definition.contents[2].contents.map((function() {
          /* /Users/jbr/code/sibilant/src/docs.sibilant:73:30 */
        
          return prettify(arguments[0], false);
        })),
        definition: prettify(definition.definition, false),
        examples: (definition.examples || []).map((function() {
          /* /Users/jbr/code/sibilant/src/docs.sibilant:76:29 */
        
          return {
            javascript: outputFormatter(transpile(arguments[0])),
            sibilant: prettify(arguments[0], false)
          };
        })),
        tags: definition.tags
      };
    }));
  });
  var tap = (function tap$(item, fn) {
    /* tap /Users/jbr/code/sibilant/src/helpers.sibilant:3:0 */
  
    fn(item);
    return item;
  });
  var recurseIndent = (function recurseIndent$(args) {
    /* recurse-indent /Users/jbr/code/sibilant/src/helpers.sibilant:7:0 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    return map(args, (function(arg) {
      /* /Users/jbr/code/sibilant/src/helpers.sibilant:9:10 */
    
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
    /* indent /Users/jbr/code/sibilant/src/helpers.sibilant:24:0 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    return [ "\n  ", recurseIndent(map(args, transpile)), "\n" ];
  });
  var escapeRegex = (function escapeRegex$(string) {
    /* escape-regex /Users/jbr/code/sibilant/src/helpers.sibilant:27:0 */
  
    return string.replace((new RegExp("[\\-\\[\\]\\/\\{\\}\\(\\)\\*\\+\\?\\.\\\\\^\\$\\|]", "g")), "\\$&");
  });
  var qescape = (function qescape$(content) {
    /* qescape /Users/jbr/code/sibilant/src/helpers.sibilant:30:0 */
  
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
    /* map-node /Users/jbr/code/sibilant/src/helpers.sibilant:39:0 */
  
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
          /* /Users/jbr/code/sibilant/src/helpers.sibilant:48:32 */
        
          return mapNode(arguments[0], fn);
        }));
      } else {
        return fn(node);
      }
    }).call(this);
  });
  var eachNode = (function eachNode$(node, fn) {
    /* each-node /Users/jbr/code/sibilant/src/helpers.sibilant:51:0 */
  
    return (function() {
      if (node__QUERY(node)) {
        return (function() {
          if (fn(node)) {
            return eachNode(node.contents, fn);
          }
        }).call(this);
      } else if (((node) && typeof (node) === "object" && (node).constructor.name === "Array")) {
        return node.forEach((function(c) {
          /* /Users/jbr/code/sibilant/src/helpers.sibilant:53:22 */
        
          return eachNode(c, fn);
        }));
      } else {
        return fn(node);
      }
    }).call(this);
  });
  var statement__QUERY = (function statement__QUERY$(transpiled) {
    /* statement? /Users/jbr/code/sibilant/src/helpers.sibilant:56:0 */
  
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
    /* as-statement /Users/jbr/code/sibilant/src/helpers.sibilant:62:0 */
  
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
    /* unquote? /Users/jbr/code/sibilant/src/helpers.sibilant:69:0 */
  
    return node__QUERY(node, "at");
  });
  var findUnquotes = (function findUnquotes$(node) {
    /* find-unquotes /Users/jbr/code/sibilant/src/helpers.sibilant:71:0 */
  
    var unquotes = {  };
    eachNode(node, (function(n) {
      /* /Users/jbr/code/sibilant/src/helpers.sibilant:73:21 */
    
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
    /* splice-dots /Users/jbr/code/sibilant/src/helpers.sibilant:79:0 */
  
    (function() {
      if ((node && ((node.contents) && typeof (node.contents) === "object" && (node.contents).constructor.name === "Array"))) {
        var contents = [];
        node.contents.forEach((function(content) {
          /* /Users/jbr/code/sibilant/src/helpers.sibilant:82:11 */
        
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
    /* alternating-keys-and-values /Users/jbr/code/sibilant/src/helpers.sibilant:94:0 */
  
    return flatten(map(Object.keys(hash), (function(key) {
      /* /Users/jbr/code/sibilant/src/helpers.sibilant:96:19 */
    
      return [ key, hash[key] ];
    })));
  });
  var mapNodeForQuoteExpansion = (function mapNodeForQuoteExpansion$(node, expansions) {
    /* map-node-for-quote-expansion /Users/jbr/code/sibilant/src/helpers.sibilant:99:0 */
  
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
          /* /Users/jbr/code/sibilant/src/helpers.sibilant:110:19 */
        
          return mapNodeForQuoteExpansion(arguments[0], expansions);
        }));
      } else {
        return node;
      }
    }).call(this);
  });
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
  sibilant.macros.namespaces.core.meta = (function sibilant$macros$namespaces$core$meta$(body) {
    /* ^meta /Users/jbr/code/sibilant/src/core.sibilant:97:0 */
  
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
    /* ^concat /Users/jbr/code/sibilant/src/core.sibilant:103:0 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    return [ "(", interleave(" + ", map(args, transpile)), ")" ];
  });
  sibilant.macros.namespaces.core.reverse = (function sibilant$macros$namespaces$core$reverse$(arr) {
    /* ^reverse /Users/jbr/code/sibilant/src/core.sibilant:106:0 */
  
    var reversed = [];
    arr.forEach((function(item) {
      /* /Users/jbr/code/sibilant/src/core.sibilant:108:5 */
    
      return reversed.unshift(item);
    }));
    return reversed;
  });
  var reverse = sibilant.macros.namespaces.core.reverse;
  sibilant.macros.namespaces.core.lambda = (function sibilant$macros$namespaces$core$lambda$(argsOrOptions, body) {
    /* ^lambda /Users/jbr/code/sibilant/src/core.sibilant:113:0 */
  
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
      /* /Users/jbr/code/sibilant/src/core.sibilant:128:23 */
    
      return node__QUERY(arguments[0], "dots");
    }));
    var thisNode = this,
        node = detect([ argsOrOptions.node, thisNode, argsOrOptions.name, args, body[0] ], (function(n) {
      /* /Users/jbr/code/sibilant/src/core.sibilant:133:16 */
    
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
    /* ^quoted-hash /Users/jbr/code/sibilant/src/core.sibilant:151:0 */
  
    var pairs = Array.prototype.slice.call(arguments, 0);
  
    var cachedQuoteValue = sibilant.quoteHashKeys;
    sibilant.quoteHashKeys = true;
    var value = sibilant.macros.namespaces.core.hash.apply(this, pairs);
    sibilant.quoteHashKeys = cachedQuoteValue;
    return value;
  });
  sibilant.macros.namespaces.core.hash = (function sibilant$macros$namespaces$core$hash$(pairs) {
    /* ^hash /Users/jbr/code/sibilant/src/core.sibilant:158:0 */
  
    var pairs = Array.prototype.slice.call(arguments, 0);
  
    (function() {
      if (1 === (pairs.length % 2)) {
        return error(("odd number of key-value pairs in hash: " + inspect(pairs)));
      }
    }).call(this);
    var quoteKeys = sibilant.quoteHashKeys,
        pairStrings = bulkMap(pairs, (function(key, value) {
      /* /Users/jbr/code/sibilant/src/core.sibilant:164:39 */
    
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
    /* replace! /Users/jbr/code/sibilant/src/core.sibilant:174:0 */
  
    return (function() {
      if ((node__QUERY(content, "dots") && 3 === content.token.length && node__QUERY(content.contents[0], "at"))) {
        return mergeInto(clone(content), { contents: [ transpile(content.contents[0]) ] });
      } else if (node__QUERY(content, "at")) {
        return transpile(content.contents[0]);
      } else if (node__QUERY(content, "tick")) {
        return JSON.stringify(content);
      } else if (("object" === typeof content && content !== null && content.constructor.name !== "Array")) {
        return sibilant.macros.namespaces.core.hash.apply(this, Object.keys(content).reduce((function() {
          /* /Users/jbr/code/sibilant/src/core.sibilant:191:21 */
        
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
  var prettyLogAndReturn = (function prettyLogAndReturn$(content) {
    /* pretty-log-and-return /Users/jbr/code/sibilant/src/core.sibilant:206:0 */
  
    console.log(sibilant.prettyPrint(content));
    return content;
  });
  sibilant.macros.namespaces.core.quote = (function sibilant$macros$namespaces$core$quote$(content) {
    /* ^quote /Users/jbr/code/sibilant/src/core.sibilant:210:0 */
  
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
    /* ^debug /Users/jbr/code/sibilant/src/core.sibilant:233:0 */
  
    sibilant.debug = eval(outputFormatter(transpile(val)));
    return null;
  });
  sibilant.macros.namespaces.core.expandQuote = (function sibilant$macros$namespaces$core$expandQuote$(node, expansions) {
    /* ^expand-quote /Users/jbr/code/sibilant/src/core.sibilant:236:0 */
  
    return transpile(mapNodeForQuoteExpansion((function() {
      if (node__QUERY(node)) {
        return node;
      } else {
        return sibilant.nodeCache[node];
      }
    }).call(this), expansions));
  });
  sibilant.macros.namespaces.core.list = (function sibilant$macros$namespaces$core$list$(args) {
    /* ^list /Users/jbr/code/sibilant/src/core.sibilant:242:0 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    var argSegments = [];
    return (function() {
      if (0 === args.length) {
        return "[]";
      } else {
        var simpleList = (function simpleList$(args) {
          /* simple-list /Users/jbr/code/sibilant/src/core.sibilant:246:12 */
        
          return [ "[ ", interleave(", ", map(args, (function(arg) {
            /* /Users/jbr/code/sibilant/src/core.sibilant:247:50 */
          
            return arg.transpiled;
          }))), " ]" ];
        });
        args.forEach((function(arg) {
          /* /Users/jbr/code/sibilant/src/core.sibilant:249:27 */
        
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
          /* /Users/jbr/code/sibilant/src/core.sibilant:255:38 */
        
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
    /* ^call /Users/jbr/code/sibilant/src/core.sibilant:265:0 */
  
    var args = Array.prototype.slice.call(arguments, 1);
  
    return (function() {
      if (any__QUERY(args, (function() {
        /* /Users/jbr/code/sibilant/src/core.sibilant:266:20 */
      
        return node__QUERY(arguments[0], "dots");
      }))) {
        return macros.apply(fnName, macros.list.apply(this, args));
      } else {
        return [ transpile(fnName), "(", interleave(", ", map(args, transpile)), ")" ];
      }
    }).call(this);
  });
  sibilant.macros.namespaces.core.dots = (function sibilant$macros$namespaces$core$dots$(contents) {
    /* ^dots /Users/jbr/code/sibilant/src/core.sibilant:271:0 */
  
    var contents = Array.prototype.slice.call(arguments, 0);
  
    return transpile(contents);
  });
  sibilant.macros.namespaces.core.include = (function sibilant$macros$namespaces$core$include$(files) {
    /* ^include /Users/jbr/code/sibilant/src/core.sibilant:274:0 */
  
    var files = Array.prototype.slice.call(arguments, 0);
  
    return interleave(files.map((function(file) {
      /* /Users/jbr/code/sibilant/src/core.sibilant:276:17 */
    
      return sibilant.withDefaultSearchPath((function() {
        /* /Users/jbr/code/sibilant/src/core.sibilant:278:20 */
      
        return sibilant.include(eval(outputFormatter(transpile(file))));
      }));
    })), "\n");
  });
  sibilant.macros.namespaces.core.docs = (function sibilant$macros$namespaces$core$docs$(options) {
    /* ^docs /Users/jbr/code/sibilant/src/core.sibilant:285:0 */
  
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
      /* /Users/jbr/code/sibilant/src/core.sibilant:296:23 */
    
      return optionsHash[outputFormatter(transpile(key))] = value;
    }));
    [ "examples", "references" ].forEach((function(listAttribute) {
      /* /Users/jbr/code/sibilant/src/core.sibilant:299:5 */
    
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
        (function() {
          if (typeof resultNode === "undefined") {
            console.log(("" + node.file + ":" + node.line + ":" + node.col + "\n" + prettify(node) + ""));
            console.log(prettify(result));
            console.log(prettify(transpile(result)));
            throw (new Error(("Encountered an undefined return from recursive transpile.\n" + "Please report this bug at " + "https://github.com/jbr/sibilant/issues/new")))
          }
        }).call(this);
        resultNode.contents = compact(flatten(resultNode.contents));
        resultNode.source = node;
        (function() {
          if (5 > sibilant.debug) {
            return console.log(prettify(node), red("->"), prettify(resultNode));
          }
        }).call(this);
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
    /* transpile.hat /Users/jbr/code/sibilant/src/transpiler.sibilant:85:0 */
  
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
    /* transpile.tick /Users/jbr/code/sibilant/src/transpiler.sibilant:96:0 */
  
    return sibilant.macros.namespaces.core.quote.apply(node, node.contents);
  });
  transpile.at = (function transpile$at$(node) {
    /* transpile.at /Users/jbr/code/sibilant/src/transpiler.sibilant:99:0 */
  
    return transpile(node.contents[0]);
  });
  transpile.dots = (function transpile$dots$(node) {
    /* transpile.dots /Users/jbr/code/sibilant/src/transpiler.sibilant:102:0 */
  
    return sibilant.macros.namespaces.core.dots.apply(node, node.contents);
  });
  transpile.default = (function transpile$default$(node) {
    /* transpile.default /Users/jbr/code/sibilant/src/transpiler.sibilant:105:0 */
  
    return node.token;
  });
  transpile.output = (function transpile$output$(node) {
    /* transpile.output /Users/jbr/code/sibilant/src/transpiler.sibilant:108:0 */
  
    return node;
  });
  transpile.number = (function transpile$number$(node) {
    /* transpile.number /Users/jbr/code/sibilant/src/transpiler.sibilant:111:0 */
  
    return parseFloat(node.token.replace((new RegExp(",", "g")), "")).toString();
  });
  transpile.root = (function transpile$root$(node) {
    /* transpile.root /Users/jbr/code/sibilant/src/transpiler.sibilant:117:0 */
  
    return (function() {
      if (1 === node.contents.length) {
        return transpile(node.contents[0]);
      } else {
        return interleave(compact(map(node.contents, asStatement)), "\n");
      }
    }).call(this);
  });
  transpile.expression = (function transpile$expression$(node, preprocessor) {
    /* transpile.expression /Users/jbr/code/sibilant/src/transpiler.sibilant:126:0 */
  
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
    /* transpile.bracket /Users/jbr/code/sibilant/src/transpiler.sibilant:152:0 */
  
    return sibilant.macros.namespaces.core.list.apply(this, node.contents);
  });
  transpile.brace = (function transpile$brace$(node) {
    /* transpile.brace /Users/jbr/code/sibilant/src/transpiler.sibilant:155:0 */
  
    return sibilant.macros.namespaces.core.hash.apply(this, node.contents);
  });
  transpile.literal = (function transpile$literal$(node) {
    /* transpile.literal /Users/jbr/code/sibilant/src/transpiler.sibilant:157:0 */
  
    var string = node.token;
    return inject(string.replace((new RegExp("\\*", "g")), "_").replace((new RegExp("\\?$", undefined)), "__QUERY").replace((new RegExp("!$", undefined)), "__BANG"), string.match((new RegExp("-(.)", "g"))), (function(returnString, match) {
      /* /Users/jbr/code/sibilant/src/transpiler.sibilant:164:13 */
    
      return returnString.replace(match, match[1].toUpperCase());
    }));
  });
  transpile.string = (function transpile$string$(node) {
    /* transpile.string /Users/jbr/code/sibilant/src/transpiler.sibilant:168:0 */
  
    return node.token.split("\n").join("\\n\" +\n\"");
  });
  transpile.comment = (function transpile$comment$(node) {
    /* transpile.comment /Users/jbr/code/sibilant/src/transpiler.sibilant:173:0 */
  
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
    /* docs.text /Users/jbr/code/sibilant/src/docs.sibilant:27:0 */
  
    return docs.definitions.map((function(definition) {
      /* /Users/jbr/code/sibilant/src/docs.sibilant:29:15 */
    
      return ("name: " + definition.type + " " + definition.namespace + "/" + prettify(definition.name) + "\n" + "description: " + definition.docString + "\n" + (function() {
        if (definition.references) {
          return ("references:\n  " + (definition.references.map((function() {
            /* /Users/jbr/code/sibilant/src/docs.sibilant:35:51 */
          
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
        /* /Users/jbr/code/sibilant/src/docs.sibilant:46:43 */
      
        return (prettify(arguments[0], true) + "\n" + outputFormatter(transpile(arguments[0])));
      })).join("\n\n") + "\n\n");
    })).join("");
  });
  docs.textNoColor = (function docs$textNoColor$() {
    /* docs.text-no-color /Users/jbr/code/sibilant/src/docs.sibilant:53:0 */
  
    var stripAnsi = require("strip-ansi");
    return stripAnsi(docs.text());
  });
  docs.json = (function docs$json$() {
    /* docs.json /Users/jbr/code/sibilant/src/docs.sibilant:57:0 */
  
    return JSON.stringify(docs.data());
  });
  docs.data = (function docs$data$() {
    /* docs.data /Users/jbr/code/sibilant/src/docs.sibilant:60:0 */
  
    return docs.definitions.map((function(definition) {
      /* /Users/jbr/code/sibilant/src/docs.sibilant:62:6 */
    
      return {
        name: prettify(definition.name, false),
        namespace: definition.namespace,
        type: definition.type,
        description: definition.docString,
        references: (function() {
          if (definition.references) {
            return definition.references.map((function() {
              /* /Users/jbr/code/sibilant/src/docs.sibilant:68:52 */
            
              return arguments[0].token.slice(1, -1);
            }));
          } else {
            return [];
          }
        }).call(this),
        arguments: definition.definition.contents[2].contents.map((function() {
          /* /Users/jbr/code/sibilant/src/docs.sibilant:73:30 */
        
          return prettify(arguments[0], false);
        })),
        definition: prettify(definition.definition, false),
        examples: (definition.examples || []).map((function() {
          /* /Users/jbr/code/sibilant/src/docs.sibilant:76:29 */
        
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
    var result = outputFormatter(transpile(restructure(parse(input))));
    return result;
  });
  var sourcemap = (function sourcemap$(input) {
    /* sourcemap /Users/jbr/code/sibilant/src/require-and-include.sibilant:10:0 */
  
    sibilant.initialize();
    return sourcemapper(transpile(restructure(parse(input))));
  });
  sibilant.sibilize = sibilize;
  sibilant.version = (function sibilant$version$() {
    /* sibilant.version /Users/jbr/code/sibilant/src/require-and-include.sibilant:16:0 */
  
    return sibilant.packageInfo().version;
  });
  sibilant.stripShebang = (function sibilant$stripShebang$(data) {
    /* sibilant.strip-shebang /Users/jbr/code/sibilant/src/require-and-include.sibilant:19:0 */
  
    return data.replace((new RegExp("^#!.*\\n", undefined)), "\n");
  });
  sibilant.file = "eval.sibilant";
  var withDirAndFile = (function withDirAndFile$(dir, file, fn) {
    /* with-dir-and-file /Users/jbr/code/sibilant/src/require-and-include.sibilant:24:0 */
  
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
    /* sibilant.sibilize-file /Users/jbr/code/sibilant/src/require-and-include.sibilant:41:0 */
  
    return outputFormatter(sibilant.transpileFile(fileName));
  });
  sibilant.sibilizeJson = (function sibilant$sibilizeJson$(fileName) {
    /* sibilant.sibilize-json /Users/jbr/code/sibilant/src/require-and-include.sibilant:46:0 */
  
    sibilant.initialize();
    var before = sibilant.quoteHashKeys;
    sibilant.quoteHashKeys = true;
    var content = sibilant.sibilizeFile(fileName);
    sibilant.quoteHashKeys = before;
    return content;
  });
  var package = {
    name: "sibilant",
    version: "0.3.8",
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
    /* eval-code /Users/jbr/code/sibilant/src/browser.sibilant:33:13 */
  
    return (new Function(js))();
  });
  sibilant.include = (function sibilant$include$(url) {
    /* sibilant.include /Users/jbr/code/sibilant/src/browser.sibilant:36:6 */
  
    return $.get(url).done((function() {
      /* /Users/jbr/code/sibilant/src/browser.sibilant:37:32 */
    
      return evalCode(sibilize(arguments[0]));
    }));
  });
  (function() {
    if (typeof $ === "function") {
      return $((function() {
        /* /Users/jbr/code/sibilant/src/browser.sibilant:40:15 */
      
        return map($.makeArray($("script[type=\"application/sibilant\"][src]").map((function() {
          /* /Users/jbr/code/sibilant/src/browser.sibilant:43:26 */
        
          return this.src;
        }))), sibilant.include);
      }));
    }
  }).call(this);
  return sibilant;
}).call(this);