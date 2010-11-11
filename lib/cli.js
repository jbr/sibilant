var sibilant = require("sibilant"),
    path = require("path"),
    options = require("sibilant/options"),
    fs = require("fs"),
    script = (process.binding("evals"))["Script"],
    context = script.createContext();
var createContext = (function() {
  context.initialized__QUERY = true;;
  (module)["filename"] = (process.cwd() + "/exec");;
  (context)["module"] = module;
  (context)["require"] = require;;
  return (function() {
    for (var key in global) (function() {
      return (context)[key] = (global)[key];;
    })();
  })();;
});

var runInSandbox = (function(js, inputPath) {
  // js:required inputPath:optional
  if (arguments.length < 2) // if inputPath is missing
    var inputPath = undefined;
  
  (function() {
    if ((!context.initialized__QUERY)) {
      return createContext();
    };
  })();
  (function() {
    if (typeof(inputPath) !== 'undefined') {
      (context)["__dirname"] = path.dirname(inputPath);;
      return (module)["filename"] = inputPath;;
    };
  })();
  return script.runInContext(js, context, "sibilant");
});

var cli = {
  v: "version",
  h: "help",
  unhandled: "help",
  i: "input",
  o: "output",
  x: "execute",
  e: "eval",
  execute: false,
  unlabeled: "input"
};
cli.version = (function(args) {
  // args:rest
  var args = Array.prototype.slice.call(arguments, 0);
  
  return console.log(sibilant.versionString());
});

cli.repl = (function(args) {
  // args:rest
  var args = Array.prototype.slice.call(arguments, 0);
  
  return require("sibilant/repl");
});

cli.eval = (function(args) {
  // args:rest
  var args = Array.prototype.slice.call(arguments, 0);
  
  return (function() {
    if (((args).length === 0)) {
      var stdin = process.openStdin(),
          data = "";;
      stdin.setEncoding("utf8");
      stdin.on("data", (function(chunk) {
        // chunk:required
        return data = (data + chunk);;
      }));
      return stdin.on("end", (function(args) {
        // args:rest
        var args = Array.prototype.slice.call(arguments, 0);
        
        return runInSandbox(sibilant.translateAll(data));
      }));;
    } else {
      return args.forEach((function(arg) {
        // arg:required
        return runInSandbox(sibilant.translateAll(arg));
      }));
    };
  })();
});

cli.help = (function(args) {
  // args:rest
  var args = Array.prototype.slice.call(arguments, 0);
  
  return console.log("Hi there!  Thanks for installing sibilant.\n" +
  "Please leave feedback on github issues (http://github.com/jbr/sibilant/issues)\n" +
  "\n" +
  "The current commandline options are:\n" +
  "--------------------------------------------------------------------------------\n" +
  "\n" +
  "-v / --version         Print out a version string and exit\n" +
  "\n" +
  "-h / --help            This message\n" +
  "\n" +
  "--repl / [no args]     Sibilant interactive command prompt\n" +
  "\n" +
  "--eval [optional STRING] / -e [optional STRING]\n" +
  "                       Evaluate STRING if provided, otherwise evaluate STDIN.\n" +
  "\n" +
  "--execute / -x         This is a flag. Execute input files in order supplied.\n" +
  "\n" +
  "--output DIR / -o DIR  Output input files to this dir, replacing .lisp with .js.\n" +
  "\n" +
  "--input FILE / -i FILE / FILE\n" +
  "                       Add this file to the input files. If the execute flag is\n" +
  "                       set, input files will be executed.  If an output dir is\n" +
  "                       specified, each file will be written to that dir.\n" +
  "                       Otherwise, each file will be written to STDOUT.\n" +
  "\n" +
  "--------------------------------------------------------------------------------\n" +
  "\n" +
  "Examples\n" +
  "\n" +
  "to compile sibilant\n" +
  "$ git clone git://github.com/jbr/sibilant.git\n" +
  "$ npm link .\n" +
  "$ sibilant src/*.lisp -o lib\n" +
  "$ sibilant -x test/test.lisp # you're now running a sibilant you just compiled.\n" +
  "\n" +
  "to compile one file to stdout\n" +
  "$ sibilant test/test.lisp\n" +
  "\n" +
  "to compile a file to a directory\n" +
  "$ sibilant test/test.lisp -o . # put test.js here\n" +
  "or\n" +
  "$ sibilant --input test/test.lisp --output .\n" +
  "\n" +
  "to run a file\n" +
  "$ sibilant -x test/test.lisp\n" +
  "\n" +
  "to enter the repl\n" +
  "$ sibilant\n" +
  "or\n" +
  "$ sibilant --repl\n" +
  "\n" +
  "");
});

var cliOptions = options(cli);
(function() {
  if (((Object.keys(cliOptions)).length === 0)) {
    return cli.repl();
  };
})()
var outputDir = (function() {
  if (cliOptions.output) {
    return (cliOptions.output)[0];
  };
})();
var stripShebang = (function(data) {
  // data:required
  return data.replace(/^#!.*\n/, "");
});

sibilant.translateFile = (function(fileName) {
  // fileName:required
  return sibilant.translateAll(stripShebang(fs.readFileSync(fileName, "utf8")));
});

(cliOptions.input || [  ]).forEach((function(inputFile) {
  // inputFile:required
  var inputPath = path.join(process.cwd(), inputFile),
      translated = sibilant.translateFile(inputPath);;
  return (function() {
    if (outputDir) {
      var inputBasename = path.basename(inputPath, ".lisp"),
          outputPath = (path.join(outputDir, inputBasename) + ".js");;
      return fs.writeFile(outputPath, translated);;
    } else {
      return (function() {
        if (cliOptions.execute) {
          return runInSandbox(translated, inputPath);
        } else {
          return console.log(translated);
        };
      })();
    };
  })();
}))
