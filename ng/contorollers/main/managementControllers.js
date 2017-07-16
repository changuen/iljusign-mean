angular.module('managementControllers',['adminServices', 'menuServices', 'orderServices'])
.controller('updateTypeCtrl', function($stateParams, Menu, Admin, $state){
  var app = this;
  var item_type = $stateParams.item_type;
  app.data = {
   availableOptions: [
     {id: '0', name: '카테고리를 선택해주세요.'},
   ],
   selectedOption: {id: '0', name: '카테고리를 선택해주세요.'} //This sets the default value of the select in the ui
   };

   Admin.readUpdateType(item_type).then(function(data){
     app.errorMsg = false;
       if(data.data.success){
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
           app.updataData = data.data.result;
           app.data.selectedOption = {
             id : app.updataData.category_id
           };
       } else {
         app.errorMsg = data.data.message;

       }
   });

   this.updateType = function(data){
     app.updateData = data;
     app.updateData.category_id = app.data.selectedOption.id;
     app.updateData.name = app.data.selectedOption.name;
     Admin.updateUpdateType(app.updateData).then(function(data){
       app.errorMsg = false;
       if(data.data.success){
         app.successMsg = data.data.message;
         $state.reload();
       } else {
         app.errorMsg = data.data.message;
       }
     });
   };
})

.controller('readTypeCtrl', function(Admin, $state, $window, Menu){
  var app = this;
    app.data = {
     availableOptions: [
       {id: '0', name: '카테고리를 선택해주세요.'},
     ],
     selectedOption: {id: '0', name: '카테고리를 선택해주세요.'} //This sets the default value of the select in the ui
     };

   this.deleteType = function(data){
     app.errorMsg = false;
     var item_type_id = data.item_type;
     Admin.deleteType(item_type_id).then(function(data){
       if(data.data.success){
         app.successMsg = data.data.message;
         $state.reload();
       } else {
         app.errorMsg = data.data.message;
       }
     });
   };

// 상품 분류표
  Admin.readType().then(function(data){
    if(data.data.success){
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
      app.typeDatas = data.data.result;
      var kindDatas = [];
      for(var i=0; i<data.data.result.length; i++){
          kindDatas[i] = {
              kind: app.typeDatas[i].kind.split(','),
              price: app.typeDatas[i].price.split(',')
          };
          app.typeDatas[i].kind = kindDatas[i].kind;
          app.typeDatas[i].price = kindDatas[i].price;
      }

    } else {
      app.errorMsg = data.data.message;
    }
  });
})

.controller('createTypeCtrl', function(Admin, $state, Menu, $window){
  var app = this;
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
      type_description: data.type,
      kind: app.type_tiny.toString(),
      price: app.type_price.toString()
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

  app.kindList = [];
  app.type_tiny = [];
  app.type_price = [];

  this.addLine = function(kindData){
    if(!kindData){
      $window.alert('정확한 값을 입력해주세요.');
    } else {
      if(kindData.kindValue === null || kindData.kindValue === undefined || kindData.kindValue === '')
      {
        $window.alert('옵션명을 입력해주세요.');
      } else if(kindData.kindPrice === null || kindData.kindPrice === undefined || kindData.kindPrice === ''){
        $window.alert('옵션 가격을 입력해주세요.');
      } else {
        app.kindList.push(
          {
            kind: kindData.kindValue,
            price: kindData.kindPrice
          }
        );
        app.type_tiny.push(kindData.kindValue);
        app.type_price.push(kindData.kindPrice);
      }
    }

  };
})




.controller('itemsCtrl', function(Admin, $state){
  var app = this;
  Admin.readItems().then(function(data){
    app.errorMsg = false;
    if(data.data.success){
      app.itemsData = data.data.result;
      console.log(app.itemsData);
    } else {
      app.errorMsg = data.data.message;
    }
  });

  this.deleteItem = function(data){
    app.errorMsg = false;
    var item_id = data.item_id;
    Admin.deleteItem(item_id).then(function(data){
      if(data.data.success){
        app.successMsg = data.data.message;
        $state.reload();
      } else {
        app.errorMsg = data.data.message;
      }
    });
  };

})

.controller('readItemCtrl', function(Admin, $stateParams, $scope, Order, $window){

    var app = this;
    var item_id = $stateParams.item_id;
    app.data = {
     availableOptions: [
       {id: 0, name: '카테고리를 선택해주세요.'},
     ],
     selectedOption: {id: 0, name: '카테고리를 선택해주세요.'} //This sets the default value of the select in the ui
     };

     app.amount = 1;

    Admin.readItem(item_id).then(function(data){
      if(data.data.success){
        var kind = data.data.result.kind.split(',');
        var temp = data.data.result.price.split(',');
        var price = [];
        for(i=0;i<temp.length;i++){
          price[i] = Number(temp[i]);
        }
        app.itemData = data.data.result;
        app.data.selectedOption = {
          id : price[0]
        };

        for(i=0; i<price.length; i++){
          app.data.availableOptions[i+1] = {
            name: kind[i],
            id: price[i]
          };
        }
      } else {
        app.errorMsg = data.data.message;
      }
    });
})




