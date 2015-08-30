/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.browse')
	.controller('ficListItemController', ficListItemController);

ficListItemController.$inject = ['$scope', '$window', 'ficDataService', 'ficStorageService'];

function ficListItemController($scope, $window, ficDataService, ficStorageService) {
	
	var vm = this;
	
	vm.expanded = false;
	vm.availableOffline = false;
	vm.offlineProgress = null;
	vm.online = true;
	vm.toggleExpand = toggleExpand;
	vm.toggleOffline = toggleOffline;
	
	activate();
	
	function activate() {
		$scope.$watch(function() {
			return !!ficStorageService.hasFic(vm.fic.id);
		}, function(newValue) {
			vm.availableOffline = newValue;
		});
		
		$scope.$watch(function() {
			return ficStorageService.getFicProgress(vm.fic.id);
		}, function(newValue) {
			vm.offlineProgress = newValue;
		});
		
		$scope.$watch(function() {
			return !!$window.navigator.onLine;
		}, function(newValue) {
			vm.online = newValue;
		});
	}
	
	function toggleExpand() {
		if (!vm.ficDetail) {
			vm.ficDetail = ficDataService.getFic(vm.fic.id);
		}
		vm.expanded = !vm.expanded;
	}
	
	function toggleOffline() {
		if (ficStorageService.hasFic(vm.fic.id)) {
			ficStorageService.removeFic(vm.fic.id);
		} else {
			ficStorageService.addFic(vm.fic.id);
		}
	}
}