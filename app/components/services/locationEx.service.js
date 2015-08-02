'use strict';

angular.module('codex.services')
    .service('$locationEx', locationExService);

locationExService.$inject = ['$location', '$route', '$rootScope'];

function locationExService($location, $route, $rootScope) {
	$location.skipReload = function () {
        var lastRoute = $route.current;
        var un = $rootScope.$on('$locationChangeSuccess', function () {
            $route.current = lastRoute;
            un();
        });
        return $location;
    };
    return $location;
}