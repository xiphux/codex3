/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.browse')
	.controller('genreFilterPanelController', genreFilterPanelController);

genreFilterPanelController.$inject = ['$scope', 'genreDataService'];

function genreFilterPanelController($scope, genreDataService) {
	
	var vm = this;
	
	vm.expanded = false;
	vm.toggleGenreExpand = toggleGenreExpand;
	vm.genres = null;
	
	var loaded = false;
	
	function toggleGenreExpand() {
		if (!vm.expanded && !loaded) {
			vm.genres = genreDataService.getGenres();
			loaded = true;
		}
		vm.expanded = !vm.expanded;
	}
}