var sibilant = require("./sibilant"),
    path = require("path"),
    options = require("../lib/options"),
    fs = require("fs"),
    vm = require("vm"),
    context = vm.createContext();
var createContext = (function() {
  context.initialized__QUERY = true;
  (module)["filename"] = (process.cwd() + "/exec");
  (context)["module"] = module;
  (context)["require"] = require;
  return (function() {
    for (var key in global) (function() {
      return (context)[key] = (global)[key];
    })();
  })();
});

var runInSandbox = (function(js, inputPath) {
  if (arguments.length < 2)
    var inputPath = undefined;
  
  (function() {
    if ((!context.initialized__QUERY)) {
      return createContext();
    }
  })();
  (function() {
    if (typeof(inputPath) !== 'undefined') {
      (process.argv)[1] = inputPath;
      (context)["__dirname"] = path.dirname(inputPath);
      return (module)["filename"] = inputPath;
    }
  })();
  return vm.runInContext(js, context, "sibilant");
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
  afterBreak: false,
  execute: false,
  unlabeled: "file"
};
cli.version = (function() {
  return console.log(sibilant.versionString());
});

cli.repl = (function(args) {
  return require("../lib/repl");
});

var readStdin = (function(fn) {
  var stdin = process.stdin,
      data = "";
  stdin.resume();
  stdin.setEncoding("utf8");
  stdin.on("data", (function(chunk) {
    return data = (data + chunk);
  }));
  return stdin.on("end", (function() {
    return fn(data);
  }));
});

cli.eval = (function(args, options) {
  (options)["execute"] = true;
  return cli.input(args, options);
});

cli.input = (function(args, options) {
  var process = (function(sibilantCode) {
    var jsCode = sibilant.translateAll(sibilantCode);
    return (function() {
      if (options.execute) {
        return runInSandbox(jsCode);
      } else {
        return console.log(jsCode);
      }
    })();
  });
  ;
  return (function() {
    if (((args).length === 0)) {
      return readStdin(process);
    } else {
      return process((args)[0]);
    }
  })();
});

cli.help = (function(args, options) {
  return fs.readFile((__dirname + "/../cli-help"), { encoding: "utf8" }, (function(err, data) {
    (function() {
      if (err) {
        throw new Error (err);
      }
    })();
    return console.log(data);
  }));
});

var cliOptions = options(cli);
var args = (cliOptions.afterBreak || [  ]);
args.unshift((process.argv)[1], "FILENAME");

(process)["argv"] = args;
(process)["ARGV"] = args;
(function() {
  if (((Object.keys(cliOptions)).length === 0)) {
    return cli.repl();
  }
})()
var outputDir = (function() {
  if (cliOptions.output) {
    return (cliOptions.output)[0];
  }
})();
(cliOptions.file || [  ]).forEach((function(inputFile) {
  var inputPath = path.join(process.cwd(), inputFile),
      translated = sibilant.translateFile(inputPath);
  return (function() {
    if (outputDir) {
      var inputBasename = path.basename(inputPath, ".sibilant"),
          outputPath = (path.join(outputDir, inputBasename) + ".js");
      return fs.writeFile(outputPath, translated);
    } else {
      return (function() {
        if (cliOptions.execute) {
          return runInSandbox(translated, inputPath);
        } else {
          return console.log(translated);
        }
      })();
    }
  })();
}))
