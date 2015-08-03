/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.browse')
	.controller('ficListItemController', ficListItemController);

ficListItemController.$inject = ['$scope', 'ficDataService'];

function ficListItemController($scope, ficDataService) {
	
	var vm = this;
	
	vm.expanded = false;
	vm.toggle = toggle;
	
	function toggle() {
		if (!vm.ficDetail) {
			vm.ficDetail = ficDataService.getFic($scope.fic.id);
		}
		vm.expanded = !vm.expanded;
	}
}