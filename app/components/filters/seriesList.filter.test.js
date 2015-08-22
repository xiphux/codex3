/* global inject */
/// <reference path="../../../typings/jasmine/jasmine.d.ts"/>
'use strict';

describe('codex.filters module', function() {
	
	beforeEach(angular.mock.module('codex.filters'));
	
	var $filter;

	beforeEach(inject(function(_$filter_){
	    $filter = _$filter_;
	}));
	
	describe('series list filter', function() {
		
		var seriesList = null;
		
		beforeEach(function() {
			seriesList = $filter('seriesList');
		});
		
		it('returns undefined when given undefined', function() {
			expect(seriesList(null)).toBeUndefined();
		});
		
		it('returns undefined when given null', function() {
			expect(seriesList(null)).toBeUndefined();
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
	
});