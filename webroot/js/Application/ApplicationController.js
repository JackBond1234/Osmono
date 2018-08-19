$(document).ready(function() {
    //Avoids flicker on touch buttons by using the mobileTouched class as a replacement for the :active status
    //We can't double up with touchstart AND mousedown, because the event would fire twice and flicker anyway
    //TODO: Consider moving these into Angular somehow to use the element.bind functionality
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
    $scope.applicationViewToShow = 'calendar';
    $scope.applicationViews = {
        "calendar": {
            name: "Calendar",
            url: $rootScope.buildPath({
                prefix: "application",
                controller: "calendar",
                action: "index"
            }),
            images: {
                standard: "calendar.svg"
            }
        },
        "data": {
            name: "Data",
            url: $rootScope.buildPath({
                prefix: "application",
                controller: "data",
                action: "index"
            }),
            images: {
                standard: "data.svg"
            }
        },
        "distribute": {
            name: "Distribute",
            url: $rootScope.buildPath({
                prefix: "application",
                controller: "distribute",
                action: "index"
            }),
            images: {
                standard: "distribute.svg"
            }
        },
        "preferences": {
            name: "Preferences",
            url: $rootScope.buildPath({
                prefix: "application",
                controller: "preferences",
                action: "index"
            }),
            images: {
                standard: "settings.svg"
            }
        },
        "user-info": {
            name: "User Info",
            url: $rootScope.buildPath({
                prefix: "application",
                controller: "UserInfo",
                action: "index"
            }),
            images: {
                standard: "user-info.svg"
            }
        }
    };

    //Listeners
    $scope.$on("expandDesktopApplication", function(event, data){
        $scope.applicationColumnExpanded = data["expanded"];
    });

    $scope.$on("expandApplicationDropDown", function(event, data){
        $scope.applicationDropDownExpanded = data["expanded"];
    });

    var unsubscribeFromApplicationLoadListener;
    $scope.$on("setApplicationView", function(event, data){
        if (typeof unsubscribeFromApplicationLoadListener !== "function") {
            signalNewApplicationViewToLoad(data["viewId"]);
        }
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
    };

    //Helper functions
    function signalNewApplicationViewToLoad(desiredViewToSwitchTo) {
        if ($scope.applicationViewToShow !== desiredViewToSwitchTo) {
            //Gets any fully loaded application view. Due to ngIf, only one or none should ever be present.
            var applicationViewModuleElement = angular.element(document).find('.application-view').find(".module");
            //If one is present
            if (applicationViewModuleElement.length > 0) {
                removeExistingViews(applicationViewModuleElement);
                beginLoadingViewNow(desiredViewToSwitchTo);
                signalNoQueuedViewLoadsRemaining();
            } else {
                queueViewToLoadAfterCurrentViewLoadFinishes(desiredViewToSwitchTo);
            }
        }
    }

    function removeExistingViews(viewElements){
        viewElements.each(function () {
            //Unload the currently shown views
            var url = $(this).data("url");
            $rootScope.$broadcast("unloadModule", {url: url});
        });
    }

    function beginLoadingViewNow(desiredViewToSwitchTo) {
        //Switch the view to the new target
        $scope.applicationViewToShow = desiredViewToSwitchTo;
    }

    function signalNoQueuedViewLoadsRemaining(){
        //Kill the content load listener and reset the unsub function so that the next navigate will call the current function
        //i.e. Since there's nothing left in the queue, we don't want to try to load anything
        if (typeof unsubscribeFromApplicationLoadListener === "function") {
            unsubscribeFromApplicationLoadListener();
            unsubscribeFromApplicationLoadListener = undefined;
        }
    }

    function queueViewToLoadAfterCurrentViewLoadFinishes(desiredViewToSwitchTo) {
        //Kill the content load listener if it exists, because we're about to reactivate it.
        if (typeof unsubscribeFromApplicationLoadListener === "function") {
            unsubscribeFromApplicationLoadListener();
        }

        //(Re)activate content load listener so that queued events can fire when previous load is complete.
        unsubscribeFromApplicationLoadListener = $rootScope.$on("$includeContentLoaded", function () {
            //Timeout to let the digest complete, because angular needs to calculate the URL of the module
            //Apply to make sure we're back in the digest (not sure if necessary, but less change is better)
            setTimeout(function() {
                $scope.$apply(function(){
                    signalNewApplicationViewToLoad(desiredViewToSwitchTo);
                });
            },0);
        });
    }
});