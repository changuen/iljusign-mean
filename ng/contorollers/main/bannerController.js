angular.module('bannerController', [])
.controller('uploadBannerCtrl', function($scope,$timeout,$https){
var app = this;
this.file = {};

// 작품 설명 이미지 업로드 되었는지 보여주기
this.explainPhotoChanged = function(files) {
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
this.readPhotoExplain = function(){
// 작품 설명  업로드 여부
  $scope.$emit('LOAD');
  app.explainPhoto = false;
  app.disabled = true;
  var fd = new FormData();
  fd.append('myfile', app.file.upload);
    $http.post('/api/createPhotoExplain/', fd,{
    transformRequest: angular.identity,
    headers: {'Content-Type': undefined}
  }).then(function(data){
    if(data.data.success){
      $scope.$emit('UNLOAD');
      $window.alert(data.data.message);
      app.explainPhoto = true;
      app.disabled = false;
      var updateData = {
        explain: data.data.item_path
      };
      $http.put('/api/item/'+item_id, updateData).then(function(data){
        if(data.data.success){
          console.log(data.data.message);
        } else {
          console.log(data.data.message);
        }
      });
      app.file = {};
    } else {
      $scope.$emit('UNLOAD');
      $window.alert(data.data.message);
      app.disabled = false;
      app.file = {};
    }
    });
  };

  this.createBanner = function(date){
      console.log("버튼 작동");
  };
});
