/* global componentHandler */
/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.read')
	.controller('readController', readController);

readController.$inject = ['$scope', '$routeParams', '$locationEx', '$timeout', '$q', '$window', 'chapterFilter', 'pageService', 'readService'];

function readController($scope, $routeParams, $locationEx, $timeout, $q, $window, chapterFilter, pageService, readService) {
	
	var vm = this;
	
	vm.chapters = undefined;
	vm.chapter = undefined;
	vm.fic = undefined;
	vm.multipleChapters = undefined;
	vm.loading = false;
	vm.online = true;
	
	activate();
	
	function activate() {
	
		readService.setFic($routeParams.ficId, $routeParams.chapterNum);
		
		var unbindFic = $scope.$watch(function() {
			return readService.getFic();
		}, function(newValue) {
			if (newValue) {
				newValue.$promise.then(function(data) {
					// defer setting for one time binding
					vm.fic = data;	
					updatePageTitleAsync();
				});
				unbindFic();
			}
		});
		
		var unbindChapters = $scope.$watch(function() {
			return readService.getChapters();
		}, function(newValue) {
			if (newValue) {
				newValue.$promise.then(function(data) {
					// defer setting for one time binding
					vm.chapters = data;
					updatePageTitleAsync();
				});
				unbindChapters();
			}
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
				if (newValue !== oldValue) {
					$locationEx.skipReload(true).path('/read/' + $routeParams.ficId + '/chapters/' + readService.getChapterNumber());
				}
			}
			updatePageTitleAsync();
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
		
		$scope.$watch(function() {
			return !!$window.navigator.onLine;
		}, function(newValue) {
			vm.online = newValue;
		});
		
		$scope.$on('$viewContentLoaded', function() {
			$timeout(function() {
				componentHandler.upgradeAllRegistered();
			});
		});
		
	}
	
	function updatePageTitleAsync() {
		if (!(vm.fic && vm.chapters)) {
			return;
		}
		if (vm.chapter) {
			vm.chapter.$promise.then(updatePageTitle);
		} else {
			updatePageTitle();
		}
	}
	
	function updatePageTitle() {
		var subtitle = vm.fic.title;
		if (vm.chapter && ((vm.chapters && (vm.chapters.length > 1)) || vm.chapter.title)) {
			subtitle += ' :: ' + chapterFilter(vm.chapter);
		}
		pageService.setSubtitle(subtitle);
	}
	
}