angular.module('app', [
    'ui.router',
    'ui.bootstrap',
    'menuControllers',
    'userControllers',
    'mainControllers',
    'emailControllers',
    'managementControllers',
    'itemControllers',
    'typeControllers',
    'orderControllers',
    'uiCropper',
    'bannerController',
    'galleryServices',
    'bootstrapLightbox',
    'boardController'
]).config(function ($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptors');
});
