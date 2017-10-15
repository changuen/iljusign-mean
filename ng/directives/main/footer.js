angular.module('app')
    .directive('footer', [function () {
        return {
            restrict: 'E',
            controller: [ function () {
                var app = this;
            }],
            templateUrl: '/directives/main/footer.tpl.html',
            link: function (scope, element, attrs, ctrls) {
                var appCtrl = ctrls;
            }
        };
    }])
