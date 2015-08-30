/// <reference path="../../../typings/jasmine/jasmine.d.ts"/>
'use strict';

describe('codex.data module', function() {
	
	beforeEach(angular.mock.module('codex.data'));
	
	describe('series resource service', function() {
		
		var mockSeriesResourceService, $httpBackend;
	
	    beforeEach(function () {
	        angular.mock.inject(function ($injector) {
	            $httpBackend = $injector.get('$httpBackend');
	            mockSeriesResourceService = $injector.get('seriesResourceService');
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
				
				var result = mockSeriesResourceService.getSeries();
				
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