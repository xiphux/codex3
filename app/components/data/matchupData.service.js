'use strict';

angular.module('codex.data')

.factory('matchupDataService', ['$resource', function($resource) {
	
	var matchupsResource = $resource('api/matchups');
	
	function getMatchups() {
		return matchupsResource.query();
	};
	
	return {
		getMatchups: getMatchups
	};
	
}]);