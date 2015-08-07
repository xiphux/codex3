/// <reference path="../../typings/angularjs/angular.d.ts"/>
/* global componentHandler */
'use strict';

angular.module('codex.browse')
	.controller('ficListController', ficListController);

ficListController.$inject = ['$scope', '$rootScope', '$timeout', 'ficBrowseService'];

function ficListController($scope, $rootScope, $timeout, ficBrowseService) {
	
	var vm = this;
	
	vm.fics = null;
	vm.searchActive = false;
	vm.searchPending = false;
	vm.titleSort = titleSort;
	
	$rootScope.subtitle = '';
	
	// TODO: apparently directive template/controllers don't get $viewContentLoaded events - is this correct to call on init?
	$timeout(function() {
		componentHandler.upgradeAllRegistered();
	});
	
	$scope.$watch(function() {
		return ficBrowseService.getFics();
	}, function(newValue, oldValue) {
		vm.fics = newValue;
		if (vm.fics !== null) {
			vm.searchPending = true;
			vm.searchActive = ficBrowseService.hasSearch();
			vm.fics.$promise.then(function(data) {
				vm.searchPending = false;
			});
		} else {
			vm.searchPending = false;
			vm.searchActive = ficBrowseService.hasSearch();
		}
	});
	
	function titleSort(fic) {
		var title = fic.title || 'Untitled';
		title = title.replace(/[^A-Za-z0-9_ ]/g,"").toUpperCase();
		if (title.slice(0, 4) == 'THE ') {
			title = title.slice(4);
		}
		return title;
	};
}