'use strict';

describe('codex.read module', function() {
	
	beforeEach(angular.mock.module('codex.read'));
	
	describe('chapter list controller', function() {
		
		var mockReadService, chapters, clCtrl, scope, $q, $rootScope;
		
		beforeEach(inject(function($controller, _$rootScope_, _$q_) {
			
			$q = _$q_;
			$rootScope = _$rootScope_;
			
			chapters = undefined;
			
			mockReadService = {
				getChapters: function() {
					return chapters;
				}
			};
			spyOn(mockReadService, 'getChapters').and.callThrough();
			
			scope = $rootScope.$new();
			
			clCtrl = $controller('chapterListController', {
				$scope: scope,
				readService: mockReadService
			});
			
		}));
		
		it('should initialize with chapters', function() {
			
			var queryDeferred = $q.defer();
			chapters = [
				{ id: '1', number: 1 },
				{ id: '2', number: 2 }
			];
			chapters.$promise = queryDeferred.promise;
			
			scope.$digest();
			
			queryDeferred.resolve(chapters);
			$rootScope.$apply();
			
			expect(clCtrl.chapters).toEqual(chapters);
			
		});
		
		it('should bind chapters once only', function() {
			
			scope.$digest();
			
			var chapters1 = [
				{ id: 1, number: 1 }
			];
			var chapters2 = [
				{ id: 2, number: 2 }
			];
			
			var queryDeferred = $q.defer();
			chapters = { $promise: queryDeferred.promise };
			
			scope.$digest();
			
			queryDeferred.resolve(chapters1);
			$rootScope.$apply();
			
			expect(clCtrl.chapters).toEqual(chapters1);
			expect(mockReadService.getChapters).toHaveBeenCalled();
			
			mockReadService.getChapters.calls.reset();
			
			queryDeferred = $q.defer();
			chapters = { $promise: queryDeferred.promise };
			
			scope.$digest();
			
			queryDeferred.resolve(chapters2);
			$rootScope.$apply();
			
			expect(clCtrl.chapters).toEqual(chapters1);
			expect(mockReadService.getChapters).not.toHaveBeenCalled();
			
		});
		
	});
	
});