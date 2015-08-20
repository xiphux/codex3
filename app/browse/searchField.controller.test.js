'use strict';

describe('codex.browse module', function() {
	
	beforeEach(angular.mock.module('codex.browse'));
	
	describe('search field controller', function() {
		
		var mockFicBrowseService, sfCtrl, searchTerms, scope;
		
		beforeEach(inject(function(_$controller_, $rootScope) {
			searchTerms = [];
			mockFicBrowseService = {
				getSearchTerms: function() {
					return searchTerms;
				},
				setSearchTerms: function(terms) {},
				refresh: function() {}
			};
			spyOn(mockFicBrowseService, 'setSearchTerms');
			spyOn(mockFicBrowseService, 'refresh');
			scope = $rootScope.$new();
			sfCtrl = _$controller_('searchFieldController', {
				ficBrowseService: mockFicBrowseService,
				$scope: scope
			});
			scope.sfCtrl = sfCtrl;
		}));
		
		it('should update the search property when the search terms change', function() {
			scope.$digest();
			
			expect(sfCtrl.search).toEqual('');
			
			searchTerms = ['termone'];
			
			scope.$digest();
			
			expect(sfCtrl.search).toEqual('termone');
			
			searchTerms = ['termone termtwo'];
			
			scope.$digest();
			
			expect(sfCtrl.search).toEqual('termone termtwo');
			
			searchTerms = ['termtwo'];
			
			scope.$digest();
			
			expect(sfCtrl.search).toEqual('termtwo');
			
			searchTerms = [];
			
			scope.$digest();
			
			expect(sfCtrl.search).toEqual('');
			
			searchTerms = null;
			
			scope.$digest();
			
			expect(sfCtrl.search).toEqual('');
			
		});
		
		it('should update the search terms when the search property changes', function() {
			
			scope.$digest();
			
			expect(sfCtrl.search).toEqual('');
			
			expect(mockFicBrowseService.setSearchTerms).not.toHaveBeenCalled();
			expect(mockFicBrowseService.refresh).not.toHaveBeenCalled();
			
			sfCtrl.search = 'termone termtwo';
			
			scope.$digest();
			
			expect(mockFicBrowseService.setSearchTerms).toHaveBeenCalledWith(['termone', 'termtwo']);
			expect(mockFicBrowseService.refresh).toHaveBeenCalled();
			
		});
		
	});
	
});