var util = require("util"),
    path = require("path"),
    fs = require("fs");
var sibilant = exports,
    error = (function(str) {
  /* src/node.sibilant:4:14 */

  throw str
}),
    inspect = util.inspect;
sibilant.dir = process.cwd();
var relativeDirAndFile = (function relativeDirAndFile$(fileName) {
  /* relative-dir-and-file src/node.sibilant:9:0 */

  return [ path.dirname(fileName), fileName ].map((function() {
    /* src/node.sibilant:11:15 */
  
    return path.relative(process.cwd(), arguments[0]);
  }));
});
sibilant.transpileFile = (function sibilant$transpileFile$(fileName) {
  /* sibilant.transpile-file src/node.sibilant:14:0 */

  return withFile(fileName, (function() {
    /* src/node.sibilant:16:16 */
  
    var source = sibilant.stripShebang(fs.readFileSync(fileName, "utf8"));
    sibilant.sourceCache[fileName] = source;
    return transpile(restructure(parse(source)));
  }));
});
var withFile = (function withFile$(fileName, fn) {
  /* with-file src/node.sibilant:25:0 */

  return withDirAndFile.apply(this, relativeDirAndFile(fileName).concat([ (function() {
    /* src/node.sibilant:26:61 */
  
    return fn(fileName);
  }) ]));
});
sibilant.sourcemapFile = (function sibilant$sourcemapFile$(fileName) {
  /* sibilant.sourcemap-file src/node.sibilant:28:0 */

  return withFile(fileName, (function() {
    /* src/node.sibilant:30:16 */
  
    return sourcemap(sibilant.stripShebang(fs.readFileSync(arguments[0], "utf8")));
  }));
});
require.extensions[".sibilant"] = (function(module, filename) {
  /* src/node.sibilant:37:5 */

  var content = sibilant.sibilizeFile(filename);
  return module._compile(content, filename);
});
require.extensions[".son"] = (function(module, filename) {
  /* src/node.sibilant:42:5 */

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
  /* sibilant.package-info src/node.sibilant:50:0 */

  return JSON.parse(fs.readFileSync((__dirname + "/../package.json"), "utf8"));
});
sibilant.versionString = (function sibilant$versionString$() {
  /* sibilant.version-string src/node.sibilant:56:0 */

  var package = sibilant.packageInfo();
  return (package.name + " version " + package.version + "\n(at " + path.join(__dirname, "..") + ")");
});
sibilant.include = (function sibilant$include$(file) {
  /* sibilant.include src/node.sibilant:62:0 */

  (function() {
    if (!(file.match((new RegExp("\\.(sibilant|son)$", undefined))))) {
      return file = (file + ".sibilant");
    }
  }).call(this);
  (function() {
    if (file.match((new RegExp("^\\.\\.?/", undefined)))) {
      return file = path.resolve(sibilant.dir, file);
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