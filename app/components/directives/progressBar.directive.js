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
				scope.$watch(scope.progress, function(newValue, oldValue) {
					
					if (newValue === null) {
						// treat null as 0 percent (no progress to show)
						newValue = 0;
					}
					
					if (newValue < 0) {
						// indeterminate
						if ((oldValue === null) || (oldValue >= 0)) {	
							el.addClass('mdl-progress__indeterminate');
						}
					} else {
						// determinate
						if ((oldValue !== null) && (oldValue < 0)) {
							el.removeClass('mdl-progress__indeterminate');
						}
						el[0].MaterialProgress.setProgress(newValue > 100 ? 100 : newValue);
					}
					
				});
			});
		}
	};
}