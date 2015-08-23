'use strict';

describe('codex.directives module', function() {
	
	beforeEach(angular.mock.module('codex.directives'));
	
	describe('close drawer directive', function() {
		
		var element, scope, $timeout, mockDocument;
		
		beforeEach(angular.mock.module(function($provide) {
			
			mockDocument = angular.element(document);
			mockDocument.find('body').append('<div class="mdl-layout__drawer is-visible"></div>');
			
			$provide.value('$document', mockDocument);
			
		}));
		
		beforeEach(inject(function($rootScope, $compile, _$timeout_) {
			
			$timeout = _$timeout_;
			
			scope = $rootScope.$new();
			element = angular.element('<a href="#" codex-close-drawer>Click</a>');
			element = $compile(element)(scope);
			scope.$digest();
			
		}));
		
		it('should remove the is-visible class on the drawer on click', function() {
			
			var drawer = mockDocument[0].body.querySelector('.mdl-layout__drawer');
			var eDrawer = angular.element(drawer);
			
			expect(eDrawer.hasClass('is-visible')).toBeTruthy();
			
			element.triggerHandler('click');
			
			expect(eDrawer.hasClass('is-visible')).toBeTruthy();
			
			$timeout.flush();
		
			expect(eDrawer.hasClass('is-visible')).toBeFalsy();
			
		});
		
	});
	
});