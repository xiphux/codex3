/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.browse')
	.directive('codexFilterBarMatchupItem', filterBarMatchupItemDirective);

function filterBarMatchupItemDirective() {
	return {
		restrict: 'E',
		templateUrl: 'browse/filterBarMatchupItem.html',
		replace: true,
		controller: 'filterBarMatchupItemController',
		controllerAs: 'fbmiCtrl',
		scope: {
			matchup: '='
		},
		bindToController: true
	};
}