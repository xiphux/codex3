'use strict';

describe('codex.browse module', function() {
	
	beforeEach(angular.mock.module('codex.browse'));
	
	describe('ficListItem controller', function() {
		
		var mockFicDataService, mockFicStorageService;
		var fliCtrl;
		var ficData;
		var hasFic;
		var scope;
		var progress;
		var $window;
		
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
			
			hasFic = false;
			progress = null;
			mockFicStorageService = {
				hasFic: function(ficId) {
					return hasFic;
				},
				getFicProgress: function(ficId) {
					return progress;
				},
				removeFic: jasmine.createSpy('removeFic'),
				addFic: jasmine.createSpy('addFic')
			};
			spyOn(mockFicStorageService, 'hasFic').and.callThrough();
			spyOn(mockFicStorageService, 'getFicProgress').and.callThrough();
			
			$provide.value('ficDataService', mockFicDataService);
			$provide.value('ficStorageService', mockFicStorageService);
		}));
		
		beforeEach(inject(function($controller, $rootScope) {
			$window = {
				navigator: {
					onLine: true
				}
			};
			scope = $rootScope.$new();
			fliCtrl = $controller('ficListItemController', {
				ficDataService: mockFicDataService,
				ficStorageService: mockFicStorageService,
				$scope: scope,
				$window: $window
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
			fliCtrl.toggleExpand();
			expect(fliCtrl.expanded).toBeTruthy();
			fliCtrl.toggleExpand();
			expect(fliCtrl.expanded).toBeFalsy();
			fliCtrl.toggleExpand();
			expect(fliCtrl.expanded).toBeTruthy();
		});
		
		it('should query the data service for fic detail on the first expand only', function() {
			
			expect(mockFicDataService.getFic).not.toHaveBeenCalled();
			
			fliCtrl.toggleExpand();
			expect(mockFicDataService.getFic).toHaveBeenCalledWith("2");
			expect(mockFicDataService.getFic.calls.count()).toBe(1);
			expect(fliCtrl.ficDetail).toEqual(ficData);
			
			fliCtrl.toggleExpand();
			expect(mockFicDataService.getFic.calls.count()).toBe(1);
			expect(fliCtrl.ficDetail).toEqual(ficData);
			
			fliCtrl.toggleExpand();
			expect(mockFicDataService.getFic.calls.count()).toBe(1);
			expect(fliCtrl.ficDetail).toEqual(ficData);
		});
		
		it('should initialize offline availability from the storage service', function() {
			
			hasFic = true;
			
			scope.$digest();
			
			expect(mockFicStorageService.hasFic).toHaveBeenCalledWith("2");
			
			expect(fliCtrl.availableOffline).toBeTruthy();
			
		});
		
		it('should update offline availability from the storage service', function() {
			
			scope.$digest();
			
			expect(fliCtrl.availableOffline).toBeFalsy();
			
			hasFic = true;
			
			scope.$digest();
			
			expect(fliCtrl.availableOffline).toBeTruthy();
			
		});
		
		it('should initialize offline progress from the storage service', function() {
			
			progress = 100;
			
			scope.$digest();
			
			expect(mockFicStorageService.getFicProgress).toHaveBeenCalledWith("2");
			
			expect(fliCtrl.offlineProgress).toEqual(100);
			
		});
		
		it('should update offline progress from the storage service', function() {
			
			scope.$digest();
			
			expect(fliCtrl.offlineProgress).toBeNull();
			
			progress = 10;
			
			scope.$digest();
			
			expect(fliCtrl.offlineProgress).toEqual(10);
			
			progress = 50;
			
			scope.$digest();
			
			expect(fliCtrl.offlineProgress).toEqual(50);
			
			progress = 100;
			
			scope.$digest();
			
			expect(fliCtrl.offlineProgress).toEqual(100);
		});
		
		it('should add or remove the fic from the storage service when toggled', function() {
			
			scope.$digest();
			
			expect(fliCtrl.availableOffline).toBeFalsy();
			
			expect(mockFicStorageService.addFic).not.toHaveBeenCalled();
			expect(mockFicStorageService.removeFic).not.toHaveBeenCalled();
			
			fliCtrl.toggleOffline();
			
			expect(mockFicStorageService.addFic).toHaveBeenCalledWith("2");
			expect(mockFicStorageService.removeFic).not.toHaveBeenCalled();
			
			mockFicStorageService.addFic.calls.reset();
			mockFicStorageService.removeFic.calls.reset();
			
			hasFic = true;
			
			scope.$digest();
			
			fliCtrl.toggleOffline();
			
			expect(mockFicStorageService.addFic).not.toHaveBeenCalled();
			expect(mockFicStorageService.removeFic).toHaveBeenCalledWith("2");
			
		});
		
		it('should initialize with the online state', function() {
			
			$window.navigator.onLine = false;
			
			scope.$digest();
			
			expect(fliCtrl.online).toBeFalsy();
			
		});
		
		it('should reflect changes to the online state', function() {
			
			scope.$digest();
			
			expect(fliCtrl.online).toBeTruthy();
			
			$window.navigator.onLine = false;
			
			scope.$digest();
			
			expect(fliCtrl.online).toBeFalsy();
			
			$window.navigator.onLine = true;
			
			scope.$digest();
			
			expect(fliCtrl.online).toBeTruthy();
			
		});
		
	});
	
});