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
		for (var i = 0; i < vm.seriesFilters.length; i++) {
			if (vm.seriesFilters[i].id == series.id) {
				vm.seriesFilters.splice(i, 1);
				break;
			}
		}
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
		for (var i = 0; i < vm.genreFilters.length; i++) {
			if (vm.genreFilters[i].id == genre.id) {
				vm.genreFilters.splice(i, 1);
				break;
			}
		}
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
		for (var i = 0; i < vm.matchupFilters.length; i++) {
			if (vm.matchupFilters[i].id == matchup.id) {
				vm.matchupFilters.splice(i, 1);
				break;
			}
		}
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