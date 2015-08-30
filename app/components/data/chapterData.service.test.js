'use strict';

describe('codex.data module', function() {
	
	beforeEach(angular.mock.module('codex.read'));
	
	describe('chapter data service', function() {
		
		var $window, mockChapterResourceService, mockFicStorageService, chapterDataService;
		var crChapters, crChapter, fsChapters, fsChapter;
		
		beforeEach(function() {
			
			$window = {
				navigator: {
					onLine: true
				}
			};
			
			crChapters = null;
			crChapter = null;
			fsChapters = null;
			fsChapter = null;
			
			mockChapterResourceService = {
				getChapters: function(ficId) {
					return crChapters;
				},
				getChapter: function(ficId, num) {
					return crChapter;
				}
			};
			mockFicStorageService = {
				getChapters: function(ficId) {
					return fsChapters;
				},
				getChapter: function(ficId, num) {
					return fsChapter;
				}
			};
			
			angular.mock.module(function($provide) {
				$provide.value('$window', $window);
				$provide.value('chapterResourceService', mockChapterResourceService);
				$provide.value('ficStorageService', mockFicStorageService);
			});
			
		});
		
		beforeEach(inject(function($injector) {
			
			spyOn(mockChapterResourceService, 'getChapters').and.callThrough();
			spyOn(mockChapterResourceService, 'getChapter').and.callThrough();
			
			spyOn(mockFicStorageService, 'getChapters').and.callThrough();
			spyOn(mockFicStorageService, 'getChapter').and.callThrough();
			
			chapterDataService = $injector.get('chapterDataService');
		}));
		
		it('should get chapters from resource service when online', function() {
			
			$window.navigator.onLine = true;
			
			crChapters = [
				{ id: "1", number: 1 },
				{ id: "2", number: 2 }
			];
			
			expect(chapterDataService.getChapters("2")).toEqual(crChapters);
			expect(mockChapterResourceService.getChapters).toHaveBeenCalledWith("2");
			expect(mockFicStorageService.getChapters).not.toHaveBeenCalled();
			
		});
		
		it('should get chapters from storage service when offline', function() {
			
			$window.navigator.onLine = false;
			
			fsChapters = [
				{ id: "1", number: 1 },
				{ id: "2", number: 2 }
			];
			
			expect(chapterDataService.getChapters("2")).toEqual(fsChapters);
			expect(mockFicStorageService.getChapters).toHaveBeenCalledWith("2");
			expect(mockChapterResourceService.getChapters).not.toHaveBeenCalled();
			
		});
		
		it('should get a chapter from resource service when online', function() {
			
			$window.navigator.onLine = true;
			
			crChapter = { id: "2", number: 2 };
			
			expect(chapterDataService.getChapter("2", 2)).toEqual(crChapter);
			expect(mockChapterResourceService.getChapter).toHaveBeenCalledWith("2", 2);
			expect(mockFicStorageService.getChapter).not.toHaveBeenCalled();
			
		});
		
		it('should get a chapter from storage service when offline', function() {
			
			$window.navigator.onLine = false;
			
			fsChapter = { id: "3", number: 3 };
			
			expect(chapterDataService.getChapter("2", 2)).toEqual(fsChapter);
			expect(mockFicStorageService.getChapter).toHaveBeenCalledWith("2", 2);
			expect(mockChapterResourceService.getChapter).not.toHaveBeenCalled();
			
		});
		
	});
	
});