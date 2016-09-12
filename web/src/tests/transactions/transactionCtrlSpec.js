describe('transaction controller', function () {
    beforeEach(module('app'));
    var scope;
    beforeEach(inject(function (_$rootScope_, $controller, localStorageService) {
        $rootScope = _$rootScope_;
        scope = $rootScope.$new();
        spyOn(localStorageService, "get").and.callFake(function (){
           return 'fake list';
        });

        TransactionCtrl = $controller('TransactionCtrl', {
            $scope: scope,
            localStorageService: localStorageService
        });

        $rootScope.$digest();
    }));

    it('should init "transactionsList" in scope', function () {
        expect(scope.transactionsList).toEqual('fake list');
    });
});