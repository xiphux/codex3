/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.browse')
	.controller('ficListItemController', ficListItemController);

ficListItemController.$inject = ['$scope', 'ficDataService'];

function ficListItemController($scope, ficDataService) {
	
	this.expanded = false;
	
	this.toggle = function() {
		if (!this.ficDetail) {
			this.ficDetail = ficDataService.getFic($scope.fic.id);
		}
		this.expanded = !this.expanded;
	};
}