'use strict';

describe('codex.read module', function() {
	
	beforeEach(angular.mock.module('codex.read'));
	
	describe('chapter text controller', function() {
		
		var mockReadService, ctCtrl, chapter, scope;
		
		beforeEach(inject(function($controller, $rootScope) {
			
			chapter = null;
			
			mockReadService = {
				getChapter: function() {
					return chapter;
				}
			};
			spyOn(mockReadService, 'getChapter').and.callThrough();
			
			scope = $rootScope.$new();
			
			ctCtrl = $controller('chapterTextController', {
				$scope: scope,
				readService: mockReadService
			});
			
		}));
		
		it('should initialize with the current chapter', function() {
			
			chapter = {
				id: '1',
				number: 1
			};
			
			scope.$digest();
			
			expect(ctCtrl.chapter).toEqual(chapter);
			
		});
		
		it('should update when the chapter changes', function() {
			
			scope.$digest();
			
			expect(ctCtrl.chapter).toBeNull();
			
			chapter = {
				id: '2',
				number: 2
			};
			
			scope.$digest();
			
			expect(ctCtrl.chapter).toEqual(chapter);
			
		});
		
	});
	
});