$(function() {
  $(".new").click(function() {
    $(".create").fadeIn(100);
  });
  $(".search-icon").click(function() {
    $(".search").fadeIn(100);
  });
  $(".create-close-modal").click(function() {
    $(".create").fadeOut(200);
  });
  $(".search-close-modal").click(function() {
    $(".search").fadeOut(200);
  });
  $(".submit").click(function() {
    $(".create").fadeOut(200);
  });
  $(".box4").click(function() {
    var $menu = $(this).find("ul");
    if ($menu.hasClass("open")) {
      $menu.removeClass("open");
      $menu.slideUp(200);
    } else {
      $menu.addClass("open");
      $menu.slideDown(200);
    }
    $menu.hover(function() {
      if ($menu.hasClass("open")) {
        $menu.show();
      }
    }, function() {
      if ($menu.hasClass("open")) {
        $menu.removeClass("open");
        $menu.slideUp(200);
      }
    });
  });



  var moreNum = 7;
  if ($(".body li").length <= moreNum) {
    $(".more_btn").css("display", "none")
  }
  $('.body li:nth-child(n + ' + (moreNum + 1) + ')').addClass('is-hidden');
  $('.more_btn').on('click', function() {
    $('.body li.is-hidden').slice(0, moreNum).removeClass('is-hidden');
    if ($('.body li.is-hidden').length == 0) {
      $('.more_btn').fadeOut();
    }
  });
});
