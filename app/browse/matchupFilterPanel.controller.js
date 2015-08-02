/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.browse')

.controller('matchupFilterPanelController', ['$scope', 'matchupDataService', function($scope, matchupDataService) {
	
	this.expanded = false;
	this.loaded = false;	

	this.toggleMatchupExpand = function() {
		
		if (!this.expanded && !this.loaded) {
			this.matchups = matchupDataService.getMatchups();
			this.loaded = true;
		}
		
		this.expanded = !this.expanded;
		
	};
}]);