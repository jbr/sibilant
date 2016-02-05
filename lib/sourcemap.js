var sourceNode = require("source-map").SourceNode;
var sourceMap = (function sourceMap$(node) {
  /* source-map src/sourcemap.sibilant:3:0 */

  return (function() {
    if (node__QUERY(node, "output")) {
      return (new sourceNode(node.source.line, node.source.col, node.source.file, (function() {
        if (((node.contents) && typeof (node.contents) === "object" && (node.contents).constructor.name === "Array")) {
          return map(node.contents, sourceMap);
        } else {
          return sourceMap(node.contents);
        }
      }).call(this)));
    } else if ((typeof node === "string" || typeof node === "number")) {
      return node.toString();
    }
  }).call(this);
});
var sourcemapper = (function sourcemapper$(untranspiledNode) {
  /* sourcemapper src/sourcemap.sibilant:16:0 */

  return _sourcemapper(transpile(untranspiledNode));
});
var _sourcemapper = (function _sourcemapper$(transpiledNode) {
  /* *sourcemapper src/sourcemap.sibilant:19:0 */

  var sourceNodes = sourceMap(transpiledNode),
      map = sourceNodes.toStringWithSourceMap().map;
  Object.keys(sibilant.sourceCache).forEach((function(key) {
    /* src/sourcemap.sibilant:23:5 */
  
    return map.setSourceContent(key, sibilant.sourceCache[key]);
  }));
  return map.toString();
});