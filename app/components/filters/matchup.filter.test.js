/* global inject */
/// <reference path="../../../typings/jasmine/jasmine.d.ts"/>
'use strict';

describe('codex.filters module', function() {
	
	beforeEach(module('codex.filters'));
	
	var $filter;

	beforeEach(inject(function(_$filter_){
	    $filter = _$filter_;
	}));
	
	describe('matchup filter', function() {
		
		var matchup = null;
		
		beforeEach(function() {
			matchup = $filter('matchup');
		});
		
		it('returns empty when given null', function() {
			expect(matchup(null)).toEqual('');
		});
		
		it('returns empty when given a matchup without a character list', function() {
			var matchupData = {};
			expect(matchup(matchupData)).toEqual('');
		});
		
		it('returns empty when given a matchup with a null character list', function() {
			var matchupData = {
				characters: null
			};
			expect(matchup(matchupData)).toEqual('');
		});
		
		it('returns empty when given a matchup with an empty character list', function() {
			var matchupData = {
				characters: []
			};
			expect(matchup(matchupData)).toEqual('');
		});
		
		it('returns one character when given a single character matchup', function() {
			var matchupData = {
				characters: [
					{
						name: 'CharacterOne',
						series: {
							id: 1,
							title: 'SeriesOne'
						}
					}
				]
			};
			expect(matchup(matchupData)).toEqual('CharacterOne');
		});
		
		it('returns a + b when given two characters from the same series', function() {
			var matchupData = {
				characters: [
					{
						name: 'CharacterOne',
						series: {
							id: 1,
							title: 'SeriesOne'
						}
					},
					{
						name: 'CharacterTwo',
						series: {
							id: 1,
							title: 'SeriesOne'
						}
					}
				]
			};
			expect(matchup(matchupData)).toEqual('CharacterOne + CharacterTwo');
		});
		
		it ('returns a + b + c when given three characters from the same series', function() {
			var matchupData = {
				characters: [
					{
						name: 'CharacterOne',
						series: {
							id: 1,
							title: 'SeriesOne'
						}
					},
					{
						name: 'CharacterTwo',
						series: {
							id: 1,
							title: 'SeriesOne'
						}
					},
					{
						name: 'CharacterThree',
						series: {
							id: 1,
							title: 'SeriesOne'
						}
					}
				]
			};
			expect(matchup(matchupData)).toEqual('CharacterOne + CharacterTwo + CharacterThree');
		});
		
		it('returns a (a) + b (b) when given two characters from crossover series', function() {
			var matchupData = {
				characters: [
					{
						name: 'CharacterOne',
						series: {
							id: 1,
							title: 'SeriesOne'
						}
					},
					{
						name: 'CharacterTwo',
						series: {
							id: 2,
							title: 'SeriesTwo'
						}
					}
				]
			};
			expect(matchup(matchupData)).toEqual('CharacterOne (SeriesOne) + CharacterTwo (SeriesTwo)');
		});
		
		it('returns a (a) + b (b) + c (c) when given three characters from three different series', function() {
			var matchupData = {
				characters: [
					{
						name: 'CharacterOne',
						series: {
							id: 1,
							title: 'SeriesOne'
						}
					},
					{
						name: 'CharacterTwo',
						series: {
							id: 2,
							title: 'SeriesTwo'
						}
					},
					{
						name: 'CharacterThree',
						series: {
							id: 3,
							title: 'SeriesThree'
						}
					}
				]
			};
			expect(matchup(matchupData)).toEqual('CharacterOne (SeriesOne) + CharacterTwo (SeriesTwo) + CharacterThree (SeriesThree)');
		});
		
		it('returns a (a) + b (b) + c (c) when the first character is a crossover to the other two', function() {
			var matchupData = {
				characters: [
					{
						name: 'CharacterOne',
						series: {
							id: 2,
							title: 'SeriesTwo'
						}
					},
					{
						name: 'CharacterTwo',
						series: {
							id: 1,
							title: 'SeriesOne'
						}
					},
					{
						name: 'CharacterThree',
						series: {
							id: 1,
							title: 'SeriesOne'
						}
					}
				]
			};
			expect(matchup(matchupData)).toEqual('CharacterOne (SeriesTwo) + CharacterTwo (SeriesOne) + CharacterThree (SeriesOne)');
		});
		
		it('returns a (a) + b (b) + c (c) when the second character is a crossover to the other two', function() {
			var matchupData = {
				characters: [
					{
						name: 'CharacterOne',
						series: {
							id: 1,
							title: 'SeriesOne'
						}
					},
					{
						name: 'CharacterTwo',
						series: {
							id: 2,
							title: 'SeriesTwo'
						}
					},
					{
						name: 'CharacterThree',
						series: {
							id: 1,
							title: 'SeriesOne'
						}
					}
				]
			};
			expect(matchup(matchupData)).toEqual('CharacterOne (SeriesOne) + CharacterTwo (SeriesTwo) + CharacterThree (SeriesOne)');
		});
		
		it('returns a (a) + b (b) + c (c) when the third character is a crossover to the other two', function() {
			var matchupData = {
				characters: [
					{
						name: 'CharacterOne',
						series: {
							id: 1,
							title: 'SeriesOne'
						}
					},
					{
						name: 'CharacterTwo',
						series: {
							id: 1,
							title: 'SeriesOne'
						}
					},
					{
						name: 'CharacterThree',
						series: {
							id: 3,
							title: 'SeriesTwo'
						}
					}
				]
			};
			expect(matchup(matchupData)).toEqual('CharacterOne (SeriesOne) + CharacterTwo (SeriesOne) + CharacterThree (SeriesTwo)');
		});
	});
	
});