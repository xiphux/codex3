/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.read')

.filter('formatChapterContent', ['$sce', 'textFormatterService', function($sce, textFormatterService) {
	
	return function(chapter) {
		if (!chapter) {
			return '';
		}
		
		return $sce.trustAsHtml(textFormatterService.format(chapter.data, chapter.wrapped, chapter.no_paragraph_spacing, chapter.double_line_breaks));
	};
	
}]);