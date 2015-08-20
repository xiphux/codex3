'use strict';

describe('codex.browse module', function() {
	
	beforeEach(module('codex.browse'));
	
	describe('browse controller', function() {
		
		var mockPageService, bCtrl, $timeout, scope;
		
		beforeEach(inject(function(_$controller_, _$timeout_, $rootScope) {
			$timeout = _$timeout_;
			
			componentHandler = jasmine.createSpyObj('componentHandler', ['upgradeAllRegistered']);
			
			mockPageService = jasmine.createSpyObj('mockPageService', ['setSubtitle']);
			
			scope = $rootScope.$new();
			
			bCtrl = _$controller_('browseController', {
				pageService: mockPageService,
				$scope: scope
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
		
	});
	
});