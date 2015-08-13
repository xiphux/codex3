/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.browse')
	.directive('codexSearchField', searchFieldDirective);
	
searchFieldDirective.$inject = ['$timeout'];

function searchFieldDirective($timeout) {
	return {
		restrict: 'E',
		templateUrl: 'browse/searchField.html',
		replace: true,
		controller: 'searchFieldController',
		controllerAs: 'sfCtrl',
		scope: {},
		link: function(scope, el, attr, ctrl) {
			$timeout(function() {
				componentHandler.upgradeAllRegistered();
			});
		}
	};
}