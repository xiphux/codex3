'use strict';

describe('codex.read module', function() {
	
	beforeEach(angular.mock.module('codex.read'));
	
	describe('chapter text directive', function() {
		
		var scope, element;
		
		beforeEach(angular.mock.module('read/chapterText.html'));
		
		beforeEach(inject(function($rootScope, $compile) {
			
			scope = $rootScope.$new();
			element = angular.element('<codex-chapter-text></codex-chapter-text>');
			element = $compile(element)(scope);
			scope.$digest();
			
		}));
		
		it('should render the chapter content', function() {
			
			var controller = element.controller('codexChapterText');
			controller.chapter = {
				id: '2',
				number: '2',
				data: 'My chapter content'
			};
			
			scope.$digest();
			
			expect(element.text()).toContain('My chapter content');
			
		});
		
	});
	
});