var index = angular.module("index", ["ngAnimate", "ngRoute", "ngTouch", "ngMaterial"]);

index.service("pathHelper", function($window) {
    this.build = function (routeDescription, queryParameters) {
        var path = $window["basePath"];

        if (typeof routeDescription === "string") {
            path += routeDescription;
        } else if (typeof routeDescription === "object") {
            if (typeof routeDescription["prefix"] !== "undefined") {
                path += getAppropriateSlash(path);
                path += routeDescription["prefix"];
            }
            if (typeof routeDescription["controller"] !== "undefined") {
                path += getAppropriateSlash(path);
                path += routeDescription["controller"].charAt(0).toUpperCase() + routeDescription["controller"].slice(1);
            }
            if (typeof routeDescription["action"] !== "undefined") {
                path += getAppropriateSlash(path);
                path += routeDescription["action"];
            }
        }
        if (typeof queryParameters === "object") {
            var parameterKeys = Object.keys(queryParameters);
            for (var j = 0; j < parameterKeys.length; j++) {
                path += getAppropriateParamMark(path);
                path += parameterKeys[i] + "=" + queryParameters[parameterKeys[i]];
            }
        }
        if (path.indexOf("?") === -1) {
            path += "?";
        }
        return path;
    };

    function getAppropriateParamMark(url) {
        if (url.indexOf("?") > -1) {
            return "&";
        }
        return "?";
    }

    function getAppropriateSlash(url) {
        if (url.slice(url.length-1) === "/") {
            return "";
        }
        return "/";
    }
});

index.service("popupHelper", ["pathHelper", function(pathHelper) {
    this.presets = {
        DEFAULT: "popupDefaultStyle",
        SUCCESS: "popupSuccessStyle",
        ALERT: "popupAlertStyle",
        WARNING: "popupWarningStyle",
        FAIL: "popupFailStyle",
        CONFIRM: "popupConfirmStyle"
    };

    this.show = function(options) {
        var self = this;
        options = $.extend({}, {
            title: "Alert",
            content: "",
            classes: "",
            preset: this.presets.DEFAULT,
            affirmativeText: undefined,
            negativeText: undefined,
            closeCallback: undefined,
            styleOverride: undefined
        }, options);

        if (!Object.keys(this.presets).find(function(key) { return self.presets[key] === options.preset; })) {
            options.preset = this.presets.DEFAULT;
        }
        if (options.preset === this.presets.CONFIRM) {
            options.affirmativeText = options.affirmativeText || "Yes";
        }

        var body = $("body");
        body.css("overflow", "hidden");

        var backdrop = $("<div>");
        backdrop.addClass("popupBackdrop");
        body.append(backdrop);

        var popupContainer = $("<div>");
        popupContainer.addClass("popupContainer");
        body.append(popupContainer);

        var popup = $("<div>");
        popup.addClass("popup");
        popup.addClass(options.classes);
        popup.addClass(options.preset);
        if (typeof options.styleOverride !== "undefined") {
            popup.css(options.styleOverride);
        }
        popupContainer.append(popup);

        var titleBar = $("<div>");
        titleBar.addClass("titleBar");
        popup.append(titleBar);

        var middleSpace = $("<div>");
        middleSpace.addClass("middle");
        titleBar.append(middleSpace);

        var popupTitle = $("<div>");
        popupTitle.addClass("left");
        popupTitle.text(options.title);
        titleBar.append(popupTitle);

        var closeButton = $("<div>");
        closeButton.addClass("right");
        closeButton.addClass("popupClose");
        closeButton.on("click", function() { closePopup(false); });
        titleBar.append(closeButton);

        var closeImage = $("<img>");
        closeImage.attr("src", pathHelper.build("img/x.svg"));
        closeButton.append(closeImage);

        var popupBody = $("<div>");
        popupBody.addClass("popupBody");
        popup.append(popupBody);

        var popupContent = $("<div>");
        popupContent.addClass("popupContent");
        popupContent.html(options.content);
        popupBody.append(popupContent);

        if (options.preset !== this.presets.DEFAULT) {
            var buttonContainer = $("<div>");
            buttonContainer.addClass("buttonContainer");
            popup.append(buttonContainer);

            if (options.preset === this.presets.CONFIRM) {
                var noButton = $("<button>");
                noButton.text(options.negativeText || "No");
                noButton.on("click", function() { closePopup(false); });
                buttonContainer.append(noButton);
            }

            var yesButton = $("<button>");
            yesButton.text(options.affirmativeText || "Ok");
            yesButton.on("click", function() { closePopup(true); });
            buttonContainer.append(yesButton);
        }

        setTimeout(function() {
            popup.addClass("transitionIn");
            backdrop.addClass("transitionIn");
        });

        var closePopup = function(response) {
            popup.addClass("transitionOut");
            backdrop.addClass("transitionOut");
            popup.on("transitionend", function() {
                if (typeof options.closeCallback === "function") {
                    options.closeCallback(response);
                }
                backdrop.remove();
                popupContainer.remove();
            });
        };

        popup.data("closePopup", closePopup);
    }
}]);

