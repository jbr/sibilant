var import = require("sibilant/import");
import(require("sibilant/functional"));

var extractOptions = (function(config, args) {
  // config:required args:optional
  if (arguments.length < 2) // if args is missing
    var args = undefined;
  
  var args = (args || process.argv.slice(2)),
      defaultLabel = "unlabeled",
      currentLabel = defaultLabel,
      config = (config || {  }),
      unlabeled = [  ];;
  var labelQ = (function(item) {
    // item:required
    return /^-/(item);
  });
  ;
  var synonymLookup = (function(item) {
    // item:required
    return (function() {
      if (typeof((config)[item]) === "string") {
        return (config)[item];
      } else {
        return item;
      };
    })();
  });
  ;
  defaultLabel = synonymLookup(defaultLabel);
  currentLabel = defaultLabel;;
  var labelFor = (function(item) {
    // item:required
    return synonymLookup(item.replace(/^-+/, ""));
  });
  ;
  var addValue = (function(hash, key, value) {
    // hash:required key:required value:required
    var currentValue = (hash)[key];;
    (function() {
      if (typeof(currentValue) === "undefined") {
        currentValue = [  ];;
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
  return inject({  }, args, (function(returnHash, item, index) {
    // return-hash:required item:required index:required
    (function() {
      if (labelQ(item)) {
        currentLabel = labelFor(item);;
        return addValue(returnHash, currentLabel, true);;
      } else {
        addValue(returnHash, currentLabel, item);
        return currentLabel = defaultLabel;;;
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
          if ((typeof handle === 'function')) {
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
