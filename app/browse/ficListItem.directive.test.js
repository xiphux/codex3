'use strict';

describe('codex.browse module', function() {
	
	beforeEach(angular.mock.module('codex.browse'));
	
	describe('fic list item directive', function() {
		
		var element, scope, $timeout;
		
		beforeEach(angular.mock.module('browse/ficListItem.html'));
		
		beforeEach(inject(function($rootScope, $compile, _$timeout_) {
			
			$timeout = _$timeout_;
			
			componentHandler = jasmine.createSpyObj('componentHandler', ['upgradeElement']);
			scope = $rootScope.$new();
			element = angular.element('<codex-fic-list-item fic="f"></codex-fic-list-item>');
			element = $compile(element)(scope);
			scope.f = {
				id: '2',
				title: 'FicOne',
				authors: [
					{
						id: '1',
						name: 'AuthorOne'
					},
					{
						id: '2',
						name: 'AuthorTwo'
					}
				]
			};
			scope.$digest();
			
		}));
		
		it('should upgrade the js button after a timeout', function() {
			expect(componentHandler.upgradeElement).not.toHaveBeenCalled();
			$timeout.flush();
			var el = element[0].querySelector('.mdl-js-button');
			expect(componentHandler.upgradeElement).toHaveBeenCalledWith(el, 'MaterialButton');
			expect(componentHandler.upgradeElement).toHaveBeenCalledWith(el, 'MaterialRipple');
		});
		
		it('should display the title and author', function() {
			expect(element.html()).toContain('FicOne');
			expect(element.html()).toContain('AuthorOne and AuthorTwo');
		});
		
		it('should provide a read link', function() {
			var a = element.find('a');
			expect(a.attr('href')).toContain('read/2');
		});
		
	});
	
});