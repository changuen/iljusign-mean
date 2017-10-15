angular.module('galleryServices',[])
    .factory('gallery', function($http){
        galleryFactory = {};

        //gallery.getContent();
        galleryFactory.getContent = function () {
            return $http.get('/api/gallery');
        }
        return galleryFactory;
    });
