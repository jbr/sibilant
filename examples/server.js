var http = require("http");

var server = http.createServer((function(request, response) { 
  // request:required response:required
  response.writeHead(200, { "Content-Type": "text/plain" });
  return response.end("Hello World\n");
}));

server.listen(8124, "127.0.0.1");

console.log("Server running at http://127.0.0.1:8124/");

