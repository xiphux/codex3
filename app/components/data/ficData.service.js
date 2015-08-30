'use strict';

angular.module('codex.data')
	.factory('ficDataService', ficDataService);

ficDataService.$inject = ['$window', 'ficResourceService', 'ficStorageService'];

function ficDataService($window, ficResourceService, ficStorageService) {
	
	var service = {
		getFics: getFics,
		getFic: getFic
	};
	return service;
	
	function getFics(filters) {
		if ($window.navigator.onLine) {
			return ficResourceService.getFics(filters);
		} else {
			return ficStorageService.getFics(filters);
		}
	};
	
	function getFic(ficId) {
		if ($window.navigator.onLine) {
			return ficResourceService.getFic(ficId);
		} else {
			return ficStorageService.getFic(ficId);
		}
	};

}