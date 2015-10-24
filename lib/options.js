var bulkMap = (function bulkMap$(arr, fn) {
  /* bulk-map /Users/jbr/code/sibilant/include/functional.sibilant:1:0 */

  var index = 0,
      groupSize = fn.length,
      retArr = [];
  (function() {
    var __returnValue__ = undefined;
    while ((index < arr.length)) {
      __returnValue__ = (function() {
        /* /Users/jbr/code/sibilant/include/functional.sibilant:6:3 */

        retArr.push(fn.apply(undefined, arr.slice(index, (index + groupSize))));
        return index += groupSize;
      })();
    };
    return __returnValue__;
  })();
  return retArr;
});
var inject = (function inject$(start, items, fn) {
  /* inject /Users/jbr/code/sibilant/include/functional.sibilant:13:1 */

  var value = start;
  (function() {
    if (((items) && typeof (items) === "object" && (items).constructor.name === "Array")) {
      return items.forEach((function(item, index) {
        /* /Users/jbr/code/sibilant/include/functional.sibilant:16:5 */

        return value = fn(value, item, index);
      }));
    }
  })();
  return value;
});
var map = (function map$(items, fn) {
  /* map /Users/jbr/code/sibilant/include/functional.sibilant:20:1 */

  return inject([], items, (function(collector, item, index) {
    /* /Users/jbr/code/sibilant/include/functional.sibilant:21:3 */

    collector.push(fn(item, index));
    return collector;
  }));
});
var select = (function select$(items, fn) {
  /* select /Users/jbr/code/sibilant/include/functional.sibilant:26:1 */

  return inject([], items, (function(collector, item, index) {
    /* /Users/jbr/code/sibilant/include/functional.sibilant:27:3 */

    (function() {
      if (fn(item, index)) {
        return collector.push(item);
      }
    })();
    return collector;
  }));
});
var detect = (function detect$(items, fn) {
  /* detect /Users/jbr/code/sibilant/include/functional.sibilant:33:1 */

  var returnItem = undefined,
      index = 0,
      items = (items || []);
  (function() {
    var __returnValue__ = undefined;
    while ((!((items.length === index) || returnItem))) {
      __returnValue__ = (function() {
        /* /Users/jbr/code/sibilant/include/functional.sibilant:38:3 */

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
  return returnItem;
});
var reject = (function reject$(items, fn) {
  /* reject /Users/jbr/code/sibilant/include/functional.sibilant:45:1 */

  var args = [ items, fn ];
  return select(items, (function() {
    /* /Users/jbr/code/sibilant/include/functional.sibilant:47:17 */

    return (!fn.apply(undefined, arguments));
  }));
});
var compact = (function compact$(arr) {
  /* compact /Users/jbr/code/sibilant/include/functional.sibilant:49:1 */

  return select(arr, (function(item) {
    /* /Users/jbr/code/sibilant/include/functional.sibilant:50:3 */

    return (!!(item));
  }));
});
var flatten = (function flatten$(items) {
  /* flatten /Users/jbr/code/sibilant/include/functional.sibilant:53:1 */

  var items = Array.prototype.slice.call(arguments, 0);

  return inject([], items, (function(collector, item) {
    /* /Users/jbr/code/sibilant/include/functional.sibilant:54:3 */

    return collector.concat((function() {
      if (((item) && typeof (item) === "object" && (item).constructor.name === "Array")) {
        return flatten.apply(undefined, item);
      } else {
        return item;
      }
    })());
  }));
});
var extractOptions = (function extractOptions$(config, args) {
  /* extract-options /Users/jbr/code/sibilant/src/options.sibilant:3:1 */

  var args = (args || process.argv.slice(2)),
      defaultLabel = "unlabeled",
      currentLabel = defaultLabel,
      afterBreak = false,
      config = (config || {  }),
      unlabeled = [];
  var label__QUERY = (function label__QUERY$(item) {
    /* label? /Users/jbr/code/sibilant/src/options.sibilant:11:3 */

    return (typeof(item) === "string" && /^-/.test(item));
  });
  var synonymLookup = (function synonymLookup$(item) {
    /* synonym-lookup /Users/jbr/code/sibilant/src/options.sibilant:13:3 */

    var configEntry = (config)[item];
    return (function() {
      if (typeof(configEntry) === "string") {
        return synonymLookup(configEntry);
      } else {
        return item;
      }
    })();
  });
  var takesArgs__QUERY = (function takesArgs__QUERY$(item) {
    /* takes-args? /Users/jbr/code/sibilant/src/options.sibilant:19:3 */

    return (false !== (config)[labelFor(item)]);
  });
  defaultLabel = synonymLookup(defaultLabel);
  currentLabel = defaultLabel;
  var labelFor = (function labelFor$(item) {
    /* label-for /Users/jbr/code/sibilant/src/options.sibilant:25:3 */

    return synonymLookup(item.replace(/^-+/, ""));
  });
  var addValue = (function addValue$(hash, key, value) {
    /* add-value /Users/jbr/code/sibilant/src/options.sibilant:28:3 */

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
  var resetLabel = (function resetLabel$() {
    /* reset-label /Users/jbr/code/sibilant/src/options.sibilant:36:3 */

    return currentLabel = defaultLabel;
  });
  return inject({  }, args, (function(returnHash, item, index) {
    /* /Users/jbr/code/sibilant/src/options.sibilant:39:3 */

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
var processOptions = (function processOptions$(config) {
  /* process-options /Users/jbr/code/sibilant/src/options.sibilant:54:1 */

  var options = extractOptions(config);
  (function() {
    if (config) {
      var handlePair = (function handlePair$(key, value) {
        /* handle-pair /Users/jbr/code/sibilant/src/options.sibilant:57:5 */

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
        /* /Users/jbr/code/sibilant/src/options.sibilant:61:5 */

        return handlePair(key, (options)[key]);
      }));
    }
  })();
  return options;
});
(module)["exports"] = processOptions;