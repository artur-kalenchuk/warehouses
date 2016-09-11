angular.module('app.models').service('warehouseMdl', [
    'localStorageService',
    function (localStorageService) {
        var key = 'warehouse';

        this.getKey = function () {
            return key;
        };

        this.save = function (data) {
            localStorageService.set(key, data);
        };

        this.get = function () {
            return localStorageService.get(key);
        };
    }
]);
