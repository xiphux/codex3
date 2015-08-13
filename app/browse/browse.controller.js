/// <reference path="../../typings/angularjs/angular.d.ts"/>
/* global componentHandler */
'use strict';

angular.module('codex.browse')
	.controller('browseController', browseController);

browseController.$inject = ['$scope', '$timeout', 'pageService'];

function browseController($scope, $timeout, pageService) {
	
	activate();
	
	function activate() {
		pageService.setSubtitle(null);
		
		$scope.$on('$viewContentLoaded', function() {
			$timeout(function() {
				componentHandler.upgradeAllRegistered();
			});
		});
	}
}