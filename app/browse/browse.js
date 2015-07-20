'use strict';

angular.module('codex.browse', ['ngRoute', 'codex.filters', 'codex.data'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl: 'browse/browse.html',
		controller: 'browseController'
	});
}])

.factory('ficBrowseService', ['$rootScope', 'ficDataService', function($rootScope, ficDataService) {
	
	var genreFilters = {};
	var matchupFilters = {};
	var seriesFilters = {};
	
	var searchTerms = [];
	
	var genreCounts = {};
	var matchupCounts = {};
	var seriesCounts = {};
	
	var dirty = false;
	
	var fics = null;
	
	function recount() {
		genreCounts = {};
		matchupCounts = {};
		seriesCounts = {};
		
		if (!fics) {
			return;
		}
		
		for (var i = 0; i < fics.length; i++) {
			
			var fic = fics[i];
			
			if (fic.fic_genres && (fic.fic_genres.length > 0)) {
				for (var j = 0; j < fic.fic_genres.length; j++) {
					var genre_id = fic.fic_genres[j].genre_id;
					if (genre_id) {
						genreCounts[genre_id] = genreCounts[genre_id] ? genreCounts[genre_id] + 1 : 1;
					}
				}
			}
			
			if (fic.fic_matchups && (fic.fic_matchups.length > 0)) {
				for (var j = 0; j < fic.fic_matchups.length; j++) {
					var matchup_id = fic.fic_matchups[j].matchup_id;
					if (matchup_id) {
						matchupCounts[matchup_id] = matchupCounts[matchup_id] ? matchupCounts[matchup_id] + 1 : 1;
					}
				}
			}
			
			if (fic.fic_series && (fic.fic_series.length > 0)) {
				for (var j = 0; j < fic.fic_series.length; j++) {
					var series_id = fic.fic_series[j].series_id;
					if (series_id) {
						seriesCounts[series_id] = seriesCounts[series_id] ? seriesCounts[series_id] + 1 : 1;
					}
				}
			}
			
		}
	};
	
	function getFics() {
		return fics;
	};
	
	function getGenreFilters() {
		return _.values(genreFilters);
	};
	
	function getSeriesFilters() {
		return _.values(seriesFilters);
	};
	
	function getMatchupFilters() {
		return _.values(matchupFilters);
	};
	
	function getSearchTerms() {
		return searchTerms;
	};
	
	function refresh() {
		
		if (!dirty) {
			return;
		}
		
		var genreIds = _.keys(genreFilters);
		var matchupIds = _.keys(matchupFilters);
		var seriesIds = _.keys(seriesFilters);
		
		$rootScope.$broadcast('ficBrowseFicsUpdating');
		if ((genreIds.length > 0) || (matchupIds.length > 0) || (seriesIds.length > 0) || (searchTerms.length > 0)) {
			fics = ficDataService.getFics({
				genres: genreIds,
				matchups: matchupIds,
				series: seriesIds,
				search: searchTerms
			});
			dirty = false;
			fics.$promise.then(function(data) {
				recount();
				$rootScope.$broadcast('ficBrowseFicsUpdated');
			});
		} else {
			fics = null;
			dirty = false;
			recount();
			$rootScope.$broadcast('ficBrowseFicsUpdated');
		}
		
		return fics;
	};
	
	function hasSearch() {
		return hasAnySeriesFilter() || hasAnyGenreFilter() || hasAnyMatchupFilter() || hasAnySearchTerms();
	};
	
	function hasAnyGenreFilter() {
		return !_.isEmpty(genreFilters);
	};
	
	function hasAnyMatchupFilter() {
		return !_.isEmpty(matchupFilters);
	};
	
	function hasAnySeriesFilter() {
		return !_.isEmpty(seriesFilters);
	};
	
	function hasAnySearchTerms() {
		return searchTerms.length > 0;
	};
	
	function hasGenreFilter(genre) {
		if (!genre) {
			return false;
		}
		return _.has(genreFilters, genre.id);
	};
	
	function hasMatchupFilter(matchup) {
		if (!matchup) {
			return false;
		}
		return _.has(matchupFilters, matchup.id);
	};
	
	function hasSeriesFilter(series) {
		if (!series) {
			return false;
		}
		return _.has(seriesFilters, series.id);
	};
	
	function hasSearchTerm(term) {
		if (!term) {
			return false;
		}
		return _.includes(searchTerms, term);
	};
	
	function addGenreFilter(genre) {
		if (!genre || hasGenreFilter(genre)) {
			return;
		}
		genreFilters[genre.id] = genre;
		dirty = true;
		$rootScope.$broadcast('ficBrowseGenreAdded', genre);
	};
	
	function removeGenreFilter(genre) {
		if (!(genre && hasGenreFilter(genre))) {
			return;
		}
		delete genreFilters[genre.id];
		dirty = true;
		$rootScope.$broadcast('ficBrowseGenreRemoved', genre);
	};
	
	function addMatchupFilter(matchup) {
		if (!matchup || hasMatchupFilter(matchup)) {
			return;
		}
		matchupFilters[matchup.id] = matchup;
		dirty = true;
		$rootScope.$broadcast('ficBrowseMatchupAdded', matchup);
	};
	
	function removeMatchupFilter(matchup) {
		if (!(matchup && hasMatchupFilter(matchup))) {
			return;
		}
		delete matchupFilters[matchup.id];
		dirty = true;
		$rootScope.$broadcast('ficBrowseMatchupRemoved', matchup);
	};
	
	function addSeriesFilter(series) {
		if (!series || hasSeriesFilter(series)) {
			return;
		}
		seriesFilters[series.id] = series;
		dirty = true;
		$rootScope.$broadcast('ficBrowseSeriesAdded', series);
	};
	
	function removeSeriesFilter(series) {
		if (!(series && hasSeriesFilter(series))) {
			return;
		}
		delete seriesFilters[series.id];
		dirty = true;
		$rootScope.$broadcast('ficBrowseSeriesRemoved', series);
	};
	
	function setSearchTerms(terms) {
		var tempTerms = _.uniq(_.compact(terms));
		if (_.isEqual(tempTerms, searchTerms)) {
			return;
		}
		searchTerms = tempTerms;
		dirty = true;
	};
	
	function ficsWithGenre(genre) {
		if (!(genre && fics)) {
			return 0;
		}
		
		return genreCounts[genre.id] || 0;
	};
	
	function ficsWithMatchup(matchup) {
		if (!(matchup && fics)) {
			return 0;
		}
		
		return matchupCounts[matchup.id] || 0;
	};
	
	function ficsWithSeries(series) {
		if (!(series && fics)) {
			return 0;
		}
		
		return seriesCounts[series.id] || 0;
	};
	
	function clear() {
		var tempSeriesFilters = seriesFilters;
		seriesFilters = {};
		_.forEach(tempSeriesFilters, function(n, key) {
			$rootScope.$broadcast('ficBrowseSeriesRemoved', n);
		});
		var tempGenreFilters = genreFilters;
		genreFilters = {};
		_.forEach(tempGenreFilters, function(n, key) {
			$rootScope.$broadcast('ficBrowseGenreRemoved', n);
		});
		var tempMatchupFilters = matchupFilters;
		matchupFilters = {};
		_.forEach(tempMatchupFilters, function(n, key) {
			$rootScope.$broadcast('ficBrowseMatchupRemoved', n);
		});
		searchTerms = [];
		$rootScope.$broadcast('ficBrowseSearchCleared');
		dirty = true;
		refresh();
	};
	
	return {
		
		getFics: getFics,
		getGenreFilters: getGenreFilters,
		getMatchupFilters: getMatchupFilters,
		getSeriesFilters: getSeriesFilters,
		getSearchTerms: getSearchTerms,
		
		refresh: refresh,

		hasSearch: hasSearch,
		
		addGenreFilter: addGenreFilter,		
		removeGenreFilter: removeGenreFilter,
		hasGenreFilter: hasGenreFilter,
		hasAnyGenreFilter: hasAnyGenreFilter,
		ficsWithGenre: ficsWithGenre,
		
		addMatchupFilter: addMatchupFilter,
		removeMatchupFilter: removeMatchupFilter,
		hasMatchupFilter: hasMatchupFilter,
		hasAnyMatchupFilter: hasAnyMatchupFilter,
		ficsWithMatchup: ficsWithMatchup,
		
		addSeriesFilter: addSeriesFilter,
		removeSeriesFilter: removeSeriesFilter,
		hasSeriesFilter: hasSeriesFilter,
		hasAnySeriesFilter: hasAnySeriesFilter,
		ficsWithSeries: ficsWithSeries,
		
		hasSearchTerm: hasSearchTerm,
		setSearchTerms: setSearchTerms,
		
		clear: clear
		
	};
	
}])

