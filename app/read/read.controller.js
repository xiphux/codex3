/* global componentHandler */
/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.read')
	.controller('readController', readController);

readController.$inject = ['$scope', '$routeParams', '$locationEx', '$rootScope', '$timeout', 'chapterFilter', 'ficDataService', 'chapterDataService'];

function readController($scope, $routeParams, $locationEx, $rootScope, $timeout, chapterFilter, ficDataService, chapterDataService) {
	
	var chapterLoaded = false;
	var ficLoaded = false;
	
	var updatePageTitle = function() {
		$rootScope.subtitle = $scope.fic.title + " :: " + chapterFilter($scope.chapter);
	};
	
	var loadChapter = function(num) {
		chapterLoaded = false;
		var chap = chapterDataService.getChapter($routeParams.ficId, num);
		if (chap) {
			chap.$promise.then(
				function(data) {
					// intentionally setting here and not immediately setting the returned promise
					// to avoid flicker when the promise is unresolved
					$scope.chapter = data;
					
					chapterLoaded = true;
					if (chapterLoaded && ficLoaded) {
						updatePageTitle();
					}
				},
				function(httpResponse) {
					$locationEx.path('/');
				}
			);
		}
	};
	
	loadChapter($routeParams.chapterNum);
	
	$scope.fic = ficDataService.getFic($routeParams.ficId);
	$scope.fic.$promise.then(function(data) {
		ficLoaded = true;
		if (chapterLoaded && ficLoaded) {
			updatePageTitle();
		}
	});
	
	$scope.chapters = chapterDataService.getChapters($routeParams.ficId);
	
	$scope.setChapter = function(num) {
		if (!num || (num < 1) || (num > _.get(_.max($scope.chapters, 'number'),'number', 0))) {
			return false;
		}
		loadChapter(num);
		$locationEx.skipReload().path('/read/' + $routeParams.ficId + '/chapters/' + num);
		$scope.$broadcast('readerChapterChanged');
		return true;
	};
	
	$scope.prevChapter = function() {
		return $scope.setChapter($scope.chapter.number - 1);
	};
	
	$scope.nextChapter = function() {
		return $scope.setChapter($scope.chapter.number + 1);
	};
	
	$scope.$on('readerPrevChapter', function() {
		$scope.prevChapter();
	});
	
	$scope.$on('readerNextChapter', function() {
		$scope.nextChapter();
	});
	
	$scope.$on('readerSetChapter', function (e, chapter) {
		if (!chapter) {
			return;
		}
		
		$scope.setChapter(chapter.number);
	});
	
	$scope.$on('$viewContentLoaded', function() {
		$timeout(function() {
			componentHandler.upgradeAllRegistered();
		});
	});
	
}