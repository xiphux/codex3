/// <reference path="../../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.directives')
	.directive('codexCloseDrawer', closeDrawerDirective);
	
closeDrawerDirective.$inject = ['$timeout', '$document'];

function closeDrawerDirective($timeout, $document) {
	return {
		restrict: 'A',
		link: function(scope, el, attr, ctrl) {
			el.bind('click', function() {
				$timeout(function() {
					var el = $document[0].body.querySelector('.mdl-layout__drawer');
					angular.element(el).removeClass('is-visible');
				});
			});
		}
	};
}