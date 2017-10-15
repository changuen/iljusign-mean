angular.module('userControllers',['userServices'])
.controller('regCtrl', function ( $http, $location, $timeout, User, Auth, $state) {
    var app = this;

      this.regStep1 = function(regData){
        app.errorMsg = false;
        if(!regData){
          app.errorMsg = '약관에 동의해야만 회원가입을 진행할 수 있습니다.';
        } else {
          if((regData.terms) && (regData.privacy)) {
                app.successMsg = '약관에 성공적으로 동의하셨습니다.';
                app.disabled = true;
                $state.go('app.registerStep2');
          } else {
                app.errorMsg = '약관에 동의해야만 회원가입을 진행할 수 있습니다.';
                app.disabled = false;
          }
        }

      };

    // 회원가입
      this.regStep2 = function(regData, valid, confirmed){
        app.errorMsg = false;
        app.disabled = true;
        $state.go('app.registerStep3');
        // if(valid && confirmed){
        //   User.create(app.regData).then(function(data){
        //     if(data.data.success){
        //       app.disabled = true;
        //       app.successMsg = data.data.message;
        //       Auth.login(app.regData).then(function(data){
        //         if(data.data.success){
        //           app.disabled = true;
        //           app.successMsg = data.data.message;
        //           $timeout(function() {
        //             $state.go('app');
        //           },1000);
        //         }else {
        //           if(data.data.expired){
        //             app.expired = true;
        //             app.disabled = true;
        //             app.errorMsg = data.data.message;
        //           } else {
        //             app.disabled = false;
        //             app.errorMsg = data.data.message;
        //           }
        //         }
        //       });
        //     }else {
        //       app.disabled = false;
        //       app.errorMsg = data.data.message;
        //     }
        //   });
        //
        // } else {
        //      app.disabled = false; // If error occurs, remove disable lock from form
        //      app.loading = false; // Stop bootstrap loading icon
        //      app.errorMsg = '올바른 정보를 입력해주세요.'; // Display error if valid returns false
        // }
      };

      // 회원가입
        this.regStep3 = function(regData, valid, confirmed){
          app.errorMsg = false;
          app.disabled = true;
          if(valid && confirmed){
            User.create(app.regData).then(function(data){
              if(data.data.success){
                app.disabled = true;
                app.successMsg = data.data.message;
                Auth.login(app.regData).then(function(data){
                  if(data.data.success){
                    app.disabled = true;
                    app.successMsg = data.data.message;
                    $timeout(function() {
                      $state.go('app');
                    },1000);
                  }else {
                    if(data.data.expired){
                      app.expired = true;
                      app.disabled = true;
                      app.errorMsg = data.data.message;
                    } else {
                      app.disabled = false;
                      app.errorMsg = data.data.message;
                    }
                  }
                });
              }else {
                app.disabled = false;
                app.errorMsg = data.data.message;
              }
            });

          } else {
               app.disabled = false; // If error occurs, remove disable lock from form
               app.loading = false; // Stop bootstrap loading icon
               app.errorMsg = '올바른 정보를 입력해주세요.'; // Display error if valid returns false
          }
        };
});
