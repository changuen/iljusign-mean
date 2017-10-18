angular.module('boardController', [])
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
