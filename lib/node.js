var util = require("util"),
    path = require("path"),
    fs = require("fs");
var sibilant = (function(args) {
  /* src/node.sibilant:3:14 */

  var args = Array.prototype.slice.call(arguments, 0);

  return sibilant.entry.apply(this, args);
}),
    error = (function(str) {
  /* src/node.sibilant:4:14 */

  throw str
}),
    inspect = util.inspect;
module.exports = sibilant;
sibilant.dir = process.cwd();
sibilant.dependencies = {  };
var relativeDirAndFile = (function relativeDirAndFile$(fileName) {
  /* relative-dir-and-file src/node.sibilant:12:0 */

  return [ path.dirname(fileName), fileName ].map((function() {
    /* src/node.sibilant:14:15 */
  
    return path.relative(process.cwd(), arguments[0]);
  }));
});
sibilant.recordDependency = (function sibilant$recordDependency$(from, to) {
  /* sibilant.record-dependency src/node.sibilant:16:0 */

  sibilant.dependencies[from] = (typeof sibilant.dependencies[from] !== "undefined") ? sibilant.dependencies[from] : [];
  return sibilant.dependencies[from].push(to);
});
sibilant.flatDependencies = (function sibilant$flatDependencies$() {
  /* sibilant.flat-dependencies src/node.sibilant:22:0 */

  return flatten(values(sibilant.dependencies));
});
sibilant.entry = (function sibilant$entry$(source, options) {
  /* sibilant.entry src/node.sibilant:28:0 */

  (function() {
    if (("object" === typeof source && source !== null && source.constructor.name !== "Array")) {
      options = source;
      return source = undefined;
    }
  }).call(this);
  options = (typeof options !== "undefined") ? options : {  };
  (function() {
    if (typeof source === "string") {
      return options.source = source;
    }
  }).call(this);
  var map = options.map,
      source = options.source,
      file = options.file,
      quoteKeys = options.quoteKeys,
      json = options.json;
  map = (typeof map !== "undefined") ? map : false;
  quoteKeys = (typeof quoteKeys !== "undefined") ? quoteKeys : json;
  (function() {
    if (((typeof file !== "undefined" && file !== null) && !((typeof source !== "undefined" && source !== null)))) {
      return source = (sibilant.sourceCache[file] || sibilant.stripShebang(fs.readFileSync(file, "utf8")));
    }
  }).call(this);
  (function() {
    if (file) {
      return sibilant.sourceCache[file] = source;
    }
  }).call(this);
  return withFile(file, (function() {
    /* src/node.sibilant:52:7 */
  
    var quoteState = sibilant.quoteHashKeys;
    (function() {
      if (quoteKeys) {
        return sibilant.quoteHashKeys = true;
      }
    }).call(this);
    var ast = restructure(parse(source)),
        output = transpile(ast),
        sourcemap = (function() {
      if (map) {
        return _sourcemapper(output);
      }
    }).call(this),
        js = outputFormatter(output),
        dependencies = sibilant.flatDependencies();
    (function() {
      if (quoteKeys) {
        return sibilant.quoteHashKeys = quoteState;
      }
    }).call(this);
    return {
      ast: ast,
      output: output,
      js: js,
      map: sourcemap,
      dependencies: dependencies
    };
  }));
});
sibilant.transpileFile = (function sibilant$transpileFile$(fileName) {
  /* sibilant.transpile-file src/node.sibilant:72:0 */

  return withFile(fileName, (function() {
    /* src/node.sibilant:75:16 */
  
    var source = sibilant.stripShebang(fs.readFileSync(fileName, "utf8"));
    sibilant.sourceCache[fileName] = source;
    return transpile(restructure(parse(source)));
  }));
});
var withFile = (function withFile$(fileName, fn) {
  /* with-file src/node.sibilant:84:0 */

  return (function() {
    if (fileName) {
      return withDirAndFile.apply(this, relativeDirAndFile(fileName).concat([ (function() {
        /* src/node.sibilant:86:65 */
      
        return fn(fileName);
      }) ]));
    } else {
      return fn();
    }
  }).call(this);
});
sibilant.sourcemapFile = (function sibilant$sourcemapFile$(fileName) {
  /* sibilant.sourcemap-file src/node.sibilant:89:0 */

  return withFile(fileName, (function() {
    /* src/node.sibilant:91:16 */
  
    return sourcemap(sibilant.stripShebang(fs.readFileSync(arguments[0], "utf8")));
  }));
});
require.extensions[".sibilant"] = (function(module, filename) {
  /* src/node.sibilant:98:5 */

  return module._compile(sibilant({ file: filename }).js, filename);
});
require.extensions[".son"] = (function(module, filename) {
  /* src/node.sibilant:104:5 */

  var content = sibilant({
    file: filename,
    json: true
  }).js,
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
  /* sibilant.package-info src/node.sibilant:114:0 */

  return JSON.parse(fs.readFileSync((__dirname + "/../package.json"), "utf8"));
});
sibilant.versionString = (function sibilant$versionString$() {
  /* sibilant.version-string src/node.sibilant:120:0 */

  var package = sibilant.packageInfo();
  return (package.name + " version " + package.version + "\n(at " + path.join(__dirname, "..") + ")");
});
sibilant.include = (function sibilant$include$(file) {
  /* sibilant.include src/node.sibilant:126:0 */

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
  sibilant.recordDependency(sibilant.file, file);
  return sibilant({ file: resolvedFile }).output;
});