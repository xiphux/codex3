'use strict';

describe('codex.browse module', function() {
	
	beforeEach(module('codex.browse'));
	
	describe('filter bar genre item controller', function() {
		
		var mockFicBrowseService, fbgiCtrl;
		
		beforeEach(inject(function(_$controller_) {
			mockFicBrowseService = jasmine.createSpyObj('mockFicBrowseService', ['removeGenreFilter', 'refresh']);
			fbgiCtrl = _$controller_('filterBarGenreItemController', {
				ficBrowseService: mockFicBrowseService
			});
			fbgiCtrl.genre = {
				id: '2',
				name: 'GenreTwo'
			};
		}));
		
		it('should remove the genre and refresh when remove is called', function() {
			
			fbgiCtrl.remove();
			expect(mockFicBrowseService.removeGenreFilter).toHaveBeenCalledWith(fbgiCtrl.genre);
			expect(mockFicBrowseService.refresh).toHaveBeenCalled();
			
		});
		
	});
	
});