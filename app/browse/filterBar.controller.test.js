'use strict';

describe('codex.browse module', function() {
	
	beforeEach(angular.mock.module('codex.browse'));
	
	describe('filter bar controller', function() {
		
		var mockFicBrowseService, fbCtrl, genreFilters, matchupFilters, seriesFilters, scope, $rootScope, hasGenreFilter, hasSeriesFilter, hasMatchupFilter;
		
		beforeEach(inject(function(_$controller_, _$rootScope_) {
			
			$rootScope = _$rootScope_;
			
			genreFilters = {};
			matchupFilters = {};
			seriesFilters = {};
			hasGenreFilter = false;
			hasSeriesFilter = false;
			hasMatchupFilter = false;
			
			mockFicBrowseService = {
				getGenreFilters: function() { return genreFilters; },
				getMatchupFilters: function() { return matchupFilters; },
				getSeriesFilters: function() { return seriesFilters; },
				clear: jasmine.createSpy('clear'),
				refresh: jasmine.createSpy('refresh')
			};
			
			scope = $rootScope.$new();
			
			fbCtrl = _$controller_('filterBarController', {
				ficBrowseService: mockFicBrowseService,
				$scope: scope
			});
			
		}));
		
		it('should initialize without filters', function() {
			$rootScope.$digest();
			expect(fbCtrl.genreFilters.length).toEqual(0);
			expect(fbCtrl.matchupFilters.length).toEqual(0);
			expect(fbCtrl.seriesFilters.length).toEqual(0);
			expect(fbCtrl.hasFilters).toBeFalsy();
		});
		
		it('should initialize with genre filters', function() {
			
			genreFilters = {
				'1': {
					id: '1',
					name: 'GenreOne'
				}
			};
			
			$rootScope.$digest();
			
			expect(fbCtrl.genreFilters[0]).toEqual(genreFilters['1']);
			expect(fbCtrl.hasFilters).toBeTruthy();
			
		});
		
		it('should initialize with matchup filters', function() {
			
			matchupFilters = {
				'2': {
					id: '2',
					characters: [
						{
							id: '1',
							name: 'CharacterOne'
						},
						{
							id: '3',
							name: 'CharacterThree'
						}
					]
				}
			};
			
			$rootScope.$digest();
			
			expect(fbCtrl.matchupFilters[0]).toEqual(matchupFilters['2']);
			expect(fbCtrl.hasFilters).toBeTruthy();
			
		});
		
		it('should initialize with series filters', function() {
			
			seriesFilters = {
				'3': {
					id: '3',
					title: 'SeriesThree'
				}
			};
			
			$rootScope.$digest();
			
			expect(fbCtrl.seriesFilters[0]).toEqual(seriesFilters['3']);
			expect(fbCtrl.hasFilters).toBeTruthy();
			
		});
		
		it('should update with genre filter changes', function() {
			
			$rootScope.$digest();
			
			expect(fbCtrl.genreFilters.length).toEqual(0);
			expect(fbCtrl.hasFilters).toBeFalsy();
			
			genreFilters['1'] = { id: '1', name: 'GenreOne' };
			
			$rootScope.$digest();
			
			expect(fbCtrl.genreFilters[0]).toEqual(genreFilters['1']);
			expect(fbCtrl.hasFilters).toBeTruthy();
			
			genreFilters['2'] = { id: '2', name: 'GenreTwo' };
			
			$rootScope.$digest();
			
			expect(fbCtrl.genreFilters[0]).toEqual(genreFilters['1']);
			expect(fbCtrl.genreFilters[1]).toEqual(genreFilters['2']);
			expect(fbCtrl.hasFilters).toBeTruthy();
			
			delete genreFilters['1'];
			
			$rootScope.$digest();
			
			expect(fbCtrl.genreFilters[0]).toEqual(genreFilters['2']);
			expect(fbCtrl.hasFilters).toBeTruthy();
			
			delete genreFilters['2'];
			
			$rootScope.$digest();
			
			expect(fbCtrl.genreFilters.length).toEqual(0);
			expect(fbCtrl.hasFilters).toBeFalsy();
		});
		
		it('should update with matchup filter changes', function() {
			$rootScope.$digest();
			
			expect(fbCtrl.matchupFilters.length).toEqual(0);
			expect(fbCtrl.hasFilters).toBeFalsy();
			
			matchupFilters['1'] = { id: '1', characters: [ { id: '1', name: 'CharacterOne' }, { id: '2', name: 'CharacterTwo '}] };
			
			$rootScope.$digest();
			
			expect(fbCtrl.matchupFilters[0]).toEqual(matchupFilters['1']);
			expect(fbCtrl.hasFilters).toBeTruthy();
			
			matchupFilters['2'] = { id: '2', characters: [ { id: '3', name: 'CharacterThree' }, { id: '4', name: 'CharacterFour '}] };
			
			$rootScope.$digest();
			
			expect(fbCtrl.matchupFilters[0]).toEqual(matchupFilters['1']);
			expect(fbCtrl.matchupFilters[1]).toEqual(matchupFilters['2']);
			expect(fbCtrl.hasFilters).toBeTruthy();
			
			delete matchupFilters['1'];
			
			$rootScope.$digest();
			
			expect(fbCtrl.matchupFilters[0]).toEqual(matchupFilters['2']);
			expect(fbCtrl.hasFilters).toBeTruthy();
			
			delete matchupFilters['2'];
			
			$rootScope.$digest();
			
			expect(fbCtrl.matchupFilters.length).toEqual(0);
			expect(fbCtrl.hasFilters).toBeFalsy();
		});
		
		it('should update with series filter changes', function() {
			$rootScope.$digest();
			
			expect(fbCtrl.seriesFilters.length).toEqual(0);
			expect(fbCtrl.hasFilters).toBeFalsy();
			
			seriesFilters['1'] = { id: '1', title: 'SeriesOne' };
			
			$rootScope.$digest();
			
			expect(fbCtrl.seriesFilters[0]).toEqual(seriesFilters['1']);
			expect(fbCtrl.hasFilters).toBeTruthy();
			
			seriesFilters['2'] = { id: '2', title: 'SeriesTwo' };
			
			$rootScope.$digest();
			
			expect(fbCtrl.seriesFilters[0]).toEqual(seriesFilters['1']);
			expect(fbCtrl.seriesFilters[1]).toEqual(seriesFilters['2']);
			expect(fbCtrl.hasFilters).toBeTruthy();
			
			delete seriesFilters['1'];
			
			$rootScope.$digest();
			
			expect(fbCtrl.seriesFilters[0]).toEqual(seriesFilters['2']);
			expect(fbCtrl.hasFilters).toBeTruthy();
			
			delete seriesFilters['2'];
			
			$rootScope.$digest();
			
			expect(fbCtrl.seriesFilters.length).toEqual(0);
			expect(fbCtrl.hasFilters).toBeFalsy();
		});
		
		it('should clear filters', function() {
			$rootScope.$digest();
			
			expect(mockFicBrowseService.clear).not.toHaveBeenCalled();
			expect(mockFicBrowseService.refresh).not.toHaveBeenCalled();
			
			fbCtrl.clear();
			
			expect(mockFicBrowseService.clear).toHaveBeenCalled();
			expect(mockFicBrowseService.refresh).toHaveBeenCalled();
		});
		
	});
	
});