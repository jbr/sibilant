var sibilant = require("sibilant"),
    path = require("path"),
    options = require("sibilant/options"),
    fs = require("fs"),
    script = (process.binding("evals"))["Script"],
    context = script.createContext();
var cli = {
  v: "version",
  h: "help",
  unhandled: "help",
  i: "input",
  o: "output",
  x: "execute",
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

cli.help = (function(args) {
  // args:rest
  var args = Array.prototype.slice.call(arguments, 0);
  
  return console.log("Hi there!  Thanks for installing sibilant.\nPlease leave feedback on github issues (http://github.com/jbr/sibilant/issues)\n\nThe current commandline options are:\n--------------------------------------------------------------------------------\n\n-v / --version         Print out a version string and exit\n\n-h / --help            This message\n\n--repl / [no args]     Sibilant interactive command prompt\n\n--execute / -x         This is a flag. Execute input files in order supplied.\n\n--output DIR / -o DIR  Output input files to this dir, replacing .lisp with .js.\n\n--input FILE / -i FILE / FILE\n                       Add this file to the input files. If the execute flag is\n                       set, input files will be executed.  If an output dir is\n                       specified, each file will be written to that dir.\n                       Otherwise, each file will be written to STDOUT.\n\n--------------------------------------------------------------------------------\n\nExamples\n\nto compile sibilant\n$ git clone git://github.com/jbr/sibilant.git\n$ npm link .\n$ sibilant src/*.lisp -o lib\n$ sibilant -x test/test.lisp # you're now running a sibilant you just compiled.\n\nto compile one file to stdout\n$ sibilant test/test.lisp\n\nto compile a file to a directory\n$ sibilant test/test.lisp -o . # put test.js here\nor\n$ sibilant --input test/test.lisp --output .\n\nto run a file\n$ sibilant -x test/test.lisp\n\nto enter the repl\n$ sibilant\nor\n$ sibilant --repl\n\n");
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
sibilant.translateFile = (function(fileName) {
  // file-name:required
  return sibilant.translateAll(fs.readFileSync(fileName, "utf8"));
});

var createContext = (function() {
  if (arguments.length > 0)
    throw new Error("argument count mismatch: expected no arguments");
  
  context.initializedQ = true;;
  (module)["filename"] = (process.cwd() + "/exec");;
  (context)["module"] = module;;
  (context)["require"] = require;;
  return (function() {
    for (var key in global) (function() {
      if (arguments.length > 0)
        throw new Error("argument count mismatch: expected no arguments");
      
      return (context)[key] = (global)[key];;
    })();
  })();;
});

var runInSandbox = (function(js, inputPath) {
  // js:required input-path:required
  (function() {
    if ((!context.initializedQ)) {
      return createContext();
    };
  })();
  (context)["__dirname"] = path.dirname(inputPath);;
  (module)["filename"] = inputPath;;
  return script.runInContext(js, context, "sibilant");
});

(cliOptions.input || [  ]).forEach((function(inputFile) {
  // input-file:required
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
