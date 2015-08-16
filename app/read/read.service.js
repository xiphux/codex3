'use strict';

angular.module('codex.read')
	.factory('readService', readService);
	
readService.$inject = ['ficDataService', 'chapterDataService'];
	
function readService(ficDataService, chapterDataService) {
	
	var chapters = undefined;
	var chapter = undefined;
	var fic = undefined;
	var next = undefined;
	var prev = undefined;
	
	var ficIdInternal = undefined;
	var chapterNumInternal = undefined;
	
	var service = {
		getFic: getFic,
		setFic: setFic,
		getChapters: getChapters,
		hasMultipleChapters: hasMultipleChapters,
		getChapter: getChapter,
		getChapterNumber: getChapterNumber,
		getNextChapter: getNextChapter,
		getPrevChapter: getPrevChapter,
		setChapter: setChapter,
		nextChapter: nextChapter,
		prevChapter: prevChapter
	};
	return service;
	
	
	function getFic() {
		return fic;
	}
	
	function setFic(ficId, chapterNum) {
		if (!ficId) {
			return false;
		}
		if (ficId != ficIdInternal) {
			ficIdInternal = ficId;
			fic = ficDataService.getFic(ficId);
			chapters = chapterDataService.getChapters(ficId);
			chapterNumInternal = undefined;
		}
		return setChapter(chapterNum || 1);
	}
	
	function getChapters() {
		return chapters;
	}
	
	function hasMultipleChapters() {
		if (!(chapters && chapters.$resolved)) {
			return undefined;
		}
		return chapters.length > 1;
	}
	
	function getChapter() {
		return chapter;
	}
	
	function getChapterNumber() {
		return chapterNumInternal;
	}
	
	function getNextChapter() {
		return next;
	}
	
	function getPrevChapter() {
		return prev;
	}
	
	function setChapter(chapterNum) {
		if (!chapterNum || (chapterNum < 1)) {
			return false;
		}
		if (chapters && chapters.$resolved && (chapterNum > _.max(chapters, 'number').number)) {
			return false;
		}
		if (chapterNum == chapterNumInternal) {
			return true;
		}
		
		chapterNumInternal = +chapterNum;
		chapter = chapterDataService.getChapter(ficIdInternal, chapterNumInternal);
		
		chapters.$promise.then(updatePrevNext);
		
		return true;
	}
	
	function nextChapter() {
		if (!next) {
			return false;
		}
		return setChapter(next.number);
	}
	
	function prevChapter() {
		if (!prev) {
			return false;
		}
		return setChapter(prev.number);
	}
	
	function updatePrevNext() {
		var sorted = _.sortBy(chapters, 'number');
		var idx = _.findIndex(sorted, 'number', chapterNumInternal);
		if (idx == -1) {
			prev = null;
			next = null;
			return;
		}
		prev = idx > 0 ? sorted[idx-1] : null;
		next = idx < (sorted.length - 1) ? sorted[idx+1] : null;
	}
}