var functional = exports;
var bulkMap = (function(arr, fn) {
  // arr:required fn:required
  var index = 0,
      groupSize = fn.length,
      retArr = [  ];;
  (function() {
    var __returnValue__ = undefined;;
    while ((index < arr.length)) {
      __returnValue__ = (function() {
        retArr.push(fn.apply(undefined, arr.slice(index, (index + groupSize))));
        return index += groupSize;
      })();
    };
    return __returnValue__;
  })();
  return retArr;
});

var inject = (function(start, items, fn) {
  // start:required items:required fn:required
  var value = start;;
  (function() {
    if ((items) && (items).constructor.name === "Array") {
      return items.forEach((function(item, index) {
        // item:required index:required
        return value = fn(value, item, index);
      }));
    };
  })();
  return value;
});

var map = (function(items, fn) {
  // items:required fn:required
  return inject([  ], items, (function(collector, item, index) {
    // collector:required item:required index:required
    collector.push(fn(item, index));
    return collector;
  }));
});

var select = (function(items, fn) {
  // items:required fn:required
  return inject([  ], items, (function(collector, item, index) {
    // collector:required item:required index:required
    (function() {
      if (fn(item, index)) {
        return collector.push(item);
      };
    })();
    return collector;
  }));
});

var detect = (function(items, fn) {
  // items:required fn:required
  var returnItem = undefined,
      index = 0,
      items = items;;
  return (function() {
    var __returnValue__ = undefined;;
    while ((!((items.length === index) || returnItem))) {
      __returnValue__ = (function() {
        (function() {
          if (fn((items)[index], index)) {
            return returnItem = (items)[index];
          };
        })();
        return ((index)++);
      })();
    };
    return __returnValue__;
  })();
});

var reject = (function(items, fn) {
  // items:required fn:required
  var args = [ items, fn ];;
  return select(items, (function() {
    return (!fn.apply(undefined, args));
  }));
});

var compact = (function(arr) {
  // arr:required
  return select(arr, (function(item) {
    // item:required
    return (!!(item));
  }));
});

[ "inject", "map", "select", "detect", "reject", "compact", "bulkMap" ].forEach((function(exportFunction) {
  // exportFunction:required
  return (exports)[exportFunction] = eval(exportFunction);;
}))
