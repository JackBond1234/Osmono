angular.module('index').controller('loginController', ["$scope", "$rootScope", "$http", "pathHelper", function($scope, $rootScope, $http, pathHelper) {
    $scope.email = "";
    $scope.password = "";

    $scope.login = function() {
        var email = $scope.email;
        var password = hex_sha512($scope.password);
        $.ajax({
            method: "POST",
            url: pathHelper.build({
                controller: "login",
                action: "login"
            }),
            data: {
                email: email,
                password: password
            },
            success: function(response, status, xhr) {
                console.log("jquery");
                console.log(response);
                console.log(xhr.getResponseHeader('Content-Type'));
            }
        });
    };
}]).config(function($mdThemingProvider) {
    $mdThemingProvider.disableTheming();
});