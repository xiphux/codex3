'use strict';

describe('codex.browse module', function() {
	
	beforeEach(angular.mock.module('codex.browse'));
	
	describe('series filter panel item directive', function() {
		
		var element, scope;
		
		beforeEach(angular.mock.module('browse/seriesFilterPanelItem.html'));
		
		beforeEach(inject(function($rootScope, $compile) {
			
			scope = $rootScope.$new();
			element = angular.element('<codex-series-filter-panel-item series="s"></codex-series-filter-panel-item>');
			element = $compile(element)(scope);
			scope.s = {
				id: '2',
				title: 'SeriesOne'
			};
			scope.$digest();
			
		}));
		
		it('should render a link with the series text', function() {
			expect(element.text()).toContain('Series');
		});
		
	});
	
});