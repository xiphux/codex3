'use strict';

describe('codex.browse module', function() {
	
	beforeEach(angular.mock.module('codex.browse'));
	
	describe('matchup filter panel item directive', function() {
		
		var element, scope;
		
		beforeEach(angular.mock.module('browse/matchupFilterPanelItem.html'));
		
		beforeEach(inject(function($rootScope, $compile) {
			
			scope = $rootScope.$new();
			element = angular.element('<codex-matchup-filter-panel-item matchup="m"></codex-matchup-filter-panel-item>');
			element = $compile(element)(scope);
			scope.m = {
				id: '2',
				characters: [
					{
						id: '1',
						name: 'CharacterOne'
					},
					{
						id: '3',
						name: 'CharacterThree'
					}
				]
			};
			scope.$digest();
			
		}));
		
		it('should render a link with the matchup text', function() {
			expect(element.text()).toContain('CharacterOne + CharacterThree');
		});
		
	});
	
});