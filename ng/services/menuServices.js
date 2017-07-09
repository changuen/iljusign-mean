angular.module('menuServices',[])
.factory('Menu', function($http){
  menuFactory = {};
  menuFactory.readMainMenu = function(){
    return $http.get('/api/menu');
  };
  menuFactory.readSubMenu =  function(mainMenuType){
    return $http.get('/api/menu/'+mainMenuType);
  };
  return menuFactory;
});
