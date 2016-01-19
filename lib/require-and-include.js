var sibilize = (function sibilize$(input) {
  /* sibilize /Users/jbr/code/sibilant/src/require-and-include.sibilant:1:0 */

  sibilant.initialize();
  var result = outputFormatter(transpile(restructure(parse(input))));
  return result;
});
var sourcemap = (function sourcemap$(input) {
  /* sourcemap /Users/jbr/code/sibilant/src/require-and-include.sibilant:10:0 */

  sibilant.initialize();
  return sourcemapper(transpile(restructure(parse(input))));
});
sibilant.sibilize = sibilize;
sibilant.version = (function sibilant$version$() {
  /* sibilant.version /Users/jbr/code/sibilant/src/require-and-include.sibilant:16:0 */

  return sibilant.packageInfo().version;
});
sibilant.stripShebang = (function sibilant$stripShebang$(data) {
  /* sibilant.strip-shebang /Users/jbr/code/sibilant/src/require-and-include.sibilant:19:0 */

  return data.replace((new RegExp("^#!.*\\n", undefined)), "\n");
});
sibilant.file = "eval.sibilant";
var withDirAndFile = (function withDirAndFile$(dir, file, fn) {
  /* with-dir-and-file /Users/jbr/code/sibilant/src/require-and-include.sibilant:24:0 */

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
  /* sibilant.sibilize-file /Users/jbr/code/sibilant/src/require-and-include.sibilant:41:0 */

  return outputFormatter(sibilant.transpileFile(fileName));
});
sibilant.sibilizeJson = (function sibilant$sibilizeJson$(fileName) {
  /* sibilant.sibilize-json /Users/jbr/code/sibilant/src/require-and-include.sibilant:46:0 */

  sibilant.initialize();
  var before = sibilant.quoteHashKeys;
  sibilant.quoteHashKeys = true;
  var content = sibilant.sibilizeFile(fileName);
  sibilant.quoteHashKeys = before;
  return content;
});