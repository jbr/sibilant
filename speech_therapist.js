var sys = require ("sys")
var fs = require ("fs")
var import = require ("./import")
import (require ("./functional"))

var tokenize = function (string) {
    var tokens = []
    var parseStack = [tokens]
    var specials = []

    var acceptToken = function (t) { parseStack [0].push (t) }

    var increaseNesting = function (special) {
	var newArr = []
	acceptToken (newArr)
	parseStack.unshift (newArr)
	specials.unshift (special || false)
    }

    var decreaseNesting = function () {
	parseStack.shift ()
	if (specials.shift ()) decreaseNesting ()
	if (parseStack.length === 0)
	    throw new Error (
		"unbalanced parens:\n" +
		    sys.inspect (parseStack))
    }

    var handleSpecial = function (special) {
	if (special === "'") {
	    increaseNesting (true)
	    acceptToken ("quote")
	}
    }

    var handleToken = function (token) {
	var token = token
	var special

	if (token.match (/^[`',]/)) {
	    handleSpecial (token [0])
	    token = token.slice (1)
	}

	if (token === '(') increaseNesting ()
	else if (token === ')') decreaseNesting ()
	else if (token.match (/^-?[0-9.]+$/))
	    acceptToken (parseFloat (token))
	else acceptToken (token)
    }


    string
	.replace (/([^\\])\n/, '$1 ')
	.replace (/\s+\\\n/, "\\n")
	.match (/(;.*)|("([^"]|(\\"))*?[^\\]")|[&']?[*.a-z-]+|[><=!\+\/\*-]+|-?[0-9.]+|([']?\()|\)/g)
	.forEach (handleToken)

    if (parseStack.length > 1) {
	sys.puts (sys.inspect (parseStack[0]))
	throw new Error ("unexpected EOF, probably missing a )")
    }

    return tokens
}

var reprint = function (tokens, nesting) {
    var nesting = nesting || 0
    for (var i=0; i<nesting - 1; i++) sys.print ("\t")
    if (nesting > 0) sys.print ("(")

    tokens.forEach (function (item) {
	if (item.constructor.name === 'Array') {
	    sys.print ("\n")
	    reprint (item, nesting + 1)
	} else {
	    sys.print ("<" + item + ">")
	}
    })
    if (nesting > 0) sys.print (")")
}
var indent = function () {
    return compact (Array.prototype.slice.call (arguments))
	.join("\n")
	.replace (/^/, "\n")
	.replace (/\n/g, "\n  ") + "\n"
}

var constructHash = function (arrayOfArrays) {
    return inject ({}, arrayOfArrays, function (object, item) {
	object [item [0]] = object [item [1]]
	return object
    })
}

var macros = {}

macros['return'] = function (token) {
    if (token && token.constructor.name === "Array" && token[0] === "return")
	return translate (token)
    return "return " + translate (token)
}

macros.let = function (assignments, body) {
    var body = Array.prototype.slice.call (arguments, 1)
    body [body.length - 1] = ['return', body [body.length - 1]]

    var content = indent (
	"var " + map (assignments, function (kv) {
	    return kv [0] + " = " + translate (kv [1])
	}).join(",\n  ") + ";",
	map (body, function (arg) {
	    return translate (arg) + ';'
	}).join("\n")
    )

    return "(function() {" + content + "})();\n"
}

macros.setq = function (name, value) {
    return "var " + translate (name) + " = " + translate (value) + ";\n"
}

macros.statement = function () {
    return macros.call.apply (null, arguments) + ";\n"
}

macros.progn = function (body) {
    var body = Array.prototype.slice.call (arguments)
    body [body.length - 1] = ['return', body [body.length - 1]]

    return map (body, function (arg) {
	return translate (arg) + ';'
    }).join("\n")
}

macros.call = function (fnName) {
    return translate (fnName) + "(" +
	map (
	    Array.prototype.slice.call (arguments, 1),
	    translate
	).join (", ") + ")"
}

macros.defun = function (fnName, arglist, body) {
    return translate (fnName) + " = " +
	macros.lambda.apply (
	    undefined,
	    Array.prototype.slice.call (arguments, 1)
	) + ";\n"
}

macros.macroexpand = function (name) {
    if (macros [name])
	return macros[name].toString ()
    else return "undefined"
}

macros.defmacro = function (name, arglist, body) {
    try {
	macros[name] = eval (macros.lambda.apply (
	    undefined,
	    Array.prototype.slice.call (arguments, 1)
	))
    } catch (e) {
	sys.puts ("error in parsing macro " + name + ":")
	sys.puts (indent (macros.lambda (arglist, body)))
	throw e
    }
}

var joinWith = function (string) {
    var string = string
    return function () {
	return map (
	    Array.prototype.slice.apply (arguments),
	    translate
	).join (" " + string + " ")
    }
}


macros['+'] = joinWith ('+')
macros['concat'] = joinWith ('+')
macros['-'] = joinWith ('-')
macros['*'] = joinWith ('*')
macros['/'] = joinWith ('*')


var transformArgs = function (arglist) {
    var last, args = []
    arglist.forEach (function (arg) {
	if (arg [0] === '&') last = arg.slice (1)
	else {
	    args.push ([last || 'required', arg])
	    last = null
	}
    })

    if (last) throw new Error ("unexpected argument modifier: " + last)

    return args
}

var reverse = macros.reverse = function (arr) {
    var reversed = []
    arr.forEach (function (item) { reversed.unshift (item) })
    return reversed
}


var buildArgsString = function (args, rest) {
    var argsString = "", optionalCount = 0
    args.forEach (function (arg, optionIndex) {
	if (arg [0] === 'optional') {
	    argsString += "if (arguments.length < " +
		(args.length - optionalCount) + ") " +
		"// if " + arg[1] + " is missing" +
		indent (
		    "var " +
			map (
			    args.slice (optionIndex + 1),
			    function (arg, argIndex) {
				return arg[1] + " = " +
				    args [optionIndex + argIndex][1]
			    }
			)
			.reverse ()
			.concat (arg [1] + " = undefined")
			.join (", ") + ';'
		)
	    optionalCount ++
	}
    })

    var argumentCountMismatch = function (msg) {
	return indent ('throw new Error("argument ' +
		       'count mismatch: ' + msg + '");')
    }

    if (rest) {
	if (args.length - optionalCount > 0)
	    argsString += (
		"if (arguments.length < " +
		    (args.length - optionalCount) + ")" +
		    argumentCountMismatch (
			'expected no fewer than ' +
			    (args.length - optionalCount) + ' arguments'
		    )
	    )

	argsString += (
	    "var " + translate (rest [1]) +
		" = Array.prototype.slice.call(arguments, " +
		(args.length) + ");\n"
	)

    } else {
	if (args.length === 0)
	    argsString += (
		'if (arguments.length > 0)' +
		    argumentCountMismatch ('expected no arguments')
	    )

	else if (optionalCount > 0)
	    argsString += (
		'if (arguments.length < ' +
		    (args.length - optionalCount) +
		    ' || arguments.length > ' + args.length + ')' +
		    argumentCountMismatch (
			'expected between ' +
			    (args.length - optionalCount) +
			    ' and ' + args.length + ' arguments'
		    )
	    )
    }

    return argsString
}

var buildCommentString = function (args) {
    if (args.length === 0) return ""
    return "// " + map (args, function (arg) {
	return reverse(arg).join (":")
    }).join(" ")
}

macros.lambda = function (arglist, body) {
    var args = transformArgs (arglist)
    var rest = detect (args, function (arg) {return arg [0] === 'rest' })
    var body = Array.prototype.slice.call (arguments, 1)
    var docString
    
    body [body.length - 1] = ['return', body [body.length - 1]]
    if (typeof body [0] === "string" && body [0].match (/^".*"$/))
	docString = "/* " + eval (body.shift ()) + " */\n"
    
    var noRestArgs = rest ? args.slice (0, -1) : args
    var argsString = buildArgsString (noRestArgs, rest)
    var commentString = buildCommentString (args)

    return "(function(" +
	map (args, function (arg) {return translate (arg [1])}).join (", ") +
	") { "+
	indent (
	    commentString,
	    docString,
	    argsString,
	    map (body, function (stmt) { return translate (stmt) + ';' }).join ("\n")
	) + "})"
}


macros.quote = function (item) {
    if (item.constructor.name === "Array")
	return '[' + map (item, macros.quote).join(", ") + ']'
    else if (typeof item === 'number')
	return item
    else return '"' + literal (item) + '"'
}



var literal = function (string) {
    return inject (
	string.replace (/\*/g, '_'),
	string.match (/-(.)/g),
	function (returnString, match) {
	    return returnString.replace (
		match,
		match[1].toUpperCase ()
	    )
	}
    )
}


var translate = function (token, hint) {
    var hint = hint
    if (hint && typeof macros [hint] === 'undefined')
	hint = undefined
    
    try {
	if (token.constructor.name === 'Array') {
	    if ('undefined' === typeof macros [token [0]])
		return macros [hint || 'call']
		.apply (null, token)
	    else return macros [token [0]]
		.apply (null, token.slice (1))
	} else if (typeof token === 'string' && token.match (/^[*a-z-]+$/))
	    return literal (token)
	else if (typeof token === 'string' && token.match (/^;/))
	    return token.replace (/^;+/, '//')
	else return token
    } catch (e) {
	sys.puts (e.stack)
	sys.print ("Encountered when attempting to process:")
	sys.puts (indent (sys.inspect (token)))
    }
}


var fs = require ("fs")

tokenize (fs.readFileSync ("macros.lisp", 'utf8')).forEach (translate)

process.argv.slice(2).forEach (function (file) {
    tokenize (fs.readFileSync (file, 'utf8'))
	.forEach (function (token) {
	    var line = translate (token, 'statement')
	    if (line) sys.puts (line)
	})
})

