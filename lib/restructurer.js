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
  /* restructure src/restructurer.sibilant:7:0 */

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
    ignoredTokens: [],
    specials: 0
  };
  inject(context, input, (function(context, token, index) {
    /* src/restructurer.sibilant:20:13 */
  
    var restructurer = (restructurers[token.type] || restructurers.default);
    return restructurer(token, context, index);
  }));
  (function() {
    if (!(1 === context.parseStack.length)) {
      var unclosedNode = context.parseStack[0];
      throw (new Error(("unclosed node at " + unclosedNode.file + ":" + unclosedNode.line + ":" + unclosedNode.col + "\n  " + prettify(unclosedNode, false).slice(0, 100))))
    }
  }).call(this);
  return output;
});
sibilant.restructure = restructure;
restructurers.openExpression = (function restructurers$openExpression$(token, context) {
  /* restructurers.open-expression src/restructurer.sibilant:35:0 */

  var first = context.parseStack[0];
  token.contents = [];
  token.type = bracketTypes[token.token];
  acceptIgnoredTokens(token, context);
  acceptSpecials(token, context);
  first.contents.push(token);
  context.parseStack.unshift(token);
  return context;
});
restructurers.closeExpression = (function restructurers$closeExpression$(node, context, index) {
  /* restructurers.close-expression src/restructurer.sibilant:47:0 */

  var first = context.parseStack[0];
  (function() {
    if (node__QUERY(first, "root")) {
      throw (new Error(("unexpected " + node.token + " on " + node.file + ":" + node.line + ":" + node.col)))
    }
  }).call(this);
  (function() {
    if (acceptablePairs[first.token] !== node.token) {
      throw (new Error(("trying to close " + yellow(sibilant.prettyPrint(first)) + "\n   on " + first.file + ":" + first.line + ":" + first.col + "\n   with " + sibilant.prettyPrint(node) + "\n   on " + node.file + ":" + node.line + ":" + node.col + "\n")))
    }
  }).call(this);
  first.end = node.end;
  first.closed = true;
  first.closingIgnored = context.ignoredTokens;
  context.ignoredTokens = [];
  context.parseStack.shift();
  closeSpecials(first, context);
  (function() {
    if (context.parseStack.length === 0) {
      throw (new Error(("unbalanced parens:\n" + inspect(parseStack))))
    }
  }).call(this);
  return context;
});
var openSpecial = (function openSpecial$(node, context) {
  /* open-special src/restructurer.sibilant:72:0 */

  ((context.specials)++);
  acceptIgnoredTokens(node, context);
  var first = context.parseStack[0];
  node.contents = [];
  first.contents.push(node);
  context.parseStack.unshift(node);
  return context;
});
var acceptSpecials = (function acceptSpecials$(node, context) {
  /* accept-specials src/restructurer.sibilant:85:0 */

  node.specials = context.specials;
  context.specials = 0;
  return context;
});
var acceptIgnoredTokens = (function acceptIgnoredTokens$(node, context) {
  /* accept-ignored-tokens src/restructurer.sibilant:90:0 */

  node.precedingIgnored = context.ignoredTokens;
  context.ignoredTokens = [];
  return context;
});
var closeSpecials = (function closeSpecials$(node, context) {
  /* close-specials src/restructurer.sibilant:95:0 */

  (function() {
    if (node.specials > 0) {
      ((node.specials)--);
      context.parseStack.shift();
      return closeSpecials(node, context);
    }
  }).call(this);
  return context;
});
var accumulateIgnoredToken = (function accumulateIgnoredToken$(token, context, index) {
  /* accumulate-ignored-token src/restructurer.sibilant:103:0 */

  context.ignoredTokens.push(token);
  return context;
});
[ "hat", "dots", "tick", "at" ].forEach((function(special) {
  /* src/restructurer.sibilant:107:0 */

  return restructurers[special] = openSpecial;
}));
[ "whitespace", "newline", "ignored", "comment" ].forEach((function(ignored) {
  /* src/restructurer.sibilant:110:0 */

  return restructurers[ignored] = accumulateIgnoredToken;
}));
restructurers.default = (function restructurers$default$(token, context, index) {
  /* restructurers.default src/restructurer.sibilant:113:0 */

  acceptSpecials(token, context);
  acceptIgnoredTokens(token, context);
  context.parseStack[0].contents.push(token);
  return closeSpecials(token, context);
});