var index = angular.module('index', ['ngAnimate', 'ngRoute', 'ngTouch']);

//Make a dedicated file for some/all of the stuff below
index.config(function ($controllerProvider, $animateProvider) {
    index.controller = $controllerProvider.register;
    $animateProvider.classNameFilter(/^(?:(?!ng-animate-disabled).)*$/);
});

index.factory('clickAnywhereButHereService', function($document){
    var tracker = [];

    return function($scope, expr) {
        var i, t, len;
        for(i = 0, len = tracker.length; i < len; i++) {
            t = tracker[i];
            if(t.expr === expr && t.scope === $scope) {
                return t;
            }
        }
        var handler = function() {
            $scope.$apply(expr);
        };

        $document.on('click', handler);

        // IMPORTANT! Tear down this event handler when the scope is destroyed.
        $scope.$on('$destroy', function(){
            $document.off('click', handler);
        });

        t = { scope: $scope, expr: expr };
        tracker.push(t);
        return t;
    };
});

index.directive('clickAnywhereButHere', function($document, clickAnywhereButHereService){
    return {
        restrict: 'A',
        link: function(scope, elem, attr) {
            var handler = function(e) {
                e.stopPropagation();
            };
            elem.on('click', handler);

            scope.$on('$destroy', function(){
                elem.off('click', handler);
            });

            clickAnywhereButHereService(scope, attr.clickAnywhereButHere);
        }
    };
});

index.factory('unClickAnywhereButHereService', function($document){
    var tracker = [];

    return function($scope, expr) {
        var i, t, len;
        for(i = 0, len = tracker.length; i < len; i++) {
            t = tracker[i];
            if(t.expr === expr && t.scope === $scope) {
                return t;
            }
        }
        var handler = function() {
            $scope.$apply(expr);
        };

        $document.on('mouseup', handler);

        // IMPORTANT! Tear down this event handler when the scope is destroyed.
        $scope.$on('$destroy', function(){
            $document.off('mouseup', handler);
        });

        t = { scope: $scope, expr: expr };
        tracker.push(t);
        return t;
    };
});

index.directive('unClickAnywhereButHere', function($document, unClickAnywhereButHereService){
    return {
        restrict: 'A',
        link: function(scope, elem, attr) {
            var handler = function(e) {
                e.stopPropagation();
            };
            elem.on('mouseup', handler);

            scope.$on('$destroy', function(){
                elem.off('mouseup', handler);
            });

            unClickAnywhereButHereService(scope, attr["unClickAnywhereButHere"]);
        }
    };
});

index.directive('passThroughData', function(){
    return {
        restrict: "A",
        link: function(scope, element, attr){
            scope.$eval(attr["passThroughData"], {element: element});
        }
    };
});