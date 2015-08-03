/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.browse')
	.controller('seriesFilterPanelItemController', seriesFilterPanelItemController);

seriesFilterPanelItemController.$inject = ['$scope', 'ficBrowseService'];

function seriesFilterPanelItemController($scope, ficBrowseService) {
	
	var vm = this;
	
	vm.active = ficBrowseService.hasSeriesFilter($scope.series);
	vm.matchCount = ficBrowseService.ficsWithSeries($scope.series);
	vm.showBadge = ficBrowseService.hasSearch();
	vm.toggleSeriesFilter = toggleSeriesFilter;
	
	$scope.$on('ficBrowseFicsUpdated', function() {
		vm.matchCount = ficBrowseService.ficsWithSeries($scope.series);
		vm.showBadge = ficBrowseService.hasSearch();
	});
	
	$scope.$on('ficBrowseSeriesAdded', function(e, series) {
		if (!(series && (series.id == $scope.series.id))) {
			return;
		}
		vm.active = true;
	});
	
	$scope.$on('ficBrowseSeriesRemoved', function(e, series) {
		if (!(series && (series.id == $scope.series.id))) {
			return;
		}
		vm.active = false;
	});
	
	function toggleSeriesFilter() {
		if (vm.active) {
			ficBrowseService.removeSeriesFilter($scope.series);
		} else {
			ficBrowseService.addSeriesFilter($scope.series);
		}
		ficBrowseService.refresh();
	}
}