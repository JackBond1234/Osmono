angular.module('index').controller('detailsController', function($scope){
    var bop = 0;
    var a = [[], [1], [1, 4], [1, 2, 4], [1, 2, 3, 4], [2, 3, 4], [2, 4], [4]];
    var b = 0;

    setInterval(function() {
        // bop = (bop + 1) % 5;
        // // $scope.$apply(function() {
        //     $scope.bop = [];
        // // });
        // for(var i = 0; i < bop; i++) {
        //     // $scope.$apply(function() {
        //         $scope.bop.push(i+1);
        //         document.documentElement.style.setProperty("--dynamic-height", (100/$scope.bop.length)+'%');
        //     // });
        // }
        $scope.bop = a[b];
        var style = getComputedStyle(document.body);
        var prevDynamicHeight = style.getPropertyValue('--dynamic-height');
        document.documentElement.style.setProperty("--prev-dynamic-height", prevDynamicHeight);
        if ($scope.bop.length > 0) {
            document.documentElement.style.setProperty("--dynamic-height", (100 / $scope.bop.length) + '%');
        } else {
            document.documentElement.style.setProperty("--dynamic-height", '0');
        }
        b++;
        if (b > 7) {b = 0;}
        $scope.$apply();
    }, 2500);
});