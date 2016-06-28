var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope,$http) {
    $scope.name = "aper";
    $scope.myFunc = function() {
        $http.get('http://localhost:1200/api/users/add?name=' + $scope.name);
        alert($scope.name);
    }
});