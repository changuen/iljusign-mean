angular.module('itemControllers', ['orderServices'])
    .filter('sumByKey', function () {
        return function (input, property) {
            var i = input instanceof Array ? input.length : 0;
// if property is not defined, returns length of array
// if array has zero length or if it is not an array, return zero
            if (typeof property === 'undefined' || i === 0) {
                return i;
// test if property is number so it can be counted
            }
            else {
                var total = 0;
                while (i--)
                    total += (input[i][property[0]] * input[i][property[1]]);
                return total;
            }
        };
    })
    .controller('getTypeItemsCtrl', function ($stateParams, $http) {
        var app = this;

        var category_id = $stateParams.category_id;
        if (!$stateParams.type_code) {
            $http.get('/api/item_type/' + category_id).then(function (data) {
                if (data.data.success) {
                    if (data.data.result.length === 0) {
                        app.errorMsg = '등록된 상품이 없습니다.';
                    } else {
                        app.itemsData = data.data.result;
                    }
                } else {
                    app.errorMsg = data.data.message;
                }
            });
        } else {
            var type_code = $stateParams.type_code;
            $http.get('/api/item_type/' + category_id,
                {params: {type_code: type_code}}
            ).then(function (data) {
                if (data.data.success) {
                    if (data.data.result.length === 0) {
                        app.errorMsg = '등록된 상품이 없습니다.';
                    } else {
                        app.itemsData = data.data.result;
                    }
                } else {
                    app.errorMsg = data.data.message;
                }
            });
        }

    })

    .controller('getTypeItemCtrl', ['Admin', '$stateParams', '$window', '$state', 'Order', function (Admin, $stateParams, $window, $state, Order) {
        var app = this;
        var item_id = $stateParams.item_id;
        app.optionItem = false;

        app.data = {
            availableOptions: [
                {id: 0, name: '카테고리를 선택해주세요.'},
            ],
            selectedOption: {id: 0, name: '카테고리를 선택해주세요.'} //This sets the default value of the select in the ui
        };

        app.amount = 1;

        app.optionList = [];
        this.addItem = function (data) {
            if (data.id === 0) {
                $window.alert('옵션을 선택해주세요.');
            } else {
                app.optionItem = true;
                app.optionList.push(
                    {
                        kind: data.name,
                        price: data.id,
                        amount: 1
                    }
                );

            }
        };

        this.createBasket = function (data) {
            var basketData = {
                item_id: data.item_id,
            };
            Order.createBasket(basketData).then(function (data) {
                if (data.data.success) {
                    $window.alert(data.data.message);
                } else {
                    $window.alert(data.data.message);
                }
            });
        };

        this.createOrder = function (data) {

            var orderData = {
                item_id: data.item_id,
                amount: data.amount,
                kind_of: data.kind_of,
                price: data.price
            };

            console.log(orderData);

            Order.createOrder(orderData).then(function (data) {
                console.log(data);
                // if (data.data.success) {
                //     app.successMsg = data.data.message;
                //     $state.go('app.paymentStep');
                // } else {
                //     app.errorMsg = data.data;
                // }
            });

        };

        Admin.readItem(item_id).then(function (data) {
            if (data.data.success) {
                var kind = data.data.result.kind.split(',');
                var temp = data.data.result.price.split(',');
                var price = [];
                for (i = 0; i < temp.length; i++) {
                    price[i] = Number(temp[i]);
                }

                app.itemData = data.data.result;

                for (i = 0; i < price.length; i++) {
                    app.data.availableOptions[i + 1] = {
                        name: kind[i],
                        id: price[i]
                    };
                }
            } else {
                app.errorMsg = data.data.message;
            }
        });

    }]);
