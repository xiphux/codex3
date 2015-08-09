/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.browse')
	.controller('matchupFilterPanelController', matchupFilterPanelController);

matchupFilterPanelController.$inject = ['matchupDataService'];

function matchupFilterPanelController(matchupDataService) {
	
	var vm = this;
	
	vm.expanded = false;
	vm.toggleMatchupExpand = toggleMatchupExpand;
	vm.matchups = undefined;

	function toggleMatchupExpand() {
		if (!vm.expanded && (vm.matchups === undefined)) {
			var matchups = matchupDataService.getMatchups();
			matchups.$promise.then(function(data) {
				vm.matchups = data;
			});
		}	
		vm.expanded = !vm.expanded;
		
	}
}