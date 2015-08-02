/// <reference path="../../typings/angularjs/angular.d.ts"/>
/* global componentHandler */
'use strict';

angular.module('codex.browse')

.controller('ficListController', ['$scope', '$rootScope', '$timeout', 'ficBrowseService', function($scope, $rootScope, $timeout, ficBrowseService) {
	
	$rootScope.subtitle = '';
	
	this.fics = ficBrowseService.getFics();
	this.searchActive = ficBrowseService.hasSearch();
	this.searchPending = false;
	var that = this;
	
	// TODO: apparently directive template/controllers don't get $viewContentLoaded events - is this correct to call on init?
	$timeout(function() {
		componentHandler.upgradeAllRegistered();
	});
	
	$scope.titleSort = function(fic) {
		var title = fic.title || 'Untitled';
		title = title.replace(/[^A-Za-z0-9_ ]/g,"").toUpperCase();
		if (title.slice(0, 4) == 'THE ') {
			title = title.slice(4);
		}
		return title;
	};
	
	$scope.$on('ficBrowseFicsUpdating', function() {
		that.searchPending = true;
		that.searchActive = ficBrowseService.hasSearch();
	});
	
	$scope.$on('ficBrowseFicsUpdated', function() {
		that.searchPending = false;
		that.fics = ficBrowseService.getFics();
		that.searchActive = ficBrowseService.hasSearch();
	});
}]);