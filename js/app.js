var app = angular.module("JwVideo",[]);

app.controller("HomeController", function($scope, $timeout, JwInfos){

  function Video(vid) {

    this.init = function() {
      var options = {
        width: 800,
        height: 500,
        controls: false,
        autoplay: true
      };

      var video = videojs(vid, options, function() {  });

      video.ready(function(){
        video.on("play", function(){
          console.log("play");
        });

        video.on("pause", function(){
          console.log("pause");
        });

        video.on("error", function(){
          console.log("error");
        });

        video.on("progress", function(){
          console.log(video.currentTime());
        });
      });

      video.jwPlay = function(src) {
        video.pause();
        video.src([src]);
        video.play();
      };

      return video;
    };

  }

  $('document').ready(function() {
    //playVideo("sV1I4X7nKxk");
    //getPlaylistItems();
  });

  function playVideo(id){

    var source = "//www.youtube.com/embed/[id]?autoplay=1&showinfo=0&controls=0&rel=0";
    source = source.replace("[id]", id);

    $(".frame").attr("src", source);

  }

  angular.element(document).ready(function(){
     $timeout(function(){
       getPlaylistItems();
     }, 2000);

    //$scope.video = new Video("#video").init();

  });

  function getPlaylistItems() {

    var playlists = JwInfos.playlistIds;
    JwInfos.getPlaylistItems(playlists[1], function(items){
      items.forEach(function(item){
        $scope.playlistItems.push(item.snippet);
        $scope.$apply();
        console.log(item.snippet);
      });

      var size = $scope.playlistItems.length;
      var random = Math.floor(Math.random() * size);
      var item = $scope.playlistItems[random];

      playVideo(item.resourceId.videoId);
    });
  }

  $scope.playlistItems = [];
  $scope.video = null;
  $scope.showMenu = true;

  $scope.playVideoItem = function(item) {
    playVideo(item.resourceId.videoId);
  };

  $scope.log = function(){
    var video = $scope.video;
    var src = {
      src: "videos/acapella.mp4",
      type: "video/mp4"
    };
    video.jwPlay(src);
  };

});

app.factory("JwInfos", function(){

  var playlistIds = [
    "PLMTXvluY8tglwqklnQOFufRXBRacwjjx1",
    "PLMTXvluY8tgn4aOhiF62P1ikPNyUaOgH8"
  ];

  function getPlaylistItems(playlistId, callback) {
    var request = gapi.client.youtube.playlistItems.list({
      part: "snippet",
      playlistId: playlistId,
      maxResults:50
    });

    request.execute(function(response){
      callback(response.items);
    });
  }

  return {
    getPlaylistItems: getPlaylistItems,
    playlistIds: playlistIds
  };

});

function handleClientLoad() {
  var apiKey = "AIzaSyAEcDCDikB57LDpVZTEm4r3NuO8AgMD-B4";
  gapi.client.setApiKey(apiKey);
  gapi.client.load("youtube", "v3", function() {

  });

  setTimeout(function(){

  }, 1);
}

