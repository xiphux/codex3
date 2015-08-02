/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.browse')

.directive('codexGenreFilterPanelItem', function() {
	return {
		restrict: 'E',
		templateUrl: 'browse/genreFilterPanelItem.html',
		controller: 'genreFilterPanelItemController',
		controllerAs: 'gfpiCtrl',
		replace: true,
		scope: {
			genre: '='
		}
	};
});