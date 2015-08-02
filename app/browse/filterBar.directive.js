/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.browse')
	.directive('codexFilterBar', filterBarDirective);

function filterBarDirective() {
	return {
		restrict: 'E',
		templateUrl: 'browse/filterBar.html',
		replace: true,
		controller: 'filterBarController',
		controllerAs: 'fbCtrl',
		scope: {}
	};
}