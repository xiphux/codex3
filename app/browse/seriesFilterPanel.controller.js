/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.browse')
	.controller('seriesFilterPanelController', seriesFilterPanelController);
	
seriesFilterPanelController.$inject = ['$scope', 'seriesDataService'];

function seriesFilterPanelController($scope, seriesDataService) {
	
	var vm = this;
	
	vm.expanded = false;
	vm.toggleSeriesExpand = toggleSeriesExpand;
	vm.series = undefined;
	
	function toggleSeriesExpand() {
		if (!vm.expanded && (vm.series === undefined)) {
			var series = seriesDataService.getSeries();
			series.$promise.then(function(data) {
				vm.series = data;
			});
		}
		vm.expanded = !vm.expanded;
	}
}