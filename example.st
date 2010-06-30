

(setq sys (require "sys"))
(setq puts sys.puts)

(defun square (x) 
  "This takes the square"
   (* x x))

(puts (square 3))

(let ((a 6)
      (b 4)) 
  (puts (+ a b)))

(puts (a b c))
(defun varargs (&rest a)
  (puts a))

(varargs a b c)