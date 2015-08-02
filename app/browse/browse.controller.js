/// <reference path="../../typings/angularjs/angular.d.ts"/>
/* global componentHandler */
'use strict';

angular.module('codex.browse')
	.controller('browseController', browseController);

browseController.$inject = ['$scope', '$timeout'];

function browseController($scope, $timeout) {
	$scope.$on('$viewContentLoaded', function() {
		$timeout(function() {
			componentHandler.upgradeAllRegistered();
		});
	});
}