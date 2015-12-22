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
        /* /Users/jbr/code/sibilant/include/macros.sibilant:620:30 */
      
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
      return red(util.inspect(node));
    } else {
      return realNewlines(util.inspect(node));
    }
  }).call(this));
});
var prettify = sibilant.prettyPrint;
sibilant.prettyPrint.default = (function sibilant$prettyPrint$default$(node, color, entry) {
  /* sibilant.pretty-print.default /Users/jbr/code/sibilant/src/pretty-printer.sibilant:23:0 */

  return realNewlines(sibilant.prettyPrint.colorize(node, color, ((function() {
    if ((!(entry) && node.precedingIgnored && node.precedingIgnored.length)) {
      return map(node.precedingIgnored, (function() {
        /* /Users/jbr/code/sibilant/include/macros.sibilant:620:30 */
      
        return prettify(arguments[0], color, false);
      })).join("");
    } else {
      return "";
    }
  }).call(this) + (function() {
    if ((node.modifiers && node.modifiers.length)) {
      return map(node.modifiers, (function() {
        /* /Users/jbr/code/sibilant/include/macros.sibilant:620:30 */
      
        return prettify(arguments[0], color, false);
      })).join("");
    } else {
      return "";
    }
  }).call(this) + node.token + (function() {
    if ((node.contents && node.contents.length)) {
      return map(node.contents, (function() {
        /* /Users/jbr/code/sibilant/include/macros.sibilant:620:30 */
      
        return prettify(arguments[0], color, false);
      })).join("");
    } else {
      return "";
    }
  }).call(this) + (function() {
    if ((node.closingIgnored && node.closingIgnored.length)) {
      return map(node.closingIgnored, (function() {
        /* /Users/jbr/code/sibilant/include/macros.sibilant:620:30 */
      
        return prettify(arguments[0], color, false);
      })).join("");
    } else {
      return "";
    }
  }).call(this) + ((node.closed && acceptablePairs[node.token]) || ""))));
});
sibilant.prettyPrint.root = (function sibilant$prettyPrint$root$(node, color, entry) {
  /* sibilant.pretty-print.root /Users/jbr/code/sibilant/src/pretty-printer.sibilant:47:0 */

  return map(node.contents, (function() {
    /* /Users/jbr/code/sibilant/include/macros.sibilant:620:30 */
  
    return prettify(arguments[0], color, false);
  })).join("\n");
});
sibilant.prettyPrint.output = (function sibilant$prettyPrint$output$(node, color) {
  /* sibilant.pretty-print.output /Users/jbr/code/sibilant/src/pretty-printer.sibilant:52:0 */

  return ((function() {
    if (color) {
      return black("{");
    } else {
      return "";
    }
  }).call(this) + (function() {
    if (((node.contents) && typeof (node.contents) === "object" && (node.contents).constructor.name === "Array")) {
      return map(node.contents, (function() {
        /* /Users/jbr/code/sibilant/src/pretty-printer.sibilant:56:28 */
      
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
  /* real-newlines /Users/jbr/code/sibilant/src/pretty-printer.sibilant:62:0 */

  return node.split("\\n")
    .join("\n");
});
sibilant.prettyPrint.colorize = (function sibilant$prettyPrint$colorize$(node, color, string) {
  /* sibilant.pretty-print.colorize /Users/jbr/code/sibilant/src/pretty-printer.sibilant:66:0 */

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