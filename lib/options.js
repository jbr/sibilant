var bulkMap = (function(arr, fn) {
  var index = 0,
      groupSize = fn.length,
      retArr = [];
  (function() {
    var __returnValue__ = undefined;
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
  var value = start;
  (function() {
    if ((items) && (items).constructor.name === "Array") {
      return items.forEach((function(item, index) {
        return value = fn(value, item, index);
      }));
    }
  })();
  return value;
});

var map = (function(items, fn) {
  return inject([], items, (function(collector, item, index) {
    collector.push(fn(item, index));
    return collector;
  }));
});

var select = (function(items, fn) {
  return inject([], items, (function(collector, item, index) {
    (function() {
      if (fn(item, index)) {
        return collector.push(item);
      }
    })();
    return collector;
  }));
});

var detect = (function(items, fn) {
  var returnItem = undefined,
      index = 0,
      items = items;
  return (function() {
    var __returnValue__ = undefined;
    while ((!((items.length === index) || returnItem))) {
      __returnValue__ = (function() {
        (function() {
          if (fn((items)[index], index)) {
            return returnItem = (items)[index];
          }
        })();
        return ((index)++);
      })();
    };
    return __returnValue__;
  })();
});

var reject = (function(items, fn) {
  var args = [ items, fn ];
  return select(items, (function() {
    return (!fn.apply(undefined, arguments));
  }));
});

var compact = (function(arr) {
  return select(arr, (function(item) {
    return (!!(item));
  }));
});

var flatten = (function(items) {
  var items = Array.prototype.slice.call(arguments, 0);
  
  return inject([], items, (function(collector, item) {
    return collector.concat((function() {
      if ((item) && (item).constructor.name === "Array") {
        return flatten.apply(undefined, item);
      } else {
        return item;
      }
    })());
  }));
});


var extractOptions = (function(config, args) {
  var args = (args || process.argv.slice(2)),
      defaultLabel = "unlabeled",
      currentLabel = defaultLabel,
      afterBreak = false,
      config = (config || {  }),
      unlabeled = [];
  var label__QUERY = (function(item) {
    return (typeof(item) === "string" && /^-/.test(item));
  });
  ;
  var synonymLookup = (function(item) {
    var configEntry = (config)[item];
    return (function() {
      if (typeof(configEntry) === "string") {
        return synonymLookup(configEntry);
      } else {
        return item;
      }
    })();
  });
  ;
  var takesArgs__QUERY = (function(item) {
    return (false !== (config)[labelFor(item)]);
  });
  ;
  defaultLabel = synonymLookup(defaultLabel);
  currentLabel = defaultLabel;
  var labelFor = (function(item) {
    return synonymLookup(item.replace(/^-+/, ""));
  });
  ;
  var addValue = (function(hash, key, value) {
    var currentValue = (hash)[key];
    (function() {
      if ((typeof currentValue === 'undefined')) {
        currentValue = [];
        return (hash)[key] = currentValue;
      }
    })();
    return (function() {
      if ((true !== value)) {
        return currentValue.push(value);
      }
    })();
  });
  ;
  var resetLabel = (function() {
    return currentLabel = defaultLabel;
  });
  ;
  return inject({  }, args, (function(returnHash, item, index) {
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
                  }
                })();
              } else {
                addValue(returnHash, currentLabel, item);
                return resetLabel();
              }
            })();
          }
        })();
      }
    })();
    return returnHash;
  }));
});

var processOptions = (function(config) {
  var options = extractOptions(config);
  (function() {
    if (config) {
      var handlePair = (function(key, value) {
        var handle = (config)[key];
        (function() {
          if (typeof(handle) === "string") {
            return handlePair(handle, value);
          }
        })();
        return (function() {
          if ((typeof handle === 'function')) {
            return handle(value, options);
          }
        })();
      });
      return Object.keys(options).forEach((function(key) {
        return handlePair(key, (options)[key]);
      }));
    }
  })();
  return options;
});

(module)["exports"] = processOptions;
