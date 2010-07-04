(include 'macros.lisp)
(setq http (require 'http))

(setq server (http.create-server (lambda (request, response)
  (response.write-head 200 (hash "Content-Type" "text/plain"))
  (response.end "Hello World\n"))))

(server.listen 8124 "127.0.0.1")
(console.log "Server running at http://127.0.0.1:8124/")