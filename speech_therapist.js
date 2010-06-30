var fs = require ("fs")
var sys = require ("sys")

var tokenize = function (string) {
    var tokens = []
    var parseStack = [tokens]

    var acceptToken = function (t) { parseStack [0].push (t) }

    var increaseNesting = function () {
	var newArr = []
	acceptToken (newArr)
	parseStack.unshift (newArr)
    }

    var decreaseNesting = function () {
	parseStack.shift ()
	if (parseStack.length === 0)
	    throw new Error (
		"unbalanced parens:\n" +
		    sys.inspect (parseStack))
    }

    var handleToken = function (token) {
	if (token === '(') increaseNesting ()
	else if (token === ')') decreaseNesting ()
	else if (token.match (/^-?[0-9.]+$/))
	    acceptToken (parseFloat (token))
	else acceptToken (token)
    }


    string
	.replace (/([^\\])\n/, '$1 ')
	.replace (/\s+\\\n/, "\\n")
	.match (/(;.*)|("([^"]|(\\"))*?[^\\]")|[&']?[.a-z-]+|[><=!\+\/\*-]+|-?[0-9.]+|([`']?\()|\)/g)
	.forEach (handleToken)

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

var inject = function (start, items, fn) {
    var value = start
    if (items && items.constructor.name === 'Array')
	items.forEach (function (item) {
	    value = fn(value, item)
	})
    return value
}


var map = function (items, fn) {
    return inject (
	[], items,
	function (collector, item) {
	    collector.push (fn (item))
	    return collector
	}
    )
}

var indent = function () {
    return Array.prototype.slice.call (arguments)
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
    var content = "var " + map (assignments, function (kv) {
	return kv [0] + " = " + kv [1]
    }).join(",\n  ") + ";\n\n" + translate (['return', body])

    return "(function() {" + indent (content) + "})();\n"
}

macros.setq = function (name, value) {
    return "var " + translate (name) + " = " + translate (value) + ";\n"
}

macros.statement = function () {
    return macros.fnCall.apply (null, arguments) + ";\n"
}

macros.fnCall = function (fnName) {
    return translate (fnName) + "(" +
	map (
	    Array.prototype.slice.call (arguments, 1),
	    translate
	).join (", ") + ")"
}

macros.defun = function (fnName, arglist, docstring, body) {
    var doc = ""
    if (typeof docstring === "string" && docstring.match (/^".*"$/)) val = "/* "+eval(docstring)+" */\n"
    else body = docstring
    return val + translate (fnName) + " = " + macros.lambda (arglist, body) + ";\n"
}

macros.defmacro = function (name, arglist, body) {
    macros[name] = eval (macros.lambda (arglist, body))
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

macros.lambda = function (arglist, body) {
    return "(function(" +
	map (arglist, translate).join (", ") +
	") {" + indent (translate (macros['return'] (body))) + "})"
}



var literal = function (string) {
    return inject (
	string,
	string.match (/-(.)/g),
	function (ret) {
	    return ret.replace (
		this,
		this[1].toUpperCase ()
	    )
	}
    )
}


var translate = function (token, hint) {
    try {
	if (token.constructor.name === 'Array') {
	    if ('undefined' === typeof macros [token [0]])
		return macros [hint || 'fnCall']
		.apply (null, token)
	    else return macros [token [0]]
		.apply (null, token.slice (1))
	} else if (typeof token === 'string' && token.match (/^[a-z-]+$/))
	    return literal (token)
	else if (typeof token === 'string' && token.match (/^;/))
	    return token.replace (/^;+/, '//')
	else return token
    } catch (e) {
	sys.puts ("could not process:")
	sys.puts (sys.inspect (token))
    }
}
  
process.argv
    .slice(2)
    .forEach (function (file) {
	tokenize (fs.readFileSync (file, 'utf8'))
	    .forEach (function (token) {
		var line = translate (token, 'statement')
		if (line) sys.puts (line)
	    })
})

