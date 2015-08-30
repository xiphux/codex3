'use strict';

describe('codex.browse module', function() {
	
	beforeEach(angular.mock.module('codex.browse'));
	
	describe('genre filter panel controller', function() {
		
		var mockGenreDataService, queryDeferred, gfpCtrl, $rootScope, scope, $window;
		
		beforeEach(inject(function($controller, $q, _$rootScope_) {
			
			$rootScope = _$rootScope_;
			
			mockGenreDataService = {
				getGenres: function() {
					queryDeferred = $q.defer();
					return {
						$promise: queryDeferred.promise
					};
				}
			};
			
			spyOn(mockGenreDataService, 'getGenres').and.callThrough();
			
			$window = {
				navigator: {
					onLine: true
				}
			};
			
			scope = $rootScope.$new();
			gfpCtrl = $controller('genreFilterPanelController', {
				genreDataService: mockGenreDataService,
				$scope: scope,
				$window: $window
			});
		}));
		
		it('should toggle the expanded state', function() {
			expect(gfpCtrl.expanded).toBeFalsy();
			gfpCtrl.toggleGenreExpand();
			expect(gfpCtrl.expanded).toBeTruthy();
			gfpCtrl.toggleGenreExpand();
			expect(gfpCtrl.expanded).toBeFalsy();
		});
		
		it('should query for genres on the first expand only', function() {
			
			var genreData = [
				{
					id: '2',
					name: 'GenreOne'
				},
				{
					id: '3',
					name: 'GenreTwo'
				}
			];
			
			expect(gfpCtrl.genres).toBeUndefined();
			
			gfpCtrl.toggleGenreExpand();
			
			expect(mockGenreDataService.getGenres).toHaveBeenCalled();
			
			queryDeferred.resolve(genreData);
			$rootScope.$apply();
			
			expect(gfpCtrl.genres).toEqual(genreData);
			
			gfpCtrl.toggleGenreExpand();
			gfpCtrl.toggleGenreExpand();
			
			expect(mockGenreDataService.getGenres.calls.count()).toEqual(1);
			
		});
		
		it('should reset genres and expand state when online state changes', function() {
			
			scope.$digest();
			
			gfpCtrl.expanded = true;
			gfpCtrl.genres = [
				{ id: '1', name: 'GenreOne' },
				{ id: '2', name: 'GenreTwo' }
			];
			
			scope.$digest();
			
			expect(gfpCtrl.expanded).toBeTruthy();
			expect(gfpCtrl.genres).not.toBeUndefined();
			
			$window.navigator.onLine = false;
			
			scope.$digest();
			
			expect(gfpCtrl.expanded).toBeFalsy();
			expect(gfpCtrl.genres).toBeUndefined();
			
		});
		
	});
	
});