.controller('updateItemCtrl', function(Admin, $stateParams, $scope, $http, $timeout,  $state, $window, Menu){
  var app = this;
  var item_id = $stateParams.item_id;

         app.data = {
          availableOptions: [
            {id: 0, name: '카테고리를 선택해주세요.'},
          ],
          selectedOption: {id: 0, name: '카테고리를 선택해주세요.'} //This sets the default value of the select in the ui
          };

          app.data2 = {
            availableOptions: [
              {id: 0, name: '카테고리를 선택해주세요.'},
            ],
            selectedOption: {id: 0, name: '카테고리를 선택해주세요.'} //This sets the default value of the select in the ui
          };

          Menu.readMainMenu().then(function(data){
            app.errorMsg = false;
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

          this.readMenu = function(data){
            app.errorMsg = false;
            app.readMenuStatus = false;
            if(data.id === 0){
              $window.alert('카테고리를 선택해주세요.');
            } else {
              var category_id = data.id;
              $http.get('/api/menu/'+category_id).then(function(data){
                if(data.data.success){
    // 초기화 시킴
                  if(data.data.result.length === 0){
                    app.data2 = {
                      availableOptions: [
                        {id: 0, name: '카테고리를 선택해주세요.'},
                      ],
                      selectedOption: {id: 0, name: '카테고리를 선택해주세요.'} //This sets the default value of the select in the ui
                    };
                    $window.alert('등록된 상품이 없습니다.');
                  } else {
                    app.readMenuStatus = true;
    // 초기화 시켜야하는데 어떻게 할까요
                    app.data2 = {
                      availableOptions: [
                        {id: 0, name: '카테고리를 선택해주세요.'},
                      ],
                      selectedOption: {id: 0, name: '카테고리를 선택해주세요.'} //This sets the default value of the select in the ui
                    };
                    var type = data.data.result;
                    for(i=0; i<type.length;i++){
                      app.data2.availableOptions[i+1] = {
                        name: type[i].type_description,
                        id: type[i].item_type_id
                      };
                    }
                  }
                } else {
                  app.errorMsg = data.data.message;

                }

              });
            }
          };

  Admin.readItem(item_id).then(function(data){
    if(data.data.success){
      app.itemData = data.data.result;
      app.data.selectedOption = {
        id : app.itemData.category_id
      };
    } else {
      app.errorMsg = data.data.message;

    }
  });

  this.updateItem = function(data){
    app.errorMsg = false;
    if(app.readMenuStatus){
      if(data.item_type === 0 || data.item_type === '0'){
        $window.alert('상품 분류를 선택해주세요.!');
      } else {
        var updateData = {
          type: data.item_type,
          name: data.name,
        };
        $http.put('/api/item/'+item_id, updateData).then(function(data){
          if(data.data.success){
            app.successMsg = data.data.message;
            $state.reload();
          } else {
            app.errorMsg = data.data.message;
          }
        });
      }
    } else {
        updateData2 = {
          type: app.itemData.item_type_id,
          name: data.name,
        };
        $http.put('/api/item/'+item_id, updateData2).then(function(data){
          if(data.data.success){
            app.successMsg = data.data.message;
            $state.reload();
          } else {
            app.errorMsg = data.data.message;
          }
        });
      }


};


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
                      var updateData = {
                        thumbnail: data.data.filePath
                      };
                      $http.put('/api/item/'+item_id, updateData).then(function(data){
                        if(data.data.success){
                          console.log(data.data.message);
                        } else {
                          console.log(data.data.message);
                        }
                      });
                    } else {
                      $scope.$emit('UNLOAD');
                      app.disabled = false;
                    }
                  });
            }
          };


})



.controller('createItemCtrl', function ($http, $timeout, $scope, Admin, $state, $window, Menu) {
    var app = this;

     app.data = {
      availableOptions: [
        {id: '0', name: '카테고리를 선택해주세요.'},
      ],
      selectedOption: {id: '0', name: '카테고리를 선택해주세요.'} //This sets the default value of the select in the ui
      };

      app.data2 = {
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

      this.readMenu = function(data){
        if(data.id === 0){
          $window.alert('카테고리를 선택해주세요.');
        } else {
          var category_id = data.id;
          $http.get('/api/menu/'+category_id).then(function(data){
            if(data.data.success){
// 초기화 시킴
              if(data.data.result.length === 0){
                app.data2 = {
                  availableOptions: [
                    {id: '0', name: '카테고리를 선택해주세요.'},
                  ],
                  selectedOption: {id: '0', name: '카테고리를 선택해주세요.'} //This sets the default value of the select in the ui
                };
                $window.alert('등록된 상품이 없습니다.');
              } else {
// 초기화 시켜야하는데 어떻게 할까요
                app.data2 = {
                  availableOptions: [
                    {id: '0', name: '카테고리를 선택해주세요.'},
                  ],
                  selectedOption: {id: '0', name: '카테고리를 선택해주세요.'} //This sets the default value of the select in the ui
                };
                var type = data.data.result;
                for(i=0; i<type.length;i++){
                  app.data2.availableOptions[i+1] = {
                    name: type[i].type_description,
                    id: type[i].item_type_id
                  };
                }
              }
            } else {

            }

          });
        }
      };


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
          if(app.data2.selectedOption.id === '0'){
            $scope.$emit('UNLOAD');
            app.disabled = false;
            $window.alert('상품 분류을 선택해주세요.');
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
                type: app.data2.selectedOption.id,
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
