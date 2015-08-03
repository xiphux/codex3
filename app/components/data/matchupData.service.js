'use strict';

angular.module('codex.data')
	.factory('matchupDataService', matchupDataService);

matchupDataService.$inject = ['$resource'];

function matchupDataService($resource) {
	
	var matchupsResource = $resource('api/matchups');
	
	var service = {
		getMatchups: getMatchups
	};
	return service;
	
	function getMatchups() {
		return matchupsResource.query();
	};
	
}