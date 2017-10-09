"use strict";
//TODO: Rename this file and the directives. It's now a custom class
angular.module("ngTouch", [])
    .directive("ngTouchstart", function () {
        return {
            controller: ["$scope", "$element", function ($scope, $element) {

                $element.bind("touchstart", onTouchStart);
                function onTouchStart(event) {
                    event.preventDefault();
                    var method = $element.attr("ng-touchstart");
                    $scope.$event = event;
                    $scope.$apply(method);
                }

            }]
        }
    }).directive("ngTouchmove", function () { //TODO: Rename this to clarify that it aliases mouseover
        return function ($scope, $element) {
            $element.bind("touchmove", onTouchMove);
            function onTouchStart(event) {
                event.preventDefault();
                $element.bind("touchmove", onTouchMove);
                $element.bind("touchend", onTouchEnd);
            }
            function onTouchMove(event) {
                var pageX = event.originalEvent.touches[0].pageX;
                var pageY = event.originalEvent.touches[0].pageY - $(window).scrollTop();
                var hoveredElement = document.elementFromPoint(pageX, pageY);
                var triggerElement = angular.element(hoveredElement).closest("[ng-mouseover]");
                window.xTouch = pageX;
                window.yTouch = pageY;
                triggerElement.trigger('mouseover');
            }
            function onTouchEnd(event) {
                event.preventDefault();
                $element.unbind("touchmove", onTouchMove);
                $element.unbind("touchend", onTouchEnd);
            }
        }
    })
    .directive("ngTouchend", function () {
        return {
            controller: ["$scope", "$element", function ($scope, $element) {

                $element.bind("touchend", onTouchEnd);
                function onTouchEnd(event) {
                    var method = $element.attr("ng-touchend");
                    $scope.$event = event;
                    $scope.$apply(method);
                }

            }]
        }
    })
    .directive("ngTap", function () {
        return {
            controller: ["$scope", "$element", function ($scope, $element) {

                var moved = false;
                $element.bind("touchstart", onTouchStart);
                function onTouchStart(event) {
                    $element.bind("touchmove", onTouchMove);
                    $element.bind("touchend", onTouchEnd);
                }
                function onTouchMove(event) {
                    moved = true;
                }
                function onTouchEnd(event) {
                    $element.unbind("touchmove", onTouchMove);
                    $element.unbind("touchend", onTouchEnd);
                    if (!moved) {
                        var method = $element.attr("ng-tap");
                        $scope.$apply(method);
                    }
                }

            }]
        }
    });