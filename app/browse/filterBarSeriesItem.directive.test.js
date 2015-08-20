'use strict';

describe('codex.browse module', function() {
	
	beforeEach(angular.mock.module('codex.browse'));
	
	describe('filter bar series item directive', function() {
		
		var element, scope;
		
		beforeEach(angular.mock.module('browse/filterBarSeriesItem.html'));
		
		beforeEach(inject(function($rootScope, $compile) {
			
			scope = $rootScope.$new();
			element = angular.element('<codex-filter-bar-series-item series="s"></codex-filter-bar-series-item>');
			element = $compile(element)(scope);
			scope.s = {
				id: '2',
				title: 'SeriesOne'
			};
			scope.$digest();
			
		}));
		
		it('should render a link with the series text', function() {
			expect(element.html()).toContain('Series: SeriesOne');
		});
		
		it('should render a clear button', function() {
			var i = element.find('i');
			expect(i.text()).toBe('clear');
		});
		
	});
	
});