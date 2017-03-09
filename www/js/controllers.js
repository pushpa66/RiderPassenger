angular.module('app')

  .controller('homeCtrl', ['$scope', '$compile', '$ionicLoading', '$stateParams',function ($scope, $compile, $ionicLoading, $stateParams) {

    var marker;

    $scope.initialize = function() {

      navigator.geolocation.getCurrentPosition(function (pos) {

        $scope.myLatlng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);

        console.log(pos.coords.latitude+" "+pos.coords.longitude);

        var mapOptions = {
          center: $scope.myLatlng,
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map(document.getElementById("map"), mapOptions);

        var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
        var compiled = $compile(contentString)($scope);

        var infowindow = new google.maps.InfoWindow({
          content: compiled[0]
        });

        marker = new google.maps.Marker({
          position: $scope.myLatlng,
          map: map,
          title: 'You are here',
          animation: google.maps.Animation.DROP
        });

        google.maps.event.addListener(marker, 'click', function () {
          infowindow.open(map, marker);
        });

        $scope.map = map;

      }, function (error) {
        console.log('Unable to get location: ' + error.message);
      });
    };

    //google.maps.event.addDomListener(window, 'load', $scope.initialize);
    $scope.show = function() {
      $ionicLoading.show({
        duration: 3000,
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200
      }).then(function(){
        console.log("The loading indicator is now displayed");
      });
    };

    $scope.hide = function(){
      $ionicLoading.hide().then(function(){
        console.log("The loading indicator is now hidden");
      });
    };

    $scope.centerOnMe = function() {
      if(!$scope.map) {
        return;
      }

      $scope.show();
      navigator.geolocation.getCurrentPosition(function(pos) {
        $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
        $scope.hide();
      }, function(error) {
        console.log('Unable to get location: ' + error.message);
      });
    };

    $scope.clickTest = function() {
      alert('Example of infowindow with ng-click');
    };

  }])

.controller('telNumberCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('profileCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {

}])

.controller('myTripsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('promotionsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('paymentCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('aboutUsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('supportCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('menuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('welcomePage1Ctrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('welcomePage2Ctrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('signupCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('loginCtrl', ['$scope','$stateParams', '$http',function ($scope, $stateParams, $http) {

  $scope.data =
    {
      tel_number: '0778258142',
      user_type:'customer',
      success: false
    };

  $scope.login = function () {
    alert($scope.data.tel_number);
  };
  $scope.logi = function ($scope, $http) {
    var dataObject = {
      tel_number: $scope.tel_number,
      password: $scope.password,
      user_type :$scope.user_type
    };
    var res = $http.post('http://127.0.0.1:8000/api/login', dataObject);
    res.success(function(data, status, headers, config) {
      $scope.message = data;
    });
    res.error(function(data, status, headers, config) {
      alert( "failure message: " + JSON.stringify({data: data}));
    });
    $scope.tel_number='';
    $scope.password='';
  }

}]);
