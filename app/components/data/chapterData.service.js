'use strict';

angular.module('codex.data')
	.factory('chapterDataService', chapterDataService);

chapterDataService.$inject = ['$window', 'chapterResourceService', 'ficStorageService'];

function chapterDataService($window, chapterResourceService, ficStorageService) {
	
	var service = {
		getChapters: getChapters,
		getChapter: getChapter
	};
	return service;
	
	function getChapters(ficId) {
		if ($window.navigator.onLine) {
			return chapterResourceService.getChapters(ficId);
		} else {
			return ficStorageService.getChapters(ficId);
		}
	};
	
	function getChapter(ficId, num) {
		if ($window.navigator.onLine) {
			return chapterResourceService.getChapter(ficId, num);
		} else {
			return ficStorageService.getChapter(ficId, num);
		}
	};
	
}