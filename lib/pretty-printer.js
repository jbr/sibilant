var green = (function green$(args) {
  /* green /Users/jbr/code/sibilant/src/colors.sibilant:2:1 */

  var args = Array.prototype.slice.call(arguments, 0);

  return ("\033[32m" + (args).join("") + "\033[0m");
});
var red = (function red$(args) {
  /* red /Users/jbr/code/sibilant/src/colors.sibilant:5:1 */

  var args = Array.prototype.slice.call(arguments, 0);

  return ("\033[31m" + (args).join("") + "\033[0m");
});
var yellow = (function yellow$(args) {
  /* yellow /Users/jbr/code/sibilant/src/colors.sibilant:8:1 */

  var args = Array.prototype.slice.call(arguments, 0);

  return ("\033[33m" + (args).join("") + "\033[0m");
});
sibilant.prettyPrint = (function sibilant$prettyPrint$(node, color) {
  /* sibilant.pretty-print /Users/jbr/code/sibilant/src/pretty-printer.sibilant:3:1 */

  var color = (function() {
    if ((typeof color !== 'undefined')) {
      return color;
    } else {
      return true;
    }
  })();
  var prettyPrinter = ((sibilant.prettyPrint)[node.type] || sibilant.prettyPrint.default);
  return prettyPrinter(node, color);
});
sibilant.prettyPrint.default = (function sibilant$prettyPrint$default$(node, color) {
  /* sibilant.pretty-print.default /Users/jbr/code/sibilant/src/pretty-printer.sibilant:10:1 */

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
  /* sibilant.pretty-print.root /Users/jbr/code/sibilant/src/pretty-printer.sibilant:20:1 */

  return (map(node.contents, sibilant.prettyPrint)).join("\n");
});
sibilant.prettyPrint.colorize = (function sibilant$prettyPrint$colorize$(node, color, string) {
  /* sibilant.pretty-print.colorize /Users/jbr/code/sibilant/src/pretty-printer.sibilant:23:1 */

  return (function() {
    if ((color && (node.hint === "macro"))) {
      return yellow(string);
    } else {
      return string;
    }
  })();
});