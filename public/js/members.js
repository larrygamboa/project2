$(document).ready(() => {
  // GET request to grab user's name to updates the HTML on the page
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.email);
  });
});
