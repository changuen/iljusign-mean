angular.module('orderControllers',[])
.controller('readOrderCtrl', function ($stateParams, $http, $state, $window) {
  var app = this;
  $http.get('/api/makeOrder').then(function(data){
    if(data.data.success){
      app.orderData = data.data.result;
    } else {

    }
  });
  this.confirmOrder = function(){
    $state.go('app.confirmOrder');
  };
})

.controller('basketCtrl', function ($http, $window) {
  var app = this;

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


  $http.get('/api/basket').then(function(data){
    app.errorMsg = false;
    if(data.data.success){
      // app.successMsg = data.data.message;
      app.basketData = data.data.result;
    } else {
      app.errorMsg = data.data.message;
    }

  });
});
