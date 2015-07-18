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
	
	var genreCounts = {};
	var matchupCounts = {};
	var seriesCounts = {};
	
	var service = {
		
		fics: null,
		
		recount: function() {
			genreCounts = {};
			matchupCounts = {};
			seriesCounts = {};
			
			if (!this.fics) {
				return;
			}
			
			for (var i = 0; i < this.fics.length; i++) {
				
				var fic = this.fics[i];
				
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
		},
		
		refresh: function() {
			
			var genreIds = _.keys(genreFilters);
			var matchupIds = _.keys(matchupFilters);
			var seriesIds = _.keys(seriesFilters);
			
			$rootScope.$broadcast('ficBrowseFicsUpdating');
			if ((genreIds.length > 0) || (matchupIds.length > 0) || (seriesIds.length > 0)) {
				var that = this;
				this.fics = ficDataService.getFics({
					genres: genreIds,
					matchups: matchupIds,
					series: seriesIds
				});
				this.fics.$promise.then(function(data) {
					that.recount();
					$rootScope.$broadcast('ficBrowseFicsUpdated');
				});
			} else {
				this.fics = null;
				this.recount();
				$rootScope.$broadcast('ficBrowseFicsUpdated');
			}
			return this.fics;
		},
		
		hasSearch: function() {
			return this.hasAnySeriesFilter() || this.hasAnyGenreFilter() || this.hasAnyMatchupFilter();
		},
		
		addGenreFilter: function(genre) {
			if (!genre || this.hasGenreFilter(genre)) {
				return;
			}
			genreFilters[genre.id] = genre;
			$rootScope.$broadcast('ficBrowseGenresUpdated');
		},
		
		removeGenreFilter: function(genre) {
			if (!(genre && this.hasGenreFilter(genre))) {
				return;
			}
			delete genreFilters[genre.id];
			$rootScope.$broadcast('ficBrowseGenresUpdated');
		},
		
		hasGenreFilter: function(genre) {
			if (!genre) {
				return false;
			}
			return _.has(genreFilters, genre.id);
		},
		
		hasAnyGenreFilter: function() {
			return !_.isEmpty(genreFilters);
		},
		
		ficsWithGenre: function(genre) {
			if (!(genre && this.fics)) {
				return 0;
			}
			
			return genreCounts[genre.id] || 0;
		},
		
		addMatchupFilter: function(matchup) {
			if (!matchup || this.hasMatchupFilter(matchup)) {
				return;
			}
			matchupFilters[matchup.id] = matchup;
			$rootScope.$broadcast('ficBrowseMatchupsUpdated');
		},
		
		removeMatchupFilter: function(matchup) {
			if (!(matchup && this.hasMatchupFilter(matchup))) {
				return;
			}
			delete matchupFilters[matchup.id];
			$rootScope.$broadcast('ficBrowseMatchupsUpdated');
		},
		
		hasMatchupFilter: function(matchup) {
			if (!matchup) {
				return false;
			}
			return _.has(matchupFilters, matchup.id);
		},
		
		hasAnyMatchupFilter: function() {
			return !_.isEmpty(matchupFilters);
		},
		
		ficsWithMatchup: function(matchup) {
			if (!(matchup && this.fics)) {
				return 0;
			}
			
			return matchupCounts[matchup.id] || 0;
		},
		
		addSeriesFilter: function(series) {
			if (!series || this.hasSeriesFilter(series)) {
				return;
			}
			seriesFilters[series.id] = series;
			$rootScope.$broadcast('ficBrowseSeriesUpdated');
		},
		
		removeSeriesFilter: function(series) {
			if (!(series && this.hasSeriesFilter(series))) {
				return;
			}
			delete seriesFilters[series.id];
			$rootScope.$broadcast('ficBrowseSeriesUpdated');
		},
		
		hasSeriesFilter: function(series) {
			if (!series) {
				return false;
			}
			return _.has(seriesFilters, series.id);
		},
		
		hasAnySeriesFilter: function() {
			return !_.isEmpty(seriesFilters);
		},
		
		ficsWithSeries: function(series) {
			if (!(series && this.fics)) {
				return 0;
			}
			
			return seriesCounts[series.id] || 0;
		},
		
		clear: function() {
			seriesFilters = {};
			genreFilters = {};
			matchupFilters = {};
			$rootScope.$broadcast('ficBrowseFicsUpdating');
			this.fics = null;
			this.recount();
			$rootScope.$broadcast('ficBrowseSeriesUpdated');
			$rootScope.$broadcast('ficBrowseMatchupsUpdated');
			$rootScope.$broadcast('ficBrowseGenresUpdated');
			$rootScope.$broadcast('ficBrowseFicsUpdated');
		}
		
	};
	
	return service;
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
	
	this.fics = ficBrowseService.fics;
	this.searchActive = ficBrowseService.hasSearch();
	this.searchPending = false;
	var that = this;
	
	// TODO: apparently directive template/controllers don't get $viewContentLoaded events - is this correct to call on init?
	componentHandler.upgradeAllRegistered();
	
	$scope.$on('ficBrowseFicsUpdating', function() {
		that.searchPending = true;
		that.searchActive = ficBrowseService.hasSearch();
	});
	
	$scope.$on('ficBrowseFicsUpdated', function() {
		that.searchPending = false;
		that.fics = ficBrowseService.fics;
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

.controller('seriesFilterPanelController', ['$scope', 'seriesDataService', 'ficBrowseService', function($scope, seriesDataService, ficBrowseService) {
	
	this.expanded = false;
	this.loaded = false;
	
	this.toggleSeriesExpand = function() {
		if (!this.expanded && !this.loaded) {
			this.series = seriesDataService.getSeries();
			this.loaded = true;
		}
		this.expanded = !this.expanded;
	};
	
	this.filterActive = ficBrowseService.hasAnySeriesFilter();
	
	var that = this;
	
	$scope.$on('ficBrowseSeriesUpdated', function() {
		that.filterActive = ficBrowseService.hasAnySeriesFilter();
	});
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
	
	this.toggleSeriesFilter = function() {
		if (this.active) {
			ficBrowseService.removeSeriesFilter($scope.series);
		} else {
			ficBrowseService.addSeriesFilter($scope.series);
		}
		ficBrowseService.refresh();
		this.active = !this.active;
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

.controller('genreFilterPanelController', ['$scope', 'genreDataService', 'ficBrowseService', function($scope, genreDataService, ficBrowseService) {
	
	this.expanded = false;
	this.loaded = false;
	
	this.toggleGenreExpand = function() {
		if (!this.expanded && !this.loaded) {
			this.genres = genreDataService.getGenres();
			this.loaded = true;
		}
		this.expanded = !this.expanded;
	};
		
	this.filterActive = ficBrowseService.hasAnyGenreFilter();
	
	var that = this;
	
	$scope.$on('ficBrowseGenresUpdated', function() {
		that.filterActive = ficBrowseService.hasAnyGenreFilter();
	});
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
	
	this.toggleGenreFilter = function() {
		if (this.active) {
			ficBrowseService.removeGenreFilter($scope.genre);
		} else {
			ficBrowseService.addGenreFilter($scope.genre);
		}
		ficBrowseService.refresh();
		this.active = !this.active;
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

.controller('matchupFilterPanelController', ['$scope', 'matchupDataService', 'ficBrowseService', function($scope, matchupDataService, ficBrowseService) {
	
	this.expanded = false;
	this.loaded = false;	

	this.toggleMatchupExpand = function() {
		
		if (!this.expanded && !this.loaded) {
			this.matchups = matchupDataService.getMatchups();
			this.loaded = true;
		}
		
		this.expanded = !this.expanded;
		
	};
	
	this.filterActive = ficBrowseService.hasAnyMatchupFilter();

	var that = this;
		
	$scope.$on('ficBrowseMatchupsUpdated', function() {
		that.filterActive = ficBrowseService.hasAnyMatchupFilter();
	});
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
	
	this.toggleMatchupFilter = function() {
		if (this.active) {
			ficBrowseService.removeMatchupFilter($scope.matchup);
		} else {
			ficBrowseService.addMatchupFilter($scope.matchup);
		}
		ficBrowseService.refresh();
		this.active = !this.active;
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