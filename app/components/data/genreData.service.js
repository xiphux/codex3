'use strict';

angular.module('codex.data')
	.factory('genreDataService', genreDataService);

genreDataService.$inject = ['$window', 'genreResourceService', 'ficStorageService'];

function genreDataService($window, genreResourceService, ficStorageService) {
	
	var service = {
		getGenres: getGenres
	};
	return service;
	
	function getGenres() {
		if ($window.navigator.onLine) {
			return genreResourceService.getGenres();
		} else {
			return ficStorageService.getGenres();
		}
	};
	
}