angular.module('orderServices',[])
.factory('Order', function($http){
  orderFactory = {};
  
  orderFactory.updateDelivery = function(deliData){
    return $http.put('/api/delivery/'+deliData.user_id, deliData);
  };

  orderFactory.createDelivery = function(deliData){
    return $http.post('/api/delivery',deliData);
  };

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

  orderFactory.readOrder = function(user_id){
    return $http.get('/api/makeOrder/'+user_id);
  };

  orderFactory.readOrderAndDeli = function(){
    return $http.get('/api/makeOrder');
  };

  orderFactory.createOrder = function(orderData){
    return $http.post('/api/makeOrder',orderData);
  };

  return orderFactory;
});
