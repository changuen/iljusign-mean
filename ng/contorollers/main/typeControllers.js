angular.module('typeControllers', ['adminServices', 'menuServices', 'orderServices'])
.controller('updateItemTypeCtrl', function($stateParams, Menu, Admin, $state){
  var app = this;
  var item_id = $stateParams.item_id;
  app.data = {
   availableOptions: [
     {id: '0', name: '카테고리를 선택해주세요.'},
   ],
   selectedOption: {id: '0', name: '카테고리를 선택해주세요.'} //This sets the default value of the select in the ui
   };



   Admin.readUpdateItemType(item_id).then(function(data){
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

           var splitOptionDatas = {
                   kind: app.updataData.kind.split(','),
                   price: app.updataData.price.split(',')
               };

           app.optionDatas = [];

           for(i=0; i < splitOptionDatas.kind.length; i++){
             app.optionDatas[i] = {
               kind: splitOptionDatas.kind[i],
               price:  splitOptionDatas.price[i],
             };
           }

       } else {
         app.errorMsg = data.data.message;

       }
   });

   this.updateType = function(data){
     app.updateData = data;
     app.updateData.category_id = app.data.selectedOption.id;
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

   this.updateitemType = function(data){
     var kindArray = [];
     var priceArray = [];
     for(i=0;i<app.optionDatas.length;i++){
       kindArray.push(app.optionDatas[i].kind);
       priceArray.push(app.optionDatas[i].price);
     }
     var updateData = {
       item_id: data.item_id,
       item_name: data.item_name,
       price: priceArray.toString(),
       kind: kindArray.toString()
     };

     Admin.updateItemType(updateData).then(function(data){
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

.controller('readItemTypeCtrl', function(Admin, $state, $window, Menu){
  var app = this;
    app.data = {
     availableOptions: [
       {id: '0', name: '카테고리를 선택해주세요.'},
     ],
     selectedOption: {id: '0', name: '카테고리를 선택해주세요.'} //This sets the default value of the select in the ui
     };


     this.copyItemType = function(data){

       var itemData = {
         type: data.item_type_id,
         title: data.item_name,
         kind: data.kind.toString(),
         price: data.price.toString()

       };



     Admin.createItem(itemData).then(function(data){
       app.errorMsg = false;
       if(data.data.success){
         app.successMsg = data.data.message;
         $state.reload();
       } else {
         app.errorMsg = data.data.message;
       }
     });
   };

   this.deleteType = function(data){
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

// 상품 분류표
  Admin.readItemType().then(function(data){
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


// 상품 분류표
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

// 상품 분류표
.controller('readTypeCtrl', function(Admin, $state, $window, Menu){
  var app = this;
    app.data = {
     availableOptions: [
       {id: '0', name: '카테고리를 선택해주세요.'},
     ],
     selectedOption: {id: '0', name: '카테고리를 선택해주세요.'} //This sets the default value of the select in the ui
     };

    this.copyType = function(data){
      var typeData = {
        category: data.category_id,
        type_description: data.type_description,
        type_code: data.type_code
      };
      Admin.createType(typeData).then(function(data){
        app.errorMsg = false;
        if(data.data.success){
          app.successMsg = data.data.message;
          $state.reload();
        } else {
          app.errorMsg = data.data.message;
        }
      });
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

    } else {
      app.errorMsg = data.data.message;
    }
  });
})

// 상품 분류표
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
      type_description: data.type_description,
      type_code: data.type_code
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
});
