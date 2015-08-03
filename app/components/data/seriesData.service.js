'use strict';

angular.module('codex.data')
	.factory('seriesDataService', seriesDataService);

seriesDataService.$inject = ['$resource'];

function seriesDataService($resource) {
	
	var seriesResource = $resource('api/series');
	
	var service = {
		getSeries: getSeries
	};
	return service;
	
	function getSeries() {
		return seriesResource.query();
	};
	
}