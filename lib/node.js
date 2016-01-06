var sibilant = exports,
    util = require("util"),
    path = require("path"),
    fs = require("fs"),
    error = (function(str) {
  /* /Users/jbr/code/sibilant/src/node.sibilant:5:14 */

  throw str
}),
    inspect = util.inspect;
sibilant.dir = process.cwd();
sibilant.transpileFile = (function sibilant$transpileFile$(fileName) {
  /* sibilant.transpile-file /Users/jbr/code/sibilant/src/node.sibilant:11:0 */

  return withDirAndFile(path.dirname(fileName), fileName, (function() {
    /* /Users/jbr/code/sibilant/src/node.sibilant:13:24 */
  
    var source = sibilant.stripShebang(fs.readFileSync(fileName, "utf8"));
    sibilant.sourceCache[fileName] = source;
    sibilant.initialize();
    return transpile(restructure(parse(source)));
  }));
});
sibilant.sourcemapFile = (function sibilant$sourcemapFile$(fileName) {
  /* sibilant.sourcemap-file /Users/jbr/code/sibilant/src/node.sibilant:22:0 */

  return withDirAndFile(path.dirname(fileName), fileName, (function() {
    /* /Users/jbr/code/sibilant/src/node.sibilant:24:24 */
  
    return sourcemap(sibilant.stripShebang(fs.readFileSync(fileName, "utf8")));
  }));
});
require.extensions[".sibilant"] = (function(module, filename) {
  /* /Users/jbr/code/sibilant/src/node.sibilant:30:5 */

  var content = sibilant.sibilizeFile(filename);
  return module._compile(content, filename);
});
require.extensions[".son"] = (function(module, filename) {
  /* /Users/jbr/code/sibilant/src/node.sibilant:35:5 */

  var content = sibilant.sibilizeJson(filename),
      json = (function() {
    try {
      return JSON.parse(content);
    } catch (e) {
      console.error("could not parse:\n", content);
      throw e
    }
  }).call(this);
  return module.exports = json;
});
sibilant.packageInfo = (function sibilant$packageInfo$() {
  /* sibilant.package-info /Users/jbr/code/sibilant/src/node.sibilant:42:0 */

  var fs = require("fs");
  return JSON.parse(fs.readFileSync((__dirname + "/../package.json")));
});
sibilant.versionString = (function sibilant$versionString$() {
  /* sibilant.version-string /Users/jbr/code/sibilant/src/node.sibilant:47:0 */

  var package = sibilant.packageInfo(),
      path = require("path");
  return (package.name + " version " + package.version + "\n(at " + path.join(__dirname, "..") + ")");
});
sibilant.initialize = (function sibilant$initialize$() {
  /* sibilant.initialize /Users/jbr/code/sibilant/src/node.sibilant:54:0 */

  return (function() {
    if (!((sibilant.loaded__QUERY || sibilant.loading__QUERY))) {
      sibilant["loading__QUERY"] = true;
      sibilant.loadMacros();
      delete sibilant.loading__QUERY;
      return sibilant["loaded__QUERY"] = true;
    }
  }).call(this);
});
sibilant.loadMacros = (function sibilant$loadMacros$() {
  /* sibilant.load-macros /Users/jbr/code/sibilant/src/node.sibilant:61:0 */

  return sibilant.include(path.normalize((__dirname + "/../include/macros")));
});
sibilant.include = (function sibilant$include$(file) {
  /* sibilant.include /Users/jbr/code/sibilant/src/node.sibilant:65:0 */

  (function() {
    if (!(file.match((new RegExp("\\.(sibilant|son)$", undefined))))) {
      return file = (file + ".sibilant");
    }
  }).call(this);
  (function() {
    if (file.match((new RegExp("^\\.\\.?/", undefined)))) {
      return file = (sibilant.dir + "/" + file);
    }
  }).call(this);
  var resolvedFile = (function() {
    try {
      return require.resolve(file);
    } catch (e) {
      return error(("Failed to resolve file for inclusion: " + file));
    }
  }).call(this);
  return sibilant.transpileFile(resolvedFile);
});