'use strict';

angular.module('codex.data')
	.factory('chapterDataService', chapterDataService);

chapterDataService.$inject = ['$resource'];

function chapterDataService($resource) {
	
	var chaptersResource = $resource('api/fics/:ficId/chapters');
	var chapterResource = $resource('api/fics/:ficId/chapters/:num');
	
	var service = {
		getChapters: getChapters,
		getChapter: getChapter
	};
	return service;
	
	function getChapters(ficId) {
		if (!ficId) {
			return null;
		}
		return chaptersResource.query({ ficId: ficId });
	};
	
	function getChapter(ficId, num) {
		if (!(ficId && num)) {
			return null;
		}
		return chapterResource.get({ ficId: ficId, num: num });
	};
	
}