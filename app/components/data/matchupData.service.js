'use strict';

angular.module('codex.data')
	.factory('matchupDataService', matchupDataService);

matchupDataService.$inject = ['$resource'];

function matchupDataService($resource) {
	
	var matchupsResource = $resource('api/matchups');
	
	function getMatchups() {
		return matchupsResource.query();
	};
	
	return {
		getMatchups: getMatchups
	};
	
}