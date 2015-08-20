'use strict';

describe('codex.browse module', function() {
	
	beforeEach(angular.mock.module('codex.browse'));
	
	describe('matchup filter panel directive', function() {
		
		var element, scope;
		
		beforeEach(angular.mock.module('browse/matchupFilterPanel.html'));
		beforeEach(angular.mock.module('browse/matchupFilterPanelItem.html'));
		
		beforeEach(inject(function($rootScope, $compile) {
			
			scope = $rootScope.$new();
			element = angular.element('<codex-matchup-filter-panel></codex-matchup-filter-panel>');
			element = $compile(element)(scope);
			scope.$digest();
			
		}));
		
		it('should render a link to expand matchups', function() {
			var a = element.find('a');
			expect(a.text()).toContain('Matchup');
		});
		
	});
	
});