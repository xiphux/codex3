/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.browse')

.controller('filterBarMatchupItemController', ['$scope', 'ficBrowseService', function($scope, ficBrowseService) {
	this.remove = function() {
		ficBrowseService.removeMatchupFilter($scope.matchup);
		ficBrowseService.refresh();
	};
}]);