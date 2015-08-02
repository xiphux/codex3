/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.browse')
	.controller('matchupFilterPanelController', matchupFilterPanelController);

matchupFilterPanelController.$inject = ['$scope', 'matchupDataService'];

function matchupFilterPanelController($scope, matchupDataService) {
	
	this.expanded = false;
	this.loaded = false;	

	this.toggleMatchupExpand = function() {
		
		if (!this.expanded && !this.loaded) {
			this.matchups = matchupDataService.getMatchups();
			this.loaded = true;
		}
		
		this.expanded = !this.expanded;
		
	};
}