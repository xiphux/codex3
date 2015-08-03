/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.browse')
	.controller('filterBarMatchupItemController', filterBarMatchupItemController);

filterBarMatchupItemController.$inject = ['$scope', 'ficBrowseService'];

function filterBarMatchupItemController($scope, ficBrowseService) {
	var vm = this;
	
	vm.remove = remove;
	
	function remove() {
		ficBrowseService.removeMatchupFilter($scope.matchup);
		ficBrowseService.refresh();
	}
}