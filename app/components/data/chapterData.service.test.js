/// <reference path="../../../typings/jasmine/jasmine.d.ts"/>
'use strict';

describe('codex.data module', function() {
	
	beforeEach(module('codex.data'));
	
	describe('chapter data service', function() {
		
		var mockChapterDataService, $httpBackend;
	
	    beforeEach(function () {
	        angular.mock.inject(function ($injector) {
	            $httpBackend = $injector.get('$httpBackend');
	            mockChapterDataService = $injector.get('chapterDataService');
	        });
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
	
});