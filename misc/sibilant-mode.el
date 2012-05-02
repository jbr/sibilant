;;; sibilant-mode.el --- Major mode for Sibilant Lisp

;; I should mention that I looked at clojure-mode
;; (https://github.com/jochu/clojure-mode) when writing this.

(require 'cl)

(defgroup sibilant-mode nil
  "A mode for Sibilant Lisp"
  :prefix "sibilant-mode-"
  :group 'applications)

(defvar sibilant-mode-map
  (let ((map (make-sparse-keymap)))
    (set-keymap-parent map lisp-mode-shared-map)
    (define-key map (kbd "RET") 'reindent-then-newline-and-indent)
    map)
  "Keymap for Sibilant mode. Inherits from `lisp-mode-shared-map'.")

(defvar sibilant-mode-syntax-table
  (let ((table (copy-syntax-table emacs-lisp-mode-syntax-table)))
    (modify-syntax-entry ?: "    " table)
    (modify-syntax-entry ?, "    " table)
    (modify-syntax-entry ?\{ "(}" table)
    (modify-syntax-entry ?\} "){" table)
    (modify-syntax-entry ?\[ "(]" table)
    (modify-syntax-entry ?\] ")[" table)
    (modify-syntax-entry ?/  "|" table)
    table))

;;;###autoload
(defun sibilant-mode ()
  "Major mode for editing Sibilant code - similar to Lisp mode."
  (interactive)
  (kill-all-local-variables)
  (use-local-map sibilant-mode-map)
  (setq major-mode 'sibilant-mode)
  (setq mode-name "Sibilant")
  (lisp-mode-variables nil)

  (set-syntax-table sibilant-mode-syntax-table)

  (set (make-local-variable 'lisp-indent-function)
       'sibilant-indent-function)
  
  (sibilant-mode-font-lock-setup)

  (run-mode-hooks 'sibilant-mode-hook))

(defun sibilant-mode-font-lock-setup ()
  "Configures font-lock for editing Sibilant code."
  (interactive)
  (setq font-lock-defaults
        '(sibilant-font-lock-keywords)))

(defconst sibilant-font-lock-keywords
  '(("(\\(defun\\|defmacro\\)[ \t\n\r]+\\([[:alnum:].-]+[?!]?\\)[ \t\r\n]+(\\(.*?\\))"
     (1 font-lock-keyword-face)
     (2 font-lock-function-name-face)
     (3 font-lock-variable-name-face))
    ("(\\(lambda\\)[[:space:]]+(\\(.*?\\))"
     (1 font-lock-keyword-face)
     (2 font-lock-variable-name-face))
    ("(\\(defvar\\|setf?\\)[ \r\n\t]+\\([[:alnum:].-]+[?!]?\\)"
     (1 font-lock-keyword-face)
     (2 font-lock-variable-name-face))
    ("(\\(thunk\\|if\\|when\\|apply\\|concat\\|throw\\|switch\\|each\\|chain\\|try\\|progn\\|call\\|default\\)[ \t\r\n)]+"
     (1 font-lock-builtin-face))
    ("&[[:alnum:]]+" . font-lock-keyword-face)
    ("'[[:alnum:].-]+[?!]?" . font-lock-string-face)
    ("(\\([[:alnum:].-]+[?!]?\\)" (1 font-lock-constant-face nil t))
    ))


(defun sibilant-indent-function (indent-point state)
  (let ((normal-indent (current-column)))
    (goto-char (1+ (elt state 1)))
    (parse-partial-sexp (point) calculate-lisp-indent-last-sexp 0 t)
    (let ((function (buffer-substring (point)
                                      (progn (forward-sexp 1) (point))))
          (open-paren (elt state 1))
          method)

      (setq method (get (intern-soft function) 'sibilant-indent-function))

      (cond
       ((member (char-after open-paren) '(?\[ ?\{))
        (goto-char open-paren)
        (+ 2 (current-column)))

       ((eq method 'defun)
        (lisp-indent-defform state indent-point))

       ((integerp method)
        (lisp-indent-specform method state indent-point normal-indent))

       (method
        (funcall method indent-point state))))))


(defun put-sibilant-indent (sym indent)
  (put sym 'sibilant-indent-function indent))

(defmacro define-sibilant-indent (&rest kvs)
  `(progn
     ,@(mapcar (lambda (x) `(put-sibilant-indent
                        (quote ,(first x)) ,(second x))) kvs)))

(define-sibilant-indent
  (lambda 'defun)
  (defun 'defun)
  (defmacro 'defun)
  (if 1)
  (when 1)
  (while 1)
  (try 0)
  (switch 1)
  (progn 0)
  (scoped 0)
  (for 1)
  (chain 1)
  (each 2)
  (thunk 0))

;;;###autoload
(add-to-list 'auto-mode-alist '("\\.sib\\(?:ilant\\)?$" . sibilant-mode))

(provide 'sibilant-mode)
;;; sibilant-mode.el ends here
