angular.module('app')
    .directive('banner', ['$http', function ($http) {
        return {
            restrict: 'E',
            controller: [ function () {
                var app = this;
            }],
            controllerAs: 'bannerCtrl',
            templateUrl: '/directives/banner.tpl.html',
            link: function (scope, element, attrs, ctrls) {
                var appCtrl = ctrls;


                $http.get('/api/banner').then(function(result){
                    if(result.data.success){
                        console.log(appCtrl.bannerData);
                        appCtrl.bannerData = result.data.bannerData;
                    } else {
                        console.log("불러오지 못하였습니다.");
                    }
                });
            }
        };
    }])

.controller('CarouselCtrl', function ($scope) {
    $scope.myInterval = 2500;
    $scope.noWrapSlides = false;
    $scope.active = 0;
    var slides = $scope.slides = [];
    var currIndex = 0;

    $scope.addSlide = function() {
        var newWidth = 600 + slides.length + 1;
        slides.push({
            image: ['/images/items/banner/1.jpg','/images/items/banner/2.jpg', '/images/items/banner/3.jpg'][slides.length % 3],
            id: currIndex++
        });
    };

    $scope.randomize = function() {
        var indexes = generateIndexesArray();
        assignNewIndexesToSlides(indexes);
    };

    for (var i = 0; i < 3; i++) {
        $scope.addSlide();
    }

    // Randomize logic below

    function assignNewIndexesToSlides(indexes) {
        for (var i = 0, l = slides.length; i < l; i++) {
            slides[i].id = indexes.pop();
        }
    }

    function generateIndexesArray() {
        var indexes = [];
        for (var i = 0; i < currIndex; ++i) {
            indexes[i] = i;
        }
        return shuffle(indexes);
    }

    // http://stackoverflow.com/questions/962802#962890
    function shuffle(array) {
        var tmp, current, top = array.length;

        if (top) {
            while (--top) {
                current = Math.floor(Math.random() * (top + 1));
                tmp = array[current];
                array[current] = array[top];
                array[top] = tmp;
            }
        }

        return array;
    }
});