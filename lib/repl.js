require("source-map-support").install();
//# sourceMappingURL=./repl.map
;
var input = process.openStdin(),
    output = process.stdout,
    vm = require("vm"),
    readline = require("readline").createInterface(input, output),
    sibilant = require("./sibilant"),
    cardinal = require("cardinal"),
    context = undefined,
    cmdBuffer = "",
    util = require("util");
var createContext = (function createContext$() {
  /* create-context /Users/jbr/code/sibilant/src/repl.sibilant:14:0 */

  var context = vm.createContext();
  module.filename = (process.cwd() + "/exec");
  context.module = module;
  context.require = require;
  (function() {
    for (var key in global) (function() {
      return context[key] = global[key];
    })();
    return global;
  })();
  return context;
});
context = createContext();
var displayPrompt = (function displayPrompt$() {
  /* display-prompt /Users/jbr/code/sibilant/src/repl.sibilant:25:0 */

  readline.setPrompt(((function() {
    if ((cmdBuffer.length > 10)) {
      return ("..." + cmdBuffer.slice(-10));
    } else {
      return (function() {
        if ((cmdBuffer.length > 0)) {
          return cmdBuffer;
        } else {
          return "sibilant";
        }
      })();
    }
  })() + "> "));
  return readline.prompt();
});
var handleLine = (function handleLine$(cmd) {
  /* handle-line /Users/jbr/code/sibilant/src/repl.sibilant:33:0 */

  var jsLine = "";
  (function() {
    try {
      cmdBuffer = (cmdBuffer + cmd);
      jsLine = sibilant.sibilize(cmdBuffer);
      var safeJs = (function() {
        if ((jsLine[0] === "{")) {
          return sibilant.outputFormatter(sibilant.transpile(sibilant.resolveMacro("scoped")(jsLine)));
        } else {
          return jsLine;
        }
      })();
      (function() {
        try {
          return console.log(cardinal.highlight(jsLine));
        } catch (e) {
          return console.dir(jsLine);
        }
      })();
      var result = vm.runInContext(safeJs, context, "sibilant-repl");
      readline.history[0] = cmdBuffer;
      (function() {
        if ((typeof result !== "undefined")) {
          return output.write(("result: " + util.inspect(result, {
            colors: true,
            depth: null
          }) + "\n"));
        }
      })();
      context["_"] = result;
      return cmdBuffer = "";
    } catch (e) {
      return (function() {
        if (e.message.match(/unclosed node:/)) {
          cmdBuffer = (cmdBuffer + " ");
          return readline.history.shift();
        } else {
          readline.history[0] = cmdBuffer;
          output.write((e.stack + "\n"));
          return cmdBuffer = "";
        }
      })();
    }
  })();
  return displayPrompt();
});
readline.on("line", handleLine);
readline.on("close", (function() {
  /* /Users/jbr/code/sibilant/src/repl.sibilant:72:20 */

  output.write("\nexiting");
  return input.destroy();
}));
displayPrompt();