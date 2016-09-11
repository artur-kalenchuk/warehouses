angular.module(
    'app.transactions',
    []
).config(['$stateProvider', ($stateProvider) => {

    $stateProvider.state('app.transactions', {
        url: 'transactions',
        views: {
            "main@": {
                templateUrl: 'modules/transactions/templates/transactions-tpl.html',
                controller: 'TransactionCtrl',
                controllerAs: 'transaction'
            }
        },
        data: {
            pageTitle: 'Transactions list'
        },
        resolve: {}
    });
}]);
require('modules/transactions/transactionCtrl');

