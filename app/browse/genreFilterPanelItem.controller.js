/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.browse')

.controller('genreFilterPanelItemController', ['$scope', 'ficBrowseService', function($scope, ficBrowseService) {
	
	this.active = ficBrowseService.hasGenreFilter($scope.genre);
	this.matchCount = ficBrowseService.ficsWithGenre($scope.genre);
	this.showBadge = ficBrowseService.hasSearch();
	
	var that = this;
	
	$scope.$on('ficBrowseFicsUpdated', function() {
		that.matchCount = ficBrowseService.ficsWithGenre($scope.genre);
		that.showBadge = ficBrowseService.hasSearch();
	});
	
	$scope.$on('ficBrowseGenreAdded', function(e, genre) {
		if (!(genre && (genre.id == $scope.genre.id))) {
			return;
		}
		that.active = true;
	});
	
	$scope.$on('ficBrowseGenreRemoved', function(e, genre) {
		if (!(genre && (genre.id == $scope.genre.id))) {
			return;
		}
		that.active = false;
	});
	
	this.toggleGenreFilter = function() {
		if (this.active) {
			ficBrowseService.removeGenreFilter($scope.genre);
		} else {
			ficBrowseService.addGenreFilter($scope.genre);
		}
		ficBrowseService.refresh();
	};
}]);