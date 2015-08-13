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
				componentHandler.upgradeAllRegistered();
			});
		}
	};
}