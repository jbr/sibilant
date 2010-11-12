var stream = process.openStdin(),
    script = (process.binding("evals"))["Script"],
    readline = require("readline").createInterface(stream),
    sibilant = require((__dirname + "/sibilant")),
    context = undefined,
    cmdBuffer = "",
    sys = require("sys"),
    displayPromptOnDrain = false;
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

context = createContext();
stream.on("data", (function(data) {
  // data:required
  return readline.write(data);
}));

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
  var jsLine = "",
      flushed = true;;
  (function() {
    try {
      cmdBuffer = (cmdBuffer + cmd);;
      sibilant.tokenize(cmdBuffer).forEach((function(stmt) {
        // stmt:required
        return jsLine = (jsLine + sibilant.translate(stmt, "statement"));;
      }));
      var result = script.runInContext(jsLine, context, "sibilant-repl");;
      (readline.history)[0] = cmdBuffer;;
      (function() {
        if (typeof(result) !== 'undefined') {
          return flushed = stream.write(("result: " + sys.inspect(result) + "\n"));;
        };
      })();
      (context)["_"] = result;;
      return cmdBuffer = "";;;
    } catch (e) {
      return (function() {
        if (e.message.match("unexpected EOF")) {
          cmdBuffer = (cmdBuffer + " ");;
          return readline.history.shift();;
        } else {
          (readline.history)[0] = cmdBuffer;;
          flushed = stream.write(e.message);
          return cmdBuffer = "";;;
        };
      })();;
    }
  })();
  return (function() {
    if (flushed) {
      return displayPrompt();
    } else {
      return displayPromptOnDrain = true;;
    };
  })();
}));

readline.on("close", stream.destroy);

stream.on("drain", (function() {
  return (function() {
    if (displayPromptOnDrain) {
      displayPrompt();
      return displayPromptOnDrain = false;;
    };
  })();
}));

displayPrompt();

