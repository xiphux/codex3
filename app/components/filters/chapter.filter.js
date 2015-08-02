/// <reference path="../../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.filters')
	.filter('chapter', chapterFilter);

function chapterFilter() {
	return function(chapter) {
		if (!chapter || !(chapter.title || chapter.number)) {
			return '';
		}
		return chapter.title || ('Chapter ' + chapter.number);
	};
}