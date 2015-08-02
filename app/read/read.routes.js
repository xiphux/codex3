/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.read')

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/read/:ficId', {
		redirectTo: function(routeParams, path, search) {
			return '/read/' + routeParams.ficId + '/chapters/1';
		}
	})
	.when('/read/:ficId/chapters/:chapterNum', {
		templateUrl: 'read/read.html',
		controller: 'readController',
		controllerAs: 'rCtrl'
	});
}]);