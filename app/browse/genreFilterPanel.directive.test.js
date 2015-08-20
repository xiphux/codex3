'use strict';

describe('codex.browse module', function() {
	
	beforeEach(angular.mock.module('codex.browse'));
	
	describe('genre filter panel directive', function() {
		
		var element, scope;
		
		beforeEach(angular.mock.module('browse/genreFilterPanel.html'));
		beforeEach(angular.mock.module('browse/genreFilterPanelItem.html'));
		
		beforeEach(inject(function($rootScope, $compile) {
			
			scope = $rootScope.$new();
			element = angular.element('<codex-genre-filter-panel></codex-genre-filter-panel>');
			element = $compile(element)(scope);
			scope.$digest();
			
		}));
		
		it('should render a link to expand genres', function() {
			var a = element.find('a');
			expect(a.text()).toContain('Genre');
		});
		
	});
	
});