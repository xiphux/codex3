/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.browse')
	.controller('filterBarSeriesItemController', filterBarSeriesItemController);

filterBarSeriesItemController.$inject = ['$scope', 'ficBrowseService'];

function filterBarSeriesItemController($scope, ficBrowseService) {
	this.remove = function() {
		ficBrowseService.removeSeriesFilter($scope.series);
		ficBrowseService.refresh();
	};
}