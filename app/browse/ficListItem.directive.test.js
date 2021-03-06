'use strict';

describe('codex.browse module', function() {
	
	beforeEach(angular.mock.module('codex.browse'));
	
	describe('fic list item directive', function() {
		
		var element, scope, $timeout;
		
		beforeEach(angular.mock.module('browse/ficListItem.html'));
		
		beforeEach(angular.mock.module(function($compileProvider) {
			$compileProvider.directive('codexProgressBar', function() {
				var fake = {
					priority: 100,
					terminal: true,
					restrict: 'E',
					template: '<div class="fake"></div>',
				};
				return fake;
			});
		}));
		
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
		
		it('should upgrade each js button after a timeout', function() {
			expect(componentHandler.upgradeElement).not.toHaveBeenCalled();
			$timeout.flush();
			var buttons = element[0].querySelectorAll('.mdl-js-button');
			for (var i = 0; i < buttons.length; i++) {
				expect(componentHandler.upgradeElement).toHaveBeenCalledWith(buttons[i], 'MaterialButton');
				expect(componentHandler.upgradeElement).toHaveBeenCalledWith(buttons[i], 'MaterialRipple');
			}
		});
		
		it('should display the title and author', function() {
			expect(element.html()).toContain('FicOne');
			expect(element.html()).toContain('AuthorOne and AuthorTwo');
		});
		
		it('should provide a read link', function() {
			var a = element.find('a');
			expect(a.attr('href')).toContain('read/2');
		});
		
		it('should provide an offline button', function() {
			var button = element.find('button');
			expect(button.text()).toContain('offline_pin');
		});
		
	});
	
});