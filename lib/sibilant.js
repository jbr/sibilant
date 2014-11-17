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
      items = items;
  return (function() {
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

sibilant.translateFile = (function(fileName) {
  return withDirAndFile(path.dirname(fileName), fileName, (function() {
    return sibilant.translateAll(sibilant.stripShebang(fs.readFileSync(fileName, "utf8")));
  }));
});

sibilant.translateJson = (function(fileName) {
  var before = sibilant.macros.state("quoteKeys");
  sibilant.macros.state("quoteKeys", true);
  var content = sibilant.translateFile(fileName);
  sibilant.macros.state("quoteKeys", before);
  return content;
});

sibilant.version = (function() {
  return (sibilant.packageInfo())["version"];
});

(require.extensions)[".sibilant"] = (function(module, filename) {
  var content = sibilant.translateFile(filename);
  return module._compile(content, filename);
});
(require.extensions)[".son"] = (function(module, filename) {
  var content = sibilant.translateJson(filename);
  return (module)["exports"] = JSON.parse(content);
});
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
  return sibilant.translateFile(resolvedFile);
});

(sibilant)["tokens"] = {
  "regex": "(\\/(\\\\\\\/|[^\\/\\n])+\\/[glim]*)",
  "comment": "(;.*)",
  "string": "(\"(([^\"]|(\\\\\"))*[^\\\\])?\")",
  "number": "(-?[0-9][0-9.,]*)",
  "literal": "(-?[*.$a-zA-Z^_][*.a-zA-Z0-9-_]*(\\?|!)?)",
  "special": "([&']?)",
  "dots": "(\\.+)",
  "otherChar": "([#><=!\\+\\/\\*-]+)",
  "openParen": "(\\()",
  "specialOpenParen": "('?\\()",
  "closeParen": "(\\))",
  "alternativeParens": "\\{|\\[|\\}|\\]"
};
(sibilant.tokens)["specialLiteral"] = (sibilant.tokens.special + sibilant.tokens.literal);
(sibilant)["tokenPrecedence"] = [ "regex", "comment", "string", "number", "dots", "specialLiteral", "otherChar", "specialOpenParen", "closeParen", "alternativeParens" ];
(sibilant)["orderedRegexes"] = map(sibilant.tokenPrecedence, (function(x) {
  return (sibilant.tokens)[x];
}));
(sibilant)["masterRegex"] = (new RegExp((sibilant.orderedRegexes).join("|"), "g"));
var tokenize = (function(string) {
  var tokens = [],
      parseStack = [ tokens ],
      specials = [];
  var acceptToken = (function(token) {
    return (parseStack)[0].push(token);
  });
  ;
  var increaseNesting = (function() {
    var newArr = [];
    acceptToken(newArr);
    return parseStack.unshift(newArr);
  });
  ;
  var decreaseNesting = (function() {
    specials.shift();
    parseStack.shift();
    return (function() {
      if ((parseStack.length === 0)) {
        throw new Error (("unbalanced parens:\n" + inspect(parseStack)));
      }
    })();
  });
  ;
  var handleToken = (function(token) {
    var special = (token)[0],
        token = token;
    (function() {
      switch(special) {
      case "'":
        token = token.slice(1);
        increaseNesting();
        return acceptToken("quote");
      
      case "^":
        token = ("macros." + token.slice(1));
        return special = false;
      
      default:
        return special = false;
      }
    })();
    specials.unshift((!!(special)));
    (function() {
      switch(token) {
      case "(":
        return increaseNesting();
      
      case "]":
      case "}":
      case ")":
        return decreaseNesting();
      
      case "{":
        increaseNesting();
        return acceptToken("hash");
      
      case "[":
        increaseNesting();
        return acceptToken("list");
      
      default:
        return (function() {
          if (token.match((new RegExp(("^" + sibilant.tokens.number + "$"), undefined)))) {
            return acceptToken(parseFloat(token.replace((new RegExp(",", "g")), "")));
          } else {
            return acceptToken(token);
          }
        })();
      }
    })();
    return (function() {
      if (((token !== "(") && specials.shift())) {
        return decreaseNesting();
      }
    })();
  });
  ;
  string
    .match(sibilant.masterRegex)
    .forEach(handleToken)
  ;
  (function() {
    if ((parseStack.length > 1)) {
      return error("unexpected EOF, probably missing a )\n", inspect((parseStack)[0]));
    }
  })();
  return tokens;
});

