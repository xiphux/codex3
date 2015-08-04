/// <reference path="../../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.filters')
	.filter('genreList', genreListFilter);

function genreListFilter() {
	return function(genres) {
		if (!genres) {
			return "";
		}
		return _.pluck(genres, 'name').join(', ');
	};
}