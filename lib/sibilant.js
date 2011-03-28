var sibilant = exports,
    sys = require("sys"),
    path = require("path"),
    fs = require("fs"),
    import = require("sibilant/lib/import"),
    error = (function(str) {
  // str:required
  throw new Error (str);
}),
    inspect = sys.inspect;
import(require("sibilant/lib/functional"));

sibilant.packageInfo = (function() {
  var fs = require("fs"),
      json = JSON;;
  return json.parse(fs.readFileSync((__dirname + "/../package.json")));
});

sibilant.versionString = (function() {
  var package = sibilant.packageInfo(),
      path = require("path");;
  return (package.name + " version " + package.version + "\n(at " + path.join(__dirname, "..") + ")");
});

sibilant.stripShebang = (function(data) {
  // data:required
  return data.replace(/^#!.*\n/, "");
});

(sibilant)["file"] = "eval.sibilant";
(sibilant)["dir"] = process.cwd();
var withDirAndFile = (function(dir, file, fn) {
  // dir:required file:required fn:required
  var before = {
    dir: sibilant.dir,
    file: sibilant.file
  };;
  (sibilant)["dir"] = dir;
  (sibilant)["file"] = file;;
  var retval = fn();;
  (sibilant)["dir"] = before.dir;
  (sibilant)["file"] = before.file;;
  return retval;
});

sibilant.translateFile = (function(fileName) {
  // fileName:required
  return withDirAndFile(path.dirname(fileName), fileName, (function() {
    return sibilant.translateAll(sibilant.stripShebang(fs.readFileSync(fileName, "utf8")));
  }));
});

sibilant.version = (function() {
  return (sibilant.packageInfo())["version"];
});

(require.extensions)[".sibilant"] = (function(module, filename) {
  // module:required filename:required
  var content = sibilant.translateFile(filename);;
  return module._compile(content, filename);
});
sibilant.include = (function(file) {
  // file:required
  (function() {
    if ((!file.match((new RegExp(".sibilant$", undefined))))) {
      return file = (file + ".sibilant");
    };
  })();
  (function() {
    if (file.match((new RegExp("^\.\.?/", undefined)))) {
      return file = (sibilant.dir + "/" + file);
    };
  })();
  var resolved = require.resolve(file);;
  return sibilant.translateFile(resolved);
});

(sibilant)["tokens"] = {  };
(sibilant.tokens)["regex"] = "(\\/(\\\\\\\/|[^\\/\\n])+\\/[glim]*)";
(sibilant.tokens)["comment"] = "(;.*)";
(sibilant.tokens)["string"] = "(\"(([^\"]|(\\\\\"))*[^\\\\])?\")";
(sibilant.tokens)["number"] = "(-?[0-9][0-9.,]*)";
(sibilant.tokens)["literal"] = "(-?[*.$a-zA-Z][*.a-zA-Z0-9-]*(\\?|!)?)";
(sibilant.tokens)["special"] = "([&']?)";
(sibilant.tokens)["otherChar"] = "([><=!\\+\\/\\*-]+)";
(sibilant.tokens)["openParen"] = "(\\()";
(sibilant.tokens)["specialOpenParen"] = "('?\\()";
(sibilant.tokens)["closeParen"] = "(\\))";
(sibilant.tokens)["alternativeParens"] = "\\{|\\[|\\}|\\]";
(sibilant.tokens)["specialLiteral"] = (sibilant.tokens.special + sibilant.tokens.literal);
(sibilant)["tokenPrecedence"] = [ "regex", "comment", "string", "number", "specialLiteral", "otherChar", "specialOpenParen", "closeParen", "alternativeParens" ];
var tokenize = sibilant.tokenize = (function(string) {
  // string:required
  var tokens = [  ],
      parseStack = [ tokens ],
      specials = [  ];;
  var acceptToken = (function(token) {
    // token:required
    return (parseStack)[0].push(token);
  });
  ;
  var increaseNesting = (function() {
    var newArr = [  ];;
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
      };
    })();
  });
  ;
  var handleToken = (function(token) {
    // token:required
    var special = (token)[0],
        token = token;;
    (function() {
      if ((special === "'")) {
        token = token.slice(1);
        increaseNesting();
        return acceptToken("quote");;
      } else {
        return special = false;
      };
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
          };
        })();
      }
    })();
    return (function() {
      if (((token !== "(") && specials.shift())) {
        return decreaseNesting();
      };
    })();
  });
  ;
  var orderedRegexen = map(sibilant.tokenPrecedence, (function(x) {
    // x:required
    return (sibilant.tokens)[x];
  })),
      masterRegex = (new RegExp((orderedRegexen).join("|"), "g"));;
  string // chain
    .match(masterRegex)
    .forEach(handleToken)
  ;
  (function() {
    if ((parseStack.length > 1)) {
      return error("unexpected EOF, probably missing a )\n", inspect((parseStack)[0]));
    };
  })();
  return tokens;
});
;

