$(document).ready(function () {
    // creating even for buttons to grab the topic's id to change it's status to "complete"
    $(".task-container").on("click", ".complete-html", function (event) {
      event.preventDefault();
      var id = $(this).data("id");
  console.log(id)
      $.ajax(`/api/updateHtml/${id}`, {
        type: "PUT",
      }).then(function (data) {
        location.reload();
      });
    });

    $(".task-container").on("click", ".complete-css", function (event) {
        event.preventDefault();
        var id = $(this).data("id");
    console.log(id)
        $.ajax(`/api/updateCss/${id}`, {
          type: "PUT",
        }).then(function (data) {
          location.reload();
        });
      });

      $(".task-container").on("click", ".complete-php", function (event) {
        event.preventDefault();
        var id = $(this).data("id");
    console.log(id)
        $.ajax(`/api/updatePhp/${id}`, {
          type: "PUT",
        }).then(function (data) {
          location.reload();
        });
      });

      $(".task-container").on("click", ".complete-python", function (event) {
        event.preventDefault();
        var id = $(this).data("id");
    console.log(id)
        $.ajax(`/api/updatePython/${id}`, {
          type: "PUT",
        }).then(function (data) {
          location.reload();
        });
      });
  });
  