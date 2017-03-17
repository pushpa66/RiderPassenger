
angular.module('app')

  .factory('GoogleMaps', function($cordovaGeolocation,$ionicLoading,Markers){

    var apiKey = false;
    var map = null;
    var options = null;

    function initMap(){

      options = {timeout: 10000, enableHighAccuracy: true};

      $cordovaGeolocation.getCurrentPosition(options).then(function(position){

        var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        var mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(document.getElementById("map"), mapOptions);

        //Wait until the map is loaded
        google.maps.event.addListenerOnce(map, 'idle', function(){

          var marker = new google.maps.Marker({
            map: map,
            animation: google.maps.Animation.DROP,
            position: latLng
          });

          var infoWindow = new google.maps.InfoWindow({
            content: "Here I am!"
          });

          google.maps.event.addListener(marker, 'click', function () {
            infoWindow.open(map, marker);
          });

          //Load the markers
          // loadMarkers();

        });

      }, function(error){
        console.log("Could not get location");

        //Load the markers
        // loadMarkers();
      });

    }

    function loadMarkers(){

      //Get all of the markers from our Markers factory
      Markers.getMarkers().then(function(markers){

        console.log("Markers: ", markers);

        var records = markers.data.result;

        for (var i = 0; i < records.length; i++) {

          var record = records[i];
          var markerPos = new google.maps.LatLng(record.lat, record.lng);

          // Add the markerto the map
          var marker = new google.maps.Marker({
            map: map,
            animation: google.maps.Animation.DROP,
            position: markerPos
          });

          var infoWindowContent = "<h4>" + record.name + "</h4>";

          addInfoWindow(marker, infoWindowContent, record);

        }

      });

    }

    function addInfoWindow(marker, message, record) {

      var infoWindow = new google.maps.InfoWindow({
        content: message
      });

      google.maps.event.addListener(marker, 'click', function () {
        infoWindow.open(map, marker);
      });

    }

    function show() {
      $ionicLoading.show({
        duration: 3000,
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200
      }).then(function(){
        console.log("The loading indicator is now displayed");
      });
    }

    function hide(){
      $ionicLoading.hide().then(function(){
        console.log("The loading indicator is now hidden");
      });
    }

    function centerOnMe() {
      if(!map) {
        return;
      }
      show();
      $cordovaGeolocation.getCurrentPosition(options).then(function(position){
        map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
        hide();
      }, function(error) {
        console.log('Unable to get location: ' + error.message);
      });
    }
    return {
      init: function(){
        initMap();
      },
      centerOnMe: function () {
        centerOnMe();
      }
    };


  });
