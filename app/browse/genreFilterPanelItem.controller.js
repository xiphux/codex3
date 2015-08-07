/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.browse')
	.controller('genreFilterPanelItemController', genreFilterPanelItemController);

genreFilterPanelItemController.$inject = ['$scope', 'ficBrowseService'];

function genreFilterPanelItemController($scope, ficBrowseService) {
	
	var vm = this;
	
	vm.active = false;
	vm.matchCount = null;
	vm.showBadge = false;
	vm.toggleGenreFilter = toggleGenreFilter;
	
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
		return !!ficBrowseService.hasGenreFilter($scope.genre);
	}, function(newValue, oldValue) {
		vm.active = newValue;
	});
	
	function updateBadge() {
		vm.matchCount = ficBrowseService.ficsWithGenre($scope.genre);
		vm.showBadge = ficBrowseService.hasSearch();
	}
	
	function toggleGenreFilter() {
		if (vm.active) {
			ficBrowseService.removeGenreFilter($scope.genre);
		} else {
			ficBrowseService.addGenreFilter($scope.genre);
		}
		ficBrowseService.refresh();
	}
}