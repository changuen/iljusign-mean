angular.module('app')
.controller('mainMenuController', function ($http, $scope) {
  $http.get('/api/header').then(function(response){
    $scope.headers = response.data;
  });
});
