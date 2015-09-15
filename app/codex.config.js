'use strict';

angular.module('codex')
	.config(codexConfig);
	
codexConfig.$inject = ['localStorageServiceProvider'];
	
function codexConfig(localStorageServiceProvider) {
	localStorageServiceProvider.setPrefix('codex');
}