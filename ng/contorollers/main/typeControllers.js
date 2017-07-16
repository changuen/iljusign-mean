angular.module('typeControllers',['orderServices'])
.controller('getTypeItemsCtrl', function ($stateParams, $http) {
  var app = this;

  var category_id = $stateParams.category_id;
  if(!$stateParams.type_code){
    $http.get('/api/item_type/'+category_id).then(function(data){
      if(data.data.success){
        app.itemsData = data.data.result;
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
        app.itemsData = data.data.result;
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
  this.plus = function(){
    app.amount++;
  };

  this.minus = function(){
    if(app.amount <= 0){
      $window.alert('올바른 수량을 입력해주세요.');
      app.amount = 1;
    } else {
      app.amount--;
    }
  };

  this.createBasket = function(data){
    var basketData = {
      item_id: data.item_id,
      amount: data.amount
    };

    Order.createBasket(basketData).then(function(data){
      if(data.data.success){
        $window.alert(data.data.message);
      } else {
        $window.alert(data.data.message);
      }
    });

    // $window.alert('상품을 장바구니에 담았습니다.');
  };

  this.createOrder = function(data){
    var orderData = {
      item_id: item_id,
      amount: data.amount,
      kindOf: data.kindOf.name,
      item_type_id: data.item_type_id
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
      var type = data.data.result.kind.split(',');
      app.itemData = data.data.result;
      for(i=0; i<type.length;i++){
        app.data.availableOptions[i+1] = {
          name: type[i],
          id: i+1
        };
      }
    } else {
      app.errorMsg = data.data.message;

    }
  });
});
