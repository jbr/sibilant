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
  return realNewlines((function() {
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
  })() + ((acceptablePairs)[node.token] || ""))));
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