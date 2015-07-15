'use strict';

angular.module('codex.filters', [])

.filter('authorList', function() {
	return function(authors) {
		if (!authors || (authors.length < 1)) {
			return 'Unknown';
		}
		if (authors.length == 1) {
			return authors[0].name;
		}
		if (authors.length == 2) {
			return authors[0].name + " and " + authors[1].name;
		}
		
		var retstr = "";
		for (var i = 0; i < authors.length; i++) {
			if (i > 0) {
				if (i == (authors.length - 1)) {
					retstr += ", and ";
				} else {
					retstr += ", ";
				}
			}
			retstr += authors[i].name;
		}
		return retstr;
	};
})

.filter('genreList', function() {
	return function(genres) {
		if (!genres) {
			return "";
		}
		var retstr = "";
		for (var i = 0; i < genres.length; i++) {
			if (i > 0) {
				retstr += ", ";
			}
			retstr += genres[i].name;
		}
		return retstr;
	};
})

.filter('seriesList', function() {
	return function(series) {
		if (!series) {
			return "";
		}
		var retstr = "";
		for (var i = 0; i < series.length; i++) {
			if (i > 0) {
				retstr += ", ";
			}
			retstr += series[i].title;
		}
		return retstr;
	};
})

.filter('matchup', function() {
	return function(matchup) {
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
})

.filter('matchupList', ['matchupFilter', function(matchupFilter) {
	return function(matchups) {
		if (!matchups) {
			return "";
		}
		var retstr = "";
		for (var i = 0; i < matchups.length; i++) {
			if (i > 0) {
				retstr += ", ";
			}
			retstr += matchupFilter(matchups[i]);
		}
		return retstr;
	};
}]);