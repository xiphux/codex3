/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.browse')
	.directive('codexMatchupFilterPanelItem', matchupFilterPanelItemDirective);

function matchupFilterPanelItemDirective() {
	return {
		restrict: 'E',
		templateUrl: 'browse/matchupFilterPanelItem.html',
		controller: 'matchupFilterPanelItemController',
		controllerAs: 'mfpiCtrl',
		replace: true,
		scope: {
			matchup: '='
		}
	};
}