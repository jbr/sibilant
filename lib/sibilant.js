var sys = require ("sys")
var sibilant = exports
var import = require ("sibilant/import")
import (require ("sibilant/functional"))

var error = function (str) { throw new Error (str) }
var inspect = sys.inspect
var emit = sys.puts
var load = function (file, cb) {
    require("fs").readFile (
	__dirname + "/" + file, 'utf8',
	function (err, data) {
	    if (err) error (err)
	    else cb (data)
	}
    )
}

/*
     Nothing below here should be node specific
*/

var tokenize = sibilant.tokenize = function (string) {
    var tokens = []
    var parseStack = [tokens]
    var specials = []

    var acceptToken = function (token) { parseStack [0].push (token) }

    var increaseNesting = function () {
	var newArr = []
	acceptToken (newArr)
	parseStack.unshift (newArr)
    }

    var decreaseNesting = function () {
	specials.shift ()
	parseStack.shift ()
	if (parseStack.length === 0)
	    error ("unbalanced parens:\n" + inspect (parseStack))
    }

    var handleToken = function (token) {
	var special = token [0]
	var token = token

	if (special === "'") {
	    token = token.slice (1)
	    increaseNesting ()
	    acceptToken ("quote")
	} else special = false

	specials.unshift (!!special)

	if (token === '(') increaseNesting ()
	else { // this atom ends here
	    if (token === ')') decreaseNesting ()
	    else if (token.match (/^-?[0-9.]+$/))
		acceptToken (parseFloat (token))
	    else acceptToken (token)

	    if (specials.shift ())
		decreaseNesting ()
	}
    }

    string
	.match (/(\/(\\\/|[^\/\n])+\/[glim]*)|(;.*)|("([^"]|(\\"))*?[^\\]")|[&']?[*.a-z-]+\??|[><=!\+\/\*-]+|-?[0-9.]+|(\'?\()|\)/g)
    	.forEach (handleToken)

    if (parseStack.length > 1)
    	error ("unexpected EOF, probably missing a )\n" +
			 inspect (parseStack[0]))

    return tokens
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

var macros = sibilant.macros = {}

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

macros.defmacro = function (name, arglist, body) {
    var js = macros.lambda.apply (
	undefined,
	Array.prototype.slice.call (arguments, 1)
    )

  //  sys.puts ("macros[\""+name + "\"] = " + js + "\n\n")

    try { macros[name] = eval (js) }
    catch (e) {
	error ("error in parsing macro " + name + ":\n" +
	       indent (js))
    }
}

macros.concat = function (args) {
    return "(" + map (Array.prototype.slice.apply (arguments),
		      translate).join(" + ") + ")"
}

var transformArgs = function (arglist) {
    var last, args = []
    arglist.forEach (function (arg) {
	if (arg [0] === '&') last = arg.slice (1)
	else {
	    args.push ([last || 'required', arg])
	    last = null
	}
    })

    if (last) error ("unexpected argument modifier: " + last)

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

var bulkEach = function (arr, fn) {
    var index = 0
    var groupSize = fn.length
    var retarr = []
    while (index < arr.length)
	retarr.push (fn.apply (undefined,
			       arr.slice (index, index += groupSize)))
    return retarr
}

macros.hash = function (pairs) {
    var pairs = Array.prototype.slice.call (arguments)
    if (pairs.length % 2 !== 0)
    	error ("Odd number of key-value pairs in hash: " +
    			 indent (inspect (pairs)))

    var pairStrings = bulkEach (pairs, function (key, value) {
	return translate (key) + ": " + translate (value)
    })

    if (pairStrings.length <= 1)
	return "{ " + pairStrings.join(", ") + " }"
    else return "{" + indent (pairStrings.join(",\n")) + "}"
}

var literal = function (string) {
    return inject (
	string.replace (/\*/g, '_').replace(/\?$/, "Q"),
	string.match (/-(.)/g),
	function (returnString, match) {
	    return returnString.replace (
		match,
		match[1].toUpperCase ()
	    )
	}
    )
}


var translate = sibilant.translate = function (token, hint) {
    var hint = hint
    if (hint && typeof macros [hint] === 'undefined')
	hint = undefined
    
    try {
	if (token.constructor.name === 'Array') {
	    if ('undefined' === typeof macros [token [0]])
		return macros [hint || 'call'].apply (null, token)
	    else return macros [token [0]].apply (null, token.slice (1))
	} else if (typeof token === 'string' && token.match (/^[*\.a-z-]+\??$/))
	    return literal (token)
	else if (typeof token === 'string' && token.match (/^;/))
	    return token.replace (/^;+/, '//')
	else if (typeof token === 'string' && token [0] === '"')
	    return token.split("\n").join("\\n")
	else return token
    } catch (e) {
	error (
	    e.stack + "\n" +
		"Encountered when attempting to process:\n" +
		indent (inspect (token))
	)
    }
}

var translateAll = sibilant.translateAll = function (contents) {
    var buffer = ''
    tokenize (contents).forEach (function (token) {
	var line = translate (token, "statement")
	if (line) buffer += line + "\n"
    })
    return buffer
}


var include = sibilant.include = function (file) {
    load (file, function (contents) { emit (translateAll (contents)) })
}

macros['include'] = function (file) {
    include (eval (translate (file)))
}

include ("macros.lisp")
