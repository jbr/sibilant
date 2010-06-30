var sys = require("sys");

var puts = sys.puts;

/* This takes the square */
square = (function(x) {
  return x * x
});

puts(square(3));

(function() {
  var a = 6,
    b = 4;
  
  return puts(a + b)
})();

puts(a(b, c));

/* This takes the square */
varargs = (function(&rest, a) {
  return puts(a)
});

varargs(a, b, c);

