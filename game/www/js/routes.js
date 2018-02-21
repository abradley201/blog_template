angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider



      .state('menu.home', {
    url: '/home',
    views: {
      'side-menu21': {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
      }
    }
  })

  .state('menu.setup', {
    url: '/setup',
    views: {
      'side-menu21': {
        templateUrl: 'templates/setup.html',
        controller: 'setupCtrl'
      }
    }
  })

  .state('circles', {
    url: '/circles',
    templateUrl: 'templates/circles.html',
    controller: 'circlesCtrl',
    cache: false,
    reload: true
  })

  .state('devs', {
    url: '/devs',
    templateUrl: 'templates/developers.html',
    controller: 'devsCtrl'

  })


  .state('setup_circle_page', {
    url: '/setup_circle_page',
    templateUrl: 'templates/setup_circles.html',
    controller: 'setupCtrl_c'

  })

  .state('setup_horizontal_page', {
    url: '/setup_horizontal_page',
    templateUrl: 'templates/setup_horizontal.html',
    controller: 'setupCtrl'

  })


  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl'
  })


  .state('horizontal', {
    url : '/horizontal',
    templateUrl: 'templates/horizontal.html',
    controller: 'horizontalCtrl',
    cache: false,
    reload: true
  })



$urlRouterProvider.otherwise('/side-menu21/home')



});
