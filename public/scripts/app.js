'use strict';

angular
    .module('MyHikingDashboard', [
    'ui.router',
    'ngAnimate',
    'MyHikingDashboard.controllers',
    'MyHikingDashboard.services'
])
    .config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('/dashboard', '/dashboard/overview');
    $urlRouterProvider.otherwise('/login');

    $stateProvider
        .state('base', {
        abstract: true,
        url: '',
        templateUrl: 'partials/base.html',
        access: {
            requiresLogin: false
        }
    })
        .state('login', {
        url: '/login',
        parent: 'base',
        templateUrl: 'partials/login.html',
        controller: 'LoginCtrl',
        access: {
            requiresLogin: false
        }
    })
        .state('registration', {
        url: '/registration',
        parent: 'base',
        templateUrl: 'partials/registration.html',
        controller: 'RegistrationCtrl',
        access: {
            requiresLogin: false
        }
    })
        .state('dashboard', {
        url: '/dashboard',
        parent: 'base',
        templateUrl: 'partials/dashboard.html',
        controller: 'DashboardCtrl',
        access: {
            requiresLogin: true
        }
    })
        .state('overview', {
        url: '/overview',
        parent: 'dashboard',
        templateUrl: 'partials/dashboard/overview.html',
        access: {
            requiresLogin: true
        }
    }) .state('mapdata', {
        url: '/mapdata',
        parent: 'dashboard',
        templateUrl: 'partials/dashboard/mapdata.html',
        controller: 'MapDataCtrl',
        access: {
            requiresLogin: false
        }
    }) .state('map', {
        url: '/map',
        parent: 'dashboard',
        templateUrl: 'partials/dashboard/map.html',
        controller: 'MapCtrl',
        access: {
            requiresLogin: false
        }
    }) .state('checkpoints', {
        url: '/checkpoints',
        parent: 'dashboard',
        templateUrl: 'partials/dashboard/checkpoints.html',
        controller: 'CheckpointCtrl',
        access: {
            requiresLogin: false
        }
    }) .state('authorizations', {
        url: '/authorizations',
        parent: 'dashboard',
        templateUrl: 'partials/dashboard/authorization.html',
        controller: 'AuthorizationCtrl',
        access: {
            requiresLogin: false
        }
    })
        .state('reports', {
        url: '/reports',
        parent: 'dashboard',
        templateUrl: 'partials/dashboard/reports.html',
        access: {
            requiresLogin: true
        }
    });

}).run(function ($rootScope, $location) {
    $rootScope.$on("$stateChangeStart", function (event, next, current) {
        var requiresLogin = next.access.requiresLogin;
        
        if (requiresLogin && typeof $rootScope.currentUser === 'undefined') {
          event.preventDefault();
          $rootScope.$evalAsync(function() {
            $location.path('/login');
          });
        }
  });
});
