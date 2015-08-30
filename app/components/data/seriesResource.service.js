'use strict';

angular.module('codex.data')
	.factory('seriesResourceService', seriesResourceService);

seriesResourceService.$inject = ['$resource'];

function seriesResourceService($resource) {
	
	var seriesResource = $resource('api/series');
	
	var service = {
		getSeries: getSeries
	};
	return service;
	
	function getSeries() {
		return seriesResource.query();
	};
	
}