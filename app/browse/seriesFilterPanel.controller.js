/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.browse')
	.controller('seriesFilterPanelController', seriesFilterPanelController);
	
seriesFilterPanelController.$inject = ['$scope', '$window', 'seriesDataService'];

function seriesFilterPanelController($scope, $window, seriesDataService) {
	
	var vm = this;
	
	vm.expanded = false;
	vm.toggleSeriesExpand = toggleSeriesExpand;
	vm.series = undefined;
	
	activate();
	
	function activate() {
		$scope.$watch(function() {
			return $window.navigator.onLine;
		}, function(newValue, oldValue) {
			if (newValue === oldValue) {
				return;
			}
			
			vm.expanded = false;
			vm.series = undefined;
		});
	}
	
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