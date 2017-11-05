angular.module('paymentControllers',[])
    .controller('paymentCtrl', function ($stateParams, $state) {
        var paymentCtrl = this;

        console.log($stateParams);
        console.log($state);

        console.log("작동 중입니다.");

        paymentCtrl.active = 1;


        paymentCtrl.prevPage = function (tabIndex) {
            console.log("tabIndex", tabIndex);
            paymentCtrl.active--;
            if (tabIndex === 1) {
                console.log("이전 페이지로");
                paymentCtrl.active = 1;
            }
        };

        paymentCtrl.nextPage = function (tabIndex) {
            console.log("작동 중?");
            console.log("tabIndex", tabIndex);
            paymentCtrl.active++;
            if ( tabIndex === 3 ) {
                console.log("처음 페이지로");
                paymentCtrl.active = 3;
            } else {
            }
        };

    });