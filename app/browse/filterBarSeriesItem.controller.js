/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.browse')
	.controller('filterBarSeriesItemController', filterBarSeriesItemController);

filterBarSeriesItemController.$inject = ['ficBrowseService'];

function filterBarSeriesItemController(ficBrowseService) {
	var vm = this;
	
	vm.remove = remove; 
	
	function remove() {
		ficBrowseService.removeSeriesFilter(vm.series);
		ficBrowseService.refresh();
	};
}