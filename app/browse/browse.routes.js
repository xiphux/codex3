/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.browse')
	.config(browseRoutes);
	
browseRoutes.$inject = ['$routeProvider'];

function browseRoutes($routeProvider) {
	$routeProvider.when('/', {
		templateUrl: 'browse/browse.html',
		controller: 'browseController'
	});
}