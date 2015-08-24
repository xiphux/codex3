/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.read')
	.directive('codexReaderFooterNav', readerFooterNavDirective);
	
readerFooterNavDirective.$inject = ['$timeout'];

function readerFooterNavDirective($timeout) {
	return {
		restrict: 'E',
		templateUrl: 'read/readerFooterNav.html',
		replace: true,
		controller: 'readerFooterNavController',
		controllerAs: 'rfnCtrl',
		scope: {},
		link: function(scope, el, attr, ctrl) {
			$timeout(function() {
				var buttons = el[0].querySelectorAll('.mdl-js-button');
				for (var i = 0; i < buttons.length; i++) {
					// upgradeElement doesn't support passing multiple classes
					componentHandler.upgradeElement(buttons[i], 'MaterialButton');
					componentHandler.upgradeElement(buttons[i], 'MaterialRipple');
				}
			});
		}
	};
}