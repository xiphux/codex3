/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.browse')

.controller('filterBarController', filterBarController);

filterBarController.$inject = ['$scope', 'ficBrowseService'];

function filterBarController($scope, ficBrowseService) {
	
	var vm = this;
	
	vm.genreFilters = [];
	vm.matchupFilters = [];
	vm.seriesFilters = [];
	vm.clear = clear;
	
	updateFilterState();
	
	$scope.$watchCollection(function() {
		return ficBrowseService.getGenreFilters();
	}, function(newValues, oldValues) {
		var oldKeys = _.keys(oldValues);
		var newKeys = _.keys(newValues);
		var addedKeys = _.difference(newKeys, oldKeys);
		var removedKeys = _.difference(oldKeys, newKeys);
		var modified = false;
		
		_.forEach(addedKeys, function(id) {
			vm.genreFilters.push(newValues[id]);
			modified = true;
		});
		_.forEach(removedKeys, function(id) {
			_.remove(vm.genreFilters, function(g) {
				return g.id == id;
			});
			modified = true;
		});
		
		if (modified) {
			updateFilterState();
		}
	});
	
	$scope.$watchCollection(function() {
		return ficBrowseService.getMatchupFilters();
	}, function(newValues, oldValues) {
		var oldKeys = _.keys(oldValues);
		var newKeys = _.keys(newValues);
		var addedKeys = _.difference(newKeys, oldKeys);
		var removedKeys = _.difference(oldKeys, newKeys);
		var modified = false;
		
		_.forEach(addedKeys, function(id) {
			vm.matchupFilters.push(newValues[id]);
			modified = true;
		});
		_.forEach(removedKeys, function(id) {
			_.remove(vm.matchupFilters, function(m) {
				return m.id == id;
			});
			modified = true;
		});
		
		if (modified) {
			updateFilterState();
		}
	});
	
	$scope.$watchCollection(function() {
		return ficBrowseService.getSeriesFilters();
	}, function(newValues, oldValues) {
		var oldKeys = _.keys(oldValues);
		var newKeys = _.keys(newValues);
		var addedKeys = _.difference(newKeys, oldKeys);
		var removedKeys = _.difference(oldKeys, newKeys);
		var modified = false;
		
		_.forEach(addedKeys, function(id) {
			vm.seriesFilters.push(newValues[id]);
			modified = true;
		});
		_.forEach(removedKeys, function(id) {
			_.remove(vm.seriesFilters, function(s) {
				return s.id == id;
			});
			modified = true;
		});
		
		if (modified) {
			updateFilterState();
		}
	});
	
	function clear() {
		ficBrowseService.clear();
		ficBrowseService.refresh();
	}
	
	function updateFilterState() {
		vm.hasFilters = ficBrowseService.hasAnyGenreFilter() || ficBrowseService.hasAnySeriesFilter() || ficBrowseService.hasAnyMatchupFilter();
	}
	
}