'use strict';

angular.module('codex.read')
	.directive("scrollToTopWhen", scrollToTopWhen);
	
scrollToTopWhen.$inject = ['$timeout'];
		
function scrollToTopWhen($timeout) {
	return {
		link: function (scope, element, attrs) {
			scope.$on(attrs.scrollToTopWhen, function () {
				$timeout(function () {
					element[0].scrollTop = 0;
				});
			});
		}  
	} 
};