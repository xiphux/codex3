/// <reference path="../../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.filters')
	.filter('seriesList', seriesListFilter);

function seriesListFilter() {
	return function(series) {
		if (!series) {
			return undefined;
		}
		return _.pluck(series, 'title').join(', ');
	};
}