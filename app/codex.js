/// <reference path="../typings/angularjs/angular.d.ts"/>
'use strict';

// Declare app level module which depends on views, and components
angular.module('codex', [
  'ngRoute',
  'codex.browse',
  'codex.read'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/'});
}]);
