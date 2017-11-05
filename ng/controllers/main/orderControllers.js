angular.module('orderControllers', ['orderServices'])
    .controller('readOrderCtrl', function ($stateParams, $state, $window, Order, $scope) {
        var app = this;
        var user_id = $scope.main.user.user_id;

        app.getItemFail = false;

        app.cashReceipt = true;
        if (app.cashReceipt) {
            app.getCashReceipt = true;
        } else {
            app.getCashReceipt = false;
        }


        this.readAddress = function () {
            //load함수를 이용하여 core스크립트의 로딩이 완료된 후, 우편번호 서비스를 실행합니다.
            daum.postcode.load(function () {
                app.addressDetail = '';
                new daum.Postcode({
                    oncomplete: function (data) {
                        app.deliData = {
                            sigungu_code: data.sigunguCode,
                            jibun_address: data.jibunAddress,
                            road_address: data.roadAddress
                        };
                    }
                }).open();
            });

        };

        Order.readOrderAndDeli().then(function (data) {
            app.errorMsg = false;
            if (data.data.success) {
// 등록된 배송지 정보가 없을 때
                if (data.data.result.length === 0) {
                    app.delivery = false;
                    Order.readOrder(user_id).then(function (data) {
                        var itemPrice = [];
                        app.allItemPrice = 0;
                        app.orderData = data.data.result;
                        for (i = 0; i < app.orderData.length; i++) {
                            itemPrice[i] = app.orderData[i].price * app.orderData[i].amount;
                        }
                        for (i = 0; i < itemPrice.length; i++) {
                            app.allItemPrice = app.allItemPrice + itemPrice[i];
                        }
                    });
                }
// 등록된 배송지 정보가 있을 때
                else {
                    var itemPrice = [];
                    app.delivery = true;
                    app.allItemPrice = 0;
                    app.orderData = data.data.result;
                    for (i = 0; i < app.orderData.length; i++) {
                        itemPrice[i] = app.orderData[i].price * app.orderData[i].amount;
                    }
                    for (i = 0; i < itemPrice.length; i++) {
                        app.allItemPrice = app.allItemPrice + itemPrice[i];
                    }
                }
            } else {
                app.errorMsg = data.data.message;

            }
        });

        this.confirmOrder = function (data) {
// 등록된 배송지가 있을 때 put
            var deliData = '';
            var receiptData = '';
            if (app.delivery) {
//    변경사항 없음
                if (data.daliData === undefined) {
                    console.log('변경사항 없음');
                }
// 변경사항 있음
                else {
                    deliData = data.daliData;
                    // deliData.user_id = user_id;
                    Order.updateDelivery(deliData).then(function (data) {

                    });
                }

// 등록된 배송지가 없을 때 post
            } else {
                deliData = data.daliData;
                receiptData = data.receiptData;
                Order.createDelivery(deliData).then(function (data) {
                });
            }
        };

        this.delete = function (data) {
            app.errorMsg = false;
            var item_id = data.item_id;
            Order.deleteOrder(item_id).then(function (data) {
                if (data.data.success) {
                    app.successMsg = data.data.message;
                    $state.reload();
                } else {
                    app.errorMsg = data.data.message;
                }
            });
        };
    })

    .controller('basketCtrl', function (Order, $window, $state) {
        var app = this;
        app.data = {
            availableOptions: [
                {id: 0, name: '카테고리를 선택해주세요.'},
            ],
            selectedOption: {id: 0, name: '카테고리를 선택해주세요.'} //This sets the default value of the select in the ui
        };

        this.delete = function (data) {
            app.errorMsg = false;
            var basket_id = data.basket_id;
            Order.deleteBasket(basket_id).then(function (data) {
                if (data.data.success) {
                    app.successMsg = data.data.message;
                    $state.reload();

                } else {
                    app.errorMsg = data.data.message;
                }
            });
        };

        this.makeBasket = function () {
        };

        Order.readBasket().then(function (data) {
            console.log(data);
            app.errorMsg = false;
            if (data.data.success) {
                app.basketData = data.data.result;

                for (var i = 0 ; i < app.basketData.length; i++){
                    app.basketData[i].count = 1;
                }

                var i;
                var kind = [];
                var temp = [];
                var selectData;
                for (i = 0; i < app.basketData.length; i++) {
                    kind[i] = app.basketData[i].kind.split(',');
                    temp[i] = app.basketData[i].price.split(',');
                }

                for (i = 0; i < kind.length; i++) {
                    app.data[i] = {
                        availableOptions: [
                            {id: 0, name: '카테고리를 선택해주세요.'},
                        ],
                        selectedOption: {id: 0, name: '카테고리를 선택해주세요.'} //This sets the default value of the select in the ui
                    };

                    for (j = 0; j < kind[i].length; j++) {
                        app.data[i].availableOptions[j + 1] = {
                            name: kind[i][j],
                            id: Number(temp[i][j])
                        };
                    }
                }
            } else {
                app.errorMsg = data.data.message;
            }
        });
    });
