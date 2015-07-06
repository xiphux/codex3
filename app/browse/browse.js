'use strict';

angular.module('codex.browse', ['ngRoute', 'ngResource', 'codex.filters'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl: 'browse/browse.html',
		controller: 'browseController'
	});
}])

.factory('ficBrowseService', ['$rootScope', '$resource', function($rootScope, $resource) {
	
	var genreFilters = [];
	var matchupFilters = [];
	var seriesFilters = [];
	
	var genreCounts = {};
	var matchupCounts = {};
	var seriesCounts = {};
	
	var ficResource = $resource('api/fics');
	
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
		
		queryFics: function() {
			var params = {};
			var genreIds = _.pluck(genreFilters, 'id');
			var matchupIds = _.pluck(matchupFilters, 'id');
			var seriesIds = _.pluck(seriesFilters, 'id');
			if (genreIds.length > 0) {
				if (genreIds.length > 1) {
					params['genre[]'] = genreIds;
				} else {
					params['genre'] = genreIds[0];
				}
			}
			if (matchupIds.length > 0) {
				if (matchupIds.length > 1) {
					params['matchup[]'] = matchupIds;
				} else {
					params['matchup'] = matchupIds[0];
				}
			}
			if (seriesIds.length > 0) {
				if (seriesIds.length > 1) {
					params['series[]'] = seriesIds;
				} else {
					params['series'] = seriesIds[0];
				}
			}
			
			$rootScope.$broadcast('ficBrowseFicsUpdating');
			if (_.size(params) > 0) {
				var that = this;
				this.fics = ficResource.query(params, function(data) {
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
			if (!genre) {
				return;
			}
			genreFilters.push(genre);
			$rootScope.$broadcast('ficBrowseGenresUpdated');
			this.queryFics();
		},
		
		removeGenreFilter: function(genre) {
			if (!genre) {
				return;
			}
			genreFilters = _.reject(genreFilters, 'id', genre.id);
			$rootScope.$broadcast('ficBrowseGenresUpdated');
			this.queryFics();
		},
		
		hasGenreFilter: function(genre) {
			if (!genre) {
				return false;
			}
			return !!_.find(genreFilters, 'id', genre.id);
		},
		
		hasAnyGenreFilter: function() {
			return (genreFilters.length > 0);
		},
		
		ficsWithGenre: function(genre) {
			if (!(genre && this.fics)) {
				return 0;
			}
			
			return genreCounts[genre.id] || 0;
		},
		
		addMatchupFilter: function(matchup) {
			if (!matchup) {
				return;
			}
			matchupFilters.push(matchup);
			$rootScope.$broadcast('ficBrowseMatchupsUpdated');
			this.queryFics();
		},
		
		removeMatchupFilter: function(matchup) {
			if (!matchup) {
				return;
			}
			matchupFilters = _.reject(matchupFilters, 'id', matchup.id);
			$rootScope.$broadcast('ficBrowseMatchupsUpdated');
			this.queryFics();
		},
		
		hasMatchupFilter: function(matchup) {
			if (!matchup) {
				return false;
			}
			return !!_.find(matchupFilters, 'id', matchup.id);
		},
		
		hasAnyMatchupFilter: function() {
			return (matchupFilters.length > 0);
		},
		
		ficsWithMatchup: function(matchup) {
			if (!(matchup && this.fics)) {
				return 0;
			}
			
			return matchupCounts[matchup.id] || 0;
		},
		
		addSeriesFilter: function(series) {
			if (!series) {
				return;
			}
			seriesFilters.push(series);
			$rootScope.$broadcast('ficBrowseSeriesUpdated');
			this.queryFics();
		},
		
		removeSeriesFilter: function(series) {
			if (!series) {
				return;
			}
			seriesFilters = _.reject(seriesFilters, 'id', series.id);
			$rootScope.$broadcast('ficBrowseSeriesUpdated');
			this.queryFics();
		},
		
		hasSeriesFilter: function(series) {
			if (!series) {
				return false;
			}
			return !!_.find(seriesFilters, 'id', series.id);
		},
		
		hasAnySeriesFilter: function() {
			return (seriesFilters.length > 0);
		},
		
		ficsWithSeries: function(series) {
			if (!(series && this.fics)) {
				return 0;
			}
			
			return seriesCounts[series.id] || 0;
		},
		
		clear: function() {
			seriesFilters = [];
			genreFilters = [];
			matchupFilters = [];
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

.controller('browseController', function() {
	
})

.controller('ficListController', ['$scope', '$rootScope', 'ficBrowseService', function($scope, $rootScope, ficBrowseService) {
	
	$rootScope.subtitle = '';
	
	this.fics = ficBrowseService.fics;
	this.searchActive = ficBrowseService.hasSearch();
	var that = this;
	
	$scope.$on('ficBrowseFicsUpdated', function() {
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

.controller('ficListItemController', ['$scope', '$resource', function($scope, $resource) {
	
	this.expanded = false;
	
	this.toggle = function() {
		if (!this.ficDetail) {
			this.ficDetail = $resource('api/fics/:ficId').get({ficId: $scope.fic.id});
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

.controller('seriesFilterPanelController', ['$scope', '$resource', 'ficBrowseService', function($scope, $resource, ficBrowseService) {
	
	this.expanded = false;
	this.loaded = false;
	
	this.toggleSeriesExpand = function() {
		if (!this.expanded && !this.loaded) {
			this.series = $resource('api/series').query();
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

.controller('genreFilterPanelController', ['$scope', '$resource', 'ficBrowseService', function($scope, $resource, ficBrowseService) {
	
	this.expanded = false;
	this.loaded = false;
	
	this.toggleGenreExpand = function() {
		if (!this.expanded && !this.loaded) {
			this.genres = $resource('api/genres').query();
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

.controller('matchupFilterPanelController', ['$scope', '$resource', 'ficBrowseService', function($scope, $resource, ficBrowseService) {
	
	this.expanded = false;
	this.loaded = false;	

	this.toggleMatchupExpand = function() {
		
		if (!this.expanded && !this.loaded) {
			this.matchups = $resource('api/matchups').query();
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