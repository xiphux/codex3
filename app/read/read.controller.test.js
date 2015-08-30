'use strict';

describe('codex.read module', function() {
	
	beforeEach(angular.mock.module('codex.read'));
	
	describe('read controller', function() {
		
		var rCtrl, mockPageService, mockReadService, mockLocationService, scope, routeParams, $q, $timeout, $rootScope, $window;
		var chapters, fic, chapter, chapterNum, hasMultipleChapters;
		
		beforeEach(inject(function($controller, _$rootScope_, _$timeout_, _$q_) {
			
			$timeout = _$timeout_;
			$q = _$q_;
			$rootScope = _$rootScope_;
			
			chapter = undefined;
			hasMultipleChapters = undefined;
			fic = undefined;
			chapter = undefined;
			
			$window = {
				navigator: {
					onLine: true
				}
			};
			
			componentHandler = jasmine.createSpyObj('componentHandler', ['upgradeAllRegistered']);
			
			mockPageService = jasmine.createSpyObj('mockPageService', ['setSubtitle']);
			
			mockReadService = {
				getFic: function() {
					return fic;
				},
				getChapters: function() {
					return chapters;
				},
				getChapter: function() {
					return chapter;
				},
				getChapterNumber: function() {
					return chapterNum;
				},
				hasMultipleChapters: function() {
					return hasMultipleChapters;
				},
				setFic: jasmine.createSpy('setFic')
			};
			spyOn(mockReadService, 'getFic').and.callThrough();
			spyOn(mockReadService, 'getChapters').and.callThrough();
			spyOn(mockReadService, 'getChapter').and.callThrough();
			spyOn(mockReadService, 'getChapterNumber').and.callThrough();
			spyOn(mockReadService, 'hasMultipleChapters').and.callThrough();
			
			mockLocationService = {
				path: jasmine.createSpy('path'),
				skipReload: function() {
					return mockLocationService;
				}
			};
			spyOn(mockLocationService, 'skipReload').and.callThrough();
			
			scope = $rootScope.$new();
			
			routeParams = {
				ficId: '2',
				chapterNum: '2'
			};
			
			rCtrl = $controller('readController', {
				$scope: scope,
				readService: mockReadService,
				pageService: mockPageService,
				$routeParams: routeParams,
				$locationEx: mockLocationService,
				$window: $window
			});
			
		}));
		
		it('should initialize the read service', function() {
			scope.$digest();
			
			expect(mockReadService.setFic).toHaveBeenCalledWith(routeParams.ficId, routeParams.chapterNum);
		});
		
		it('bind to the fic from the read service one time', function() {
			
			fic = {
				id: '1',
				title: 'FicOne'
			};
			var ficDeferred = $q.defer();
			fic.$promise = ficDeferred.promise;
			
			scope.$digest();
			
			expect(mockReadService.getFic).toHaveBeenCalled();
			
			expect(rCtrl.fic).toBeUndefined();
			
			ficDeferred.resolve(fic);
			$rootScope.$apply();
			
			expect(rCtrl.fic).toEqual(fic);
			
			mockReadService.getFic.calls.reset();
			
			fic = {
				id: '2',
				title: 'FicTwo'
			};
			ficDeferred = $q.defer();
			fic.$promise = ficDeferred.promise;
			
			scope.$digest();
			
			expect(mockReadService.getFic).not.toHaveBeenCalled();
			
			ficDeferred.resolve(fic);
			$rootScope.$apply();
			
			expect(rCtrl.fic.id).toEqual('1');
			expect(rCtrl.fic.title).toEqual('FicOne');
		});
		
		it('bind to the chapters from the read service one time', function() {
			
			chapters = [
				{ id: '1', number: 1 },
				{ id: '2', number: 2 }
			];
			var chaptersDeferred = $q.defer();
			chapters.$promise = chaptersDeferred.promise;
			
			scope.$digest();
			
			expect(mockReadService.getChapters).toHaveBeenCalled();
			
			expect(rCtrl.chapters).toBeUndefined();
			
			chaptersDeferred.resolve(chapters);
			$rootScope.$apply();
			
			expect(rCtrl.chapters).toEqual(chapters);
			
			mockReadService.getChapters.calls.reset();
			
			chapters = [
				{ id: '3', number: 3 },
				{ id: '4', number: 4 }
			];
			chaptersDeferred = $q.defer();
			chapters.$promise = chaptersDeferred.promise;
			
			scope.$digest();
			
			expect(mockReadService.getChapters).not.toHaveBeenCalled();
			
			chaptersDeferred.resolve(chapters);
			$rootScope.$apply();
			
			expect(rCtrl.chapters).toContain({ id: '1', number: 1 });
			expect(rCtrl.chapters).toContain({ id: '2', number: 2 });
			expect(rCtrl.chapters).not.toContain({ id: '3', number: 3 });
			expect(rCtrl.chapters).not.toContain({ id: '4', number: 4 });
			
		});
		
		it('should initialize with the read service chapter', function() {
			
			chapter = {
				id: '1',
				number: 1
			};
			var chapterDeferred = $q.defer();
			chapter.$promise = chapterDeferred.promise;
			
			scope.$digest();
			
			expect(mockReadService.getChapter).toHaveBeenCalled();
			
			chapterDeferred.resolve(chapter);
			$rootScope.$apply();
			
			expect(rCtrl.chapter).toEqual(chapter);
			
		});
		
		it('should listen for changes to the read service chapter', function() {
			
			scope.$digest();
			
			expect(rCtrl.chapter).toBeUndefined();
			
			chapter = { id: '1', number: 1 };
			var chapterDeferred = $q.defer();
			chapter.$promise = chapterDeferred.promise;
			
			scope.$digest();
			
			expect(rCtrl.chapter).toEqual(chapter);
			
			chapter = { id: '2', number: 2 };
			chapterDeferred = $q.defer();
			chapter.$promise = chapterDeferred.promise;
			
			scope.$digest();
			
			expect(rCtrl.chapter).toEqual(chapter);
			
		});
		
		it('should change the page url when the chapter changes', function() {
			
			scope.$digest();
			
			expect(mockLocationService.path).not.toHaveBeenCalled();
			expect(mockLocationService.skipReload).not.toHaveBeenCalled();
			
			chapter = { id: '1', number: 1, $promise: $q.defer().promise };
			chapterNum = 1;
			
			scope.$digest();
			
			expect(mockLocationService.skipReload).toHaveBeenCalled();
			expect(mockLocationService.path).toHaveBeenCalledWith('/read/2/chapters/1');
			
			mockLocationService.skipReload.calls.reset();
			mockLocationService.path.calls.reset();
			
			scope.$digest();
			
			expect(mockLocationService.path).not.toHaveBeenCalled();
			expect(mockLocationService.skipReload).not.toHaveBeenCalled();
			
			chapter = { id: '2', number: 2, $promise: $q.defer().promise };
			chapterNum = 2;
			
			scope.$digest();
			
			expect(mockLocationService.skipReload).toHaveBeenCalled();
			expect(mockLocationService.path).toHaveBeenCalledWith('/read/2/chapters/2');
			
		});
		
		it('should indicate when the current chapter is still loading', function() {
			
			scope.$digest();
			
			expect(rCtrl.loading).toBeFalsy();
			
			var chapterDeferred = $q.defer();
			chapter = { id: '1', number: 1, $promise: chapterDeferred.promise };
			
			scope.$digest();
			
			expect(rCtrl.loading).toBeTruthy();
			
			chapterDeferred.resolve(chapter);
			$rootScope.$apply();
			
			expect(rCtrl.loading).toBeFalsy();
			
		});
		
		it('should one time bind to the multiple chapter indicator', function() {
			
			scope.$digest();
			
			expect(rCtrl.multipleChapters).toBeUndefined();
			expect(mockReadService.hasMultipleChapters).toHaveBeenCalled();
			
			mockReadService.hasMultipleChapters.calls.reset();
			
			hasMultipleChapters = true;
			
			scope.$digest();
			
			expect(rCtrl.multipleChapters).toBeTruthy();
			expect(mockReadService.hasMultipleChapters).toHaveBeenCalled();
			
			mockReadService.hasMultipleChapters.calls.reset();
			
			hasMultipleChapters = false;
			
			scope.$digest();
			
			expect(rCtrl.multipleChapters).toBeTruthy();
			expect(mockReadService.hasMultipleChapters).not.toHaveBeenCalled();
			
		});
		
		it('should upgrade all elements in the component handler after view loaded and timeout', function() {
			
			scope.$digest();
			
			expect(componentHandler.upgradeAllRegistered).not.toHaveBeenCalled();
			
			scope.$broadcast('$viewContentLoaded');
			
			expect(componentHandler.upgradeAllRegistered).not.toHaveBeenCalled();
			
			$timeout.flush();
			
			expect(componentHandler.upgradeAllRegistered).toHaveBeenCalled();
			
		});
		
		it('should update the page title with fic but no chapter title when all promises are resolved', function() {
			
			var ficDeferred = $q.defer();
			var chaptersDeferred = $q.defer();
			
			fic = { id: '1', title: 'FicOne', $promise: ficDeferred.promise };
			chapters = [
				{ id: '1', number: 1 },
				{ id: '2', number: 2 }
			];
			chapters.$promise = chaptersDeferred.promise;
			chapter = null;
			
			scope.$digest();
			
			expect(mockPageService.setSubtitle).not.toHaveBeenCalled();
			
			ficDeferred.resolve(fic);
			$rootScope.$apply();
			
			expect(mockPageService.setSubtitle).not.toHaveBeenCalled();
			
			chaptersDeferred.resolve(chapters);
			$rootScope.$apply();
			
			expect(mockPageService.setSubtitle).toHaveBeenCalledWith('FicOne');
			
		});
		
		it('should update the page title with fic but no chapter title when all promises are resolved', function() {
			
			var ficDeferred = $q.defer();
			var chaptersDeferred = $q.defer();
			var chapterDeferred = $q.defer();
			
			fic = { id: '1', title: 'FicOne', $promise: ficDeferred.promise };
			chapters = [
				{ id: '1', number: 1 }
			];
			chapters.$promise = chaptersDeferred.promise;
			chapter = { id: '1', number: 1, $promise: chapterDeferred.promise };
			
			scope.$digest();
			
			expect(mockPageService.setSubtitle).not.toHaveBeenCalled();
			
			ficDeferred.resolve(fic);
			$rootScope.$apply();
			
			expect(mockPageService.setSubtitle).not.toHaveBeenCalled();
			
			chaptersDeferred.resolve(chapters);
			$rootScope.$apply();
			
			expect(mockPageService.setSubtitle).not.toHaveBeenCalled();
			
			chapterDeferred.resolve(chapter);
			$rootScope.$apply();
			
			expect(mockPageService.setSubtitle).toHaveBeenCalledWith('FicOne');
			
		});
		
		it('should update the page title with fic and single chapter title when all promises are resolved', function() {
			
			var ficDeferred = $q.defer();
			var chaptersDeferred = $q.defer();
			var chapterDeferred = $q.defer();
			
			fic = { id: '1', title: 'FicOne', $promise: ficDeferred.promise };
			chapters = [
				{ id: '1', number: 1 }
			];
			chapters.$promise = chaptersDeferred.promise;
			chapter = { id: '1', number: 1, title: 'FicOneSubtitle', $promise: chapterDeferred.promise };
			
			scope.$digest();
			
			expect(mockPageService.setSubtitle).not.toHaveBeenCalled();
			
			ficDeferred.resolve(fic);
			$rootScope.$apply();
			
			expect(mockPageService.setSubtitle).not.toHaveBeenCalled();
			
			chaptersDeferred.resolve(chapters);
			$rootScope.$apply();
			
			expect(mockPageService.setSubtitle).not.toHaveBeenCalled();
			
			chapterDeferred.resolve(chapter);
			$rootScope.$apply();
			
			expect(mockPageService.setSubtitle).toHaveBeenCalledWith('FicOne :: FicOneSubtitle');
			
		});
		
		it('should update the page title with fic and multiple chapter title when all promises are resolved', function() {
			
			var ficDeferred = $q.defer();
			var chaptersDeferred = $q.defer();
			var chapterDeferred = $q.defer();
			
			fic = { id: '1', title: 'FicOne', $promise: ficDeferred.promise };
			chapters = [
				{ id: '1', number: 1 },
				{ id: '2', number: 2 }
			];
			chapters.$promise = chaptersDeferred.promise;
			chapter = { id: '1', number: 1, $promise: chapterDeferred.promise };
			
			scope.$digest();
			
			expect(mockPageService.setSubtitle).not.toHaveBeenCalled();
			
			ficDeferred.resolve(fic);
			$rootScope.$apply();
			
			expect(mockPageService.setSubtitle).not.toHaveBeenCalled();
			
			chaptersDeferred.resolve(chapters);
			$rootScope.$apply();
			
			expect(mockPageService.setSubtitle).not.toHaveBeenCalled();
			
			chapterDeferred.resolve(chapter);
			$rootScope.$apply();
			
			expect(mockPageService.setSubtitle).toHaveBeenCalledWith('FicOne :: Chapter 1');
			
		});
		
		it('should initialize with the online state', function() {
			
			$window.navigator.onLine = false;
			
			scope.$digest();
			
			expect(rCtrl.online).toBeFalsy();
			
		});
		
		it('should reflect changes to the online state', function() {
			
			scope.$digest();
			
			expect(rCtrl.online).toBeTruthy();
			
			$window.navigator.onLine = false;
			
			scope.$digest();
			
			expect(rCtrl.online).toBeFalsy();
			
			$window.navigator.onLine = true;
			
			scope.$digest();
			
			expect(rCtrl.online).toBeTruthy();
			
		});
		
	});
	
});