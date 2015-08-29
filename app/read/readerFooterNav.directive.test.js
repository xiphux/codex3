'use strict';

describe('codex.read module', function() {
	
	beforeEach(angular.mock.module('codex.read'));
	
	describe('reader footer nav directive', function() {
		
		var element, scope, $timeout;
		
		beforeEach(angular.mock.module('read/readerFooterNav.html'));
		
		beforeEach(inject(function($rootScope, $compile, _$timeout_) {
			
			$timeout = _$timeout_;
			
			componentHandler = jasmine.createSpyObj('componentHandler', ['upgradeElement']);
			scope = $rootScope.$new();
			element = angular.element('<codex-reader-footer-nav></codex-reader-footer-nav>');
			element = $compile(element)(scope);
			scope.$digest();
			
		}));
		
		it('should upgrade the js buttons after a timeout', function() {
			expect(componentHandler.upgradeElement).not.toHaveBeenCalled();
			$timeout.flush();
			var buttons = element[0].querySelectorAll('.mdl-js-button');
			for (var i = 0; i < buttons.length; i++) {
				expect(componentHandler.upgradeElement).toHaveBeenCalledWith(buttons[i], 'MaterialButton');
				expect(componentHandler.upgradeElement).toHaveBeenCalledWith(buttons[i], 'MaterialRipple');	
			}
		});
		
		it('should display the next and previous chapter links', function() {
			
			var controller = element.controller('codexReaderFooterNav');
			controller.nextChapter = { id: '3', number: 3, title: 'Part Three' };
			controller.prevChapter = { id: '1', number: 1, title: 'Part One' };
			
			scope.$digest();
			
			expect(element.text()).toContain('arrow_back');
			expect(element.text()).toContain('arrow_forward');
			expect(element.text()).toContain('Part Three');
			expect(element.text()).toContain('Part One');
		});
		
	});
	
});