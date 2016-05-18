require("source-map-support").install();
//# sourceMappingURL=../maps/repl.map
;
var sibilant = require("./sibilant"),
    cardinal = require("cardinal"),
    util = require("util"),
    vm = require("vm"),
    fs = require("fs");
var input = process.openStdin(),
    output = process.stdout,
    readline = require("readline").createInterface(input, output),
    context = undefined,
    cmdBuffer = "",
    HISTORY_FILE = (process.env.SIBILANT_REPL_HISTORY_FILE || ("" + process.env.HOME + "/.sibilant.history")),
    fd = undefined;
fs.access(HISTORY_FILE, fs.R_OK, (function() {
  /* src/repl.sibilant:18:23 */

  return (function() {
    if (arguments[0]) {
      return readline.history = fs.readFileSync(HISTORY_FILE, "utf-8").split("\n").reverse().filter((function() {
        /* src/repl.sibilant:21:46 */
      
        return (!!(arguments[0]));
      }));
    }
  }).call(this);
}));
fd = fs.openSync(HISTORY_FILE, "a");
var createContext = (function createContext$() {
  /* create-context src/repl.sibilant:28:0 */

  var context = vm.createContext();
  module.filename = (process.cwd() + "/exec");
  context._sibilant = sibilant;
  context.module = module;
  context.require = require;
  Object.keys(global).forEach((function(key) {
    /* src/repl.sibilant:35:5 */
  
    return context[key] = global[key];
  }));
  return context;
});
context = createContext();
var displayPrompt = (function displayPrompt$() {
  /* display-prompt src/repl.sibilant:40:0 */

  var open = cmdBuffer.split((new RegExp("[\\{\\[\\(]", "g"))).length,
      closed = cmdBuffer.split((new RegExp("[\\}\\]\\)]", "g"))).length,
      indentation = "";
  (function() {
    var while$3 = undefined;
    while (open > closed) {
      while$3 = (function() {
        indentation = ("  " + indentation);
        return ((open)--);
      }).call(this);
    };
    return while$3;
  }).call(this);
  readline.setPrompt((function() {
    if (0 === cmdBuffer.length) {
      return "sibilant> ";
    } else {
      return ("          " + indentation);
    }
  }).call(this));
  return readline.prompt();
});
var handleLine = (function handleLine$(cmd) {
  /* handle-line src/repl.sibilant:55:0 */

  var jsLine = "";
  (function() {
    try {
      cmdBuffer = (cmdBuffer + cmd);
      js = (sibilant(cmdBuffer)).js;
      var safeJs = (function() {
        if (js[0] === "{") {
          return sibilant.outputFormatter(sibilant.transpile(sibilant.resolveMacro("scoped")(js)));
        } else {
          return js;
        }
      }).call(this);
      (function() {
        try {
          return console.log(cardinal.highlight(js));
        } catch (e) {
          return console.dir(js);
        }
      }).call(this);
      var result = vm.runInContext(safeJs, context, "sibilant-repl");
      readline.history[0] = cmdBuffer;
      fs.write(fd, ("" + cmdBuffer + "\n"));
      (function() {
        if (typeof result !== "undefined") {
          return output.write(("result: " + util.inspect(result, { colors: true }) + "\n"));
        }
      }).call(this);
      context._ = result;
      return cmdBuffer = "";
    } catch (e) {
      return (function() {
        if (e.message.match((new RegExp("unclosed node", undefined)))) {
          cmdBuffer = (cmdBuffer + "\n");
          return readline.history.shift();
        } else {
          readline.history[0] = cmdBuffer;
          fs.write(fd, ("" + cmdBuffer + "\n"));
          output.write((e.stack + "\n"));
          return cmdBuffer = "";
        }
      }).call(this);
    }
  }).call(this);
  return displayPrompt();
});
readline.on("line", handleLine);
readline.on("close", (function() {
  /* src/repl.sibilant:96:20 */

  fs.closeSync(fd);
  output.write("\nexiting");
  return input.destroy();
}));
displayPrompt();