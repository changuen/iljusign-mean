angular.module('emailControllers',['userServices'])
.controller('emailCtrl', function($stateParams, User, $timeout, $state){
  var app = this;
  User.activeAccount($stateParams.token).then(function(data){
    app.successMsg = false;
    app.errorMsg = false;
    if(data.data.success){
      app.disabled = true;
      app.successMsg = data.data.message + '...메인 페이지로 이동합니다.';
      $timeout(function(){
        $state.go('app');
      },2000);
    }else {
      app.errorMsg = data.data.message + '...메인 페이지로 이동합니다.';
      $timeout(function(){
        $state.go('app');
      },2000);
    }
  });
})

.controller('resendCtrl', function(User, $timeout, $state){
  app = this;
  this.checkCredentials = function(loginData){
    app.successMsg = false;
    app.errorMsg = false;
    app.disabled = true;

    User.checkCredentials(this.loginData).then(function(data){
      if(data.data.success){
        User.resendLink(app.loginData).then(function(data){
          if(data.data.success){
            app.disabled = true;
            app.successMsg = data.data.message + '...메인 페이지로 이동합니다.';
            $timeout(function(){
              $state.go('app');
            },2000);
          }
        });
      }else {
        app.disabled = false;
        app.errorMsg = data.data.message;
      }
    });
  };
})

.controller('usernameCtrl', function(User, $timeout, $state){
  var app = this;
  this.sendUsername = function(userData, valid){
    app.errorMsg = false;
    app.disabled = true;
    if(valid){
      User.sendUsername(app.userData.email).then(function(data){
        if(data.data.success){
          app.successMsg = data.data.message + '...메인 페이지로 이동합니다.';
          $timeout(function() {
          $state.go('app');
          }, 2000);
        } else {
          app.disabled = false;
          app.errorMsg = data.data.message;
        }
      });
    } else {
      app.disabled = false;
      app.errorMsg = '올바른 이메일 주소가 아닙니다.';
    }
  };
})

.controller('passwordCtrl', function(User, $timeout, $state){
  var app = this;
  app.sendPassword = function(resetData, valid){
    app.errorMsg = false;
    app.disabled = true;
    if(valid){
      User.sendPassword(app.resetData).then(function(data){
        if(data.data.success){
          app.successMsg = data.data.message + '...메인 페이지로 이동합니다.';
          $timeout(function() {
          $state.go('app');
          }, 2000);
        } else {
          app.disabled = false;
          app.errorMsg = data.data.message;
        }
      });
    } else {
      app.disabled = false;
      app.errorMsg = '올바른 아이디가 아닙니다.';
    }
  };
})

.controller('resetCtrl', function($stateParams, $scope, User, $timeout, $state){
  var app = this;

    app.hide = true; // Hide form until token can be verified to be valid

    // Function to check if token is valid and get the user's info from database (runs on page load)
    User.resetPassword($stateParams.token).then(function(data) {
        // Check if user was retrieved
        if (data.data.success) {
            app.hide = false; // Show form
            $scope.alert = 'alert alert-success'; // Set success message class
            app.successMsg = '새로운 비밀번호를 입력해주세요.'; // Let user know they can enter new password
            $scope.username = data.data.user[0].username; // Save username in scope for use in savePassword() function
        } else {
            $scope.alert = 'alert alert-danger'; // Set success message class
            app.errorMsg = data.data.message; // Grab error message from JSON object
        }
    });

    // Function to save user's new password to database
    app.savePassword = function(regData, valid, confirmed) {
        app.errorMsg = false; // Clear errorMsg when user submits
        app.successMsg = false;
        app.disabled = true; // Disable form while processing
        app.loading = true; // Enable loading icon

        // Check if form is valid and passwords match
        if (valid && confirmed) {
            app.regData.username = $scope.username; // Grab username from $scope

            // Run function to save user's new password to database
            User.savePassword(app.regData).then(function(data) {
                app.loading = false; // Stop loading icon
                // Check if password was saved to database
                if (data.data.success) {
                    $scope.alert = 'alert alert-success'; // Set success message class
                    app.successMsg = data.data.message + '...메인 화면으로 이동합니다.'; // Grab success message from JSON object and redirect
                    // Redirect to login page after 2000 milliseconds (2 seconds)
                    $timeout(function() {
                      $state.go('app');
                    }, 2000);
                } else {
                    $scope.alert = 'alert alert-danger'; // Set success message class
                    app.disabled = false; // Enable form to allow user to resubmit
                    app.errorMsg = data.data.message; // Grab error message from JSON object
                }
            });
        } else {
            $scope.alert = 'alert alert-danger'; // Set success message class
            app.loading = false; // Stop loading icon
            app.disabled = false; // Enable form to allow user to resubmit
            app.errorMsg = '올바른 정보를 입력해주세요.'; // Let user know form is not valid
        }
    };
});
