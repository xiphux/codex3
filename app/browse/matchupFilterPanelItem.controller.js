/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.browse')

.controller('matchupFilterPanelItemController', ['$scope', 'ficBrowseService', function($scope, ficBrowseService) {
	this.active = ficBrowseService.hasMatchupFilter($scope.matchup);
	this.matchCount = ficBrowseService.ficsWithMatchup($scope.matchup);
	this.showBadge = ficBrowseService.hasSearch();
	
	var that = this;
	
	$scope.$on('ficBrowseFicsUpdated', function() {
		that.matchCount = ficBrowseService.ficsWithMatchup($scope.matchup);
		that.showBadge = ficBrowseService.hasSearch();
	});
	
	$scope.$on('ficBrowseMatchupAdded', function(e, matchup) {
		if (!(matchup && (matchup.id == $scope.matchup.id))) {
			return;
		}
		that.active = true;
	});
	
	$scope.$on('ficBrowseMatchupRemoved', function(e, matchup) {
		if (!(matchup && (matchup.id == $scope.matchup.id))) {
			return;
		}
		that.active = false;
	});
	
	this.toggleMatchupFilter = function() {
		if (this.active) {
			ficBrowseService.removeMatchupFilter($scope.matchup);
		} else {
			ficBrowseService.addMatchupFilter($scope.matchup);
		}
		ficBrowseService.refresh();
	};
}]);