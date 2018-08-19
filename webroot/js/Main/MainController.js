angular.module('index').controller('mainController', [
    "$scope",
    "$rootScope",
    "$templateCache",
    "pathHelper",
    "popupHelper",
    function(
        $scope,
        $rootScope,
        $templateCache,
        pathHelper,
        popupHelper
    ){
        var loadedModules = [];
        var loadingModules = [];
        $scope.showApplciationColumn = false;
        this.$route = '/';

        //Global functions
        $rootScope.buildPath = pathHelper.build;
        $rootScope.popup = popupHelper;

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
            if (data["showing"]) {
                $scope.showApplicationColumn = true;
            } else {
                $scope.allowAnimatingMobileApplicationColumnExit = true;
                setTimeout(function() {
                    $scope.$apply(function() {
                        $scope.showApplicationColumn = false;
                        var ApplicationColumn = $("#ApplicationColumn");
                        ApplicationColumn.off("transitionend");
                        ApplicationColumn.on("transitionend", function() {
                            $scope.$apply(function() {
                                $scope.allowAnimatingMobileApplicationColumnExit = false;
                            })
                        });
                    });
                });
            }
        });

        $scope.$on("showMobileDetailColumn", function(event, data) {
            $scope.showMobileDetailColumn = data["showing"];
        });

        $scope.$on("expandDesktopApplication", function(event, data){
            if (data["expanded"]) {
                $scope.expandApplicationColumn = true;
            } else {
                $scope.allowAnimatingMobileApplicationColumnExit = true;
                setTimeout(function() {
                    $scope.$apply(function() {
                        $scope.expandApplicationColumn = false;
                        var ApplicationColumn = $("#ApplicationColumn");
                        ApplicationColumn.off("transitionend");
                        ApplicationColumn.on("transitionend", function() {
                            $scope.$apply(function() {
                                $scope.allowAnimatingMobileApplicationColumnExit = false;
                            })
                        });
                    });
                });
            }
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
    }
]);
