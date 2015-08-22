'use strict';

describe('codex.read module', function() {
	
	beforeEach(angular.mock.module('codex.read'));
	
	describe('chapter list item directive', function() {
		
		var element, scope;
		
		beforeEach(angular.mock.module('read/chapterListItem.html'));
		
		beforeEach(inject(function($rootScope, $compile) {
			
			scope = $rootScope.$new();
			
			element = angular.element('<codex-chapter-list-item chapter="c"></codex-chapter-list-item>');
			element = $compile(element)(scope);
			scope.c = {
				id: '2',
				number: 2,
				title: 'Part Two'
			};
			scope.$digest();
			
		}));
		
		it('should show a chapter title link', function() {
			expect(element.text()).toContain('Part Two');
		});
		
		it('should show an indicator if the chapter is active', function() {
			
			var controller = element.controller('codexChapterListItem');
			expect(controller.active).toBeFalsy();
			
			var i = element.find('i');
			
			expect(i.hasClass('ng-hide')).toBeTruthy();
			
			controller.active = true;
			scope.$digest();
			
			expect(i.hasClass('ng-hide')).toBeFalsy();
			
		});
		
	});
	
});