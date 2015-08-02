/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.browse')

.directive('codexGenreFilterPanel', function() {
	return {
		restrict: 'E',
		templateUrl: 'browse/genreFilterPanel.html',
		controller: 'genreFilterPanelController',
		controllerAs: 'gfpCtrl',
		replace: true,
		scope: {}
	};
});