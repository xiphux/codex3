/* global componentHandler */
/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.read')
	.controller('readController', readController);

readController.$inject = ['$scope', '$routeParams', '$locationEx', '$rootScope', '$timeout', 'chapterFilter', 'ficDataService', 'chapterDataService'];

function readController($scope, $routeParams, $locationEx, $rootScope, $timeout, chapterFilter, ficDataService, chapterDataService) {
	
	var vm = this;
	
	vm.chapters = chapterDataService.getChapters($routeParams.ficId);
	vm.chapter = null;
	vm.fic = ficDataService.getFic($routeParams.ficId);
	
	var chapterLoaded = false;
	var ficLoaded = false;
	
	loadChapter($routeParams.chapterNum);
	
	vm.fic.$promise.then(function(data) {
		ficLoaded = true;
		if (chapterLoaded && ficLoaded) {
			updatePageTitle();
		}
	});
	
	$scope.$on('readerPrevChapter', prevChapter);
	
	$scope.$on('readerNextChapter', nextChapter);
	
	$scope.$on('readerSetChapter', function (e, chapter) {
		if (!chapter) {
			return;
		}
		
		setChapter(chapter.number);
	});
	
	$scope.$on('$viewContentLoaded', function() {
		$timeout(function() {
			componentHandler.upgradeAllRegistered();
		});
	});
	
	function setChapter(num) {
		if (!num || (num < 1) || (num > _.get(_.max(vm.chapters, 'number'),'number', 0))) {
			return false;
		}
		loadChapter(num);
		$locationEx.skipReload().path('/read/' + $routeParams.ficId + '/chapters/' + num);
		$scope.$broadcast('readerChapterChanged');
		return true;
	};
	
	function prevChapter() {
		return setChapter(vm.chapter.number - 1);
	};
	
	function nextChapter() {
		return setChapter(vm.chapter.number + 1);
	};
	
	function updatePageTitle() {
		$rootScope.subtitle = vm.fic.title + " :: " + chapterFilter(vm.chapter);
	}
	
	function loadChapter(num) {
		chapterLoaded = false;
		var chap = chapterDataService.getChapter($routeParams.ficId, num);
		if (chap) {
			chap.$promise.then(
				function(data) {
					// intentionally setting here and not immediately setting the returned promise
					// to avoid flicker when the promise is unresolved
					vm.chapter = data;
					
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
	}
	
}