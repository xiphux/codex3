'use strict';

angular.module('codex.services')
	.factory('pageService', pageService);
	
pageService.$inject = ['$window'];
	
function pageService($window) {
	
	var subtitle = null;
	
	var service = {
		getTitle: getTitle,
		getSubtitle: getSubtitle,
		setSubtitle: setSubtitle
	};
	return service;
	
	function getTitle() {
		return $window.document.title;
	}
	
	function getSubtitle() {
		return subtitle;
	}
	
	function setSubtitle(st) {
		subtitle = st;
		
		var title = 'Codex';
		if (st) {
			title += ' :: ' + st;
		}
		$window.document.title = title;
	}
}