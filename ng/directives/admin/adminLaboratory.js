angular.module('app')
    .directive('adminLaboratory', [function () {
        return {
            restrict: 'E',
            controller: [ function () {
                var app = this;
            }],
            templateUrl: '/directives/admin/adminLaboratory.tpl.html',
            link: function (scope, element, attrs, ctrls) {
                var appCtrl = ctrls;
            }
        };
    }])
