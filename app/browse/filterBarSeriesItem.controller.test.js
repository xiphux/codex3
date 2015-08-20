'use strict';

describe('codex.browse module', function() {
	
	beforeEach(angular.mock.module('codex.browse'));
	
	describe('filter bar series item controller', function() {
		
		var mockFicBrowseService, fbsiCtrl;
		
		beforeEach(inject(function(_$controller_) {
			mockFicBrowseService = jasmine.createSpyObj('mockFicBrowseService', ['removeSeriesFilter', 'refresh']);
			fbsiCtrl = _$controller_('filterBarSeriesItemController', {
				ficBrowseService: mockFicBrowseService
			});
			fbsiCtrl.series = {
				id: '2',
				title: 'SeriesTwo'
			};
		}));
		
		it('should remove the series and refresh when remove is called', function() {
			
			fbsiCtrl.remove();
			expect(mockFicBrowseService.removeSeriesFilter).toHaveBeenCalledWith(fbsiCtrl.series);
			expect(mockFicBrowseService.refresh).toHaveBeenCalled();
			
		});
		
	});
	
});