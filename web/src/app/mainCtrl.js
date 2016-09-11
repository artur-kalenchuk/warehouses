angular.module(
    'app'
).controller('MainCtrl', [
    '$scope', '$state', 'localStorageService',
    function ($scope, $state, localStorageService) {
        $scope.state = $state;
        localStorageService.set('warehouseList', []);
        localStorageService.set('goodsTypeList', []);
        localStorageService.set('goodsList', []);
        localStorageService.set('transactionsList', []);

    }
]);