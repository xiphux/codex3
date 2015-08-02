/// <reference path="../../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.filters')

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