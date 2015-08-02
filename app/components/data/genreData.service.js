'use strict';

angular.module('codex.data')

.factory('genreDataService', ['$resource', function($resource) {
	
	var genresResource = $resource('api/genres');
	
	function getGenres() {
		return genresResource.query();
	};
	
	return {
		getGenres: getGenres
	};
	
}]);