.controller('browseController', ['$scope', '$timeout', function($scope, $timeout) {
	$scope.$on('$viewContentLoaded', function() {
		$timeout(function() {
			componentHandler.upgradeAllRegistered();
		});
	});
}])

.controller('ficListController', ['$scope', '$rootScope', '$timeout', 'ficBrowseService', function($scope, $rootScope, $timeout, ficBrowseService) {
	
	$rootScope.subtitle = '';
	
	this.fics = ficBrowseService.getFics();
	this.searchActive = ficBrowseService.hasSearch();
	this.searchPending = false;
	var that = this;
	
	// TODO: apparently directive template/controllers don't get $viewContentLoaded events - is this correct to call on init?
	$timeout(function() {
		componentHandler.upgradeAllRegistered();
	});
	
	$scope.titleSort = function(fic) {
		var title = fic.title || 'Untitled';
		title = title.replace(/[^A-Za-z0-9_ ]/g,"").toUpperCase();
		if (title.slice(0, 4) == 'THE ') {
			title = title.slice(4);
		}
		return title;
	};
	
	$scope.$on('ficBrowseFicsUpdating', function() {
		that.searchPending = true;
		that.searchActive = ficBrowseService.hasSearch();
	});
	
	$scope.$on('ficBrowseFicsUpdated', function() {
		that.searchPending = false;
		that.fics = ficBrowseService.getFics();
		that.searchActive = ficBrowseService.hasSearch();
	});
}])

