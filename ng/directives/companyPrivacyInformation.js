angular.module('app')
    .directive('companyPrivacyInformation', [function () {
        return {
            restrict: 'E',
            //  require: ['adminUsers'],
            controller: [function () {
                var NameCtrl = this;
            }],
            controllerAs: 'NameCtrl',
            templateUrl: '/directives/companyPrivacyInformation.tpl.html',
            link: function (scope, element, attrs, ctrls) {
                //
            }
        };
    }]);
