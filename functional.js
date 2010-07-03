

exports.inject = function (start, items, fn) {
    var value = start
    if (items && items.constructor.name === 'Array')
	items.forEach (function (item, idx) {
	    value = fn(value, item, idx)
	})
    return value
}


exports.map = function (items, fn) {
    return exports.inject (
	[], items,
	function (collector, item, idx) {
	    collector.push (fn (item, idx))
	    return collector
	}
    )
}

exports.select = function (items, fn) {
    return exports.inject (
	[], items,
	function (collector, item, idx) {
	    if (fn (item, idx)) collector.push (item)
	    return collector
	})
}

exports.detect = function (items, fn) {
    for (var i = 0; i < items.length; i++)
	if (fn (items [i], i)) return items [i]
}

exports.reject = function (items, fn) {
    return exports.select (items, function () {
	return ! fn.apply (undefined, arguments)
    })
}

exports.compact = function (arr) {
    return exports.select (arr, function (item) {
	return !! item
    })
}
