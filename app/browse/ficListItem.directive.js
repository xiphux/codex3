/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.browse')

.directive('codexFicListItem', function() {
	return {
		restrict: 'E',
		templateUrl: 'browse/ficListItem.html',
		controller: 'ficListItemController',
		controllerAs: 'fliCtrl',
		replace: true,
		scope: {
			fic: '='
		}
	};
});