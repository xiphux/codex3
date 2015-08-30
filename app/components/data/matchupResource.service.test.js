/// <reference path="../../../typings/jasmine/jasmine.d.ts"/>
'use strict';

describe('codex.data module', function() {
	
	beforeEach(angular.mock.module('codex.data'));
	
	describe('matchup resource service', function() {
		
		var mockMatchupResourceService, $httpBackend;
	
	    beforeEach(function () {
	        angular.mock.inject(function ($injector) {
	            $httpBackend = $injector.get('$httpBackend');
	            mockMatchupResourceService = $injector.get('matchupResourceService');
	        });
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
				
				var result = mockMatchupResourceService.getMatchups();
				
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