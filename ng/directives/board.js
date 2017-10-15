angular.module('app')
    .directive('board', [function () {
        return {
            restrict: 'E',
            controller: [function () {
                var app = this;
            }],
            controllerAs: 'boardCtrl',
            templateUrl: '/directives/board.tpl.html',
            link: function (scope, element, attrs, ctrls) {
                var boardCtrl = ctrls;
                boardCtrl.writeArticle = function () {
                    console.log("작동 중입니다.");
                }
            }
        };
    }])
