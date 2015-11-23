var coreNamespace = {  },
    macroNamespaces = { core: coreNamespace };
(sibilant)["state"] = {  };
(sibilant)["macros"] = {
  "namespaces": macroNamespaces,
  "defaultSearchPath": [ "core" ],
  "searchPath": [ "core" ],
  "namespace": coreNamespace
};
var namespace = sibilant.macros.namespace,
    macros = sibilant.macros.namespace;
var hasKey__QUERY = (function hasKey__QUERY$(object, key) {
  /* has-key? /Users/jbr/code/sibilant/src/macros.sibilant:13:0 */

  return object.hasOwnProperty(key);
});
sibilant.resolveMacro = (function sibilant$resolveMacro$(macroName) {
  /* sibilant.resolve-macro /Users/jbr/code/sibilant/src/macros.sibilant:16:0 */

  return (function() {
    if (((-1 !== macroName.indexOf("/")) && (!(-1 !== macroName.indexOf("\n"))))) {
      var pathComponents = macroName.split("/"),
          macro = (hasKey__QUERY(sibilant.macros.namespaces, (pathComponents)[0]) && (sibilant.macros.namespaces)[(pathComponents)[0]][(pathComponents.slice(1)).join("/")]);
      return (function() {
        if (macro) {
          return macro;
        } else {
          return error(("called namespaced macro " + macroName + " but could not find namespace " + (pathComponents)[0] + ". you might need to include the file that defines it first."));
        }
      })();
    } else {
      var namespace = detect(sibilant.macros.searchPath, (function(namespace) {
        /* /Users/jbr/code/sibilant/src/macros.sibilant:28:28 */
      
        return hasKey__QUERY((sibilant.macros.namespaces)[namespace], macroName);
      }));
      return (function() {
        if (namespace) {
          return (sibilant.macros.namespaces)[namespace][macroName];
        }
      })();
    }
  })();
});
sibilant.withDefaultSearchPath = (function sibilant$withDefaultSearchPath$(fn) {
  /* sibilant.with-default-search-path /Users/jbr/code/sibilant/src/macros.sibilant:33:0 */

  var searchPathBefore = sibilant.macros.searchPath;
  (sibilant.macros)["searchPath"] = sibilant.macros.defaultSearchPath;
  var returnValue = fn();
  (sibilant.macros)["searchPath"] = searchPathBefore;
  return returnValue;
});