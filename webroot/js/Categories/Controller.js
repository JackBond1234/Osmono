angular.module('index').controller('categoriesController', function($scope, $rootScope){
    $scope.showApplication = function(){
        $rootScope.$broadcast("showMobileApplication", {showing: true});
    }
});