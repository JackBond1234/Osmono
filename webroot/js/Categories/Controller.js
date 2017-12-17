angular.module('index').controller('categoriesController', function($scope, $rootScope){
    //TODO: Move drag and drop to a directive and possibly rewrite stuff
    //Init
    $scope.categoriesWithOpenDetails = [];
    $scope.categoriesLoaded = false;
    setTimeout(function() {
        $scope.categories = [
            {
                id: 0,
                name: "Dummy Category Groceries",
                balance: 6421.48,
                color: "#FF0000"
            },
            {
                id: 1,
                name: "Dummy Category Insurance",
                balance: 500.00,
                color: "#FF9900"
            },
            {
                id: 2,
                name: "Dummy Category Water Bill",
                balance: 100.99,
                color: "#FFFF00"
            },
            {
                id: 3,
                name: "Dummy Category Fast Food",
                balance: 0.00,
                color: "#00FF00"
            },
            {
                id: 4,
                name: "Dummy Category Savings",
                balance: 12345678.90,
                color: "#0000FF"
            }
        ];

        function componentToHex(c) {
            var hex = c.toString(16);
            return hex.length == 1 ? "0" + hex : hex;
        }

        function rgbToHex(r, g, b) {
            return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
        }
        var potentialcolors = ["#FFFFFF", "#000000", "#FF0000", "#FF9900", "#FFFF00", "#00FF00", "#0000FF"];
        for(var i = 0; i < 40; i++) {
            $scope.categories.splice(Math.floor(Math.random() * $scope.categories.length), 0, {
                id: i+5,
                name: "Additional Dummy Category",
                balance: Math.round(Math.random() * 100000) / 100,
                color: rgbToHex(Math.floor(Math.random()*256), Math.floor(Math.random()*256), Math.floor(Math.random()*256))
                // color: potentialcolors[Math.floor(Math.random() * potentialcolors.length)]
            });
        }

        $scope.categoriesLoaded = true;
        $scope.$apply();
    }, (Math.random()*3000)+1000);

    $scope.buildDynamicCategoryTagStyle = function(color) {
        return {
            'background': [
                '-webkit-linear-gradient(left, ' + color + ' 42px, white 42px)',
                '-moz-linear-gradient(left, ' + color + ' 42px, white 42px)',
                '-ms-linear-gradient(left, ' + color + ' 42px, white 42px)',
                '-o-linear-gradient(left, ' + color + ' 42px, white 42px)',
                'linear-gradient(left, ' + color + ' 42px, white 42px)'
            ]
        }
    };

    var mouseHeldCategoryIndex;
    var categoryMovedWhileHeld = false;
    var mouseHeldCategoryTag;
    var swapAnimationInProgress = false;
    var queuedAnimation;
    $scope.markCategoryAsClickHeld = function(categoryIndex, $event) {
        if (typeof mouseHeldCategoryIndex === "undefined" && ($event.which === 0 || $event.which === 1)) { //0 is touch, 1 is left click
            mouseHeldCategoryIndex = categoryIndex;
            categoryMovedWhileHeld = false;
            mouseHeldCategoryTag = $($event.target).closest('.categories-tag')[0];
            $(mouseHeldCategoryTag).addClass("category-dragging");
        }
    };

    $scope.markCategoryAsClickReleased = function() {
        if (screenEdgeScrollInterval) {
            clearInterval(screenEdgeScrollInterval);
            screenEdgeScrollInterval = undefined;
            screenEdgeScrollSpeed = 5;
        }
        if (typeof mouseHeldCategoryIndex !== "undefined") {
            $(mouseHeldCategoryTag).removeClass("category-dragging");
            if (!categoryMovedWhileHeld) {
                $rootScope.$broadcast("openDetail", {
                    name: $scope.categories[mouseHeldCategoryIndex].name,
                    color: $scope.categories[mouseHeldCategoryIndex].color,
                    id: $scope.categories[mouseHeldCategoryIndex].id,
                    index: mouseHeldCategoryIndex
                });
            }
            mouseHeldCategoryIndex = undefined;
            mouseHeldCategoryTag = undefined;
        }
    };

    var screenEdgeScrollInterval;
    var screenEdgeScrollDirection;
    var screenEdgeScrollSpeed = 5;
    $scope.handleMoveCategoryRequest = function(targetCategoryIndex, $event) {
        if (typeof mouseHeldCategoryIndex !== "undefined" && $($event.target).closest('.categories-tag').length > 0) {
            handleScreenEdgeScrolling($event);

            var targetCategoryTag = $($event.target).closest('.categories-tag')[0];
            animateMoveCategoryToIndex(mouseHeldCategoryIndex, targetCategoryIndex, mouseHeldCategoryTag, targetCategoryTag, function() {
                if (typeof mouseHeldCategoryIndex !== "undefined") {
                    mouseHeldCategoryIndex = targetCategoryIndex;
                }
            });
        }
    };

    function handleScreenEdgeScrolling($event) {
        window.yTouch = $event["clientY"] || window.yTouch;
        if (typeof screenEdgeScrollInterval === "undefined") {
            screenEdgeScrollInterval = setInterval(screenEdgeInterval, 40);
        }
    }

    function screenEdgeInterval() {
        var yMouse = window.yTouch;
        var bodyContent;
        var distanceFromBottom = Math.abs(yMouse - $(window).height());
        var distanceFromTop = yMouse-40;
        if (distanceFromBottom < 50) {
            if (screenEdgeScrollDirection !== "down") {
                screenEdgeScrollSpeed = 5;
                screenEdgeScrollDirection = "down";
            }
            bodyContent = $("#categories-container").find("#body-container").find("#body-content");
            bodyContent.scrollTop(bodyContent.scrollTop() + screenEdgeScrollSpeed);
            screenEdgeScrollSpeed = Math.min(screenEdgeScrollSpeed+0.5, 26-(distanceFromBottom/2));
        } else if (distanceFromTop < 50) {
            if (screenEdgeScrollDirection !== "up") {
                screenEdgeScrollSpeed = 5;
                screenEdgeScrollDirection = "up";
            }
            bodyContent = $("#categories-container").find("#body-container").find("#body-content");
            bodyContent.scrollTop(bodyContent.scrollTop() - screenEdgeScrollSpeed);
            screenEdgeScrollSpeed = Math.min(screenEdgeScrollSpeed+0.5, 26-(distanceFromTop/2));
        } else {
            screenEdgeScrollDirection = "none";
        }
    }

    function animateMoveCategoryToIndex(indexToMove, targetIndex, elementToMove, targetElement, swapAnimationCompleteHandler) {
        if (typeof indexToMove === "number" && typeof targetIndex === "number" && indexToMove !== targetIndex) {
            //TODO: This looks like a side effect I'd like to avoid. It's not really relevant to animating the categories
            //TODO: however logically this seems like the best place for the flag to be flipped. Possibly a sign that a
            //TODO: larger refactor is in order
            categoryMovedWhileHeld = true;
            if (!swapAnimationInProgress) {

                var verticalDistanceBetweenElements = $(targetElement).offset().top - $(elementToMove).offset().top;
                var direction = verticalDistanceBetweenElements / Math.abs(verticalDistanceBetweenElements);
                swapAnimationInProgress = true;
                var animationPromiseArray = [];
                var elementsToShiftOneLength = getElementsToShiftDown(direction, elementToMove, targetElement);
                var animationSpeed = (elementsToShiftOneLength.length > 1 ? 100 : 100);
                $.each(elementsToShiftOneLength, function() {
                    //TODO: Don't rely on these tags always being 45 pixels apart
                    animationPromiseArray.push($(this).animate({
                        top: direction * -45
                    }, animationSpeed).promise());
                });
                animationPromiseArray.push($(elementToMove).animate({
                        top: verticalDistanceBetweenElements
                    }, animationSpeed).promise()
                );
                $.when.apply($, animationPromiseArray).done(function () {
                    $.each(elementsToShiftOneLength, function() {
                        $(this).css("top", "");
                    });
                    $(elementToMove).css("top", "");
                    swapAnimationInProgress = false;
                    moveCategoryToIndex(indexToMove, targetIndex);
                    var oldIndexToMove = indexToMove;
                    indexToMove = targetIndex;
                    $scope.$apply();
                    swapAnimationCompleteHandler();
                    if (typeof queuedAnimation !== "undefined") {
                        var newTargetIndex = queuedAnimation.targetIndex;
                        var newElementToMove = queuedAnimation.elementToMove;
                        var newTargetElement = queuedAnimation.targetElement;
                        var newSwapAnimationCompleteHandler = queuedAnimation.swapAnimationCompleteHandler;
                        queuedAnimation = undefined;
                        if (Math.abs(targetIndex - oldIndexToMove) < Math.abs(newTargetIndex - oldIndexToMove) ||
                            ((targetIndex - oldIndexToMove)/Math.abs(targetIndex - oldIndexToMove)) !== ((newTargetIndex - oldIndexToMove)/Math.abs(newTargetIndex - oldIndexToMove))) {
                            animateMoveCategoryToIndex(indexToMove, newTargetIndex, newElementToMove, newTargetElement, newSwapAnimationCompleteHandler);
                        }
                    }
                })
            } else {
                queuedAnimation = {targetIndex: targetIndex, elementToMove: elementToMove, targetElement: targetElement, swapAnimationCompleteHandler: swapAnimationCompleteHandler};
            }
        }
    }

    function getElementsToShiftDown(direction, elementToMove, targetElement) {
        var targetElementFound;
        var elementsAfterElementToMove;
        var elementsToShiftOneLength = [];
        if (direction > 0) {
            targetElementFound = false;
            elementsAfterElementToMove = $(elementToMove).nextAll();
            elementsAfterElementToMove.each(function() {
                if (targetElementFound === false) {
                    elementsToShiftOneLength.push($(this));
                }
                if ($(this).is(targetElement)) {
                    targetElementFound = true;
                }
            });
        } else {
            targetElementFound = false;
            elementsAfterElementToMove = $(elementToMove).prevAll();
            elementsAfterElementToMove.each(function() {
                if (targetElementFound === false) {
                    elementsToShiftOneLength.push($(this));
                }
                if ($(this).is(targetElement)) {
                    targetElementFound = true;
                }
            });
        }

        return elementsToShiftOneLength;
    }

    function moveCategoryToIndex(indexToMove, targetIndex) {
        if (typeof indexToMove === "number" && typeof targetIndex === "number" && indexToMove !== targetIndex) {
            var indexDifference = targetIndex - indexToMove;
            var direction = indexDifference / Math.abs(indexDifference);
            while (Math.abs(indexDifference) > 0) {
                $scope.categories[indexToMove] = $scope.categories.splice(indexToMove + direction, 1, $scope.categories[indexToMove])[0];
                $rootScope.$broadcast("categorySwap", {indexToSwap: indexToMove, indexToBeSwapped: indexToMove+direction});
                indexToMove += direction;
                indexDifference = targetIndex - indexToMove;
            }
        }
    }

    //Listeners
    $scope.$on("openDetail", function(event, data) {
        if ($scope.categoriesWithOpenDetails.length < 4) {
            $scope.categoriesWithOpenDetails.push(data["id"]);
        }
    });

    $scope.$on("closeDetail", function(event, data) {
        $scope.categoriesWithOpenDetails.splice($scope.categoriesWithOpenDetails.indexOf(data["id"]), 1);
    });

    //Emitters
    $scope.showApplication = function(){
        $rootScope.$broadcast("showMobileApplication", {showing: true});
    }

    //Helper functions
});