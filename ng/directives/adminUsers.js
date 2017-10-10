angular.module('app')
.directive('adminUsers', [function () {
   return {
       restrict: 'E',
      //  require: ['adminUsers'],
       controller: [function () {
           var NameCtrl = this;
       }],
       controllerAs: 'NameCtrl',
       templateUrl: '/directives/adminUsers.tpl.html',
       link: function (scope, element, attrs, ctrls) {
           //
       }
   };
}]);
