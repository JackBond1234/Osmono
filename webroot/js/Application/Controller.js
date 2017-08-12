$(document).ready(function() {
    //Avoids flicker on touch buttons by using the mobileTouched class as a replacement for the :active status
    //We can't double up with touchstart AND mousedown, because the event would fire twice and flicker anyway
    $(document).on('touchstart', '#application-container .nav-bar-dropdown ul li', function() {
        $(this).addClass('mobileTouched');
    });

    $(document).on('touchend', '#application-container .nav-bar-dropdown ul li', function() {
        $(this).removeClass('mobileTouched');
    })
});

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

    var desiredViewToSwitchTo;
    var unsubscribeFromApplicationLoadListener;
    $scope.$on("setApplicationView", function(event, data){
        desiredViewToSwitchTo = data["viewId"];
        if (typeof unsubscribeFromApplicationLoadListener !== "function") {
            setApplicationView();
        }
    });

    function setApplicationView() {
        if ($scope.applicationViewToShow !== desiredViewToSwitchTo) {
            //Gets any fully loaded application view. Due to ngIf, only one or none should ever be present.
            var applicationViewModelElement = angular.element(document).find('.application-view').find(".module");
            //If one is present
            if (applicationViewModelElement.length > 0) {
                applicationViewModelElement.each(function () {
                    //Unload the currently shown views
                    var url = $(this).data("url");
                    $rootScope.$broadcast("unloadModule", {url: url});
                });
                //Switch the view to the new target
                $scope.applicationViewToShow = desiredViewToSwitchTo;
                //Kill the content load listener and reset the unsub function so that the next navigate will call the current function
                if (typeof unsubscribeFromApplicationLoadListener === "function") {
                    unsubscribeFromApplicationLoadListener();
                    unsubscribeFromApplicationLoadListener = undefined;
                }
            } else {
                //Kill the content load listener if it exists, because we're about to reactivate it.
                if (typeof unsubscribeFromApplicationLoadListener === "function") {
                    unsubscribeFromApplicationLoadListener();
                }
                //(Re)activate content load listener so that queued events can fire when previous load is complete.
                unsubscribeFromApplicationLoadListener = $rootScope.$on("$includeContentLoaded", function (event, templateName) {
                    setApplicationView();
                });
            }
        }
    }

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