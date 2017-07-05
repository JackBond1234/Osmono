angular.module('index').controller('applicationController', function($scope, $rootScope){
    //Init
    $scope.applicationDropDownExpanded = false;
    $scope.applicationColumnExpanded = false;
    $scope.applicationViewToShow = 'data';

    //Listeners
    $scope.$on("expandDesktopApplication", function(event, data){
        $scope.applicationColumnExpanded = data["expanded"];
    });

    $scope.$on("expandApplicationDropDown", function(event, data){
        $scope.applicationDropDownExpanded = data["expanded"];
    });

    $scope.$on("setApplicationView", function(event, data){
        $scope.applicationViewToShow = data["viewId"];
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

    $scope.toggleApplicationDropDown = function() {
        $rootScope.$broadcast("expandApplicationDropDown", {expanded: !$scope.applicationDropDownExpanded});
    };

    $scope.retractApplicationDropDown = function() {
        $rootScope.$broadcast("expandApplicationDropDown", {expanded: false});
    };

    $scope.setApplicationView = function(viewId) {
        $rootScope.$broadcast("setApplicationView", {viewId: viewId});
    }
});