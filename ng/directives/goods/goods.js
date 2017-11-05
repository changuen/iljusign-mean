angular.module('app')
    .directive('goodsItems', [function () {
        return {
            restrict: 'E',
            controller: [function () {
                var goods = this;
            }],
            templateUrl: '/directives/goods/goods.tpl.html',
            link: function (scope, element, attrs, ctrls) {
                var goodsCtrl = ctrls;

                $http.get('/api/goods').then(function (result) {
                    console.log(result);
                })
            }
        };
    }]);
