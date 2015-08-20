'use strict';

describe('codex.browse module', function() {
	
	beforeEach(angular.mock.module('codex.browse'));
	
	describe('series filter panel controller', function() {
		
		var mockSeriesDataService, queryDeferred, sfpCtrl, $rootScope;
		
		beforeEach(inject(function($controller, $q, _$rootScope_) {
			
			$rootScope = _$rootScope_;
			
			mockSeriesDataService = {
				getSeries: function() {
					queryDeferred = $q.defer();
					return {
						$promise: queryDeferred.promise
					};
				}
			};
			
			spyOn(mockSeriesDataService, 'getSeries').and.callThrough();
			
			sfpCtrl = $controller('seriesFilterPanelController', {
				seriesDataService: mockSeriesDataService
			});
		}));
		
		it('should toggle the expanded state', function() {
			expect(sfpCtrl.expanded).toBeFalsy();
			sfpCtrl.toggleSeriesExpand();
			expect(sfpCtrl.expanded).toBeTruthy();
			sfpCtrl.toggleSeriesExpand();
			expect(sfpCtrl.expanded).toBeFalsy();
		});
		
		it('should query for series on the first expand only', function() {
			
			var seriesData = [
				{
					id: '2',
					title: 'SeriesOne'
				},
				{
					id: '3',
					title: 'SeriesTwo'
				}
			];
			
			expect(sfpCtrl.series).toBeUndefined();
			
			sfpCtrl.toggleSeriesExpand();
			
			expect(mockSeriesDataService.getSeries).toHaveBeenCalled();
			
			queryDeferred.resolve(seriesData);
			$rootScope.$apply();
			
			expect(sfpCtrl.series).toEqual(seriesData);
			
			sfpCtrl.toggleSeriesExpand();
			sfpCtrl.toggleSeriesExpand();
			
			expect(mockSeriesDataService.getSeries.calls.count()).toEqual(1);
			
		});
		
	});
	
});