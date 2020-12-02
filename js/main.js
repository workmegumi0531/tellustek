$(function () {
  var sw = $(window).width();
  if (sw > 414) {
    $("#sreach_click").click(function () {
      $("#search_input").stop(true).animate(
        {
          opacity: "1",
          "z-index": "1",
          width: "100%",
          transition: ".8s",
        },
        "leaner"
      );
    });
    $("#search_input").mouseout(function () {
      $("#search_input").stop(true).animate(
        {
          opacity: "0",
          "z-index": "0",
          width: "0%",
        },
        "leaner"
      );
    });
  } else {
    $("#sreach_click").click(function () {
      $("#search_input").stop(true).animate(
        {
          opacity: "1",
          "z-index": "1",
          width: "85%",
          transition: ".8s",
        },
        "leaner"
      );
    });
    $("#search_input").mouseout(function () {
      $("#search_input").stop(true).animate(
        {
          opacity: "0",
          "z-index": "0",
          width: "0%",
        },
        "leaner"
      );
    });
  }
  $("#login_open").click(function () {
    $(".login_from").stop(true).animate(
      {
        opacity: "1",
        "z-index": "2",
        transition: "0.5s",
      },
      "leaner"
    );
  });
  $(".login_from").mouseleave(function () {
    $(".login_from").stop(true).animate(
      {
        opacity: "0",
        "z-index": "-1",
      },
      "leaner"
    );
  });
  $(".h_list").click(function () {
    if ($("#form_flex").is(":hidden")) {
      $("#form_flex").show().animate({
        "z-index": "1",
      });
    } else {
      $("#form_flex").hide().animate({
        "z-index": "-1",
      });
    }
  });
});
$(function () {
  $("#menu_list").click(function () {
    if ($("#menu_nav_left").is(":hidden")) {
      $("#menu_nav_left").css({ display: "block" }).animate({
        "z-index": "2",
      });
    } else {
      $("#menu_nav_left").css({ display: "none" }).animate({
        "z-index": "0",
      });
    }
  });
});
$(function () {
  var aBtns = $("#menu ol li ");
  var aBtn2 = $("#menu ol li h5");
  var aBtn3 = $(".bar p");
  var oUl = $("#play ul");
  var aLis = oUl.find("li");
  var timer = null;
  var iNow = 0;
  var play_screen = $(window).width();

  aBtn3
    .stop()
    .eq(0)
    .animate({ width: 90 + "%" }, 4000, "linear");
  aBtns.click(function () {
    iNow = $(this).index();
    tab();
  });

  $("#play,#menu")
    .mouseenter(function () {
      clearInterval(timer);
    })
    .mouseleave(function () {
      timer = setInterval(function () {
        iNow++;
        tab();
      }, 4000);
    });

  timer = setInterval(function () {
    iNow++;
    tab();
  }, 4000);

  function tab() {
    aBtns.attr("class", "").eq(iNow).attr("class", "active");
    aBtn2.css({ color: "#aaa" });
    aBtn3
      .stop()
      .eq(iNow)
      .animate({ width: 90 + "%" }, 4000, "linear");
    aBtn3.css({ width: 0 + "%" });

    if (iNow == aBtns.length) {
      aBtns.eq(0).attr("class", "active");
      aBtn3
        .stop()
        .eq(0)
        .animate({ width: 90 + "%" }, 4000, "linear");
    }

    if (play_screen > 415) {
      oUl.animate({ left: iNow * -100 + "%" }, 500, function () {
        if (iNow == aBtns.length) {
          iNow = 0;
          oUl.css({ left: 0 });
        }
      });
    } else {
      oUl.animate({ left: `${iNow * -100}%` }, 500, function () {
        if (iNow == aBtns.length) {
          iNow = 0;
          oUl.css({ left: 0 });
        }
      });
    }
  }
});
