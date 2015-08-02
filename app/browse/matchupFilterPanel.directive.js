/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.browse')
	.directive('codexMatchupFilterPanel', matchupFilterPanelDirective);

function matchupFilterPanelDirective() {
	return {
		restrict: 'E',
		templateUrl: 'browse/matchupFilterPanel.html',
		controller: 'matchupFilterPanelController',
		controllerAs: 'mfpCtrl',
		replace: true,
		scope: {}
	};
}