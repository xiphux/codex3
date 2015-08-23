/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.read')
	.config(readRoutes);

readRoutes.$inject = ['$routeProvider'];

function readRoutes($routeProvider) {
	$routeProvider.when('/read/:ficId', {
		redirectTo: function(routeParams, path, search) {
			return '/read/' + routeParams.ficId + '/chapters/1';
		}
	})
	.when('/read/:ficId/chapters/:chapterNum', {
		templateUrl: 'read/read.html',
		controller: 'readController',
		controllerAs: 'rCtrl',
		resolve: {
			chapter: readRouteChapterResolve
		}
	});
}

readRouteChapterResolve.$inject = ['$route', 'readService', '$location'];

function readRouteChapterResolve($route, readService, $location) {
	if (!$route.skipResolve) {
		if (!readService.setFic($route.current.params.ficId, $route.current.params.chapterNum)) {
			$location.path('/');
			return false;
		}
	}
	return readService.getChapter().$promise.catch(function() {
		$location.path('/');
	});
}