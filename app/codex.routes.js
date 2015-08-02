'use strict';

angular.module('codex')
  .config(codexRoutes);

codexRoutes.$inject = ['$routeProvider'];

function codexRoutes($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/'});
}