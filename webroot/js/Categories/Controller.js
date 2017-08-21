angular.module('index').controller('categoriesController', function($scope, $rootScope){
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

        var potentialcolors = ["#FF0000", "#FF9900", "#FFFF00", "#00FF00", "#0000FF"];
        for(var i = 0; i < 40; i++) {
            $scope.categories.splice(Math.floor(Math.random() * $scope.categories.length), 0, {
                id: i+5,
                name: "Additional Dummy Category",
                balance: Math.round(Math.random() * 100000) / 100,
                color: potentialcolors[Math.floor(Math.random() * potentialcolors.length)]
            });
        }

        $scope.categoriesLoaded = true;
    }, (Math.random()*3000)+1000);

    var mouseHeldCategoryIndex;
    var mouseHeldCategoryTag;
    var swapAnimationInProgress = false;
    var queuedAnimation;
    $scope.markCategoryAsClickHeld = function(categoryIndex, $event) {
        if (typeof mouseHeldCategoryIndex === "undefined") {
            mouseHeldCategoryIndex = categoryIndex;
            mouseHeldCategoryTag = $($event.target).closest('.categories-tag')[0];
            //TODO: Accomplish this through real CSS and not inline
            $(mouseHeldCategoryTag).css("z-index", 100);
            $(mouseHeldCategoryTag).css("box-shadow", "0 4px 4px #000000");
        }
    };

    $scope.markCategoryAsClickReleased = function() {
        if (typeof mouseHeldCategoryIndex !== "undefined") {
            //TODO: Accomplish this through real CSS and not inline
            $(mouseHeldCategoryTag).css("z-index", "");
            $(mouseHeldCategoryTag).css("box-shadow", "");
            mouseHeldCategoryIndex = undefined;
            mouseHeldCategoryTag = undefined;
        }
    };


    $scope.handleMoveCategoryRequest = function(targetCategoryIndex, $event) {
        if (typeof mouseHeldCategoryIndex !== "undefined" && $($event.target).closest('.categories-tag').length > 0) {
            var targetCategoryTag = $($event.target).closest('.categories-tag')[0];
            animateMoveCategoryToIndex(mouseHeldCategoryIndex, targetCategoryIndex, mouseHeldCategoryTag, targetCategoryTag, function() {
                if (typeof mouseHeldCategoryIndex !== "undefined") {
                    mouseHeldCategoryIndex = targetCategoryIndex;
                }
            });
        }
    };

    function animateMoveCategoryToIndex(indexToMove, targetIndex, elementToMove, targetElement, swapAnimationCompleteHandler) {
        if (typeof indexToMove === "number" && typeof targetIndex === "number" && indexToMove !== targetIndex) {
            if (!swapAnimationInProgress) {
                var verticalDistanceBetweenElements = $(targetElement).offset().top - $(elementToMove).offset().top;
                var direction = verticalDistanceBetweenElements / Math.abs(verticalDistanceBetweenElements);
                swapAnimationInProgress = true;
                var animationPromiseArray = [];
                var elementsToShiftOneLength = getElementsToShiftDown(direction, elementToMove, targetElement);
                var animationSpeed = (elementsToShiftOneLength.length > 1 ? 150 : 150);
                $.each(elementsToShiftOneLength, function() {
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
        //TODO: Unclicking not on a tag causes perma-drag
        //TODO: Make window scroll if dragging toward the bottom of the screen
        //DONE: Swapping more than one element's distance should move intermediate elements along
        //DONE: Make this easier to trigger outside of a directive, i.e. get elements by index, maybe with data tag
        //DONE: Starting drag by clicking border causes JS errors. Investigate parents() call above.
        //DONE: Make sure the active element always takes the top position over the shifting elements
        //DONE: Add shadow to the active element as it's mouse-downed
        //TODO: Add touch drag support on mobile
        //TODO: Prevent touch drag when clicking anything but the grip on mobile. Make sure touch scrolling works
        //TODO: Make sure click can broadcast an event
        //TODO: Make sure touch can broadcast the same event
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