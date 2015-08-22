'use strict';

describe('codex.browse module', function() {
	
	beforeEach(angular.mock.module('codex.browse'));
	
	describe('ficListItem controller', function() {
		
		var mockFicDataService;
		var fliCtrl;
		var ficData;
		
		beforeEach(angular.mock.module(function($provide) {
			ficData = {
				id: "3",
				title: 'Title'
			};
			mockFicDataService = {
				getFic: function(ficId) {
					return ficData;
				}
			};
			spyOn(mockFicDataService, 'getFic').and.callThrough();
			$provide.value('ficDataService', mockFicDataService);
		}));
		
		beforeEach(inject(function($controller) {
			fliCtrl = $controller('ficListItemController', {
				ficDataService: mockFicDataService
			});
			fliCtrl.fic = {
				id: "2"
			};
		}));
		
		it('should default to not expanded', function() {
			expect(fliCtrl.expanded).toBeFalsy();
		});
		
		it('should toggle the expanded state back and forth', function() {
			expect(fliCtrl.expanded).toBeFalsy();
			fliCtrl.toggle();
			expect(fliCtrl.expanded).toBeTruthy();
			fliCtrl.toggle();
			expect(fliCtrl.expanded).toBeFalsy();
			fliCtrl.toggle();
			expect(fliCtrl.expanded).toBeTruthy();
		});
		
		it('should query the data service for fic detail on the first expand only', function() {
			
			expect(mockFicDataService.getFic).not.toHaveBeenCalled();
			
			fliCtrl.toggle();
			expect(mockFicDataService.getFic).toHaveBeenCalledWith("2");
			expect(mockFicDataService.getFic.calls.count()).toBe(1);
			expect(fliCtrl.ficDetail).toEqual(ficData);
			
			fliCtrl.toggle();
			expect(mockFicDataService.getFic.calls.count()).toBe(1);
			expect(fliCtrl.ficDetail).toEqual(ficData);
			
			fliCtrl.toggle();
			expect(mockFicDataService.getFic.calls.count()).toBe(1);
			expect(fliCtrl.ficDetail).toEqual(ficData);
		});
		
	});
	
});