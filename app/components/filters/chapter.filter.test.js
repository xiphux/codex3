/* global inject */
/// <reference path="../../../typings/jasmine/jasmine.d.ts"/>
'use strict';

describe('codex.filters module', function() {
	
	beforeEach(module('codex.filters'));
	
	var $filter;

	beforeEach(inject(function(_$filter_){
	    $filter = _$filter_;
	}));
	
	describe('chapter filter', function() {
		
		var chapter = null;
		
		beforeEach(function() {
			chapter = $filter('chapter');
		});
		
		it('should return empty if a null is passed', function() {
			expect(chapter(null)).toEqual('');
		});
		
		it('should return empty if an empty object is passed', function() {
			expect(chapter({})).toEqual('');
		});
		
		it('should return empty if there is no title or number', function() {
			var chapterData = {
				id: 1
			};
			expect(chapter(chapterData)).toEqual('');
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