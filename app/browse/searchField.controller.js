/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.browse')
	.controller('searchFieldController', searchFieldController);

searchFieldController.$inject = ['$scope', 'ficBrowseService'];

function searchFieldController($scope, ficBrowseService) {
	
	function updateSearchField() {
		$scope.search = ficBrowseService.getSearchTerms().join(' ');
	}
	updateSearchField();
	
	$scope.$on('ficBrowseSearchCleared', updateSearchField);
	
	$scope.$watch('search', function(newValue, oldValue) {
		if (newValue === oldValue) {
			return;
		}
		
		ficBrowseService.setSearchTerms(newValue.split(' '));
		ficBrowseService.refresh();
	});
}