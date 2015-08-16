/* global inject */
/// <reference path="../../../typings/jasmine/jasmine.d.ts"/>
'use strict';

describe('codex.filters module', function() {
	
	beforeEach(module('codex.filters'));
	
	var $filter;

	beforeEach(inject(function(_$filter_){
	    $filter = _$filter_;
	}));
	
	describe('author list filter', function() {
		
		var authorList = null;
		
		beforeEach(function() {
			authorList = $filter('authorList');
		});
		
		it('returns undefined when given undefined', function() {
			expect(authorList(undefined)).toBeUndefined();	
		});
		
		it('returns Unknown when given null', function() {
			expect(authorList(null)).toEqual('Unknown');
		});
		
		it('returns Unknown when given zero authors', function() {
			expect(authorList([])).toEqual('Unknown');
		});
		
		it('returns the author when given one author', function() {
			var authors = [
				{ name: 'AuthorOne' }
			];
			expect(authorList(authors)).toEqual('AuthorOne');
		});
		
		it('returns a and b when given two authors', function() {
			var authors = [
				{ name: 'AuthorOne' },
				{ name: 'AuthorTwo' }
			];
			expect(authorList(authors)).toEqual('AuthorOne and AuthorTwo');
		});
		
		it('returns a, b, and c when given three authors', function() {
			var authors = [
				{ name: 'AuthorOne' },
				{ name: 'AuthorTwo' },
				{ name: 'AuthorThree' }
			];
			expect(authorList(authors)).toEqual('AuthorOne, AuthorTwo, and AuthorThree');
		});
		
		it('returns a, b, c, and d when given four authors', function() {
			var authors = [
				{ name: 'AuthorOne' },
				{ name: 'AuthorTwo' },
				{ name: 'AuthorThree' },
				{ name: 'AuthorFour' }
			];
			expect(authorList(authors)).toEqual('AuthorOne, AuthorTwo, AuthorThree, and AuthorFour');
		});
		
	});
	
});