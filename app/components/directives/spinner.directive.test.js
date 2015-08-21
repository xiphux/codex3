'use strict';

describe('codex.directives module', function() {
	
	beforeEach(angular.mock.module('codex.directives'));
	
	describe('spinner directive', function() {
		
		var element, scope, $timeout;
		
		beforeEach(angular.mock.module('components/directives/spinner.html'));
		
		beforeEach(inject(function($rootScope, $compile, _$timeout_) {
			
			$timeout = _$timeout_;
			
			componentHandler = jasmine.createSpyObj('componentHandler', ['upgradeElement']);
			scope = $rootScope.$new();
			element = angular.element('<codex-spinner></codex-spinner>');
			element = $compile(element)(scope);
			scope.$digest();
			
		}));
		
		it('should upgrade the js spinner after a timeout', function() {
			expect(componentHandler.upgradeElement).not.toHaveBeenCalled();
			$timeout.flush();
			expect(componentHandler.upgradeElement).toHaveBeenCalledWith(element[0], 'MaterialSpinner');
		});
		
		it('should create an mdl js spinner', function() {
			expect(element.hasClass('mdl-spinner')).toBeTruthy();
			expect(element.hasClass('mdl-js-spinner')).toBeTruthy();
		});
		
	});
	
});