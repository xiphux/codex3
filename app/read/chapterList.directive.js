/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.read')
	.directive('codexChapterList', chapterListDirective);

function chapterListDirective() {
	return {
		restrict: 'E',
		templateUrl: 'read/chapterList.html',
		replace: true,
		scope: {
			chapters: '=',
			currentChapter: '='
		}
	};
}