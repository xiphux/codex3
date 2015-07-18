'use strict';

describe('codex.data module', function() {
	
	beforeEach(module('codex.data'));
	
	describe('fic data service', function() {
		
		var mockFicDataService, $httpBackend;
	
	    beforeEach(function () {
	        angular.mock.inject(function ($injector) {
	            $httpBackend = $injector.get('$httpBackend');
	            mockFicDataService = $injector.get('ficDataService');
	        })
	    });
		
		describe('getFics', function() {
			
			var responseData = [
				{
					id: 1,
					title: 'Fic One',
					authors: [
						{
							id: 1,
							name: 'Author One'
						},
						{
							id: 2,
							name: 'Author Two'
						}
					],
					fic_genres: [
						{
							fic_id: 1,
							genre_id: 2
						}
					],
					fic_series: [
						{
							fic_id: 1,
							series_id: 1
						},
						{
							fic_id: 1,
							series_id: 3,
						}
					],
					fic_matchups: [
						{
							fic_id: 1,
							matchup_id: 2
						}
					]
				},
				{
					id: 2,
					title: 'Fic Two',
					authors: [
						{
							id: 3,
							name: 'Author Three'
						}
					],
					fic_genres: [
						{
							fic_id: 1,
							genre_id: 2
						},
						{
							fic_id: 1,
							genre_id: 3
						}
					],
					fic_series: [
						{
							fic_id: 1,
							series_id: 3,
						}
					],
					fic_matchups: [
						{
							fic_id: 1,
							matchup_id: 3
						},
						{
							fic_id: 1,
							matchup_id: 4
						}
					]
				}
			];
			
			var verifyResult = function(result) {
				expect(result.length).toEqual(responseData.length);
				expect(result[0].id).toEqual(responseData[0].id);
				expect(result[0].title).toEqual(responseData[0].title);
				expect(result[0].authors).toEqual(responseData[0].authors);
				expect(result[0].fic_genres).toEqual(responseData[0].fic_genres);
				expect(result[0].fic_series).toEqual(responseData[0].fic_series);
				expect(result[0].fic_matchups).toEqual(responseData[0].fic_matchups);
				expect(result[1].id).toEqual(responseData[1].id);
				expect(result[1].title).toEqual(responseData[1].title);
				expect(result[1].authors).toEqual(responseData[1].authors);
				expect(result[1].fic_genres).toEqual(responseData[1].fic_genres);
				expect(result[1].fic_series).toEqual(responseData[1].fic_series);
				expect(result[1].fic_matchups).toEqual(responseData[1].fic_matchups);
			};
			
			it('should request the api for all fics without filters', function() {
				
				$httpBackend.expectGET('api/fics').respond(responseData);
				
				var result = mockFicDataService.getFics();
				
				$httpBackend.flush();
				
				verifyResult(result);
				
			});
			
			it('should request the api for all fics with a single genre filter', function() {
				
				$httpBackend.expectGET('api/fics?genre=2').respond(responseData);
				
				var result = mockFicDataService.getFics({
					genres: [ 2 ]
				});
				
				$httpBackend.flush();
				
				verifyResult(result);
				
			});
			
			it('should request the api for all fics with multiple genre filters', function() {
				
				$httpBackend.expectGET('api/fics?genre%5B%5D=1&genre%5B%5D=3').respond(responseData);
				
				var result = mockFicDataService.getFics({
					genres: [ 1, 3 ]
				});
				
				$httpBackend.flush();
				
				verifyResult(result);
				
			});
			
			it('should request the api for all fics with a single series filter', function() {
				
				$httpBackend.expectGET('api/fics?series=2').respond(responseData);
				
				var result = mockFicDataService.getFics({
					series: [ 2 ]
				});
				
				$httpBackend.flush();
				
				verifyResult(result);
				
			});
			
			it('should request the api for all fics with multiple series filters', function() {
				
				$httpBackend.expectGET('api/fics?series%5B%5D=1&series%5B%5D=3').respond(responseData);
				
				var result = mockFicDataService.getFics({
					series: [ 1, 3 ]
				});
				
				$httpBackend.flush();
				
				verifyResult(result);
				
			});
			
			it('should request the api for all fics with a single matchup filter', function() {
				
				$httpBackend.expectGET('api/fics?matchup=2').respond(responseData);
				
				var result = mockFicDataService.getFics({
					matchups: [ 2 ]
				});
				
				$httpBackend.flush();
				
				verifyResult(result);
				
			});
			
			it('should request the api for all fics with multiple matchup filters', function() {
				
				$httpBackend.expectGET('api/fics?matchup%5B%5D=1&matchup%5B%5D=3').respond(responseData);
				
				var result = mockFicDataService.getFics({
					matchups: [ 1, 3 ]
				});
				
				$httpBackend.flush();
				
				verifyResult(result);
				
			});
			
			it('should request the api for all fics with single genre, single matchup, and single series filters', function() {
				
				$httpBackend.expectGET('api/fics?genre=2&matchup=3&series=1').respond(responseData);
				
				var result = mockFicDataService.getFics({
					genres: [ 2 ],
					matchups: [ 3 ],
					series: [ 1 ]
				});
				
				$httpBackend.flush();
				
				verifyResult(result);
				
			});
			
			it('should request the api for all fics with multiple genre, single matchup, and single series filters', function() {
				
				$httpBackend.expectGET('api/fics?genre%5B%5D=2&genre%5B%5D=4&matchup=3&series=1').respond(responseData);
				
				var result = mockFicDataService.getFics({
					genres: [ 2, 4 ],
					matchups: [ 3 ],
					series: [ 1 ]
				});
				
				$httpBackend.flush();
				
				verifyResult(result);
				
			});
			
			it('should request the api for all fics with single genre, multiple matchup, and single series filters', function() {
				
				$httpBackend.expectGET('api/fics?genre=2&matchup%5B%5D=3&matchup%5B%5D=5&series=1').respond(responseData);
				
				var result = mockFicDataService.getFics({
					genres: [ 2 ],
					matchups: [ 3, 5 ],
					series: [ 1 ]
				});
				
				$httpBackend.flush();
				
				verifyResult(result);
				
			});
			
			it('should request the api for all fics with single genre, single matchup, and multiple series filters', function() {
				
				$httpBackend.expectGET('api/fics?genre=2&matchup=3&series%5B%5D=1&series%5B%5D=6').respond(responseData);
				
				var result = mockFicDataService.getFics({
					genres: [ 2 ],
					matchups: [ 3 ],
					series: [ 1, 6 ]
				});
				
				$httpBackend.flush();
				
				verifyResult(result);
				
			});
			
			it('should request the api for all fics with multiple genre, multiple matchup, and multiple series filters', function() {
				
				$httpBackend.expectGET('api/fics?genre%5B%5D=2&genre%5B%5D=4&matchup%5B%5D=3&matchup%5B%5D=5&series%5B%5D=1&series%5B%5D=6').respond(responseData);
				
				var result = mockFicDataService.getFics({
					genres: [ 2, 4 ],
					matchups: [ 3, 5 ],
					series: [ 1, 6 ]
				});
				
				$httpBackend.flush();
				
				verifyResult(result);
				
			});
			
			
		});
		
		describe('getFic', function() {
			
			it('should return null if fic id is null', function() {
				
				expect(mockFicDataService.getFic(null)).toBeNull();
				
			});
			
			it('should request the api for the given fic', function() {
				
				var responseData = {
					id: 12,
					title: 'Fic One',
					authors: [
						{
							id: 1,
							name: 'Author One'
						},
						{
							id: 2,
							name: 'Author Two'
						}
					],
					genres: [
						{
							id: 1,
							name: 'GenreOne'
						},
						{
							id: 2,
							name: 'GenreTwo'
						}
					],
					series: [
						{
							id: 1,
							title: 'SeriesOne',
						},
						{
							id: 2,
							title: 'SeriesTwo'
						}
					],
					matchups: [
						{
							id: 1,
							characters: [
								{
									id: 1,
									name: 'CharacterOne'
								},
								{
									id: 2,
									name: 'CharacterTwo'
								}
							]
						}
					]
				};
				
				$httpBackend.expectGET('api/fics/12').respond(responseData);
				
				var result = mockFicDataService.getFic(12);
				
				$httpBackend.flush();
				
				expect(result.id).toEqual(responseData.id);
				expect(result.title).toEqual(responseData.title);
				expect(result.authors).toEqual(responseData.authors);
				expect(result.genres).toEqual(responseData.genres);
				expect(result.series).toEqual(responseData.series);
				expect(result.matchups).toEqual(responseData.matchups);
				
			});
			
		});
		
	});
	
	describe('chapter data service', function() {
		
		var mockChapterDataService, $httpBackend;
	
	    beforeEach(function () {
	        angular.mock.inject(function ($injector) {
	            $httpBackend = $injector.get('$httpBackend');
	            mockChapterDataService = $injector.get('chapterDataService');
	        })
	    });
		
		describe('getChapters', function() {
			
			it('should return null if fic id is null', function() {
				expect(mockChapterDataService.getChapters(null)).toBeNull();
			});
			
			it('should request the chapters api for a given fic', function() {
				
				var responseData = [
					{
						id: 1,
						number: 1,
						title: 'Part One',
						fic_id: 12
					},
					{
						id: 2,
						number: 2,
						title: 'Part Two',
						fic_id: 12
					},
					{
						id: 3,
						number: 3,
						title: 'Part Three',
						fic_id: 12
					}
				];
				
				$httpBackend.expectGET('api/fics/12/chapters').respond(responseData);
				
				var result = mockChapterDataService.getChapters(12);
				
				$httpBackend.flush();
				
				expect(result.length).toEqual(responseData.length);
				
				expect(result[0].id).toEqual(responseData[0].id);
				expect(result[0].number).toEqual(responseData[0].number);
				expect(result[0].title).toEqual(responseData[0].title);
				expect(result[0].fic_id).toEqual(responseData[0].fic_id);
				expect(result[1].id).toEqual(responseData[1].id);
				expect(result[1].number).toEqual(responseData[1].number);
				expect(result[1].title).toEqual(responseData[1].title);
				expect(result[1].fic_id).toEqual(responseData[1].fic_id);
				expect(result[2].id).toEqual(responseData[2].id);
				expect(result[2].number).toEqual(responseData[2].number);
				expect(result[2].title).toEqual(responseData[2].title);
				expect(result[2].fic_id).toEqual(responseData[2].fic_id);
				
			});
			
		});
		
		describe('getChapter', function() {
			
			it('should return null if fic id is null', function() {
				expect(mockChapterDataService.getChapter(null, 1)).toBeNull();
			});
			
			it('should return null if chapter number is null', function() {
				expect(mockChapterDataService.getChapter(1, null)).toBeNull();
			});
			
			it('should request the api for the given fic and chapter', function() {
				
				var responseData = {
					id: 1,
					number: 3,
					title: 'Chapter Three',
					data: 'Chapter Three Text',
					wrapped: true,
					no_paragraph_spacing: false,
					double_line_breaks: true,
					fic_id: 2
				};
				
				$httpBackend.expectGET('api/fics/12/chapters/3').respond(responseData);
				
				var result = mockChapterDataService.getChapter(12, 3);
				
				$httpBackend.flush();
				
				expect(result.id).toEqual(responseData.id);
				expect(result.number).toEqual(responseData.number);
				expect(result.title).toEqual(responseData.title);
				expect(result.data).toEqual(responseData.data);
				expect(result.wrapped).toEqual(responseData.wrapped);
				expect(result.no_paragraph_spacing).toEqual(responseData.no_paragraph_spacing);
				expect(result.double_line_breaks).toEqual(responseData.double_line_breaks);
				expect(result.fic_id).toEqual(responseData.fic_id);
				
			});
			
		});
		
	});
	
	describe('series data service', function() {
		
		var mockSeriesDataService, $httpBackend;
	
	    beforeEach(function () {
	        angular.mock.inject(function ($injector) {
	            $httpBackend = $injector.get('$httpBackend');
	            mockSeriesDataService = $injector.get('seriesDataService');
	        })
	    });
		
		describe('getSeries', function() {
			
			it('should request the api for all series', function() {
				
				var responseData = [
					{
						id: 1,
						title: 'SeriesOne'
					},
					{
						id: 2,
						title: 'SeriesTwo'
					}
				];
				
				$httpBackend.expectGET('api/series').respond(responseData);
				
				var result = mockSeriesDataService.getSeries();
				
				$httpBackend.flush();
				
				expect(result.length).toEqual(responseData.length);
				expect(result[0].id).toEqual(responseData[0].id);
				expect(result[0].title).toEqual(responseData[0].title);
				expect(result[1].id).toEqual(responseData[1].id);
				expect(result[1].title).toEqual(responseData[1].title);
				
			});
			
		});
		
	});
	
	describe('genre data service', function() {
		
		var mockGenreDataService, $httpBackend;
	
	    beforeEach(function () {
	        angular.mock.inject(function ($injector) {
	            $httpBackend = $injector.get('$httpBackend');
	            mockGenreDataService = $injector.get('genreDataService');
	        })
	    });
		
		describe('getGenres', function() {
			
			it('should request the api for all genres', function() {
				
				var responseData = [
					{
						id: 1,
						name: 'GenreOne'
					},
					{
						id: 2,
						name: 'GenreTwo'
					}
				];
				
				$httpBackend.expectGET('api/genres').respond(responseData);
				
				var result = mockGenreDataService.getGenres();
				
				$httpBackend.flush();
				
				expect(result.length).toEqual(responseData.length);
				expect(result[0].id).toEqual(responseData[0].id);
				expect(result[0].name).toEqual(responseData[0].name);
				expect(result[1].id).toEqual(responseData[1].id);
				expect(result[1].name).toEqual(responseData[1].name);
				
			});
			
		});
		
	});
	
	describe('matchup data service', function() {
		
		var mockMatchupDataService, $httpBackend;
	
	    beforeEach(function () {
	        angular.mock.inject(function ($injector) {
	            $httpBackend = $injector.get('$httpBackend');
	            mockMatchupDataService = $injector.get('matchupDataService');
	        })
	    });
		
		describe('getMatchups', function() {
			
			it('should request the api for all matchups', function() {
				
				var responseData = [
						{
							id: 1,
							characters: [
								{
									id: 1,
									name: 'CharacterOne',
									series: {
										id: 1,
										title: 'SeriesOne'
									}
								},
								{
									id: 2,
									name: 'CharacterTwo',
									series: {
										id: 1,
										title: 'SeriesOne'
									}
								}
							]
						},
						{
							id: 2,
							characters: [
								{
									id: 3,
									name: 'CharacterThree',
									series: {
										id: 1,
										title: 'SeriesOne'
									}
								},
								{
									id: 4,
									name: 'CharacterFour',
									series: {
										id: 2,
										title: 'SeriesTwo'
									}
								}
							]
						}
				];
				
				$httpBackend.expectGET('api/matchups').respond(responseData);
				
				var result = mockMatchupDataService.getMatchups();
				
				$httpBackend.flush();
				
				expect(result.length).toEqual(responseData.length);
				expect(result[0].id).toEqual(responseData[0].id);
				expect(result[0].characters).toEqual(responseData[0].characters);
				expect(result[1].id).toEqual(responseData[1].id);
				expect(result[1].characters).toEqual(responseData[1].characters);
				
			});
			
		});
		
	});
	
});