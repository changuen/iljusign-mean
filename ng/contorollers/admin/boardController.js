angular.module('boardController', [])
    .controller('createBoardController', function ($http) {
        var createBoardCtrl = this;
        createBoardCtrl.doWrite = function (boardData) {
            $http.post('/api/board', boardData).then(function (result) {
                console.log(result);
            })
        }
    })
