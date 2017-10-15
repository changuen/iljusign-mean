angular.module('app')
.directive('match',function(){
  return {
    restrict: 'A',
    controller:function($scope){
      $scope.doConfirm = function(values){

        $scope.confirmed = false;
        values.forEach(function(ele){
          if($scope.confirm == ele){
            $scope.confirmed = true;
          }else {
            $scope.confirmed = false;
          }
        });
      };
    },

    link:function(scope, element, attrs){
      attrs.$observe('match', function(){
        scope.matches = JSON.parse(attrs.match);
        scope.doConfirm(scope.matches);
      });

      scope.$watch('confirm', function(){
        scope.matches = JSON.parse(attrs.match);
        scope.doConfirm(scope.matches);

      });
    }
  };
});