.directive('codexFicList', function() {
	return {
		restrict: 'E',
		templateUrl: 'browse/fic-list.html',
		controller: 'ficListController',
		controllerAs: 'flCtrl',
		replace: true,
		scope: {}
	};
})

.directive('codexFicListSplash', function() {
	return {
		restrict: 'E',
		templateUrl: 'browse/fic-list-splash.html',
		replace: true,
		scope: {}
	};
})

.controller('ficListItemController', ['$scope', 'ficDataService', '$timeout', function($scope, ficDataService, $timeout) {
	
	this.expanded = false;
	
	this.toggle = function() {
		if (!this.ficDetail) {
			this.ficDetail = ficDataService.getFic($scope.fic.id);
		}
		this.expanded = !this.expanded;
	}
}])

.directive('codexFicListItem', function() {
	return {
		restrict: 'E',
		templateUrl: 'browse/fic-list-item.html',
		controller: 'ficListItemController',
		controllerAs: 'fliCtrl',
		replace: true,
		scope: {
			fic: '='
		}
	};
})

.controller('searchFieldController', ['$scope', 'ficBrowseService', function($scope, ficBrowseService) {
	
	
	
	function updateSearchField() {
		$scope.search = ficBrowseService.getSearchTerms().join(' ');
	}
	updateSearchField();
	
	$scope.$on('ficBrowseSearchCleared', updateSearchField);
	
	$scope.$watch('search', function(newValue, oldValue) {
		if (newValue === oldValue) {
			return;
		}
		
		ficBrowseService.setSearchTerms(newValue.split(' '));
		ficBrowseService.refresh();
	});
}])