var indent = (function(args) {
  // args:rest
  var args = Array.prototype.slice.call(arguments, 0);
  
  return (compact(args) // chain
    .join("\n")
    .replace(/^/, "\n")
    .replace(/\n/g, "\n  ")
   + "\n");
});

var constructHash = (function(arrayOfArrays) {
  // arrayOfArrays:required
  return inject({  }, arrayOfArrays, (function(object, item) {
    // object:required item:required
    (object)[(item)[0]] = (object)[(item)[1]];;
    return object;
  }));
});

var macros = {  };
(sibilant)["macros"] = macros;
(macros)["return"] = (function(token) {
  // token:required
  var defaultReturn = ("return " + translate(token));;
  return (function() {
    if ((token) && (token).constructor.name === "Array") {
      return (function() {
        switch((token)[0]) {
        case "return":
        case "throw":
        case "progn":
          return translate(token);
        
        case "delete":
          var deleteMacro = (macros)["delete"];;
          return (function() {
            if ((token.length < 3)) {
              return defaultReturn;
            } else {
              return (deleteMacro.apply(undefined, token.slice(1, -1)) + "\nreturn " + deleteMacro((token.slice(-1))[0]));
            };
          })();
        
        case "setf":
          return (function() {
            if ((token.length < 4)) {
              return defaultReturn;
            } else {
              return (macros.setf.apply(undefined, token.slice(1, (token.length - 2))) + "\nreturn " + macros.setf.apply(undefined, token.slice(-2)));
            };
          })();
        
        case "set":
          return (function() {
            if ((token.length < 5)) {
              return defaultReturn;
            } else {
              var obj = (token)[1],
                  nonReturnPart = token.slice(2, (token.length - 2)),
                  returnPart = token.slice(-2);;
              nonReturnPart.unshift(obj);
              returnPart.unshift(obj);
              return (macros.set.apply(undefined, nonReturnPart) + "\nreturn " + macros.set.apply(undefined, returnPart));;
            };
          })();
        
        default:
          return defaultReturn;
        }
      })();
    } else {
      return defaultReturn;
    };
  })();
});
macros.statement = (function(args) {
  // args:rest
  var args = Array.prototype.slice.call(arguments, 0);
  
  return (macros.call.apply(undefined, args) + ";\n");
});

macros.progn = (function(body) {
  // body:rest
  var body = Array.prototype.slice.call(arguments, 0);
  
  var lastIndex = Math.max(0, (body.length - 1));;
  (body)[lastIndex] = [ "return", (body)[lastIndex] ];;
  return (map(body, (function(arg) {
    // arg:required
    return (translate(arg) + ";");
  }))).join("\n");
});

macros.call = (function(fnName, args) {
  // fnName:required args:rest
  var args = Array.prototype.slice.call(arguments, 1);
  
  return (translate(fnName) + "(" + (map(args, translate)).join(", ") + ")");
});

