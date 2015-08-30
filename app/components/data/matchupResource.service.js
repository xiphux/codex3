'use strict';

angular.module('codex.data')
	.factory('matchupResourceService', matchupResourceService);

matchupResourceService.$inject = ['$resource'];

function matchupResourceService($resource) {
	
	var matchupsResource = $resource('api/matchups');
	
	var service = {
		getMatchups: getMatchups
	};
	return service;
	
	function getMatchups() {
		return matchupsResource.query();
	};
	
}