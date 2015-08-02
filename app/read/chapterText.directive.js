/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.read')

.directive('codexChapterText', function() {
	return {
		restrict: 'E',
		templateUrl: 'read/chapterText.html',
		replace: true,
		scope: {
			chapter: '='
		}
	};
});