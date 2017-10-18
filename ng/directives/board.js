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
                        var date = moment(boardCtrl.boardData[0].created, 'YYYY-MM-DD');
                        console.log(date.format('YYYY-MM-DD'));
                    } else {

                    }
                })
            }
        };
    }])

    .controller('createBoardController', function ($http, $state) {
        var createBoardCtrl = this;
        createBoardCtrl.doWrite = function (boardData) {
            $http.post('/api/board', boardData).then(function (result) {
                if (result.data.success) {
                    $state.go('app.board');
                } else {
                    console.log(result.data.message);
                }
            })
        }
    })

    .controller('readBoardController', function ($stateParams, $state, $http) {
        var readBoardCtrl = this;
        var article_id = $stateParams.article_id;

            $http.get('/api/board/'+article_id).then(function (result) {
                readBoardCtrl.articleData = result.data.articleData;
            })
    });