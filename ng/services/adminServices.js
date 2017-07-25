angular.module('adminServices',[])
.factory('Admin', function($http){
  adminFactory = {};

  adminFactory.deleteItem = function(item_id){
    return $http.delete('/api/item/'+item_id);
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


// ======================== typeServices 생성 =========================== //


  adminFactory.updateItemType = function(updateData){
    return $http.put('/api/itemType', updateData);
  };

  adminFactory.readUpdateItemType = function(item_id){
    return $http.get('/api/itemType/'+item_id);
  };

  adminFactory.readItemType = function(){
    return $http.get('/api/itemType');
  };

  adminFactory.deleteType = function(item_type_id){
    return $http.delete('/api/type/'+item_type_id);
  };

  adminFactory.readUpdateType = function(item_type){
    return $http.get('/api/type/'+item_type);
  };

  adminFactory.updateUpdateType = function(updateData){
    return $http.put('/api/type', updateData);
  };

  adminFactory.createType = function(typeData){
    return $http.post('/api/type', typeData);
  };

  adminFactory.readType = function(){
    return $http.get('/api/type');
  };

  return adminFactory;
});
