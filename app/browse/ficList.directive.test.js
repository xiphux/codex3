'use strict';

describe('codex.browse module', function() {
	
	beforeEach(angular.mock.module('codex.browse'));
	
	describe('fic list directive', function() {
		
		var element, scope;
		
		beforeEach(angular.mock.module('browse/ficList.html'));
		beforeEach(angular.mock.module('browse/ficListSplash.html'));
		beforeEach(angular.mock.module('browse/ficListItem.html'));
		beforeEach(angular.mock.module('components/directives/spinner.html'));
		beforeEach(angular.mock.module('components/directives/progressBar.html'));
		
		beforeEach(inject(function($rootScope, $compile) {
			
			scope = $rootScope.$new();
			element = angular.element('<codex-fic-list></codex-fic-list>');
			element = $compile(element)(scope);
			scope.$digest();
			
		}));
		
		it('should render an mdl grid', function() {
			expect(element.hasClass('mdl-grid')).toBeTruthy();
		});
		
	});
	
});