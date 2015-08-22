'use strict';

describe('codex.read module', function() {
	
	beforeEach(angular.mock.module('codex.read'));
	
	describe('chapter list directive', function() {
		
		var scope, element;
		
		beforeEach(angular.mock.module('read/chapterList.html'));
		beforeEach(angular.mock.module('read/chapterListItem.html'));
		
		beforeEach(inject(function($rootScope, $compile) {
			
			scope = $rootScope.$new();
			element = angular.element('<codex-chapter-list></codex-chapter-list>');
			element = $compile(element)(scope);
			scope.$digest();
			
		}));
		
		it('should render multiple chapters', function() {
			
			var controller = element.controller('codexChapterList');
			controller.chapters = [
				{ id: '1', number: 1, title: 'Part One' },
				{ id: '2', number: 2, title: 'Part Two' }
			];
			
			scope.$digest();
			
			expect(element.text()).toContain('Part One');
			expect(element.text()).toContain('Part Two');
			
		});
		
	});
	
});