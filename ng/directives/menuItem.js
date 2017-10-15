angular.module('app')
    .directive('menuItem', ['Menu', function (Menu) {
        return {
            restrict: 'E',
            controller: [function () {
                var app = this;
            }],
            controllerAs: 'menuItemCtrl',
            templateUrl: '/directives/menuItem.tpl.html',
            link: function (scope, element, attrs, ctrls) {
                var menuItemCtrl = ctrls;
                Menu.readMainMenu().then(function(data){
                    if(data.data.success){
                        menuItemCtrl.mainMenues = data.data.result;
                    } else {
                        menuItemCtrl.errorMsg = data.data.message;
                    }
                });

            }
        };
    }])