var docs = sibilant.docs = {
  definitions: [],
  undocumented: {  }
};
docs.record = (function docs$record$(name, node) {
  /* docs.record /Users/jbr/code/sibilant/src/docs.sibilant:4:0 */

  var doc = docs.lastDoc;
  (function() {
    if (typeof doc !== "undefined") {
      delete sibilant.docs.undocumented[name];
      return sibilant.docs.definitions.push(mergeInto(doc, {
        name: name,
        definition: node
      }));
    } else {
      return sibilant.docs.undocumented[name] = true;
    }
  }).call(this);
  return delete sibilant.docs.lastDoc;
});
docs.text = (function docs$text$() {
  /* docs.text /Users/jbr/code/sibilant/src/docs.sibilant:13:0 */

  return docs.definitions.map((function(definition) {
    /* /Users/jbr/code/sibilant/src/docs.sibilant:15:17 */
  
    return ("name: " + definition.name + "\n" + "description: " + definition.docString + "\n" + (function() {
      if (definition.references) {
        return ("references:\n" + (definition.references.map((function() {
          /* /Users/jbr/code/sibilant/include/macros.sibilant:620:30 */
        
          return eval(outputFormatter(transpile(arguments[0])));
        })).join("\n") + "\n"));
      } else {
        return "";
      }
    }).call(this) + "arguments: " + prettify(definition.definition.contents[2]) + "\n" + "examples: \n" + map(definition.examples, (function() {
      /* /Users/jbr/code/sibilant/src/docs.sibilant:28:75 */
    
      return (prettify(arguments[0], true) + "\n" + outputFormatter(transpile(arguments[0])));
    })).join("\n\n") + "\n\n");
  })).join("");
});
docs.json = (function docs$json$() {
  /* docs.json /Users/jbr/code/sibilant/src/docs.sibilant:36:0 */

  return JSON.stringify(docs.data());
});
docs.data = (function docs$data$() {
  /* docs.data /Users/jbr/code/sibilant/src/docs.sibilant:39:0 */

  return docs.definitions.map((function(definition) {
    /* /Users/jbr/code/sibilant/src/docs.sibilant:41:22 */
  
    return {
      name: definition.name,
      description: definition.docString,
      references: (function() {
        if (definition.references) {
          return definition.references.map((function() {
            /* /Users/jbr/code/sibilant/include/macros.sibilant:620:30 */
          
            return arguments[0].token.slice(1, -1);
          }));
        } else {
          return [];
        }
      }).call(this),
      arguments: definition.definition.contents[2].contents.map((function() {
        /* /Users/jbr/code/sibilant/include/macros.sibilant:620:30 */
      
        return outputFormatter(transpile(arguments[0]));
      })),
      definition: prettify(definition.definition, false),
      examples: (definition.examples || []).map((function() {
        /* /Users/jbr/code/sibilant/src/docs.sibilant:52:74 */
      
        return {
          javascript: outputFormatter(transpile(arguments[0])),
          sibilant: prettify(arguments[0], false)
        };
      }))
    };
  }));
});