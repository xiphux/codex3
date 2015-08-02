/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.browse')

.directive('codexFilterBarSeriesItem', function() {
	return {
		restrict: 'E',
		templateUrl: 'browse/filterBarSeriesItem.html',
		replace: true,
		controller: 'filterBarSeriesItemController',
		controllerAs: 'fbsiCtrl',
		scope: {
			series: '='
		}
	};
});