index.directive("ngStyleArray", function() {
    return {
        link: function(scope, element, attr) {
            scope.$watch(attr.ngStyleArray, function ngStyleArrayWatchAction(newStyles, oldStyles) {
                if (oldStyles && (newStyles !== oldStyles)) {
                    element.attr("style", "");
                    $.each(oldStyles, function(val, style) { element.css(style, '');});
                }
                var newStyleKeys = Object.keys(newStyles);
                for (var i = 0; i < newStyleKeys.length; i++) {
                    if (typeof newStyles[newStyleKeys[i]] === "object") {
                        var newStyleString = element.attr("style") || "";
                        for (var j = 0; j < newStyles[newStyleKeys[i]].length; j++) {
                            if (newStyleString.length !== 0) {
                                newStyleString += "; ";
                            }
                            newStyleString += newStyleKeys[i] + ": " + newStyles[newStyleKeys[i]][j];
                        }
                        element.attr("style", newStyleString);
                    } else {
                        element.css(newStyleKeys[i], newStyles[newStyleKeys[i]]);
                    }
                }
            }, true);
        }
    }
});

//Make a dedicated file for some/all of the stuff below
index.config(function ($controllerProvider, $animateProvider) {
    index.controller = $controllerProvider.register;
    $animateProvider.classNameFilter(/^(?:(?!ng-animate-disabled).)*$/);
});

function uniqid (prefix, more_entropy) {
    if (typeof prefix === 'undefined') {
        prefix = "";
    }
    var retId;
    var formatSeed = function (seed, reqWidth) {
        seed = parseInt(seed, 10).toString(16);
        if (reqWidth < seed.length) {
            return seed.slice(seed.length - reqWidth);
        }
        if (reqWidth > seed.length) {
            return Array(1 + (reqWidth - seed.length)).join('0') + seed;
        }
        return seed;
    };
    if (!this.php_js) {
        this.php_js = {};
    }
    if (!this.php_js.uniqidSeed) {
        this.php_js.uniqidSeed = Math.floor(Math.random() * 0x75bcd15);
    }
    this.php_js.uniqidSeed++;

    retId = prefix;
    retId += formatSeed(parseInt(new Date().getTime() / 1000, 10), 8);
    retId += formatSeed(this.php_js.uniqidSeed, 5);
    if (more_entropy) {
        retId += (Math.random() * 10).toFixed(8).toString();
    }

    return retId;
}

index.factory('clickAnywhereButHereService', function($document){
    var tracker = [];

    return function($scope, expr, elem) {
        var i, t, len;
        for(i = 0, len = tracker.length; i < len; i++) {
            t = tracker[i];
            if(t.expr === expr && t.scope === $scope) {
                return t;
            }
        }
        var handler = function(e) {
            if (e.target !== elem[0]) {
                $scope.$apply(expr);
            }
        };

        $document.on('click', handler);

        // IMPORTANT! Tear down this event handler when the scope is destroyed.
        $scope.$on('$destroy', function(){
            $document.off('click', handler);
        });

        t = { scope: $scope, expr: expr };
        tracker.push(t);
        return t;
    };
});

index.directive('clickAnywhereButHere', function($document, clickAnywhereButHereService){
    return {
        restrict: 'A',
        link: function(scope, elem, attr) {
            clickAnywhereButHereService(scope, attr.clickAnywhereButHere, elem);
        }
    };
});

index.factory('unClickAnywhereButHereService', function($document){
    var tracker = [];

    return function($scope, expr) {
        var i, t, len;
        for(i = 0, len = tracker.length; i < len; i++) {
            t = tracker[i];
            if(t.expr === expr && t.scope === $scope) {
                return t;
            }
        }
        var handler = function() {
            $scope.$apply(expr);
        };

        $document.on('mouseup', handler);

        // IMPORTANT! Tear down this event handler when the scope is destroyed.
        $scope.$on('$destroy', function(){
            $document.off('mouseup', handler);
        });

        t = { scope: $scope, expr: expr };
        tracker.push(t);
        return t;
    };
});

index.directive('unClickAnywhereButHere', function($document, unClickAnywhereButHereService){
    return {
        restrict: 'A',
        link: function(scope, elem, attr) {
            var handler = function(e) {
                e.stopPropagation();
            };
            elem.on('mouseup', handler);

            scope.$on('$destroy', function(){
                elem.off('mouseup', handler);
            });

            unClickAnywhereButHereService(scope, attr["unClickAnywhereButHere"]);
        }
    };
});

index.directive('passThroughData', function(){
    return {
        restrict: "A",
        link: function(scope, element, attr){
            scope.$eval(attr["passThroughData"], {element: element});
        }
    };
});