.directive('codexSearchField', function() {
	return {
		restrict: 'E',
		templateUrl: 'browse/search-field.html',
		replace: true,
		controller: 'searchFieldController',
		controllerAs: 'sfCtrl',
		scope: {}
	};
})

.controller('filterBarController', ['$scope', 'ficBrowseService', function($scope, ficBrowseService) {
	
	this.genreFilters = ficBrowseService.getGenreFilters();
	this.matchupFilters = ficBrowseService.getMatchupFilters();
	this.seriesFilters = ficBrowseService.getSeriesFilters();
	
	this.clear = function() {
		ficBrowseService.clear();
		ficBrowseService.refresh();
	};
	
	var that = this;
	
	function updateFilterState() {
		that.hasFilters = ficBrowseService.hasAnyGenreFilter() || ficBrowseService.hasAnySeriesFilter() || ficBrowseService.hasAnyMatchupFilter();
	}
	updateFilterState();
	
	$scope.$on('ficBrowseSeriesAdded', function(e, series) {
		if (!series) {
			return;
		}
		that.seriesFilters.push(series);
		updateFilterState();
	});
	
	$scope.$on('ficBrowseSeriesRemoved', function(e, series) {
		if (!series) {
			return;
		}
		for (var i = 0; i < that.seriesFilters.length; i++) {
			if (that.seriesFilters[i].id == series.id) {
				that.seriesFilters.splice(i, 1);
				break;
			}
		}
		updateFilterState();
	});
	
	$scope.$on('ficBrowseGenreAdded', function(e, genre) {
		if (!genre) {
			return;
		}
		that.genreFilters.push(genre);
		updateFilterState();
	});
	
	$scope.$on('ficBrowseGenreRemoved', function(e, genre) {
		if (!genre) {
			return;
		}
		for (var i = 0; i < that.genreFilters.length; i++) {
			if (that.genreFilters[i].id == genre.id) {
				that.genreFilters.splice(i, 1);
				break;
			}
		}
		updateFilterState();
	});
	
	$scope.$on('ficBrowseMatchupAdded', function(e, matchup) {
		if (!matchup) {
			return;
		}
		that.matchupFilters.push(matchup);
		updateFilterState();
	});
	
	$scope.$on('ficBrowseMatchupRemoved', function(e, matchup) {
		if (!matchup) {
			return;
		}
		for (var i = 0; i < that.matchupFilters.length; i++) {
			if (that.matchupFilters[i].id == matchup.id) {
				that.matchupFilters.splice(i, 1);
				break;
			}
		}
		updateFilterState();
	});
	
}])

.directive('codexFilterBar', function() {
	return {
		restrict: 'E',
		templateUrl: 'browse/filter-bar.html',
		replace: true,
		controller: 'filterBarController',
		controllerAs: 'fbCtrl',
		scope: {}
	};
})

.controller('filterBarSeriesItemController', ['$scope', 'ficBrowseService', function($scope, ficBrowseService) {
	this.remove = function() {
		ficBrowseService.removeSeriesFilter($scope.series);
		ficBrowseService.refresh();
	};
}])

.directive('codexFilterBarSeriesItem', function() {
	return {
		restrict: 'E',
		templateUrl: 'browse/filter-bar-series-item.html',
		replace: true,
		controller: 'filterBarSeriesItemController',
		controllerAs: 'fbsiCtrl',
		scope: {
			series: '='
		}
	};
})

.controller('filterBarGenreItemController', ['$scope', 'ficBrowseService', function($scope, ficBrowseService) {
	this.remove = function() {
		ficBrowseService.removeGenreFilter($scope.genre);
		ficBrowseService.refresh();
	};
}])

