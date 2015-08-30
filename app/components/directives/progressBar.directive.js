/// <reference path="../../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.directives')
	.directive('codexProgressBar', progressBarDirective);
	
progressBarDirective.$inject = ['$timeout'];

function progressBarDirective($timeout) {
	return {
		restrict: 'E',
		templateUrl: 'components/directives/progressBar.html',
		replace: true,
		scope: {
			progress: '&'
		},
		link: function(scope, el, attr, ctrl) {
			$timeout(function() {
				componentHandler.upgradeElement(el[0], 'MaterialProgress');
				scope.$watch(scope.progress, function(newValue) {
					
					if (newValue === null) {
						if (el.hasClass('mdl-progress__indeterminate')) {
							el.removeClass('mdl-progress__indeterminate');
						}
						return;
					}
					
					if (newValue >= 0) {
						if (el.hasClass('mdl-progress__indeterminate')) {
							el.removeClass('mdl-progress__indeterminate');
						}
						el[0].MaterialProgress.setProgress(newValue > 100 ? 100 : newValue);
					} else {
						if (!el.hasClass('mdl-progress__indeterminate')) {
							el.addClass('mdl-progress__indeterminate');
						}
					}
					
				});
			});
		}
	};
}