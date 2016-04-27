(function() {
  if (!(process.env.DISABLE_SOURCE_MAPS)) {
    return require("source-map-support").install();
  }
}).call(this);
//# sourceMappingURL=../maps/cli.map
;
var path = require("path"),
    fs = require("fs"),
    sibilant = require("../lib/sibilant.js"),
    options = require("../lib/options.js"),
    mod = require("module");
var runInSandbox = (function runInSandbox$(js, inputPath) {
  /* run-in-sandbox src/cli.sibilant:10:0 */

  inputPath = (typeof inputPath !== "undefined") ? inputPath : ".";
  require.main.moduleCache = {  };
  require.main.filename = fs.realpathSync(inputPath);
  require.main.paths = mod._nodeModulePaths(path.dirname(fs.realpathSync(inputPath)));
  return require.main._compile(js, require.main.filename);
});
var cli = {
  v: "version",
  h: "help",
  unhandled: "help",
  d: "docs",
  f: "file",
  o: "output",
  x: "execute",
  e: "eval",
  i: "input",
  m: "sourcemap",
  afterBreak: false,
  execute: false,
  unlabeled: "file"
};
cli.version = (function cli$version$() {
  /* cli.version src/cli.sibilant:33:0 */

  return console.log(sibilant.versionString());
});
cli.repl = (function cli$repl$(args) {
  /* cli.repl src/cli.sibilant:36:0 */

  return require("../lib/repl");
});
var readStdin = (function readStdin$(fn) {
  /* read-stdin src/cli.sibilant:39:0 */

  var stdin = process.stdin,
      data = "";
  stdin.resume();
  stdin.setEncoding("utf8");
  stdin.on("data", (function(chunk) {
    /* src/cli.sibilant:44:21 */
  
    return data = (data + chunk);
  }));
  return stdin.on("end", (function() {
    /* src/cli.sibilant:45:20 */
  
    return fn(data);
  }));
});
cli.eval = (function cli$eval$(args, options) {
  /* cli.eval src/cli.sibilant:47:0 */

  options.execute = true;
  return cli.input(args, options);
});
cli.input = (function cli$input$(args, options) {
  /* cli.input src/cli.sibilant:51:0 */

  var process = (function process$(sibilantCode) {
    /* process src/cli.sibilant:52:5 */
  
    var js = (sibilant(sibilantCode)).js;
    return (function() {
      if (options.execute) {
        return runInSandbox(js);
      } else {
        return console.log(js);
      }
    }).call(this);
  });
  return (function() {
    if (0 === args.length) {
      return readStdin(process);
    } else {
      return process(args[0]);
    }
  }).call(this);
});
cli.help = (function cli$help$(args, options) {
  /* cli.help src/cli.sibilant:61:0 */

  return fs.readFile((__dirname + "/../cli-help"), { encoding: "utf8" }, (function(err, data) {
    /* src/cli.sibilant:63:19 */
  
    (function() {
      if (err) {
        throw err
      }
    }).call(this);
    return console.log(data);
  }));
});
var cliOptions = options(cli),
    args = (cliOptions.afterBreak || []);
args.unshift(process.argv[1], "FILENAME");
process.argv = args;
process.ARGV = args;
(function() {
  if (0 === Object.keys(cliOptions).length) {
    return cli.repl();
  }
}).call(this);
(function() {
  if (((typeof cliOptions.file === "undefined" || 0 === cliOptions.file.length) && cliOptions.docs)) {
    sibilant.include("./src/macros.sibilant");
    return console.log(sibilant.docs[sibilant(cliOptions.docs[0]).js]());
  }
}).call(this);
(cliOptions.file || []).forEach((function(inputFile) {
  /* src/cli.sibilant:87:0 */

  var inputPath = (function() {
    if (inputFile.match((new RegExp("^\\/", undefined)))) {
      return inputFile;
    } else {
      return path.join(process.cwd(), inputFile);
    }
  }).call(this),
      inputExtname = path.extname(inputPath),
      inputBasename = path.basename(inputPath, inputExtname),
      json__QUERY = ".son" === inputExtname,
      map__QUERY = !(!(cliOptions.sourcemap)),
      result = sibilant({
    file: inputPath,
    json: json__QUERY,
    map: map__QUERY
  }),
      outputDir = (function() {
    if (cliOptions.output) {
      return (cliOptions.output[0] || path.dirname(inputPath));
    }
  }).call(this),
      mapDir = (function() {
    if (cliOptions.sourcemap) {
      return (cliOptions.sourcemap[0] || outputDir);
    }
  }).call(this),
      outputExtname = (function() {
    if (json__QUERY) {
      return ".json";
    } else {
      return ".js";
    }
  }).call(this);
  (function() {
    if (outputDir) {
      var outputPath = (path.join(outputDir, inputBasename) + outputExtname);
      fs.writeFile(outputPath, result.js);
      return (function() {
        if (mapDir) {
          var mapPath = (path.join(mapDir, inputBasename) + ".map");
          return fs.writeFile(mapPath, result.map.toString());
        }
      }).call(this);
    } else if (cliOptions.execute) {
      return runInSandbox(result.js, inputPath);
    } else {
      return console.log(result.js);
    }
  }).call(this);
  return (function() {
    if (cliOptions.docs) {
      return console.log(sibilant.docs[cliOptions.docs[0]]());
    }
  }).call(this);
}));