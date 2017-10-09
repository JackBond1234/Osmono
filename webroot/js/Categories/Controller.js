angular.module('index').controller('categoriesController', function($scope, $rootScope){
    //TODO: General clean up
    //TODO: Move drag and drop to a directive and possibly rewrite stuff
    //TODO: Setup JS routing system
    //TODO: With new JS routing system, try to get nav bar to work on Applications
    //TODO: Try to use JS routing system for Details windows
    //Init
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

        var potentialcolors = ["#FFFFFF", "#000000", "#FF0000", "#FF9900", "#FFFF00", "#00FF00", "#0000FF"];
        for(var i = 0; i < 40; i++) {
            $scope.categories.splice(Math.floor(Math.random() * $scope.categories.length), 0, {
                id: i+5,
                name: "Additional Dummy Category",
                balance: Math.round(Math.random() * 100000) / 100,
                color: potentialcolors[Math.floor(Math.random() * potentialcolors.length)]
            });
        }

        $scope.categoriesLoaded = true;
        $scope.$apply();
    }, (Math.random()*3000)+1000);

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
            screenEdgeScrollSpeed = 5;
        }
        if (typeof mouseHeldCategoryIndex !== "undefined") {
            $(mouseHeldCategoryTag).removeClass("category-dragging");
            if (!categoryMovedWhileHeld) {
                $rootScope.$broadcast("openDetail", {
                    name: $scope.categories[mouseHeldCategoryIndex].name,
                    color: $scope.categories[mouseHeldCategoryIndex].color,
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
        var yMouse = $event["clientY"] || window.yTouch;
        if (screenEdgeScrollInterval) {
            clearInterval(screenEdgeScrollInterval);
            screenEdgeInterval(yMouse);
        }
        screenEdgeScrollInterval = setInterval(function() {
            screenEdgeInterval(yMouse);
        }, 40);
    }

    function screenEdgeInterval(yMouse) {
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

    /**
     * @param {int} targetCategoryIndex
     * @param {object} $event
     */
    // $scope.moveCategory = function(targetCategoryIndex, $event) {
        //DONE: Try changing Parents to Closest to prevent errors when dragging by clicking on white space
        //DONE: Unclicking not on a tag causes perma-drag
        //TODO: Make window scroll if dragging toward the bottom of the screen
        //DONE: Swapping more than one element's distance should move intermediate elements along
        //DONE: Make this easier to trigger outside of a directive, i.e. get elements by index, maybe with data tag
        //DONE: Starting drag by clicking border causes JS errors. Investigate parents() call above.
        //DONE: Make sure the active element always takes the top position over the shifting elements
        //DONE: Add shadow to the active element as it's mouse-downed
        //TODO: Add touch drag support on mobile
        //DONE: Prevent touch drag when clicking anything but the grip on mobile. Make sure touch scrolling works
        //TODO: Extend the grip to include the colored left part of the category tag on mobile
        //DONE: Allow dragging the grip image on desktop
        //TODO: Make clicking categories open details view on mobile
        //DONE: Make sure click can broadcast an event
        //DONE: Make sure touch can broadcast the same event
        //DONE: Make sure move broadcasts an event
        // if (typeof activeCategory === "undefined") return;
        // if (swapAnimationInProgress) {
        //     queuedAnimation = {targetCategoryIndex: targetCategoryIndex, $event: $event};
        //     return;
        // }
        // var activeElementWhenFunctionWasCalled = activeElement;
        // var activeCategoryWhenFunctionWasCalled = activeCategory;
        // var indexDistance = targetCategoryIndex - activeCategoryWhenFunctionWasCalled;
        // if (indexDistance === 0 || activeCategory >= $scope.categories.length || activeCategory < 0 || activeCategory+indexDistance >= $scope.categories.length || activeCategory+indexDistance < 0) return;
        // var direction = indexDistance/Math.abs(indexDistance);
        // while (Math.abs(indexDistance) > 1) {
        //     $scope.categories[activeCategoryWhenFunctionWasCalled] = $scope.categories.splice(activeCategoryWhenFunctionWasCalled+direction, 1, $scope.categories[activeCategoryWhenFunctionWasCalled])[0];
        //     activeCategoryWhenFunctionWasCalled += direction;
        //     activeCategory += direction;
        //     indexDistance = targetCategoryIndex - activeCategoryWhenFunctionWasCalled;
        // }
        // setTimeout(function() {
        //     var targetElement = $event.target;
        //     var verticalDistanceBetweenElements = $(targetElement).offset().top - $(activeElementWhenFunctionWasCalled).offset().top;
        //     swapAnimationInProgress = true;
        //     $.when(
        //         $(targetElement).animate({
        //             top: -verticalDistanceBetweenElements
        //         }, 150).promise(),
        //         $(activeElementWhenFunctionWasCalled).animate({
        //             top: verticalDistanceBetweenElements
        //         }, 150).promise()
        //     ).done(function() {
        //         swapAnimationInProgress = false;
        //         $(targetElement).css("top", "");
        //         $(activeElementWhenFunctionWasCalled).css("top", "");
        //         $scope.categories[activeCategoryWhenFunctionWasCalled] = $scope.categories.splice(activeCategoryWhenFunctionWasCalled+direction, 1, $scope.categories[activeCategoryWhenFunctionWasCalled])[0];
        //         if (typeof activeCategory !== "undefined") {
        //             activeCategory += direction;
        //         }
        //         $scope.$apply();
        //         if (typeof queuedAnimation !== "undefined") {
        //             var newTargetCategoryIndex = queuedAnimation.targetCategoryIndex;
        //             var new$event = queuedAnimation.$event;
        //             queuedAnimation = undefined;
        //             if (Math.abs(targetCategoryIndex - activeCategoryWhenFunctionWasCalled) < Math.abs(newTargetCategoryIndex - activeCategoryWhenFunctionWasCalled)) {
        //                 $scope.moveCategory(newTargetCategoryIndex, new$event);
        //             }
        //         }
        //     });
        // }, 0);
    // };

    // var potentialcolors = ["#FF0000", "#FF9900", "#FFFF00", "#00FF00", "#0000FF"];
    // setInterval(function() {
    //     // $scope.categories.splice(Math.floor(Math.random()*$scope.categories.length), 0, {
    //     //     name: "Additional Dummy Category",
    //     //     balance: Math.round(Math.random() * 100000)/100,
    //     //     color: potentialcolors[Math.floor(Math.random()*potentialcolors.length)]
    //     // });
    //     $scope.categories = shuffle($scope.categories);
    //     $scope.$apply();
    // }, 5000);
    //
    // setInterval(function() {
    //     if (Math.random() > 0.5) {
    //         $scope.categories.splice(Math.floor(Math.random() * $scope.categories.length), 0, {
    //             name: "Additional Dummy Category",
    //             balance: Math.round(Math.random() * 100000) / 100,
    //             color: potentialcolors[Math.floor(Math.random() * potentialcolors.length)]
    //         });
    //     } else {
    //         $scope.categories.splice(Math.floor(Math.random() * $scope.categories.length), 1)
    //     }
    //     $scope.$apply();
    // }, 2000);
    //
    // function shuffle(array) {
    //     var currentIndex = array.length, temporaryValue, randomIndex;
    //
    //     // While there remain elements to shuffle...
    //     while (0 !== currentIndex) {
    //
    //         // Pick a remaining element...
    //         randomIndex = Math.floor(Math.random() * currentIndex);
    //         currentIndex -= 1;
    //
    //         // And swap it with the current element.
    //         temporaryValue = array[currentIndex];
    //         array[currentIndex] = array[randomIndex];
    //         array[randomIndex] = temporaryValue;
    //     }
    //
    //     return array;
    // }

    //Listeners

    //Emitters
    $scope.showApplication = function(){
        $rootScope.$broadcast("showMobileApplication", {showing: true});
    }

    //Helper functions
});