.directive('codexFilterBarGenreItem', function() {
	return {
		restrict: 'E',
		templateUrl: 'browse/filter-bar-genre-item.html',
		replace: true,
		controller: 'filterBarGenreItemController',
		controllerAs: 'fbgiCtrl',
		scope: {
			genre: '='
		}
	};
})

.controller('filterBarMatchupItemController', ['$scope', 'ficBrowseService', function($scope, ficBrowseService) {
	this.remove = function() {
		ficBrowseService.removeMatchupFilter($scope.matchup);
		ficBrowseService.refresh();
	};
}])

.directive('codexFilterBarMatchupItem', function() {
	return {
		restrict: 'E',
		templateUrl: 'browse/filter-bar-matchup-item.html',
		replace: true,
		controller: 'filterBarMatchupItemController',
		controllerAs: 'fbmiCtrl',
		scope: {
			matchup: '='
		}
	};
})

.controller('seriesFilterPanelController', ['$scope', 'seriesDataService', function($scope, seriesDataService) {
	
	this.expanded = false;
	this.loaded = false;
	
	this.toggleSeriesExpand = function() {
		if (!this.expanded && !this.loaded) {
			this.series = seriesDataService.getSeries();
			this.loaded = true;
		}
		this.expanded = !this.expanded;
	};
}])

.directive('codexSeriesFilterPanel', function() {
	return {
		restrict: 'E',
		templateUrl: 'browse/series-filter-panel.html',
		controller: 'seriesFilterPanelController',
		controllerAs: 'sfpCtrl',
		replace: true,
		scope: {}
	};
})

.controller('seriesFilterPanelItemController', ['$scope', 'ficBrowseService', function($scope, ficBrowseService) {
	
	this.active = ficBrowseService.hasSeriesFilter($scope.series);
	this.matchCount = ficBrowseService.ficsWithSeries($scope.series);
	this.showBadge = ficBrowseService.hasSearch();
	
	var that = this;
	
	$scope.$on('ficBrowseFicsUpdated', function() {
		that.matchCount = ficBrowseService.ficsWithSeries($scope.series);
		that.showBadge = ficBrowseService.hasSearch();
	});
	
	$scope.$on('ficBrowseSeriesAdded', function(e, series) {
		if (!(series && (series.id == $scope.series.id))) {
			return;
		}
		that.active = true;
	});
	
	$scope.$on('ficBrowseSeriesRemoved', function(e, series) {
		if (!(series && (series.id == $scope.series.id))) {
			return;
		}
		that.active = false;
	});
	
	this.toggleSeriesFilter = function() {
		if (this.active) {
			ficBrowseService.removeSeriesFilter($scope.series);
		} else {
			ficBrowseService.addSeriesFilter($scope.series);
		}
		ficBrowseService.refresh();
	};
}])

.directive('codexSeriesFilterPanelItem', function() {
	return {
		restrict: 'E',
		templateUrl: 'browse/series-filter-panel-item.html',
		controller: 'seriesFilterPanelItemController',
		controllerAs: 'sfpiCtrl',
		replace: true,
		scope: {
			series: '='
		}
	};
})

.controller('genreFilterPanelController', ['$scope', 'genreDataService', function($scope, genreDataService) {
	
	this.expanded = false;
	this.loaded = false;
	
	this.toggleGenreExpand = function() {
		if (!this.expanded && !this.loaded) {
			this.genres = genreDataService.getGenres();
			this.loaded = true;
		}
		this.expanded = !this.expanded;
	};
}])

.directive('codexGenreFilterPanel', function() {
	return {
		restrict: 'E',
		templateUrl: 'browse/genre-filter-panel.html',
		controller: 'genreFilterPanelController',
		controllerAs: 'gfpCtrl',
		replace: true,
		scope: {}
	};
})

