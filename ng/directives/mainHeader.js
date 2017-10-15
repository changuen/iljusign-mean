angular.module('app')
    .directive('mainHeader', [function () {
        return {
            restrict: 'E',
            controller: [ function () {
                var app = this;
            }],
            controllerAs: 'bannerCtrl',
            templateUrl: '/directives/mainHeader.tpl.html',
            link: function (scope, element, attrs, ctrls) {
                var appCtrl = ctrls;
            }
        };
    }])
