/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.read')

.controller('chapterListItemController', ['$scope', function($scope) {
	this.setChapter = function() {
		$scope.$emit('readerSetChapter', $scope.chapter);
	};
}]);