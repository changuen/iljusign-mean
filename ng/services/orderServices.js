angular.module('orderServices',[])
.factory('Order', function($http){
  orderFactory = {};

  orderFactory.deleteBasket = function(basket_id){
    return $http.delete('/api/basket/'+basket_id);
  };

  orderFactory.readBasket= function(){
    return $http.get('/api/basket');
  };

  orderFactory.createBasket = function(basketData){
    return $http.post('/api/basket', basketData);
  };

  orderFactory.deleteOrder = function(item_id){
    return $http.delete('/api/makeOrder/'+item_id);
  };

  orderFactory.readOrder = function(){
    return $http.get('/api/makeOrder');
  };

  orderFactory.createOrder = function(orderData){
    return $http.post('/api/makeOrder',orderData);
  };

  return orderFactory;
});
