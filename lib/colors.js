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