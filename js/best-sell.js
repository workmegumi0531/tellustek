$(function () {
  sc_num();
  sc_msg();

  $.ajax({
    url: "img_title.json",
    // dataType: "json",
    success: function (arr) {
      for (var i = 0; i < arr.length; i++) {
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
    sh_c_move(this);
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
    sc_msg(); //2.
    // alert("已成功加入購物車");
  });

  function sc_msg() {
    $("#menu_nev_right ul").empty();
    $.ajax({
      url: "img_title.json",
      success: function (arr) {
        var cookieStr = $.cookie("products");
        var newArr = [];
        if (cookieStr) {
          var cookieArr = JSON.parse(cookieStr);
          for (var i = 0; i < arr.length; i++) {
            var cookieArr = JSON.parse(cookieStr);
            for (var j = 0; j < cookieArr.length; j++) {
              if (arr[i].id == cookieArr[j].id) {
                arr[i].num = cookieArr[j].num;
                newArr.push(arr[i]);
              }
            }
          }
          for (var i = 0; i < newArr.length; i++) {
            var node = $(`
                <li id="${newArr[i].id}">
                <div id="sc_product_pic">
                <img src="${newArr[i].img}" alt="" />
              </div>
              <div id="sc_detail_in">
                <div id="sc_product_title">${newArr[i].title}</div>
                <div id="sc_product_money">${newArr[i].price}</div>
                <div id="sc_product_Num">商品數量:${newArr[i].num}</div> 
                <button>+</button>
                <button>-</button>     
                <div id="sc_product_dBtn">刪除</div>                  
              </div>  
                
                </li>
                
              `);
            node.appendTo("#menu_nev_right ul");
          }
        }
      },
    });
  }

  $("#sc_detail_open").click(function () {
    $("#sc_detail_hide").css({
      // right: -380 + "px",
      "z-index": 1,
      display: "block",
    });
  });
  $("#sc_detail_hide").mouseleave(function () {
    $("#sc_detail_hide").css({
      // right: -760 + "px",
      "z-index": 0,
      display: "none",
    });
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

  $("#all_delete").click(function () {
    $.cookie("products", null);
    sc_num();
    sc_msg();
  });

  function sh_c_move(oBtn) {
    $("#icon_transform").css({
      display: "block",
      left: $(oBtn).offset().left,
      top: $(oBtn).offset().top,
    });

    var X =
      $("#sc_detail_open").offset().left - $("#icon_transform").offset().left;
    var Y =
      $("#sc_detail_open").offset().top - $("#icon_transform").offset().top;

    var bola = new Parabola({
      el: "#icon_transform",
      offset: [X, Y],
      duration: 2000,
      curvature: 0.003,
      callback: function () {
        $("#icon_transform").hide();
      },
    });
    bola.start();
  }

  $("#menu_nev_right ul").on("click", "#sc_product_dBtn", function () {
    var id = $(this).closest("li").remove().attr("id");
    var cookieStr = $.cookie("products");
    var cookieArr = JSON.parse(cookieStr);
    for (var i = 0; i < cookieArr.length; i++) {
      if (cookieArr[i].id == id) {
        cookieArr.splice(i, 1);
        break;
      }
    }
    if (!cookieArr.length) {
      $.cookie("products", null);
    } else {
      $.cookie("products", JSON.stringify(cookieArr), {
        expires: 7,
      });
    }

    sc_num();
  });

  $("#menu_nev_right ul").on("click", "button", function () {
    var id = $(this).closest("li").attr("id");
    // alert(id);
    var cookieStr = $.cookie("products");
    var cookieArr = JSON.parse(cookieStr);
    for (var i = 0; i < cookieArr.length; i++) {
      if (id == cookieArr[i].id) {
        if (this.innerHTML == "+") {
          cookieArr[i].num++;
        } else {
          if (cookieArr[i].num > 1) {
            cookieArr[i].num--;
          } else {
          }
        }
        $(this)
          .prevAll("#sc_product_Num")
          .html("商品數量:" + cookieArr[i].num);
        $.cookie("products", JSON.stringify(cookieArr), {
          expires: 7,
        });
        break;
      }
    }
    sc_num();
  });
});
