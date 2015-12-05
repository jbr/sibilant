sibilant.docs = {
  definitions: [],
  undocumented: (new Set())
};
sibilant.docs.record = (function sibilant$docs$record$(name, node) {
  /* sibilant.docs.record /Users/jbr/code/sibilant/src/docs.sibilant:3:0 */

  var doc = sibilant.docs.lastDoc;
  (function() {
    if (typeof doc !== "undefined") {
      sibilant.docs.undocumented.delete(name);
      return sibilant.docs.definitions.push(mergeInto(doc, {
        name: name,
        definition: node
      }));
    } else {
      return sibilant.docs.undocumented.add(name);
    }
  }).call(this);
  return delete sibilant.docs.lastDoc;
});
sibilant.docs.asText = (function sibilant$docs$asText$() {
  /* sibilant.docs.as-text /Users/jbr/code/sibilant/src/docs.sibilant:12:0 */

  var cdl = require("cardinal");
  sibilant.docs.definitions.forEach((function(definition) {
    /* /Users/jbr/code/sibilant/src/docs.sibilant:14:5 */
  
    return (function() {
      try {
        return console.log(("name: " + definition.name + "\n" + "description: " + definition.docString + "\n" + (function() {
          if (definition.references) {
            return ("references:\n" + (definition.references.map((function() {
              /* /Users/jbr/code/sibilant/src/docs.sibilant:20:63 */
            
              return eval(outputFormatter(transpile(arguments[0])));
            })).join("\n") + "\n"));
          } else {
            return "";
          }
        }).call(this) + "arguments: " + prettify(definition.definition.contents[2]) + "\n" + "examples: \n" + map(definition.examples, (function() {
          /* /Users/jbr/code/sibilant/src/docs.sibilant:28:49 */
        
          return (prettify(arguments[0], true) + "\n" + cdl.highlight(outputFormatter(transpile(arguments[0]))));
        })).join("\n\n") + "\n\n"));
      } catch (e) {
        console.log(definition);
        throw e
      }
    }).call(this);
  }));
  console.log(("undocumented (" + sibilant.docs.undocumented.size + "):\n"));
  return sibilant.docs.undocumented.forEach((function(name) {
    /* /Users/jbr/code/sibilant/src/docs.sibilant:36:5 */
  
    return console.log(name);
  }));
});