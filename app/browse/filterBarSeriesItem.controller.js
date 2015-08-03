/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.browse')
	.controller('filterBarSeriesItemController', filterBarSeriesItemController);

filterBarSeriesItemController.$inject = ['$scope', 'ficBrowseService'];

function filterBarSeriesItemController($scope, ficBrowseService) {
	var vm = this;
	
	vm.remove = remove; 
	
	function remove() {
		ficBrowseService.removeSeriesFilter($scope.series);
		ficBrowseService.refresh();
	};
}