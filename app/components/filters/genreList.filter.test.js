/* global inject */
/// <reference path="../../../typings/jasmine/jasmine.d.ts"/>
'use strict';

describe('codex.filters module', function() {
	
	beforeEach(module('codex.filters'));
	
	var $filter;

	beforeEach(inject(function(_$filter_){
	    $filter = _$filter_;
	}));
	
	describe('genre list filter', function() {
		
		var genreList = null;
		
		beforeEach(function() {
			genreList = $filter('genreList');
		});
		
		it('returns empty when given null', function() {
			expect(genreList(null)).toEqual('');
		});
		
		it('returns empty when given an empty list', function() {
			expect(genreList([])).toEqual('');
		});
		
		it('returns the genre when given one genre', function() {
			var genres = [
				{ name: 'GenreOne' }
			];
			expect(genreList(genres)).toEqual('GenreOne');
		});
		
		it('returns a, b when given two genres', function() {
			var genres = [
				{ name: 'GenreOne' },
				{ name: 'GenreTwo' }
			];
			expect(genreList(genres)).toEqual('GenreOne, GenreTwo');
		});
		
		it('returns a, b, c when given three genres', function() {
			var genres = [
				{ name: 'GenreOne' },
				{ name: 'GenreTwo' },
				{ name: 'GenreThree' }
			];
			expect(genreList(genres)).toEqual('GenreOne, GenreTwo, GenreThree');
		});
		
		it('returns a, b, c, d when given four genres', function() {
			var genres = [
				{ name: 'GenreOne' },
				{ name: 'GenreTwo' },
				{ name: 'GenreThree' },
				{ name: 'GenreFour' }
			];
			expect(genreList(genres)).toEqual('GenreOne, GenreTwo, GenreThree, GenreFour');
		});
		
	});
	
});