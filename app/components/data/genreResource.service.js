'use strict';

angular.module('codex.data')
	.factory('genreResourceService', genreResourceService);

genreResourceService.$inject = ['$resource'];

function genreResourceService($resource) {
	
	var genresResource = $resource('api/genres');
	
	var service = {
		getGenres: getGenres
	};
	return service;
	
	function getGenres() {
		return genresResource.query();
	};
	
}