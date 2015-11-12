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
(sibilant)["dir"] = process.cwd();
sibilant.transpileFile = (function sibilant$transpileFile$(fileName) {
  /* sibilant.transpile-file /Users/jbr/code/sibilant/src/node.sibilant:11:0 */

  return withDirAndFile(path.dirname(fileName), fileName, (function() {
    /* /Users/jbr/code/sibilant/src/node.sibilant:13:24 */
  
    var source = sibilant.stripShebang(fs.readFileSync(fileName, "utf8"));
    (sibilant.sourceCache)[fileName] = source;
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
(require.extensions)[".sibilant"] = (function(module, filename) {
  /* /Users/jbr/code/sibilant/src/node.sibilant:30:5 */

  var content = sibilant.sibilizeFile(filename);
  return module._compile(content, filename);
});
(require.extensions)[".son"] = (function(module, filename) {
  /* /Users/jbr/code/sibilant/src/node.sibilant:35:5 */

  var content = sibilant.sibilizeJson(filename);
  return (module)["exports"] = JSON.parse(content);
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
      (sibilant)["loading__QUERY"] = true;
      sibilant.loadMacros();
      delete sibilant.loading__QUERY;
      return (sibilant)["loaded__QUERY"] = true;
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

  return inspect__BANG(args).forEach((function(o) {
    /* /Users/jbr/code/sibilant/src/colors.sibilant:2:39 */
  
    return console.log(o);
  }));
});
var inspect__BANG = (function inspect__BANG$(args) {
  /* inspect! /Users/jbr/code/sibilant/src/colors.sibilant:4:0 */

  var args = Array.prototype.slice.call(arguments, 0);

  return args.map((function(arg) {
    /* /Users/jbr/code/sibilant/src/colors.sibilant:5:15 */
  
    return util.inspect(arg, {
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
    if ((typeof color === 'undefined')) {
      return color = true;
    }
  })();
  return (function() {
    if (node__QUERY(node)) {
      var prettyPrinter = ((sibilant.prettyPrint)[node.type] || sibilant.prettyPrint.default);
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
      return util.inspect(node);
    }
  })();
});
sibilant.prettyPrint.default = (function sibilant$prettyPrint$default$(node, color) {
  /* sibilant.pretty-print.default /Users/jbr/code/sibilant/src/pretty-printer.sibilant:19:0 */

  return sibilant.prettyPrint.colorize(node, color, ((function() {
    if ((node.modifiers && node.modifiers.length)) {
      return (map(node.modifiers, sibilant.prettyPrint)).join("");
    } else {
      return "";
    }
  })() + node.token + (function() {
    if ((node.contents && node.contents.length)) {
      return (map(node.contents, sibilant.prettyPrint)).join(" ");
    } else {
      return "";
    }
  })() + ((acceptablePairs)[node.token] || "")));
});
sibilant.prettyPrint.root = (function sibilant$prettyPrint$root$(node, color) {
  /* sibilant.pretty-print.root /Users/jbr/code/sibilant/src/pretty-printer.sibilant:29:0 */

  return (map(node.contents, sibilant.prettyPrint)).join("\n");
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
sibilant.prettyPrint.colorize = (function sibilant$prettyPrint$colorize$(node, color, string) {
  /* sibilant.pretty-print.colorize /Users/jbr/code/sibilant/src/pretty-printer.sibilant:41:0 */

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
    } else if ((typeof(node) === "string" || (typeof node === 'number'))) {
      return node;
    } else if ((!((typeof node !== 'undefined') && (node !== null)))) {
      return "";
    } else if (node__QUERY(node)) {
      console.log("WE SHOULD NOT BE HERE");
      return outputFormatter(transpile(node));
    }
  })();
});
(sibilant)["outputFormatter"] = outputFormatter;
var sourceNode = (require("source-map"))["SourceNode"];
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
    } else if ((typeof(node) === "string" || (typeof node === 'number'))) {
      return node.toString();
    }
  })();
});
var sourcemapper = (function sourcemapper$(node) {
  /* sourcemapper /Users/jbr/code/sibilant/src/sourcemap.sibilant:17:0 */

  var sourceNodes = sourceMap(transpile(node)),
      map = (sourceNodes.toStringWithSourceMap())["map"];
  Object.keys(sibilant.sourceCache).forEach((function(key) {
    /* /Users/jbr/code/sibilant/src/sourcemap.sibilant:21:5 */
  
    return map.setSourceContent(key, (sibilant.sourceCache)[key]);
  }));
  return map.toString();
});
var bulkMap = (function bulkMap$(arr, fn) {
  /* bulk-map /Users/jbr/code/sibilant/include/functional.sibilant:1:0 */

  var index = 0,
      groupSize = fn.length,
      retArr = [];
  (function() {
    var __returnValue__ = undefined;
    while ((index < arr.length)) {
      __returnValue__ = (function() {
        /* /Users/jbr/code/sibilant/include/functional.sibilant:6:2 */
      
        retArr.push(fn.apply(this, arr.slice(index, (index + groupSize))));
        return index += groupSize;
      })();
    };
    return __returnValue__;
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
    var __returnValue__ = undefined;
    while ((!((items.length === index) || returnItem))) {
      __returnValue__ = (function() {
        /* /Users/jbr/code/sibilant/include/functional.sibilant:38:2 */
      
        (function() {
          if (fn((items)[index], index)) {
            return returnItem = (items)[index];
          }
        })();
        return ((index)++);
      })();
    };
    return __returnValue__;
  })();
  return returnItem;
});
var all__QUERY = (function all__QUERY$(items, fn) {
  /* all? /Users/jbr/code/sibilant/include/functional.sibilant:45:0 */

  return (typeof detect(items, (function(item, index) {
    /* /Users/jbr/code/sibilant/include/functional.sibilant:46:31 */
  
    return (!fn(item, index));
  })) === 'undefined');
});
var none__QUERY = (function none__QUERY$(items, fn) {
  /* none? /Users/jbr/code/sibilant/include/functional.sibilant:48:0 */

  return (typeof detect(items, fn) === 'undefined');
});
var any__QUERY = (function any__QUERY$(items, fn) {
  /* any? /Users/jbr/code/sibilant/include/functional.sibilant:51:0 */

  return (typeof detect(items, fn) !== 'undefined');
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
  
    return ((null !== item) && (false !== item) && (typeof item !== 'undefined'));
  }));
});
var interleave = (function interleave$(glue, arr) {
  /* interleave /Users/jbr/code/sibilant/include/functional.sibilant:65:0 */

  return inject([ (arr)[0] ], arr.slice(1), (function(collector, item, index) {
    /* /Users/jbr/code/sibilant/include/functional.sibilant:67:13 */
  
    collector.push((function() {
      if (((glue) && typeof (glue) === "object" && (glue).constructor.name === "Array")) {
        return (glue)[index];
      } else {
        return glue;
      }
    })());
    collector.push(item);
    return collector;
  }));
});
var flatten = (function flatten$(items) {
  /* flatten /Users/jbr/code/sibilant/include/functional.sibilant:72:0 */

  var items = Array.prototype.slice.call(arguments, 0);

  return inject([], items, (function(collector, item) {
    /* /Users/jbr/code/sibilant/include/functional.sibilant:74:10 */
  
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
  /* recurse-map /Users/jbr/code/sibilant/include/functional.sibilant:81:0 */

  return (function() {
    if (((item) && typeof (item) === "object" && (item).constructor.name === "Array")) {
      return map(item, (function(subitem) {
        /* /Users/jbr/code/sibilant/include/functional.sibilant:82:32 */
      
        return recurseMap(subitem, fn);
      }));
    } else {
      return fn(item);
    }
  })();
});
var pluck = (function pluck$(items, attribute) {
  /* pluck /Users/jbr/code/sibilant/include/functional.sibilant:85:0 */

  return map(items, (function(item) {
    /* /Users/jbr/code/sibilant/include/functional.sibilant:86:16 */
  
    return (item)[attribute];
  }));
});
var parser = {  };
(sibilant)["parser"] = parser;
(parser)["tokens"] = {
  "regex": "(\\/(\\\\\\\/|[^\\/\\n])+\\/[glim]*)",
  "comment": "(;.*)",
  "string": "(\"(([^\"]|(\\\\\"))*[^\\\\])?\")",
  "number": "(-?[0-9][0-9.,]*)",
  "literal": "(-?[*.$a-zA-Z_][*.a-zA-Z0-9-_]*(\\?|!)?)",
  "special": "([&'])",
  "at": "@",
  "tick": "'",
  "hat": "(\\^)",
  "dots": "(\\.+)",
  "otherChar": "([#><=!\\+\\/\\*-]+)",
  "openExpression": "(\\(|\\{|\\[)",
  "closeExpression": "(\\)|\\}|\\])",
  "newline": "\\n",
  "whitespace": "\\s",
  "ignored": "."
};
(parser)["tokenPrecedence"] = [ "regex", "comment", "string", "number", "dots", "tick", "hat", "at", "special", "literal", "otherChar", "openExpression", "closeExpression", "newline", "whitespace", "ignored" ];
(parser)["orderedRegexes"] = parser.tokenPrecedence.map((function(x) {
  /* /Users/jbr/code/sibilant/src/parser.sibilant:41:23 */

  var r = (new RegExp(("^" + (parser.tokens)[x]), undefined));
  (r)["name"] = x;
  return r;
}));
var orderedRegexes = parser.orderedRegexes;
parser.parse = (function parser$parse$(string, context) {
  /* parser.parse /Users/jbr/code/sibilant/src/parser.sibilant:50:0 */

  var context = (function() {
    if (context) {
      return context;
    } else {
      return {
        position: 0,
        stack: [],
        line: 1,
        lastNewline: 0,
        col: 0
      };
    }
  })();
  var match = true,
      regexName = null,
      remainingInput = string;
  (function() {
    var __returnValue__ = undefined;
    while (match) {
      __returnValue__ = (function() {
        /* /Users/jbr/code/sibilant/src/parser.sibilant:60:5 */
      
        detect(orderedRegexes, (function(r) {
          /* /Users/jbr/code/sibilant/src/parser.sibilant:62:20 */
        
          match = r.exec(remainingInput);
          regexName = r.name;
          return match;
        }));
        return (function() {
          if (((typeof match !== 'undefined') && (match !== null))) {
            var matchString = (match)[0],
                length = (matchString)["length"];
            context.stack.push({
              contents: [],
              modifiers: [],
              dir: sibilant.dir,
              file: sibilant.file,
              token: matchString,
              type: regexName,
              start: context.position,
              line: context.line,
              col: context.col,
              length: length
            });
            (function() {
              if (("newline" === regexName)) {
                ((context.line)++);
                (context)["col"] = 0;
                return (context)["lastNewline"] = context.position;
              } else if ((("string" === regexName) && (-1 !== matchString.indexOf("\n")))) {
                var stringNewlineCount = ((matchString.split("\n"))["length"] - 1);
                context.line += stringNewlineCount;
                return (context)["col"] = (length - matchString.lastIndexOf("\n"));
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
    return __returnValue__;
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
    modifiers: [],
    file: sibilant.file,
    col: 0,
    line: 1
  };
  inject({
    parseStack: [ output ],
    output: output,
    input: input
  }, input, (function(context, token, index) {
    /* /Users/jbr/code/sibilant/src/restructurer.sibilant:10:13 */
  
    var restructurer = ((restructurers)[token.type] || restructurers.default);
    return restructurer(token, context, index);
  }));
  return output;
});
(sibilant)["restructure"] = restructure;
restructurers.openExpression = (function restructurers$openExpression$(token, context, index) {
  /* restructurers.open-expression /Users/jbr/code/sibilant/src/restructurer.sibilant:17:0 */

  var first = (context.parseStack)[0];
  (token)["contents"] = [];
  (token)["type"] = (bracketTypes)[token.token];
  (token)["parent"] = first;
  first.contents.push(token);
  context.parseStack.unshift(token);
  return context;
});
var codeContext = (function codeContext$(node, context) {
  /* code-context /Users/jbr/code/sibilant/src/restructurer.sibilant:26:0 */

  var context = (context || 5);
  return (function() {
    if (node.input) {
      var n = (node.col - 1),
          pointer = "",
          lines = node.input.split("\n")
        .slice((node.line - context), (node.line + context));
      (function() {
        var __returnValue__ = undefined;
        while (((n)--)) {
          __returnValue__ = (function() {
            /* /Users/jbr/code/sibilant/src/restructurer.sibilant:39:10 */
          
            return pointer = pointer.concat("-");
          })();
        };
        return __returnValue__;
      })();
      return (lines.slice(0, context).concat([ (pointer + "^") ])
        .concat(lines.slice(context, (2 * context)))).join("\n");
    } else {
      return sibilant.prettyPrint(node);
    }
  })();
});
restructurers.closeExpression = (function restructurers$closeExpression$(node, context, index) {
  /* restructurers.close-expression /Users/jbr/code/sibilant/src/restructurer.sibilant:46:0 */

  var first = (context.parseStack)[0];
  (function() {
    if (((acceptablePairs)[first.token] !== node.token)) {
      throw new Error (("trying to close " + yellow(sibilant.prettyPrint(first)) + "\n   on " + first.file + ":" + first.line + ":" + first.col + "\n   with " + sibilant.prettyPrint(node) + "\n   on " + node.file + ":" + node.line + ":" + node.col + "\n"))
    }
  })();
  (first)["end"] = node.end;
  context.parseStack.shift();
  (function() {
    if ((context.parseStack.length === 0)) {
      throw new Error (("unbalanced parens:\n" + inspect(parseStack)))
    }
  })();
  return context;
});
restructurers.hat = (function restructurers$hat$(node, context, index) {
  /* restructurers.hat /Users/jbr/code/sibilant/src/restructurer.sibilant:62:0 */

  var nextNode = (context.input)[(1 + index)];
  nextNode.modifiers.push(node);
  return context;
});
restructurers.dots = (function restructurers$dots$(node, context, index) {
  /* restructurers.dots /Users/jbr/code/sibilant/src/restructurer.sibilant:67:0 */

  var nextNode = (context.input)[(1 + index)];
  nextNode.modifiers.push(node);
  return context;
});
restructurers.tick = (function restructurers$tick$(node, context, index) {
  /* restructurers.tick /Users/jbr/code/sibilant/src/restructurer.sibilant:72:0 */

  var nextNode = (context.input)[(1 + index)];
  nextNode.modifiers.push(node);
  return context;
});
restructurers.at = (function restructurers$at$(node, context, index) {
  /* restructurers.at /Users/jbr/code/sibilant/src/restructurer.sibilant:76:0 */

  var nextNode = (context.input)[(1 + index)];
  nextNode.modifiers.push(node);
  return context;
});
restructurers.whitespace = (function restructurers$whitespace$(token, context, index) {
  /* restructurers.whitespace /Users/jbr/code/sibilant/src/restructurer.sibilant:81:0 */

  return context;
});
restructurers.newline = (function restructurers$newline$(token, context, index) {
  /* restructurers.newline /Users/jbr/code/sibilant/src/restructurer.sibilant:82:0 */

  return context;
});
restructurers.ignored = (function restructurers$ignored$(token, context, index) {
  /* restructurers.ignored /Users/jbr/code/sibilant/src/restructurer.sibilant:83:0 */

  return context;
});
restructurers.default = (function restructurers$default$(token, context, index) {
  /* restructurers.default /Users/jbr/code/sibilant/src/restructurer.sibilant:85:0 */

  ((context.parseStack)[0])["contents"].push(token);
  return context;
});
var macros = {  };
(sibilant)["macros"] = macros;
var recurseIndent = (function recurseIndent$(args) {
  /* recurse-indent /Users/jbr/code/sibilant/src/macros.sibilant:4:0 */

  var args = Array.prototype.slice.call(arguments, 0);

  return map(args, (function(arg) {
    /* /Users/jbr/code/sibilant/src/macros.sibilant:6:10 */
  
    return (function() {
      if (node__QUERY(arg)) {
        (arg)["contents"] = recurseIndent.apply(this, compact(flatten(arg.contents)));
        return arg;
      } else if (((arg) && typeof (arg) === "object" && (arg).constructor.name === "Array")) {
        return recurseIndent.apply(this, arg);
      } else if ((typeof arg === 'number')) {
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
  /* indent /Users/jbr/code/sibilant/src/macros.sibilant:17:0 */

  var args = Array.prototype.slice.call(arguments, 0);

  return [ "\n  ", recurseIndent(args), "\n" ];
});
var escapeRegex = (function escapeRegex$(string) {
  /* escape-regex /Users/jbr/code/sibilant/src/macros.sibilant:21:0 */

  return string.replace((new RegExp("[\\-\\[\\]\\/\\{\\}\\(\\)\\*\\+\\?\\.\\\\\^\\$\\|]", "g")), "\\$&");
});
macros.return = (function macros$return$(token) {
  /* ^return /Users/jbr/code/sibilant/src/macros.sibilant:24:0 */

  (function() {
    if (sibilant.debug) {
      return console.log("returning ", prettify(token));
    }
  })();
  var defaultReturn = asStatement([ "return ", transpile(token) ]);
  return (function() {
    if ((token && token.contents && token.contents.length && ((((token.contents)[0])["modifiers"]).length === 0))) {
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
macros.list = (function macros$list$(args) {
  /* ^list /Users/jbr/code/sibilant/src/macros.sibilant:62:0 */

  var args = Array.prototype.slice.call(arguments, 0);

  return [ "[ ", interleave(", ", map(args, transpile)), " ]" ];
});
var statement__QUERY = (function statement__QUERY$(transpiled) {
  /* statement? /Users/jbr/code/sibilant/src/macros.sibilant:64:0 */

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
  /* as-statement /Users/jbr/code/sibilant/src/macros.sibilant:70:0 */

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
  /* ^do /Users/jbr/code/sibilant/src/macros.sibilant:77:0 */

  var body = Array.prototype.slice.call(arguments, 0);

  return (function() {
    if ((1 === body.length)) {
      return macros.return((body)[0]);
    } else if (body.length) {
      return [ interleave("\n", map(body.slice(0, -1), (function(node) {
        /* /Users/jbr/code/sibilant/src/macros.sibilant:79:63 */
      
        return asStatement(node);
      }))), "\n", macros.return((body.slice(-1))[0]) ];
    } else {
      return "";
    }
  })();
});
macros.emptyList = (function macros$emptyList$() {
  /* ^empty-list /Users/jbr/code/sibilant/src/macros.sibilant:84:0 */

  return "null";
});
macros.call = (function macros$call$(fnName, args) {
  /* ^call /Users/jbr/code/sibilant/src/macros.sibilant:86:0 */

  var args = Array.prototype.slice.call(arguments, 1);

  return [ transpile(fnName), "(", interleave(", ", map(args, transpile)), ")" ];
});
macros.def = (function macros$def$(fnName, args, body) {
  /* ^def /Users/jbr/code/sibilant/src/macros.sibilant:90:0 */

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
  /* ^macro /Users/jbr/code/sibilant/src/macros.sibilant:98:0 */

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

  var args = ((argsOrOptions)["args"] || argsOrOptions),
      body = ((argsOrOptions)["body"] || body),
      args = (args.contents || args),
      name = (function() {
    if (argsOrOptions.name) {
      return outputFormatter(transpile(argsOrOptions.name)).replace((new RegExp("\\W+", "g")), "$")
        .concat("$");
    }
  })(),
      rest = detect(args, (function(arg) {
    /* /Users/jbr/code/sibilant/src/macros.sibilant:130:23 */
  
    return (function() {
      if (arg.modifiers) {
        var mod = (arg.modifiers)[0];
        return (mod && ("..." === mod.token));
      }
    })();
  }));
  var thisNode = this,
      node = detect([ thisNode, argsOrOptions.node, argsOrOptions.name, args, (body)[0] ], (function(n) {
    /* /Users/jbr/code/sibilant/src/macros.sibilant:138:16 */
  
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
    if (((typeof rest !== 'undefined') && (rest !== null))) {
      return indent(asStatement([ "var ", transpile(rest), " = Array.prototype.slice.call(arguments, ", (args.length - 1), ")" ]));
    }
  })(), indent(macros.do.apply(this, body)), "})" ];
});
(macros)["#"] = macros.lambda;
macros.hash = (function macros$hash$(pairs) {
  /* ^hash /Users/jbr/code/sibilant/src/macros.sibilant:156:0 */

  var pairs = Array.prototype.slice.call(arguments, 0);

  (function() {
    if ((0 !== (pairs.length % 2))) {
      return error(("odd number of key-value pairs in hash: " + inspect(pairs)));
    }
  })();
  var quoteKeys = macros.hash.quoteKeys,
      pairStrings = bulkMap(pairs, (function(key, value) {
    /* /Users/jbr/code/sibilant/src/macros.sibilant:162:39 */
  
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
  /* qescape /Users/jbr/code/sibilant/src/macros.sibilant:173:0 */

  return (function() {
    if ((!((typeof content !== 'undefined') && (content !== null)))) {
      return "";
    } else if (typeof(content) === "string") {
      return content.replace((new RegExp("\"", "g")), "\\\"");
    } else if ((!(typeof content.unquote !== 'undefined'))) {
      (content)["contents"] = qescape(content.contents);
      return content;
    } else if (((content) && typeof (content) === "object" && (content).constructor.name === "Array")) {
      return map(content, qescape);
    } else {
      return content;
    }
  })();
});
macros.quote = (function macros$quote$(content) {
  /* ^quote /Users/jbr/code/sibilant/src/macros.sibilant:187:0 */

  return (function() {
    if (typeof(content) === "string") {
      return ("\"" + qescape(content) + "\"");
    } else {
      return [ "[\"", qescape(transpile(content)), "\"]" ];
    }
  })();
});
macros.unquote = (function macros$unquote$(content) {
  /* ^unquote /Users/jbr/code/sibilant/src/macros.sibilant:193:0 */

  return {
    type: "output",
    contents: [ "\", ", transpile(content), ", \"" ],
    unquote: true
  };
});
macros.debug = (function macros$debug$(val) {
  /* ^debug /Users/jbr/code/sibilant/src/macros.sibilant:196:0 */

  (sibilant)["debug"] = eval(outputFormatter(transpile(val)));
  return null;
});
var node__QUERY = (function node__QUERY$(thing, type) {
  /* node? /Users/jbr/code/sibilant/src/transpiler.sibilant:8:0 */

  return (((typeof thing !== 'undefined') && (thing !== null)) && ("object" === typeof thing) && typeof(thing.type) === "string" && ((typeof type === 'undefined') || (thing.type === type)) && thing.hasOwnProperty("contents"));
});
var emptyNode__QUERY = (function emptyNode__QUERY$(item) {
  /* empty-node? /Users/jbr/code/sibilant/src/transpiler.sibilant:16:0 */

  return (function() {
    if (node__QUERY(item)) {
      return emptyNode__QUERY(item.contents);
    } else if (((item) && typeof (item) === "object" && (item).constructor.name === "Array")) {
      return all__QUERY(item, emptyNode__QUERY);
    } else if (typeof(item) === "string") {
      return item.match((new RegExp("^\\s*$", undefined)));
    } else {
      return ((null === item) || (typeof item === 'undefined') || (false === item));
    }
  })();
});
var compactNode = (function compactNode$(item) {
  /* compact-node /Users/jbr/code/sibilant/src/transpiler.sibilant:24:0 */

  return (function() {
    if (node__QUERY(item)) {
      (item)["contents"] = compactNode(item.contents);
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
  /* recurse-transpile /Users/jbr/code/sibilant/src/transpiler.sibilant:33:0 */

  return (function() {
    if (((node) && typeof (node) === "object" && (node).constructor.name === "Array")) {
      return map(node, recurseTranspile);
    } else if ((node__QUERY(node) && ("output" !== node.type))) {
      return transpile(node);
    } else if ((node__QUERY(node) && ("output" === node.type))) {
      (node)["contents"] = recurseTranspile(node.contents);
      return node;
    } else {
      return node;
    }
  })();
});
var transpile = (function transpile$(node, preprocessor) {
  /* transpile /Users/jbr/code/sibilant/src/transpiler.sibilant:41:0 */

  (function() {
    if (typeof(node) === "string") {
      return node = {
        type: "js",
        token: node,
        contents: [],
        modifiers: []
      };
    } else if ((typeof node === 'number')) {
      return node = {
        type: "number",
        token: node.toString(),
        contents: [],
        modifiers: []
      };
    }
  })();
  return (function() {
    if (((node) && typeof (node) === "object" && (node).constructor.name === "Array")) {
      return node;
    } else if (((typeof node !== 'undefined') && (node !== null))) {
      var transpiler = ((transpile)[node.type] || transpile.default);
      (node.modifiers || []).forEach((function(modifier) {
        /* /Users/jbr/code/sibilant/src/transpiler.sibilant:52:25 */
      
        var readerMacro = (readerMacros)[modifier.type],
            previousTranspiler = transpiler;
        (function() {
          if ((typeof readerMacro === 'undefined')) {
            return console.log("NO READER MACRO", modifier.type);
          }
        })();
        return transpiler = (function(node) {
          /* /Users/jbr/code/sibilant/src/transpiler.sibilant:56:50 */
        
          return readerMacro(node, previousTranspiler);
        });
      }));
      var result = transpiler(node, preprocessor);
      var resultNode = recurseTranspile((function() {
        if (node__QUERY(result)) {
          return result;
        } else {
          return {
            contents: result,
            type: "output"
          };
        }
      })());
      (resultNode)["contents"] = compact(flatten(resultNode.contents));
      (resultNode)["source"] = node;
      (function() {
        if (sibilant.debug) {
          return console.log(prettify(node), red("->"), prettify(resultNode));
        }
      })();
      (node)["transpiled"] = resultNode;
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
(sibilant)["transpile"] = transpile;
var readerMacros = {  };
readerMacros.hat = (function readerMacros$hat$(node, transpiler) {
  /* reader-macros.hat /Users/jbr/code/sibilant/src/transpiler.sibilant:80:0 */

  return ("macros." + transpiler(node));
});
readerMacros.tick = (function readerMacros$tick$(node, transpiler) {
  /* reader-macros.tick /Users/jbr/code/sibilant/src/transpiler.sibilant:81:0 */

  return macros.quote(transpiler(node));
});
readerMacros.at = (function readerMacros$at$(node, transpiler) {
  /* reader-macros.at /Users/jbr/code/sibilant/src/transpiler.sibilant:83:0 */

  return macros.unquote(transpiler(node));
});
readerMacros.dots = (function readerMacros$dots$(node, transpiler) {
  /* reader-macros.dots /Users/jbr/code/sibilant/src/transpiler.sibilant:85:0 */

  return transpiler(node);
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
  /* transpile.root /Users/jbr/code/sibilant/src/transpiler.sibilant:97:0 */

  return (function() {
    if ((1 === node.contents.length)) {
      return transpile((node.contents)[0]);
    } else {
      return interleave("\n", compact(map(node.contents, asStatement)));
    }
  })();
});
transpile.expression = (function transpile$expression$(node, preprocessor) {
  /* transpile.expression /Users/jbr/code/sibilant/src/transpiler.sibilant:102:0 */

  return (function() {
    if (node.contents.length) {
      var head = (node.contents)[0],
          args = node.contents.slice(1),
          macro = (macros)[outputFormatter(transpile(head))];
      (function() {
        if (((typeof macro !== 'undefined') && (macro !== null))) {
          return (head)["hint"] = "macro";
        }
      })();
      (function() {
        if ((head && ("string" === head.type))) {
          macro = macros.concat;
          return args = node.contents;
        }
      })();
      (function() {
        if ((typeof macro === 'undefined')) {
          macro = macros.call;
          return args = node.contents;
        }
      })();
      return macro.apply(node, args);
    } else {
      return "null";
    }
  })();
});
transpile.bracket = (function transpile$bracket$(node) {
  /* transpile.bracket /Users/jbr/code/sibilant/src/transpiler.sibilant:121:0 */

  return macros.list.apply(this, node.contents);
});
transpile.brace = (function transpile$brace$(node) {
  /* transpile.brace /Users/jbr/code/sibilant/src/transpiler.sibilant:123:0 */

  return macros.hash.apply(this, node.contents);
});
transpile.literal = (function transpile$literal$(node) {
  /* transpile.literal /Users/jbr/code/sibilant/src/transpiler.sibilant:125:0 */

  var string = node.token;
  return inject(string.replace((new RegExp("\\*", "g")), "_")
    .replace((new RegExp("\\?$", undefined)), "__QUERY")
    .replace((new RegExp("!$", undefined)), "__BANG"), string.match((new RegExp("-(.)", "g"))), (function(returnString, match) {
    /* /Users/jbr/code/sibilant/src/transpiler.sibilant:132:13 */
  
    return returnString.replace(match, (match)[1].toUpperCase());
  }));
});
transpile.string = (function transpile$string$(node) {
  /* transpile.string /Users/jbr/code/sibilant/src/transpiler.sibilant:136:0 */

  return node.token.split("\n")
    .join("\\n\" +\n\"");
});
transpile.comment = (function transpile$comment$(node) {
  /* transpile.comment /Users/jbr/code/sibilant/src/transpiler.sibilant:140:0 */

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
(sibilant)["sibilize"] = sibilize;
sibilant.version = (function sibilant$version$() {
  /* sibilant.version /Users/jbr/code/sibilant/src/require-and-include.sibilant:11:0 */

  return (sibilant.packageInfo())["version"];
});
sibilant.stripShebang = (function sibilant$stripShebang$(data) {
  /* sibilant.strip-shebang /Users/jbr/code/sibilant/src/require-and-include.sibilant:14:0 */

  return data.replace((new RegExp("^#!.*\\n", undefined)), "\n");
});
(sibilant)["file"] = "eval.sibilant";
var withDirAndFile = (function withDirAndFile$(dir, file, fn) {
  /* with-dir-and-file /Users/jbr/code/sibilant/src/require-and-include.sibilant:19:0 */

  var before = {
    dir: sibilant.dir,
    file: sibilant.file
  };
  (sibilant)["dir"] = dir;
  (sibilant)["file"] = file;
  var retval = fn();
  (sibilant)["dir"] = before.dir;
  (sibilant)["file"] = before.file;
  return retval;
});
(sibilant)["sourceCache"] = {  };
sibilant.sibilizeFile = (function sibilant$sibilizeFile$(fileName) {
  /* sibilant.sibilize-file /Users/jbr/code/sibilant/src/require-and-include.sibilant:36:0 */

  return outputFormatter(sibilant.transpileFile(fileName));
});
sibilant.sibilizeJson = (function sibilant$sibilizeJson$(fileName) {
  /* sibilant.sibilize-json /Users/jbr/code/sibilant/src/require-and-include.sibilant:39:0 */

  sibilant.initialize();
  var before = sibilant.macros.hash.quoteKeys;
  (sibilant.macros.hash)["quoteKeys"] = true;
  var content = sibilant.sibilizeFile(fileName);
  (sibilant.macros.hash)["quoteKeys"] = before;
  return content;
});
sibilant.macros.include = (function sibilant$macros$include$(file) {
  /* sibilant.macros.include /Users/jbr/code/sibilant/src/require-and-include.sibilant:47:0 */

  return sibilant.include(eval(outputFormatter(transpile(file))));
});