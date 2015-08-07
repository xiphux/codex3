/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.browse')
	.controller('searchFieldController', searchFieldController);

searchFieldController.$inject = ['$scope', 'ficBrowseService'];

function searchFieldController($scope, ficBrowseService) {
	
	$scope.search = null;
	
	$scope.$watchCollection(function() {
		return ficBrowseService.getSearchTerms();
	}, function(newValue) {
		if (!newValue) {
			return;
		}
		var searchString = newValue.join(' ');
		if (searchString != $scope.search) {
			$scope.search = searchString;
		}
	});
	
	$scope.$watch('search', function(newValue, oldValue) {
		if (newValue === oldValue) {
			return;
		}
		
		ficBrowseService.setSearchTerms(newValue.split(' '));
		ficBrowseService.refresh();
	});
}