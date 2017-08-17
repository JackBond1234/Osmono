angular.module('index').controller('categoriesController', function($scope, $rootScope){
    //Init
    $scope.categoriesLoaded = false;
    setTimeout(function() {
        $scope.categories = [
            {
                name: "Dummy Category Groceries",
                balance: 6421.48,
                color: "#FF0000"
            },
            {
                name: "Dummy Category Insurance",
                balance: 500.00,
                color: "#FF9900"
            },
            {
                name: "Dummy Category Water Bill",
                balance: 100.99,
                color: "#FFFF00"
            },
            {
                name: "Dummy Category Fast Food",
                balance: 0.00,
                color: "#00FF00"
            },
            {
                name: "Dummy Category Savings",
                balance: 12345678.90,
                color: "#0000FF"
            }
        ];
        $scope.categoriesLoaded = true;
    }, (Math.random()*3000)+1000);

    var potentialcolors = ["#FF0000", "#FF9900", "#FFFF00", "#00FF00", "#0000FF"];
    setInterval(function() {
        // $scope.categories.splice(Math.floor(Math.random()*$scope.categories.length), 0, {
        //     name: "Additional Dummy Category",
        //     balance: Math.round(Math.random() * 100000)/100,
        //     color: potentialcolors[Math.floor(Math.random()*potentialcolors.length)]
        // });
        $scope.categories = shuffle($scope.categories);
        $scope.$apply();
    }, 5000);

    setInterval(function() {
        if (Math.random() > 0.5) {
            $scope.categories.splice(Math.floor(Math.random() * $scope.categories.length), 0, {
                name: "Additional Dummy Category",
                balance: Math.round(Math.random() * 100000) / 100,
                color: potentialcolors[Math.floor(Math.random() * potentialcolors.length)]
            });
        } else {
            $scope.categories.splice(Math.floor(Math.random() * $scope.categories.length), 1)
        }
        $scope.$apply();
    }, 2000);

    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    //Listeners

    //Emitters
    $scope.showApplication = function(){
        $rootScope.$broadcast("showMobileApplication", {showing: true});
    }

    //Helper functions
});