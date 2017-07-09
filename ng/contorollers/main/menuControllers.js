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
//   var mainMenuType = $stateParams.type1;
//   Menu.readSubMenu(mainMenuType).then(function(data){
//     if(data.data.success){
//       console.log(data);
//     } else {
//     }
//   });
// });
