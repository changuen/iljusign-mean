angular.module('menuControllers',['menuServices'])
.controller('mainMenuCtrl', function (Menu) {
  var app = this;
  Menu.readMainMenu().then(function(data){
    if(data.data.success){
      app.mainMenues = data.data.result;
    } else {
      app.errorMsg = data.data.message;
    }
  });
});
//
// .controller('subMenuCtrl', function (Menu, $stateParams) {
//   var app = this;
//   var subType = $stateParams.type;
//   Menu.readSubMenu(subType).then(function(data){
//     if(data.data.success){
//       app.subMenues = data.data.result;
//     } else {
//     }
//   });
// });
