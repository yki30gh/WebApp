/*新規作成*/
$(".new-btn").on("click", function() {
  $(".form-background-left").css("width", "50%");
  $(".form-background-right").css("width", "50%");
  $(".create-form .parent-form").show();
  $(".form-left,.form-right").css("background-color", "rgba(0, 167, 179,0.9)");
  $(".create-header").css("color", "rgba(0, 167, 179,1)");
  $(".form-name").css("color", "rgba(0, 167, 179,1)");
  $(".form-back").css("color", "rgba(0, 167, 179,1)");
  var thisData = $(this).data("date");
  $(".create-form .form-date").attr("value", thisData);
  $(".create-back").on("click", function() {
    $(".create-form .parent-form").hide();
    $(".form-background-left").css("width", "0");
    $(".form-background-right").css("width", "0");
  });
});
/*データ編集*/
$(".schedule-edit").on("click", function() {
  $(".form-background-left").css("width", "50%");
  $(".form-background-right").css("width", "50%");
  $(".edit-form .parent-form").show();
  $(".form-delete").show();
  $(".form-left,.form-right").css("background-color", "rgba(200, 81, 121,0.9)");
  $(".create-header").css("color", "rgba(200, 81, 121,1)");
  $(".form-name").css("color", "rgba(200, 81, 121,1)");
  $(".form-back").css("color", "rgba(200, 81, 121,1)");
  var $thisData = $(this).parent().data();
  $(".edit-form .parent-form").attr("action", "/schedule-edit/" + $thisData.id);
  $(".edit-form .form-name").attr("value", $thisData.name);
  $(".edit-form .form-memo").attr("value", $thisData.memo);
  $(".edit-form .form-date").attr("value", $thisData.date);
  $(".delete-form").attr("action", "/schedule-delete/" + $thisData.id);
  $(".edit-back").on("click", function() {
    $(".edit-form .parent-form").hide();
    $(".form-delete").hide();
    $(".form-background-left").css("width", "0");
    $(".form-background-right").css("width", "0");
  });
});
$(".fa-check").hide();
var categoryColors = ["#45cc8b", "#00ccbb", "#00c3e6", "#222222", "#eb99ff", "#ff6670", "#ff80b7", "#ffa333", "#ffe866"]
var startTimeSize = $(".schedule-starttime").length;
var itemNameSize = $(".item-name").length;
for (var i = 0; i < startTimeSize; i++) {
  var $item = $(".schedule-starttime").eq(i);
  var itemCategory = $($item).parent().data("category");
  if (itemCategory == "") {
    $($item).css("border-left", "solid 3px #999999");
  } else {
    $($item).css("border-left", "solid 3px " + categoryColors[itemCategory]);
  }
}
for (var i = 0; i < itemNameSize; i++) {
  var $item = $(".item-name .fa-circle").eq(i);
  var itemCategory = $($item).parent().data("category");
  if (itemCategory == "") {
    $($item).css("display", "none");
  } else {
    $($item).css("color", categoryColors[itemCategory]);
  }
}
$(".create-form .create-select").on("click", function() {
  if ($(this).hasClass("selectedCreate")) {
    $(this).removeClass("selectedCreate");
    $(".create-form .create-time").slideDown(800);
    $(".create-form .create-endDate").slideUp(300);
    $(".select-btn-create i").css("left", "2px");
    $(".select-btn-create i").css("color", "rgba(0, 167, 179,1)");
    $(".select-btn-create .create-select").css("background-color", "rgba(255,255,255,0)");
  } else {
    $(this).addClass("selectedCreate");
    $(".create-form .create-time").slideUp(800);
    $(".create-form .create-endDate").slideDown(300);
    $(".select-btn-create i").css("left", "18px");
    $(".select-btn-create i").css("color", "white");
    $(".select-btn-create .create-select").css("background-color", "rgba(0, 167, 179,1)");
  }
});
$(".edit-form .create-select").css("border", "solid 2px rgba(200, 81, 121,1)");
$(".select-btn-edit i").css("color", "rgba(200, 81, 121,1)");
$(".edit-form .create-select").on("click", function() {
  if ($(this).hasClass("selectedEdit")) {
    $(this).removeClass("selectedEdit");
    $(".edit-form .create-time").slideDown(800);
    $(".edit-form .create-endDate").slideUp(300);
    $(".select-btn-edit i").css("left", "2px");
    $(".select-btn-edit i").css("color", "rgba(200, 81, 121,1)");
    $(".select-btn-edit .create-select").css("background-color", "rgba(255,255,255,0)");
  } else {
    $(this).addClass("selectedEdit");
    $(".edit-form .create-time").slideUp(800);
    $(".edit-form .create-endDate").slideDown(300);
    $(".select-btn-edit i").css("left", "18px");
    $(".select-btn-edit i").css("color", "white");
    $(".select-btn-edit .create-select").css("background-color", "rgba(200, 81, 121,1)");
  }
});
});
$(".schedules").html('<div class="schedule"><div class="column schedule-starttime">'+itemData.starttime+'</div><div class="column schedule-name">'+itemData.name+'</div><div class="column schedule-edit"><i class="fas fa-pen"></i></div></div>'






)
