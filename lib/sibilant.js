require("source-map-support").install();
//# sourceMappingURL=./sibilant.map
;
var sibilant = exports,
    util = require("util"),
    path = require("path"),
    fs = require("fs"),
    error = (function(str) {
  /* /Users/jbr/code/sibilant/src/node.sibilant:5:14 */

  throw new Error (str)
}),
    inspect = util.inspect;
sibilant.dir = process.cwd();
sibilant.transpileFile = (function sibilant$transpileFile$(fileName) {
  /* sibilant.transpile-file /Users/jbr/code/sibilant/src/node.sibilant:11:0 */

  return withDirAndFile(path.dirname(fileName), fileName, (function() {
    /* /Users/jbr/code/sibilant/src/node.sibilant:13:24 */
  
    var source = sibilant.stripShebang(fs.readFileSync(fileName, "utf8"));
    sibilant.sourceCache[fileName] = source;
    sibilant.initialize();
    return transpile(restructure(parse(source)));
  }));
});
sibilant.sourcemapFile = (function sibilant$sourcemapFile$(fileName) {
  /* sibilant.sourcemap-file /Users/jbr/code/sibilant/src/node.sibilant:22:0 */

  return withDirAndFile(path.dirname(fileName), fileName, (function() {
    /* /Users/jbr/code/sibilant/src/node.sibilant:24:24 */
  
    return sourcemap(sibilant.stripShebang(fs.readFileSync(fileName, "utf8")));
  }));
});
require.extensions[".sibilant"] = (function(module, filename) {
  /* /Users/jbr/code/sibilant/src/node.sibilant:30:5 */

  var content = sibilant.sibilizeFile(filename);
  return module._compile(content, filename);
});
require.extensions[".son"] = (function(module, filename) {
  /* /Users/jbr/code/sibilant/src/node.sibilant:35:5 */

  var content = sibilant.sibilizeJson(filename);
  return module.exports = JSON.parse(content);
});
sibilant.packageInfo = (function sibilant$packageInfo$() {
  /* sibilant.package-info /Users/jbr/code/sibilant/src/node.sibilant:40:0 */

  var fs = require("fs");
  return JSON.parse(fs.readFileSync((__dirname + "/../package.json")));
});
sibilant.versionString = (function sibilant$versionString$() {
  /* sibilant.version-string /Users/jbr/code/sibilant/src/node.sibilant:45:0 */

  var package = sibilant.packageInfo(),
      path = require("path");
  return (package.name + " version " + package.version + "\n(at " + path.join(__dirname, "..") + ")");
});
sibilant.initialize = (function sibilant$initialize$() {
  /* sibilant.initialize /Users/jbr/code/sibilant/src/node.sibilant:52:0 */

  return (function() {
    if ((!(sibilant.loaded__QUERY || sibilant.loading__QUERY))) {
      sibilant["loading__QUERY"] = true;
      sibilant.loadMacros();
      delete sibilant.loading__QUERY;
      return sibilant["loaded__QUERY"] = true;
    }
  })();
});
sibilant.loadMacros = (function sibilant$loadMacros$() {
  /* sibilant.load-macros /Users/jbr/code/sibilant/src/node.sibilant:59:0 */

  return sibilant.include(path.normalize((__dirname + "/../include/macros")));
});
sibilant.include = (function sibilant$include$(file) {
  /* sibilant.include /Users/jbr/code/sibilant/src/node.sibilant:63:0 */

  (function() {
    if ((!file.match((new RegExp("\\.(sibilant|son)$", undefined))))) {
      return file = (file + ".sibilant");
    }
  })();
  (function() {
    if (file.match((new RegExp("^\\.\\.?/", undefined)))) {
      return file = (sibilant.dir + "/" + file);
    }
  })();
  var resolvedFile = (function() {
    try {
      return require.resolve(file);
    } catch (e) {
      return error(("Failed to resolve file for inclusion: " + file));
    }
  })();
  return sibilant.transpileFile(resolvedFile);
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

  return (code + (items).join("") + "\033[0m");
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
sibilant.prettyPrint = (function sibilant$prettyPrint$(node, color) {
  /* sibilant.pretty-print /Users/jbr/code/sibilant/src/pretty-printer.sibilant:3:0 */

  (function() {
    if ((typeof color === "undefined")) {
      return color = true;
    }
  })();
  return realNewlines((function() {
    if (node__QUERY(node)) {
      var prettyPrinter = (sibilant.prettyPrint[node.type] || sibilant.prettyPrint.default);
      return prettyPrinter(node, color);
    } else if (((node) && typeof (node) === "object" && (node).constructor.name === "Array")) {
      return ((function() {
        if (color) {
          return black("[");
        } else {
          return "";
        }
      })() + (map(node, prettify)).join((function() {
        if (color) {
          return black(",");
        } else {
          return "";
        }
      })()) + (function() {
        if (color) {
          return black("]");
        } else {
          return "";
        }
      })());
    } else if (color) {
      return red(util.inspect(node));
    } else {
      return realNewlines(util.inspect(node));
    }
  })());
});
sibilant.prettyPrint.default = (function sibilant$prettyPrint$default$(node, color) {
  /* sibilant.pretty-print.default /Users/jbr/code/sibilant/src/pretty-printer.sibilant:19:0 */

  return realNewlines(sibilant.prettyPrint.colorize(node, color, ((function() {
    if ((node.modifiers && node.modifiers.length)) {
      return (map(node.modifiers, (function(n) {
        /* /Users/jbr/code/sibilant/src/pretty-printer.sibilant:23:40 */
      
        return sibilant.prettyPrint(n, color);
      }))).join("");
    } else {
      return "";
    }
  })() + node.token + (function() {
    if ((node.contents && node.contents.length)) {
      return (map(node.contents, (function(n) {
        /* /Users/jbr/code/sibilant/src/pretty-printer.sibilant:26:40 */
      
        return sibilant.prettyPrint(n, color);
      }))).join(" ");
    } else {
      return "";
    }
  })() + ((node.closed && acceptablePairs[node.token]) || ""))));
});
sibilant.prettyPrint.root = (function sibilant$prettyPrint$root$(node, color) {
  /* sibilant.pretty-print.root /Users/jbr/code/sibilant/src/pretty-printer.sibilant:29:0 */

  return (map(node.contents, (function(n) {
    /* /Users/jbr/code/sibilant/src/pretty-printer.sibilant:30:35 */
  
    return sibilant.prettyPrint(n, color);
  }))).join("\n");
});
sibilant.prettyPrint.output = (function sibilant$prettyPrint$output$(node, color) {
  /* sibilant.pretty-print.output /Users/jbr/code/sibilant/src/pretty-printer.sibilant:32:0 */

  return ((function() {
    if (color) {
      return black("{");
    } else {
      return "";
    }
  })() + (function() {
    if (((node.contents) && typeof (node.contents) === "object" && (node.contents).constructor.name === "Array")) {
      return (map(node.contents, (function(c) {
        /* /Users/jbr/code/sibilant/src/pretty-printer.sibilant:36:42 */
      
        return sibilant.prettyPrint.colorize(node, color, prettify(c));
      }))).join((function() {
        if (color) {
          return black(",");
        } else {
          return "";
        }
      })());
    } else {
      return sibilant.prettyPrint.colorize(node, color, node.contents);
    }
  })() + (function() {
    if (color) {
      return black("}");
    } else {
      return "";
    }
  })());
});
var realNewlines = (function realNewlines$(node) {
  /* real-newlines /Users/jbr/code/sibilant/src/pretty-printer.sibilant:40:0 */

  return node.split("\\n")
    .join("\n");
});
sibilant.prettyPrint.colorize = (function sibilant$prettyPrint$colorize$(node, color, string) {
  /* sibilant.pretty-print.colorize /Users/jbr/code/sibilant/src/pretty-printer.sibilant:44:0 */

  return (function() {
    if ((!color)) {
      return string;
    } else if ((node.hint === "macro")) {
      return yellow(string);
    } else if ((node.type === "output")) {
      return purple(string);
    } else {
      return green(string);
    }
  })();
});
var prettify = sibilant.prettyPrint;
var outputFormatter = (function outputFormatter$(node) {
  /* output-formatter /Users/jbr/code/sibilant/src/output-formatter.sibilant:1:0 */

  return (function() {
    if (((node) && typeof (node) === "object" && (node).constructor.name === "Array")) {
      return (map(node, outputFormatter)).join("");
    } else if ((node__QUERY(node) && (node.type === "output"))) {
      return outputFormatter(node.contents);
    } else if ((typeof(node) === "string" || (typeof node === "number"))) {
      return node;
    } else if ((!((typeof node !== "undefined") && (node !== null)))) {
      return "";
    } else if (node__QUERY(node)) {
      console.log("WE SHOULD NOT BE HERE");
      return outputFormatter(transpile(node));
    }
  })();
});
sibilant.outputFormatter = outputFormatter;
var sourceNode = require("source-map").SourceNode;
var sourceMap = (function sourceMap$(node) {
  /* source-map /Users/jbr/code/sibilant/src/sourcemap.sibilant:3:0 */

  return (function() {
    if ((node__QUERY(node) && (node.type === "output"))) {
      return (new sourceNode(node.source.line, node.source.col, node.source.file, (function() {
        if (((node.contents) && typeof (node.contents) === "object" && (node.contents).constructor.name === "Array")) {
          return map(node.contents, sourceMap);
        } else {
          return sourceMap(node.contents);
        }
      })()));
    } else if ((typeof(node) === "string" || (typeof node === "number"))) {
      return node.toString();
    }
  })();
});
var sourcemapper = (function sourcemapper$(node) {
  /* sourcemapper /Users/jbr/code/sibilant/src/sourcemap.sibilant:17:0 */

  var sourceNodes = sourceMap(transpile(node)),
      map = sourceNodes.toStringWithSourceMap().map;
  Object.keys(sibilant.sourceCache).forEach((function(key) {
    /* /Users/jbr/code/sibilant/src/sourcemap.sibilant:21:5 */
  
    return map.setSourceContent(key, sibilant.sourceCache[key]);
  }));
  return map.toString();
});
var bulkMap = (function bulkMap$(arr, fn) {
  /* bulk-map /Users/jbr/code/sibilant/include/functional.sibilant:1:0 */

  var index = 0,
      groupSize = fn.length,
      retArr = [];
  (function() {
    var $_symbol17_$ = undefined;
    while ((index < arr.length)) {
      $_symbol17_$ = (function() {
        retArr.push(fn.apply(this, arr.slice(index, (index + groupSize))));
        return index += groupSize;
      })();
    };
    return $_symbol17_$;
  })();
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
  })();
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
    })();
    return collector;
  }));
});
var detect = (function detect$(items, fn) {
  /* detect /Users/jbr/code/sibilant/include/functional.sibilant:33:0 */

  var returnItem = undefined,
      index = 0,
      items = (items || []);
  (function() {
    var $_symbol18_$ = undefined;
    while ((!((items.length === index) || returnItem))) {
      $_symbol18_$ = (function() {
        (function() {
          if (fn(items[index], index)) {
            return returnItem = items[index];
          }
        })();
        return ((index)++);
      })();
    };
    return $_symbol18_$;
  })();
  return returnItem;
});
var all__QUERY = (function all__QUERY$(items, fn) {
  /* all? /Users/jbr/code/sibilant/include/functional.sibilant:45:0 */

  return (typeof detect(items, (function(item, index) {
    /* /Users/jbr/code/sibilant/include/functional.sibilant:46:31 */
  
    return (!fn(item, index));
  })) === "undefined");
});
var none__QUERY = (function none__QUERY$(items, fn) {
  /* none? /Users/jbr/code/sibilant/include/functional.sibilant:48:0 */

  return (typeof detect(items, fn) === "undefined");
});
var any__QUERY = (function any__QUERY$(items, fn) {
  /* any? /Users/jbr/code/sibilant/include/functional.sibilant:51:0 */

  return (typeof detect(items, fn) !== "undefined");
});
var reject = (function reject$(items, fn) {
  /* reject /Users/jbr/code/sibilant/include/functional.sibilant:54:0 */

  var args = [ items, fn ];
  return select(items, (function() {
    /* /Users/jbr/code/sibilant/include/functional.sibilant:56:16 */
  
    return (!fn.apply(this, arguments));
  }));
});
var compact = (function compact$(arr) {
  /* compact /Users/jbr/code/sibilant/include/functional.sibilant:58:0 */

  return select(arr, (function(item) {
    /* /Users/jbr/code/sibilant/include/functional.sibilant:59:17 */
  
    return ((null !== item) && (false !== item) && (typeof item !== "undefined"));
  }));
});
var interleave = (function interleave$(glue, arr) {
  /* interleave /Users/jbr/code/sibilant/include/functional.sibilant:65:0 */

  (function() {
    if ((typeof(arr) === "string" && ((glue) && typeof (glue) === "object" && (glue).constructor.name === "Array"))) {
      var temp = glue;
      glue = arr;
      return arr = temp;
    }
  })();
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
  })();
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
    })());
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
  })();
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
  "otherChar": "([#><=!\\+\\/\\*-]+)",
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

  context = ((typeof context !== "undefined")) ? context : {
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
    var $_symbol19_$ = undefined;
    while (match) {
      $_symbol19_$ = (function() {
        detect(orderedRegexes, (function(r) {
          /* /Users/jbr/code/sibilant/src/parser.sibilant:70:20 */
        
          regexName = r.name;
          return match = r.exec(remainingInput);
        }));
        return (function() {
          if (((typeof match !== "undefined") && (match !== null))) {
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
              if (("newline" === regexName)) {
                ((context.line)++);
                context.col = 0;
                return context.lastNewline = context.position;
              } else if ((("string" === regexName) && (matchString.indexOf("\n") !== -1))) {
                var stringNewlineCount = (matchString.split("\n").length - 1);
                context.line += stringNewlineCount;
                return context.col = (length - matchString.lastIndexOf("\n"));
              } else {
                return context.col += length;
              }
            })();
            context.position += length;
            return remainingInput = (function() {
              if (remainingInput.length) {
                return remainingInput.slice(length);
              } else {
                return "";
              }
            })();
          }
        })();
      })();
    };
    return $_symbol19_$;
  })();
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
    specials: 0
  };
  inject(context, input, (function(context, token, index) {
    /* /Users/jbr/code/sibilant/src/restructurer.sibilant:19:13 */
  
    var restructurer = (restructurers[token.type] || restructurers.default);
    return restructurer(token, context, index);
  }));
  (function() {
    if ((!(1 === context.parseStack.length))) {
      throw new Error (("unclosed node: " + prettify(context.parseStack[0], false)))
    }
  })();
  return output;
});
sibilant.restructure = restructure;
restructurers.openExpression = (function restructurers$openExpression$(token, context) {
  /* restructurers.open-expression /Users/jbr/code/sibilant/src/restructurer.sibilant:30:0 */

  var first = context.parseStack[0];
  token.contents = [];
  token.type = bracketTypes[token.token];
  token.parent = first;
  acceptSpecials(token, context);
  first.contents.push(token);
  context.parseStack.unshift(token);
  return context;
});
restructurers.closeExpression = (function restructurers$closeExpression$(node, context, index) {
  /* restructurers.close-expression /Users/jbr/code/sibilant/src/restructurer.sibilant:42:0 */

  var first = context.parseStack[0];
  (function() {
    if (node__QUERY(first, "root")) {
      throw new Error (("unexpected " + node.token + " on " + node.file + ":" + node.line + ":" + node.col))
    }
  })();
  (function() {
    if ((acceptablePairs[first.token] !== node.token)) {
      throw new Error (("trying to close " + yellow(sibilant.prettyPrint(first)) + "\n   on " + first.file + ":" + first.line + ":" + first.col + "\n   with " + sibilant.prettyPrint(node) + "\n   on " + node.file + ":" + node.line + ":" + node.col + "\n"))
    }
  })();
  first.end = node.end;
  first.closed = true;
  context.parseStack.shift();
  closeSpecials(first, context);
  (function() {
    if ((context.parseStack.length === 0)) {
      throw new Error (("unbalanced parens:\n" + inspect(parseStack)))
    }
  })();
  return context;
});
var openSpecial = (function openSpecial$(node, context) {
  /* open-special /Users/jbr/code/sibilant/src/restructurer.sibilant:62:0 */

  ((context.specials)++);
  var first = context.parseStack[0];
  node.contents = [];
  node.parent = first;
  first.contents.push(node);
  context.parseStack.unshift(node);
  return context;
});
var acceptSpecials = (function acceptSpecials$(node, context) {
  /* accept-specials /Users/jbr/code/sibilant/src/restructurer.sibilant:74:0 */

  node.specials = context.specials;
  context.specials = 0;
  return context;
});
var closeSpecials = (function closeSpecials$(node, context) {
  /* close-specials /Users/jbr/code/sibilant/src/restructurer.sibilant:79:0 */

  (function() {
    if ((node.specials > 0)) {
      ((node.specials)--);
      context.parseStack.shift();
      return closeSpecials(node, context);
    }
  })();
  return context;
});
restructurers.hat = (function restructurers$hat$(node, context, index) {
  /* restructurers.hat /Users/jbr/code/sibilant/src/restructurer.sibilant:86:0 */

  return openSpecial(node, context);
});
restructurers.dots = (function restructurers$dots$(node, context, index) {
  /* restructurers.dots /Users/jbr/code/sibilant/src/restructurer.sibilant:87:0 */

  return openSpecial(node, context);
});
restructurers.tick = (function restructurers$tick$(node, context, index) {
  /* restructurers.tick /Users/jbr/code/sibilant/src/restructurer.sibilant:88:0 */

  return openSpecial(node, context);
});
restructurers.at = (function restructurers$at$(node, context, index) {
  /* restructurers.at /Users/jbr/code/sibilant/src/restructurer.sibilant:89:0 */

  return openSpecial(node, context);
});
restructurers.whitespace = (function restructurers$whitespace$(token, context, index) {
  /* restructurers.whitespace /Users/jbr/code/sibilant/src/restructurer.sibilant:91:0 */

  return context;
});
restructurers.newline = (function restructurers$newline$(token, context, index) {
  /* restructurers.newline /Users/jbr/code/sibilant/src/restructurer.sibilant:92:0 */

  return context;
});
restructurers.comment = (function restructurers$comment$(token, context, index) {
  /* restructurers.comment /Users/jbr/code/sibilant/src/restructurer.sibilant:93:0 */

  return context;
});
restructurers.ignored = (function restructurers$ignored$(token, context, index) {
  /* restructurers.ignored /Users/jbr/code/sibilant/src/restructurer.sibilant:94:0 */

  return context;
});
restructurers.default = (function restructurers$default$(token, context, index) {
  /* restructurers.default /Users/jbr/code/sibilant/src/restructurer.sibilant:96:0 */

  acceptSpecials(token, context);
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
sibilant.resolveMacro = (function sibilant$resolveMacro$(macroName) {
  /* sibilant.resolve-macro /Users/jbr/code/sibilant/src/macros.sibilant:13:0 */

  return (function() {
    if (((macroName.indexOf("/") !== -1) && (!(macroName.indexOf("\n") !== -1)))) {
      var pathComponents = macroName.split("/"),
          macro = (sibilant.macros.namespaces.hasOwnProperty(pathComponents[0]) && sibilant.macros.namespaces[pathComponents[0]][(pathComponents.slice(1)).join("/")]);
      return (function() {
        if (macro) {
          return macro;
        } else {
          return error(("called namespaced macro " + macroName + " but could not find namespace " + pathComponents[0] + ". you might need to include the file that defines it first."));
        }
      })();
    } else {
      var namespace = detect(sibilant.macros.searchPath, (function(namespace) {
        /* /Users/jbr/code/sibilant/src/macros.sibilant:25:28 */
      
        return sibilant.macros.namespaces[namespace].hasOwnProperty(macroName);
      }));
      return (function() {
        if (namespace) {
          return sibilant.macros.namespaces[namespace][macroName];
        }
      })();
    }
  })();
});
sibilant.withDefaultSearchPath = (function sibilant$withDefaultSearchPath$(fn) {
  /* sibilant.with-default-search-path /Users/jbr/code/sibilant/src/macros.sibilant:30:0 */

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
var mapNode = (function mapNode$(node, fn) {
  /* map-node /Users/jbr/code/sibilant/src/helpers.sibilant:28:0 */

  return (function() {
    if (node__QUERY(node)) {
      var mappedNode = fn(node);
      (function() {
        if (node__QUERY(mappedNode)) {
          return mappedNode.contents = mapNode(mappedNode.contents, fn);
        }
      })();
      return mappedNode;
    } else if (((node) && typeof (node) === "object" && (node).constructor.name === "Array")) {
      return map(node, (function() {
        /* /Users/jbr/code/sibilant/src/helpers.sibilant:37:32 */
      
        return mapNode(arguments[0], fn);
      }));
    } else {
      return fn(node);
    }
  })();
});
var eachNode = (function eachNode$(node, fn) {
  /* each-node /Users/jbr/code/sibilant/src/helpers.sibilant:40:0 */

  return (function() {
    if (node__QUERY(node)) {
      return (function() {
        if (fn(node)) {
          return eachNode(node.contents, fn);
        }
      })();
    } else if (((node) && typeof (node) === "object" && (node).constructor.name === "Array")) {
      return node.forEach((function(c) {
        /* /Users/jbr/code/sibilant/src/helpers.sibilant:42:22 */
      
        return eachNode(c, fn);
      }));
    } else {
      return fn(node);
    }
  })();
});
var statement__QUERY = (function statement__QUERY$(transpiled) {
  /* statement? /Users/jbr/code/sibilant/src/helpers.sibilant:45:0 */

  return (function() {
    if (node__QUERY(transpiled)) {
      return statement__QUERY(transpiled.contents);
    } else if (((transpiled) && typeof (transpiled) === "object" && (transpiled).constructor.name === "Array")) {
      return statement__QUERY(transpiled.slice(-1)[0]);
    } else if (typeof(transpiled) === "string") {
      return (";" === transpiled.slice(-1)[0]);
    } else {
      return false;
    }
  })();
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
  })();
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
    })();
    return (!node__QUERY(n, "tick"));
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
          if ((node__QUERY(content, "dots") && ((content.contents) && typeof (content.contents) === "object" && (content.contents).constructor.name === "Array") && (content.contents.length === 1) && ((content.contents[0]) && typeof (content.contents[0]) === "object" && (content.contents[0]).constructor.name === "Array"))) {
            return contents.push.apply(contents, content.contents[0]);
          } else {
            return contents.push(content);
          }
        })();
      }));
      return node.contents = contents;
    }
  })();
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
      })();
      (function() {
        if (node__QUERY(mappedNode)) {
          return mappedNode.contents = mapNodeForQuoteExpansion(mappedNode.contents, expansions);
        }
      })();
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
  })();
});
sibilant.macros.namespaces.core.return = (function sibilant$macros$namespaces$core$return$(token) {
  /* sibilant.macros.namespaces.core.return /Users/jbr/code/sibilant/src/core.sibilant:1:0 */

  (function() {
    if (sibilant.debug) {
      return console.log("returning ", prettify(token));
    }
  })();
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
            if ((token.contents.length < 3)) {
              return defaultReturn;
            } else {
              return [ asStatement(deleteMacro.apply(this, token.contents.slice(1, -1))), "\nreturn ", asStatement(deleteMacro(token.contents.slice(-1)[0])) ];
            }
          })();
        
        case "assign":
          return (function() {
            if ((token.contents.length < 4)) {
              return defaultReturn;
            } else {
              return [ sibilant.macros.namespaces.core.assign.apply(this, token.contents.slice(1, (token.contents.length - 2))), "\nreturn ", sibilant.macros.namespaces.core.assign.apply(this, token.contents.slice(-2)) ];
            }
          })();
        
        case "var":
          return [ transpile(token), "\nreturn ", transpile((function() {
            if ((0 === (token.contents.length % 2))) {
              return token.contents.slice(-1)[0];
            } else {
              return token.contents.slice(-2)[0];
            }
          })()) ];
        
        case "set":
          return (function() {
            if ((token.contents.length < 5)) {
              return defaultReturn;
            } else {
              var obj = token.contents[1],
                  nonReturnPart = token.contents.slice(2, (token.contents.length - 2)),
                  returnPart = token.contents.slice(-2);
              nonReturnPart.unshift(obj);
              returnPart.unshift(obj);
              return [ sibilant.macros.namespaces.core.set.apply(this, nonReturnPart), "\nreturn ", sibilant.macros.namespaces.core.set.apply(this, returnPart) ];
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
sibilant.macros.namespaces.core.do = (function sibilant$macros$namespaces$core$do$(body) {
  /* sibilant.macros.namespaces.core.do /Users/jbr/code/sibilant/src/core.sibilant:43:0 */

  var body = Array.prototype.slice.call(arguments, 0);

  return (function() {
    if ((1 === body.length)) {
      return sibilant.macros.namespaces.core.return(body[0]);
    } else if (body.length) {
      return [ interleave("\n", map(body.slice(0, -1), (function() {
        /* /Users/jbr/code/sibilant/src/core.sibilant:46:63 */
      
        return asStatement(arguments[0]);
      }))), "\n", sibilant.macros.namespaces.core.return(body.slice(-1)[0]) ];
    } else {
      return "";
    }
  })();
});
sibilant.macros.namespaces.core.emptyList = (function sibilant$macros$namespaces$core$emptyList$() {
  /* sibilant.macros.namespaces.core.empty-list /Users/jbr/code/sibilant/src/core.sibilant:51:0 */

  return "null";
});
sibilant.macros.namespaces.core.def = (function sibilant$macros$namespaces$core$def$(fnName, args, body) {
  /* sibilant.macros.namespaces.core.def /Users/jbr/code/sibilant/src/core.sibilant:53:0 */

  var body = Array.prototype.slice.call(arguments, 2);

  (function() {
    if ((typeof fnName === "undefined")) {
      return error("invalid function definition. missing name.");
    } else if ((typeof args === "undefined")) {
      return error("invalid function definition. missing arguments or return value.");
    }
  })();
  var fnNameTr = transpile(fnName),
      thisNode = this;
  return asStatement([ (function() {
    if (outputFormatter(fnNameTr).match((new RegExp("\\.", undefined)))) {
      return "";
    } else {
      return "var ";
    }
  })(), fnNameTr, " = ", sibilant.macros.namespaces.core.lambda.apply(this, [ {
    name: fnName,
    args: args,
    node: thisNode
  } ].concat(body)) ]);
});
sibilant.macros.namespaces.core.macro = (function sibilant$macros$namespaces$core$macro$(name, args, body) {
  /* sibilant.macros.namespaces.core.macro /Users/jbr/code/sibilant/src/core.sibilant:64:0 */

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
  })();
  (function() {
    try {
      return sibilant.macros.namespace[nameTr] = eval(js);
    } catch (e) {
      return error(("error in parsing macro " + sibilant.prettyPrint(name) + ":\n" + js));
    }
  })();
  return undefined;
});
sibilant.macros.namespaces.core.meta = (function sibilant$macros$namespaces$core$meta$(body) {
  /* sibilant.macros.namespaces.core.meta /Users/jbr/code/sibilant/src/core.sibilant:77:0 */

  var body = Array.prototype.slice.call(arguments, 0);

  var js = outputFormatter(sibilant.macros.namespaces.core.scoped.apply(this, body));
  (function() {
    if (sibilant.debug) {
      return console.log(js);
    }
  })();
  return outputFormatter(eval(js));
});
sibilant.macros.namespaces.core.concat = (function sibilant$macros$namespaces$core$concat$(args) {
  /* sibilant.macros.namespaces.core.concat /Users/jbr/code/sibilant/src/core.sibilant:83:0 */

  var args = Array.prototype.slice.call(arguments, 0);

  return [ "(", interleave(" + ", map(args, transpile)), ")" ];
});
sibilant.macros.namespaces.core.reverse = (function sibilant$macros$namespaces$core$reverse$(arr) {
  /* sibilant.macros.namespaces.core.reverse /Users/jbr/code/sibilant/src/core.sibilant:86:0 */

  var reversed = [];
  arr.forEach((function(item) {
    /* /Users/jbr/code/sibilant/src/core.sibilant:88:5 */
  
    return reversed.unshift(item);
  }));
  return reversed;
});
var reverse = sibilant.macros.namespaces.core.reverse;
sibilant.macros.namespaces.core.lambda = (function sibilant$macros$namespaces$core$lambda$(argsOrOptions, body) {
  /* sibilant.macros.namespaces.core.lambda /Users/jbr/code/sibilant/src/core.sibilant:93:0 */

  var body = Array.prototype.slice.call(arguments, 1);

  (function() {
    if (sibilant.debug) {
      return console.log(argsOrOptions);
    }
  })();
  var args = (argsOrOptions.args || argsOrOptions),
      body = (argsOrOptions.body || body),
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
    /* /Users/jbr/code/sibilant/src/core.sibilant:106:23 */
  
    return node__QUERY(arguments[0], "dots");
  }));
  var thisNode = this,
      node = detect([ argsOrOptions.node, thisNode, argsOrOptions.name, args, body[0] ], (function(n) {
    /* /Users/jbr/code/sibilant/src/core.sibilant:111:16 */
  
    return (node__QUERY(n) && n.file);
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
  })(), indent(sibilant.macros.namespaces.core.do.apply(this, body)), "})" ];
});
sibilant.macros.namespaces.core["#"] = sibilant.macros.namespaces.core.lambda;
sibilant.macros.namespaces.core.quotedHash = (function sibilant$macros$namespaces$core$quotedHash$(pairs) {
  /* sibilant.macros.namespaces.core.quoted-hash /Users/jbr/code/sibilant/src/core.sibilant:129:0 */

  var pairs = Array.prototype.slice.call(arguments, 0);

  var cachedQuoteValue = sibilant.macros.namespaces.core.hash.quoteKeys;
  sibilant.macros.namespaces.core.hash.quoteKeys = true;
  var value = sibilant.macros.namespaces.core.hash.apply(this, pairs);
  sibilant.macros.namespaces.core.hash.quoteKeys = cachedQuoteValue;
  return value;
});
sibilant.macros.namespaces.core.hash = (function sibilant$macros$namespaces$core$hash$(pairs) {
  /* sibilant.macros.namespaces.core.hash /Users/jbr/code/sibilant/src/core.sibilant:136:0 */

  var pairs = Array.prototype.slice.call(arguments, 0);

  (function() {
    if ((1 === (pairs.length % 2))) {
      return error(("odd number of key-value pairs in hash: " + inspect(pairs)));
    }
  })();
  var quoteKeys = sibilant.macros.namespaces.core.hash.quoteKeys,
      pairStrings = bulkMap(pairs, (function(key, value) {
    /* /Users/jbr/code/sibilant/src/core.sibilant:142:39 */
  
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
sibilant.macros.namespaces.core.quote = (function sibilant$macros$namespaces$core$quote$(content) {
  /* sibilant.macros.namespaces.core.quote /Users/jbr/code/sibilant/src/core.sibilant:153:0 */

  return (function() {
    if (typeof(content) === "string") {
      return ("\"" + qescape(content) + "\"");
    } else if ((typeof content === "number")) {
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
      })();
    } else if (node__QUERY(content, "bracket")) {
      return (function() {
        if (Object.keys(findUnquotes(content)).length) {
          return sibilant.macros.namespaces.core.call("macros.expandQuote.call", "this", sibilant.macros.namespaces.core.quote(content.nodeId), sibilant.macros.namespaces.core.quotedHash.apply(this, alternatingKeysAndValues(findUnquotes(content))));
        } else {
          return sibilant.macros.namespaces.core.list.apply(this, map(content.contents, sibilant.macros.namespaces.core.quote));
        }
      })();
    } else if (node__QUERY(content, "brace")) {
      return (function() {
        if (Object.keys(findUnquotes(content)).length) {
          return sibilant.macros.namespaces.core.call("macros.expandQuote.call", "this", sibilant.macros.namespaces.core.quote(content.nodeId), sibilant.macros.namespaces.core.quotedHash.apply(this, alternatingKeysAndValues(findUnquotes(content))));
        } else {
          return sibilant.macros.namespaces.core.hash.apply(this, map(content.contents, sibilant.macros.namespaces.core.quote));
        }
      })();
    } else {
      console.log(("unknown content" + prettify(content)));
      return content;
    }
  })();
});
sibilant.macros.namespaces.core.debug = (function sibilant$macros$namespaces$core$debug$(val) {
  /* sibilant.macros.namespaces.core.debug /Users/jbr/code/sibilant/src/core.sibilant:180:0 */

  sibilant.debug = eval(outputFormatter(transpile(val)));
  return null;
});
sibilant.macros.namespaces.core.expandQuote = (function sibilant$macros$namespaces$core$expandQuote$(nodeId, expansions) {
  /* sibilant.macros.namespaces.core.expand-quote /Users/jbr/code/sibilant/src/core.sibilant:183:0 */

  var expandedNodes = mapNodeForQuoteExpansion(sibilant.nodeCache[nodeId], expansions);
  return transpile(expandedNodes);
});
sibilant.macros.namespaces.core.list = (function sibilant$macros$namespaces$core$list$(args) {
  /* sibilant.macros.namespaces.core.list /Users/jbr/code/sibilant/src/core.sibilant:190:0 */

  var args = Array.prototype.slice.call(arguments, 0);

  var argSegments = [];
  return (function() {
    if (((args).length === 0)) {
      return "[]";
    } else {
      var simpleList = (function simpleList$(args) {
        /* simple-list /Users/jbr/code/sibilant/src/core.sibilant:194:12 */
      
        return [ "[ ", interleave(", ", map(args, (function(arg) {
          /* /Users/jbr/code/sibilant/src/core.sibilant:195:50 */
        
          return arg.transpiled;
        }))), " ]" ];
      });
      args.forEach((function(arg) {
        /* /Users/jbr/code/sibilant/src/core.sibilant:197:27 */
      
        return (function() {
          if (node__QUERY(arg, "dots")) {
            return argSegments.push({ transpiled: transpile(arg) });
          } else if (((argSegments.slice(-1)[0]) && typeof (argSegments.slice(-1)[0]) === "object" && (argSegments.slice(-1)[0]).constructor.name === "Array")) {
            return argSegments.slice(-1)[0].push({ transpiled: transpile(arg) });
          } else {
            return argSegments.push([ { transpiled: transpile(arg) } ]);
          }
        })();
      }));
      argSegments = map(argSegments, (function(segment) {
        /* /Users/jbr/code/sibilant/src/core.sibilant:203:38 */
      
        return (function() {
          if (((segment) && typeof (segment) === "object" && (segment).constructor.name === "Array")) {
            return simpleList(segment);
          } else {
            return segment.transpiled;
          }
        })();
      }));
      return (function() {
        if ((1 === argSegments.length)) {
          return argSegments[0];
        } else {
          return [ argSegments[0], ".concat(", interleave(", ", argSegments.slice(1)), ")" ];
        }
      })();
    }
  })();
});
sibilant.macros.namespaces.core.call = (function sibilant$macros$namespaces$core$call$(fnName, args) {
  /* sibilant.macros.namespaces.core.call /Users/jbr/code/sibilant/src/core.sibilant:213:0 */

  var args = Array.prototype.slice.call(arguments, 1);

  return (function() {
    if (any__QUERY(args, (function() {
      /* /Users/jbr/code/sibilant/src/core.sibilant:214:20 */
    
      return node__QUERY(arguments[0], "dots");
    }))) {
      return macros.apply(fnName, macros.list.apply(this, args));
    } else {
      return [ transpile(fnName), "(", interleave(", ", map(args, transpile)), ")" ];
    }
  })();
});
sibilant.macros.namespaces.core.dots = (function sibilant$macros$namespaces$core$dots$(contents) {
  /* sibilant.macros.namespaces.core.dots /Users/jbr/code/sibilant/src/core.sibilant:219:0 */

  var contents = Array.prototype.slice.call(arguments, 0);

  return transpile(contents);
});
sibilant.macros.namespaces.core.include = (function sibilant$macros$namespaces$core$include$(files) {
  /* sibilant.macros.namespaces.core.include /Users/jbr/code/sibilant/src/core.sibilant:222:0 */

  var files = Array.prototype.slice.call(arguments, 0);

  return interleave(files.map((function(file) {
    /* /Users/jbr/code/sibilant/src/core.sibilant:224:17 */
  
    return sibilant.withDefaultSearchPath((function() {
      /* /Users/jbr/code/sibilant/src/core.sibilant:226:20 */
    
      return sibilant.include(eval(outputFormatter(transpile(file))));
    }));
  })), "\n");
});
var node__QUERY = (function node__QUERY$(thing, types) {
  /* node? /Users/jbr/code/sibilant/src/transpiler.sibilant:1:0 */

  var types = Array.prototype.slice.call(arguments, 1);

  return (((typeof thing !== "undefined") && (thing !== null)) && ("object" === typeof thing) && typeof(thing.type) === "string" && (((types).length === 0) || (types.indexOf(thing.type) !== -1)) && thing.hasOwnProperty("contents"));
});
var emptyNode__QUERY = (function emptyNode__QUERY$(item) {
  /* empty-node? /Users/jbr/code/sibilant/src/transpiler.sibilant:9:0 */

  return (function() {
    if (node__QUERY(item)) {
      return emptyNode__QUERY(item.contents);
    } else if (((item) && typeof (item) === "object" && (item).constructor.name === "Array")) {
      return all__QUERY(item, emptyNode__QUERY);
    } else if (typeof(item) === "string") {
      return item.match((new RegExp("^\\s*$", undefined)));
    } else {
      return ((null === item) || (typeof item === "undefined") || (false === item));
    }
  })();
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
      })();
    } else if (((item) && typeof (item) === "object" && (item).constructor.name === "Array")) {
      var compacted = compact(map(item, compactNode));
      return (function() {
        if ((compacted && compacted.length)) {
          return compacted;
        } else {
          return null;
        }
      })();
    } else {
      return (function() {
        if (((item === "") || (item === false))) {
          return null;
        } else {
          return item;
        }
      })();
    }
  })();
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
  })();
});
var transpile = (function transpile$(node, preprocessor) {
  /* transpile /Users/jbr/code/sibilant/src/transpiler.sibilant:38:0 */

  (function() {
    if (typeof(node) === "string") {
      return node = {
        type: "js",
        token: node,
        contents: []
      };
    } else if ((typeof node === "number")) {
      return node = {
        type: "number",
        token: node.toString(),
        contents: []
      };
    }
  })();
  return (function() {
    if (((node) && typeof (node) === "object" && (node).constructor.name === "Array")) {
      return node;
    } else if (((typeof node !== "undefined") && (node !== null))) {
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
      })());
      resultNode.contents = compact(flatten(resultNode.contents));
      resultNode.source = node;
      (function() {
        if (sibilant.debug) {
          return console.log(prettify(node), red("->"), prettify(resultNode));
        }
      })();
      node.transpiled = resultNode;
      return (function() {
        if (emptyNode__QUERY(resultNode)) {
          return undefined;
        } else {
          return resultNode;
        }
      })();
    }
  })();
});
sibilant.transpile = transpile;
var readerMacros = {  };
transpile.hat = (function transpile$hat$(node) {
  /* transpile.hat /Users/jbr/code/sibilant/src/transpiler.sibilant:72:0 */

  var output = transpile(node.contents[0]);
  return mergeInto(output, { contents: [ "sibilant.macros.namespace[\"", output.contents[0], "\"]" ] });
});
transpile.tick = (function transpile$tick$(node) {
  /* transpile.tick /Users/jbr/code/sibilant/src/transpiler.sibilant:79:0 */

  return sibilant.macros.namespaces.core.quote.apply(node, node.contents);
});
transpile.at = (function transpile$at$(node) {
  /* transpile.at /Users/jbr/code/sibilant/src/transpiler.sibilant:82:0 */

  return transpile(node.contents[0]);
});
transpile.dots = (function transpile$dots$(node) {
  /* transpile.dots /Users/jbr/code/sibilant/src/transpiler.sibilant:85:0 */

  return sibilant.macros.namespaces.core.dots.apply(node, node.contents);
});
transpile.default = (function transpile$default$(node) {
  /* transpile.default /Users/jbr/code/sibilant/src/transpiler.sibilant:88:0 */

  return node.token;
});
transpile.output = (function transpile$output$(node) {
  /* transpile.output /Users/jbr/code/sibilant/src/transpiler.sibilant:91:0 */

  return node;
});
transpile.number = (function transpile$number$(node) {
  /* transpile.number /Users/jbr/code/sibilant/src/transpiler.sibilant:94:0 */

  return parseFloat(node.token.replace((new RegExp(",", "g")), "")).toString();
});
transpile.root = (function transpile$root$(node) {
  /* transpile.root /Users/jbr/code/sibilant/src/transpiler.sibilant:100:0 */

  return (function() {
    if ((1 === node.contents.length)) {
      return transpile(node.contents[0]);
    } else {
      return interleave(compact(map(node.contents, asStatement)), "\n");
    }
  })();
});
transpile.expression = (function transpile$expression$(node, preprocessor) {
  /* transpile.expression /Users/jbr/code/sibilant/src/transpiler.sibilant:109:0 */

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
          return args = [ node.contents[1], head.contents[0] ].concat(Array.prototype.slice.call(node.contents, 2));
        } else if (node__QUERY(head, "literal", "otherChar")) {
          var resolvedMacro = sibilant.resolveMacro(outputFormatter(transpile(head)));
          return (function() {
            if (resolvedMacro) {
              head.hint = "macro";
              macro = resolvedMacro;
              return args = node.contents.slice(1);
            }
          })();
        }
      })();
      return macro.apply(node, args);
    } else {
      return "null";
    }
  })();
});
transpile.bracket = (function transpile$bracket$(node) {
  /* transpile.bracket /Users/jbr/code/sibilant/src/transpiler.sibilant:135:0 */

  return sibilant.macros.namespaces.core.list.apply(this, node.contents);
});
transpile.brace = (function transpile$brace$(node) {
  /* transpile.brace /Users/jbr/code/sibilant/src/transpiler.sibilant:138:0 */

  return sibilant.macros.namespaces.core.hash.apply(this, node.contents);
});
transpile.literal = (function transpile$literal$(node) {
  /* transpile.literal /Users/jbr/code/sibilant/src/transpiler.sibilant:140:0 */

  var string = node.token;
  return inject(string.replace((new RegExp("\\*", "g")), "_")
    .replace((new RegExp("\\?$", undefined)), "__QUERY")
    .replace((new RegExp("!$", undefined)), "__BANG"), string.match((new RegExp("-(.)", "g"))), (function(returnString, match) {
    /* /Users/jbr/code/sibilant/src/transpiler.sibilant:147:13 */
  
    return returnString.replace(match, match[1].toUpperCase());
  }));
});
transpile.string = (function transpile$string$(node) {
  /* transpile.string /Users/jbr/code/sibilant/src/transpiler.sibilant:151:0 */

  return node.token.split("\n")
    .join("\\n\" +\n\"");
});
transpile.comment = (function transpile$comment$(node) {
  /* transpile.comment /Users/jbr/code/sibilant/src/transpiler.sibilant:156:0 */

  return null;
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