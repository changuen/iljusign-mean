angular.module('orderServices',[])
.factory('Order', function($http){
  orderFactory = {};

  orderFactory.createBasket = function(basketData){
    return $http.post('/api/basket', basketData);
  };

  orderFactory.createOrder = function(orderData){
    return $http.post('/api/makeOrder',orderData);
  };

  return orderFactory;
});
