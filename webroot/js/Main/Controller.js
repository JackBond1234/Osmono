angular.module('index').controller('mainController', function($scope, $rootScope){
    var loadedModules = [];
    $scope.showApplciationColumn = false;

    //Global functions
    $scope.moduleLoaded = function(name) {
        return loadedModules.indexOf(name) > -1;
    };

    //Listeners
    $rootScope.$on("$includeContentLoaded", function(event, templateName){
        loadedModules.push(templateName);
    });

    $scope.$on("showMobileApplication", function(event, data){
        $scope.showApplicationColumn = data["showing"];
    });

    $scope.$on("expandDesktopApplication", function(event, data){
        $scope.expandApplicationColumn = data["expanded"];
    });
});