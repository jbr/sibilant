(setq import (require "../lib/import"))
(import (require "../lib/functional"))

(setq sys (require "sys"))

(setq puts sys.puts)

(setq *global-var* 1)

(defun square (x) 
  "This takes the square"
   (* x x))

(puts (square 3))

(let ((a 6)
      (b 4))
  (puts (- b a))
  (puts (+ a b)))

(puts '(a b c))

(defun varargs (a &optional b c &optional d e &rest remainder)
  (puts (inspect a b c d e remainder)))

(varargs "a"     "c"     "e")
(varargs "a" "b" "c"     "e")
(varargs "a" "b" "c" "d" "e")
(varargs "a" "b" "c" "d" "e" "f" "g")

(defun random ()
  (send -math random))

(defun first (arr)
  (index arr 0))

(let ((a '(a b c 1 hello-world)))
  (puts (slice a 2 3))
  (puts (- 10 7))
  (+ 3 5))

(if true
    (progn
      (puts (- 10 7))
      (puts (+ 2 5))
      (puts (= 2 (+ 1 1))))
  (+ 1 1))

(setq a '(a b c d e))
(puts "HERE")
(puts
 (join "-" (map a (lambda (x) (send x to-upper-case)))))