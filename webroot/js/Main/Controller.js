angular.module('index').controller('mainController', function($scope, $rootScope){
    var loadedModules = [];
    $scope.showApplciationColumn = false;
    $rootScope.$on("$includeContentLoaded", function(event, templateName){
        loadedModules.push(templateName);
    });

    $scope.moduleLoaded = function(name) {
        return loadedModules.indexOf(name) > -1;
    };

    $scope.$on("showMobileApplication", function(event, data){
        $scope.showApplicationColumn = data["showing"];
    });
});