/**
 * Tests sit right alongside the file they are testing, which is more intuitive
 * and portable than separating `src` and `test` directories. Additionally, the
 * build process will exclude all `.spec.js` files from the build
 * automatically.
 */
describe('splitByMdl', function () {
    beforeEach(module('xenta'));
    beforeEach(module('xenta.campaigns.campaign.reporting'));
    beforeEach(module('xenta.campaigns.campaign.reporting.analysis'));

    var $rootScope,
        httpBackend,
        splitByModel;

    beforeEach(inject(function (_$rootScope_, _$httpBackend_, splitByMdl) {
        $rootScope = _$rootScope_;
        httpBackend = _$httpBackend_;
        splitByModel = splitByMdl;
    }));

    var splitByCampaignData = {
            "_metadata": {
                "totalCount": "4"
            },
            "entities": [
                {
                    "id": "4842",
                    "name": "USA",
                    "location": "USA",
                    "budget_spend": "19754",
                    "revenue": "21454",
                    "profit_margin": "29",
                    "impressions": "128000",
                    "impressions_cost": "2.43",
                    "clicks": "128000",
                    "clicks_cost": "2.43",
                    "conversions": "0",
                    "conversions_cost": "24",
                    "ctr": "0.1",
                    "cr": "0",
                    "bidRate": "15",
                    "winRate": "25"
                },
                {
                    "id": "4843",
                    "name": "Canada",
                    "location": "CAN",
                    "budget_spend": "10320",
                    "revenue": "12427",
                    "profit_margin": "21",
                    "impressions": "13094",
                    "impressions_cost": "2.43",
                    "clicks": "13094",
                    "clicks_cost": "2.43",
                    "conversions": "980",
                    "conversions_cost": "24",
                    "ctr": "0.3",
                    "cr": "0.002",
                    "bidRate": "10",
                    "winRate": "31"
                },
                {
                    "id": "4844",
                    "name": "Brazil",
                    "location": "BRA",
                    "budget_spend": "1754",
                    "revenue": "2454",
                    "profit_margin": "29",
                    "impressions": "12000",
                    "impressions_cost": "2.43",
                    "clicks": "28000",
                    "clicks_cost": "2.43",
                    "conversions": "0",
                    "conversions_cost": "0",
                    "ctr": "0.1",
                    "cr": "0",
                    "bidRate": "15",
                    "winRate": "25"
                },
                {
                    "id": "4845",
                    "name": "United Kingdom",
                    "location": "GBR",
                    "budget_spend": "320",
                    "revenue": "427",
                    "profit_margin": "21",
                    "impressions": "1094",
                    "impressions_cost": "2.43",
                    "clicks": "41094",
                    "clicks_cost": "2.43",
                    "conversions": "0",
                    "conversions_cost": "0",
                    "ctr": "0.3",
                    "cr": "0",
                    "bidRate": "10",
                    "winRate": "31"
                }
            ]
        },
        splitByLineItemData = {
            "_metadata": {
                "totalCount": "4"
            },
            "entities": [
                {
                    "id": "4842",
                    "name": "USA",
                    "location": "USA",
                    "budget_spend": "9754",
                    "revenue": "1454",
                    "profit_margin": "29",
                    "impressions": "28000",
                    "impressions_cost": "2.43",
                    "clicks": "28000",
                    "clicks_cost": "2.43",
                    "conversions": "0",
                    "conversions_cost": "24",
                    "ctr": "0.1",
                    "cr": "0",
                    "bidRate": "15",
                    "winRate": "25"
                },
                {
                    "id": "4843",
                    "name": "Canada",
                    "location": "CAN",
                    "budget_spend": "2320",
                    "revenue": "2427",
                    "profit_margin": "21",
                    "impressions": "3094",
                    "impressions_cost": "2.43",
                    "clicks": "3094",
                    "clicks_cost": "2.43",
                    "conversions": "980",
                    "conversions_cost": "24",
                    "ctr": "0.3",
                    "cr": "0.002",
                    "bidRate": "10",
                    "winRate": "31"
                },
                {
                    "id": "4844",
                    "name": "Brazil",
                    "location": "BRA",
                    "budget_spend": "754",
                    "revenue": "454",
                    "profit_margin": "29",
                    "impressions": "2000",
                    "impressions_cost": "2.43",
                    "clicks": "8000",
                    "clicks_cost": "2.43",
                    "conversions": "0",
                    "conversions_cost": "0",
                    "ctr": "0.1",
                    "cr": "0",
                    "bidRate": "15",
                    "winRate": "25"
                },
                {
                    "id": "4845",
                    "name": "United Kingdom",
                    "location": "GBR",
                    "budget_spend": "320",
                    "revenue": "427",
                    "profit_margin": "21",
                    "impressions": "194",
                    "impressions_cost": "2.43",
                    "clicks": "41094",
                    "clicks_cost": "2.43",
                    "conversions": "0",
                    "conversions_cost": "0",
                    "ctr": "0.3",
                    "cr": "0",
                    "bidRate": "10",
                    "winRate": "31"
                }
            ]
        },
        topItems = {
            top: [{
                name: 'Category 1',
                y: 1000
            },{
                name: 'Category 2',
                y: 1000
            },{
                name: 'Category 3',
                y: 1000
            },{
                name: 'Category 4',
                y: 1000
            },{
                name: 'Category 5',
                y: 1000
            },{
                name: 'Category 6',
                y: 1000
            },{
                name: 'Category 7',
                y: 1000
            },{
                name: 'Category 8',
                y: 1000
            },{
                name: 'Category 9',
                y: 1000
            },{
                name: 'Category 10',
                y: 1000
            }],
            other: {
                name: 'Other',
                y: 10000,
                count: 20
            }
        };

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('should return splitBy country data for campaign', inject(function () {
        httpBackend.expectGET('/api/v1/reporting/campaigns/5095/line_items/0/country?endDate=2015-03-20&startDate=2014-12-10').respond(splitByCampaignData);
        var splitByInfo = splitByModel.get('country', '5095', 0, {startDate: '2014-12-10', endDate: '2015-03-20'}),
            resolvedSplitByInfo;

        splitByInfo.then(function(response) {
            resolvedSplitByInfo = response.plain();
        });
        httpBackend.flush();
        expect(resolvedSplitByInfo).toEqual(splitByCampaignData);
    }));

    it('should return splitBy country data for lineItem', inject(function () {
        httpBackend.expectGET('/api/v1/reporting/campaigns/5095/line_items/10564/country?endDate=2015-03-20&startDate=2014-12-10').respond(splitByLineItemData);
        var splitByInfo = splitByModel.get('country', '5095', '10564', {startDate: '2014-12-10', endDate: '2015-03-20'}),
            resolvedSplitByInfo;

        splitByInfo.then(function(response) {
            resolvedSplitByInfo = response.plain();
        });
        httpBackend.flush();
        expect(resolvedSplitByInfo).toEqual(splitByLineItemData);
    }));

    it('should return top items for any splitBy', inject(function () {
        httpBackend.expectGET('/api/v1/reporting/campaigns/1000/line_items/10000/siteCategory/top?' +
                'endDate=2016-05-30&itemsPerPage=10&' +
                'order=' + encodeURIComponent(JSON.stringify([['clicks', false]])).replace(/%2C/gi, ',') + '&' +
                'page=0&startDate=2016-05-29'
            )
            .respond(topItems);

        var splitByInfo = splitByModel.getTopItems(
                'siteCategory', '1000', '10000',
                {
                    startDate: '2016-05-29',
                    endDate: '2016-05-30',
                    itemsPerPage: 10,
                    order: [['clicks', false]]
                }
            ),
            resolvedTopResponse;

        splitByInfo.then(function(response) {
            resolvedTopResponse = response.plain();
        });

        httpBackend.flush();
        expect(resolvedTopResponse).toEqual(topItems);
    }));
});
