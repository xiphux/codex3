/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.browse')
	.controller('filterBarGenreItemController', filterBarGenreItemController);

filterBarGenreItemController.$inject = ['$scope', 'ficBrowseService'];

function filterBarGenreItemController($scope, ficBrowseService) {
	
	var vm = this;
	
	vm.remove = remove;
	
	function remove() {
		ficBrowseService.removeGenreFilter($scope.genre);
		ficBrowseService.refresh();
	}
}