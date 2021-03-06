/**
 * [y] hybris Platform
 *
 * Copyright (c) 2000-2015 hybris AG
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of hybris
 * ("Confidential Information"). You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with hybris.
 */

'use strict';

angular.module('ds.checkout')
/** Purpose of this controller is to "glue" the data models of cart and shippingCost into the order details view.*/
    .controller('CheckoutCartCtrl', ['$scope', '$rootScope', 'cart', 'shippingCost', 'GlobalData',
        function ($scope, $rootScope, cart, shippingCost, GlobalData) {

            cart = $scope.cart;
            $scope.currencySymbol = GlobalData.getCurrencySymbol(cart.currency);
            $scope.shippingCost = shippingCost.price[GlobalData.getCurrencyId()];

            $scope.taxConfiguration = GlobalData.getCurrentTaxConfiguration();

            var unbind = $rootScope.$on('cart:updated', function (eve, eveObj) {
                $scope.cart = eveObj.cart;
                $scope.currencySymbol = GlobalData.getCurrencySymbol($scope.cart.currency);
                $scope.shippingCost = shippingCost.price[GlobalData.getCurrencyId()];
                $scope.taxConfiguration = GlobalData.getCurrentTaxConfiguration();
            });

            $scope.$on('$destroy', unbind);

        }]);
