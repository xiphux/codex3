/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.browse')
	.controller('seriesFilterPanelController', seriesFilterPanelController);
	
seriesFilterPanelController.$inject = ['$scope', 'seriesDataService'];

function seriesFilterPanelController($scope, seriesDataService) {
	
	var vm = this;
	
	vm.expanded = false;
	vm.toggleSeriesExpand = toggleSeriesExpand;
	vm.series = null;
	
	var loaded = false;
	
	function toggleSeriesExpand() {
		if (!vm.expanded && !loaded) {
			vm.series = seriesDataService.getSeries();
			loaded = true;
		}
		vm.expanded = !vm.expanded;
	}
}