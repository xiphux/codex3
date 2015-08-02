/// <reference path="../../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.filters')

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
});