var http = require("http");

var server = http.createServer((function(req, res) { 
  // req:required res:required
  res.write(ead, 200, { "Content-Type": "text/plain" });
  return res.end("Hello World\n");
}));

server.listen(8124, "127.0.0.1");

console.log("Server running at http://127.0.0.1:8124/");

