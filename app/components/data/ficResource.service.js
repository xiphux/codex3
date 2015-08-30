'use strict';

angular.module('codex.data')
	.factory('ficResourceService', ficResourceService);

ficResourceService.$inject = ['$resource'];

function ficResourceService($resource) {
	
	var ficsResource = $resource('api/fics');
	var ficResource = $resource('api/fics/:ficId');
	
	var service = {
		getFics: getFics,
		getFic: getFic
	};
	return service;
	
	function getFics(filters) {
		
		var params = filters ? _.pick(filters, ['series', 'genres', 'matchups', 'search']) : {};
		
		params = _.transform(params, function(result, n, key) {
			if (key == 'genres') {
				key = 'genre';
			} else if (key == 'matchups') {
				key = 'matchup';
			}
			if (n.length > 1) {
				result[key + '[]'] = n;
			} else {
				result[key] = n[0];
			}
		});
		
		return ficsResource.query(params);
	};
	
	function getFic(ficId) {
		if (!ficId) {
			return null;
		}
		return ficResource.get({ ficId: ficId });
	};

}