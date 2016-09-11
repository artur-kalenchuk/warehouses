describe('CampaignCtrl', function () {
    beforeEach(module('xenta'));
    beforeEach(module('xenta.campaigns'));
    beforeEach(module('xenta.campaigns.campaign'));
    var scope, state;
    beforeEach(inject(function ($rootScope, $controller, $httpBackend, campaignsMdl, $state, $location) {
        scope = $rootScope.$new();
        state = $state;
        $controller('CampaignCtrl', {
            $scope: scope,
            $state: state
         });

    }));
    //describe('AnalysisCtrl', function () {
    //    beforeEach(module('xenta'));
    //    beforeEach(module('xenta.models'));
    //    beforeEach(module('xenta.campaigns.campaign'));
    //    beforeEach(module('xenta.campaigns.campaign.reporting'));
    //    beforeEach(module('xenta.campaigns.campaign.reporting.analysis'));
    //
    //    var httpBackend,
    //        scope,
    //        campaignScope,
    //        createCampaignController,
    //        createAnalysisController,
    //        campaignsModel,
    //        location,
    //        state,
    //        campaignData,
    //        lineItems;
    //
    //    beforeEach(inject(function ($rootScope, $controller, $httpBackend, campaignsMdl, $state, $location) {
    //        httpBackend = $httpBackend;
    //        scope = $rootScope.$new();
    //        state = $state;
    //        location = $location;
    //        campaignsModel = campaignsMdl;
    //        createAnalysisController = function () {
    //            return $controller('AnalysisCtrl', {
    //                $scope: scope,
    //                $state: state
    //            });
    //        };
    //        campaignData = {
    //            "id": "5095",
    //            "name": "Alive Production",
    //            "start_date": "01-12-2015 18:17:22",
    //            "end_date": "03-20-2015 10:10:12"
    //        };
    //
    //        lineItems = [{id: 12}, {id: 23}];
    //
    //        location.path('/reporting/analysis/locality/country/campaign/1234/line-item/all/');
    //        scope.$apply();
    //        httpBackend.expectGET('/api/v1/data/campaigns/1234/line_items').respond(lineItems);
    //        httpBackend.expectGET('/api/v1/data/campaigns/1234').respond(campaignData);
    //        createAnalysisController();
    //        httpBackend.flush();
    //    }));
    //
    //    afterEach(function () {
    //        httpBackend.verifyNoOutstandingExpectation();
    //        httpBackend.verifyNoOutstandingRequest();
    //    });
    //
    //    it('has correct initial values', function () {
    //        console.log(111111111111111111);
    //        console.log(scope);
    //        expect(scope.campaignId).toBe('1234');
    //        expect(_.isObject(scope.campaign)).toBeTruthy();
    //        expect(_.isObject(scope.analysisScope)).toBeTruthy();
    //        expect(scope.analysisReportTypes.length).toBe(7);
    //        expect(scope.lineItems.length).toBe(2);
    //        expect(scope.dateSelectOptions.length).toBe(5);
    //    });
    //
    //    it('calculateAmount works correctly', function () {
    //        var count = scope.calculateAmount([{id: 1}, {id: 2}, {id: 3}]);
    //        expect(count).toBe(3);
    //    });
    //});

});

