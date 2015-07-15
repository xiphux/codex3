'use strict';

angular.module('codex.read', ['ngRoute', 'ngResource', 'codex.filters', 'codex.textFormatter'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/read/:ficId', {
		redirectTo: function(routeParams, path, search) {
			return '/read/' + routeParams.ficId + '/chapters/1';
		}
	})
	.when('/read/:ficId/chapters/:chapterNum', {
		templateUrl: 'read/read.html',
		controller: 'readerController',
		controllerAs: 'readerController'
	});
}])

.service('$locationEx', ['$location', '$route', '$rootScope', function($location, $route, $rootScope) {
	$location.skipReload = function () {
        var lastRoute = $route.current;
        var un = $rootScope.$on('$locationChangeSuccess', function () {
            $route.current = lastRoute;
            un();
        });
        return $location;
    };
    return $location;
}])

.controller('readerController', ['$scope', '$routeParams', '$locationEx', '$rootScope', '$resource', '$timeout', 'chapterFilter', function($scope, $routeParams, $locationEx, $rootScope, $resource, $timeout, chapterFilter) {
	
	var chapterResource = $resource('api/fics/:ficId/chapters/:num');
	var chapterLoaded = false;
	var ficLoaded = false;
	
	var updatePageTitle = function() {
		$rootScope.subtitle = $scope.fic.title + " :: " + chapterFilter($scope.chapter)
	};
	
	var loadChapter = function(num) {
		chapterLoaded = false;
		chapterResource.get({ ficId: $routeParams.ficId, num: num },
			function(data) {
				// intentionally setting here and not immediately setting the returned promise
				// to avoid flicker when the promise is unresolved
				$scope.chapter = data;
				
				chapterLoaded = true;
				if (chapterLoaded && ficLoaded) {
					updatePageTitle();
				}
			},
			function(httpResponse) {
				$locationEx.path('/');
			}
		);
	};
	
	loadChapter($routeParams.chapterNum);
	
	$scope.fic = $resource('api/fics/:ficId').get({ ficId: $routeParams.ficId },
		function(data) {
			ficLoaded = true;
			if (chapterLoaded && ficLoaded) {
				updatePageTitle();
			}
		}
	);
	
	$scope.chapters = $resource('api/fics/:ficId/chapters').query({ ficId: $routeParams.ficId });
	
	$scope.setChapter = function(num) {
		if (!num || (num < 1) || (num > _.get(_.max($scope.chapters, 'number'),'number', 0))) {
			return false;
		}
		loadChapter(num);
		$locationEx.skipReload().path('/read/' + $routeParams.ficId + '/chapters/' + num);
		$scope.$broadcast('readerChapterChanged');
		return true;
	};
	
	$scope.prevChapter = function() {
		return $scope.setChapter($scope.chapter.number - 1);
	};
	
	$scope.nextChapter = function() {
		return $scope.setChapter($scope.chapter.number + 1);
	};
	
	$scope.$on('readerPrevChapter', function() {
		$scope.prevChapter();
	});
	
	$scope.$on('readerNextChapter', function() {
		$scope.nextChapter();
	});
	
	$scope.$on('readerSetChapter', function (e, chapter) {
		if (!chapter) {
			return;
		}
		
		$scope.setChapter(chapter.number);
	});
	
	$scope.$on('$viewContentLoaded', function() {
		$timeout(function() {
			componentHandler.upgradeAllRegistered();
		});
	});
	
}])

.directive('scrollToTopWhen', ['$timeout', function($timeout) {
	return {
		link: function (scope, element, attrs) {
			scope.$on(attrs.scrollToTopWhen, function() {
				$timeout(function() {
					element[0].scrollTop = 0;
				});
			});
		}
	}
}])

.filter('chapter', function() {
	return function(chapter) {
		if (!chapter) {
			return '';
		}
		return chapter.title || ('Chapter ' + chapter.number);
	}
})

.directive('codexChapterList', function() {
	return {
		restrict: 'E',
		templateUrl: 'read/chapter-list.html',
		replace: true,
		scope: {
			chapters: '='
		}
	};
})

.directive('codexChapterListItem', function() {
	return {
		restrict: 'E',
		templateUrl: 'read/chapter-list-item.html',
		replace: true,
		scope: {
			chapter: '='
		}
	};
})

.controller('readerFooterNavController', ['$scope', '$window', function($scope, $window) {
	
	this.nextChapter = null;
	this.prevChapter = null;
	var that = this;
	
	var updateChapters = function() {
		if (($scope.currentChapter == null) || ($scope.chapters == null)) {
			that.nextChapter = null;
			that.prevChapter = null;
			return;
		}
		
		for (var i = 0; i < $scope.chapters.length; i++) {
			var chapter = $scope.chapters[i];
			if (chapter.id == $scope.currentChapter.id) {
				that.prevChapter = i > 0 ? $scope.chapters[i-1] : null;
				that.nextChapter = i < ($scope.chapters.length - 1) ? $scope.chapters[i+1] : null;
				break;
			}
		}
	};
	
	updateChapters();
	$scope.$watch('currentChapter', updateChapters);
	$scope.$watch('chapters', function() {
		if ($scope.chapters != null) {
			$scope.chapters.$promise.then(updateChapters);
		} else {
			updateChapters();
		}
	});
	
	this.gotoNextChapter = function() {
		if ($scope.currentChapter && this.nextChapter) {
			$scope.$emit('readerNextChapter');
			$window.scrollTo(0,0);
		}
	};
	
	this.gotoPrevChapter = function() {
		if ($scope.currentChapter && this.prevChapter) {
			$scope.$emit('readerPrevChapter');
			$window.scrollTo(0,0);
		}
	};
	
}])

.directive('codexReaderFooterNav', function() {
	return {
		restrict: 'E',
		templateUrl: 'read/reader-footer-nav.html',
		replace: true,
		controller: 'readerFooterNavController',
		controllerAs: 'rfnCtrl',
		scope: {
			currentChapter: '=',
			chapters: '='
		}
	};
})

.directive('codexChapterText', function() {
	return {
		restrict: 'E',
		templateUrl: 'read/chapter-text.html',
		replace: true,
		scope: {
			chapter: '='
		}
	};
})

.filter('formatChapterContent', ['$sce', 'textFormatterService', function($sce, textFormatterService) {
	
	return function(chapter) {
		if (!chapter) {
			return '';
		}
		
		return $sce.trustAsHtml(textFormatterService.format(chapter.data, chapter.wrapped, chapter.no_paragraph_spacing, chapter.double_line_breaks));
	};
	
}]);