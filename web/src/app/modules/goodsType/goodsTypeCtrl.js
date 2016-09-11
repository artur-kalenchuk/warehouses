angular.module(
    'app.goodsType'
).controller('GoodsTypeCtrl', [
    '$scope', '$mdDialog', 'localStorageService',
($scope, $mdDialog, localStorageService) => {

    localStorageService.bind($scope, 'goodsTypeList');
    $scope.addGoodsType = (ev) => {
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

    // private functions
    function GoodsTypeDialogCtrl($scope, $mdDialog) {
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