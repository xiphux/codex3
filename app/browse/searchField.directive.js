/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.browse')
	.directive('codexSearchField', searchFieldDirective);

function searchFieldDirective() {
	return {
		restrict: 'E',
		templateUrl: 'browse/searchField.html',
		replace: true,
		controller: 'searchFieldController',
		controllerAs: 'sfCtrl',
		scope: {}
	};
}