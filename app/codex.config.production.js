'use strict';

angular.module('codex')
	.config(codexConfig);
	
codexConfig.$inject = ['$compileProvider'];
	
function codexConfig($compileProvider) {
	$compileProvider.debugInfoEnabled(false);
}