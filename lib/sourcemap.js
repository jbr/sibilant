var sourceNode = require("source-map").SourceNode;
var sourceMap = (function sourceMap$(node) {
  /* source-map /Users/jbr/code/sibilant/src/sourcemap.sibilant:3:0 */

  return (function() {
    if (node__QUERY(node, "output")) {
      return (new sourceNode(node.source.line, node.source.col, node.source.file, (function() {
        if (((node.contents) && typeof (node.contents) === "object" && (node.contents).constructor.name === "Array")) {
          return map(node.contents, sourceMap);
        } else {
          return sourceMap(node.contents);
        }
      })()));
    } else if (((typeof node === "string") || (typeof node === "number"))) {
      return node.toString();
    }
  })();
});
var sourcemapper = (function sourcemapper$(node) {
  /* sourcemapper /Users/jbr/code/sibilant/src/sourcemap.sibilant:17:0 */

  var sourceNodes = sourceMap(transpile(node)),
      map = sourceNodes.toStringWithSourceMap().map;
  Object.keys(sibilant.sourceCache).forEach((function(key) {
    /* /Users/jbr/code/sibilant/src/sourcemap.sibilant:21:5 */
  
    return map.setSourceContent(key, sibilant.sourceCache[key]);
  }));
  return map.toString();
});