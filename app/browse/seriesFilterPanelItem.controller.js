/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.browse')
	.controller('seriesFilterPanelItemController', seriesFilterPanelItemController);

seriesFilterPanelItemController.$inject = ['$scope', 'ficBrowseService'];

function seriesFilterPanelItemController($scope, ficBrowseService) {
	
	var vm = this;
	
	vm.active = false;
	vm.matchCount = null;
	vm.showBadge = false;
	vm.toggleSeriesFilter = toggleSeriesFilter;
	
	$scope.$watch(function() {
		return ficBrowseService.getFics();
	}, function(newValue, oldValue) {
		if (newValue !== null) {
			newValue.$promise.then(function(data) {
				updateBadge();
			});
		} else {
			updateBadge();
		}
	});
	
	
	$scope.$watch(function() {
		return !!ficBrowseService.hasSeriesFilter($scope.series);
	}, function(newValue, oldValue) {
		vm.active = newValue;
	});
	
	function updateBadge() {
		vm.matchCount = ficBrowseService.ficsWithSeries($scope.series);
		vm.showBadge = ficBrowseService.hasSearch();
	}
	
	function toggleSeriesFilter() {
		if (vm.active) {
			ficBrowseService.removeSeriesFilter($scope.series);
		} else {
			ficBrowseService.addSeriesFilter($scope.series);
		}
		ficBrowseService.refresh();
	}
}