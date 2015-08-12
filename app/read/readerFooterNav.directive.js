/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.read')
	.directive('codexReaderFooterNav', readerFooterNavDirective);

function readerFooterNavDirective() {
	return {
		restrict: 'E',
		templateUrl: 'read/readerFooterNav.html',
		replace: true,
		controller: 'readerFooterNavController',
		controllerAs: 'rfnCtrl',
		scope: {}
	};
}