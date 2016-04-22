(function() {
  if (!(process.env.DISABLE_SOURCE_MAPS)) {
    return require("source-map-support").install();
  }
}).call(this);
//# sourceMappingURL=../maps/sibilant.map
;
var util = require("util"),
    path = require("path"),
    fs = require("fs");
var sibilant = (function(args) {
  /* src/node.sibilant:3:14 */

  var args = Array.prototype.slice.call(arguments, 0);

  return sibilant.entry.apply(this, args);
}),
    error = (function(str) {
  /* src/node.sibilant:4:14 */

  throw str
}),
    inspect = util.inspect;
module.exports = sibilant;
sibilant.dir = process.cwd();
sibilant.dependencies = {  };
sibilant.relativeDirAndFile = (function sibilant$relativeDirAndFile$(fileName) {
  /* sibilant.relative-dir-and-file src/node.sibilant:12:0 */

  return [ path.dirname(fileName), fileName ].map((function() {
    /* src/node.sibilant:14:15 */
  
    return path.relative(process.cwd(), arguments[0]);
  }));
});
var relativeDirAndFile = sibilant.relativeDirAndFile;
sibilant.recordDependency = (function sibilant$recordDependency$(from, to) {
  /* sibilant.record-dependency src/node.sibilant:17:0 */

  sibilant.dependencies[from] = (typeof sibilant.dependencies[from] !== "undefined") ? sibilant.dependencies[from] : [];
  return sibilant.dependencies[from].push(to);
});
sibilant.flatDependencies = (function sibilant$flatDependencies$() {
  /* sibilant.flat-dependencies src/node.sibilant:23:0 */

  return flatten(values(sibilant.dependencies));
});
sibilant.entry = (function sibilant$entry$(source, options) {
  /* sibilant.entry src/node.sibilant:28:0 */

  (function() {
    if (("object" === typeof source && source !== null && source.constructor.name !== "Array")) {
      options = source;
      return source = undefined;
    }
  }).call(this);
  options = (typeof options !== "undefined") ? options : {  };
  (function() {
    if (typeof source === "string") {
      return options.source = source;
    }
  }).call(this);
  var map = options.map,
      source = options.source,
      file = options.file,
      quoteKeys = options.quoteKeys,
      json = options.json;
  map = (typeof map !== "undefined") ? map : false;
  quoteKeys = (typeof quoteKeys !== "undefined") ? quoteKeys : json;
  (function() {
    if (((typeof file !== "undefined" && file !== null) && !((typeof source !== "undefined" && source !== null)))) {
      var relativeDirAndF$1 = relativeDirAndFile(file),
          relativeDir = relativeDirAndF$1[0],
          relativeFile = relativeDirAndF$1[1],
          relativeDirAndF$1 = undefined;
      return source = (sibilant.sourceCache[relativeFile] || sibilant.stripShebang(fs.readFileSync(file, "utf8")));
    }
  }).call(this);
  (function() {
    if (file) {
      var relativeDirAndF$2 = relativeDirAndFile(file),
          relativeDir = relativeDirAndF$2[0],
          relativeFile = relativeDirAndF$2[1],
          relativeDirAndF$2 = undefined;
      return sibilant.sourceCache[relativeFile] = source;
    }
  }).call(this);
  return withFile(file, (function() {
    /* src/node.sibilant:54:7 */
  
    var quoteState = sibilant.quoteHashKeys;
    (function() {
      if (quoteKeys) {
        return sibilant.quoteHashKeys = true;
      }
    }).call(this);
    var ast = restructure(parse(source)),
        output = transpile(ast),
        sourcemap = (function() {
      if (map) {
        return _sourcemapper(output);
      }
    }).call(this),
        js = outputFormatter(output),
        dependencies = sibilant.flatDependencies();
    (function() {
      if (quoteKeys) {
        return sibilant.quoteHashKeys = quoteState;
      }
    }).call(this);
    return {
      ast: ast,
      output: output,
      js: js,
      map: sourcemap,
      dependencies: dependencies
    };
  }));
});
sibilant.transpileFile = (function sibilant$transpileFile$(fileName) {
  /* sibilant.transpile-file src/node.sibilant:74:0 */

  return withFile(fileName, (function() {
    /* src/node.sibilant:77:16 */
  
    var source = sibilant.stripShebang(fs.readFileSync(fileName, "utf8")),
        relativeDirAndF$3 = relativeDirAndFile(file),
        relativeDir = relativeDirAndF$3[0],
        relativeFile = relativeDirAndF$3[1],
        relativeDirAndF$3 = undefined;
    sibilant.sourceCache[relativeFile] = source;
    return transpile(restructure(parse(source)));
  }));
});
var withFile = (function withFile$(fileName, fn) {
  /* with-file src/node.sibilant:88:0 */

  return (function() {
    if (fileName) {
      return withDirAndFile.apply(this, sibilant.relativeDirAndFile(fileName).concat([ (function() {
        /* src/node.sibilant:90:74 */
      
        return fn(fileName);
      }) ]));
    } else {
      return fn();
    }
  }).call(this);
});
sibilant.sourcemapFile = (function sibilant$sourcemapFile$(fileName) {
  /* sibilant.sourcemap-file src/node.sibilant:93:0 */

  return withFile(fileName, (function() {
    /* src/node.sibilant:95:16 */
  
    return sourcemap(sibilant.stripShebang(fs.readFileSync(arguments[0], "utf8")));
  }));
});
require.extensions[".sibilant"] = (function(module, filename) {
  /* src/node.sibilant:102:5 */

  return module._compile(sibilant({ file: filename }).js, filename);
});
require.extensions[".son"] = (function(module, filename) {
  /* src/node.sibilant:108:5 */

  var content = sibilant({
    file: filename,
    json: true
  }).js,
      json = (function() {
    try {
      return JSON.parse(content);
    } catch (e) {
      console.error("could not parse:\n", content);
      throw e
    }
  }).call(this);
  return module.exports = json;
});
sibilant.packageInfo = (function sibilant$packageInfo$() {
  /* sibilant.package-info src/node.sibilant:118:0 */

  return JSON.parse(fs.readFileSync((__dirname + "/../package.json"), "utf8"));
});
sibilant.versionString = (function sibilant$versionString$() {
  /* sibilant.version-string src/node.sibilant:124:0 */

  var package = sibilant.packageInfo();
  return (package.name + " version " + package.version + "\n(at " + path.join(__dirname, "..") + ")");
});
sibilant.include = (function sibilant$include$(file) {
  /* sibilant.include src/node.sibilant:130:0 */

  (function() {
    if (!(file.match((new RegExp("\\.(sibilant|son)$", undefined))))) {
      return file = (file + ".sibilant");
    }
  }).call(this);
  (function() {
    if (file.match((new RegExp("^\\.\\.?/", undefined)))) {
      return file = path.resolve(sibilant.dir, file);
    }
  }).call(this);
  var resolvedFile = (function() {
    try {
      return require.resolve(file);
    } catch (e) {
      return error(("Failed to resolve file for inclusion: " + file));
    }
  }).call(this);
  sibilant.recordDependency(sibilant.file, file);
  return sibilant({ file: resolvedFile }).output;
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
      console.log(("warning: We ran into an unexpected node that never got transpiled at " + node.file + ":" + node.line + ":" + node.col + "."));
      return outputFormatter(transpile(node));
    }
  }).call(this);
});
sibilant.outputFormatter = outputFormatter;
var sourceNode = require("source-map").SourceNode;
var sourceMap = (function sourceMap$(node) {
  /* source-map src/sourcemap.sibilant:3:0 */

  return (function() {
    if (node__QUERY(node, "output")) {
      return (new sourceNode(node.source.line, node.source.col, node.source.file, (function() {
        if (((node.contents) && typeof (node.contents) === "object" && (node.contents).constructor.name === "Array")) {
          return map(node.contents, sourceMap);
        } else {
          return sourceMap(node.contents);
        }
      }).call(this)));
    } else if ((typeof node === "string" || typeof node === "number")) {
      return node.toString();
    }
  }).call(this);
});
var sourcemapper = (function sourcemapper$(untranspiledNode) {
  /* sourcemapper src/sourcemap.sibilant:16:0 */

  return _sourcemapper(transpile(untranspiledNode));
});
var _sourcemapper = (function _sourcemapper$(transpiledNode) {
  /* *sourcemapper src/sourcemap.sibilant:19:0 */

  var sourceNodes = sourceMap(transpiledNode),
      map = sourceNodes.toStringWithSourceMap().map;
  Object.keys(sibilant.sourceCache).forEach((function(key) {
    /* src/sourcemap.sibilant:23:5 */
  
    return map.setSourceContent(key, sibilant.sourceCache[key]);
  }));
  return map.toString();
});
var bulkMap = (function bulkMap$(arr, fn) {
  /* bulk-map include/functional.sibilant:1:0 */

  var index = 0,
      groupSize = fn.length,
      retArr = [];
  (function() {
    var while$1 = undefined;
    while (index < arr.length) {
      while$1 = (function() {
        retArr.push(fn.apply(this, arr.slice(index, (index + groupSize))));
        return index += groupSize;
      }).call(this);
    };
    return while$1;
  }).call(this);
  return retArr;
});
var inject = (function inject$(start, items, fn) {
  /* inject include/functional.sibilant:13:0 */

  return (function() {
    if (((items) && typeof (items) === "object" && (items).constructor.name === "Array")) {
      return items.reduce(fn, start);
    } else {
      return start;
    }
  }).call(this);
});
var map = (function map$(items, fn) {
  /* map include/functional.sibilant:18:0 */

  return (function() {
    if (((items) && typeof (items) === "object" && (items).constructor.name === "Array")) {
      return items.map(fn);
    } else {
      return [];
    }
  }).call(this);
});
var select = (function select$(items, fn) {
  /* select include/functional.sibilant:23:0 */

  return (function() {
    if (((items) && typeof (items) === "object" && (items).constructor.name === "Array")) {
      return items.filter(fn);
    } else {
      return [];
    }
  }).call(this);
});
var detect = (function detect$(items, fn) {
  /* detect include/functional.sibilant:28:0 */

  return (function() {
    if (((items) && typeof (items) === "object" && (items).constructor.name === "Array")) {
      return items.find(fn);
    }
  }).call(this);
});
var all__QUERY = (function all__QUERY$(items, fn) {
  /* all? include/functional.sibilant:32:0 */

  return (function() {
    if (((items) && typeof (items) === "object" && (items).constructor.name === "Array")) {
      return items.every(fn);
    }
  }).call(this);
});
var none__QUERY = (function none__QUERY$(items, fn) {
  /* none? include/functional.sibilant:36:0 */

  return (function() {
    if (((items) && typeof (items) === "object" && (items).constructor.name === "Array")) {
      return !(items.some(fn));
    }
  }).call(this);
});
var any__QUERY = (function any__QUERY$(items, fn) {
  /* any? include/functional.sibilant:40:0 */

  return (function() {
    if (((items) && typeof (items) === "object" && (items).constructor.name === "Array")) {
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
    if ((typeof arr === "string" && ((glue) && typeof (glue) === "object" && (glue).constructor.name === "Array"))) {
      var temp = glue;
      glue = arr;
      return arr = temp;
    }
  }).call(this);
  return (function() {
    if (((glue) && typeof (glue) === "object" && (glue).constructor.name === "Array")) {
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
    if (((items) && typeof (items) === "object" && (items).constructor.name === "Array")) {
      return inject([], items, (function(collector, item) {
        /* include/functional.sibilant:79:17 */
      
        return (function() {
          if ((!(predicate) || predicate(item))) {
            return collector.concat((function() {
              if (((item) && typeof (item) === "object" && (item).constructor.name === "Array")) {
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
    var while$2 = undefined;
    while (match) {
      while$2 = (function() {
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
    return while$2;
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
[ "whitespace", "newline", "ignored", "comment" ].forEach((function(ignored) {
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
  /* sibilant.macros.current-namespace src/macros.sibilant:15:0 */

  return sibilant.macros.namespaces[sibilant.macros.searchPath[0]];
});
sibilant.resolveMacro = (function sibilant$resolveMacro$(macroName) {
  /* sibilant.resolve-macro src/macros.sibilant:18:0 */

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
        /* src/macros.sibilant:30:33 */
      
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
  /* sibilant.with-default-search-path src/macros.sibilant:35:0 */

  var searchPathBefore = sibilant.macros.searchPath;
  sibilant.macros.searchPath = sibilant.macros.defaultSearchPath;
  var returnValue = fn();
  sibilant.macros.searchPath = searchPathBefore;
  return returnValue;
});
sibilant.macros.namespaces.core["statement__BANG"] = (function statement__BANG$(node) {
  /* statement! include/macros.sibilant:3:0 */

  return (function() {
    if (emptyNode__QUERY(transpiled)) {
      return undefined;
    } else {
      return [ node, ";" ];
    }
  }).call(this);
});
sibilant.macros.namespaces.core.ternary = (function ternary$(cond, ifTrue, ifFalse) {
  /* ternary include/macros.sibilant:14:0 */

  return [ "(", transpile(cond), ") ? ", transpile(ifTrue), " : ", transpile(ifFalse) ];
});
sibilant.macros.namespaces.core.aliasMacro = (function aliasMacro$(currentMacroName, newMacroName) {
  /* alias-macro include/macros.sibilant:28:0 */

  var currentMacroName = outputFormatter(transpile(currentMacroName)),
      newMacroName = outputFormatter(transpile(newMacroName));
  sibilant.macros.namespace[newMacroName] = sibilant.macros.namespace[currentMacroName];
  return null;
});
sibilant.macros.namespaces.core.send = (function send$(object, method, args) {
  /* send include/macros.sibilant:43:0 */

  var args = Array.prototype.slice.call(arguments, 2);

  return [ transpile(object), ".", transpile(method), "(", interleave(", ", map(args, transpile)), ")" ];
});
sibilant.macros.namespaces.core.apply = (function apply$(fn, arglist) {
  /* apply include/macros.sibilant:55:0 */

  return {
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    line: 56,
    col: 8,
    contents: [ {
      file: "include/macros.sibilant",
      token: ".",
      type: "dots",
      line: 56,
      col: 9,
      contents: [ {
        file: "include/macros.sibilant",
        token: "apply",
        type: "literal",
        line: 56,
        col: 10,
        contents: [],
        specials: 0,
        precedingIgnored: []
      } ],
      precedingIgnored: []
    }, fn, {
      file: "include/macros.sibilant",
      token: "this",
      type: "literal",
      line: 56,
      col: 20,
      contents: [],
      specials: 0,
      precedingIgnored: [ {
        file: "include/macros.sibilant",
        token: " ",
        type: "whitespace",
        line: 56,
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
sibilant.macros.namespaces.core.cons = (function cons$(first, rest) {
  /* cons include/macros.sibilant:67:0 */

  return [ "[ ", transpile(first), " ].concat(", transpile(rest), ")" ];
});
sibilant.macros.namespaces.core.append = (function append$(list, additional) {
  /* append include/macros.sibilant:76:0 */

  var additional = Array.prototype.slice.call(arguments, 1);

  return {
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    line: 77,
    col: 8,
    contents: [ {
      file: "include/macros.sibilant",
      token: ".",
      type: "dots",
      line: 77,
      col: 9,
      contents: [ {
        file: "include/macros.sibilant",
        token: "concat",
        type: "literal",
        line: 77,
        col: 10,
        contents: [],
        specials: 0,
        precedingIgnored: []
      } ],
      precedingIgnored: []
    }, list, {
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      line: 77,
      col: 23,
      contents: [ {
        file: "include/macros.sibilant",
        token: "list",
        type: "literal",
        line: 77,
        col: 24,
        contents: [],
        specials: 0,
        precedingIgnored: []
      } ].concat(additional),
      precedingIgnored: [ {
        file: "include/macros.sibilant",
        token: " ",
        type: "whitespace",
        line: 77,
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
sibilant.macros.namespaces.core.length = (function length$(arr) {
  /* length include/macros.sibilant:83:0 */

  return {
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    line: 84,
    col: 8,
    contents: [ {
      file: "include/macros.sibilant",
      token: "get",
      type: "literal",
      line: 84,
      col: 9,
      contents: [],
      specials: 0,
      precedingIgnored: []
    }, arr, {"file":"include/macros.sibilant","token":"'","type":"tick","line":84,"col":18,"contents":[{"file":"include/macros.sibilant","token":"length","type":"literal","line":84,"col":19,"contents":[],"specials":0,"precedingIgnored":[]}],"precedingIgnored":[{"file":"include/macros.sibilant","token":" ","type":"whitespace","line":84,"col":17,"contents":[]}]} ],
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core.scoped = (function scoped$(body) {
  /* scoped include/macros.sibilant:90:0 */

  var body = Array.prototype.slice.call(arguments, 0);

  return {
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    line: 91,
    col: 8,
    contents: [ {
      file: "include/macros.sibilant",
      token: ".",
      type: "dots",
      line: 91,
      col: 9,
      contents: [ {
        file: "include/macros.sibilant",
        token: "call",
        type: "literal",
        line: 91,
        col: 10,
        contents: [],
        specials: 0,
        precedingIgnored: []
      } ],
      precedingIgnored: []
    }, {
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      line: 91,
      col: 15,
      contents: [ {
        file: "include/macros.sibilant",
        token: "lambda",
        type: "literal",
        line: 91,
        col: 16,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, {
        node: this,
        args: []
      } ].concat(body),
      precedingIgnored: [ {
        file: "include/macros.sibilant",
        token: " ",
        type: "whitespace",
        line: 91,
        col: 14,
        contents: []
      } ],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    }, {
      file: "include/macros.sibilant",
      token: "this",
      type: "literal",
      line: 91,
      col: 54,
      contents: [],
      specials: 0,
      precedingIgnored: [ {
        file: "include/macros.sibilant",
        token: " ",
        type: "whitespace",
        line: 91,
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
sibilant.macros.namespaces.core.first = (function first$(arr) {
  /* first include/macros.sibilant:96:0 */

  return {
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    line: 96,
    col: 20,
    contents: [ {
      file: "include/macros.sibilant",
      token: "get",
      type: "literal",
      line: 96,
      col: 21,
      contents: [],
      specials: 0,
      precedingIgnored: []
    }, arr, {
      file: "include/macros.sibilant",
      token: "0",
      type: "number",
      line: 96,
      col: 30,
      contents: [],
      specials: 0,
      precedingIgnored: [ {
        file: "include/macros.sibilant",
        token: " ",
        type: "whitespace",
        line: 96,
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
  /* second include/macros.sibilant:101:0 */

  return {
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    line: 101,
    col: 21,
    contents: [ {
      file: "include/macros.sibilant",
      token: "get",
      type: "literal",
      line: 101,
      col: 22,
      contents: [],
      specials: 0,
      precedingIgnored: []
    }, arr, {
      file: "include/macros.sibilant",
      token: "1",
      type: "number",
      line: 101,
      col: 31,
      contents: [],
      specials: 0,
      precedingIgnored: [ {
        file: "include/macros.sibilant",
        token: " ",
        type: "whitespace",
        line: 101,
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
  /* third include/macros.sibilant:106:0 */

  return {
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    line: 106,
    col: 20,
    contents: [ {
      file: "include/macros.sibilant",
      token: "get",
      type: "literal",
      line: 106,
      col: 21,
      contents: [],
      specials: 0,
      precedingIgnored: []
    }, arr, {
      file: "include/macros.sibilant",
      token: "2",
      type: "number",
      line: 106,
      col: 30,
      contents: [],
      specials: 0,
      precedingIgnored: [ {
        file: "include/macros.sibilant",
        token: " ",
        type: "whitespace",
        line: 106,
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
  /* rest include/macros.sibilant:112:0 */

  return {
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    line: 112,
    col: 19,
    contents: [ {
      file: "include/macros.sibilant",
      token: ".",
      type: "dots",
      line: 112,
      col: 20,
      contents: [ {
        file: "include/macros.sibilant",
        token: "slice",
        type: "literal",
        line: 112,
        col: 21,
        contents: [],
        specials: 0,
        precedingIgnored: []
      } ],
      precedingIgnored: []
    }, arr, {
      file: "include/macros.sibilant",
      token: "1",
      type: "number",
      line: 112,
      col: 32,
      contents: [],
      specials: 0,
      precedingIgnored: [ {
        file: "include/macros.sibilant",
        token: " ",
        type: "whitespace",
        line: 112,
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
  /* last include/macros.sibilant:117:0 */

  return {
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    line: 117,
    col: 19,
    contents: [ {
      file: "include/macros.sibilant",
      token: "first",
      type: "literal",
      line: 117,
      col: 20,
      contents: [],
      specials: 0,
      precedingIgnored: []
    }, {
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      line: 117,
      col: 26,
      contents: [ {
        file: "include/macros.sibilant",
        token: ".",
        type: "dots",
        line: 117,
        col: 27,
        contents: [ {
          file: "include/macros.sibilant",
          token: "slice",
          type: "literal",
          line: 117,
          col: 28,
          contents: [],
          specials: 0,
          precedingIgnored: []
        } ],
        precedingIgnored: []
      }, arr, {
        file: "include/macros.sibilant",
        token: "-1",
        type: "number",
        line: 117,
        col: 39,
        contents: [],
        specials: 0,
        precedingIgnored: [ {
          file: "include/macros.sibilant",
          token: " ",
          type: "whitespace",
          line: 117,
          col: 38,
          contents: []
        } ]
      } ],
      precedingIgnored: [ {
        file: "include/macros.sibilant",
        token: " ",
        type: "whitespace",
        line: 117,
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
sibilant.macros.namespaces.core["+"] = (function $$(args) {
  /* + include/macros.sibilant:125:0 */

  var args = Array.prototype.slice.call(arguments, 0);

  return [ "(", interleave(" + ", map(args, transpile)), ")" ];
});
sibilant.macros.namespaces.core.concat = sibilant.macros.namespaces.core["+"];
sibilant.macros.namespaces.core["-"] = (function $$(args) {
  /* - include/macros.sibilant:133:0 */

  var args = Array.prototype.slice.call(arguments, 0);

  return [ "(", interleave(" - ", map(args, transpile)), ")" ];
});
sibilant.macros.namespaces.core["_"] = (function _$(args) {
  /* * include/macros.sibilant:139:0 */

  var args = Array.prototype.slice.call(arguments, 0);

  return [ "(", interleave(" * ", map(args, transpile)), ")" ];
});
sibilant.macros.namespaces.core["/"] = (function $$(args) {
  /* / include/macros.sibilant:146:0 */

  var args = Array.prototype.slice.call(arguments, 0);

  return [ "(", interleave(" / ", map(args, transpile)), ")" ];
});
sibilant.macros.namespaces.core.or = (function or$(args) {
  /* or include/macros.sibilant:153:0 */

  var args = Array.prototype.slice.call(arguments, 0);

  return [ "(", interleave(" || ", map(args, transpile)), ")" ];
});
sibilant.macros.namespaces.core.and = (function and$(args) {
  /* and include/macros.sibilant:161:0 */

  var args = Array.prototype.slice.call(arguments, 0);

  return (1 === args.length) ? transpile(args[0]) : [ "(", interleave(" && ", map(args, transpile)), ")" ];
});
sibilant.macros.namespaces.core.mod = (function mod$(args) {
  /* mod include/macros.sibilant:168:0 */

  var args = Array.prototype.slice.call(arguments, 0);

  return [ "(", interleave(" % ", map(args, transpile)), ")" ];
});
sibilant.macros.namespaces.core[">"] = (function $$(args) {
  /* > include/macros.sibilant:203:0 */

  var args = Array.prototype.slice.call(arguments, 0);

  var jsComparator = ">";
  return {
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    line: 205,
    col: 8,
    contents: [ {
      file: "include/macros.sibilant",
      token: "and",
      type: "literal",
      line: 205,
      col: 9,
      contents: [],
      specials: 0,
      precedingIgnored: []
    } ].concat(map(args.slice(0, -1), (function(item, index) {
      /* include/macros.sibilant:206:22 */
    
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
  /* < include/macros.sibilant:210:0 */

  var args = Array.prototype.slice.call(arguments, 0);

  var jsComparator = "<";
  return {
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    line: 212,
    col: 8,
    contents: [ {
      file: "include/macros.sibilant",
      token: "and",
      type: "literal",
      line: 212,
      col: 9,
      contents: [],
      specials: 0,
      precedingIgnored: []
    } ].concat(map(args.slice(0, -1), (function(item, index) {
      /* include/macros.sibilant:213:22 */
    
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
  /* <= include/macros.sibilant:216:0 */

  var args = Array.prototype.slice.call(arguments, 0);

  var jsComparator = "<=";
  return {
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    line: 218,
    col: 8,
    contents: [ {
      file: "include/macros.sibilant",
      token: "and",
      type: "literal",
      line: 218,
      col: 9,
      contents: [],
      specials: 0,
      precedingIgnored: []
    } ].concat(map(args.slice(0, -1), (function(item, index) {
      /* include/macros.sibilant:219:22 */
    
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
  /* >= include/macros.sibilant:222:0 */

  var args = Array.prototype.slice.call(arguments, 0);

  var jsComparator = ">=";
  return {
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    line: 224,
    col: 8,
    contents: [ {
      file: "include/macros.sibilant",
      token: "and",
      type: "literal",
      line: 224,
      col: 9,
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
sibilant.macros.namespaces.core["!="] = (function $$(args) {
  /* != include/macros.sibilant:227:0 */

  var args = Array.prototype.slice.call(arguments, 0);

  var jsComparator = "!==";
  return {
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    line: 229,
    col: 8,
    contents: [ {
      file: "include/macros.sibilant",
      token: "and",
      type: "literal",
      line: 229,
      col: 9,
      contents: [],
      specials: 0,
      precedingIgnored: []
    } ].concat(map(args.slice(0, -1), (function(item, index) {
      /* include/macros.sibilant:230:22 */
    
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
  /* = include/macros.sibilant:233:0 */

  var args = Array.prototype.slice.call(arguments, 0);

  var jsComparator = "===";
  return {
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    line: 235,
    col: 8,
    contents: [ {
      file: "include/macros.sibilant",
      token: "and",
      type: "literal",
      line: 235,
      col: 9,
      contents: [],
      specials: 0,
      precedingIgnored: []
    } ].concat(map(args.slice(0, -1), (function(item, index) {
      /* include/macros.sibilant:236:22 */
    
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
  /* incr-by include/macros.sibilant:243:0 */

  return [ transpile(item), " += ", transpile(increment) ];
});
sibilant.macros.namespaces.core.incr = (function incr$(item) {
  /* incr include/macros.sibilant:252:0 */

  return [ "((", transpile(item), ")++)" ];
});
sibilant.macros.namespaces.core.decr = (function decr$(item) {
  /* decr include/macros.sibilant:259:0 */

  return [ "((", transpile(item), ")--)" ];
});
sibilant.macros.namespaces.core.new = (function new$(constructor, args) {
  /* new include/macros.sibilant:266:0 */

  var args = Array.prototype.slice.call(arguments, 1);

  return [ "(new ", {
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    line: 267,
    col: 17,
    contents: [ {
      file: "include/macros.sibilant",
      token: "call",
      type: "literal",
      line: 267,
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
sibilant.macros.namespaces.core.regex = (function regex$(pattern, flags) {
  /* regex include/macros.sibilant:274:0 */

  return {
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    line: 275,
    col: 8,
    contents: [ {
      file: "include/macros.sibilant",
      token: "new",
      type: "literal",
      line: 275,
      col: 9,
      contents: [],
      specials: 0,
      precedingIgnored: []
    }, {
      file: "include/macros.sibilant",
      token: "RegExp",
      type: "literal",
      line: 275,
      col: 13,
      contents: [],
      specials: 0,
      precedingIgnored: [ {
        file: "include/macros.sibilant",
        token: " ",
        type: "whitespace",
        line: 275,
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
sibilant.macros.namespaces.core["zero__QUERY"] = (function zero__QUERY$(item) {
  /* zero? include/macros.sibilant:282:0 */

  return {
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    line: 282,
    col: 21,
    contents: [ {
      file: "include/macros.sibilant",
      token: "=",
      type: "otherChar",
      line: 282,
      col: 22,
      contents: [],
      specials: 0,
      precedingIgnored: []
    }, item, {
      file: "include/macros.sibilant",
      token: "0",
      type: "number",
      line: 282,
      col: 30,
      contents: [],
      specials: 0,
      precedingIgnored: [ {
        file: "include/macros.sibilant",
        token: " ",
        type: "whitespace",
        line: 282,
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
sibilant.macros.namespaces.core["empty__QUERY"] = (function empty__QUERY$(arr) {
  /* empty? include/macros.sibilant:288:0 */

  return {
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    line: 289,
    col: 8,
    contents: [ {
      file: "include/macros.sibilant",
      token: "=",
      type: "otherChar",
      line: 289,
      col: 9,
      contents: [],
      specials: 0,
      precedingIgnored: []
    }, {
      file: "include/macros.sibilant",
      token: "0",
      type: "number",
      line: 289,
      col: 11,
      contents: [],
      specials: 0,
      precedingIgnored: [ {
        file: "include/macros.sibilant",
        token: " ",
        type: "whitespace",
        line: 289,
        col: 10,
        contents: []
      } ]
    }, {
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      line: 289,
      col: 13,
      contents: [ {
        file: "include/macros.sibilant",
        token: "length",
        type: "literal",
        line: 289,
        col: 14,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, arr ],
      precedingIgnored: [ {
        file: "include/macros.sibilant",
        token: " ",
        type: "whitespace",
        line: 289,
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
sibilant.macros.namespaces.core["odd__QUERY"] = (function odd__QUERY$(number) {
  /* odd? include/macros.sibilant:295:0 */

  return {
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    line: 296,
    col: 8,
    contents: [ {
      file: "include/macros.sibilant",
      token: "=",
      type: "otherChar",
      line: 296,
      col: 9,
      contents: [],
      specials: 0,
      precedingIgnored: []
    }, {
      file: "include/macros.sibilant",
      token: "1",
      type: "number",
      line: 296,
      col: 11,
      contents: [],
      specials: 0,
      precedingIgnored: [ {
        file: "include/macros.sibilant",
        token: " ",
        type: "whitespace",
        line: 296,
        col: 10,
        contents: []
      } ]
    }, {
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      line: 296,
      col: 13,
      contents: [ {
        file: "include/macros.sibilant",
        token: "mod",
        type: "literal",
        line: 296,
        col: 14,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, number, {
        file: "include/macros.sibilant",
        token: "2",
        type: "number",
        line: 296,
        col: 26,
        contents: [],
        specials: 0,
        precedingIgnored: [ {
          file: "include/macros.sibilant",
          token: " ",
          type: "whitespace",
          line: 296,
          col: 25,
          contents: []
        } ]
      } ],
      precedingIgnored: [ {
        file: "include/macros.sibilant",
        token: " ",
        type: "whitespace",
        line: 296,
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
sibilant.macros.namespaces.core["even__QUERY"] = (function even__QUERY$(number) {
  /* even? include/macros.sibilant:302:0 */

  return {
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    line: 303,
    col: 8,
    contents: [ {
      file: "include/macros.sibilant",
      token: "=",
      type: "otherChar",
      line: 303,
      col: 9,
      contents: [],
      specials: 0,
      precedingIgnored: []
    }, {
      file: "include/macros.sibilant",
      token: "0",
      type: "number",
      line: 303,
      col: 11,
      contents: [],
      specials: 0,
      precedingIgnored: [ {
        file: "include/macros.sibilant",
        token: " ",
        type: "whitespace",
        line: 303,
        col: 10,
        contents: []
      } ]
    }, {
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      line: 303,
      col: 13,
      contents: [ {
        file: "include/macros.sibilant",
        token: "mod",
        type: "literal",
        line: 303,
        col: 14,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, number, {
        file: "include/macros.sibilant",
        token: "2",
        type: "number",
        line: 303,
        col: 26,
        contents: [],
        specials: 0,
        precedingIgnored: [ {
          file: "include/macros.sibilant",
          token: " ",
          type: "whitespace",
          line: 303,
          col: 25,
          contents: []
        } ]
      } ],
      precedingIgnored: [ {
        file: "include/macros.sibilant",
        token: " ",
        type: "whitespace",
        line: 303,
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
sibilant.macros.namespaces.core.typeof = (function typeof$(thing) {
  /* typeof include/macros.sibilant:310:0 */

  return [ "typeof ", transpile(thing) ];
});
sibilant.macros.namespaces.core["string__QUERY"] = (function string__QUERY$(things) {
  /* string? include/macros.sibilant:316:0 */

  var things = Array.prototype.slice.call(arguments, 0);

  return {
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    line: 317,
    col: 8,
    contents: [ {
      file: "include/macros.sibilant",
      token: "and",
      type: "literal",
      line: 317,
      col: 9,
      contents: [],
      specials: 0,
      precedingIgnored: []
    } ].concat(map(things, (function(thing) {
      /* include/macros.sibilant:317:29 */
    
      return {
        file: "include/macros.sibilant",
        token: "(",
        type: "expression",
        line: 317,
        col: 40,
        contents: [ {
          file: "include/macros.sibilant",
          token: "=",
          type: "otherChar",
          line: 317,
          col: 41,
          contents: [],
          specials: 0,
          precedingIgnored: []
        }, {
          file: "include/macros.sibilant",
          token: "(",
          type: "expression",
          line: 317,
          col: 43,
          contents: [ {
            file: "include/macros.sibilant",
            token: "typeof",
            type: "literal",
            line: 317,
            col: 44,
            contents: [],
            specials: 0,
            precedingIgnored: []
          }, thing ],
          precedingIgnored: [ {
            file: "include/macros.sibilant",
            token: " ",
            type: "whitespace",
            line: 317,
            col: 42,
            contents: []
          } ],
          specials: 0,
          end: undefined,
          closed: true,
          closingIgnored: []
        }, {"file":"include/macros.sibilant","token":"'","type":"tick","line":317,"col":59,"contents":[{"file":"include/macros.sibilant","token":"string","type":"literal","line":317,"col":60,"contents":[],"specials":0,"precedingIgnored":[]}],"precedingIgnored":[{"file":"include/macros.sibilant","token":" ","type":"whitespace","line":317,"col":58,"contents":[]}]} ],
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
  /* function? include/macros.sibilant:323:0 */

  var things = Array.prototype.slice.call(arguments, 0);

  return {
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    line: 324,
    col: 8,
    contents: [ {
      file: "include/macros.sibilant",
      token: "and",
      type: "literal",
      line: 324,
      col: 9,
      contents: [],
      specials: 0,
      precedingIgnored: []
    } ].concat(map(things, (function(thing) {
      /* include/macros.sibilant:324:29 */
    
      return {
        file: "include/macros.sibilant",
        token: "(",
        type: "expression",
        line: 324,
        col: 40,
        contents: [ {
          file: "include/macros.sibilant",
          token: "=",
          type: "otherChar",
          line: 324,
          col: 41,
          contents: [],
          specials: 0,
          precedingIgnored: []
        }, {
          file: "include/macros.sibilant",
          token: "(",
          type: "expression",
          line: 324,
          col: 43,
          contents: [ {
            file: "include/macros.sibilant",
            token: "typeof",
            type: "literal",
            line: 324,
            col: 44,
            contents: [],
            specials: 0,
            precedingIgnored: []
          }, thing ],
          precedingIgnored: [ {
            file: "include/macros.sibilant",
            token: " ",
            type: "whitespace",
            line: 324,
            col: 42,
            contents: []
          } ],
          specials: 0,
          end: undefined,
          closed: true,
          closingIgnored: []
        }, {"file":"include/macros.sibilant","token":"'","type":"tick","line":324,"col":59,"contents":[{"file":"include/macros.sibilant","token":"function","type":"literal","line":324,"col":60,"contents":[],"specials":0,"precedingIgnored":[]}],"precedingIgnored":[{"file":"include/macros.sibilant","token":" ","type":"whitespace","line":324,"col":58,"contents":[]}]} ],
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
  /* undefined? include/macros.sibilant:333:0 */

  var things = Array.prototype.slice.call(arguments, 0);

  return {
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    line: 334,
    col: 8,
    contents: [ {
      file: "include/macros.sibilant",
      token: "and",
      type: "literal",
      line: 334,
      col: 9,
      contents: [],
      specials: 0,
      precedingIgnored: []
    } ].concat(map(things, (function(thing) {
      /* include/macros.sibilant:334:29 */
    
      return {
        file: "include/macros.sibilant",
        token: "(",
        type: "expression",
        line: 334,
        col: 40,
        contents: [ {
          file: "include/macros.sibilant",
          token: "=",
          type: "otherChar",
          line: 334,
          col: 41,
          contents: [],
          specials: 0,
          precedingIgnored: []
        }, {
          file: "include/macros.sibilant",
          token: "(",
          type: "expression",
          line: 334,
          col: 43,
          contents: [ {
            file: "include/macros.sibilant",
            token: "typeof",
            type: "literal",
            line: 334,
            col: 44,
            contents: [],
            specials: 0,
            precedingIgnored: []
          }, thing ],
          precedingIgnored: [ {
            file: "include/macros.sibilant",
            token: " ",
            type: "whitespace",
            line: 334,
            col: 42,
            contents: []
          } ],
          specials: 0,
          end: undefined,
          closed: true,
          closingIgnored: []
        }, {"file":"include/macros.sibilant","token":"'","type":"tick","line":334,"col":59,"contents":[{"file":"include/macros.sibilant","token":"undefined","type":"literal","line":334,"col":60,"contents":[],"specials":0,"precedingIgnored":[]}],"precedingIgnored":[{"file":"include/macros.sibilant","token":" ","type":"whitespace","line":334,"col":58,"contents":[]}]} ],
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
  /* defined? include/macros.sibilant:342:0 */

  var things = Array.prototype.slice.call(arguments, 0);

  return {
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    line: 343,
    col: 8,
    contents: [ {
      file: "include/macros.sibilant",
      token: "and",
      type: "literal",
      line: 343,
      col: 9,
      contents: [],
      specials: 0,
      precedingIgnored: []
    } ].concat(map(things, (function(thing) {
      /* include/macros.sibilant:343:29 */
    
      return {
        file: "include/macros.sibilant",
        token: "(",
        type: "expression",
        line: 343,
        col: 40,
        contents: [ {
          file: "include/macros.sibilant",
          token: "!=",
          type: "otherChar",
          line: 343,
          col: 41,
          contents: [],
          specials: 0,
          precedingIgnored: []
        }, {
          file: "include/macros.sibilant",
          token: "(",
          type: "expression",
          line: 343,
          col: 44,
          contents: [ {
            file: "include/macros.sibilant",
            token: "typeof",
            type: "literal",
            line: 343,
            col: 45,
            contents: [],
            specials: 0,
            precedingIgnored: []
          }, thing ],
          precedingIgnored: [ {
            file: "include/macros.sibilant",
            token: " ",
            type: "whitespace",
            line: 343,
            col: 43,
            contents: []
          } ],
          specials: 0,
          end: undefined,
          closed: true,
          closingIgnored: []
        }, {"file":"include/macros.sibilant","token":"'","type":"tick","line":343,"col":60,"contents":[{"file":"include/macros.sibilant","token":"undefined","type":"literal","line":343,"col":61,"contents":[],"specials":0,"precedingIgnored":[]}],"precedingIgnored":[{"file":"include/macros.sibilant","token":" ","type":"whitespace","line":343,"col":59,"contents":[]}]} ],
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
  /* number? include/macros.sibilant:350:0 */

  var things = Array.prototype.slice.call(arguments, 0);

  return {
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    line: 351,
    col: 8,
    contents: [ {
      file: "include/macros.sibilant",
      token: "and",
      type: "literal",
      line: 351,
      col: 9,
      contents: [],
      specials: 0,
      precedingIgnored: []
    } ].concat(map(things, (function(thing) {
      /* include/macros.sibilant:351:29 */
    
      return {
        file: "include/macros.sibilant",
        token: "(",
        type: "expression",
        line: 351,
        col: 40,
        contents: [ {
          file: "include/macros.sibilant",
          token: "=",
          type: "otherChar",
          line: 351,
          col: 41,
          contents: [],
          specials: 0,
          precedingIgnored: []
        }, {
          file: "include/macros.sibilant",
          token: "(",
          type: "expression",
          line: 351,
          col: 43,
          contents: [ {
            file: "include/macros.sibilant",
            token: "typeof",
            type: "literal",
            line: 351,
            col: 44,
            contents: [],
            specials: 0,
            precedingIgnored: []
          }, thing ],
          precedingIgnored: [ {
            file: "include/macros.sibilant",
            token: " ",
            type: "whitespace",
            line: 351,
            col: 42,
            contents: []
          } ],
          specials: 0,
          end: undefined,
          closed: true,
          closingIgnored: []
        }, {"file":"include/macros.sibilant","token":"'","type":"tick","line":351,"col":59,"contents":[{"file":"include/macros.sibilant","token":"number","type":"literal","line":351,"col":60,"contents":[],"specials":0,"precedingIgnored":[]}],"precedingIgnored":[{"file":"include/macros.sibilant","token":" ","type":"whitespace","line":351,"col":58,"contents":[]}]} ],
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
  /* pipe include/macros.sibilant:377:0 */

  var calls = Array.prototype.slice.call(arguments, 0);

  return inject(undefined, calls, (function(value, item) {
    /* include/macros.sibilant:379:15 */
  
    return (function() {
      if (typeof value === "undefined") {
        return item;
      } else {
        return (function() {
          /* include/macros.sibilant:381:21 */
        
          var cloned = (function() {
            if (node__QUERY(item, "literal", "dots")) {
              return {
                file: "include/macros.sibilant",
                token: "(",
                type: "expression",
                line: 383,
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
            /* include/macros.sibilant:387:47 */
          
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
  /* comment include/macros.sibilant:408:0 */

  var contents = Array.prototype.slice.call(arguments, 0);

  return map(contents, (function(content) {
    /* include/macros.sibilant:409:21 */
  
    return [ "// ", recurseMap(transpile(content), (function(item) {
      /* include/macros.sibilant:411:36 */
    
      return (item) ? outputFormatter(transpile(item)).replace((new RegExp("\n", "g")), "\n// ") : null;
    })) ];
  }));
});
sibilant.macros.namespaces.core["array__QUERY"] = (function array__QUERY$(thing) {
  /* array? include/macros.sibilant:431:0 */

  var transpiled = transpile(thing);
  return [ "((", transpiled, ") && typeof (", transpiled, ") === \"object\" && (", transpiled, ").constructor.name === \"Array\")" ];
});
sibilant.macros.namespaces.core["list__QUERY"] = sibilant.macros.namespaces.core["array__QUERY"];
sibilant.macros.namespaces.core["hash__QUERY"] = (function hash__QUERY$(thing) {
  /* hash? include/macros.sibilant:443:0 */

  return {
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    line: 444,
    col: 8,
    contents: [ {
      file: "include/macros.sibilant",
      token: "and",
      type: "literal",
      line: 444,
      col: 9,
      contents: [],
      specials: 0,
      precedingIgnored: []
    }, {
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      line: 444,
      col: 13,
      contents: [ {
        file: "include/macros.sibilant",
        token: "=",
        type: "otherChar",
        line: 444,
        col: 14,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, {"file":"include/macros.sibilant","token":"'","type":"tick","line":444,"col":16,"contents":[{"file":"include/macros.sibilant","token":"object","type":"literal","line":444,"col":17,"contents":[],"specials":0,"precedingIgnored":[]}],"precedingIgnored":[{"file":"include/macros.sibilant","token":" ","type":"whitespace","line":444,"col":15,"contents":[]}]}, {
        file: "include/macros.sibilant",
        token: "(",
        type: "expression",
        line: 444,
        col: 24,
        contents: [ {
          file: "include/macros.sibilant",
          token: "typeof",
          type: "literal",
          line: 444,
          col: 25,
          contents: [],
          specials: 0,
          precedingIgnored: []
        }, thing ],
        precedingIgnored: [ {
          file: "include/macros.sibilant",
          token: " ",
          type: "whitespace",
          line: 444,
          col: 23,
          contents: []
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      } ],
      precedingIgnored: [ {
        file: "include/macros.sibilant",
        token: " ",
        type: "whitespace",
        line: 444,
        col: 12,
        contents: []
      } ],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    }, {
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      line: 445,
      col: 13,
      contents: [ {
        file: "include/macros.sibilant",
        token: "!=",
        type: "otherChar",
        line: 445,
        col: 14,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, thing, {
        file: "include/macros.sibilant",
        token: "null",
        type: "literal",
        line: 445,
        col: 24,
        contents: [],
        specials: 0,
        precedingIgnored: [ {
          file: "include/macros.sibilant",
          token: " ",
          type: "whitespace",
          line: 445,
          col: 23,
          contents: []
        } ]
      } ],
      precedingIgnored: [ {
        file: "include/macros.sibilant",
        token: "\n",
        type: "newline",
        line: 444,
        col: 40,
        contents: []
      }, {
        file: "include/macros.sibilant",
        token: "             ",
        type: "whitespace",
        line: 445,
        col: 0,
        contents: []
      } ],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    }, {
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      line: 446,
      col: 13,
      contents: [ {
        file: "include/macros.sibilant",
        token: "!=",
        type: "otherChar",
        line: 446,
        col: 14,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, {
        file: "include/macros.sibilant",
        token: "(",
        type: "expression",
        line: 446,
        col: 17,
        contents: [ {
          file: "include/macros.sibilant",
          token: "get",
          type: "literal",
          line: 446,
          col: 18,
          contents: [],
          specials: 0,
          precedingIgnored: []
        }, thing, {"file":"include/macros.sibilant","token":"'","type":"tick","line":446,"col":29,"contents":[{"file":"include/macros.sibilant","token":"constructor","type":"literal","line":446,"col":30,"contents":[],"specials":0,"precedingIgnored":[]}],"precedingIgnored":[{"file":"include/macros.sibilant","token":" ","type":"whitespace","line":446,"col":28,"contents":[]}]}, {"file":"include/macros.sibilant","token":"'","type":"tick","line":446,"col":42,"contents":[{"file":"include/macros.sibilant","token":"name","type":"literal","line":446,"col":43,"contents":[],"specials":0,"precedingIgnored":[]}],"precedingIgnored":[{"file":"include/macros.sibilant","token":" ","type":"whitespace","line":446,"col":41,"contents":[]}]} ],
        precedingIgnored: [ {
          file: "include/macros.sibilant",
          token: " ",
          type: "whitespace",
          line: 446,
          col: 16,
          contents: []
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      }, {"file":"include/macros.sibilant","token":"'","type":"tick","line":446,"col":49,"contents":[{"file":"include/macros.sibilant","token":"Array","type":"literal","line":446,"col":50,"contents":[],"specials":0,"precedingIgnored":[]}],"precedingIgnored":[{"file":"include/macros.sibilant","token":" ","type":"whitespace","line":446,"col":48,"contents":[]}]} ],
      precedingIgnored: [ {
        file: "include/macros.sibilant",
        token: "\n",
        type: "newline",
        line: 445,
        col: 29,
        contents: []
      }, {
        file: "include/macros.sibilant",
        token: "             ",
        type: "whitespace",
        line: 446,
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
sibilant.macros.namespaces.core["object__QUERY"] = sibilant.macros.namespaces.core["hash__QUERY"];
sibilant.macros.namespaces.core["_scopedWithoutReturn"] = (function _scopedWithoutReturn$(body) {
  /* *scoped-without-return include/macros.sibilant:449:0 */

  var body = Array.prototype.slice.call(arguments, 0);

  return [ "(function() {", indent.apply(this, body), "}).call(this)" ];
});
sibilant.macros.namespaces.core["_scopedWithoutSource"] = (function _scopedWithoutSource$(body) {
  /* *scoped-without-source include/macros.sibilant:453:0 */

  var body = Array.prototype.slice.call(arguments, 0);

  return {
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    line: 454,
    col: 8,
    contents: [ {
      file: "include/macros.sibilant",
      token: "*scoped-without-return",
      type: "literal",
      line: 454,
      col: 9,
      contents: [],
      specials: 0,
      precedingIgnored: []
    }, {
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      line: 454,
      col: 32,
      contents: [ {
        file: "include/macros.sibilant",
        token: "do",
        type: "literal",
        line: 454,
        col: 33,
        contents: [],
        specials: 0,
        precedingIgnored: []
      } ].concat(body),
      precedingIgnored: [ {
        file: "include/macros.sibilant",
        token: " ",
        type: "whitespace",
        line: 454,
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
sibilant.macros.namespaces.core.when = (function when$(condition, body) {
  /* when include/macros.sibilant:463:0 */

  var body = Array.prototype.slice.call(arguments, 1);

  return sibilant.macros.namespaces.core["_scopedWithoutReturn"]("if (", condition, ") {", indent({
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    line: 466,
    col: 18,
    contents: [ {
      file: "include/macros.sibilant",
      token: "do",
      type: "literal",
      line: 466,
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
sibilant.macros.namespaces.core.not = (function not$(exp) {
  /* not include/macros.sibilant:475:0 */

  return [ "!(", transpile(exp), ")" ];
});
sibilant.macros.namespaces.core.unless = (function unless$(condition, body) {
  /* unless include/macros.sibilant:488:0 */

  var body = Array.prototype.slice.call(arguments, 1);

  return [ "(function() {", indent([ "if (", {
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    line: 490,
    col: 25,
    contents: [ {
      file: "include/macros.sibilant",
      token: "not",
      type: "literal",
      line: 490,
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
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    line: 491,
    col: 33,
    contents: [ {
      file: "include/macros.sibilant",
      token: "do",
      type: "literal",
      line: 491,
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
sibilant.macros.namespaces.core.logPretty = (function logPretty$(label, arg) {
  /* log-pretty include/macros.sibilant:502:0 */

  var node = this;
  (function() {
    if (typeof arg === "undefined") {
      arg = label;
      return label = [ "\"", prettify(label, false), "\"" ];
    }
  }).call(this);
  return {
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    line: 507,
    col: 8,
    contents: [ {
      file: "include/macros.sibilant",
      token: "console.log",
      type: "literal",
      line: 507,
      col: 9,
      contents: [],
      specials: 0,
      precedingIgnored: []
    }, {
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      line: 507,
      col: 21,
      contents: [ {
        file: "include/macros.sibilant",
        token: "concat",
        type: "literal",
        line: 507,
        col: 22,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, [ "\"", node.file, ":", node.line, "\"" ], {
        file: "include/macros.sibilant",
        token: "\" \"",
        type: "string",
        line: 507,
        col: 66,
        contents: [],
        specials: 0,
        precedingIgnored: [ {
          file: "include/macros.sibilant",
          token: " ",
          type: "whitespace",
          line: 507,
          col: 65,
          contents: []
        } ]
      }, label, {
        file: "include/macros.sibilant",
        token: "\" = \"",
        type: "string",
        line: 507,
        col: 77,
        contents: [],
        specials: 0,
        precedingIgnored: [ {
          file: "include/macros.sibilant",
          token: " ",
          type: "whitespace",
          line: 507,
          col: 76,
          contents: []
        } ]
      }, {
        file: "include/macros.sibilant",
        token: "(",
        type: "expression",
        line: 507,
        col: 83,
        contents: [ {
          file: "include/macros.sibilant",
          token: "prettify",
          type: "literal",
          line: 507,
          col: 84,
          contents: [],
          specials: 0,
          precedingIgnored: []
        }, arg ],
        precedingIgnored: [ {
          file: "include/macros.sibilant",
          token: " ",
          type: "whitespace",
          line: 507,
          col: 82,
          contents: []
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      } ],
      precedingIgnored: [ {
        file: "include/macros.sibilant",
        token: " ",
        type: "whitespace",
        line: 507,
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
sibilant.macros.namespaces.core.each = (function each$(item, array, body) {
  /* each include/macros.sibilant:520:17 */

  var body = Array.prototype.slice.call(arguments, 2);

  return {
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    line: 521,
    col: 8,
    contents: [ {
      file: "include/macros.sibilant",
      token: ".",
      type: "dots",
      line: 521,
      col: 9,
      contents: [ {
        file: "include/macros.sibilant",
        token: "for-each",
        type: "literal",
        line: 521,
        col: 10,
        contents: [],
        specials: 0,
        precedingIgnored: []
      } ],
      precedingIgnored: []
    }, array, {
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      line: 522,
      col: 19,
      contents: [ {
        file: "include/macros.sibilant",
        token: "lambda",
        type: "literal",
        line: 522,
        col: 20,
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
        file: "include/macros.sibilant",
        token: "\n",
        type: "newline",
        line: 521,
        col: 25,
        contents: []
      }, {
        file: "include/macros.sibilant",
        token: "                   ",
        type: "whitespace",
        line: 522,
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
sibilant.macros.namespaces.core.throw = (function throw$(error) {
  /* throw include/macros.sibilant:534:0 */

  return [ "throw ", transpile(error) ];
});
sibilant.macros.namespaces.core.asBoolean = (function asBoolean$(expr) {
  /* as-boolean include/macros.sibilant:545:0 */

  return [ "(!!(", transpile(expr), "))" ];
});
sibilant.macros.namespaces.core.asNumber = (function asNumber$(expr) {
  /* as-number include/macros.sibilant:554:0 */

  return {
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    line: 554,
    col: 25,
    contents: [ {
      file: "include/macros.sibilant",
      token: "Number",
      type: "literal",
      line: 554,
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
sibilant.macros.namespaces.core.try = (function try$(tryblock, catchblock) {
  /* try include/macros.sibilant:558:0 */

  return [ "(function() {", indent([ "try {", indent({
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    line: 561,
    col: 26,
    contents: [ {
      file: "include/macros.sibilant",
      token: "do",
      type: "literal",
      line: 561,
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
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    line: 563,
    col: 26,
    contents: [ {
      file: "include/macros.sibilant",
      token: "do",
      type: "literal",
      line: 563,
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
sibilant.macros.namespaces.core.while = (function while$(condition, body) {
  /* while include/macros.sibilant:575:0 */

  var body = Array.prototype.slice.call(arguments, 1);

  var symbol = generateSymbol("while");
  return {
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    line: 577,
    col: 8,
    contents: [ {
      file: "include/macros.sibilant",
      token: "*scoped-without-source",
      type: "literal",
      line: 577,
      col: 9,
      contents: [],
      specials: 0,
      precedingIgnored: []
    }, {
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      line: 578,
      col: 9,
      contents: [ {
        file: "include/macros.sibilant",
        token: "var",
        type: "literal",
        line: 578,
        col: 10,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, symbol ],
      precedingIgnored: [ {
        file: "include/macros.sibilant",
        token: "\n",
        type: "newline",
        line: 577,
        col: 31,
        contents: []
      }, {
        file: "include/macros.sibilant",
        token: "         ",
        type: "whitespace",
        line: 578,
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
        file: "include/macros.sibilant",
        token: "(",
        type: "expression",
        line: 581,
        col: 35,
        contents: [ {
          file: "include/macros.sibilant",
          token: "assign",
          type: "literal",
          line: 581,
          col: 36,
          contents: [],
          specials: 0,
          precedingIgnored: []
        }, symbol, {
          file: "include/macros.sibilant",
          token: "(",
          type: "expression",
          line: 581,
          col: 51,
          contents: [ {
            file: "include/macros.sibilant",
            token: "*scoped-without-source",
            type: "literal",
            line: 581,
            col: 52,
            contents: [],
            specials: 0,
            precedingIgnored: []
          } ].concat(body),
          precedingIgnored: [ {
            file: "include/macros.sibilant",
            token: " ",
            type: "whitespace",
            line: 581,
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
  /* until include/macros.sibilant:594:0 */

  var body = Array.prototype.slice.call(arguments, 1);

  return {
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    line: 595,
    col: 8,
    contents: [ {
      file: "include/macros.sibilant",
      token: "while",
      type: "literal",
      line: 595,
      col: 9,
      contents: [],
      specials: 0,
      precedingIgnored: []
    }, {
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      line: 595,
      col: 15,
      contents: [ {
        file: "include/macros.sibilant",
        token: "not",
        type: "literal",
        line: 595,
        col: 16,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, condition ],
      precedingIgnored: [ {
        file: "include/macros.sibilant",
        token: " ",
        type: "whitespace",
        line: 595,
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
sibilant.macros.namespaces.core["match__QUERY"] = (function match__QUERY$(regexp, string) {
  /* match? include/macros.sibilant:604:0 */

  return {
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    line: 605,
    col: 8,
    contents: [ {
      file: "include/macros.sibilant",
      token: ".",
      type: "dots",
      line: 605,
      col: 9,
      contents: [ {
        file: "include/macros.sibilant",
        token: "match",
        type: "literal",
        line: 605,
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
sibilant.macros.namespaces.core["matchRegex__QUERY"] = (function matchRegex__QUERY$(string, pattern, flags) {
  /* match-regex? include/macros.sibilant:610:0 */

  return {
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    line: 611,
    col: 8,
    contents: [ {
      file: "include/macros.sibilant",
      token: "match?",
      type: "literal",
      line: 611,
      col: 9,
      contents: [],
      specials: 0,
      precedingIgnored: []
    }, {
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      line: 611,
      col: 16,
      contents: [ {
        file: "include/macros.sibilant",
        token: "regex",
        type: "literal",
        line: 611,
        col: 17,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, pattern, flags ],
      precedingIgnored: [ {
        file: "include/macros.sibilant",
        token: " ",
        type: "whitespace",
        line: 611,
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
  /* replace include/macros.sibilant:617:0 */

  return {
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    line: 618,
    col: 8,
    contents: [ {
      file: "include/macros.sibilant",
      token: ".",
      type: "dots",
      line: 618,
      col: 9,
      contents: [ {
        file: "include/macros.sibilant",
        token: "replace",
        type: "literal",
        line: 618,
        col: 10,
        contents: [],
        specials: 0,
        precedingIgnored: []
      } ],
      precedingIgnored: []
    }, string, {
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      line: 619,
      col: 14,
      contents: [ {
        file: "include/macros.sibilant",
        token: "regex",
        type: "literal",
        line: 619,
        col: 15,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, pattern ],
      precedingIgnored: [ {
        file: "include/macros.sibilant",
        token: "\n",
        type: "newline",
        line: 618,
        col: 25,
        contents: []
      }, {
        file: "include/macros.sibilant",
        token: "              ",
        type: "whitespace",
        line: 619,
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
  /* replace-all include/macros.sibilant:625:0 */

  return {
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    line: 626,
    col: 8,
    contents: [ {
      file: "include/macros.sibilant",
      token: ".",
      type: "dots",
      line: 626,
      col: 9,
      contents: [ {
        file: "include/macros.sibilant",
        token: "replace",
        type: "literal",
        line: 626,
        col: 10,
        contents: [],
        specials: 0,
        precedingIgnored: []
      } ],
      precedingIgnored: []
    }, string, {
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      line: 626,
      col: 26,
      contents: [ {
        file: "include/macros.sibilant",
        token: "regex",
        type: "literal",
        line: 626,
        col: 27,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, pattern, {"file":"include/macros.sibilant","token":"'","type":"tick","line":626,"col":42,"contents":[{"file":"include/macros.sibilant","token":"g","type":"literal","line":626,"col":43,"contents":[],"specials":0,"precedingIgnored":[]}],"precedingIgnored":[{"file":"include/macros.sibilant","token":" ","type":"whitespace","line":626,"col":41,"contents":[]}]} ],
      precedingIgnored: [ {
        file: "include/macros.sibilant",
        token: " ",
        type: "whitespace",
        line: 626,
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
sibilant.macros.namespaces.core.thunk = (function thunk$(body) {
  /* thunk include/macros.sibilant:639:0 */

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
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    line: 647,
    col: 8,
    contents: [ {
      file: "include/macros.sibilant",
      token: "lambda",
      type: "literal",
      line: 647,
      col: 9,
      contents: [],
      specials: 0,
      precedingIgnored: []
    }, lambdaOptions ].concat(mapNode(body, (function(node) {
      /* include/macros.sibilant:649:17 */
    
      return (function() {
        if (node__QUERY(node, "argPlaceholder")) {
          return {
            file: "include/macros.sibilant",
            token: "(",
            type: "expression",
            line: 651,
            col: 24,
            contents: [ {
              file: "include/macros.sibilant",
              token: "argument",
              type: "literal",
              line: 651,
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
sibilant.macros.namespaces.core.pipeThunk = (function pipeThunk$(calls) {
  /* pipe-thunk include/macros.sibilant:662:0 */

  var calls = Array.prototype.slice.call(arguments, 0);

  return {
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    line: 662,
    col: 30,
    contents: [ {
      file: "include/macros.sibilant",
      token: "thunk",
      type: "literal",
      line: 662,
      col: 31,
      contents: [],
      specials: 0,
      precedingIgnored: []
    }, { node: this }, {
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      line: 662,
      col: 52,
      contents: [ {
        file: "include/macros.sibilant",
        token: "pipe",
        type: "literal",
        line: 662,
        col: 53,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, {
        file: "include/macros.sibilant",
        token: "#0",
        type: "argPlaceholder",
        line: 662,
        col: 58,
        contents: [],
        specials: 0,
        precedingIgnored: [ {
          file: "include/macros.sibilant",
          token: " ",
          type: "whitespace",
          line: 662,
          col: 57,
          contents: []
        } ]
      } ].concat(calls),
      precedingIgnored: [ {
        file: "include/macros.sibilant",
        token: " ",
        type: "whitespace",
        line: 662,
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
sibilant.macros.namespaces.core.keys = (function keys$(obj) {
  /* keys include/macros.sibilant:674:0 */

  return {
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    line: 675,
    col: 8,
    contents: [ {
      file: "include/macros.sibilant",
      token: "Object.keys",
      type: "literal",
      line: 675,
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
  /* delete include/macros.sibilant:687:0 */

  var objects = Array.prototype.slice.call(arguments, 0);

  return interleave("\n", map(objects, (function(obj) {
    /* include/macros.sibilant:688:37 */
  
    return asStatement([ "delete ", transpile(obj) ]);
  })));
});
sibilant.macros.namespaces.core.deleteMacro = (function deleteMacro$(macroNames) {
  /* delete-macro include/macros.sibilant:699:0 */

  var macroNames = Array.prototype.slice.call(arguments, 0);

  macroNames.forEach((function(macroName) {
    /* include/macros.sibilant:700:7 */
  
    return delete sibilant.macros.namespace[outputFormatter(transpile(macroName))];
  }));
  return null;
});
sibilant.macros.namespaces.core.delmacro = sibilant.macros.namespaces.core.deleteMacro;
sibilant.macros.namespaces.core.renameMacro = (function renameMacro$(currentMacroName, newMacroName) {
  /* rename-macro include/macros.sibilant:712:0 */

  sibilant.macros.namespaces.core.aliasMacro(currentMacroName, newMacroName);
  sibilant.macros.namespaces.core.deleteMacro(currentMacroName);
  return null;
});
sibilant.macros.namespaces.core.arguments = (function arguments$() {
  /* arguments include/macros.sibilant:727:0 */

  return [ "(Array.prototype.slice.apply(arguments))" ];
});
sibilant.macros.namespaces.core.argument = (function argument$(index) {
  /* argument include/macros.sibilant:739:0 */

  return {
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    line: 740,
    col: 8,
    contents: [ {
      file: "include/macros.sibilant",
      token: "get",
      type: "literal",
      line: 740,
      col: 9,
      contents: [],
      specials: 0,
      precedingIgnored: []
    }, {
      file: "include/macros.sibilant",
      token: "arguments",
      type: "literal",
      line: 740,
      col: 13,
      contents: [],
      specials: 0,
      precedingIgnored: [ {
        file: "include/macros.sibilant",
        token: " ",
        type: "whitespace",
        line: 740,
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
sibilant.macros.namespaces.core.eachKey = (function eachKey$(as, obj, body) {
  /* each-key include/macros.sibilant:748:0 */

  var body = Array.prototype.slice.call(arguments, 2);

  return {
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    line: 749,
    col: 8,
    contents: [ {
      file: "include/macros.sibilant",
      token: "pipe",
      type: "literal",
      line: 749,
      col: 9,
      contents: [],
      specials: 0,
      precedingIgnored: []
    }, obj, {
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      line: 749,
      col: 19,
      contents: [ {
        file: "include/macros.sibilant",
        token: "keys",
        type: "literal",
        line: 749,
        col: 20,
        contents: [],
        specials: 0,
        precedingIgnored: []
      } ],
      precedingIgnored: [ {
        file: "include/macros.sibilant",
        token: " ",
        type: "whitespace",
        line: 749,
        col: 18,
        contents: []
      } ],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    }, {
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      line: 750,
      col: 14,
      contents: [ {
        file: "include/macros.sibilant",
        token: ".",
        type: "dots",
        line: 750,
        col: 15,
        contents: [ {
          file: "include/macros.sibilant",
          token: "for-each",
          type: "literal",
          line: 750,
          col: 16,
          contents: [],
          specials: 0,
          precedingIgnored: []
        } ],
        precedingIgnored: []
      }, {
        file: "include/macros.sibilant",
        token: "(",
        type: "expression",
        line: 750,
        col: 25,
        contents: [ {
          file: "include/macros.sibilant",
          token: "lambda",
          type: "literal",
          line: 750,
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
          file: "include/macros.sibilant",
          token: " ",
          type: "whitespace",
          line: 750,
          col: 24,
          contents: []
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      } ],
      precedingIgnored: [ {
        file: "include/macros.sibilant",
        token: "\n",
        type: "newline",
        line: 749,
        col: 25,
        contents: []
      }, {
        file: "include/macros.sibilant",
        token: "              ",
        type: "whitespace",
        line: 750,
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
sibilant.macros.namespaces.core.switch = (function switch$(obj, cases) {
  /* switch include/macros.sibilant:771:0 */

  var cases = Array.prototype.slice.call(arguments, 1);

  return [ "(function() {", indent([ "switch(", transpile(obj), ") {", map(cases, (function(caseDef) {
    /* include/macros.sibilant:774:30 */
  
    var caseNameNode = caseDef.contents[0],
        caseLabels = (function() {
      if (node__QUERY(caseNameNode, "expression", "bracket")) {
        return caseNameNode.contents;
      } else {
        return [ caseNameNode ];
      }
    }).call(this),
        caseString = interleave("\n", map(caseLabels, (function(c) {
      /* include/macros.sibilant:780:78 */
    
      return (function() {
        if ("default" === c.token) {
          return "default:";
        } else {
          return [ "case ", transpile(c), ":" ];
        }
      }).call(this);
    })));
    return [ "\n", caseString, indent({
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      line: 784,
      col: 59,
      contents: [ {
        file: "include/macros.sibilant",
        token: "do",
        type: "literal",
        line: 784,
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
sibilant.macros.namespaces.core.if = (function if$(alternatingConditionsAndBranches) {
  /* if include/macros.sibilant:816:0 */

  var alternatingConditionsAndBranches = Array.prototype.slice.call(arguments, 0);

  return [ "(function() {", indent(interleave(" else ", bulkMap(alternatingConditionsAndBranches, (function(cond, val) {
    /* include/macros.sibilant:821:25 */
  
    return (function() {
      if (typeof val !== "undefined") {
        return [ "if (", transpile(cond), ") {", indent({
          file: "include/macros.sibilant",
          token: "(",
          type: "expression",
          line: 824,
          col: 44,
          contents: [ {
            file: "include/macros.sibilant",
            token: "do",
            type: "literal",
            line: 824,
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
          file: "include/macros.sibilant",
          token: "(",
          type: "expression",
          line: 826,
          col: 47,
          contents: [ {
            file: "include/macros.sibilant",
            token: "do",
            type: "literal",
            line: 826,
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
sibilant.macros.namespaces.core["instanceOf__QUERY"] = (function instanceOf__QUERY$(item, type) {
  /* instance-of? include/macros.sibilant:839:0 */

  return [ "(", transpile(item), " instanceof ", transpile(type), ")" ];
});
sibilant.macros.namespaces.core["includes__QUERY"] = (function includes__QUERY$(haystack, needle) {
  /* includes? include/macros.sibilant:850:0 */

  return {
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    line: 851,
    col: 8,
    contents: [ {
      file: "include/macros.sibilant",
      token: "pipe",
      type: "literal",
      line: 851,
      col: 9,
      contents: [],
      specials: 0,
      precedingIgnored: []
    }, haystack, {
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      line: 851,
      col: 24,
      contents: [ {
        file: "include/macros.sibilant",
        token: ".",
        type: "dots",
        line: 851,
        col: 25,
        contents: [ {
          file: "include/macros.sibilant",
          token: "index-of",
          type: "literal",
          line: 851,
          col: 26,
          contents: [],
          specials: 0,
          precedingIgnored: []
        } ],
        precedingIgnored: []
      }, needle ],
      precedingIgnored: [ {
        file: "include/macros.sibilant",
        token: " ",
        type: "whitespace",
        line: 851,
        col: 23,
        contents: []
      } ],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    }, {
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      line: 851,
      col: 44,
      contents: [ {
        file: "include/macros.sibilant",
        token: "!=",
        type: "otherChar",
        line: 851,
        col: 45,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, {
        file: "include/macros.sibilant",
        token: "-1",
        type: "number",
        line: 851,
        col: 48,
        contents: [],
        specials: 0,
        precedingIgnored: [ {
          file: "include/macros.sibilant",
          token: " ",
          type: "whitespace",
          line: 851,
          col: 47,
          contents: []
        } ]
      } ],
      precedingIgnored: [ {
        file: "include/macros.sibilant",
        token: " ",
        type: "whitespace",
        line: 851,
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
sibilant.macros.namespaces.core["excludes__QUERY"] = (function excludes__QUERY$(haystack, needle) {
  /* excludes? include/macros.sibilant:863:0 */

  return {
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    line: 864,
    col: 8,
    contents: [ {
      file: "include/macros.sibilant",
      token: "pipe",
      type: "literal",
      line: 864,
      col: 9,
      contents: [],
      specials: 0,
      precedingIgnored: []
    }, haystack, {
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      line: 864,
      col: 24,
      contents: [ {
        file: "include/macros.sibilant",
        token: ".",
        type: "dots",
        line: 864,
        col: 25,
        contents: [ {
          file: "include/macros.sibilant",
          token: "index-of",
          type: "literal",
          line: 864,
          col: 26,
          contents: [],
          specials: 0,
          precedingIgnored: []
        } ],
        precedingIgnored: []
      }, needle ],
      precedingIgnored: [ {
        file: "include/macros.sibilant",
        token: " ",
        type: "whitespace",
        line: 864,
        col: 23,
        contents: []
      } ],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    }, {
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      line: 864,
      col: 44,
      contents: [ {
        file: "include/macros.sibilant",
        token: "=",
        type: "otherChar",
        line: 864,
        col: 45,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, {
        file: "include/macros.sibilant",
        token: "-1",
        type: "number",
        line: 864,
        col: 47,
        contents: [],
        specials: 0,
        precedingIgnored: [ {
          file: "include/macros.sibilant",
          token: " ",
          type: "whitespace",
          line: 864,
          col: 46,
          contents: []
        } ]
      } ],
      precedingIgnored: [ {
        file: "include/macros.sibilant",
        token: " ",
        type: "whitespace",
        line: 864,
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
sibilant.macros.namespaces.core["exists__QUERY"] = (function exists__QUERY$(thing) {
  /* exists? include/macros.sibilant:874:0 */

  return {
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    line: 875,
    col: 8,
    contents: [ {
      file: "include/macros.sibilant",
      token: "and",
      type: "literal",
      line: 875,
      col: 9,
      contents: [],
      specials: 0,
      precedingIgnored: []
    }, {
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      line: 875,
      col: 13,
      contents: [ {
        file: "include/macros.sibilant",
        token: "defined?",
        type: "literal",
        line: 875,
        col: 14,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, thing ],
      precedingIgnored: [ {
        file: "include/macros.sibilant",
        token: " ",
        type: "whitespace",
        line: 875,
        col: 12,
        contents: []
      } ],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    }, {
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      line: 875,
      col: 31,
      contents: [ {
        file: "include/macros.sibilant",
        token: "!=",
        type: "otherChar",
        line: 875,
        col: 32,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, thing, {
        file: "include/macros.sibilant",
        token: "null",
        type: "literal",
        line: 875,
        col: 42,
        contents: [],
        specials: 0,
        precedingIgnored: [ {
          file: "include/macros.sibilant",
          token: " ",
          type: "whitespace",
          line: 875,
          col: 41,
          contents: []
        } ]
      } ],
      precedingIgnored: [ {
        file: "include/macros.sibilant",
        token: " ",
        type: "whitespace",
        line: 875,
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
sibilant.macros.namespaces.core.withState = (function withState$(k, v, body) {
  /* with-state include/macros.sibilant:881:0 */

  var body = Array.prototype.slice.call(arguments, 2);

  var state = sibilant.state,
      $1 = map([ k, v ], (function() {
    /* include/macros.sibilant:883:41 */
  
    return outputFormatter(transpile(arguments[0]));
  })),
      key = $1[0],
      value = $1[1],
      $1 = undefined,
      before = state[key];
  state[key] = value;
  var returnValue = interleave("\n", map(body, transpile));
  state[key] = before;
  return returnValue;
});
sibilant.macros.namespaces.core.join = (function join$(arr, glue) {
  /* join include/macros.sibilant:901:0 */

  (function() {
    if ((typeof glue !== "undefined" && typeof arr === "undefined")) {
      arr = glue;
      return glue = undefined;
    }
  }).call(this);
  return {
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    line: 904,
    col: 8,
    contents: [ {
      file: "include/macros.sibilant",
      token: ".",
      type: "dots",
      line: 904,
      col: 9,
      contents: [ {
        file: "include/macros.sibilant",
        token: "join",
        type: "literal",
        line: 904,
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
sibilant.macros.namespaces.core.parens = (function parens$(node) {
  /* parens include/macros.sibilant:906:0 */

  return [ "(", node, ")" ];
});
sibilant.macros.namespaces.core.var = (function var$(pairs) {
  /* var include/macros.sibilant:923:0 */

  var pairs = Array.prototype.slice.call(arguments, 0);

  return asStatement([ "var ", interleave(map(destructure(pairs), (function(pair) {
    /* include/macros.sibilant:927:25 */
  
    return [ pair[0], " = ", pair[1] ];
  })), ",\n    ") ]);
});
sibilant.macros.namespaces.core.assign = (function assign$(pairs) {
  /* assign include/macros.sibilant:946:0 */

  var pairs = Array.prototype.slice.call(arguments, 0);

  return interleave(map(destructure(pairs), (function(pair) {
    /* include/macros.sibilant:949:17 */
  
    return asStatement([ pair[0], " = ", pair[1] ]);
  })), "\n");
});
sibilant.macros.namespaces.core.default = (function default$(pairs) {
  /* default include/macros.sibilant:957:0 */

  var pairs = Array.prototype.slice.call(arguments, 0);

  return interleave("\n", bulkMap(pairs, (function(name, value) {
    /* include/macros.sibilant:958:40 */
  
    return {
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      line: 959,
      col: 35,
      contents: [ {
        file: "include/macros.sibilant",
        token: "assign",
        type: "literal",
        line: 959,
        col: 36,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, name, {
        file: "include/macros.sibilant",
        token: "(",
        type: "expression",
        line: 959,
        col: 49,
        contents: [ {
          file: "include/macros.sibilant",
          token: "ternary",
          type: "literal",
          line: 959,
          col: 50,
          contents: [],
          specials: 0,
          precedingIgnored: []
        }, {
          file: "include/macros.sibilant",
          token: "(",
          type: "expression",
          line: 959,
          col: 58,
          contents: [ {
            file: "include/macros.sibilant",
            token: "defined?",
            type: "literal",
            line: 959,
            col: 59,
            contents: [],
            specials: 0,
            precedingIgnored: []
          }, name ],
          precedingIgnored: [ {
            file: "include/macros.sibilant",
            token: " ",
            type: "whitespace",
            line: 959,
            col: 57,
            contents: []
          } ],
          specials: 0,
          end: undefined,
          closed: true,
          closingIgnored: []
        }, name, value ],
        precedingIgnored: [ {
          file: "include/macros.sibilant",
          token: " ",
          type: "whitespace",
          line: 959,
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
sibilant.macros.namespaces.core.importNamespace = (function importNamespace$(namespace) {
  /* import-namespace include/macros.sibilant:962:0 */

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
  /* namespace include/macros.sibilant:970:0 */

  sibilant.macros.namespaces.core.importNamespace(namespace);
  sibilant.macros.namespace = sibilant.macros.namespaces[outputFormatter(transpile(namespace))];
  return undefined;
});
sibilant.macros.namespaces.core["hasKey__QUERY"] = (function hasKey__QUERY$(object, key) {
  /* has-key? include/macros.sibilant:985:0 */

  return {
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    line: 986,
    col: 8,
    contents: [ {
      file: "include/macros.sibilant",
      token: ".",
      type: "dots",
      line: 986,
      col: 9,
      contents: [ {
        file: "include/macros.sibilant",
        token: "has-own-property",
        type: "literal",
        line: 986,
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
sibilant.macros.namespaces.core.get = (function get$(obj, keys) {
  /* get include/macros.sibilant:1007:0 */

  var keys = Array.prototype.slice.call(arguments, 1);

  return [ transpile(obj), map(keys, (function(key) {
    /* include/macros.sibilant:1009:19 */
  
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
  /* set include/macros.sibilant:1036:0 */

  var kvPairs = Array.prototype.slice.call(arguments, 1);

  return interleave("\n", bulkMap(kvPairs, (function(k, v) {
    /* include/macros.sibilant:1037:43 */
  
    return {
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      line: 1037,
      col: 52,
      contents: [ {
        file: "include/macros.sibilant",
        token: "assign",
        type: "literal",
        line: 1037,
        col: 53,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, {
        file: "include/macros.sibilant",
        token: "(",
        type: "expression",
        line: 1037,
        col: 60,
        contents: [ {
          file: "include/macros.sibilant",
          token: "get",
          type: "literal",
          line: 1037,
          col: 61,
          contents: [],
          specials: 0,
          precedingIgnored: []
        }, arr, k ],
        precedingIgnored: [ {
          file: "include/macros.sibilant",
          token: " ",
          type: "whitespace",
          line: 1037,
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
sibilant.macros.namespaces.core["lowerCase__QUERY"] = (function lowerCase__QUERY$(str) {
  /* lower-case? include/macros.sibilant:1042:0 */

  return {
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    line: 1043,
    col: 8,
    contents: [ {
      file: "include/macros.sibilant",
      token: "=",
      type: "otherChar",
      line: 1043,
      col: 9,
      contents: [],
      specials: 0,
      precedingIgnored: []
    }, {
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      line: 1043,
      col: 11,
      contents: [ {
        file: "include/macros.sibilant",
        token: ".",
        type: "dots",
        line: 1043,
        col: 12,
        contents: [ {
          file: "include/macros.sibilant",
          token: "to-lower-case",
          type: "literal",
          line: 1043,
          col: 13,
          contents: [],
          specials: 0,
          precedingIgnored: []
        } ],
        precedingIgnored: []
      }, str ],
      precedingIgnored: [ {
        file: "include/macros.sibilant",
        token: " ",
        type: "whitespace",
        line: 1043,
        col: 10,
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
  /* upper-case? include/macros.sibilant:1050:0 */

  return {
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    line: 1051,
    col: 8,
    contents: [ {
      file: "include/macros.sibilant",
      token: "=",
      type: "otherChar",
      line: 1051,
      col: 9,
      contents: [],
      specials: 0,
      precedingIgnored: []
    }, {
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      line: 1051,
      col: 11,
      contents: [ {
        file: "include/macros.sibilant",
        token: ".",
        type: "dots",
        line: 1051,
        col: 12,
        contents: [ {
          file: "include/macros.sibilant",
          token: "to-upper-case",
          type: "literal",
          line: 1051,
          col: 13,
          contents: [],
          specials: 0,
          precedingIgnored: []
        } ],
        precedingIgnored: []
      }, str ],
      precedingIgnored: [ {
        file: "include/macros.sibilant",
        token: " ",
        type: "whitespace",
        line: 1051,
        col: 10,
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
  /* source-mapping-url include/macros.sibilant:1058:0 */

  return [ "//# sourceMappingURL=", eval(outputFormatter(transpile(url))), "\n" ];
});
sibilant.macros.namespaces.core.sortBy = (function sortBy$(arrayOfObjects, attribute) {
  /* sort-by include/macros.sibilant:1067:0 */

  return {
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    line: 1068,
    col: 8,
    contents: [ {
      file: "include/macros.sibilant",
      token: ".",
      type: "dots",
      line: 1068,
      col: 9,
      contents: [ {
        file: "include/macros.sibilant",
        token: "sort",
        type: "literal",
        line: 1068,
        col: 10,
        contents: [],
        specials: 0,
        precedingIgnored: []
      } ],
      precedingIgnored: []
    }, arrayOfObjects, {
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      line: 1069,
      col: 15,
      contents: [ {
        file: "include/macros.sibilant",
        token: "#->",
        type: "otherChar",
        line: 1069,
        col: 16,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, {
        file: "include/macros.sibilant",
        token: "(",
        type: "expression",
        line: 1069,
        col: 20,
        contents: [ {
          file: "include/macros.sibilant",
          token: "get",
          type: "literal",
          line: 1069,
          col: 21,
          contents: [],
          specials: 0,
          precedingIgnored: []
        }, attribute ],
        precedingIgnored: [ {
          file: "include/macros.sibilant",
          token: " ",
          type: "whitespace",
          line: 1069,
          col: 19,
          contents: []
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      }, {
        file: "include/macros.sibilant",
        token: ".",
        type: "dots",
        line: 1070,
        col: 20,
        contents: [ {
          file: "include/macros.sibilant",
          token: "to-string",
          type: "literal",
          line: 1070,
          col: 21,
          contents: [],
          specials: 0,
          precedingIgnored: []
        } ],
        precedingIgnored: [ {
          file: "include/macros.sibilant",
          token: "\n",
          type: "newline",
          line: 1069,
          col: 36,
          contents: []
        }, {
          file: "include/macros.sibilant",
          token: "                    ",
          type: "whitespace",
          line: 1070,
          col: 0,
          contents: []
        } ]
      }, {
        file: "include/macros.sibilant",
        token: "(",
        type: "expression",
        line: 1071,
        col: 20,
        contents: [ {
          file: "include/macros.sibilant",
          token: ".",
          type: "dots",
          line: 1071,
          col: 21,
          contents: [ {
            file: "include/macros.sibilant",
            token: "locale-compare",
            type: "literal",
            line: 1071,
            col: 22,
            contents: [],
            specials: 0,
            precedingIgnored: []
          } ],
          precedingIgnored: []
        }, {
          file: "include/macros.sibilant",
          token: "(",
          type: "expression",
          line: 1071,
          col: 37,
          contents: [ {
            file: "include/macros.sibilant",
            token: "get",
            type: "literal",
            line: 1071,
            col: 38,
            contents: [],
            specials: 0,
            precedingIgnored: []
          }, {
            file: "include/macros.sibilant",
            token: "#1",
            type: "argPlaceholder",
            line: 1071,
            col: 42,
            contents: [],
            specials: 0,
            precedingIgnored: [ {
              file: "include/macros.sibilant",
              token: " ",
              type: "whitespace",
              line: 1071,
              col: 41,
              contents: []
            } ]
          }, attribute ],
          precedingIgnored: [ {
            file: "include/macros.sibilant",
            token: " ",
            type: "whitespace",
            line: 1071,
            col: 36,
            contents: []
          } ],
          specials: 0,
          end: undefined,
          closed: true,
          closingIgnored: []
        } ],
        precedingIgnored: [ {
          file: "include/macros.sibilant",
          token: "\n",
          type: "newline",
          line: 1070,
          col: 30,
          contents: []
        }, {
          file: "include/macros.sibilant",
          token: "                    ",
          type: "whitespace",
          line: 1071,
          col: 0,
          contents: []
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      } ],
      precedingIgnored: [ {
        file: "include/macros.sibilant",
        token: "\n",
        type: "newline",
        line: 1068,
        col: 32,
        contents: []
      }, {
        file: "include/macros.sibilant",
        token: "               ",
        type: "whitespace",
        line: 1069,
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
sibilant.macros.namespaces.core["require__BANG"] = (function require__BANG$(requires) {
  /* require! include/macros.sibilant:1074:0 */

  var requires = Array.prototype.slice.call(arguments, 0);

  return {
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    line: 1075,
    col: 8,
    contents: [ {
      file: "include/macros.sibilant",
      token: "var",
      type: "literal",
      line: 1075,
      col: 9,
      contents: [],
      specials: 0,
      precedingIgnored: []
    } ].concat(inject([], requires, (function(pairs, node) {
      /* include/macros.sibilant:1076:25 */
    
      return pairs.concat((function() {
        if ((0 === (pairs.length % 2) && node__QUERY(node, "tick", "string"))) {
          return [ mergeInto(clone(node), {
            token: outputFormatter(transpile(node)).slice(1, -1),
            contents: [],
            type: "literal"
          }), {
            file: "include/macros.sibilant",
            token: "(",
            type: "expression",
            line: 1086,
            col: 33,
            contents: [ {
              file: "include/macros.sibilant",
              token: "require",
              type: "literal",
              line: 1086,
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
            file: "include/macros.sibilant",
            token: "(",
            type: "expression",
            line: 1089,
            col: 36,
            contents: [ {
              file: "include/macros.sibilant",
              token: "require",
              type: "literal",
              line: 1089,
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
  /* export include/macros.sibilant:1094:0 */

  var localVars = Array.prototype.slice.call(arguments, 0);

  var pairs = localVars.reduce((function(acc, value) {
    /* include/macros.sibilant:1096:19 */
  
    return acc.concat([ sibilant.macros.namespaces.core.quote(value), value ]);
  }), []);
  return {
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    line: 1098,
    col: 8,
    contents: [ {
      file: "include/macros.sibilant",
      token: "set",
      type: "literal",
      line: 1098,
      col: 9,
      contents: [],
      specials: 0,
      precedingIgnored: []
    }, {
      file: "include/macros.sibilant",
      token: "exports",
      type: "literal",
      line: 1098,
      col: 13,
      contents: [],
      specials: 0,
      precedingIgnored: [ {
        file: "include/macros.sibilant",
        token: " ",
        type: "whitespace",
        line: 1098,
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
sibilant.macros.namespaces.core.return = (function return$(token) {
  /* return include/macros.sibilant:1101:0 */

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
  /* do include/macros.sibilant:1148:0 */

  var body = Array.prototype.slice.call(arguments, 0);

  return (function() {
    if (1 === body.length) {
      return sibilant.macros.namespaces.core.return(body[0]);
    } else if (body.length) {
      return [ interleave(map(body.slice(0, -1), (function() {
        /* include/macros.sibilant:1156:19 */
      
        return asStatement(arguments[0]);
      })), "\n"), "\n", sibilant.macros.namespaces.core.return(body.slice(-1)[0]) ];
    } else {
      return "";
    }
  }).call(this);
});
sibilant.macros.namespaces.core.emptyList = (function emptyList$() {
  /* empty-list include/macros.sibilant:1163:0 */

  return "null";
});
sibilant.macros.namespaces.core.def = (function def$(name, args, body) {
  /* def include/macros.sibilant:1174:0 */

  var body = Array.prototype.slice.call(arguments, 2);

  var node = this;
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
        file: "include/macros.sibilant",
        token: "(",
        type: "expression",
        line: 1182,
        col: 10,
        contents: [ {
          file: "include/macros.sibilant",
          token: "assign",
          type: "literal",
          line: 1182,
          col: 11,
          contents: [],
          specials: 0,
          precedingIgnored: []
        }, name, {
          file: "include/macros.sibilant",
          token: "(",
          type: "expression",
          line: 1182,
          col: 24,
          contents: [ {
            file: "include/macros.sibilant",
            token: "lambda",
            type: "literal",
            line: 1182,
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
            file: "include/macros.sibilant",
            token: " ",
            type: "whitespace",
            line: 1182,
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
        file: "include/macros.sibilant",
        token: "(",
        type: "expression",
        line: 1183,
        col: 10,
        contents: [ {
          file: "include/macros.sibilant",
          token: "var",
          type: "literal",
          line: 1183,
          col: 11,
          contents: [],
          specials: 0,
          precedingIgnored: []
        }, name, {
          file: "include/macros.sibilant",
          token: "(",
          type: "expression",
          line: 1183,
          col: 21,
          contents: [ {
            file: "include/macros.sibilant",
            token: "lambda",
            type: "literal",
            line: 1183,
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
            file: "include/macros.sibilant",
            token: " ",
            type: "whitespace",
            line: 1183,
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
sibilant.macros.namespaces.core.macro = (function macro$(name, args, body) {
  /* macro include/macros.sibilant:1195:0 */

  var body = Array.prototype.slice.call(arguments, 2);

  var nameTr = outputFormatter(transpile(name)),
      options = {
    name: name,
    args: args,
    node: this
  },
      js = outputFormatter(transpile({
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    line: 1198,
    col: 18,
    contents: [ {
      file: "include/macros.sibilant",
      token: "lambda",
      type: "literal",
      line: 1198,
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
  /* meta include/macros.sibilant:1224:0 */

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
  /* reverse include/macros.sibilant:1229:0 */

  var reversed = [];
  arr.forEach((function(item) {
    /* include/macros.sibilant:1231:5 */
  
    return reversed.unshift(item);
  }));
  return reversed;
});
sibilant.macros.namespaces.core.lambda = (function lambda$(argsOrOptions, body) {
  /* lambda include/macros.sibilant:1250:8 */

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
    /* include/macros.sibilant:1265:30 */
  
    return node__QUERY(arguments[0], "dots");
  })),
      destructuredArgs = map(args, (function(arg) {
    /* include/macros.sibilant:1267:40 */
  
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
        file: "include/macros.sibilant",
        token: "(",
        type: "expression",
        line: 1274,
        col: 71,
        contents: [ {
          file: "include/macros.sibilant",
          token: "Array.prototype.slice.call",
          type: "literal",
          line: 1274,
          col: 72,
          contents: [],
          specials: 0,
          precedingIgnored: []
        }, {
          file: "include/macros.sibilant",
          token: "arguments",
          type: "literal",
          line: 1274,
          col: 99,
          contents: [],
          specials: 0,
          precedingIgnored: [ {
            file: "include/macros.sibilant",
            token: " ",
            type: "whitespace",
            line: 1274,
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
    /* include/macros.sibilant:1275:68 */
  
    return arguments[0].destructuredPair;
  }))));
  node = detect([ node, argsOrOptions.name, args, body[0] ], (function(n) {
    /* include/macros.sibilant:1280:21 */
  
    return (node__QUERY(n) && n.file);
  }));
  return [ "(function", (function() {
    if (name) {
      return (" " + name);
    } else {
      return "";
    }
  }).call(this), "(", interleave(", ", map(destructuredArgs, (function() {
    /* include/macros.sibilant:1284:49 */
  
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
        file: "include/macros.sibilant",
        token: "(",
        type: "expression",
        line: 1290,
        col: 55,
        contents: [ {
          file: "include/macros.sibilant",
          token: "var",
          type: "literal",
          line: 1290,
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
sibilant.macros.namespaces.core.quotedHash = (function quotedHash$(pairs) {
  /* quoted-hash include/macros.sibilant:1296:0 */

  var pairs = Array.prototype.slice.call(arguments, 0);

  var cachedQuoteValue = sibilant.quoteHashKeys;
  sibilant.quoteHashKeys = true;
  var value = sibilant.macros.namespaces.core.hash.apply(this, pairs);
  sibilant.quoteHashKeys = cachedQuoteValue;
  return value;
});
sibilant.macros.namespaces.core.hash = (function hash$(pairs) {
  /* hash include/macros.sibilant:1311:7 */

  var pairs = Array.prototype.slice.call(arguments, 0);

  pairs = pairs.map((function(p, i) {
    /* include/macros.sibilant:1312:32 */
  
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
  var pairs_reduce$1 = pairs.reduce((function(o, item, i) {
    /* include/macros.sibilant:1325:26 */
  
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
      dynamicKeys = pairs_reduce$1.dynamicKeys,
      staticKeys = pairs_reduce$1.staticKeys,
      pairs_reduce$1 = undefined;
  var quoteKeys = sibilant.quoteHashKeys,
      pairStrings = bulkMap(staticKeys, (function(key, value) {
    /* include/macros.sibilant:1336:47 */
  
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
        file: "include/macros.sibilant",
        token: "(",
        type: "expression",
        line: 1346,
        col: 13,
        contents: [ {
          file: "include/macros.sibilant",
          token: "*scoped-without-source",
          type: "literal",
          line: 1346,
          col: 14,
          contents: [],
          specials: 0,
          precedingIgnored: []
        }, {
          file: "include/macros.sibilant",
          token: "(",
          type: "expression",
          line: 1347,
          col: 14,
          contents: [ {
            file: "include/macros.sibilant",
            token: "var",
            type: "literal",
            line: 1347,
            col: 15,
            contents: [],
            specials: 0,
            precedingIgnored: []
          }, symbol, {
            file: "include/macros.sibilant",
            token: "(",
            type: "expression",
            line: 1347,
            col: 27,
            contents: [ {
              file: "include/macros.sibilant",
              token: "hash",
              type: "literal",
              line: 1347,
              col: 28,
              contents: [],
              specials: 0,
              precedingIgnored: []
            } ].concat(staticKeys),
            precedingIgnored: [ {
              file: "include/macros.sibilant",
              token: " ",
              type: "whitespace",
              line: 1347,
              col: 26,
              contents: []
            } ],
            specials: 0,
            end: undefined,
            closed: true,
            closingIgnored: []
          } ],
          precedingIgnored: [ {
            file: "include/macros.sibilant",
            token: "\n",
            type: "newline",
            line: 1346,
            col: 36,
            contents: []
          }, {
            file: "include/macros.sibilant",
            token: "              ",
            type: "whitespace",
            line: 1347,
            col: 0,
            contents: []
          } ],
          specials: 0,
          end: undefined,
          closed: true,
          closingIgnored: []
        }, {
          file: "include/macros.sibilant",
          token: "(",
          type: "expression",
          line: 1348,
          col: 14,
          contents: [ {
            file: "include/macros.sibilant",
            token: "set",
            type: "literal",
            line: 1348,
            col: 15,
            contents: [],
            specials: 0,
            precedingIgnored: []
          }, symbol ].concat(dynamicKeys),
          precedingIgnored: [ {
            file: "include/macros.sibilant",
            token: "\n",
            type: "newline",
            line: 1347,
            col: 50,
            contents: []
          }, {
            file: "include/macros.sibilant",
            token: "              ",
            type: "whitespace",
            line: 1348,
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
sibilant.macros.namespaces.core.quote = (function quote$(content) {
  /* quote include/macros.sibilant:1355:0 */

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
  /* debug include/macros.sibilant:1378:0 */

  sibilant.debug = eval(outputFormatter(transpile(val)));
  return null;
});
sibilant.macros.namespaces.core.list = (function list$(args) {
  /* list include/macros.sibilant:1389:7 */

  var args = Array.prototype.slice.call(arguments, 0);

  var argSegments = [];
  return (function() {
    if (0 === args.length) {
      return "[]";
    } else {
      var simpleList = (function simpleList$(args) {
        /* simple-list include/macros.sibilant:1393:12 */
      
        return [ "[ ", interleave(", ", map(args, (function(arg) {
          /* include/macros.sibilant:1394:50 */
        
          return arg.transpiled;
        }))), " ]" ];
      });
      args.forEach((function(arg) {
        /* include/macros.sibilant:1396:27 */
      
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
        /* include/macros.sibilant:1402:38 */
      
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
  /* call include/macros.sibilant:1419:0 */

  var args = Array.prototype.slice.call(arguments, 1);

  return (function() {
    if (any__QUERY(args, (function() {
      /* include/macros.sibilant:1420:20 */
    
      return node__QUERY(arguments[0], "dots");
    }))) {
      return macros.apply(fnName, macros.list.apply(this, args));
    } else {
      return [ transpile(fnName), "(", interleave(", ", map(args, transpile)), ")" ];
    }
  }).call(this);
});
sibilant.macros.namespaces.core.dots = (function dots$(contents) {
  /* dots include/macros.sibilant:1425:0 */

  var contents = Array.prototype.slice.call(arguments, 0);

  return transpile(contents);
});
sibilant.macros.namespaces.core.include = (function include$(files) {
  /* include include/macros.sibilant:1440:0 */

  var files = Array.prototype.slice.call(arguments, 0);

  return interleave(files.map((function(file) {
    /* include/macros.sibilant:1442:17 */
  
    return sibilant.withDefaultSearchPath((function() {
      /* include/macros.sibilant:1444:20 */
    
      return sibilant.include(eval(outputFormatter(transpile(file))));
    }));
  })), "\n");
});
sibilant.macros.namespaces.core.docs = (function docs$(options) {
  /* docs include/macros.sibilant:1452:0 */

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
    /* include/macros.sibilant:1463:23 */
  
    return optionsHash[outputFormatter(transpile(key))] = value;
  }));
  [ "examples", "references" ].forEach((function(listAttribute) {
    /* include/macros.sibilant:1466:5 */
  
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
sibilant.macros.namespaces.core.tap = (function tap$(thing, body) {
  /* tap include/macros.sibilant:1496:0 */

  var body = Array.prototype.slice.call(arguments, 1);

  return {
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    line: 1497,
    col: 8,
    contents: [ {
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      line: 1497,
      col: 9,
      contents: [ {
        file: "include/macros.sibilant",
        token: "#>",
        type: "otherChar",
        line: 1497,
        col: 10,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, {
        file: "include/macros.sibilant",
        token: "(",
        type: "expression",
        line: 1497,
        col: 13,
        contents: [ {
          file: "include/macros.sibilant",
          token: "|>",
          type: "otherChar",
          line: 1497,
          col: 14,
          contents: [],
          specials: 0,
          precedingIgnored: []
        }, {
          file: "include/macros.sibilant",
          token: "#0",
          type: "argPlaceholder",
          line: 1497,
          col: 17,
          contents: [],
          specials: 0,
          precedingIgnored: [ {
            file: "include/macros.sibilant",
            token: " ",
            type: "whitespace",
            line: 1497,
            col: 16,
            contents: []
          } ]
        } ].concat(body),
        precedingIgnored: [ {
          file: "include/macros.sibilant",
          token: " ",
          type: "whitespace",
          line: 1497,
          col: 12,
          contents: []
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      }, {
        file: "include/macros.sibilant",
        token: "#0",
        type: "argPlaceholder",
        line: 1497,
        col: 30,
        contents: [],
        specials: 0,
        precedingIgnored: [ {
          file: "include/macros.sibilant",
          token: " ",
          type: "whitespace",
          line: 1497,
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
var debug__BANG = (function debug__BANG$(level, message) {
  /* debug! src/helpers.sibilant:1:0 */

  var message = Array.prototype.slice.call(arguments, 1);

  var debug = sibilant.debug;
  return (function() {
    if ((debug && level <= debug)) {
      console.log({
        level: level,
        debug: debug
      });
      return message.forEach((function() {
        /* src/helpers.sibilant:5:29 */
      
        return console.log(arguments[0]);
      }));
    }
  }).call(this);
});
var tap = (function tap$(item, fn) {
  /* tap src/helpers.sibilant:7:0 */

  fn(item);
  return item;
});
var recurseIndent = (function recurseIndent$(arg) {
  /* recurse-indent src/helpers.sibilant:11:0 */

  return (function() {
    if (node__QUERY(arg)) {
      return mergeInto(arg, { contents: recurseIndent(flatCompact(arg.contents)) });
    } else if (((arg) && typeof (arg) === "object" && (arg).constructor.name === "Array")) {
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
  /* indent src/helpers.sibilant:26:0 */

  var args = Array.prototype.slice.call(arguments, 0);

  return [ "\n  ", recurseIndent(map(args, transpile)), "\n" ];
});
var escapeRegex = (function escapeRegex$(string) {
  /* escape-regex src/helpers.sibilant:29:0 */

  return string.replace((new RegExp("[\\-\\[\\]\\/\\{\\}\\(\\)\\*\\+\\?\\.\\\\\^\\$\\|]", "g")), "\\$&");
});
var qescape = (function qescape$(content) {
  /* qescape src/helpers.sibilant:32:0 */

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
  /* map-node src/helpers.sibilant:41:0 */

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
        /* src/helpers.sibilant:50:32 */
      
        return mapNode(arguments[0], fn);
      }));
    } else {
      return fn(node);
    }
  }).call(this);
});
var eachNode = (function eachNode$(node, fn) {
  /* each-node src/helpers.sibilant:53:0 */

  return (function() {
    if (node__QUERY(node)) {
      return (function() {
        if (fn(node)) {
          return eachNode(node.contents, fn);
        }
      }).call(this);
    } else if (((node) && typeof (node) === "object" && (node).constructor.name === "Array")) {
      return node.forEach((function(c) {
        /* src/helpers.sibilant:55:22 */
      
        return eachNode(c, fn);
      }));
    } else {
      return fn(node);
    }
  }).call(this);
});
var statement__QUERY = (function statement__QUERY$(transpiled) {
  /* statement? src/helpers.sibilant:58:0 */

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
  /* as-statement src/helpers.sibilant:64:0 */

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
  /* unquote? src/helpers.sibilant:71:0 */

  return node__QUERY(node, "at");
});
var findUnquotes = (function findUnquotes$(node) {
  /* find-unquotes src/helpers.sibilant:73:0 */

  var unquotes = {  };
  eachNode(node, (function(n) {
    /* src/helpers.sibilant:75:21 */
  
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
  /* splice-dots src/helpers.sibilant:81:0 */

  (function() {
    if ((node && ((node.contents) && typeof (node.contents) === "object" && (node.contents).constructor.name === "Array"))) {
      var contents = [];
      node.contents.forEach((function(content) {
        /* src/helpers.sibilant:84:11 */
      
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
  /* alternating-keys-and-values src/helpers.sibilant:96:0 */

  return flatten(map(Object.keys(hash), (function(key) {
    /* src/helpers.sibilant:98:14 */
  
    return [ key, hash[key] ];
  })));
});
var mapNodeForQuoteExpansion = (function mapNodeForQuoteExpansion$(node, expansions) {
  /* map-node-for-quote-expansion src/helpers.sibilant:101:0 */

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
        /* src/helpers.sibilant:112:19 */
      
        return mapNodeForQuoteExpansion(arguments[0], expansions);
      }));
    } else {
      return node;
    }
  }).call(this);
});
var replace__BANG = (function replace__BANG$(content) {
  /* replace! src/helpers.sibilant:116:0 */

  return (function() {
    if ((node__QUERY(content, "dots") && 3 === content.token.length && node__QUERY(content.contents[0], "at"))) {
      return mergeInto(clone(content), { contents: [ transpile(content.contents[0]) ] });
    } else if (node__QUERY(content, "at")) {
      return transpile(content.contents[0]);
    } else if (node__QUERY(content, "tick")) {
      return JSON.stringify(content);
    } else if (("object" === typeof content && content !== null && content.constructor.name !== "Array")) {
      return sibilant.macros.namespaces.core.hash.apply(this, Object.keys(content).reduce((function() {
        /* src/helpers.sibilant:133:21 */
      
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
var node__QUERY = (function node__QUERY$(thing, type, type2, type3, type4, testArg) {
  /* node? src/helpers.sibilant:148:0 */

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
  /* empty-node? src/helpers.sibilant:163:0 */

  return (function() {
    if ((null === item || typeof item === "undefined" || false === item)) {
      return true;
    } else if (typeof item === "string") {
      return item.match((new RegExp("^\\s*$", undefined)));
    } else if (((item) && typeof (item) === "object" && (item).constructor.name === "Array")) {
      return all__QUERY(item, emptyNode__QUERY);
    } else if (node__QUERY(item)) {
      return emptyNode__QUERY(item.contents);
    } else {
      return false;
    }
  }).call(this);
});
var compactNode = (function compactNode$(item) {
  /* compact-node src/helpers.sibilant:172:0 */

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
  /* generate-symbol src/helpers.sibilant:182:0 */

  var state = sibilant.state;
  clue = (typeof clue !== "undefined") ? clue : "temp";
  state.symbolCounts = (typeof state.symbolCounts !== "undefined") ? state.symbolCounts : {  };
  var count = ((state.symbolCounts[clue] || 0) + 1);
  state.symbolCounts[clue] = count;
  return [ ("" + clue + "$" + count) ];
});
var makeSymbolClue = (function makeSymbolClue$(node) {
  /* make-symbol-clue src/helpers.sibilant:193:0 */

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
  /* destructure src/helpers.sibilant:204:0 */

  var destructured = [];
  bulkMap(pairs, (function(lhs, rhs) {
    /* src/helpers.sibilant:206:21 */
  
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
          /* src/helpers.sibilant:216:32 */
        
          return destructured.push([ transpile(item), {
            file: "src/helpers.sibilant",
            token: "(",
            type: "expression",
            line: 217,
            col: 76,
            contents: [ {
              file: "src/helpers.sibilant",
              token: "get",
              type: "literal",
              line: 217,
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
          /* src/helpers.sibilant:229:32 */
        
          var trItem = transpile(item);
          return destructured.push([ trItem, {
            file: "src/helpers.sibilant",
            token: "(",
            type: "expression",
            line: 231,
            col: 67,
            contents: [ {
              file: "src/helpers.sibilant",
              token: "get",
              type: "literal",
              line: 231,
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
      if$1 = (function() {
    if (token.match((new RegExp("\/", undefined)))) {
      return token.split("/");
    } else {
      return [ sibilant.macros.searchPath[0], token ];
    }
  }).call(this),
      namespace = if$1[0],
      macro = if$1[1],
      if$1 = undefined;
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
  /* transpile.bracket src/transpiler.sibilant:126:0 */

  return sibilant.macros.namespaces.core.list.apply(this, node.contents);
});
transpile.brace = (function transpile$brace$(node) {
  /* transpile.brace src/transpiler.sibilant:129:0 */

  return sibilant.macros.namespaces.core.hash.apply(this, node.contents);
});
transpile.literal = (function transpile$literal$(node) {
  /* transpile.literal src/transpiler.sibilant:131:0 */

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
  return inject(string, string.match((new RegExp("-(.)", "g"))), (function(returnString, match) {
    /* src/transpiler.sibilant:140:13 */
  
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
  /* transpile.string src/transpiler.sibilant:147:0 */

  return node.token.split("\n").join("\\n\" +\n\"");
});
transpile.comment = (function transpile$comment$(node) {
  /* transpile.comment src/transpiler.sibilant:152:0 */

  return null;
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