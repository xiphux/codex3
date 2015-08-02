/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.browse')

.controller('seriesFilterPanelItemController', ['$scope', 'ficBrowseService', function($scope, ficBrowseService) {
	
	this.active = ficBrowseService.hasSeriesFilter($scope.series);
	this.matchCount = ficBrowseService.ficsWithSeries($scope.series);
	this.showBadge = ficBrowseService.hasSearch();
	
	var that = this;
	
	$scope.$on('ficBrowseFicsUpdated', function() {
		that.matchCount = ficBrowseService.ficsWithSeries($scope.series);
		that.showBadge = ficBrowseService.hasSearch();
	});
	
	$scope.$on('ficBrowseSeriesAdded', function(e, series) {
		if (!(series && (series.id == $scope.series.id))) {
			return;
		}
		that.active = true;
	});
	
	$scope.$on('ficBrowseSeriesRemoved', function(e, series) {
		if (!(series && (series.id == $scope.series.id))) {
			return;
		}
		that.active = false;
	});
	
	this.toggleSeriesFilter = function() {
		if (this.active) {
			ficBrowseService.removeSeriesFilter($scope.series);
		} else {
			ficBrowseService.addSeriesFilter($scope.series);
		}
		ficBrowseService.refresh();
	};
}]);