angular.module('mainControllers', ['authServices', 'userServices'])
    .controller('mainCtrl', function (Auth, $timeout, $location, $state, $rootScope, $scope, $window, $interval, User, AuthToken) {
        var app = this;


        // Internet Explorer 버전 체크
        var IEVersionCheck = function () {

            var word;
            var version = "N/A";

            var agent = navigator.userAgent.toLowerCase();
            var name = navigator.appName;

            // IE old version ( IE 10 or Lower )
            if (name == "Microsoft Internet Explorer") word = "msie ";

            else {
                // IE 11
                if (agent.search("trident") > -1) word = "trident/.*rv:";

                // IE 12  ( Microsoft Edge )
                else if (agent.search("edge/") > -1) word = "edge/";
            }

            var reg = new RegExp(word + "([0-9]{1,})(\\.{0,}[0-9]{0,1})");
            if (reg.exec(agent) != null)
                version = RegExp.$1 + RegExp.$2;
            //return version;

            if (version < 10) {
                if (confirm("인터넷 익스플로러 9 버전 이상 또는 크롬 브라우저에 최적화되어 있습니다. \n다운로드후 사용하시겠습니까?")) {
                    location.href = "https://www.google.co.kr/chrome/browser/desktop/index.html";
            }
            }
        };

        IEVersionCheck();

        app.loadme = false;
        $scope.$on('LOAD', function () {
            $scope.loading = true;
        });

        $scope.$on('UNLOAD', function () {
            $scope.loading = false;
        });

        $rootScope.$on('$stateChangeStart', function () {
            if (!checkSession) {
                checkSession();
            } else {
                if (Auth.isLoggedIn()) {
                    app.isLoggedIn = true;
                    app.loadme = true;
                    Auth.getUser().then(function (data) {
                        app.user = data.data;
                        app.loadme = true;
                        User.getPermission().then(function (data) {
                            if (data.data.success) {
                                if (data.data.permission === 'admin') {
                                    app.authorized = true;
                                    app.loadme = true;
                                } else if (data.data.permission === 'artist') {
                                    app.permission = true;
                                    app.loadme = true;
                                } else {
                                    app.permission = false;
                                    app.authorized = false;
                                    app.loadme = true;
                                }
                            } else {
                                app.permission = false;
                                app.authorized = false;
                                app.loadme = true;
                            }
                        });
                    });
                } else {
                    app.user = false;
                    app.isLoggedIn = false;
                    app.loadme = true;
                }
            }
        });

        var checkSession = function () {
            if (Auth.isLoggedIn()) {
                app.checkSession = true;
                var interval = $interval(function () {
                    var token = $window.localStorage.getItem('token');
                    if (token === null) {
                        $interval.cancel(interval);
                    } else {
                        self.parseJwt = function (token) {
                            var base64Url = token.split('.')[1];
                            var base64 = base64Url.replace('-', '+').replace('_', '/');
                            return JSON.parse($window.atob(base64));
                        };
                        var expireTime = self.parseJwt(token);
                        var timeStamp = Math.floor(Date.now() / 1000);
                        var timeCheck = expireTime.exp - timeStamp;

                        if (timeCheck <= 5) {
                            showModal('expired');
                            $interval.cancel(interval);
                        } else {
                        }
                    }
                }, 2000);
            }
        };

        checkSession();


        app.renewSession = function () {
            app.choiceMade = true;
            User.renewSession(app.user.username).then(function (data) {
                if (data.data.success) {
                    AuthToken.setToken(data.data.token);
                    checkSession();
                    hideModal('expired');
                } else {
                    app.ModalBody = data.data.message;
                    hideModal('expired');
                }
            });
        };

        app.endSession = function () {
            app.choiceMade = true;
            hideModal('expired');
            $timeout(function () {
                showModal('logout');
            }, 500);
        };


        var showModal = function (option) {
            app.choiceMade = false;
            app.modalHeader = undefined;
            app.modalBody = undefined;
            app.hideButton = false;
// check token expired
            if (option === 'expired') {
                app.modalHeader = 'Timeout Warning';
                app.modalBody = 'Your session will expired in 5 minutes. Would you like to renew your session?';
                $("#myModal").modal({backdrop: "static"});
            } else if (option === 'logout') {
// logout
                app.hideButton = true;
                app.modalHeader = '로그아웃';
                $("#myModal").modal({backdrop: "static"});
                $timeout(function () {
                    Auth.logout();
                    app.isLoggedIn = false;
                    app.authorized = false;
                    app.permission = false;
                    app.disabled = false;
                    app.successMsg = false;

                    hideModal('logout');
                    $state.reload();
                }, 1000);
            } else if (option === 'login') {
// Login
                $("#login").modal({backdrop: "static"});
            }
            $timeout(function () {
                if (!app.choiceMade) {
                    hideModal('logout');
                }
            }, 2000);

        };

        var hideModal = function (option) {

            if (option === 'expired') {
                $("#myModal").modal('hide');
            } else if (option === 'logout') {
                $("#myModal").modal('hide');
            } else if (option === 'login') {
                $("#login").modal('hide');
            }
        };


// 로그인
        this.doLogin = function (loginData, valid) {
            app.errorMsg = false;
            app.expired = false;
            app.disabled = true;

            if (valid) {
                Auth.login(app.loginData).then(function (data) {
                    if (data.data.success) {
                        app.successMsg = data.data.message;
                        $timeout(function () {
                            app.loginData = null;
                            app.isLoggedIn = true;
                            checkSession();
                            $state.go('app');
                        }, 1000);
                    } else {
                        if (data.data.expired) {
                            app.expired = true;
                            app.disabled = true;
                            app.errorMsg = data.data.message;
                        } else {
                            app.disabled = false;
                            app.errorMsg = data.data.message;
                        }
                    }
                });
            } else {
                app.disabled = false; // If error occurs, remove disable lock from form
                app.loading = false; // Stop bootstrap loading icon
                app.errorMsg = '올바른 정보를 입력해주세요.'; // Display error if valid returns false
            }

        };


        app.logout = function () {
            showModal('logout');
        };

        app.resend = function () {
            hideModal('login');
            $timeout(function () {
                $state.go('resend');
                app.expired = false;
            }, 500);
        };

        app.resetusername = function () {
            hideModal('login');
            $timeout(function () {
                $state.go('resetusername');
            }, 500);
        };

        app.resetpassword = function () {
            hideModal('login');
            $timeout(function () {
                $state.go('resetpassword');
            }, 500);

        };

    });
