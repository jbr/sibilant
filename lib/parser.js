var parser = {  };
(sibilant)["parser"] = parser;
(parser)["tokens"] = {
  "regex": "(\\/(\\\\\\\/|[^\\/\\n])+\\/[glim]*)",
  "comment": "(;.*)",
  "string": "(\"(([^\"]|(\\\\\"))*[^\\\\])?\")",
  "number": "(-?[0-9][0-9.,]*)",
  "literal": "(-?[*.$a-zA-Z_][*.a-zA-Z0-9-_]*(\\?|!)?)",
  "special": "([&'])",
  "at": "@",
  "tick": "'",
  "hat": "(\\^)",
  "dots": "(\\.+)",
  "otherChar": "([#><=!\\+\\/\\*-]+)",
  "openExpression": "(\\(|\\{|\\[)",
  "closeExpression": "(\\)|\\}|\\])",
  "newline": "\\n",
  "whitespace": "\\s",
  "ignored": "."
};
(parser)["tokenPrecedence"] = [ "regex", "comment", "string", "number", "dots", "tick", "hat", "at", "special", "literal", "otherChar", "openExpression", "closeExpression", "newline", "whitespace", "ignored" ];
(parser)["orderedRegexes"] = parser.tokenPrecedence.map((function(x) {
  /* /Users/jbr/code/sibilant/src/parser.sibilant:41:23 */

  var r = (new RegExp(("^" + (parser.tokens)[x]), undefined));
  (r)["name"] = x;
  return r;
}));
var orderedRegexes = parser.orderedRegexes;
parser.parse = (function parser$parse$(string, context) {
  /* parser.parse /Users/jbr/code/sibilant/src/parser.sibilant:50:0 */

  var context = (function() {
    if (context) {
      return context;
    } else {
      return {
        position: 0,
        stack: [],
        line: 1,
        lastNewline: 0,
        col: 0
      };
    }
  })();
  var match = true,
      regexName = null,
      remainingInput = string;
  (function() {
    var __returnValue__ = undefined;
    while (match) {
      __returnValue__ = (function() {
        /* /Users/jbr/code/sibilant/src/parser.sibilant:60:5 */
      
        detect(orderedRegexes, (function(r) {
          /* /Users/jbr/code/sibilant/src/parser.sibilant:62:20 */
        
          match = r.exec(remainingInput);
          regexName = r.name;
          return match;
        }));
        return (function() {
          if (((typeof match !== 'undefined') && (match !== null))) {
            var matchString = (match)[0],
                length = (matchString)["length"];
            context.stack.push({
              contents: [],
              modifiers: [],
              dir: sibilant.dir,
              file: sibilant.file,
              token: matchString,
              type: regexName,
              start: context.position,
              line: context.line,
              col: context.col,
              length: length
            });
            (function() {
              if (("newline" === regexName)) {
                ((context.line)++);
                (context)["col"] = 0;
                return (context)["lastNewline"] = context.position;
              } else if ((("string" === regexName) && (-1 !== matchString.indexOf("\n")))) {
                var stringNewlineCount = ((matchString.split("\n"))["length"] - 1);
                context.line += stringNewlineCount;
                return (context)["col"] = (length - matchString.lastIndexOf("\n"));
              } else {
                return context.col += length;
              }
            })();
            context.position += length;
            return remainingInput = (function() {
              if (remainingInput.length) {
                return remainingInput.slice(length);
              } else {
                return "";
              }
            })();
          }
        })();
      })();
    };
    return __returnValue__;
  })();
  return context.stack;
});
var parse = parser.parse;