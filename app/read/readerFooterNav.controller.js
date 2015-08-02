/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.read')
	.controller('readerFooterNavController', readerFooterNavController);

readerFooterNavController.$inject = ['$scope'];

function readerFooterNavController($scope) {
	
	this.nextChapter = null;
	this.prevChapter = null;
	var that = this;
	
	var updateChapters = function() {
		if (($scope.currentChapter == null) || ($scope.chapters == null)) {
			that.nextChapter = null;
			that.prevChapter = null;
			return;
		}
		
		for (var i = 0; i < $scope.chapters.length; i++) {
			var chapter = $scope.chapters[i];
			if (chapter.id == $scope.currentChapter.id) {
				that.prevChapter = i > 0 ? $scope.chapters[i-1] : null;
				that.nextChapter = i < ($scope.chapters.length - 1) ? $scope.chapters[i+1] : null;
				break;
			}
		}
	};
	
	updateChapters();
	$scope.$watch('currentChapter', updateChapters);
	$scope.$watch('chapters', function() {
		if ($scope.chapters != null) {
			$scope.chapters.$promise.then(updateChapters);
		} else {
			updateChapters();
		}
	});
	
	this.gotoNextChapter = function() {
		if ($scope.currentChapter && this.nextChapter) {
			$scope.$emit('readerNextChapter');
		}
	};
	
	this.gotoPrevChapter = function() {
		if ($scope.currentChapter && this.prevChapter) {
			$scope.$emit('readerPrevChapter');
		}
	};
	
}