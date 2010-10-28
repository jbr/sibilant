var sibilant = require("sibilant"),
    path = require("path"),
    options = require("sibilant/options"),
    fs = require("fs"),
    script = (process.binding("evals"))["Script"],
    context = script.createContext();
var cli = {
  h: "help",
  unhandled: "help",
  i: "input",
  o: "output",
  x: "execute",
  unlabeled: "input"
};
cli.repl = (function(args) {
  // args:rest
  var args = Array.prototype.slice.call(arguments, 0);
  
  return require("sibilant/repl");
});

var cliOptions = options(cli);
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
