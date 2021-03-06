/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.browse')
	.directive('codexSeriesFilterPanel', seriesFilterPanelDirective);

function seriesFilterPanelDirective() {
	return {
		restrict: 'E',
		templateUrl: 'browse/seriesFilterPanel.html',
		controller: 'seriesFilterPanelController',
		controllerAs: 'sfpCtrl',
		replace: true,
		scope: {}
	};
}