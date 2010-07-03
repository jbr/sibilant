var sys = require("sys");

var puts = sys.puts;

var _globalVar_ = 1;

square = (function(x) { 
  // x:required
  /* This takes the square */
  
  return x * x;
});

puts(square(3));

(function() {
  var a = 6,
    b = 4;
  puts(b - a);
  return puts(a + b);
})();

puts(["a", "b", "c"]);

varargs = (function(a, b, c, d, e, remainder) { 
  // a:required b:optional c:required d:optional e:required remainder:rest
  if (arguments.length < 5) // if b is missing
    var e = d, d = c, c = b, b = undefined;
  if (arguments.length < 4) // if d is missing
    var e = d, d = undefined;
  if (arguments.length < 3)
    throw new Error("argument count mismatch: expected no fewer than 3 arguments");
  var remainder = Array.prototype.slice.call(arguments, 5);
  
  return puts("a:" + a + "\n" +
    "b:" + b + "\n" +
    "c:" + c + "\n" +
    "d:" + d + "\n" +
    "e:" + e + "\n" +
    "remainder:" + remainder);
});

varargs("a", "c", "e");

varargs("a", "b", "c", "e");

varargs("a", "b", "c", "d", "e");

varargs("a", "b", "c", "d", "e", "f", "g");

random = (function() { 
  if (arguments.length > 0)
    throw new Error("argument count mismatch: expected no arguments");
  
  return Math.random();
});

first = (function(arr) { 
  // arr:required
  return (arr)[0];
});

(function() {
  var a = ["a", "b", "c", 1, "helloWorld"];
  puts(a.slice(2, 3));
  puts(10 - 7);
  return 3 + 5;
})();

if (true) {
  puts(10 - 7);
  puts(2 + 5);
  return puts((2 === 1 + 1));
} else {
  1 + 1
}
