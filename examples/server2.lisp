(defvar net (require 'net))
(defvar server
  (net.create-server
   (lambda (socket)
     (socket.set-encoding 'utf8)
     (socket.add-listener 'connect
			  (lambda (&rest args) (socket.write "Echo server\r\n")))
     (socket.add-listener 'data (lambda (data) (socket.write data)))
     (socket.add-listener 'end (lambda (&rest args) (socket.end))))))

(server.listen 8124 "127.0.0.1")