/// <reference path="../../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.filters')
	.filter('matchupList', matchupListFilter);

matchupListFilter.$inject = ['matchupFilter'];

function matchupListFilter(matchupFilter) {
	return function(matchups) {
		if (!matchups) {
			return undefined;
		}
		return _.map(matchups, matchupFilter).join(', ');
	};
}