/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.browse')
	.directive('codexFicListSplash', ficListSplashDirective);

function ficListSplashDirective() {
	return {
		restrict: 'E',
		templateUrl: 'browse/ficListSplash.html',
		replace: true,
		scope: {}
	};
}