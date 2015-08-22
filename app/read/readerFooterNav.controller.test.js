'use strict';

describe('codex.read module', function() {
	
	beforeEach(angular.mock.module('codex.read'));
	
	describe('reader footer nav controller', function() {
		
		var rfnCtrl, mockReadService, scope, nextChapter, prevChapter;
		
		beforeEach(inject(function($controller, $rootScope) {
			
			nextChapter = null;
			prevChapter = null;
			
			mockReadService = {
				getNextChapter: function() {
					return nextChapter;
				},
				getPrevChapter: function() {
					return prevChapter;
				},
				nextChapter: jasmine.createSpy('nextChapter'),
				prevChapter: jasmine.createSpy('prevChapter')
			};
			
			scope = $rootScope.$new();
			
			rfnCtrl = $controller('readerFooterNavController', {
				$scope: scope,
				readService: mockReadService
			});
			
		}));
		
		it('should establish the previous chapter on init', function() {
			prevChapter = { id: '1', number: 1 };
			
			scope.$digest();
			
			expect(rfnCtrl.prevChapter).toEqual(prevChapter);
		});
		
		it('should establish the next chapter on init', function() {
			nextChapter = { id: '2', number: 2 };
			
			scope.$digest();
			
			expect(rfnCtrl.nextChapter).toEqual(nextChapter);
		});
		
		it('should update when the previous chapter changes', function() {
			
			scope.$digest();
			
			expect(rfnCtrl.prevChapter).toBeNull();
			
			prevChapter = { id: '1', number: 1 };
			
			scope.$digest();
			
			expect(rfnCtrl.prevChapter).toEqual(prevChapter);
			
		});
		
		it('should update when the next chapter changes', function() {
			
			scope.$digest();
			
			expect(rfnCtrl.nextChapter).toBeNull();
			
			nextChapter = { id: '2', number: 2 };
			
			scope.$digest();
			
			expect(rfnCtrl.nextChapter).toEqual(nextChapter);
			
		});
		
		it('should trigger the read service to the next chapter', function() {
			rfnCtrl.gotoNextChapter();
			expect(mockReadService.nextChapter).toHaveBeenCalled();
		});
		
		it('should trigger the read service to the previous chapter', function() {
			rfnCtrl.gotoPrevChapter();
			expect(mockReadService.prevChapter).toHaveBeenCalled();
		});
		
	});
	
});