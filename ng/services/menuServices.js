angular.module('menuServices',[])
.factory('Menu', function($http){
  menuFactory = {};

  menuFactory.deleteMenu = function(category_id){
    return $http.delete('/api/menu/'+category_id);
  };

  menuFactory.updateMenu = function(updateData){
    return $http.put('/api/menu/', updateData);
  };

  menuFactory.createMenu = function(menuData){
    return $http.post('/api/menu', menuData);
  };

  menuFactory.readMainMenu = function(){
    return $http.get('/api/menu');
  };
  menuFactory.readSubMenu =  function(mainMenuType){
    return $http.get('/api/menu/'+mainMenuType);
  };
  return menuFactory;
});
