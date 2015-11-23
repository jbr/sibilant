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
  /* restructure /Users/jbr/code/sibilant/src/restructurer.sibilant:7:0 */

  var output = {
    type: "root",
    contents: [],
    file: sibilant.file,
    col: 0,
    line: 1
  },
      context = {
    parseStack: [ output ],
    output: output,
    input: input,
    specials: 0
  };
  inject(context, input, (function(context, token, index) {
    /* /Users/jbr/code/sibilant/src/restructurer.sibilant:19:13 */
  
    var restructurer = (restructurers[token.type] || restructurers.default);
    return restructurer(token, context, index);
  }));
  (function() {
    if ((!(1 === context.parseStack.length))) {
      throw new Error (("unclosed node: " + prettify(context.parseStack[0], false)))
    }
  })();
  return output;
});
sibilant.restructure = restructure;
restructurers.openExpression = (function restructurers$openExpression$(token, context) {
  /* restructurers.open-expression /Users/jbr/code/sibilant/src/restructurer.sibilant:30:0 */

  var first = context.parseStack[0];
  token.contents = [];
  token.type = bracketTypes[token.token];
  token.parent = first;
  acceptSpecials(token, context);
  first.contents.push(token);
  context.parseStack.unshift(token);
  return context;
});
restructurers.closeExpression = (function restructurers$closeExpression$(node, context, index) {
  /* restructurers.close-expression /Users/jbr/code/sibilant/src/restructurer.sibilant:42:0 */

  var first = context.parseStack[0];
  (function() {
    if (node__QUERY(first, "root")) {
      throw new Error (("unexpected " + node.token + " on " + node.file + ":" + node.line + ":" + node.col))
    }
  })();
  (function() {
    if ((acceptablePairs[first.token] !== node.token)) {
      throw new Error (("trying to close " + yellow(sibilant.prettyPrint(first)) + "\n   on " + first.file + ":" + first.line + ":" + first.col + "\n   with " + sibilant.prettyPrint(node) + "\n   on " + node.file + ":" + node.line + ":" + node.col + "\n"))
    }
  })();
  first.end = node.end;
  first.closed = true;
  context.parseStack.shift();
  closeSpecials(first, context);
  (function() {
    if ((context.parseStack.length === 0)) {
      throw new Error (("unbalanced parens:\n" + inspect(parseStack)))
    }
  })();
  return context;
});
var openSpecial = (function openSpecial$(node, context) {
  /* open-special /Users/jbr/code/sibilant/src/restructurer.sibilant:62:0 */

  ((context.specials)++);
  var first = context.parseStack[0];
  node.contents = [];
  node.parent = first;
  first.contents.push(node);
  context.parseStack.unshift(node);
  return context;
});
var acceptSpecials = (function acceptSpecials$(node, context) {
  /* accept-specials /Users/jbr/code/sibilant/src/restructurer.sibilant:74:0 */

  node.specials = context.specials;
  context.specials = 0;
  return context;
});
var closeSpecials = (function closeSpecials$(node, context) {
  /* close-specials /Users/jbr/code/sibilant/src/restructurer.sibilant:79:0 */

  (function() {
    if ((node.specials > 0)) {
      ((node.specials)--);
      context.parseStack.shift();
      return closeSpecials(node, context);
    }
  })();
  return context;
});
restructurers.hat = (function restructurers$hat$(node, context, index) {
  /* restructurers.hat /Users/jbr/code/sibilant/src/restructurer.sibilant:86:0 */

  return openSpecial(node, context);
});
restructurers.dots = (function restructurers$dots$(node, context, index) {
  /* restructurers.dots /Users/jbr/code/sibilant/src/restructurer.sibilant:87:0 */

  return openSpecial(node, context);
});
restructurers.tick = (function restructurers$tick$(node, context, index) {
  /* restructurers.tick /Users/jbr/code/sibilant/src/restructurer.sibilant:88:0 */

  return openSpecial(node, context);
});
restructurers.at = (function restructurers$at$(node, context, index) {
  /* restructurers.at /Users/jbr/code/sibilant/src/restructurer.sibilant:89:0 */

  return openSpecial(node, context);
});
restructurers.whitespace = (function restructurers$whitespace$(token, context, index) {
  /* restructurers.whitespace /Users/jbr/code/sibilant/src/restructurer.sibilant:91:0 */

  return context;
});
restructurers.newline = (function restructurers$newline$(token, context, index) {
  /* restructurers.newline /Users/jbr/code/sibilant/src/restructurer.sibilant:92:0 */

  return context;
});
restructurers.comment = (function restructurers$comment$(token, context, index) {
  /* restructurers.comment /Users/jbr/code/sibilant/src/restructurer.sibilant:93:0 */

  return context;
});
restructurers.ignored = (function restructurers$ignored$(token, context, index) {
  /* restructurers.ignored /Users/jbr/code/sibilant/src/restructurer.sibilant:94:0 */

  return context;
});
restructurers.default = (function restructurers$default$(token, context, index) {
  /* restructurers.default /Users/jbr/code/sibilant/src/restructurer.sibilant:96:0 */

  acceptSpecials(token, context);
  context.parseStack[0].contents.push(token);
  return closeSpecials(token, context);
});