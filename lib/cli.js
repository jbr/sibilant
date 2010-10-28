var sibilant = require("sibilant"),
    path = require("path"),
    options = require("sibilant/options"),
    fs = require("fs");
var cli = {
  h: "help",
  unhandled: "help",
  i: "input",
  o: "output",
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
      return console.log(translated);
    };
  })();
}))
