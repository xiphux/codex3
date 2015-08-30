'use strict';

describe('codex.data module', function() {
	
	beforeEach(angular.mock.module('codex.read'));
	
	describe('fic data service', function() {
		
		var $window, mockFicResourceService, mockFicStorageService, ficDataService;
		var frFics, frFic, fsFics, fsFic;
		
		beforeEach(function() {
			
			$window = {
				navigator: {
					onLine: true
				}
			};
			
			frFics = null;
			frFic = null;
			fsFics = null;
			fsFic = null;
			
			mockFicResourceService = {
				getFics: function(filters) {
					return frFics;
				},
				getFic: function(ficId) {
					return frFic;
				}
			};
			mockFicStorageService = {
				getFics: function(filters) {
					return fsFics;
				},
				getFic: function(ficId) {
					return fsFic;
				}
			};
			
			angular.mock.module(function($provide) {
				$provide.value('$window', $window);
				$provide.value('ficResourceService', mockFicResourceService);
				$provide.value('ficStorageService', mockFicStorageService);
			});
			
		});
		
		beforeEach(inject(function($injector) {
			
			spyOn(mockFicResourceService, 'getFics').and.callThrough();
			spyOn(mockFicResourceService, 'getFic').and.callThrough();
			
			spyOn(mockFicStorageService, 'getFics').and.callThrough();
			spyOn(mockFicStorageService, 'getFic').and.callThrough();
			
			ficDataService = $injector.get('ficDataService');
		}));
		
		it('should get fics from resource service when online', function() {
			
			$window.navigator.onLine = true;
			
			frFics = [
				{ id: "1", title: "FicOne" },
				{ id: "2", title: "FicTwo" }
			];
			
			var filters = {
				genres: ["1"],
				matchups: ["1"],
				series: ["1"],
				search: ['termone']
			};
			
			expect(ficDataService.getFics(filters)).toEqual(frFics);
			expect(mockFicResourceService.getFics).toHaveBeenCalledWith(filters);
			expect(mockFicStorageService.getFics).not.toHaveBeenCalled();
			
		});
		
		it('should get fics from storage service when offline', function() {
			
			$window.navigator.onLine = false;
			
			fsFics = [
				{ id: "1", title: "FicOne" },
				{ id: "2", title: "FicTwo" }
			];
			
			var filters = {
				genres: ["1"],
				matchups: ["1"],
				series: ["1"],
				search: ['termone']
			};
			
			expect(ficDataService.getFics(filters)).toEqual(fsFics);
			expect(mockFicStorageService.getFics).toHaveBeenCalledWith(filters);
			expect(mockFicResourceService.getFics).not.toHaveBeenCalled();
			
		});
		
		it('should get a fic from resource service when online', function() {
			
			$window.navigator.onLine = true;
			
			frFic = { id: "2", title: "FicOne" };
			
			expect(ficDataService.getFic("2")).toEqual(frFic);
			expect(mockFicResourceService.getFic).toHaveBeenCalledWith("2");
			expect(mockFicStorageService.getFic).not.toHaveBeenCalled();
			
		});
		
		it('should get a chapter from storage service when offline', function() {
			
			$window.navigator.onLine = false;
			
			fsFic = { id: "2", title: "FicOne" };
			
			expect(ficDataService.getFic("2")).toEqual(fsFic);
			expect(mockFicStorageService.getFic).toHaveBeenCalledWith("2");
			expect(mockFicResourceService.getFic).not.toHaveBeenCalled();
			
		});
		
	});
	
});