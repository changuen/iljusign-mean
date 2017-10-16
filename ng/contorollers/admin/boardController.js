angular.module('boardController', [])
    .controller('createBoardController', function($http){
        var createBoardCtrl = this;
        createBoardCtrl.doWrite  = function (boardData) {
            console.log(boardData);
        }
    });
