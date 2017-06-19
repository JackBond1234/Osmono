angular.module('index').controller('applicationController', function($scope, $rootScope){
    //Init
    $scope.applicationDropDownExpanded = false;
    $scope.applicationColumnExpanded = false;

    //Listeners
    $scope.$on("expandDesktopApplication", function(event, data){
        $scope.applicationColumnExpanded = data["expanded"];
    });

    $scope.$on("expandApplicationDropDown", function(event, data){
        $scope.applicationDropDownExpanded = data["expanded"];
    });

    //Emitters
    $scope.hideMobileApplication = function(){
        $rootScope.$broadcast("showMobileApplication", {showing: false});
    };

    $scope.expandDesktopApplication = function() {
        $rootScope.$broadcast("expandDesktopApplication", {expanded: true});
    };

    $scope.retractDesktopApplication = function() {
        $rootScope.$broadcast("expandDesktopApplication", {expanded: false});
    };

    $scope.expandApplicationDropDown = function() {
        $rootScope.$broadcast("expandApplicationDropDown", {expanded: !$scope.applicationDropDownExpanded});
    }
});