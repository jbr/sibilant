var stream = process.openStdin()
var Script = process.binding('evals').Script;
var readline = require ("readline").createInterface (stream)
var sibilant = require (__dirname + "/sibilant")
var evalInContext = Script.runInContext
var context
var cmdBuffer = ''
var sys = require ("sys")
var displayPromptOnDrain = false


var resetContext = function () {
    context = Script.createContext()
    context.require = function (id) {
	if (id.match(/^\.\.\//) || id.match(/^\.\//))
	    id = path.join(process.cwd(), id)
	return require(id)
    }
    Object.keys (require)
	.forEach(function (k) { context.require[k] = require[k] })
}

resetContext ()

stream.addListener ("data", function (data) {
    readline.write (data)
})

var displayPrompt = function () {
    if (cmdBuffer.length > 10)
	readline.setPrompt ('...' + cmdBuffer.slice(-10) + "> ")
    else if (cmdBuffer.length > 0)
	readline.setPrompt (cmdBuffer + "> ")
    else readline.setPrompt ("sibilant> ")

    readline.prompt ()
}

readline.addListener ('line', function (cmd) {
    var jsLine = ''
    var flushed = true
    
    try {
	cmdBuffer += cmd

	sibilant.tokenize (cmdBuffer).forEach(function (stmt) {
	    jsLine += sibilant.translate (stmt, 'statement')
	})

	context._ = evalInContext (jsLine, context, "sibilant-repl")
	readline.history [0] = cmdBuffer

//	sys.puts ("js: " + jsLine)
	if (context._ !== undefined)
            flushed = stream.write ("result: " +
				    sys.inspect (context._) + "\n")

	cmdBuffer = ''
    } catch (e) {
	if (e.message.match(/(unexpected EOF)|(unbalanced parens)/)) {
	    cmdBuffer += " "
	    readline.history.shift ()
	} else {
	    flushed = stream.write (e.message)
	    cmdBuffer = ''
	}
    }

    if (flushed) displayPrompt ()
    else displayPromptOnDrain = true

})

readline.addListener('close', stream.destroy)

stream.addListener('drain', function () {
    if (! displayPromptOnDrain) return

    displayPrompt ()
    displayPromptOnDrain = false
})

displayPrompt ()
