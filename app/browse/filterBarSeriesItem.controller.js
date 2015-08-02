/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.browse')

.controller('filterBarSeriesItemController', ['$scope', 'ficBrowseService', function($scope, ficBrowseService) {
	this.remove = function() {
		ficBrowseService.removeSeriesFilter($scope.series);
		ficBrowseService.refresh();
	};
}]);