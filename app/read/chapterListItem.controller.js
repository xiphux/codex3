/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.read')
	.controller('chapterListItemController', chapterListItemController);

chapterListItemController.$inject = ['$scope'];

function chapterListItemController($scope) {
	
	var vm = this;
	
	vm.setChapter = setChapter;
	
	function setChapter() {
		$scope.$emit('readerSetChapter', $scope.chapter);
	}
}