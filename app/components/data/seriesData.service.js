'use strict';

angular.module('codex.data')
	.factory('seriesDataService', seriesDataService);

seriesDataService.$inject = ['$resource'];

function seriesDataService($resource) {
	
	var seriesResource = $resource('api/series');
	
	function getSeries() {
		return seriesResource.query();
	};
	
	return {
		getSeries: getSeries
	};
	
}