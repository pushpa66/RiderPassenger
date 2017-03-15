angular.module('app')
  .controller('signupCtrl', ['$scope','$stateParams', '$http','$state',function ($scope, $stateParams, $http, $state) {

    $scope.data =
      {
        name:'pushpe',
        tel_number: '0772581053',
        email:'a@a.com',
        password:'123',
        user_type:'customer',
      };

    $scope.signup = function () {
      var url = 'http://127.0.0.1:8000/api/register?callback=JSON_CALLBACK';
      var parameter = $scope.data;
      alert(JSON.stringify(parameter));
      $http({
        url: url,
        method: "POST",
        params: parameter
      }).
      success(function(data, status, headers, config) {
        alert(data.result+ ' ' + data.message);

        if(data.result == 'success'){
          $state.go('menu.home');
        }
        console.log(data);
      }).
      error(function(data, status, headers, config) {
        alert( "failure message: " + JSON.stringify({data: data}));
      });
    }

  }]);
