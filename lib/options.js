var bulkMap = (function bulkMap$(arr, fn) {
  /* bulk-map include/functional.sibilant:1:0 */

  var index = 0,
      groupSize = fn.length,
      retArr = [];
  (function() {
    var while$4 = undefined;
    while (index < arr.length) {
      while$4 = (function() {
        retArr.push(fn.apply(this, arr.slice(index, (index + groupSize))));
        return index += groupSize;
      }).call(this);
    };
    return while$4;
  }).call(this);
  return retArr;
});
var inject = (function inject$(start, items, fn) {
  /* inject include/functional.sibilant:13:0 */

  return (function() {
    if ((items && "object" === typeof items && "Array" === items.constructor.name)) {
      return items.reduce(fn, start);
    } else {
      return start;
    }
  }).call(this);
});
var map = (function map$(items, fn) {
  /* map include/functional.sibilant:18:0 */

  return (function() {
    if ((items && "object" === typeof items && "Array" === items.constructor.name)) {
      return items.map(fn);
    } else {
      return [];
    }
  }).call(this);
});
var select = (function select$(items, fn) {
  /* select include/functional.sibilant:23:0 */

  return (function() {
    if ((items && "object" === typeof items && "Array" === items.constructor.name)) {
      return items.filter(fn);
    } else {
      return [];
    }
  }).call(this);
});
var detect = (function detect$(items, fn) {
  /* detect include/functional.sibilant:28:0 */

  return (function() {
    if ((items && "object" === typeof items && "Array" === items.constructor.name)) {
      return items.find(fn);
    }
  }).call(this);
});
var all__QUERY = (function all__QUERY$(items, fn) {
  /* all? include/functional.sibilant:32:0 */

  return (function() {
    if ((items && "object" === typeof items && "Array" === items.constructor.name)) {
      return items.every(fn);
    }
  }).call(this);
});
var none__QUERY = (function none__QUERY$(items, fn) {
  /* none? include/functional.sibilant:36:0 */

  return (function() {
    if ((items && "object" === typeof items && "Array" === items.constructor.name)) {
      return !(items.some(fn));
    }
  }).call(this);
});
var any__QUERY = (function any__QUERY$(items, fn) {
  /* any? include/functional.sibilant:40:0 */

  return (function() {
    if ((items && "object" === typeof items && "Array" === items.constructor.name)) {
      return items.some(fn);
    }
  }).call(this);
});
var reject = (function reject$(items, fn) {
  /* reject include/functional.sibilant:44:0 */

  return select(items, (function() {
    /* include/functional.sibilant:45:16 */
  
    return !(fn.apply(this, arguments));
  }));
});
var compact = (function compact$(arr) {
  /* compact include/functional.sibilant:48:0 */

  return select(arr, (function(item) {
    /* include/functional.sibilant:49:17 */
  
    return (null !== item && false !== item && typeof item !== "undefined");
  }));
});
var unique = (function unique$(arr) {
  /* unique include/functional.sibilant:55:0 */

  return inject([], arr, (function(coll, item) {
    /* include/functional.sibilant:57:13 */
  
    return (function() {
      if (coll.indexOf(item) !== -1) {
        return coll;
      } else {
        return coll.concat([ item ]);
      }
    }).call(this);
  }));
});
var interleave = (function interleave$(glue, arr) {
  /* interleave include/functional.sibilant:63:0 */

  (function() {
    if ((typeof arr === "string" && (glue && "object" === typeof glue && "Array" === glue.constructor.name))) {
      var temp = glue;
      glue = arr;
      return arr = temp;
    }
  }).call(this);
  return (function() {
    if ((glue && "object" === typeof glue && "Array" === glue.constructor.name)) {
      return inject([], arr, (function(collector, item, index) {
        /* include/functional.sibilant:69:13 */
      
        return collector.concat([ item, glue[index] ]);
      }));
    } else {
      return inject([ arr[0] ], arr.slice(1), (function(collector, item, index) {
        /* include/functional.sibilant:73:13 */
      
        return collector.concat([ glue, item ]);
      }));
    }
  }).call(this);
});
var flatten = (function flatten$(items, predicate) {
  /* flatten include/functional.sibilant:76:0 */

  return (function() {
    if ((items && "object" === typeof items && "Array" === items.constructor.name)) {
      return inject([], items, (function(collector, item) {
        /* include/functional.sibilant:79:17 */
      
        return (function() {
          if ((!(predicate) || predicate(item))) {
            return collector.concat((function() {
              if ((item && "object" === typeof item && "Array" === item.constructor.name)) {
                return flatten(item, predicate);
              } else {
                return item;
              }
            }).call(this));
          } else {
            return collector;
          }
        }).call(this);
      }));
    } else if ((!(predicate) || predicate(items))) {
      return [ items ];
    } else {
      return [];
    }
  }).call(this);
});
var flatCompact = (function flatCompact$(items) {
  /* flat-compact include/functional.sibilant:89:0 */

  return flatten(items, (function(item) {
    /* include/functional.sibilant:90:20 */
  
    return (null !== item && false !== item && typeof item !== "undefined");
  }));
});
var recurseMap = (function recurseMap$(item, fn) {
  /* recurse-map include/functional.sibilant:96:0 */

  return (function() {
    if ((item && "object" === typeof item && "Array" === item.constructor.name)) {
      return map(item, (function(subitem) {
        /* include/functional.sibilant:97:32 */
      
        return recurseMap(subitem, fn);
      }));
    } else {
      return fn(item);
    }
  }).call(this);
});
var pluck = (function pluck$(items, attribute) {
  /* pluck include/functional.sibilant:100:0 */

  return map(items, (function(item) {
    /* include/functional.sibilant:101:16 */
  
    return item[attribute];
  }));
});
var mergeInto = (function mergeInto$(into, from) {
  /* merge-into include/functional.sibilant:103:0 */

  return Object.assign(into, from);
});
var clone = (function clone$(object) {
  /* clone include/functional.sibilant:106:0 */

  return Object.assign({  }, object);
});
var values = (function values$(object) {
  /* values include/functional.sibilant:109:0 */

  return map(Object.keys(object), (function() {
    /* include/functional.sibilant:110:26 */
  
    return object[arguments[0]];
  }));
});
var mapValues = (function mapValues$(object, fn) {
  /* map-values include/functional.sibilant:112:0 */

  return inject({  }, Object.keys(object), (function(collector, key, index) {
    /* include/functional.sibilant:114:13 */
  
    collector[key] = fn(object[key], key);
    return collector;
  }));
});
var mergeWith = (function mergeWith$(into, from) {
  /* merge-with include/functional.sibilant:118:0 */

  return Object.assign({  }, into, from);
});
var extractOptions = (function extractOptions$(config, args) {
  /* extract-options src/options.sibilant:3:0 */

  args = (typeof args !== "undefined") ? args : process.argv.slice(2);
  var defaultLabel = "unlabeled",
      currentLabel = defaultLabel,
      afterBreak = false,
      config = (config || {  }),
      unlabeled = [];
  var label__QUERY = (function label__QUERY$(item) {
    /* label? src/options.sibilant:11:5 */
  
    return (typeof item === "string" && (new RegExp("^-", undefined)).test(item));
  });
  var synonymLookup = (function synonymLookup$(item) {
    /* synonym-lookup src/options.sibilant:13:5 */
  
    var configEntry = config[item];
    return (function() {
      if (typeof configEntry === "string") {
        return synonymLookup(configEntry);
      } else {
        return item;
      }
    }).call(this);
  });
  var takesArgs__QUERY = (function takesArgs__QUERY$(item) {
    /* takes-args? src/options.sibilant:19:5 */
  
    return false !== config[labelFor(item)];
  });
  defaultLabel = synonymLookup(defaultLabel);
  currentLabel = defaultLabel;
  var labelFor = (function labelFor$(item) {
    /* label-for src/options.sibilant:25:5 */
  
    return synonymLookup(item.replace((new RegExp("^-+", undefined)), ""));
  });
  var addValue = (function addValue$(hash, key, value) {
    /* add-value src/options.sibilant:28:5 */
  
    var currentValue = hash[key];
    (function() {
      if (typeof currentValue === "undefined") {
        currentValue = [];
        return hash[key] = currentValue;
      }
    }).call(this);
    return (function() {
      if (true !== value) {
        return currentValue.push(value);
      }
    }).call(this);
  });
  var resetLabel = (function resetLabel$() {
    /* reset-label src/options.sibilant:36:5 */
  
    return currentLabel = defaultLabel;
  });
  return inject({  }, args, (function(returnHash, item, index) {
    /* src/options.sibilant:40:13 */
  
    (function() {
      if ("--" === item) {
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
                  if (!(takesArgs__QUERY(item))) {
                    return resetLabel();
                  }
                }).call(this);
              } else {
                addValue(returnHash, currentLabel, item);
                return resetLabel();
              }
            }).call(this);
          }
        }).call(this);
      }
    }).call(this);
    return returnHash;
  }));
});
var processOptions = (function processOptions$(config) {
  /* process-options src/options.sibilant:54:0 */

  var options = extractOptions(config);
  (function() {
    if (config) {
      var handlePair = (function handlePair$(key, value) {
        /* handle-pair src/options.sibilant:57:11 */
      
        var handle = config[key];
        (function() {
          if (typeof handle === "string") {
            return handlePair(handle, value);
          }
        }).call(this);
        return (function() {
          if (typeof handle === "function") {
            return handle(value, options);
          }
        }).call(this);
      });
      return Object.keys(options).forEach((function(key) {
        /* src/options.sibilant:61:11 */
      
        return handlePair(key, options[key]);
      }));
    }
  }).call(this);
  return options;
});
module.exports = processOptions;