macros.defun = (function(fnName, argsAndBody) {
  // fnName:required argsAndBody:rest
  var argsAndBody = Array.prototype.slice.call(arguments, 1);
  
  var fnNameTr = translate(fnName),
      start = (function() {
    if (/\./(fnNameTr)) {
      return "";
    } else {
      return "var ";
    };
  })();;
  return (start + fnNameTr + " = " + macros.lambda.apply(undefined, argsAndBody) + ";\n");
});

macros.defmacro = (function(name, argsAndBody) {
  // name:required argsAndBody:rest
  var argsAndBody = Array.prototype.slice.call(arguments, 1);
  
  var js = macros.lambda.apply(undefined, argsAndBody),
      name = translate(name);;
  (function() {
    try {
      return (macros)[name] = eval(js);;
    } catch (e) {
      return error(("error in parsing macro " + name + ":\n" + indent(js)));
    }
  })();
  return undefined;
});

macros.concat = (function(args) {
  // args:rest
  var args = Array.prototype.slice.call(arguments, 0);
  
  return ("(" + (map(args, translate)).join(" + ") + ")");
});

var transformArgs = (function(arglist) {
  // arglist:required
  var last = undefined,
      args = [  ];;
  arglist.forEach((function(arg) {
    // arg:required
    return (function() {
      if (((arg)[0] === "&")) {
        return last = arg.slice(1);
      } else {
        args.push([ (last || "required"), arg ]);
        return last = null;;
      };
    })();
  }));
  (function() {
    if (last) {
      return error(("unexpected argument modifier: " + last));
    };
  })();
  return args;
});

macros.reverse = (function(arr) {
  // arr:required
  var reversed = [  ];;
  arr.forEach((function(item) {
    // item:required
    return reversed.unshift(item);
  }));
  return reversed;
});

var reverse = macros.reverse;
var buildArgsString = (function(args, rest) {
  // args:required rest:required
  var argsString = "",
      optionalCount = 0;;
  args.forEach((function(arg, optionIndex) {
    // arg:required optionIndex:required
    return (function() {
      if (((arg)[0] === "optional")) {
        argsString = (argsString + "if (arguments.length < " + (args.length - optionalCount) + ")" + " // if " + translate((arg)[1]) + " is missing" + indent(("var " + map(args.slice((optionIndex + 1)), (function(arg, argIndex) {
          // arg:required argIndex:required
          return (translate((arg)[1]) + " = " + translate(((args)[(optionIndex + argIndex)])[1]));
        })) // chain
          .reverse()
          .concat((translate((arg)[1]) + " = undefined"))
          .join(", ")
         + ";")));
        return ((optionalCount)++);
      };
    })();
  }));
  return (function() {
    if (typeof(rest) !== 'undefined') {
      return (argsString + "var " + translate((rest)[1]) + " = Array.prototype.slice.call(arguments, " + args.length + ");\n");
    } else {
      return argsString;
    };
  })();
});

var buildCommentString = (function(args) {
  // args:required
  return (function() {
    if (((args).length === 0)) {
      return "";
    } else {
      return ("// " + (map(args, (function(arg) {
        // arg:required
        return (translate((arg)[1]) + ":" + (arg)[0]);
      }))).join(" "));
    };
  })();
});

// brain 'splode
macros.lambda = (function(arglist, body) {
  // arglist:required body:rest
  var body = Array.prototype.slice.call(arguments, 1);
  
  var args = transformArgs(arglist),
      rest = (select(args, (function(arg) {
    // arg:required
    return ("rest" === (arg)[0]);
  })))[0],
      docString = undefined;;
  (body)[(body.length - 1)] = [ "return", (body)[(body.length - 1)] ];;
  (function() {
    if (((typeof((body)[0]) === "string") && (body)[0].match(/^".*"$/))) {
      return docString = ("/* " + eval(body.shift()) + " */\n");
    };
  })();
  var noRestArgs = (function() {
    if (rest) {
      return args.slice(0, -1);
    } else {
      return args;
    };
  })(),
      argsString = buildArgsString(noRestArgs, rest),
      commentString = buildCommentString(args);;
  return ("(function(" + (map(args, (function(arg) {
    // arg:required
    return translate((arg)[1]);
  }))).join(", ") + ") {" + indent(commentString, docString, argsString, (map(body, (function(stmt) {
    // stmt:required
    return (translate(stmt) + ";");
  }))).join("\n")) + "})");
});

