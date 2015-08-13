/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.browse')
	.controller('ficListController', ficListController);

ficListController.$inject = ['$scope', '$timeout', 'ficBrowseService'];

function ficListController($scope, $timeout, ficBrowseService) {
	
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
			if (vm.fics !== null) {
				vm.searchPending = true;
				vm.searchActive = ficBrowseService.hasSearch();
				vm.fics.$promise.then(function(data) {
					vm.searchPending = false;
				});
			} else {
				vm.searchPending = false;
				vm.searchActive = ficBrowseService.hasSearch();
			}
		});
		
	}
	
	function titleSort(fic) {
		if (!fic.title) {
			return 'Untitled';
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