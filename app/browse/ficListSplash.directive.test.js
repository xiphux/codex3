'use strict';

describe('codex.browse module', function() {
	
	beforeEach(angular.mock.module('codex.browse'));
	
	describe('fic list splash directive', function() {
		
		var element, scope;
		
		beforeEach(angular.mock.module('browse/ficListSplash.html'));
		
		beforeEach(inject(function($rootScope, $compile) {
			
			scope = $rootScope.$new();
			element = angular.element('<codex-fic-list-splash></codex-fic-list-splash>');
			element = $compile(element)(scope);
			scope.$digest();
			
		}));
		
		it('should render splash text', function() {
			expect(element.text()).toContain('Welcome to Codex');
		});
		
	});
	
});