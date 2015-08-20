'use strict';

describe('codex.browse module', function() {
	
	beforeEach(module('codex.browse'));
	
	describe('filter bar matchup item directive', function() {
		
		var element, scope;
		
		beforeEach(module('browse/filterBarMatchupItem.html'));
		
		beforeEach(inject(function($rootScope, $compile) {
			
			scope = $rootScope.$new();
			element = angular.element('<codex-filter-bar-matchup-item matchup="m"></codex-filter-bar-matchup-item>');
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
			expect(element.html()).toContain('Matchup: CharacterOne + CharacterThree');
		});
		
		it('should render a clear button', function() {
			var i = element.find('i');
			expect(i.text()).toBe('clear');
		});
		
	});
	
});