/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.read')

.directive('scrollToTopWhen', ['$timeout', function($timeout) {
	return {
		link: function (scope, element, attrs) {
			scope.$on(attrs.scrollToTopWhen, function() {
				$timeout(function() {
					element[0].scrollTop = 0;
				});
			});
		}
	};
}]);