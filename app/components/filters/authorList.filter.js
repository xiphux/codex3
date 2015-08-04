/// <reference path="../../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.filters')
	.filter('authorList', authorListFilter);

function authorListFilter() {
	return function(authors) {
		if (!authors || (authors.length < 1)) {
			return 'Unknown';
		}
		
		var authorNames = _.pluck(authors, 'name');
		
		if (authorNames.length == 1) {
			return authorNames[0];
		}
		if (authorNames.length == 2) {
			return authorNames.join(' and ');
		}
		return authorNames.slice(0, -1).join(', ') + ', and ' + authorNames.slice(-1);
	};
}