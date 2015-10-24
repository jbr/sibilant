var restructurers = {  },
    acceptablePairs = {
  "(": ")",
  "[": "]",
  "{": "}"
},
    bracketTypes = {
  "(": "expression",
  "[": "bracket",
  "{": "brace"
};
var restructure = (function restructure$(input) {
  /* restructure /Users/jbr/code/sibilant/src/restructurer.sibilant:7:1 */

  var output = {
    type: "root",
    contents: [],
    modifiers: []
  };
  inject({
    parseStack: [ output ],
    output: output,
    input: input
  }, input, (function(context, token, index) {
    /* /Users/jbr/code/sibilant/src/restructurer.sibilant:9:6 */

    var restructurer = ((restructurers)[token.type] || restructurers.default);
    return restructurer(token, context, index);
  }));
  return output;
});
(sibilant)["restructure"] = restructure;
restructurers.openExpression = (function restructurers$openExpression$(token, context, index) {
  /* restructurers.open-expression /Users/jbr/code/sibilant/src/restructurer.sibilant:17:1 */

  var first = (context.parseStack)[0];
  (token)["contents"] = [];
  (token)["type"] = (bracketTypes)[token.token];
  (token)["parent"] = first;
  first.contents.push(token);
  context.parseStack.unshift(token);
  return context;
});
var codeContext = (function codeContext$(node, context) {
  /* code-context /Users/jbr/code/sibilant/src/restructurer.sibilant:26:1 */

  var context = (context || 5);
  return (function() {
    if (node.input) {
      var n = (node.col - 1),
          pointer = "",
          lines = Array.prototype.slice.call(node.input.split("\n"), (node.line - context), (node.line + context));
      (function() {
        var __returnValue__ = undefined;
        while (((n)--)) {
          __returnValue__ = (function() {
            /* /Users/jbr/code/sibilant/src/restructurer.sibilant:37:11 */

            return pointer = pointer.concat("-");
          })();
        };
        return __returnValue__;
      })();
      return (Array.prototype.slice.call(lines, 0, context).concat([ (pointer + "^") ])
        .concat(Array.prototype.slice.call(lines, context, (2 * context)))
      ).join("\n");
    } else {
      return sibilant.prettyPrint(node);
    }
  })();
});
restructurers.closeExpression = (function restructurers$closeExpression$(node, context, index) {
  /* restructurers.close-expression /Users/jbr/code/sibilant/src/restructurer.sibilant:44:1 */

  var first = (context.parseStack)[0];
  (function() {
    if (((acceptablePairs)[first.token] !== node.token)) {
      throw new Error (("trying to close " + first.token + " with " + node.token + ": \n" + codeContext(node)))
    }
  })();
  (first)["end"] = node.end;
  context.parseStack.shift();
  (function() {
    if ((context.parseStack.length === 0)) {
      throw new Error (("unbalanced parens:\n" + inspect(parseStack)))
    }
  })();
  return context;
});
restructurers.hat = (function restructurers$hat$(node, context, index) {
  /* restructurers.hat /Users/jbr/code/sibilant/src/restructurer.sibilant:56:1 */

  var nextNode = (context.input)[(1 + index)];
  nextNode.modifiers.push(node);
  return context;
});
restructurers.dots = (function restructurers$dots$(node, context, index) {
  /* restructurers.dots /Users/jbr/code/sibilant/src/restructurer.sibilant:61:1 */

  var nextNode = (context.input)[(1 + index)];
  nextNode.modifiers.push(node);
  return context;
});
restructurers.tick = (function restructurers$tick$(node, context, index) {
  /* restructurers.tick /Users/jbr/code/sibilant/src/restructurer.sibilant:66:1 */

  var nextNode = (context.input)[(1 + index)];
  nextNode.modifiers.push(node);
  return context;
});
restructurers.whitespace = (function restructurers$whitespace$(token, context, index) {
  /* restructurers.whitespace */

  return context;
});
restructurers.newline = (function restructurers$newline$(token, context, index) {
  /* restructurers.newline */

  return context;
});
restructurers.ignored = (function restructurers$ignored$(token, context, index) {
  /* restructurers.ignored */

  return context;
});
restructurers.default = (function restructurers$default$(token, context, index) {
  /* restructurers.default /Users/jbr/code/sibilant/src/restructurer.sibilant:75:1 */

  ((context.parseStack)[0])["contents"].push(token);
  return context;
});