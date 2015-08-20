'use strict';

describe('codex.browse module', function() {
	
	beforeEach(angular.mock.module('codex.browse'));
	
	describe('matchup filter panel item controller', function() {
		
		var mockFicBrowseService, queryDeferred, mfpCtrl, $rootScope, $q, hasMatchupFilter, ficCount, hasSearch, scope, fics;
		
		beforeEach(inject(function($controller, _$q_, _$rootScope_) {
			
			$q = _$q_;
			$rootScope = _$rootScope_;
			
			hasMatchupFilter = false;
			hasSearch = false;
			ficCount = 0;
			fics = null;
			
			mockFicBrowseService = {
				getFics: function() {
					return fics;
				},
				hasMatchupFilter: function(matchup) {
					return hasMatchupFilter;
				},
				ficsWithMatchup: function(matchup) {
					return ficCount;
				},
				hasSearch: function() {
					return hasSearch;
				},
				addMatchupFilter: jasmine.createSpy('addMatchupFilter'),
				removeMatchupFilter: jasmine.createSpy('removeMatchupFilter'),
				refresh: jasmine.createSpy('refresh')
			};
			
			spyOn(mockFicBrowseService, 'hasMatchupFilter').and.callThrough();
			spyOn(mockFicBrowseService, 'ficsWithMatchup').and.callThrough();
			spyOn(mockFicBrowseService, 'hasSearch').and.callThrough();
			
			scope = $rootScope.$new();
			
			mfpCtrl = $controller('matchupFilterPanelItemController', {
				ficBrowseService: mockFicBrowseService,
				$scope: scope
			});
			mfpCtrl.matchup = {
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
			};
			
		}));
		
		it('should establish badge state on initialization', function() {
			
			hasMatchupFilter = true;
			hasSearch = true;
			ficCount = 10;
			queryDeferred = $q.defer();
			fics = { $promise: queryDeferred.promise };
			queryDeferred.resolve([{ id: '1', title: 'One' }]);
			
			$rootScope.$digest();
			
			expect(mockFicBrowseService.hasMatchupFilter).toHaveBeenCalled();
			expect(mockFicBrowseService.hasSearch).toHaveBeenCalled();
			expect(mockFicBrowseService.ficsWithMatchup).toHaveBeenCalledWith(mfpCtrl.matchup);
			
			expect(mfpCtrl.active).toBeTruthy();
			expect(mfpCtrl.showBadge).toBeTruthy();
			expect(mfpCtrl.matchCount).toEqual(10);
			
		});
		
		it('should recheck badge state when fics change', function() {
			
			$rootScope.$digest();
			
			expect(mfpCtrl.matchCount).toEqual(0);
			expect(mfpCtrl.showBadge).toBeFalsy();
			mockFicBrowseService.hasSearch.calls.reset();
			mockFicBrowseService.ficsWithMatchup.calls.reset();
			
			hasSearch = true;
			ficCount = 15;
			queryDeferred = $q.defer();
			fics = { $promise: queryDeferred.promise };
			queryDeferred.resolve([{ id: '1', title: 'One' }]);
			
			$rootScope.$digest();
			
			expect(mockFicBrowseService.hasSearch).toHaveBeenCalled();
			expect(mockFicBrowseService.ficsWithMatchup).toHaveBeenCalledWith(mfpCtrl.matchup);
			expect(mfpCtrl.matchCount).toEqual(15);
			expect(mfpCtrl.showBadge).toBeTruthy();
			
		});
		
		it('should update active state when filter state changes', function() {
			
			$rootScope.$digest();
			
			expect(mfpCtrl.active).toBeFalsy();
			
			hasMatchupFilter = true;
			
			$rootScope.$digest();
			
			expect(mfpCtrl.active).toBeTruthy();
			
		});
		
		it('should add filter when toggled active', function() {
			
			$rootScope.$digest();
			
			expect(mfpCtrl.active).toBeFalsy();
			
			expect(mockFicBrowseService.addMatchupFilter).not.toHaveBeenCalled();
			expect(mockFicBrowseService.removeMatchupFilter).not.toHaveBeenCalled();
			expect(mockFicBrowseService.refresh).not.toHaveBeenCalled();
			
			mfpCtrl.toggleMatchupFilter();
			
			expect(mockFicBrowseService.addMatchupFilter).toHaveBeenCalledWith(mfpCtrl.matchup);
			expect(mockFicBrowseService.removeMatchupFilter).not.toHaveBeenCalled();
			expect(mockFicBrowseService.refresh).toHaveBeenCalled();
			
		});
		
		it('should remove filter when toggled inactive', function() {
			
			$rootScope.$digest();
			
			expect(mfpCtrl.active).toBeFalsy();
			
			expect(mockFicBrowseService.addMatchupFilter).not.toHaveBeenCalled();
			expect(mockFicBrowseService.removeMatchupFilter).not.toHaveBeenCalled();
			expect(mockFicBrowseService.refresh).not.toHaveBeenCalled();
			
			mfpCtrl.active = true;
			
			mfpCtrl.toggleMatchupFilter();
			
			expect(mockFicBrowseService.addMatchupFilter).not.toHaveBeenCalled();
			expect(mockFicBrowseService.removeMatchupFilter).toHaveBeenCalledWith(mfpCtrl.matchup);
			expect(mockFicBrowseService.refresh).toHaveBeenCalled();
			
		});
		
	});
	
});