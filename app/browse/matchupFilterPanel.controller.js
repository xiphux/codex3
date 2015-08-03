/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.browse')
	.controller('matchupFilterPanelController', matchupFilterPanelController);

matchupFilterPanelController.$inject = ['$scope', 'matchupDataService'];

function matchupFilterPanelController($scope, matchupDataService) {
	
	var vm = this;
	
	vm.expanded = false;
	vm.toggleMatchupExpand = toggleMatchupExpand;
	vm.matchups = null;
	 
	var loaded = false;	

	function toggleMatchupExpand() {
		
		if (!vm.expanded && !loaded) {
			vm.matchups = matchupDataService.getMatchups();
			loaded = true;
		}
		
		vm.expanded = !vm.expanded;
		
	}
}