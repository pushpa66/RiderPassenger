
angular.module('app')
  .factory('Markers', function($http) {

    var markers = [];

    return {
      getMarkers: function(){

        return $http.get("http://example.com/markers.php").then(function(response){
          markers = response;
          return markers;
        });
      }
    }
  });
