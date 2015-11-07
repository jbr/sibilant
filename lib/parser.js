var parser = {  };
(sibilant)["parser"] = parser;
(parser)["tokens"] = {
  "regex": "(\\/(\\\\\\\/|[^\\/\\n])+\\/[glim]*)",
  "comment": "(;.*)",
  "string": "(\"(([^\"]|(\\\\\"))*[^\\\\])?\")",
  "number": "(-?[0-9][0-9.,]*)",
  "literal": "(-?[*.$a-zA-Z_][*.a-zA-Z0-9-_]*(\\?|!)?)",
  "special": "([&'])",
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
(parser)["tokenPrecedence"] = [ "regex", "comment", "string", "number", "dots", "tick", "hat", "special", "literal", "otherChar", "openExpression", "closeExpression", "newline", "whitespace", "ignored" ];
(parser)["orderedRegexes"] = parser.tokenPrecedence.map((function(x) {
  /* /Users/jbr/code/sibilant/src/parser.sibilant:38:23 */

  var r = (new RegExp(("^" + (parser.tokens)[x]), undefined));
  (r)["name"] = x;
  return r;
}));
var orderedRegexes = parser.orderedRegexes;
parser.parse = (function parser$parse$(string, context) {
  /* parser.parse /Users/jbr/code/sibilant/src/parser.sibilant:48:1 */

  var context = (function() {
    if (context) {
      return context;
    } else {
      return {
        position: 0,
        stack: [],
        line: 1,
        lastNewline: 0
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
        /* /Users/jbr/code/sibilant/src/parser.sibilant:48:1 */
      
        detect(orderedRegexes, (function(r) {
          /* /Users/jbr/code/sibilant/src/parser.sibilant:59:13 */
        
          match = r.exec(remainingInput);
          regexName = r.name;
          return match;
        }));
        return (function() {
          if (((typeof match !== 'undefined') && (match !== null))) {
            var matchString = (match)[0],
                length = (matchString)["length"],
                nextPosition = (context.position + length);
            (function() {
              if (("newline" === regexName)) {
                ((context.line)++);
                
                return (context)["lastNewline"] = context.position;
              }
            })();
            (function() {
              if ((("string" === regexName) && (-1 !== matchString.indexOf("\n")))) {
                var stringNewlineCount = ((matchString.split("\n"))["length"] - 1);
                context.line += stringNewlineCount;
                
                return (context)["lastNewline"] = (context.position + matchString.lastIndexOf("\n"));
              }
            })();
            context.stack.push({
              contents: [],
              modifiers: [],
              dir: sibilant.dir,
              file: sibilant.file,
              token: matchString,
              type: regexName,
              start: context.position,
              line: context.line,
              col: (context.position - context.lastNewline),
              end: nextPosition
            });
            (context)["position"] = nextPosition;
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