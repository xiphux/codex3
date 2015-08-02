/// <reference path="../../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.filters')

.filter('matchup', function() {
	return function(matchup) {
		if (!matchup || !matchup.characters || (matchup.characters.length < 1)) {
			return '';
		}
		var crossover = false;
		var firstseries = matchup.characters[0].series.id;
		for (var i = 1; i < matchup.characters.length; i++) {
			if (matchup.characters[i].series.id != firstseries) {
				crossover = true;
				break;
			}
		}
		var retstr = "";
		for (var j = 0; j < matchup.characters.length; j++) {
			if (j > 0) {
				retstr += " + ";
			}
			retstr += matchup.characters[j].name;
			if (crossover) {
				retstr += " (" + matchup.characters[j].series.title + ")";
			}
		}
		return retstr;
	};
});