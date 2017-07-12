angular.module('contentControllers',[])
.controller('getTypeItemsCtrl', function ($stateParams, $http) {
  var app = this;
  var type = $stateParams.type;
  $http.get('/api/item_type/'+type).then(function(data){
    if(data.data.success){
      app.itemsData = data.data.result;
      console.log(app.itemsData);
    } else {
    }
  });
})


.controller('getTypeItemCtrl', function(Admin, $stateParams, $scope){
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
      console.log(app.itemData);
      app.data.selectedOption = {
        id : app.itemData.type
      };
    } else {

    }
  });
});
