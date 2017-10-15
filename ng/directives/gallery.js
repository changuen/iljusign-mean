angular.module('app')
    .directive('galleryContent', ['gallery', 'Lightbox', function (gallery, Lightbox) {
        return {
            restrict: 'E',
            controller: [function () {
                var NameCtrl = this;
            }],
            controllerAs: 'galleryCtrl',
            templateUrl: '/directives/gallery.tpl.html',
            link: function (scope, element, attrs, ctrls) {
                //
                var galleryCtrl = ctrls;

                gallery.getContent().then(function(result){
                    if(result.data.success){
                        galleryCtrl.galleryData = result.data.galleryData;
                    } else {
                        galleryCtrl.errorMsg = result.data.message;
                    }
                });

                galleryCtrl.openLightboxModal = function (index) {
                    Lightbox.openModal(galleryCtrl.galleryData, 0);
                };
            }
        };
    }])