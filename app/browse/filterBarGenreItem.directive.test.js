'use strict';

describe('codex.browse module', function() {
	
	beforeEach(module('codex.browse'));
	
	describe('filter bar genre item directive', function() {
		
		var element, scope;
		
		beforeEach(module('browse/filterBarGenreItem.html'));
		
		beforeEach(inject(function($rootScope, $compile) {
			
			scope = $rootScope.$new();
			element = angular.element('<codex-filter-bar-genre-item genre="g"></codex-filter-bar-genre-item>');
			element = $compile(element)(scope);
			scope.g = {
				id: '2',
				name: 'GenreOne'
			};
			scope.$digest();
			
		}));
		
		it('should render a link with the genre text', function() {
			expect(element.html()).toContain('Genre: GenreOne');
		});
		
		it('should render a clear button', function() {
			var i = element.find('i');
			expect(i.text()).toBe('clear');
		});
		
	});
	
});