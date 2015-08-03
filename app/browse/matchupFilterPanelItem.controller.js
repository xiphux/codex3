/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.browse')
	.controller('matchupFilterPanelItemController', matchupFilterPanelItemController);

matchupFilterPanelItemController.$inject = ['$scope', 'ficBrowseService'];

function matchupFilterPanelItemController($scope, ficBrowseService) {
	
	var vm = this;
	
	vm.active = ficBrowseService.hasMatchupFilter($scope.matchup);
	vm.matchCount = ficBrowseService.ficsWithMatchup($scope.matchup);
	vm.showBadge = ficBrowseService.hasSearch();
	vm.toggleMatchupFilter = toggleMatchupFilter;
	
	$scope.$on('ficBrowseFicsUpdated', function() {
		vm.matchCount = ficBrowseService.ficsWithMatchup($scope.matchup);
		vm.showBadge = ficBrowseService.hasSearch();
	});
	
	$scope.$on('ficBrowseMatchupAdded', function(e, matchup) {
		if (!(matchup && (matchup.id == $scope.matchup.id))) {
			return;
		}
		vm.active = true;
	});
	
	$scope.$on('ficBrowseMatchupRemoved', function(e, matchup) {
		if (!(matchup && (matchup.id == $scope.matchup.id))) {
			return;
		}
		vm.active = false;
	});
	
	function toggleMatchupFilter() {
		if (vm.active) {
			ficBrowseService.removeMatchupFilter($scope.matchup);
		} else {
			ficBrowseService.addMatchupFilter($scope.matchup);
		}
		ficBrowseService.refresh();
	}
}