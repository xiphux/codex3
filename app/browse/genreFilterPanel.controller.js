/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.browse')
	.controller('genreFilterPanelController', genreFilterPanelController);

genreFilterPanelController.$inject = ['$scope', 'genreDataService'];

function genreFilterPanelController($scope, genreDataService) {
	
	this.expanded = false;
	this.loaded = false;
	
	this.toggleGenreExpand = function() {
		if (!this.expanded && !this.loaded) {
			this.genres = genreDataService.getGenres();
			this.loaded = true;
		}
		this.expanded = !this.expanded;
	};
}