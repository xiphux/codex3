'use strict';

describe('codex.browse module', function() {
	
	beforeEach(angular.mock.module('codex.browse'));
	
	describe('series filter panel item controller', function() {
		
		var mockFicBrowseService, queryDeferred, sfpCtrl, $rootScope, $q, hasSeriesFilter, ficCount, hasSearch, scope, fics;
		
		beforeEach(inject(function($controller, _$q_, _$rootScope_) {
			
			$q = _$q_;
			$rootScope = _$rootScope_;
			
			hasSeriesFilter = false;
			hasSearch = false;
			ficCount = 0;
			fics = null;
			
			mockFicBrowseService = {
				getFics: function() {
					return fics;
				},
				hasSeriesFilter: function(series) {
					return hasSeriesFilter;
				},
				ficsWithSeries: function(series) {
					return ficCount;
				},
				hasSearch: function() {
					return hasSearch;
				},
				addSeriesFilter: jasmine.createSpy('addSeriesFilter'),
				removeSeriesFilter: jasmine.createSpy('removeSeriesFilter'),
				refresh: jasmine.createSpy('refresh')
			};
			
			spyOn(mockFicBrowseService, 'hasSeriesFilter').and.callThrough();
			spyOn(mockFicBrowseService, 'ficsWithSeries').and.callThrough();
			spyOn(mockFicBrowseService, 'hasSearch').and.callThrough();
			
			scope = $rootScope.$new();
			
			sfpCtrl = $controller('seriesFilterPanelItemController', {
				ficBrowseService: mockFicBrowseService,
				$scope: scope
			});
			sfpCtrl.series = {
				id: '2',
				title: 'SeriesTwo'
			};
			
		}));
		
		it('should establish badge state on initialization', function() {
			
			hasSeriesFilter = true;
			hasSearch = true;
			ficCount = 10;
			queryDeferred = $q.defer();
			fics = { $promise: queryDeferred.promise };
			queryDeferred.resolve([{ id: '1', title: 'One' }]);
			
			$rootScope.$digest();
			
			expect(mockFicBrowseService.hasSeriesFilter).toHaveBeenCalled();
			expect(mockFicBrowseService.hasSearch).toHaveBeenCalled();
			expect(mockFicBrowseService.ficsWithSeries).toHaveBeenCalledWith(sfpCtrl.series);
			
			expect(sfpCtrl.active).toBeTruthy();
			expect(sfpCtrl.showBadge).toBeTruthy();
			expect(sfpCtrl.matchCount).toEqual(10);
			
		});
		
		it('should recheck badge state when fics change', function() {
			
			$rootScope.$digest();
			
			expect(sfpCtrl.matchCount).toEqual(0);
			expect(sfpCtrl.showBadge).toBeFalsy();
			mockFicBrowseService.hasSearch.calls.reset();
			mockFicBrowseService.ficsWithSeries.calls.reset();
			
			hasSearch = true;
			ficCount = 15;
			queryDeferred = $q.defer();
			fics = { $promise: queryDeferred.promise };
			queryDeferred.resolve([{ id: '1', title: 'One' }]);
			
			$rootScope.$digest();
			
			expect(mockFicBrowseService.hasSearch).toHaveBeenCalled();
			expect(mockFicBrowseService.ficsWithSeries).toHaveBeenCalledWith(sfpCtrl.series);
			expect(sfpCtrl.matchCount).toEqual(15);
			expect(sfpCtrl.showBadge).toBeTruthy();
			
		});
		
		it('should update active state when filter state changes', function() {
			
			$rootScope.$digest();
			
			expect(sfpCtrl.active).toBeFalsy();
			
			hasSeriesFilter = true;
			
			$rootScope.$digest();
			
			expect(sfpCtrl.active).toBeTruthy();
			
		});
		
		it('should add filter when toggled active', function() {
			
			$rootScope.$digest();
			
			expect(sfpCtrl.active).toBeFalsy();
			
			expect(mockFicBrowseService.addSeriesFilter).not.toHaveBeenCalled();
			expect(mockFicBrowseService.removeSeriesFilter).not.toHaveBeenCalled();
			expect(mockFicBrowseService.refresh).not.toHaveBeenCalled();
			
			sfpCtrl.toggleSeriesFilter();
			
			expect(mockFicBrowseService.addSeriesFilter).toHaveBeenCalledWith(sfpCtrl.series);
			expect(mockFicBrowseService.removeSeriesFilter).not.toHaveBeenCalled();
			expect(mockFicBrowseService.refresh).toHaveBeenCalled();
			
		});
		
		it('should remove filter when toggled inactive', function() {
			
			$rootScope.$digest();
			
			expect(sfpCtrl.active).toBeFalsy();
			
			expect(mockFicBrowseService.addSeriesFilter).not.toHaveBeenCalled();
			expect(mockFicBrowseService.removeSeriesFilter).not.toHaveBeenCalled();
			expect(mockFicBrowseService.refresh).not.toHaveBeenCalled();
			
			sfpCtrl.active = true;
			
			sfpCtrl.toggleSeriesFilter();
			
			expect(mockFicBrowseService.addSeriesFilter).not.toHaveBeenCalled();
			expect(mockFicBrowseService.removeSeriesFilter).toHaveBeenCalledWith(sfpCtrl.series);
			expect(mockFicBrowseService.refresh).toHaveBeenCalled();
			
		});
		
	});
	
});