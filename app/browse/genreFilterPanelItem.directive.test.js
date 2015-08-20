'use strict';

describe('codex.browse module', function() {
	
	beforeEach(angular.mock.module('codex.browse'));
	
	describe('genre filter panel item directive', function() {
		
		var element, scope;
		
		beforeEach(angular.mock.module('browse/genreFilterPanelItem.html'));
		
		beforeEach(inject(function($rootScope, $compile) {
			
			scope = $rootScope.$new();
			element = angular.element('<codex-genre-filter-panel-item genre="g"></codex-genre-filter-panel-item>');
			element = $compile(element)(scope);
			scope.g = {
				id: '2',
				name: 'GenreOne'
			};
			scope.$digest();
			
		}));
		
		it('should render a link with the genre text', function() {
			expect(element.text()).toContain('GenreOne');
		});
		
	});
	
});