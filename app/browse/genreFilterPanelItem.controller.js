/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.browse')
	.controller('genreFilterPanelItemController', genreFilterPanelItemController);

genreFilterPanelItemController.$inject = ['$scope', 'ficBrowseService'];

function genreFilterPanelItemController($scope, ficBrowseService) {
	
	var vm = this;
	
	vm.active = ficBrowseService.hasGenreFilter($scope.genre);
	vm.matchCount = ficBrowseService.ficsWithGenre($scope.genre);
	vm.showBadge = ficBrowseService.hasSearch();
	vm.toggleGenreFilter = toggleGenreFilter;
	
	$scope.$on('ficBrowseFicsUpdated', function() {
		vm.matchCount = ficBrowseService.ficsWithGenre($scope.genre);
		vm.showBadge = ficBrowseService.hasSearch();
	});
	
	$scope.$on('ficBrowseGenreAdded', function(e, genre) {
		if (!(genre && (genre.id == $scope.genre.id))) {
			return;
		}
		vm.active = true;
	});
	
	$scope.$on('ficBrowseGenreRemoved', function(e, genre) {
		if (!(genre && (genre.id == $scope.genre.id))) {
			return;
		}
		vm.active = false;
	});
	
	function toggleGenreFilter() {
		if (vm.active) {
			ficBrowseService.removeGenreFilter($scope.genre);
		} else {
			ficBrowseService.addGenreFilter($scope.genre);
		}
		ficBrowseService.refresh();
	}
}