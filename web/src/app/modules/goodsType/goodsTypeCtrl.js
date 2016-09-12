angular.module(
    'app.goodsType'
).controller('GoodsTypeCtrl', [
    '$scope', '$mdDialog', 'localStorageService',
function($scope, $mdDialog, localStorageService) {

    localStorageService.bind($scope, 'goodsTypeList');
    localStorageService.bind($scope, 'goodsList');
    this.addGoodsType = (ev) => {
        $mdDialog.show({
            controller: ['$scope', '$mdDialog', GoodsTypeDialogCtrl],
            templateUrl: 'modules/goodsType/templates/good-types-form-tpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
        }).then((newType) => {
            $scope.goodsTypeList.push(newType);
        });
    };

    this.editType = (ev, typeItem) => {
        $mdDialog.show({
            controller: ['$scope', '$mdDialog', 'goodsType', GoodsTypeDialogCtrl],
            templateUrl: 'modules/goodsType/templates/good-types-form-tpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            locals: {
                goodsType: typeItem
            }
        }).then((newType) => {
            $scope.goodsList.forEach((item) => {
                if(item.type === typeItem.name){
                    item.type = newType.name;
                }
            });

            typeItem.name = newType.name;
        });
    };

    // private functions
    function GoodsTypeDialogCtrl($scope, $mdDialog, goodsType) {
        if(goodsType){
            $scope.goodsType = angular.copy(goodsType);
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

}]);