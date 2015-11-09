chainable($);
(function(root) {
  /* /Users/jbr/code/sibilant/src/browser.sibilant:3:1 */

  var sibilant = {  },
      exports = {  };
  var error = (function error$(str) {
    /* error /Users/jbr/code/sibilant/src/browser.sibilant:3:2 */
  
    throw new Error (str)
  });
  var inspect = (function inspect$(item) {
    /* inspect /Users/jbr/code/sibilant/src/browser.sibilant:3:2 */
  
    return (function() {
      if (item.toSource) {
        return item.toSource();
      } else {
        return item.toString();
      }
    })();
  });
  (root)["sibilant"] = sibilant;
  var bulkMap = (function bulkMap$(arr, fn) {
    /* bulk-map /Users/jbr/code/sibilant/include/functional.sibilant:1:0 */

    var index = 0,
        groupSize = fn.length,
        retArr = [];
    (function() {
      var __returnValue__ = undefined;
      while ((index < arr.length)) {
        __returnValue__ = (function() {
          /* /Users/jbr/code/sibilant/include/functional.sibilant:1:0 */

          retArr.push(fn.apply(this, arr.slice(index, (index + groupSize))));
          return index += groupSize;
        })();
      };
      return __returnValue__;
    })();
    return retArr;
  });
  var inject = (function inject$(start, items, fn) {
    /* inject /Users/jbr/code/sibilant/include/functional.sibilant:13:1 */

    var value = start;
    (function() {
      if (((items) && typeof (items) === "object" && (items).constructor.name === "Array")) {
        return items.forEach((function(item, index) {
          /* /Users/jbr/code/sibilant/include/functional.sibilant:16:5 */

          return value = fn(value, item, index);
        }));
      }
    })();
    return value;
  });
  var map = (function map$(items, fn) {
    /* map /Users/jbr/code/sibilant/include/functional.sibilant:20:1 */

    return inject([], items, (function(collector, item, index) {
      /* /Users/jbr/code/sibilant/include/functional.sibilant:21:3 */

      collector.push(fn(item, index));
      return collector;
    }));
  });
  var select = (function select$(items, fn) {
    /* select /Users/jbr/code/sibilant/include/functional.sibilant:26:1 */

    return inject([], items, (function(collector, item, index) {
      /* /Users/jbr/code/sibilant/include/functional.sibilant:27:3 */

      (function() {
        if (fn(item, index)) {
          return collector.push(item);
        }
      })();
      return collector;
    }));
  });
  var detect = (function detect$(items, fn) {
    /* detect /Users/jbr/code/sibilant/include/functional.sibilant:33:1 */

    var returnItem = undefined,
        index = 0,
        items = (items || []);
    (function() {
      var __returnValue__ = undefined;
      while ((!((items.length === index) || returnItem))) {
        __returnValue__ = (function() {
          /* /Users/jbr/code/sibilant/include/functional.sibilant:33:1 */

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
    /* all? /Users/jbr/code/sibilant/include/functional.sibilant:45:1 */

    return (typeof detect(items, (function(item, index) {
      /* /Users/jbr/code/sibilant/include/functional.sibilant:46:18 */

      return (!fn(item, index));
    })) === 'undefined');
  });
  var none__QUERY = (function none__QUERY$(items, fn) {
    /* none? /Users/jbr/code/sibilant/include/functional.sibilant:48:1 */

    return (typeof detect(items, fn) === 'undefined');
  });
  var any__QUERY = (function any__QUERY$(items, fn) {
    /* any? /Users/jbr/code/sibilant/include/functional.sibilant:51:1 */

    return (typeof detect(items, fn) !== 'undefined');
  });
  var reject = (function reject$(items, fn) {
    /* reject /Users/jbr/code/sibilant/include/functional.sibilant:54:1 */

    var args = [ items, fn ];
    return select(items, (function() {
      /* /Users/jbr/code/sibilant/include/functional.sibilant:56:3 */

      return (!fn.apply(this, arguments));
    }));
  });
  var compact = (function compact$(arr) {
    /* compact /Users/jbr/code/sibilant/include/functional.sibilant:58:1 */

    return select(arr, (function(item) {
      /* /Users/jbr/code/sibilant/include/functional.sibilant:59:6 */

      return ((null !== item) && (false !== item) && (typeof item !== 'undefined'));
    }));
  });
  var interleave = (function interleave$(glue, arr) {
    /* interleave /Users/jbr/code/sibilant/include/functional.sibilant:65:1 */

    return inject([ (arr)[0] ], arr.slice(1), (function(collector, item, index) {
      /* /Users/jbr/code/sibilant/include/functional.sibilant:66:6 */

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
    /* flatten /Users/jbr/code/sibilant/include/functional.sibilant:72:1 */

    var items = Array.prototype.slice.call(arguments, 0);

    return inject([], items, (function(collector, item) {
      /* /Users/jbr/code/sibilant/include/functional.sibilant:73:3 */

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
    /* recurse-map /Users/jbr/code/sibilant/include/functional.sibilant:81:1 */

    return (function() {
      if (((item) && typeof (item) === "object" && (item).constructor.name === "Array")) {
        return map(item, (function(subitem) {
          /* /Users/jbr/code/sibilant/include/functional.sibilant:82:23 */

          return recurseMap(subitem, fn);
        }));
      } else {
        return fn(item);
      }
    })();
  });
  var pluck = (function pluck$(items, attribute) {
    /* pluck /Users/jbr/code/sibilant/include/functional.sibilant:85:1 */

    return map(items, (function(item) {
      /* /Users/jbr/code/sibilant/include/functional.sibilant:86:6 */

      return (item)[attribute];
    }));
  });
  var sibilant = exports,
      util = require("util"),
      path = require("path"),
      fs = require("fs"),
      error = (function(str) {
    /* /Users/jbr/code/sibilant/src/sibilant.sibilant:1:0 */

    throw new Error (str)
  }),
      inspect = util.inspect;
  var log__BANG = (function log__BANG$(args) {
    /* log! /Users/jbr/code/sibilant/src/colors.sibilant:1:0 */

    var args = Array.prototype.slice.call(arguments, 0);

    return inspect__BANG(args).forEach((function(o) {
      /* /Users/jbr/code/sibilant/src/colors.sibilant:2:6 */

      return console.log(o);
    }));
  });
  var inspect__BANG = (function inspect__BANG$(args) {
    /* inspect! /Users/jbr/code/sibilant/src/colors.sibilant:4:1 */

    var args = Array.prototype.slice.call(arguments, 0);

    return args.map((function(arg) {
      /* /Users/jbr/code/sibilant/src/colors.sibilant:5:6 */

      return util.inspect(arg, {
        colors: false,
        depth: 3
      });
    }));
  });
  var color = (function color$(code, items, depth) {
    /* color /Users/jbr/code/sibilant/src/colors.sibilant:7:1 */

    return (code + (items).join("") + "\033[0m");
  });
  var black = (function black$(args) {
    /* black /Users/jbr/code/sibilant/src/colors.sibilant:10:1 */

    var args = Array.prototype.slice.call(arguments, 0);

    return color("\033[0;30m", args);
  });
  var red = (function red$(args) {
    /* red /Users/jbr/code/sibilant/src/colors.sibilant:11:1 */

    var args = Array.prototype.slice.call(arguments, 0);

    return color("\033[0;31m", args);
  });
  var green = (function green$(args) {
    /* green /Users/jbr/code/sibilant/src/colors.sibilant:12:1 */

    var args = Array.prototype.slice.call(arguments, 0);

    return color("\033[0;32m", args);
  });
  var brown = (function brown$(args) {
    /* brown /Users/jbr/code/sibilant/src/colors.sibilant:13:1 */

    var args = Array.prototype.slice.call(arguments, 0);

    return color("\033[0;33m", args);
  });
  var blue = (function blue$(args) {
    /* blue /Users/jbr/code/sibilant/src/colors.sibilant:14:1 */

    var args = Array.prototype.slice.call(arguments, 0);

    return color("\033[0;34m", args);
  });
  var purple = (function purple$(args) {
    /* purple /Users/jbr/code/sibilant/src/colors.sibilant:15:1 */

    var args = Array.prototype.slice.call(arguments, 0);

    return color("\033[0;35m", args);
  });
  var cyan = (function cyan$(args) {
    /* cyan /Users/jbr/code/sibilant/src/colors.sibilant:16:1 */

    var args = Array.prototype.slice.call(arguments, 0);

    return color("\033[0;36m", args);
  });
  var gray = (function gray$(args) {
    /* gray /Users/jbr/code/sibilant/src/colors.sibilant:17:1 */

    var args = Array.prototype.slice.call(arguments, 0);

    return color("\033[0;37m", args);
  });
  var boldGray = (function boldGray$(args) {
    /* bold-gray /Users/jbr/code/sibilant/src/colors.sibilant:18:1 */

    var args = Array.prototype.slice.call(arguments, 0);

    return color("\033[1;30m", args);
  });
  var boldRed = (function boldRed$(args) {
    /* bold-red /Users/jbr/code/sibilant/src/colors.sibilant:19:1 */

    var args = Array.prototype.slice.call(arguments, 0);

    return color("\033[1;31m", args);
  });
  var boldGreen = (function boldGreen$(args) {
    /* bold-green /Users/jbr/code/sibilant/src/colors.sibilant:20:1 */

    var args = Array.prototype.slice.call(arguments, 0);

    return color("\033[1;32m", args);
  });
  var yellow = (function yellow$(args) {
    /* yellow /Users/jbr/code/sibilant/src/colors.sibilant:21:1 */

    var args = Array.prototype.slice.call(arguments, 0);

    return color("\033[1;33m", args);
  });
  var boldBlue = (function boldBlue$(args) {
    /* bold-blue /Users/jbr/code/sibilant/src/colors.sibilant:22:1 */

    var args = Array.prototype.slice.call(arguments, 0);

    return color("\033[1;34m", args);
  });
  var boldPurple = (function boldPurple$(args) {
    /* bold-purple /Users/jbr/code/sibilant/src/colors.sibilant:23:1 */

    var args = Array.prototype.slice.call(arguments, 0);

    return color("\033[1;35m", args);
  });
  var boldCyan = (function boldCyan$(args) {
    /* bold-cyan /Users/jbr/code/sibilant/src/colors.sibilant:24:1 */

    var args = Array.prototype.slice.call(arguments, 0);

    return color("\033[1;36m", args);
  });
  var white = (function white$(args) {
    /* white /Users/jbr/code/sibilant/src/colors.sibilant:25:1 */

    var args = Array.prototype.slice.call(arguments, 0);

    return color("\033[1;37m", args);
  });
  sibilant.prettyPrint = (function sibilant$prettyPrint$(node, color) {
    /* sibilant.pretty-print /Users/jbr/code/sibilant/src/pretty-printer.sibilant:3:1 */

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
        })() + color + red(util.inspect(node)) + util.inspect(node));
      }
    })();
  });
  sibilant.prettyPrint.default = (function sibilant$prettyPrint$default$(node, color) {
    /* sibilant.pretty-print.default /Users/jbr/code/sibilant/src/pretty-printer.sibilant:19:1 */

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
    /* sibilant.pretty-print.root /Users/jbr/code/sibilant/src/pretty-printer.sibilant:29:1 */

    return (map(node.contents, sibilant.prettyPrint)).join("\n");
  });
  sibilant.prettyPrint.output = (function sibilant$prettyPrint$output$(node, color) {
    /* sibilant.pretty-print.output /Users/jbr/code/sibilant/src/pretty-printer.sibilant:32:1 */

    return ((function() {
      if (color) {
        return black("{");
      } else {
        return "";
      }
    })() + (function() {
      if (((node.contents) && typeof (node.contents) === "object" && (node.contents).constructor.name === "Array")) {
        return (map(node.contents, (function(c) {
          /* /Users/jbr/code/sibilant/src/pretty-printer.sibilant:36:24 */

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
    /* sibilant.pretty-print.colorize /Users/jbr/code/sibilant/src/pretty-printer.sibilant:41:1 */

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
  var bulkMap = (function bulkMap$(arr, fn) {
    /* bulk-map /Users/jbr/code/sibilant/include/functional.sibilant:1:0 */

    var index = 0,
        groupSize = fn.length,
        retArr = [];
    (function() {
      var __returnValue__ = undefined;
      while ((index < arr.length)) {
        __returnValue__ = (function() {
          /* /Users/jbr/code/sibilant/include/functional.sibilant:1:0 */

          retArr.push(fn.apply(this, arr.slice(index, (index + groupSize))));
          return index += groupSize;
        })();
      };
      return __returnValue__;
    })();
    return retArr;
  });
  var inject = (function inject$(start, items, fn) {
    /* inject /Users/jbr/code/sibilant/include/functional.sibilant:13:1 */

    var value = start;
    (function() {
      if (((items) && typeof (items) === "object" && (items).constructor.name === "Array")) {
        return items.forEach((function(item, index) {
          /* /Users/jbr/code/sibilant/include/functional.sibilant:16:5 */

          return value = fn(value, item, index);
        }));
      }
    })();
    return value;
  });
  var map = (function map$(items, fn) {
    /* map /Users/jbr/code/sibilant/include/functional.sibilant:20:1 */

    return inject([], items, (function(collector, item, index) {
      /* /Users/jbr/code/sibilant/include/functional.sibilant:21:3 */

      collector.push(fn(item, index));
      return collector;
    }));
  });
  var select = (function select$(items, fn) {
    /* select /Users/jbr/code/sibilant/include/functional.sibilant:26:1 */

    return inject([], items, (function(collector, item, index) {
      /* /Users/jbr/code/sibilant/include/functional.sibilant:27:3 */

      (function() {
        if (fn(item, index)) {
          return collector.push(item);
        }
      })();
      return collector;
    }));
  });
  var detect = (function detect$(items, fn) {
    /* detect /Users/jbr/code/sibilant/include/functional.sibilant:33:1 */

    var returnItem = undefined,
        index = 0,
        items = (items || []);
    (function() {
      var __returnValue__ = undefined;
      while ((!((items.length === index) || returnItem))) {
        __returnValue__ = (function() {
          /* /Users/jbr/code/sibilant/include/functional.sibilant:33:1 */

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
    /* all? /Users/jbr/code/sibilant/include/functional.sibilant:45:1 */

    return (typeof detect(items, (function(item, index) {
      /* /Users/jbr/code/sibilant/include/functional.sibilant:46:18 */

      return (!fn(item, index));
    })) === 'undefined');
  });
  var none__QUERY = (function none__QUERY$(items, fn) {
    /* none? /Users/jbr/code/sibilant/include/functional.sibilant:48:1 */

    return (typeof detect(items, fn) === 'undefined');
  });
  var any__QUERY = (function any__QUERY$(items, fn) {
    /* any? /Users/jbr/code/sibilant/include/functional.sibilant:51:1 */

    return (typeof detect(items, fn) !== 'undefined');
  });
  var reject = (function reject$(items, fn) {
    /* reject /Users/jbr/code/sibilant/include/functional.sibilant:54:1 */

    var args = [ items, fn ];
    return select(items, (function() {
      /* /Users/jbr/code/sibilant/include/functional.sibilant:56:3 */

      return (!fn.apply(this, arguments));
    }));
  });
  var compact = (function compact$(arr) {
    /* compact /Users/jbr/code/sibilant/include/functional.sibilant:58:1 */

    return select(arr, (function(item) {
      /* /Users/jbr/code/sibilant/include/functional.sibilant:59:6 */

      return ((null !== item) && (false !== item) && (typeof item !== 'undefined'));
    }));
  });
  var interleave = (function interleave$(glue, arr) {
    /* interleave /Users/jbr/code/sibilant/include/functional.sibilant:65:1 */

    return inject([ (arr)[0] ], arr.slice(1), (function(collector, item, index) {
      /* /Users/jbr/code/sibilant/include/functional.sibilant:66:6 */

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
    /* flatten /Users/jbr/code/sibilant/include/functional.sibilant:72:1 */

    var items = Array.prototype.slice.call(arguments, 0);

    return inject([], items, (function(collector, item) {
      /* /Users/jbr/code/sibilant/include/functional.sibilant:73:3 */

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
    /* recurse-map /Users/jbr/code/sibilant/include/functional.sibilant:81:1 */

    return (function() {
      if (((item) && typeof (item) === "object" && (item).constructor.name === "Array")) {
        return map(item, (function(subitem) {
          /* /Users/jbr/code/sibilant/include/functional.sibilant:82:23 */

          return recurseMap(subitem, fn);
        }));
      } else {
        return fn(item);
      }
    })();
  });
  var pluck = (function pluck$(items, attribute) {
    /* pluck /Users/jbr/code/sibilant/include/functional.sibilant:85:1 */

    return map(items, (function(item) {
      /* /Users/jbr/code/sibilant/include/functional.sibilant:86:6 */

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
    /* /Users/jbr/code/sibilant/src/parser.sibilant:40:23 */

    var r = (new RegExp(("^" + (parser.tokens)[x]), undefined));
    (r)["name"] = x;
    return r;
  }));
  var orderedRegexes = parser.orderedRegexes;
  parser.parse = (function parser$parse$(string, context) {
    /* parser.parse /Users/jbr/code/sibilant/src/parser.sibilant:50:1 */

    var context = (function() {
      if (context) {
        return context;
      } else {
        return {
          position: 0,
          stack: [],
          line: 1,
          lastNewline: 0
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
          /* /Users/jbr/code/sibilant/src/parser.sibilant:50:1 */

          detect(orderedRegexes, (function(r) {
            /* /Users/jbr/code/sibilant/src/parser.sibilant:61:13 */

            match = r.exec(remainingInput);
            regexName = r.name;
            return match;
          }));
          return (function() {
            if (((typeof match !== 'undefined') && (match !== null))) {
              var matchString = (match)[0],
                  length = (matchString)["length"],
                  nextPosition = (context.position + length);
              (function() {
                if (("newline" === regexName)) {
                  ((context.line)++);

                  return (context)["lastNewline"] = context.position;
                }
              })();
              (function() {
                if ((("string" === regexName) && (-1 !== matchString.indexOf("\n")))) {
                  var stringNewlineCount = ((matchString.split("\n"))["length"] - 1);
                  context.line += stringNewlineCount;

                  return (context)["lastNewline"] = (context.position + matchString.lastIndexOf("\n"));
                }
              })();
              context.stack.push({
                contents: [],
                modifiers: [],
                dir: sibilant.dir,
                file: sibilant.file,
                token: matchString,
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
  var restructure = (function restructure$(input) {
    /* restructure /Users/jbr/code/sibilant/src/restructurer.sibilant:7:1 */

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
      /* /Users/jbr/code/sibilant/src/restructurer.sibilant:9:6 */

      var restructurer = ((restructurers)[token.type] || restructurers.default);
      return restructurer(token, context, index);
    }));
    return output;
  });
  (sibilant)["restructure"] = restructure;
  restructurers.openExpression = (function restructurers$openExpression$(token, context, index) {
    /* restructurers.open-expression /Users/jbr/code/sibilant/src/restructurer.sibilant:17:1 */

    var first = (context.parseStack)[0];
    (token)["contents"] = [];
    (token)["type"] = (bracketTypes)[token.token];
    (token)["parent"] = first;
    first.contents.push(token);
    context.parseStack.unshift(token);
    return context;
  });
  var codeContext = (function codeContext$(node, context) {
    /* code-context /Users/jbr/code/sibilant/src/restructurer.sibilant:26:1 */

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
              /* /Users/jbr/code/sibilant/src/restructurer.sibilant:30:10 */

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
    /* restructurers.close-expression /Users/jbr/code/sibilant/src/restructurer.sibilant:46:1 */

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
    /* restructurers.hat /Users/jbr/code/sibilant/src/restructurer.sibilant:62:1 */

    var nextNode = (context.input)[(1 + index)];
    nextNode.modifiers.push(node);
    return context;
  });
  restructurers.dots = (function restructurers$dots$(node, context, index) {
    /* restructurers.dots /Users/jbr/code/sibilant/src/restructurer.sibilant:67:1 */

    var nextNode = (context.input)[(1 + index)];
    nextNode.modifiers.push(node);
    return context;
  });
  restructurers.tick = (function restructurers$tick$(node, context, index) {
    /* restructurers.tick /Users/jbr/code/sibilant/src/restructurer.sibilant:72:1 */

    var nextNode = (context.input)[(1 + index)];
    nextNode.modifiers.push(node);
    return context;
  });
  restructurers.at = (function restructurers$at$(node, context, index) {
    /* restructurers.at /Users/jbr/code/sibilant/src/restructurer.sibilant:76:1 */

    var nextNode = (context.input)[(1 + index)];
    nextNode.modifiers.push(node);
    return context;
  });
  restructurers.whitespace = (function restructurers$whitespace$(token, context, index) {
    /* restructurers.whitespace */

    return context;
  });
  restructurers.newline = (function restructurers$newline$(token, context, index) {
    /* restructurers.newline */

    return context;
  });
  restructurers.ignored = (function restructurers$ignored$(token, context, index) {
    /* restructurers.ignored */

    return context;
  });
  restructurers.default = (function restructurers$default$(token, context, index) {
    /* restructurers.default /Users/jbr/code/sibilant/src/restructurer.sibilant:85:1 */

    ((context.parseStack)[0])["contents"].push(token);
    return context;
  });
  var recurseIndent = (function recurseIndent$(args) {
    /* recurse-indent /Users/jbr/code/sibilant/src/sibilant.sibilant:15:1 */

    var args = Array.prototype.slice.call(arguments, 0);

    return map(args, (function(arg) {
      /* /Users/jbr/code/sibilant/src/sibilant.sibilant:16:6 */

      return (function() {
        if (node__QUERY(arg)) {
          return recurseIndent(arg.contents);
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
    /* indent /Users/jbr/code/sibilant/src/sibilant.sibilant:28:1 */

    var args = Array.prototype.slice.call(arguments, 0);

    return [ "\n  ", recurseIndent(args), "\n" ];
  });
  var ast = (function ast$(input, parent) {
    /* ast /Users/jbr/code/sibilant/src/sibilant.sibilant:31:1 */

    return restructure(parse(input), parent);
  });
  var macros = {  };
  (sibilant)["macros"] = macros;
  var escapeRegex = (function escapeRegex$(string) {
    /* escape-regex /Users/jbr/code/sibilant/src/macros.sibilant:4:1 */

    return string.replace((new RegExp("[\\-\\[\\]\\/\\{\\}\\(\\)\\*\\+\\?\\.\\\\\^\\$\\|]", "g")), "\\$&");
  });
  macros.return = (function macros$return$(token) {
    /* ^return /Users/jbr/code/sibilant/src/macros.sibilant:7:1 */

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
              if ((token.length < 3)) {
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
              if ((token.length < 5)) {
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
    /* ^list /Users/jbr/code/sibilant/src/macros.sibilant:44:1 */

    var args = Array.prototype.slice.call(arguments, 0);

    return [ "[ ", interleave(", ", map(args, transpile)), " ]" ];
  });
  var statement__QUERY = (function statement__QUERY$(transpiled) {
    /* statement? /Users/jbr/code/sibilant/src/macros.sibilant:46:1 */

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
    /* as-statement /Users/jbr/code/sibilant/src/macros.sibilant:52:1 */

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
    /* ^do /Users/jbr/code/sibilant/src/macros.sibilant:59:1 */

    var body = Array.prototype.slice.call(arguments, 0);

    return (function() {
      if ((1 === body.length)) {
        return macros.return((body)[0]);
      } else if (body.length) {
        return [ interleave("\n", map(body.slice(0, -1), (function(node) {
          /* /Users/jbr/code/sibilant/src/macros.sibilant:61:41 */

          return asStatement(transpile(node));
        }))), "\n", macros.return((body.slice(-1))[0]) ];
      } else {
        return "";
      }
    })();
  });
  macros.emptyList = (function macros$emptyList$() {
    /* ^empty-list */

    return "null";
  });
  macros.call = (function macros$call$(fnName, args) {
    /* ^call /Users/jbr/code/sibilant/src/macros.sibilant:68:1 */

    var args = Array.prototype.slice.call(arguments, 1);

    return [ transpile(fnName), "(", interleave(", ", map(args, transpile)), ")" ];
  });
  macros.def = (function macros$def$(fnName, args, body) {
    /* ^def /Users/jbr/code/sibilant/src/macros.sibilant:72:1 */

    var body = Array.prototype.slice.call(arguments, 2);

    var fnNameTr = transpile(fnName);
    return asStatement([ (function() {
      if (outputFormatter(fnNameTr).match((new RegExp("\\.", undefined)))) {
        return "";
      } else {
        return "var ";
      }
    })(), fnNameTr, " = ", macros.lambda.apply(this, [ {
      name: fnName,
      args: args
    } ].concat(body)) ]);
  });
  macros.macro = (function macros$macro$(name, args, body) {
    /* ^macro /Users/jbr/code/sibilant/src/macros.sibilant:80:1 */

    var body = Array.prototype.slice.call(arguments, 2);

    var nameTr = outputFormatter(transpile(name)),
        options = {
      name: name,
      args: args
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
    /* ^concat /Users/jbr/code/sibilant/src/macros.sibilant:93:1 */

    var args = Array.prototype.slice.call(arguments, 0);

    return [ "(", interleave(" + ", map(args, transpile)), ")" ];
  });
  macros.reverse = (function macros$reverse$(arr) {
    /* ^reverse /Users/jbr/code/sibilant/src/macros.sibilant:96:1 */

    var reversed = [];
    arr.forEach((function(item) {
      /* /Users/jbr/code/sibilant/src/macros.sibilant:98:6 */

      return reversed.unshift(item);
    }));
    return reversed;
  });
  var reverse = macros.reverse;
  macros.lambda = (function macros$lambda$(argsOrOptions, body) {
    /* ^lambda /Users/jbr/code/sibilant/src/macros.sibilant:103:1 */

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
      /* /Users/jbr/code/sibilant/src/macros.sibilant:111:16 */

      return (function() {
        if (arg.modifiers) {
          var mod = (arg.modifiers)[0];
          return (mod && ("..." === mod.token));
        }
      })();
    }));
    var thisNode = this,
        node = detect(map([ thisNode, argsOrOptions.name, args, (body)[0] ], (function(n) {
      /* /Users/jbr/code/sibilant/src/macros.sibilant:119:17 */

      return (function() {
        if (n) {
          return n.parent;
        } else {
          return n;
        }
      })();
    })), (function(n) {
      /* /Users/jbr/code/sibilant/src/macros.sibilant:118:16 */

      return (n && (n)["file"]);
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
    /* ^hash /Users/jbr/code/sibilant/src/macros.sibilant:139:1 */

    var pairs = Array.prototype.slice.call(arguments, 0);

    (function() {
      if ((0 !== (pairs.length % 2))) {
        return error(("odd number of key-value pairs in hash: " + inspect(pairs)));
      }
    })();
    var quoteKeys = macros.hash.quoteKeys,
        pairStrings = bulkMap(pairs, (function(key, value) {
      /* /Users/jbr/code/sibilant/src/macros.sibilant:145:24 */

      return [ (function() {
        if (quoteKeys) {
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
    /* qescape /Users/jbr/code/sibilant/src/macros.sibilant:156:1 */

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
    /* ^quote /Users/jbr/code/sibilant/src/macros.sibilant:170:1 */

    return (function() {
      if (typeof(content) === "string") {
        return ("\"" + qescape(content) + "\"");
      } else {
        return [ "[\"", qescape(transpile(content)), "\"]" ];
      }
    })();
  });
  macros.unquote = (function macros$unquote$(content) {
    /* ^unquote /Users/jbr/code/sibilant/src/macros.sibilant:176:1 */

    return {
      type: "output",
      contents: [ "\", ", transpile(content), ", \"" ],
      unquote: true
    };
  });
  macros.debug = (function macros$debug$(val) {
    /* ^debug /Users/jbr/code/sibilant/src/macros.sibilant:179:1 */

    (sibilant)["debug"] = eval(outputFormatter(transpile(val)));
    return null;
  });
  var node__QUERY = (function node__QUERY$(thing) {
    /* node? /Users/jbr/code/sibilant/src/transpiler.sibilant:3:1 */

    return (((typeof thing !== 'undefined') && (thing !== null)) && ("object" === typeof thing) && typeof(thing.type) === "string" && thing.hasOwnProperty("contents"));
  });
  var emptyNode__QUERY = (function emptyNode__QUERY$(item) {
    /* empty-node? /Users/jbr/code/sibilant/src/transpiler.sibilant:10:1 */

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
  var notUsed = (function notUsed$(item) {
    /* not-used */

  });
  var compactNode = (function compactNode$(item) {
    /* compact-node /Users/jbr/code/sibilant/src/transpiler.sibilant:20:1 */

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
    /* recurse-transpile /Users/jbr/code/sibilant/src/transpiler.sibilant:29:1 */

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
    /* transpile /Users/jbr/code/sibilant/src/transpiler.sibilant:37:1 */

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
          /* /Users/jbr/code/sibilant/src/transpiler.sibilant:48:26 */

          var readerMacro = (readerMacros)[modifier.type],
              previousTranspiler = transpiler;
          (function() {
            if ((typeof readerMacro === 'undefined')) {
              return console.log("NO READER MACRO", modifier.type);
            }
          })();
          return transpiler = (function(node) {
            /* /Users/jbr/code/sibilant/src/transpiler.sibilant:52:32 */

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
        (resultNode)["source"] = node;
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
    /* reader-macros.hat /Users/jbr/code/sibilant/src/transpiler.sibilant:68:1 */

    return ("macros." + transpiler(node));
  });
  readerMacros.tick = (function readerMacros$tick$(node, transpiler) {
    /* reader-macros.tick /Users/jbr/code/sibilant/src/transpiler.sibilant:69:1 */

    return macros.quote(transpiler(node));
  });
  readerMacros.at = (function readerMacros$at$(node, transpiler) {
    /* reader-macros.at /Users/jbr/code/sibilant/src/transpiler.sibilant:71:1 */

    return macros.unquote(transpiler(node));
  });
  readerMacros.dots = (function readerMacros$dots$(node, transpiler) {
    /* reader-macros.dots /Users/jbr/code/sibilant/src/transpiler.sibilant:73:1 */

    return transpiler(node);
  });
  transpile.default = (function transpile$default$(node) {
    /* transpile.default */

    return node.token;
  });
  transpile.output = (function transpile$output$(node) {
    /* transpile.output */

    return node;
  });
  transpile.number = (function transpile$number$(node) {
    /* transpile.number /Users/jbr/code/sibilant/src/transpiler.sibilant:82:1 */

    return parseFloat(node.token.replace((new RegExp(",", "g")), "")).toString();
  });
  transpile.root = (function transpile$root$(node) {
    /* transpile.root /Users/jbr/code/sibilant/src/transpiler.sibilant:85:1 */

    return (function() {
      if ((1 === node.contents.length)) {
        return transpile((node.contents)[0]);
      } else {
        return interleave("\n", compact(map(node.contents, asStatement)));
      }
    })();
  });
  transpile.expression = (function transpile$expression$(node, preprocessor) {
    /* transpile.expression /Users/jbr/code/sibilant/src/transpiler.sibilant:90:1 */

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
    /* transpile.bracket /Users/jbr/code/sibilant/src/transpiler.sibilant:109:1 */

    return macros.list.apply(this, node.contents);
  });
  transpile.brace = (function transpile$brace$(node) {
    /* transpile.brace /Users/jbr/code/sibilant/src/transpiler.sibilant:111:1 */

    return macros.hash.apply(this, node.contents);
  });
  transpile.literal = (function transpile$literal$(node) {
    /* transpile.literal /Users/jbr/code/sibilant/src/transpiler.sibilant:113:1 */

    var string = node.token;
    return inject(string.replace((new RegExp("\\*", "g")), "_")
      .replace((new RegExp("\\?$", undefined)), "__QUERY")
      .replace((new RegExp("!$", undefined)), "__BANG"), string.match((new RegExp("-(.)", "g"))), (function(returnString, match) {
      /* /Users/jbr/code/sibilant/src/transpiler.sibilant:115:6 */

      return returnString.replace(match, (match)[1].toUpperCase());
    }));
  });
  transpile.string = (function transpile$string$(node) {
    /* transpile.string /Users/jbr/code/sibilant/src/transpiler.sibilant:124:1 */

    return node.token.split("\n")
      .join("\\n\" +\n\"");
  });
  transpile.comment = (function transpile$comment$(node) {
    /* transpile.comment */

    return null;
  });
  sibilant.initialize = (function sibilant$initialize$() {
    /* sibilant.initialize /Users/jbr/code/sibilant/src/sibilant.sibilant:35:1 */

    return (function() {
      if ((!sibilant.macros._loaded__QUERY)) {
        (sibilant.macros)["_loaded__QUERY"] = true;
        return sibilant.include(path.normalize((__dirname + "/../include/macros")));
      }
    })();
  });
  var sibilize = (function sibilize$(input) {
    /* sibilize /Users/jbr/code/sibilant/src/sibilant.sibilant:40:1 */

    sibilant.initialize();
    return outputFormatter(transpile(restructure(parse(input))));
  });
  (sibilant)["sibilize"] = sibilize;
  sibilant.version = (function sibilant$version$() {
    /* sibilant.version /Users/jbr/code/sibilant/src/sibilant.sibilant:46:1 */

    return (sibilant.packageInfo())["version"];
  });
  sibilant.packageInfo = (function sibilant$packageInfo$() {
    /* sibilant.package-info /Users/jbr/code/sibilant/src/sibilant.sibilant:49:1 */

    var fs = require("fs");
    return JSON.parse(fs.readFileSync((__dirname + "/../package.json")));
  });
  sibilant.versionString = (function sibilant$versionString$() {
    /* sibilant.version-string /Users/jbr/code/sibilant/src/sibilant.sibilant:54:1 */

    var package = sibilant.packageInfo(),
        path = require("path");
    return (package.name + " version " + package.version + "\n(at " + path.join(__dirname, "..") + ")");
  });
  sibilant.stripShebang = (function sibilant$stripShebang$(data) {
    /* sibilant.strip-shebang /Users/jbr/code/sibilant/src/sibilant.sibilant:60:1 */

    return data.replace((new RegExp("^#!.*\\n", undefined)), "\n");
  });
  (sibilant)["file"] = "eval.sibilant";
  (sibilant)["dir"] = process.cwd();
  (require.extensions)[".sibilant"] = (function(module, filename) {
    /* /Users/jbr/code/sibilant/src/sibilant.sibilant:67:1 */

    var content = sibilant.sibilizeFile(filename);
    return module._compile(content, filename);
  });
  (require.extensions)[".son"] = (function(module, filename) {
    /* /Users/jbr/code/sibilant/src/sibilant.sibilant:72:1 */

    var content = sibilant.sibilizeJson(filename);

    return (module)["exports"] = JSON.parse(content);
  });
  sibilant.include = (function sibilant$include$(file) {
    /* sibilant.include /Users/jbr/code/sibilant/src/sibilant.sibilant:78:1 */

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
  var withDirAndFile = (function withDirAndFile$(dir, file, fn) {
    /* with-dir-and-file /Users/jbr/code/sibilant/src/sibilant.sibilant:91:1 */

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
  sibilant.sibilizeFile = (function sibilant$sibilizeFile$(fileName) {
    /* sibilant.sibilize-file /Users/jbr/code/sibilant/src/sibilant.sibilant:106:1 */

    return withDirAndFile(path.dirname(fileName), fileName, (function() {
      /* /Users/jbr/code/sibilant/src/sibilant.sibilant:107:6 */

      return sibilize(sibilant.stripShebang(fs.readFileSync(fileName, "utf8")));
    }));
  });
  sibilant.sibilizeJson = (function sibilant$sibilizeJson$(fileName) {
    /* sibilant.sibilize-json /Users/jbr/code/sibilant/src/sibilant.sibilant:113:1 */

    sibilant.initialize();
    var before = sibilant.macros.hash.quoteKeys;
    (sibilant.macros.hash)["quoteKeys"] = true;
    var content = sibilant.sibilizeFile(fileName);
    (sibilant.macros.hash)["quoteKeys"] = before;
    return content;
  });
  sibilant.macros.include = (function sibilant$macros$include$(file) {
    /* sibilant.macros.include /Users/jbr/code/sibilant/src/sibilant.sibilant:121:1 */

    return sibilant.include(eval(outputFormatter(transpile(file))));
  });
  return (function() {
    if ((typeof $ !== 'undefined')) {
      return $((function() {
        /* /Users/jbr/code/sibilant/src/browser.sibilant:11:5 */
      
        var sibilant = root.sibilant,
            scripts = [];
        var evalCode = (function evalCode$(js) {
          /* eval-code /Users/jbr/code/sibilant/src/browser.sibilant:11:8 */
        
          return (new Function(js))();
        });
        sibilant.scriptLoaded = (function sibilant$scriptLoaded$() {
          /* sibilant.script-loaded /Users/jbr/code/sibilant/src/browser.sibilant:11:8 */
        
          var lisp = null,
              js = null;
          return (function() {
            if ((!sibilant.loadNextScript())) {
              return $("script[type=\"text/sibilant\"]:not([src])", .forEach((function(#>, lisp = $(this, text(), replace(/(^\s*\/\/\<!\[CDATA\[)|(\/\/\]\]>\s*$)/g, ""));
              js = sibilant.translateAll(lisp);, $(this, data("js", js)), evalCode(js)) {
                
              })));
            }
          })();
        });
        scripts = $.makeArray($("script[type=\"text/sibilant\"][src]", map((function() {
          /* /Users/jbr/code/sibilant/src/browser.sibilant:34:36 */
        
          return this.src;
        }))));
        sibilant.loadNextScript = (function sibilant$loadNextScript$() {
          /* sibilant.load-next-script /Users/jbr/code/sibilant/src/browser.sibilant:11:8 */
        
          var nextScript = scripts.shift();
          return (function() {
            if ((typeof nextScript !== 'undefined')) {
              $.get(nextScript, (function(data) {
                /* /Users/jbr/code/sibilant/src/browser.sibilant:39:15 */
              
                evalCode(sibilant.translateAll(data));
                return sibilant.scriptLoaded();
              }));
              return true;
            }
          })();
        });
        return sibilant.loadNextScript();
      }));
    }
  })();
})(this);