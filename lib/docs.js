var docs = sibilant.docs = {
  definitions: [],
  undocumented: {  }
};
docs.record = (function docs$record$(type, namespace, name, node) {
  /* docs.record /Users/jbr/code/sibilant/src/docs.sibilant:4:0 */

  var doc = docs.lastDoc;
  (function() {
    if (typeof doc !== "undefined") {
      delete sibilant.docs.undocumented[name];
      return sibilant.docs.definitions.push(mergeInto(doc, {
        name: name,
        type: type,
        namespace: namespace,
        definition: node
      }));
    } else {
      return sibilant.docs.undocumented[name] = true;
    }
  }).call(this);
  return delete sibilant.docs.lastDoc;
});
docs.text = (function docs$text$() {
  /* docs.text /Users/jbr/code/sibilant/src/docs.sibilant:16:0 */

  return docs.definitions.map((function(definition) {
    /* /Users/jbr/code/sibilant/src/docs.sibilant:18:15 */
  
    return ("name: " + definition.type + " " + definition.namespace + "/" + prettify(definition.name) + "\n" + "description: " + definition.docString + "\n" + (function() {
      if (definition.references) {
        return ("references:\n  " + (definition.references.map((function() {
          /* /Users/jbr/code/sibilant-clean/include/macros.sibilant:614:30 */
        
          return eval(outputFormatter(transpile(arguments[0])));
        })).join("\n  ") + "\n"));
      } else {
        return "";
      }
    }).call(this) + "arguments: " + prettify(definition.definition.contents[2]) + "\n" + "examples: \n" + (definition.examples || []).map((function() {
      /* /Users/jbr/code/sibilant/src/docs.sibilant:30:43 */
    
      return (prettify(arguments[0], true) + "\n" + outputFormatter(transpile(arguments[0])));
    })).join("\n\n") + (function() {
      if (definition.tags) {
        return ("tags: " + definition.tags.join(", "));
      } else {
        return "";
      }
    }).call(this) + "\n\n");
  })).join("");
});
docs.json = (function docs$json$() {
  /* docs.json /Users/jbr/code/sibilant/src/docs.sibilant:42:0 */

  return JSON.stringify(docs.data());
});
docs.data = (function docs$data$() {
  /* docs.data /Users/jbr/code/sibilant/src/docs.sibilant:45:0 */

  return docs.definitions.map((function(definition) {
    /* /Users/jbr/code/sibilant/src/docs.sibilant:47:6 */
  
    return {
      name: prettify(definition.name, false),
      namespace: definition.namespace,
      type: definition.type,
      description: definition.docString,
      references: (function() {
        if (definition.references) {
          return definition.references.map((function() {
            /* /Users/jbr/code/sibilant-clean/include/macros.sibilant:614:30 */
          
            return arguments[0].token.slice(1, -1);
          }));
        } else {
          return [];
        }
      }).call(this),
      arguments: definition.definition.contents[2].contents.map((function() {
        /* /Users/jbr/code/sibilant-clean/include/macros.sibilant:614:30 */
      
        return outputFormatter(transpile(arguments[0]));
      })),
      definition: prettify(definition.definition, false),
      examples: (definition.examples || []).map((function() {
        /* /Users/jbr/code/sibilant/src/docs.sibilant:61:30 */
      
        return {
          javascript: outputFormatter(transpile(arguments[0])),
          sibilant: prettify(arguments[0], false)
        };
      })),
      tags: definition.tags
    };
  }));
});