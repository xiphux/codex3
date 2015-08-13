/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.read')
	.controller('chapterTextController', chapterTextController);

chapterTextController.$inject = ['$scope', 'readService'];

function chapterTextController($scope, readService) {
	
	var vm = this;
	
	vm.chapter = null;
	
	activate();
	
	function activate() {
		$scope.$watch(function() {
			return readService.getChapter();
		}, function(newValue) {
			vm.chapter = newValue;
		});
	}
	
}