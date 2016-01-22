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
  /* sibilant.macros.current-namespace /Users/jbr/code/sibilant/src/macros.sibilant:14:0 */

  return sibilant.macros.namespaces[sibilant.macros.searchPath[0]];
});
sibilant.resolveMacro = (function sibilant$resolveMacro$(macroName) {
  /* sibilant.resolve-macro /Users/jbr/code/sibilant/src/macros.sibilant:17:0 */

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
        /* /Users/jbr/code/sibilant/src/macros.sibilant:29:33 */
      
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
  /* sibilant.with-default-search-path /Users/jbr/code/sibilant/src/macros.sibilant:34:0 */

  var searchPathBefore = sibilant.macros.searchPath;
  sibilant.macros.searchPath = sibilant.macros.defaultSearchPath;
  var returnValue = fn();
  sibilant.macros.searchPath = searchPathBefore;
  return returnValue;
});
sibilant.macros.namespaces.core.ternary = (function ternary$(cond, ifTrue, ifFalse) {
  /* ternary /Users/jbr/code/sibilant/include/macros.sibilant:9:0 */

  return [ "(", transpile(cond), ") ? ", transpile(ifTrue), " : ", transpile(ifFalse) ];
});
sibilant.macros.namespaces.core.set = (function set$(arr, kvPairs) {
  /* set /Users/jbr/code/sibilant/include/macros.sibilant:19:0 */

  var kvPairs = Array.prototype.slice.call(arguments, 1);

  return interleave("\n", bulkMap(kvPairs, (function(k, v) {
    /* /Users/jbr/code/sibilant/include/macros.sibilant:21:34 */
  
    return asStatement([ "(", transpile(arr), ")", "[", transpile(k), "] = ", transpile(v) ]);
  })));
});
sibilant.macros.namespaces.core.var = (function var$(pairs) {
  /* var /Users/jbr/code/sibilant/include/macros.sibilant:25:0 */

  var pairs = Array.prototype.slice.call(arguments, 0);

  return asStatement([ "var ", interleave(",\n    ", bulkMap(pairs, (function(name, value) {
    /* /Users/jbr/code/sibilant/include/macros.sibilant:30:25 */
  
    return [ transpile(name), " = ", transpile(value) ];
  }))) ]);
});
sibilant.macros.namespaces.core.get = (function get$(obj, keys) {
  /* get /Users/jbr/code/sibilant/include/macros.sibilant:35:0 */

  var keys = Array.prototype.slice.call(arguments, 1);

  return [ "(", transpile(obj), ")", map(keys, (function(key) {
    /* /Users/jbr/code/sibilant/include/macros.sibilant:36:42 */
  
    return [ "[", transpile(key), "]" ];
  })) ];
});
sibilant.macros.namespaces.core.aliasMacro = (function aliasMacro$(currentMacroName, newMacroName) {
  /* alias-macro /Users/jbr/code/sibilant/include/macros.sibilant:47:0 */

  var currentMacroName = outputFormatter(transpile(currentMacroName)),
      newMacroName = outputFormatter(transpile(newMacroName));
  sibilant.macros.namespace[newMacroName] = sibilant.macros.namespace[currentMacroName];
  return null;
});
sibilant.macros.namespaces.core.send = (function send$(object, method, args) {
  /* send /Users/jbr/code/sibilant/include/macros.sibilant:62:0 */

  var args = Array.prototype.slice.call(arguments, 2);

  return [ transpile(object), ".", transpile(method), "(", interleave(", ", map(args, transpile)), ")" ];
});
sibilant.macros.namespaces.core.apply = (function apply$(fn, arglist) {
  /* apply /Users/jbr/code/sibilant/include/macros.sibilant:74:0 */

  return {
    dir: "/Users/jbr/code/sibilant/include",
    file: "/Users/jbr/code/sibilant/include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 2119,
    line: 75,
    col: 8,
    length: 1,
    contents: [ {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: ".",
      type: "dots",
      start: 2120,
      line: 75,
      col: 9,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "apply",
        type: "literal",
        start: 2121,
        line: 75,
        col: 10,
        length: 5,
        contents: [],
        nodeId: 58650,
        specials: 0,
        precedingIgnored: []
      } ],
      nodeId: 58649,
      precedingIgnored: []
    }, fn, {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "this",
      type: "literal",
      start: 2131,
      line: 75,
      col: 20,
      length: 4,
      contents: [],
      nodeId: 58655,
      specials: 0,
      precedingIgnored: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: " ",
        type: "whitespace",
        start: 2130,
        line: 75,
        col: 19,
        length: 1,
        contents: [],
        nodeId: 58654
      } ]
    }, arglist ],
    nodeId: 58648,
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core.cons = (function cons$(first, rest) {
  /* cons /Users/jbr/code/sibilant/include/macros.sibilant:86:0 */

  return [ "[ ", transpile(first), " ].concat(", transpile(rest), ")" ];
});
sibilant.macros.namespaces.core.append = (function append$(list, additional) {
  /* append /Users/jbr/code/sibilant/include/macros.sibilant:95:0 */

  var additional = Array.prototype.slice.call(arguments, 1);

  return {
    dir: "/Users/jbr/code/sibilant/include",
    file: "/Users/jbr/code/sibilant/include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 2690,
    line: 96,
    col: 8,
    length: 1,
    contents: [ {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: ".",
      type: "dots",
      start: 2691,
      line: 96,
      col: 9,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "concat",
        type: "literal",
        start: 2692,
        line: 96,
        col: 10,
        length: 6,
        contents: [],
        nodeId: 58798,
        specials: 0,
        precedingIgnored: []
      } ],
      nodeId: 58797,
      precedingIgnored: []
    }, list, {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 2705,
      line: 96,
      col: 23,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "list",
        type: "literal",
        start: 2706,
        line: 96,
        col: 24,
        length: 4,
        contents: [],
        nodeId: 58804,
        specials: 0,
        precedingIgnored: []
      } ].concat(additional),
      nodeId: 58803,
      precedingIgnored: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: " ",
        type: "whitespace",
        start: 2704,
        line: 96,
        col: 22,
        length: 1,
        contents: [],
        nodeId: 58802
      } ],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    } ],
    nodeId: 58796,
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core.length = (function length$(arr) {
  /* length /Users/jbr/code/sibilant/include/macros.sibilant:102:0 */

  return {
    dir: "/Users/jbr/code/sibilant/include",
    file: "/Users/jbr/code/sibilant/include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 2871,
    line: 103,
    col: 8,
    length: 1,
    contents: [ {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "get",
      type: "literal",
      start: 2872,
      line: 103,
      col: 9,
      length: 3,
      contents: [],
      nodeId: 58861,
      specials: 0,
      precedingIgnored: []
    }, arr, {"dir":"/Users/jbr/code/sibilant/include","file":"/Users/jbr/code/sibilant/include/macros.sibilant","token":"'","type":"tick","start":2881,"line":103,"col":18,"length":1,"contents":[{"dir":"/Users/jbr/code/sibilant/include","file":"/Users/jbr/code/sibilant/include/macros.sibilant","token":"length","type":"literal","start":2882,"line":103,"col":19,"length":6,"contents":[],"nodeId":58867,"specials":0,"precedingIgnored":[]}],"nodeId":58866,"precedingIgnored":[{"dir":"/Users/jbr/code/sibilant/include","file":"/Users/jbr/code/sibilant/include/macros.sibilant","token":" ","type":"whitespace","start":2880,"line":103,"col":17,"length":1,"contents":[],"nodeId":58865}]} ],
    nodeId: 58860,
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core.scoped = (function scoped$(body) {
  /* scoped /Users/jbr/code/sibilant/include/macros.sibilant:109:0 */

  var body = Array.prototype.slice.call(arguments, 0);

  return {
    dir: "/Users/jbr/code/sibilant/include",
    file: "/Users/jbr/code/sibilant/include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 3126,
    line: 110,
    col: 8,
    length: 1,
    contents: [ {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: ".",
      type: "dots",
      start: 3127,
      line: 110,
      col: 9,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "call",
        type: "literal",
        start: 3128,
        line: 110,
        col: 10,
        length: 4,
        contents: [],
        nodeId: 58930,
        specials: 0,
        precedingIgnored: []
      } ],
      nodeId: 58929,
      precedingIgnored: []
    }, {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 3133,
      line: 110,
      col: 15,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "lambda",
        type: "literal",
        start: 3134,
        line: 110,
        col: 16,
        length: 6,
        contents: [],
        nodeId: 58933,
        specials: 0,
        precedingIgnored: []
      }, {
        node: this,
        args: []
      } ].concat(body),
      nodeId: 58932,
      precedingIgnored: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: " ",
        type: "whitespace",
        start: 3132,
        line: 110,
        col: 14,
        length: 1,
        contents: [],
        nodeId: 58931
      } ],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    }, {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "this",
      type: "literal",
      start: 3172,
      line: 110,
      col: 54,
      length: 4,
      contents: [],
      nodeId: 58952,
      specials: 0,
      precedingIgnored: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: " ",
        type: "whitespace",
        start: 3171,
        line: 110,
        col: 53,
        length: 1,
        contents: [],
        nodeId: 58951
      } ]
    } ],
    nodeId: 58928,
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core.first = (function first$(arr) {
  /* first /Users/jbr/code/sibilant/include/macros.sibilant:130:0 */

  return {
    dir: "/Users/jbr/code/sibilant/include",
    file: "/Users/jbr/code/sibilant/include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 3954,
    line: 130,
    col: 20,
    length: 1,
    contents: [ {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "get",
      type: "literal",
      start: 3955,
      line: 130,
      col: 21,
      length: 3,
      contents: [],
      nodeId: 59003,
      specials: 0,
      precedingIgnored: []
    }, arr, {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "0",
      type: "number",
      start: 3964,
      line: 130,
      col: 30,
      length: 1,
      contents: [],
      nodeId: 59008,
      specials: 0,
      precedingIgnored: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: " ",
        type: "whitespace",
        start: 3963,
        line: 130,
        col: 29,
        length: 1,
        contents: [],
        nodeId: 59007
      } ]
    } ],
    nodeId: 59002,
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core.second = (function second$(arr) {
  /* second /Users/jbr/code/sibilant/include/macros.sibilant:131:0 */

  return {
    dir: "/Users/jbr/code/sibilant/include",
    file: "/Users/jbr/code/sibilant/include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 3989,
    line: 131,
    col: 21,
    length: 1,
    contents: [ {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "get",
      type: "literal",
      start: 3990,
      line: 131,
      col: 22,
      length: 3,
      contents: [],
      nodeId: 59023,
      specials: 0,
      precedingIgnored: []
    }, arr, {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "1",
      type: "number",
      start: 3999,
      line: 131,
      col: 31,
      length: 1,
      contents: [],
      nodeId: 59028,
      specials: 0,
      precedingIgnored: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: " ",
        type: "whitespace",
        start: 3998,
        line: 131,
        col: 30,
        length: 1,
        contents: [],
        nodeId: 59027
      } ]
    } ],
    nodeId: 59022,
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core.third = (function third$(arr) {
  /* third /Users/jbr/code/sibilant/include/macros.sibilant:132:0 */

  return {
    dir: "/Users/jbr/code/sibilant/include",
    file: "/Users/jbr/code/sibilant/include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 4023,
    line: 132,
    col: 20,
    length: 1,
    contents: [ {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "get",
      type: "literal",
      start: 4024,
      line: 132,
      col: 21,
      length: 3,
      contents: [],
      nodeId: 59043,
      specials: 0,
      precedingIgnored: []
    }, arr, {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "2",
      type: "number",
      start: 4033,
      line: 132,
      col: 30,
      length: 1,
      contents: [],
      nodeId: 59048,
      specials: 0,
      precedingIgnored: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: " ",
        type: "whitespace",
        start: 4032,
        line: 132,
        col: 29,
        length: 1,
        contents: [],
        nodeId: 59047
      } ]
    } ],
    nodeId: 59042,
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core.rest = (function rest$(arr) {
  /* rest /Users/jbr/code/sibilant/include/macros.sibilant:138:0 */

  return {
    dir: "/Users/jbr/code/sibilant/include",
    file: "/Users/jbr/code/sibilant/include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 4170,
    line: 138,
    col: 19,
    length: 1,
    contents: [ {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: ".",
      type: "dots",
      start: 4171,
      line: 138,
      col: 20,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "slice",
        type: "literal",
        start: 4172,
        line: 138,
        col: 21,
        length: 5,
        contents: [],
        nodeId: 59098,
        specials: 0,
        precedingIgnored: []
      } ],
      nodeId: 59097,
      precedingIgnored: []
    }, arr, {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "1",
      type: "number",
      start: 4183,
      line: 138,
      col: 32,
      length: 1,
      contents: [],
      nodeId: 59103,
      specials: 0,
      precedingIgnored: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: " ",
        type: "whitespace",
        start: 4182,
        line: 138,
        col: 31,
        length: 1,
        contents: [],
        nodeId: 59102
      } ]
    } ],
    nodeId: 59096,
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core.last = (function last$(arr) {
  /* last /Users/jbr/code/sibilant/include/macros.sibilant:143:0 */

  return {
    dir: "/Users/jbr/code/sibilant/include",
    file: "/Users/jbr/code/sibilant/include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 4330,
    line: 143,
    col: 19,
    length: 1,
    contents: [ {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "first",
      type: "literal",
      start: 4331,
      line: 143,
      col: 20,
      length: 5,
      contents: [],
      nodeId: 59151,
      specials: 0,
      precedingIgnored: []
    }, {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 4337,
      line: 143,
      col: 26,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: ".",
        type: "dots",
        start: 4338,
        line: 143,
        col: 27,
        length: 1,
        contents: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "slice",
          type: "literal",
          start: 4339,
          line: 143,
          col: 28,
          length: 5,
          contents: [],
          nodeId: 59155,
          specials: 0,
          precedingIgnored: []
        } ],
        nodeId: 59154,
        precedingIgnored: []
      }, arr, {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "-1",
        type: "number",
        start: 4350,
        line: 143,
        col: 39,
        length: 2,
        contents: [],
        nodeId: 59160,
        specials: 0,
        precedingIgnored: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 4349,
          line: 143,
          col: 38,
          length: 1,
          contents: [],
          nodeId: 59159
        } ]
      } ],
      nodeId: 59153,
      precedingIgnored: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: " ",
        type: "whitespace",
        start: 4336,
        line: 143,
        col: 25,
        length: 1,
        contents: [],
        nodeId: 59152
      } ],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    } ],
    nodeId: 59150,
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core["="] = (function $$(a, b) {
  /* = /Users/jbr/code/sibilant/include/macros.sibilant:146:0 */

  return [ transpile(a), " === ", transpile(b) ];
});
sibilant.macros.namespaces.core["+"] = (function $$(args) {
  /* + /Users/jbr/code/sibilant/include/macros.sibilant:153:0 */

  var args = Array.prototype.slice.call(arguments, 0);

  return [ "(", interleave(" + ", map(args, transpile)), ")" ];
});
sibilant.macros.namespaces.core["-"] = (function $$(args) {
  /* - /Users/jbr/code/sibilant/include/macros.sibilant:160:0 */

  var args = Array.prototype.slice.call(arguments, 0);

  return [ "(", interleave(" - ", map(args, transpile)), ")" ];
});
sibilant.macros.namespaces.core["_"] = (function _$(args) {
  /* * /Users/jbr/code/sibilant/include/macros.sibilant:166:0 */

  var args = Array.prototype.slice.call(arguments, 0);

  return [ "(", interleave(" * ", map(args, transpile)), ")" ];
});
sibilant.macros.namespaces.core["/"] = (function $$(args) {
  /* / /Users/jbr/code/sibilant/include/macros.sibilant:173:0 */

  var args = Array.prototype.slice.call(arguments, 0);

  return [ "(", interleave(" / ", map(args, transpile)), ")" ];
});
sibilant.macros.namespaces.core.or = (function or$(args) {
  /* or /Users/jbr/code/sibilant/include/macros.sibilant:180:0 */

  var args = Array.prototype.slice.call(arguments, 0);

  return [ "(", interleave(" || ", map(args, transpile)), ")" ];
});
sibilant.macros.namespaces.core.and = (function and$(args) {
  /* and /Users/jbr/code/sibilant/include/macros.sibilant:188:0 */

  var args = Array.prototype.slice.call(arguments, 0);

  return (1 === args.length) ? transpile(args[0]) : [ "(", interleave(" && ", map(args, transpile)), ")" ];
});
sibilant.macros.namespaces.core.mod = (function mod$(args) {
  /* mod /Users/jbr/code/sibilant/include/macros.sibilant:195:0 */

  var args = Array.prototype.slice.call(arguments, 0);

  return [ "(", interleave(" % ", map(args, transpile)), ")" ];
});
sibilant.macros.namespaces.core[">"] = (function $$(args) {
  /* > /Users/jbr/code/sibilant/include/macros.sibilant:230:0 */

  var args = Array.prototype.slice.call(arguments, 0);

  var jsComparator = ">";
  return {
    dir: "/Users/jbr/code/sibilant/include",
    file: "/Users/jbr/code/sibilant/include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 7292,
    line: 232,
    col: 8,
    length: 1,
    contents: [ {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "and",
      type: "literal",
      start: 7293,
      line: 232,
      col: 9,
      length: 3,
      contents: [],
      nodeId: 59794,
      specials: 0,
      precedingIgnored: []
    } ].concat(map(args.slice(0, -1), (function(item, index) {
      /* /Users/jbr/code/sibilant/include/macros.sibilant:233:22 */
    
      return [ item, " ", jsComparator, " ", args[(1 + index)] ];
    }))),
    nodeId: 59793,
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core["<"] = (function $$(args) {
  /* < /Users/jbr/code/sibilant/include/macros.sibilant:237:0 */

  var args = Array.prototype.slice.call(arguments, 0);

  var jsComparator = "<";
  return {
    dir: "/Users/jbr/code/sibilant/include",
    file: "/Users/jbr/code/sibilant/include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 7504,
    line: 239,
    col: 8,
    length: 1,
    contents: [ {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "and",
      type: "literal",
      start: 7505,
      line: 239,
      col: 9,
      length: 3,
      contents: [],
      nodeId: 59873,
      specials: 0,
      precedingIgnored: []
    } ].concat(map(args.slice(0, -1), (function(item, index) {
      /* /Users/jbr/code/sibilant/include/macros.sibilant:240:22 */
    
      return [ item, " ", jsComparator, " ", args[(1 + index)] ];
    }))),
    nodeId: 59872,
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core["<="] = (function $$(args) {
  /* <= /Users/jbr/code/sibilant/include/macros.sibilant:243:0 */

  var args = Array.prototype.slice.call(arguments, 0);

  var jsComparator = "<=";
  return {
    dir: "/Users/jbr/code/sibilant/include",
    file: "/Users/jbr/code/sibilant/include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 7717,
    line: 245,
    col: 8,
    length: 1,
    contents: [ {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "and",
      type: "literal",
      start: 7718,
      line: 245,
      col: 9,
      length: 3,
      contents: [],
      nodeId: 59951,
      specials: 0,
      precedingIgnored: []
    } ].concat(map(args.slice(0, -1), (function(item, index) {
      /* /Users/jbr/code/sibilant/include/macros.sibilant:246:22 */
    
      return [ item, " ", jsComparator, " ", args[(1 + index)] ];
    }))),
    nodeId: 59950,
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core[">="] = (function $$(args) {
  /* >= /Users/jbr/code/sibilant/include/macros.sibilant:249:0 */

  var args = Array.prototype.slice.call(arguments, 0);

  var jsComparator = ">=";
  return {
    dir: "/Users/jbr/code/sibilant/include",
    file: "/Users/jbr/code/sibilant/include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 7930,
    line: 251,
    col: 8,
    length: 1,
    contents: [ {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "and",
      type: "literal",
      start: 7931,
      line: 251,
      col: 9,
      length: 3,
      contents: [],
      nodeId: 60029,
      specials: 0,
      precedingIgnored: []
    } ].concat(map(args.slice(0, -1), (function(item, index) {
      /* /Users/jbr/code/sibilant/include/macros.sibilant:252:22 */
    
      return [ item, " ", jsComparator, " ", args[(1 + index)] ];
    }))),
    nodeId: 60028,
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core["!="] = (function $$(args) {
  /* != /Users/jbr/code/sibilant/include/macros.sibilant:254:0 */

  var args = Array.prototype.slice.call(arguments, 0);

  var jsComparator = "!==";
  return {
    dir: "/Users/jbr/code/sibilant/include",
    file: "/Users/jbr/code/sibilant/include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 8143,
    line: 256,
    col: 8,
    length: 1,
    contents: [ {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "and",
      type: "literal",
      start: 8144,
      line: 256,
      col: 9,
      length: 3,
      contents: [],
      nodeId: 60106,
      specials: 0,
      precedingIgnored: []
    } ].concat(map(args.slice(0, -1), (function(item, index) {
      /* /Users/jbr/code/sibilant/include/macros.sibilant:257:22 */
    
      return [ item, " ", jsComparator, " ", args[(1 + index)] ];
    }))),
    nodeId: 60105,
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core["="] = (function $$(args) {
  /* = /Users/jbr/code/sibilant/include/macros.sibilant:260:0 */

  var args = Array.prototype.slice.call(arguments, 0);

  var jsComparator = "===";
  return {
    dir: "/Users/jbr/code/sibilant/include",
    file: "/Users/jbr/code/sibilant/include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 8356,
    line: 262,
    col: 8,
    length: 1,
    contents: [ {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "and",
      type: "literal",
      start: 8357,
      line: 262,
      col: 9,
      length: 3,
      contents: [],
      nodeId: 60184,
      specials: 0,
      precedingIgnored: []
    } ].concat(map(args.slice(0, -1), (function(item, index) {
      /* /Users/jbr/code/sibilant/include/macros.sibilant:263:22 */
    
      return [ item, " ", jsComparator, " ", args[(1 + index)] ];
    }))),
    nodeId: 60183,
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core.incrBy = (function incrBy$(item, increment) {
  /* incr-by /Users/jbr/code/sibilant/include/macros.sibilant:270:0 */

  return [ transpile(item), " += ", transpile(increment) ];
});
sibilant.macros.namespaces.core.incr = (function incr$(item) {
  /* incr /Users/jbr/code/sibilant/include/macros.sibilant:279:0 */

  return [ "((", transpile(item), ")++)" ];
});
sibilant.macros.namespaces.core.decr = (function decr$(item) {
  /* decr /Users/jbr/code/sibilant/include/macros.sibilant:286:0 */

  return [ "((", transpile(item), ")--)" ];
});
sibilant.macros.namespaces.core.new = (function new$(constructor, args) {
  /* new /Users/jbr/code/sibilant/include/macros.sibilant:293:0 */

  var args = Array.prototype.slice.call(arguments, 1);

  return [ "(new ", {
    dir: "/Users/jbr/code/sibilant/include",
    file: "/Users/jbr/code/sibilant/include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 9213,
    line: 294,
    col: 17,
    length: 1,
    contents: [ {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "call",
      type: "literal",
      start: 9214,
      line: 294,
      col: 18,
      length: 4,
      contents: [],
      nodeId: 60441,
      specials: 0,
      precedingIgnored: []
    }, constructor ].concat(args),
    nodeId: 60440,
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  }, ")" ];
});
sibilant.macros.namespaces.core.regex = (function regex$(pattern, flags) {
  /* regex /Users/jbr/code/sibilant/include/macros.sibilant:301:0 */

  return {
    dir: "/Users/jbr/code/sibilant/include",
    file: "/Users/jbr/code/sibilant/include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 9458,
    line: 302,
    col: 8,
    length: 1,
    contents: [ {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "new",
      type: "literal",
      start: 9459,
      line: 302,
      col: 9,
      length: 3,
      contents: [],
      nodeId: 60506,
      specials: 0,
      precedingIgnored: []
    }, {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "RegExp",
      type: "literal",
      start: 9463,
      line: 302,
      col: 13,
      length: 6,
      contents: [],
      nodeId: 60508,
      specials: 0,
      precedingIgnored: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: " ",
        type: "whitespace",
        start: 9462,
        line: 302,
        col: 12,
        length: 1,
        contents: [],
        nodeId: 60507
      } ]
    }, pattern, (flags || "undefined") ],
    nodeId: 60505,
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core["zero__QUERY"] = (function zero__QUERY$(item) {
  /* zero? /Users/jbr/code/sibilant/include/macros.sibilant:309:0 */

  return {
    dir: "/Users/jbr/code/sibilant/include",
    file: "/Users/jbr/code/sibilant/include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 9624,
    line: 309,
    col: 21,
    length: 1,
    contents: [ {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "=",
      type: "otherChar",
      start: 9625,
      line: 309,
      col: 22,
      length: 1,
      contents: [],
      nodeId: 60562,
      specials: 0,
      precedingIgnored: []
    }, item, {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "0",
      type: "number",
      start: 9633,
      line: 309,
      col: 30,
      length: 1,
      contents: [],
      nodeId: 60567,
      specials: 0,
      precedingIgnored: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: " ",
        type: "whitespace",
        start: 9632,
        line: 309,
        col: 29,
        length: 1,
        contents: [],
        nodeId: 60566
      } ]
    } ],
    nodeId: 60561,
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core["empty__QUERY"] = (function empty__QUERY$(arr) {
  /* empty? /Users/jbr/code/sibilant/include/macros.sibilant:315:0 */

  return {
    dir: "/Users/jbr/code/sibilant/include",
    file: "/Users/jbr/code/sibilant/include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 9788,
    line: 316,
    col: 8,
    length: 1,
    contents: [ {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "=",
      type: "otherChar",
      start: 9789,
      line: 316,
      col: 9,
      length: 1,
      contents: [],
      nodeId: 60611,
      specials: 0,
      precedingIgnored: []
    }, {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "0",
      type: "number",
      start: 9791,
      line: 316,
      col: 11,
      length: 1,
      contents: [],
      nodeId: 60613,
      specials: 0,
      precedingIgnored: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: " ",
        type: "whitespace",
        start: 9790,
        line: 316,
        col: 10,
        length: 1,
        contents: [],
        nodeId: 60612
      } ]
    }, {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 9793,
      line: 316,
      col: 13,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "length",
        type: "literal",
        start: 9794,
        line: 316,
        col: 14,
        length: 6,
        contents: [],
        nodeId: 60616,
        specials: 0,
        precedingIgnored: []
      }, arr ],
      nodeId: 60615,
      precedingIgnored: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: " ",
        type: "whitespace",
        start: 9792,
        line: 316,
        col: 12,
        length: 1,
        contents: [],
        nodeId: 60614
      } ],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    } ],
    nodeId: 60610,
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core["odd__QUERY"] = (function odd__QUERY$(number) {
  /* odd? /Users/jbr/code/sibilant/include/macros.sibilant:322:0 */

  return {
    dir: "/Users/jbr/code/sibilant/include",
    file: "/Users/jbr/code/sibilant/include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 9940,
    line: 323,
    col: 8,
    length: 1,
    contents: [ {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "=",
      type: "otherChar",
      start: 9941,
      line: 323,
      col: 9,
      length: 1,
      contents: [],
      nodeId: 60660,
      specials: 0,
      precedingIgnored: []
    }, {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "1",
      type: "number",
      start: 9943,
      line: 323,
      col: 11,
      length: 1,
      contents: [],
      nodeId: 60662,
      specials: 0,
      precedingIgnored: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: " ",
        type: "whitespace",
        start: 9942,
        line: 323,
        col: 10,
        length: 1,
        contents: [],
        nodeId: 60661
      } ]
    }, {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 9945,
      line: 323,
      col: 13,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "mod",
        type: "literal",
        start: 9946,
        line: 323,
        col: 14,
        length: 3,
        contents: [],
        nodeId: 60665,
        specials: 0,
        precedingIgnored: []
      }, number, {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "2",
        type: "number",
        start: 9958,
        line: 323,
        col: 26,
        length: 1,
        contents: [],
        nodeId: 60670,
        specials: 0,
        precedingIgnored: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 9957,
          line: 323,
          col: 25,
          length: 1,
          contents: [],
          nodeId: 60669
        } ]
      } ],
      nodeId: 60664,
      precedingIgnored: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: " ",
        type: "whitespace",
        start: 9944,
        line: 323,
        col: 12,
        length: 1,
        contents: [],
        nodeId: 60663
      } ],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    } ],
    nodeId: 60659,
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core["even__QUERY"] = (function even__QUERY$(number) {
  /* even? /Users/jbr/code/sibilant/include/macros.sibilant:329:0 */

  return {
    dir: "/Users/jbr/code/sibilant/include",
    file: "/Users/jbr/code/sibilant/include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 10111,
    line: 330,
    col: 8,
    length: 1,
    contents: [ {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "=",
      type: "otherChar",
      start: 10112,
      line: 330,
      col: 9,
      length: 1,
      contents: [],
      nodeId: 60711,
      specials: 0,
      precedingIgnored: []
    }, {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "0",
      type: "number",
      start: 10114,
      line: 330,
      col: 11,
      length: 1,
      contents: [],
      nodeId: 60713,
      specials: 0,
      precedingIgnored: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: " ",
        type: "whitespace",
        start: 10113,
        line: 330,
        col: 10,
        length: 1,
        contents: [],
        nodeId: 60712
      } ]
    }, {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 10116,
      line: 330,
      col: 13,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "mod",
        type: "literal",
        start: 10117,
        line: 330,
        col: 14,
        length: 3,
        contents: [],
        nodeId: 60716,
        specials: 0,
        precedingIgnored: []
      }, number, {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "2",
        type: "number",
        start: 10129,
        line: 330,
        col: 26,
        length: 1,
        contents: [],
        nodeId: 60721,
        specials: 0,
        precedingIgnored: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 10128,
          line: 330,
          col: 25,
          length: 1,
          contents: [],
          nodeId: 60720
        } ]
      } ],
      nodeId: 60715,
      precedingIgnored: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: " ",
        type: "whitespace",
        start: 10115,
        line: 330,
        col: 12,
        length: 1,
        contents: [],
        nodeId: 60714
      } ],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    } ],
    nodeId: 60710,
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core.typeof = (function typeof$(thing) {
  /* typeof /Users/jbr/code/sibilant/include/macros.sibilant:337:0 */

  return [ "typeof ", transpile(thing) ];
});
sibilant.macros.namespaces.core["string__QUERY"] = (function string__QUERY$(things) {
  /* string? /Users/jbr/code/sibilant/include/macros.sibilant:343:0 */

  var things = Array.prototype.slice.call(arguments, 0);

  return {
    dir: "/Users/jbr/code/sibilant/include",
    file: "/Users/jbr/code/sibilant/include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 10565,
    line: 344,
    col: 8,
    length: 1,
    contents: [ {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "and",
      type: "literal",
      start: 10566,
      line: 344,
      col: 9,
      length: 3,
      contents: [],
      nodeId: 60828,
      specials: 0,
      precedingIgnored: []
    } ].concat(map(things, (function(thing) {
      /* /Users/jbr/code/sibilant/include/macros.sibilant:344:29 */
    
      return {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 10597,
        line: 344,
        col: 40,
        length: 1,
        contents: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "=",
          type: "otherChar",
          start: 10598,
          line: 344,
          col: 41,
          length: 1,
          contents: [],
          nodeId: 60845,
          specials: 0,
          precedingIgnored: []
        }, {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "(",
          type: "expression",
          start: 10600,
          line: 344,
          col: 43,
          length: 1,
          contents: [ {
            dir: "/Users/jbr/code/sibilant/include",
            file: "/Users/jbr/code/sibilant/include/macros.sibilant",
            token: "typeof",
            type: "literal",
            start: 10601,
            line: 344,
            col: 44,
            length: 6,
            contents: [],
            nodeId: 60848,
            specials: 0,
            precedingIgnored: []
          }, thing ],
          nodeId: 60847,
          precedingIgnored: [ {
            dir: "/Users/jbr/code/sibilant/include",
            file: "/Users/jbr/code/sibilant/include/macros.sibilant",
            token: " ",
            type: "whitespace",
            start: 10599,
            line: 344,
            col: 42,
            length: 1,
            contents: [],
            nodeId: 60846
          } ],
          specials: 0,
          end: undefined,
          closed: true,
          closingIgnored: []
        }, {"dir":"/Users/jbr/code/sibilant/include","file":"/Users/jbr/code/sibilant/include/macros.sibilant","token":"'","type":"tick","start":10616,"line":344,"col":59,"length":1,"contents":[{"dir":"/Users/jbr/code/sibilant/include","file":"/Users/jbr/code/sibilant/include/macros.sibilant","token":"string","type":"literal","start":10617,"line":344,"col":60,"length":6,"contents":[],"nodeId":60855,"specials":0,"precedingIgnored":[]}],"nodeId":60854,"precedingIgnored":[{"dir":"/Users/jbr/code/sibilant/include","file":"/Users/jbr/code/sibilant/include/macros.sibilant","token":" ","type":"whitespace","start":10615,"line":344,"col":58,"length":1,"contents":[],"nodeId":60853}]} ],
        nodeId: 60844,
        precedingIgnored: [],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      };
    }))),
    nodeId: 60827,
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core["function__QUERY"] = (function function__QUERY$(things) {
  /* function? /Users/jbr/code/sibilant/include/macros.sibilant:350:0 */

  var things = Array.prototype.slice.call(arguments, 0);

  return {
    dir: "/Users/jbr/code/sibilant/include",
    file: "/Users/jbr/code/sibilant/include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 10809,
    line: 351,
    col: 8,
    length: 1,
    contents: [ {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "and",
      type: "literal",
      start: 10810,
      line: 351,
      col: 9,
      length: 3,
      contents: [],
      nodeId: 60914,
      specials: 0,
      precedingIgnored: []
    } ].concat(map(things, (function(thing) {
      /* /Users/jbr/code/sibilant/include/macros.sibilant:351:29 */
    
      return {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 10841,
        line: 351,
        col: 40,
        length: 1,
        contents: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "=",
          type: "otherChar",
          start: 10842,
          line: 351,
          col: 41,
          length: 1,
          contents: [],
          nodeId: 60931,
          specials: 0,
          precedingIgnored: []
        }, {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "(",
          type: "expression",
          start: 10844,
          line: 351,
          col: 43,
          length: 1,
          contents: [ {
            dir: "/Users/jbr/code/sibilant/include",
            file: "/Users/jbr/code/sibilant/include/macros.sibilant",
            token: "typeof",
            type: "literal",
            start: 10845,
            line: 351,
            col: 44,
            length: 6,
            contents: [],
            nodeId: 60934,
            specials: 0,
            precedingIgnored: []
          }, thing ],
          nodeId: 60933,
          precedingIgnored: [ {
            dir: "/Users/jbr/code/sibilant/include",
            file: "/Users/jbr/code/sibilant/include/macros.sibilant",
            token: " ",
            type: "whitespace",
            start: 10843,
            line: 351,
            col: 42,
            length: 1,
            contents: [],
            nodeId: 60932
          } ],
          specials: 0,
          end: undefined,
          closed: true,
          closingIgnored: []
        }, {"dir":"/Users/jbr/code/sibilant/include","file":"/Users/jbr/code/sibilant/include/macros.sibilant","token":"'","type":"tick","start":10860,"line":351,"col":59,"length":1,"contents":[{"dir":"/Users/jbr/code/sibilant/include","file":"/Users/jbr/code/sibilant/include/macros.sibilant","token":"function","type":"literal","start":10861,"line":351,"col":60,"length":8,"contents":[],"nodeId":60941,"specials":0,"precedingIgnored":[]}],"nodeId":60940,"precedingIgnored":[{"dir":"/Users/jbr/code/sibilant/include","file":"/Users/jbr/code/sibilant/include/macros.sibilant","token":" ","type":"whitespace","start":10859,"line":351,"col":58,"length":1,"contents":[],"nodeId":60939}]} ],
        nodeId: 60930,
        precedingIgnored: [],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      };
    }))),
    nodeId: 60913,
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core["undefined__QUERY"] = (function undefined__QUERY$(things) {
  /* undefined? /Users/jbr/code/sibilant/include/macros.sibilant:360:0 */

  var things = Array.prototype.slice.call(arguments, 0);

  return {
    dir: "/Users/jbr/code/sibilant/include",
    file: "/Users/jbr/code/sibilant/include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 11176,
    line: 361,
    col: 8,
    length: 1,
    contents: [ {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "and",
      type: "literal",
      start: 11177,
      line: 361,
      col: 9,
      length: 3,
      contents: [],
      nodeId: 61001,
      specials: 0,
      precedingIgnored: []
    } ].concat(map(things, (function(thing) {
      /* /Users/jbr/code/sibilant/include/macros.sibilant:361:29 */
    
      return {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 11208,
        line: 361,
        col: 40,
        length: 1,
        contents: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "=",
          type: "otherChar",
          start: 11209,
          line: 361,
          col: 41,
          length: 1,
          contents: [],
          nodeId: 61018,
          specials: 0,
          precedingIgnored: []
        }, {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "(",
          type: "expression",
          start: 11211,
          line: 361,
          col: 43,
          length: 1,
          contents: [ {
            dir: "/Users/jbr/code/sibilant/include",
            file: "/Users/jbr/code/sibilant/include/macros.sibilant",
            token: "typeof",
            type: "literal",
            start: 11212,
            line: 361,
            col: 44,
            length: 6,
            contents: [],
            nodeId: 61021,
            specials: 0,
            precedingIgnored: []
          }, thing ],
          nodeId: 61020,
          precedingIgnored: [ {
            dir: "/Users/jbr/code/sibilant/include",
            file: "/Users/jbr/code/sibilant/include/macros.sibilant",
            token: " ",
            type: "whitespace",
            start: 11210,
            line: 361,
            col: 42,
            length: 1,
            contents: [],
            nodeId: 61019
          } ],
          specials: 0,
          end: undefined,
          closed: true,
          closingIgnored: []
        }, {"dir":"/Users/jbr/code/sibilant/include","file":"/Users/jbr/code/sibilant/include/macros.sibilant","token":"'","type":"tick","start":11227,"line":361,"col":59,"length":1,"contents":[{"dir":"/Users/jbr/code/sibilant/include","file":"/Users/jbr/code/sibilant/include/macros.sibilant","token":"undefined","type":"literal","start":11228,"line":361,"col":60,"length":9,"contents":[],"nodeId":61028,"specials":0,"precedingIgnored":[]}],"nodeId":61027,"precedingIgnored":[{"dir":"/Users/jbr/code/sibilant/include","file":"/Users/jbr/code/sibilant/include/macros.sibilant","token":" ","type":"whitespace","start":11226,"line":361,"col":58,"length":1,"contents":[],"nodeId":61026}]} ],
        nodeId: 61017,
        precedingIgnored: [],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      };
    }))),
    nodeId: 61000,
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core["defined__QUERY"] = (function defined__QUERY$(things) {
  /* defined? /Users/jbr/code/sibilant/include/macros.sibilant:369:0 */

  var things = Array.prototype.slice.call(arguments, 0);

  return {
    dir: "/Users/jbr/code/sibilant/include",
    file: "/Users/jbr/code/sibilant/include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 11503,
    line: 370,
    col: 8,
    length: 1,
    contents: [ {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "and",
      type: "literal",
      start: 11504,
      line: 370,
      col: 9,
      length: 3,
      contents: [],
      nodeId: 61088,
      specials: 0,
      precedingIgnored: []
    } ].concat(map(things, (function(thing) {
      /* /Users/jbr/code/sibilant/include/macros.sibilant:370:29 */
    
      return {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 11535,
        line: 370,
        col: 40,
        length: 1,
        contents: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "!=",
          type: "otherChar",
          start: 11536,
          line: 370,
          col: 41,
          length: 2,
          contents: [],
          nodeId: 61105,
          specials: 0,
          precedingIgnored: []
        }, {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "(",
          type: "expression",
          start: 11539,
          line: 370,
          col: 44,
          length: 1,
          contents: [ {
            dir: "/Users/jbr/code/sibilant/include",
            file: "/Users/jbr/code/sibilant/include/macros.sibilant",
            token: "typeof",
            type: "literal",
            start: 11540,
            line: 370,
            col: 45,
            length: 6,
            contents: [],
            nodeId: 61108,
            specials: 0,
            precedingIgnored: []
          }, thing ],
          nodeId: 61107,
          precedingIgnored: [ {
            dir: "/Users/jbr/code/sibilant/include",
            file: "/Users/jbr/code/sibilant/include/macros.sibilant",
            token: " ",
            type: "whitespace",
            start: 11538,
            line: 370,
            col: 43,
            length: 1,
            contents: [],
            nodeId: 61106
          } ],
          specials: 0,
          end: undefined,
          closed: true,
          closingIgnored: []
        }, {"dir":"/Users/jbr/code/sibilant/include","file":"/Users/jbr/code/sibilant/include/macros.sibilant","token":"'","type":"tick","start":11555,"line":370,"col":60,"length":1,"contents":[{"dir":"/Users/jbr/code/sibilant/include","file":"/Users/jbr/code/sibilant/include/macros.sibilant","token":"undefined","type":"literal","start":11556,"line":370,"col":61,"length":9,"contents":[],"nodeId":61115,"specials":0,"precedingIgnored":[]}],"nodeId":61114,"precedingIgnored":[{"dir":"/Users/jbr/code/sibilant/include","file":"/Users/jbr/code/sibilant/include/macros.sibilant","token":" ","type":"whitespace","start":11554,"line":370,"col":59,"length":1,"contents":[],"nodeId":61113}]} ],
        nodeId: 61104,
        precedingIgnored: [],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      };
    }))),
    nodeId: 61087,
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core["number__QUERY"] = (function number__QUERY$(things) {
  /* number? /Users/jbr/code/sibilant/include/macros.sibilant:377:0 */

  var things = Array.prototype.slice.call(arguments, 0);

  return {
    dir: "/Users/jbr/code/sibilant/include",
    file: "/Users/jbr/code/sibilant/include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 11764,
    line: 378,
    col: 8,
    length: 1,
    contents: [ {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "and",
      type: "literal",
      start: 11765,
      line: 378,
      col: 9,
      length: 3,
      contents: [],
      nodeId: 61176,
      specials: 0,
      precedingIgnored: []
    } ].concat(map(things, (function(thing) {
      /* /Users/jbr/code/sibilant/include/macros.sibilant:378:29 */
    
      return {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 11796,
        line: 378,
        col: 40,
        length: 1,
        contents: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "=",
          type: "otherChar",
          start: 11797,
          line: 378,
          col: 41,
          length: 1,
          contents: [],
          nodeId: 61193,
          specials: 0,
          precedingIgnored: []
        }, {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "(",
          type: "expression",
          start: 11799,
          line: 378,
          col: 43,
          length: 1,
          contents: [ {
            dir: "/Users/jbr/code/sibilant/include",
            file: "/Users/jbr/code/sibilant/include/macros.sibilant",
            token: "typeof",
            type: "literal",
            start: 11800,
            line: 378,
            col: 44,
            length: 6,
            contents: [],
            nodeId: 61196,
            specials: 0,
            precedingIgnored: []
          }, thing ],
          nodeId: 61195,
          precedingIgnored: [ {
            dir: "/Users/jbr/code/sibilant/include",
            file: "/Users/jbr/code/sibilant/include/macros.sibilant",
            token: " ",
            type: "whitespace",
            start: 11798,
            line: 378,
            col: 42,
            length: 1,
            contents: [],
            nodeId: 61194
          } ],
          specials: 0,
          end: undefined,
          closed: true,
          closingIgnored: []
        }, {"dir":"/Users/jbr/code/sibilant/include","file":"/Users/jbr/code/sibilant/include/macros.sibilant","token":"'","type":"tick","start":11815,"line":378,"col":59,"length":1,"contents":[{"dir":"/Users/jbr/code/sibilant/include","file":"/Users/jbr/code/sibilant/include/macros.sibilant","token":"number","type":"literal","start":11816,"line":378,"col":60,"length":6,"contents":[],"nodeId":61203,"specials":0,"precedingIgnored":[]}],"nodeId":61202,"precedingIgnored":[{"dir":"/Users/jbr/code/sibilant/include","file":"/Users/jbr/code/sibilant/include/macros.sibilant","token":" ","type":"whitespace","start":11814,"line":378,"col":58,"length":1,"contents":[],"nodeId":61201}]} ],
        nodeId: 61192,
        precedingIgnored: [],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      };
    }))),
    nodeId: 61175,
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core.if = (function if$(arg, truebody, falsebody) {
  /* if /Users/jbr/code/sibilant/include/macros.sibilant:382:0 */

  return [ "(function() {", indent([ "if (", transpile(arg), ") {", indent({
    dir: "/Users/jbr/code/sibilant/include",
    file: "/Users/jbr/code/sibilant/include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 11976,
    line: 385,
    col: 33,
    length: 1,
    contents: [ {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "do",
      type: "literal",
      start: 11977,
      line: 385,
      col: 34,
      length: 2,
      contents: [],
      nodeId: 61252,
      specials: 0,
      precedingIgnored: []
    } ].concat(truebody),
    nodeId: 61251,
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  }), "} else {", indent({
    dir: "/Users/jbr/code/sibilant/include",
    file: "/Users/jbr/code/sibilant/include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 12063,
    line: 387,
    col: 33,
    length: 1,
    contents: [ {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "do",
      type: "literal",
      start: 12064,
      line: 387,
      col: 34,
      length: 2,
      contents: [],
      nodeId: 61269,
      specials: 0,
      precedingIgnored: []
    } ].concat(falsebody),
    nodeId: 61268,
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  }), "}" ]), "}).call(this)" ];
});
sibilant.macros.namespaces.core.pipe = (function pipe$(calls) {
  /* pipe /Users/jbr/code/sibilant/include/macros.sibilant:410:0 */

  var calls = Array.prototype.slice.call(arguments, 0);

  return inject(undefined, calls, (function(value, item) {
    /* /Users/jbr/code/sibilant/include/macros.sibilant:412:15 */
  
    return (function() {
      if (typeof value === "undefined") {
        return item;
      } else {
        return (function() {
          /* /Users/jbr/code/sibilant/include/macros.sibilant:414:21 */
        
          var cloned = (function() {
            if (node__QUERY(item, "literal", "dots")) {
              return {
                dir: "/Users/jbr/code/sibilant/include",
                file: "/Users/jbr/code/sibilant/include/macros.sibilant",
                token: "(",
                type: "expression",
                start: 13178,
                line: 416,
                col: 39,
                length: 1,
                contents: [ item ],
                nodeId: 61451,
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
          return mergeInto(cloned, { contents: [ cloned.contents[0], value ].concat(cloned.contents.slice(1)) });
        }).call(this);
      }
    }).call(this);
  }));
});
sibilant.macros.namespaces.core["|>"] = sibilant.macros.namespaces.core.pipe;
sibilant.macros.namespaces.core.comment = (function comment$(contents) {
  /* comment /Users/jbr/code/sibilant/include/macros.sibilant:430:0 */

  var contents = Array.prototype.slice.call(arguments, 0);

  return map(contents, (function(content) {
    /* /Users/jbr/code/sibilant/include/macros.sibilant:431:21 */
  
    return [ "// ", recurseMap(transpile(content), (function(item) {
      /* /Users/jbr/code/sibilant/include/macros.sibilant:433:36 */
    
      return (item) ? outputFormatter(transpile(item)).replace((new RegExp("\n", "g")), "\n// ") : null;
    })) ];
  }));
});
sibilant.macros.namespaces.core["array__QUERY"] = (function array__QUERY$(thing) {
  /* array? /Users/jbr/code/sibilant/include/macros.sibilant:453:0 */

  var transpiled = transpile(thing);
  return [ "((", transpiled, ") && typeof (", transpiled, ") === \"object\" && (", transpiled, ").constructor.name === \"Array\")" ];
});
sibilant.macros.namespaces.core["list__QUERY"] = sibilant.macros.namespaces.core["array__QUERY"];
sibilant.macros.namespaces.core["hash__QUERY"] = (function hash__QUERY$(thing) {
  /* hash? /Users/jbr/code/sibilant/include/macros.sibilant:465:0 */

  return {
    dir: "/Users/jbr/code/sibilant/include",
    file: "/Users/jbr/code/sibilant/include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 15078,
    line: 466,
    col: 8,
    length: 1,
    contents: [ {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "and",
      type: "literal",
      start: 15079,
      line: 466,
      col: 9,
      length: 3,
      contents: [],
      nodeId: 61758,
      specials: 0,
      precedingIgnored: []
    }, {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 15083,
      line: 466,
      col: 13,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "=",
        type: "otherChar",
        start: 15084,
        line: 466,
        col: 14,
        length: 1,
        contents: [],
        nodeId: 61761,
        specials: 0,
        precedingIgnored: []
      }, {"dir":"/Users/jbr/code/sibilant/include","file":"/Users/jbr/code/sibilant/include/macros.sibilant","token":"'","type":"tick","start":15086,"line":466,"col":16,"length":1,"contents":[{"dir":"/Users/jbr/code/sibilant/include","file":"/Users/jbr/code/sibilant/include/macros.sibilant","token":"object","type":"literal","start":15087,"line":466,"col":17,"length":6,"contents":[],"nodeId":61764,"specials":0,"precedingIgnored":[]}],"nodeId":61763,"precedingIgnored":[{"dir":"/Users/jbr/code/sibilant/include","file":"/Users/jbr/code/sibilant/include/macros.sibilant","token":" ","type":"whitespace","start":15085,"line":466,"col":15,"length":1,"contents":[],"nodeId":61762}]}, {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 15094,
        line: 466,
        col: 24,
        length: 1,
        contents: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "typeof",
          type: "literal",
          start: 15095,
          line: 466,
          col: 25,
          length: 6,
          contents: [],
          nodeId: 61767,
          specials: 0,
          precedingIgnored: []
        }, thing ],
        nodeId: 61766,
        precedingIgnored: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 15093,
          line: 466,
          col: 23,
          length: 1,
          contents: [],
          nodeId: 61765
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      } ],
      nodeId: 61760,
      precedingIgnored: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: " ",
        type: "whitespace",
        start: 15082,
        line: 466,
        col: 12,
        length: 1,
        contents: [],
        nodeId: 61759
      } ],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    }, {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 15124,
      line: 467,
      col: 13,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "!=",
        type: "otherChar",
        start: 15125,
        line: 467,
        col: 14,
        length: 2,
        contents: [],
        nodeId: 61776,
        specials: 0,
        precedingIgnored: []
      }, thing, {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "null",
        type: "literal",
        start: 15135,
        line: 467,
        col: 24,
        length: 4,
        contents: [],
        nodeId: 61781,
        specials: 0,
        precedingIgnored: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 15134,
          line: 467,
          col: 23,
          length: 1,
          contents: [],
          nodeId: 61780
        } ]
      } ],
      nodeId: 61775,
      precedingIgnored: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "\n",
        type: "newline",
        start: 15110,
        line: 466,
        col: 40,
        length: 1,
        contents: [],
        nodeId: 61773
      }, {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "             ",
        type: "whitespace",
        start: 15111,
        line: 467,
        col: 0,
        length: 13,
        contents: [],
        nodeId: 61774
      } ],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    }, {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 15154,
      line: 468,
      col: 13,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "!=",
        type: "otherChar",
        start: 15155,
        line: 468,
        col: 14,
        length: 2,
        contents: [],
        nodeId: 61786,
        specials: 0,
        precedingIgnored: []
      }, {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 15158,
        line: 468,
        col: 17,
        length: 1,
        contents: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "get",
          type: "literal",
          start: 15159,
          line: 468,
          col: 18,
          length: 3,
          contents: [],
          nodeId: 61789,
          specials: 0,
          precedingIgnored: []
        }, thing, {"dir":"/Users/jbr/code/sibilant/include","file":"/Users/jbr/code/sibilant/include/macros.sibilant","token":"'","type":"tick","start":15170,"line":468,"col":29,"length":1,"contents":[{"dir":"/Users/jbr/code/sibilant/include","file":"/Users/jbr/code/sibilant/include/macros.sibilant","token":"constructor","type":"literal","start":15171,"line":468,"col":30,"length":11,"contents":[],"nodeId":61795,"specials":0,"precedingIgnored":[]}],"nodeId":61794,"precedingIgnored":[{"dir":"/Users/jbr/code/sibilant/include","file":"/Users/jbr/code/sibilant/include/macros.sibilant","token":" ","type":"whitespace","start":15169,"line":468,"col":28,"length":1,"contents":[],"nodeId":61793}]}, {"dir":"/Users/jbr/code/sibilant/include","file":"/Users/jbr/code/sibilant/include/macros.sibilant","token":"'","type":"tick","start":15183,"line":468,"col":42,"length":1,"contents":[{"dir":"/Users/jbr/code/sibilant/include","file":"/Users/jbr/code/sibilant/include/macros.sibilant","token":"name","type":"literal","start":15184,"line":468,"col":43,"length":4,"contents":[],"nodeId":61798,"specials":0,"precedingIgnored":[]}],"nodeId":61797,"precedingIgnored":[{"dir":"/Users/jbr/code/sibilant/include","file":"/Users/jbr/code/sibilant/include/macros.sibilant","token":" ","type":"whitespace","start":15182,"line":468,"col":41,"length":1,"contents":[],"nodeId":61796}]} ],
        nodeId: 61788,
        precedingIgnored: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 15157,
          line: 468,
          col: 16,
          length: 1,
          contents: [],
          nodeId: 61787
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      }, {"dir":"/Users/jbr/code/sibilant/include","file":"/Users/jbr/code/sibilant/include/macros.sibilant","token":"'","type":"tick","start":15190,"line":468,"col":49,"length":1,"contents":[{"dir":"/Users/jbr/code/sibilant/include","file":"/Users/jbr/code/sibilant/include/macros.sibilant","token":"Array","type":"literal","start":15191,"line":468,"col":50,"length":5,"contents":[],"nodeId":61802,"specials":0,"precedingIgnored":[]}],"nodeId":61801,"precedingIgnored":[{"dir":"/Users/jbr/code/sibilant/include","file":"/Users/jbr/code/sibilant/include/macros.sibilant","token":" ","type":"whitespace","start":15189,"line":468,"col":48,"length":1,"contents":[],"nodeId":61800}]} ],
      nodeId: 61785,
      precedingIgnored: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "\n",
        type: "newline",
        start: 15140,
        line: 467,
        col: 29,
        length: 1,
        contents: [],
        nodeId: 61783
      }, {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "             ",
        type: "whitespace",
        start: 15141,
        line: 468,
        col: 0,
        length: 13,
        contents: [],
        nodeId: 61784
      } ],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    } ],
    nodeId: 61757,
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core["object__QUERY"] = sibilant.macros.namespaces.core["hash__QUERY"];
sibilant.macros.namespaces.core["_scopedWithoutReturn"] = (function _scopedWithoutReturn$(body) {
  /* *scoped-without-return /Users/jbr/code/sibilant/include/macros.sibilant:471:0 */

  var body = Array.prototype.slice.call(arguments, 0);

  return [ "(function() {", indent.apply(this, body), "}).call(this)" ];
});
sibilant.macros.namespaces.core["_scopedWithoutSource"] = (function _scopedWithoutSource$(body) {
  /* *scoped-without-source /Users/jbr/code/sibilant/include/macros.sibilant:475:0 */

  var body = Array.prototype.slice.call(arguments, 0);

  return {
    dir: "/Users/jbr/code/sibilant/include",
    file: "/Users/jbr/code/sibilant/include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 15378,
    line: 476,
    col: 8,
    length: 1,
    contents: [ {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "*scoped-without-return",
      type: "literal",
      start: 15379,
      line: 476,
      col: 9,
      length: 22,
      contents: [],
      nodeId: 61856,
      specials: 0,
      precedingIgnored: []
    }, {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 15402,
      line: 476,
      col: 32,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "do",
        type: "literal",
        start: 15403,
        line: 476,
        col: 33,
        length: 2,
        contents: [],
        nodeId: 61859,
        specials: 0,
        precedingIgnored: []
      } ].concat(body),
      nodeId: 61858,
      precedingIgnored: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: " ",
        type: "whitespace",
        start: 15401,
        line: 476,
        col: 31,
        length: 1,
        contents: [],
        nodeId: 61857
      } ],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    } ],
    nodeId: 61855,
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core.when = (function when$(condition, body) {
  /* when /Users/jbr/code/sibilant/include/macros.sibilant:485:0 */

  var body = Array.prototype.slice.call(arguments, 1);

  return sibilant.macros.namespaces.core["_scopedWithoutReturn"]("if (", condition, ") {", indent({
    dir: "/Users/jbr/code/sibilant/include",
    file: "/Users/jbr/code/sibilant/include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 15824,
    line: 488,
    col: 18,
    length: 1,
    contents: [ {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "do",
      type: "literal",
      start: 15825,
      line: 488,
      col: 19,
      length: 2,
      contents: [],
      nodeId: 61951,
      specials: 0,
      precedingIgnored: []
    } ].concat(body),
    nodeId: 61950,
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  }), "}");
});
sibilant.macros.namespaces.core.not = (function not$(exp) {
  /* not /Users/jbr/code/sibilant/include/macros.sibilant:497:0 */

  return [ "!(", transpile(exp), ")" ];
});
sibilant.macros.namespaces.core.unless = (function unless$(condition, body) {
  /* unless /Users/jbr/code/sibilant/include/macros.sibilant:510:0 */

  var body = Array.prototype.slice.call(arguments, 1);

  return [ "(function() {", indent([ "if (", {
    dir: "/Users/jbr/code/sibilant/include",
    file: "/Users/jbr/code/sibilant/include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 16557,
    line: 512,
    col: 25,
    length: 1,
    contents: [ {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "not",
      type: "literal",
      start: 16558,
      line: 512,
      col: 26,
      length: 3,
      contents: [],
      nodeId: 62105,
      specials: 0,
      precedingIgnored: []
    }, condition ],
    nodeId: 62104,
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  }, ") {", indent({
    dir: "/Users/jbr/code/sibilant/include",
    file: "/Users/jbr/code/sibilant/include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 16613,
    line: 513,
    col: 33,
    length: 1,
    contents: [ {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "do",
      type: "literal",
      start: 16614,
      line: 513,
      col: 34,
      length: 2,
      contents: [],
      nodeId: 62119,
      specials: 0,
      precedingIgnored: []
    } ].concat(body),
    nodeId: 62118,
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  }), "}" ]), "}).call(this)" ];
});
sibilant.macros.namespaces.core.assign = (function assign$(args) {
  /* assign /Users/jbr/code/sibilant/include/macros.sibilant:518:0 */

  var args = Array.prototype.slice.call(arguments, 0);

  return interleave("\n", bulkMap(args, (function(name, value) {
    /* /Users/jbr/code/sibilant/include/macros.sibilant:520:28 */
  
    return asStatement([ transpile(name), " = ", transpile(value) ]);
  })));
});
sibilant.macros.namespaces.core.logPretty = (function logPretty$(label, arg) {
  /* log-pretty /Users/jbr/code/sibilant/include/macros.sibilant:532:0 */

  var node = this;
  (function() {
    if (typeof arg === "undefined") {
      arg = label;
      return label = [ "\"", prettify(label, false), "\"" ];
    }
  }).call(this);
  return {
    dir: "/Users/jbr/code/sibilant/include",
    file: "/Users/jbr/code/sibilant/include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 17436,
    line: 537,
    col: 8,
    length: 1,
    contents: [ {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "console.log",
      type: "literal",
      start: 17437,
      line: 537,
      col: 9,
      length: 11,
      contents: [],
      nodeId: 62303,
      specials: 0,
      precedingIgnored: []
    }, {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 17449,
      line: 537,
      col: 21,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "concat",
        type: "literal",
        start: 17450,
        line: 537,
        col: 22,
        length: 6,
        contents: [],
        nodeId: 62306,
        specials: 0,
        precedingIgnored: []
      }, [ "\"", node.file, ":", node.line, "\"" ], {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "\" \"",
        type: "string",
        start: 17494,
        line: 537,
        col: 66,
        length: 3,
        contents: [],
        nodeId: 62321,
        specials: 0,
        precedingIgnored: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 17493,
          line: 537,
          col: 65,
          length: 1,
          contents: [],
          nodeId: 62320
        } ]
      }, label, {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "\" = \"",
        type: "string",
        start: 17505,
        line: 537,
        col: 77,
        length: 5,
        contents: [],
        nodeId: 62326,
        specials: 0,
        precedingIgnored: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 17504,
          line: 537,
          col: 76,
          length: 1,
          contents: [],
          nodeId: 62325
        } ]
      }, {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 17511,
        line: 537,
        col: 83,
        length: 1,
        contents: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "prettify",
          type: "literal",
          start: 17512,
          line: 537,
          col: 84,
          length: 8,
          contents: [],
          nodeId: 62329,
          specials: 0,
          precedingIgnored: []
        }, arg ],
        nodeId: 62328,
        precedingIgnored: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 17510,
          line: 537,
          col: 82,
          length: 1,
          contents: [],
          nodeId: 62327
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      } ],
      nodeId: 62305,
      precedingIgnored: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: " ",
        type: "whitespace",
        start: 17448,
        line: 537,
        col: 20,
        length: 1,
        contents: [],
        nodeId: 62304
      } ],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    } ],
    nodeId: 62302,
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core.prettyLog = sibilant.macros.namespaces.core.logPretty;
sibilant.macros.namespaces.core.each = (function each$(item, array, body) {
  /* each /Users/jbr/code/sibilant/include/macros.sibilant:550:17 */

  var body = Array.prototype.slice.call(arguments, 2);

  return {
    dir: "/Users/jbr/code/sibilant/include",
    file: "/Users/jbr/code/sibilant/include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 18306,
    line: 551,
    col: 8,
    length: 1,
    contents: [ {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: ".",
      type: "dots",
      start: 18307,
      line: 551,
      col: 9,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "for-each",
        type: "literal",
        start: 18308,
        line: 551,
        col: 10,
        length: 8,
        contents: [],
        nodeId: 62472,
        specials: 0,
        precedingIgnored: []
      } ],
      nodeId: 62471,
      precedingIgnored: []
    }, array, {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 18343,
      line: 552,
      col: 19,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "lambda",
        type: "literal",
        start: 18344,
        line: 552,
        col: 20,
        length: 6,
        contents: [],
        nodeId: 62479,
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
      nodeId: 62478,
      precedingIgnored: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "\n",
        type: "newline",
        start: 18323,
        line: 551,
        col: 25,
        length: 1,
        contents: [],
        nodeId: 62476
      }, {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "                   ",
        type: "whitespace",
        start: 18324,
        line: 552,
        col: 0,
        length: 19,
        contents: [],
        nodeId: 62477
      } ],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    } ],
    nodeId: 62470,
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core.macroExpand = (function macroExpand$(name) {
  /* macro-expand /Users/jbr/code/sibilant/include/macros.sibilant:565:0 */

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
  /* throw /Users/jbr/code/sibilant/include/macros.sibilant:578:0 */

  return [ "throw ", transpile(error) ];
});
sibilant.macros.namespaces.core.asBoolean = (function asBoolean$(expr) {
  /* as-boolean /Users/jbr/code/sibilant/include/macros.sibilant:589:0 */

  return [ "(!!(", transpile(expr), "))" ];
});
sibilant.macros.namespaces.core.try = (function try$(tryblock, catchblock) {
  /* try /Users/jbr/code/sibilant/include/macros.sibilant:595:0 */

  return [ "(function() {", indent([ "try {", indent({
    dir: "/Users/jbr/code/sibilant/include",
    file: "/Users/jbr/code/sibilant/include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 19276,
    line: 598,
    col: 26,
    length: 1,
    contents: [ {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "do",
      type: "literal",
      start: 19277,
      line: 598,
      col: 27,
      length: 2,
      contents: [],
      nodeId: 62732,
      specials: 0,
      precedingIgnored: []
    }, tryblock ],
    nodeId: 62731,
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  }), "} catch (e) {", indent({
    dir: "/Users/jbr/code/sibilant/include",
    file: "/Users/jbr/code/sibilant/include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 19351,
    line: 600,
    col: 26,
    length: 1,
    contents: [ {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "do",
      type: "literal",
      start: 19352,
      line: 600,
      col: 27,
      length: 2,
      contents: [],
      nodeId: 62748,
      specials: 0,
      precedingIgnored: []
    }, catchblock ],
    nodeId: 62747,
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  }), "}" ]), "}).call(this)" ];
});
sibilant.macros.namespaces.core.state = (function state$(pairs) {
  /* state /Users/jbr/code/sibilant/include/macros.sibilant:612:0 */

  var pairs = Array.prototype.slice.call(arguments, 0);

  return (function() {
    if (1 === pairs.length) {
      return sibilant.state[outputFormatter(transpile(pairs[0]))];
    } else {
      bulkMap(pairs, (function(k, v) {
        /* /Users/jbr/code/sibilant/include/macros.sibilant:615:31 */
      
        return sibilant.state[outputFormatter(transpile(k))] = eval(outputFormatter(transpile(v)));
      }));
      return null;
    }
  }).call(this);
});
sibilant.macros.namespaces.core.symbol = (function symbol$() {
  /* symbol /Users/jbr/code/sibilant/include/macros.sibilant:621:0 */

  var symbolCount = (sibilant.state.symbolCount || 0),
      newSymbolCount = (1 + symbolCount);
  sibilant.macros.namespaces.core.state("symbolCount", newSymbolCount);
  return [ ("$_symbol" + newSymbolCount + "_$") ];
});
sibilant.macros.namespaces.core.while = (function while$(condition, body) {
  /* while /Users/jbr/code/sibilant/include/macros.sibilant:636:0 */

  var body = Array.prototype.slice.call(arguments, 1);

  var symbol = sibilant.macros.namespaces.core.symbol();
  return {
    dir: "/Users/jbr/code/sibilant/include",
    file: "/Users/jbr/code/sibilant/include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 20489,
    line: 638,
    col: 8,
    length: 1,
    contents: [ {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "*scoped-without-source",
      type: "literal",
      start: 20490,
      line: 638,
      col: 9,
      length: 22,
      contents: [],
      nodeId: 63024,
      specials: 0,
      precedingIgnored: []
    }, {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 20522,
      line: 639,
      col: 9,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "var",
        type: "literal",
        start: 20523,
        line: 639,
        col: 10,
        length: 3,
        contents: [],
        nodeId: 63028,
        specials: 0,
        precedingIgnored: []
      }, symbol ],
      nodeId: 63027,
      precedingIgnored: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "\n",
        type: "newline",
        start: 20512,
        line: 638,
        col: 31,
        length: 1,
        contents: [],
        nodeId: 63025
      }, {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "         ",
        type: "whitespace",
        start: 20513,
        line: 639,
        col: 0,
        length: 9,
        contents: [],
        nodeId: 63026
      } ],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    }, {
      type: "output",
      contents: [ "while (", transpile(condition), ") {", indent({
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 20659,
        line: 642,
        col: 35,
        length: 1,
        contents: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "assign",
          type: "literal",
          start: 20660,
          line: 642,
          col: 36,
          length: 6,
          contents: [],
          nodeId: 63063,
          specials: 0,
          precedingIgnored: []
        }, symbol, {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "(",
          type: "expression",
          start: 20675,
          line: 642,
          col: 51,
          length: 1,
          contents: [ {
            dir: "/Users/jbr/code/sibilant/include",
            file: "/Users/jbr/code/sibilant/include/macros.sibilant",
            token: "*scoped-without-source",
            type: "literal",
            start: 20676,
            line: 642,
            col: 52,
            length: 22,
            contents: [],
            nodeId: 63069,
            specials: 0,
            precedingIgnored: []
          } ].concat(body),
          nodeId: 63068,
          precedingIgnored: [ {
            dir: "/Users/jbr/code/sibilant/include",
            file: "/Users/jbr/code/sibilant/include/macros.sibilant",
            token: " ",
            type: "whitespace",
            start: 20674,
            line: 642,
            col: 50,
            length: 1,
            contents: [],
            nodeId: 63067
          } ],
          specials: 0,
          end: undefined,
          closed: true,
          closingIgnored: []
        } ],
        nodeId: 63062,
        precedingIgnored: [],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      }), "}" ]
    }, symbol ],
    nodeId: 63023,
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core.until = (function until$(condition, body) {
  /* until /Users/jbr/code/sibilant/include/macros.sibilant:655:0 */

  var body = Array.prototype.slice.call(arguments, 1);

  return {
    dir: "/Users/jbr/code/sibilant/include",
    file: "/Users/jbr/code/sibilant/include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 21068,
    line: 656,
    col: 8,
    length: 1,
    contents: [ {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "while",
      type: "literal",
      start: 21069,
      line: 656,
      col: 9,
      length: 5,
      contents: [],
      nodeId: 63153,
      specials: 0,
      precedingIgnored: []
    }, {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 21075,
      line: 656,
      col: 15,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "not",
        type: "literal",
        start: 21076,
        line: 656,
        col: 16,
        length: 3,
        contents: [],
        nodeId: 63156,
        specials: 0,
        precedingIgnored: []
      }, condition ],
      nodeId: 63155,
      precedingIgnored: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: " ",
        type: "whitespace",
        start: 21074,
        line: 656,
        col: 14,
        length: 1,
        contents: [],
        nodeId: 63154
      } ],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    } ].concat(body),
    nodeId: 63152,
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core["match__QUERY"] = (function match__QUERY$(regexp, string) {
  /* match? /Users/jbr/code/sibilant/include/macros.sibilant:665:0 */

  return {
    dir: "/Users/jbr/code/sibilant/include",
    file: "/Users/jbr/code/sibilant/include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 21349,
    line: 666,
    col: 8,
    length: 1,
    contents: [ {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: ".",
      type: "dots",
      start: 21350,
      line: 666,
      col: 9,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "match",
        type: "literal",
        start: 21351,
        line: 666,
        col: 10,
        length: 5,
        contents: [],
        nodeId: 63222,
        specials: 0,
        precedingIgnored: []
      } ],
      nodeId: 63221,
      precedingIgnored: []
    }, string, regexp ],
    nodeId: 63220,
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core["matchRegex__QUERY"] = (function matchRegex__QUERY$(string, pattern, flags) {
  /* match-regex? /Users/jbr/code/sibilant/include/macros.sibilant:671:0 */

  return {
    dir: "/Users/jbr/code/sibilant/include",
    file: "/Users/jbr/code/sibilant/include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 21585,
    line: 672,
    col: 8,
    length: 1,
    contents: [ {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "match?",
      type: "literal",
      start: 21586,
      line: 672,
      col: 9,
      length: 6,
      contents: [],
      nodeId: 63279,
      specials: 0,
      precedingIgnored: []
    }, {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 21593,
      line: 672,
      col: 16,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "regex",
        type: "literal",
        start: 21594,
        line: 672,
        col: 17,
        length: 5,
        contents: [],
        nodeId: 63282,
        specials: 0,
        precedingIgnored: []
      }, pattern, flags ],
      nodeId: 63281,
      precedingIgnored: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: " ",
        type: "whitespace",
        start: 21592,
        line: 672,
        col: 15,
        length: 1,
        contents: [],
        nodeId: 63280
      } ],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    }, string ],
    nodeId: 63278,
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core.replace = (function replace$(string, pattern, replacement) {
  /* replace /Users/jbr/code/sibilant/include/macros.sibilant:678:0 */

  return {
    dir: "/Users/jbr/code/sibilant/include",
    file: "/Users/jbr/code/sibilant/include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 21847,
    line: 679,
    col: 8,
    length: 1,
    contents: [ {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: ".",
      type: "dots",
      start: 21848,
      line: 679,
      col: 9,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "replace",
        type: "literal",
        start: 21849,
        line: 679,
        col: 10,
        length: 7,
        contents: [],
        nodeId: 63344,
        specials: 0,
        precedingIgnored: []
      } ],
      nodeId: 63343,
      precedingIgnored: []
    }, string, {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 21879,
      line: 680,
      col: 14,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "regex",
        type: "literal",
        start: 21880,
        line: 680,
        col: 15,
        length: 5,
        contents: [],
        nodeId: 63351,
        specials: 0,
        precedingIgnored: []
      }, pattern ],
      nodeId: 63350,
      precedingIgnored: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "\n",
        type: "newline",
        start: 21864,
        line: 679,
        col: 25,
        length: 1,
        contents: [],
        nodeId: 63348
      }, {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "              ",
        type: "whitespace",
        start: 21865,
        line: 680,
        col: 0,
        length: 14,
        contents: [],
        nodeId: 63349
      } ],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    }, replacement ],
    nodeId: 63342,
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core.replaceAll = (function replaceAll$(string, pattern, replacement) {
  /* replace-all /Users/jbr/code/sibilant/include/macros.sibilant:686:0 */

  return {
    dir: "/Users/jbr/code/sibilant/include",
    file: "/Users/jbr/code/sibilant/include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 22144,
    line: 687,
    col: 8,
    length: 1,
    contents: [ {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: ".",
      type: "dots",
      start: 22145,
      line: 687,
      col: 9,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "replace",
        type: "literal",
        start: 22146,
        line: 687,
        col: 10,
        length: 7,
        contents: [],
        nodeId: 63410,
        specials: 0,
        precedingIgnored: []
      } ],
      nodeId: 63409,
      precedingIgnored: []
    }, string, {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 22162,
      line: 687,
      col: 26,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "regex",
        type: "literal",
        start: 22163,
        line: 687,
        col: 27,
        length: 5,
        contents: [],
        nodeId: 63416,
        specials: 0,
        precedingIgnored: []
      }, pattern, {"dir":"/Users/jbr/code/sibilant/include","file":"/Users/jbr/code/sibilant/include/macros.sibilant","token":"'","type":"tick","start":22178,"line":687,"col":42,"length":1,"contents":[{"dir":"/Users/jbr/code/sibilant/include","file":"/Users/jbr/code/sibilant/include/macros.sibilant","token":"g","type":"literal","start":22179,"line":687,"col":43,"length":1,"contents":[],"nodeId":63422,"specials":0,"precedingIgnored":[]}],"nodeId":63421,"precedingIgnored":[{"dir":"/Users/jbr/code/sibilant/include","file":"/Users/jbr/code/sibilant/include/macros.sibilant","token":" ","type":"whitespace","start":22177,"line":687,"col":41,"length":1,"contents":[],"nodeId":63420}]} ],
      nodeId: 63415,
      precedingIgnored: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: " ",
        type: "whitespace",
        start: 22161,
        line: 687,
        col: 25,
        length: 1,
        contents: [],
        nodeId: 63414
      } ],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    }, replacement ],
    nodeId: 63408,
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core.thunk = (function thunk$(body) {
  /* thunk /Users/jbr/code/sibilant/include/macros.sibilant:700:0 */

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
    dir: "/Users/jbr/code/sibilant/include",
    file: "/Users/jbr/code/sibilant/include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 22767,
    line: 708,
    col: 8,
    length: 1,
    contents: [ {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "lambda",
      type: "literal",
      start: 22768,
      line: 708,
      col: 9,
      length: 6,
      contents: [],
      nodeId: 63589,
      specials: 0,
      precedingIgnored: []
    }, lambdaOptions ].concat(mapNode(body, (function(node) {
      /* /Users/jbr/code/sibilant/include/macros.sibilant:710:17 */
    
      return (function() {
        if (node__QUERY(node, "argPlaceholder")) {
          return {
            dir: "/Users/jbr/code/sibilant/include",
            file: "/Users/jbr/code/sibilant/include/macros.sibilant",
            token: "(",
            type: "expression",
            start: 22920,
            line: 712,
            col: 24,
            length: 1,
            contents: [ {
              dir: "/Users/jbr/code/sibilant/include",
              file: "/Users/jbr/code/sibilant/include/macros.sibilant",
              token: "argument",
              type: "literal",
              start: 22921,
              line: 712,
              col: 25,
              length: 8,
              contents: [],
              nodeId: 63625,
              specials: 0,
              precedingIgnored: []
            }, node.token.replace((new RegExp("^#", undefined)), "") ],
            nodeId: 63624,
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
    nodeId: 63588,
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core["#>"] = sibilant.macros.namespaces.core.thunk;
sibilant.macros.namespaces.core.pipeThunk = (function pipeThunk$(calls) {
  /* pipe-thunk /Users/jbr/code/sibilant/include/macros.sibilant:723:0 */

  var calls = Array.prototype.slice.call(arguments, 0);

  return {
    dir: "/Users/jbr/code/sibilant/include",
    file: "/Users/jbr/code/sibilant/include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 23301,
    line: 723,
    col: 30,
    length: 1,
    contents: [ {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "thunk",
      type: "literal",
      start: 23302,
      line: 723,
      col: 31,
      length: 5,
      contents: [],
      nodeId: 63725,
      specials: 0,
      precedingIgnored: []
    }, { node: this }, {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 23323,
      line: 723,
      col: 52,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "pipe",
        type: "literal",
        start: 23324,
        line: 723,
        col: 53,
        length: 4,
        contents: [],
        nodeId: 63737,
        specials: 0,
        precedingIgnored: []
      }, {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "#0",
        type: "argPlaceholder",
        start: 23329,
        line: 723,
        col: 58,
        length: 2,
        contents: [],
        nodeId: 63739,
        specials: 0,
        precedingIgnored: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 23328,
          line: 723,
          col: 57,
          length: 1,
          contents: [],
          nodeId: 63738
        } ]
      } ].concat(calls),
      nodeId: 63736,
      precedingIgnored: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: " ",
        type: "whitespace",
        start: 23322,
        line: 723,
        col: 51,
        length: 1,
        contents: [],
        nodeId: 63735
      } ],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    } ],
    nodeId: 63724,
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core["#->"] = sibilant.macros.namespaces.core.pipeThunk;
sibilant.macros.namespaces.core.keys = (function keys$(obj) {
  /* keys /Users/jbr/code/sibilant/include/macros.sibilant:735:0 */

  return {
    dir: "/Users/jbr/code/sibilant/include",
    file: "/Users/jbr/code/sibilant/include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 23635,
    line: 736,
    col: 8,
    length: 1,
    contents: [ {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "Object.keys",
      type: "literal",
      start: 23636,
      line: 736,
      col: 9,
      length: 11,
      contents: [],
      nodeId: 63818,
      specials: 0,
      precedingIgnored: []
    }, obj ],
    nodeId: 63817,
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core.delete = (function delete$(objects) {
  /* delete /Users/jbr/code/sibilant/include/macros.sibilant:748:0 */

  var objects = Array.prototype.slice.call(arguments, 0);

  return interleave("\n", map(objects, (function(obj) {
    /* /Users/jbr/code/sibilant/include/macros.sibilant:749:37 */
  
    return asStatement([ "delete ", transpile(obj) ]);
  })));
});
sibilant.macros.namespaces.core.deleteMacro = (function deleteMacro$(macroNames) {
  /* delete-macro /Users/jbr/code/sibilant/include/macros.sibilant:760:0 */

  var macroNames = Array.prototype.slice.call(arguments, 0);

  macroNames.forEach((function(macroName) {
    /* /Users/jbr/code/sibilant/include/macros.sibilant:761:7 */
  
    return delete sibilant.macros.namespace[outputFormatter(transpile(macroName))];
  }));
  return null;
});
sibilant.macros.namespaces.core.delmacro = sibilant.macros.namespaces.core.deleteMacro;
sibilant.macros.namespaces.core.renameMacro = (function renameMacro$(currentMacroName, newMacroName) {
  /* rename-macro /Users/jbr/code/sibilant/include/macros.sibilant:773:0 */

  sibilant.macros.namespaces.core.aliasMacro(currentMacroName, newMacroName);
  sibilant.macros.namespaces.core.deleteMacro(currentMacroName);
  return null;
});
sibilant.macros.namespaces.core.arguments = (function arguments$() {
  /* arguments /Users/jbr/code/sibilant/include/macros.sibilant:788:0 */

  return [ "(Array.prototype.slice.apply(arguments))" ];
});
sibilant.macros.namespaces.core.argument = (function argument$(index) {
  /* argument /Users/jbr/code/sibilant/include/macros.sibilant:800:0 */

  return {
    dir: "/Users/jbr/code/sibilant/include",
    file: "/Users/jbr/code/sibilant/include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 25221,
    line: 801,
    col: 8,
    length: 1,
    contents: [ {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "get",
      type: "literal",
      start: 25222,
      line: 801,
      col: 9,
      length: 3,
      contents: [],
      nodeId: 64139,
      specials: 0,
      precedingIgnored: []
    }, {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "arguments",
      type: "literal",
      start: 25226,
      line: 801,
      col: 13,
      length: 9,
      contents: [],
      nodeId: 64141,
      specials: 0,
      precedingIgnored: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: " ",
        type: "whitespace",
        start: 25225,
        line: 801,
        col: 12,
        length: 1,
        contents: [],
        nodeId: 64140
      } ]
    }, index ],
    nodeId: 64138,
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core.eachKey = (function eachKey$(as, obj, body) {
  /* each-key /Users/jbr/code/sibilant/include/macros.sibilant:809:0 */

  var body = Array.prototype.slice.call(arguments, 2);

  return {
    dir: "/Users/jbr/code/sibilant/include",
    file: "/Users/jbr/code/sibilant/include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 25429,
    line: 810,
    col: 8,
    length: 1,
    contents: [ {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "pipe",
      type: "literal",
      start: 25430,
      line: 810,
      col: 9,
      length: 4,
      contents: [],
      nodeId: 64211,
      specials: 0,
      precedingIgnored: []
    }, obj, {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 25440,
      line: 810,
      col: 19,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "keys",
        type: "literal",
        start: 25441,
        line: 810,
        col: 20,
        length: 4,
        contents: [],
        nodeId: 64217,
        specials: 0,
        precedingIgnored: []
      } ],
      nodeId: 64216,
      precedingIgnored: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: " ",
        type: "whitespace",
        start: 25439,
        line: 810,
        col: 18,
        length: 1,
        contents: [],
        nodeId: 64215
      } ],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    }, {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 25461,
      line: 811,
      col: 14,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: ".",
        type: "dots",
        start: 25462,
        line: 811,
        col: 15,
        length: 1,
        contents: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "for-each",
          type: "literal",
          start: 25463,
          line: 811,
          col: 16,
          length: 8,
          contents: [],
          nodeId: 64223,
          specials: 0,
          precedingIgnored: []
        } ],
        nodeId: 64222,
        precedingIgnored: []
      }, {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 25472,
        line: 811,
        col: 25,
        length: 1,
        contents: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "lambda",
          type: "literal",
          start: 25473,
          line: 811,
          col: 26,
          length: 6,
          contents: [],
          nodeId: 64226,
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
        nodeId: 64225,
        precedingIgnored: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 25471,
          line: 811,
          col: 24,
          length: 1,
          contents: [],
          nodeId: 64224
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      } ],
      nodeId: 64221,
      precedingIgnored: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "\n",
        type: "newline",
        start: 25446,
        line: 810,
        col: 25,
        length: 1,
        contents: [],
        nodeId: 64219
      }, {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "              ",
        type: "whitespace",
        start: 25447,
        line: 811,
        col: 0,
        length: 14,
        contents: [],
        nodeId: 64220
      } ],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    } ],
    nodeId: 64210,
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core.switch = (function switch$(obj, cases) {
  /* switch /Users/jbr/code/sibilant/include/macros.sibilant:832:0 */

  var cases = Array.prototype.slice.call(arguments, 1);

  return [ "(function() {", indent([ "switch(", transpile(obj), ") {", map(cases, (function(caseDef) {
    /* /Users/jbr/code/sibilant/include/macros.sibilant:835:30 */
  
    var caseNameNode = caseDef.contents[0],
        caseLabels = (function() {
      if (node__QUERY(caseNameNode, "expression", "bracket")) {
        return caseNameNode.contents;
      } else {
        return [ caseNameNode ];
      }
    }).call(this),
        caseString = interleave("\n", map(caseLabels, (function(c) {
      /* /Users/jbr/code/sibilant/include/macros.sibilant:841:78 */
    
      return (function() {
        if ("default" === c.token) {
          return "default:";
        } else {
          return [ "case ", transpile(c), ":" ];
        }
      }).call(this);
    })));
    return [ "\n", caseString, indent({
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 27118,
      line: 845,
      col: 59,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "do",
        type: "literal",
        start: 27119,
        line: 845,
        col: 60,
        length: 2,
        contents: [],
        nodeId: 64505,
        specials: 0,
        precedingIgnored: []
      } ].concat(caseDef.contents.slice(1)),
      nodeId: 64504,
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    }) ];
  })), "}" ]), "}).call(this)" ];
});
sibilant.macros.namespaces.core.if = (function if$(alternatingConditionsAndBranches) {
  /* if /Users/jbr/code/sibilant/include/macros.sibilant:877:0 */

  var alternatingConditionsAndBranches = Array.prototype.slice.call(arguments, 0);

  return [ "(function() {", indent(interleave(" else ", bulkMap(alternatingConditionsAndBranches, (function(cond, val) {
    /* /Users/jbr/code/sibilant/include/macros.sibilant:882:25 */
  
    return (function() {
      if (typeof val !== "undefined") {
        return [ "if (", transpile(cond), ") {", indent({
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "(",
          type: "expression",
          start: 28394,
          line: 885,
          col: 44,
          length: 1,
          contents: [ {
            dir: "/Users/jbr/code/sibilant/include",
            file: "/Users/jbr/code/sibilant/include/macros.sibilant",
            token: "do",
            type: "literal",
            start: 28395,
            line: 885,
            col: 45,
            length: 2,
            contents: [],
            nodeId: 64759,
            specials: 0,
            precedingIgnored: []
          }, val ],
          nodeId: 64758,
          precedingIgnored: [],
          specials: 0,
          end: undefined,
          closed: true,
          closingIgnored: []
        }), "}" ];
      } else {
        return [ "{", indent({
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "(",
          type: "expression",
          start: 28492,
          line: 887,
          col: 47,
          length: 1,
          contents: [ {
            dir: "/Users/jbr/code/sibilant/include",
            file: "/Users/jbr/code/sibilant/include/macros.sibilant",
            token: "do",
            type: "literal",
            start: 28493,
            line: 887,
            col: 48,
            length: 2,
            contents: [],
            nodeId: 64779,
            specials: 0,
            precedingIgnored: []
          }, cond ],
          nodeId: 64778,
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
  /* chain /Users/jbr/code/sibilant/include/macros.sibilant:906:0 */

  var calls = Array.prototype.slice.call(arguments, 1);

  console.log("DEPRECATION WARNING: DO NOT USE CHAIN");
  console.log(("  " + this.file + ":" + this.line + ":" + this.col));
  return (function() {
    if (0 === calls.length) {
      return transpile(object);
    } else if (1 === calls.length) {
      return {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 29035,
        line: 910,
        col: 31,
        length: 1,
        contents: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "send",
          type: "literal",
          start: 29036,
          line: 910,
          col: 32,
          length: 4,
          contents: [],
          nodeId: 64887,
          specials: 0,
          precedingIgnored: []
        }, object ].concat(calls[0].contents),
        nodeId: 64886,
        precedingIgnored: [],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      };
    } else {
      var lines = map(calls, (function(call, index) {
        /* /Users/jbr/code/sibilant/include/macros.sibilant:912:34 */
      
        return [ ".", transpile(call.contents[0]), "(", interleave(", ", map(call.contents.slice(1), transpile)), ")" ];
      }));
      return [ transpile(object), lines[0], "\n  ", recurseIndent(interleave("\n", lines.slice(1))) ];
    }
  }).call(this);
});
sibilant.macros.namespaces.core["instanceOf__QUERY"] = (function instanceOf__QUERY$(item, type) {
  /* instance-of? /Users/jbr/code/sibilant/include/macros.sibilant:931:0 */

  return [ "(", transpile(item), " instanceof ", transpile(type), ")" ];
});
sibilant.macros.namespaces.core["includes__QUERY"] = (function includes__QUERY$(haystack, needle) {
  /* includes? /Users/jbr/code/sibilant/include/macros.sibilant:942:0 */

  return {
    dir: "/Users/jbr/code/sibilant/include",
    file: "/Users/jbr/code/sibilant/include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 30014,
    line: 943,
    col: 8,
    length: 1,
    contents: [ {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "pipe",
      type: "literal",
      start: 30015,
      line: 943,
      col: 9,
      length: 4,
      contents: [],
      nodeId: 65153,
      specials: 0,
      precedingIgnored: []
    }, haystack, {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 30030,
      line: 943,
      col: 24,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: ".",
        type: "dots",
        start: 30031,
        line: 943,
        col: 25,
        length: 1,
        contents: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "index-of",
          type: "literal",
          start: 30032,
          line: 943,
          col: 26,
          length: 8,
          contents: [],
          nodeId: 65160,
          specials: 0,
          precedingIgnored: []
        } ],
        nodeId: 65159,
        precedingIgnored: []
      }, needle ],
      nodeId: 65158,
      precedingIgnored: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: " ",
        type: "whitespace",
        start: 30029,
        line: 943,
        col: 23,
        length: 1,
        contents: [],
        nodeId: 65157
      } ],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    }, {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 30050,
      line: 943,
      col: 44,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "!=",
        type: "otherChar",
        start: 30051,
        line: 943,
        col: 45,
        length: 2,
        contents: [],
        nodeId: 65167,
        specials: 0,
        precedingIgnored: []
      }, {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "-1",
        type: "number",
        start: 30054,
        line: 943,
        col: 48,
        length: 2,
        contents: [],
        nodeId: 65169,
        specials: 0,
        precedingIgnored: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 30053,
          line: 943,
          col: 47,
          length: 1,
          contents: [],
          nodeId: 65168
        } ]
      } ],
      nodeId: 65166,
      precedingIgnored: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: " ",
        type: "whitespace",
        start: 30049,
        line: 943,
        col: 43,
        length: 1,
        contents: [],
        nodeId: 65165
      } ],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    } ],
    nodeId: 65152,
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core["excludes__QUERY"] = (function excludes__QUERY$(haystack, needle) {
  /* excludes? /Users/jbr/code/sibilant/include/macros.sibilant:955:0 */

  return {
    dir: "/Users/jbr/code/sibilant/include",
    file: "/Users/jbr/code/sibilant/include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 30327,
    line: 956,
    col: 8,
    length: 1,
    contents: [ {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "pipe",
      type: "literal",
      start: 30328,
      line: 956,
      col: 9,
      length: 4,
      contents: [],
      nodeId: 65243,
      specials: 0,
      precedingIgnored: []
    }, haystack, {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 30343,
      line: 956,
      col: 24,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: ".",
        type: "dots",
        start: 30344,
        line: 956,
        col: 25,
        length: 1,
        contents: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "index-of",
          type: "literal",
          start: 30345,
          line: 956,
          col: 26,
          length: 8,
          contents: [],
          nodeId: 65250,
          specials: 0,
          precedingIgnored: []
        } ],
        nodeId: 65249,
        precedingIgnored: []
      }, needle ],
      nodeId: 65248,
      precedingIgnored: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: " ",
        type: "whitespace",
        start: 30342,
        line: 956,
        col: 23,
        length: 1,
        contents: [],
        nodeId: 65247
      } ],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    }, {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 30363,
      line: 956,
      col: 44,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "=",
        type: "otherChar",
        start: 30364,
        line: 956,
        col: 45,
        length: 1,
        contents: [],
        nodeId: 65257,
        specials: 0,
        precedingIgnored: []
      }, {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "-1",
        type: "number",
        start: 30366,
        line: 956,
        col: 47,
        length: 2,
        contents: [],
        nodeId: 65259,
        specials: 0,
        precedingIgnored: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 30365,
          line: 956,
          col: 46,
          length: 1,
          contents: [],
          nodeId: 65258
        } ]
      } ],
      nodeId: 65256,
      precedingIgnored: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: " ",
        type: "whitespace",
        start: 30362,
        line: 956,
        col: 43,
        length: 1,
        contents: [],
        nodeId: 65255
      } ],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    } ],
    nodeId: 65242,
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core["exists__QUERY"] = (function exists__QUERY$(thing) {
  /* exists? /Users/jbr/code/sibilant/include/macros.sibilant:966:0 */

  return {
    dir: "/Users/jbr/code/sibilant/include",
    file: "/Users/jbr/code/sibilant/include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 30581,
    line: 967,
    col: 8,
    length: 1,
    contents: [ {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "and",
      type: "literal",
      start: 30582,
      line: 967,
      col: 9,
      length: 3,
      contents: [],
      nodeId: 65304,
      specials: 0,
      precedingIgnored: []
    }, {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 30586,
      line: 967,
      col: 13,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "defined?",
        type: "literal",
        start: 30587,
        line: 967,
        col: 14,
        length: 8,
        contents: [],
        nodeId: 65307,
        specials: 0,
        precedingIgnored: []
      }, thing ],
      nodeId: 65306,
      precedingIgnored: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: " ",
        type: "whitespace",
        start: 30585,
        line: 967,
        col: 12,
        length: 1,
        contents: [],
        nodeId: 65305
      } ],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    }, {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 30604,
      line: 967,
      col: 31,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "!=",
        type: "otherChar",
        start: 30605,
        line: 967,
        col: 32,
        length: 2,
        contents: [],
        nodeId: 65314,
        specials: 0,
        precedingIgnored: []
      }, thing, {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "null",
        type: "literal",
        start: 30615,
        line: 967,
        col: 42,
        length: 4,
        contents: [],
        nodeId: 65319,
        specials: 0,
        precedingIgnored: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 30614,
          line: 967,
          col: 41,
          length: 1,
          contents: [],
          nodeId: 65318
        } ]
      } ],
      nodeId: 65313,
      precedingIgnored: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: " ",
        type: "whitespace",
        start: 30603,
        line: 967,
        col: 30,
        length: 1,
        contents: [],
        nodeId: 65312
      } ],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    } ],
    nodeId: 65303,
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core.withState = (function withState$(k, v, body) {
  /* with-state /Users/jbr/code/sibilant/include/macros.sibilant:973:0 */

  var body = Array.prototype.slice.call(arguments, 2);

  var before = sibilant.macros.namespaces.core.state(k);
  sibilant.macros.namespaces.core.state(k, v);
  var returnValue = interleave("\n", map(body, transpile));
  sibilant.macros.namespaces.core.state(k, before);
  return returnValue;
});
sibilant.macros.namespaces.core.join = (function join$(arr, glue) {
  /* join /Users/jbr/code/sibilant/include/macros.sibilant:995:0 */

  (function() {
    if ((typeof glue !== "undefined" && typeof arr === "undefined")) {
      arr = glue;
      return glue = undefined;
    }
  }).call(this);
  return {
    dir: "/Users/jbr/code/sibilant/include",
    file: "/Users/jbr/code/sibilant/include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 31315,
    line: 998,
    col: 8,
    length: 1,
    contents: [ {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: ".",
      type: "dots",
      start: 31316,
      line: 998,
      col: 9,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "join",
        type: "literal",
        start: 31317,
        line: 998,
        col: 10,
        length: 4,
        contents: [],
        nodeId: 65518,
        specials: 0,
        precedingIgnored: []
      } ],
      nodeId: 65517,
      precedingIgnored: []
    }, arr, (glue || "\"\"") ],
    nodeId: 65516,
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core["_destructure"] = (function _destructure$(pairs) {
  /* *destructure /Users/jbr/code/sibilant/include/macros.sibilant:1003:0 */

  var destructured = [];
  bulkMap(pairs, (function(lhs, rhs) {
    /* /Users/jbr/code/sibilant/include/macros.sibilant:1005:21 */
  
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
          /* /Users/jbr/code/sibilant/include/macros.sibilant:1015:32 */
        
          return destructured.push([ transpile(item), {
            dir: "/Users/jbr/code/sibilant/include",
            file: "/Users/jbr/code/sibilant/include/macros.sibilant",
            token: "(",
            type: "expression",
            start: 32273,
            line: 1016,
            col: 76,
            length: 1,
            contents: [ {
              dir: "/Users/jbr/code/sibilant/include",
              file: "/Users/jbr/code/sibilant/include/macros.sibilant",
              token: "get",
              type: "literal",
              start: 32274,
              line: 1016,
              col: 77,
              length: 3,
              contents: [],
              nodeId: 65685,
              specials: 0,
              precedingIgnored: []
            }, source, index ],
            nodeId: 65684,
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
          /* /Users/jbr/code/sibilant/include/macros.sibilant:1026:32 */
        
          var trItem = transpile(item);
          return destructured.push([ trItem, {
            dir: "/Users/jbr/code/sibilant/include",
            file: "/Users/jbr/code/sibilant/include/macros.sibilant",
            token: "(",
            type: "expression",
            start: 33224,
            line: 1028,
            col: 67,
            length: 1,
            contents: [ {
              dir: "/Users/jbr/code/sibilant/include",
              file: "/Users/jbr/code/sibilant/include/macros.sibilant",
              token: "get",
              type: "literal",
              start: 33225,
              line: 1028,
              col: 68,
              length: 3,
              contents: [],
              nodeId: 65821,
              specials: 0,
              precedingIgnored: []
            }, source, [ "\"", trItem, "\"" ] ],
            nodeId: 65820,
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
  /* var /Users/jbr/code/sibilant/include/macros.sibilant:1047:0 */

  var pairs = Array.prototype.slice.call(arguments, 0);

  return asStatement([ "var ", interleave(map(sibilant.macros.namespaces.core["_destructure"](pairs), (function(pair) {
    /* /Users/jbr/code/sibilant/include/macros.sibilant:1051:25 */
  
    return [ pair[0], " = ", pair[1] ];
  })), ",\n    ") ]);
});
sibilant.macros.namespaces.core.assign = (function assign$(pairs) {
  /* assign /Users/jbr/code/sibilant/include/macros.sibilant:1069:0 */

  var pairs = Array.prototype.slice.call(arguments, 0);

  return interleave(map(sibilant.macros.namespaces.core["_destructure"](pairs), (function(pair) {
    /* /Users/jbr/code/sibilant/include/macros.sibilant:1072:17 */
  
    return asStatement([ pair[0], " = ", pair[1] ]);
  })), "\n");
});
sibilant.macros.namespaces.core.default = (function default$(pairs) {
  /* default /Users/jbr/code/sibilant/include/macros.sibilant:1080:0 */

  var pairs = Array.prototype.slice.call(arguments, 0);

  return interleave("\n", bulkMap(pairs, (function(name, value) {
    /* /Users/jbr/code/sibilant/include/macros.sibilant:1081:40 */
  
    return {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 35213,
      line: 1082,
      col: 35,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "assign",
        type: "literal",
        start: 35214,
        line: 1082,
        col: 36,
        length: 6,
        contents: [],
        nodeId: 66333,
        specials: 0,
        precedingIgnored: []
      }, name, {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 35227,
        line: 1082,
        col: 49,
        length: 1,
        contents: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "ternary",
          type: "literal",
          start: 35228,
          line: 1082,
          col: 50,
          length: 7,
          contents: [],
          nodeId: 66339,
          specials: 0,
          precedingIgnored: []
        }, {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "(",
          type: "expression",
          start: 35236,
          line: 1082,
          col: 58,
          length: 1,
          contents: [ {
            dir: "/Users/jbr/code/sibilant/include",
            file: "/Users/jbr/code/sibilant/include/macros.sibilant",
            token: "defined?",
            type: "literal",
            start: 35237,
            line: 1082,
            col: 59,
            length: 8,
            contents: [],
            nodeId: 66342,
            specials: 0,
            precedingIgnored: []
          }, name ],
          nodeId: 66341,
          precedingIgnored: [ {
            dir: "/Users/jbr/code/sibilant/include",
            file: "/Users/jbr/code/sibilant/include/macros.sibilant",
            token: " ",
            type: "whitespace",
            start: 35235,
            line: 1082,
            col: 57,
            length: 1,
            contents: [],
            nodeId: 66340
          } ],
          specials: 0,
          end: undefined,
          closed: true,
          closingIgnored: []
        }, name, value ],
        nodeId: 66338,
        precedingIgnored: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 35226,
          line: 1082,
          col: 48,
          length: 1,
          contents: [],
          nodeId: 66337
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      } ],
      nodeId: 66332,
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  })));
});
sibilant.macros.namespaces.core.importNamespace = (function importNamespace$(namespace) {
  /* import-namespace /Users/jbr/code/sibilant/include/macros.sibilant:1085:0 */

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
  /* namespace /Users/jbr/code/sibilant/include/macros.sibilant:1093:0 */

  sibilant.macros.namespaces.core.importNamespace(namespace);
  sibilant.macros.namespace = sibilant.macros.namespaces[outputFormatter(transpile(namespace))];
  return undefined;
});
sibilant.macros.namespaces.core["hasKey__QUERY"] = (function hasKey__QUERY$(object, key) {
  /* has-key? /Users/jbr/code/sibilant/include/macros.sibilant:1108:0 */

  return {
    dir: "/Users/jbr/code/sibilant/include",
    file: "/Users/jbr/code/sibilant/include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 36021,
    line: 1109,
    col: 8,
    length: 1,
    contents: [ {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: ".",
      type: "dots",
      start: 36022,
      line: 1109,
      col: 9,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "has-own-property",
        type: "literal",
        start: 36023,
        line: 1109,
        col: 10,
        length: 16,
        contents: [],
        nodeId: 66521,
        specials: 0,
        precedingIgnored: []
      } ],
      nodeId: 66520,
      precedingIgnored: []
    }, object, key ],
    nodeId: 66519,
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core.get = (function get$(obj, keys) {
  /* get /Users/jbr/code/sibilant/include/macros.sibilant:1130:0 */

  var keys = Array.prototype.slice.call(arguments, 1);

  return [ transpile(obj), map(keys, (function(key) {
    /* /Users/jbr/code/sibilant/include/macros.sibilant:1132:19 */
  
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
  /* set /Users/jbr/code/sibilant/include/macros.sibilant:1159:0 */

  var kvPairs = Array.prototype.slice.call(arguments, 1);

  return interleave("\n", bulkMap(kvPairs, (function(k, v) {
    /* /Users/jbr/code/sibilant/include/macros.sibilant:1160:43 */
  
    return {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 37689,
      line: 1160,
      col: 52,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "assign",
        type: "literal",
        start: 37690,
        line: 1160,
        col: 53,
        length: 6,
        contents: [],
        nodeId: 66857,
        specials: 0,
        precedingIgnored: []
      }, {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 37697,
        line: 1160,
        col: 60,
        length: 1,
        contents: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "get",
          type: "literal",
          start: 37698,
          line: 1160,
          col: 61,
          length: 3,
          contents: [],
          nodeId: 66860,
          specials: 0,
          precedingIgnored: []
        }, arr, k ],
        nodeId: 66859,
        precedingIgnored: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 37696,
          line: 1160,
          col: 59,
          length: 1,
          contents: [],
          nodeId: 66858
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      }, v ],
      nodeId: 66856,
      precedingIgnored: [],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    };
  })));
});
sibilant.macros.namespaces.core["lowerCase__QUERY"] = (function lowerCase__QUERY$(str) {
  /* lower-case? /Users/jbr/code/sibilant/include/macros.sibilant:1165:0 */

  return {
    dir: "/Users/jbr/code/sibilant/include",
    file: "/Users/jbr/code/sibilant/include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 37886,
    line: 1166,
    col: 8,
    length: 1,
    contents: [ {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "=",
      type: "otherChar",
      start: 37887,
      line: 1166,
      col: 9,
      length: 1,
      contents: [],
      nodeId: 66912,
      specials: 0,
      precedingIgnored: []
    }, {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 37889,
      line: 1166,
      col: 11,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: ".",
        type: "dots",
        start: 37890,
        line: 1166,
        col: 12,
        length: 1,
        contents: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "to-lower-case",
          type: "literal",
          start: 37891,
          line: 1166,
          col: 13,
          length: 13,
          contents: [],
          nodeId: 66916,
          specials: 0,
          precedingIgnored: []
        } ],
        nodeId: 66915,
        precedingIgnored: []
      }, str ],
      nodeId: 66914,
      precedingIgnored: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: " ",
        type: "whitespace",
        start: 37888,
        line: 1166,
        col: 10,
        length: 1,
        contents: [],
        nodeId: 66913
      } ],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    }, str ],
    nodeId: 66911,
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core["upperCase__QUERY"] = (function upperCase__QUERY$(str) {
  /* upper-case? /Users/jbr/code/sibilant/include/macros.sibilant:1173:0 */

  return {
    dir: "/Users/jbr/code/sibilant/include",
    file: "/Users/jbr/code/sibilant/include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 38087,
    line: 1174,
    col: 8,
    length: 1,
    contents: [ {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "=",
      type: "otherChar",
      start: 38088,
      line: 1174,
      col: 9,
      length: 1,
      contents: [],
      nodeId: 66964,
      specials: 0,
      precedingIgnored: []
    }, {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 38090,
      line: 1174,
      col: 11,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: ".",
        type: "dots",
        start: 38091,
        line: 1174,
        col: 12,
        length: 1,
        contents: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "to-upper-case",
          type: "literal",
          start: 38092,
          line: 1174,
          col: 13,
          length: 13,
          contents: [],
          nodeId: 66968,
          specials: 0,
          precedingIgnored: []
        } ],
        nodeId: 66967,
        precedingIgnored: []
      }, str ],
      nodeId: 66966,
      precedingIgnored: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: " ",
        type: "whitespace",
        start: 38089,
        line: 1174,
        col: 10,
        length: 1,
        contents: [],
        nodeId: 66965
      } ],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    }, str ],
    nodeId: 66963,
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});
sibilant.macros.namespaces.core.sourceMappingUrl = (function sourceMappingUrl$(url) {
  /* source-mapping-url /Users/jbr/code/sibilant/include/macros.sibilant:1181:0 */

  return [ "//# sourceMappingURL=", eval(outputFormatter(transpile(url))), "\n" ];
});
sibilant.macros.namespaces.core.sortBy = (function sortBy$(arrayOfObjects, attribute) {
  /* sort-by /Users/jbr/code/sibilant/include/macros.sibilant:1190:0 */

  return {
    dir: "/Users/jbr/code/sibilant/include",
    file: "/Users/jbr/code/sibilant/include/macros.sibilant",
    token: "(",
    type: "expression",
    start: 38726,
    line: 1191,
    col: 8,
    length: 1,
    contents: [ {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: ".",
      type: "dots",
      start: 38727,
      line: 1191,
      col: 9,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "sort",
        type: "literal",
        start: 38728,
        line: 1191,
        col: 10,
        length: 4,
        contents: [],
        nodeId: 67117,
        specials: 0,
        precedingIgnored: []
      } ],
      nodeId: 67116,
      precedingIgnored: []
    }, arrayOfObjects, {
      dir: "/Users/jbr/code/sibilant/include",
      file: "/Users/jbr/code/sibilant/include/macros.sibilant",
      token: "(",
      type: "expression",
      start: 38766,
      line: 1192,
      col: 15,
      length: 1,
      contents: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "#->",
        type: "otherChar",
        start: 38767,
        line: 1192,
        col: 16,
        length: 3,
        contents: [],
        nodeId: 67124,
        specials: 0,
        precedingIgnored: []
      }, {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 38771,
        line: 1192,
        col: 20,
        length: 1,
        contents: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "get",
          type: "literal",
          start: 38772,
          line: 1192,
          col: 21,
          length: 3,
          contents: [],
          nodeId: 67127,
          specials: 0,
          precedingIgnored: []
        }, attribute ],
        nodeId: 67126,
        precedingIgnored: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: " ",
          type: "whitespace",
          start: 38770,
          line: 1192,
          col: 19,
          length: 1,
          contents: [],
          nodeId: 67125
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      }, {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: ".",
        type: "dots",
        start: 38808,
        line: 1193,
        col: 20,
        length: 1,
        contents: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "to-string",
          type: "literal",
          start: 38809,
          line: 1193,
          col: 21,
          length: 9,
          contents: [],
          nodeId: 67135,
          specials: 0,
          precedingIgnored: []
        } ],
        nodeId: 67134,
        precedingIgnored: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "\n",
          type: "newline",
          start: 38787,
          line: 1192,
          col: 36,
          length: 1,
          contents: [],
          nodeId: 67132
        }, {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "                    ",
          type: "whitespace",
          start: 38788,
          line: 1193,
          col: 0,
          length: 20,
          contents: [],
          nodeId: 67133
        } ]
      }, {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "(",
        type: "expression",
        start: 38839,
        line: 1194,
        col: 20,
        length: 1,
        contents: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: ".",
          type: "dots",
          start: 38840,
          line: 1194,
          col: 21,
          length: 1,
          contents: [ {
            dir: "/Users/jbr/code/sibilant/include",
            file: "/Users/jbr/code/sibilant/include/macros.sibilant",
            token: "locale-compare",
            type: "literal",
            start: 38841,
            line: 1194,
            col: 22,
            length: 14,
            contents: [],
            nodeId: 67140,
            specials: 0,
            precedingIgnored: []
          } ],
          nodeId: 67139,
          precedingIgnored: []
        }, {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "(",
          type: "expression",
          start: 38856,
          line: 1194,
          col: 37,
          length: 1,
          contents: [ {
            dir: "/Users/jbr/code/sibilant/include",
            file: "/Users/jbr/code/sibilant/include/macros.sibilant",
            token: "get",
            type: "literal",
            start: 38857,
            line: 1194,
            col: 38,
            length: 3,
            contents: [],
            nodeId: 67143,
            specials: 0,
            precedingIgnored: []
          }, {
            dir: "/Users/jbr/code/sibilant/include",
            file: "/Users/jbr/code/sibilant/include/macros.sibilant",
            token: "#1",
            type: "argPlaceholder",
            start: 38861,
            line: 1194,
            col: 42,
            length: 2,
            contents: [],
            nodeId: 67145,
            specials: 0,
            precedingIgnored: [ {
              dir: "/Users/jbr/code/sibilant/include",
              file: "/Users/jbr/code/sibilant/include/macros.sibilant",
              token: " ",
              type: "whitespace",
              start: 38860,
              line: 1194,
              col: 41,
              length: 1,
              contents: [],
              nodeId: 67144
            } ]
          }, attribute ],
          nodeId: 67142,
          precedingIgnored: [ {
            dir: "/Users/jbr/code/sibilant/include",
            file: "/Users/jbr/code/sibilant/include/macros.sibilant",
            token: " ",
            type: "whitespace",
            start: 38855,
            line: 1194,
            col: 36,
            length: 1,
            contents: [],
            nodeId: 67141
          } ],
          specials: 0,
          end: undefined,
          closed: true,
          closingIgnored: []
        } ],
        nodeId: 67138,
        precedingIgnored: [ {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "\n",
          type: "newline",
          start: 38818,
          line: 1193,
          col: 30,
          length: 1,
          contents: [],
          nodeId: 67136
        }, {
          dir: "/Users/jbr/code/sibilant/include",
          file: "/Users/jbr/code/sibilant/include/macros.sibilant",
          token: "                    ",
          type: "whitespace",
          start: 38819,
          line: 1194,
          col: 0,
          length: 20,
          contents: [],
          nodeId: 67137
        } ],
        specials: 0,
        end: undefined,
        closed: true,
        closingIgnored: []
      } ],
      nodeId: 67123,
      precedingIgnored: [ {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "\n",
        type: "newline",
        start: 38750,
        line: 1191,
        col: 32,
        length: 1,
        contents: [],
        nodeId: 67121
      }, {
        dir: "/Users/jbr/code/sibilant/include",
        file: "/Users/jbr/code/sibilant/include/macros.sibilant",
        token: "               ",
        type: "whitespace",
        start: 38751,
        line: 1192,
        col: 0,
        length: 15,
        contents: [],
        nodeId: 67122
      } ],
      specials: 0,
      end: undefined,
      closed: true,
      closingIgnored: []
    } ],
    nodeId: 67115,
    precedingIgnored: [],
    specials: 0,
    end: undefined,
    closed: true,
    closingIgnored: []
  };
});