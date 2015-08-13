/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.read')
	.controller('chapterListItemController', chapterListItemController);

chapterListItemController.$inject = ['$scope', 'readService'];

function chapterListItemController($scope, readService) {
	
	var vm = this;
	
	vm.setChapter = setChapter;
	vm.active = false;
	
	$scope.$watch(function() {
		return readService.getChapterNumber();
	}, function(newValue) {
		vm.active = newValue == vm.chapter.number;
	});
	
	function setChapter() {
		readService.setChapter(vm.chapter.number);
	}
}