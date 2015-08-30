/// <reference path="../../../typings/jasmine/jasmine.d.ts"/>
'use strict';

describe('codex.data module', function() {
	
	beforeEach(angular.mock.module('codex.data'));
	
	describe('fic resource service', function() {
		
		var mockFicResourceService, $httpBackend;
	
	    beforeEach(function () {
	        angular.mock.inject(function ($injector) {
	            $httpBackend = $injector.get('$httpBackend');
	            mockFicResourceService = $injector.get('ficResourceService');
	        });
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
				
				var result = mockFicResourceService.getFics();
				
				$httpBackend.flush();
				
				verifyResult(result);
				
			});
			
			it('should request the api for all fics with a single genre filter', function() {
				
				$httpBackend.expectGET('api/fics?genre=2').respond(responseData);
				
				var result = mockFicResourceService.getFics({
					genres: [ 2 ]
				});
				
				$httpBackend.flush();
				
				verifyResult(result);
				
			});
			
			it('should request the api for all fics with multiple genre filters', function() {
				
				$httpBackend.expectGET('api/fics?genre%5B%5D=1&genre%5B%5D=3').respond(responseData);
				
				var result = mockFicResourceService.getFics({
					genres: [ 1, 3 ]
				});
				
				$httpBackend.flush();
				
				verifyResult(result);
				
			});
			
			it('should request the api for all fics with a single series filter', function() {
				
				$httpBackend.expectGET('api/fics?series=2').respond(responseData);
				
				var result = mockFicResourceService.getFics({
					series: [ 2 ]
				});
				
				$httpBackend.flush();
				
				verifyResult(result);
				
			});
			
			it('should request the api for all fics with multiple series filters', function() {
				
				$httpBackend.expectGET('api/fics?series%5B%5D=1&series%5B%5D=3').respond(responseData);
				
				var result = mockFicResourceService.getFics({
					series: [ 1, 3 ]
				});
				
				$httpBackend.flush();
				
				verifyResult(result);
				
			});
			
			it('should request the api for all fics with a single matchup filter', function() {
				
				$httpBackend.expectGET('api/fics?matchup=2').respond(responseData);
				
				var result = mockFicResourceService.getFics({
					matchups: [ 2 ]
				});
				
				$httpBackend.flush();
				
				verifyResult(result);
				
			});
			
			it('should request the api for all fics with multiple matchup filters', function() {
				
				$httpBackend.expectGET('api/fics?matchup%5B%5D=1&matchup%5B%5D=3').respond(responseData);
				
				var result = mockFicResourceService.getFics({
					matchups: [ 1, 3 ]
				});
				
				$httpBackend.flush();
				
				verifyResult(result);
				
			});
			
			it('should request the api for all fics with single genre, single matchup, and single series filters', function() {
				
				$httpBackend.expectGET('api/fics?genre=2&matchup=3&series=1').respond(responseData);
				
				var result = mockFicResourceService.getFics({
					genres: [ 2 ],
					matchups: [ 3 ],
					series: [ 1 ]
				});
				
				$httpBackend.flush();
				
				verifyResult(result);
				
			});
			
			it('should request the api for all fics with multiple genre, single matchup, and single series filters', function() {
				
				$httpBackend.expectGET('api/fics?genre%5B%5D=2&genre%5B%5D=4&matchup=3&series=1').respond(responseData);
				
				var result = mockFicResourceService.getFics({
					genres: [ 2, 4 ],
					matchups: [ 3 ],
					series: [ 1 ]
				});
				
				$httpBackend.flush();
				
				verifyResult(result);
				
			});
			
			it('should request the api for all fics with single genre, multiple matchup, and single series filters', function() {
				
				$httpBackend.expectGET('api/fics?genre=2&matchup%5B%5D=3&matchup%5B%5D=5&series=1').respond(responseData);
				
				var result = mockFicResourceService.getFics({
					genres: [ 2 ],
					matchups: [ 3, 5 ],
					series: [ 1 ]
				});
				
				$httpBackend.flush();
				
				verifyResult(result);
				
			});
			
			it('should request the api for all fics with single genre, single matchup, and multiple series filters', function() {
				
				$httpBackend.expectGET('api/fics?genre=2&matchup=3&series%5B%5D=1&series%5B%5D=6').respond(responseData);
				
				var result = mockFicResourceService.getFics({
					genres: [ 2 ],
					matchups: [ 3 ],
					series: [ 1, 6 ]
				});
				
				$httpBackend.flush();
				
				verifyResult(result);
				
			});
			
			it('should request the api for all fics with multiple genre, multiple matchup, and multiple series filters', function() {
				
				$httpBackend.expectGET('api/fics?genre%5B%5D=2&genre%5B%5D=4&matchup%5B%5D=3&matchup%5B%5D=5&series%5B%5D=1&series%5B%5D=6').respond(responseData);
				
				var result = mockFicResourceService.getFics({
					genres: [ 2, 4 ],
					matchups: [ 3, 5 ],
					series: [ 1, 6 ]
				});
				
				$httpBackend.flush();
				
				verifyResult(result);
				
			});
			
			it('should request the api for all fics with a single search term', function() {
				
				$httpBackend.expectGET('api/fics?search=keywordone').respond(responseData);
				
				var result = mockFicResourceService.getFics({
					search: [ 'keywordone' ]
				});
				
				$httpBackend.flush();
				
				verifyResult(result);
				
			});
			
			it('should request the api for all fics with two search terms', function() {
				
				$httpBackend.expectGET('api/fics?search%5B%5D=keywordone&search%5B%5D=keywordtwo').respond(responseData);
				
				var result = mockFicResourceService.getFics({
					search: [ 'keywordone', 'keywordtwo' ]
				});
				
				$httpBackend.flush();
				
				verifyResult(result);
				
			});
			
			it('should request the api for all fics with three search terms', function() {
				
				$httpBackend.expectGET('api/fics?search%5B%5D=keywordone&search%5B%5D=keywordtwo&search%5B%5D=keywordthree').respond(responseData);
				
				var result = mockFicResourceService.getFics({
					search: [ 'keywordone', 'keywordtwo', 'keywordthree' ]
				});
				
				$httpBackend.flush();
				
				verifyResult(result);
				
			});
			
			it('should request the api for all fics with a single search term and other filters', function() {
				
				$httpBackend.expectGET('api/fics?genre=1&matchup=1&search=keywordone').respond(responseData);
				
				var result = mockFicResourceService.getFics({
					search: [ 'keywordone' ],
					genres: [ 1 ],
					matchups: [ 1 ]
				});
				
				$httpBackend.flush();
				
				verifyResult(result);
				
			});
			
			it('should request the api for all fics with multiple search terms and other filters', function() {
				
				$httpBackend.expectGET('api/fics?genre%5B%5D=3&genre%5B%5D=4&search%5B%5D=keywordone&search%5B%5D=keywordtwo&search%5B%5D=keywordthree&series%5B%5D=1&series%5B%5D=2').respond(responseData);
				
				var result = mockFicResourceService.getFics({
					search: [ 'keywordone', 'keywordtwo', 'keywordthree' ],
					genres: [ 3, 4 ],
					series: [ 1, 2 ]
				});
				
				$httpBackend.flush();
				
				verifyResult(result);
				
			});
			
			
		});
		
		describe('getFic', function() {
			
			it('should return null if fic id is null', function() {
				
				expect(mockFicResourceService.getFic(null)).toBeNull();
				
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
				
				var result = mockFicResourceService.getFic(12);
				
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
	
});