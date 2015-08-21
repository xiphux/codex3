'use strict';

describe('codex.read module', function() {
	
	beforeEach(angular.mock.module('codex.read'));
	
	describe('read service', function() {
		
		var mockFicDataService, mockChapterDataService, rSvc, $q, $rootScope, ficDataFic, chapterDataChapters, chapterDataChapter;
		
		beforeEach(function() {
			
			mockFicDataService = {
				getFic: function(ficId) {
					return ficDataFic;
				}
			};
			
			mockChapterDataService = {
				getChapters: function(ficId) {
					return chapterDataChapters;
				},
				getChapter: function(ficId, chapterNum) {
					return chapterDataChapter;
				}
			};
			
			angular.mock.module(function($provide) {
				$provide.value('ficDataService', mockFicDataService);
				$provide.value('chapterDataService', mockChapterDataService);
			});
			
		});
		
		beforeEach(inject(function(_$q_,_$rootScope_,$injector) {
			
			$q = _$q_;
			$rootScope = _$rootScope_;
			
			ficDataFic = null;
			chapterDataChapter = null;
			chapterDataChapters = null;
			
			spyOn(mockFicDataService, 'getFic').and.callThrough();
			spyOn(mockChapterDataService, 'getChapters').and.callThrough();
			spyOn(mockChapterDataService, 'getChapter').and.callThrough();
			
			rSvc = $injector.get('readService');
		}));
		
		describe('fic and chapter setting', function() {
			
			beforeEach(function() {
				ficDataFic = { id: '1', title: 'FicOne' };
				chapterDataChapters = [
					{ id: '1', number: 1 },
					{ id: '2', number: 2 }
				];
				chapterDataChapters.$promise = $q.defer().promise;
				chapterDataChapters.$resolved = true;
			});
			
			it('should not allow invalid fics', function() {
				expect(rSvc.setFic(null)).toBeFalsy();
				expect(mockFicDataService.getFic).not.toHaveBeenCalled();
				expect(rSvc.getFic()).toBeUndefined();
			});
			
			it('should allow you to set the fic with a default chapter', function() {
				
				chapterDataChapter = { id: '1', number: 1 };
				
				expect(rSvc.setFic(1)).toBeTruthy();
				
				expect(mockFicDataService.getFic).toHaveBeenCalledWith(1);
				expect(rSvc.getFic()).toEqual(ficDataFic);
				expect(rSvc.getChapterNumber()).toEqual(1);
				expect(mockChapterDataService.getChapter).toHaveBeenCalledWith(1,1);
				expect(rSvc.getChapter()).toEqual(chapterDataChapter);
				expect(mockChapterDataService.getChapters).toHaveBeenCalledWith(1);
				
			});
			
			it('should allow you to set the fic with an explicit chapter', function() {
				
				chapterDataChapter = { id: '2', number: 2 };
				
				expect(rSvc.setFic(1,2)).toBeTruthy();
				
				expect(mockFicDataService.getFic).toHaveBeenCalledWith(1);
				expect(rSvc.getFic()).toEqual(ficDataFic);
				expect(rSvc.getChapterNumber()).toEqual(2);
				expect(mockChapterDataService.getChapter).toHaveBeenCalledWith(1,2);
				expect(rSvc.getChapter()).toEqual(chapterDataChapter);
				expect(mockChapterDataService.getChapters).toHaveBeenCalledWith(1);
			});
			
			it('should allow you to change the fic with a default chapter', function() {
				
				rSvc.setFic(12,2);
				
				mockFicDataService.getFic.calls.reset();
				mockChapterDataService.getChapter.calls.reset();
				mockChapterDataService.getChapters.calls.reset();
				
				chapterDataChapter = { id: '1', number: 1 };
				
				expect(rSvc.setFic(1)).toBeTruthy();
				
				expect(mockFicDataService.getFic).toHaveBeenCalledWith(1);
				expect(rSvc.getFic()).toEqual(ficDataFic);
				expect(rSvc.getChapterNumber()).toEqual(1);
				expect(mockChapterDataService.getChapter).toHaveBeenCalledWith(1,1);
				expect(rSvc.getChapter()).toEqual(chapterDataChapter);
				expect(mockChapterDataService.getChapters).toHaveBeenCalledWith(1);
				
			});
			
			it('should allow you to change the fic with an explict chapter', function() {
				
				rSvc.setFic(12,2);
				
				mockFicDataService.getFic.calls.reset();
				mockChapterDataService.getChapter.calls.reset();
				mockChapterDataService.getChapters.calls.reset();
				
				chapterDataChapter = { id: '2', number: 2 };
				
				expect(rSvc.setFic(1,2)).toBeTruthy();
				
				expect(mockFicDataService.getFic).toHaveBeenCalledWith(1);
				expect(rSvc.getFic()).toEqual(ficDataFic);
				expect(rSvc.getChapterNumber()).toEqual(2);
				expect(mockChapterDataService.getChapter).toHaveBeenCalledWith(1,2);
				expect(rSvc.getChapter()).toEqual(chapterDataChapter);
				expect(mockChapterDataService.getChapters).toHaveBeenCalledWith(1);
				
			});
			
			it('should not refetch the same fic', function() {
				
				rSvc.setFic(12,2);
				
				mockFicDataService.getFic.calls.reset();
				
				chapterDataChapter = { id: '2', number: 2 };
				
				expect(rSvc.setFic(12,2)).toBeTruthy();
				
				expect(mockFicDataService.getFic).not.toHaveBeenCalled();
				expect(rSvc.getFic()).toEqual(ficDataFic);
			});
			
			it('should not allow invalid chapters', function() {

				chapterDataChapter = { id: '2', number: 2 };
				
				rSvc.setFic(1,2);
				
				mockChapterDataService.getChapter.calls.reset();
				
				expect(rSvc.setChapter(null)).toBeFalsy();
				expect(mockChapterDataService.getChapter).not.toHaveBeenCalled();
				
				expect(rSvc.setChapter(-1)).toBeFalsy();
				expect(mockChapterDataService.getChapter).not.toHaveBeenCalled();
				
				expect(rSvc.setChapter(3)).toBeFalsy();
				expect(mockChapterDataService.getChapter).not.toHaveBeenCalled();
				
			});
			
			it('should allow you to set the chapter', function() {
				
				chapterDataChapters.$resolved = true;
				chapterDataChapter = { id: '2', number: 2 };
				
				rSvc.setFic(1,2);
				
				mockChapterDataService.getChapter.calls.reset();
				
				chapterDataChapter = { id: '1', number: 1 };
				expect(rSvc.setChapter(1)).toBeTruthy();
				expect(mockChapterDataService.getChapter).toHaveBeenCalledWith(1,1);
				expect(rSvc.getChapter()).toEqual(chapterDataChapter);
				
			});
			
			it('should not refetch the same chapter', function() {
				
				chapterDataChapters.$resolved = true;
				chapterDataChapter = { id: '2', number: 2 };
				
				rSvc.setFic(1,2);
				
				mockChapterDataService.getChapter.calls.reset();

				expect(rSvc.setChapter(2)).toBeTruthy();
				expect(mockChapterDataService.getChapter).not.toHaveBeenCalled();
				expect(rSvc.getChapter()).toEqual(chapterDataChapter);
				
			});
			
		});
		
		describe('previous/next chapter handling', function() {
			
			var queryDeferred;
			
			beforeEach(function() {
				queryDeferred = $q.defer();
			});
			
			it('should have null next/prev chapters for single chapter fics', function() {
				
				chapterDataChapters = [
					{ id: '1', number: 1 }
				];
				chapterDataChapters.$promise = queryDeferred.promise;
				chapterDataChapters.$resolved = true;
				chapterDataChapter = { id: '1', number: 1 };
				
				rSvc.setFic(1, 1);
				queryDeferred.resolve(chapterDataChapters);
				$rootScope.$apply();
				
				expect(rSvc.getNextChapter()).toBeNull();
				expect(rSvc.getPrevChapter()).toBeNull();
				
			});
			
			it('should have a null prev chapter for the first chapter', function() {
				
				chapterDataChapters = [
					{ id: '1', number: 1 },
					{ id: '2', number: 2 },
					{ id: '3', number: 3 }
				];
				chapterDataChapters.$promise = queryDeferred.promise;
				chapterDataChapters.$resolved = true;
				chapterDataChapter = { id: '1', number: 1 };
				
				rSvc.setFic(1, 1);
				queryDeferred.resolve(chapterDataChapters);
				$rootScope.$apply();
				
				expect(rSvc.getNextChapter()).toEqual(chapterDataChapters[1]);
				expect(rSvc.getPrevChapter()).toBeNull();
				
			});
			
			it('should have a null next chapter for the last chapter', function() {
				
				chapterDataChapters = [
					{ id: '1', number: 1 },
					{ id: '2', number: 2 },
					{ id: '3', number: 3 }
				];
				chapterDataChapters.$promise = queryDeferred.promise;
				chapterDataChapters.$resolved = true;
				chapterDataChapter = { id: '3', number: 3 };
				
				rSvc.setFic(1, 3);
				queryDeferred.resolve(chapterDataChapters);
				$rootScope.$apply();
				
				expect(rSvc.getNextChapter()).toBeNull();
				expect(rSvc.getPrevChapter()).toEqual(chapterDataChapters[1]);
				
			});
			
			it('should have both prev/next chapters for middle chapters', function() {
				
				chapterDataChapters = [
					{ id: '1', number: 1 },
					{ id: '2', number: 2 },
					{ id: '3', number: 3 }
				];
				chapterDataChapters.$promise = queryDeferred.promise;
				chapterDataChapters.$resolved = true;
				chapterDataChapter = { id: '2', number: 2 };
				
				rSvc.setFic(1, 2);
				queryDeferred.resolve(chapterDataChapters);
				$rootScope.$apply();
				
				expect(rSvc.getNextChapter()).toEqual(chapterDataChapters[2]);
				expect(rSvc.getPrevChapter()).toEqual(chapterDataChapters[0]);
				
			});
			
			it('should not move to the next chapter if there isnt one', function() {
				chapterDataChapters = [
					{ id: '1', number: 1 },
					{ id: '2', number: 2 },
					{ id: '3', number: 3 }
				];
				chapterDataChapters.$promise = queryDeferred.promise;
				chapterDataChapters.$resolved = true;
				chapterDataChapter = { id: '3', number: 3 };
				
				rSvc.setFic(1, 3);
				queryDeferred.resolve(chapterDataChapters);
				$rootScope.$apply();
				
				mockChapterDataService.getChapter.calls.reset();
				
				expect(rSvc.getNextChapter()).toBeNull();
				expect(rSvc.getPrevChapter()).toEqual(chapterDataChapters[1]);
				
				expect(rSvc.nextChapter()).toBeFalsy();
				
				expect(mockChapterDataService.getChapter).not.toHaveBeenCalled();
				expect(rSvc.getChapter()).toEqual(chapterDataChapter);
				expect(rSvc.getChapterNumber()).toEqual(3);
				
				expect(rSvc.getNextChapter()).toBeNull();
				expect(rSvc.getPrevChapter()).toEqual(chapterDataChapters[1]);
				
			});
			
			it('should not move to the prev chapter if there isnt one', function() {
				chapterDataChapters = [
					{ id: '1', number: 1 },
					{ id: '2', number: 2 },
					{ id: '3', number: 3 }
				];
				chapterDataChapters.$promise = queryDeferred.promise;
				chapterDataChapters.$resolved = true;
				chapterDataChapter = { id: '1', number: 1 };
				
				rSvc.setFic(1, 1);
				queryDeferred.resolve(chapterDataChapters);
				$rootScope.$apply();
				
				mockChapterDataService.getChapter.calls.reset();
				
				expect(rSvc.getNextChapter()).toEqual(chapterDataChapters[1]);
				expect(rSvc.getPrevChapter()).toBeNull();
				
				expect(rSvc.prevChapter()).toBeFalsy();
				
				expect(mockChapterDataService.getChapter).not.toHaveBeenCalled();
				expect(rSvc.getChapter()).toEqual(chapterDataChapter);
				expect(rSvc.getChapterNumber()).toEqual(1);
				
				expect(rSvc.getNextChapter()).toEqual(chapterDataChapters[1]);
				expect(rSvc.getPrevChapter()).toBeNull();
			});
			
			it('should move to the next chapter if there is one', function() {
				
				chapterDataChapters = [
					{ id: '1', number: 1 },
					{ id: '2', number: 2 },
					{ id: '3', number: 3 }
				];
				chapterDataChapters.$promise = queryDeferred.promise;
				chapterDataChapters.$resolved = true;
				chapterDataChapter = { id: '1', number: 1 };
				
				rSvc.setFic(1, 1);
				queryDeferred.resolve(chapterDataChapters);
				$rootScope.$apply();
				
				mockChapterDataService.getChapter.calls.reset();
				
				expect(rSvc.getNextChapter()).toEqual(chapterDataChapters[1]);
				expect(rSvc.getPrevChapter()).toBeNull();
				
				chapterDataChapter = { id: '2', number: 2 };
				
				expect(rSvc.nextChapter()).toBeTruthy();
				
				$rootScope.$apply();
				
				expect(mockChapterDataService.getChapter).toHaveBeenCalledWith(1, 2);
				expect(rSvc.getChapterNumber()).toEqual(2);
				expect(rSvc.getChapter()).toEqual(chapterDataChapter);
				
				expect(rSvc.getNextChapter()).toEqual(chapterDataChapters[2]);
				expect(rSvc.getPrevChapter()).toEqual(chapterDataChapters[0]);
				
			});
			
			it('should move to the prev chapter if there is one', function() {
				
				chapterDataChapters = [
					{ id: '1', number: 1 },
					{ id: '2', number: 2 },
					{ id: '3', number: 3 }
				];
				chapterDataChapters.$promise = queryDeferred.promise;
				chapterDataChapters.$resolved = true;
				chapterDataChapter = { id: '3', number: 3 };
				
				rSvc.setFic(1, 3);
				queryDeferred.resolve(chapterDataChapters);
				$rootScope.$apply();
				
				mockChapterDataService.getChapter.calls.reset();
				
				expect(rSvc.getNextChapter()).toBeNull();
				expect(rSvc.getPrevChapter()).toEqual(chapterDataChapters[1]);
				
				chapterDataChapter = { id: '2', number: 2 };
				
				expect(rSvc.prevChapter()).toBeTruthy();
				
				$rootScope.$apply();
				
				expect(mockChapterDataService.getChapter).toHaveBeenCalledWith(1, 2);
				expect(rSvc.getChapterNumber()).toEqual(2);
				expect(rSvc.getChapter()).toEqual(chapterDataChapter);
				
				expect(rSvc.getNextChapter()).toEqual(chapterDataChapters[2]);
				expect(rSvc.getPrevChapter()).toEqual(chapterDataChapters[0]);
			});
			
		});
		
		it('should return whether there are multiple chapters', function() {
			
			expect(rSvc.hasMultipleChapters()).toBeUndefined();
			
			chapterDataChapters = [
				{ id: '1', number: 1 }
			];
			chapterDataChapters.$promise = $q.defer().promise;
			chapterDataChapters.$resolved = true;
			
			rSvc.setFic(1);
			
			expect(rSvc.getChapters()).toEqual(chapterDataChapters);
			expect(rSvc.hasMultipleChapters()).toBeFalsy();
			
			chapterDataChapters = [
				{ id: '1', number: 1 },
				{ id: '2', number: 2 }
			];
			chapterDataChapters.$promise = $q.defer().promise;
			chapterDataChapters.$resolved = true;
			
			rSvc.setFic(2);
			
			expect(rSvc.getChapters()).toEqual(chapterDataChapters);
			expect(rSvc.hasMultipleChapters()).toBeTruthy();
			
		});
		
	});
	
});