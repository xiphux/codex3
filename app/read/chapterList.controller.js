/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.read')
	.controller('chapterListController', chapterListController);
	
chapterListController.$inject = ['$scope', 'readService'];

function chapterListController($scope, readService) {
	var vm = this;
	
	vm.chapters = undefined;
	
	var chapters = undefined;
	
	var unbindChaptersWatch = $scope.$watch(function() {
		return readService.getChapters();
	}, function(newValue) {
		if (newValue) {
			chapters = newValue;
			chapters.$promise.then(function(data) {
				vm.chapters = data;
				chapters = null;
			});
			unbindChaptersWatch();
		}
	});
}