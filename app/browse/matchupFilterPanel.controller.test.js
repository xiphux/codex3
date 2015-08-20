'use strict';

describe('codex.browse module', function() {
	
	beforeEach(angular.mock.module('codex.browse'));
	
	describe('matchup filter panel controller', function() {
		
		var mockMatchupDataService, queryDeferred, mfpCtrl, $rootScope;
		
		beforeEach(inject(function($controller, $q, _$rootScope_) {
			
			$rootScope = _$rootScope_;
			
			mockMatchupDataService = {
				getMatchups: function() {
					queryDeferred = $q.defer();
					return {
						$promise: queryDeferred.promise
					};
				}
			};
			
			spyOn(mockMatchupDataService, 'getMatchups').and.callThrough();
			
			mfpCtrl = $controller('matchupFilterPanelController', {
				matchupDataService: mockMatchupDataService
			});
		}));
		
		it('should toggle the expanded state', function() {
			expect(mfpCtrl.expanded).toBeFalsy();
			mfpCtrl.toggleMatchupExpand();
			expect(mfpCtrl.expanded).toBeTruthy();
			mfpCtrl.toggleMatchupExpand();
			expect(mfpCtrl.expanded).toBeFalsy();
		});
		
		it('should query for matchups on the first expand only', function() {
			
			var matchupData = [
				{
					id: '2',
					characters: [
						{
							id: '1',
							name: 'CharacterOne'
						},
						{
							id: '2',
							name: 'CharacterTwo'
						}
					]
				},
				{
					id: '3',
					characters: [
						{
							id: '3',
							name: 'CharacterThree'
						},
						{
							id: '4',
							name: 'CharacterFour'
						}
					]
				}
			];
			
			expect(mfpCtrl.matchups).toBeUndefined();
			
			mfpCtrl.toggleMatchupExpand();
			
			expect(mockMatchupDataService.getMatchups).toHaveBeenCalled();
			
			queryDeferred.resolve(matchupData);
			$rootScope.$apply();
			
			expect(mfpCtrl.matchups).toEqual(matchupData);
			
			mfpCtrl.toggleMatchupExpand();
			mfpCtrl.toggleMatchupExpand();
			
			expect(mockMatchupDataService.getMatchups.calls.count()).toEqual(1);
			
		});
		
	});
	
});