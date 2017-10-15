angular.module('app')
    .directive('terms', [function () {
        return {
            restrict: 'E',
            controller: [ function () {
                var app = this;
            }],
            templateUrl: '/directives/main/terms.tpl.html',
            link: function (scope, element, attrs, ctrls) {
                var appCtrl = ctrls;
            }
        };
    }])
