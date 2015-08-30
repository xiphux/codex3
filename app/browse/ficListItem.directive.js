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
				var buttons = el[0].querySelectorAll('.mdl-js-button');
				for (var i = 0; i < buttons.length; i++) {
					componentHandler.upgradeElement(buttons[i], 'MaterialButton');
					componentHandler.upgradeElement(buttons[i], 'MaterialRipple');
				}
			});
		}
	};
}