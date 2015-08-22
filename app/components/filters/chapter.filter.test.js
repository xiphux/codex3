/* global inject */
/// <reference path="../../../typings/jasmine/jasmine.d.ts"/>
'use strict';

describe('codex.filters module', function() {
	
	beforeEach(angular.mock.module('codex.filters'));
	
	var $filter;

	beforeEach(inject(function(_$filter_){
	    $filter = _$filter_;
	}));
	
	describe('chapter filter', function() {
		
		var chapter = null;
		
		beforeEach(function() {
			chapter = $filter('chapter');
		});
		
		it('should return undefined if given undefined', function() {
			expect(chapter(undefined)).toBeUndefined();
		});
		
		it('should return undefined if a null is passed', function() {
			expect(chapter(null)).toBeUndefined();
		});
		
		it('should return undefined if an empty object is passed', function() {
			expect(chapter({})).toBeUndefined();
		});
		
		it('should return undefined if there is no title or number', function() {
			var chapterData = {
				id: 1
			};
			expect(chapter(chapterData)).toBeUndefined();
		});
		
		it('should return the title if the chapter has a title', function() {
			var chapterData = {
				id: 1,
				title: 'Chapter Title',
				number: 2
			};
			expect(chapter(chapterData)).toEqual('Chapter Title');
		});
		
		it('should return an enumerated chapter if the chapter does not have a title', function() {
			var chapterData = {
				id: 1,
				number: 2
			};
			expect(chapter(chapterData)).toEqual('Chapter 2');
		});
		
		it('should return an enumerated chapter if the chapter has a null title', function() {
			var chapterData = {
				id: 1,
				title: null,
				number: 2
			};
			expect(chapter(chapterData)).toEqual('Chapter 2');
		});
		
		it('should return an enumerated chapter if the chapter has an empty title', function() {
			var chapterData = {
				id: 1,
				title: '',
				number: 2
			};
			expect(chapter(chapterData)).toEqual('Chapter 2');
		});
		
	});
	
});