(sibilant)["tokenize"] = tokenize;
var indent = (function(args) {
  var args = Array.prototype.slice.call(arguments, 0);
  
  return (compact(args)
    .join("\n")
    .replace((new RegExp("^", undefined)), "\n")
    .replace((new RegExp("\\n", "g")), "\n  ")
   + "\n");
});

var constructHash = (function(arrayOfArrays) {
  return inject({  }, arrayOfArrays, (function(object, item) {
    (object)[(item)[0]] = (object)[(item)[1]];
    return object;
  }));
});

var macros = {  };
(sibilant)["macros"] = macros;
(macros)["return"] = (function(token) {
  var defaultReturn = ("return " + translate(token));
  return (function() {
    if ((token) && (token).constructor.name === "Array") {
      return (function() {
        switch((token)[0]) {
        case "return":
        case "throw":
        case "do":
          return translate(token);
        
        case "delete":
          var deleteMacro = (macros)["delete"];
          return (function() {
            if ((token.length < 3)) {
              return defaultReturn;
            } else {
              return (deleteMacro.apply(undefined, token.slice(1, -1)) + "\nreturn " + deleteMacro((token.slice(-1))[0]));
            }
          })();
        
        case "setf":
        case "assign":
          return (function() {
            if ((token.length < 4)) {
              return defaultReturn;
            } else {
              return (macros.setf.apply(undefined, token.slice(1, (token.length - 2))) + "\nreturn " + macros.setf.apply(undefined, token.slice(-2)));
            }
          })();
        
        case "set":
          return (function() {
            if ((token.length < 5)) {
              return defaultReturn;
            } else {
              var obj = (token)[1],
                  nonReturnPart = token.slice(2, (token.length - 2)),
                  returnPart = token.slice(-2);
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
var asStatement = (function(string) {
  return string
    .toString()
    .replace((new RegExp(";*\\s*$", undefined)), ";")
  ;
});

macros.statement = (function(args) {
  var args = Array.prototype.slice.call(arguments, 0);
  
  return (macros.call.apply(undefined, args) + ";\n");
});

macros.do = (function(body) {
  var body = Array.prototype.slice.call(arguments, 0);
  
  var lastIndex = Math.max(0, (body.length - 1));
  (body)[lastIndex] = [ "return", (body)[lastIndex] ];
  return (map(body, (function(arg) {
    return (asStatement(translate(arg)));
  }))).join("\n");
});

macros.emptyList = (function() {
  return "null";
});

macros.call = (function(fnName, args) {
  var args = Array.prototype.slice.call(arguments, 1);
  
  return (translate(fnName) + "(" + (map(args, translate)).join(", ") + ")");
});

macros.def = (function(fnName, argsAndBody) {
  var argsAndBody = Array.prototype.slice.call(arguments, 1);
  
  var fnNameTr = translate(fnName),
      start = (function() {
    if (fnNameTr.match((new RegExp("\\.", undefined)))) {
      return "";
    } else {
      return "var ";
    }
  })();
  return (start + fnNameTr + " = " + macros.lambda.apply(undefined, argsAndBody) + ";\n");
});

macros.macro = (function(name, argsAndBody) {
  var argsAndBody = Array.prototype.slice.call(arguments, 1);
  
  var js = macros.lambda.apply(undefined, argsAndBody),
      name = translate(name);
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
  
  return ("(" + (map(args, translate)).join(" + ") + ")");
});

var transformArgs = (function(arglist) {
  var last = null,
      args = [];
  arglist.forEach((function(arg) {
    return (function() {
      if ((("&rest" === arg) || ("..." === arg))) {
        return last = arg;
      } else {
        args.push([ last, arg ]);
        return last = null;
      }
    })();
  }));
  (function() {
    if (last) {
      return error(("unexpected argument modifier: " + last));
    }
  })();
  return args;
});

macros.reverse = (function(arr) {
  var reversed = [];
  arr.forEach((function(item) {
    return reversed.unshift(item);
  }));
  return reversed;
});

var reverse = macros.reverse;
var buildArgsString = (function(args, rest) {
  var argsString = "";
  return (function() {
    if ((typeof rest !== 'undefined')) {
      return (argsString + "var " + translate((rest)[1]) + " = Array.prototype.slice.call(arguments, " + args.length + ");\n");
    } else {
      return argsString;
    }
  })();
});

macros.lambda = (function(arglist, body) {
  var body = Array.prototype.slice.call(arguments, 1);
  
  var args = transformArgs(arglist),
      rest = (select(args, (function(arg) {
    return (("&rest" === (arg)[0]) || ("..." === (arg)[0]));
  })))[0],
      docString = undefined;
  (body)[(body.length - 1)] = [ "return", (body)[(body.length - 1)] ];
  (function() {
    if (((typeof (body)[0] === "string") && (body)[0].match((new RegExp("^\".*\"$", undefined))))) {
      return docString = ("/* " + eval(body.shift()) + " */\n");
    }
  })();
  var noRestArgs = (function() {
    if (rest) {
      return args.slice(0, -1);
    } else {
      return args;
    }
  })(),
      argsString = buildArgsString(noRestArgs, rest);
  return ("(function(" + (map(args, (function(arg) {
    return translate((arg)[1]);
  }))).join(", ") + ") {" + indent(docString, argsString, (map(body, (function(stmt) {
    var tstmt = translate(stmt);
    return (tstmt + (function() {
      if (((tstmt.slice(-1))[0] === ";")) {
        return "";
      } else {
        return ";";
      }
    })());
  }))).join("\n")) + "})");
});

(macros)["#"] = macros.lambda;
macros.quote = (function(item) {
  return (function() {
    if (("Array" === item.constructor.name)) {
      return ("[ " + (map(item, macros.quote)).join(", ") + " ]");
    } else {
      return (function() {
        if (("number" === typeof item)) {
          return item;
        } else {
          return ("\"" + literal(item) + "\"");
        }
      })();
    }
  })();
});

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
        return macros.quote(translate(key));
      } else {
        return translate(key);
      }
    })() + ": " + translate(value));
  }));
  return (function() {
    if ((1 >= pairStrings.length)) {
      return ("{ " + (pairStrings).join(", ") + " }");
    } else {
      return ("{" + indent((pairStrings).join(",\n")) + "}");
    }
  })();
});

var literal = (function(string) {
  return inject(string
    .replace((new RegExp("\\*", "g")), "_")
    .replace((new RegExp("\\?$", undefined)), "__QUERY")
    .replace((new RegExp("!$", undefined)), "__BANG")
  , string.match((new RegExp("-(.)", "g"))), (function(returnString, match) {
    return returnString.replace(match, (match)[1].toUpperCase());
  }));
});

var translateListToken = (function(token, hint) {
  return (function() {
    if (((token).length === 0)) {
      return macros.emptyList();
    } else {
      var first = translate((token)[0]),
          macro = (macros)[first];
      return (function() {
        if ((typeof macro !== 'undefined')) {
          return macro.apply(undefined, token.slice(1));
        } else {
          return (function() {
            if ((typeof(first) === "string" && ("\"" === (first)[0]))) {
              return macros.concat.apply(undefined, token);
            } else {
              return (macros)[(hint || "call")].apply(undefined, token);
            }
          })();
        }
      })();
    }
  })();
});

var translateStringToken = (function(token, hint) {
  return (function() {
    if (token.match((new RegExp(("^" + sibilant.tokens.literal + "$"), undefined)))) {
      return literal(token);
    } else {
      return (function() {
        if (token.match((new RegExp("^;", undefined)))) {
          return token.replace((new RegExp("^;+", undefined)), "//");
        } else {
          return (function() {
            if (("\"" === (token)[0] &&
             "\"" === (token.slice(-1))[0])) {
              return token
                .split("\n")
                .join("\\n\" +\n\"");
            } else {
              return token;
            }
          })();
        }
      })();
    }
  })();
});

var translate = (function(token, hint) {
  var hint = hint;
  (function() {
    if ((hint && (typeof (macros)[hint] === 'undefined'))) {
      return hint = undefined;
    }
  })();
  return (function() {
    if ((typeof token !== 'undefined')) {
      (function() {
        if (typeof(token) === "string") {
          return token = token.trim();
        }
      })();
      return (function() {
        try {
          return (function() {
            if ((token) && (token).constructor.name === "Array") {
              return translateListToken(token, hint);
            } else {
              return (function() {
                if (typeof(token) === "string") {
                  return translateStringToken(token, hint);
                } else {
                  return token;
                }
              })();
            }
          })();
        } catch (e) {
          return error((e.stack + "\n" + "Encountered when attempting to process:\n" + indent(inspect(token))));
        }
      })();
    }
  })();
});

(sibilant)["translate"] = translate;
var translateAll = (function(contents) {
  var buffer = "";
  tokenize(contents).forEach((function(token) {
    var line = translate(token, "statement");
    return (function() {
      if (line) {
        return buffer = (buffer + line + "\n");
      }
    })();
  }));
  return buffer;
});

(sibilant)["translateAll"] = translateAll;

macros.include = (function(file) {
  return sibilant.include(eval(translate(file)));
});

sibilant.include(path.normalize((__dirname + "/../include/macros")));

