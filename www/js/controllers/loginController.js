angular.module('app')

  .controller('loginCtrl', ['$scope','$stateParams', '$http','$state',function ($scope, $stateParams, $http, $state) {


    $scope.data =
      {
        tel_number: '0778258142',
        password:'123',
        user_type:'customer',
        success: false
      };

    $scope.login = function () {
      var url = 'http://127.0.0.1:8000/api/login?callback=JSON_CALLBACK';
      var parameter = {
        tel_number: $scope.data.tel_number,
        password: $scope.data.password,
        user_type :$scope.data.user_type
      };
      //alert(JSON.stringify(parameter));
      $http({
        url: url,
        method: "POST",
        params: parameter
      }).
      success(function(data, status, headers, config) {
        $scope.message = data.message;

        alert(data.result+ ' ' + data.message);

        if(data.result == 'success'){
          $state.go('menu.home');
        }
        console.log(data);
      }).
      error(function(data, status, headers, config) {
        alert( "failure message: " + JSON.stringify({data: data}));
      });
      $scope.tel_number='';
      $scope.password='';
    }

  }]);
