describe('AnalysisLocalityCtrl', function () {
    beforeEach(module('xenta'));
    beforeEach(module('xenta.campaigns.campaign.reporting'));
    beforeEach(module('xenta.campaigns.campaign.reporting.analysis'));
    beforeEach(module('xenta.campaigns.campaign.reporting.analysis.locality'));

    var scope;

    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();
        scope.breadcrumb = {};

        $controller('LocalityCtrl', { $scope: scope });
    }));

    it('has correct initial values', function () {
        expect(scope.localityTabSet).toEqual(jasmine.any(Array));

        scope.localityTabSet.forEach(function (item) {
            expect(item).toEqual(jasmine.objectContaining({
                heading: jasmine.any(String),
                route: jasmine.any(String),
                state: jasmine.any(String)
            }));
        });
    });
});

