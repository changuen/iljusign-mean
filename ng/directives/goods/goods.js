angular.module('app')
    .directive('goods', ['$http', function ($http) {
        return {
            restrict: 'E',
            controller: [function () {
                var goodsCtrl = this;
            }],
            controllerAs: 'goodsCtrl',
            templateUrl: '/directives/goods/goods.tpl.html',
            link: function (scope, element, attrs, ctrls) {

                console.log("goodsDirective 실행");
                var goodsCtrl = ctrls;

                $http.get('/api/goods').then(function (result) {
                    goodsCtrl.goodsDatas = result.data.goodsData;
                    console.log(goodsCtrl.goodsDatas);
        };
    }]);
