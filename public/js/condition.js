$(document).ready(function () {
    $(".task-container").on("click", ".complete-btn", function (event) {
      event.preventDefault();
      var id = $(this).data("id");
  
      $.ajax(`/api/updateTopic/${id}`, {
        type: "PUT",
      }).then(function (data) {
        location.reload();
      });
    });
  });
  