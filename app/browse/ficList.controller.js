/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.browse')
	.controller('ficListController', ficListController);

ficListController.$inject = ['$scope', 'ficBrowseService'];

function ficListController($scope, ficBrowseService) {
	
	var vm = this;
	
	vm.fics = null;
	vm.searchActive = false;
	vm.searchPending = false;
	vm.titleSort = titleSort;
	
	activate();
	
	function activate() {
	
		$scope.$watch(function() {
			return ficBrowseService.getFics();
		}, function(newValue, oldValue) {
			vm.fics = newValue;
			vm.searchActive = ficBrowseService.hasSearch();
			if (vm.fics !== null) {
				vm.searchPending = true;
				vm.fics.$promise.then(function(data) {
					vm.searchPending = false;
				});
			} else {
				vm.searchPending = false;
			}
		});
		
	}
	
	function titleSort(fic) {
		if (!(fic && fic.title)) {
			return 'UNTITLED';
		}
		var title = fic.title;
		title = title.replace(/[^A-Za-z0-9_ ]/g,'').toUpperCase();
		if (title.slice(0, 4) == 'THE ') {
			title = title.slice(4);
		} else if (title.slice(0, 3) == 'AN ') {
			title = title.slice(3);
		} else if (title.slice(0, 2) == 'A ') {
			title = title.slice(2);
		}
		return title;
	};
}