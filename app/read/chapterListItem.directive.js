/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.read')
	.directive('codexChapterListItem', chapterListItemDirective);

function chapterListItemDirective() {
	return {
		restrict: 'E',
		templateUrl: 'read/chapterListItem.html',
		replace: true,
		controller: 'chapterListItemController',
		controllerAs: 'cliCtrl',
		scope: {
			chapter: '=',
			currentChapter: '='
		}
	};
}