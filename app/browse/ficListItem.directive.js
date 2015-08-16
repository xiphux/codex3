/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.browse')
	.directive('codexFicListItem', ficListItemDirective);
	
ficListItemDirective.$inject = ['$timeout'];

function ficListItemDirective($timeout) {
	return {
		restrict: 'E',
		templateUrl: 'browse/ficListItem.html',
		controller: 'ficListItemController',
		controllerAs: 'fliCtrl',
		replace: true,
		scope: {
			fic: '='
		},
		bindToController: true,
		link: function(scope, el, attr, ctrl) {
			$timeout(function() {
				// upgradeElement doesn't support passing multiple classes
				componentHandler.upgradeElement(el[0].querySelector('.mdl-js-button'));
			});
		}
	};
}