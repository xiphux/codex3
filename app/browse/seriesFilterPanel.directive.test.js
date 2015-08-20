'use strict';

describe('codex.browse module', function() {
	
	beforeEach(angular.mock.module('codex.browse'));
	
	describe('series filter panel directive', function() {
		
		var element, scope;
		
		beforeEach(angular.mock.module('browse/seriesFilterPanel.html'));
		beforeEach(angular.mock.module('browse/seriesFilterPanelItem.html'));
		
		beforeEach(inject(function($rootScope, $compile) {
			
			scope = $rootScope.$new();
			element = angular.element('<codex-series-filter-panel></codex-series-filter-panel>');
			element = $compile(element)(scope);
			scope.$digest();
			
		}));
		
		it('should render a link to expand series', function() {
			var a = element.find('a');
			expect(a.text()).toContain('Series');
		});
		
	});
	
});