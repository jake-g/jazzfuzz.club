var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var players = [];
function onYouTubeIframeAPIReady() {
  var playerContainers = document.getElementsByClassName('playerContainer');
  for (var i = 0; i < playerContainers.length; i++) {
    var playlistId = playerContainers[i].getAttribute('data-playlist-id');
    var player = new YT.Player(playerContainers[i], {

      playerVars: {
        'listType': 'playlist',
        'list': playlistId,
        'autoplay': 0,        // 1, video will automatically play when loaded
        'controls': 1,        // 1, display player controls like play, pause, and volume
        'rel': 0,             // 1, related videos will be shown at the end of a video playback
        'showinfo': 0,        // 1, display video information like video title and uploader's username
        'modestbranding': 1,  // 1, dont load youtube log
      },
    });
    players.push(player);
    player.addEventListener('play', function() {
      pauseOtherPlayers(this);
    });
  }
}

function pauseOtherPlayers(currentPlayer) {
  for (var i = 0; i < players.length; i++) {
    if (players[i] !== currentPlayer) {
      players[i].pauseVideo();
    }
  }
}


// // Buttons toggled onload
// $(document).ready(function () {
//   $("#collapse-main").trigger("click");
// });

// Buttons
$(document).ready(function () {
  $("#collapse-main").click(function () {
    $("main").slideToggle("slow");
  });
});

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