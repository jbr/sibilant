
var sibilant = require("sibilant"),
    path = require("path"),
    options = require("sibilant/options");
var cli = {
  h: "help",
  unhandled: "help",
  i: "input",
  f: "file",
  file: "input",
  o: "output",
  unlabeled: "file"
};
cli.help = (function(args) {
  // args:required
  console.log("help text here");
  return process.exit();
});
cli.input = (function(files) {
  // files:rest
  var files = Array.prototype.slice.call(arguments, 0);
  
  return files.forEach((function(file) {
    // file:required
    var filePath = path.join(process.cwd(), file);;
    return sibilant.include(filePath);
  }));
});
cli.repl = (function(args) {
  // args:rest
  var args = Array.prototype.slice.call(arguments, 0);
  
  return require("sibilant/repl");
});
options(cli);


