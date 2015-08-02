/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.browse')
	.controller('seriesFilterPanelController', seriesFilterPanelController);
	
seriesFilterPanelController.$inject = ['$scope', 'seriesDataService'];

function seriesFilterPanelController($scope, seriesDataService) {
	
	this.expanded = false;
	this.loaded = false;
	
	this.toggleSeriesExpand = function() {
		if (!this.expanded && !this.loaded) {
			this.series = seriesDataService.getSeries();
			this.loaded = true;
		}
		this.expanded = !this.expanded;
	};
}