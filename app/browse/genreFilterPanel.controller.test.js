'use strict';

describe('codex.browse module', function() {
	
	beforeEach(angular.mock.module('codex.browse'));
	
	describe('genre filter panel controller', function() {
		
		var mockGenreDataService, queryDeferred, gfpCtrl, $rootScope;
		
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
			
			gfpCtrl = $controller('genreFilterPanelController', {
				genreDataService: mockGenreDataService
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
		
	});
	
});