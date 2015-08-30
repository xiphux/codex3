/// <reference path="../../typings/angularjs/angular.d.ts"/>
/* global componentHandler */
'use strict';

angular.module('codex.browse')
	.controller('browseController', browseController);

browseController.$inject = ['$scope', '$timeout', '$window', 'pageService'];

function browseController($scope, $timeout, $window, pageService) {
	
	var vm = this;
	
	vm.online = true;
	
	activate();
	
	function activate() {
		pageService.setSubtitle(null);
		
		$scope.$watch(function() {
			return !!$window.navigator.onLine;
		}, function(newValue) {
			vm.online = newValue;
		});
		
		$scope.$on('$viewContentLoaded', function() {
			$timeout(function() {
				componentHandler.upgradeAllRegistered();
			});
		});
	}
}