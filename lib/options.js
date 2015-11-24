var bulkMap = (function bulkMap$(arr, fn) {
  /* bulk-map /Users/jbr/code/sibilant/include/functional.sibilant:1:0 */

  var index = 0,
      groupSize = fn.length,
      retArr = [];
  (function() {
    var $_symbol11_$ = undefined;
    while ((index < arr.length)) {
      $_symbol11_$ = (function() {
        retArr.push(fn.apply(this, arr.slice(index, (index + groupSize))));
        return index += groupSize;
      })();
    };
    return $_symbol11_$;
  })();
  return retArr;
});
var inject = (function inject$(start, items, fn) {
  /* inject /Users/jbr/code/sibilant/include/functional.sibilant:13:0 */

  var value = start;
  (function() {
    if (((items) && typeof (items) === "object" && (items).constructor.name === "Array")) {
      return items.forEach((function(item, index) {
        /* /Users/jbr/code/sibilant/include/functional.sibilant:16:4 */
      
        return value = fn(value, item, index);
      }));
    }
  })();
  return value;
});
var map = (function map$(items, fn) {
  /* map /Users/jbr/code/sibilant/include/functional.sibilant:20:0 */

  return inject([], items, (function(collector, item, index) {
    /* /Users/jbr/code/sibilant/include/functional.sibilant:22:10 */
  
    collector.push(fn(item, index));
    return collector;
  }));
});
var select = (function select$(items, fn) {
  /* select /Users/jbr/code/sibilant/include/functional.sibilant:26:0 */

  return inject([], items, (function(collector, item, index) {
    /* /Users/jbr/code/sibilant/include/functional.sibilant:28:10 */
  
    (function() {
      if (fn(item, index)) {
        return collector.push(item);
      }
    })();
    return collector;
  }));
});
var detect = (function detect$(items, fn) {
  /* detect /Users/jbr/code/sibilant/include/functional.sibilant:33:0 */

  var returnItem = undefined,
      index = 0,
      items = (items || []);
  (function() {
    var $_symbol12_$ = undefined;
    while ((!((items.length === index) || returnItem))) {
      $_symbol12_$ = (function() {
        (function() {
          if (fn(items[index], index)) {
            return returnItem = items[index];
          }
        })();
        return ((index)++);
      })();
    };
    return $_symbol12_$;
  })();
  return returnItem;
});
var all__QUERY = (function all__QUERY$(items, fn) {
  /* all? /Users/jbr/code/sibilant/include/functional.sibilant:45:0 */

  return (typeof detect(items, (function(item, index) {
    /* /Users/jbr/code/sibilant/include/functional.sibilant:46:31 */
  
    return (!fn(item, index));
  })) === "undefined");
});
var none__QUERY = (function none__QUERY$(items, fn) {
  /* none? /Users/jbr/code/sibilant/include/functional.sibilant:48:0 */

  return (typeof detect(items, fn) === "undefined");
});
var any__QUERY = (function any__QUERY$(items, fn) {
  /* any? /Users/jbr/code/sibilant/include/functional.sibilant:51:0 */

  return (typeof detect(items, fn) !== "undefined");
});
var reject = (function reject$(items, fn) {
  /* reject /Users/jbr/code/sibilant/include/functional.sibilant:54:0 */

  var args = [ items, fn ];
  return select(items, (function() {
    /* /Users/jbr/code/sibilant/include/functional.sibilant:56:16 */
  
    return (!fn.apply(this, arguments));
  }));
});
var compact = (function compact$(arr) {
  /* compact /Users/jbr/code/sibilant/include/functional.sibilant:58:0 */

  return select(arr, (function(item) {
    /* /Users/jbr/code/sibilant/include/functional.sibilant:59:17 */
  
    return ((null !== item) && (false !== item) && (typeof item !== "undefined"));
  }));
});
var interleave = (function interleave$(glue, arr) {
  /* interleave /Users/jbr/code/sibilant/include/functional.sibilant:65:0 */

  return (function() {
    if (((glue) && typeof (glue) === "object" && (glue).constructor.name === "Array")) {
      return inject([], arr, (function(collector, item, index) {
        /* /Users/jbr/code/sibilant/include/functional.sibilant:67:13 */
      
        return collector.concat([ item, glue[index] ]);
      }));
    } else {
      return inject([ arr[0] ], arr.slice(1), (function(collector, item, index) {
        /* /Users/jbr/code/sibilant/include/functional.sibilant:72:13 */
      
        return collector.concat([ glue, item ]);
      }));
    }
  })();
});
var flatten = (function flatten$(items) {
  /* flatten /Users/jbr/code/sibilant/include/functional.sibilant:75:0 */

  var items = Array.prototype.slice.call(arguments, 0);

  return inject([], items, (function(collector, item) {
    /* /Users/jbr/code/sibilant/include/functional.sibilant:77:10 */
  
    return collector.concat((function() {
      if (((item) && typeof (item) === "object" && (item).constructor.name === "Array")) {
        return flatten.apply(this, item);
      } else {
        return item;
      }
    })());
  }));
});
var recurseMap = (function recurseMap$(item, fn) {
  /* recurse-map /Users/jbr/code/sibilant/include/functional.sibilant:84:0 */

  return (function() {
    if (((item) && typeof (item) === "object" && (item).constructor.name === "Array")) {
      return map(item, (function(subitem) {
        /* /Users/jbr/code/sibilant/include/functional.sibilant:85:32 */
      
        return recurseMap(subitem, fn);
      }));
    } else {
      return fn(item);
    }
  })();
});
var pluck = (function pluck$(items, attribute) {
  /* pluck /Users/jbr/code/sibilant/include/functional.sibilant:88:0 */

  return map(items, (function(item) {
    /* /Users/jbr/code/sibilant/include/functional.sibilant:89:16 */
  
    return item[attribute];
  }));
});
var mergeInto = (function mergeInto$(into, from) {
  /* merge-into /Users/jbr/code/sibilant/include/functional.sibilant:91:0 */

  Object.keys(from).forEach((function(key) {
    /* /Users/jbr/code/sibilant/include/functional.sibilant:92:5 */
  
    return into[key] = from[key];
  }));
  return into;
});
var clone = (function clone$(object) {
  /* clone /Users/jbr/code/sibilant/include/functional.sibilant:95:0 */

  return inject({  }, Object.keys(object), (function(collector, key) {
    /* /Users/jbr/code/sibilant/include/functional.sibilant:97:13 */
  
    collector[key] = object[key];
    return collector;
  }));
});
var mapValues = (function mapValues$(object, fn) {
  /* map-values /Users/jbr/code/sibilant/include/functional.sibilant:101:0 */

  return inject({  }, Object.keys(object), (function(collector, key, index) {
    /* /Users/jbr/code/sibilant/include/functional.sibilant:103:13 */
  
    collector[key] = fn(object[key], key);
    return collector;
  }));
});
var mergeWith = (function mergeWith$(into, from) {
  /* merge-with /Users/jbr/code/sibilant/include/functional.sibilant:107:0 */

  return mergeInto(clone(into), from);
});
var extractOptions = (function extractOptions$(config, args) {
  /* extract-options /Users/jbr/code/sibilant/src/options.sibilant:3:0 */

  args = ((typeof args !== "undefined")) ? args : process.argv.slice(2);
  var defaultLabel = "unlabeled",
      currentLabel = defaultLabel,
      afterBreak = false,
      config = (config || {  }),
      unlabeled = [];
  var label__QUERY = (function label__QUERY$(item) {
    /* label? /Users/jbr/code/sibilant/src/options.sibilant:11:5 */
  
    return (typeof(item) === "string" && /^-/.test(item));
  });
  var synonymLookup = (function synonymLookup$(item) {
    /* synonym-lookup /Users/jbr/code/sibilant/src/options.sibilant:13:5 */
  
    var configEntry = config[item];
    return (function() {
      if (typeof(configEntry) === "string") {
        return synonymLookup(configEntry);
      } else {
        return item;
      }
    })();
  });
  var takesArgs__QUERY = (function takesArgs__QUERY$(item) {
    /* takes-args? /Users/jbr/code/sibilant/src/options.sibilant:19:5 */
  
    return (false !== config[labelFor(item)]);
  });
  defaultLabel = synonymLookup(defaultLabel);
  currentLabel = defaultLabel;
  var labelFor = (function labelFor$(item) {
    /* label-for /Users/jbr/code/sibilant/src/options.sibilant:25:5 */
  
    return synonymLookup(item.replace(/^-+/, ""));
  });
  var addValue = (function addValue$(hash, key, value) {
    /* add-value /Users/jbr/code/sibilant/src/options.sibilant:28:5 */
  
    var currentValue = hash[key];
    (function() {
      if ((typeof currentValue === "undefined")) {
        currentValue = [];
        return hash[key] = currentValue;
      }
    })();
    return (function() {
      if ((true !== value)) {
        return currentValue.push(value);
      }
    })();
  });
  var resetLabel = (function resetLabel$() {
    /* reset-label /Users/jbr/code/sibilant/src/options.sibilant:36:5 */
  
    return currentLabel = defaultLabel;
  });
  return inject({  }, args, (function(returnHash, item, index) {
    /* /Users/jbr/code/sibilant/src/options.sibilant:40:13 */
  
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
  /* process-options /Users/jbr/code/sibilant/src/options.sibilant:54:0 */

  var options = extractOptions(config);
  (function() {
    if (config) {
      var handlePair = (function handlePair$(key, value) {
        /* handle-pair /Users/jbr/code/sibilant/src/options.sibilant:57:11 */
      
        var handle = config[key];
        (function() {
          if (typeof(handle) === "string") {
            return handlePair(handle, value);
          }
        })();
        return (function() {
          if ((typeof handle === "function")) {
            return handle(value, options);
          }
        })();
      });
      return Object.keys(options).forEach((function(key) {
        /* /Users/jbr/code/sibilant/src/options.sibilant:61:11 */
      
        return handlePair(key, options[key]);
      }));
    }
  })();
  return options;
});
module.exports = processOptions;