var sibilant = require("../lib/sibilant.js"),
    path = require("path"),
    options = require("../lib/options.js"),
    fs = require("fs"),
    mod = require("module");
var runInSandbox = (function runInSandbox$(js, inputPath) {
  /* run-in-sandbox /Users/jbr/code/sibilant/src/cli.sibilant:7:0 */

  (function() {
    if ((typeof inputPath === 'undefined')) {
      return inputPath = ".";
    }
  })();
  (require.main)["moduleCache"] = {  };
  (require.main)["filename"] = fs.realpathSync(inputPath);
  (require.main)["paths"] = mod._nodeModulePaths(path.dirname(fs.realpathSync(inputPath)));
  return require.main._compile(js, require.main.filename);
});
var cli = {
  v: "version",
  h: "help",
  unhandled: "help",
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
  /* cli.version /Users/jbr/code/sibilant/src/cli.sibilant:33:0 */

  return console.log(sibilant.versionString());
});
cli.repl = (function cli$repl$(args) {
  /* cli.repl /Users/jbr/code/sibilant/src/cli.sibilant:36:0 */

  return require("../lib/repl");
});
var readStdin = (function readStdin$(fn) {
  /* read-stdin /Users/jbr/code/sibilant/src/cli.sibilant:38:0 */

  var stdin = process.stdin,
      data = "";
  stdin.resume();
  stdin.setEncoding("utf8");
  stdin.on("data", (function(chunk) {
    /* /Users/jbr/code/sibilant/src/cli.sibilant:43:21 */
  
    return data = (data + chunk);
  }));
  return stdin.on("end", (function() {
    /* /Users/jbr/code/sibilant/src/cli.sibilant:44:20 */
  
    return fn(data);
  }));
});
cli.eval = (function cli$eval$(args, options) {
  /* cli.eval /Users/jbr/code/sibilant/src/cli.sibilant:46:0 */

  (options)["execute"] = true;
  return cli.input(args, options);
});
cli.input = (function cli$input$(args, options) {
  /* cli.input /Users/jbr/code/sibilant/src/cli.sibilant:50:0 */

  var process = (function process$(sibilantCode) {
    /* process /Users/jbr/code/sibilant/src/cli.sibilant:51:5 */
  
    var jsCode = sibilant.sibilize(sibilantCode);
    return (function() {
      if (options.execute) {
        return runInSandbox(jsCode);
      } else {
        return console.log(jsCode);
      }
    })();
  });
  return (function() {
    if (((args).length === 0)) {
      return readStdin(process);
    } else {
      return process((args)[0]);
    }
  })();
});
cli.help = (function cli$help$(args, options) {
  /* cli.help /Users/jbr/code/sibilant/src/cli.sibilant:60:0 */

  return fs.readFile((__dirname + "/../cli-help"), { encoding: "utf8" }, (function(err, data) {
    /* /Users/jbr/code/sibilant/src/cli.sibilant:62:19 */
  
    (function() {
      if (err) {
        throw new Error (err)
      }
    })();
    return console.log(data);
  }));
});
var cliOptions = options(cli),
    args = (cliOptions.afterBreak || []);
args.unshift((process.argv)[1], "FILENAME");
(process)["argv"] = args;
(process)["ARGV"] = args;
(function() {
  if (((Object.keys(cliOptions)).length === 0)) {
    return cli.repl();
  }
})();
var outputDir = (function() {
  if (cliOptions.output) {
    return (cliOptions.output)[0];
  }
})();
(cliOptions.file || []).forEach((function(inputFile) {
  /* /Users/jbr/code/sibilant/src/cli.sibilant:78:0 */

  var inputPath = path.join(process.cwd(), inputFile),
      inputExtname = path.extname(inputPath),
      translated = (function() {
    if ((".son" === inputExtname)) {
      return sibilant.sibilizeJson(inputPath);
    } else {
      return sibilant.sibilizeFile(inputPath);
    }
  })();
  return (function() {
    if (outputDir) {
      var outputExtname = (function() {
        if ((".son" === inputExtname)) {
          return ".json";
        } else {
          return ".js";
        }
      })(),
          inputBasename = path.basename(inputPath, inputExtname),
          outputPath = (path.join(outputDir, inputBasename) + outputExtname);
      fs.writeFile(outputPath, translated);
      return (function() {
        if (cliOptions.sourcemap) {
          
          var mapPath = (path.join(outputDir, inputBasename) + ".map");
          return fs.writeFile(mapPath, sibilant.sourcemapFile(inputPath));
        }
      })();
    } else if (cliOptions.execute) {
      return runInSandbox(translated, inputPath);
    } else {
      return console.log(translated);
    }
  })();
}));