angular.module('app')
    .directive('userQuickMenu', [function () {
        return {
            restrict: 'E',
            controller: [function () {
                var NameCtrl = this;
            }],
            templateUrl: '/directives/companyInformation/userQuickMenu.tpl.html',
            link: function (scope, element, attrs, ctrls) {
            }
        };
    }]);
