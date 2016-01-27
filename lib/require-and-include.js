var sibilize = (function sibilize$(input) {
  /* sibilize src/require-and-include.sibilant:1:0 */

  var result = outputFormatter(transpile(restructure(parse(input))));
  return result;
});
var sourcemap = (function sourcemap$(input) {
  /* sourcemap src/require-and-include.sibilant:9:0 */

  return sourcemapper(transpile(restructure(parse(input))));
});
sibilant.sibilize = sibilize;
sibilant.version = (function sibilant$version$() {
  /* sibilant.version src/require-and-include.sibilant:14:0 */

  return sibilant.packageInfo().version;
});
sibilant.stripShebang = (function sibilant$stripShebang$(data) {
  /* sibilant.strip-shebang src/require-and-include.sibilant:17:0 */

  return data.replace((new RegExp("^#!.*\\n", undefined)), "\n");
});
sibilant.file = "eval.sibilant";
var withDirAndFile = (function withDirAndFile$(dir, file, fn) {
  /* with-dir-and-file src/require-and-include.sibilant:22:0 */

  var before = {
    dir: sibilant.dir,
    file: sibilant.file
  };
  sibilant.dir = dir;
  sibilant.file = file;
  var retval = fn();
  sibilant.dir = before.dir;
  sibilant.file = before.file;
  return retval;
});
sibilant.sourceCache = {  };
sibilant.sibilizeFile = (function sibilant$sibilizeFile$(fileName) {
  /* sibilant.sibilize-file src/require-and-include.sibilant:39:0 */

  return outputFormatter(sibilant.transpileFile(fileName));
});
sibilant.sibilizeJson = (function sibilant$sibilizeJson$(fileName) {
  /* sibilant.sibilize-json src/require-and-include.sibilant:44:0 */

  var before = sibilant.quoteHashKeys;
  sibilant.quoteHashKeys = true;
  var content = sibilant.sibilizeFile(fileName);
  sibilant.quoteHashKeys = before;
  return content;
});