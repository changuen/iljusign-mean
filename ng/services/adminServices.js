angular.module('adminServices',[])
.factory('Admin', function($http){
  adminFactory = {};

  adminFactory.deleteItem = function(item_id){
    return $http.delete('/api/item/'+item_id);
  };

  adminFactory.deleteType = function(item_type_id){
    return $http.delete('/api/itemManagement/'+item_type_id);
  };

  adminFactory.readUpdateType = function(item_type){
    return $http.get('/api/itemManagement/'+item_type);
  };

  adminFactory.updateUpdateType = function(updateData){
    return $http.put('/api/itemManagement', updateData);
  };

  adminFactory.createType = function(typeData){
    return $http.post('/api/item_type', typeData);
  };

  adminFactory.readType = function(){
    return $http.get('/api/item_type');
  };
  adminFactory.readAristCrop = function(blob){
    return $http.post('/api/createCropImage', blob);
  };
  // Artist.createPhoto(photoData)
  adminFactory.createAristPhoto = function(photoData){
    return $http.post('/api/artistProfiles', photoData);
  };

  adminFactory.createItem = function(itemData){
    return $http.post('/api/item', itemData);
  };

  adminFactory.readItems = function(){
    return $http.get('/api/item');
  };

  adminFactory.readItem = function(item_id){
    return $http.get('/api/item/'+item_id);
  };

  return adminFactory;
});
