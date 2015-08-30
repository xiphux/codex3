'use strict';

describe('codex.data module', function() {
	
	beforeEach(angular.mock.module('codex.read'));
	
	describe('genre data service', function() {
		
		var $window, mockGenreResourceService, mockFicStorageService, genreDataService;
		var grGenres, fsGenres;
		
		beforeEach(function() {
			
			$window = {
				navigator: {
					onLine: true
				}
			};
			
			grGenres = null;
			fsGenres = null;
			
			mockGenreResourceService = {
				getGenres: function() {
					return grGenres;
				}
			};
			mockFicStorageService = {
				getGenres: function() {
					return fsGenres;
				}
			};
			
			angular.mock.module(function($provide) {
				$provide.value('$window', $window);
				$provide.value('genreResourceService', mockGenreResourceService);
				$provide.value('ficStorageService', mockFicStorageService);
			});
			
		});
		
		beforeEach(inject(function($injector) {
			
			spyOn(mockGenreResourceService, 'getGenres').and.callThrough();
			
			spyOn(mockFicStorageService, 'getGenres').and.callThrough();
			
			genreDataService = $injector.get('genreDataService');
		}));
		
		it('should get genres from resource service when online', function() {
			
			$window.navigator.onLine = true;
			
			grGenres = [
				{ id: 1, name: 'GenreOne' },
				{ id: 2, name: 'GenreTwo' }
			];
			
			expect(genreDataService.getGenres()).toEqual(grGenres);
			expect(mockGenreResourceService.getGenres).toHaveBeenCalled();
			expect(mockFicStorageService.getGenres).not.toHaveBeenCalled();
			
		});
		
		it('should get genres from storage service when offline', function() {
			
			$window.navigator.onLine = false;
			
			fsGenres = [
				{ id: 1, name: 'GenreOne' },
				{ id: 2, name: 'GenreTwo' }
			];
			
			expect(genreDataService.getGenres()).toEqual(fsGenres);
			expect(mockFicStorageService.getGenres).toHaveBeenCalled();
			expect(mockGenreResourceService.getGenres).not.toHaveBeenCalled();
			
		});
		
	});
	
});