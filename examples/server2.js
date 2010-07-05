var net = require("net");

var server = net.createServer((function(socket) { 
  // socket:required
  socket.setEncoding("utf", 8);
  socket.addListener("connect", (function(args) { 
    // args:rest
    var args = Array.prototype.slice.call(arguments, 0);
    
    return socket.write("Echo server\r\n");
  }));
  socket.addListener("data", (function(data) { 
    // data:required
    return socket.write(data);
  }));
  return socket.addListener("end", (function(args) { 
    // args:rest
    var args = Array.prototype.slice.call(arguments, 0);
    
    return socket.end();
  }));
}));

server.listen(8124, "127.0.0.1");

