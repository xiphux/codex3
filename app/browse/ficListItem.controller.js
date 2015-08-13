/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.browse')
	.controller('ficListItemController', ficListItemController);

ficListItemController.$inject = ['ficDataService'];

function ficListItemController(ficDataService) {
	
	var vm = this;
	
	vm.expanded = false;
	vm.toggle = toggle;
	
	function toggle() {
		if (!vm.ficDetail) {
			vm.ficDetail = ficDataService.getFic(vm.fic.id);
		}
		vm.expanded = !vm.expanded;
	}
}