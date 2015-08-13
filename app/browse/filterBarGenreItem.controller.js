/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.browse')
	.controller('filterBarGenreItemController', filterBarGenreItemController);

filterBarGenreItemController.$inject = ['ficBrowseService'];

function filterBarGenreItemController(ficBrowseService) {
	
	var vm = this;
	
	vm.remove = remove;
	
	function remove() {
		ficBrowseService.removeGenreFilter(vm.genre);
		ficBrowseService.refresh();
	}
}