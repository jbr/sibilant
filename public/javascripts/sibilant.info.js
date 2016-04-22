//# sourceMappingURL=/javascripts/sibilant.info.map
;
(function() {
  /* public/javascripts/sibilant.info.sibilant:3:0 */

  var lineCount = (function lineCount$(text) {
    /* line-count public/javascripts/sibilant.info.sibilant:4:1 */
  
    return text.split("\n").length;
  });
  var resize = (function resize$(textarea, pre) {
    /* resize public/javascripts/sibilant.info.sibilant:6:1 */
  
    var lines = {
      textarea: lineCount(textarea.val()),
      pre: lineCount(pre.text())
    };
    return $(textarea.add(pre)).css("height", ((Math.max(lines.textarea, lines.pre)) + "em"));
  });
  var trim = (function trim$(item) {
    /* trim public/javascripts/sibilant.info.sibilant:15:1 */
  
    return item.replace((new RegExp("^\\s*|\\s*$", "g")), "");
  });
  return $((function() {
    /* public/javascripts/sibilant.info.sibilant:17:4 */
  
    $("textarea").wrap("<div class=\"example\"/>").after($("<pre/>")).keyup((function() {
      /* public/javascripts/sibilant.info.sibilant:21:17 */
    
      var textarea = $(this),
          pre = textarea.siblings("pre");
      (function() {
        if (!(textarea.get(0) === document.activeElement)) {
          return textarea.val(trim(textarea.val()));
        }
      }).call(this);
      sibilant.file = ("examples/" + textarea.attr("id") + ".sibilant");
      (function() {
        try {
          return $(pre).text(trim(sibilant.sibilize(textarea.val()))).removeClass("error");
        } catch (e) {
          return $(pre).text(e.message).addClass("error");
        }
      }).call(this);
      return resize(textarea, pre);
    })).trigger("keyup").blur((function() {
      /* public/javascripts/sibilant.info.sibilant:39:16 */
    
      return $(this).trigger("keyup");
    })).show();
    return $("article").scrollNav({ titleText: null });
  }));
}).call(this);