/// <reference path="../../../typings/jasmine/jasmine.d.ts"/>
'use strict';

describe('codex.data module', function() {
	
	beforeEach(angular.mock.module('codex.data'));
	
	describe('genre resource service', function() {
		
		var mockGenreResourceService, $httpBackend;
	
	    beforeEach(function () {
	        angular.mock.inject(function ($injector) {
	            $httpBackend = $injector.get('$httpBackend');
	            mockGenreResourceService = $injector.get('genreResourceService');
	        });
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
				
				var result = mockGenreResourceService.getGenres();
				
				$httpBackend.flush();
				
				expect(result.length).toEqual(responseData.length);
				expect(result[0].id).toEqual(responseData[0].id);
				expect(result[0].name).toEqual(responseData[0].name);
				expect(result[1].id).toEqual(responseData[1].id);
				expect(result[1].name).toEqual(responseData[1].name);
				
			});
			
		});
		
	});
	
});