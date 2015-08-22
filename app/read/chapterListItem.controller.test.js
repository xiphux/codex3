'use strict';

describe('codex.read module', function() {
	
	beforeEach(angular.mock.module('codex.read'));
	
	describe('chapter list item controller', function() {
		
		var mockReadService, scope, cliCtrl, chapterNumber;
		
		beforeEach(inject(function($controller, $rootScope) {
			
			chapterNumber = undefined;
			
			mockReadService = {
				getChapterNumber: function() {
					return chapterNumber;
				},
				setChapter: jasmine.createSpy('setChapter')
			};
			spyOn(mockReadService, 'getChapterNumber').and.callThrough();
			
			scope = $rootScope.$new();
			
			cliCtrl = $controller('chapterListItemController', {
				$scope: scope,
				readService: mockReadService
			});
			
			cliCtrl.chapter = {
				id: '2',
				number: 2
			};
			
		}));
		
		it('initialize with the appropriate active state', function() {
			
			chapterNumber = 2;
			
			scope.$digest();
			
			expect(cliCtrl.active).toBeTruthy();
			
		});
		
		it('should update to the appropriate active state', function() {
			
			chapterNumber = 1;
			
			scope.$digest();
			
			expect(cliCtrl.active).toBeFalsy();
			
			chapterNumber = 2;
			
			scope.$digest();
			
			expect(cliCtrl.active).toBeTruthy();
			
		});
		
		it('should be able to set the chapter', function() {
			
			scope.$digest();
			
			cliCtrl.setChapter();
			
			expect(mockReadService.setChapter).toHaveBeenCalledWith(2);
			
		});
		
	});
	
});