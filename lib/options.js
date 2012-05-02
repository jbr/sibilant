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
    return (!fn.apply(undefined, arguments));
  }));
});

var compact = (function(arr) {
  // arr:required
  return select(arr, (function(item) {
    // item:required
    return (!!(item));
  }));
});

var flatten = (function(items) {
  // items:rest
  var items = Array.prototype.slice.call(arguments, 0);
  
  return inject([  ], items, (function(collector, item) {
    // collector:required item:required
    return collector.concat((function() {
      if ((item) && (item).constructor.name === "Array") {
        return flatten.apply(undefined, item);
      } else {
        return item;
      };
    })());
  }));
});


var extractOptions = (function(config, args) {
  // config:required args:optional
  if (arguments.length < 2) // if args is missing
    var args = undefined;
  
  var args = (args || process.argv.slice(2)),
      defaultLabel = "unlabeled",
      currentLabel = defaultLabel,
      afterBreak = false,
      config = (config || {  }),
      unlabeled = [  ];;
  var label__QUERY = (function(item) {
    // item:required
    return (typeof(item) === "string" && /^-/.test(item));
  });
  ;
  var synonymLookup = (function(item) {
    // item:required
    var configEntry = (config)[item];;
    return (function() {
      if (typeof(configEntry) === "string") {
        return synonymLookup(configEntry);
      } else {
        return item;
      };
    })();
  });
  ;
  var takesArgs__QUERY = (function(item) {
    // item:required
    return (false !== (config)[labelFor(item)]);
  });
  ;
  defaultLabel = synonymLookup(defaultLabel)
  currentLabel = defaultLabel;
  var labelFor = (function(item) {
    // item:required
    return synonymLookup(item.replace(/^-+/, ""));
  });
  ;
  var addValue = (function(hash, key, value) {
    // hash:required key:required value:required
    var currentValue = (hash)[key];;
    (function() {
      if (typeof(currentValue) === 'undefined') {
        currentValue = [  ];
        return (hash)[key] = currentValue;;
      };
    })();
    return (function() {
      if ((true !== value)) {
        return currentValue.push(value);
      };
    })();
  });
  ;
  var resetLabel = (function() {
    return currentLabel = defaultLabel;
  });
  ;
  return inject({  }, args, (function(returnHash, item, index) {
    // returnHash:required item:required index:required
    (function() {
      if (("--" === item)) {
        return afterBreak = true;
      } else {
        return (function() {
          if (afterBreak) {
            return addValue(returnHash, "afterBreak", item);
          } else {
            return (function() {
              if (label__QUERY(item)) {
                currentLabel = labelFor(item);
                addValue(returnHash, currentLabel, true);
                return (function() {
                  if ((!takesArgs__QUERY(item))) {
                    return resetLabel();
                  };
                })();;
              } else {
                addValue(returnHash, currentLabel, item);
                return resetLabel();;
              };
            })();
          };
        })();
      };
    })();
    return returnHash;
  }));
});

var processOptions = (function(config) {
  // config:optional
  if (arguments.length < 1) // if config is missing
    var config = undefined;
  
  var options = extractOptions(config);;
  (function() {
    if (config) {
      var handlePair = (function(key, value) {
        // key:required value:required
        var handle = (config)[key];;
        (function() {
          if (typeof(handle) === "string") {
            return handlePair(handle, value);
          };
        })();
        return (function() {
          if (typeof(handle) === 'function') {
            return handle.apply(undefined, value);
          };
        })();
      });
      ;
      return Object.keys(options).forEach((function(key) {
        // key:required
        return handlePair(key, (options)[key]);
      }));
    };
  })();
  return options;
});

(module)["exports"] = processOptions;
