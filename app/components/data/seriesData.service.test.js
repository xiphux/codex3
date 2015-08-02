/// <reference path="../../../typings/jasmine/jasmine.d.ts"/>
'use strict';

describe('codex.data module', function() {
	
	beforeEach(module('codex.data'));
	
	describe('series data service', function() {
		
		var mockSeriesDataService, $httpBackend;
	
	    beforeEach(function () {
	        angular.mock.inject(function ($injector) {
	            $httpBackend = $injector.get('$httpBackend');
	            mockSeriesDataService = $injector.get('seriesDataService');
	        });
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
	
});