'use strict';

angular.module('codex.data')
	.factory('genreDataService', genreDataService);

genreDataService.$inject = ['$resource'];

function genreDataService($resource) {
	
	var genresResource = $resource('api/genres');
	
	function getGenres() {
		return genresResource.query();
	};
	
	return {
		getGenres: getGenres
	};
	
}