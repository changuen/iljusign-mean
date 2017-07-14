angular.module('managementControllers',['adminServices', 'menuServices'])
.controller('itemTypeCtrl', function(Admin, $state){
  var app = this;
  Admin.readType().then(function(data){
    if(data.data.success){
      app.typeDatas = data.data.result;
    } else {
      app.errorMsg = data.data.message;
    }
  });
})

.controller('createTypeCtrl', function(Admin, $state, $http, Menu){
  var app = this;
  app.kindValue = [];
  app.findList = [];
  app.type_tiny = [];


  app.data = {
   availableOptions: [
     {id: '0', name: '카테고리를 선택해주세요.'},
   ],
   selectedOption: {id: '0', name: '카테고리를 선택해주세요.'} //This sets the default value of the select in the ui
   };

   Menu.readMainMenu().then(function(data){
     if(data.data.success){
       var type = data.data.result;
       for(i=0; i<type.length;i++){
         app.data.availableOptions[i+1] = {
           name: type[i].name,
           id: type[i].category_id
         };
       }
     } else {
       app.errorMsg = data.data.message;
     }
   });


  this.createType = function(data){
    app.errorMsg = false;
    app.typeData = {
      category: app.data.selectedOption.id,
      type1: data.code1,
      type1_description: data.type1,
      type2: data.code2,
      type2_description: data.type2,
      kind: app.type_tiny.toString()
    };

    Admin.createType(app.typeData).then(function(data){
      if(data.data.success){
        app.success = data.data.message;
        $state.reload();
      } else {
        app.errorMsg = data.data.message;
      }

    });
  };
  this.addLine = function(){
    app.findList.push({find: app.kindValue});
    app.type_tiny.push(app.kindValue);
  };
})

.controller('itemsCtrl', function(Admin, $state){
  var app = this;
  Admin.readItems().then(function(data){
    if(data.data.success){
      app.itemsData = data.data.result;
    } else {
    }
  });

})



.controller('itemCtrl', function(Admin, $stateParams, $scope){
  var app = this;
  var item_id = $stateParams.item_id;
  app.data = {
   availableOptions: [
     {id: '0', name: '카테고리를 선택해주세요.'},
   ],
   selectedOption: {id: '0', name: '카테고리를 선택해주세요.'} //This sets the default value of the select in the ui
   };

// 카테고리 타입 가져오기
    Admin.readType().then(function(data){
      if(data.data.success){
        var type = data.data.result;
        for(i=0; i<type.length;i++){
          app.data.availableOptions[i+1] = {
            name: type[i].type1_description+'-'+type[i].type2_description,
            id: type[i].item_type_id
          };
        }
      } else {
        app.errorMsg = data.data.message;
      }
    });

  Admin.readItem(item_id).then(function(data){
    if(data.data.success){
      app.itemData = data.data.result;
      app.data.selectedOption = {
        id : app.itemData.type
      };
    } else {

    }
  });
})





.controller('itemUploadCtrl', function ($http, $timeout, $scope, Admin, $state, $window) {
    var app = this;
    app.data = {
     availableOptions: [
       {id: '0', name: '카테고리를 선택해주세요.'},
     ],
     selectedOption: {id: '0', name: '카테고리를 선택해주세요.'} //This sets the default value of the select in the ui
     };

// 카테고리 타입 가져오기
     Admin.readType().then(function(data){
       if(data.data.success){
         var type = data.data.result;
         for(i=0; i<type.length;i++){
           app.data.availableOptions[i+1] = {
             name: type[i].type1_description+'-'+type[i].type2_description,
             id: type[i].item_type_id
           };
         }
       } else {
         app.errorMsg = data.data.message;
       }
     });

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
          app.mainImagePath = data.data.item_path;
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
          app.explainImagePath = data.data.item_path;
          app.file = {};
        } else {
          $scope.$emit('UNLOAD');
          $window.alert(data.data.message);
          app.disabled = false;
          app.file = {};
        }
        });
      };


// 썸네일 이미지 만들기
      app.myImage='';
      app.myCroppedImage='';

      var handleFileSelect=function(evt) {
        $scope.$emit('LOAD');
        var file=evt.currentTarget.files[0];
        var reader = new FileReader();
        reader.onload = function (evt) {
          $scope.$apply(function($scope){
            $scope.$emit('UNLOAD');
            app.myImage=evt.target.result;
          });
        };
        reader.readAsDataURL(file);
      };
        angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);

        function decodeBase64Image(dataString) {
          var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);

          if (matches.length !== 3) {
            return new Error('Invalid input string');
          } else {
            var file = {
              type : matches[1],
              data : matches[2]
            };
            return file;
          }
        }

// 썸네일 이미지 로컬디스크에 저장 후 저장 위치 가져오기
        this.readCropImage = function(data){
          $scope.$emit('LOAD');
          app.thumbnail = false;
          app.disabled = true;
          if(data.base64Url === '' || data.base64Url === null || data.base64Url === undefined){
            app.disabled = false;
          } else {
                $scope.$emit('UNLOAD');
                var blob = decodeBase64Image($scope.myCroppedImage);
                Admin.readAristCrop(blob).then(function(data){
                  if(data.data.success){
                    $scope.$emit('UNLOAD');
                    $window.alert(data.data.message);
                    app.thumbnail = true;
                    app.disabled = false;
                    app.thumbnailPath = data.data.filePath;
                  } else {
                    $scope.$emit('UNLOAD');
                    app.disabled = false;
                  }
                });
          }
        };



// 작가 작품 업로드
      this.createPhoto = function(uploadData){
        $scope.$emit('LOAD');
        if(uploadData === undefined || uploadData === null || uploadData === ''){
          $window.alert('빈칸을 모두 입력해주세요.');
          app.disabled = false;
            $scope.$emit('UNLOAD');
        } else {
          if(app.data.selectedOption.id === '0'){
            $scope.$emit('UNLOAD');
            app.disabled = false;
            $window.alert('상품 타입을 선택해주세요.');
          } else if(app.mainImagePath === undefined || app.mainImagePath ===  null || app.mainImagePath === ''){
            $scope.$emit('UNLOAD');
            app.disabled = false;
            $window.alert('상품 이미지를 입력해주세요.');
          } else if(uploadData.title === undefined || uploadData.title ===  null || uploadData.title=== ''){
            $scope.$emit('UNLOAD');
            app.disabled = false;
            $window.alert('상품 제목를 입력해주세요.');
          } else if(app.explainImagePath === undefined || app.explainImagePath === null || app.explainImagePath === '') {
            $scope.$emit('UNLOAD');
            app.disabled = false;
            $window.alert('상품 설명 이미지를 업로드해주세요.');
          } else if(app.thumbnailPath === undefined || app.thumbnailPath === null || app.thumbnailPath === '') {
            $scope.$emit('UNLOAD');
            app.disabled = false;
            $window.alert('썸네일 이미지를 업로드해주세요.');
          } else {
              app.uploadData = {
                title: uploadData.title,
                price: uploadData.price,
                type: app.data.selectedOption.id,
                thumbnail: app.thumbnailPath,
                explain: app.explainImagePath,
                image: app.mainImagePath
              };
              Admin.createItem(app.uploadData).then(function(data){
                if(data.data.success){
                  $scope.$emit('UNLOAD');
                  app.disabled = true;
                  $window.alert(data.data.message);
                  $state.reload();
                } else {
                  $scope.$emit('UNLOAD');
                  app.disabled = false;
                  $window.alert(data.data.message);
                }
              });
            }
          }
    };
});
