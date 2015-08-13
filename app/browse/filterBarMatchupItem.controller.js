/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.browse')
	.controller('filterBarMatchupItemController', filterBarMatchupItemController);

filterBarMatchupItemController.$inject = ['ficBrowseService'];

function filterBarMatchupItemController(ficBrowseService) {
	var vm = this;
	
	vm.remove = remove;
	
	function remove() {
		ficBrowseService.removeMatchupFilter(vm.matchup);
		ficBrowseService.refresh();
	}
}