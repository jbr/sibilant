module.exports = function (module) {
    for (fName in module)
	if (module.hasOwnProperty (fName))
	    global [fName] = module [fName]
}