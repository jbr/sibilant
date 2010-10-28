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
console.log(cliOptions);

var outputDir = (function() {
  if (cliOptions.output) {
    return (cliOptions.output)[0];
  } else {
    return process.cwd();
  };
})();
sibilant.translateFile = (function(fileName) {
  // file-name:required
  return sibilant.translateAll(fs.readFileSync(fileName, "utf8"));
});

(cliOptions.input || [  ]).forEach((function(inputFile) {
  // input-file:required
  var inputPath = path.join(process.cwd(), inputFile),
      inputBasename = path.basename(inputPath, ".lisp"),
      outputPath = (path.join(outputDir, inputBasename) + ".js");;
  return fs.writeFile(outputPath, sibilant.translateFile(inputPath));
}))
