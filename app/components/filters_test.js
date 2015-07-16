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
			]
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
	
	describe('series list filter', function() {
		
		var seriesList = null;
		
		beforeEach(function() {
			seriesList = $filter('seriesList');
		});
		
		
		it('returns empty when given null', function() {
			expect(seriesList(null)).toEqual('');
		});
		
		it('returns empty when given an empty list', function() {
			expect(seriesList([])).toEqual('');
		});
		
		it('returns the series when given one series', function() {
			var series = [
				{ title: 'SeriesOne' }
			];
			expect(seriesList(series)).toEqual('SeriesOne');
		});
		
		it('returns a, b when given two series', function() {
			var series = [
				{ title: 'SeriesOne' },
				{ title: 'SeriesTwo' }
			];
			expect(seriesList(series)).toEqual('SeriesOne, SeriesTwo');
		});
		
		it('returns a, b, c when given three series', function() {
			var series = [
				{ title: 'SeriesOne' },
				{ title: 'SeriesTwo' },
				{ title: 'SeriesThree' }
			];
			expect(seriesList(series)).toEqual('SeriesOne, SeriesTwo, SeriesThree');
		});
		
		it('returns a, b, c, d when given four series', function() {
			var series = [
				{ title: 'SeriesOne' },
				{ title: 'SeriesTwo' },
				{ title: 'SeriesThree' },
				{ title: 'SeriesFour' }
			];
			expect(seriesList(series)).toEqual('SeriesOne, SeriesTwo, SeriesThree, SeriesFour');
		});
	});
	
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
	
	describe('matchup list filter', function() {
		
		var matchupList = null;
		
		beforeEach(function() {
			matchupList = $filter('matchupList');
		})
		
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