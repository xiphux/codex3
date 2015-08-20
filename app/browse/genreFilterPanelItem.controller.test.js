'use strict';

describe('codex.browse module', function() {
	
	beforeEach(angular.mock.module('codex.browse'));
	
	describe('genre filter panel item controller', function() {
		
		var mockFicBrowseService, queryDeferred, gfpCtrl, $rootScope, $q, hasGenreFilter, ficCount, hasSearch, scope, fics;
		
		beforeEach(inject(function($controller, _$q_, _$rootScope_) {
			
			$q = _$q_;
			$rootScope = _$rootScope_;
			
			hasGenreFilter = false;
			hasSearch = false;
			ficCount = 0;
			fics = null;
			
			mockFicBrowseService = {
				getFics: function() {
					return fics;
				},
				hasGenreFilter: function(genre) {
					return hasGenreFilter;
				},
				ficsWithGenre: function(genre) {
					return ficCount;
				},
				hasSearch: function() {
					return hasSearch;
				},
				addGenreFilter: jasmine.createSpy('addGenreFilter'),
				removeGenreFilter: jasmine.createSpy('removeGenreFilter'),
				refresh: jasmine.createSpy('refresh')
			};
			
			spyOn(mockFicBrowseService, 'hasGenreFilter').and.callThrough();
			spyOn(mockFicBrowseService, 'ficsWithGenre').and.callThrough();
			spyOn(mockFicBrowseService, 'hasSearch').and.callThrough();
			
			scope = $rootScope.$new();
			
			gfpCtrl = $controller('genreFilterPanelItemController', {
				ficBrowseService: mockFicBrowseService,
				$scope: scope
			});
			gfpCtrl.genre = {
				id: '2',
				name: 'GenreOne'
			};
			
		}));
		
		it('should establish badge state on initialization', function() {
			
			hasGenreFilter = true;
			hasSearch = true;
			ficCount = 10;
			queryDeferred = $q.defer();
			fics = { $promise: queryDeferred.promise };
			queryDeferred.resolve([{ id: '1', title: 'One' }]);
			
			$rootScope.$digest();
			
			expect(mockFicBrowseService.hasGenreFilter).toHaveBeenCalled();
			expect(mockFicBrowseService.hasSearch).toHaveBeenCalled();
			expect(mockFicBrowseService.ficsWithGenre).toHaveBeenCalledWith(gfpCtrl.genre);
			
			expect(gfpCtrl.active).toBeTruthy();
			expect(gfpCtrl.showBadge).toBeTruthy();
			expect(gfpCtrl.matchCount).toEqual(10);
			
		});
		
		it('should recheck badge state when fics change', function() {
			
			$rootScope.$digest();
			
			expect(gfpCtrl.matchCount).toEqual(0);
			expect(gfpCtrl.showBadge).toBeFalsy();
			mockFicBrowseService.hasSearch.calls.reset();
			mockFicBrowseService.ficsWithGenre.calls.reset();
			
			hasSearch = true;
			ficCount = 15;
			queryDeferred = $q.defer();
			fics = { $promise: queryDeferred.promise };
			queryDeferred.resolve([{ id: '1', title: 'One' }]);
			
			$rootScope.$digest();
			
			expect(mockFicBrowseService.hasSearch).toHaveBeenCalled();
			expect(mockFicBrowseService.ficsWithGenre).toHaveBeenCalledWith(gfpCtrl.genre);
			expect(gfpCtrl.matchCount).toEqual(15);
			expect(gfpCtrl.showBadge).toBeTruthy();
			
		});
		
		it('should update active state when filter state changes', function() {
			
			$rootScope.$digest();
			
			expect(gfpCtrl.active).toBeFalsy();
			
			hasGenreFilter = true;
			
			$rootScope.$digest();
			
			expect(gfpCtrl.active).toBeTruthy();
			
		});
		
		it('should add filter when toggled active', function() {
			
			$rootScope.$digest();
			
			expect(gfpCtrl.active).toBeFalsy();
			
			expect(mockFicBrowseService.addGenreFilter).not.toHaveBeenCalled();
			expect(mockFicBrowseService.removeGenreFilter).not.toHaveBeenCalled();
			expect(mockFicBrowseService.refresh).not.toHaveBeenCalled();
			
			gfpCtrl.toggleGenreFilter();
			
			expect(mockFicBrowseService.addGenreFilter).toHaveBeenCalledWith(gfpCtrl.genre);
			expect(mockFicBrowseService.removeGenreFilter).not.toHaveBeenCalled();
			expect(mockFicBrowseService.refresh).toHaveBeenCalled();
			
		});
		
		it('should remove filter when toggled inactive', function() {
			
			$rootScope.$digest();
			
			expect(gfpCtrl.active).toBeFalsy();
			
			expect(mockFicBrowseService.addGenreFilter).not.toHaveBeenCalled();
			expect(mockFicBrowseService.removeGenreFilter).not.toHaveBeenCalled();
			expect(mockFicBrowseService.refresh).not.toHaveBeenCalled();
			
			gfpCtrl.active = true;
			
			gfpCtrl.toggleGenreFilter();
			
			expect(mockFicBrowseService.addGenreFilter).not.toHaveBeenCalled();
			expect(mockFicBrowseService.removeGenreFilter).toHaveBeenCalledWith(gfpCtrl.genre);
			expect(mockFicBrowseService.refresh).toHaveBeenCalled();
			
		});
		
	});
	
});