/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.browse')

.controller('filterBarController', filterBarController);

filterBarController.$inject = ['$scope', 'ficBrowseService'];

function filterBarController($scope, ficBrowseService) {
	
	var vm = this;
	
	vm.genreFilters = ficBrowseService.getGenreFilters();
	vm.matchupFilters = ficBrowseService.getMatchupFilters();
	vm.seriesFilters = ficBrowseService.getSeriesFilters();
	vm.clear = clear;
	
	updateFilterState();
	
	$scope.$on('ficBrowseSeriesAdded', function(e, series) {
		if (!series) {
			return;
		}
		vm.seriesFilters.push(series);
		updateFilterState();
	});
	
	$scope.$on('ficBrowseSeriesRemoved', function(e, series) {
		if (!series) {
			return;
		}
		_.remove(vm.seriesFilters, function(s) {
			return s.id == series.id;
		});
		updateFilterState();
	});
	
	$scope.$on('ficBrowseGenreAdded', function(e, genre) {
		if (!genre) {
			return;
		}
		vm.genreFilters.push(genre);
		updateFilterState();
	});
	
	$scope.$on('ficBrowseGenreRemoved', function(e, genre) {
		if (!genre) {
			return;
		}
		_.remove(vm.genreFilters, function(g) {
			return g.id == genre.id;
		});
		updateFilterState();
	});
	
	$scope.$on('ficBrowseMatchupAdded', function(e, matchup) {
		if (!matchup) {
			return;
		}
		vm.matchupFilters.push(matchup);
		updateFilterState();
	});
	
	$scope.$on('ficBrowseMatchupRemoved', function(e, matchup) {
		if (!matchup) {
			return;
		}
		_.remove(vm.matchupFilters, function(m) {
			return m.id == matchup.id;
		});
		updateFilterState();
	});
	
	function clear() {
		ficBrowseService.clear();
		ficBrowseService.refresh();
	}
	
	function updateFilterState() {
		vm.hasFilters = ficBrowseService.hasAnyGenreFilter() || ficBrowseService.hasAnySeriesFilter() || ficBrowseService.hasAnyMatchupFilter();
	}
	
}