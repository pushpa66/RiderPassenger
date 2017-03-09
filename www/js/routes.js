angular.module('app')

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('menu.home', {
    url: '/homePage',
    views: {
      'side-menu21': {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
        }
      }
    })

    .state('menu.telNumber', {
      url: '/telNumberPage',
      views: {
        'side-menu21': {
          templateUrl: 'templates/telNumber.html',
          controller: 'telNumberCtrl'
        }
      }
    })

    .state('menu.profile', {
      url: '/profilePage',
      views: {
        'side-menu21': {
          templateUrl: 'templates/profile.html',
          controller: 'profileCtrl'
        }
      }
    })

    .state('menu.myTrips', {
      url: '/myTripsPage',
      views: {
        'side-menu21': {
          templateUrl: 'templates/myTrips.html',
          controller: 'myTripsCtrl'
        }
      }
    })

    .state('menu.promotions', {
      url: '/promotionsPage',
      views: {
        'side-menu21': {
          templateUrl: 'templates/promotions.html',
          controller: 'promotionsCtrl'
        }
      }
    })

    .state('menu.payment', {
      url: '/paymentPage',
      views: {
        'side-menu21': {
          templateUrl: 'templates/payment.html',
          controller: 'paymentCtrl'
        }
      }
    })

    .state('menu.aboutUs', {
      url: '/abotUsPage',
      views: {
        'side-menu21': {
          templateUrl: 'templates/aboutUs.html',
          controller: 'aboutUsCtrl'
        }
      }
    })

    .state('menu.support', {
      url: '/supportPage',
      views: {
        'side-menu21': {
          templateUrl: 'templates/support.html',
          controller: 'supportCtrl'
        }
      }
    })

    .state('menu', {
      url: '/side-menu21',
      templateUrl: 'templates/menu.html',
      controller: 'menuCtrl'
    })

    .state('welcomePage1', {
      url: '/welcomePage1',
      templateUrl: 'templates/welcomePage1.html',
      controller: 'welcomePage1Ctrl'
    })

    .state('welcomePage2', {
      url: '/welcomePage2',
      templateUrl: 'templates/welcomePage2.html',
      controller: 'welcomePage2Ctrl'
    })

    .state('signup', {
      url: '/signUpPage',
      templateUrl: 'templates/signup.html',
      controller: 'signupCtrl'
    })

    .state('login', {
      url: '/loginPage',
      templateUrl: 'templates/login.html',
      controller: 'loginCtrl'
    })

  $urlRouterProvider.otherwise('/welcomePage1')

});
