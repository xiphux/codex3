/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.browse')
	.controller('matchupFilterPanelItemController', matchupFilterPanelItemController);

matchupFilterPanelItemController.$inject = ['$scope', 'ficBrowseService'];

function matchupFilterPanelItemController($scope, ficBrowseService) {
	
	var vm = this;
	
	vm.active = false;
	vm.matchCount = null;
	vm.showBadge = false;
	vm.toggleMatchupFilter = toggleMatchupFilter;
	
	activate();
	
	function activate() {
	
		$scope.$watch(function() {
			return ficBrowseService.getFics();
		}, function(newValue, oldValue) {
			if (newValue !== null) {
				newValue.$promise.then(function(data) {
					updateBadge();
				});
			} else {
				updateBadge();
			}
		});
		
		$scope.$watch(function() {
			return !!ficBrowseService.hasMatchupFilter(vm.matchup);
		}, function(newValue, oldValue) {
			vm.active = newValue;
		});
	
	}
	
	function updateBadge() {
		vm.matchCount = ficBrowseService.ficsWithMatchup(vm.matchup);
		vm.showBadge = ficBrowseService.hasSearch();
	}
	
	function toggleMatchupFilter() {
		if (vm.active) {
			ficBrowseService.removeMatchupFilter(vm.matchup);
		} else {
			ficBrowseService.addMatchupFilter(vm.matchup);
		}
		ficBrowseService.refresh();
	}
}