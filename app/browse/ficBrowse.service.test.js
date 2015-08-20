'use strict';

describe('codex.browse module', function() {
	
	beforeEach(module('codex.browse'));
	
	describe('fic browse service', function() {
		
		var mockFicDataService, fbSvc, $q, $rootScope, queryDeferred;
		
		beforeEach(function() {
			
			mockFicDataService = {
				getFics: function(params) {}
			};
			
			module(function($provide) {
				$provide.value('ficDataService', mockFicDataService);
			});
			
		});
		
		beforeEach(inject(function(_$q_,_$rootScope_,$injector) {
			
			$q = _$q_;
			$rootScope = _$rootScope_;
			
			queryDeferred = $q.defer();
			
			spyOn(mockFicDataService, 'getFics').and.returnValue({ $promise: queryDeferred.promise });
			
			fbSvc = $injector.get('ficBrowseService');
		}));
		
		describe('genre filters', function() {
			
			var genre;
			
			beforeEach(function() {
				genre = {
					id: "2",
					name: "GenreTwo"
				};
			});
			
			it('should add a genre to the list', function() {

				fbSvc.addGenreFilter(genre);
				
				expect(fbSvc.getGenreFilters()["2"]).toEqual(genre);
				
			});
			
			it('should remove the genre', function() {
				
				fbSvc.addGenreFilter(genre);
				
				fbSvc.removeGenreFilter(genre);
				
				expect(genre.id in fbSvc.getGenreFilters()).toBeFalsy();
			});
			
			it('should not add the same genre twice', function() {
				
				fbSvc.addGenreFilter(genre);
				
				fbSvc.addGenreFilter(genre);
				
				var genreFilters = fbSvc.getGenreFilters();
				
				var count = 0;
				for (var k in genreFilters) {
					if (genreFilters.hasOwnProperty(k)) {
						count++;
					}
				}
				
				expect(count).toEqual(1);
			});
			
			it('should not remove the same genre twice', function() {
				
				fbSvc.addGenreFilter(genre);
				
				fbSvc.removeGenreFilter(genre);
				fbSvc.removeGenreFilter(genre);
				
				var genreFilters = fbSvc.getGenreFilters();
				
				var count = 0;
				for (var k in genreFilters) {
					if (genreFilters.hasOwnProperty(k)) {
						count++;
					}
				}
				
				expect(count).toEqual(0);
			});
			
			it('should test if it contains the specified genre', function() {
				
				expect(fbSvc.hasGenreFilter(null)).toBeFalsy();
				
				expect(fbSvc.hasGenreFilter(genre)).toBeFalsy();
				
				fbSvc.addGenreFilter(genre);
				
				expect(fbSvc.hasGenreFilter(genre)).toBeTruthy();
				
				fbSvc.removeGenreFilter(genre);
				
				expect(fbSvc.hasGenreFilter(genre)).toBeFalsy();
				
			});
			
			it('should test if it contains any genre', function() {

				var genre2 = {
					id: "3",
					name: "GenreTwo"
				};
				
				expect(fbSvc.hasAnyGenreFilter()).toBeFalsy();
				
				fbSvc.addGenreFilter(genre);
				
				expect(fbSvc.hasAnyGenreFilter()).toBeTruthy();
				
				fbSvc.addGenreFilter(genre2);
				
				expect(fbSvc.hasAnyGenreFilter()).toBeTruthy();
				
				fbSvc.removeGenreFilter(genre);
				
				expect(fbSvc.hasAnyGenreFilter()).toBeTruthy();
				
				fbSvc.removeGenreFilter(genre2);
				
				expect(fbSvc.hasAnyGenreFilter()).toBeFalsy();
				
			});
			
			it('should have an active search with a genre', function() {
				
				expect(fbSvc.hasSearch()).toBeFalsy();
				
				fbSvc.addGenreFilter(genre);
				
				expect(fbSvc.hasSearch()).toBeTruthy();
				
				fbSvc.removeGenreFilter(genre);
				
				expect(fbSvc.hasSearch()).toBeFalsy();
				
			});
			
		});
		
		describe('matchup filters', function() {
					
			var matchup;
			
			beforeEach(function() {
				matchup = {
					id: "2",
					characters: [
						{
							id: "1",
							name: "CharacterOne"
						},
						{
							id: "3",
							name: "CharacterTwo"
						}
					]
				};
			});
			
			it('should add a matchup to the list', function() {

				fbSvc.addMatchupFilter(matchup);
				
				expect(fbSvc.getMatchupFilters()["2"]).toEqual(matchup);
				
			});
			
			it('should remove the matchup', function() {
				
				fbSvc.addMatchupFilter(matchup);
				
				fbSvc.removeMatchupFilter(matchup);
				
				expect(matchup.id in fbSvc.getMatchupFilters()).toBeFalsy();
			});
			
			it('should not add the same matchup twice', function() {
				
				fbSvc.addMatchupFilter(matchup);
				
				fbSvc.addMatchupFilter(matchup);
				
				var matchupFilters = fbSvc.getMatchupFilters();
				
				var count = 0;
				for (var k in matchupFilters) {
					if (matchupFilters.hasOwnProperty(k)) {
						count++;
					}
				}
				
				expect(count).toEqual(1);
			});
			
			it('should not remove the same matchup twice', function() {
				
				fbSvc.addMatchupFilter(matchup);
				
				fbSvc.removeMatchupFilter(matchup);
				fbSvc.removeMatchupFilter(matchup);
				
				var matchupFilters = fbSvc.getMatchupFilters();
				
				var count = 0;
				for (var k in matchupFilters) {
					if (matchupFilters.hasOwnProperty(k)) {
						count++;
					}
				}
				
				expect(count).toEqual(0);
			});
			
			it('should test if it contains the specified matchup', function() {
				
				expect(fbSvc.hasMatchupFilter(null)).toBeFalsy();
				
				expect(fbSvc.hasMatchupFilter(matchup)).toBeFalsy();
				
				fbSvc.addMatchupFilter(matchup);
				
				expect(fbSvc.hasMatchupFilter(matchup)).toBeTruthy();
				
				fbSvc.removeMatchupFilter(matchup);
				
				expect(fbSvc.hasMatchupFilter(matchup)).toBeFalsy();
				
			});
			
			it('should test if it contains any matchup', function() {

				var matchup2 = {
					id: "3",
					characters: [
						{
							id: "4",
							name: "CharacterThree"
						},
						{
							id: "5",
							name: "CharacterFour"
						}
					]
				};
				
				expect(fbSvc.hasAnyMatchupFilter()).toBeFalsy();
				
				fbSvc.addMatchupFilter(matchup);
				
				expect(fbSvc.hasAnyMatchupFilter()).toBeTruthy();
				
				fbSvc.addMatchupFilter(matchup2);
				
				expect(fbSvc.hasAnyMatchupFilter()).toBeTruthy();
				
				fbSvc.removeMatchupFilter(matchup);
				
				expect(fbSvc.hasAnyMatchupFilter()).toBeTruthy();
				
				fbSvc.removeMatchupFilter(matchup2);
				
				expect(fbSvc.hasAnyMatchupFilter()).toBeFalsy();
				
			});
			
			it('should have an active search with a matchup', function() {
				
				expect(fbSvc.hasSearch()).toBeFalsy();
				
				fbSvc.addMatchupFilter(matchup);
				
				expect(fbSvc.hasSearch()).toBeTruthy();
				
				fbSvc.removeMatchupFilter(matchup);
				
				expect(fbSvc.hasSearch()).toBeFalsy();
				
			});
			
		});
		
		describe('series filters', function() {
					
			var series;
			
			beforeEach(function() {
				series = {
					id: "2",
					title: "SeriesTwo"
				};
			});
			
			it('should add a series to the list', function() {

				fbSvc.addSeriesFilter(series);
				
				expect(fbSvc.getSeriesFilters()["2"]).toEqual(series);
				
			});
			
			it('should remove the series', function() {
				
				fbSvc.addSeriesFilter(series);
				
				fbSvc.removeSeriesFilter(series);
				
				expect(series.id in fbSvc.getSeriesFilters()).toBeFalsy();
			});
			
			it('should not add the same series twice', function() {
				
				fbSvc.addSeriesFilter(series);
				
				fbSvc.addSeriesFilter(series);
				
				var seriesFilters = fbSvc.getSeriesFilters();
				
				var count = 0;
				for (var k in seriesFilters) {
					if (seriesFilters.hasOwnProperty(k)) {
						count++;
					}
				}
				
				expect(count).toEqual(1);
			});
			
			it('should not remove the same series twice', function() {
				
				fbSvc.addSeriesFilter(series);
				
				fbSvc.removeSeriesFilter(series);
				fbSvc.removeSeriesFilter(series);
				
				var seriesFilters = fbSvc.getSeriesFilters();
				
				var count = 0;
				for (var k in seriesFilters) {
					if (seriesFilters.hasOwnProperty(k)) {
						count++;
					}
				}
				
				expect(count).toEqual(0);
			});
			
			it('should test if it contains the specified series', function() {
				
				expect(fbSvc.hasSeriesFilter(null)).toBeFalsy();
				
				expect(fbSvc.hasSeriesFilter(series)).toBeFalsy();
				
				fbSvc.addSeriesFilter(series);
				
				expect(fbSvc.hasSeriesFilter(series)).toBeTruthy();
				
				fbSvc.removeSeriesFilter(series);
				
				expect(fbSvc.hasSeriesFilter(series)).toBeFalsy();
				
			});
			
			it('should test if it contains any series', function() {

				var series2 = {
					id: "3",
					title: "SeriesTwo"
				};
				
				expect(fbSvc.hasAnySeriesFilter()).toBeFalsy();
				
				fbSvc.addSeriesFilter(series);
				
				expect(fbSvc.hasAnySeriesFilter()).toBeTruthy();
				
				fbSvc.addSeriesFilter(series2);
				
				expect(fbSvc.hasAnySeriesFilter()).toBeTruthy();
				
				fbSvc.removeSeriesFilter(series);
				
				expect(fbSvc.hasAnySeriesFilter()).toBeTruthy();
				
				fbSvc.removeSeriesFilter(series2);
				
				expect(fbSvc.hasAnySeriesFilter()).toBeFalsy();
				
			});
			
			it('should have an active search with a series', function() {
				
				expect(fbSvc.hasSearch()).toBeFalsy();
				
				fbSvc.addSeriesFilter(series);
				
				expect(fbSvc.hasSearch()).toBeTruthy();
				
				fbSvc.removeSeriesFilter(series);
				
				expect(fbSvc.hasSearch()).toBeFalsy();
				
			});
			
		});
		
		describe('search terms', function() {
			
			it('should set the given search terms', function() {
				
				var searchTerms = ['termone', 'termtwo'];
				
				fbSvc.setSearchTerms(searchTerms);
				
				var terms = fbSvc.getSearchTerms();
				
				expect(terms).toContain('termone');
				expect(terms).toContain('termtwo');
				
			});
			
			it('should allow clearing search terms', function() {
				
				var searchTerms = ['termone', 'termtwo'];
				
				fbSvc.setSearchTerms(searchTerms);
				
				fbSvc.setSearchTerms([]);
				
				var terms = fbSvc.getSearchTerms();
				
				expect(terms).toEqual([]);
				
			});
			
			it('should not set blank search terms', function() {
				
				var searchTerms = ['termone', '', 'termthree'];
				
				fbSvc.setSearchTerms(searchTerms);
				
				var terms = fbSvc.getSearchTerms();
				
				expect(terms.length).toEqual(2);
				expect(terms).toContain('termone');
				expect(terms).toContain('termthree');
				expect(terms).not.toContain('');
				
			});
			
			it('should not set duplicate search terms', function() {
				
				var searchTerms = ['termone', 'termtwo', 'termtwo'];
				
				fbSvc.setSearchTerms(searchTerms);
				
				var terms = fbSvc.getSearchTerms();
				
				expect(terms.length).toEqual(2);
				expect(terms).toContain('termone');
				expect(terms).toContain('termtwo');
				
			});
			
			it('should not set identical search terms', function() {
				
				var searchTerms = ['termone', 'termtwo'];
				
				fbSvc.setSearchTerms(searchTerms);
				
				var searchTerms2 = ['termtwo', 'termone'];
				
				fbSvc.setSearchTerms(searchTerms2);
				
				expect(fbSvc.getSearchTerms()).toEqual(searchTerms);
				
			});
			
			it('should test if it contains the specified search term', function() {
				
				expect(fbSvc.hasSearchTerm(null)).toBeFalsy();
				expect(fbSvc.hasSearchTerm('')).toBeFalsy();
				expect(fbSvc.hasSearchTerm('termone')).toBeFalsy();
				expect(fbSvc.hasSearchTerm('termtwo')).toBeFalsy();
				
				fbSvc.setSearchTerms(['termone', 'termtwo']);
				
				expect(fbSvc.hasSearchTerm('termone')).toBeTruthy();
				expect(fbSvc.hasSearchTerm('termtwo')).toBeTruthy();
				expect(fbSvc.hasSearchTerm('termthree')).toBeFalsy();
				
				fbSvc.setSearchTerms([]);
				
				expect(fbSvc.hasSearchTerm('termone')).toBeFalsy();
				expect(fbSvc.hasSearchTerm('termtwo')).toBeFalsy();
				
			});
			
			it('should have an active search with a search term', function() {
				
				expect(fbSvc.hasSearch()).toBeFalsy();
				
				fbSvc.setSearchTerms(['termone']);
				
				expect(fbSvc.hasSearch()).toBeTruthy();
				
				fbSvc.setSearchTerms([]);
				
				expect(fbSvc.hasSearch()).toBeFalsy();
				
			});
			
		});
		
		describe('data query', function() {
			
			it('should not query with empty criteria', function() {
				fbSvc.refresh();
				
				expect(mockFicDataService.getFics).not.toHaveBeenCalled();
				
				expect(fbSvc.getFics()).toEqual(null);
			});
			
			it('should query once if there are any matchups', function() {
				
				var matchup = {
					id: '2',
					characters: [
						{
							id: '1',
							name: 'CharacterOne'
						},
						{
							id: '2',
							name: 'CharacterTwo'
						}
					]
				};
				
				fbSvc.addMatchupFilter(matchup);
				
				expect(mockFicDataService.getFics).not.toHaveBeenCalled();
				
				fbSvc.refresh();
				
				expect(mockFicDataService.getFics).toHaveBeenCalled();
				
				expect(mockFicDataService.getFics.calls.mostRecent().args[0].matchups).toEqual(['2']);
				
				var data = [
					{
						id: '1',
						title: 'One'
					},
					{
						id: '2',
						title: 'Two'
					}
				];
				
				queryDeferred.resolve(data);
				$rootScope.$apply();
				
				expect(fbSvc.getFics().$promise.$$state.value).toEqual(data);
				
				fbSvc.refresh();
				
				expect(mockFicDataService.getFics.calls.count()).toEqual(1);
				
			});
			
			it('should query once if there are any series', function() {
				
				var series = {
					id: '3',
					title: 'SeriesOne'
				};
				
				fbSvc.addSeriesFilter(series);
				
				expect(mockFicDataService.getFics).not.toHaveBeenCalled();
				
				fbSvc.refresh();
				
				expect(mockFicDataService.getFics).toHaveBeenCalled();
				
				expect(mockFicDataService.getFics.calls.mostRecent().args[0].series).toEqual(['3']);
				
				var data = [
					{
						id: '1',
						title: 'One'
					},
					{
						id: '2',
						title: 'Two'
					}
				];
				
				queryDeferred.resolve(data);
				$rootScope.$apply();
				
				expect(fbSvc.getFics().$promise.$$state.value).toEqual(data);
				
				fbSvc.refresh();
				
				expect(mockFicDataService.getFics.calls.count()).toEqual(1);
				
			});
			
			it('should query once if there are any genres', function() {
				
				var genre = {
					id: '4',
					name: 'GenreOne'
				};
				
				fbSvc.addGenreFilter(genre);
				
				expect(mockFicDataService.getFics).not.toHaveBeenCalled();
				
				fbSvc.refresh();
				
				expect(mockFicDataService.getFics).toHaveBeenCalled();
				
				expect(mockFicDataService.getFics.calls.mostRecent().args[0].genres).toEqual(['4']);
				
				var data = [
					{
						id: '1',
						title: 'One'
					},
					{
						id: '2',
						title: 'Two'
					}
				];
				
				queryDeferred.resolve(data);
				$rootScope.$apply();
				
				expect(fbSvc.getFics().$promise.$$state.value).toEqual(data);
				
				fbSvc.refresh();
				
				expect(mockFicDataService.getFics.calls.count()).toEqual(1);
				
			});
			
			it('should query once if there are any search terms', function() {
				
				var searchTerms = ['termone', 'termtwo'];
				
				fbSvc.setSearchTerms(searchTerms);
				
				expect(mockFicDataService.getFics).not.toHaveBeenCalled();
				
				fbSvc.refresh();
				
				expect(mockFicDataService.getFics).toHaveBeenCalled();
				
				expect(mockFicDataService.getFics.calls.mostRecent().args[0].search).toEqual(searchTerms);
				
				var data = [
					{
						id: '1',
						title: 'One'
					},
					{
						id: '2',
						title: 'Two'
					}
				];
				
				queryDeferred.resolve(data);
				$rootScope.$apply();
				
				expect(fbSvc.getFics().$promise.$$state.value).toEqual(data);
				
				fbSvc.refresh();
				
				expect(mockFicDataService.getFics.calls.count()).toEqual(1);
			});
			
			it('should query once if all filters are added', function() {
				
				var series = {
					id: '3',
					title: 'SeriesOne'
				};
				
				var genre = {
					id: '4',
					name: 'GenreOne'
				};
				
				var matchup = {
					id: '2',
					characters: [
						{
							id: '1',
							name: 'CharacterOne'
						},
						{
							id: '2',
							name: 'CharacterTwo'
						}
					]
				};
				
				var searchTerms = ['termone', 'termtwo'];
				
				fbSvc.addSeriesFilter(series);
				fbSvc.addGenreFilter(genre);
				fbSvc.addMatchupFilter(matchup);
				fbSvc.setSearchTerms(searchTerms);
				
				expect(mockFicDataService.getFics).not.toHaveBeenCalled();
				
				fbSvc.refresh();
				
				expect(mockFicDataService.getFics).toHaveBeenCalled();
				
				expect(mockFicDataService.getFics.calls.mostRecent().args[0].genres).toEqual(['4']);
				expect(mockFicDataService.getFics.calls.mostRecent().args[0].series).toEqual(['3']);
				expect(mockFicDataService.getFics.calls.mostRecent().args[0].matchups).toEqual(['2']);
				expect(mockFicDataService.getFics.calls.mostRecent().args[0].search).toEqual(searchTerms);
				
				var data = [
					{
						id: '1',
						title: 'One'
					},
					{
						id: '2',
						title: 'Two'
					}
				];
				
				queryDeferred.resolve(data);
				$rootScope.$apply();
				
				expect(fbSvc.getFics().$promise.$$state.value).toEqual(data);
				
				fbSvc.refresh();
				
				expect(mockFicDataService.getFics.calls.count()).toEqual(1);
				
			});
			
			it('should clear out if there are no filters or search terms', function() {
				
				var series = {
					id: '3',
					title: 'SeriesOne'
				};
				
				fbSvc.addSeriesFilter(series);
				
				fbSvc.refresh();
				
				var data = [
					{
						id: '1',
						title: 'One'
					},
					{
						id: '2',
						title: 'Two'
					}
				];
				
				queryDeferred.resolve(data);
				$rootScope.$apply();
				
				expect(fbSvc.getFics().$promise.$$state.value).toEqual(data);
				
				fbSvc.removeSeriesFilter(series);
				
				fbSvc.refresh();
				
				expect(fbSvc.getFics()).toBeNull();
				
				expect(mockFicDataService.getFics.calls.count()).toEqual(1);
				
			});
			
		});
		
		describe('data counts', function() {
			
			beforeEach(function() {
				
				var ficData = [
					{
						id: '1',
						title: 'FicOne',
						fic_genres: [
							{ fic_id: '1', genre_id: '1' },
							{ fic_id: '1', genre_id: '2' }
						],
						fic_series: [
							{ fic_id: '1', series_id: '1' },
							{ fic_id: '1', series_id: '2' }
						],
						fic_matchups: [
							{ fic_id: '1', matchup_id: '1' },
							{ fic_id: '1', matchup_id: '2' }
						]
					},
					{
						id: '2',
						title: 'FicTwo',
						fic_genres: [
							{ fic_id: '2', genre_id: '2' },
							{ fic_id: '2', genre_id: '3' }
						],
						fic_series: [
							{ fic_id: '2', series_id: '2' },
							{ fic_id: '2', series_id: '3' }
						],
						fic_matchups: [
							{ fic_id: '2', matchup_id: '2' },
							{ fic_id: '2', matchup_id: '3' }
						]
					},
				];
				
				fbSvc.setSearchTerms(['termone']);
				fbSvc.refresh();
				queryDeferred.resolve(ficData);
				$rootScope.$apply();
			});
			
			it('should count the number of fics with a given genre', function() {
				
				expect(fbSvc.ficsWithGenre({ id: '1' })).toEqual(1);
				expect(fbSvc.ficsWithGenre({ id: '2' })).toEqual(2);
				expect(fbSvc.ficsWithGenre({ id: '3' })).toEqual(1);
				
			});
			
			it('should return 0 if there are no fics with a given genre', function() {
				
				expect(fbSvc.ficsWithGenre({ id: '4' })).toEqual(0);
				expect(fbSvc.ficsWithGenre(null)).toEqual(0);
				
			});
			
			it('should count the number of fics with a given matchup', function() {
				
				expect(fbSvc.ficsWithMatchup({ id: '1' })).toEqual(1);
				expect(fbSvc.ficsWithMatchup({ id: '2' })).toEqual(2);
				expect(fbSvc.ficsWithMatchup({ id: '3' })).toEqual(1);
				
			});
			
			it('should return 0 if there are no fics with a given matchup', function() {
				
				expect(fbSvc.ficsWithMatchup({ id: '4' })).toEqual(0);
				expect(fbSvc.ficsWithMatchup(null)).toEqual(0);
				
			});
			
			it('should count the number of fics with a given series', function() {
				
				expect(fbSvc.ficsWithSeries({ id: '1' })).toEqual(1);
				expect(fbSvc.ficsWithSeries({ id: '2' })).toEqual(2);
				expect(fbSvc.ficsWithSeries({ id: '3' })).toEqual(1);
				
			});
			
			it('should return 0 if there are no fics with a given matchup', function() {
				
				expect(fbSvc.ficsWithSeries({ id: '4' })).toEqual(0);
				expect(fbSvc.ficsWithSeries(null)).toEqual(0);
				
			});
			
		});
		
		it('should have an active search if there is a series, matchup, genre, and search term', function() {
			
			var series = {
				id: '3',
				title: 'SeriesOne'
			};
			
			var genre = {
				id: '4',
				name: 'GenreOne'
			};
			
			var matchup = {
				id: '2',
				characters: [
					{
						id: '1',
						name: 'CharacterOne'
					},
					{
						id: '2',
						name: 'CharacterTwo'
					}
				]
			};
			
			var searchTerms = ['termone', 'termtwo'];
			
			fbSvc.addSeriesFilter(series);
			fbSvc.addGenreFilter(genre);
			fbSvc.addMatchupFilter(matchup);
			fbSvc.setSearchTerms(searchTerms);
			
			expect(fbSvc.hasSearch()).toBeTruthy();
			
		});
		
		it('should clear an active search', function() {
			
			var series = {
				id: '3',
				title: 'SeriesOne'
			};
			
			fbSvc.addSeriesFilter(series);
			
			fbSvc.refresh();
			
			var data = [
				{
					id: '1',
					title: 'One'
				},
				{
					id: '2',
					title: 'Two'
				}
			];
			
			queryDeferred.resolve(data);
			$rootScope.$apply();
			
			expect(fbSvc.getFics().$promise.$$state.value).toEqual(data);
			
			fbSvc.clear();
			
			expect(fbSvc.getFics()).toBeNull();
			
			expect(fbSvc.hasSearch()).toBeFalsy();
			
			expect(mockFicDataService.getFics.calls.count()).toEqual(1);
			
		});
		
	});
	
});