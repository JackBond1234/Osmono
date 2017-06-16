angular.module('index').controller('applicationController', function($scope, $rootScope){
    $scope.hideMobileApplication = function(){
        $rootScope.$broadcast("showMobileApplication", {showing: false});
    }
});