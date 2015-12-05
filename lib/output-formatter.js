var outputFormatter = (function outputFormatter$(node) {
  /* output-formatter /Users/jbr/code/sibilant/src/output-formatter.sibilant:1:0 */

  return (function() {
    if (((node) && typeof (node) === "object" && (node).constructor.name === "Array")) {
      return map(node, outputFormatter).join("");
    } else if (node__QUERY(node, "output")) {
      return outputFormatter(node.contents);
    } else if ((typeof node === "string" || typeof node === "number")) {
      return node;
    } else if (!((typeof node !== "undefined" && node !== null))) {
      return "";
    } else if (node__QUERY(node)) {
      console.log("WE SHOULD NOT BE HERE");
      return outputFormatter(transpile(node));
    }
  }).call(this);
});
sibilant.outputFormatter = outputFormatter;