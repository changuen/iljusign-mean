angular.module('typeControllers',['orderServices'])
.controller('getTypeItemsCtrl', function ($stateParams, $http) {
  var app = this;

  var category_id = $stateParams.category_id;
  if(!$stateParams.type_code){
    $http.get('/api/item_type/'+category_id).then(function(data){
      if(data.data.success){
        if(data.data.result.length === 0 ){
          app.errorMsg = '등록된 상품이 없습니다.';
        } else {
          app.itemsData = data.data.result;
        }
      } else {
        app.errorMsg = data.data.message;
      }
    });
  } else {
    var type_code =  $stateParams.type_code;
    $http.get('/api/item_type/'+category_id,
    {  params: {type_code : type_code }}
  ).then(function(data){
      if(data.data.success){
        if(data.data.result.length === 0 ){
          app.errorMsg = '등록된 상품이 없습니다.';
        } else {
          app.itemsData = data.data.result;
        }
      } else {
        app.errorMsg = data.data.message;
      }
    });
  }

})


.controller('getTypeItemCtrl', function(Admin, $stateParams, $window, $state, Order){
  var app = this;
  var item_id = $stateParams.item_id;
  app.data = {
   availableOptions: [
     {id: '0', name: '카테고리를 선택해주세요.'},
   ],
   selectedOption: {id: '0', name: '카테고리를 선택해주세요.'} //This sets the default value of the select in the ui
   };

   app.amount = 1;

  this.createBasket = function(data){
    var basketData = {
      item_id: data.item_id,
    };
    Order.createBasket(basketData).then(function(data){
      if(data.data.success){
        $window.alert(data.data.message);
      } else {
        $window.alert(data.data.message);
      }
    });
  };

  this.createOrder = function(data){

    var orderData = {
      item_id: data.item_id,
      amount: data.amount,
      kind_of: data.kind_of,
      price: data.price
    };

    Order.createOrder(orderData).then(function(data){
        if(data.data.success){
          app.successMsg = data.data.message;
          $state.go('app.makeOrder');
        } else {
          app.errorMsg = data.data;
        }
      });

  };

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
        id : price[0],
        name: kind[0]
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

});
