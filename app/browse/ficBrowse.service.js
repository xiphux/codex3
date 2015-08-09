/// <reference path="../../typings/lodash/lodash.d.ts"/>
/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.browse')
	.factory('ficBrowseService', ficBrowseService);

ficBrowseService.$inject = ['ficDataService'];

function ficBrowseService(ficDataService) {
	
	var genreFilters = {};
	var matchupFilters = {};
	var seriesFilters = {};
	
	var searchTerms = [];
	
	var genreCounts = {};
	var matchupCounts = {};
	var seriesCounts = {};
	
	var dirty = false;
	
	var fics = null;
	
	var service = {
		
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
	return service;
	
	function recount() {
		genreCounts = fics ? _(fics).pluck('fic_genres').flatten().countBy('genre_id').value() : {};
		matchupCounts = fics ? _(fics).pluck('fic_matchups').flatten().countBy('matchup_id').value() : {};
		seriesCounts = fics ? _(fics).pluck('fic_series').flatten().countBy('series_id').value() : {};
	};
	
	function getFics() {
		return fics;
	};
	
	function getGenreFilters() {
		return genreFilters;
	};
	
	function getSeriesFilters() {
		return seriesFilters;
	};
	
	function getMatchupFilters() {
		return matchupFilters;
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
			});
		} else {
			fics = null;
			dirty = false;
			recount();
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
		return genre.id in genreFilters;
	};
	
	function hasMatchupFilter(matchup) {
		if (!matchup) {
			return false;
		}
		return matchup.id in matchupFilters;
	};
	
	function hasSeriesFilter(series) {
		if (!series) {
			return false;
		}
		return series.id in seriesFilters;
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
	};
	
	function removeGenreFilter(genre) {
		if (!(genre && hasGenreFilter(genre))) {
			return;
		}
		delete genreFilters[genre.id];
		dirty = true;
	};
	
	function addMatchupFilter(matchup) {
		if (!matchup || hasMatchupFilter(matchup)) {
			return;
		}
		matchupFilters[matchup.id] = matchup;
		dirty = true;
	};
	
	function removeMatchupFilter(matchup) {
		if (!(matchup && hasMatchupFilter(matchup))) {
			return;
		}
		delete matchupFilters[matchup.id];
		dirty = true;
	};
	
	function addSeriesFilter(series) {
		if (!series || hasSeriesFilter(series)) {
			return;
		}
		seriesFilters[series.id] = series;
		dirty = true;
	};
	
	function removeSeriesFilter(series) {
		if (!(series && hasSeriesFilter(series))) {
			return;
		}
		delete seriesFilters[series.id];
		dirty = true;
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
		seriesFilters = {};
		genreFilters = {};
		matchupFilters = {};
		searchTerms = [];
		dirty = true;
		refresh();
	};
	
}