/// <reference path="../../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.filters')

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
});