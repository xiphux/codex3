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
	vm.hasFilters = false;
	
	activate();
	
	function activate() {
	
		$scope.$watchCollection(function() {
			return ficBrowseService.getGenreFilters();
		}, function(newValues, oldValues) {
			updateFilters('genreFilters', newValues, oldValues);
		});
		
		$scope.$watchCollection(function() {
			return ficBrowseService.getMatchupFilters();
		}, function(newValues, oldValues) {
			updateFilters('matchupFilters', newValues, oldValues);
		});
		
		$scope.$watchCollection(function() {
			return ficBrowseService.getSeriesFilters();
		}, function(newValues, oldValues) {
			updateFilters('seriesFilters', newValues, oldValues);
		});
	
	}
	
	function updateFilters(filterProp, newValues, oldValues) {
		var oldKeys = _.keys(oldValues);
		var newKeys = _.keys(newValues);
		
		var addedKeys = _.difference(newKeys, oldKeys);
		var removedKeys = _.difference(oldKeys, newKeys);
		
		if ((addedKeys.length == 0) && (removedKeys.length == 0)) {
			// this is an initialization - populate all keys (if present) 
			if (newKeys.length > 0) {
				addedKeys = newKeys;
			} else {
				return;
			}
		}
		
		_.forEach(addedKeys, function(id) {
			vm[filterProp].push(newValues[id]);
		});
		
		_.forEach(removedKeys, function(id) {
			_.remove(vm[filterProp], function(i) {
				return i.id == id;
			});
		});
		
		updateFilterState();
	}
	
	function clear() {
		ficBrowseService.clear();
		ficBrowseService.refresh();
	}
	
	function updateFilterState() {
		vm.hasFilters = ficBrowseService.hasAnyGenreFilter() || ficBrowseService.hasAnySeriesFilter() || ficBrowseService.hasAnyMatchupFilter();
	}
	
}