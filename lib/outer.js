var sibilant = exports,
    util = require("util"),
    path = require("path"),
    fs = require("fs"),
    error = (function(str) {
  throw new Error (str);
}),
    inspect = util.inspect;
var bulkMap = (function(arr, fn) {
  var index = 0,
      groupSize = fn.length,
      retArr = [];
  (function() {
    var __returnValue__ = undefined;
    while ((index < arr.length)) {
      __returnValue__ = (function() {
        retArr.push(fn.apply(undefined, arr.slice(index, (index + groupSize))));
        return index += groupSize;
      })();
    };
    return __returnValue__;
  })();
  return retArr;
});

var inject = (function(start, items, fn) {
  var value = start;
  (function() {
    if ((items) && (items).constructor.name === "Array") {
      return items.forEach((function(item, index) {
        return value = fn(value, item, index);
      }));
    }
  })();
  return value;
});

var map = (function(items, fn) {
  return inject([], items, (function(collector, item, index) {
    collector.push(fn(item, index));
    return collector;
  }));
});

var select = (function(items, fn) {
  return inject([], items, (function(collector, item, index) {
    (function() {
      if (fn(item, index)) {
        return collector.push(item);
      }
    })();
    return collector;
  }));
});

var detect = (function(items, fn) {
  var returnItem = undefined,
      index = 0,
      items = (items || []);
  (function() {
    var __returnValue__ = undefined;
    while ((!((items.length === index) || returnItem))) {
      __returnValue__ = (function() {
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

var reject = (function(items, fn) {
  var args = [ items, fn ];
  return select(items, (function() {
    return (!fn.apply(undefined, arguments));
  }));
});

var compact = (function(arr) {
  return select(arr, (function(item) {
    return (!!(item));
  }));
});

var flatten = (function(items) {
  var items = Array.prototype.slice.call(arguments, 0);
  
  return inject([], items, (function(collector, item) {
    return collector.concat((function() {
      if ((item) && (item).constructor.name === "Array") {
        return flatten.apply(undefined, item);
      } else {
        return item;
      }
    })());
  }));
});


var parser = {  };
(sibilant)["parser"] = parser;
(parser)["tokens"] = {
  "regex": "(\\/(\\\\\\\/|[^\\/\\n])+\\/[glim]*)",
  "comment": "(;.*\n)",
  "string": "(\"(([^\"]|(\\\\\"))*[^\\\\])?\")",
  "number": "(-?[0-9][0-9.,]*)",
  "literal": "(-?[*.$a-zA-Z_][*.a-zA-Z0-9-_]*(\\?|!)?)",
  "special": "([&'])",
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
//(set parser.tokens 'special-literal (concat parser.tokens.special parser.tokens.literal))
(parser)["tokenPrecedence"] = [ "regex", "comment", "string", "number", "dots", "tick", "hat", "special", "literal", "otherChar", "openExpression", "closeExpression", "newline", "whitespace", "ignored" ];
(parser)["orderedRegexes"] = parser.tokenPrecedence.map((function(x) {
  var r = (new RegExp(("^" + (parser.tokens)[x]), undefined));
  (r)["name"] = x;
  return r;
}));
var orderedRegexes = parser.orderedRegexes;
parser.parse = (function(string, context) {
  var context = ((typeof context !== 'undefined')) ? context : {
    position: 0,
    stack: [],
    line: 1,
    lastNewline: 0
  };
  var match = true,
      regexName = null,
      remainingInput = string;
  (function() {
    var __returnValue__ = undefined;
    while (match) {
      __returnValue__ = (function() {
        detect(orderedRegexes, (function(r) {
          match = r.exec(remainingInput);
          regexName = r.name;
          return match;
        }));
        return (function() {
          if (((typeof match !== 'undefined') && (match !== null))) {
            var length = ((match)[0])["length"],
                nextPosition = (context.position + length);
            (function() {
              if (("newline" === regexName)) {
                ((context.line)++);
                return (context)["lastNewline"] = context.position;
              }
            })();
            context.stack.push({
              contents: [],
              modifiers: [],
              token: (match)[0],
              type: regexName,
              start: context.position,
              line: context.line,
              col: (context.position - context.lastNewline),
              end: nextPosition
            });
            (context)["position"] = nextPosition;
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
var restructure = (function(input) {
  var output = {
    type: "root",
    contents: [],
    modifiers: []
  };
  inject({
    parseStack: [ output ],
    output: output,
    input: input
  }, input, (function(context, token, index) {
    var restructurer = ((restructurers)[token.type] || restructurers.default);
    return restructurer(token, context, index);
  }));
  return output;
});

(sibilant)["restructure"] = restructure;
restructurers.openExpression = (function(token, context, index) {
  var first = (context.parseStack)[0];
  (token)["contents"] = [];
  (token)["type"] = (bracketTypes)[token.token];
  (token)["parent"] = first;
  first.contents.push(token);
  context.parseStack.unshift(token);
  return context;
});

var codeContext = (function(node, context) {
  var context = ((typeof context !== 'undefined')) ? context : 5;
  return (function() {
    if (node.input) {
      var n = (node.col - 1),
          pointer = "",
          lines = Array.prototype.slice.call(node.input.split("\n"), (node.line - context), (node.line + context));
      (function() {
        var __returnValue__ = undefined;
        while (((n)--)) {
          __returnValue__ = (function() {
            return pointer = pointer.concat("-");
          })();
        };
        return __returnValue__;
      })();
      return (Array.prototype.slice.call(lines, 0, context)
        .concat([ (pointer + "^") ])
        .concat(Array.prototype.slice.call(lines, context, (2 * context)))
      ).join("\n");
    } else {
      return sibilant.prettyPrint(node);
    }
  })();
});

restructurers.closeExpression = (function(node, context, index) {
  var first = (context.parseStack)[0];
  (function() {
    if (((acceptablePairs)[first.token] !== node.token)) {
      throw new Error (("trying to close " + first.token + " with " + node.token + ": \n" + codeContext(node)));
    }
  })();
  (first)["end"] = node.end;
  context.parseStack.shift();
  (function() {
    if ((context.parseStack.length === 0)) {
      throw new Error (("unbalanced parens:\n" + inspect(parseStack)));
    }
  })();
  return context;
});

restructurers.hat = (function(node, context, index) {
  var nextNode = (context.input)[(1 + index)];
  nextNode.modifiers.push(node);
  return context;
});

restructurers.dots = (function(node, context, index) {
  var nextNode = (context.input)[(1 + index)];
  nextNode.modifiers.push(node);
  return context;
});

restructurers.tick = (function(node, context, index) {
  var nextNode = (context.input)[(1 + index)];
  nextNode.modifiers.push(node);
  return context;
});

restructurers.whitespace = (function(token, context, index) {
  return context;
});

restructurers.newline = (function(token, context, index) {
  return context;
});

restructurers.ignored = (function(token, context, index) {
  return context;
});

restructurers.default = (function(token, context, index) {
  ((context.parseStack)[0])["contents"].push(token);
  return context;
});


var indent = (function(args) {
  var args = Array.prototype.slice.call(arguments, 0);
  
  return (compact(args)
    .join("\n")
    .replace((new RegExp("^", undefined)), "\n")
    .replace((new RegExp("\\n", "g")), "\n  ")
    .replace((new RegExp("\\n\\s+\\n", "g")), "\n\n")
   + "\n");
});

var ast = (function(input, parent) {
  return restructure(parse(input), parent);
});

var macros = {  };
(sibilant)["macros"] = macros;
var escapeRegex = (function(string) {
  return string.replace((new RegExp("[\\-\\[\\]\\/\\{\\}\\(\\)\\*\\+\\?\\.\\\\\^\\$\\|]", "g")), "\\$&");
});

macros.return = (function(token) {
  var defaultReturn = asStatement(("return " + transpile(token)));
  return (function() {
    if ((token && token.contents && token.contents.length)) {
      return (function() {
        switch(((token.contents)[0])["token"]) {
        case "return":
        case "throw":
        case "do":
          return transpile(token);
        
        case "delete":
          var deleteMacro = (macros)["delete"];
          return (function() {
            if ((token.length < 3)) {
              return defaultReturn;
            } else {
              return (asStatement(deleteMacro.apply(undefined, token.contents.slice(1, -1))) + "\nreturn " + asStatement(deleteMacro((token.contents.slice(-1))[0])));
            }
          })();
        
        case "assign":
          return (function() {
            if ((token.contents.length < 4)) {
              return defaultReturn;
            } else {
              return (macros.assign.apply(undefined, token.contents.slice(1, (token.contents.length - 2))) + "\nreturn " + macros.assign.apply(undefined, token.contents.slice(-2)));
            }
          })();
        
        case "var":
          return (transpile(token) + "\nreturn " + transpile((function() {
            if ((0 === (token.contents.length % 2))) {
              return (token.contents.slice(-1))[0];
            } else {
              return (token.contents.slice(-2))[0];
            }
          })()));
        
        case "set":
          return (function() {
            if ((token.length < 5)) {
              return defaultReturn;
            } else {
              var obj = (token.contents)[1],
                  nonReturnPart = token.contents.slice(2, (token.contents.length - 2)),
                  returnPart = token.contents.slice(-2);
              nonReturnPart.unshift(obj);
              returnPart.unshift(obj);
              return (macros.set.apply(undefined, nonReturnPart) + "\nreturn " + macros.set.apply(undefined, returnPart));
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

macros.list = (function(args) {
  var args = Array.prototype.slice.call(arguments, 0);
  
  return ("[ " + (map(args, transpile)).join(", ") + " ]");
});

var asStatement = (function(string) {
  return (string || "")
    .toString()
    .replace((new RegExp(";;\n", "g")), ";")
    .replace((new RegExp(";*\\s*$", undefined)), ";")
  ;
});

macros.statement = (function(args) {
  var args = Array.prototype.slice.call(arguments, 0);
  
  return (macros.call.apply(undefined, args) + ";\n");
});

macros.do = (function(body) {
  var body = Array.prototype.slice.call(arguments, 0);
  
  return (function() {
    if ((1 === body.length)) {
      return macros.return((body)[0]);
    } else if (body.length) {
      return ((map(Array.prototype.slice.call(body, 0, -1), (function(node) {
        return asStatement(transpile(node));
      })).concat(macros.return((body.slice(-1))[0]))).join("\n"));
    } else {
      return "";
    }
  })();
});

macros.emptyList = (function() {
  return "null";
});

macros.call = (function(fnName, args) {
  var args = Array.prototype.slice.call(arguments, 1);
  
  return (transpile(fnName) + "(" + (map(args, transpile)).join(", ") + ")");
});

macros.def = (function(fnName, argsAndBody) {
  var argsAndBody = Array.prototype.slice.call(arguments, 1);
  
  var fnNameTr = transpile(fnName),
      start = (function() {
    if (fnNameTr.match((new RegExp("\\.", undefined)))) {
      return "";
    } else {
      return "var ";
    }
  })(),
      args = (argsAndBody)[0],
      body = argsAndBody.slice(1),
      name = fnNameTr.replace((new RegExp("\\.", "g")), "$");
  return (start + fnNameTr + " = " + macros.lambda.apply(undefined, [ {
    name: name,
    args: args
  } ].concat(body)) + ";\n");
});

macros.macro = (function(name, argsAndBody) {
  var argsAndBody = Array.prototype.slice.call(arguments, 1);
  
  var js = macros.lambda.apply(undefined, argsAndBody),
      name = transpile(name);
  (function() {
    if (macros.debug__BANG) {
      console.log(map(argsAndBody, sibilant.prettyPrint));
      return console.log(("^" + name + " = " + js));
    }
  })();
  (function() {
    try {
      return (macros)[name] = eval(js);
    } catch (e) {
      return error(("error in parsing macro " + name + ":\n" + indent(js)));
    }
  })();
  return undefined;
});

macros.concat = (function(args) {
  var args = Array.prototype.slice.call(arguments, 0);
  
  return ("(" + (map(args, transpile)).join(" + ") + ")");
});

macros.reverse = (function(arr) {
  var reversed = [];
  arr.forEach((function(item) {
    return reversed.unshift(item);
  }));
  return reversed;
});

var reverse = macros.reverse;
macros.lambda = (function(argsOrOptions, body) {
  var body = Array.prototype.slice.call(arguments, 1);
  
  var args = ((argsOrOptions)["args"] || argsOrOptions),
      name = (argsOrOptions)["name"],
      rest = detect(args.contents, (function(arg) {
    var mod = (arg.modifiers)[0];
    return (mod && ("..." === mod.token));
  }));
  return ("(function" + (function() {
    if (name) {
      return (" " + name);
    } else {
      return "";
    }
  })() + "(" + (map(args.contents, transpile)).join(", ") + ") {" + (function() {
    if (((typeof rest !== 'undefined') && (rest !== null))) {
      return indent(("var " + transpile(rest) + " = Array.prototype.slice.call(arguments, " + (function() {
        if (rest) {
          return (args.contents.length - 1);
        } else {
          return args.contents.length;
        }
      })() + ");"));
    } else {
      return "";
    }
  })() + indent(macros.do.apply(undefined, body)) + "})");
});

(macros)["#"] = macros.lambda;
// (def ^quote (item)
//      (if (= "Array" item.constructor.name)
//          ("[ " (join ", " (map item ^quote)) " ]")
//          (if (= 'number (typeof item)) item
//              ("\"" (literal item) "\""))))
macros.hash = (function(pairs) {
  var pairs = Array.prototype.slice.call(arguments, 0);
  
  (function() {
    if ((0 !== (pairs.length % 2))) {
      return error(("odd number of key-value pairs in hash: " + inspect(pairs)));
    }
  })();
  var quoteKeys = (((typeof macros.state !== 'undefined') && (macros.state !== null)) && macros.state("quoteKeys")),
      pairStrings = bulkMap(pairs, (function(key, value) {
    return ((function() {
      if (quoteKeys) {
        return macros.quote(transpile(key));
      } else {
        return transpile(key);
      }
    })() + ": " + transpile(value));
  }));
  return (function() {
    if ((1 >= pairStrings.length)) {
      return ("{ " + (pairStrings).join(", ") + " }");
    } else {
      return ("{" + indent((pairStrings).join(",\n")) + "}");
    }
  })();
});


var transpile = (function(node, preprocessor) {
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
    } else if ((node) && (node).constructor.name === "Array") {
      var contents = node;
      return node = {
        token: "(",
        type: "expression",
        contents: contents,
        modifiers: []
      };
    }
  })();
  return (function() {
    if ((typeof node !== 'undefined')) {
      var transpiler = ((transpile)[node.type] || transpile.default);
      (node.modifiers || []).forEach((function(modifier) {
        var readerMacro = (readerMacros)[modifier.type],
            previousTranspiler = transpiler;
        (function() {
          if ((typeof readerMacro === 'undefined')) {
            return console.log("NO READER MACRO", modifier.type);
          }
        })();
        return transpiler = (function(node) {
          return readerMacro(node, previousTranspiler);
        });
      }));
      return (node)["transpiled"] = transpiler(node, preprocessor);
    }
  })();
});

(sibilant)["transpile"] = transpile;
var readerMacros = {  };
readerMacros.hat = (function(node, transpiler) {
  return ("macros." + transpiler(node));
});

readerMacros.tick = (function(node, transpiler) {
  return (function() {
    if (("literal" === node.type)) {
      return ("\"" + transpiler(node) + "\"");
    }
  })();
});

readerMacros.dots = (function(node, transpiler) {
  return transpiler(node);
});

transpile.default = (function(node) {
  return node.token;
});

transpile.number = (function(node) {
  return parseFloat(node.token.replace((new RegExp(",", "g")), ""));
});

transpile.root = (function(node) {
  return (function() {
    if ((1 === node.contents.length)) {
      return transpile((node.contents)[0]);
    } else {
      return (map(compact(map(node.contents, transpile)), asStatement)).join("\n");
    }
  })();
});

transpile.expression = (function(node, preprocessor) {
  return (function() {
    if (node.contents.length) {
      var head = (node.contents)[0],
          args = node.contents.slice(1),
          macro = (macros)[transpile(head)];
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

transpile.bracket = (function(node) {
  return macros.list.apply(undefined, node.contents);
});

transpile.brace = (function(node) {
  return macros.hash.apply(undefined, node.contents);
});

transpile.literal = (function(node) {
  var string = node.token;
  return inject(string
    .replace((new RegExp("\\*", "g")), "_")
    .replace((new RegExp("\\?$", undefined)), "__QUERY")
    .replace((new RegExp("!$", undefined)), "__BANG")
  , string.match((new RegExp("-(.)", "g"))), (function(returnString, match) {
    return returnString.replace(match, (match)[1].toUpperCase());
  }));
});

transpile.string = (function(node) {
  return node.token
    .split("\n")
    .join("\\n\" +\n\"")
  ;
});

transpile.comment = (function(node) {
  return undefined;
});


var green = (function(args) {
  var args = Array.prototype.slice.call(arguments, 0);
  
  return ("\033[32m" + (args).join("") + "\033[0m");
});

var red = (function(args) {
  var args = Array.prototype.slice.call(arguments, 0);
  
  return ("\033[31m" + (args).join("") + "\033[0m");
});

var yellow = (function(args) {
  var args = Array.prototype.slice.call(arguments, 0);
  
  return ("\033[33m" + (args).join("") + "\033[0m");
});


sibilant.prettyPrint = (function(node, color) {
  var color = ((typeof color !== 'undefined')) ? color : true;
  var prettyPrinter = ((sibilant.prettyPrint)[node.type] || sibilant.prettyPrint.default);
  return prettyPrinter(node, color);
});

sibilant.prettyPrint.default = (function(node, color) {
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

sibilant.prettyPrint.root = (function(node, color) {
  return (map(node.contents, sibilant.prettyPrint)).join("\n");
});

sibilant.prettyPrint.colorize = (function(node, color, string) {
  return (function() {
    if ((color && (node.hint === "macro"))) {
      return yellow(string);
    } else {
      return string;
    }
  })();
});


sibilant.initialize = (function() {
  return (function() {
    if ((!sibilant.macros._loaded__QUERY)) {
      (sibilant.macros)["_loaded__QUERY"] = true;
      return sibilant.include(path.normalize((__dirname + "/../include/macros")));
    }
  })();
});

var sibilize = (function(input) {
  sibilant.initialize();
  return transpile(restructure(parse(input)));
});

(sibilant)["sibilize"] = sibilize;
sibilant.version = (function() {
  return (sibilant.packageInfo())["version"];
});

sibilant.packageInfo = (function() {
  var fs = require("fs");
  return JSON.parse(fs.readFileSync((__dirname + "/../package.json")));
});

sibilant.versionString = (function() {
  var package = sibilant.packageInfo(),
      path = require("path");
  return (package.name + " version " + package.version + "\n(at " + path.join(__dirname, "..") + ")");
});

sibilant.stripShebang = (function(data) {
  return data.replace(/^#!.*\n/, "");
});

(sibilant)["file"] = "eval.sibilant";
(sibilant)["dir"] = process.cwd();
// (set require.extensions ".sibilant"
//      (#(module filename)
//        (var content (sibilant.sibilize-file filename))
//        (module.*compile content filename)))
// (set require.extensions ".son"
//      (#(module filename)
//        (var content (sibilant.sibilize-json filename))
//        (set module 'exports (JSON.parse content))))
sibilant.include = (function(file) {
  (function() {
    if ((!file.match((new RegExp("\\.sibilant$", undefined))))) {
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
  return sibilant.sibilizeFile(resolvedFile);
});

var withDirAndFile = (function(dir, file, fn) {
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

sibilant.stripShebang = (function(data) {
  return data.replace(/^#!.*\n/, "");
});

sibilant.sibilizeFile = (function(fileName) {
  return withDirAndFile(path.dirname(fileName), fileName, (function() {
    return sibilize(sibilant.stripShebang(fs.readFileSync(fileName, "utf8")));
  }));
});

sibilant.transpileJson = (function(fileName) {
  var before = sibilant.macros.state("quoteKeys");
  sibilant.macros.state("quoteKeys", true);
  var content = sibilant.sibilizeFile(fileName);
  sibilant.macros.state("quoteKeys", before);
  return content;
});

sibilant.macros.include = (function(file) {
  return sibilant.include(eval(transpile(file)));
});

