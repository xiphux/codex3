/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.browse')

.directive('codexFicList', ficListDirective);

function ficListDirective() {
	return {
		restrict: 'E',
		templateUrl: 'browse/ficList.html',
		controller: 'ficListController',
		controllerAs: 'flCtrl',
		replace: true,
		scope: {}
	};
}