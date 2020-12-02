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
$(function () {
  sc_num();
  $.ajax({
    url: "img_title.json",
    dataType: "json",
    success: function (arr) {
      for (i = 0; i < arr.length; i++) {
        var B_m_bottom = $(
          ` <div id="B_m_item">
              <img src="${arr[i].img}" alt="" width="330" />
              <div id="B_m_p_detail">
                <p>${arr[i].price}</p>
                <h3>${arr[i].title}</h3>
                <div id="B_m_icon_item">
                  <i class="icon_click far fa-eye" id="i_eye"></i>
                  <i class="icon_click far fa-star" id="i_st"></i>
                  <i class="icon_click fas fa-share-square" id="i_ss"></i>
                  <i class="icon_click fas fa-shopping-cart" id="${arr[i].id}"></i>
                  <p class="o_o_s_n">OUT OF STOCK</p>
                </div>
              </div>
            </div>`
        );
        B_m_bottom.appendTo("#B_m_bottom");
      }
    },
    error: function (msg) {
      console.log(msg);
    },
  });

  $("#B_m_bottom").on("click", "#i_eye", function () {
    alert("已成功關注");
  });
  $("#B_m_bottom").on("click", "#i_st", function () {
    alert("已加入最愛");
  });
  $("#B_m_bottom").on("click", "#i_ss", function () {
    alert("已分享成功");
  });
  $("#B_m_bottom").on("click", ".fa-shopping-cart", function () {
    var id = this.id;
    var first = $.cookie("products") == null ? true : false;

    if (first) {
      var arr = [{ id: id, num: 1 }];
      $.cookie("products", JSON.stringify(arr), {
        expires: 7,
      });
    } else {
      var cookieStr = $.cookie("products");
      var cookieArr = JSON.parse(cookieStr);
      var same = false;

      for (var i = 0; i < cookieArr.length; i++) {
        if (id == cookieArr[i].id) {
          same = true;
          cookieArr[i].num++;
          break;
        }
      }
      if (!same) {
        cookieArr.push({ id: id, num: 1 });
      }
      $.cookie("products", JSON.stringify(cookieArr), {
        expires: 7,
      });
    }
    sc_num();
    alert("已成功加入購物車");
  });
  function sc_num() {
    var cookieStr = $.cookie("products");
    if (cookieStr) {
      var cookieArr = JSON.parse(cookieStr);
      var sum = 0;
      for (var i = 0; i < cookieArr.length; i++) {
        sum = sum + cookieArr[i].num;
      }
      $("#sc_num").html(sum);
    } else {
      $("#sc_num").html(0);
    }
  }
});
$(function () {
  $("#addon_item_3").on("hover", function () {
    $("#span").css({ "font-weight": 900 });
  });
});
