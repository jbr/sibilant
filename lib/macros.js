var coreNamespace = {  },
    macroNamespaces = { core: coreNamespace };
sibilant.state = {  };
sibilant.macros = {
  "namespaces": macroNamespaces,
  "defaultSearchPath": [ "core" ],
  "searchPath": [ "core" ],
  "namespace": coreNamespace
};
var namespace = sibilant.macros.namespace,
    macros = sibilant.macros.namespace;
sibilant.macros.currentNamespace = (function sibilant$macros$currentNamespace$() {
  /* sibilant.macros.current-namespace src/macros.sibilant:14:0 */

  return sibilant.macros.namespaces[sibilant.macros.searchPath[0]];
});
sibilant.resolveMacro = (function sibilant$resolveMacro$(macroName) {
  /* sibilant.resolve-macro src/macros.sibilant:17:0 */

  return (function() {
    if ((macroName.indexOf("/") !== -1 && 1 < macroName.length && !(macroName.indexOf("\n") !== -1))) {
      var pathComponents = macroName.split("/"),
          macro = (sibilant.macros.namespaces.hasOwnProperty(pathComponents[0]) && sibilant.macros.namespaces[pathComponents[0]][pathComponents.slice(1).join("/")]);
      return (function() {
        if (macro) {
          return macro;
        } else {
          return error(("called namespaced macro " + macroName + " but could not find namespace " + pathComponents[0] + ". you might need to include the file that defines it first."));
        }
      }).call(this);
    } else {
      var namespace = detect(sibilant.macros.searchPath, (function(namespace) {
        /* src/macros.sibilant:29:33 */
      
        return sibilant.macros.namespaces[namespace].hasOwnProperty(macroName);
      }));
      return (function() {
        if (namespace) {
          return sibilant.macros.namespaces[namespace][macroName];
        }
      }).call(this);
    }
  }).call(this);
});
sibilant.withDefaultSearchPath = (function sibilant$withDefaultSearchPath$(fn) {
  /* sibilant.with-default-search-path src/macros.sibilant:34:0 */

  var searchPathBefore = sibilant.macros.searchPath;
  sibilant.macros.searchPath = sibilant.macros.defaultSearchPath;
  var returnValue = fn();
  sibilant.macros.searchPath = searchPathBefore;
  return returnValue;
});
sibilant.macros.namespaces.core.ternary = (function ternary$(cond, ifTrue, ifFalse) {
  /* ternary include/macros.sibilant:9:0 */

  return [ "(", transpile(cond), ") ? ", transpile(ifTrue), " : ", transpile(ifFalse) ];
});
sibilant.macros.namespaces.core.set = (function set$(arr, kvPairs) {
  /* set include/macros.sibilant:19:0 */

  var kvPairs = Array.prototype.slice.call(arguments, 1);

  return interleave("\n", bulkMap(kvPairs, (function(k, v) {
    /* include/macros.sibilant:21:34 */
  
    return asStatement([ "(", transpile(arr), ")", "[", transpile(k), "] = ", transpile(v) ]);
  })));
});
sibilant.macros.namespaces.core.var = (function var$(pairs) {
  /* var include/macros.sibilant:25:0 */

  var pairs = Array.prototype.slice.call(arguments, 0);

  return asStatement([ "var ", interleave(",\n    ", bulkMap(pairs, (function(name, value) {
    /* include/macros.sibilant:30:25 */
  
    return [ transpile(name), " = ", transpile(value) ];
  }))) ]);
});
sibilant.macros.namespaces.core.get = (function get$(obj, keys) {
  /* get include/macros.sibilant:35:0 */

  var keys = Array.prototype.slice.call(arguments, 1);

  return [ "(", transpile(obj), ")", map(keys, (function(key) {
    /* include/macros.sibilant:36:42 */
  
    return [ "[", transpile(key), "]" ];
  })) ];
});
sibilant.macros.namespaces.core.aliasMacro = (function aliasMacro$(currentMacroName, newMacroName) {
  /* alias-macro include/macros.sibilant:47:0 */

  var currentMacroName = outputFormatter(transpile(currentMacroName)),
      newMacroName = outputFormatter(transpile(newMacroName));
  sibilant.macros.namespace[newMacroName] = sibilant.macros.namespace[currentMacroName];
  return null;
});
sibilant.macros.namespaces.core.send = (function send$(object, method, args) {
  /* send include/macros.sibilant:62:0 */

  var args = Array.prototype.slice.call(arguments, 2);

  return [ transpile(object), ".", transpile(method), "(", interleave(", ", map(args, transpile)), ")" ];
});
sibilant.macros.namespaces.core.apply = (function apply$(fn, arglist) {
  /* apply include/macros.sibilant:74:0 */

  return {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 2119,
    line: 75,
    col: 8,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: ".",
      type: "dots",
      start: 2120,
      line: 75,
      col: 9,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "apply",
        type: "literal",
        start: 2121,
        line: 75,
        col: 10,
        length: 5,
        contents: [],
        specials: 0,
        precedingIgnored: []
      } ],
      precedingIgnored: []
    }, fn, {
      dir: "include",
      file: "include/macros.sibilant",
      token: "this",
      type: "literal",
      start: 2131,
      line: 75,
      col: 20,
      length: 4,
      contents: [],
      specials: 0,
      precedingIgnored: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: " ",
        type: "whitespace",
        start: 2130,
        line: 75,
        col: 19,
        length: 1,
        contents: []
      } ]
    }, arglist ],
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core.cons = (function cons$(first, rest) {
  /* cons include/macros.sibilant:86:0 */

  return [ "[ ", transpile(first), " ].concat(", transpile(rest), ")" ];
});
sibilant.macros.namespaces.core.append = (function append$(list, additional) {
  /* append include/macros.sibilant:95:0 */

  var additional = Array.prototype.slice.call(arguments, 1);

  return {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 2690,
    line: 96,
    col: 8,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: ".",
      type: "dots",
      start: 2691,
      line: 96,
      col: 9,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "concat",
        type: "literal",
        start: 2692,
        line: 96,
        col: 10,
        length: 6,
        contents: [],
        specials: 0,
        precedingIgnored: []
      } ],
      precedingIgnored: []
    }, list, {
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 2705,
      line: 96,
      col: 23,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "list",
        type: "literal",
        start: 2706,
        line: 96,
        col: 24,
        length: 4,
        contents: [],
        specials: 0,
        precedingIgnored: []
      } ].concat(additional),
      precedingIgnored: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: " ",
        type: "whitespace",
        start: 2704,
        line: 96,
        col: 22,
        length: 1,
        contents: []
      } ],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    } ],
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core.length = (function length$(arr) {
  /* length include/macros.sibilant:102:0 */

  return {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 2871,
    line: 103,
    col: 8,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: "get",
      type: "literal",
      start: 2872,
      line: 103,
      col: 9,
      length: 3,
      contents: [],
      specials: 0,
      precedingIgnored: []
    }, arr, {"dir":"include","file":"include/macros.sibilant","token":"'","type":"tick","start":2881,"line":103,"col":18,"length":1,"contents":[{"dir":"include","file":"include/macros.sibilant","token":"length","type":"literal","start":2882,"line":103,"col":19,"length":6,"contents":[],"specials":0,"precedingIgnored":[]}],"precedingIgnored":[{"dir":"include","file":"include/macros.sibilant","token":" ","type":"whitespace","start":2880,"line":103,"col":17,"length":1,"contents":[]}]} ],
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core.scoped = (function scoped$(body) {
  /* scoped include/macros.sibilant:109:0 */

  var body = Array.prototype.slice.call(arguments, 0);

  return {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 3126,
    line: 110,
    col: 8,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: ".",
      type: "dots",
      start: 3127,
      line: 110,
      col: 9,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "call",
        type: "literal",
        start: 3128,
        line: 110,
        col: 10,
        length: 4,
        contents: [],
        specials: 0,
        precedingIgnored: []
      } ],
      precedingIgnored: []
    }, {
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 3133,
      line: 110,
      col: 15,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "lambda",
        type: "literal",
        start: 3134,
        line: 110,
        col: 16,
        length: 6,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, {
        node: this,
        args: []
      } ].concat(body),
      precedingIgnored: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: " ",
        type: "whitespace",
        start: 3132,
        line: 110,
        col: 14,
        length: 1,
        contents: []
      } ],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    }, {
      dir: "include",
      file: "include/macros.sibilant",
      token: "this",
      type: "literal",
      start: 3172,
      line: 110,
      col: 54,
      length: 4,
      contents: [],
      specials: 0,
      precedingIgnored: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: " ",
        type: "whitespace",
        start: 3171,
        line: 110,
        col: 53,
        length: 1,
        contents: []
      } ]
    } ],
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core.first = (function first$(arr) {
  /* first include/macros.sibilant:130:0 */

  return {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 3954,
    line: 130,
    col: 20,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: "get",
      type: "literal",
      start: 3955,
      line: 130,
      col: 21,
      length: 3,
      contents: [],
      specials: 0,
      precedingIgnored: []
    }, arr, {
      dir: "include",
      file: "include/macros.sibilant",
      token: "0",
      type: "number",
      start: 3964,
      line: 130,
      col: 30,
      length: 1,
      contents: [],
      specials: 0,
      precedingIgnored: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: " ",
        type: "whitespace",
        start: 3963,
        line: 130,
        col: 29,
        length: 1,
        contents: []
      } ]
    } ],
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core.second = (function second$(arr) {
  /* second include/macros.sibilant:131:0 */

  return {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 3989,
    line: 131,
    col: 21,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: "get",
      type: "literal",
      start: 3990,
      line: 131,
      col: 22,
      length: 3,
      contents: [],
      specials: 0,
      precedingIgnored: []
    }, arr, {
      dir: "include",
      file: "include/macros.sibilant",
      token: "1",
      type: "number",
      start: 3999,
      line: 131,
      col: 31,
      length: 1,
      contents: [],
      specials: 0,
      precedingIgnored: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: " ",
        type: "whitespace",
        start: 3998,
        line: 131,
        col: 30,
        length: 1,
        contents: []
      } ]
    } ],
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core.third = (function third$(arr) {
  /* third include/macros.sibilant:132:0 */

  return {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 4023,
    line: 132,
    col: 20,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: "get",
      type: "literal",
      start: 4024,
      line: 132,
      col: 21,
      length: 3,
      contents: [],
      specials: 0,
      precedingIgnored: []
    }, arr, {
      dir: "include",
      file: "include/macros.sibilant",
      token: "2",
      type: "number",
      start: 4033,
      line: 132,
      col: 30,
      length: 1,
      contents: [],
      specials: 0,
      precedingIgnored: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: " ",
        type: "whitespace",
        start: 4032,
        line: 132,
        col: 29,
        length: 1,
        contents: []
      } ]
    } ],
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core.rest = (function rest$(arr) {
  /* rest include/macros.sibilant:138:0 */

  return {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 4170,
    line: 138,
    col: 19,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: ".",
      type: "dots",
      start: 4171,
      line: 138,
      col: 20,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "slice",
        type: "literal",
        start: 4172,
        line: 138,
        col: 21,
        length: 5,
        contents: [],
        specials: 0,
        precedingIgnored: []
      } ],
      precedingIgnored: []
    }, arr, {
      dir: "include",
      file: "include/macros.sibilant",
      token: "1",
      type: "number",
      start: 4183,
      line: 138,
      col: 32,
      length: 1,
      contents: [],
      specials: 0,
      precedingIgnored: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: " ",
        type: "whitespace",
        start: 4182,
        line: 138,
        col: 31,
        length: 1,
        contents: []
      } ]
    } ],
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core.last = (function last$(arr) {
  /* last include/macros.sibilant:143:0 */

  return {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 4330,
    line: 143,
    col: 19,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: "first",
      type: "literal",
      start: 4331,
      line: 143,
      col: 20,
      length: 5,
      contents: [],
      specials: 0,
      precedingIgnored: []
    }, {
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 4337,
      line: 143,
      col: 26,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: ".",
        type: "dots",
        start: 4338,
        line: 143,
        col: 27,
        length: 1,
        contents: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: "slice",
          type: "literal",
          start: 4339,
          line: 143,
          col: 28,
          length: 5,
          contents: [],
          specials: 0,
          precedingIgnored: []
        } ],
        precedingIgnored: []
      }, arr, {
        dir: "include",
        file: "include/macros.sibilant",
        token: "-1",
        type: "number",
        start: 4350,
        line: 143,
        col: 39,
        length: 2,
        contents: [],
        specials: 0,
        precedingIgnored: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 4349,
          line: 143,
          col: 38,
          length: 1,
          contents: []
        } ]
      } ],
      precedingIgnored: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: " ",
        type: "whitespace",
        start: 4336,
        line: 143,
        col: 25,
        length: 1,
        contents: []
      } ],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    } ],
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core["="] = (function $$(a, b) {
  /* = include/macros.sibilant:146:0 */

  return [ transpile(a), " === ", transpile(b) ];
});
sibilant.macros.namespaces.core["+"] = (function $$(args) {
  /* + include/macros.sibilant:153:0 */

  var args = Array.prototype.slice.call(arguments, 0);

  return [ "(", interleave(" + ", map(args, transpile)), ")" ];
});
sibilant.macros.namespaces.core["-"] = (function $$(args) {
  /* - include/macros.sibilant:160:0 */

  var args = Array.prototype.slice.call(arguments, 0);

  return [ "(", interleave(" - ", map(args, transpile)), ")" ];
});
sibilant.macros.namespaces.core["_"] = (function _$(args) {
  /* * include/macros.sibilant:166:0 */

  var args = Array.prototype.slice.call(arguments, 0);

  return [ "(", interleave(" * ", map(args, transpile)), ")" ];
});
sibilant.macros.namespaces.core["/"] = (function $$(args) {
  /* / include/macros.sibilant:173:0 */

  var args = Array.prototype.slice.call(arguments, 0);

  return [ "(", interleave(" / ", map(args, transpile)), ")" ];
});
sibilant.macros.namespaces.core.or = (function or$(args) {
  /* or include/macros.sibilant:180:0 */

  var args = Array.prototype.slice.call(arguments, 0);

  return [ "(", interleave(" || ", map(args, transpile)), ")" ];
});
sibilant.macros.namespaces.core.and = (function and$(args) {
  /* and include/macros.sibilant:188:0 */

  var args = Array.prototype.slice.call(arguments, 0);

  return (1 === args.length) ? transpile(args[0]) : [ "(", interleave(" && ", map(args, transpile)), ")" ];
});
sibilant.macros.namespaces.core.mod = (function mod$(args) {
  /* mod include/macros.sibilant:195:0 */

  var args = Array.prototype.slice.call(arguments, 0);

  return [ "(", interleave(" % ", map(args, transpile)), ")" ];
});
sibilant.macros.namespaces.core[">"] = (function $$(args) {
  /* > include/macros.sibilant:230:0 */

  var args = Array.prototype.slice.call(arguments, 0);

  var jsComparator = ">";
  return {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 7292,
    line: 232,
    col: 8,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: "and",
      type: "literal",
      start: 7293,
      line: 232,
      col: 9,
      length: 3,
      contents: [],
      specials: 0,
      precedingIgnored: []
    } ].concat(map(args.slice(0, -1), (function(item, index) {
      /* include/macros.sibilant:233:22 */
    
      return [ item, " ", jsComparator, " ", args[(1 + index)] ];
    }))),
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core["<"] = (function $$(args) {
  /* < include/macros.sibilant:237:0 */

  var args = Array.prototype.slice.call(arguments, 0);

  var jsComparator = "<";
  return {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 7504,
    line: 239,
    col: 8,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: "and",
      type: "literal",
      start: 7505,
      line: 239,
      col: 9,
      length: 3,
      contents: [],
      specials: 0,
      precedingIgnored: []
    } ].concat(map(args.slice(0, -1), (function(item, index) {
      /* include/macros.sibilant:240:22 */
    
      return [ item, " ", jsComparator, " ", args[(1 + index)] ];
    }))),
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core["<="] = (function $$(args) {
  /* <= include/macros.sibilant:243:0 */

  var args = Array.prototype.slice.call(arguments, 0);

  var jsComparator = "<=";
  return {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 7717,
    line: 245,
    col: 8,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: "and",
      type: "literal",
      start: 7718,
      line: 245,
      col: 9,
      length: 3,
      contents: [],
      specials: 0,
      precedingIgnored: []
    } ].concat(map(args.slice(0, -1), (function(item, index) {
      /* include/macros.sibilant:246:22 */
    
      return [ item, " ", jsComparator, " ", args[(1 + index)] ];
    }))),
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core[">="] = (function $$(args) {
  /* >= include/macros.sibilant:249:0 */

  var args = Array.prototype.slice.call(arguments, 0);

  var jsComparator = ">=";
  return {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 7930,
    line: 251,
    col: 8,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: "and",
      type: "literal",
      start: 7931,
      line: 251,
      col: 9,
      length: 3,
      contents: [],
      specials: 0,
      precedingIgnored: []
    } ].concat(map(args.slice(0, -1), (function(item, index) {
      /* include/macros.sibilant:252:22 */
    
      return [ item, " ", jsComparator, " ", args[(1 + index)] ];
    }))),
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core["!="] = (function $$(args) {
  /* != include/macros.sibilant:254:0 */

  var args = Array.prototype.slice.call(arguments, 0);

  var jsComparator = "!==";
  return {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 8143,
    line: 256,
    col: 8,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: "and",
      type: "literal",
      start: 8144,
      line: 256,
      col: 9,
      length: 3,
      contents: [],
      specials: 0,
      precedingIgnored: []
    } ].concat(map(args.slice(0, -1), (function(item, index) {
      /* include/macros.sibilant:257:22 */
    
      return [ item, " ", jsComparator, " ", args[(1 + index)] ];
    }))),
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core["="] = (function $$(args) {
  /* = include/macros.sibilant:260:0 */

  var args = Array.prototype.slice.call(arguments, 0);

  var jsComparator = "===";
  return {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 8356,
    line: 262,
    col: 8,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: "and",
      type: "literal",
      start: 8357,
      line: 262,
      col: 9,
      length: 3,
      contents: [],
      specials: 0,
      precedingIgnored: []
    } ].concat(map(args.slice(0, -1), (function(item, index) {
      /* include/macros.sibilant:263:22 */
    
      return [ item, " ", jsComparator, " ", args[(1 + index)] ];
    }))),
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core.incrBy = (function incrBy$(item, increment) {
  /* incr-by include/macros.sibilant:270:0 */

  return [ transpile(item), " += ", transpile(increment) ];
});
sibilant.macros.namespaces.core.incr = (function incr$(item) {
  /* incr include/macros.sibilant:279:0 */

  return [ "((", transpile(item), ")++)" ];
});
sibilant.macros.namespaces.core.decr = (function decr$(item) {
  /* decr include/macros.sibilant:286:0 */

  return [ "((", transpile(item), ")--)" ];
});
sibilant.macros.namespaces.core.new = (function new$(constructor, args) {
  /* new include/macros.sibilant:293:0 */

  var args = Array.prototype.slice.call(arguments, 1);

  return [ "(new ", {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 9213,
    line: 294,
    col: 17,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: "call",
      type: "literal",
      start: 9214,
      line: 294,
      col: 18,
      length: 4,
      contents: [],
      specials: 0,
      precedingIgnored: []
    }, constructor ].concat(args),
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  }, ")" ];
});
sibilant.macros.namespaces.core.regex = (function regex$(pattern, flags) {
  /* regex include/macros.sibilant:301:0 */

  return {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 9458,
    line: 302,
    col: 8,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: "new",
      type: "literal",
      start: 9459,
      line: 302,
      col: 9,
      length: 3,
      contents: [],
      specials: 0,
      precedingIgnored: []
    }, {
      dir: "include",
      file: "include/macros.sibilant",
      token: "RegExp",
      type: "literal",
      start: 9463,
      line: 302,
      col: 13,
      length: 6,
      contents: [],
      specials: 0,
      precedingIgnored: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: " ",
        type: "whitespace",
        start: 9462,
        line: 302,
        col: 12,
        length: 1,
        contents: []
      } ]
    }, pattern, (flags || "undefined") ],
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core["zero__QUERY"] = (function zero__QUERY$(item) {
  /* zero? include/macros.sibilant:309:0 */

  return {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 9624,
    line: 309,
    col: 21,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: "=",
      type: "otherChar",
      start: 9625,
      line: 309,
      col: 22,
      length: 1,
      contents: [],
      specials: 0,
      precedingIgnored: []
    }, item, {
      dir: "include",
      file: "include/macros.sibilant",
      token: "0",
      type: "number",
      start: 9633,
      line: 309,
      col: 30,
      length: 1,
      contents: [],
      specials: 0,
      precedingIgnored: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: " ",
        type: "whitespace",
        start: 9632,
        line: 309,
        col: 29,
        length: 1,
        contents: []
      } ]
    } ],
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core["empty__QUERY"] = (function empty__QUERY$(arr) {
  /* empty? include/macros.sibilant:315:0 */

  return {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 9788,
    line: 316,
    col: 8,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: "=",
      type: "otherChar",
      start: 9789,
      line: 316,
      col: 9,
      length: 1,
      contents: [],
      specials: 0,
      precedingIgnored: []
    }, {
      dir: "include",
      file: "include/macros.sibilant",
      token: "0",
      type: "number",
      start: 9791,
      line: 316,
      col: 11,
      length: 1,
      contents: [],
      specials: 0,
      precedingIgnored: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: " ",
        type: "whitespace",
        start: 9790,
        line: 316,
        col: 10,
        length: 1,
        contents: []
      } ]
    }, {
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 9793,
      line: 316,
      col: 13,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "length",
        type: "literal",
        start: 9794,
        line: 316,
        col: 14,
        length: 6,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, arr ],
      precedingIgnored: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: " ",
        type: "whitespace",
        start: 9792,
        line: 316,
        col: 12,
        length: 1,
        contents: []
      } ],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    } ],
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core["odd__QUERY"] = (function odd__QUERY$(number) {
  /* odd? include/macros.sibilant:322:0 */

  return {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 9940,
    line: 323,
    col: 8,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: "=",
      type: "otherChar",
      start: 9941,
      line: 323,
      col: 9,
      length: 1,
      contents: [],
      specials: 0,
      precedingIgnored: []
    }, {
      dir: "include",
      file: "include/macros.sibilant",
      token: "1",
      type: "number",
      start: 9943,
      line: 323,
      col: 11,
      length: 1,
      contents: [],
      specials: 0,
      precedingIgnored: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: " ",
        type: "whitespace",
        start: 9942,
        line: 323,
        col: 10,
        length: 1,
        contents: []
      } ]
    }, {
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 9945,
      line: 323,
      col: 13,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "mod",
        type: "literal",
        start: 9946,
        line: 323,
        col: 14,
        length: 3,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, number, {
        dir: "include",
        file: "include/macros.sibilant",
        token: "2",
        type: "number",
        start: 9958,
        line: 323,
        col: 26,
        length: 1,
        contents: [],
        specials: 0,
        precedingIgnored: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 9957,
          line: 323,
          col: 25,
          length: 1,
          contents: []
        } ]
      } ],
      precedingIgnored: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: " ",
        type: "whitespace",
        start: 9944,
        line: 323,
        col: 12,
        length: 1,
        contents: []
      } ],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    } ],
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core["even__QUERY"] = (function even__QUERY$(number) {
  /* even? include/macros.sibilant:329:0 */

  return {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 10111,
    line: 330,
    col: 8,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: "=",
      type: "otherChar",
      start: 10112,
      line: 330,
      col: 9,
      length: 1,
      contents: [],
      specials: 0,
      precedingIgnored: []
    }, {
      dir: "include",
      file: "include/macros.sibilant",
      token: "0",
      type: "number",
      start: 10114,
      line: 330,
      col: 11,
      length: 1,
      contents: [],
      specials: 0,
      precedingIgnored: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: " ",
        type: "whitespace",
        start: 10113,
        line: 330,
        col: 10,
        length: 1,
        contents: []
      } ]
    }, {
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 10116,
      line: 330,
      col: 13,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "mod",
        type: "literal",
        start: 10117,
        line: 330,
        col: 14,
        length: 3,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, number, {
        dir: "include",
        file: "include/macros.sibilant",
        token: "2",
        type: "number",
        start: 10129,
        line: 330,
        col: 26,
        length: 1,
        contents: [],
        specials: 0,
        precedingIgnored: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 10128,
          line: 330,
          col: 25,
          length: 1,
          contents: []
        } ]
      } ],
      precedingIgnored: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: " ",
        type: "whitespace",
        start: 10115,
        line: 330,
        col: 12,
        length: 1,
        contents: []
      } ],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    } ],
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core.typeof = (function typeof$(thing) {
  /* typeof include/macros.sibilant:337:0 */

  return [ "typeof ", transpile(thing) ];
});
sibilant.macros.namespaces.core["string__QUERY"] = (function string__QUERY$(things) {
  /* string? include/macros.sibilant:343:0 */

  var things = Array.prototype.slice.call(arguments, 0);

  return {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 10565,
    line: 344,
    col: 8,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: "and",
      type: "literal",
      start: 10566,
      line: 344,
      col: 9,
      length: 3,
      contents: [],
      specials: 0,
      precedingIgnored: []
    } ].concat(map(things, (function(thing) {
      /* include/macros.sibilant:344:29 */
    
      return {
        dir: "include",
        file: "include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 10597,
        line: 344,
        col: 40,
        length: 1,
        contents: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: "=",
          type: "otherChar",
          start: 10598,
          line: 344,
          col: 41,
          length: 1,
          contents: [],
          specials: 0,
          precedingIgnored: []
        }, {
          dir: "include",
          file: "include/macros.sibilant",
          token: "(",
          type: "expression",
          start: 10600,
          line: 344,
          col: 43,
          length: 1,
          contents: [ {
            dir: "include",
            file: "include/macros.sibilant",
            token: "typeof",
            type: "literal",
            start: 10601,
            line: 344,
            col: 44,
            length: 6,
            contents: [],
            specials: 0,
            precedingIgnored: []
          }, thing ],
          precedingIgnored: [ {
            dir: "include",
            file: "include/macros.sibilant",
            token: " ",
            type: "whitespace",
            start: 10599,
            line: 344,
            col: 42,
            length: 1,
            contents: []
          } ],
          specials: 0,
          end: undefined,
          closed: true,
          closingIgnored: []
        }, {"dir":"include","file":"include/macros.sibilant","token":"'","type":"tick","start":10616,"line":344,"col":59,"length":1,"contents":[{"dir":"include","file":"include/macros.sibilant","token":"string","type":"literal","start":10617,"line":344,"col":60,"length":6,"contents":[],"specials":0,"precedingIgnored":[]}],"precedingIgnored":[{"dir":"include","file":"include/macros.sibilant","token":" ","type":"whitespace","start":10615,"line":344,"col":58,"length":1,"contents":[]}]} ],
        precedingIgnored: [],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      };
    }))),
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core["function__QUERY"] = (function function__QUERY$(things) {
  /* function? include/macros.sibilant:350:0 */

  var things = Array.prototype.slice.call(arguments, 0);

  return {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 10809,
    line: 351,
    col: 8,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: "and",
      type: "literal",
      start: 10810,
      line: 351,
      col: 9,
      length: 3,
      contents: [],
      specials: 0,
      precedingIgnored: []
    } ].concat(map(things, (function(thing) {
      /* include/macros.sibilant:351:29 */
    
      return {
        dir: "include",
        file: "include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 10841,
        line: 351,
        col: 40,
        length: 1,
        contents: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: "=",
          type: "otherChar",
          start: 10842,
          line: 351,
          col: 41,
          length: 1,
          contents: [],
          specials: 0,
          precedingIgnored: []
        }, {
          dir: "include",
          file: "include/macros.sibilant",
          token: "(",
          type: "expression",
          start: 10844,
          line: 351,
          col: 43,
          length: 1,
          contents: [ {
            dir: "include",
            file: "include/macros.sibilant",
            token: "typeof",
            type: "literal",
            start: 10845,
            line: 351,
            col: 44,
            length: 6,
            contents: [],
            specials: 0,
            precedingIgnored: []
          }, thing ],
          precedingIgnored: [ {
            dir: "include",
            file: "include/macros.sibilant",
            token: " ",
            type: "whitespace",
            start: 10843,
            line: 351,
            col: 42,
            length: 1,
            contents: []
          } ],
          specials: 0,
          end: undefined,
          closed: true,
          closingIgnored: []
        }, {"dir":"include","file":"include/macros.sibilant","token":"'","type":"tick","start":10860,"line":351,"col":59,"length":1,"contents":[{"dir":"include","file":"include/macros.sibilant","token":"function","type":"literal","start":10861,"line":351,"col":60,"length":8,"contents":[],"specials":0,"precedingIgnored":[]}],"precedingIgnored":[{"dir":"include","file":"include/macros.sibilant","token":" ","type":"whitespace","start":10859,"line":351,"col":58,"length":1,"contents":[]}]} ],
        precedingIgnored: [],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      };
    }))),
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core["undefined__QUERY"] = (function undefined__QUERY$(things) {
  /* undefined? include/macros.sibilant:360:0 */

  var things = Array.prototype.slice.call(arguments, 0);

  return {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 11176,
    line: 361,
    col: 8,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: "and",
      type: "literal",
      start: 11177,
      line: 361,
      col: 9,
      length: 3,
      contents: [],
      specials: 0,
      precedingIgnored: []
    } ].concat(map(things, (function(thing) {
      /* include/macros.sibilant:361:29 */
    
      return {
        dir: "include",
        file: "include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 11208,
        line: 361,
        col: 40,
        length: 1,
        contents: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: "=",
          type: "otherChar",
          start: 11209,
          line: 361,
          col: 41,
          length: 1,
          contents: [],
          specials: 0,
          precedingIgnored: []
        }, {
          dir: "include",
          file: "include/macros.sibilant",
          token: "(",
          type: "expression",
          start: 11211,
          line: 361,
          col: 43,
          length: 1,
          contents: [ {
            dir: "include",
            file: "include/macros.sibilant",
            token: "typeof",
            type: "literal",
            start: 11212,
            line: 361,
            col: 44,
            length: 6,
            contents: [],
            specials: 0,
            precedingIgnored: []
          }, thing ],
          precedingIgnored: [ {
            dir: "include",
            file: "include/macros.sibilant",
            token: " ",
            type: "whitespace",
            start: 11210,
            line: 361,
            col: 42,
            length: 1,
            contents: []
          } ],
          specials: 0,
          end: undefined,
          closed: true,
          closingIgnored: []
        }, {"dir":"include","file":"include/macros.sibilant","token":"'","type":"tick","start":11227,"line":361,"col":59,"length":1,"contents":[{"dir":"include","file":"include/macros.sibilant","token":"undefined","type":"literal","start":11228,"line":361,"col":60,"length":9,"contents":[],"specials":0,"precedingIgnored":[]}],"precedingIgnored":[{"dir":"include","file":"include/macros.sibilant","token":" ","type":"whitespace","start":11226,"line":361,"col":58,"length":1,"contents":[]}]} ],
        precedingIgnored: [],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      };
    }))),
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core["defined__QUERY"] = (function defined__QUERY$(things) {
  /* defined? include/macros.sibilant:369:0 */

  var things = Array.prototype.slice.call(arguments, 0);

  return {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 11503,
    line: 370,
    col: 8,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: "and",
      type: "literal",
      start: 11504,
      line: 370,
      col: 9,
      length: 3,
      contents: [],
      specials: 0,
      precedingIgnored: []
    } ].concat(map(things, (function(thing) {
      /* include/macros.sibilant:370:29 */
    
      return {
        dir: "include",
        file: "include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 11535,
        line: 370,
        col: 40,
        length: 1,
        contents: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: "!=",
          type: "otherChar",
          start: 11536,
          line: 370,
          col: 41,
          length: 2,
          contents: [],
          specials: 0,
          precedingIgnored: []
        }, {
          dir: "include",
          file: "include/macros.sibilant",
          token: "(",
          type: "expression",
          start: 11539,
          line: 370,
          col: 44,
          length: 1,
          contents: [ {
            dir: "include",
            file: "include/macros.sibilant",
            token: "typeof",
            type: "literal",
            start: 11540,
            line: 370,
            col: 45,
            length: 6,
            contents: [],
            specials: 0,
            precedingIgnored: []
          }, thing ],
          precedingIgnored: [ {
            dir: "include",
            file: "include/macros.sibilant",
            token: " ",
            type: "whitespace",
            start: 11538,
            line: 370,
            col: 43,
            length: 1,
            contents: []
          } ],
          specials: 0,
          end: undefined,
          closed: true,
          closingIgnored: []
        }, {"dir":"include","file":"include/macros.sibilant","token":"'","type":"tick","start":11555,"line":370,"col":60,"length":1,"contents":[{"dir":"include","file":"include/macros.sibilant","token":"undefined","type":"literal","start":11556,"line":370,"col":61,"length":9,"contents":[],"specials":0,"precedingIgnored":[]}],"precedingIgnored":[{"dir":"include","file":"include/macros.sibilant","token":" ","type":"whitespace","start":11554,"line":370,"col":59,"length":1,"contents":[]}]} ],
        precedingIgnored: [],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      };
    }))),
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core["number__QUERY"] = (function number__QUERY$(things) {
  /* number? include/macros.sibilant:377:0 */

  var things = Array.prototype.slice.call(arguments, 0);

  return {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 11764,
    line: 378,
    col: 8,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: "and",
      type: "literal",
      start: 11765,
      line: 378,
      col: 9,
      length: 3,
      contents: [],
      specials: 0,
      precedingIgnored: []
    } ].concat(map(things, (function(thing) {
      /* include/macros.sibilant:378:29 */
    
      return {
        dir: "include",
        file: "include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 11796,
        line: 378,
        col: 40,
        length: 1,
        contents: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: "=",
          type: "otherChar",
          start: 11797,
          line: 378,
          col: 41,
          length: 1,
          contents: [],
          specials: 0,
          precedingIgnored: []
        }, {
          dir: "include",
          file: "include/macros.sibilant",
          token: "(",
          type: "expression",
          start: 11799,
          line: 378,
          col: 43,
          length: 1,
          contents: [ {
            dir: "include",
            file: "include/macros.sibilant",
            token: "typeof",
            type: "literal",
            start: 11800,
            line: 378,
            col: 44,
            length: 6,
            contents: [],
            specials: 0,
            precedingIgnored: []
          }, thing ],
          precedingIgnored: [ {
            dir: "include",
            file: "include/macros.sibilant",
            token: " ",
            type: "whitespace",
            start: 11798,
            line: 378,
            col: 42,
            length: 1,
            contents: []
          } ],
          specials: 0,
          end: undefined,
          closed: true,
          closingIgnored: []
        }, {"dir":"include","file":"include/macros.sibilant","token":"'","type":"tick","start":11815,"line":378,"col":59,"length":1,"contents":[{"dir":"include","file":"include/macros.sibilant","token":"number","type":"literal","start":11816,"line":378,"col":60,"length":6,"contents":[],"specials":0,"precedingIgnored":[]}],"precedingIgnored":[{"dir":"include","file":"include/macros.sibilant","token":" ","type":"whitespace","start":11814,"line":378,"col":58,"length":1,"contents":[]}]} ],
        precedingIgnored: [],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      };
    }))),
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core.if = (function if$(arg, truebody, falsebody) {
  /* if include/macros.sibilant:382:0 */

  return [ "(function() {", indent([ "if (", transpile(arg), ") {", indent({
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 11976,
    line: 385,
    col: 33,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: "do",
      type: "literal",
      start: 11977,
      line: 385,
      col: 34,
      length: 2,
      contents: [],
      specials: 0,
      precedingIgnored: []
    } ].concat(truebody),
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  }), "} else {", indent({
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 12063,
    line: 387,
    col: 33,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: "do",
      type: "literal",
      start: 12064,
      line: 387,
      col: 34,
      length: 2,
      contents: [],
      specials: 0,
      precedingIgnored: []
    } ].concat(falsebody),
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  }), "}" ]), "}).call(this)" ];
});
sibilant.macros.namespaces.core.pipe = (function pipe$(calls) {
  /* pipe include/macros.sibilant:415:0 */

  var calls = Array.prototype.slice.call(arguments, 0);

  return inject(undefined, calls, (function(value, item) {
    /* include/macros.sibilant:417:15 */
  
    return (function() {
      if (typeof value === "undefined") {
        return item;
      } else {
        return (function() {
          /* include/macros.sibilant:419:21 */
        
          var cloned = (function() {
            if (node__QUERY(item, "literal", "dots")) {
              return {
                dir: "include",
                file: "include/macros.sibilant",
                token: "(",
                type: "expression",
                start: 13169,
                line: 421,
                col: 39,
                length: 1,
                contents: [ item ],
                precedingIgnored: [],
                specials: 0,
                end: undefined,
                closed: true,
                closingIgnored: []
              };
            } else {
              return clone(item);
            }
          }).call(this);
          var placeholder = detect(cloned.contents, (function(node) {
            /* include/macros.sibilant:425:47 */
          
            return (node__QUERY(node, "otherChar") && "#" === node.token);
          })),
              placeholderIndex = cloned.contents.indexOf(placeholder),
              placeholderBoundaries = (function() {
            if (placeholder) {
              return [ placeholderIndex, (1 + placeholderIndex) ];
            } else {
              return [ 1, 1 ];
            }
          }).call(this);
          return mergeInto(cloned, { contents: cloned.contents.slice(0, placeholderBoundaries[0]).concat([ value ], cloned.contents.slice(placeholderBoundaries[1])) });
        }).call(this);
      }
    }).call(this);
  }));
});
sibilant.macros.namespaces.core["|>"] = sibilant.macros.namespaces.core.pipe;
sibilant.macros.namespaces.core.comment = (function comment$(contents) {
  /* comment include/macros.sibilant:446:0 */

  var contents = Array.prototype.slice.call(arguments, 0);

  return map(contents, (function(content) {
    /* include/macros.sibilant:447:21 */
  
    return [ "// ", recurseMap(transpile(content), (function(item) {
      /* include/macros.sibilant:449:36 */
    
      return (item) ? outputFormatter(transpile(item)).replace((new RegExp("\n", "g")), "\n// ") : null;
    })) ];
  }));
});
sibilant.macros.namespaces.core["array__QUERY"] = (function array__QUERY$(thing) {
  /* array? include/macros.sibilant:469:0 */

  var transpiled = transpile(thing);
  return [ "((", transpiled, ") && typeof (", transpiled, ") === \"object\" && (", transpiled, ").constructor.name === \"Array\")" ];
});
sibilant.macros.namespaces.core["list__QUERY"] = sibilant.macros.namespaces.core["array__QUERY"];
sibilant.macros.namespaces.core["hash__QUERY"] = (function hash__QUERY$(thing) {
  /* hash? include/macros.sibilant:481:0 */

  return {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 15707,
    line: 482,
    col: 8,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: "and",
      type: "literal",
      start: 15708,
      line: 482,
      col: 9,
      length: 3,
      contents: [],
      specials: 0,
      precedingIgnored: []
    }, {
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 15712,
      line: 482,
      col: 13,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "=",
        type: "otherChar",
        start: 15713,
        line: 482,
        col: 14,
        length: 1,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, {"dir":"include","file":"include/macros.sibilant","token":"'","type":"tick","start":15715,"line":482,"col":16,"length":1,"contents":[{"dir":"include","file":"include/macros.sibilant","token":"object","type":"literal","start":15716,"line":482,"col":17,"length":6,"contents":[],"specials":0,"precedingIgnored":[]}],"precedingIgnored":[{"dir":"include","file":"include/macros.sibilant","token":" ","type":"whitespace","start":15714,"line":482,"col":15,"length":1,"contents":[]}]}, {
        dir: "include",
        file: "include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 15723,
        line: 482,
        col: 24,
        length: 1,
        contents: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: "typeof",
          type: "literal",
          start: 15724,
          line: 482,
          col: 25,
          length: 6,
          contents: [],
          specials: 0,
          precedingIgnored: []
        }, thing ],
        precedingIgnored: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 15722,
          line: 482,
          col: 23,
          length: 1,
          contents: []
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      } ],
      precedingIgnored: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: " ",
        type: "whitespace",
        start: 15711,
        line: 482,
        col: 12,
        length: 1,
        contents: []
      } ],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    }, {
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 15753,
      line: 483,
      col: 13,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "!=",
        type: "otherChar",
        start: 15754,
        line: 483,
        col: 14,
        length: 2,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, thing, {
        dir: "include",
        file: "include/macros.sibilant",
        token: "null",
        type: "literal",
        start: 15764,
        line: 483,
        col: 24,
        length: 4,
        contents: [],
        specials: 0,
        precedingIgnored: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 15763,
          line: 483,
          col: 23,
          length: 1,
          contents: []
        } ]
      } ],
      precedingIgnored: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "\n",
        type: "newline",
        start: 15739,
        line: 482,
        col: 40,
        length: 1,
        contents: []
      }, {
        dir: "include",
        file: "include/macros.sibilant",
        token: "             ",
        type: "whitespace",
        start: 15740,
        line: 483,
        col: 0,
        length: 13,
        contents: []
      } ],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    }, {
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 15783,
      line: 484,
      col: 13,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "!=",
        type: "otherChar",
        start: 15784,
        line: 484,
        col: 14,
        length: 2,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, {
        dir: "include",
        file: "include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 15787,
        line: 484,
        col: 17,
        length: 1,
        contents: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: "get",
          type: "literal",
          start: 15788,
          line: 484,
          col: 18,
          length: 3,
          contents: [],
          specials: 0,
          precedingIgnored: []
        }, thing, {"dir":"include","file":"include/macros.sibilant","token":"'","type":"tick","start":15799,"line":484,"col":29,"length":1,"contents":[{"dir":"include","file":"include/macros.sibilant","token":"constructor","type":"literal","start":15800,"line":484,"col":30,"length":11,"contents":[],"specials":0,"precedingIgnored":[]}],"precedingIgnored":[{"dir":"include","file":"include/macros.sibilant","token":" ","type":"whitespace","start":15798,"line":484,"col":28,"length":1,"contents":[]}]}, {"dir":"include","file":"include/macros.sibilant","token":"'","type":"tick","start":15812,"line":484,"col":42,"length":1,"contents":[{"dir":"include","file":"include/macros.sibilant","token":"name","type":"literal","start":15813,"line":484,"col":43,"length":4,"contents":[],"specials":0,"precedingIgnored":[]}],"precedingIgnored":[{"dir":"include","file":"include/macros.sibilant","token":" ","type":"whitespace","start":15811,"line":484,"col":41,"length":1,"contents":[]}]} ],
        precedingIgnored: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 15786,
          line: 484,
          col: 16,
          length: 1,
          contents: []
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      }, {"dir":"include","file":"include/macros.sibilant","token":"'","type":"tick","start":15819,"line":484,"col":49,"length":1,"contents":[{"dir":"include","file":"include/macros.sibilant","token":"Array","type":"literal","start":15820,"line":484,"col":50,"length":5,"contents":[],"specials":0,"precedingIgnored":[]}],"precedingIgnored":[{"dir":"include","file":"include/macros.sibilant","token":" ","type":"whitespace","start":15818,"line":484,"col":48,"length":1,"contents":[]}]} ],
      precedingIgnored: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "\n",
        type: "newline",
        start: 15769,
        line: 483,
        col: 29,
        length: 1,
        contents: []
      }, {
        dir: "include",
        file: "include/macros.sibilant",
        token: "             ",
        type: "whitespace",
        start: 15770,
        line: 484,
        col: 0,
        length: 13,
        contents: []
      } ],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    } ],
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core["object__QUERY"] = sibilant.macros.namespaces.core["hash__QUERY"];
sibilant.macros.namespaces.core["_scopedWithoutReturn"] = (function _scopedWithoutReturn$(body) {
  /* *scoped-without-return include/macros.sibilant:487:0 */

  var body = Array.prototype.slice.call(arguments, 0);

  return [ "(function() {", indent.apply(this, body), "}).call(this)" ];
});
sibilant.macros.namespaces.core["_scopedWithoutSource"] = (function _scopedWithoutSource$(body) {
  /* *scoped-without-source include/macros.sibilant:491:0 */

  var body = Array.prototype.slice.call(arguments, 0);

  return {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 16007,
    line: 492,
    col: 8,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: "*scoped-without-return",
      type: "literal",
      start: 16008,
      line: 492,
      col: 9,
      length: 22,
      contents: [],
      specials: 0,
      precedingIgnored: []
    }, {
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 16031,
      line: 492,
      col: 32,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "do",
        type: "literal",
        start: 16032,
        line: 492,
        col: 33,
        length: 2,
        contents: [],
        specials: 0,
        precedingIgnored: []
      } ].concat(body),
      precedingIgnored: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: " ",
        type: "whitespace",
        start: 16030,
        line: 492,
        col: 31,
        length: 1,
        contents: []
      } ],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    } ],
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core.when = (function when$(condition, body) {
  /* when include/macros.sibilant:501:0 */

  var body = Array.prototype.slice.call(arguments, 1);

  return sibilant.macros.namespaces.core["_scopedWithoutReturn"]("if (", condition, ") {", indent({
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 16453,
    line: 504,
    col: 18,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: "do",
      type: "literal",
      start: 16454,
      line: 504,
      col: 19,
      length: 2,
      contents: [],
      specials: 0,
      precedingIgnored: []
    } ].concat(body),
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  }), "}");
});
sibilant.macros.namespaces.core.not = (function not$(exp) {
  /* not include/macros.sibilant:513:0 */

  return [ "!(", transpile(exp), ")" ];
});
sibilant.macros.namespaces.core.unless = (function unless$(condition, body) {
  /* unless include/macros.sibilant:526:0 */

  var body = Array.prototype.slice.call(arguments, 1);

  return [ "(function() {", indent([ "if (", {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 17186,
    line: 528,
    col: 25,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: "not",
      type: "literal",
      start: 17187,
      line: 528,
      col: 26,
      length: 3,
      contents: [],
      specials: 0,
      precedingIgnored: []
    }, condition ],
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  }, ") {", indent({
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 17242,
    line: 529,
    col: 33,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: "do",
      type: "literal",
      start: 17243,
      line: 529,
      col: 34,
      length: 2,
      contents: [],
      specials: 0,
      precedingIgnored: []
    } ].concat(body),
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  }), "}" ]), "}).call(this)" ];
});
sibilant.macros.namespaces.core.assign = (function assign$(args) {
  /* assign include/macros.sibilant:534:0 */

  var args = Array.prototype.slice.call(arguments, 0);

  return interleave("\n", bulkMap(args, (function(name, value) {
    /* include/macros.sibilant:536:28 */
  
    return asStatement([ transpile(name), " = ", transpile(value) ]);
  })));
});
sibilant.macros.namespaces.core.logPretty = (function logPretty$(label, arg) {
  /* log-pretty include/macros.sibilant:548:0 */

  var node = this;
  (function() {
    if (typeof arg === "undefined") {
      arg = label;
      return label = [ "\"", prettify(label, false), "\"" ];
    }
  }).call(this);
  return {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 18065,
    line: 553,
    col: 8,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: "console.log",
      type: "literal",
      start: 18066,
      line: 553,
      col: 9,
      length: 11,
      contents: [],
      specials: 0,
      precedingIgnored: []
    }, {
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 18078,
      line: 553,
      col: 21,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "concat",
        type: "literal",
        start: 18079,
        line: 553,
        col: 22,
        length: 6,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, [ "\"", node.file, ":", node.line, "\"" ], {
        dir: "include",
        file: "include/macros.sibilant",
        token: "\" \"",
        type: "string",
        start: 18123,
        line: 553,
        col: 66,
        length: 3,
        contents: [],
        specials: 0,
        precedingIgnored: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 18122,
          line: 553,
          col: 65,
          length: 1,
          contents: []
        } ]
      }, label, {
        dir: "include",
        file: "include/macros.sibilant",
        token: "\" = \"",
        type: "string",
        start: 18134,
        line: 553,
        col: 77,
        length: 5,
        contents: [],
        specials: 0,
        precedingIgnored: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 18133,
          line: 553,
          col: 76,
          length: 1,
          contents: []
        } ]
      }, {
        dir: "include",
        file: "include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 18140,
        line: 553,
        col: 83,
        length: 1,
        contents: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: "prettify",
          type: "literal",
          start: 18141,
          line: 553,
          col: 84,
          length: 8,
          contents: [],
          specials: 0,
          precedingIgnored: []
        }, arg ],
        precedingIgnored: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 18139,
          line: 553,
          col: 82,
          length: 1,
          contents: []
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      } ],
      precedingIgnored: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: " ",
        type: "whitespace",
        start: 18077,
        line: 553,
        col: 20,
        length: 1,
        contents: []
      } ],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    } ],
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core.prettyLog = sibilant.macros.namespaces.core.logPretty;
sibilant.macros.namespaces.core.each = (function each$(item, array, body) {
  /* each include/macros.sibilant:566:17 */

  var body = Array.prototype.slice.call(arguments, 2);

  return {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 18935,
    line: 567,
    col: 8,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: ".",
      type: "dots",
      start: 18936,
      line: 567,
      col: 9,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "for-each",
        type: "literal",
        start: 18937,
        line: 567,
        col: 10,
        length: 8,
        contents: [],
        specials: 0,
        precedingIgnored: []
      } ],
      precedingIgnored: []
    }, array, {
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 18972,
      line: 568,
      col: 19,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "lambda",
        type: "literal",
        start: 18973,
        line: 568,
        col: 20,
        length: 6,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, {
        node: this,
        args: (function() {
          if (node__QUERY(item, "expression")) {
            return item;
          } else {
            return [ item ];
          }
        }).call(this)
      } ].concat(body),
      precedingIgnored: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "\n",
        type: "newline",
        start: 18952,
        line: 567,
        col: 25,
        length: 1,
        contents: []
      }, {
        dir: "include",
        file: "include/macros.sibilant",
        token: "                   ",
        type: "whitespace",
        start: 18953,
        line: 568,
        col: 0,
        length: 19,
        contents: []
      } ],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    } ],
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core.macroExpand = (function macroExpand$(name) {
  /* macro-expand include/macros.sibilant:581:0 */

  var macro = macros[outputFormatter(transpile(name))];
  return (function() {
    if (macro) {
      return macro.toString();
    } else {
      return "undefined";
    }
  }).call(this);
});
sibilant.macros.namespaces.core.throw = (function throw$(error) {
  /* throw include/macros.sibilant:594:0 */

  return [ "throw ", transpile(error) ];
});
sibilant.macros.namespaces.core.asBoolean = (function asBoolean$(expr) {
  /* as-boolean include/macros.sibilant:605:0 */

  return [ "(!!(", transpile(expr), "))" ];
});
sibilant.macros.namespaces.core.try = (function try$(tryblock, catchblock) {
  /* try include/macros.sibilant:611:0 */

  return [ "(function() {", indent([ "try {", indent({
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 19905,
    line: 614,
    col: 26,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: "do",
      type: "literal",
      start: 19906,
      line: 614,
      col: 27,
      length: 2,
      contents: [],
      specials: 0,
      precedingIgnored: []
    }, tryblock ],
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  }), "} catch (e) {", indent({
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 19980,
    line: 616,
    col: 26,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: "do",
      type: "literal",
      start: 19981,
      line: 616,
      col: 27,
      length: 2,
      contents: [],
      specials: 0,
      precedingIgnored: []
    }, catchblock ],
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  }), "}" ]), "}).call(this)" ];
});
sibilant.macros.namespaces.core.state = (function state$(pairs) {
  /* state include/macros.sibilant:628:0 */

  var pairs = Array.prototype.slice.call(arguments, 0);

  return (function() {
    if (1 === pairs.length) {
      return sibilant.state[outputFormatter(transpile(pairs[0]))];
    } else {
      bulkMap(pairs, (function(k, v) {
        /* include/macros.sibilant:631:31 */
      
        return sibilant.state[outputFormatter(transpile(k))] = eval(outputFormatter(transpile(v)));
      }));
      return null;
    }
  }).call(this);
});
sibilant.macros.namespaces.core.symbol = (function symbol$() {
  /* symbol include/macros.sibilant:637:0 */

  var symbolCount = (sibilant.state.symbolCount || 0),
      newSymbolCount = (1 + symbolCount);
  sibilant.macros.namespaces.core.state("symbolCount", newSymbolCount);
  return [ ("$_symbol" + newSymbolCount + "_$") ];
});
sibilant.macros.namespaces.core.while = (function while$(condition, body) {
  /* while include/macros.sibilant:652:0 */

  var body = Array.prototype.slice.call(arguments, 1);

  var symbol = sibilant.macros.namespaces.core.symbol();
  return {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 21118,
    line: 654,
    col: 8,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: "*scoped-without-source",
      type: "literal",
      start: 21119,
      line: 654,
      col: 9,
      length: 22,
      contents: [],
      specials: 0,
      precedingIgnored: []
    }, {
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 21151,
      line: 655,
      col: 9,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "var",
        type: "literal",
        start: 21152,
        line: 655,
        col: 10,
        length: 3,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, symbol ],
      precedingIgnored: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "\n",
        type: "newline",
        start: 21141,
        line: 654,
        col: 31,
        length: 1,
        contents: []
      }, {
        dir: "include",
        file: "include/macros.sibilant",
        token: "         ",
        type: "whitespace",
        start: 21142,
        line: 655,
        col: 0,
        length: 9,
        contents: []
      } ],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    }, {
      type: "output",
      contents: [ "while (", transpile(condition), ") {", indent({
        dir: "include",
        file: "include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 21288,
        line: 658,
        col: 35,
        length: 1,
        contents: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: "assign",
          type: "literal",
          start: 21289,
          line: 658,
          col: 36,
          length: 6,
          contents: [],
          specials: 0,
          precedingIgnored: []
        }, symbol, {
          dir: "include",
          file: "include/macros.sibilant",
          token: "(",
          type: "expression",
          start: 21304,
          line: 658,
          col: 51,
          length: 1,
          contents: [ {
            dir: "include",
            file: "include/macros.sibilant",
            token: "*scoped-without-source",
            type: "literal",
            start: 21305,
            line: 658,
            col: 52,
            length: 22,
            contents: [],
            specials: 0,
            precedingIgnored: []
          } ].concat(body),
          precedingIgnored: [ {
            dir: "include",
            file: "include/macros.sibilant",
            token: " ",
            type: "whitespace",
            start: 21303,
            line: 658,
            col: 50,
            length: 1,
            contents: []
          } ],
          specials: 0,
          end: undefined,
          closed: true,
          closingIgnored: []
        } ],
        precedingIgnored: [],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      }), "}" ]
    }, symbol ],
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core.until = (function until$(condition, body) {
  /* until include/macros.sibilant:671:0 */

  var body = Array.prototype.slice.call(arguments, 1);

  return {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 21697,
    line: 672,
    col: 8,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: "while",
      type: "literal",
      start: 21698,
      line: 672,
      col: 9,
      length: 5,
      contents: [],
      specials: 0,
      precedingIgnored: []
    }, {
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 21704,
      line: 672,
      col: 15,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "not",
        type: "literal",
        start: 21705,
        line: 672,
        col: 16,
        length: 3,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, condition ],
      precedingIgnored: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: " ",
        type: "whitespace",
        start: 21703,
        line: 672,
        col: 14,
        length: 1,
        contents: []
      } ],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    } ].concat(body),
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core["match__QUERY"] = (function match__QUERY$(regexp, string) {
  /* match? include/macros.sibilant:681:0 */

  return {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 21978,
    line: 682,
    col: 8,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: ".",
      type: "dots",
      start: 21979,
      line: 682,
      col: 9,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "match",
        type: "literal",
        start: 21980,
        line: 682,
        col: 10,
        length: 5,
        contents: [],
        specials: 0,
        precedingIgnored: []
      } ],
      precedingIgnored: []
    }, string, regexp ],
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core["matchRegex__QUERY"] = (function matchRegex__QUERY$(string, pattern, flags) {
  /* match-regex? include/macros.sibilant:687:0 */

  return {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 22214,
    line: 688,
    col: 8,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: "match?",
      type: "literal",
      start: 22215,
      line: 688,
      col: 9,
      length: 6,
      contents: [],
      specials: 0,
      precedingIgnored: []
    }, {
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 22222,
      line: 688,
      col: 16,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "regex",
        type: "literal",
        start: 22223,
        line: 688,
        col: 17,
        length: 5,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, pattern, flags ],
      precedingIgnored: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: " ",
        type: "whitespace",
        start: 22221,
        line: 688,
        col: 15,
        length: 1,
        contents: []
      } ],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    }, string ],
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core.replace = (function replace$(string, pattern, replacement) {
  /* replace include/macros.sibilant:694:0 */

  return {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 22476,
    line: 695,
    col: 8,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: ".",
      type: "dots",
      start: 22477,
      line: 695,
      col: 9,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "replace",
        type: "literal",
        start: 22478,
        line: 695,
        col: 10,
        length: 7,
        contents: [],
        specials: 0,
        precedingIgnored: []
      } ],
      precedingIgnored: []
    }, string, {
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 22508,
      line: 696,
      col: 14,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "regex",
        type: "literal",
        start: 22509,
        line: 696,
        col: 15,
        length: 5,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, pattern ],
      precedingIgnored: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "\n",
        type: "newline",
        start: 22493,
        line: 695,
        col: 25,
        length: 1,
        contents: []
      }, {
        dir: "include",
        file: "include/macros.sibilant",
        token: "              ",
        type: "whitespace",
        start: 22494,
        line: 696,
        col: 0,
        length: 14,
        contents: []
      } ],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    }, replacement ],
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core.replaceAll = (function replaceAll$(string, pattern, replacement) {
  /* replace-all include/macros.sibilant:702:0 */

  return {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 22773,
    line: 703,
    col: 8,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: ".",
      type: "dots",
      start: 22774,
      line: 703,
      col: 9,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "replace",
        type: "literal",
        start: 22775,
        line: 703,
        col: 10,
        length: 7,
        contents: [],
        specials: 0,
        precedingIgnored: []
      } ],
      precedingIgnored: []
    }, string, {
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 22791,
      line: 703,
      col: 26,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "regex",
        type: "literal",
        start: 22792,
        line: 703,
        col: 27,
        length: 5,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, pattern, {"dir":"include","file":"include/macros.sibilant","token":"'","type":"tick","start":22807,"line":703,"col":42,"length":1,"contents":[{"dir":"include","file":"include/macros.sibilant","token":"g","type":"literal","start":22808,"line":703,"col":43,"length":1,"contents":[],"specials":0,"precedingIgnored":[]}],"precedingIgnored":[{"dir":"include","file":"include/macros.sibilant","token":" ","type":"whitespace","start":22806,"line":703,"col":41,"length":1,"contents":[]}]} ],
      precedingIgnored: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: " ",
        type: "whitespace",
        start: 22790,
        line: 703,
        col: 25,
        length: 1,
        contents: []
      } ],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    }, replacement ],
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core.thunk = (function thunk$(body) {
  /* thunk include/macros.sibilant:716:0 */

  var body = Array.prototype.slice.call(arguments, 0);

  var node = this,
      lambdaOptions = {
    node: node,
    args: []
  };
  (function() {
    if (!(node__QUERY(body[0]))) {
      mergeInto(lambdaOptions, body[0]);
      return body = body.slice(1);
    }
  }).call(this);
  return {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 23396,
    line: 724,
    col: 8,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: "lambda",
      type: "literal",
      start: 23397,
      line: 724,
      col: 9,
      length: 6,
      contents: [],
      specials: 0,
      precedingIgnored: []
    }, lambdaOptions ].concat(mapNode(body, (function(node) {
      /* include/macros.sibilant:726:17 */
    
      return (function() {
        if (node__QUERY(node, "argPlaceholder")) {
          return {
            dir: "include",
            file: "include/macros.sibilant",
            token: "(",
            type: "expression",
            start: 23549,
            line: 728,
            col: 24,
            length: 1,
            contents: [ {
              dir: "include",
              file: "include/macros.sibilant",
              token: "argument",
              type: "literal",
              start: 23550,
              line: 728,
              col: 25,
              length: 8,
              contents: [],
              specials: 0,
              precedingIgnored: []
            }, node.token.replace((new RegExp("^#", undefined)), "") ],
            precedingIgnored: [],
            specials: 0,
            end: undefined,
            closed: true,
            closingIgnored: []
          };
        } else {
          return node;
        }
      }).call(this);
    }))),
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core["#>"] = sibilant.macros.namespaces.core.thunk;
sibilant.macros.namespaces.core.pipeThunk = (function pipeThunk$(calls) {
  /* pipe-thunk include/macros.sibilant:739:0 */

  var calls = Array.prototype.slice.call(arguments, 0);

  return {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 23930,
    line: 739,
    col: 30,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: "thunk",
      type: "literal",
      start: 23931,
      line: 739,
      col: 31,
      length: 5,
      contents: [],
      specials: 0,
      precedingIgnored: []
    }, { node: this }, {
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 23952,
      line: 739,
      col: 52,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "pipe",
        type: "literal",
        start: 23953,
        line: 739,
        col: 53,
        length: 4,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, {
        dir: "include",
        file: "include/macros.sibilant",
        token: "#0",
        type: "argPlaceholder",
        start: 23958,
        line: 739,
        col: 58,
        length: 2,
        contents: [],
        specials: 0,
        precedingIgnored: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 23957,
          line: 739,
          col: 57,
          length: 1,
          contents: []
        } ]
      } ].concat(calls),
      precedingIgnored: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: " ",
        type: "whitespace",
        start: 23951,
        line: 739,
        col: 51,
        length: 1,
        contents: []
      } ],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    } ],
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core["#->"] = sibilant.macros.namespaces.core.pipeThunk;
sibilant.macros.namespaces.core.keys = (function keys$(obj) {
  /* keys include/macros.sibilant:751:0 */

  return {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 24264,
    line: 752,
    col: 8,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: "Object.keys",
      type: "literal",
      start: 24265,
      line: 752,
      col: 9,
      length: 11,
      contents: [],
      specials: 0,
      precedingIgnored: []
    }, obj ],
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core.delete = (function delete$(objects) {
  /* delete include/macros.sibilant:764:0 */

  var objects = Array.prototype.slice.call(arguments, 0);

  return interleave("\n", map(objects, (function(obj) {
    /* include/macros.sibilant:765:37 */
  
    return asStatement([ "delete ", transpile(obj) ]);
  })));
});
sibilant.macros.namespaces.core.deleteMacro = (function deleteMacro$(macroNames) {
  /* delete-macro include/macros.sibilant:776:0 */

  var macroNames = Array.prototype.slice.call(arguments, 0);

  macroNames.forEach((function(macroName) {
    /* include/macros.sibilant:777:7 */
  
    return delete sibilant.macros.namespace[outputFormatter(transpile(macroName))];
  }));
  return null;
});
sibilant.macros.namespaces.core.delmacro = sibilant.macros.namespaces.core.deleteMacro;
sibilant.macros.namespaces.core.renameMacro = (function renameMacro$(currentMacroName, newMacroName) {
  /* rename-macro include/macros.sibilant:789:0 */

  sibilant.macros.namespaces.core.aliasMacro(currentMacroName, newMacroName);
  sibilant.macros.namespaces.core.deleteMacro(currentMacroName);
  return null;
});
sibilant.macros.namespaces.core.arguments = (function arguments$() {
  /* arguments include/macros.sibilant:804:0 */

  return [ "(Array.prototype.slice.apply(arguments))" ];
});
sibilant.macros.namespaces.core.argument = (function argument$(index) {
  /* argument include/macros.sibilant:816:0 */

  return {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 25850,
    line: 817,
    col: 8,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: "get",
      type: "literal",
      start: 25851,
      line: 817,
      col: 9,
      length: 3,
      contents: [],
      specials: 0,
      precedingIgnored: []
    }, {
      dir: "include",
      file: "include/macros.sibilant",
      token: "arguments",
      type: "literal",
      start: 25855,
      line: 817,
      col: 13,
      length: 9,
      contents: [],
      specials: 0,
      precedingIgnored: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: " ",
        type: "whitespace",
        start: 25854,
        line: 817,
        col: 12,
        length: 1,
        contents: []
      } ]
    }, index ],
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core.eachKey = (function eachKey$(as, obj, body) {
  /* each-key include/macros.sibilant:825:0 */

  var body = Array.prototype.slice.call(arguments, 2);

  return {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 26058,
    line: 826,
    col: 8,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: "pipe",
      type: "literal",
      start: 26059,
      line: 826,
      col: 9,
      length: 4,
      contents: [],
      specials: 0,
      precedingIgnored: []
    }, obj, {
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 26069,
      line: 826,
      col: 19,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "keys",
        type: "literal",
        start: 26070,
        line: 826,
        col: 20,
        length: 4,
        contents: [],
        specials: 0,
        precedingIgnored: []
      } ],
      precedingIgnored: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: " ",
        type: "whitespace",
        start: 26068,
        line: 826,
        col: 18,
        length: 1,
        contents: []
      } ],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    }, {
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 26090,
      line: 827,
      col: 14,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: ".",
        type: "dots",
        start: 26091,
        line: 827,
        col: 15,
        length: 1,
        contents: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: "for-each",
          type: "literal",
          start: 26092,
          line: 827,
          col: 16,
          length: 8,
          contents: [],
          specials: 0,
          precedingIgnored: []
        } ],
        precedingIgnored: []
      }, {
        dir: "include",
        file: "include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 26101,
        line: 827,
        col: 25,
        length: 1,
        contents: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: "lambda",
          type: "literal",
          start: 26102,
          line: 827,
          col: 26,
          length: 6,
          contents: [],
          specials: 0,
          precedingIgnored: []
        }, {
          args: (function() {
            if (node__QUERY(as, "expression")) {
              return as;
            } else {
              return [ as ];
            }
          }).call(this),
          node: this
        } ].concat(body),
        precedingIgnored: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 26100,
          line: 827,
          col: 24,
          length: 1,
          contents: []
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      } ],
      precedingIgnored: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "\n",
        type: "newline",
        start: 26075,
        line: 826,
        col: 25,
        length: 1,
        contents: []
      }, {
        dir: "include",
        file: "include/macros.sibilant",
        token: "              ",
        type: "whitespace",
        start: 26076,
        line: 827,
        col: 0,
        length: 14,
        contents: []
      } ],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    } ],
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core.switch = (function switch$(obj, cases) {
  /* switch include/macros.sibilant:848:0 */

  var cases = Array.prototype.slice.call(arguments, 1);

  return [ "(function() {", indent([ "switch(", transpile(obj), ") {", map(cases, (function(caseDef) {
    /* include/macros.sibilant:851:30 */
  
    var caseNameNode = caseDef.contents[0],
        caseLabels = (function() {
      if (node__QUERY(caseNameNode, "expression", "bracket")) {
        return caseNameNode.contents;
      } else {
        return [ caseNameNode ];
      }
    }).call(this),
        caseString = interleave("\n", map(caseLabels, (function(c) {
      /* include/macros.sibilant:857:78 */
    
      return (function() {
        if ("default" === c.token) {
          return "default:";
        } else {
          return [ "case ", transpile(c), ":" ];
        }
      }).call(this);
    })));
    return [ "\n", caseString, indent({
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 27747,
      line: 861,
      col: 59,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "do",
        type: "literal",
        start: 27748,
        line: 861,
        col: 60,
        length: 2,
        contents: [],
        specials: 0,
        precedingIgnored: []
      } ].concat(caseDef.contents.slice(1)),
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    }) ];
  })), "}" ]), "}).call(this)" ];
});
sibilant.macros.namespaces.core.if = (function if$(alternatingConditionsAndBranches) {
  /* if include/macros.sibilant:893:0 */

  var alternatingConditionsAndBranches = Array.prototype.slice.call(arguments, 0);

  return [ "(function() {", indent(interleave(" else ", bulkMap(alternatingConditionsAndBranches, (function(cond, val) {
    /* include/macros.sibilant:898:25 */
  
    return (function() {
      if (typeof val !== "undefined") {
        return [ "if (", transpile(cond), ") {", indent({
          dir: "include",
          file: "include/macros.sibilant",
          token: "(",
          type: "expression",
          start: 29023,
          line: 901,
          col: 44,
          length: 1,
          contents: [ {
            dir: "include",
            file: "include/macros.sibilant",
            token: "do",
            type: "literal",
            start: 29024,
            line: 901,
            col: 45,
            length: 2,
            contents: [],
            specials: 0,
            precedingIgnored: []
          }, val ],
          precedingIgnored: [],
          specials: 0,
          end: undefined,
          closed: true,
          closingIgnored: []
        }), "}" ];
      } else {
        return [ "{", indent({
          dir: "include",
          file: "include/macros.sibilant",
          token: "(",
          type: "expression",
          start: 29121,
          line: 903,
          col: 47,
          length: 1,
          contents: [ {
            dir: "include",
            file: "include/macros.sibilant",
            token: "do",
            type: "literal",
            start: 29122,
            line: 903,
            col: 48,
            length: 2,
            contents: [],
            specials: 0,
            precedingIgnored: []
          }, cond ],
          precedingIgnored: [],
          specials: 0,
          end: undefined,
          closed: true,
          closingIgnored: []
        }), "}" ];
      }
    }).call(this);
  })))), "}).call(this)" ];
});
sibilant.macros.namespaces.core.chain = (function chain$(object, calls) {
  /* chain include/macros.sibilant:922:0 */

  var calls = Array.prototype.slice.call(arguments, 1);

  console.log("DEPRECATION WARNING: DO NOT USE CHAIN");
  console.log(("  " + this.file + ":" + this.line + ":" + this.col));
  return (function() {
    if (0 === calls.length) {
      return transpile(object);
    } else if (1 === calls.length) {
      return {
        dir: "include",
        file: "include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 29664,
        line: 926,
        col: 31,
        length: 1,
        contents: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: "send",
          type: "literal",
          start: 29665,
          line: 926,
          col: 32,
          length: 4,
          contents: [],
          specials: 0,
          precedingIgnored: []
        }, object ].concat(calls[0].contents),
        precedingIgnored: [],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      };
    } else {
      var lines = map(calls, (function(call, index) {
        /* include/macros.sibilant:928:34 */
      
        return [ ".", transpile(call.contents[0]), "(", interleave(", ", map(call.contents.slice(1), transpile)), ")" ];
      }));
      return [ transpile(object), lines[0], "\n  ", recurseIndent(interleave("\n", lines.slice(1))) ];
    }
  }).call(this);
});
sibilant.macros.namespaces.core["instanceOf__QUERY"] = (function instanceOf__QUERY$(item, type) {
  /* instance-of? include/macros.sibilant:947:0 */

  return [ "(", transpile(item), " instanceof ", transpile(type), ")" ];
});
sibilant.macros.namespaces.core["includes__QUERY"] = (function includes__QUERY$(haystack, needle) {
  /* includes? include/macros.sibilant:958:0 */

  return {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 30643,
    line: 959,
    col: 8,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: "pipe",
      type: "literal",
      start: 30644,
      line: 959,
      col: 9,
      length: 4,
      contents: [],
      specials: 0,
      precedingIgnored: []
    }, haystack, {
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 30659,
      line: 959,
      col: 24,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: ".",
        type: "dots",
        start: 30660,
        line: 959,
        col: 25,
        length: 1,
        contents: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: "index-of",
          type: "literal",
          start: 30661,
          line: 959,
          col: 26,
          length: 8,
          contents: [],
          specials: 0,
          precedingIgnored: []
        } ],
        precedingIgnored: []
      }, needle ],
      precedingIgnored: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: " ",
        type: "whitespace",
        start: 30658,
        line: 959,
        col: 23,
        length: 1,
        contents: []
      } ],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    }, {
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 30679,
      line: 959,
      col: 44,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "!=",
        type: "otherChar",
        start: 30680,
        line: 959,
        col: 45,
        length: 2,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, {
        dir: "include",
        file: "include/macros.sibilant",
        token: "-1",
        type: "number",
        start: 30683,
        line: 959,
        col: 48,
        length: 2,
        contents: [],
        specials: 0,
        precedingIgnored: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 30682,
          line: 959,
          col: 47,
          length: 1,
          contents: []
        } ]
      } ],
      precedingIgnored: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: " ",
        type: "whitespace",
        start: 30678,
        line: 959,
        col: 43,
        length: 1,
        contents: []
      } ],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    } ],
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core["excludes__QUERY"] = (function excludes__QUERY$(haystack, needle) {
  /* excludes? include/macros.sibilant:971:0 */

  return {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 30956,
    line: 972,
    col: 8,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: "pipe",
      type: "literal",
      start: 30957,
      line: 972,
      col: 9,
      length: 4,
      contents: [],
      specials: 0,
      precedingIgnored: []
    }, haystack, {
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 30972,
      line: 972,
      col: 24,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: ".",
        type: "dots",
        start: 30973,
        line: 972,
        col: 25,
        length: 1,
        contents: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: "index-of",
          type: "literal",
          start: 30974,
          line: 972,
          col: 26,
          length: 8,
          contents: [],
          specials: 0,
          precedingIgnored: []
        } ],
        precedingIgnored: []
      }, needle ],
      precedingIgnored: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: " ",
        type: "whitespace",
        start: 30971,
        line: 972,
        col: 23,
        length: 1,
        contents: []
      } ],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    }, {
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 30992,
      line: 972,
      col: 44,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "=",
        type: "otherChar",
        start: 30993,
        line: 972,
        col: 45,
        length: 1,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, {
        dir: "include",
        file: "include/macros.sibilant",
        token: "-1",
        type: "number",
        start: 30995,
        line: 972,
        col: 47,
        length: 2,
        contents: [],
        specials: 0,
        precedingIgnored: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 30994,
          line: 972,
          col: 46,
          length: 1,
          contents: []
        } ]
      } ],
      precedingIgnored: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: " ",
        type: "whitespace",
        start: 30991,
        line: 972,
        col: 43,
        length: 1,
        contents: []
      } ],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    } ],
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core["exists__QUERY"] = (function exists__QUERY$(thing) {
  /* exists? include/macros.sibilant:982:0 */

  return {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 31210,
    line: 983,
    col: 8,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: "and",
      type: "literal",
      start: 31211,
      line: 983,
      col: 9,
      length: 3,
      contents: [],
      specials: 0,
      precedingIgnored: []
    }, {
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 31215,
      line: 983,
      col: 13,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "defined?",
        type: "literal",
        start: 31216,
        line: 983,
        col: 14,
        length: 8,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, thing ],
      precedingIgnored: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: " ",
        type: "whitespace",
        start: 31214,
        line: 983,
        col: 12,
        length: 1,
        contents: []
      } ],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    }, {
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 31233,
      line: 983,
      col: 31,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "!=",
        type: "otherChar",
        start: 31234,
        line: 983,
        col: 32,
        length: 2,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, thing, {
        dir: "include",
        file: "include/macros.sibilant",
        token: "null",
        type: "literal",
        start: 31244,
        line: 983,
        col: 42,
        length: 4,
        contents: [],
        specials: 0,
        precedingIgnored: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 31243,
          line: 983,
          col: 41,
          length: 1,
          contents: []
        } ]
      } ],
      precedingIgnored: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: " ",
        type: "whitespace",
        start: 31232,
        line: 983,
        col: 30,
        length: 1,
        contents: []
      } ],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    } ],
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core.withState = (function withState$(k, v, body) {
  /* with-state include/macros.sibilant:989:0 */

  var body = Array.prototype.slice.call(arguments, 2);

  var before = sibilant.macros.namespaces.core.state(k);
  sibilant.macros.namespaces.core.state(k, v);
  var returnValue = interleave("\n", map(body, transpile));
  sibilant.macros.namespaces.core.state(k, before);
  return returnValue;
});
sibilant.macros.namespaces.core.join = (function join$(arr, glue) {
  /* join include/macros.sibilant:1011:0 */

  (function() {
    if ((typeof glue !== "undefined" && typeof arr === "undefined")) {
      arr = glue;
      return glue = undefined;
    }
  }).call(this);
  return {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 31944,
    line: 1014,
    col: 8,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: ".",
      type: "dots",
      start: 31945,
      line: 1014,
      col: 9,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "join",
        type: "literal",
        start: 31946,
        line: 1014,
        col: 10,
        length: 4,
        contents: [],
        specials: 0,
        precedingIgnored: []
      } ],
      precedingIgnored: []
    }, arr, (glue || "\"\"") ],
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core["_destructure"] = (function _destructure$(pairs) {
  /* *destructure include/macros.sibilant:1019:0 */

  var destructured = [];
  bulkMap(pairs, (function(lhs, rhs) {
    /* include/macros.sibilant:1021:21 */
  
    var transpiledRhs = transpile(rhs);
    return (function() {
      switch(lhs.type) {
      case "bracket":
        var literalRhs__QUERY = outputFormatter(transpiledRhs).match((new RegExp("^[\._a-zA-Z0-9]+$", undefined))),
            source = (function() {
          if (literalRhs__QUERY) {
            return transpiledRhs;
          } else {
            var symbol = sibilant.macros.namespaces.core.symbol();
            destructured.push([ symbol, transpiledRhs ]);
            return symbol;
          }
        }).call(this);
        lhs.contents.forEach((function(item, index) {
          /* include/macros.sibilant:1031:32 */
        
          return destructured.push([ transpile(item), {
            dir: "include",
            file: "include/macros.sibilant",
            token: "(",
            type: "expression",
            start: 32902,
            line: 1032,
            col: 76,
            length: 1,
            contents: [ {
              dir: "include",
              file: "include/macros.sibilant",
              token: "get",
              type: "literal",
              start: 32903,
              line: 1032,
              col: 77,
              length: 3,
              contents: [],
              specials: 0,
              precedingIgnored: []
            }, source, index ],
            precedingIgnored: [],
            specials: 0,
            end: undefined,
            closed: true,
            closingIgnored: []
          } ]);
        }));
        return (function() {
          if (!(literalRhs__QUERY)) {
            return destructured.push([ source, "undefined" ]);
          }
        }).call(this);
      
      case "brace":
        var literalRhs__QUERY = outputFormatter(transpiledRhs).match((new RegExp("^[\._a-zA-Z0-9]+$", undefined))),
            source = (function() {
          if (literalRhs__QUERY) {
            return transpiledRhs;
          } else {
            var symbol = sibilant.macros.namespaces.core.symbol();
            destructured.push([ symbol, transpiledRhs ]);
            return symbol;
          }
        }).call(this);
        lhs.contents.forEach((function(item, index) {
          /* include/macros.sibilant:1042:32 */
        
          var trItem = transpile(item);
          return destructured.push([ trItem, {
            dir: "include",
            file: "include/macros.sibilant",
            token: "(",
            type: "expression",
            start: 33853,
            line: 1044,
            col: 67,
            length: 1,
            contents: [ {
              dir: "include",
              file: "include/macros.sibilant",
              token: "get",
              type: "literal",
              start: 33854,
              line: 1044,
              col: 68,
              length: 3,
              contents: [],
              specials: 0,
              precedingIgnored: []
            }, source, [ "\"", trItem, "\"" ] ],
            precedingIgnored: [],
            specials: 0,
            end: undefined,
            closed: true,
            closingIgnored: []
          } ]);
        }));
        return (function() {
          if (!(literalRhs__QUERY)) {
            return destructured.push([ source, "undefined" ]);
          }
        }).call(this);
      
      default:
        return destructured.push([ transpile(lhs), (function() {
          if (rhs) {
            return transpiledRhs;
          } else {
            return "undefined";
          }
        }).call(this) ]);
      }
    }).call(this);
  }));
  return destructured;
});
sibilant.macros.namespaces.core.var = (function var$(pairs) {
  /* var include/macros.sibilant:1063:0 */

  var pairs = Array.prototype.slice.call(arguments, 0);

  return asStatement([ "var ", interleave(map(sibilant.macros.namespaces.core["_destructure"](pairs), (function(pair) {
    /* include/macros.sibilant:1067:25 */
  
    return [ pair[0], " = ", pair[1] ];
  })), ",\n    ") ]);
});
sibilant.macros.namespaces.core.assign = (function assign$(pairs) {
  /* assign include/macros.sibilant:1085:0 */

  var pairs = Array.prototype.slice.call(arguments, 0);

  return interleave(map(sibilant.macros.namespaces.core["_destructure"](pairs), (function(pair) {
    /* include/macros.sibilant:1088:17 */
  
    return asStatement([ pair[0], " = ", pair[1] ]);
  })), "\n");
});
sibilant.macros.namespaces.core.default = (function default$(pairs) {
  /* default include/macros.sibilant:1096:0 */

  var pairs = Array.prototype.slice.call(arguments, 0);

  return interleave("\n", bulkMap(pairs, (function(name, value) {
    /* include/macros.sibilant:1097:40 */
  
    return {
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 35842,
      line: 1098,
      col: 35,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "assign",
        type: "literal",
        start: 35843,
        line: 1098,
        col: 36,
        length: 6,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, name, {
        dir: "include",
        file: "include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 35856,
        line: 1098,
        col: 49,
        length: 1,
        contents: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: "ternary",
          type: "literal",
          start: 35857,
          line: 1098,
          col: 50,
          length: 7,
          contents: [],
          specials: 0,
          precedingIgnored: []
        }, {
          dir: "include",
          file: "include/macros.sibilant",
          token: "(",
          type: "expression",
          start: 35865,
          line: 1098,
          col: 58,
          length: 1,
          contents: [ {
            dir: "include",
            file: "include/macros.sibilant",
            token: "defined?",
            type: "literal",
            start: 35866,
            line: 1098,
            col: 59,
            length: 8,
            contents: [],
            specials: 0,
            precedingIgnored: []
          }, name ],
          precedingIgnored: [ {
            dir: "include",
            file: "include/macros.sibilant",
            token: " ",
            type: "whitespace",
            start: 35864,
            line: 1098,
            col: 57,
            length: 1,
            contents: []
          } ],
          specials: 0,
          end: undefined,
          closed: true,
          closingIgnored: []
        }, name, value ],
        precedingIgnored: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 35855,
          line: 1098,
          col: 48,
          length: 1,
          contents: []
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      } ],
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  })));
});
sibilant.macros.namespaces.core.importNamespace = (function importNamespace$(namespace) {
  /* import-namespace include/macros.sibilant:1101:0 */

  var namespaceAsString = outputFormatter(transpile(namespace));
  (function() {
    if (!(sibilant.macros.namespaces.hasOwnProperty(namespaceAsString))) {
      return sibilant.macros.namespaces[namespaceAsString] = {  };
    }
  }).call(this);
  sibilant.macros.searchPath.unshift(namespaceAsString);
  return undefined;
});
sibilant.macros.namespaces.core.namespace = (function namespace$(namespace) {
  /* namespace include/macros.sibilant:1109:0 */

  sibilant.macros.namespaces.core.importNamespace(namespace);
  sibilant.macros.namespace = sibilant.macros.namespaces[outputFormatter(transpile(namespace))];
  return undefined;
});
sibilant.macros.namespaces.core["hasKey__QUERY"] = (function hasKey__QUERY$(object, key) {
  /* has-key? include/macros.sibilant:1124:0 */

  return {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 36650,
    line: 1125,
    col: 8,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: ".",
      type: "dots",
      start: 36651,
      line: 1125,
      col: 9,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "has-own-property",
        type: "literal",
        start: 36652,
        line: 1125,
        col: 10,
        length: 16,
        contents: [],
        specials: 0,
        precedingIgnored: []
      } ],
      precedingIgnored: []
    }, object, key ],
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core.get = (function get$(obj, keys) {
  /* get include/macros.sibilant:1146:0 */

  var keys = Array.prototype.slice.call(arguments, 1);

  return [ transpile(obj), map(keys, (function(key) {
    /* include/macros.sibilant:1148:19 */
  
    var transpiled = transpile(key),
        output = outputFormatter(transpiled);
    return (function() {
      if (output.match((new RegExp("^\"[a-zA-Z0-9]+\"$", undefined)))) {
        return [ ".", output.replace((new RegExp("\"", "g")), "") ];
      } else {
        return [ "[", transpiled, "]" ];
      }
    }).call(this);
  })) ];
});
sibilant.macros.namespaces.core.set = (function set$(arr, kvPairs) {
  /* set include/macros.sibilant:1175:0 */

  var kvPairs = Array.prototype.slice.call(arguments, 1);

  return interleave("\n", bulkMap(kvPairs, (function(k, v) {
    /* include/macros.sibilant:1176:43 */
  
    return {
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 38318,
      line: 1176,
      col: 52,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "assign",
        type: "literal",
        start: 38319,
        line: 1176,
        col: 53,
        length: 6,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, {
        dir: "include",
        file: "include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 38326,
        line: 1176,
        col: 60,
        length: 1,
        contents: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: "get",
          type: "literal",
          start: 38327,
          line: 1176,
          col: 61,
          length: 3,
          contents: [],
          specials: 0,
          precedingIgnored: []
        }, arr, k ],
        precedingIgnored: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 38325,
          line: 1176,
          col: 59,
          length: 1,
          contents: []
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      }, v ],
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  })));
});
sibilant.macros.namespaces.core["lowerCase__QUERY"] = (function lowerCase__QUERY$(str) {
  /* lower-case? include/macros.sibilant:1181:0 */

  return {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 38515,
    line: 1182,
    col: 8,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: "=",
      type: "otherChar",
      start: 38516,
      line: 1182,
      col: 9,
      length: 1,
      contents: [],
      specials: 0,
      precedingIgnored: []
    }, {
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 38518,
      line: 1182,
      col: 11,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: ".",
        type: "dots",
        start: 38519,
        line: 1182,
        col: 12,
        length: 1,
        contents: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: "to-lower-case",
          type: "literal",
          start: 38520,
          line: 1182,
          col: 13,
          length: 13,
          contents: [],
          specials: 0,
          precedingIgnored: []
        } ],
        precedingIgnored: []
      }, str ],
      precedingIgnored: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: " ",
        type: "whitespace",
        start: 38517,
        line: 1182,
        col: 10,
        length: 1,
        contents: []
      } ],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    }, str ],
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core["upperCase__QUERY"] = (function upperCase__QUERY$(str) {
  /* upper-case? include/macros.sibilant:1189:0 */

  return {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 38716,
    line: 1190,
    col: 8,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: "=",
      type: "otherChar",
      start: 38717,
      line: 1190,
      col: 9,
      length: 1,
      contents: [],
      specials: 0,
      precedingIgnored: []
    }, {
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 38719,
      line: 1190,
      col: 11,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: ".",
        type: "dots",
        start: 38720,
        line: 1190,
        col: 12,
        length: 1,
        contents: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: "to-upper-case",
          type: "literal",
          start: 38721,
          line: 1190,
          col: 13,
          length: 13,
          contents: [],
          specials: 0,
          precedingIgnored: []
        } ],
        precedingIgnored: []
      }, str ],
      precedingIgnored: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: " ",
        type: "whitespace",
        start: 38718,
        line: 1190,
        col: 10,
        length: 1,
        contents: []
      } ],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    }, str ],
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core.sourceMappingUrl = (function sourceMappingUrl$(url) {
  /* source-mapping-url include/macros.sibilant:1197:0 */

  return [ "//# sourceMappingURL=", eval(outputFormatter(transpile(url))), "\n" ];
});
sibilant.macros.namespaces.core.sortBy = (function sortBy$(arrayOfObjects, attribute) {
  /* sort-by include/macros.sibilant:1206:0 */

  return {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 39355,
    line: 1207,
    col: 8,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: ".",
      type: "dots",
      start: 39356,
      line: 1207,
      col: 9,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "sort",
        type: "literal",
        start: 39357,
        line: 1207,
        col: 10,
        length: 4,
        contents: [],
        specials: 0,
        precedingIgnored: []
      } ],
      precedingIgnored: []
    }, arrayOfObjects, {
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 39395,
      line: 1208,
      col: 15,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "#->",
        type: "otherChar",
        start: 39396,
        line: 1208,
        col: 16,
        length: 3,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, {
        dir: "include",
        file: "include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 39400,
        line: 1208,
        col: 20,
        length: 1,
        contents: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: "get",
          type: "literal",
          start: 39401,
          line: 1208,
          col: 21,
          length: 3,
          contents: [],
          specials: 0,
          precedingIgnored: []
        }, attribute ],
        precedingIgnored: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 39399,
          line: 1208,
          col: 19,
          length: 1,
          contents: []
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      }, {
        dir: "include",
        file: "include/macros.sibilant",
        token: ".",
        type: "dots",
        start: 39437,
        line: 1209,
        col: 20,
        length: 1,
        contents: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: "to-string",
          type: "literal",
          start: 39438,
          line: 1209,
          col: 21,
          length: 9,
          contents: [],
          specials: 0,
          precedingIgnored: []
        } ],
        precedingIgnored: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: "\n",
          type: "newline",
          start: 39416,
          line: 1208,
          col: 36,
          length: 1,
          contents: []
        }, {
          dir: "include",
          file: "include/macros.sibilant",
          token: "                    ",
          type: "whitespace",
          start: 39417,
          line: 1209,
          col: 0,
          length: 20,
          contents: []
        } ]
      }, {
        dir: "include",
        file: "include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 39468,
        line: 1210,
        col: 20,
        length: 1,
        contents: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: ".",
          type: "dots",
          start: 39469,
          line: 1210,
          col: 21,
          length: 1,
          contents: [ {
            dir: "include",
            file: "include/macros.sibilant",
            token: "locale-compare",
            type: "literal",
            start: 39470,
            line: 1210,
            col: 22,
            length: 14,
            contents: [],
            specials: 0,
            precedingIgnored: []
          } ],
          precedingIgnored: []
        }, {
          dir: "include",
          file: "include/macros.sibilant",
          token: "(",
          type: "expression",
          start: 39485,
          line: 1210,
          col: 37,
          length: 1,
          contents: [ {
            dir: "include",
            file: "include/macros.sibilant",
            token: "get",
            type: "literal",
            start: 39486,
            line: 1210,
            col: 38,
            length: 3,
            contents: [],
            specials: 0,
            precedingIgnored: []
          }, {
            dir: "include",
            file: "include/macros.sibilant",
            token: "#1",
            type: "argPlaceholder",
            start: 39490,
            line: 1210,
            col: 42,
            length: 2,
            contents: [],
            specials: 0,
            precedingIgnored: [ {
              dir: "include",
              file: "include/macros.sibilant",
              token: " ",
              type: "whitespace",
              start: 39489,
              line: 1210,
              col: 41,
              length: 1,
              contents: []
            } ]
          }, attribute ],
          precedingIgnored: [ {
            dir: "include",
            file: "include/macros.sibilant",
            token: " ",
            type: "whitespace",
            start: 39484,
            line: 1210,
            col: 36,
            length: 1,
            contents: []
          } ],
          specials: 0,
          end: undefined,
          closed: true,
          closingIgnored: []
        } ],
        precedingIgnored: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: "\n",
          type: "newline",
          start: 39447,
          line: 1209,
          col: 30,
          length: 1,
          contents: []
        }, {
          dir: "include",
          file: "include/macros.sibilant",
          token: "                    ",
          type: "whitespace",
          start: 39448,
          line: 1210,
          col: 0,
          length: 20,
          contents: []
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      } ],
      precedingIgnored: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "\n",
        type: "newline",
        start: 39379,
        line: 1207,
        col: 32,
        length: 1,
        contents: []
      }, {
        dir: "include",
        file: "include/macros.sibilant",
        token: "               ",
        type: "whitespace",
        start: 39380,
        line: 1208,
        col: 0,
        length: 15,
        contents: []
      } ],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    } ],
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core["require__BANG"] = (function require__BANG$(requires) {
  /* require! include/macros.sibilant:1213:0 */

  var requires = Array.prototype.slice.call(arguments, 0);

  return {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 39549,
    line: 1214,
    col: 8,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: "var",
      type: "literal",
      start: 39550,
      line: 1214,
      col: 9,
      length: 3,
      contents: [],
      specials: 0,
      precedingIgnored: []
    } ].concat(inject([], requires, (function(pairs, node) {
      /* include/macros.sibilant:1215:25 */
    
      return pairs.concat((function() {
        if ((0 === (pairs.length % 2) && node__QUERY(node, "tick", "string"))) {
          return [ mergeInto(clone(node), {
            token: outputFormatter(transpile(node)).slice(1, -1),
            contents: [],
            type: "literal"
          }), {
            dir: "include",
            file: "include/macros.sibilant",
            token: "(",
            type: "expression",
            start: 40158,
            line: 1225,
            col: 33,
            length: 1,
            contents: [ {
              dir: "include",
              file: "include/macros.sibilant",
              token: "require",
              type: "literal",
              start: 40159,
              line: 1225,
              col: 34,
              length: 7,
              contents: [],
              specials: 0,
              precedingIgnored: []
            }, node ],
            precedingIgnored: [],
            specials: 0,
            end: undefined,
            closed: true,
            closingIgnored: []
          } ];
        } else if (1 === (pairs.length % 2)) {
          return [ {
            dir: "include",
            file: "include/macros.sibilant",
            token: "(",
            type: "expression",
            start: 40266,
            line: 1228,
            col: 36,
            length: 1,
            contents: [ {
              dir: "include",
              file: "include/macros.sibilant",
              token: "require",
              type: "literal",
              start: 40267,
              line: 1228,
              col: 37,
              length: 7,
              contents: [],
              specials: 0,
              precedingIgnored: []
            }, node ],
            precedingIgnored: [],
            specials: 0,
            end: undefined,
            closed: true,
            closingIgnored: []
          } ];
        } else {
          return [ node ];
        }
      }).call(this));
    }))),
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core.export = (function export$(localVars) {
  /* export include/macros.sibilant:1233:0 */

  var localVars = Array.prototype.slice.call(arguments, 0);

  var pairs = localVars.reduce((function(acc, value) {
    /* include/macros.sibilant:1235:19 */
  
    return acc.concat([ sibilant.macros.namespaces.core.quote(value), value ]);
  }), []);
  return {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 40509,
    line: 1237,
    col: 8,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: "set",
      type: "literal",
      start: 40510,
      line: 1237,
      col: 9,
      length: 3,
      contents: [],
      specials: 0,
      precedingIgnored: []
    }, {
      dir: "include",
      file: "include/macros.sibilant",
      token: "exports",
      type: "literal",
      start: 40514,
      line: 1237,
      col: 13,
      length: 7,
      contents: [],
      specials: 0,
      precedingIgnored: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: " ",
        type: "whitespace",
        start: 40513,
        line: 1237,
        col: 12,
        length: 1,
        contents: []
      } ]
    } ].concat(pairs),
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});