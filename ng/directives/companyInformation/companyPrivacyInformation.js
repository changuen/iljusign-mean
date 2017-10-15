angular.module('app')
    .directive('companyPrivacyInformation', [function () {
        return {
            restrict: 'E',
            controller: [function () {
                var NameCtrl = this;
            }],
            templateUrl: '/directives/companyInformation/companyPrivacyInformation.tpl.html',
            link: function (scope, element, attrs, ctrls) {
            }
        };
    }]);
