angular.module('app')
    .directive('comment', ['$http', '$state', '$stateParams', function ($http, $state, $stateParams) {
        return {
            restrict: 'E',
            controller: [function () {
                var app = this;
            }],
            controllerAs: 'commentCtrl',
            templateUrl: '/directives/comment.tpl.html',
            link: function (scope, element, attrs, ctrls) {
                var commentCtrl = ctrls;
                console.log($stateParams);

                commentCtrl.writeCommet = function (comment) {
                    commentData = {
                        boardId: $stateParams.article_id,
                        comment: comment
                    };

                    $http.post('/api/comment', commentData).then(function (result) {
                        $state.reload();
                        console.log(result);
                    })
                }

                $http.get('/api/comment/'+ $stateParams.article_id).then(function (result) {
                    console.log(result);
                    commentCtrl.commentData = result.data.commentData;
                })
            }
        };
    }]);
