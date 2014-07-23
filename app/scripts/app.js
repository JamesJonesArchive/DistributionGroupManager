(function (window, angular, undefined) {
  'use strict';

/**
 * @ngdoc overview
 * @name distributionGroupManagerApp
 * @description
 * # distributionGroupManagerApp
 *
 * Main module of the application.
 */
  angular
    .module('distributionGroupManagerApp', [
      'ngAnimate',
      'ngCookies',
      'ngResource',
      'ngRoute',
      'ngSanitize',
      'ngTouch',
      'ui.bootstrap',
      'UsfCAStokenAuth'
    ])
    .constant('UsfCAStokenAuthConstant',{
      'applicationUniqueId': '7647b2d875a94093cbc99f6f2cbfda77',
      'applicationResources': {
          'distGroupMgr': 'https://dev.it.usf.edu/~james/PHP_distGroupMgr/distgroupmgr.php'
      }
    })
    .config(function ($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'views/main.html',
          controller: 'MainCtrl'
        })
        .when('/about', {
          templateUrl: 'views/about.html',
          controller: 'AboutCtrl'
        })
        .otherwise({
          redirectTo: '/'
        });
    });
})(window, window.angular);