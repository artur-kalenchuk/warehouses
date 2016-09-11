angular.module(
    'app.warehouses',
    []
).config(['$stateProvider', ($stateProvider) => {

    $stateProvider.state('app.warehouses', {
        url: 'warehouses',
        views: {
            "main@": {
                templateUrl: 'modules/warehouses/templates/warehouses-tpl.html',
                controller: 'WarehouseCtrl',
                controllerAs: 'warehouse'
            }
        },
        data: {
            pageTitle: 'Warehouses list'
        },
        resolve: {}
    });
}]);
require('modules/warehouses/warehouseCtrl');
