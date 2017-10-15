angular.module('app')
    .directive('adminRequestedOrder', [function () {
        return {
            restrict: 'E',
            controller: [ function () {
                var app = this;
            }],
            templateUrl: '/directives/admin/adminPersonalOrder.tpl.html',
            link: function (scope, element, attrs, ctrls) {
                var appCtrl = ctrls;
            }
        };
    }])
