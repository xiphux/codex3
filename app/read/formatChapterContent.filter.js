/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.read')
	.filter('formatChapterContent', formatChapterContentFilter);

formatChapterContentFilter.$inject = ['$sce', 'textFormatterService'];

function formatChapterContentFilter($sce, textFormatterService) {
	
	return function(chapter) {
		if (!chapter) {
			return chapter;
		}
		
		return $sce.trustAsHtml(textFormatterService.format(chapter.data, chapter.wrapped, chapter.no_paragraph_spacing, chapter.double_line_breaks));
	};
	
}