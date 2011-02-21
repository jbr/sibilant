(defun module.exports (module)
  (each-key f-name module
            (when (module.has-own-property f-name)
              (set global f-name (get module f-name)))))