$((function() {
  var trim = (function(item) {
    return item.replace("/^\\s*|\\s*$/g", "\"\"");
  });
  ;
  var checkHash = (function() {
    (function() {
      if (typeof(checkHash.timeout) !== 'undefined') {
        clearTimeout(checkHash.timeout);
        return delete checkHash.timeout;
      }
    })();
    return (function() {
      if ((window.location.hash !== $(window).data("lastHash"))) {
        return $(window)
          .data("lastHash", window.location.hash)
          .trigger("hashChange", window.location.hash);
      }
    })();
  });
  ;
  (checkHash)["timeout"] = setTimeout(checkHash, 500);
  var items = $("script[language=sibilant/example]").each((function() {
    return $("#contents").append(("<li><a href=\"#" + $(this).attr("id") + "\">" + $(this).attr("data-title") + "</a></li>"));
  }));
  var hashChange = (function(evt, hash) {
    var item = $(items).filter(hash);
    return (function() {
      if ((0 !== item.length)) {
        var content = $(item)
          .text()
          .replace("<![CDATA[\n", "")
          .replace("]]>\n", "")
        ,
            title = $(item).attr("data-title"),
            next = $(item).next(items.selector),
            prev = $(item).prev(items.selector);
        $("header h2").html(title);
        (function() {
          if ((next.length > 0)) {
            return $("#next")
              .text(next.attr("data-title"))
              .attr("href", ("#" + next.attr("id")))
              .show();
          } else {
            return $("#next").hide();
          }
        })();
        (function() {
          if ((prev.length > 0)) {
            return $("#prev")
              .attr("href", ("#" + prev.attr("id")))
              .show();
          } else {
            return $("#prev").hide();
          }
        })();
        return $("textarea")
          .val(trim(content))
          .keyup();
      }
    })();
  });
  ;
  $(window)
    .click((function() {
      return setTimeout(checkHash, 25);
    }))
    .bind("hashChange", hashChange)
  ;
  (function() {
    switch(window.location.hash) {
    case "":
    case "#":
      return (window.location)["hash"] = $(items)
        .first()
        .attr("id")
      ;
    }
  })();
  $("textarea")
    .focus()
    .keyup((function(evt) {
      return (function() {
        try {
          return $("#output")
            .text(sibilant.translateAll($("textarea").val()))
            .removeClass("error");
        } catch (e) {
          return $("#output")
            .text(e.stack)
            .addClass("error");
        }
      })();
    }))
  ;
  return checkHash();
}))
