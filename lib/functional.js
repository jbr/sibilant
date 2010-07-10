var functional = exports

functional.inject = function (start, items, fn) {
    var value = start
    if (items && items.constructor.name === 'Array')
	items.forEach (function (item, idx) {
	    value = fn(value, item, idx)
	})
    return value
}


functional.map = function (items, fn) {
    return functional.inject (
	[], items,
	function (collector, item, idx) {
	    collector.push (fn (item, idx))
	    return collector
	}
    )
}

functional.select = function (items, fn) {
    return functional.inject (
	[], items,
	function (collector, item, idx) {
	    if (fn (item, idx)) collector.push (item)
	    return collector
	})
}

functional.detect = function (items, fn) {
    for (var i = 0; i < items.length; i++)
	if (fn (items [i], i)) return items [i]
}

functional.reject = function (items, fn) {
    return functional.select (items, function () {
	return ! fn.apply (undefined, arguments)
    })
}

functional.compact = function (arr) {
    return functional.select (arr, function (item) {
	return !! item
    })
}
