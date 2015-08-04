/// <reference path="../../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.filters')
	.filter('matchup', matchupFilter);

function matchupFilter() {
	return function(matchup) {
		if (!matchup || !matchup.characters || (matchup.characters.length < 1)) {
			return '';
		}
		var crossover = _(matchup.characters).pluck('series.id').uniq().value().length > 1;
		if (crossover) {
			return _.map(matchup.characters, function(character) {
				return character.name + ' (' + character.series.title + ')';
			}).join(' + ');
		} else {
			return _.pluck(matchup.characters, 'name').join(' + ');
		}
	};
}