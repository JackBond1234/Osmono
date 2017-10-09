angular.module('index').controller('detailsController', function($scope, $rootScope){
    $scope.detailWindows = [];
    $scope.appName = "Data";
    var currentlyAnimating = false;
    var animationQueue = [];

    $scope.associateRepeatIndexWithDom = function(index, element){
        $scope.detailWindows[findWithAttr($scope.detailWindows, "index", index)]["element"] = element;
    };

    $scope.$on("openDetail", function(event, data){
        openDetailView(data["name"], data["color"], data["index"]);
    });

    $scope.$on("closeDetail", function(event, data) {
        closeDetailView(data["index"]);
    });

    $scope.$on("categorySwap", function(event, data) {
        swapCategories(data["indexToSwap"], data["indexToBeSwapped"]);
    });

    $scope.signalCloseDetail = function(index) {
        $rootScope.$broadcast("closeDetail", {
            index: index
        });
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
                    $scope.detailWindows[localIndexToSwap].index = indexToBeSwapped;
                }
                if (localIndexToBeSwapped !== -1) {
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

    function openDetailView(name, color, index) {
        if ($scope.appName === "Data") {
            $scope.appName = "Distribute";
        } else if ($scope.appName === "Distribute") {
            $scope.appName = "UserInfo";
        } else if ($scope.appName === "UserInfo") {
            $scope.appName = "Data";
        }
        if ($scope.detailWindows.length < 4 && findWithAttr($scope.detailWindows, "index", index) === -1) {
            $scope.detailWindows.push({
                name: name,
                color: color,
                index: index
            });
            adjustDetailWindowHeights();
        }
    }

    function closeDetailView(index) {
        var realIndex = findWithAttr($scope.detailWindows, "index", index);
        if (realIndex > -1) {
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
});