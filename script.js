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

// Player
$(document).ready(function () {
  let currentPlayer = null;

  // *** GLOBAL DEBUG FLAG ***
  const DEBUG_MODE = true;

  // Helper to get a user-friendly player state name
  function getPlayerStateName(state) {
    const stateNames = {
      [YT.PlayerState.UNSTARTED]: 'Unstarted',
      [YT.PlayerState.ENDED]: 'Ended',
      [YT.PlayerState.PLAYING]: 'Playing',
      [YT.PlayerState.PAUSED]: 'Paused',
      [YT.PlayerState.BUFFERING]: 'Buffering',
      [YT.PlayerState.CUED]: 'Cued'
    };
    return stateNames[state] || 'Unknown';
  }

  // Helper for conditional debug logging
  function debugLog(...args) {
    if (DEBUG_MODE) {
      console.log(...args);
    }
  }

  $('.playerContainer').each(function () {
    const playerContainer = this;
    const player = playerContainer.querySelector('lite-youtube');

    player.addEventListener('liteYoutubeIframeLoaded', function () {
      const iframe = player.shadowRoot.querySelector('iframe');
      const ytPlayer = new YT.Player(iframe, {
        events: {
          // Combined onStateChange Handler 
          'onStateChange': function (event) {
            // Pause Other Players on Play Logic
            if (event.data === YT.PlayerState.PLAYING) {
              if (currentPlayer && currentPlayer !== ytPlayer) {
                currentPlayer.pauseVideo();
              }
              currentPlayer = ytPlayer;
            } else if (event.data === YT.PlayerState.PAUSED && currentPlayer === ytPlayer) {
              currentPlayer = null;
            }
            // State Change Logging 
            debugLog(`Video State Change: [${player.videoId}] ${getPlayerStateName(event.data)}`);
          },
          // Other Event Listeners 
          'onVolumeChange': function (event) {
            debugLog(`Volume Change: [${player.videoId}] ${event.data.volume}% (muted: ${event.data.muted})`);
          },
          'onPlaybackQualityChange': function (event) {
            debugLog(`Quality Change: [${player.videoId}] ${event.data}`);
          },
          'onPlaybackRateChange': function (event) {
            debugLog(`Rate Change: [${player.videoId}] ${event.data}`);
          }
        }
      });
    });
  });
});
