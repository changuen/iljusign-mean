angular.module('app')
.directive('fileModel',function($parse){
  return {
    restrict: 'A',
    link: function(scope, element, attrs){
      var parsedFile = $parse(attrs.fileModel);
      var parsedfileSetter = parsedFile.assign;

      element.bind('change',function(){
        scope.$apply(function(){
          parsedfileSetter(scope, element[0].files[0]);
        });
      });
    }
  };
});
