/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.browse')

.directive('codexFicList', ficListDirective);

ficListDirective.$inject = ['$timeout'];

function ficListDirective($timeout) {
	return {
		restrict: 'E',
		templateUrl: 'browse/ficList.html',
		controller: 'ficListController',
		controllerAs: 'flCtrl',
		replace: true,
		scope: {},
		link: function(scope, el, attr, ctrl) {
			$timeout(function() {
				componentHandler.upgradeAllRegistered();
			});
		}
	};
}