angular.module(
    'app.warehouses'
).controller('WarehouseCtrl', [
    '$scope', '$mdDialog', 'localStorageService',
($scope, $mdDialog, localStorageService) => {

    localStorageService.bind($scope, 'warehouseList');
    localStorageService.bind($scope, 'goodsList');
    $scope.goodsTypeList = localStorageService.get('goodsTypeList');

    $scope.addWarehouse = (ev) => {
        $mdDialog.show({
            controller: ['$scope', '$mdDialog', WarehouseDialogCtrl],
            templateUrl: 'modules/warehouses/templates/warehouse-form-tpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
        }).then((newWarehouse) => {
            $scope.warehouseList.push(newWarehouse);
        });
    };

    $scope.addGood = (ev) => {
        $mdDialog.show({
            controller: ['$scope', '$mdDialog', 'warehouseList', 'goodsTypeList', GoodDialogCtrl],
            templateUrl: 'modules/warehouses/templates/good-form-tpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            locals: {
                warehouseList: $scope.warehouseList,
                goodsTypeList: $scope.goodsTypeList,
            },
        }).then((newGood) => {
            $scope.goodsList.push(newGood);
    });
    };

    $scope.deleteWarehouse = (wName) => {
        let index = $scope.warehouseList.findIndex((item) => {
            return item.name === wName;
        });
        $scope.warehouseList.splice(index, 1);
    };



// private functions
    function WarehouseDialogCtrl($scope, $mdDialog) {
        $scope.hide = () => {
            $mdDialog.hide();
        };

        $scope.cancel = () => {
            $mdDialog.cancel();
        };

        $scope.submit = (model) => {
            $mdDialog.hide(model);
        };
    }

   function GoodDialogCtrl($scope, $mdDialog, warehouseList, goodsTypeList) {

       $scope.warehouseList = warehouseList;
       $scope.goodsTypeList = goodsTypeList;
       console.log($scope);
       $scope.hide = () => {
           $mdDialog.hide();
       };

       $scope.cancel = () => {
           $mdDialog.cancel();
       };

       $scope.submit = (model) => {
           $mdDialog.hide(model);
       };
    }
}]);