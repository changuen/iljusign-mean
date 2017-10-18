angular.module('app')
    .directive('board', ['$http', function ($http) {
        return {
            restrict: 'E',
            controller: [function () {
                var app = this;
            }],
            controllerAs: 'boardCtrl',
            templateUrl: '/directives/board.tpl.html',
            link: function (scope, element, attrs, ctrls) {
                var boardCtrl = ctrls;

                $http.get('/api/board').then(function (result) {
                    if (result.data.success) {
                        boardCtrl.boardData = result.data.boardData;

                    } else {

                    }
                })
            }
        };
    }])
