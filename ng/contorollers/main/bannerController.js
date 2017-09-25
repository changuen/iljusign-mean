angular.module('bannerController', [])
.controller('updateBannerCtrl', function(){

  // 파일의 경로만 저장하기 메인 이미지 만들기
      this.file = {};
  // 메인 작품이미지 업로드 되었는지 보여주기
      this.mainPhotoChanged = function(files) {
      $scope.$emit('LOAD');
            if (files.length > 0 && files[0].name.match(/\.(png|jpeg|jpg)$/)) {
                var file = files[0];
                var fileReader = new FileReader();
                fileReader.readAsDataURL(file);
                fileReader.onload = function(e) {
                    $timeout(function() {
                        $scope.$emit('UNLOAD');
                        app.mainThumbnail = {};
                        app.mainThumbnail.dataUrl = e.target.result;
                    });
                };
            } else {
                $scope.$emit('UNLOAD');
                app.mainThumbnail = {};
            }
        };

  // 메인 작품 이미지 업로드해서 경로 저장
      this.readPhoto = function(){
  // 메인 이미지 업로드 여부
        $scope.$emit('LOAD');
        app.mainPhoto = false;
        app.disabled = true;
        var fd = new FormData();
        fd.append('myfile', app.file.upload);
          $http.post('/api/createPhotoImage/', fd,{
          transformRequest: angular.identity,
          headers: {'Content-Type': undefined}
        }).then(function(data){
          if(data.data.success){
            $scope.$emit('UNLOAD');
            $window.alert(data.data.message);
            app.mainPhoto = true;
            app.disabled = false;
            var updateData = {
              image: data.data.item_path
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
}
