/// <reference path="../../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.filters')

.filter('chapter', function() {
	return function(chapter) {
		if (!chapter || !(chapter.title || chapter.number)) {
			return '';
		}
		return chapter.title || ('Chapter ' + chapter.number);
	};
});