/**
 * Tests sit right alongside the file they are testing, which is more intuitive
 * and portable than separating `src` and `test` directories. Additionally, the
 * build process will exclude all `.spec.js` files from the build
 * automatically.
 */
describe('Dashboard Controller', function () {
    beforeEach(module('xenta'));
    beforeEach(module('xenta.models'));
    beforeEach(module('xenta.campaigns.campaign.reporting'));
    beforeEach(module('xenta.campaigns.campaign.reporting.dashboard'));

    var $rootScope,
        httpBackend,
        scope,
        dashboardConfigService,
        chartConfigService,
        dashboardGridService,
        campaignsModel,
        dashboardService,
        DashboardController;

    beforeEach(inject(function (_$rootScope_, _$httpBackend_, $controller, dashboardConfigSvc, chartConfigSvc, dashboardGridSvc, campaignsMdl, dashboardSvc) {
        $rootScope = _$rootScope_;
        scope = $rootScope.$new();
        dashboardConfigService = dashboardConfigSvc;
        chartConfigService = chartConfigSvc;
        dashboardGridService = dashboardGridSvc;
        dashboardService = dashboardSvc;
        campaignsModel = campaignsMdl;

        //DashboardController = $controller('DashboardCtrl', {
        //    $scope: scope,
        //    dashboardConfigSvc: dashboardConfigService,
        //    chartConfigSvc: chartConfigService,
        //    dashboardGridSvc: dashboardGridService,
        //    campaignInfoMdl: campaignInfoModel,
        //    dashboardSvc: dashboardService
        //});

        $rootScope.$digest();
    }));

    describe('Dashboard Models', function () {
        var campaignTimingModel, summaryCampaignModel, summaryLineItemModel,
            campaignData = {
                "id": "5095",
                "name": "Alive Robots Media Sun Battery Production",
                "start_date": "01-12-2015 18:17:22",
                "end_date": "03-20-2015 10:10:12"
            },
            campaignTimingData = {
                "budget_spend": {
                    "name": "Revenue",
                    "data": [
                        {"x": 1420066800000, "y": 1000},
                        {"x": 1420153200000, "y": 2000},
                        {"x": 1420239600000, "y": 3000},
                        {"x": 1420326000000, "y": 2500},
                        {"x": 1420412400000, "y": 1500},
                        {"x": 1420498800000, "y": 3500},
                        {"x": 1420585200000, "y": 1752},
                        {"x": 1420671600000, "y": 2356},
                        {"x": 1420758000000, "y": 3565},
                        {"x": 1420844400000, "y": 1020},
                        {"x": 1420930800000, "y": 3250},
                        {"x": 1421017200000, "y": 2345},
                        {"x": 1421103600000, "y": 3212},
                        {"x": 1421250876291, "y": 2255}
                    ]
                }
            },
            campaignSummaryData = {
                "id": "4841",
                "name": "Starcom Cineworld The Hobbit TV Sync",
                "spend_revenue": "$38,232 / $39,232",
                "spend_period": "50",
                "revenue_period": "60",
                "media_cost": "$19,123",
                "party_cost": "$1,196",
                "overall_budget": "$50,000",
                "profit_margin": "25%",
                "period": "1 Dec, 14 - 31 Mar, 14",
                "date_period": "60",
                "impressions": "141,094",
                "impressions_cost": "$2,43",
                "clicks": "141,094",
                "clicks_cost": "$2,43",
                "conversions": "980",
                "conversions_cost": "$24",
                "ctr": "0.4%",
                "cr": "0.002%",
                "bid_rate": "12,5%",
                "win_rate": "28%",
                "isCampaign": true
            },
            lineItemSummaryData = [{
                "id": "4842",
                "name": "Manhattan, CPI",
                "spend_revenue": "$5,754 / $7,454",
                "spend_period": "50",
                "revenue_period": "60",
                "media_cost": "$19,123",
                "party_cost": "$1,196",
                "overall_budget": "$25,000",
                "profit_margin": "29%",
                "period": "1 Dec, 14 - 31 Mar, 14",
                "date_period": "60",
                "impressions": "128,000",
                "impressions_cost": "$2,43",
                "clicks": "128,000",
                "clicks_cost": "$2,43",
                "conversions": "",
                "conversions_cost": "",
                "ctr": "0.1%",
                "cr": "—",
                "bid_rate": "15%",
                "win_rate": "25%",
                "isCampaign": false
                }];
        beforeEach(inject(function (_$httpBackend_, campaignTimingMdl, summaryCampaignMdl, summaryLineItemMdl ) {
            campaignTimingModel = campaignTimingMdl;
            summaryCampaignModel = summaryCampaignMdl;
            summaryLineItemModel = summaryLineItemMdl;
            httpBackend = _$httpBackend_;
        }));

        afterEach(function () {
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });

        it('should return campaign info data', inject(function () {
            httpBackend.expectGET('/api/v1/data/campaigns/5547').respond(campaignData);
            var campaign = campaignsModel.get('5547'),
                resolvedCampaign;

            campaign.then(function(response) {
                resolvedCampaign = response.plain();
            });
            httpBackend.flush();
            expect(resolvedCampaign).toEqual(campaignData);
        }));

        it('should return campaign info data with helper', inject(function () {
            httpBackend.expectGET('/api/v1/data/campaigns/5547').respond(campaignData);
            var campaign = campaignsModel.get('5547'),
                resolvedCampaign;

            campaign.then(function(response) {
                resolvedCampaign = response.plain();
            });
            httpBackend.flush();
            expect(_.keys(resolvedCampaign)).toEqual(_.keys(campaignData));
        }));

        it('should return campaign timing data', inject(function () {
            httpBackend.expectGET('/rest/reporting/campaigns/5547/summary/timing').respond(campaignTimingData);
            var campaignTiming = campaignTimingModel.get('5547'),
                resolvedCampaignTiming;

            campaignTiming.then(function(response) {
                resolvedCampaignTiming = response.plain();
            });
            httpBackend.flush();
            expect(resolvedCampaignTiming).toEqual(campaignTimingData);
        }));

        it('should return campaign summary data', inject(function () {
            httpBackend.expectGET('/api/v1/reporting/campaigns/5547/summary').respond(campaignSummaryData);
            var campaignSummary= summaryCampaignModel.get('5547'),
                resolvedCampaignSummary;

            campaignSummary.then(function(response) {
                resolvedCampaignSummary = response.plain();
            });
            httpBackend.flush();
            expect(resolvedCampaignSummary).toEqual(campaignSummaryData);
        }));

        it('should return line item summary data', inject(function () {
            httpBackend.expectGET('/api/v1/reporting/campaigns/5547/line_items/summary').respond(lineItemSummaryData);
            var lineItemSummary = summaryLineItemModel.getAll('5547'),
                resolvedLineItemSummary;

            lineItemSummary.then(function(response) {
                resolvedLineItemSummary = response.plain();
            });
            httpBackend.flush();
            expect(resolvedLineItemSummary).toEqual(lineItemSummaryData);
        }));
    });
});