.controller('genreFilterPanelItemController', ['$scope', 'ficBrowseService', function($scope, ficBrowseService) {
	
	this.active = ficBrowseService.hasGenreFilter($scope.genre);
	this.matchCount = ficBrowseService.ficsWithGenre($scope.genre);
	this.showBadge = ficBrowseService.hasSearch();
	
	var that = this;
	
	$scope.$on('ficBrowseFicsUpdated', function() {
		that.matchCount = ficBrowseService.ficsWithGenre($scope.genre);
		that.showBadge = ficBrowseService.hasSearch();
	});
	
	$scope.$on('ficBrowseGenreAdded', function(e, genre) {
		if (!(genre && (genre.id == $scope.genre.id))) {
			return;
		}
		that.active = true;
	});
	
	$scope.$on('ficBrowseGenreRemoved', function(e, genre) {
		if (!(genre && (genre.id == $scope.genre.id))) {
			return;
		}
		that.active = false;
	});
	
	this.toggleGenreFilter = function() {
		if (this.active) {
			ficBrowseService.removeGenreFilter($scope.genre);
		} else {
			ficBrowseService.addGenreFilter($scope.genre);
		}
		ficBrowseService.refresh();
	};
}])

.directive('codexGenreFilterPanelItem', function() {
	return {
		restrict: 'E',
		templateUrl: 'browse/genre-filter-panel-item.html',
		controller: 'genreFilterPanelItemController',
		controllerAs: 'gfpiCtrl',
		replace: true,
		scope: {
			genre: '='
		}
	};
})

.controller('matchupFilterPanelController', ['$scope', 'matchupDataService', function($scope, matchupDataService) {
	
	this.expanded = false;
	this.loaded = false;	

	this.toggleMatchupExpand = function() {
		
		if (!this.expanded && !this.loaded) {
			this.matchups = matchupDataService.getMatchups();
			this.loaded = true;
		}
		
		this.expanded = !this.expanded;
		
	};
}])

.directive('codexMatchupFilterPanel', function() {
	return {
		restrict: 'E',
		templateUrl: 'browse/matchup-filter-panel.html',
		controller: 'matchupFilterPanelController',
		controllerAs: 'mfpCtrl',
		replace: true,
		scope: {}
	};
})

.controller('matchupFilterPanelItemController', ['$scope', 'ficBrowseService', function($scope, ficBrowseService) {
	this.active = ficBrowseService.hasMatchupFilter($scope.matchup);
	this.matchCount = ficBrowseService.ficsWithMatchup($scope.matchup);
	this.showBadge = ficBrowseService.hasSearch();
	
	var that = this;
	
	$scope.$on('ficBrowseFicsUpdated', function() {
		that.matchCount = ficBrowseService.ficsWithMatchup($scope.matchup);
		that.showBadge = ficBrowseService.hasSearch();
	});
	
	$scope.$on('ficBrowseMatchupAdded', function(e, matchup) {
		if (!(matchup && (matchup.id == $scope.matchup.id))) {
			return;
		}
		that.active = true;
	});
	
	$scope.$on('ficBrowseMatchupRemoved', function(e, matchup) {
		if (!(matchup && (matchup.id == $scope.matchup.id))) {
			return;
		}
		that.active = false;
	});
	
	this.toggleMatchupFilter = function() {
		if (this.active) {
			ficBrowseService.removeMatchupFilter($scope.matchup);
		} else {
			ficBrowseService.addMatchupFilter($scope.matchup);
		}
		ficBrowseService.refresh();
	};
}])

.directive('codexMatchupFilterPanelItem', function() {
	return {
		restrict: 'E',
		templateUrl: 'browse/matchup-filter-panel-item.html',
		controller: 'matchupFilterPanelItemController',
		controllerAs: 'mfpiCtrl',
		replace: true,
		scope: {
			matchup: '='
		}
	};
});