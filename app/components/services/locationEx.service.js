'use strict';

angular.module('codex.services')
    .service('$locationEx', locationExService);

locationExService.$inject = ['$location', '$route', '$rootScope', '$timeout'];

function locationExService($location, $route, $rootScope, $timeout) {
	$location.skipReload = function (skipResolve) {
        
        var lastRoute = $route.current;
        
        var unsubLocationChangeSuccess = $rootScope.$on('$locationChangeSuccess', function () {
            $route.current = lastRoute;
            unsubLocationChangeSuccess();
        });
        
        // hack to allow resolve skipping
        var unsubRouteChangeStart = $rootScope.$on('$routeChangeStart', function() {
            $route.skipResolve = skipResolve;
            unsubRouteChangeStart();
            $timeout(function() {
               $route.skipResolve = false; 
            });
        });
        
        return $location;
    };
    return $location;
}