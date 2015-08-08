/* global componentHandler */
/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.read')
	.controller('readController', readController);

readController.$inject = ['$scope', '$routeParams', '$locationEx', '$timeout', 'chapterFilter', 'ficDataService', 'chapterDataService', 'pageService'];

function readController($scope, $routeParams, $locationEx, $timeout, chapterFilter, ficDataService, chapterDataService, pageService) {
	
	var vm = this;
	
	vm.chapters = undefined;
	vm.chapter = undefined;
	vm.fic = undefined;
	
	var chapterLoaded = false;
	var ficLoaded = false;
	var chaptersLoaded = false;
	
	loadChapter($routeParams.chapterNum);
	
	var fic = ficDataService.getFic($routeParams.ficId);
	fic.$promise.then(function(data) {
		vm.fic = data;
		ficLoaded = true;
		updatePageTitle();
	});
	var chapters = chapterDataService.getChapters($routeParams.ficId);
	chapters.$promise.then(function(data) {
		vm.chapters = data;
		chaptersLoaded = true;
		updatePageTitle();
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
		if (!(chapterLoaded && chaptersLoaded && ficLoaded)) {
			return;
		}
		var subtitle = vm.fic.title;
		if (chapters.length > 1) {
			subtitle += ' :: ' + chapterFilter(vm.chapter);
		}
		pageService.setSubtitle(subtitle);
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
					updatePageTitle
				},
				function(httpResponse) {
					$locationEx.path('/');
				}
			);
		}
	}
	
}