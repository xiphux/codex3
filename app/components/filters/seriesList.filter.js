/// <reference path="../../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.filters')

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
});