'use strict';

describe('codex.browse module', function() {
	
	beforeEach(angular.mock.module('codex.browse'));
	
	describe('browse controller', function() {
		
		var mockPageService, bCtrl, $timeout, scope, $window;
		
		beforeEach(inject(function(_$controller_, _$timeout_, $rootScope) {
			$timeout = _$timeout_;
			
			$window = {
				navigator: {
					onLine: true
				}
			};
			
			componentHandler = jasmine.createSpyObj('componentHandler', ['upgradeAllRegistered']);
			
			mockPageService = jasmine.createSpyObj('mockPageService', ['setSubtitle']);
			
			scope = $rootScope.$new();
			
			bCtrl = _$controller_('browseController', {
				pageService: mockPageService,
				$scope: scope,
				$window: $window
			});
		}));
		
		it('should set the page subtitle to null after initialization', function() {
			expect(mockPageService.setSubtitle).toHaveBeenCalledWith(null);
		});
		
		it('should upgrade all elements only after viewcontentloaded and timeout', function() {
			
			expect(componentHandler.upgradeAllRegistered).not.toHaveBeenCalled();
			
			scope.$broadcast('$viewContentLoaded');
			
			expect(componentHandler.upgradeAllRegistered).not.toHaveBeenCalled();
			
			$timeout.flush();
			
			expect(componentHandler.upgradeAllRegistered).toHaveBeenCalled();
			
		});
		
		it('should initialize with the online state', function() {
			
			$window.navigator.onLine = false;
			
			scope.$digest();
			
			expect(bCtrl.online).toBeFalsy();
			
		});
		
		it('should reflect changes to the online state', function() {
			
			scope.$digest();
			
			expect(bCtrl.online).toBeTruthy();
			
			$window.navigator.onLine = false;
			
			scope.$digest();
			
			expect(bCtrl.online).toBeFalsy();
			
			$window.navigator.onLine = true;
			
			scope.$digest();
			
			expect(bCtrl.online).toBeTruthy();
			
		});
		
	});
	
});