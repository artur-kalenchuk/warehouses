describe('Locality Country Controller', function () {
    beforeEach(module('xenta'));
    beforeEach(module('xenta.campaigns.campaign.reporting'));
    beforeEach(module('xenta.campaigns.campaign.reporting.analysis'));
    beforeEach(module('xenta.campaigns.campaign.reporting.analysis.locality'));
    beforeEach(module('xenta.campaigns.campaign.reporting.analysis.locality.country'));

    var scope,
        countries,
        httpBackend,
        location,
        state,
        LocalityCountryCtrl,
        localityCountryConfig,
        campaignInfoData,
        createController;

    beforeEach(inject(function ($rootScope, $controller, $httpBackend, $location, $state, _countries_, localityCountryConfigSvc) {
        scope = $rootScope.$new();
        httpBackend = $httpBackend;
        location = $location;
        state = $state;
        countries = _countries_;
        localityCountryConfig = localityCountryConfigSvc;

        campaignInfoData = {
            "id": "5095",
            "name": "Alive Robots Media Sun Battery Production",
            "start_date": "01-12-2015 18:17:22",
            "end_date": "03-20-2015 10:10:12"
        };

        createController = function () {
            return $controller('LocalityCountryCtrl', {
                $scope: scope,
                $state: state
            });
        };
    }));

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
        httpBackend.resetExpectations();
    });

    // TODO: tests should be exist here
});