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
sibilant.macros.namespaces.core.concat = sibilant.macros.namespaces.core["+"];
sibilant.macros.namespaces.core["-"] = (function $$(args) {
  /* - include/macros.sibilant:161:0 */

  var args = Array.prototype.slice.call(arguments, 0);

  return [ "(", interleave(" - ", map(args, transpile)), ")" ];
});
sibilant.macros.namespaces.core["_"] = (function _$(args) {
  /* * include/macros.sibilant:167:0 */

  var args = Array.prototype.slice.call(arguments, 0);

  return [ "(", interleave(" * ", map(args, transpile)), ")" ];
});
sibilant.macros.namespaces.core["/"] = (function $$(args) {
  /* / include/macros.sibilant:174:0 */

  var args = Array.prototype.slice.call(arguments, 0);

  return [ "(", interleave(" / ", map(args, transpile)), ")" ];
});
sibilant.macros.namespaces.core.or = (function or$(args) {
  /* or include/macros.sibilant:181:0 */

  var args = Array.prototype.slice.call(arguments, 0);

  return [ "(", interleave(" || ", map(args, transpile)), ")" ];
});
sibilant.macros.namespaces.core.and = (function and$(args) {
  /* and include/macros.sibilant:189:0 */

  var args = Array.prototype.slice.call(arguments, 0);

  return (1 === args.length) ? transpile(args[0]) : [ "(", interleave(" && ", map(args, transpile)), ")" ];
});
sibilant.macros.namespaces.core.mod = (function mod$(args) {
  /* mod include/macros.sibilant:196:0 */

  var args = Array.prototype.slice.call(arguments, 0);

  return [ "(", interleave(" % ", map(args, transpile)), ")" ];
});
sibilant.macros.namespaces.core[">"] = (function $$(args) {
  /* > include/macros.sibilant:231:0 */

  var args = Array.prototype.slice.call(arguments, 0);

  var jsComparator = ">";
  return {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 7315,
    line: 233,
    col: 8,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: "and",
      type: "literal",
      start: 7316,
      line: 233,
      col: 9,
      length: 3,
      contents: [],
      specials: 0,
      precedingIgnored: []
    } ].concat(map(args.slice(0, -1), (function(item, index) {
      /* include/macros.sibilant:234:22 */
    
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
  /* < include/macros.sibilant:238:0 */

  var args = Array.prototype.slice.call(arguments, 0);

  var jsComparator = "<";
  return {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 7527,
    line: 240,
    col: 8,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: "and",
      type: "literal",
      start: 7528,
      line: 240,
      col: 9,
      length: 3,
      contents: [],
      specials: 0,
      precedingIgnored: []
    } ].concat(map(args.slice(0, -1), (function(item, index) {
      /* include/macros.sibilant:241:22 */
    
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
  /* <= include/macros.sibilant:244:0 */

  var args = Array.prototype.slice.call(arguments, 0);

  var jsComparator = "<=";
  return {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 7740,
    line: 246,
    col: 8,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: "and",
      type: "literal",
      start: 7741,
      line: 246,
      col: 9,
      length: 3,
      contents: [],
      specials: 0,
      precedingIgnored: []
    } ].concat(map(args.slice(0, -1), (function(item, index) {
      /* include/macros.sibilant:247:22 */
    
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
  /* >= include/macros.sibilant:250:0 */

  var args = Array.prototype.slice.call(arguments, 0);

  var jsComparator = ">=";
  return {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 7953,
    line: 252,
    col: 8,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: "and",
      type: "literal",
      start: 7954,
      line: 252,
      col: 9,
      length: 3,
      contents: [],
      specials: 0,
      precedingIgnored: []
    } ].concat(map(args.slice(0, -1), (function(item, index) {
      /* include/macros.sibilant:253:22 */
    
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
  /* != include/macros.sibilant:255:0 */

  var args = Array.prototype.slice.call(arguments, 0);

  var jsComparator = "!==";
  return {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 8166,
    line: 257,
    col: 8,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: "and",
      type: "literal",
      start: 8167,
      line: 257,
      col: 9,
      length: 3,
      contents: [],
      specials: 0,
      precedingIgnored: []
    } ].concat(map(args.slice(0, -1), (function(item, index) {
      /* include/macros.sibilant:258:22 */
    
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
  /* = include/macros.sibilant:261:0 */

  var args = Array.prototype.slice.call(arguments, 0);

  var jsComparator = "===";
  return {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 8379,
    line: 263,
    col: 8,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: "and",
      type: "literal",
      start: 8380,
      line: 263,
      col: 9,
      length: 3,
      contents: [],
      specials: 0,
      precedingIgnored: []
    } ].concat(map(args.slice(0, -1), (function(item, index) {
      /* include/macros.sibilant:264:22 */
    
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
  /* incr-by include/macros.sibilant:271:0 */

  return [ transpile(item), " += ", transpile(increment) ];
});
sibilant.macros.namespaces.core.incr = (function incr$(item) {
  /* incr include/macros.sibilant:280:0 */

  return [ "((", transpile(item), ")++)" ];
});
sibilant.macros.namespaces.core.decr = (function decr$(item) {
  /* decr include/macros.sibilant:287:0 */

  return [ "((", transpile(item), ")--)" ];
});
sibilant.macros.namespaces.core.new = (function new$(constructor, args) {
  /* new include/macros.sibilant:294:0 */

  var args = Array.prototype.slice.call(arguments, 1);

  return [ "(new ", {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 9236,
    line: 295,
    col: 17,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: "call",
      type: "literal",
      start: 9237,
      line: 295,
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
  /* regex include/macros.sibilant:302:0 */

  return {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 9481,
    line: 303,
    col: 8,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: "new",
      type: "literal",
      start: 9482,
      line: 303,
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
      start: 9486,
      line: 303,
      col: 13,
      length: 6,
      contents: [],
      specials: 0,
      precedingIgnored: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: " ",
        type: "whitespace",
        start: 9485,
        line: 303,
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
  /* zero? include/macros.sibilant:310:0 */

  return {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 9647,
    line: 310,
    col: 21,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: "=",
      type: "otherChar",
      start: 9648,
      line: 310,
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
      start: 9656,
      line: 310,
      col: 30,
      length: 1,
      contents: [],
      specials: 0,
      precedingIgnored: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: " ",
        type: "whitespace",
        start: 9655,
        line: 310,
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
  /* empty? include/macros.sibilant:316:0 */

  return {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 9811,
    line: 317,
    col: 8,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: "=",
      type: "otherChar",
      start: 9812,
      line: 317,
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
      start: 9814,
      line: 317,
      col: 11,
      length: 1,
      contents: [],
      specials: 0,
      precedingIgnored: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: " ",
        type: "whitespace",
        start: 9813,
        line: 317,
        col: 10,
        length: 1,
        contents: []
      } ]
    }, {
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 9816,
      line: 317,
      col: 13,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "length",
        type: "literal",
        start: 9817,
        line: 317,
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
        start: 9815,
        line: 317,
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
  /* odd? include/macros.sibilant:323:0 */

  return {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 9963,
    line: 324,
    col: 8,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: "=",
      type: "otherChar",
      start: 9964,
      line: 324,
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
      start: 9966,
      line: 324,
      col: 11,
      length: 1,
      contents: [],
      specials: 0,
      precedingIgnored: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: " ",
        type: "whitespace",
        start: 9965,
        line: 324,
        col: 10,
        length: 1,
        contents: []
      } ]
    }, {
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 9968,
      line: 324,
      col: 13,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "mod",
        type: "literal",
        start: 9969,
        line: 324,
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
        start: 9981,
        line: 324,
        col: 26,
        length: 1,
        contents: [],
        specials: 0,
        precedingIgnored: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 9980,
          line: 324,
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
        start: 9967,
        line: 324,
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
  /* even? include/macros.sibilant:330:0 */

  return {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 10134,
    line: 331,
    col: 8,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: "=",
      type: "otherChar",
      start: 10135,
      line: 331,
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
      start: 10137,
      line: 331,
      col: 11,
      length: 1,
      contents: [],
      specials: 0,
      precedingIgnored: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: " ",
        type: "whitespace",
        start: 10136,
        line: 331,
        col: 10,
        length: 1,
        contents: []
      } ]
    }, {
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 10139,
      line: 331,
      col: 13,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "mod",
        type: "literal",
        start: 10140,
        line: 331,
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
        start: 10152,
        line: 331,
        col: 26,
        length: 1,
        contents: [],
        specials: 0,
        precedingIgnored: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 10151,
          line: 331,
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
        start: 10138,
        line: 331,
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
  /* typeof include/macros.sibilant:338:0 */

  return [ "typeof ", transpile(thing) ];
});
sibilant.macros.namespaces.core["string__QUERY"] = (function string__QUERY$(things) {
  /* string? include/macros.sibilant:344:0 */

  var things = Array.prototype.slice.call(arguments, 0);

  return {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 10588,
    line: 345,
    col: 8,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: "and",
      type: "literal",
      start: 10589,
      line: 345,
      col: 9,
      length: 3,
      contents: [],
      specials: 0,
      precedingIgnored: []
    } ].concat(map(things, (function(thing) {
      /* include/macros.sibilant:345:29 */
    
      return {
        dir: "include",
        file: "include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 10620,
        line: 345,
        col: 40,
        length: 1,
        contents: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: "=",
          type: "otherChar",
          start: 10621,
          line: 345,
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
          start: 10623,
          line: 345,
          col: 43,
          length: 1,
          contents: [ {
            dir: "include",
            file: "include/macros.sibilant",
            token: "typeof",
            type: "literal",
            start: 10624,
            line: 345,
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
            start: 10622,
            line: 345,
            col: 42,
            length: 1,
            contents: []
          } ],
          specials: 0,
          end: undefined,
          closed: true,
          closingIgnored: []
        }, {"dir":"include","file":"include/macros.sibilant","token":"'","type":"tick","start":10639,"line":345,"col":59,"length":1,"contents":[{"dir":"include","file":"include/macros.sibilant","token":"string","type":"literal","start":10640,"line":345,"col":60,"length":6,"contents":[],"specials":0,"precedingIgnored":[]}],"precedingIgnored":[{"dir":"include","file":"include/macros.sibilant","token":" ","type":"whitespace","start":10638,"line":345,"col":58,"length":1,"contents":[]}]} ],
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
  /* function? include/macros.sibilant:351:0 */

  var things = Array.prototype.slice.call(arguments, 0);

  return {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 10832,
    line: 352,
    col: 8,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: "and",
      type: "literal",
      start: 10833,
      line: 352,
      col: 9,
      length: 3,
      contents: [],
      specials: 0,
      precedingIgnored: []
    } ].concat(map(things, (function(thing) {
      /* include/macros.sibilant:352:29 */
    
      return {
        dir: "include",
        file: "include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 10864,
        line: 352,
        col: 40,
        length: 1,
        contents: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: "=",
          type: "otherChar",
          start: 10865,
          line: 352,
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
          start: 10867,
          line: 352,
          col: 43,
          length: 1,
          contents: [ {
            dir: "include",
            file: "include/macros.sibilant",
            token: "typeof",
            type: "literal",
            start: 10868,
            line: 352,
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
            start: 10866,
            line: 352,
            col: 42,
            length: 1,
            contents: []
          } ],
          specials: 0,
          end: undefined,
          closed: true,
          closingIgnored: []
        }, {"dir":"include","file":"include/macros.sibilant","token":"'","type":"tick","start":10883,"line":352,"col":59,"length":1,"contents":[{"dir":"include","file":"include/macros.sibilant","token":"function","type":"literal","start":10884,"line":352,"col":60,"length":8,"contents":[],"specials":0,"precedingIgnored":[]}],"precedingIgnored":[{"dir":"include","file":"include/macros.sibilant","token":" ","type":"whitespace","start":10882,"line":352,"col":58,"length":1,"contents":[]}]} ],
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
  /* undefined? include/macros.sibilant:361:0 */

  var things = Array.prototype.slice.call(arguments, 0);

  return {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 11199,
    line: 362,
    col: 8,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: "and",
      type: "literal",
      start: 11200,
      line: 362,
      col: 9,
      length: 3,
      contents: [],
      specials: 0,
      precedingIgnored: []
    } ].concat(map(things, (function(thing) {
      /* include/macros.sibilant:362:29 */
    
      return {
        dir: "include",
        file: "include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 11231,
        line: 362,
        col: 40,
        length: 1,
        contents: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: "=",
          type: "otherChar",
          start: 11232,
          line: 362,
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
          start: 11234,
          line: 362,
          col: 43,
          length: 1,
          contents: [ {
            dir: "include",
            file: "include/macros.sibilant",
            token: "typeof",
            type: "literal",
            start: 11235,
            line: 362,
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
            start: 11233,
            line: 362,
            col: 42,
            length: 1,
            contents: []
          } ],
          specials: 0,
          end: undefined,
          closed: true,
          closingIgnored: []
        }, {"dir":"include","file":"include/macros.sibilant","token":"'","type":"tick","start":11250,"line":362,"col":59,"length":1,"contents":[{"dir":"include","file":"include/macros.sibilant","token":"undefined","type":"literal","start":11251,"line":362,"col":60,"length":9,"contents":[],"specials":0,"precedingIgnored":[]}],"precedingIgnored":[{"dir":"include","file":"include/macros.sibilant","token":" ","type":"whitespace","start":11249,"line":362,"col":58,"length":1,"contents":[]}]} ],
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
  /* defined? include/macros.sibilant:370:0 */

  var things = Array.prototype.slice.call(arguments, 0);

  return {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 11526,
    line: 371,
    col: 8,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: "and",
      type: "literal",
      start: 11527,
      line: 371,
      col: 9,
      length: 3,
      contents: [],
      specials: 0,
      precedingIgnored: []
    } ].concat(map(things, (function(thing) {
      /* include/macros.sibilant:371:29 */
    
      return {
        dir: "include",
        file: "include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 11558,
        line: 371,
        col: 40,
        length: 1,
        contents: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: "!=",
          type: "otherChar",
          start: 11559,
          line: 371,
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
          start: 11562,
          line: 371,
          col: 44,
          length: 1,
          contents: [ {
            dir: "include",
            file: "include/macros.sibilant",
            token: "typeof",
            type: "literal",
            start: 11563,
            line: 371,
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
            start: 11561,
            line: 371,
            col: 43,
            length: 1,
            contents: []
          } ],
          specials: 0,
          end: undefined,
          closed: true,
          closingIgnored: []
        }, {"dir":"include","file":"include/macros.sibilant","token":"'","type":"tick","start":11578,"line":371,"col":60,"length":1,"contents":[{"dir":"include","file":"include/macros.sibilant","token":"undefined","type":"literal","start":11579,"line":371,"col":61,"length":9,"contents":[],"specials":0,"precedingIgnored":[]}],"precedingIgnored":[{"dir":"include","file":"include/macros.sibilant","token":" ","type":"whitespace","start":11577,"line":371,"col":59,"length":1,"contents":[]}]} ],
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
  /* number? include/macros.sibilant:378:0 */

  var things = Array.prototype.slice.call(arguments, 0);

  return {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 11787,
    line: 379,
    col: 8,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: "and",
      type: "literal",
      start: 11788,
      line: 379,
      col: 9,
      length: 3,
      contents: [],
      specials: 0,
      precedingIgnored: []
    } ].concat(map(things, (function(thing) {
      /* include/macros.sibilant:379:29 */
    
      return {
        dir: "include",
        file: "include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 11819,
        line: 379,
        col: 40,
        length: 1,
        contents: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: "=",
          type: "otherChar",
          start: 11820,
          line: 379,
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
          start: 11822,
          line: 379,
          col: 43,
          length: 1,
          contents: [ {
            dir: "include",
            file: "include/macros.sibilant",
            token: "typeof",
            type: "literal",
            start: 11823,
            line: 379,
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
            start: 11821,
            line: 379,
            col: 42,
            length: 1,
            contents: []
          } ],
          specials: 0,
          end: undefined,
          closed: true,
          closingIgnored: []
        }, {"dir":"include","file":"include/macros.sibilant","token":"'","type":"tick","start":11838,"line":379,"col":59,"length":1,"contents":[{"dir":"include","file":"include/macros.sibilant","token":"number","type":"literal","start":11839,"line":379,"col":60,"length":6,"contents":[],"specials":0,"precedingIgnored":[]}],"precedingIgnored":[{"dir":"include","file":"include/macros.sibilant","token":" ","type":"whitespace","start":11837,"line":379,"col":58,"length":1,"contents":[]}]} ],
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
  /* if include/macros.sibilant:383:0 */

  return [ "(function() {", indent([ "if (", transpile(arg), ") {", indent({
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 11999,
    line: 386,
    col: 33,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: "do",
      type: "literal",
      start: 12000,
      line: 386,
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
    start: 12086,
    line: 388,
    col: 33,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: "do",
      type: "literal",
      start: 12087,
      line: 388,
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
  /* pipe include/macros.sibilant:416:0 */

  var calls = Array.prototype.slice.call(arguments, 0);

  return inject(undefined, calls, (function(value, item) {
    /* include/macros.sibilant:418:15 */
  
    return (function() {
      if (typeof value === "undefined") {
        return item;
      } else {
        return (function() {
          /* include/macros.sibilant:420:21 */
        
          var cloned = (function() {
            if (node__QUERY(item, "literal", "dots")) {
              return {
                dir: "include",
                file: "include/macros.sibilant",
                token: "(",
                type: "expression",
                start: 13192,
                line: 422,
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
            /* include/macros.sibilant:426:47 */
          
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
  /* comment include/macros.sibilant:447:0 */

  var contents = Array.prototype.slice.call(arguments, 0);

  return map(contents, (function(content) {
    /* include/macros.sibilant:448:21 */
  
    return [ "// ", recurseMap(transpile(content), (function(item) {
      /* include/macros.sibilant:450:36 */
    
      return (item) ? outputFormatter(transpile(item)).replace((new RegExp("\n", "g")), "\n// ") : null;
    })) ];
  }));
});
sibilant.macros.namespaces.core["array__QUERY"] = (function array__QUERY$(thing) {
  /* array? include/macros.sibilant:470:0 */

  var transpiled = transpile(thing);
  return [ "((", transpiled, ") && typeof (", transpiled, ") === \"object\" && (", transpiled, ").constructor.name === \"Array\")" ];
});
sibilant.macros.namespaces.core["list__QUERY"] = sibilant.macros.namespaces.core["array__QUERY"];
sibilant.macros.namespaces.core["hash__QUERY"] = (function hash__QUERY$(thing) {
  /* hash? include/macros.sibilant:482:0 */

  return {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 15730,
    line: 483,
    col: 8,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: "and",
      type: "literal",
      start: 15731,
      line: 483,
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
      start: 15735,
      line: 483,
      col: 13,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "=",
        type: "otherChar",
        start: 15736,
        line: 483,
        col: 14,
        length: 1,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, {"dir":"include","file":"include/macros.sibilant","token":"'","type":"tick","start":15738,"line":483,"col":16,"length":1,"contents":[{"dir":"include","file":"include/macros.sibilant","token":"object","type":"literal","start":15739,"line":483,"col":17,"length":6,"contents":[],"specials":0,"precedingIgnored":[]}],"precedingIgnored":[{"dir":"include","file":"include/macros.sibilant","token":" ","type":"whitespace","start":15737,"line":483,"col":15,"length":1,"contents":[]}]}, {
        dir: "include",
        file: "include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 15746,
        line: 483,
        col: 24,
        length: 1,
        contents: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: "typeof",
          type: "literal",
          start: 15747,
          line: 483,
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
          start: 15745,
          line: 483,
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
        start: 15734,
        line: 483,
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
      start: 15776,
      line: 484,
      col: 13,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "!=",
        type: "otherChar",
        start: 15777,
        line: 484,
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
        start: 15787,
        line: 484,
        col: 24,
        length: 4,
        contents: [],
        specials: 0,
        precedingIgnored: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 15786,
          line: 484,
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
        start: 15762,
        line: 483,
        col: 40,
        length: 1,
        contents: []
      }, {
        dir: "include",
        file: "include/macros.sibilant",
        token: "             ",
        type: "whitespace",
        start: 15763,
        line: 484,
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
      start: 15806,
      line: 485,
      col: 13,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "!=",
        type: "otherChar",
        start: 15807,
        line: 485,
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
        start: 15810,
        line: 485,
        col: 17,
        length: 1,
        contents: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: "get",
          type: "literal",
          start: 15811,
          line: 485,
          col: 18,
          length: 3,
          contents: [],
          specials: 0,
          precedingIgnored: []
        }, thing, {"dir":"include","file":"include/macros.sibilant","token":"'","type":"tick","start":15822,"line":485,"col":29,"length":1,"contents":[{"dir":"include","file":"include/macros.sibilant","token":"constructor","type":"literal","start":15823,"line":485,"col":30,"length":11,"contents":[],"specials":0,"precedingIgnored":[]}],"precedingIgnored":[{"dir":"include","file":"include/macros.sibilant","token":" ","type":"whitespace","start":15821,"line":485,"col":28,"length":1,"contents":[]}]}, {"dir":"include","file":"include/macros.sibilant","token":"'","type":"tick","start":15835,"line":485,"col":42,"length":1,"contents":[{"dir":"include","file":"include/macros.sibilant","token":"name","type":"literal","start":15836,"line":485,"col":43,"length":4,"contents":[],"specials":0,"precedingIgnored":[]}],"precedingIgnored":[{"dir":"include","file":"include/macros.sibilant","token":" ","type":"whitespace","start":15834,"line":485,"col":41,"length":1,"contents":[]}]} ],
        precedingIgnored: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 15809,
          line: 485,
          col: 16,
          length: 1,
          contents: []
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      }, {"dir":"include","file":"include/macros.sibilant","token":"'","type":"tick","start":15842,"line":485,"col":49,"length":1,"contents":[{"dir":"include","file":"include/macros.sibilant","token":"Array","type":"literal","start":15843,"line":485,"col":50,"length":5,"contents":[],"specials":0,"precedingIgnored":[]}],"precedingIgnored":[{"dir":"include","file":"include/macros.sibilant","token":" ","type":"whitespace","start":15841,"line":485,"col":48,"length":1,"contents":[]}]} ],
      precedingIgnored: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "\n",
        type: "newline",
        start: 15792,
        line: 484,
        col: 29,
        length: 1,
        contents: []
      }, {
        dir: "include",
        file: "include/macros.sibilant",
        token: "             ",
        type: "whitespace",
        start: 15793,
        line: 485,
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
  /* *scoped-without-return include/macros.sibilant:488:0 */

  var body = Array.prototype.slice.call(arguments, 0);

  return [ "(function() {", indent.apply(this, body), "}).call(this)" ];
});
sibilant.macros.namespaces.core["_scopedWithoutSource"] = (function _scopedWithoutSource$(body) {
  /* *scoped-without-source include/macros.sibilant:492:0 */

  var body = Array.prototype.slice.call(arguments, 0);

  return {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 16030,
    line: 493,
    col: 8,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: "*scoped-without-return",
      type: "literal",
      start: 16031,
      line: 493,
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
      start: 16054,
      line: 493,
      col: 32,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "do",
        type: "literal",
        start: 16055,
        line: 493,
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
        start: 16053,
        line: 493,
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
  /* when include/macros.sibilant:502:0 */

  var body = Array.prototype.slice.call(arguments, 1);

  return sibilant.macros.namespaces.core["_scopedWithoutReturn"]("if (", condition, ") {", indent({
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 16476,
    line: 505,
    col: 18,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: "do",
      type: "literal",
      start: 16477,
      line: 505,
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
  /* not include/macros.sibilant:514:0 */

  return [ "!(", transpile(exp), ")" ];
});
sibilant.macros.namespaces.core.unless = (function unless$(condition, body) {
  /* unless include/macros.sibilant:527:0 */

  var body = Array.prototype.slice.call(arguments, 1);

  return [ "(function() {", indent([ "if (", {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 17209,
    line: 529,
    col: 25,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: "not",
      type: "literal",
      start: 17210,
      line: 529,
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
    start: 17265,
    line: 530,
    col: 33,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: "do",
      type: "literal",
      start: 17266,
      line: 530,
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
  /* assign include/macros.sibilant:535:0 */

  var args = Array.prototype.slice.call(arguments, 0);

  return interleave("\n", bulkMap(args, (function(name, value) {
    /* include/macros.sibilant:537:28 */
  
    return asStatement([ transpile(name), " = ", transpile(value) ]);
  })));
});
sibilant.macros.namespaces.core.logPretty = (function logPretty$(label, arg) {
  /* log-pretty include/macros.sibilant:549:0 */

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
    start: 18088,
    line: 554,
    col: 8,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: "console.log",
      type: "literal",
      start: 18089,
      line: 554,
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
      start: 18101,
      line: 554,
      col: 21,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "concat",
        type: "literal",
        start: 18102,
        line: 554,
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
        start: 18146,
        line: 554,
        col: 66,
        length: 3,
        contents: [],
        specials: 0,
        precedingIgnored: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 18145,
          line: 554,
          col: 65,
          length: 1,
          contents: []
        } ]
      }, label, {
        dir: "include",
        file: "include/macros.sibilant",
        token: "\" = \"",
        type: "string",
        start: 18157,
        line: 554,
        col: 77,
        length: 5,
        contents: [],
        specials: 0,
        precedingIgnored: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 18156,
          line: 554,
          col: 76,
          length: 1,
          contents: []
        } ]
      }, {
        dir: "include",
        file: "include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 18163,
        line: 554,
        col: 83,
        length: 1,
        contents: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: "prettify",
          type: "literal",
          start: 18164,
          line: 554,
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
          start: 18162,
          line: 554,
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
        start: 18100,
        line: 554,
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
  /* each include/macros.sibilant:567:17 */

  var body = Array.prototype.slice.call(arguments, 2);

  return {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 18958,
    line: 568,
    col: 8,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: ".",
      type: "dots",
      start: 18959,
      line: 568,
      col: 9,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "for-each",
        type: "literal",
        start: 18960,
        line: 568,
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
      start: 18995,
      line: 569,
      col: 19,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "lambda",
        type: "literal",
        start: 18996,
        line: 569,
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
        start: 18975,
        line: 568,
        col: 25,
        length: 1,
        contents: []
      }, {
        dir: "include",
        file: "include/macros.sibilant",
        token: "                   ",
        type: "whitespace",
        start: 18976,
        line: 569,
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
  /* macro-expand include/macros.sibilant:582:0 */

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
  /* throw include/macros.sibilant:595:0 */

  return [ "throw ", transpile(error) ];
});
sibilant.macros.namespaces.core.asBoolean = (function asBoolean$(expr) {
  /* as-boolean include/macros.sibilant:606:0 */

  return [ "(!!(", transpile(expr), "))" ];
});
sibilant.macros.namespaces.core.try = (function try$(tryblock, catchblock) {
  /* try include/macros.sibilant:612:0 */

  return [ "(function() {", indent([ "try {", indent({
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 19928,
    line: 615,
    col: 26,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: "do",
      type: "literal",
      start: 19929,
      line: 615,
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
    start: 20003,
    line: 617,
    col: 26,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: "do",
      type: "literal",
      start: 20004,
      line: 617,
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
  /* state include/macros.sibilant:629:0 */

  var pairs = Array.prototype.slice.call(arguments, 0);

  return (function() {
    if (1 === pairs.length) {
      return sibilant.state[outputFormatter(transpile(pairs[0]))];
    } else {
      bulkMap(pairs, (function(k, v) {
        /* include/macros.sibilant:632:31 */
      
        return sibilant.state[outputFormatter(transpile(k))] = eval(outputFormatter(transpile(v)));
      }));
      return null;
    }
  }).call(this);
});
sibilant.macros.namespaces.core.symbol = (function symbol$() {
  /* symbol include/macros.sibilant:638:0 */

  var symbolCount = (sibilant.state.symbolCount || 0),
      newSymbolCount = (1 + symbolCount);
  sibilant.macros.namespaces.core.state("symbolCount", newSymbolCount);
  return [ ("$_symbol" + newSymbolCount + "_$") ];
});
sibilant.macros.namespaces.core.while = (function while$(condition, body) {
  /* while include/macros.sibilant:653:0 */

  var body = Array.prototype.slice.call(arguments, 1);

  var symbol = sibilant.macros.namespaces.core.symbol();
  return {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 21141,
    line: 655,
    col: 8,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: "*scoped-without-source",
      type: "literal",
      start: 21142,
      line: 655,
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
      start: 21174,
      line: 656,
      col: 9,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "var",
        type: "literal",
        start: 21175,
        line: 656,
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
        start: 21164,
        line: 655,
        col: 31,
        length: 1,
        contents: []
      }, {
        dir: "include",
        file: "include/macros.sibilant",
        token: "         ",
        type: "whitespace",
        start: 21165,
        line: 656,
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
        start: 21311,
        line: 659,
        col: 35,
        length: 1,
        contents: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: "assign",
          type: "literal",
          start: 21312,
          line: 659,
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
          start: 21327,
          line: 659,
          col: 51,
          length: 1,
          contents: [ {
            dir: "include",
            file: "include/macros.sibilant",
            token: "*scoped-without-source",
            type: "literal",
            start: 21328,
            line: 659,
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
            start: 21326,
            line: 659,
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
  /* until include/macros.sibilant:672:0 */

  var body = Array.prototype.slice.call(arguments, 1);

  return {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 21720,
    line: 673,
    col: 8,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: "while",
      type: "literal",
      start: 21721,
      line: 673,
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
      start: 21727,
      line: 673,
      col: 15,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "not",
        type: "literal",
        start: 21728,
        line: 673,
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
        start: 21726,
        line: 673,
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
  /* match? include/macros.sibilant:682:0 */

  return {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 22001,
    line: 683,
    col: 8,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: ".",
      type: "dots",
      start: 22002,
      line: 683,
      col: 9,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "match",
        type: "literal",
        start: 22003,
        line: 683,
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
  /* match-regex? include/macros.sibilant:688:0 */

  return {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 22237,
    line: 689,
    col: 8,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: "match?",
      type: "literal",
      start: 22238,
      line: 689,
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
      start: 22245,
      line: 689,
      col: 16,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "regex",
        type: "literal",
        start: 22246,
        line: 689,
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
        start: 22244,
        line: 689,
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
  /* replace include/macros.sibilant:695:0 */

  return {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 22499,
    line: 696,
    col: 8,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: ".",
      type: "dots",
      start: 22500,
      line: 696,
      col: 9,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "replace",
        type: "literal",
        start: 22501,
        line: 696,
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
      start: 22531,
      line: 697,
      col: 14,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "regex",
        type: "literal",
        start: 22532,
        line: 697,
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
        start: 22516,
        line: 696,
        col: 25,
        length: 1,
        contents: []
      }, {
        dir: "include",
        file: "include/macros.sibilant",
        token: "              ",
        type: "whitespace",
        start: 22517,
        line: 697,
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
  /* replace-all include/macros.sibilant:703:0 */

  return {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 22796,
    line: 704,
    col: 8,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: ".",
      type: "dots",
      start: 22797,
      line: 704,
      col: 9,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "replace",
        type: "literal",
        start: 22798,
        line: 704,
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
      start: 22814,
      line: 704,
      col: 26,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "regex",
        type: "literal",
        start: 22815,
        line: 704,
        col: 27,
        length: 5,
        contents: [],
        specials: 0,
        precedingIgnored: []
      }, pattern, {"dir":"include","file":"include/macros.sibilant","token":"'","type":"tick","start":22830,"line":704,"col":42,"length":1,"contents":[{"dir":"include","file":"include/macros.sibilant","token":"g","type":"literal","start":22831,"line":704,"col":43,"length":1,"contents":[],"specials":0,"precedingIgnored":[]}],"precedingIgnored":[{"dir":"include","file":"include/macros.sibilant","token":" ","type":"whitespace","start":22829,"line":704,"col":41,"length":1,"contents":[]}]} ],
      precedingIgnored: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: " ",
        type: "whitespace",
        start: 22813,
        line: 704,
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
  /* thunk include/macros.sibilant:717:0 */

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
    start: 23419,
    line: 725,
    col: 8,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: "lambda",
      type: "literal",
      start: 23420,
      line: 725,
      col: 9,
      length: 6,
      contents: [],
      specials: 0,
      precedingIgnored: []
    }, lambdaOptions ].concat(mapNode(body, (function(node) {
      /* include/macros.sibilant:727:17 */
    
      return (function() {
        if (node__QUERY(node, "argPlaceholder")) {
          return {
            dir: "include",
            file: "include/macros.sibilant",
            token: "(",
            type: "expression",
            start: 23572,
            line: 729,
            col: 24,
            length: 1,
            contents: [ {
              dir: "include",
              file: "include/macros.sibilant",
              token: "argument",
              type: "literal",
              start: 23573,
              line: 729,
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
  /* pipe-thunk include/macros.sibilant:740:0 */

  var calls = Array.prototype.slice.call(arguments, 0);

  return {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 23953,
    line: 740,
    col: 30,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: "thunk",
      type: "literal",
      start: 23954,
      line: 740,
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
      start: 23975,
      line: 740,
      col: 52,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "pipe",
        type: "literal",
        start: 23976,
        line: 740,
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
        start: 23981,
        line: 740,
        col: 58,
        length: 2,
        contents: [],
        specials: 0,
        precedingIgnored: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 23980,
          line: 740,
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
        start: 23974,
        line: 740,
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
  /* keys include/macros.sibilant:752:0 */

  return {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 24287,
    line: 753,
    col: 8,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: "Object.keys",
      type: "literal",
      start: 24288,
      line: 753,
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
  /* delete include/macros.sibilant:765:0 */

  var objects = Array.prototype.slice.call(arguments, 0);

  return interleave("\n", map(objects, (function(obj) {
    /* include/macros.sibilant:766:37 */
  
    return asStatement([ "delete ", transpile(obj) ]);
  })));
});
sibilant.macros.namespaces.core.deleteMacro = (function deleteMacro$(macroNames) {
  /* delete-macro include/macros.sibilant:777:0 */

  var macroNames = Array.prototype.slice.call(arguments, 0);

  macroNames.forEach((function(macroName) {
    /* include/macros.sibilant:778:7 */
  
    return delete sibilant.macros.namespace[outputFormatter(transpile(macroName))];
  }));
  return null;
});
sibilant.macros.namespaces.core.delmacro = sibilant.macros.namespaces.core.deleteMacro;
sibilant.macros.namespaces.core.renameMacro = (function renameMacro$(currentMacroName, newMacroName) {
  /* rename-macro include/macros.sibilant:790:0 */

  sibilant.macros.namespaces.core.aliasMacro(currentMacroName, newMacroName);
  sibilant.macros.namespaces.core.deleteMacro(currentMacroName);
  return null;
});
sibilant.macros.namespaces.core.arguments = (function arguments$() {
  /* arguments include/macros.sibilant:805:0 */

  return [ "(Array.prototype.slice.apply(arguments))" ];
});
sibilant.macros.namespaces.core.argument = (function argument$(index) {
  /* argument include/macros.sibilant:817:0 */

  return {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 25873,
    line: 818,
    col: 8,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: "get",
      type: "literal",
      start: 25874,
      line: 818,
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
      start: 25878,
      line: 818,
      col: 13,
      length: 9,
      contents: [],
      specials: 0,
      precedingIgnored: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: " ",
        type: "whitespace",
        start: 25877,
        line: 818,
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
  /* each-key include/macros.sibilant:826:0 */

  var body = Array.prototype.slice.call(arguments, 2);

  return {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 26081,
    line: 827,
    col: 8,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: "pipe",
      type: "literal",
      start: 26082,
      line: 827,
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
      start: 26092,
      line: 827,
      col: 19,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "keys",
        type: "literal",
        start: 26093,
        line: 827,
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
        start: 26091,
        line: 827,
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
      start: 26113,
      line: 828,
      col: 14,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: ".",
        type: "dots",
        start: 26114,
        line: 828,
        col: 15,
        length: 1,
        contents: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: "for-each",
          type: "literal",
          start: 26115,
          line: 828,
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
        start: 26124,
        line: 828,
        col: 25,
        length: 1,
        contents: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: "lambda",
          type: "literal",
          start: 26125,
          line: 828,
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
          start: 26123,
          line: 828,
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
        start: 26098,
        line: 827,
        col: 25,
        length: 1,
        contents: []
      }, {
        dir: "include",
        file: "include/macros.sibilant",
        token: "              ",
        type: "whitespace",
        start: 26099,
        line: 828,
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
  /* switch include/macros.sibilant:849:0 */

  var cases = Array.prototype.slice.call(arguments, 1);

  return [ "(function() {", indent([ "switch(", transpile(obj), ") {", map(cases, (function(caseDef) {
    /* include/macros.sibilant:852:30 */
  
    var caseNameNode = caseDef.contents[0],
        caseLabels = (function() {
      if (node__QUERY(caseNameNode, "expression", "bracket")) {
        return caseNameNode.contents;
      } else {
        return [ caseNameNode ];
      }
    }).call(this),
        caseString = interleave("\n", map(caseLabels, (function(c) {
      /* include/macros.sibilant:858:78 */
    
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
      start: 27770,
      line: 862,
      col: 59,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "do",
        type: "literal",
        start: 27771,
        line: 862,
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
  /* if include/macros.sibilant:894:0 */

  var alternatingConditionsAndBranches = Array.prototype.slice.call(arguments, 0);

  return [ "(function() {", indent(interleave(" else ", bulkMap(alternatingConditionsAndBranches, (function(cond, val) {
    /* include/macros.sibilant:899:25 */
  
    return (function() {
      if (typeof val !== "undefined") {
        return [ "if (", transpile(cond), ") {", indent({
          dir: "include",
          file: "include/macros.sibilant",
          token: "(",
          type: "expression",
          start: 29046,
          line: 902,
          col: 44,
          length: 1,
          contents: [ {
            dir: "include",
            file: "include/macros.sibilant",
            token: "do",
            type: "literal",
            start: 29047,
            line: 902,
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
          start: 29144,
          line: 904,
          col: 47,
          length: 1,
          contents: [ {
            dir: "include",
            file: "include/macros.sibilant",
            token: "do",
            type: "literal",
            start: 29145,
            line: 904,
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
  /* chain include/macros.sibilant:923:0 */

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
        start: 29687,
        line: 927,
        col: 31,
        length: 1,
        contents: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: "send",
          type: "literal",
          start: 29688,
          line: 927,
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
        /* include/macros.sibilant:929:34 */
      
        return [ ".", transpile(call.contents[0]), "(", interleave(", ", map(call.contents.slice(1), transpile)), ")" ];
      }));
      return [ transpile(object), lines[0], "\n  ", recurseIndent(interleave("\n", lines.slice(1))) ];
    }
  }).call(this);
});
sibilant.macros.namespaces.core["instanceOf__QUERY"] = (function instanceOf__QUERY$(item, type) {
  /* instance-of? include/macros.sibilant:948:0 */

  return [ "(", transpile(item), " instanceof ", transpile(type), ")" ];
});
sibilant.macros.namespaces.core["includes__QUERY"] = (function includes__QUERY$(haystack, needle) {
  /* includes? include/macros.sibilant:959:0 */

  return {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 30666,
    line: 960,
    col: 8,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: "pipe",
      type: "literal",
      start: 30667,
      line: 960,
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
      start: 30682,
      line: 960,
      col: 24,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: ".",
        type: "dots",
        start: 30683,
        line: 960,
        col: 25,
        length: 1,
        contents: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: "index-of",
          type: "literal",
          start: 30684,
          line: 960,
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
        start: 30681,
        line: 960,
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
      start: 30702,
      line: 960,
      col: 44,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "!=",
        type: "otherChar",
        start: 30703,
        line: 960,
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
        start: 30706,
        line: 960,
        col: 48,
        length: 2,
        contents: [],
        specials: 0,
        precedingIgnored: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 30705,
          line: 960,
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
        start: 30701,
        line: 960,
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
  /* excludes? include/macros.sibilant:972:0 */

  return {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 30979,
    line: 973,
    col: 8,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: "pipe",
      type: "literal",
      start: 30980,
      line: 973,
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
      start: 30995,
      line: 973,
      col: 24,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: ".",
        type: "dots",
        start: 30996,
        line: 973,
        col: 25,
        length: 1,
        contents: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: "index-of",
          type: "literal",
          start: 30997,
          line: 973,
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
        start: 30994,
        line: 973,
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
      start: 31015,
      line: 973,
      col: 44,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "=",
        type: "otherChar",
        start: 31016,
        line: 973,
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
        start: 31018,
        line: 973,
        col: 47,
        length: 2,
        contents: [],
        specials: 0,
        precedingIgnored: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 31017,
          line: 973,
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
        start: 31014,
        line: 973,
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
  /* exists? include/macros.sibilant:983:0 */

  return {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 31233,
    line: 984,
    col: 8,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: "and",
      type: "literal",
      start: 31234,
      line: 984,
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
      start: 31238,
      line: 984,
      col: 13,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "defined?",
        type: "literal",
        start: 31239,
        line: 984,
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
        start: 31237,
        line: 984,
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
      start: 31256,
      line: 984,
      col: 31,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "!=",
        type: "otherChar",
        start: 31257,
        line: 984,
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
        start: 31267,
        line: 984,
        col: 42,
        length: 4,
        contents: [],
        specials: 0,
        precedingIgnored: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 31266,
          line: 984,
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
        start: 31255,
        line: 984,
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
  /* with-state include/macros.sibilant:990:0 */

  var body = Array.prototype.slice.call(arguments, 2);

  var before = sibilant.macros.namespaces.core.state(k);
  sibilant.macros.namespaces.core.state(k, v);
  var returnValue = interleave("\n", map(body, transpile));
  sibilant.macros.namespaces.core.state(k, before);
  return returnValue;
});
sibilant.macros.namespaces.core.join = (function join$(arr, glue) {
  /* join include/macros.sibilant:1012:0 */

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
    start: 31967,
    line: 1015,
    col: 8,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: ".",
      type: "dots",
      start: 31968,
      line: 1015,
      col: 9,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "join",
        type: "literal",
        start: 31969,
        line: 1015,
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
sibilant.macros.namespaces.core.parens = (function parens$(node) {
  /* parens include/macros.sibilant:1017:0 */

  return [ "(", node, ")" ];
});
sibilant.macros.namespaces.core["_destructure"] = (function _destructure$(pairs) {
  /* *destructure include/macros.sibilant:1021:0 */

  var destructured = [];
  bulkMap(pairs, (function(lhs, rhs) {
    /* include/macros.sibilant:1023:21 */
  
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
          /* include/macros.sibilant:1033:32 */
        
          return destructured.push([ transpile(item), {
            dir: "include",
            file: "include/macros.sibilant",
            token: "(",
            type: "expression",
            start: 32968,
            line: 1034,
            col: 76,
            length: 1,
            contents: [ {
              dir: "include",
              file: "include/macros.sibilant",
              token: "get",
              type: "literal",
              start: 32969,
              line: 1034,
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
          } else if (1 === lhs.contents.length) {
            return [ "(", rhs, ")" ];
          } else {
            var symbol = sibilant.macros.namespaces.core.symbol();
            destructured.push([ symbol, transpiledRhs ]);
            return symbol;
          }
        }).call(this);
        lhs.contents.forEach((function(item, index) {
          /* include/macros.sibilant:1046:32 */
        
          var trItem = transpile(item);
          return destructured.push([ trItem, {
            dir: "include",
            file: "include/macros.sibilant",
            token: "(",
            type: "expression",
            start: 34059,
            line: 1048,
            col: 67,
            length: 1,
            contents: [ {
              dir: "include",
              file: "include/macros.sibilant",
              token: "get",
              type: "literal",
              start: 34060,
              line: 1048,
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
          if (!((literalRhs__QUERY || 1 === lhs.contents.length))) {
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
  /* var include/macros.sibilant:1070:0 */

  var pairs = Array.prototype.slice.call(arguments, 0);

  return asStatement([ "var ", interleave(map(sibilant.macros.namespaces.core["_destructure"](pairs), (function(pair) {
    /* include/macros.sibilant:1074:25 */
  
    return [ pair[0], " = ", pair[1] ];
  })), ",\n    ") ]);
});
sibilant.macros.namespaces.core.assign = (function assign$(pairs) {
  /* assign include/macros.sibilant:1093:0 */

  var pairs = Array.prototype.slice.call(arguments, 0);

  return interleave(map(sibilant.macros.namespaces.core["_destructure"](pairs), (function(pair) {
    /* include/macros.sibilant:1096:17 */
  
    return asStatement([ pair[0], " = ", pair[1] ]);
  })), "\n");
});
sibilant.macros.namespaces.core.default = (function default$(pairs) {
  /* default include/macros.sibilant:1104:0 */

  var pairs = Array.prototype.slice.call(arguments, 0);

  return interleave("\n", bulkMap(pairs, (function(name, value) {
    /* include/macros.sibilant:1105:40 */
  
    return {
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 36165,
      line: 1106,
      col: 35,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "assign",
        type: "literal",
        start: 36166,
        line: 1106,
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
        start: 36179,
        line: 1106,
        col: 49,
        length: 1,
        contents: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: "ternary",
          type: "literal",
          start: 36180,
          line: 1106,
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
          start: 36188,
          line: 1106,
          col: 58,
          length: 1,
          contents: [ {
            dir: "include",
            file: "include/macros.sibilant",
            token: "defined?",
            type: "literal",
            start: 36189,
            line: 1106,
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
            start: 36187,
            line: 1106,
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
          start: 36178,
          line: 1106,
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
  /* import-namespace include/macros.sibilant:1109:0 */

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
  /* namespace include/macros.sibilant:1117:0 */

  sibilant.macros.namespaces.core.importNamespace(namespace);
  sibilant.macros.namespace = sibilant.macros.namespaces[outputFormatter(transpile(namespace))];
  return undefined;
});
sibilant.macros.namespaces.core["hasKey__QUERY"] = (function hasKey__QUERY$(object, key) {
  /* has-key? include/macros.sibilant:1132:0 */

  return {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 36973,
    line: 1133,
    col: 8,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: ".",
      type: "dots",
      start: 36974,
      line: 1133,
      col: 9,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "has-own-property",
        type: "literal",
        start: 36975,
        line: 1133,
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
  /* get include/macros.sibilant:1154:0 */

  var keys = Array.prototype.slice.call(arguments, 1);

  return [ transpile(obj), map(keys, (function(key) {
    /* include/macros.sibilant:1156:19 */
  
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
  /* set include/macros.sibilant:1183:0 */

  var kvPairs = Array.prototype.slice.call(arguments, 1);

  return interleave("\n", bulkMap(kvPairs, (function(k, v) {
    /* include/macros.sibilant:1184:43 */
  
    return {
      dir: "include",
      file: "include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 38641,
      line: 1184,
      col: 52,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "assign",
        type: "literal",
        start: 38642,
        line: 1184,
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
        start: 38649,
        line: 1184,
        col: 60,
        length: 1,
        contents: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: "get",
          type: "literal",
          start: 38650,
          line: 1184,
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
          start: 38648,
          line: 1184,
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
  /* lower-case? include/macros.sibilant:1189:0 */

  return {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 38838,
    line: 1190,
    col: 8,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: "=",
      type: "otherChar",
      start: 38839,
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
      start: 38841,
      line: 1190,
      col: 11,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: ".",
        type: "dots",
        start: 38842,
        line: 1190,
        col: 12,
        length: 1,
        contents: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: "to-lower-case",
          type: "literal",
          start: 38843,
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
        start: 38840,
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
sibilant.macros.namespaces.core["upperCase__QUERY"] = (function upperCase__QUERY$(str) {
  /* upper-case? include/macros.sibilant:1197:0 */

  return {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 39039,
    line: 1198,
    col: 8,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: "=",
      type: "otherChar",
      start: 39040,
      line: 1198,
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
      start: 39042,
      line: 1198,
      col: 11,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: ".",
        type: "dots",
        start: 39043,
        line: 1198,
        col: 12,
        length: 1,
        contents: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: "to-upper-case",
          type: "literal",
          start: 39044,
          line: 1198,
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
        start: 39041,
        line: 1198,
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
  /* source-mapping-url include/macros.sibilant:1205:0 */

  return [ "//# sourceMappingURL=", eval(outputFormatter(transpile(url))), "\n" ];
});
sibilant.macros.namespaces.core.sortBy = (function sortBy$(arrayOfObjects, attribute) {
  /* sort-by include/macros.sibilant:1214:0 */

  return {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 39678,
    line: 1215,
    col: 8,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: ".",
      type: "dots",
      start: 39679,
      line: 1215,
      col: 9,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "sort",
        type: "literal",
        start: 39680,
        line: 1215,
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
      start: 39718,
      line: 1216,
      col: 15,
      length: 1,
      contents: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: "#->",
        type: "otherChar",
        start: 39719,
        line: 1216,
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
        start: 39723,
        line: 1216,
        col: 20,
        length: 1,
        contents: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: "get",
          type: "literal",
          start: 39724,
          line: 1216,
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
          start: 39722,
          line: 1216,
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
        start: 39760,
        line: 1217,
        col: 20,
        length: 1,
        contents: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: "to-string",
          type: "literal",
          start: 39761,
          line: 1217,
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
          start: 39739,
          line: 1216,
          col: 36,
          length: 1,
          contents: []
        }, {
          dir: "include",
          file: "include/macros.sibilant",
          token: "                    ",
          type: "whitespace",
          start: 39740,
          line: 1217,
          col: 0,
          length: 20,
          contents: []
        } ]
      }, {
        dir: "include",
        file: "include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 39791,
        line: 1218,
        col: 20,
        length: 1,
        contents: [ {
          dir: "include",
          file: "include/macros.sibilant",
          token: ".",
          type: "dots",
          start: 39792,
          line: 1218,
          col: 21,
          length: 1,
          contents: [ {
            dir: "include",
            file: "include/macros.sibilant",
            token: "locale-compare",
            type: "literal",
            start: 39793,
            line: 1218,
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
          start: 39808,
          line: 1218,
          col: 37,
          length: 1,
          contents: [ {
            dir: "include",
            file: "include/macros.sibilant",
            token: "get",
            type: "literal",
            start: 39809,
            line: 1218,
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
            start: 39813,
            line: 1218,
            col: 42,
            length: 2,
            contents: [],
            specials: 0,
            precedingIgnored: [ {
              dir: "include",
              file: "include/macros.sibilant",
              token: " ",
              type: "whitespace",
              start: 39812,
              line: 1218,
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
            start: 39807,
            line: 1218,
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
          start: 39770,
          line: 1217,
          col: 30,
          length: 1,
          contents: []
        }, {
          dir: "include",
          file: "include/macros.sibilant",
          token: "                    ",
          type: "whitespace",
          start: 39771,
          line: 1218,
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
        start: 39702,
        line: 1215,
        col: 32,
        length: 1,
        contents: []
      }, {
        dir: "include",
        file: "include/macros.sibilant",
        token: "               ",
        type: "whitespace",
        start: 39703,
        line: 1216,
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
  /* require! include/macros.sibilant:1221:0 */

  var requires = Array.prototype.slice.call(arguments, 0);

  return {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 39872,
    line: 1222,
    col: 8,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: "var",
      type: "literal",
      start: 39873,
      line: 1222,
      col: 9,
      length: 3,
      contents: [],
      specials: 0,
      precedingIgnored: []
    } ].concat(inject([], requires, (function(pairs, node) {
      /* include/macros.sibilant:1223:25 */
    
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
            start: 40481,
            line: 1233,
            col: 33,
            length: 1,
            contents: [ {
              dir: "include",
              file: "include/macros.sibilant",
              token: "require",
              type: "literal",
              start: 40482,
              line: 1233,
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
            start: 40589,
            line: 1236,
            col: 36,
            length: 1,
            contents: [ {
              dir: "include",
              file: "include/macros.sibilant",
              token: "require",
              type: "literal",
              start: 40590,
              line: 1236,
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
  /* export include/macros.sibilant:1241:0 */

  var localVars = Array.prototype.slice.call(arguments, 0);

  var pairs = localVars.reduce((function(acc, value) {
    /* include/macros.sibilant:1243:19 */
  
    return acc.concat([ sibilant.macros.namespaces.core.quote(value), value ]);
  }), []);
  return {
    dir: "include",
    file: "include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 40832,
    line: 1245,
    col: 8,
    length: 1,
    contents: [ {
      dir: "include",
      file: "include/macros.sibilant",
      token: "set",
      type: "literal",
      start: 40833,
      line: 1245,
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
      start: 40837,
      line: 1245,
      col: 13,
      length: 7,
      contents: [],
      specials: 0,
      precedingIgnored: [ {
        dir: "include",
        file: "include/macros.sibilant",
        token: " ",
        type: "whitespace",
        start: 40836,
        line: 1245,
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
sibilant.macros.namespaces.core.return = (function return$(token) {
  /* return include/macros.sibilant:1248:0 */

  (function() {
    if (sibilant.debug) {
      return console.log("returning ", prettify(token));
    }
  }).call(this);
  var defaultReturn = asStatement([ "return ", transpile(token) ]);
  return (function() {
    if ((token && token.contents && token.contents.length)) {
      return (function() {
        switch(token.contents[0].token) {
        case "return":
        case "throw":
        case "do":
          return transpile(token);
        
        case "delete":
          var deleteMacro = macros.delete;
          return (function() {
            if (token.contents.length < 3) {
              return defaultReturn;
            } else {
              return [ asStatement(deleteMacro.apply(this, token.contents.slice(1, -1))), "\nreturn ", asStatement(deleteMacro(token.contents.slice(-1)[0])) ];
            }
          }).call(this);
        
        case "def":
          return [ transpile(token), "\n", sibilant.macros.namespaces.core.return(token.contents[1]) ];
        
        case "assign":
          return (function() {
            if (token.contents.length < 4) {
              return defaultReturn;
            } else {
              var result = clone(transpile(token));
              result.contents = result.contents.slice(0, -4).concat([ "return " ], result.contents.slice(-4));
              return result;
            }
          }).call(this);
        
        case "var":
          return [ transpile(token), "\n", sibilant.macros.namespaces.core.return((function() {
            if (0 === (token.contents.length % 2)) {
              return token.contents.slice(-1)[0];
            } else {
              return token.contents.slice(-2)[0];
            }
          }).call(this)) ];
        
        case "set":
          return (function() {
            if (token.contents.length < 5) {
              return defaultReturn;
            } else {
              var obj = token.contents[1],
                  nonReturnPart = token.contents.slice(2, (token.contents.length - 2)),
                  returnPart = token.contents.slice(-2);
              nonReturnPart.unshift(obj);
              returnPart.unshift(obj);
              return [ sibilant.macros.namespaces.core.set.apply(this, nonReturnPart), "\nreturn ", sibilant.macros.namespaces.core.set.apply(this, returnPart) ];
            }
          }).call(this);
        
        default:
          return defaultReturn;
        }
      }).call(this);
    } else {
      return defaultReturn;
    }
  }).call(this);
});
sibilant.macros.namespaces.core.do = (function do$(body) {
  /* do include/macros.sibilant:1295:0 */

  var body = Array.prototype.slice.call(arguments, 0);

  return (function() {
    if (1 === body.length) {
      return sibilant.macros.namespaces.core.return(body[0]);
    } else if (body.length) {
      return [ interleave(map(body.slice(0, -1), (function() {
        /* include/macros.sibilant:1303:19 */
      
        return asStatement(arguments[0]);
      })), "\n"), "\n", sibilant.macros.namespaces.core.return(body.slice(-1)[0]) ];
    } else {
      return "";
    }
  }).call(this);
});
sibilant.macros.namespaces.core.emptyList = (function emptyList$() {
  /* empty-list include/macros.sibilant:1310:0 */

  return "null";
});
sibilant.macros.namespaces.core.def = (function def$(name, args, body) {
  /* def include/macros.sibilant:1321:0 */

  var body = Array.prototype.slice.call(arguments, 2);

  (function() {
    if (typeof name === "undefined") {
      return error("invalid function definition. missing name.");
    } else if (typeof args === "undefined") {
      return error("invalid function definition. missing arguments or return value.");
    }
  }).call(this);
  var nameTr = transpile(name),
      thisNode = this;
  sibilant.docs.record("function", sibilant.macros.searchPath[0], name, this);
  return asStatement([ (function() {
    if (outputFormatter(nameTr).match((new RegExp("\\.", undefined)))) {
      return "";
    } else {
      return "var ";
    }
  }).call(this), nameTr, " = ", sibilant.macros.namespaces.core.lambda({
    name: name,
    args: args,
    node: thisNode,
    body: body
  }) ]);
});
sibilant.macros.namespaces.core.macro = (function macro$(name, args, body) {
  /* macro include/macros.sibilant:1345:0 */

  var body = Array.prototype.slice.call(arguments, 2);

  var nameTr = outputFormatter(transpile(name)),
      options = {
    name: name,
    args: args,
    node: this
  },
      js = outputFormatter(sibilant.macros.namespaces.core.lambda.apply(this, [ options ].concat(body)));
  (function() {
    if (sibilant.debug) {
      return console.log(js);
    }
  }).call(this);
  sibilant.docs.record("macro", sibilant.macros.searchPath[0], name, this);
  var evaledJs = (function() {
    try {
      return eval(js);
    } catch (e) {
      console.log(e.message);
      console.log(red(e.stack.split("\n")[1]));
      return console.log(("error in parsing macro " + sibilant.prettyPrint(name) + ":\n" + js));
    }
  }).call(this);
  sibilant.macros.namespace[nameTr] = evaledJs;
  return undefined;
});
sibilant.macros.namespaces.core.meta = (function meta$(body) {
  /* meta include/macros.sibilant:1372:0 */

  var body = Array.prototype.slice.call(arguments, 0);

  var js = outputFormatter(transpile(sibilant.macros.namespaces.core.scoped.apply(this, body)));
  (function() {
    if (sibilant.debug) {
      return console.log(js);
    }
  }).call(this);
  return outputFormatter(eval(js));
});
sibilant.macros.namespaces.core.reverse = (function reverse$(arr) {
  /* reverse include/macros.sibilant:1377:0 */

  var reversed = [];
  arr.forEach((function(item) {
    /* include/macros.sibilant:1379:5 */
  
    return reversed.unshift(item);
  }));
  return reversed;
});
sibilant.macros.namespaces.core.lambda = (function lambda$(argsOrOptions, body) {
  /* lambda include/macros.sibilant:1398:8 */

  var body = Array.prototype.slice.call(arguments, 1);

  (function() {
    if (sibilant.debug) {
      return console.log(argsOrOptions);
    }
  }).call(this);
  var args = (argsOrOptions.args || argsOrOptions),
      body = (argsOrOptions.body || body),
      args = (function() {
    if (node__QUERY(args, "expression")) {
      return args.contents;
    } else if ((node__QUERY(args) && 0 === body.length)) {
      body = [ args ];
      return [];
    } else {
      return args;
    }
  }).call(this),
      name = (function() {
    if (argsOrOptions.name) {
      return outputFormatter(transpile(argsOrOptions.name)).replace((new RegExp("\\W+", "g")), "$").concat("$");
    }
  }).call(this),
      rest = detect(args, (function() {
    /* include/macros.sibilant:1413:23 */
  
    return node__QUERY(arguments[0], "dots");
  }));
  var thisNode = this,
      node = detect([ argsOrOptions.node, thisNode, argsOrOptions.name, args, body[0] ], (function(n) {
    /* include/macros.sibilant:1418:16 */
  
    return (node__QUERY(n) && n.file);
  }));
  return [ "(function", (function() {
    if (name) {
      return (" " + name);
    } else {
      return "";
    }
  }).call(this), "(", interleave(", ", map(args, transpile)), ") {", (function() {
    if ((argsOrOptions.name || node)) {
      return indent([ "/*", (function() {
        if (argsOrOptions.name) {
          return (" " + sibilant.prettyPrint(argsOrOptions.name, false));
        } else {
          return "";
        }
      }).call(this), (function() {
        if (node) {
          return (" " + node.file + ":" + node.line + ":" + node.col);
        } else {
          return "";
        }
      }).call(this), " */" ]);
    } else {
      return "";
    }
  }).call(this), (function() {
    if ((typeof rest !== "undefined" && rest !== null)) {
      return indent(asStatement([ "var ", transpile(rest), " = Array.prototype.slice.call(arguments, ", (args.length - 1), ")" ]));
    }
  }).call(this), indent(sibilant.macros.namespaces.core.do.apply(this, body)), "})" ];
});
sibilant.macros.namespaces.core["#"] = sibilant.macros.namespaces.core.lambda;
sibilant.macros.namespaces.core.quotedHash = (function quotedHash$(pairs) {
  /* quoted-hash include/macros.sibilant:1436:0 */

  var pairs = Array.prototype.slice.call(arguments, 0);

  var cachedQuoteValue = sibilant.quoteHashKeys;
  sibilant.quoteHashKeys = true;
  var value = sibilant.macros.namespaces.core.hash.apply(this, pairs);
  sibilant.quoteHashKeys = cachedQuoteValue;
  return value;
});
sibilant.macros.namespaces.core.hash = (function hash$(pairs) {
  /* hash include/macros.sibilant:1447:8 */

  var pairs = Array.prototype.slice.call(arguments, 0);

  (function() {
    if (1 === (pairs.length % 2)) {
      return error(("odd number of key-value pairs in hash: " + inspect(pairs)));
    }
  }).call(this);
  var quoteKeys = sibilant.quoteHashKeys,
      pairStrings = bulkMap(pairs, (function(key, value) {
    /* include/macros.sibilant:1453:39 */
  
    return [ (function() {
      if ((quoteKeys && !(node__QUERY(key, "string")))) {
        return [ "\"", transpile(key), "\"" ];
      } else {
        return transpile(key);
      }
    }).call(this), ": ", transpile(value) ];
  }));
  return (function() {
    if (1 >= pairStrings.length) {
      return [ "{ ", interleave(", ", pairStrings), " }" ];
    } else {
      return [ "{", indent(interleave(",\n", pairStrings)), "}" ];
    }
  }).call(this);
});
sibilant.macros.namespaces.core.quote = (function quote$(content) {
  /* quote include/macros.sibilant:1464:0 */

  var unquotes = findUnquotes(content);
  return (function() {
    if (typeof content === "string") {
      return ("\"" + qescape(content) + "\"");
    } else if (typeof content === "number") {
      return sibilant.macros.namespaces.core.quote(content.toString());
    } else if (node__QUERY(content, "literal", "otherChar")) {
      return [ "\"", transpile(content), "\"" ];
    } else if (Object.keys(unquotes).length) {
      return replace__BANG(content, unquotes);
    } else if (node__QUERY(content, "expression")) {
      return [ "\"", mapNode(transpile(content), qescape), "\"" ];
    } else if (node__QUERY(content, "bracket")) {
      return sibilant.macros.namespaces.core.list.apply(this, map(content.contents, sibilant.macros.namespaces.core.quote));
    } else if (node__QUERY(content, "brace")) {
      return sibilant.macros.namespaces.core.hash.apply(this, map(content.contents, sibilant.macros.namespaces.core.quote));
    } else {
      console.log(("unknown content" + inspect(content)));
      return content;
    }
  }).call(this);
});
sibilant.macros.namespaces.core.debug = (function debug$(val) {
  /* debug include/macros.sibilant:1487:0 */

  sibilant.debug = eval(outputFormatter(transpile(val)));
  return null;
});
sibilant.macros.namespaces.core.list = (function list$(args) {
  /* list include/macros.sibilant:1498:7 */

  var args = Array.prototype.slice.call(arguments, 0);

  var argSegments = [];
  return (function() {
    if (0 === args.length) {
      return "[]";
    } else {
      var simpleList = (function simpleList$(args) {
        /* simple-list include/macros.sibilant:1502:12 */
      
        return [ "[ ", interleave(", ", map(args, (function(arg) {
          /* include/macros.sibilant:1503:50 */
        
          return arg.transpiled;
        }))), " ]" ];
      });
      args.forEach((function(arg) {
        /* include/macros.sibilant:1505:27 */
      
        return (function() {
          if (node__QUERY(arg, "dots")) {
            return argSegments.push({ transpiled: transpile(arg) });
          } else if (((argSegments.slice(-1)[0]) && typeof (argSegments.slice(-1)[0]) === "object" && (argSegments.slice(-1)[0]).constructor.name === "Array")) {
            return argSegments.slice(-1)[0].push({ transpiled: transpile(arg) });
          } else {
            return argSegments.push([ { transpiled: transpile(arg) } ]);
          }
        }).call(this);
      }));
      argSegments = map(argSegments, (function(segment) {
        /* include/macros.sibilant:1511:38 */
      
        return (function() {
          if (((segment) && typeof (segment) === "object" && (segment).constructor.name === "Array")) {
            return simpleList(segment);
          } else {
            return segment.transpiled;
          }
        }).call(this);
      }));
      return (function() {
        if (1 === argSegments.length) {
          return argSegments[0];
        } else {
          return [ argSegments[0], ".concat(", interleave(", ", argSegments.slice(1)), ")" ];
        }
      }).call(this);
    }
  }).call(this);
});
sibilant.macros.namespaces.core.call = (function call$(fnName, args) {
  /* call include/macros.sibilant:1528:0 */

  var args = Array.prototype.slice.call(arguments, 1);

  return (function() {
    if (any__QUERY(args, (function() {
      /* include/macros.sibilant:1529:20 */
    
      return node__QUERY(arguments[0], "dots");
    }))) {
      return macros.apply(fnName, macros.list.apply(this, args));
    } else {
      return [ transpile(fnName), "(", interleave(", ", map(args, transpile)), ")" ];
    }
  }).call(this);
});
sibilant.macros.namespaces.core.dots = (function dots$(contents) {
  /* dots include/macros.sibilant:1534:0 */

  var contents = Array.prototype.slice.call(arguments, 0);

  return transpile(contents);
});
sibilant.macros.namespaces.core.include = (function include$(files) {
  /* include include/macros.sibilant:1549:0 */

  var files = Array.prototype.slice.call(arguments, 0);

  return interleave(files.map((function(file) {
    /* include/macros.sibilant:1551:17 */
  
    return sibilant.withDefaultSearchPath((function() {
      /* include/macros.sibilant:1553:20 */
    
      return sibilant.include(eval(outputFormatter(transpile(file))));
    }));
  })), "\n");
});
sibilant.macros.namespaces.core.docs = (function docs$(options) {
  /* docs include/macros.sibilant:1560:0 */

  var options = Array.prototype.slice.call(arguments, 0);

  var optionsString = undefined,
      optionsHash = {  };
  (function() {
    if (1 === (options.length % 2)) {
      return (function() {
        if ((node__QUERY(options[0], "string") || typeof options[0] === "string")) {
          return optionsString = options.shift();
        } else if ((node__QUERY(options.slice(-1)[0], "string") || typeof options.slice(-1)[0] === "string")) {
          return optionsString = options.pop();
        }
      }).call(this);
    }
  }).call(this);
  bulkMap(options, (function(key, value) {
    /* include/macros.sibilant:1571:23 */
  
    return optionsHash[outputFormatter(transpile(key))] = value;
  }));
  [ "examples", "references" ].forEach((function(listAttribute) {
    /* include/macros.sibilant:1574:5 */
  
    return (function() {
      if ((optionsHash.hasOwnProperty(listAttribute) && node__QUERY(optionsHash[listAttribute], "bracket"))) {
        return optionsHash[listAttribute] = optionsHash[listAttribute].contents;
      }
    }).call(this);
  }));
  (function() {
    if (optionsHash.hasOwnProperty("example")) {
      (function() {
        if (optionsHash.hasOwnProperty("examples")) {
          return error("please provide example OR examples, not both");
        }
      }).call(this);
      optionsHash.examples = [ optionsHash.example ];
      return delete optionsHash.example;
    }
  }).call(this);
  (function() {
    if (optionsHash.hasOwnProperty("tags")) {
      return optionsHash.tags = eval(outputFormatter(transpile(sibilant.macros.namespaces.core.quote(optionsHash.tags))));
    }
  }).call(this);
  (function() {
    if (node__QUERY(optionsString, "string")) {
      return optionsHash.docString = eval(outputFormatter(transpile(optionsString)));
    } else if (typeof optionsString === "string") {
      return optionsHash.docString = optionsString;
    }
  }).call(this);
  sibilant.docs.lastDoc = optionsHash;
  return null;
});