// angular.module('app')
//     .directive('paymentStep', function () {
//         return {
//             restrict: 'E',
//             controller: [function () {
//                 var NameCtrl = this;
//             }],
//             controllerAs: 'paymentCtrl',
//             templateUrl: '/directives/payment.tpl.html',
//             link: function (scope, element, attrs, ctrls) {
//                 //
//                 var paymentCtrl = ctrls;
//
//
//                 paymentCtrl.tabs = [
//                     { title:'Dynamic Title 1', content:'Dynamic content 1' },
//                     { title:'Dynamic Title 2', content:'Dynamic content 2' },
//                     { title:'Dynamic Title 3', content:'Dynamic content 2' },
//                 ];
//
//                 paymentCtrl.model = {
//                     name: 'Tabs'
//                 };
//
//                 PaymentCtrl.nextPage = function (tabIndex) {
//                     console.log(tabIndex);
//                 }
//                 PaymentCtrl.prevPage = function (tabIndex) {
//                     console.log(tabIndex);
//                 }
//             }
//         };
//     });
