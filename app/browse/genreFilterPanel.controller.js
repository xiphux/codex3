/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.browse')
	.controller('genreFilterPanelController', genreFilterPanelController);

genreFilterPanelController.$inject = ['genreDataService'];

function genreFilterPanelController(genreDataService) {
	
	var vm = this;
	
	vm.expanded = false;
	vm.toggleGenreExpand = toggleGenreExpand;
	vm.genres = undefined;
	
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