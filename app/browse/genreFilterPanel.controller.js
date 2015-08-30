/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.browse')
	.controller('genreFilterPanelController', genreFilterPanelController);

genreFilterPanelController.$inject = ['$scope', '$window', 'genreDataService'];

function genreFilterPanelController($scope, $window, genreDataService) {
	
	var vm = this;
	
	vm.expanded = false;
	vm.toggleGenreExpand = toggleGenreExpand;
	vm.genres = undefined;
	
	activate();
	
	function activate() {
		$scope.$watch(function() {
			return $window.navigator.onLine;
		}, function(newValue, oldValue) {
			if (newValue === oldValue) {
				return;
			}
			
			vm.expanded = false;
			vm.genres = undefined;
		});
	}
	
	function toggleGenreExpand() {
		if (!vm.expanded && (vm.genres === undefined)) {
			var genres = genreDataService.getGenres();
			genres.$promise.then(function(data) {
				vm.genres = data;
			});
		}
		vm.expanded = !vm.expanded;
	}
}