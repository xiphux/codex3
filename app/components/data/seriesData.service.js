'use strict';

angular.module('codex.data')

.factory('seriesDataService', ['$resource', function($resource) {
	
	var seriesResource = $resource('api/series');
	
	function getSeries() {
		return seriesResource.query();
	};
	
	return {
		getSeries: getSeries
	};
	
}]);