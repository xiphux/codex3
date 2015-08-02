/* global inject */
/// <reference path="../../../typings/jasmine/jasmine.d.ts"/>
'use strict';

describe('codex.filters module', function() {
	
	beforeEach(module('codex.filters'));
	
	var $filter;

	beforeEach(inject(function(_$filter_){
	    $filter = _$filter_;
	}));
	
	describe('matchup list filter', function() {
		
		var matchupList = null;
		
		beforeEach(function() {
			matchupList = $filter('matchupList');
		});
		
		it('returns empty when given null', function() {
			expect(matchupList(null)).toEqual('');
		});
		
		it('returns empty when given an empty list', function() {
			expect(matchupList([])).toEqual('');
		});
		
		it('returns the matchup when given one matchup', function() {
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
			var matchups = [
				matchupData
			];
			expect(matchupList(matchups)).toEqual('CharacterOne + CharacterTwo');
		});
		
		it('returns the crossover matchup when given one crossover matchup', function() {
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
			var matchups = [
				matchupData
			];
			expect(matchupList(matchups)).toEqual('CharacterOne (SeriesOne) + CharacterTwo (SeriesTwo)');
		});
		
		it('returns a, b when given two matchups', function() {
			var matchupOne = {
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
			var matchupTwo = {
				characters: [
					{
						name: 'CharacterThree',
						series: {
							id: 1,
							title: 'SeriesOne'
						}
					},
					{
						name: 'CharacterFour',
						series: {
							id: 1,
							title: 'SeriesOne'
						}
					}
				]
			};
			var matchups = [
				matchupOne,
				matchupTwo
			];
			expect(matchupList(matchups)).toEqual('CharacterOne + CharacterTwo, CharacterThree + CharacterFour');
		});
		
		it('returns a, b when given two crossover matchups', function() {
			var matchupOne = {
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
			var matchupTwo = {
				characters: [
					{
						name: 'CharacterThree',
						series: {
							id: 2,
							title: 'SeriesTwo'
						}
					},
					{
						name: 'CharacterFour',
						series: {
							id: 1,
							title: 'SeriesOne'
						}
					}
				]
			};
			var matchups = [
				matchupOne,
				matchupTwo
			];
			expect(matchupList(matchups)).toEqual('CharacterOne (SeriesOne) + CharacterTwo (SeriesTwo), CharacterThree (SeriesTwo) + CharacterFour (SeriesOne)');
		});
		
		it('returns a, b, when given the first crossover matchup', function() {
			var matchupOne = {
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
			var matchupTwo = {
				characters: [
					{
						name: 'CharacterThree',
						series: {
							id: 1,
							title: 'SeriesOne'
						}
					},
					{
						name: 'CharacterFour',
						series: {
							id: 1,
							title: 'SeriesOne'
						}
					}
				]
			};
			var matchups = [
				matchupOne,
				matchupTwo
			];
			expect(matchupList(matchups)).toEqual('CharacterOne (SeriesOne) + CharacterTwo (SeriesTwo), CharacterThree + CharacterFour');
		});
		
		it('returns a, b when given the second crossover matchup', function() {
			var matchupOne = {
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
			var matchupTwo = {
				characters: [
					{
						name: 'CharacterThree',
						series: {
							id: 2,
							title: 'SeriesTwo'
						}
					},
					{
						name: 'CharacterFour',
						series: {
							id: 1,
							title: 'SeriesOne'
						}
					}
				]
			};
			var matchups = [
				matchupOne,
				matchupTwo
			];
			expect(matchupList(matchups)).toEqual('CharacterOne + CharacterTwo, CharacterThree (SeriesTwo) + CharacterFour (SeriesOne)');
		});
		
		it('returns a, b, c when given three matchups', function() {
			var matchupOne = {
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
			var matchupTwo = {
				characters: [
					{
						name: 'CharacterThree',
						series: {
							id: 1,
							title: 'SeriesOne'
						}
					},
					{
						name: 'CharacterFour',
						series: {
							id: 1,
							title: 'SeriesOne'
						}
					}
				]
			};
			var matchupThree = {
				characters: [
					{
						name: 'CharacterFive',
						series: {
							id: 1,
							title: 'SeriesOne'
						}
					},
					{
						name: 'CharacterSix',
						series: {
							id: 1,
							title: 'SeriesOne'
						}
					}
				]
			};
			var matchups = [
				matchupOne,
				matchupTwo,
				matchupThree
			];
			expect(matchupList(matchups)).toEqual('CharacterOne + CharacterTwo, CharacterThree + CharacterFour, CharacterFive + CharacterSix');
		});
		
		it('returns a, b, c when given three crossover matchups', function() {
			var matchupOne = {
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
			var matchupTwo = {
				characters: [
					{
						name: 'CharacterThree',
						series: {
							id: 1,
							title: 'SeriesOne'
						}
					},
					{
						name: 'CharacterFour',
						series: {
							id: 3,
							title: 'SeriesThree'
						}
					}
				]
			};
			var matchupThree = {
				characters: [
					{
						name: 'CharacterFive',
						series: {
							id: 2,
							title: 'SeriesTwo'
						}
					},
					{
						name: 'CharacterSix',
						series: {
							id: 3,
							title: 'SeriesThree'
						}
					}
				]
			};
			var matchups = [
				matchupOne,
				matchupTwo,
				matchupThree
			];
			expect(matchupList(matchups)).toEqual('CharacterOne (SeriesOne) + CharacterTwo (SeriesTwo), CharacterThree (SeriesOne) + CharacterFour (SeriesThree), CharacterFive (SeriesTwo) + CharacterSix (SeriesThree)');
		});
		
		it('returns a, b, c when given the first crossover matchup', function() {
			var matchupOne = {
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
							id: 3,
							title: 'SeriesThree'
						}
					}
				]
			};
			var matchupTwo = {
				characters: [
					{
						name: 'CharacterThree',
						series: {
							id: 1,
							title: 'SeriesOne'
						}
					},
					{
						name: 'CharacterFour',
						series: {
							id: 1,
							title: 'SeriesOne'
						}
					}
				]
			};
			var matchupThree = {
				characters: [
					{
						name: 'CharacterFive',
						series: {
							id: 1,
							title: 'SeriesOne'
						}
					},
					{
						name: 'CharacterSix',
						series: {
							id: 1,
							title: 'SeriesOne'
						}
					}
				]
			};
			var matchups = [
				matchupOne,
				matchupTwo,
				matchupThree
			];
			expect(matchupList(matchups)).toEqual('CharacterOne (SeriesTwo) + CharacterTwo (SeriesThree), CharacterThree + CharacterFour, CharacterFive + CharacterSix');
		});
		
		it('returns a, b, c when given the second crossover matchup', function() {
			var matchupOne = {
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
			var matchupTwo = {
				characters: [
					{
						name: 'CharacterThree',
						series: {
							id: 3,
							title: 'SeriesThree'
						}
					},
					{
						name: 'CharacterFour',
						series: {
							id: 1,
							title: 'SeriesOne'
						}
					}
				]
			};
			var matchupThree = {
				characters: [
					{
						name: 'CharacterFive',
						series: {
							id: 1,
							title: 'SeriesOne'
						}
					},
					{
						name: 'CharacterSix',
						series: {
							id: 1,
							title: 'SeriesOne'
						}
					}
				]
			};
			var matchups = [
				matchupOne,
				matchupTwo,
				matchupThree
			];
			expect(matchupList(matchups)).toEqual('CharacterOne + CharacterTwo, CharacterThree (SeriesThree) + CharacterFour (SeriesOne), CharacterFive + CharacterSix');
		});
		
		it('returns a, b, c when given the third crossover matchup', function() {
			var matchupOne = {
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
			var matchupTwo = {
				characters: [
					{
						name: 'CharacterThree',
						series: {
							id: 1,
							title: 'SeriesOne'
						}
					},
					{
						name: 'CharacterFour',
						series: {
							id: 1,
							title: 'SeriesOne'
						}
					}
				]
			};
			var matchupThree = {
				characters: [
					{
						name: 'CharacterFive',
						series: {
							id: 1,
							title: 'SeriesOne'
						}
					},
					{
						name: 'CharacterSix',
						series: {
							id: 2,
							title: 'SeriesTwo'
						}
					}
				]
			};
			var matchups = [
				matchupOne,
				matchupTwo,
				matchupThree
			];
			expect(matchupList(matchups)).toEqual('CharacterOne + CharacterTwo, CharacterThree + CharacterFour, CharacterFive (SeriesOne) + CharacterSix (SeriesTwo)');
		});
	});
	
});