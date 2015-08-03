/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.read')
	.controller('readerFooterNavController', readerFooterNavController);

readerFooterNavController.$inject = ['$scope'];

function readerFooterNavController($scope) {
	
	var vm = this;
	
	vm.nextChapter = null;
	vm.prevChapter = null;
	vm.gotoNextChapter = gotoNextChapter; 
	vm.gotoPrevChapter = gotoPrevChapter;
	
	
	updateChapters();
	
	$scope.$watch('currentChapter', updateChapters);
	
	$scope.$watch('chapters', function() {
		if ($scope.chapters != null) {
			$scope.chapters.$promise.then(updateChapters);
		} else {
			updateChapters();
		}
	});
	
	function updateChapters() {
		if (($scope.currentChapter == null) || ($scope.chapters == null)) {
			vm.nextChapter = null;
			vm.prevChapter = null;
			return;
		}
		
		for (var i = 0; i < $scope.chapters.length; i++) {
			var chapter = $scope.chapters[i];
			if (chapter.id == $scope.currentChapter.id) {
				vm.prevChapter = i > 0 ? $scope.chapters[i-1] : null;
				vm.nextChapter = i < ($scope.chapters.length - 1) ? $scope.chapters[i+1] : null;
				break;
			}
		}
	}
	
	function gotoNextChapter() {
		if ($scope.currentChapter && vm.nextChapter) {
			$scope.$emit('readerNextChapter');
		}
	}
	
	function gotoPrevChapter() {
		if ($scope.currentChapter && vm.prevChapter) {
			$scope.$emit('readerPrevChapter');
		}
	}
	
}