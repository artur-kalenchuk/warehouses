angular.module(
    'app'
).controller('MainCtrl', [
    '$scope', '$state', 'localStorageService',
    function ($scope, $state, localStorageService) {
        $scope.state = $state;
        localStorageService.get('warehouseList') || localStorageService.set('warehouseList', []);
        localStorageService.get('goodsTypeList') || localStorageService.set('goodsTypeList', []);
        localStorageService.get('goodsList') || localStorageService.set('goodsList', []);
        localStorageService.get('transactionsList') || localStorageService.set('transactionsList', []);

    }
]);