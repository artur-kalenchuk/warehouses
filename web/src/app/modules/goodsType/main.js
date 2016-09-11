angular.module(
    'app.goodsType',
    []
).config(['$stateProvider', ($stateProvider) => {

    $stateProvider.state('app.goodsType', {
        url: 'goods_type',
        views: {
            "main@": {
                templateUrl: 'modules/goodsType/templates/goods-type-tpl.html',
                controller: 'GoodsTypeCtrl',
                controllerAs: 'goodsType'
            }
        },
        data: {
            pageTitle: 'Goods type list'
        },
        resolve: {}
    });
}]);
require('modules/goodsType/goodsTypeCtrl');

