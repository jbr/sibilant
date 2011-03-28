var input = process.openStdin(),
    output = process.stdout,
    script = (process.binding("evals"))["Script"],
    readline = require("readline").createInterface(input, output),
    sibilant = require("sibilant"),
    context = undefined,
    cmdBuffer = "",
    sys = require("sys");
var createContext = (function() {
  var context = script.createContext();;
  (module)["filename"] = (process.cwd() + "/exec");;
  (context)["module"] = module;
  (context)["require"] = require;;
  (function() {
    for (var key in global) (function() {
      return (context)[key] = (global)[key];;
    })();
  })();;
  return context;
});

context = createContext()
var displayPrompt = (function() {
  readline.setPrompt(((function() {
    if ((cmdBuffer.length > 10)) {
      return ("..." + cmdBuffer.slice(-10));
    } else {
      return (function() {
        if ((cmdBuffer.length > 0)) {
          return cmdBuffer;
        } else {
          return "sibilant";
        };
      })();
    };
  })() + "> "));
  return readline.prompt();
});

readline.on("line", (function(cmd) {
  // cmd:required
  var jsLine = "";;
  (function() {
    try {
      cmdBuffer = (cmdBuffer + cmd);
      sibilant.tokenize(cmdBuffer).forEach((function(stmt) {
        // stmt:required
        return jsLine = (jsLine + sibilant.translate(stmt, "statement"));
      }));
      var result = script.runInContext(jsLine, context, "sibilant-repl");;
      (readline.history)[0] = cmdBuffer;;
      (function() {
        if (typeof(result) !== 'undefined') {
          return output.write(("result: " + sys.inspect(result) + "\n"));
        };
      })();
      (context)["_"] = result;;
      return cmdBuffer = "";;
    } catch (e) {
      return (function() {
        if (e.message.match(/unexpected EOF/)) {
          cmdBuffer = (cmdBuffer + " ");
          return readline.history.shift();;
        } else {
          (readline.history)[0] = cmdBuffer;;
          output.write((e.stack + "\n"));
          return cmdBuffer = "";;
        };
      })();;
    }
  })();
  return displayPrompt();
}));

readline.on("close", input.destroy);

displayPrompt();

