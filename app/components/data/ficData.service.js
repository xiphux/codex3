'use strict';

angular.module('codex.data')
	.factory('ficDataService', ficDataService);

ficDataService.$inject = ['$resource'];

function ficDataService($resource) {
	
	var ficsResource = $resource('api/fics');
	var ficResource = $resource('api/fics/:ficId');
	
	var service = {
		getFics: getFics,
		getFic: getFic
	};
	return service;
	
	function getFics(filters) {
		
		var params = {};
		
		if (filters) {
			if (filters.series && (filters.series.length > 0)) {
				if (filters.series.length > 1) {
					params['series[]'] = filters.series;
				} else {
					params['series'] = filters.series[0];
				}
			}
			
			if (filters.genres && (filters.genres.length > 0)) {
				if (filters.genres.length > 1) {
					params['genre[]'] = filters.genres;
				} else {
					params['genre'] = filters.genres[0];
				}
			}
			
			if (filters.matchups && (filters.matchups.length > 0)) {
				if (filters.matchups.length > 1) {
					params['matchup[]'] = filters.matchups;
				} else {
					params['matchup'] = filters.matchups[0];
				}
			}
			
			if (filters.search && (filters.search.length > 0)) {
				if (filters.search.length > 1) {
					params['search[]'] = filters.search;
				} else {
					params['search'] = filters.search[0];
				}
			}
		}
		
		return ficsResource.query(params);
	};
	
	function getFic(ficId) {
		if (!ficId) {
			return null;
		}
		return ficResource.get({ ficId: ficId });
	};

}