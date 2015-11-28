sibilant.docs = { definitions: [] };
sibilant.docs.record = (function sibilant$docs$record$(name, node) {
  /* sibilant.docs.record /Users/jbr/code/sibilant/src/docs.sibilant:3:0 */

  var doc = sibilant.docs.lastDoc;
  (function() {
    if ((typeof doc !== "undefined")) {
      return sibilant.docs.definitions.push(mergeInto(doc, {
        name: name,
        definition: node
      }));
    }
  })();
  return delete sibilant.docs.lastDoc;
});
sibilant.docs.asText = (function sibilant$docs$asText$() {
  /* sibilant.docs.as-text /Users/jbr/code/sibilant/src/docs.sibilant:9:0 */

  var cdl = require("cardinal");
  return sibilant.docs.definitions.forEach((function(definition) {
    /* /Users/jbr/code/sibilant/src/docs.sibilant:11:5 */
  
    return console.log(("name: " + definition.name + "\n" + "description: " + definition.docString + "\n" + "arguments: " + prettify(definition.definition.contents[2]) + "\n" + "examples: \n" + map(definition.examples, (function() {
      /* /Users/jbr/code/sibilant/src/docs.sibilant:18:49 */
    
      return (prettify(arguments[0], true) + "\n" + cdl.highlight(outputFormatter(transpile(arguments[0]))));
    })).join("\n\n") + "\n\n"));
  }));
});