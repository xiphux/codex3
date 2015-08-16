'use strict';

describe('codex.services module', function() {
	
	beforeEach(module('codex.services'));
	
	describe('page service', function() {
		
		var mockWindow;
		var mockPageService;
		
		beforeEach(function() {
			
			mockWindow = {
				document: {
					title: null
				}
			};
			
			module(function($provide) {
				$provide.value('$window', mockWindow);
			});
			
		});
		
		beforeEach(inject(function(_pageService_) {
			mockPageService = _pageService_;
		}));
		
		describe('get title', function() {
			
			it('should return the current window title', function() {
				
				mockWindow.document.title = 'Codex Test Title';
				
				expect(mockPageService.getTitle()).toEqual(mockWindow.document.title);
				
			});
			
		});
		
		describe('get subtitle', function() {
			
			it('should return the current subtitle if empty', function() {
				
				mockPageService.setSubtitle('');
				
				expect(mockPageService.getSubtitle()).toEqual('');
				
				mockPageService.setSubtitle(null);
				
				expect(mockPageService.getSubtitle()).toBeNull();
				
			});
			
			it('should return the current subtitle if populated', function() {
				
				var subtitle = 'Codex Subtitle';
				
				mockPageService.setSubtitle(subtitle);
				
				expect(mockPageService.getSubtitle()).toEqual(subtitle);
				
			});
			
		});
		
		describe('set subtitle', function() {
			
			it('should set the window title to the default title without a subtitle', function() {
				mockWindow.document.title = 'Previous Title';
				
				mockPageService.setSubtitle('');
				
				expect(mockWindow.document.title).toEqual('Codex');
			});
			
			it('should set the window title to the default plus subtitle', function() {
				
				mockWindow.document.title = 'Previous Title';
				
				mockPageService.setSubtitle('Page Subtitle');
				
				expect(mockWindow.document.title).toEqual('Codex :: Page Subtitle');
				
			});
			
		});
		
	});
	
});