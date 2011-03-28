var import = require("sibilant/lib/import");
import(require("sibilant/lib/functional"));

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
