/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.browse')

.directive('codexSeriesFilterPanelItem', function() {
	return {
		restrict: 'E',
		templateUrl: 'browse/seriesFilterPanelItem.html',
		controller: 'seriesFilterPanelItemController',
		controllerAs: 'sfpiCtrl',
		replace: true,
		scope: {
			series: '='
		}
	};
});