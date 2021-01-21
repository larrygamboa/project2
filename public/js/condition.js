$(document).ready(function () {
    $(".task-container").on("click", ".complete-btn", function (event) {
      event.preventDefault();
      var id = $(this).data("id");
  console.log(id)
      $.ajax(`/api/updateTopic/${id}`, {
        type: "PUT",
      }).then(function (data) {
        location.reload();
      });
    });

    $(".task-container").on("click", ".complete-btn", function (event) {
        event.preventDefault();
        var id = $(this).data("id");
    console.log(id)
        $.ajax(`/api/updateActivity/${id}`, {
          type: "PUT",
        }).then(function (data) {
          location.reload();
        });
      });
  });
  