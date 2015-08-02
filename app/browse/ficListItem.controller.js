/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.browse')

.controller('ficListItemController', ['$scope', 'ficDataService', '$timeout', function($scope, ficDataService, $timeout) {
	
	this.expanded = false;
	
	this.toggle = function() {
		if (!this.ficDetail) {
			this.ficDetail = ficDataService.getFic($scope.fic.id);
		}
		this.expanded = !this.expanded;
	};
}]);