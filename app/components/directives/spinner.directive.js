/// <reference path="../../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.directives')
	.directive('codexSpinner', spinnerDirective);
	
spinnerDirective.$inject = ['$timeout'];

function spinnerDirective($timeout) {
	return {
		restrict: 'E',
		templateUrl: 'components/directives/spinner.html',
		replace: true,
		scope: {
			active: '='
		},
		link: function(scope, el, attr, ctrl) {
			$timeout(function() {
				componentHandler.upgradeAllRegistered();
			});
		}
	};
}