'use strict';

describe('codex.data module', function() {
	
	beforeEach(angular.mock.module('codex.read'));
	
	describe('series data service', function() {
		
		var $window, mockSeriesResourceService, mockFicStorageService, seriesDataService;
		var srSeries, fsSeries;
		
		beforeEach(function() {
			
			$window = {
				navigator: {
					onLine: true
				}
			};
			
			srSeries = null;
			fsSeries = null;
			
			mockSeriesResourceService = {
				getSeries: function() {
					return srSeries;
				}
			};
			mockFicStorageService = {
				getSeries: function() {
					return fsSeries;
				}
			};
			
			angular.mock.module(function($provide) {
				$provide.value('$window', $window);
				$provide.value('seriesResourceService', mockSeriesResourceService);
				$provide.value('ficStorageService', mockFicStorageService);
			});
			
		});
		
		beforeEach(inject(function($injector) {
			
			spyOn(mockSeriesResourceService, 'getSeries').and.callThrough();
			
			spyOn(mockFicStorageService, 'getSeries').and.callThrough();
			
			seriesDataService = $injector.get('seriesDataService');
		}));
		
		it('should get series from resource service when online', function() {
			
			$window.navigator.onLine = true;
			
			srSeries = [
				{ id: 1, title: 'SeriesOne' },
				{ id: 2, title: 'SeriesTwo' }
			];
			
			expect(seriesDataService.getSeries()).toEqual(srSeries);
			expect(mockSeriesResourceService.getSeries).toHaveBeenCalled();
			expect(mockFicStorageService.getSeries).not.toHaveBeenCalled();
			
		});
		
		it('should get series from storage service when offline', function() {
			
			$window.navigator.onLine = false;
			
			fsSeries = [
				{ id: 1, title: 'SeriesOne' },
				{ id: 2, title: 'SeriesTwo' }
			];
			
			expect(seriesDataService.getSeries()).toEqual(fsSeries);
			expect(mockFicStorageService.getSeries).toHaveBeenCalled();
			expect(mockSeriesResourceService.getSeries).not.toHaveBeenCalled();
			
		});
		
	});
	
});