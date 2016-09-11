angular = require('angular');
require('lodash/dist/lodash');
require('angular-material');
require('angular-material-expansion-panel/dist/md-expansion-panel');
require('angular-ui-router/release/angular-ui-router');
require('angular-local-storage/dist/angular-local-storage');
require('../../build/templatesApp');

angular.module('app', [
    'ngMaterial',
    'material.components.expansionPanels',
    'ui.router',
    'LocalStorageModule',
    'appTemplates',
    //app modules
    'app.models',
    'app.warehouses',
    'app.transactions',
    'app.goodsType'
]).config(['$stateProvider', '$urlRouterProvider', 'localStorageServiceProvider',
($stateProvider, $urlRouterProvider, localStorageServiceProvider) => {
    $stateProvider.state('app', {
        url: "/",
        views: {
            "mainMenu": {
                templateUrl: 'templates/left-menu-tpl.html'
            }
        },
        data: {
            pageTitle: 'Warehouses'
        }
    });

    $urlRouterProvider.otherwise('/warehouses');

    localStorageServiceProvider.setPrefix('warehouse');
}
]).run(['$rootScope', ($rootScope) => {
    $rootScope.$on('$stateChangeError', () => {
        throw arguments[5];
    });
}]);

require('mainCtrl');

require('models/main');
require('modules/warehouses/main');
require('modules/transactions/main');
require('modules/goodsType/main');