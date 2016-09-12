angular.module(
    'app.transactions'
).controller('TransactionCtrl', [
    '$scope', 'localStorageService',
    function ($scope, localStorageService) {
        $scope.transactionsList = localStorageService.get('transactionsList');
    }
]);

