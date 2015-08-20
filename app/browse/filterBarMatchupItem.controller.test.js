'use strict';

describe('codex.browse module', function() {
	
	beforeEach(module('codex.browse'));
	
	describe('filter bar matchup item controller', function() {
		
		var mockFicBrowseService, fbmiCtrl;
		
		beforeEach(inject(function(_$controller_) {
			mockFicBrowseService = jasmine.createSpyObj('mockFicBrowseService', ['removeMatchupFilter', 'refresh']);
			fbmiCtrl = _$controller_('filterBarMatchupItemController', {
				ficBrowseService: mockFicBrowseService
			});
			fbmiCtrl.matchup = {
				id: '2',
				characters: [
					{
						id: '1',
						name: 'CharacterOne'
					},
					{
						id: '3',
						name: 'CharacterThree'
					}
				]
			};
		}));
		
		it('should remove the matchup and refresh when remove is called', function() {
			
			fbmiCtrl.remove();
			expect(mockFicBrowseService.removeMatchupFilter).toHaveBeenCalledWith(fbmiCtrl.matchup);
			expect(mockFicBrowseService.refresh).toHaveBeenCalled();
			
		});
		
	});
	
});