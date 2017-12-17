angular.module('index').controller('mainController', function($scope, $rootScope, $templateCache, $window){
    var loadedModules = [];
    var loadingModules = [];
    $scope.showApplciationColumn = false;
    this.$route = '/';

    //Global functions
    $rootScope.buildPath = function(options, parameters){
        var path = $window["basePath"];
        if (typeof options === "string") {
            path += options;
        } else if (typeof options === "object") {
            var optionKeys = Object.keys(options);
            for(var i = 0; i < optionKeys.length; i++) {
                path = appendParamMark(path);
                path += "cake_route["+optionKeys[i]+"]="+options[optionKeys[i]];
            }
        }
        if (typeof parameters === "object") {
            var parameterKeys = Object.keys(parameters);
            for(var j = 0; j < parameterKeys.length; j++) {
                path = appendParamMark(path);
                path += parameterKeys[i] + "=" + parameters[parameterKeys[i]];
            }
        }
        if (path.indexOf("?") === -1) {
            path += "?";
        }
        return path;
    };

    $scope.moduleIsLoaded = function(name) {
        return loadedModules.indexOf(name) > -1;
    };

    $scope.moduleIsLoading = function(name) {
        return loadingModules.indexOf(name) > -1;
    };

    $scope.contrastColor = function(r, g, b)
    {
        if (typeof r === "string") {
            var rgb = hexToRgb(r);
            r = rgb["r"];
            g = rgb["g"];
            b = rgb["b"];
        }
        var a = 1 - ( 0.299 * r + 0.587 * g + 0.114 * b)/255;

        var d = true;
        if (a < 0.25) {
            d = false;
        }

        return  d;
    };

    //Listeners
    $rootScope.$on("$includeContentLoaded", function(event, templateName){
        loadedModules.push(templateName);
    });

    $rootScope.$on("$includeContentRequested", function(event, templateName){
        loadingModules.push(templateName);
    });

    $scope.$on("unloadModule", function(event, data) {
        if ($templateCache.get(data["url"])) {
            $templateCache.remove(data["url"]);
            loadedModules.splice(loadedModules.indexOf(data["url"]), 1);
        }
    });

    $scope.$on("showMobileApplication", function(event, data){
        $scope.showApplicationColumn = data["showing"];
    });

    $scope.$on("showMobileDetailColumn", function(event, data) {
        $scope.showMobileDetailColumn = data["showing"];
    });

    $scope.$on("expandDesktopApplication", function(event, data){
        $scope.expandApplicationColumn = data["expanded"];
    });

    //Helper functions
    function hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    function appendParamMark(url) {
        if (url.indexOf("?") > -1) {
            return url + "&";
        }
        return url + "?";
    }
});