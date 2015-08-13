/* global componentHandler */
/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.read')
	.controller('readController', readController);

readController.$inject = ['$scope', '$routeParams', '$locationEx', '$timeout', '$q', 'chapterFilter', 'pageService', 'readService'];

function readController($scope, $routeParams, $locationEx, $timeout, $q, chapterFilter, pageService, readService) {
	
	var vm = this;
	
	vm.chapters = undefined;
	vm.chapter = undefined;
	vm.fic = undefined;
	vm.multipleChapters = undefined;
	vm.loading = false;
	
	var ficInternal = undefined;
	var chaptersInternal = undefined;
	
	readService.setFic($routeParams.ficId, $routeParams.chapterNum);
	ficInternal = readService.getFic();
	chaptersInternal = readService.getChapters();
	
	ficInternal.$promise.then(function(data) {
		// defer setting for one time binding
		vm.fic = data;
	});
	
	chaptersInternal.$promise.then(function(data) {
		// defer setting for one time binding
		vm.chapters = data;
	});
	
	$scope.$watch(function() {
		return readService.getChapter();
	}, function(newValue, oldValue) {
		vm.chapter = newValue;
		if (vm.chapter) {
			vm.loading = true;
			vm.chapter.$promise.then(function(data) {
				vm.loading = false;
			});
		}
		updatePageTitleAsync();
		if (newValue !== oldValue) {
			$locationEx.skipReload().path('/read/' + $routeParams.ficId + '/chapters/' + readService.getChapterNumber());
		}
	});
	
	var unbindMultipleChapters = $scope.$watch(function() {
		return readService.hasMultipleChapters();
	}, function(newValue) {
		if (newValue === undefined) {
			return;
		}
		vm.multipleChapters = newValue;
		unbindMultipleChapters();
	});
	
	$scope.$on('$viewContentLoaded', function() {
		$timeout(function() {
			componentHandler.upgradeAllRegistered();
		});
	});
	
	function updatePageTitleAsync() {
		$q.all([ficInternal.$promise, chaptersInternal.$promise, vm.chapter.$promise]).then(updatePageTitle);
	}
	
	function updatePageTitle() {
		var subtitle = vm.fic.title;
		if (chaptersInternal.length > 1) {
			subtitle += ' :: ' + chapterFilter(vm.chapter);
		}
		pageService.setSubtitle(subtitle);
	}
	
}