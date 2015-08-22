'use strict';

describe('codex.read module', function() {
	
	beforeEach(angular.mock.module('codex.read'));
	
	describe('format chapter content filter', function() {
		
		var formatChapterContent, text, sceText, mockTextFormatterService, mockSce;
		
		beforeEach(angular.mock.module(function($provide) {
			
			text = null;
			
			mockTextFormatterService = {
				format: function(data, wrapped, noParagraphSpacing, doubleLineBreaks) {
					return text;
				}
			};
			spyOn(mockTextFormatterService,'format').and.callThrough();
			
			mockSce = {
				trustAsHtml: function(content) {
					return sceText;
				}
			};
			spyOn(mockSce, 'trustAsHtml').and.callThrough();
			
			$provide.value('textFormatterService', mockTextFormatterService);
			$provide.value('$sce', mockSce);
		}));
		
		beforeEach(inject(function($filter) {
			formatChapterContent = $filter('formatChapterContent');
		}));
		
		it('should pass through invalid values', function() {
			expect(formatChapterContent(undefined)).toBeUndefined();
			expect(formatChapterContent(null)).toBeNull();
		});
		
		it('should use the text formatter service to format', function() {
			
			text = "My content";
			sceText = "My html safe content";
			var chapter = {
				data: "My data",
				wrapped: true,
				no_paragraph_spacing: true,
				double_line_breaks: true
			};
			
			expect(formatChapterContent(chapter)).toEqual(sceText);
			
			expect(mockTextFormatterService.format).toHaveBeenCalledWith(chapter.data, chapter.wrapped, chapter.no_paragraph_spacing, chapter.double_line_breaks);
			expect(mockSce.trustAsHtml).toHaveBeenCalledWith(text);
		});
		
	});
	
});