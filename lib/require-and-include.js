var sibilize = (function sibilize$(input) {
  /* sibilize /Users/jbr/code/sibilant/src/require-and-include.sibilant:1:0 */

  sibilant.initialize();
  return outputFormatter(transpile(restructure(parse(input))));
});
var sourcemap = (function sourcemap$(input) {
  /* sourcemap /Users/jbr/code/sibilant/src/require-and-include.sibilant:5:0 */

  sibilant.initialize();
  return sourcemapper(transpile(restructure(parse(input))));
});
sibilant.sibilize = sibilize;
sibilant.version = (function sibilant$version$() {
  /* sibilant.version /Users/jbr/code/sibilant/src/require-and-include.sibilant:11:0 */

  return sibilant.packageInfo().version;
});
sibilant.stripShebang = (function sibilant$stripShebang$(data) {
  /* sibilant.strip-shebang /Users/jbr/code/sibilant/src/require-and-include.sibilant:14:0 */

  return data.replace((new RegExp("^#!.*\\n", undefined)), "\n");
});
sibilant.file = "eval.sibilant";
var withDirAndFile = (function withDirAndFile$(dir, file, fn) {
  /* with-dir-and-file /Users/jbr/code/sibilant/src/require-and-include.sibilant:19:0 */

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
  /* sibilant.sibilize-file /Users/jbr/code/sibilant/src/require-and-include.sibilant:36:0 */

  return outputFormatter(sibilant.transpileFile(fileName));
});
sibilant.sibilizeJson = (function sibilant$sibilizeJson$(fileName) {
  /* sibilant.sibilize-json /Users/jbr/code/sibilant/src/require-and-include.sibilant:39:0 */

  sibilant.initialize();
  var before = sibilant.macros.namespaces.core.hash.quoteKeys;
  sibilant.macros.namespaces.core.hash.quoteKeys = true;
  var content = sibilant.sibilizeFile(fileName);
  sibilant.macros.namespaces.core.hash.quoteKeys = before;
  return content;
});
sibilant.macros.namespaces.core.include = (function sibilant$macros$namespaces$core$include$(file) {
  /* sibilant.macros.namespaces.core.include /Users/jbr/code/sibilant/src/require-and-include.sibilant:47:0 */

  return sibilant.withDefaultSearchPath((function() {
    /* /Users/jbr/code/sibilant/src/require-and-include.sibilant:48:40 */
  
    return sibilant.include(eval(outputFormatter(transpile(file))));
  }));
});