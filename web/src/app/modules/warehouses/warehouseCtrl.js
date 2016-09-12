angular.module(
    'app.warehouses'
).controller('WarehouseCtrl', [
    '$scope', '$mdDialog', 'localStorageService',
($scope, $mdDialog, localStorageService) => {

    localStorageService.bind($scope, 'warehouseList');
    localStorageService.bind($scope, 'goodsList');
    localStorageService.bind($scope, 'transactionsList');
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
            var index = $scope.goodsList.findIndex((item) => {
                return (item.w_name === newGood.w_name && item.type === newGood.type);
            });

            if(index !== -1) {
                $scope.goodsList[index].amount += newGood.amount;
            } else {
                $scope.goodsList.push(newGood);
            }

            $scope.transactionsList.push({
                timestamp: Date.now(),
                fromWarehouse: null,
                toWarehouse: newGood.w_name,
                goodType: newGood.type,
                amount: newGood.amount
            });
        });
    };

    $scope.editWarehouse = (ev, wItem) => {
        $mdDialog.show({
            controller: ['$scope', '$mdDialog', 'warehouse', WarehouseDialogCtrl],
            templateUrl: 'modules/warehouses/templates/warehouse-form-tpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            locals: {
                warehouse: wItem
            }
        }).then((newWarehouse) => {
            $scope.goodsList.forEach((item) => {
                if(item.w_name === wItem.name){
                    item.w_name = newWarehouse.name;
                }
            });

            wItem.name = newWarehouse.name;
            wItem.address = newWarehouse.address;
        });
    };

    $scope.deleteWarehouse = (wName) => {
        let index = $scope.warehouseList.findIndex((item) => {
            return item.name === wName;
        });
        $scope.warehouseList.splice(index, 1);
    };

    $scope.deleteGoods = (goodItem) => {
        let index = $scope.goodsList.findIndex((item) => {
            return (item.type === goodItem.type && item.w_name === goodItem.w_name);
        });
        $scope.transactionsList.push({
            timestamp: Date.now(),
            fromWarehouse: goodItem.w_name,
            toWarehouse: null,
            goodType: goodItem.type,
            amount: goodItem.amount
        });
        $scope.goodsList.splice(index, 1);
    };

    $scope.transferGoods = (ev, goodItem) => {
        $mdDialog.show({
            controller: ['$scope', '$mdDialog', 'warehouseList', TransferGoodDialogCtrl],
            templateUrl: 'modules/warehouses/templates/good-transfer-form-tpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            locals: {
                warehouseList: $scope.warehouseList,
            },
        }).then((newWarehouse) => {
            let index = $scope.goodsList.findIndex((item) => {
                return (item.type === goodItem.type && item.w_name === newWarehouse);
            });
            $scope.transactionsList.push({
                timestamp: Date.now(),
                fromWarehouse: goodItem.w_name,
                toWarehouse: newWarehouse,
                goodType: goodItem.type,
                amount: goodItem.amount
            });
            if(index !== -1) {
                let removeIndex = $scope.goodsList.findIndex((item) => {
                    return (item.type === goodItem.type && item.w_name === goodItem.w_name);
                });
                $scope.goodsList[index].amount += goodItem.amount;
                $scope.goodsList.splice(removeIndex, 1);
            } else {
                goodItem.w_name = newWarehouse;
            }


        });
    };

    $scope.countAmount = (arr) => {
        if(!arr || arr.length === 0) {
            return 0;
        } else if(arr.length === 1){
            return arr[0].amount;
        }

        return arr.reduce((prev, current)=> {
            return prev.amount + current.amount;
        });
    };



// private functions
    function WarehouseDialogCtrl($scope, $mdDialog, warehouse) {
        if(warehouse){
            $scope.warehouse = angular.copy(warehouse);
        }
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

    function TransferGoodDialogCtrl($scope, $mdDialog, warehouseList) {

        $scope.warehouseList = warehouseList;


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