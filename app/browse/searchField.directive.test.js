'use strict';

describe('codex.browse module', function() {
	
	beforeEach(module('codex.browse'));
	
	describe('search field directive', function() {
		
		var element, scope, $timeout;
		
		beforeEach(module('browse/searchField.html'));
		
		beforeEach(inject(function($rootScope, $compile, _$timeout_) {
			
			$timeout = _$timeout_;
			
			componentHandler = jasmine.createSpyObj('componentHandler', ['upgradeElement']);
			scope = $rootScope.$new();
			element = angular.element('<codex-search-field></codex-search-field>');
			element = $compile(element)(scope);
			scope.$digest();
			
		}));
		
		it('should upgrade the js button and textfield after a timeout', function() {
			expect(componentHandler.upgradeElement).not.toHaveBeenCalled();
			$timeout.flush();
			expect(componentHandler.upgradeElement).toHaveBeenCalledWith(element[0], 'MaterialTextfield');
			expect(componentHandler.upgradeElement).toHaveBeenCalledWith(element[0].querySelector('.mdl-js-button'), 'MaterialButton');
		});
		
		it('should provide a search icon', function() {
			var i = element.find('i');
			expect(i.text()).toEqual('search');
		});
		
		it('should provide an input field bound to the model', function() {
			var input = element.find('input');
			expect(input.attr('ng-model')).toEqual('sfCtrl.search');
		});
		
	});
	
});