/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.browse')
	.directive('codexFilterBarGenreItem', filterBarGenreItemDirective);

function filterBarGenreItemDirective() {
	return {
		restrict: 'E',
		templateUrl: 'browse/filterBarGenreItem.html',
		replace: true,
		controller: 'filterBarGenreItemController',
		controllerAs: 'fbgiCtrl',
		scope: {
			genre: '='
		}
	};
}