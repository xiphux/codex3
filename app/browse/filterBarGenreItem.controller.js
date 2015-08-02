/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.browse')
	.controller('filterBarGenreItemController', filterBarGenreItemController);

filterBarGenreItemController.$inject = ['$scope', 'ficBrowseService'];

function filterBarGenreItemController($scope, ficBrowseService) {
	this.remove = function() {
		ficBrowseService.removeGenreFilter($scope.genre);
		ficBrowseService.refresh();
	};
}