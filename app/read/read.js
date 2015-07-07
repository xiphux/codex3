'use strict';

angular.module('codex.read', ['ngRoute', 'ngResource', 'codex.filters', 'codex.textFormatter'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/read/:ficId', {
		templateUrl: 'read/toc.html',
		controller: 'tocController'
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

.controller('tocController', ['$scope', '$routeParams', '$resource', '$location', '$rootScope', function($scope, $routeParams, $resource, $location, $rootScope) {
	
	$scope.fic = $resource('api/fics/:ficId').get({ ficId: $routeParams.ficId },
		function(value) {
			$rootScope.subtitle = value.title;
		},
		function(httpResponse) {
			$location.path('/');
		}
	);
	
	$scope.chapters = $resource('api/fics/:ficId/chapters').query({ ficId: $routeParams.ficId },
		function(value) {
			if (value.length == 1) {
				$location.path('/read/' + $routeParams.ficId + '/chapters/' + value[0].number).replace();
			}
		},
		function(httpResponse) {
			$location.path('/');
		}
	);
}])

.controller('readerController', ['$scope', '$routeParams', '$locationEx', '$rootScope', '$resource', 'chapterFilter', function($scope, $routeParams, $locationEx, $rootScope, $resource, chapterFilter) {
	
	$scope.maxchapter = 0;
	
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
	
	$scope.chapters = $resource('api/fics/:ficId/chapters').query({ ficId: $routeParams.ficId },
		function(data) {
			$scope.maxchapter = _.get(_.max(data, 'number'),'number', 0);
		}
	);
	
	$scope.setChapter = function(num) {
		if (!num || (num < 1) || (num > $scope.maxchapter)) {
			return false;
		}
		loadChapter(num);
		$locationEx.skipReload().path('/read/' + $routeParams.ficId + '/chapters/' + num);
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
	
}])

.directive('codexFicHeader', function() {
	return {
		restrict: 'E',
		templateUrl: 'read/fic-header.html',
		replace: true,
		scope: {
			fic: '=',
			details: '='
		}
	};
})

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
		restrict: 'A',
		templateUrl: 'read/chapter-list-item.html',
		replace: false,
		scope: {
			chapter: '='
		}
	};
})

.directive('codexChapterHeader', function() {
	return {
		restrict: 'E',
		templateUrl: 'read/chapter-header.html',
		replace: true,
		scope: {
			chapter: '='
		}
	};
})

.controller('readerFullNavController', ['$scope', '$window', function($scope, $window) {
	
	this.nextChapter = function() {
		if ($scope.currentChapter && ($scope.currentChapter.number < this.maxChapter)) {
			$scope.$emit('readerNextChapter');
			if ($scope.scrollToTop) {
				$window.scrollTo(0,0);
			}
		}
	};
	
	this.prevChapter = function() {
		if ($scope.currentChapter && ($scope.currentChapter.number > 1)) {
			$scope.$emit('readerPrevChapter');
			if ($scope.scrollToTop) {
				$window.scrollTo(0,0);
			}
		}
	};
	
	this.maxChapter = _.get(_.max($scope.chapters, 'number'),'number', 0);
	
	var that = this;
	$scope.$watch('chapters', function() {
		if ($scope.chapters !== null) {
			$scope.chapters.$promise.then(function() {
				that.maxChapter = _.get(_.max($scope.chapters, 'number'),'number', 0)
			})
		}
	});
	
}])

.directive('codexReaderFullNav', function() {
	return {
		restrict: 'E',
		templateUrl: 'read/reader-full-nav.html',
		replace: true,
		controller: 'readerFullNavController',
		controllerAs: 'rfnCtrl',
		scope: {
			currentChapter: '=',
			chapters: '=',
			scrollToTop: '='
		}
	};
})

.controller('readerFullNavChapterController', ['$scope', '$window', function($scope, $window) {
	
	this.setChapter = function() {
		if ($scope.chapter && (!$scope.currentChapter || ($scope.chapter.number != $scope.currentChapter.number))) {
			$scope.$emit('readerSetChapter', $scope.chapter);
			if ($scope.scrollToTop) {
				$window.scrollTo(0,0);
			}
		}
	};
	
}])

.directive('codexReaderFullNavChapter', function() {
	return {
		restrict: 'E',
		templateUrl: 'read/reader-full-nav-chapter.html',
		replace: true,
		controller: 'readerFullNavChapterController',
		controllerAs: 'rfncCtrl',
		scope: {
			chapter: '=',
			currentChapter: '=',
			scrollToTop: '='
		}
	};
})

.controller('readerMiniNavController', ['$scope', '$window', function($scope, $window) {
	
	this.nextChapter = function() {
		if ($scope.currentChapter && ($scope.currentChapter.number < $scope.maxChapter)) {
			$scope.$emit('readerNextChapter');
			if ($scope.scrollToTop) {
				$window.scrollTo(0,0);
			}
		}
	};
	
	this.prevChapter = function() {
		if ($scope.currentChapter && ($scope.currentChapter.number > 1)) {
			$scope.$emit('readerPrevChapter');
			if ($scope.scrollToTop) {
				$window.scrollTo(0,0);
			}
		}
	};
	
}])

.directive('codexReaderMiniNav', function() {
	return {
		restrict: 'E',
		templateUrl: 'read/reader-mini-nav.html',
		replace: true,
		controller: 'readerMiniNavController',
		controllerAs: 'rmnCtrl',
		scope: {
			currentChapter: '=',
			maxChapter: '=',
			scrollToTop: '='
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