'use strict';

angular.module('codex.data')
	.factory('seriesDataService', seriesDataService);

seriesDataService.$inject = ['$window', 'seriesResourceService', 'ficStorageService'];

function seriesDataService($window, seriesResourceService, ficStorageService) {
	
	var service = {
		getSeries: getSeries
	};
	return service;
	
	function getSeries() {
		if ($window.navigator.onLine) {
			return seriesResourceService.getSeries();
		} else {
			return ficStorageService.getSeries();
		}
	};
	
}