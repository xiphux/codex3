/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.browse')

.controller('filterBarController', filterBarController);

filterBarController.$inject = ['$scope', 'ficBrowseService'];

function filterBarController($scope, ficBrowseService) {
	
	this.genreFilters = ficBrowseService.getGenreFilters();
	this.matchupFilters = ficBrowseService.getMatchupFilters();
	this.seriesFilters = ficBrowseService.getSeriesFilters();
	
	this.clear = function() {
		ficBrowseService.clear();
		ficBrowseService.refresh();
	};
	
	var that = this;
	
	function updateFilterState() {
		that.hasFilters = ficBrowseService.hasAnyGenreFilter() || ficBrowseService.hasAnySeriesFilter() || ficBrowseService.hasAnyMatchupFilter();
	}
	updateFilterState();
	
	$scope.$on('ficBrowseSeriesAdded', function(e, series) {
		if (!series) {
			return;
		}
		that.seriesFilters.push(series);
		updateFilterState();
	});
	
	$scope.$on('ficBrowseSeriesRemoved', function(e, series) {
		if (!series) {
			return;
		}
		for (var i = 0; i < that.seriesFilters.length; i++) {
			if (that.seriesFilters[i].id == series.id) {
				that.seriesFilters.splice(i, 1);
				break;
			}
		}
		updateFilterState();
	});
	
	$scope.$on('ficBrowseGenreAdded', function(e, genre) {
		if (!genre) {
			return;
		}
		that.genreFilters.push(genre);
		updateFilterState();
	});
	
	$scope.$on('ficBrowseGenreRemoved', function(e, genre) {
		if (!genre) {
			return;
		}
		for (var i = 0; i < that.genreFilters.length; i++) {
			if (that.genreFilters[i].id == genre.id) {
				that.genreFilters.splice(i, 1);
				break;
			}
		}
		updateFilterState();
	});
	
	$scope.$on('ficBrowseMatchupAdded', function(e, matchup) {
		if (!matchup) {
			return;
		}
		that.matchupFilters.push(matchup);
		updateFilterState();
	});
	
	$scope.$on('ficBrowseMatchupRemoved', function(e, matchup) {
		if (!matchup) {
			return;
		}
		for (var i = 0; i < that.matchupFilters.length; i++) {
			if (that.matchupFilters[i].id == matchup.id) {
				that.matchupFilters.splice(i, 1);
				break;
			}
		}
		updateFilterState();
	});
	
}