macros.quote = (function(item) {
  // item:required
  return (function() {
    if (("Array" === item.constructor.name)) {
      return ("[ " + (map(item, macros.quote)).join(", ") + " ]");
    } else {
      return (function() {
        if (("number" === typeof(item))) {
          return item;
        } else {
          return ("\"" + literal(item) + "\"");
        };
      })();
    };
  })();
});

macros.hash = (function(pairs) {
  // pairs:rest
  var pairs = Array.prototype.slice.call(arguments, 0);
  
  (function() {
    if ((0 !== (pairs.length % 2))) {
      return error(("odd number of key-value pairs in hash: " + inspect(pairs)));
    };
  })();
  var pairStrings = bulkMap(pairs, (function(key, value) {
    // key:required value:required
    return (translate(key) + ": " + translate(value));
  }));;
  return (function() {
    if ((1 >= pairStrings.length)) {
      return ("{ " + (pairStrings).join(", ") + " }");
    } else {
      return ("{" + indent((pairStrings).join(",\n")) + "}");
    };
  })();
});

var literal = (function(string) {
  // string:required
  return inject(string // chain
    .replace(/\*/g, "_")
    .replace(/\?$/, "__QUERY")
    .replace(/!$/, "__BANG")
  , string.match(/-(.)/g), (function(returnString, match) {
    // returnString:required match:required
    return returnString.replace(match, (match)[1].toUpperCase());
  }));
});

var translate = (function(token, hint) {
  // token:required hint:required
  var hint = hint;;
  (function() {
    if ((hint && typeof((macros)[hint]) === 'undefined')) {
      return hint = undefined;
    };
  })();
  return (function() {
    if (typeof(token) !== 'undefined') {
      (function() {
        if (typeof(token) === "string") {
          return token = token.trim();
        };
      })();
      return (function() {
        try {
          return (function() {
            if ((token) && (token).constructor.name === "Array") {
              return (function() {
                if (typeof((macros)[translate((token)[0])]) !== 'undefined') {
                  return (macros)[translate((token)[0])].apply(undefined, token.slice(1));
                } else {
                  return (macros)[(hint || "call")].apply(undefined, token);
                };
              })();
            } else {
              return (function() {
                if ((typeof(token) === "string" && token.match((new RegExp(("^" + sibilant.tokens.literal + "$"), undefined))))) {
                  return literal(token);
                } else {
                  return (function() {
                    if ((typeof(token) === "string" && token.match((new RegExp("^;", undefined))))) {
                      return token.replace((new RegExp("^;+", undefined)), "//");
                    } else {
                      return (function() {
                        if ((typeof(token) === "string" && ("\"" === (token)[0] &&
                         "\"" === (token.slice(-1))[0]))) {
                          return token // chain
                            .split("\n")
                            .join("\\n\" +\n\"")
                          ;
                        } else {
                          return token;
                        };
                      })();
                    };
                  })();
                };
              })();
            };
          })();
        } catch (e) {
          return error((e.stack + "\n" + "Encountered when attempting to process:\n" + indent(inspect(token))));
        }
      })();
    };
  })();
});

(sibilant)["translate"] = translate;
var translateAll = (function(contents) {
  // contents:required
  var buffer = "";;
  tokenize(contents).forEach((function(token) {
    // token:required
    var line = translate(token, "statement");;
    return (function() {
      if (line) {
        return buffer = (buffer + line + "\n");
      };
    })();
  }));
  return buffer;
});

(sibilant)["translateAll"] = translateAll;

macros.include = (function(file) {
  // file:required
  return sibilant.include(eval(translate(file)));
});

require.paths.unshift((__dirname + "/../include"));

sibilant.include("macros");

