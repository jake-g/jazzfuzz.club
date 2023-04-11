$(document).ready(function () {
  $("#sort-artist-button").click(function () {
    var posts = $("#blog-posts").children("article");
    posts.sort(function (a, b) {
      var artistA = $(a).find("header h3:contains('Artist')").text().trim().split(": ").pop().toUpperCase();
      var artistB = $(b).find("header h3:contains('Artist')").text().trim().split(": ").pop().toUpperCase();
      if (artistA < artistB) {
        return -1;
      }
      if (artistA > artistB) {
        return 1;
      }
      return 0;
    });
    $("#blog-posts").empty().append(posts);
  });
});

$(document).ready(function () {
  $("#sort-year-button").click(function () {
    var posts = $("#blog-posts").children("article");
    posts.sort(function (a, b) {
      var yearA = $(a).find("header h3:contains('Released:')").text().trim().split(" ").pop();
      var yearB = $(b).find("header h3:contains('Released:')").text().trim().split(" ").pop();
      return yearA - yearB;
    });
    $("#blog-posts").empty().append(posts);
  });
});

$(document).ready(function () {
  $("#collapse-main").click(function () {
    $("main").slideToggle("slow");
  });
});