/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.read')
	.controller('readerFooterNavController', readerFooterNavController);

readerFooterNavController.$inject = ['$scope', 'readService'];

function readerFooterNavController($scope, readService) {
	
	var vm = this;
	
	vm.nextChapter = null;
	vm.prevChapter = null;
	vm.gotoNextChapter = gotoNextChapter; 
	vm.gotoPrevChapter = gotoPrevChapter;
	
	activate();
	
	function activate() {
	
		$scope.$watch(function() {
			return readService.getNextChapter();
		}, function(newValue, oldValue) {
			vm.nextChapter = newValue;
		});
		
		$scope.$watch(function() {
			return readService.getPrevChapter();
		}, function(newValue, oldValue) {
			vm.prevChapter = newValue;
		});
	
	}
	
	function gotoNextChapter() {
		readService.nextChapter();
	}
	
	function gotoPrevChapter() {
		readService.prevChapter();
	}
	
}