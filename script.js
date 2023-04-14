// Load the YouTube iframe API script
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Load YouTube iframe players
var currentVideoPlayer = null;
var videoPlayers = [];
function onYouTubeIframeAPIReady() {
  var playerContainers = document.getElementsByClassName('youtubePlayer');
  for (var i = 0; i < playerContainers.length; i++) {
    var youtubeId = playerContainers[i].getAttribute('data-id');
    var player = new YT.Player(playerContainers[i], {
      height: '315',
      width: '560',
      playerVars: {
        // see: https://developers.google.com/youtube/player_parameters
        'listType': 'playlist',
        'list': youtubeId,
        'loading': 'lazy',
        'frameborder': 0,
        'playsinline': 1,
        'allowfullscreen': 1,
        'autoplay': 0,
        'controls': 1,
        'rel': 0,
        'showinfo': 0,
        'modestbranding': 1,
      },
    });
    videoPlayers.push(player);

    player.addEventListener('onStateChange', function (event) {
      // Stop currently playing video when new video is started.
      if (event.data === YT.PlayerState.PLAYING) {
        if (currentVideoPlayer !== null && currentVideoPlayer !== event.target) {
          currentVideoPlayer.pauseVideo();
        }
        currentVideoPlayer = event.target;
        // Play next video when current playing video ends.
      } else if (event.data === YT.PlayerState.ENDED) {
        var index = videoPlayers.indexOf(event.target);
        if (index < videoPlayers.length - 1) {
          videoPlayers[index + 1].playVideo();
        }
      }
    });
  }
}


// Buttons
$(document).ready(function () {
  // Trigger click on page load
  $("#collapse-main").trigger("click");
  $("#collapse-main").click(function () {
    $(this).toggleClass('inverted');
    $("main").slideToggle("slow");
  });
});

$(document).ready(function () {
  $("#sort-artist-button").click(function () {
    $(this).toggleClass('inverted');
    var posts = $("#posts").children("article");
    posts.sort(function (a, b) {
      var artistA = $(a).find("header h3:contains('By')").text().trim().split(": ").pop().toUpperCase();
      var artistB = $(b).find("header h3:contains('By')").text().trim().split(": ").pop().toUpperCase();
      if (artistA < artistB) {
        return -1;
      }
      if (artistA > artistB) {
        return 1;
      }
      return 0;
    });
    $("#posts").empty().append(posts);
  });
});

$(document).ready(function () {
  $("#sort-year-button").click(function () {
    $(this).toggleClass('inverted');
    var posts = $("#posts").children("article");
    posts.sort(function (a, b) {
      var yearA = $(a).find("header h3:contains('Released:')").text().trim().split(" ").pop();
      var yearB = $(b).find("header h3:contains('Released:')").text().trim().split(" ").pop();
      return yearA - yearB;
    });
    $("#posts").empty().append(posts);
  });
});