/// <reference path="../../typings/lodash/lodash.d.ts"/>
/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.browse')

.factory('ficBrowseService', ['$rootScope', 'ficDataService', function($rootScope, ficDataService) {
	
	var genreFilters = {};
	var matchupFilters = {};
	var seriesFilters = {};
	
	var searchTerms = [];
	
	var genreCounts = {};
	var matchupCounts = {};
	var seriesCounts = {};
	
	var dirty = false;
	
	var fics = null;
	
	function recount() {
		genreCounts = {};
		matchupCounts = {};
		seriesCounts = {};
		
		if (!fics) {
			return;
		}
		
		for (var i = 0; i < fics.length; i++) {
			
			var fic = fics[i];
			
			if (fic.fic_genres && (fic.fic_genres.length > 0)) {
				for (var j = 0; j < fic.fic_genres.length; j++) {
					var genre_id = fic.fic_genres[j].genre_id;
					if (genre_id) {
						genreCounts[genre_id] = genreCounts[genre_id] ? genreCounts[genre_id] + 1 : 1;
					}
				}
			}
			
			if (fic.fic_matchups && (fic.fic_matchups.length > 0)) {
				for (var j = 0; j < fic.fic_matchups.length; j++) {
					var matchup_id = fic.fic_matchups[j].matchup_id;
					if (matchup_id) {
						matchupCounts[matchup_id] = matchupCounts[matchup_id] ? matchupCounts[matchup_id] + 1 : 1;
					}
				}
			}
			
			if (fic.fic_series && (fic.fic_series.length > 0)) {
				for (var j = 0; j < fic.fic_series.length; j++) {
					var series_id = fic.fic_series[j].series_id;
					if (series_id) {
						seriesCounts[series_id] = seriesCounts[series_id] ? seriesCounts[series_id] + 1 : 1;
					}
				}
			}
			
		}
	};
	
	function getFics() {
		return fics;
	};
	
	function getGenreFilters() {
		return _.values(genreFilters);
	};
	
	function getSeriesFilters() {
		return _.values(seriesFilters);
	};
	
	function getMatchupFilters() {
		return _.values(matchupFilters);
	};
	
	function getSearchTerms() {
		return searchTerms;
	};
	
	function refresh() {
		
		if (!dirty) {
			return;
		}
		
		var genreIds = _.keys(genreFilters);
		var matchupIds = _.keys(matchupFilters);
		var seriesIds = _.keys(seriesFilters);
		
		$rootScope.$broadcast('ficBrowseFicsUpdating');
		if ((genreIds.length > 0) || (matchupIds.length > 0) || (seriesIds.length > 0) || (searchTerms.length > 0)) {
			fics = ficDataService.getFics({
				genres: genreIds,
				matchups: matchupIds,
				series: seriesIds,
				search: searchTerms
			});
			dirty = false;
			fics.$promise.then(function(data) {
				recount();
				$rootScope.$broadcast('ficBrowseFicsUpdated');
			});
		} else {
			fics = null;
			dirty = false;
			recount();
			$rootScope.$broadcast('ficBrowseFicsUpdated');
		}
		
		return fics;
	};
	
	function hasSearch() {
		return hasAnySeriesFilter() || hasAnyGenreFilter() || hasAnyMatchupFilter() || hasAnySearchTerms();
	};
	
	function hasAnyGenreFilter() {
		return !_.isEmpty(genreFilters);
	};
	
	function hasAnyMatchupFilter() {
		return !_.isEmpty(matchupFilters);
	};
	
	function hasAnySeriesFilter() {
		return !_.isEmpty(seriesFilters);
	};
	
	function hasAnySearchTerms() {
		return searchTerms.length > 0;
	};
	
	function hasGenreFilter(genre) {
		if (!genre) {
			return false;
		}
		return _.has(genreFilters, genre.id);
	};
	
	function hasMatchupFilter(matchup) {
		if (!matchup) {
			return false;
		}
		return _.has(matchupFilters, matchup.id);
	};
	
	function hasSeriesFilter(series) {
		if (!series) {
			return false;
		}
		return _.has(seriesFilters, series.id);
	};
	
	function hasSearchTerm(term) {
		if (!term) {
			return false;
		}
		return _.includes(searchTerms, term);
	};
	
	function addGenreFilter(genre) {
		if (!genre || hasGenreFilter(genre)) {
			return;
		}
		genreFilters[genre.id] = genre;
		dirty = true;
		$rootScope.$broadcast('ficBrowseGenreAdded', genre);
	};
	
	function removeGenreFilter(genre) {
		if (!(genre && hasGenreFilter(genre))) {
			return;
		}
		delete genreFilters[genre.id];
		dirty = true;
		$rootScope.$broadcast('ficBrowseGenreRemoved', genre);
	};
	
	function addMatchupFilter(matchup) {
		if (!matchup || hasMatchupFilter(matchup)) {
			return;
		}
		matchupFilters[matchup.id] = matchup;
		dirty = true;
		$rootScope.$broadcast('ficBrowseMatchupAdded', matchup);
	};
	
	function removeMatchupFilter(matchup) {
		if (!(matchup && hasMatchupFilter(matchup))) {
			return;
		}
		delete matchupFilters[matchup.id];
		dirty = true;
		$rootScope.$broadcast('ficBrowseMatchupRemoved', matchup);
	};
	
	function addSeriesFilter(series) {
		if (!series || hasSeriesFilter(series)) {
			return;
		}
		seriesFilters[series.id] = series;
		dirty = true;
		$rootScope.$broadcast('ficBrowseSeriesAdded', series);
	};
	
	function removeSeriesFilter(series) {
		if (!(series && hasSeriesFilter(series))) {
			return;
		}
		delete seriesFilters[series.id];
		dirty = true;
		$rootScope.$broadcast('ficBrowseSeriesRemoved', series);
	};
	
	function setSearchTerms(terms) {
		var tempTerms = _.uniq(_.compact(terms));
		if (_.isEqual(tempTerms, searchTerms)) {
			return;
		}
		searchTerms = tempTerms;
		dirty = true;
	};
	
	function ficsWithGenre(genre) {
		if (!(genre && fics)) {
			return 0;
		}
		
		return genreCounts[genre.id] || 0;
	};
	
	function ficsWithMatchup(matchup) {
		if (!(matchup && fics)) {
			return 0;
		}
		
		return matchupCounts[matchup.id] || 0;
	};
	
	function ficsWithSeries(series) {
		if (!(series && fics)) {
			return 0;
		}
		
		return seriesCounts[series.id] || 0;
	};
	
	function clear() {
		var tempSeriesFilters = seriesFilters;
		seriesFilters = {};
		_.forEach(tempSeriesFilters, function(n, key) {
			$rootScope.$broadcast('ficBrowseSeriesRemoved', n);
		});
		var tempGenreFilters = genreFilters;
		genreFilters = {};
		_.forEach(tempGenreFilters, function(n, key) {
			$rootScope.$broadcast('ficBrowseGenreRemoved', n);
		});
		var tempMatchupFilters = matchupFilters;
		matchupFilters = {};
		_.forEach(tempMatchupFilters, function(n, key) {
			$rootScope.$broadcast('ficBrowseMatchupRemoved', n);
		});
		searchTerms = [];
		$rootScope.$broadcast('ficBrowseSearchCleared');
		dirty = true;
		refresh();
	};
	
	return {
		
		getFics: getFics,
		getGenreFilters: getGenreFilters,
		getMatchupFilters: getMatchupFilters,
		getSeriesFilters: getSeriesFilters,
		getSearchTerms: getSearchTerms,
		
		refresh: refresh,

		hasSearch: hasSearch,
		
		addGenreFilter: addGenreFilter,		
		removeGenreFilter: removeGenreFilter,
		hasGenreFilter: hasGenreFilter,
		hasAnyGenreFilter: hasAnyGenreFilter,
		ficsWithGenre: ficsWithGenre,
		
		addMatchupFilter: addMatchupFilter,
		removeMatchupFilter: removeMatchupFilter,
		hasMatchupFilter: hasMatchupFilter,
		hasAnyMatchupFilter: hasAnyMatchupFilter,
		ficsWithMatchup: ficsWithMatchup,
		
		addSeriesFilter: addSeriesFilter,
		removeSeriesFilter: removeSeriesFilter,
		hasSeriesFilter: hasSeriesFilter,
		hasAnySeriesFilter: hasAnySeriesFilter,
		ficsWithSeries: ficsWithSeries,
		
		hasSearchTerm: hasSearchTerm,
		setSearchTerms: setSearchTerms,
		
		clear: clear
		
	};
	
}]);