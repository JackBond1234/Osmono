angular.module('index').controller('mainController', function($scope, $rootScope, $templateCache){
    var loadedModules = [];
    var loadingModules = [];
    $scope.showApplciationColumn = false;
    this.$route = '/';

    //Global functions
    $scope.moduleIsLoaded = function(name) {
        return loadedModules.indexOf(name) > -1;
    };

    $scope.moduleIsLoading = function(name) {
        return loadingModules.indexOf(name) > -1;
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
            loadedModules.splice(loadedModules.indexOf(data["url"], 1));
        }
    });

    $scope.$on("showMobileApplication", function(event, data){
        $scope.showApplicationColumn = data["showing"];
    });

    $scope.$on("expandDesktopApplication", function(event, data){
        $scope.expandApplicationColumn = data["expanded"];
    });
});