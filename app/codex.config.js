'use strict';

angular.module('codex')
	.config(codexConfig);
	
codexConfig.$inject = ['$localStorageProvider'];
	
function codexConfig($localStorageProvider) {
	$localStorageProvider.setKeyPrefix('codex-');
}