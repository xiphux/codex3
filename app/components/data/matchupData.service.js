'use strict';

angular.module('codex.data')
	.factory('matchupDataService', matchupDataService);

matchupDataService.$inject = ['$window', 'matchupResourceService', 'ficStorageService'];

function matchupDataService($window, matchupResourceService, ficStorageService) {
	
	var service = {
		getMatchups: getMatchups
	};
	return service;
	
	function getMatchups() {
		if ($window.navigator.onLine) {
			return matchupResourceService.getMatchups();
		} else {
			return ficStorageService.getMatchups();
		}
	};
	
}