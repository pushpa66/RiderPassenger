
angular.module('app')

  .factory('GoogleMaps',
    function($cordovaGeolocation, $ionicLoading, $rootScope, $cordovaNetwork, Markers, ConnectivityMonitor){

    var markerCache = [];
    var apiKey = false;
    var map = null;
    var options = null;

    function initMap(){

      options = {timeout: 10000, enableHighAccuracy: true};

      $cordovaGeolocation.getCurrentPosition(options)
        .then(function(position){

          var latLng = new google.maps.LatLng(position.coords.latitude,
            position.coords.longitude);

          var mapOptions = {
            center: latLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };

          map = new google.maps.Map(document.getElementById("map"),
            mapOptions);

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

            /**
            loadMarkers();
            //Reload markers every time the map moves
            google.maps.event.addListener(map, 'dragend', function(){
              console.log("moved!");
              loadMarkers();
            });

            //Reload markers every time the zoom changes
            google.maps.event.addListener(map, 'zoom_changed', function(){
              console.log("zoomed!");
              loadMarkers();
            });
            **/
            enableMap();

          });

        }, function(error){
          console.log("Could not get location "+error.message);
        });

    }

    function enableMap(){
      $ionicLoading.hide();
    }

    function disableMap(){
      $ionicLoading.show({
        template: 'You must be connected to the Internet to view this map.'
      });
    }

    function loadGoogleMaps(){

      $ionicLoading.show({
        template: 'Loading Google Maps'
      });

      //This function will be called once the SDK has been loaded
      window.mapInit = function(){
        initMap();
      };

      //Create a script element to insert into the page
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.id = "googleMaps";

      //Note the callback function in the URL is the one we created above
      if(apiKey){

        // script.src = 'https://maps.googleapis.com/maps/api/js?key=' + apiKey +'&sensor=true&callback=mapInit';
        script.src = SERVER.url+'key=' + apiKey +'&sensor=true&callback=mapInit';

      }
      else {
        // script.src = 'https://maps.googleapis.com/maps/api/js?sensor=true&callback=mapInit';
        script.src = SERVER.url+'sensor=true&callback=mapInit';
      }

      document.body.appendChild(script);

    }

    function checkLoaded(){
      if(typeof google == "undefined" || typeof google.maps == "undefined"){
        loadGoogleMaps();
      } else {
        enableMap();
      }
    }

    function loadMarkers(){

      var center = map.getCenter();
      var bounds = map.getBounds();
      var zoom = map.getZoom();

      //Convert objects returned by Google to be more readable
      var centerNorm = {
        lat: center.lat(),
        lng: center.lng()
      };

      var boundsNorm = {
        northeast: {
          lat: bounds.getNorthEast().lat(),
          lng: bounds.getNorthEast().lng()
        },
        southwest: {
          lat: bounds.getSouthWest().lat(),
          lng: bounds.getSouthWest().lng()
        }
      };

      var boundingRadius = getBoundingRadius(centerNorm, boundsNorm);

      var params = {
        "centre": centerNorm,
        "bounds": boundsNorm,
        "zoom": zoom,
        "boundingRadius": boundingRadius
      };

      var markers = Markers.getMarkers(params).then(function(markers){
        console.log("Markers: ", markers);
        var records = markers.data.result;

        for (var i = 0; i < records.length; i++) {

          var record = records[i];

          // Check if the marker has already been added
          if (!markerExists(record.lat, record.lng)) {

            var markerPos = new google.maps.LatLng(record.lng, record.lat);
            // add the marker
            var marker = new google.maps.Marker({
              map: map,
              animation: google.maps.Animation.DROP,
              position: markerPos
            });

            // Add the marker to the markerCache so we know not to add it again later
            var markerData = {
              lat: record.lat,
              lng: record.lng,
              marker: marker
            };

            markerCache.push(markerData);

            var infoWindowContent = "<h4>" + record.name + "</h4>";

            addInfoWindow(marker, infoWindowContent, record);
          }

        }

      });
    }

    function markerExists(lat, lng){
      var exists = false;
      var cache = markerCache;
      for(var i = 0; i < cache.length; i++){
        if(cache[i].lat === lat && cache[i].lng === lng){
          exists = true;
        }
      }

      return exists;
    }

    function getBoundingRadius(center, bounds){
      return getDistanceBetweenPoints(center, bounds.northeast, 'miles');
    }

    function getDistanceBetweenPoints(pos1, pos2, units){

      var earthRadius = {
        miles: 3958.8,
        km: 6371
      };

      var R = earthRadius[units || 'miles'];
      var lat1 = pos1.lat;
      var lon1 = pos1.lng;
      var lat2 = pos2.lat;
      var lon2 = pos2.lng;

      var dLat = toRad((lat2 - lat1));
      var dLon = toRad((lon2 - lon1));
      var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c;

      return d;

    }

    function toRad(x){
      return x * Math.PI / 180;
    }

    function addInfoWindow(marker, message, record) {

      var infoWindow = new google.maps.InfoWindow({
        content: message
      });

      google.maps.event.addListener(marker, 'click', function () {
        infoWindow.open(map, marker);
      });

    }

    function addConnectivityListeners(){

      if(ionic.Platform.isWebView()){

        // Check if the map is already loaded when the user comes online,
        //if not, load it
        $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
          checkLoaded();
        });

        // Disable the map when the user goes offline
        $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
          disableMap();
        });

      }
      else {

        //Same as above but for when we are not running on a device
        window.addEventListener("online", function(e) {
          checkLoaded();
        }, false);

        window.addEventListener("offline", function(e) {
          disableMap();
        }, false);
      }

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
      init: function(key){

        if(typeof key != "undefined"){
          apiKey = key;
        }

        if(typeof google == "undefined" || typeof google.maps == "undefined"){

          console.warn("Google Maps SDK needs to be loaded");

          disableMap();

          if(ConnectivityMonitor.isOnline()){
            loadGoogleMaps();
          }
        }
        else {
          if(ConnectivityMonitor.isOnline()){
            initMap();
            enableMap();
          } else {
            disableMap();
          }
        }

        addConnectivityListeners();
      },
      centerOnMe: function () {
        centerOnMe();
      }
    }

  });
