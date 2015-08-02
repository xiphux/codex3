/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.read')
	.controller('chapterListItemController', chapterListItemController);

chapterListItemController.$inject = ['$scope'];

function chapterListItemController($scope) {
	this.setChapter = function() {
		$scope.$emit('readerSetChapter', $scope.chapter);
	};
}