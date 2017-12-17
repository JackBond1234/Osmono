var index = angular.module('index', ['ngAnimate', 'ngRoute', 'ngTouch']);

index.directive('ngStyleArray', function() {
    return {
        link: function(scope, element, attr) {
            scope.$watch(attr.ngStyleArray, function ngStyleArrayWatchAction(newStyles, oldStyles) {
                if (oldStyles && (newStyles !== oldStyles)) {
                    element.attr("style", "");
                    forEach(oldStyles, function(val, style) { element.css(style, '');});
                }
                var newStyleKeys = Object.keys(newStyles);
                for (var i = 0; i < newStyleKeys.length; i++) {
                    if (typeof newStyles[newStyleKeys[i]] === "object") {
                        var newStyleString = element.attr("style") || "";
                        for (var j = 0; j < newStyles[newStyleKeys[i]].length; j++) {
                            if (newStyleString.length !== 0) {
                                newStyleString += "; ";
                            }
                            newStyleString += newStyleKeys[i] + ": " + newStyles[newStyleKeys[i]][j];
                        }
                        element.attr("style", newStyleString);
                    } else {
                        element.css(newStyleKeys[i], newStyles[newStyleKeys[i]]);
                    }
                }
            }, true);
        }
    }
});

//Make a dedicated file for some/all of the stuff below
index.config(function ($controllerProvider, $animateProvider) {
    index.controller = $controllerProvider.register;
    $animateProvider.classNameFilter(/^(?:(?!ng-animate-disabled).)*$/);
});

function uniqid (prefix, more_entropy) {
    if (typeof prefix === 'undefined') {
        prefix = "";
    }
    var retId;
    var formatSeed = function (seed, reqWidth) {
        seed = parseInt(seed, 10).toString(16);
        if (reqWidth < seed.length) {
            return seed.slice(seed.length - reqWidth);
        }
        if (reqWidth > seed.length) {
            return Array(1 + (reqWidth - seed.length)).join('0') + seed;
        }
        return seed;
    };
    if (!this.php_js) {
        this.php_js = {};
    }
    if (!this.php_js.uniqidSeed) {
        this.php_js.uniqidSeed = Math.floor(Math.random() * 0x75bcd15);
    }
    this.php_js.uniqidSeed++;

    retId = prefix;
    retId += formatSeed(parseInt(new Date().getTime() / 1000, 10), 8);
    retId += formatSeed(this.php_js.uniqidSeed, 5);
    if (more_entropy) {
        retId += (Math.random() * 10).toFixed(8).toString();
    }

    return retId;
}

index.factory('clickAnywhereButHereService', function($document){
    var tracker = [];

    return function($scope, expr, elem) {
        var i, t, len;
        for(i = 0, len = tracker.length; i < len; i++) {
            t = tracker[i];
            if(t.expr === expr && t.scope === $scope) {
                return t;
            }
        }
        var handler = function(e) {
            if (e.target !== elem[0]) {
                $scope.$apply(expr);
            }
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
            clickAnywhereButHereService(scope, attr.clickAnywhereButHere, elem);
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