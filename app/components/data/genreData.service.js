'use strict';

angular.module('codex.data')
	.factory('genreDataService', genreDataService);

genreDataService.$inject = ['$resource'];

function genreDataService($resource) {
	
	var genresResource = $resource('api/genres');
	
	var service = {
		getGenres: getGenres
	};
	return service;
	
	function getGenres() {
		return genresResource.query();
	};
	
}