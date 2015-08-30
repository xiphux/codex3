'use strict';

angular.module('codex')
	.config(codexConfigProduction);
	
codexConfigProduction.$inject = ['$compileProvider'];
	
function codexConfigProduction($compileProvider) {
	$compileProvider.debugInfoEnabled(false);
}