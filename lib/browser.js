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
      var temp$1 = undefined;
      while (index < arr.length) {
        temp$1 = (function() {
          retArr.push(fn.apply(this, arr.slice(index, (index + groupSize))));
          return index += groupSize;
        }).call(this);
      };
      return temp$1;
    }).call(this);
    return retArr;
  });
  var inject = (function inject$(start, items, fn) {
    /* inject include/functional.sibilant:13:0 */
  
    var value = start;
    (function() {
      if (((items) && typeof (items) === "object" && (items).constructor.name === "Array")) {
        return items.forEach((function(item, index) {
          /* include/functional.sibilant:16:4 */
        
          return value = fn(value, item, index);
        }));
      }
    }).call(this);
    return value;
  });
  var map = (function map$(items, fn) {
    /* map include/functional.sibilant:20:0 */
  
    return inject([], items, (function(collector, item, index) {
      /* include/functional.sibilant:22:10 */
    
      collector.push(fn(item, index));
      return collector;
    }));
  });
  var select = (function select$(items, fn) {
    /* select include/functional.sibilant:26:0 */
  
    return inject([], items, (function(collector, item, index) {
      /* include/functional.sibilant:28:10 */
    
      (function() {
        if (fn(item, index)) {
          return collector.push(item);
        }
      }).call(this);
      return collector;
    }));
  });
  var detect = (function detect$(items, fn) {
    /* detect include/functional.sibilant:33:0 */
  
    var returnItem = undefined,
        index = 0,
        items = (items || []);
    (function() {
      var temp$2 = undefined;
      while (!((items.length === index || returnItem))) {
        temp$2 = (function() {
          (function() {
            if (fn(items[index], index)) {
              return returnItem = items[index];
            }
          }).call(this);
          return ((index)++);
        }).call(this);
      };
      return temp$2;
    }).call(this);
    return returnItem;
  });
  var all__QUERY = (function all__QUERY$(items, fn) {
    /* all? include/functional.sibilant:45:0 */
  
    return typeof detect(items, (function(item, index) {
      /* include/functional.sibilant:46:31 */
    
      return !(fn(item, index));
    })) === "undefined";
  });
  var none__QUERY = (function none__QUERY$(items, fn) {
    /* none? include/functional.sibilant:48:0 */
  
    return typeof detect(items, fn) === "undefined";
  });
  var any__QUERY = (function any__QUERY$(items, fn) {
    /* any? include/functional.sibilant:51:0 */
  
    return typeof detect(items, fn) !== "undefined";
  });
  var reject = (function reject$(items, fn) {
    /* reject include/functional.sibilant:54:0 */
  
    var args = [ items, fn ];
    return select(items, (function() {
      /* include/functional.sibilant:56:16 */
    
      return !(fn.apply(this, arguments));
    }));
  });
  var compact = (function compact$(arr) {
    /* compact include/functional.sibilant:59:0 */
  
    return select(arr, (function(item) {
      /* include/functional.sibilant:60:17 */
    
      return (null !== item && false !== item && typeof item !== "undefined");
    }));
  });
  var unique = (function unique$(arr) {
    /* unique include/functional.sibilant:66:0 */
  
    return inject([], arr, (function(coll, item) {
      /* include/functional.sibilant:68:13 */
    
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
    /* interleave include/functional.sibilant:74:0 */
  
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
          /* include/functional.sibilant:80:13 */
        
          return collector.concat([ item, glue[index] ]);
        }));
      } else {
        return inject([ arr[0] ], arr.slice(1), (function(collector, item, index) {
          /* include/functional.sibilant:84:13 */
        
          return collector.concat([ glue, item ]);
        }));
      }
    }).call(this);
  });
  var flatten = (function flatten$(items) {
    /* flatten include/functional.sibilant:87:0 */
  
    var items = Array.prototype.slice.call(arguments, 0);
  
    return inject([], items, (function(collector, item) {
      /* include/functional.sibilant:89:10 */
    
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
    /* recurse-map include/functional.sibilant:96:0 */
  
    return (function() {
      if (((item) && typeof (item) === "object" && (item).constructor.name === "Array")) {
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
  
    Object.keys(from).forEach((function(key) {
      /* include/functional.sibilant:104:5 */
    
      return into[key] = from[key];
    }));
    return into;
  });
  var clone = (function clone$(object) {
    /* clone include/functional.sibilant:107:0 */
  
    return inject({  }, Object.keys(object), (function(collector, key) {
      /* include/functional.sibilant:109:13 */
    
      collector[key] = object[key];
      return collector;
    }));
  });
  var values = (function values$(object) {
    /* values include/functional.sibilant:113:0 */
  
    return map(Object.keys(object), (function() {
      /* include/functional.sibilant:114:26 */
    
      return object[arguments[0]];
    }));
  });
  var mapValues = (function mapValues$(object, fn) {
    /* map-values include/functional.sibilant:116:0 */
  
    return inject({  }, Object.keys(object), (function(collector, key, index) {
      /* include/functional.sibilant:118:13 */
    
      collector[key] = fn(object[key], key);
      return collector;
    }));
  });
  var mergeWith = (function mergeWith$(into, from) {
    /* merge-with include/functional.sibilant:122:0 */
  
    return mergeInto(clone(into), from);
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
      } else if (((node) && typeof (node) === "object" && (node).constructor.name === "Array")) {
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
      if (((node.contents) && typeof (node.contents) === "object" && (node.contents).constructor.name === "Array")) {
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
    /* bulk-map include/functional.sibilant:1:0 */
  
    var index = 0,
        groupSize = fn.length,
        retArr = [];
    (function() {
      var temp$3 = undefined;
      while (index < arr.length) {
        temp$3 = (function() {
          retArr.push(fn.apply(this, arr.slice(index, (index + groupSize))));
          return index += groupSize;
        }).call(this);
      };
      return temp$3;
    }).call(this);
    return retArr;
  });
  var inject = (function inject$(start, items, fn) {
    /* inject include/functional.sibilant:13:0 */
  
    var value = start;
    (function() {
      if (((items) && typeof (items) === "object" && (items).constructor.name === "Array")) {
        return items.forEach((function(item, index) {
          /* include/functional.sibilant:16:4 */
        
          return value = fn(value, item, index);
        }));
      }
    }).call(this);
    return value;
  });
  var map = (function map$(items, fn) {
    /* map include/functional.sibilant:20:0 */
  
    return inject([], items, (function(collector, item, index) {
      /* include/functional.sibilant:22:10 */
    
      collector.push(fn(item, index));
      return collector;
    }));
  });
  var select = (function select$(items, fn) {
    /* select include/functional.sibilant:26:0 */
  
    return inject([], items, (function(collector, item, index) {
      /* include/functional.sibilant:28:10 */
    
      (function() {
        if (fn(item, index)) {
          return collector.push(item);
        }
      }).call(this);
      return collector;
    }));
  });
  var detect = (function detect$(items, fn) {
    /* detect include/functional.sibilant:33:0 */
  
    var returnItem = undefined,
        index = 0,
        items = (items || []);
    (function() {
      var temp$4 = undefined;
      while (!((items.length === index || returnItem))) {
        temp$4 = (function() {
          (function() {
            if (fn(items[index], index)) {
              return returnItem = items[index];
            }
          }).call(this);
          return ((index)++);
        }).call(this);
      };
      return temp$4;
    }).call(this);
    return returnItem;
  });
  var all__QUERY = (function all__QUERY$(items, fn) {
    /* all? include/functional.sibilant:45:0 */
  
    return typeof detect(items, (function(item, index) {
      /* include/functional.sibilant:46:31 */
    
      return !(fn(item, index));
    })) === "undefined";
  });
  var none__QUERY = (function none__QUERY$(items, fn) {
    /* none? include/functional.sibilant:48:0 */
  
    return typeof detect(items, fn) === "undefined";
  });
  var any__QUERY = (function any__QUERY$(items, fn) {
    /* any? include/functional.sibilant:51:0 */
  
    return typeof detect(items, fn) !== "undefined";
  });
  var reject = (function reject$(items, fn) {
    /* reject include/functional.sibilant:54:0 */
  
    var args = [ items, fn ];
    return select(items, (function() {
      /* include/functional.sibilant:56:16 */
    
      return !(fn.apply(this, arguments));
    }));
  });
  var compact = (function compact$(arr) {
    /* compact include/functional.sibilant:59:0 */
  
    return select(arr, (function(item) {
      /* include/functional.sibilant:60:17 */
    
      return (null !== item && false !== item && typeof item !== "undefined");
    }));
  });
  var unique = (function unique$(arr) {
    /* unique include/functional.sibilant:66:0 */
  
    return inject([], arr, (function(coll, item) {
      /* include/functional.sibilant:68:13 */
    
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
    /* interleave include/functional.sibilant:74:0 */
  
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
          /* include/functional.sibilant:80:13 */
        
          return collector.concat([ item, glue[index] ]);
        }));
      } else {
        return inject([ arr[0] ], arr.slice(1), (function(collector, item, index) {
          /* include/functional.sibilant:84:13 */
        
          return collector.concat([ glue, item ]);
        }));
      }
    }).call(this);
  });
  var flatten = (function flatten$(items) {
    /* flatten include/functional.sibilant:87:0 */
  
    var items = Array.prototype.slice.call(arguments, 0);
  
    return inject([], items, (function(collector, item) {
      /* include/functional.sibilant:89:10 */
    
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
    /* recurse-map include/functional.sibilant:96:0 */
  
    return (function() {
      if (((item) && typeof (item) === "object" && (item).constructor.name === "Array")) {
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
  
    Object.keys(from).forEach((function(key) {
      /* include/functional.sibilant:104:5 */
    
      return into[key] = from[key];
    }));
    return into;
  });
  var clone = (function clone$(object) {
    /* clone include/functional.sibilant:107:0 */
  
    return inject({  }, Object.keys(object), (function(collector, key) {
      /* include/functional.sibilant:109:13 */
    
      collector[key] = object[key];
      return collector;
    }));
  });
  var values = (function values$(object) {
    /* values include/functional.sibilant:113:0 */
  
    return map(Object.keys(object), (function() {
      /* include/functional.sibilant:114:26 */
    
      return object[arguments[0]];
    }));
  });
  var mapValues = (function mapValues$(object, fn) {
    /* map-values include/functional.sibilant:116:0 */
  
    return inject({  }, Object.keys(object), (function(collector, key, index) {
      /* include/functional.sibilant:118:13 */
    
      collector[key] = fn(object[key], key);
      return collector;
    }));
  });
  var mergeWith = (function mergeWith$(into, from) {
    /* merge-with include/functional.sibilant:122:0 */
  
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
    /* src/parser.sibilant:41:23 */
  
    return mergeInto((new RegExp(("^" + parser.tokens[x]), undefined)), { name: x });
  }));
  var orderedRegexes = parser.orderedRegexes;
  parser.parse = (function parser$parse$(string, context) {
    /* parser.parse src/parser.sibilant:46:0 */
  
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
      var temp$5 = undefined;
      while (match) {
        temp$5 = (function() {
          detect(orderedRegexes, (function(r) {
            /* src/parser.sibilant:57:20 */
          
            regexName = r.name;
            return match = r.exec(remainingInput);
          }));
          return (function() {
            if ((typeof match !== "undefined" && match !== null)) {
              var matchString = match[0],
                  length = matchString.length;
              context.stack.push({
                dir: sibilant.dir,
                file: sibilant.file,
                token: matchString,
                type: regexName,
                start: context.position,
                line: context.line,
                col: context.col,
                length: length,
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
      return temp$5;
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
    /* restructure src/restructurer.sibilant:7:0 */
  
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
      /* src/restructurer.sibilant:20:13 */
    
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
    /* restructurers.open-expression src/restructurer.sibilant:35:0 */
  
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
    /* restructurers.close-expression src/restructurer.sibilant:47:0 */
  
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
    /* open-special src/restructurer.sibilant:72:0 */
  
    ((context.specials)++);
    acceptIgnoredTokens(node, context);
    var first = context.parseStack[0];
    node.contents = [];
    first.contents.push(node);
    context.parseStack.unshift(node);
    return context;
  });
  var acceptSpecials = (function acceptSpecials$(node, context) {
    /* accept-specials src/restructurer.sibilant:85:0 */
  
    node.specials = context.specials;
    context.specials = 0;
    return context;
  });
  var acceptIgnoredTokens = (function acceptIgnoredTokens$(node, context) {
    /* accept-ignored-tokens src/restructurer.sibilant:90:0 */
  
    node.precedingIgnored = context.ignoredTokens;
    context.ignoredTokens = [];
    return context;
  });
  var closeSpecials = (function closeSpecials$(node, context) {
    /* close-specials src/restructurer.sibilant:95:0 */
  
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
    /* accumulate-ignored-token src/restructurer.sibilant:103:0 */
  
    context.ignoredTokens.push(token);
    return context;
  });
  [ "hat", "dots", "tick", "at" ].forEach((function(special) {
    /* src/restructurer.sibilant:107:0 */
  
    return restructurers[special] = openSpecial;
  }));
  [ "whitespace", "newline", "ignored" ].forEach((function(ignored) {
    /* src/restructurer.sibilant:110:0 */
  
    return restructurers[ignored] = accumulateIgnoredToken;
  }));
  restructurers.default = (function restructurers$default$(token, context, index) {
    /* restructurers.default src/restructurer.sibilant:113:0 */
  
    acceptSpecials(token, context);
    acceptIgnoredTokens(token, context);
    context.parseStack[0].contents.push(token);
    return closeSpecials(token, context);
  });
  var coreNamespace = {  },
      macroNamespaces = { core: coreNamespace };
  sibilant.state = { symbolCount: 0 };
  sibilant.macros = {
    "namespaces": macroNamespaces,
    "defaultSearchPath": [ "core" ],
    "searchPath": [ "core" ],
    "namespace": coreNamespace
  };
  var namespace = sibilant.macros.namespace,
      macros = sibilant.macros.namespace;
  sibilant.macros.currentNamespace = (function sibilant$macros$currentNamespace$() {
    /* sibilant.macros.current-namespace src/macros.sibilant:14:0 */
  
    return sibilant.macros.namespaces[sibilant.macros.searchPath[0]];
  });
  sibilant.resolveMacro = (function sibilant$resolveMacro$(macroName) {
    /* sibilant.resolve-macro src/macros.sibilant:17:0 */
  
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
          /* src/macros.sibilant:29:33 */
        
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
    /* sibilant.with-default-search-path src/macros.sibilant:34:0 */
  
    var searchPathBefore = sibilant.macros.searchPath;
    sibilant.macros.searchPath = sibilant.macros.defaultSearchPath;
    var returnValue = fn();
    sibilant.macros.searchPath = searchPathBefore;
    return returnValue;
  });
  sibilant.macros.namespaces.core.ternary = (function ternary$(cond, ifTrue, ifFalse) {
    /* ternary include/macros.sibilant:9:0 */
  
    return [ "(", transpile(cond), ") ? ", transpile(ifTrue), " : ", transpile(ifFalse) ];
  });
  sibilant.macros.namespaces.core.aliasMacro = (function aliasMacro$(currentMacroName, newMacroName) {
    /* alias-macro include/macros.sibilant:23:0 */
  
    var currentMacroName = outputFormatter(transpile(currentMacroName)),
        newMacroName = outputFormatter(transpile(newMacroName));
    sibilant.macros.namespace[newMacroName] = sibilant.macros.namespace[currentMacroName];
    return null;
  });
  sibilant.macros.namespaces.core.send = (function send$(object, method, args) {
    /* send include/macros.sibilant:38:0 */
  
    var args = Array.prototype.slice.call(arguments, 2);
  
    return [ transpile(object), ".", transpile(method), "(", interleave(", ", map(args, transpile)), ")" ];
  });
  sibilant.macros.namespaces.core.apply = (function apply$(fn, arglist) {
    /* apply include/macros.sibilant:50:0 */
  
    return {
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 1402,
      line: 51,
      col: 8,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: ".",
        type: "dots",
        start: 1403,
        line: 51,
        col: 9,
        length: 1,
        contents: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: "apply",
          type: "literal",
          start: 1404,
          line: 51,
          col: 10,
          length: 5,
          contents: [],
          specials: 0,
          precedingIgnored: []
        } ],
        precedingIgnored: []
      }, fn, {
        dir: "include",
        file: "include/macros.sibilant",
        token: "this",
        type: "literal",
        start: 1414,
        line: 51,
        col: 20,
        length: 4,
        contents: [],
        specials: 0,
        precedingIgnored: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 1413,
          line: 51,
          col: 19,
          length: 1,
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
  sibilant.macros.namespaces.core.cons = (function cons$(first, rest) {
    /* cons include/macros.sibilant:62:0 */
  
    return [ "[ ", transpile(first), " ].concat(", transpile(rest), ")" ];
  });
  sibilant.macros.namespaces.core.append = (function append$(list, additional) {
    /* append include/macros.sibilant:71:0 */
  
    var additional = Array.prototype.slice.call(arguments, 1);
  
    return {
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 1973,
      line: 72,
      col: 8,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: ".",
        type: "dots",
        start: 1974,
        line: 72,
        col: 9,
        length: 1,
        contents: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: "concat",
          type: "literal",
          start: 1975,
          line: 72,
          col: 10,
          length: 6,
          contents: [],
          specials: 0,
          precedingIgnored: []
        } ],
        precedingIgnored: []
      }, list, {
        dir: "include",
        file: "include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 1988,
        line: 72,
        col: 23,
        length: 1,
        contents: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: "list",
          type: "literal",
          start: 1989,
          line: 72,
          col: 24,
          length: 4,
          contents: [],
          specials: 0,
          precedingIgnored: []
        } ].concat(additional),
        precedingIgnored: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 1987,
          line: 72,
          col: 22,
          length: 1,
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
  sibilant.macros.namespaces.core.length = (function length$(arr) {
    /* length include/macros.sibilant:78:0 */
  
    return {
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 2154,
      line: 79,
      col: 8,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "get",
        type: "literal",
        start: 2155,
        line: 79,
        col: 9,
        length: 3,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, arr, {"dir":"include","file":"include/macros.sibilant","token":"'","type":"tick","start":2164,"line":79,"col":18,"length":1,"contents":[{"dir":"include","file":"include/macros.sibilant","token":"length","type":"literal","start":2165,"line":79,"col":19,"length":6,"contents":[],"specials":0,"precedingIgnored":[]}],"precedingIgnored":[{"dir":"include","file":"include/macros.sibilant","token":" ","type":"whitespace","start":2163,"line":79,"col":17,"length":1,"contents":[]}]} ],
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core.scoped = (function scoped$(body) {
    /* scoped include/macros.sibilant:85:0 */
  
    var body = Array.prototype.slice.call(arguments, 0);
  
    return {
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 2409,
      line: 86,
      col: 8,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: ".",
        type: "dots",
        start: 2410,
        line: 86,
        col: 9,
        length: 1,
        contents: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: "call",
          type: "literal",
          start: 2411,
          line: 86,
          col: 10,
          length: 4,
          contents: [],
          specials: 0,
          precedingIgnored: []
        } ],
        precedingIgnored: []
      }, {
        dir: "include",
        file: "include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 2416,
        line: 86,
        col: 15,
        length: 1,
        contents: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: "lambda",
          type: "literal",
          start: 2417,
          line: 86,
          col: 16,
          length: 6,
          contents: [],
          specials: 0,
          precedingIgnored: []
        }, {
          node: this,
          args: []
        } ].concat(body),
        precedingIgnored: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 2415,
          line: 86,
          col: 14,
          length: 1,
          contents: []
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      }, {
        dir: "include",
        file: "include/macros.sibilant",
        token: "this",
        type: "literal",
        start: 2455,
        line: 86,
        col: 54,
        length: 4,
        contents: [],
        specials: 0,
        precedingIgnored: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 2454,
          line: 86,
          col: 53,
          length: 1,
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
  sibilant.macros.namespaces.core.first = (function first$(arr) {
    /* first include/macros.sibilant:91:0 */
  
    return {
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 2597,
      line: 91,
      col: 20,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "get",
        type: "literal",
        start: 2598,
        line: 91,
        col: 21,
        length: 3,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, arr, {
        dir: "include",
        file: "include/macros.sibilant",
        token: "0",
        type: "number",
        start: 2607,
        line: 91,
        col: 30,
        length: 1,
        contents: [],
        specials: 0,
        precedingIgnored: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 2606,
          line: 91,
          col: 29,
          length: 1,
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
    /* second include/macros.sibilant:96:0 */
  
    return {
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 2749,
      line: 96,
      col: 21,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "get",
        type: "literal",
        start: 2750,
        line: 96,
        col: 22,
        length: 3,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, arr, {
        dir: "include",
        file: "include/macros.sibilant",
        token: "1",
        type: "number",
        start: 2759,
        line: 96,
        col: 31,
        length: 1,
        contents: [],
        specials: 0,
        precedingIgnored: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 2758,
          line: 96,
          col: 30,
          length: 1,
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
    /* third include/macros.sibilant:101:0 */
  
    return {
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 2898,
      line: 101,
      col: 20,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "get",
        type: "literal",
        start: 2899,
        line: 101,
        col: 21,
        length: 3,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, arr, {
        dir: "include",
        file: "include/macros.sibilant",
        token: "2",
        type: "number",
        start: 2908,
        line: 101,
        col: 30,
        length: 1,
        contents: [],
        specials: 0,
        precedingIgnored: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 2907,
          line: 101,
          col: 29,
          length: 1,
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
    /* rest include/macros.sibilant:107:0 */
  
    return {
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 3045,
      line: 107,
      col: 19,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: ".",
        type: "dots",
        start: 3046,
        line: 107,
        col: 20,
        length: 1,
        contents: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: "slice",
          type: "literal",
          start: 3047,
          line: 107,
          col: 21,
          length: 5,
          contents: [],
          specials: 0,
          precedingIgnored: []
        } ],
        precedingIgnored: []
      }, arr, {
        dir: "include",
        file: "include/macros.sibilant",
        token: "1",
        type: "number",
        start: 3058,
        line: 107,
        col: 32,
        length: 1,
        contents: [],
        specials: 0,
        precedingIgnored: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 3057,
          line: 107,
          col: 31,
          length: 1,
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
    /* last include/macros.sibilant:112:0 */
  
    return {
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 3205,
      line: 112,
      col: 19,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "first",
        type: "literal",
        start: 3206,
        line: 112,
        col: 20,
        length: 5,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, {
        dir: "include",
        file: "include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 3212,
        line: 112,
        col: 26,
        length: 1,
        contents: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: ".",
          type: "dots",
          start: 3213,
          line: 112,
          col: 27,
          length: 1,
          contents: [ {
            dir: "include",
            file: "include/macros.sibilant",
            token: "slice",
            type: "literal",
            start: 3214,
            line: 112,
            col: 28,
            length: 5,
            contents: [],
            specials: 0,
            precedingIgnored: []
          } ],
          precedingIgnored: []
        }, arr, {
          dir: "include",
          file: "include/macros.sibilant",
          token: "-1",
          type: "number",
          start: 3225,
          line: 112,
          col: 39,
          length: 2,
          contents: [],
          specials: 0,
          precedingIgnored: [ {
            dir: "include",
            file: "include/macros.sibilant",
            token: " ",
            type: "whitespace",
            start: 3224,
            line: 112,
            col: 38,
            length: 1,
            contents: []
          } ]
        } ],
        precedingIgnored: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 3211,
          line: 112,
          col: 25,
          length: 1,
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
  sibilant.macros.namespaces.core["+"] = (function $$(args) {
    /* + include/macros.sibilant:120:0 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    return [ "(", interleave(" + ", map(args, transpile)), ")" ];
  });
  sibilant.macros.namespaces.core.concat = sibilant.macros.namespaces.core["+"];
  sibilant.macros.namespaces.core["-"] = (function $$(args) {
    /* - include/macros.sibilant:128:0 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    return [ "(", interleave(" - ", map(args, transpile)), ")" ];
  });
  sibilant.macros.namespaces.core["_"] = (function _$(args) {
    /* * include/macros.sibilant:134:0 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    return [ "(", interleave(" * ", map(args, transpile)), ")" ];
  });
  sibilant.macros.namespaces.core["/"] = (function $$(args) {
    /* / include/macros.sibilant:141:0 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    return [ "(", interleave(" / ", map(args, transpile)), ")" ];
  });
  sibilant.macros.namespaces.core.or = (function or$(args) {
    /* or include/macros.sibilant:148:0 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    return [ "(", interleave(" || ", map(args, transpile)), ")" ];
  });
  sibilant.macros.namespaces.core.and = (function and$(args) {
    /* and include/macros.sibilant:156:0 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    return (1 === args.length) ? transpile(args[0]) : [ "(", interleave(" && ", map(args, transpile)), ")" ];
  });
  sibilant.macros.namespaces.core.mod = (function mod$(args) {
    /* mod include/macros.sibilant:163:0 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    return [ "(", interleave(" % ", map(args, transpile)), ")" ];
  });
  sibilant.macros.namespaces.core[">"] = (function $$(args) {
    /* > include/macros.sibilant:198:0 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    var jsComparator = ">";
    return {
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 6126,
      line: 200,
      col: 8,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "and",
        type: "literal",
        start: 6127,
        line: 200,
        col: 9,
        length: 3,
        contents: [],
        specials: 0,
        precedingIgnored: []
      } ].concat(map(args.slice(0, -1), (function(item, index) {
        /* include/macros.sibilant:201:22 */
      
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
    /* < include/macros.sibilant:205:0 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    var jsComparator = "<";
    return {
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 6338,
      line: 207,
      col: 8,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "and",
        type: "literal",
        start: 6339,
        line: 207,
        col: 9,
        length: 3,
        contents: [],
        specials: 0,
        precedingIgnored: []
      } ].concat(map(args.slice(0, -1), (function(item, index) {
        /* include/macros.sibilant:208:22 */
      
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
    /* <= include/macros.sibilant:211:0 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    var jsComparator = "<=";
    return {
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 6551,
      line: 213,
      col: 8,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "and",
        type: "literal",
        start: 6552,
        line: 213,
        col: 9,
        length: 3,
        contents: [],
        specials: 0,
        precedingIgnored: []
      } ].concat(map(args.slice(0, -1), (function(item, index) {
        /* include/macros.sibilant:214:22 */
      
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
    /* >= include/macros.sibilant:217:0 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    var jsComparator = ">=";
    return {
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 6764,
      line: 219,
      col: 8,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "and",
        type: "literal",
        start: 6765,
        line: 219,
        col: 9,
        length: 3,
        contents: [],
        specials: 0,
        precedingIgnored: []
      } ].concat(map(args.slice(0, -1), (function(item, index) {
        /* include/macros.sibilant:220:22 */
      
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
    /* != include/macros.sibilant:222:0 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    var jsComparator = "!==";
    return {
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 6977,
      line: 224,
      col: 8,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "and",
        type: "literal",
        start: 6978,
        line: 224,
        col: 9,
        length: 3,
        contents: [],
        specials: 0,
        precedingIgnored: []
      } ].concat(map(args.slice(0, -1), (function(item, index) {
        /* include/macros.sibilant:225:22 */
      
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
    /* = include/macros.sibilant:228:0 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    var jsComparator = "===";
    return {
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 7190,
      line: 230,
      col: 8,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "and",
        type: "literal",
        start: 7191,
        line: 230,
        col: 9,
        length: 3,
        contents: [],
        specials: 0,
        precedingIgnored: []
      } ].concat(map(args.slice(0, -1), (function(item, index) {
        /* include/macros.sibilant:231:22 */
      
        return [ item, " ", jsComparator, " ", args[(1 + index)] ];
      }))),
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core.incrBy = (function incrBy$(item, increment) {
    /* incr-by include/macros.sibilant:238:0 */
  
    return [ transpile(item), " += ", transpile(increment) ];
  });
  sibilant.macros.namespaces.core.incr = (function incr$(item) {
    /* incr include/macros.sibilant:247:0 */
  
    return [ "((", transpile(item), ")++)" ];
  });
  sibilant.macros.namespaces.core.decr = (function decr$(item) {
    /* decr include/macros.sibilant:254:0 */
  
    return [ "((", transpile(item), ")--)" ];
  });
  sibilant.macros.namespaces.core.new = (function new$(constructor, args) {
    /* new include/macros.sibilant:261:0 */
  
    var args = Array.prototype.slice.call(arguments, 1);
  
    return [ "(new ", {
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 8047,
      line: 262,
      col: 17,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "call",
        type: "literal",
        start: 8048,
        line: 262,
        col: 18,
        length: 4,
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
  sibilant.macros.namespaces.core.regex = (function regex$(pattern, flags) {
    /* regex include/macros.sibilant:269:0 */
  
    return {
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 8292,
      line: 270,
      col: 8,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "new",
        type: "literal",
        start: 8293,
        line: 270,
        col: 9,
        length: 3,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, {
        dir: "include",
        file: "include/macros.sibilant",
        token: "RegExp",
        type: "literal",
        start: 8297,
        line: 270,
        col: 13,
        length: 6,
        contents: [],
        specials: 0,
        precedingIgnored: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 8296,
          line: 270,
          col: 12,
          length: 1,
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
  sibilant.macros.namespaces.core["zero__QUERY"] = (function zero__QUERY$(item) {
    /* zero? include/macros.sibilant:277:0 */
  
    return {
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 8458,
      line: 277,
      col: 21,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "=",
        type: "otherChar",
        start: 8459,
        line: 277,
        col: 22,
        length: 1,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, item, {
        dir: "include",
        file: "include/macros.sibilant",
        token: "0",
        type: "number",
        start: 8467,
        line: 277,
        col: 30,
        length: 1,
        contents: [],
        specials: 0,
        precedingIgnored: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 8466,
          line: 277,
          col: 29,
          length: 1,
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
  sibilant.macros.namespaces.core["empty__QUERY"] = (function empty__QUERY$(arr) {
    /* empty? include/macros.sibilant:283:0 */
  
    return {
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 8622,
      line: 284,
      col: 8,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "=",
        type: "otherChar",
        start: 8623,
        line: 284,
        col: 9,
        length: 1,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, {
        dir: "include",
        file: "include/macros.sibilant",
        token: "0",
        type: "number",
        start: 8625,
        line: 284,
        col: 11,
        length: 1,
        contents: [],
        specials: 0,
        precedingIgnored: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 8624,
          line: 284,
          col: 10,
          length: 1,
          contents: []
        } ]
      }, {
        dir: "include",
        file: "include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 8627,
        line: 284,
        col: 13,
        length: 1,
        contents: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: "length",
          type: "literal",
          start: 8628,
          line: 284,
          col: 14,
          length: 6,
          contents: [],
          specials: 0,
          precedingIgnored: []
        }, arr ],
        precedingIgnored: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 8626,
          line: 284,
          col: 12,
          length: 1,
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
  sibilant.macros.namespaces.core["odd__QUERY"] = (function odd__QUERY$(number) {
    /* odd? include/macros.sibilant:290:0 */
  
    return {
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 8774,
      line: 291,
      col: 8,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "=",
        type: "otherChar",
        start: 8775,
        line: 291,
        col: 9,
        length: 1,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, {
        dir: "include",
        file: "include/macros.sibilant",
        token: "1",
        type: "number",
        start: 8777,
        line: 291,
        col: 11,
        length: 1,
        contents: [],
        specials: 0,
        precedingIgnored: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 8776,
          line: 291,
          col: 10,
          length: 1,
          contents: []
        } ]
      }, {
        dir: "include",
        file: "include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 8779,
        line: 291,
        col: 13,
        length: 1,
        contents: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: "mod",
          type: "literal",
          start: 8780,
          line: 291,
          col: 14,
          length: 3,
          contents: [],
          specials: 0,
          precedingIgnored: []
        }, number, {
          dir: "include",
          file: "include/macros.sibilant",
          token: "2",
          type: "number",
          start: 8792,
          line: 291,
          col: 26,
          length: 1,
          contents: [],
          specials: 0,
          precedingIgnored: [ {
            dir: "include",
            file: "include/macros.sibilant",
            token: " ",
            type: "whitespace",
            start: 8791,
            line: 291,
            col: 25,
            length: 1,
            contents: []
          } ]
        } ],
        precedingIgnored: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 8778,
          line: 291,
          col: 12,
          length: 1,
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
  sibilant.macros.namespaces.core["even__QUERY"] = (function even__QUERY$(number) {
    /* even? include/macros.sibilant:297:0 */
  
    return {
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 8945,
      line: 298,
      col: 8,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "=",
        type: "otherChar",
        start: 8946,
        line: 298,
        col: 9,
        length: 1,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, {
        dir: "include",
        file: "include/macros.sibilant",
        token: "0",
        type: "number",
        start: 8948,
        line: 298,
        col: 11,
        length: 1,
        contents: [],
        specials: 0,
        precedingIgnored: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 8947,
          line: 298,
          col: 10,
          length: 1,
          contents: []
        } ]
      }, {
        dir: "include",
        file: "include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 8950,
        line: 298,
        col: 13,
        length: 1,
        contents: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: "mod",
          type: "literal",
          start: 8951,
          line: 298,
          col: 14,
          length: 3,
          contents: [],
          specials: 0,
          precedingIgnored: []
        }, number, {
          dir: "include",
          file: "include/macros.sibilant",
          token: "2",
          type: "number",
          start: 8963,
          line: 298,
          col: 26,
          length: 1,
          contents: [],
          specials: 0,
          precedingIgnored: [ {
            dir: "include",
            file: "include/macros.sibilant",
            token: " ",
            type: "whitespace",
            start: 8962,
            line: 298,
            col: 25,
            length: 1,
            contents: []
          } ]
        } ],
        precedingIgnored: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 8949,
          line: 298,
          col: 12,
          length: 1,
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
  sibilant.macros.namespaces.core.typeof = (function typeof$(thing) {
    /* typeof include/macros.sibilant:305:0 */
  
    return [ "typeof ", transpile(thing) ];
  });
  sibilant.macros.namespaces.core["string__QUERY"] = (function string__QUERY$(things) {
    /* string? include/macros.sibilant:311:0 */
  
    var things = Array.prototype.slice.call(arguments, 0);
  
    return {
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 9399,
      line: 312,
      col: 8,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "and",
        type: "literal",
        start: 9400,
        line: 312,
        col: 9,
        length: 3,
        contents: [],
        specials: 0,
        precedingIgnored: []
      } ].concat(map(things, (function(thing) {
        /* include/macros.sibilant:312:29 */
      
        return {
          dir: "include",
          file: "include/macros.sibilant",
          token: "(",
          type: "expression",
          start: 9431,
          line: 312,
          col: 40,
          length: 1,
          contents: [ {
            dir: "include",
            file: "include/macros.sibilant",
            token: "=",
            type: "otherChar",
            start: 9432,
            line: 312,
            col: 41,
            length: 1,
            contents: [],
            specials: 0,
            precedingIgnored: []
          }, {
            dir: "include",
            file: "include/macros.sibilant",
            token: "(",
            type: "expression",
            start: 9434,
            line: 312,
            col: 43,
            length: 1,
            contents: [ {
              dir: "include",
              file: "include/macros.sibilant",
              token: "typeof",
              type: "literal",
              start: 9435,
              line: 312,
              col: 44,
              length: 6,
              contents: [],
              specials: 0,
              precedingIgnored: []
            }, thing ],
            precedingIgnored: [ {
              dir: "include",
              file: "include/macros.sibilant",
              token: " ",
              type: "whitespace",
              start: 9433,
              line: 312,
              col: 42,
              length: 1,
              contents: []
            } ],
            specials: 0,
            end: undefined,
            closed: true,
            closingIgnored: []
          }, {"dir":"include","file":"include/macros.sibilant","token":"'","type":"tick","start":9450,"line":312,"col":59,"length":1,"contents":[{"dir":"include","file":"include/macros.sibilant","token":"string","type":"literal","start":9451,"line":312,"col":60,"length":6,"contents":[],"specials":0,"precedingIgnored":[]}],"precedingIgnored":[{"dir":"include","file":"include/macros.sibilant","token":" ","type":"whitespace","start":9449,"line":312,"col":58,"length":1,"contents":[]}]} ],
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
  sibilant.macros.namespaces.core["function__QUERY"] = (function function__QUERY$(things) {
    /* function? include/macros.sibilant:318:0 */
  
    var things = Array.prototype.slice.call(arguments, 0);
  
    return {
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 9643,
      line: 319,
      col: 8,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "and",
        type: "literal",
        start: 9644,
        line: 319,
        col: 9,
        length: 3,
        contents: [],
        specials: 0,
        precedingIgnored: []
      } ].concat(map(things, (function(thing) {
        /* include/macros.sibilant:319:29 */
      
        return {
          dir: "include",
          file: "include/macros.sibilant",
          token: "(",
          type: "expression",
          start: 9675,
          line: 319,
          col: 40,
          length: 1,
          contents: [ {
            dir: "include",
            file: "include/macros.sibilant",
            token: "=",
            type: "otherChar",
            start: 9676,
            line: 319,
            col: 41,
            length: 1,
            contents: [],
            specials: 0,
            precedingIgnored: []
          }, {
            dir: "include",
            file: "include/macros.sibilant",
            token: "(",
            type: "expression",
            start: 9678,
            line: 319,
            col: 43,
            length: 1,
            contents: [ {
              dir: "include",
              file: "include/macros.sibilant",
              token: "typeof",
              type: "literal",
              start: 9679,
              line: 319,
              col: 44,
              length: 6,
              contents: [],
              specials: 0,
              precedingIgnored: []
            }, thing ],
            precedingIgnored: [ {
              dir: "include",
              file: "include/macros.sibilant",
              token: " ",
              type: "whitespace",
              start: 9677,
              line: 319,
              col: 42,
              length: 1,
              contents: []
            } ],
            specials: 0,
            end: undefined,
            closed: true,
            closingIgnored: []
          }, {"dir":"include","file":"include/macros.sibilant","token":"'","type":"tick","start":9694,"line":319,"col":59,"length":1,"contents":[{"dir":"include","file":"include/macros.sibilant","token":"function","type":"literal","start":9695,"line":319,"col":60,"length":8,"contents":[],"specials":0,"precedingIgnored":[]}],"precedingIgnored":[{"dir":"include","file":"include/macros.sibilant","token":" ","type":"whitespace","start":9693,"line":319,"col":58,"length":1,"contents":[]}]} ],
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
  sibilant.macros.namespaces.core["undefined__QUERY"] = (function undefined__QUERY$(things) {
    /* undefined? include/macros.sibilant:328:0 */
  
    var things = Array.prototype.slice.call(arguments, 0);
  
    return {
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 10010,
      line: 329,
      col: 8,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "and",
        type: "literal",
        start: 10011,
        line: 329,
        col: 9,
        length: 3,
        contents: [],
        specials: 0,
        precedingIgnored: []
      } ].concat(map(things, (function(thing) {
        /* include/macros.sibilant:329:29 */
      
        return {
          dir: "include",
          file: "include/macros.sibilant",
          token: "(",
          type: "expression",
          start: 10042,
          line: 329,
          col: 40,
          length: 1,
          contents: [ {
            dir: "include",
            file: "include/macros.sibilant",
            token: "=",
            type: "otherChar",
            start: 10043,
            line: 329,
            col: 41,
            length: 1,
            contents: [],
            specials: 0,
            precedingIgnored: []
          }, {
            dir: "include",
            file: "include/macros.sibilant",
            token: "(",
            type: "expression",
            start: 10045,
            line: 329,
            col: 43,
            length: 1,
            contents: [ {
              dir: "include",
              file: "include/macros.sibilant",
              token: "typeof",
              type: "literal",
              start: 10046,
              line: 329,
              col: 44,
              length: 6,
              contents: [],
              specials: 0,
              precedingIgnored: []
            }, thing ],
            precedingIgnored: [ {
              dir: "include",
              file: "include/macros.sibilant",
              token: " ",
              type: "whitespace",
              start: 10044,
              line: 329,
              col: 42,
              length: 1,
              contents: []
            } ],
            specials: 0,
            end: undefined,
            closed: true,
            closingIgnored: []
          }, {"dir":"include","file":"include/macros.sibilant","token":"'","type":"tick","start":10061,"line":329,"col":59,"length":1,"contents":[{"dir":"include","file":"include/macros.sibilant","token":"undefined","type":"literal","start":10062,"line":329,"col":60,"length":9,"contents":[],"specials":0,"precedingIgnored":[]}],"precedingIgnored":[{"dir":"include","file":"include/macros.sibilant","token":" ","type":"whitespace","start":10060,"line":329,"col":58,"length":1,"contents":[]}]} ],
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
  sibilant.macros.namespaces.core["defined__QUERY"] = (function defined__QUERY$(things) {
    /* defined? include/macros.sibilant:337:0 */
  
    var things = Array.prototype.slice.call(arguments, 0);
  
    return {
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 10337,
      line: 338,
      col: 8,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "and",
        type: "literal",
        start: 10338,
        line: 338,
        col: 9,
        length: 3,
        contents: [],
        specials: 0,
        precedingIgnored: []
      } ].concat(map(things, (function(thing) {
        /* include/macros.sibilant:338:29 */
      
        return {
          dir: "include",
          file: "include/macros.sibilant",
          token: "(",
          type: "expression",
          start: 10369,
          line: 338,
          col: 40,
          length: 1,
          contents: [ {
            dir: "include",
            file: "include/macros.sibilant",
            token: "!=",
            type: "otherChar",
            start: 10370,
            line: 338,
            col: 41,
            length: 2,
            contents: [],
            specials: 0,
            precedingIgnored: []
          }, {
            dir: "include",
            file: "include/macros.sibilant",
            token: "(",
            type: "expression",
            start: 10373,
            line: 338,
            col: 44,
            length: 1,
            contents: [ {
              dir: "include",
              file: "include/macros.sibilant",
              token: "typeof",
              type: "literal",
              start: 10374,
              line: 338,
              col: 45,
              length: 6,
              contents: [],
              specials: 0,
              precedingIgnored: []
            }, thing ],
            precedingIgnored: [ {
              dir: "include",
              file: "include/macros.sibilant",
              token: " ",
              type: "whitespace",
              start: 10372,
              line: 338,
              col: 43,
              length: 1,
              contents: []
            } ],
            specials: 0,
            end: undefined,
            closed: true,
            closingIgnored: []
          }, {"dir":"include","file":"include/macros.sibilant","token":"'","type":"tick","start":10389,"line":338,"col":60,"length":1,"contents":[{"dir":"include","file":"include/macros.sibilant","token":"undefined","type":"literal","start":10390,"line":338,"col":61,"length":9,"contents":[],"specials":0,"precedingIgnored":[]}],"precedingIgnored":[{"dir":"include","file":"include/macros.sibilant","token":" ","type":"whitespace","start":10388,"line":338,"col":59,"length":1,"contents":[]}]} ],
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
  sibilant.macros.namespaces.core["number__QUERY"] = (function number__QUERY$(things) {
    /* number? include/macros.sibilant:345:0 */
  
    var things = Array.prototype.slice.call(arguments, 0);
  
    return {
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 10598,
      line: 346,
      col: 8,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "and",
        type: "literal",
        start: 10599,
        line: 346,
        col: 9,
        length: 3,
        contents: [],
        specials: 0,
        precedingIgnored: []
      } ].concat(map(things, (function(thing) {
        /* include/macros.sibilant:346:29 */
      
        return {
          dir: "include",
          file: "include/macros.sibilant",
          token: "(",
          type: "expression",
          start: 10630,
          line: 346,
          col: 40,
          length: 1,
          contents: [ {
            dir: "include",
            file: "include/macros.sibilant",
            token: "=",
            type: "otherChar",
            start: 10631,
            line: 346,
            col: 41,
            length: 1,
            contents: [],
            specials: 0,
            precedingIgnored: []
          }, {
            dir: "include",
            file: "include/macros.sibilant",
            token: "(",
            type: "expression",
            start: 10633,
            line: 346,
            col: 43,
            length: 1,
            contents: [ {
              dir: "include",
              file: "include/macros.sibilant",
              token: "typeof",
              type: "literal",
              start: 10634,
              line: 346,
              col: 44,
              length: 6,
              contents: [],
              specials: 0,
              precedingIgnored: []
            }, thing ],
            precedingIgnored: [ {
              dir: "include",
              file: "include/macros.sibilant",
              token: " ",
              type: "whitespace",
              start: 10632,
              line: 346,
              col: 42,
              length: 1,
              contents: []
            } ],
            specials: 0,
            end: undefined,
            closed: true,
            closingIgnored: []
          }, {"dir":"include","file":"include/macros.sibilant","token":"'","type":"tick","start":10649,"line":346,"col":59,"length":1,"contents":[{"dir":"include","file":"include/macros.sibilant","token":"number","type":"literal","start":10650,"line":346,"col":60,"length":6,"contents":[],"specials":0,"precedingIgnored":[]}],"precedingIgnored":[{"dir":"include","file":"include/macros.sibilant","token":" ","type":"whitespace","start":10648,"line":346,"col":58,"length":1,"contents":[]}]} ],
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
  sibilant.macros.namespaces.core.pipe = (function pipe$(calls) {
    /* pipe include/macros.sibilant:372:0 */
  
    var calls = Array.prototype.slice.call(arguments, 0);
  
    return inject(undefined, calls, (function(value, item) {
      /* include/macros.sibilant:374:15 */
    
      return (function() {
        if (typeof value === "undefined") {
          return item;
        } else {
          return (function() {
            /* include/macros.sibilant:376:21 */
          
            var cloned = (function() {
              if (node__QUERY(item, "literal", "dots")) {
                return {
                  dir: "include",
                  file: "include/macros.sibilant",
                  token: "(",
                  type: "expression",
                  start: 11691,
                  line: 378,
                  col: 39,
                  length: 1,
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
              /* include/macros.sibilant:382:47 */
            
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
  sibilant.macros.namespaces.core.comment = (function comment$(contents) {
    /* comment include/macros.sibilant:403:0 */
  
    var contents = Array.prototype.slice.call(arguments, 0);
  
    return map(contents, (function(content) {
      /* include/macros.sibilant:404:21 */
    
      return [ "// ", recurseMap(transpile(content), (function(item) {
        /* include/macros.sibilant:406:36 */
      
        return (item) ? outputFormatter(transpile(item)).replace((new RegExp("\n", "g")), "\n// ") : null;
      })) ];
    }));
  });
  sibilant.macros.namespaces.core["array__QUERY"] = (function array__QUERY$(thing) {
    /* array? include/macros.sibilant:426:0 */
  
    var transpiled = transpile(thing);
    return [ "((", transpiled, ") && typeof (", transpiled, ") === \"object\" && (", transpiled, ").constructor.name === \"Array\")" ];
  });
  sibilant.macros.namespaces.core["list__QUERY"] = sibilant.macros.namespaces.core["array__QUERY"];
  sibilant.macros.namespaces.core["hash__QUERY"] = (function hash__QUERY$(thing) {
    /* hash? include/macros.sibilant:438:0 */
  
    return {
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 14229,
      line: 439,
      col: 8,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "and",
        type: "literal",
        start: 14230,
        line: 439,
        col: 9,
        length: 3,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, {
        dir: "include",
        file: "include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 14234,
        line: 439,
        col: 13,
        length: 1,
        contents: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: "=",
          type: "otherChar",
          start: 14235,
          line: 439,
          col: 14,
          length: 1,
          contents: [],
          specials: 0,
          precedingIgnored: []
        }, {"dir":"include","file":"include/macros.sibilant","token":"'","type":"tick","start":14237,"line":439,"col":16,"length":1,"contents":[{"dir":"include","file":"include/macros.sibilant","token":"object","type":"literal","start":14238,"line":439,"col":17,"length":6,"contents":[],"specials":0,"precedingIgnored":[]}],"precedingIgnored":[{"dir":"include","file":"include/macros.sibilant","token":" ","type":"whitespace","start":14236,"line":439,"col":15,"length":1,"contents":[]}]}, {
          dir: "include",
          file: "include/macros.sibilant",
          token: "(",
          type: "expression",
          start: 14245,
          line: 439,
          col: 24,
          length: 1,
          contents: [ {
            dir: "include",
            file: "include/macros.sibilant",
            token: "typeof",
            type: "literal",
            start: 14246,
            line: 439,
            col: 25,
            length: 6,
            contents: [],
            specials: 0,
            precedingIgnored: []
          }, thing ],
          precedingIgnored: [ {
            dir: "include",
            file: "include/macros.sibilant",
            token: " ",
            type: "whitespace",
            start: 14244,
            line: 439,
            col: 23,
            length: 1,
            contents: []
          } ],
          specials: 0,
          end: undefined,
          closed: true,
          closingIgnored: []
        } ],
        precedingIgnored: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 14233,
          line: 439,
          col: 12,
          length: 1,
          contents: []
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      }, {
        dir: "include",
        file: "include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 14275,
        line: 440,
        col: 13,
        length: 1,
        contents: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: "!=",
          type: "otherChar",
          start: 14276,
          line: 440,
          col: 14,
          length: 2,
          contents: [],
          specials: 0,
          precedingIgnored: []
        }, thing, {
          dir: "include",
          file: "include/macros.sibilant",
          token: "null",
          type: "literal",
          start: 14286,
          line: 440,
          col: 24,
          length: 4,
          contents: [],
          specials: 0,
          precedingIgnored: [ {
            dir: "include",
            file: "include/macros.sibilant",
            token: " ",
            type: "whitespace",
            start: 14285,
            line: 440,
            col: 23,
            length: 1,
            contents: []
          } ]
        } ],
        precedingIgnored: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: "\n",
          type: "newline",
          start: 14261,
          line: 439,
          col: 40,
          length: 1,
          contents: []
        }, {
          dir: "include",
          file: "include/macros.sibilant",
          token: "             ",
          type: "whitespace",
          start: 14262,
          line: 440,
          col: 0,
          length: 13,
          contents: []
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      }, {
        dir: "include",
        file: "include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 14305,
        line: 441,
        col: 13,
        length: 1,
        contents: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: "!=",
          type: "otherChar",
          start: 14306,
          line: 441,
          col: 14,
          length: 2,
          contents: [],
          specials: 0,
          precedingIgnored: []
        }, {
          dir: "include",
          file: "include/macros.sibilant",
          token: "(",
          type: "expression",
          start: 14309,
          line: 441,
          col: 17,
          length: 1,
          contents: [ {
            dir: "include",
            file: "include/macros.sibilant",
            token: "get",
            type: "literal",
            start: 14310,
            line: 441,
            col: 18,
            length: 3,
            contents: [],
            specials: 0,
            precedingIgnored: []
          }, thing, {"dir":"include","file":"include/macros.sibilant","token":"'","type":"tick","start":14321,"line":441,"col":29,"length":1,"contents":[{"dir":"include","file":"include/macros.sibilant","token":"constructor","type":"literal","start":14322,"line":441,"col":30,"length":11,"contents":[],"specials":0,"precedingIgnored":[]}],"precedingIgnored":[{"dir":"include","file":"include/macros.sibilant","token":" ","type":"whitespace","start":14320,"line":441,"col":28,"length":1,"contents":[]}]}, {"dir":"include","file":"include/macros.sibilant","token":"'","type":"tick","start":14334,"line":441,"col":42,"length":1,"contents":[{"dir":"include","file":"include/macros.sibilant","token":"name","type":"literal","start":14335,"line":441,"col":43,"length":4,"contents":[],"specials":0,"precedingIgnored":[]}],"precedingIgnored":[{"dir":"include","file":"include/macros.sibilant","token":" ","type":"whitespace","start":14333,"line":441,"col":41,"length":1,"contents":[]}]} ],
          precedingIgnored: [ {
            dir: "include",
            file: "include/macros.sibilant",
            token: " ",
            type: "whitespace",
            start: 14308,
            line: 441,
            col: 16,
            length: 1,
            contents: []
          } ],
          specials: 0,
          end: undefined,
          closed: true,
          closingIgnored: []
        }, {"dir":"include","file":"include/macros.sibilant","token":"'","type":"tick","start":14341,"line":441,"col":49,"length":1,"contents":[{"dir":"include","file":"include/macros.sibilant","token":"Array","type":"literal","start":14342,"line":441,"col":50,"length":5,"contents":[],"specials":0,"precedingIgnored":[]}],"precedingIgnored":[{"dir":"include","file":"include/macros.sibilant","token":" ","type":"whitespace","start":14340,"line":441,"col":48,"length":1,"contents":[]}]} ],
        precedingIgnored: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: "\n",
          type: "newline",
          start: 14291,
          line: 440,
          col: 29,
          length: 1,
          contents: []
        }, {
          dir: "include",
          file: "include/macros.sibilant",
          token: "             ",
          type: "whitespace",
          start: 14292,
          line: 441,
          col: 0,
          length: 13,
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
  sibilant.macros.namespaces.core["object__QUERY"] = sibilant.macros.namespaces.core["hash__QUERY"];
  sibilant.macros.namespaces.core["_scopedWithoutReturn"] = (function _scopedWithoutReturn$(body) {
    /* *scoped-without-return include/macros.sibilant:444:0 */
  
    var body = Array.prototype.slice.call(arguments, 0);
  
    return [ "(function() {", indent.apply(this, body), "}).call(this)" ];
  });
  sibilant.macros.namespaces.core["_scopedWithoutSource"] = (function _scopedWithoutSource$(body) {
    /* *scoped-without-source include/macros.sibilant:448:0 */
  
    var body = Array.prototype.slice.call(arguments, 0);
  
    return {
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 14529,
      line: 449,
      col: 8,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "*scoped-without-return",
        type: "literal",
        start: 14530,
        line: 449,
        col: 9,
        length: 22,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, {
        dir: "include",
        file: "include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 14553,
        line: 449,
        col: 32,
        length: 1,
        contents: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: "do",
          type: "literal",
          start: 14554,
          line: 449,
          col: 33,
          length: 2,
          contents: [],
          specials: 0,
          precedingIgnored: []
        } ].concat(body),
        precedingIgnored: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 14552,
          line: 449,
          col: 31,
          length: 1,
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
  sibilant.macros.namespaces.core.when = (function when$(condition, body) {
    /* when include/macros.sibilant:458:0 */
  
    var body = Array.prototype.slice.call(arguments, 1);
  
    return sibilant.macros.namespaces.core["_scopedWithoutReturn"]("if (", condition, ") {", indent({
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 14975,
      line: 461,
      col: 18,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "do",
        type: "literal",
        start: 14976,
        line: 461,
        col: 19,
        length: 2,
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
  sibilant.macros.namespaces.core.not = (function not$(exp) {
    /* not include/macros.sibilant:470:0 */
  
    return [ "!(", transpile(exp), ")" ];
  });
  sibilant.macros.namespaces.core.unless = (function unless$(condition, body) {
    /* unless include/macros.sibilant:483:0 */
  
    var body = Array.prototype.slice.call(arguments, 1);
  
    return [ "(function() {", indent([ "if (", {
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 15708,
      line: 485,
      col: 25,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "not",
        type: "literal",
        start: 15709,
        line: 485,
        col: 26,
        length: 3,
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
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 15764,
      line: 486,
      col: 33,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "do",
        type: "literal",
        start: 15765,
        line: 486,
        col: 34,
        length: 2,
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
  sibilant.macros.namespaces.core.logPretty = (function logPretty$(label, arg) {
    /* log-pretty include/macros.sibilant:497:0 */
  
    var node = this;
    (function() {
      if (typeof arg === "undefined") {
        arg = label;
        return label = [ "\"", prettify(label, false), "\"" ];
      }
    }).call(this);
    return {
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 16341,
      line: 502,
      col: 8,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "console.log",
        type: "literal",
        start: 16342,
        line: 502,
        col: 9,
        length: 11,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, {
        dir: "include",
        file: "include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 16354,
        line: 502,
        col: 21,
        length: 1,
        contents: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: "concat",
          type: "literal",
          start: 16355,
          line: 502,
          col: 22,
          length: 6,
          contents: [],
          specials: 0,
          precedingIgnored: []
        }, [ "\"", node.file, ":", node.line, "\"" ], {
          dir: "include",
          file: "include/macros.sibilant",
          token: "\" \"",
          type: "string",
          start: 16399,
          line: 502,
          col: 66,
          length: 3,
          contents: [],
          specials: 0,
          precedingIgnored: [ {
            dir: "include",
            file: "include/macros.sibilant",
            token: " ",
            type: "whitespace",
            start: 16398,
            line: 502,
            col: 65,
            length: 1,
            contents: []
          } ]
        }, label, {
          dir: "include",
          file: "include/macros.sibilant",
          token: "\" = \"",
          type: "string",
          start: 16410,
          line: 502,
          col: 77,
          length: 5,
          contents: [],
          specials: 0,
          precedingIgnored: [ {
            dir: "include",
            file: "include/macros.sibilant",
            token: " ",
            type: "whitespace",
            start: 16409,
            line: 502,
            col: 76,
            length: 1,
            contents: []
          } ]
        }, {
          dir: "include",
          file: "include/macros.sibilant",
          token: "(",
          type: "expression",
          start: 16416,
          line: 502,
          col: 83,
          length: 1,
          contents: [ {
            dir: "include",
            file: "include/macros.sibilant",
            token: "prettify",
            type: "literal",
            start: 16417,
            line: 502,
            col: 84,
            length: 8,
            contents: [],
            specials: 0,
            precedingIgnored: []
          }, arg ],
          precedingIgnored: [ {
            dir: "include",
            file: "include/macros.sibilant",
            token: " ",
            type: "whitespace",
            start: 16415,
            line: 502,
            col: 82,
            length: 1,
            contents: []
          } ],
          specials: 0,
          end: undefined,
          closed: true,
          closingIgnored: []
        } ],
        precedingIgnored: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 16353,
          line: 502,
          col: 20,
          length: 1,
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
  sibilant.macros.namespaces.core.each = (function each$(item, array, body) {
    /* each include/macros.sibilant:515:17 */
  
    var body = Array.prototype.slice.call(arguments, 2);
  
    return {
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 17211,
      line: 516,
      col: 8,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: ".",
        type: "dots",
        start: 17212,
        line: 516,
        col: 9,
        length: 1,
        contents: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: "for-each",
          type: "literal",
          start: 17213,
          line: 516,
          col: 10,
          length: 8,
          contents: [],
          specials: 0,
          precedingIgnored: []
        } ],
        precedingIgnored: []
      }, array, {
        dir: "include",
        file: "include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 17248,
        line: 517,
        col: 19,
        length: 1,
        contents: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: "lambda",
          type: "literal",
          start: 17249,
          line: 517,
          col: 20,
          length: 6,
          contents: [],
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
        precedingIgnored: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: "\n",
          type: "newline",
          start: 17228,
          line: 516,
          col: 25,
          length: 1,
          contents: []
        }, {
          dir: "include",
          file: "include/macros.sibilant",
          token: "                   ",
          type: "whitespace",
          start: 17229,
          line: 517,
          col: 0,
          length: 19,
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
  sibilant.macros.namespaces.core.throw = (function throw$(error) {
    /* throw include/macros.sibilant:529:0 */
  
    return [ "throw ", transpile(error) ];
  });
  sibilant.macros.namespaces.core.asBoolean = (function asBoolean$(expr) {
    /* as-boolean include/macros.sibilant:540:0 */
  
    return [ "(!!(", transpile(expr), "))" ];
  });
  sibilant.macros.namespaces.core.asNumber = (function asNumber$(expr) {
    /* as-number include/macros.sibilant:549:0 */
  
    return {
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 18158,
      line: 549,
      col: 25,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "Number",
        type: "literal",
        start: 18159,
        line: 549,
        col: 26,
        length: 6,
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
  sibilant.macros.namespaces.core.try = (function try$(tryblock, catchblock) {
    /* try include/macros.sibilant:553:0 */
  
    return [ "(function() {", indent([ "try {", indent({
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 18327,
      line: 556,
      col: 26,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "do",
        type: "literal",
        start: 18328,
        line: 556,
        col: 27,
        length: 2,
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
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 18402,
      line: 558,
      col: 26,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "do",
        type: "literal",
        start: 18403,
        line: 558,
        col: 27,
        length: 2,
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
  sibilant.macros.namespaces.core.while = (function while$(condition, body) {
    /* while include/macros.sibilant:570:0 */
  
    var body = Array.prototype.slice.call(arguments, 1);
  
    var symbol = generateSymbol();
    return {
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 18814,
      line: 572,
      col: 8,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "*scoped-without-source",
        type: "literal",
        start: 18815,
        line: 572,
        col: 9,
        length: 22,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, {
        dir: "include",
        file: "include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 18847,
        line: 573,
        col: 9,
        length: 1,
        contents: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: "var",
          type: "literal",
          start: 18848,
          line: 573,
          col: 10,
          length: 3,
          contents: [],
          specials: 0,
          precedingIgnored: []
        }, symbol ],
        precedingIgnored: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: "\n",
          type: "newline",
          start: 18837,
          line: 572,
          col: 31,
          length: 1,
          contents: []
        }, {
          dir: "include",
          file: "include/macros.sibilant",
          token: "         ",
          type: "whitespace",
          start: 18838,
          line: 573,
          col: 0,
          length: 9,
          contents: []
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      }, {
        type: "output",
        contents: [ "while (", transpile(condition), ") {", indent({
          dir: "include",
          file: "include/macros.sibilant",
          token: "(",
          type: "expression",
          start: 18984,
          line: 576,
          col: 35,
          length: 1,
          contents: [ {
            dir: "include",
            file: "include/macros.sibilant",
            token: "assign",
            type: "literal",
            start: 18985,
            line: 576,
            col: 36,
            length: 6,
            contents: [],
            specials: 0,
            precedingIgnored: []
          }, symbol, {
            dir: "include",
            file: "include/macros.sibilant",
            token: "(",
            type: "expression",
            start: 19000,
            line: 576,
            col: 51,
            length: 1,
            contents: [ {
              dir: "include",
              file: "include/macros.sibilant",
              token: "*scoped-without-source",
              type: "literal",
              start: 19001,
              line: 576,
              col: 52,
              length: 22,
              contents: [],
              specials: 0,
              precedingIgnored: []
            } ].concat(body),
            precedingIgnored: [ {
              dir: "include",
              file: "include/macros.sibilant",
              token: " ",
              type: "whitespace",
              start: 18999,
              line: 576,
              col: 50,
              length: 1,
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
    /* until include/macros.sibilant:589:0 */
  
    var body = Array.prototype.slice.call(arguments, 1);
  
    return {
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 19393,
      line: 590,
      col: 8,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "while",
        type: "literal",
        start: 19394,
        line: 590,
        col: 9,
        length: 5,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, {
        dir: "include",
        file: "include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 19400,
        line: 590,
        col: 15,
        length: 1,
        contents: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: "not",
          type: "literal",
          start: 19401,
          line: 590,
          col: 16,
          length: 3,
          contents: [],
          specials: 0,
          precedingIgnored: []
        }, condition ],
        precedingIgnored: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 19399,
          line: 590,
          col: 14,
          length: 1,
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
  sibilant.macros.namespaces.core["match__QUERY"] = (function match__QUERY$(regexp, string) {
    /* match? include/macros.sibilant:599:0 */
  
    return {
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 19674,
      line: 600,
      col: 8,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: ".",
        type: "dots",
        start: 19675,
        line: 600,
        col: 9,
        length: 1,
        contents: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: "match",
          type: "literal",
          start: 19676,
          line: 600,
          col: 10,
          length: 5,
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
  sibilant.macros.namespaces.core["matchRegex__QUERY"] = (function matchRegex__QUERY$(string, pattern, flags) {
    /* match-regex? include/macros.sibilant:605:0 */
  
    return {
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 19910,
      line: 606,
      col: 8,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "match?",
        type: "literal",
        start: 19911,
        line: 606,
        col: 9,
        length: 6,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, {
        dir: "include",
        file: "include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 19918,
        line: 606,
        col: 16,
        length: 1,
        contents: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: "regex",
          type: "literal",
          start: 19919,
          line: 606,
          col: 17,
          length: 5,
          contents: [],
          specials: 0,
          precedingIgnored: []
        }, pattern, flags ],
        precedingIgnored: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 19917,
          line: 606,
          col: 15,
          length: 1,
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
    /* replace include/macros.sibilant:612:0 */
  
    return {
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 20172,
      line: 613,
      col: 8,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: ".",
        type: "dots",
        start: 20173,
        line: 613,
        col: 9,
        length: 1,
        contents: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: "replace",
          type: "literal",
          start: 20174,
          line: 613,
          col: 10,
          length: 7,
          contents: [],
          specials: 0,
          precedingIgnored: []
        } ],
        precedingIgnored: []
      }, string, {
        dir: "include",
        file: "include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 20204,
        line: 614,
        col: 14,
        length: 1,
        contents: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: "regex",
          type: "literal",
          start: 20205,
          line: 614,
          col: 15,
          length: 5,
          contents: [],
          specials: 0,
          precedingIgnored: []
        }, pattern ],
        precedingIgnored: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: "\n",
          type: "newline",
          start: 20189,
          line: 613,
          col: 25,
          length: 1,
          contents: []
        }, {
          dir: "include",
          file: "include/macros.sibilant",
          token: "              ",
          type: "whitespace",
          start: 20190,
          line: 614,
          col: 0,
          length: 14,
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
    /* replace-all include/macros.sibilant:620:0 */
  
    return {
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 20469,
      line: 621,
      col: 8,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: ".",
        type: "dots",
        start: 20470,
        line: 621,
        col: 9,
        length: 1,
        contents: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: "replace",
          type: "literal",
          start: 20471,
          line: 621,
          col: 10,
          length: 7,
          contents: [],
          specials: 0,
          precedingIgnored: []
        } ],
        precedingIgnored: []
      }, string, {
        dir: "include",
        file: "include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 20487,
        line: 621,
        col: 26,
        length: 1,
        contents: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: "regex",
          type: "literal",
          start: 20488,
          line: 621,
          col: 27,
          length: 5,
          contents: [],
          specials: 0,
          precedingIgnored: []
        }, pattern, {"dir":"include","file":"include/macros.sibilant","token":"'","type":"tick","start":20503,"line":621,"col":42,"length":1,"contents":[{"dir":"include","file":"include/macros.sibilant","token":"g","type":"literal","start":20504,"line":621,"col":43,"length":1,"contents":[],"specials":0,"precedingIgnored":[]}],"precedingIgnored":[{"dir":"include","file":"include/macros.sibilant","token":" ","type":"whitespace","start":20502,"line":621,"col":41,"length":1,"contents":[]}]} ],
        precedingIgnored: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 20486,
          line: 621,
          col: 25,
          length: 1,
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
  sibilant.macros.namespaces.core.thunk = (function thunk$(body) {
    /* thunk include/macros.sibilant:634:0 */
  
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
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 21092,
      line: 642,
      col: 8,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "lambda",
        type: "literal",
        start: 21093,
        line: 642,
        col: 9,
        length: 6,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, lambdaOptions ].concat(mapNode(body, (function(node) {
        /* include/macros.sibilant:644:17 */
      
        return (function() {
          if (node__QUERY(node, "argPlaceholder")) {
            return {
              dir: "include",
              file: "include/macros.sibilant",
              token: "(",
              type: "expression",
              start: 21245,
              line: 646,
              col: 24,
              length: 1,
              contents: [ {
                dir: "include",
                file: "include/macros.sibilant",
                token: "argument",
                type: "literal",
                start: 21246,
                line: 646,
                col: 25,
                length: 8,
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
  sibilant.macros.namespaces.core.pipeThunk = (function pipeThunk$(calls) {
    /* pipe-thunk include/macros.sibilant:657:0 */
  
    var calls = Array.prototype.slice.call(arguments, 0);
  
    return {
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 21626,
      line: 657,
      col: 30,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "thunk",
        type: "literal",
        start: 21627,
        line: 657,
        col: 31,
        length: 5,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, { node: this }, {
        dir: "include",
        file: "include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 21648,
        line: 657,
        col: 52,
        length: 1,
        contents: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: "pipe",
          type: "literal",
          start: 21649,
          line: 657,
          col: 53,
          length: 4,
          contents: [],
          specials: 0,
          precedingIgnored: []
        }, {
          dir: "include",
          file: "include/macros.sibilant",
          token: "#0",
          type: "argPlaceholder",
          start: 21654,
          line: 657,
          col: 58,
          length: 2,
          contents: [],
          specials: 0,
          precedingIgnored: [ {
            dir: "include",
            file: "include/macros.sibilant",
            token: " ",
            type: "whitespace",
            start: 21653,
            line: 657,
            col: 57,
            length: 1,
            contents: []
          } ]
        } ].concat(calls),
        precedingIgnored: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 21647,
          line: 657,
          col: 51,
          length: 1,
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
  sibilant.macros.namespaces.core.keys = (function keys$(obj) {
    /* keys include/macros.sibilant:669:0 */
  
    return {
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 21960,
      line: 670,
      col: 8,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "Object.keys",
        type: "literal",
        start: 21961,
        line: 670,
        col: 9,
        length: 11,
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
    /* delete include/macros.sibilant:682:0 */
  
    var objects = Array.prototype.slice.call(arguments, 0);
  
    return interleave("\n", map(objects, (function(obj) {
      /* include/macros.sibilant:683:37 */
    
      return asStatement([ "delete ", transpile(obj) ]);
    })));
  });
  sibilant.macros.namespaces.core.deleteMacro = (function deleteMacro$(macroNames) {
    /* delete-macro include/macros.sibilant:694:0 */
  
    var macroNames = Array.prototype.slice.call(arguments, 0);
  
    macroNames.forEach((function(macroName) {
      /* include/macros.sibilant:695:7 */
    
      return delete sibilant.macros.namespace[outputFormatter(transpile(macroName))];
    }));
    return null;
  });
  sibilant.macros.namespaces.core.delmacro = sibilant.macros.namespaces.core.deleteMacro;
  sibilant.macros.namespaces.core.renameMacro = (function renameMacro$(currentMacroName, newMacroName) {
    /* rename-macro include/macros.sibilant:707:0 */
  
    sibilant.macros.namespaces.core.aliasMacro(currentMacroName, newMacroName);
    sibilant.macros.namespaces.core.deleteMacro(currentMacroName);
    return null;
  });
  sibilant.macros.namespaces.core.arguments = (function arguments$() {
    /* arguments include/macros.sibilant:722:0 */
  
    return [ "(Array.prototype.slice.apply(arguments))" ];
  });
  sibilant.macros.namespaces.core.argument = (function argument$(index) {
    /* argument include/macros.sibilant:734:0 */
  
    return {
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 23546,
      line: 735,
      col: 8,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "get",
        type: "literal",
        start: 23547,
        line: 735,
        col: 9,
        length: 3,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, {
        dir: "include",
        file: "include/macros.sibilant",
        token: "arguments",
        type: "literal",
        start: 23551,
        line: 735,
        col: 13,
        length: 9,
        contents: [],
        specials: 0,
        precedingIgnored: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 23550,
          line: 735,
          col: 12,
          length: 1,
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
  sibilant.macros.namespaces.core.eachKey = (function eachKey$(as, obj, body) {
    /* each-key include/macros.sibilant:743:0 */
  
    var body = Array.prototype.slice.call(arguments, 2);
  
    return {
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 23754,
      line: 744,
      col: 8,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "pipe",
        type: "literal",
        start: 23755,
        line: 744,
        col: 9,
        length: 4,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, obj, {
        dir: "include",
        file: "include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 23765,
        line: 744,
        col: 19,
        length: 1,
        contents: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: "keys",
          type: "literal",
          start: 23766,
          line: 744,
          col: 20,
          length: 4,
          contents: [],
          specials: 0,
          precedingIgnored: []
        } ],
        precedingIgnored: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 23764,
          line: 744,
          col: 18,
          length: 1,
          contents: []
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      }, {
        dir: "include",
        file: "include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 23786,
        line: 745,
        col: 14,
        length: 1,
        contents: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: ".",
          type: "dots",
          start: 23787,
          line: 745,
          col: 15,
          length: 1,
          contents: [ {
            dir: "include",
            file: "include/macros.sibilant",
            token: "for-each",
            type: "literal",
            start: 23788,
            line: 745,
            col: 16,
            length: 8,
            contents: [],
            specials: 0,
            precedingIgnored: []
          } ],
          precedingIgnored: []
        }, {
          dir: "include",
          file: "include/macros.sibilant",
          token: "(",
          type: "expression",
          start: 23797,
          line: 745,
          col: 25,
          length: 1,
          contents: [ {
            dir: "include",
            file: "include/macros.sibilant",
            token: "lambda",
            type: "literal",
            start: 23798,
            line: 745,
            col: 26,
            length: 6,
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
            dir: "include",
            file: "include/macros.sibilant",
            token: " ",
            type: "whitespace",
            start: 23796,
            line: 745,
            col: 24,
            length: 1,
            contents: []
          } ],
          specials: 0,
          end: undefined,
          closed: true,
          closingIgnored: []
        } ],
        precedingIgnored: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: "\n",
          type: "newline",
          start: 23771,
          line: 744,
          col: 25,
          length: 1,
          contents: []
        }, {
          dir: "include",
          file: "include/macros.sibilant",
          token: "              ",
          type: "whitespace",
          start: 23772,
          line: 745,
          col: 0,
          length: 14,
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
  sibilant.macros.namespaces.core.switch = (function switch$(obj, cases) {
    /* switch include/macros.sibilant:766:0 */
  
    var cases = Array.prototype.slice.call(arguments, 1);
  
    return [ "(function() {", indent([ "switch(", transpile(obj), ") {", map(cases, (function(caseDef) {
      /* include/macros.sibilant:769:30 */
    
      var caseNameNode = caseDef.contents[0],
          caseLabels = (function() {
        if (node__QUERY(caseNameNode, "expression", "bracket")) {
          return caseNameNode.contents;
        } else {
          return [ caseNameNode ];
        }
      }).call(this),
          caseString = interleave("\n", map(caseLabels, (function(c) {
        /* include/macros.sibilant:775:78 */
      
        return (function() {
          if ("default" === c.token) {
            return "default:";
          } else {
            return [ "case ", transpile(c), ":" ];
          }
        }).call(this);
      })));
      return [ "\n", caseString, indent({
        dir: "include",
        file: "include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 25443,
        line: 779,
        col: 59,
        length: 1,
        contents: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: "do",
          type: "literal",
          start: 25444,
          line: 779,
          col: 60,
          length: 2,
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
  sibilant.macros.namespaces.core.if = (function if$(alternatingConditionsAndBranches) {
    /* if include/macros.sibilant:811:0 */
  
    var alternatingConditionsAndBranches = Array.prototype.slice.call(arguments, 0);
  
    return [ "(function() {", indent(interleave(" else ", bulkMap(alternatingConditionsAndBranches, (function(cond, val) {
      /* include/macros.sibilant:816:25 */
    
      return (function() {
        if (typeof val !== "undefined") {
          return [ "if (", transpile(cond), ") {", indent({
            dir: "include",
            file: "include/macros.sibilant",
            token: "(",
            type: "expression",
            start: 26719,
            line: 819,
            col: 44,
            length: 1,
            contents: [ {
              dir: "include",
              file: "include/macros.sibilant",
              token: "do",
              type: "literal",
              start: 26720,
              line: 819,
              col: 45,
              length: 2,
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
            dir: "include",
            file: "include/macros.sibilant",
            token: "(",
            type: "expression",
            start: 26817,
            line: 821,
            col: 47,
            length: 1,
            contents: [ {
              dir: "include",
              file: "include/macros.sibilant",
              token: "do",
              type: "literal",
              start: 26818,
              line: 821,
              col: 48,
              length: 2,
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
  sibilant.macros.namespaces.core["instanceOf__QUERY"] = (function instanceOf__QUERY$(item, type) {
    /* instance-of? include/macros.sibilant:834:0 */
  
    return [ "(", transpile(item), " instanceof ", transpile(type), ")" ];
  });
  sibilant.macros.namespaces.core["includes__QUERY"] = (function includes__QUERY$(haystack, needle) {
    /* includes? include/macros.sibilant:845:0 */
  
    return {
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 27385,
      line: 846,
      col: 8,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "pipe",
        type: "literal",
        start: 27386,
        line: 846,
        col: 9,
        length: 4,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, haystack, {
        dir: "include",
        file: "include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 27401,
        line: 846,
        col: 24,
        length: 1,
        contents: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: ".",
          type: "dots",
          start: 27402,
          line: 846,
          col: 25,
          length: 1,
          contents: [ {
            dir: "include",
            file: "include/macros.sibilant",
            token: "index-of",
            type: "literal",
            start: 27403,
            line: 846,
            col: 26,
            length: 8,
            contents: [],
            specials: 0,
            precedingIgnored: []
          } ],
          precedingIgnored: []
        }, needle ],
        precedingIgnored: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 27400,
          line: 846,
          col: 23,
          length: 1,
          contents: []
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      }, {
        dir: "include",
        file: "include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 27421,
        line: 846,
        col: 44,
        length: 1,
        contents: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: "!=",
          type: "otherChar",
          start: 27422,
          line: 846,
          col: 45,
          length: 2,
          contents: [],
          specials: 0,
          precedingIgnored: []
        }, {
          dir: "include",
          file: "include/macros.sibilant",
          token: "-1",
          type: "number",
          start: 27425,
          line: 846,
          col: 48,
          length: 2,
          contents: [],
          specials: 0,
          precedingIgnored: [ {
            dir: "include",
            file: "include/macros.sibilant",
            token: " ",
            type: "whitespace",
            start: 27424,
            line: 846,
            col: 47,
            length: 1,
            contents: []
          } ]
        } ],
        precedingIgnored: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 27420,
          line: 846,
          col: 43,
          length: 1,
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
  sibilant.macros.namespaces.core["excludes__QUERY"] = (function excludes__QUERY$(haystack, needle) {
    /* excludes? include/macros.sibilant:858:0 */
  
    return {
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 27698,
      line: 859,
      col: 8,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "pipe",
        type: "literal",
        start: 27699,
        line: 859,
        col: 9,
        length: 4,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, haystack, {
        dir: "include",
        file: "include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 27714,
        line: 859,
        col: 24,
        length: 1,
        contents: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: ".",
          type: "dots",
          start: 27715,
          line: 859,
          col: 25,
          length: 1,
          contents: [ {
            dir: "include",
            file: "include/macros.sibilant",
            token: "index-of",
            type: "literal",
            start: 27716,
            line: 859,
            col: 26,
            length: 8,
            contents: [],
            specials: 0,
            precedingIgnored: []
          } ],
          precedingIgnored: []
        }, needle ],
        precedingIgnored: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 27713,
          line: 859,
          col: 23,
          length: 1,
          contents: []
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      }, {
        dir: "include",
        file: "include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 27734,
        line: 859,
        col: 44,
        length: 1,
        contents: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: "=",
          type: "otherChar",
          start: 27735,
          line: 859,
          col: 45,
          length: 1,
          contents: [],
          specials: 0,
          precedingIgnored: []
        }, {
          dir: "include",
          file: "include/macros.sibilant",
          token: "-1",
          type: "number",
          start: 27737,
          line: 859,
          col: 47,
          length: 2,
          contents: [],
          specials: 0,
          precedingIgnored: [ {
            dir: "include",
            file: "include/macros.sibilant",
            token: " ",
            type: "whitespace",
            start: 27736,
            line: 859,
            col: 46,
            length: 1,
            contents: []
          } ]
        } ],
        precedingIgnored: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 27733,
          line: 859,
          col: 43,
          length: 1,
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
  sibilant.macros.namespaces.core["exists__QUERY"] = (function exists__QUERY$(thing) {
    /* exists? include/macros.sibilant:869:0 */
  
    return {
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 27952,
      line: 870,
      col: 8,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "and",
        type: "literal",
        start: 27953,
        line: 870,
        col: 9,
        length: 3,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, {
        dir: "include",
        file: "include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 27957,
        line: 870,
        col: 13,
        length: 1,
        contents: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: "defined?",
          type: "literal",
          start: 27958,
          line: 870,
          col: 14,
          length: 8,
          contents: [],
          specials: 0,
          precedingIgnored: []
        }, thing ],
        precedingIgnored: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 27956,
          line: 870,
          col: 12,
          length: 1,
          contents: []
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      }, {
        dir: "include",
        file: "include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 27975,
        line: 870,
        col: 31,
        length: 1,
        contents: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: "!=",
          type: "otherChar",
          start: 27976,
          line: 870,
          col: 32,
          length: 2,
          contents: [],
          specials: 0,
          precedingIgnored: []
        }, thing, {
          dir: "include",
          file: "include/macros.sibilant",
          token: "null",
          type: "literal",
          start: 27986,
          line: 870,
          col: 42,
          length: 4,
          contents: [],
          specials: 0,
          precedingIgnored: [ {
            dir: "include",
            file: "include/macros.sibilant",
            token: " ",
            type: "whitespace",
            start: 27985,
            line: 870,
            col: 41,
            length: 1,
            contents: []
          } ]
        } ],
        precedingIgnored: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 27974,
          line: 870,
          col: 30,
          length: 1,
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
  sibilant.macros.namespaces.core.withState = (function withState$(k, v, body) {
    /* with-state include/macros.sibilant:876:0 */
  
    var body = Array.prototype.slice.call(arguments, 2);
  
    var state = sibilant.state,
        temp$6 = map([ k, v ], (function() {
      /* include/macros.sibilant:878:41 */
    
      return outputFormatter(transpile(arguments[0]));
    })),
        key = temp$6[0],
        value = temp$6[1],
        temp$6 = undefined,
        before = state[key];
    state[key] = value;
    var returnValue = interleave("\n", map(body, transpile));
    state[key] = before;
    return returnValue;
  });
  sibilant.macros.namespaces.core.join = (function join$(arr, glue) {
    /* join include/macros.sibilant:896:0 */
  
    (function() {
      if ((typeof glue !== "undefined" && typeof arr === "undefined")) {
        arr = glue;
        return glue = undefined;
      }
    }).call(this);
    return {
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 28795,
      line: 899,
      col: 8,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: ".",
        type: "dots",
        start: 28796,
        line: 899,
        col: 9,
        length: 1,
        contents: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: "join",
          type: "literal",
          start: 28797,
          line: 899,
          col: 10,
          length: 4,
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
  sibilant.macros.namespaces.core.parens = (function parens$(node) {
    /* parens include/macros.sibilant:901:0 */
  
    return [ "(", node, ")" ];
  });
  sibilant.macros.namespaces.core.var = (function var$(pairs) {
    /* var include/macros.sibilant:918:0 */
  
    var pairs = Array.prototype.slice.call(arguments, 0);
  
    return asStatement([ "var ", interleave(map(destructure(pairs), (function(pair) {
      /* include/macros.sibilant:922:25 */
    
      return [ pair[0], " = ", pair[1] ];
    })), ",\n    ") ]);
  });
  sibilant.macros.namespaces.core.assign = (function assign$(pairs) {
    /* assign include/macros.sibilant:941:0 */
  
    var pairs = Array.prototype.slice.call(arguments, 0);
  
    return interleave(map(destructure(pairs), (function(pair) {
      /* include/macros.sibilant:944:17 */
    
      return asStatement([ pair[0], " = ", pair[1] ]);
    })), "\n");
  });
  sibilant.macros.namespaces.core.default = (function default$(pairs) {
    /* default include/macros.sibilant:952:0 */
  
    var pairs = Array.prototype.slice.call(arguments, 0);
  
    return interleave("\n", bulkMap(pairs, (function(name, value) {
      /* include/macros.sibilant:953:40 */
    
      return {
        dir: "include",
        file: "include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 30542,
        line: 954,
        col: 35,
        length: 1,
        contents: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: "assign",
          type: "literal",
          start: 30543,
          line: 954,
          col: 36,
          length: 6,
          contents: [],
          specials: 0,
          precedingIgnored: []
        }, name, {
          dir: "include",
          file: "include/macros.sibilant",
          token: "(",
          type: "expression",
          start: 30556,
          line: 954,
          col: 49,
          length: 1,
          contents: [ {
            dir: "include",
            file: "include/macros.sibilant",
            token: "ternary",
            type: "literal",
            start: 30557,
            line: 954,
            col: 50,
            length: 7,
            contents: [],
            specials: 0,
            precedingIgnored: []
          }, {
            dir: "include",
            file: "include/macros.sibilant",
            token: "(",
            type: "expression",
            start: 30565,
            line: 954,
            col: 58,
            length: 1,
            contents: [ {
              dir: "include",
              file: "include/macros.sibilant",
              token: "defined?",
              type: "literal",
              start: 30566,
              line: 954,
              col: 59,
              length: 8,
              contents: [],
              specials: 0,
              precedingIgnored: []
            }, name ],
            precedingIgnored: [ {
              dir: "include",
              file: "include/macros.sibilant",
              token: " ",
              type: "whitespace",
              start: 30564,
              line: 954,
              col: 57,
              length: 1,
              contents: []
            } ],
            specials: 0,
            end: undefined,
            closed: true,
            closingIgnored: []
          }, name, value ],
          precedingIgnored: [ {
            dir: "include",
            file: "include/macros.sibilant",
            token: " ",
            type: "whitespace",
            start: 30555,
            line: 954,
            col: 48,
            length: 1,
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
  sibilant.macros.namespaces.core.importNamespace = (function importNamespace$(namespace) {
    /* import-namespace include/macros.sibilant:957:0 */
  
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
    /* namespace include/macros.sibilant:965:0 */
  
    sibilant.macros.namespaces.core.importNamespace(namespace);
    sibilant.macros.namespace = sibilant.macros.namespaces[outputFormatter(transpile(namespace))];
    return undefined;
  });
  sibilant.macros.namespaces.core["hasKey__QUERY"] = (function hasKey__QUERY$(object, key) {
    /* has-key? include/macros.sibilant:980:0 */
  
    return {
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 31350,
      line: 981,
      col: 8,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: ".",
        type: "dots",
        start: 31351,
        line: 981,
        col: 9,
        length: 1,
        contents: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: "has-own-property",
          type: "literal",
          start: 31352,
          line: 981,
          col: 10,
          length: 16,
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
  sibilant.macros.namespaces.core.get = (function get$(obj, keys) {
    /* get include/macros.sibilant:1002:0 */
  
    var keys = Array.prototype.slice.call(arguments, 1);
  
    return [ transpile(obj), map(keys, (function(key) {
      /* include/macros.sibilant:1004:19 */
    
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
    /* set include/macros.sibilant:1031:0 */
  
    var kvPairs = Array.prototype.slice.call(arguments, 1);
  
    return interleave("\n", bulkMap(kvPairs, (function(k, v) {
      /* include/macros.sibilant:1032:43 */
    
      return {
        dir: "include",
        file: "include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 33018,
        line: 1032,
        col: 52,
        length: 1,
        contents: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: "assign",
          type: "literal",
          start: 33019,
          line: 1032,
          col: 53,
          length: 6,
          contents: [],
          specials: 0,
          precedingIgnored: []
        }, {
          dir: "include",
          file: "include/macros.sibilant",
          token: "(",
          type: "expression",
          start: 33026,
          line: 1032,
          col: 60,
          length: 1,
          contents: [ {
            dir: "include",
            file: "include/macros.sibilant",
            token: "get",
            type: "literal",
            start: 33027,
            line: 1032,
            col: 61,
            length: 3,
            contents: [],
            specials: 0,
            precedingIgnored: []
          }, arr, k ],
          precedingIgnored: [ {
            dir: "include",
            file: "include/macros.sibilant",
            token: " ",
            type: "whitespace",
            start: 33025,
            line: 1032,
            col: 59,
            length: 1,
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
  sibilant.macros.namespaces.core["lowerCase__QUERY"] = (function lowerCase__QUERY$(str) {
    /* lower-case? include/macros.sibilant:1037:0 */
  
    return {
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 33215,
      line: 1038,
      col: 8,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "=",
        type: "otherChar",
        start: 33216,
        line: 1038,
        col: 9,
        length: 1,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, {
        dir: "include",
        file: "include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 33218,
        line: 1038,
        col: 11,
        length: 1,
        contents: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: ".",
          type: "dots",
          start: 33219,
          line: 1038,
          col: 12,
          length: 1,
          contents: [ {
            dir: "include",
            file: "include/macros.sibilant",
            token: "to-lower-case",
            type: "literal",
            start: 33220,
            line: 1038,
            col: 13,
            length: 13,
            contents: [],
            specials: 0,
            precedingIgnored: []
          } ],
          precedingIgnored: []
        }, str ],
        precedingIgnored: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 33217,
          line: 1038,
          col: 10,
          length: 1,
          contents: []
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      }, str ],
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core["upperCase__QUERY"] = (function upperCase__QUERY$(str) {
    /* upper-case? include/macros.sibilant:1045:0 */
  
    return {
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 33416,
      line: 1046,
      col: 8,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "=",
        type: "otherChar",
        start: 33417,
        line: 1046,
        col: 9,
        length: 1,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, {
        dir: "include",
        file: "include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 33419,
        line: 1046,
        col: 11,
        length: 1,
        contents: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: ".",
          type: "dots",
          start: 33420,
          line: 1046,
          col: 12,
          length: 1,
          contents: [ {
            dir: "include",
            file: "include/macros.sibilant",
            token: "to-upper-case",
            type: "literal",
            start: 33421,
            line: 1046,
            col: 13,
            length: 13,
            contents: [],
            specials: 0,
            precedingIgnored: []
          } ],
          precedingIgnored: []
        }, str ],
        precedingIgnored: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 33418,
          line: 1046,
          col: 10,
          length: 1,
          contents: []
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      }, str ],
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  });
  sibilant.macros.namespaces.core.sourceMappingUrl = (function sourceMappingUrl$(url) {
    /* source-mapping-url include/macros.sibilant:1053:0 */
  
    return [ "//# sourceMappingURL=", eval(outputFormatter(transpile(url))), "\n" ];
  });
  sibilant.macros.namespaces.core.sortBy = (function sortBy$(arrayOfObjects, attribute) {
    /* sort-by include/macros.sibilant:1062:0 */
  
    return {
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 34055,
      line: 1063,
      col: 8,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: ".",
        type: "dots",
        start: 34056,
        line: 1063,
        col: 9,
        length: 1,
        contents: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: "sort",
          type: "literal",
          start: 34057,
          line: 1063,
          col: 10,
          length: 4,
          contents: [],
          specials: 0,
          precedingIgnored: []
        } ],
        precedingIgnored: []
      }, arrayOfObjects, {
        dir: "include",
        file: "include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 34095,
        line: 1064,
        col: 15,
        length: 1,
        contents: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: "#->",
          type: "otherChar",
          start: 34096,
          line: 1064,
          col: 16,
          length: 3,
          contents: [],
          specials: 0,
          precedingIgnored: []
        }, {
          dir: "include",
          file: "include/macros.sibilant",
          token: "(",
          type: "expression",
          start: 34100,
          line: 1064,
          col: 20,
          length: 1,
          contents: [ {
            dir: "include",
            file: "include/macros.sibilant",
            token: "get",
            type: "literal",
            start: 34101,
            line: 1064,
            col: 21,
            length: 3,
            contents: [],
            specials: 0,
            precedingIgnored: []
          }, attribute ],
          precedingIgnored: [ {
            dir: "include",
            file: "include/macros.sibilant",
            token: " ",
            type: "whitespace",
            start: 34099,
            line: 1064,
            col: 19,
            length: 1,
            contents: []
          } ],
          specials: 0,
          end: undefined,
          closed: true,
          closingIgnored: []
        }, {
          dir: "include",
          file: "include/macros.sibilant",
          token: ".",
          type: "dots",
          start: 34137,
          line: 1065,
          col: 20,
          length: 1,
          contents: [ {
            dir: "include",
            file: "include/macros.sibilant",
            token: "to-string",
            type: "literal",
            start: 34138,
            line: 1065,
            col: 21,
            length: 9,
            contents: [],
            specials: 0,
            precedingIgnored: []
          } ],
          precedingIgnored: [ {
            dir: "include",
            file: "include/macros.sibilant",
            token: "\n",
            type: "newline",
            start: 34116,
            line: 1064,
            col: 36,
            length: 1,
            contents: []
          }, {
            dir: "include",
            file: "include/macros.sibilant",
            token: "                    ",
            type: "whitespace",
            start: 34117,
            line: 1065,
            col: 0,
            length: 20,
            contents: []
          } ]
        }, {
          dir: "include",
          file: "include/macros.sibilant",
          token: "(",
          type: "expression",
          start: 34168,
          line: 1066,
          col: 20,
          length: 1,
          contents: [ {
            dir: "include",
            file: "include/macros.sibilant",
            token: ".",
            type: "dots",
            start: 34169,
            line: 1066,
            col: 21,
            length: 1,
            contents: [ {
              dir: "include",
              file: "include/macros.sibilant",
              token: "locale-compare",
              type: "literal",
              start: 34170,
              line: 1066,
              col: 22,
              length: 14,
              contents: [],
              specials: 0,
              precedingIgnored: []
            } ],
            precedingIgnored: []
          }, {
            dir: "include",
            file: "include/macros.sibilant",
            token: "(",
            type: "expression",
            start: 34185,
            line: 1066,
            col: 37,
            length: 1,
            contents: [ {
              dir: "include",
              file: "include/macros.sibilant",
              token: "get",
              type: "literal",
              start: 34186,
              line: 1066,
              col: 38,
              length: 3,
              contents: [],
              specials: 0,
              precedingIgnored: []
            }, {
              dir: "include",
              file: "include/macros.sibilant",
              token: "#1",
              type: "argPlaceholder",
              start: 34190,
              line: 1066,
              col: 42,
              length: 2,
              contents: [],
              specials: 0,
              precedingIgnored: [ {
                dir: "include",
                file: "include/macros.sibilant",
                token: " ",
                type: "whitespace",
                start: 34189,
                line: 1066,
                col: 41,
                length: 1,
                contents: []
              } ]
            }, attribute ],
            precedingIgnored: [ {
              dir: "include",
              file: "include/macros.sibilant",
              token: " ",
              type: "whitespace",
              start: 34184,
              line: 1066,
              col: 36,
              length: 1,
              contents: []
            } ],
            specials: 0,
            end: undefined,
            closed: true,
            closingIgnored: []
          } ],
          precedingIgnored: [ {
            dir: "include",
            file: "include/macros.sibilant",
            token: "\n",
            type: "newline",
            start: 34147,
            line: 1065,
            col: 30,
            length: 1,
            contents: []
          }, {
            dir: "include",
            file: "include/macros.sibilant",
            token: "                    ",
            type: "whitespace",
            start: 34148,
            line: 1066,
            col: 0,
            length: 20,
            contents: []
          } ],
          specials: 0,
          end: undefined,
          closed: true,
          closingIgnored: []
        } ],
        precedingIgnored: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: "\n",
          type: "newline",
          start: 34079,
          line: 1063,
          col: 32,
          length: 1,
          contents: []
        }, {
          dir: "include",
          file: "include/macros.sibilant",
          token: "               ",
          type: "whitespace",
          start: 34080,
          line: 1064,
          col: 0,
          length: 15,
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
  sibilant.macros.namespaces.core["require__BANG"] = (function require__BANG$(requires) {
    /* require! include/macros.sibilant:1069:0 */
  
    var requires = Array.prototype.slice.call(arguments, 0);
  
    return {
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 34249,
      line: 1070,
      col: 8,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "var",
        type: "literal",
        start: 34250,
        line: 1070,
        col: 9,
        length: 3,
        contents: [],
        specials: 0,
        precedingIgnored: []
      } ].concat(inject([], requires, (function(pairs, node) {
        /* include/macros.sibilant:1071:25 */
      
        return pairs.concat((function() {
          if ((0 === (pairs.length % 2) && node__QUERY(node, "tick", "string"))) {
            return [ mergeInto(clone(node), {
              token: outputFormatter(transpile(node)).slice(1, -1),
              contents: [],
              type: "literal"
            }), {
              dir: "include",
              file: "include/macros.sibilant",
              token: "(",
              type: "expression",
              start: 34858,
              line: 1081,
              col: 33,
              length: 1,
              contents: [ {
                dir: "include",
                file: "include/macros.sibilant",
                token: "require",
                type: "literal",
                start: 34859,
                line: 1081,
                col: 34,
                length: 7,
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
              dir: "include",
              file: "include/macros.sibilant",
              token: "(",
              type: "expression",
              start: 34966,
              line: 1084,
              col: 36,
              length: 1,
              contents: [ {
                dir: "include",
                file: "include/macros.sibilant",
                token: "require",
                type: "literal",
                start: 34967,
                line: 1084,
                col: 37,
                length: 7,
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
    /* export include/macros.sibilant:1089:0 */
  
    var localVars = Array.prototype.slice.call(arguments, 0);
  
    var pairs = localVars.reduce((function(acc, value) {
      /* include/macros.sibilant:1091:19 */
    
      return acc.concat([ sibilant.macros.namespaces.core.quote(value), value ]);
    }), []);
    return {
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 35209,
      line: 1093,
      col: 8,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "set",
        type: "literal",
        start: 35210,
        line: 1093,
        col: 9,
        length: 3,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, {
        dir: "include",
        file: "include/macros.sibilant",
        token: "exports",
        type: "literal",
        start: 35214,
        line: 1093,
        col: 13,
        length: 7,
        contents: [],
        specials: 0,
        precedingIgnored: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 35213,
          line: 1093,
          col: 12,
          length: 1,
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
  sibilant.macros.namespaces.core.return = (function return$(token) {
    /* return include/macros.sibilant:1096:0 */
  
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
    /* do include/macros.sibilant:1143:0 */
  
    var body = Array.prototype.slice.call(arguments, 0);
  
    return (function() {
      if (1 === body.length) {
        return sibilant.macros.namespaces.core.return(body[0]);
      } else if (body.length) {
        return [ interleave(map(body.slice(0, -1), (function() {
          /* include/macros.sibilant:1151:19 */
        
          return asStatement(arguments[0]);
        })), "\n"), "\n", sibilant.macros.namespaces.core.return(body.slice(-1)[0]) ];
      } else {
        return "";
      }
    }).call(this);
  });
  sibilant.macros.namespaces.core.emptyList = (function emptyList$() {
    /* empty-list include/macros.sibilant:1158:0 */
  
    return "null";
  });
  sibilant.macros.namespaces.core.def = (function def$(name, args, body) {
    /* def include/macros.sibilant:1169:0 */
  
    var body = Array.prototype.slice.call(arguments, 2);
  
    (function() {
      if (typeof name === "undefined") {
        return error("invalid function definition. missing name.");
      } else if (typeof args === "undefined") {
        return error("invalid function definition. missing arguments or return value.");
      }
    }).call(this);
    var nameTr = transpile(name),
        thisNode = this;
    sibilant.docs.record("function", sibilant.macros.searchPath[0], name, this);
    return asStatement([ (function() {
      if (outputFormatter(nameTr).match((new RegExp("\\.", undefined)))) {
        return "";
      } else {
        return "var ";
      }
    }).call(this), nameTr, " = ", sibilant.macros.namespaces.core.lambda({
      name: name,
      args: args,
      node: thisNode,
      body: body
    }) ]);
  });
  sibilant.macros.namespaces.core.macro = (function macro$(name, args, body) {
    /* macro include/macros.sibilant:1193:0 */
  
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
  sibilant.macros.namespaces.core.meta = (function meta$(body) {
    /* meta include/macros.sibilant:1220:0 */
  
    var body = Array.prototype.slice.call(arguments, 0);
  
    var js = outputFormatter(transpile(sibilant.macros.namespaces.core.scoped.apply(this, body)));
    (function() {
      if (sibilant.debug) {
        return console.log(js);
      }
    }).call(this);
    return outputFormatter(eval(js));
  });
  sibilant.macros.namespaces.core.reverse = (function reverse$(arr) {
    /* reverse include/macros.sibilant:1225:0 */
  
    var reversed = [];
    arr.forEach((function(item) {
      /* include/macros.sibilant:1227:5 */
    
      return reversed.unshift(item);
    }));
    return reversed;
  });
  sibilant.macros.namespaces.core.lambda = (function lambda$(argsOrOptions, body) {
    /* lambda include/macros.sibilant:1246:8 */
  
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
      /* include/macros.sibilant:1261:23 */
    
      return node__QUERY(arguments[0], "dots");
    }));
    var thisNode = this,
        node = detect([ argsOrOptions.node, thisNode, argsOrOptions.name, args, body[0] ], (function(n) {
      /* include/macros.sibilant:1266:16 */
    
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
  sibilant.macros.namespaces.core.quotedHash = (function quotedHash$(pairs) {
    /* quoted-hash include/macros.sibilant:1284:0 */
  
    var pairs = Array.prototype.slice.call(arguments, 0);
  
    var cachedQuoteValue = sibilant.quoteHashKeys;
    sibilant.quoteHashKeys = true;
    var value = sibilant.macros.namespaces.core.hash.apply(this, pairs);
    sibilant.quoteHashKeys = cachedQuoteValue;
    return value;
  });
  sibilant.macros.namespaces.core.hash = (function hash$(pairs) {
    /* hash include/macros.sibilant:1295:8 */
  
    var pairs = Array.prototype.slice.call(arguments, 0);
  
    (function() {
      if (1 === (pairs.length % 2)) {
        return error(("odd number of key-value pairs in hash: " + inspect(pairs)));
      }
    }).call(this);
    var quoteKeys = sibilant.quoteHashKeys,
        pairStrings = bulkMap(pairs, (function(key, value) {
      /* include/macros.sibilant:1301:39 */
    
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
  sibilant.macros.namespaces.core.quote = (function quote$(content) {
    /* quote include/macros.sibilant:1312:0 */
  
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
  sibilant.macros.namespaces.core.debug = (function debug$(val) {
    /* debug include/macros.sibilant:1335:0 */
  
    sibilant.debug = eval(outputFormatter(transpile(val)));
    return null;
  });
  sibilant.macros.namespaces.core.list = (function list$(args) {
    /* list include/macros.sibilant:1346:7 */
  
    var args = Array.prototype.slice.call(arguments, 0);
  
    var argSegments = [];
    return (function() {
      if (0 === args.length) {
        return "[]";
      } else {
        var simpleList = (function simpleList$(args) {
          /* simple-list include/macros.sibilant:1350:12 */
        
          return [ "[ ", interleave(", ", map(args, (function(arg) {
            /* include/macros.sibilant:1351:50 */
          
            return arg.transpiled;
          }))), " ]" ];
        });
        args.forEach((function(arg) {
          /* include/macros.sibilant:1353:27 */
        
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
          /* include/macros.sibilant:1359:38 */
        
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
  sibilant.macros.namespaces.core.call = (function call$(fnName, args) {
    /* call include/macros.sibilant:1376:0 */
  
    var args = Array.prototype.slice.call(arguments, 1);
  
    return (function() {
      if (any__QUERY(args, (function() {
        /* include/macros.sibilant:1377:20 */
      
        return node__QUERY(arguments[0], "dots");
      }))) {
        return macros.apply(fnName, macros.list.apply(this, args));
      } else {
        return [ transpile(fnName), "(", interleave(", ", map(args, transpile)), ")" ];
      }
    }).call(this);
  });
  sibilant.macros.namespaces.core.dots = (function dots$(contents) {
    /* dots include/macros.sibilant:1382:0 */
  
    var contents = Array.prototype.slice.call(arguments, 0);
  
    return transpile(contents);
  });
  sibilant.macros.namespaces.core.include = (function include$(files) {
    /* include include/macros.sibilant:1397:0 */
  
    var files = Array.prototype.slice.call(arguments, 0);
  
    return interleave(files.map((function(file) {
      /* include/macros.sibilant:1399:17 */
    
      return sibilant.withDefaultSearchPath((function() {
        /* include/macros.sibilant:1401:20 */
      
        return sibilant.include(eval(outputFormatter(transpile(file))));
      }));
    })), "\n");
  });
  sibilant.macros.namespaces.core.docs = (function docs$(options) {
    /* docs include/macros.sibilant:1409:0 */
  
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
      /* include/macros.sibilant:1420:23 */
    
      return optionsHash[outputFormatter(transpile(key))] = value;
    }));
    [ "examples", "references" ].forEach((function(listAttribute) {
      /* include/macros.sibilant:1423:5 */
    
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
  
    return docs.definitions.map((function(definition) {
      /* src/docs.sibilant:29:15 */
    
      return ("name: " + definition.type + " " + definition.namespace + "/" + prettify(definition.name) + "\n" + "description: " + definition.docString + "\n" + (function() {
        if (definition.references) {
          return ("references:\n  " + (definition.references.map((function() {
            /* src/docs.sibilant:35:51 */
          
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
        /* src/docs.sibilant:46:43 */
      
        return (prettify(arguments[0], true) + "\n" + outputFormatter(transpile(arguments[0])));
      })).join("\n\n") + "\n\n");
    })).join("");
  });
  docs.textNoColor = (function docs$textNoColor$() {
    /* docs.text-no-color src/docs.sibilant:53:0 */
  
    var stripAnsi = require("strip-ansi");
    return stripAnsi(docs.text());
  });
  docs.json = (function docs$json$() {
    /* docs.json src/docs.sibilant:58:0 */
  
    return JSON.stringify(docs.data());
  });
  docs.data = (function docs$data$() {
    /* docs.data src/docs.sibilant:61:0 */
  
    return docs.definitions.map((function(definition) {
      /* src/docs.sibilant:63:6 */
    
      return {
        name: prettify(definition.name, false),
        namespace: definition.namespace,
        type: definition.type,
        description: definition.docString,
        references: (function() {
          if (definition.references) {
            return definition.references.map((function() {
              /* src/docs.sibilant:69:52 */
            
              return arguments[0].token.slice(1, -1);
            }));
          } else {
            return [];
          }
        }).call(this),
        arguments: definition.definition.contents[2].contents.map((function() {
          /* src/docs.sibilant:74:30 */
        
          return prettify(arguments[0], false);
        })),
        definition: prettify(definition.definition, false),
        examples: (definition.examples || []).map((function() {
          /* src/docs.sibilant:77:29 */
        
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
  var generateSymbol = (function generateSymbol$() {
    /* generate-symbol src/helpers.sibilant:172:0 */
  
    var state = sibilant.state;
    state.symbolCount = (Number((state.symbolCount || 0)) + 1);
    return [ ("temp$" + state.symbolCount) ];
  });
  var destructure = (function destructure$(pairs) {
    /* destructure src/helpers.sibilant:182:0 */
  
    var destructured = [];
    bulkMap(pairs, (function(lhs, rhs) {
      /* src/helpers.sibilant:184:21 */
    
      var transpiledRhs = transpile(rhs);
      return (function() {
        switch(lhs.type) {
        case "bracket":
          var literalRhs__QUERY = outputFormatter(transpiledRhs).match((new RegExp("^[\._a-zA-Z0-9]+$", undefined))),
              source = (function() {
            if (literalRhs__QUERY) {
              return transpiledRhs;
            } else {
              var symbol = generateSymbol();
              destructured.push([ symbol, transpiledRhs ]);
              return symbol;
            }
          }).call(this);
          lhs.contents.forEach((function(item, index) {
            /* src/helpers.sibilant:194:32 */
          
            return destructured.push([ transpile(item), {
              dir: "src",
              file: "src/helpers.sibilant",
              token: "(",
              type: "expression",
              start: 6311,
              line: 195,
              col: 76,
              length: 1,
              contents: [ {
                dir: "src",
                file: "src/helpers.sibilant",
                token: "get",
                type: "literal",
                start: 6312,
                line: 195,
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
              var symbol = generateSymbol();
              destructured.push([ symbol, transpiledRhs ]);
              return symbol;
            }
          }).call(this);
          lhs.contents.forEach((function(item, index) {
            /* src/helpers.sibilant:207:32 */
          
            var trItem = transpile(item);
            return destructured.push([ trItem, {
              dir: "src",
              file: "src/helpers.sibilant",
              token: "(",
              type: "expression",
              start: 7410,
              line: 209,
              col: 67,
              length: 1,
              contents: [ {
                dir: "src",
                file: "src/helpers.sibilant",
                token: "get",
                type: "literal",
                start: 7411,
                line: 209,
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
  var recurseTranspile = (function recurseTranspile$(node) {
    /* recurse-transpile src/transpiler.sibilant:1:0 */
  
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
    /* transpile.hat src/transpiler.sibilant:60:0 */
  
    var token = node.contents[0].token,
        temp$7 = (function() {
      if (token.match((new RegExp("\/", undefined)))) {
        return token.split("/");
      } else {
        return [ sibilant.macros.searchPath[0], token ];
      }
    }).call(this),
        namespace = temp$7[0],
        macro = temp$7[1],
        temp$7 = undefined;
    return sibilant.macros.namespaces.core.get.call(node, "sibilant.macros.namespaces", sibilant.macros.namespaces.core.quote(transpile.literal({ token: namespace })), sibilant.macros.namespaces.core.quote(transpile.literal({ token: macro })));
  });
  transpile.tick = (function transpile$tick$(node) {
    /* transpile.tick src/transpiler.sibilant:71:0 */
  
    return sibilant.macros.namespaces.core.quote.apply(node, node.contents);
  });
  transpile.at = (function transpile$at$(node) {
    /* transpile.at src/transpiler.sibilant:74:0 */
  
    return transpile(node.contents[0]);
  });
  transpile.dots = (function transpile$dots$(node) {
    /* transpile.dots src/transpiler.sibilant:77:0 */
  
    return sibilant.macros.namespaces.core.dots.apply(node, node.contents);
  });
  transpile.default = (function transpile$default$(node) {
    /* transpile.default src/transpiler.sibilant:80:0 */
  
    return node.token;
  });
  transpile.output = (function transpile$output$(node) {
    /* transpile.output src/transpiler.sibilant:83:0 */
  
    return node;
  });
  transpile.number = (function transpile$number$(node) {
    /* transpile.number src/transpiler.sibilant:86:0 */
  
    return parseFloat(node.token.replace((new RegExp(",", "g")), "")).toString();
  });
  transpile.root = (function transpile$root$(node) {
    /* transpile.root src/transpiler.sibilant:92:0 */
  
    return (function() {
      if (1 === node.contents.length) {
        return transpile(node.contents[0]);
      } else {
        return interleave(compact(map(node.contents, asStatement)), "\n");
      }
    }).call(this);
  });
  transpile.expression = (function transpile$expression$(node, preprocessor) {
    /* transpile.expression src/transpiler.sibilant:101:0 */
  
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
    /* transpile.bracket src/transpiler.sibilant:127:0 */
  
    return sibilant.macros.namespaces.core.list.apply(this, node.contents);
  });
  transpile.brace = (function transpile$brace$(node) {
    /* transpile.brace src/transpiler.sibilant:130:0 */
  
    return sibilant.macros.namespaces.core.hash.apply(this, node.contents);
  });
  transpile.literal = (function transpile$literal$(node) {
    /* transpile.literal src/transpiler.sibilant:132:0 */
  
    var string = node.token;
    return inject(string.replace((new RegExp("\\*", "g")), "_").replace((new RegExp("\\?$", undefined)), "__QUERY").replace((new RegExp("!$", undefined)), "__BANG"), string.match((new RegExp("-(.)", "g"))), (function(returnString, match) {
      /* src/transpiler.sibilant:139:13 */
    
      return returnString.replace(match, match[1].toUpperCase());
    }));
  });
  transpile.string = (function transpile$string$(node) {
    /* transpile.string src/transpiler.sibilant:143:0 */
  
    return node.token.split("\n").join("\\n\" +\n\"");
  });
  transpile.comment = (function transpile$comment$(node) {
    /* transpile.comment src/transpiler.sibilant:148:0 */
  
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
  
    return docs.definitions.map((function(definition) {
      /* src/docs.sibilant:29:15 */
    
      return ("name: " + definition.type + " " + definition.namespace + "/" + prettify(definition.name) + "\n" + "description: " + definition.docString + "\n" + (function() {
        if (definition.references) {
          return ("references:\n  " + (definition.references.map((function() {
            /* src/docs.sibilant:35:51 */
          
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
        /* src/docs.sibilant:46:43 */
      
        return (prettify(arguments[0], true) + "\n" + outputFormatter(transpile(arguments[0])));
      })).join("\n\n") + "\n\n");
    })).join("");
  });
  docs.textNoColor = (function docs$textNoColor$() {
    /* docs.text-no-color src/docs.sibilant:53:0 */
  
    var stripAnsi = require("strip-ansi");
    return stripAnsi(docs.text());
  });
  docs.json = (function docs$json$() {
    /* docs.json src/docs.sibilant:58:0 */
  
    return JSON.stringify(docs.data());
  });
  docs.data = (function docs$data$() {
    /* docs.data src/docs.sibilant:61:0 */
  
    return docs.definitions.map((function(definition) {
      /* src/docs.sibilant:63:6 */
    
      return {
        name: prettify(definition.name, false),
        namespace: definition.namespace,
        type: definition.type,
        description: definition.docString,
        references: (function() {
          if (definition.references) {
            return definition.references.map((function() {
              /* src/docs.sibilant:69:52 */
            
              return arguments[0].token.slice(1, -1);
            }));
          } else {
            return [];
          }
        }).call(this),
        arguments: definition.definition.contents[2].contents.map((function() {
          /* src/docs.sibilant:74:30 */
        
          return prettify(arguments[0], false);
        })),
        definition: prettify(definition.definition, false),
        examples: (definition.examples || []).map((function() {
          /* src/docs.sibilant:77:29 */
        
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
    version: "0.4.0",
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