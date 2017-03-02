angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
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

$urlRouterProvider.otherwise('/side-menu21/homePage')

  

});