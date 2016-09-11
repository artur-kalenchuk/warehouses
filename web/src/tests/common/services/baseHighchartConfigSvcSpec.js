describe("baseHighchartConfigSvc", function () {

    beforeEach(module('xenta.common'));

    it("should set title correct", inject(function (BaseHighchartConfigSvc) {
        var configWithoutTitle = new BaseHighchartConfigSvc({
                options: {}
            }),
            configWithTitle = new BaseHighchartConfigSvc({
                options: {},
                title: {
                    test: 'My Title'
                }
            });

        configWithoutTitle.setTitle('title1');
        configWithTitle.setTitle('title2');

        expect(configWithoutTitle.config.title.text).toBe('title1');
        expect(configWithTitle.config.title.text).toBe('title2');
    }));

    it("should set data arrays for series correct", inject(function (BaseHighchartConfigSvc) {
        var config = new BaseHighchartConfigSvc({
                options: {},
                title: {
                    test: 'My Title'
                },
                series: []
            });

        config.setSeriesData([
            [ 1, 2, 3 ],
            [ 3, 4, 5 ]
        ]);

        expect(config.config.series[0].data).toEqual([1, 2, 3]);
        expect(config.config.series[1].data).toEqual([3, 4, 5]);
    }));
});
