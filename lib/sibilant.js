
var sys = require("sys");
var sibilant = exports;
var import = require("sibilant/import");
import(require("sibilant/functional"));

var error = (function(str) {
  // str:required
  throw new Error (str);
});
var inspect = sys.inspect;
var emit = sys.puts;
var load = (function(file, callback) {
  // file:required callback:required
  var data = require("fs").readFileSync(file, "utf8");;
  return callback(data);
});
// below this line is not node specific
var tokenize = sibilant.tokenize = (function(string) {
  // string:required
  var tokens = [  ];;
  var parseStack = [ tokens ];;
  var specials = [  ];;
  var acceptToken = (function(token) {
    // token:required
    return (parseStack)[0].push(token);
  });
  ;
  var increaseNesting = (function() {
    if (arguments.length > 0)
      throw new Error("argument count mismatch: expected no arguments");
    
    var newArr = [  ];;
    acceptToken(newArr);
    return parseStack.unshift(newArr);
  });
  ;
  var decreaseNesting = (function() {
    if (arguments.length > 0)
      throw new Error("argument count mismatch: expected no arguments");
    
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
    var special = (token)[0];;
    var token = token;;
    (function() {
      if ((special === "'")) {
        token = token.slice(1);;
        increaseNesting();
        return acceptToken("quote");;
      } else {
        return special = false;;
      };
    })();
    specials.unshift((!!(special)));
    return (function() {
      if ((token === "(")) {
        return increaseNesting();
      } else {
        (function() {
          if ((token === ")")) {
            return decreaseNesting();
          } else {
            return (function() {
              if (token.match(/^-?[0-9.]+$/)) {
                return acceptToken(parseFloat(token));
              } else {
                return acceptToken(token);
              };
            })();
          };
        })();
        return (function() {
          if (specials.shift()) {
            return decreaseNesting();
          };
        })();;
      };
    })();
  });
  ;
  string // chain
    .match(/(\/(\\\/|[^\/\n])+\/[glim]*)|(;.*)|("(([^"]|(\\"))*[^\\])?")|(-?[0-9.]+)|[&']?[*.a-z-]+\??|([><=!\+\/\*-]+)|(\'?\()|\)/g)
    .forEach(handleToken)
  ;
  (function() {
    if ((parseStack.length > 1)) {
      return error("unexpected EOF, probably missing a )\n", inspect((parseStack)[0]));
    };
  })();
  return tokens;
});;
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
  // array-of-arrays:required
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
  return (function() {
    if ((token && ("Array" === token.constructor.name) && (((token)[0] === "return") || ((token)[0] === "throw") || ((token)[0] === "progn")))) {
      return translate(token);
    } else {
      return ("return " + translate(token));
    };
  })();
});
(macros)["let"] = (function(assignments, body) {
  // assignments:required body:rest
  if (arguments.length < 1)
    throw new Error("argument count mismatch: expected no fewer than 1 arguments");
  var body = Array.prototype.slice.call(arguments, 1);
  
  (body)[(body.length - 1)] = [ "return", (body)[(body.length - 1)] ];;
  var content = indent(("var " + (map(assignments, (function(kv) {
    // kv:required
    return ((kv)[0] + " = " + translate((kv)[1]));
  }))).join(",\n ") + ";"), (map(body, (function(arg) {
    // arg:required
    return (translate(arg) + ";");
  }))).join("\n"));;
  return ("(function() {" + content + "})();\n");
});
(macros)["statement"] = (function(args) {
  // args:rest
  var args = Array.prototype.slice.call(arguments, 0);
  
  return (macros.call.apply(undefined, args) + ";\n");
});
(macros)["progn"] = (function(body) {
  // body:rest
  var body = Array.prototype.slice.call(arguments, 0);
  
  (body)[(body.length - 1)] = [ "return", (body)[(body.length - 1)] ];;
  return (map(body, (function(arg) {
    // arg:required
    return (translate(arg) + ";");
  }))).join("\n");
});
(macros)["call"] = (function(fnName, args) {
  // fn-name:required args:rest
  if (arguments.length < 1)
    throw new Error("argument count mismatch: expected no fewer than 1 arguments");
  var args = Array.prototype.slice.call(arguments, 1);
  
  return (translate(fnName) + "(" + (map(args, translate)).join(", ") + ")");
});
(macros)["defun"] = (function(fnName, argsAndBody) {
  // fn-name:required args-and-body:rest
  if (arguments.length < 1)
    throw new Error("argument count mismatch: expected no fewer than 1 arguments");
  var argsAndBody = Array.prototype.slice.call(arguments, 1);
  
  return ("var " + translate(fnName) + " = " + macros.lambda.apply(undefined, argsAndBody) + ";\n");
});
(macros)["defmacro"] = (function(name, argsAndBody) {
  // name:required args-and-body:rest
  if (arguments.length < 1)
    throw new Error("argument count mismatch: expected no fewer than 1 arguments");
  var argsAndBody = Array.prototype.slice.call(arguments, 1);
  
  var js = macros.lambda.apply(undefined, argsAndBody);;
  (function() {
    try {
      return (macros)[name] = eval(js);;
    } catch (e) {
      return error(("error in parsing macro " + name + ":\n" + indent(js)));
    }
  })();
  return undefined;
});
(macros)["concat"] = (function(args) {
  // args:rest
  var args = Array.prototype.slice.call(arguments, 0);
  
  return ("(" + (map(args, translate)).join(" + ") + ")");
});
var transformArgs = (function(arglist) {
  // arglist:required
  var last;;
  var args = [  ];;
  arglist.forEach((function(arg) {
    // arg:required
    return (function() {
      if (((arg)[0] === "&")) {
        return last = arg.slice(1);;
      } else {
        args.push([ (last || "required"), arg ]);
        return last = null;;;
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

(macros)["reverse"] = (function(arr) {
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
  var argsString = "";;
  var optionalCount = 0;;
  args.forEach((function(arg, optionIndex) {
    // arg:required option-index:required
    return (function() {
      if (((arg)[0] === "optional")) {
        argsString = (argsString + "if (arguments.length < " + (args.length - optionalCount) + ")" + " // if " + (arg)[1] + " is missing" + indent(("var " + map(args.slice((optionIndex + 1)), (function(arg, argIndex) {
          // arg:required arg-index:required
          return ((arg)[1] + " = " + ((args)[(optionIndex + argIndex)])[1]);
        })) // chain
          .reverse()
          .concat(((arg)[1] + " = undefined"))
          .join(", ")
         + ";")));;
        return ((optionalCount)++);
      };
    })();
  }));
  var argumentCountMismatch = (function(msg) {
    // msg:rest
    var msg = Array.prototype.slice.call(arguments, 0);
    
    return indent(("throw new Error(\"argument " + "count mismatch: " + (msg).join(" ") + "\");"));
  });
  ;
  (function() {
    if (typeof(rest) !== "undefined") {
      (function() {
        if (((args.length - optionalCount) > 0)) {
          return argsString = (argsString + "if (arguments.length < " + (args.length - optionalCount) + ")" + argumentCountMismatch("expected no fewer than", (args.length - optionalCount), "arguments"));;
        };
      })();
      return argsString = (argsString + "var " + translate((rest)[1]) + " = Array.prototype.slice.call(arguments, " + args.length + ");\n");;;
    } else {
      return (function() {
        if (((args).length === 0)) {
          return argsString = (argsString + "if (arguments.length > 0)" + argumentCountMismatch("expected no arguments"));;
        } else {
          return (function() {
            if ((0 > optionalCount)) {
              return argsString = (argsString + "if (argument.length < " + (args.length - optionalCount) + " || arguments.length > " + args.length + ")" + argumentCountMismatch("expected between", (args.length - optionalCount), "and", args.length, "arguments"));;
            };
          })();
        };
      })();
    };
  })();
  return argsString;
});

var buildCommentString = (function(args) {
  // args:required
  return (function() {
    if (((args).length === 0)) {
      return "";
    } else {
      return ("// " + (map(args, (function(arg) {
        // arg:required
        return reverse(arg).join(":");
      }))).join(" "));
    };
  })();
});

// brain 'splode
(macros)["lambda"] = (function(arglist, body) {
  // arglist:required body:rest
  if (arguments.length < 1)
    throw new Error("argument count mismatch: expected no fewer than 1 arguments");
  var body = Array.prototype.slice.call(arguments, 1);
  
  var args = transformArgs(arglist);;
  var rest = (select(args, (function(arg) {
    // arg:required
    return ("rest" === (arg)[0]);
  })))[0];;
  var docString;;
  (body)[(body.length - 1)] = [ "return", (body)[(body.length - 1)] ];;
  (function() {
    if (((typeof((body)[0]) === "string") && (body)[0].match(/^".*"$/))) {
      return docString = ("/* " + eval(body.shift()) + " */\n");;
    };
  })();
  var noRestArgs = (function() {
    if (rest) {
      return args.slice(0, -1);
    } else {
      return args;
    };
  })();;
  var argsString = buildArgsString(noRestArgs, rest);;
  var commentString = buildCommentString(args);;
  return ("(function(" + (map(args, (function(arg) {
    // arg:required
    return translate((arg)[1]);
  }))).join(", ") + ") {" + indent(commentString, docString, argsString, (map(body, (function(stmt) {
    // stmt:required
    return (translate(stmt) + ";");
  }))).join("\n")) + "})");
});
(macros)["quote"] = (function(item) {
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
(macros)["hash"] = (function(pairs) {
  // pairs:rest
  var pairs = Array.prototype.slice.call(arguments, 0);
  
  (function() {
    if ((0 !== (pairs.length % 2))) {
      return error(("odd number of key-value pairs in hash: " + inspect(pairs)));
    };
  })();
  var pairStrings = bulkEach(pairs, (function(key, value) {
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
    .replace(/\?$/, "Q")
  , string.match(/-(.)/g), (function(returnString, match) {
    // return-string:required match:required
    return returnString.replace(match, (match)[1].toUpperCase());
  }));
});

var translate = (function(token, hint) {
  // token:required hint:required
  var hint = hint;;
  (function() {
    if ((hint && typeof((macros)[hint]) === "undefined")) {
      return hint = undefined;;
    };
  })();
  return (function() {
    if (typeof(token) !== "undefined") {
      return (function() {
        try {
          return (function() {
            if (("Array" === token.constructor.name)) {
              return (function() {
                if (typeof((macros)[(token)[0]]) === "undefined") {
                  return (macros)[(hint || "call")].apply(undefined, token);
                } else {
                  return (macros)[(token)[0]].apply(undefined, token.slice(1));
                };
              })();
            } else {
              return (function() {
                if ((typeof(token) === "string" && token.match(/^[*\.a-z-]+\??$/))) {
                  return literal(token);
                } else {
                  return (function() {
                    if ((typeof(token) === "string" && token.match(/^;/))) {
                      return token.replace(/^;+/, "//");
                    } else {
                      return (function() {
                        if ((typeof(token) === "string" && ("\"" === (token)[0]))) {
                          return token // chain
                            .split("\n")
                            .join("\\n")
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
        return buffer = (buffer + line + "\n");;
      };
    })();
  }));
  return buffer;
});

(sibilant)["translateAll"] = translateAll;
var include = (function(file) {
  // file:required
  return load(file, (function(contents) {
    // contents:required
    return emit(translateAll(contents));
  }));
});

(sibilant)["include"] = include;
(macros)["include"] = (function(file) {
  // file:required
  return include(eval(translate(file)));
});
include((__dirname + "/macros.lisp"))

