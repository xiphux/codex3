'use strict';

describe('codex.browse module', function() {
	
	beforeEach(angular.mock.module('codex.browse'));
	
	describe('filter bar directive', function() {
		
		var element, scope;
		
		beforeEach(angular.mock.module('browse/filterBar.html'));
		beforeEach(angular.mock.module('browse/filterBarGenreItem.html'));
		beforeEach(angular.mock.module('browse/filterBarMatchupItem.html'));
		beforeEach(angular.mock.module('browse/filterBarSeriesItem.html'));
		
		beforeEach(inject(function($rootScope, $compile) {
			
			scope = $rootScope.$new();
			element = angular.element('<codex-filter-bar></codex-filter-bar>');
			element = $compile(element)(scope);
			scope.$digest();
			
		}));
		
		it('should provide a clear link', function() {
			var a = element.find('a');
			expect(a.text()).toContain('clear');
		});
		
	});
	
});