angular.module('bannerController', [])
.controller('uploadBannerCtrl', function($scope,$timeout,$http, $window, $state){
    var app = this;
    this.file = {};

    // 작품 설명 이미지 업로드 되었는지 보여주기
    this.readImage = function(files) {
    $scope.$emit('LOAD');
          if (files.length > 0 && files[0].name.match(/\.(png|jpeg|jpg)$/)) {
              var file = files[0];
              var fileReader = new FileReader();
              fileReader.readAsDataURL(file);
              fileReader.onload = function(e) {
                  $timeout(function() {
                      $scope.$emit('UNLOAD');
                      app.explainThumbnail = {};
                      app.explainThumbnail.dataUrl = e.target.result;
                  });
              };
          } else {
              $scope.$emit('UNLOAD');
              app.explainThumbnail = {};
          }
      };

    // 작품 설명  이미지 업로드해서 경로 저장
    this.uploadBanner = function(){
    // 작품 설명  업로드 여부
      $scope.$emit('LOAD');
      app.explainPhoto = false;
      app.disabled = true;
      var fd = new FormData();
      fd.append('myfile', app.file.upload);
        $http.post('/api/banner/', fd,{
        transformRequest: angular.identity,
        headers: {'Content-Type': undefined}
      }).then(function(data){
        if(data.data.success){
          $scope.$emit('UNLOAD');
          $window.alert(data.data.message);
          $state.reload();
          app.explainPhoto = true;
          app.disabled = false;
        } else {
          $scope.$emit('UNLOAD');
          $window.alert(data.data.message);
          app.disabled = false;
          app.file = {};
        }
        });
      };

    })

    .controller('getBannerCtrl', function($http){
      var app = this;

      $http.get('/api/banner').then(function(result){
        if(result.data.success){
            app.bannerData = result.data.bannerData;
        } else {
          console.log("불러오지 못하였습니다.");
        }
      });
    });
