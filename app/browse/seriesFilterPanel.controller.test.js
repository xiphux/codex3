'use strict';

describe('codex.browse module', function() {
	
	beforeEach(angular.mock.module('codex.browse'));
	
	describe('series filter panel controller', function() {
		
		var mockSeriesDataService, queryDeferred, sfpCtrl, $rootScope, scope, $window;
		
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
			
			$window = {
				navigator: {
					onLine: true
				}
			};
			
			scope = $rootScope.$new();
			
			sfpCtrl = $controller('seriesFilterPanelController', {
				seriesDataService: mockSeriesDataService,
				$scope: scope,
				$window: $window
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
		
		it('should reset series and expand state when online state changes', function() {
			
			scope.$digest();
			
			sfpCtrl.expanded = true;
			sfpCtrl.series = [
				{ id: '1', title: 'SeriesOne' },
				{ id: '2', title: 'SeriesTwo' }
			];
			
			scope.$digest();
			
			expect(sfpCtrl.expanded).toBeTruthy();
			expect(sfpCtrl.series).not.toBeUndefined();
			
			$window.navigator.onLine = false;
			
			scope.$digest();
			
			expect(sfpCtrl.expanded).toBeFalsy();
			expect(sfpCtrl.series).toBeUndefined();
			
		});
		
	});
	
});