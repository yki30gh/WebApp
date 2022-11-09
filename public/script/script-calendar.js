$(function() {
  $(".calendar-dates").fadeIn(1000);
  var $lastRowData = $(".dayBox").eq(35).data("date");
  var lastRowDate = $lastRowData.substring(8);
  if (lastRowDate < 10) {
    for (var i = 35; i < 42; i++) {
      $(".dayBox").eq(i).hide();
    }
  }
  var today = new Date();
  var yyyy = today.getFullYear();
  var mm = ("0" + (today.getMonth() + 1)).slice(-2);
  var dd = ("0" + today.getDate()).slice(-2);
  var todayData = yyyy + "-" + mm + "-" + dd;
  for (var i = 0; i < 42; i++) {
    if ($(".dayBox").eq(i).data("date") == todayData) {
      $(".dayBox").eq(i).addClass("todayBox");
    }
  }

  var boxCount = $(".dayBox").length;
  var rowsCount = boxCount / 7;
  for (var i = 0; i < rowsCount; i++) {
    $(".date-number").eq(7 * i).addClass("Sun");
    $(".date-number").eq(7 * i + 6).addClass("Sat");
  }
  /*カレンダーの見た目*/
  var $thisMonthData = $(".dayBox").eq(20).data("date");
  var thisMonth = $thisMonthData.substr(5, 2);
  for (var i = 0; i < 42; i++) {
    var $dayBoxData = $(".dayBox").eq(i).data("date");
    var thisBoxMonth = $dayBoxData.substr(5, 2);
    if (thisBoxMonth != thisMonth) {
      $(".date-number").eq(i).addClass("other-month");
      $(".date-content").eq(i).addClass("other-month");
      $(".dayBox").eq(i).addClass("other-month-box");
    }
  }
  /*DAYカレンダー*/
  var categoryColors = ["#45cc8b", "#ff6670", "#ffa333", "#00ccbb", "#ff80b7", "#ffe866", "#00c3e6", "#eb99ff", "#555555"]
  var categoryColors2 = ["rgba(69, 204, 139,0.6)", "rgba(255, 102, 112,0.6)", "rgba(255, 138, 20,0.5)", "rgba(0, 204, 187, 0.6)", "rgba(255, 20, 147,0.5)", "rgba(255, 215, 0,0.6)", "rgba(0, 191, 255, 0.5)", "rgba(216, 20, 255,0.5)", "rgba(85, 85, 85,0.5)"]
  var createColor = "rgba(0, 167, 179,1)";
  var editColor = "rgba(200, 81, 121,1)";

  const newDate = function(date) {
    var yyyy = date.substr(0, 4);
    var mm = date.substr(5, 2);
    var dd = date.substr(8, 2);
    return yyyy + ',' + mm + ',' + dd;
  }

  var form1Size = $(".form1").length;
  for (var i = form1Size - 1; i >= 0; i--) {
    var $el = $(".form1").eq(i)
    var category = $($el).data("category");
    var dateS = $($el).data("date");
    dateS = new Date(newDate(dateS));
    var dateE = $($el).data("enddate");
    dateE = new Date(newDate(dateE));
    var diff = (dateE.getTime() - dateS.getTime()) / (1000 * 60 * 60 * 24);
    var dayS = dateS.getDay();
    var dayDiff = 6 - dayS;
    var parent = $($el).parent();
    var index = $(".date-content").index(parent);
    var className = "allDay" + i
    $($el).addClass(className);
    $($el).addClass("added");
    if (diff <= dayDiff) {
      for (var j = 1; j <= diff; j++) {
        $(".date-content").eq(index + j).prepend('<div class="item-name allDay"></div> ');
      }
    } else {
      for (var j = 1; j <= dayDiff; j++) {
        $(".date-content").eq(index + j).prepend('<div class="item-name allDay"></div> ');
      }
      for (var j = dayDiff + 1; j <= diff; j++) {
        $(".date-content").eq(index + j).prepend('<div class="item-name allDay added ' + className + '"></div> ');
      }
    }
  }
  for (var i = 0; i < form1Size; i++) {
    var $el = $(".form1").eq(i)
    var category = $($el).data("category");
    var dateS = $($el).data("date");
    dateS = new Date(newDate(dateS));
    var dateE = $($el).data("enddate");
    dateE = new Date(newDate(dateE));
    var diff = (dateE.getTime() - dateS.getTime()) / (1000 * 60 * 60 * 24);
    var dayS = dateS.getDay();
    var dayDiff = 6 - dayS;
    var parent = $($el).parent();
    var index = $(".date-content").index(parent);
    var className = "allDay" + i
    var itemIndex = $(parent).children(".allDay").index($el);
    for (var j = 1; j <= dayDiff; j++) {
      var countBox = $(".date-content").eq(index + j);
      var length = $(countBox).children(".allDay").length;
      var lengDiff = (itemIndex + 1) - length;
      if (length < itemIndex + 1) {
        for (var k = 1; k <= lengDiff; k++) {
          $(".date-content").eq(index + j).prepend('<div class="item-name allDay"></div> ');
        }
      }
    }
  }
  for (var i = 0; i < form1Size; i++) {
    var $el = $(".form1").eq(i)
    var category = $($el).data("category");
    var dateS = $($el).data("date");
    dateS = new Date(newDate(dateS));
    var dateE = $($el).data("enddate");
    dateE = new Date(newDate(dateE));
    var diff = (dateE.getTime() - dateS.getTime()) / (1000 * 60 * 60 * 24);
    var dayS = dateS.getDay();
    var dayDiff = 6 - dayS;
    var parent = $($el).parent();
    var index = $(".date-content").index(parent);
    var className = "allDay" + i
    var itemIndex = $(parent).children(".allDay").index($el);
    if (diff <= dayDiff) {
      for (var j = 1; j <= diff; j++) {
        var countBox = $(".date-content").eq(index + j);
        var length = $(countBox).children(".allDay").length;
        var lengDiff = (itemIndex + 1) - length;
        $(countBox).children(".allDay").eq(itemIndex).addClass(className);
        $(countBox).children(".allDay").eq(itemIndex).addClass("added");
      }
    } else {
      for (var j = 1; j <= dayDiff; j++) {
        var countBox = $(".date-content").eq(index + j);
        var length = $(countBox).children(".allDay").length;
        var lengDiff = (itemIndex + 1) - length;
        $(countBox).children(".allDay").eq(itemIndex).addClass(className);
        $(countBox).children(".allDay").eq(itemIndex).addClass("added");
      }
    }

    $("." + className).css("background-color", categoryColors2[category]);
    $("." + className).css("color", "white");
    $("." + className).css("text-shadow", "0 0 2px #222222");
    if (diff == 0) {
      $("." + className).eq(0).css("border-radius", "10px 10px 10px 10px");
    } else {
      $("." + className).eq(0).css("border-radius", "10px 0 0 10px");
      $("." + className).eq(diff).css("border-radius", "0 10px 10px 0");
    }
  }
  var itemNameSize = $(".item-name").length;
  var startTimeSize = $(".schedule-starttime").length;
  for (var i = 0; i < itemNameSize; i++) {
    var $item = $(".item-name .fa-circle").eq(i);
    var itemCategory = $($item).parent().data("category");
    if (itemCategory === "") {
      $($item).css("display", "none");
    } else {
      $($item).css("color", categoryColors[itemCategory]);
    }
  }
  for (var i = 0; i < startTimeSize; i++) {
    var $item = $(".schedule-starttime").eq(i);
    var itemCategory = $($item).parent().data("category");
    if (itemCategory === "") {
      $($item).css("border-right", "solid 3px #999999");
    } else {
      $($item).css("border-right", "solid 3px " + categoryColors[itemCategory]);
    }
  }
  for (var i = 0; i < 42; i++) {
    var $elm = $(".date-content").eq(i);
    var length = $($elm).children(".added").length;
    if (length == 0) {
      $($elm).children(".allDay").remove();
    }else{

    }
  }
  var form1Size = $(".form1").length;
  for (var i = form1Size - 1; i >= 0; i--) {
    var $el = $(".form1").eq(i);
    var dateS = $($el).data("date");
    dateS = new Date(newDate(dateS));
    var dateE = $($el).data("enddate");
    dateE = new Date(newDate(dateE));
    var diff = (dateE.getTime() - dateS.getTime()) / (1000 * 60 * 60 * 24);
    for (var j = 1; j <= diff; j++) {
      var $elm_s=$(".form1-schedule").eq(i);
      var $elm_d=$(".form1-detail").eq(i);
      var index=$($elm_s).parent().index(".schedules");
      var parent_s=$(".schedules").eq(index+j);
      var parent_d=$(".details").eq(index+j);
      $($elm_s).clone(true).prependTo(parent_s);
      $($elm_d).clone(true).prependTo(parent_d);
    }
  }
  $(".dayBox").click(function() {
    $(".fixed").fadeIn();
    var index = $(this).index();
    $(".modal").eq(index).fadeIn();
    $(".close-modal").click(function() {
      $(".fixed,.modal,.form-delete,.parent-form").fadeOut();
      $(".form-background-left,.form-background-right").css("width", "0");
      $(".category-modal").removeClass("category-modal-open");
      $(".category-content").hide();
      $(".category-edit").fadeOut();
      $(".detail").hide();
    })
  });
  $(".next-modal").click(function() {
    var modalIndex = $(this).parent().index();
    $(".modal").fadeOut();
    $(".parent-form,.form-delete").hide();
    $(".form-background-left,.form-background-right").css("width", "0");
    $(".column-name,.column-memo,.column-date").val("");
    $(".select-btn").removeClass(".select-edit,.selectedEdit");
    $(".modal").eq(modalIndex).fadeIn();
    $(".category-modal").removeClass("category-modal-open");
    $(".category-content").hide();
    $(".category-edit").fadeOut();
    $(".detail").hide();
  });
  $(".prev-modal").click(function() {
    var modalIndex = $(this).parent().index();
    $(".modal").fadeOut();
    $(".parent-form,.form-delete").hide();
    $(".form-background-left,.form-background-right").css("width", "0");
    $(".column-name,.column-memo,.column-date").val("");
    $(".select-btn").removeClass("select-edit selectedEdit");
    $(".modal").eq(modalIndex - 2).fadeIn();
    $(".category-modal").removeClass("category-modal-open");
    $(".category-content").hide();
    $(".category-edit").fadeOut();
    $(".detail").hide();
  });
  $(".chenge-modal").hover(function() {
    $(this).css("background-color", " rgba(0,0,0,0.3)");
    $(this).find("i").css("color", " rgba(255,255,255,0.4)");
  }, function() {
    $(this).css("background-color", " rgba(0,0,0,0)");
    $(this).find("i").css("color", " rgba(0,0,0,0.3)");
  });
  /******編集フォーム******/
  $(".form2-edit-btn").on("click", function() {
    //フォーム
    $(".form-background-left,.form-background-right").css("width", "275px");
    $(".parent-form,.form-delete,.form-time").show();
    $(".form-left,.form-right").css("background-color", editColor);
    $(".form-header,.column-name,.form-back").css("color", editColor);
    $(".select-btn").css("border", "solid 2px " + editColor);
    $(".form-select").addClass("edit-select");
    $(".form-select").removeClass("create-select");
    $(".select-btn").removeClass("selected");
    $(".form-endDate").hide();
    $(".form-time i").removeClass("open");
    $(".form-time span").fadeOut();
    $(".form-time i").css("right", "250px");
    $(".fa-calendar-minus").css("opacity", "0");
    $(".fa-calendar-plus").css("opacity", "1");
    //submitボタン
    $(".form-submit input").attr("value", "EDIT");
    $(".form-submit").addClass("edit-submit").removeClass("create-submit");
    //フォーム初期値
    var thisData = $(this).parent().data();
    $(".parent-form").attr("action", "/schedule-edit/" + thisData.id);
    $(".column-name").val(thisData.name);
    $(".column-starttime").val(thisData.starttime);
    $(".column-endtime").val(thisData.endtime);
    $(".column-memo").val(thisData.memo);
    $(".column-date").val(thisData.date);
    $(".column-form").val(thisData.form);
    $('input[name=scheduleCategory]:eq(' + thisData.category + ')').prop('checked', true);
    $(".category-check").css("opacity", "0");
    $(".category-check").eq(thisData.category).css("opacity", "1");
    $(".delete-form").attr("action", "/schedule-delete/" + thisData.id);
    $(".form-back").on("click", function() {
      $(".parent-form,.form-delete").hide();
      $(".form-background-left,.form-background-right").css("width", "0");
      $(".form-control").val("");
    });
  });
  $(".form1-edit-btn").on("click", function() {
    //フォーム
    $(".form-background-left,.form-background-right").css("width", "275px");
    $(".parent-form,.form-delete,.form-endDate").show();
    $(".form-left,.form-right").css("background-color", editColor);
    $(".form-header,.column-name,.form-back").css("color", editColor);
    $(".select-btn").css("border", "solid 2px " + editColor);
    $(".form-select").addClass("edit-select");
    $(".form-select").removeClass("create-select");
    $(".select-btn").addClass("selected");
    $(".form-time").hide();
    $(".form-time i").removeClass("open");
    $(".form-time span").fadeOut();
    $(".form-time i").css("right", "250px");
    $(".fa-calendar-minus").css("opacity", "0");
    $(".fa-calendar-plus").css("opacity", "1");
    //submitボタン
    $(".form-submit input").attr("value", "EDIT");
    $(".form-submit").addClass("edit-submit").removeClass("create-submit");
    //フォーム初期値
    var thisData = $(this).parent().data();
    $(".parent-form").attr("action", "/schedule-edit/" + thisData.id);
    $(".column-name").val(thisData.name);
    $(".column-memo").val(thisData.memo);
    $(".column-startDate").val(thisData.date);
    $(".column-endDate").val(thisData.enddate);
    $(".column-form").val(thisData.form);
    $('input[name=scheduleCategory]:eq(' + thisData.category + ')').prop('checked', true);
    $(".category-check").css("opacity", "0");
    $(".category-check").eq(thisData.category).css("opacity", "1");
    $(".delete-form").attr("action", "/schedule-delete/" + thisData.id);
    $(".form-back").on("click", function() {
      $(".parent-form,.form-delete").hide();
      $(".form-background-left,.form-background-right").css("width", "0");
      $(".form-control").val("");
    });
  });

  $(".new-btn").hover(function() {
    $(".new-btn i").animate({
      "fontSize": "21px"
    }, 200).animate({
      "fontSize": "20px"
    }, 100);
  }, function() {
    $(".new-btn i").animate({
      "fontSize": "16px"
    }, 150);
  });
  /******新規作成フォーム******/
  $(".new-btn").on("click", function() {
    //フォーム
    $(".parent-form,.form-time").show();
    $(".form-background-left,.form-background-right").css("width", "275px");
    $(".form-left,.form-right").css("background-color", createColor);
    $(".form-header,.column-name,.form-back").css("color", createColor);
    $(".select-btn").css("border", "solid 2px " + createColor);
    $(".form-select").addClass("create-select");
    $(".form-select").removeClass("edit-select");
    $(".select-btn").removeClass("selected");
    $(".form-endDate").hide();
    $(".column-form").val(0);
    $(".form-time i").removeClass("open");
    $(".form-time span").fadeOut();
    $(".form-time i").css("right", "250px");
    $(".fa-calendar-minus").css("opacity", "0");
    $(".fa-calendar-plus").css("opacity", "1");
    //カテゴリーモーダル
    $(".category-check").css("opacity", "0");
    $('input[name=scheduleCategory]').prop('checked', false);
    //submitボタン
    $(".form-submit input").attr("value", "CREATE");
    $(".form-submit").addClass("create-submit").removeClass("edit-submit");
    //フォーム初期値
    $(".parent-form").attr("action", "/schedule-create");
    $(".column-memo,.column-starttime,column-endtime").val("");
    var thisData = $(this).parent().parent().data("date");
    $(".column-name").attr("placeholder", "TITLE");
    $(".column-date").val(thisData);
    //戻るボタン
    $(".form-back").on("click", function() {
      $(".parent-form").fadeOut();
      $(".form-background-left").css("width", "0");
      $(".form-background-right").css("width", "0");
    });
  });
  //ENDTIMEボタン
  $(".form-time i").click(function() {
    if ($(".form-time i").hasClass("open")) {
      $(".form-time i").removeClass("open");
      $(".form-time span").fadeOut();
      $(".form-time i").css("right", "250px");
      $(".fa-calendar-minus").css("opacity", "0");
      $(".fa-calendar-plus").css("opacity", "1");
      $(".column-form").val(0);
    } else {
      $(".form-time i").addClass("open");
      $(".form-time span").fadeIn();
      $(".form-time i").css("right", "100px");
      $(".fa-calendar-minus").css("opacity", "1");
      $(".fa-calendar-plus").css("opacity", "0");
      $(".column-form").val(2);
    }
  })
  //セレクトボタン
  $(".select-btn").click(function() {
    if ($(this).hasClass("selected")) {
      $(this).removeClass("selected");
      $(".form-time").slideDown(800);
      $(".form-endDate").slideUp(300);
      $(".column-form").val(0);
      $(".form-time i").removeClass("open");
      $(".form-time span").fadeOut();
      $(".form-time i").css("right", "250px");
      $(".fa-calendar-minus").css("opacity", "0");
      $(".fa-calendar-plus").css("opacity", "1");
    } else {
      $(this).addClass("selected");
      $(".form-time").slideUp(800);
      $(".form-endDate").slideDown(300);
      $(".column-form").val(1);
    }
  });
  $(".schedule").click(function(){
    $(".detail").hide();
    var index=$(this).index(".schedule");
    $(".detail").eq(index).fadeIn(200);
  })
  //カテゴリーモーダル
  $(".category-btn").click(function() {
    $(".category-modal").addClass("category-modal-open");
    $(".category-content").fadeIn(600);
    $(".category-content").children().show();
  })
  $(".categorys label").click(function() {
    var checked = $('input[name="scheduleCategory"]:checked').val();
    $(".category-check").css("transform", "rotate(-360deg)");
    $(".category-check").css("opacity", "0");
    $(".category-check").eq(checked).css("transform", "rotate(360deg)");
    $(".category-check").eq(checked).css("opacity", "1");
    $(".category-check").eq(checked).css("color", "white");
  })
  $(".categorys label").hover(function() {
    var index = $(".categorys label").index(this);
    $(".category-left").eq(index).css("width", "150px");
    $(this).css("color", "white");
    $(".category-check").eq(index).css("color", "white");
  }, function() {
    var index = $(".categorys label").index(this);
    $(".category-left").eq(index).css("width", "5px");
    $(this).css("color", "#777777");
    var checked = $('input[name="scheduleCategory"]:checked').val();
    $(".category-check").eq(checked).css("color", categoryColors[checked]);
  });
  $(".category-ok-btn").click(function() {
    $(".category-modal").removeClass("category-modal-open");
    $(".category-content").hide();
  });
  $(".category-edit-btn").click(function() {
    $(".category-change-left,.category-change-right").animate({
      "width": "275px"
    }, 500).animate({
      "width": "0"
    }, 500);
    $(".category-edit").delay(500).queue(function() {
      $(".category-edit").show().dequeue();
    });
    var $children = $(".category-content").children();
    $($children).delay(500).queue(function() {
      $($children).hide().dequeue();
    });
  });
  $(".category-back-btn").click(function() {
    $(".category-change-left,.category-change-right").animate({
      "width": "275px"
    }, 500).animate({
      "width": "0"
    }, 500);
    $(".category-edit").delay(500).queue(function() {
      $(".category-edit").hide().dequeue();
    });
    var $children = $(".category-content").children();
    $($children).delay(500).queue(function() {
      $($children).show().dequeue();
    });
  });
});
