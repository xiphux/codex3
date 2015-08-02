/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.browse')

.controller('filterBarGenreItemController', ['$scope', 'ficBrowseService', function($scope, ficBrowseService) {
	this.remove = function() {
		ficBrowseService.removeGenreFilter($scope.genre);
		ficBrowseService.refresh();
	};
}]);