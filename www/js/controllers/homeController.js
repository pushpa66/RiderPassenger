
angular.module('app')
.controller('homeCtrl', ['$scope','$state','$ionicLoading','$cordovaGeolocation','GoogleMaps',
  function($scope, $state, $ionicLoading, $cordovaGeolocation, GoogleMaps) {

  $scope.apikey = 'AIzaSyCGT-8Du3SwJCfdC7aNFqPheR_WTEv_dX0';
  $scope.init = function () {
    GoogleMaps.init($scope.apikey);
  };
  $scope.centerOnMe = function () {
    GoogleMaps.centerOnMe();
  };

  // var options = {timeout: 10000, enableHighAccuracy: true};
  //
  // $scope.initialize = function () {
  //   $cordovaGeolocation.getCurrentPosition(options).then(function(position){
  //
  //     var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  //
  //     var mapOptions = {
  //       center: latLng,
  //       zoom: 15,
  //       mapTypeId: google.maps.MapTypeId.ROADMAP
  //     };
  //
  //     $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
  //
  //     //Wait until the map is loaded
  //     google.maps.event.addListenerOnce($scope.map, 'idle', function(){
  //
  //       var marker = new google.maps.Marker({
  //         map: $scope.map,
  //         animation: google.maps.Animation.DROP,
  //         position: latLng
  //       });
  //
  //       var infoWindow = new google.maps.InfoWindow({
  //         content: "Here I am!"
  //       });
  //
  //       google.maps.event.addListener(marker, 'click', function () {
  //         infoWindow.open($scope.map, marker);
  //       });
  //
  //     });
  //   }, function(error){
  //     console.log("Could not get location");
  //   });
  // };
  //
  // $scope.show = function() {
  //   $ionicLoading.show({
  //     duration: 3000,
  //     animation: 'fade-in',
  //     showBackdrop: true,
  //     maxWidth: 200
  //   }).then(function(){
  //     console.log("The loading indicator is now displayed");
  //   });
  // };
  //
  // $scope.hide = function(){
  //   $ionicLoading.hide().then(function(){
  //     console.log("The loading indicator is now hidden");
  //   });
  // };
  //
  //
  // $scope.centerOnMe = function() {
  //   if(!$scope.map) {
  //     return;
  //   }
  //
  //   $scope.show();
  //   $cordovaGeolocation.getCurrentPosition(options).then(function(position){
  //     $scope.map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
  //     $scope.hide();
  //   }, function(error) {
  //     console.log('Unable to get location: ' + error.message);
  //   });
  // };
  //
  // $scope.clickTest = function() {
  //   alert('Example of infowindow with ng-click');
  // };
}]);
