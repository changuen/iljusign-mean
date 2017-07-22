angular.module('orderControllers',['orderServices'])
.controller('readOrderCtrl', function ($stateParams, $state, $window, Order) {
  var app = this;
  app.getItemFail = false;

  app.cashReceipt = true;
  if(app.cashReceipt){
    app.getCashReceipt = true;
  } else {
    app.getCashReceipt = false;
  }


  this.readAddress = function(){
    //load함수를 이용하여 core스크립트의 로딩이 완료된 후, 우편번호 서비스를 실행합니다.
    daum.postcode.load(function(){
      app.addressDetail = '';
        new daum.Postcode({
            oncomplete: function(data) {
              app.sigunguCode = data.sigunguCode;
              app.jibunAddress = data.jibunAddress;
              app.roadAddress = data.roadAddress;
            }
        }).open();
    });

  };

  Order.readOrder().then(function(data){
    app.errorMsg = false;
    if(data.data.success){
      if(data.data.result.length===0){
        app.getItemFail = true;
        app.errorMsg = '선택된 상품이 없습니다.';
        $state.go('app');
      } else {
      app.orderData = data.data.result;
    }
    } else {
      app.errorMsg = data.data.message;

    }
  });

  this.confirmOrder = function(data){
    console.log(data);
    // $state.go('app.confirmOrder');
  };

  this.delete = function(data){
    app.errorMsg = false;
    var item_id = data.item_id;
    Order.deleteOrder(item_id).then(function(data){
      if(data.data.success){
        app.successMsg = data.data.message;
        $state.reload();
      }else {
        app.errorMsg = data.data.message;
      }
    });
  };
  })

.controller('basketCtrl', function (Order, $window, $state) {
  var app = this;
  app.amount = 1;
  app.data = {
   availableOptions: [
     {id: 0, name: '카테고리를 선택해주세요.'},
   ],
   selectedOption: {id: 0, name: '카테고리를 선택해주세요.'} //This sets the default value of the select in the ui
   };

   this.delete = function(data){
     app.errorMsg = false;
     var basket_id = data.basket_id;
     Order.deleteBasket(basket_id).then(function(data){
       if(data.data.success){
         app.successMsg = data.data.message;
         $state.reload();

       } else {
         app.errorMsg = data.data.message;
       }
     });
   };

  this.makeBasket = function(){
  };

  Order.readBasket().then(function(data){
    app.errorMsg = false;
    if(data.data.success){
      app.basketData = data.data.result;
      var i;
      var kind = [];
      var temp = [];
      var selectData;
      for(i=0; i < app.basketData.length; i++){
          kind[i] = app.basketData[i].kind.split(',');
          temp[i] = app.basketData[i].price.split(',');
      }

      for(i=0; i<kind.length; i++){
        app.data[i] = {
         availableOptions: [
           {id: 0, name: '카테고리를 선택해주세요.'},
         ],
         selectedOption: {id: 0, name: '카테고리를 선택해주세요.'} //This sets the default value of the select in the ui
         };

        for(j=0;j<kind[i].length;j++){
          app.data[i].availableOptions[j+1] = {
            name: kind[i][j],
            id: Number(temp[i][j])
          };
        }
      }
    } else {
      app.errorMsg = data.data.message;
    }
  });
});
