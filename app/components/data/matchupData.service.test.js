'use strict';

describe('codex.data module', function() {
	
	beforeEach(angular.mock.module('codex.read'));
	
	describe('matchup data service', function() {
		
		var $window, mockMatchupResourceService, mockFicStorageService, matchupDataService;
		var mrMatchups, fsMatchups;
		
		beforeEach(function() {
			
			$window = {
				navigator: {
					onLine: true
				}
			};
			
			mrMatchups = null;
			fsMatchups = null;
			
			mockMatchupResourceService = {
				getMatchups: function() {
					return mrMatchups;
				}
			};
			mockFicStorageService = {
				getMatchups: function() {
					return fsMatchups;
				}
			};
			
			angular.mock.module(function($provide) {
				$provide.value('$window', $window);
				$provide.value('matchupResourceService', mockMatchupResourceService);
				$provide.value('ficStorageService', mockFicStorageService);
			});
			
		});
		
		beforeEach(inject(function($injector) {
			
			spyOn(mockMatchupResourceService, 'getMatchups').and.callThrough();
			
			spyOn(mockFicStorageService, 'getMatchups').and.callThrough();
			
			matchupDataService = $injector.get('matchupDataService');
		}));
		
		it('should get matchups from resource service when online', function() {
			
			$window.navigator.onLine = true;
			
			mrMatchups = [
				{
					id: 1,
					characters: [
						{ id: 1, name: 'CharacterOne' },
						{ id: 2, name: 'CharacterTwo' }
					]
				},
				{ 
					id: 2,
					characters: [
						{ id: 3, name: 'CharacterThree' },
						{ id: 4, name: 'CharacterFour' }
					]
				}
			];
			
			expect(matchupDataService.getMatchups()).toEqual(mrMatchups);
			expect(mockMatchupResourceService.getMatchups).toHaveBeenCalled();
			expect(mockFicStorageService.getMatchups).not.toHaveBeenCalled();
			
		});
		
		it('should get matchups from storage service when offline', function() {
			
			$window.navigator.onLine = false;
			
			fsMatchups = [
				{
					id: 1,
					characters: [
						{ id: 1, name: 'CharacterOne' },
						{ id: 2, name: 'CharacterTwo' }
					]
				},
				{ 
					id: 2,
					characters: [
						{ id: 3, name: 'CharacterThree' },
						{ id: 4, name: 'CharacterFour' }
					]
				}
			];
			
			expect(matchupDataService.getMatchups()).toEqual(fsMatchups);
			expect(mockFicStorageService.getMatchups).toHaveBeenCalled();
			expect(mockMatchupResourceService.getMatchups).not.toHaveBeenCalled();
			
		});
		
	});
	
});