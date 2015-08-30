'use strict';

angular.module('codex.data')
	.factory('ficStorageService', ficStorageService);
	
ficStorageService.$inject = ['$localStorage', '$q', 'ficResourceService', 'chapterResourceService'];

function ficStorageService($localStorage, $q, ficResourceService, chapterResourceService) {
	
	var service = {
		getFics: getFics,
		getFic: getFic,
		hasFic: hasFic,
		addFic: addFic,
		removeFic: removeFic,
		getChapters: getChapters,
		getChapter: getChapter,
		getGenres: getGenres,
		getMatchups: getMatchups,
		getSeries: getSeries
	};
	return service;
	
	
	function getFics(filters) {
		
		filters = filters || {};
		
		var chain = _($localStorage.fics);
		
		// filter genres
		if (filters.genres && (filters.genres.length > 0)) {
			chain = chain.filter(function(fic) {
				return matchIds(_.pluck(fic.genres, 'id'), filters.genres);
			});
		}
		
		// filter series
		if (filters.series && (filters.series.length > 0)) {
			chain = chain.filter(function(fic) {
				return matchIds(_.pluck(fic.series, 'id'), filters.series);
			});
		}
		
		//filter matchups
		if (filters.matchups && (filters.matchups.length > 0)) {
			chain = chain.filter(function(fic) {
				return matchIds(_.pluck(fic.matchups, 'id'), filters.matchups);
			});
		}
		
		// filter search
		if (filters.search && (filters.search.length > 0)) {
			chain = chain.filter(function(fic) {
				for (var i = 0; i < filters.search.length; i++) {
					if (!searchFic(fic, filters.search[i])) {
						return false;
					}
				}
				return true;
			});
		}
		
		var fics = chain.map(function(fic) {
			return {
				id: fic.id,
				title: fic.title,
				authors: fic.authors,
				genres: fic.genres,
				series: fic.series,
				matchups: fic.matchups,
				fic_genres: _.map(fic.genres, function(genre) {
					return {
						fic_id: fic.id,
						genre_id: genre.id
					};
				}),
				fic_series: _.map(fic.series, function(series) {
					return {
						fic_id: fic.id,
						series_id: series.id
					};
				}),
				fic_matchups: _.map(fic.matchups, function(matchup) {
					return {
						fic_id: fic.id,
						matchup_id: matchup.id
					};
				})
			};
		}).value();
		
		return promiseWrapper(fics);
	}
	
	function getFic(ficId) {
		if (!ficId) {
			return null;
		}
		
		return promiseWrapper(_.omit($localStorage.fics[ficId], 'chapters'));
	}
	
	function hasFic(ficId) {
		if (!ficId) {
			return false;
		}
		
		if (!$localStorage.fics) {
			return false;
		}
		
		return ficId in $localStorage.fics;
	}
	
	function addFic(ficId) {
		if (!ficId) {
			return false;
		}
		
		if (hasFic(ficId)) {
			return true;
		}
		
		return downloadFic(ficId);
	}
	
	function removeFic(ficId) {
		if (!hasFic(ficId)) {
			return false;
		}
		
		delete $localStorage.fics[ficId];
	}
	
	function getChapters(ficId) {
		if (!hasFic(ficId)) {
			return null;
		}
		
		var chapters = _.map($localStorage.fics[ficId].chapters, function(chapter) {
			return {
				id: chapter.id,
				number: chapter.number,
				title: chapter.title,
				fic_id: chapter.fic_id
			};
		});
		
		return promiseWrapper(chapters);
	}
	
	function getChapter(ficId, num) {
		if (!(ficId && num)) {
			return null;
		}
		
		if (!hasFic(ficId)) {
			return null;
		}
		
		return promiseWrapper(_.find($localStorage.fics[ficId].chapters, 'number', num));
	}
	
	function getGenres() {
		return promiseWrapper(_($localStorage.fics).pluck('genres').flatten().uniq('id').value());
	}
	
	function getMatchups() {
		return promiseWrapper(_($localStorage.fics).pluck('matchups').flatten().uniq('id').value());
	}
	
	function getSeries() {
		return promiseWrapper(_($localStorage.fics).pluck('series').flatten().uniq('id').value());
	}
	
	function downloadFic(ficId) {
		var fic = ficResourceService.getFic(ficId);
		if (!fic) {
			return false;
		}
		
		fic.$promise.then(function(ficData) {
			
			if (!$localStorage.fics) {
				$localStorage.fics = {};
			}
			
			$localStorage.fics[ficId] = _.pick(ficData, ['id', 'title', 'authors', 'matchups', 'series', 'genres']);
			
			chapterResourceService.getChapters(ficId).$promise.then(function(chaptersData) {
				
				delete chaptersData['$promise'];
				delete chaptersData['$resolved'];
				
				$localStorage.fics[ficId].chapters = _.map(chaptersData, function(chapter) {
					return _.pick(chapter, ['id', 'number', 'title', 'fic_id']);
				});
				
				var chapterPromises = [];
				
				_.forEach($localStorage.fics[ficId].chapters, function(chapter) {
					
					var chapterPromise = chapterResourceService.getChapter(ficId, chapter.number);
					chapterPromise.$promise.then(function(chapterData) {
						_.assign(chapter, _.pick(chapterData, ['id', 'number', 'title', 'data', 'wrapped', 'no_paragraph_spacing', 'double_line_breaks', 'fic_id']));
					});
					chapterPromises.push(chapterPromise.$promise);
					
				});
				
			});
			
		});
		
		return true;
	}
	
	function promiseWrapper(data) {
		var deferred = $q.defer();
		var clone = _.clone(data);	// shallow clone should be ok here
		clone.$promise = deferred.promise;
		clone.$resolved = true;
		deferred.resolve(clone);
		return clone;
	}
	
	function matchIds(idAry, idAry2) {
		var ary1 = _.map(idAry, function(id) {
			return +id;
		});
		var ary2 = _.map(idAry2, function(id) {
			return +id;
		});
		return _.intersection(ary1, ary2).length > 0;
	}
	
	function searchFic(fic, term) {
		term = term.toUpperCase();
		
		if (fic.title && (fic.title.toUpperCase().indexOf(term) > -1)) {
			return true;
		}
		
		if (fic.authors && (fic.authors.length > 0)) {
			var authorNames = _.pluck(fic.authors, 'name');
			for (var i = 0; i < authorNames.length; i++) {
				if (authorNames[i].toUpperCase().indexOf(term) > -1) {
					return true;
				}
			}
		}
		
		return false;
	}
	
}