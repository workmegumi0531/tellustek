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
