$(document).ready(function() {
    //Avoids flicker on touch buttons by using the mobileTouched class as a replacement for the :active status
    //We can't double up with touchstart AND mousedown, because the event would fire twice and flicker anyway
    //TODO: Consider moving these into Angular somehow to use the element.bind functionality
    $(document).on('touchstart', '#details-container .nav-bar-dropdown ul li', function() {
        $(this).addClass('mobileTouched');
    });

    $(document).on('touchend', '#details-container .nav-bar-dropdown ul li', function() {
        $(this).removeClass('mobileTouched');
    })
});

angular.module('index').controller('detailsController', function($scope, $rootScope){
    $scope.detailWindows = [];
    $scope.detailMenuViews = {
        "stats": {
            name: "Stats",
            url: $rootScope.buildPath({
                prefix: 'application',
                controller: 'data',
                action: 'index'
            }),
            images: {
                standard: 'data.svg',
                dark: 'data_black.svg'
            }
        },
        "settings": {
            name: "Settings",
            url: $rootScope.buildPath({
                prefix: 'application',
                controller: 'distribute',
                action: 'index'
            }),
            images: {
                standard: 'settings.svg',
                dark: 'settings_black.svg'
            }
        },
        "transfer": {
            name: "Transfer",
            url: $rootScope.buildPath({
                prefix: 'application',
                controller: 'UserInfo',
                action: 'index'
            }),
            images: {
                standard: 'transfer.svg',
                dark: 'transfer_black.svg'
            }
        }
    };

    var currentlyAnimating = false;
    var animationQueue = [];

    $scope.associateRepeatIndexWithDom = function(index, element){
        $scope.detailWindows[findWithAttr($scope.detailWindows, "index", index)]["element"] = element;
    };

    $scope.$on("openDetail", function(event, data){
        openDetailView(data["name"], data["color"], data["index"], data["id"]);
    });

    $scope.$on("closeDetail", function(event, data) {
        closeDetailView(data["index"]);
    });

    $scope.$on("categorySwap", function(event, data) {
        swapCategories(data["indexToSwap"], data["indexToBeSwapped"]);
    });

    $scope.$on("expandDetailDropDown", function(event, data) {
        $scope.detailWindows[data["index"]].detailDropDownExpanded = data["expanded"];
    });

    $scope.$on("setDetailMenuView", function(event, data){
        // desiredViewToSwitchTo = data["viewId"];
        if (typeof data["detailWindow"]["unsubscribeFromDetailMenuLoadListener"] !== "function") {
            signalNewDetailMenuViewToLoad(data["viewId"], data["detailWindow"]);
        }
    });

    $scope.signalCloseDetail = function(index) {
        var detailWindow = $scope.detailWindows[findWithAttr($scope.detailWindows, "index", index)];
        $rootScope.$broadcast("closeDetail", {
            index: index,
            id: detailWindow["id"]
        });
    };

    $scope.toggleDetailDropDown = function(detailWindow) {
        $rootScope.$broadcast("expandDetailDropDown", {expanded: !detailWindow.detailDropDownExpanded, index: $scope.detailWindows.indexOf(detailWindow)});
    };

    $scope.retractDetailDropDown = function(detailWindow) {
        $rootScope.$broadcast("expandDetailDropDown", {expanded: false, index: $scope.detailWindows.indexOf(detailWindow)});
    };

    $scope.setDetailMenuView = function(viewId, detailWindow) {
        $rootScope.$broadcast("setDetailMenuView", {viewId: viewId, detailWindow: detailWindow});
    };

    function swapCategories(indexToSwap, indexToBeSwapped) {
        if (currentlyAnimating) {
            animationQueue.push({
                indexToSwap: indexToSwap,
                indexToBeSwapped: indexToBeSwapped
            });
        } else {
            var localIndexToSwap = findWithAttr($scope.detailWindows, "index", indexToSwap);
            var localIndexToBeSwapped = findWithAttr($scope.detailWindows, "index", indexToBeSwapped);
            if (animationQueue.length === 0 && localIndexToSwap !== -1 && localIndexToBeSwapped !== -1) {
                animateSwapDetails(localIndexToSwap, localIndexToBeSwapped, indexToSwap, indexToBeSwapped);
            } else {
                if (localIndexToSwap !== -1) {
                    // removeExistingViews(angular.element($scope.detailWindows[localIndexToSwap]["element"]).find(".module"));
                    $scope.detailWindows[localIndexToSwap].index = indexToBeSwapped;
                }
                if (localIndexToBeSwapped !== -1) {
                    // removeExistingViews(angular.element($scope.detailWindows[localIndexToBeSwapped]["element"]).find(".module"));
                    $scope.detailWindows[localIndexToBeSwapped].index = indexToSwap;
                }
                $scope.$apply();
                handleQueuedCategorySwaps();
            }
        }
    }

    function handleQueuedCategorySwaps() {
        if (animationQueue.length > 0) {
            var nextAnimation = animationQueue.shift();
            swapCategories(nextAnimation["indexToSwap"], nextAnimation["indexToBeSwapped"]);
        }
    }

    function findWithAttr(array, attr, value) {
        for(var i = 0; i < array.length; i += 1) {
            if(array[i][attr] === value) {
                return i;
            }
        }
        return -1;
    }

    function openDetailView(name, color, index, id) {
        if ($scope.appName === "Data") {
            $scope.appName = "Distribute";
        } else if ($scope.appName === "Distribute") {
            $scope.appName = "UserInfo";
        } else if ($scope.appName === "UserInfo") {
            $scope.appName = "Data";
        }
        var hasDarkBackground = $scope.contrastColor(color);

        if ($scope.detailWindows.length < Math.max(1,Math.floor($(window).height()/200)) && findWithAttr($scope.detailWindows, "index", index) === -1) {
            $scope.detailWindows.push({
                name: name,
                color: color,
                textColor: hasDarkBackground?"#FFFFFF":"#000000",
                hasDarkBackground: hasDarkBackground,
                id: id,
                index: index,
                detailDropDownExpanded: false,
                detailMenuViewToShow: Object.keys($scope.detailMenuViews)[0],
                unsubscribeFromDetailMenuLoadListener: undefined
            });
            adjustDetailWindowHeights();
            $rootScope.$broadcast("showMobileDetailColumn", {
                showing: true
            });
        }
    }

    function closeDetailView(index) {
        var realIndex = findWithAttr($scope.detailWindows, "index", index);
        if (realIndex > -1) {
            if ($scope.detailWindows.length === 1) {
                $($scope.detailWindows[findWithAttr($scope.detailWindows, "index", index)]["element"]).on("transitionend", function() {
                    setTimeout(function() {
                        $rootScope.$broadcast("showMobileDetailColumn", {
                            showing: false
                        });
                        $scope.$apply();
                    },0);
                });
            }
            removeExistingViews(angular.element($scope.detailWindows[realIndex]["element"]).find(".module"));
            $scope.detailWindows.splice(realIndex, 1);
            adjustDetailWindowHeights();
        }
    }

    function adjustDetailWindowHeights() {
        var style = getComputedStyle(document.body);
        var prevDynamicHeight = style.getPropertyValue('--dynamic-height');
        document.documentElement.style.setProperty("--prev-dynamic-height", prevDynamicHeight, '');
        document.documentElement.style.setProperty("--dynamic-height", (100 / $scope.detailWindows.length) + '%', '');
    }

    function animateSwapDetails(localIndexToSwap, localIndexToBeSwapped, categoryIndexToSwap, categoryIndexToBeSwapped) {
        var elementToSwap = $scope.detailWindows[localIndexToSwap]["element"];
        var elementToBeSwapped = $scope.detailWindows[localIndexToBeSwapped]["element"];
        var elementToSwapY = elementToSwap.offset().top;
        var elementToBeSwappedY = elementToBeSwapped.offset().top;
        var verticalDistanceBetweenElements = elementToSwapY - elementToBeSwappedY;
        var animationPromiseArray = [];
        currentlyAnimating = true;
        elementToSwap.addClass("detail-swap-primary");
        animationPromiseArray.push(elementToSwap.animate({
            top: -verticalDistanceBetweenElements
        }, 200).promise());

        animationPromiseArray.push(elementToBeSwapped.animate({
            top: verticalDistanceBetweenElements
        }, 200).promise());

        $.when.apply($, animationPromiseArray).done(function () {
            elementToSwap.css("top", "");
            elementToBeSwapped.css("top", "");
            elementToSwap.removeClass("detail-swap-primary");
            $scope.detailWindows[localIndexToSwap].index = categoryIndexToBeSwapped;
            $scope.detailWindows[localIndexToBeSwapped].index = categoryIndexToSwap;
            $scope.$apply();
            currentlyAnimating = false;
            handleQueuedCategorySwaps();
        });
    }

    function signalNewDetailMenuViewToLoad(desiredViewToSwitchTo, detailWindow) {
        if (detailWindow["detailMenuViewToShow"] !== desiredViewToSwitchTo) {
            //Gets any fully loaded application view. Due to ngIf, only one or none should ever be present.
            var detailMenuViewModuleElement = angular.element(detailWindow["element"]).find('.detail-menu-view').find(".module");
            //If one is present
            if (detailMenuViewModuleElement.length > 0) {
                removeExistingViews(detailMenuViewModuleElement);
                beginLoadingViewNow(desiredViewToSwitchTo, detailWindow);
                signalNoQueuedViewLoadsRemaining(detailWindow);
            } else {
                queueViewToLoadAfterCurrentViewLoadFinishes(desiredViewToSwitchTo, detailWindow);
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

    function beginLoadingViewNow(desiredViewToSwitchTo, detailWindow) {
        //Switch the view to the new target
        detailWindow["detailMenuViewToShow"] = desiredViewToSwitchTo;
    }

    function signalNoQueuedViewLoadsRemaining(detailWindow){
        //Kill the content load listener and reset the unsub function so that the next navigate will call the current function
        //i.e. Since there's nothing left in the queue, we don't want to try to load anything
        if (typeof detailWindow["unsubscribeFromDetailMenuLoadListener"]=== "function") {
            detailWindow["unsubscribeFromDetailMenuLoadListener"]();
            detailWindow["unsubscribeFromDetailMenuLoadListener"]= undefined;
        }
    }

    function queueViewToLoadAfterCurrentViewLoadFinishes(desiredViewToSwitchTo, detailWindow) {
        //Kill the content load listener if it exists, because we're about to reactivate it.
        if (typeof detailWindow["unsubscribeFromDetailMenuLoadListener"]=== "function") {
            detailWindow["unsubscribeFromDetailMenuLoadListener"]();
        }

        //(Re)activate content load listener so that queued events can fire when previous load is complete.
        detailWindow["unsubscribeFromDetailMenuLoadListener"]= $rootScope.$on("$includeContentLoaded", function () {
            //Timeout to let the digest complete, because angular needs to calculate the URL of the module
            //Apply to make sure we're back in the digest (not sure if necessary, but less change is better)
            setTimeout(function() {
                $scope.$apply(function(){
                    signalNewDetailMenuViewToLoad(desiredViewToSwitchTo, detailWindow);
                });
            },0);
        });
    }
});