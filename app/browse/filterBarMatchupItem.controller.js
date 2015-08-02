/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.browse')
	.controller('filterBarMatchupItemController', filterBarMatchupItemController);

filterBarMatchupItemController.$inject = ['$scope', 'ficBrowseService'];

function filterBarMatchupItemController($scope, ficBrowseService) {
	this.remove = function() {
		ficBrowseService.removeMatchupFilter($scope.matchup);
		ficBrowseService.refresh();
	};
}