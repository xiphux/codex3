'use strict';

angular.module('codex.data', ['ngResource'])

.factory('ficDataService', ['$resource', function($resource) {
	
	var ficsResource = $resource('api/fics');
	var ficResource = $resource('api/fics/:ficId');
	
	var getFics = function(filters) {
		
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
		}
		
		return ficsResource.query(params);
	};
	
	var getFic = function(ficId) {
		if (!ficId) {
			return null;
		}
		return ficResource.get({ ficId: ficId });
	};
	
	return {
		getFics: getFics,
		getFic: getFic
	};

}])

.factory('chapterDataService', ['$resource', function($resource) {
	
	var chaptersResource = $resource('api/fics/:ficId/chapters');
	var chapterResource = $resource('api/fics/:ficId/chapters/:num');
	
	var getChapters = function(ficId) {
		if (!ficId) {
			return null;
		}
		return chaptersResource.query({ ficId: ficId });
	};
	
	var getChapter = function(ficId, num) {
		if (!(ficId && num)) {
			return null;
		}
		return chapterResource.get({ ficId: ficId, num: num });
	};
	
	return {
		getChapters: getChapters,
		getChapter: getChapter
	};
	
}])

.factory('seriesDataService', ['$resource', function($resource) {
	
	var seriesResource = $resource('api/series');
	
	var getSeries = function() {
		return seriesResource.query();
	};
	
	return {
		getSeries: getSeries
	};
	
}])

.factory('genreDataService', ['$resource', function($resource) {
	
	var genresResource = $resource('api/genres');
	
	var getGenres = function() {
		return genresResource.query();
	};
	
	return {
		getGenres: getGenres
	};
	
}])

.factory('matchupDataService', ['$resource', function($resource) {
	
	var matchupsResource = $resource('api/matchups');
	
	var getMatchups = function() {
		return matchupsResource.query();
	};
	
	return {
		getMatchups: getMatchups
	};
	
}]);