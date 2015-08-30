'use strict';

describe('codex.browse module', function() {
	
	beforeEach(angular.mock.module('codex.browse'));
	
	describe('fic list controller', function() {
		
		var mockFicBrowseService, flCtrl, scope, $rootScope, $q, $window, fics, hasSearch, queryDeferred;
		
		beforeEach(inject(function(_$controller_, _$rootScope_, _$q_) {
			
			$rootScope = _$rootScope_;
			$q = _$q_;
			
			$window = {
				navigator: {
					onLine: true
				}
			};
			
			fics = null;
			hasSearch = false;
			
			mockFicBrowseService = {
				getFics: function() {
					return fics;
				},
				hasSearch: function() {
					return hasSearch;
				},
				clear: jasmine.createSpy('clear')
			};
			
			scope = $rootScope.$new();
			
			flCtrl = _$controller_('ficListController', {
				ficBrowseService: mockFicBrowseService,
				$scope: scope,
				$window: $window
			});
			
		}));
		
		it('should initialize with empty fic list', function() {
			
			$rootScope.$digest();
			
			expect(flCtrl.fics).toBeNull();
			expect(flCtrl.searchActive).toBeFalsy();
			
		});
		
		it('should initialize with already loaded fic list', function() {
			
			fics = [
				{ id: '1', title: 'FicOne' },
				{ id: '2', title: 'FicTwo' }
			];
			fics.$promise = $q.defer().promise;
			hasSearch = true;
			
			$rootScope.$digest();
			expect(flCtrl.fics).toEqual(fics);
			expect(flCtrl.searchActive).toBeTruthy();
			
		});
		
		it('should update fic list and search active on fic list change', function() {
			
			$rootScope.$digest();
			
			expect(flCtrl.fics).toBeNull();
			expect(flCtrl.searchActive).toBeFalsy();
			
			fics = [
				{ id: '1', title: 'FicOne' },
				{ id: '2', title: 'FicTwo' }
			];
			fics.$promise = $q.defer().promise;
			hasSearch = true;
			
			$rootScope.$digest();
			
			expect(flCtrl.fics).toEqual(fics);
			expect(flCtrl.searchActive).toBeTruthy();
			
		});
		
		it('should not have search pending for empty fic list', function() {
			
			$rootScope.$digest();
			
			expect(flCtrl.fics).toBeNull();
			expect(flCtrl.searchPending).toBeFalsy();
			
		});
		
		it('should have search pending for unresolved fic list', function() {
			
			$rootScope.$digest();
			
			expect(flCtrl.searchPending).toBeFalsy();
			
			queryDeferred = $q.defer();
			fics = { $promise: queryDeferred.promise };
			
			var ficData = [
				{ id: '1', title: 'FicOne ' }
			];
			
			$rootScope.$digest();
			
			expect(flCtrl.searchPending).toBeTruthy();
			
			queryDeferred.resolve(ficData);
			
			$rootScope.$digest();
			
			expect(flCtrl.searchPending).toBeFalsy();
			
		});
		
		it('should clear the search if the online state changes', function() {
			
			$rootScope.$digest();
			
			expect(mockFicBrowseService.clear).not.toHaveBeenCalled();
			
			$window.navigator.onLine = true;
			
			$rootScope.$digest();
			
			expect(mockFicBrowseService.clear).not.toHaveBeenCalled();
			
			$window.navigator.onLine = false;
			
			$rootScope.$digest();
			
			expect(mockFicBrowseService.clear).not.toHaveBeenCalled();
			
			hasSearch = true;
			$window.navigator.onLine = true;
			
			$rootScope.$digest();
			
			expect(mockFicBrowseService.clear).toHaveBeenCalled();
			
		});
		
		describe('title sort order', function() {
			
			it('should return Untitled for missing title', function() {
				expect(flCtrl.titleSort(null)).toEqual('UNTITLED');
				expect(flCtrl.titleSort({})).toEqual('UNTITLED');
			});
			
			it('should strip punctuation', function() {
				expect(flCtrl.titleSort({ title: 'stuff-and-things' })).toEqual('STUFFANDTHINGS');
				expect(flCtrl.titleSort({ title: 'stuff*&@$^$things' })).toEqual('STUFFTHINGS');
			});
			
			it('should uppercase inputs', function() {
				expect(flCtrl.titleSort({ title: 'my title' })).toEqual('MY TITLE');
				expect(flCtrl.titleSort({ title: 'My TiTlE' })).toEqual('MY TITLE');
			});
			
			it('should remove "a"', function() {
				expect(flCtrl.titleSort({ title: 'A LONG STORY' })).toEqual('LONG STORY');
				expect(flCtrl.titleSort({ title: 'a long story' })).toEqual('LONG STORY');
			});
			
			it('should remove "an"', function() {
				expect(flCtrl.titleSort({ title: 'AN EVEN LONGER STORY' })).toEqual('EVEN LONGER STORY');
				expect(flCtrl.titleSort({ title: 'an even longer story' })).toEqual('EVEN LONGER STORY');
			});
			
			it('should remove "the"', function() {
				expect(flCtrl.titleSort({ title: 'THE LONGEST STORY' })).toEqual('LONGEST STORY');
				expect(flCtrl.titleSort({ title: 'the longest story' })).toEqual('LONGEST STORY');
			});
			
		});
		
	});
	
});