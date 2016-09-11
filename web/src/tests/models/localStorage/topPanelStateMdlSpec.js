describe("topPanelStateMdl", function () {
    var model;

    beforeEach(module('xenta.models.localStorage'));

    beforeEach(inject(function (topPanelStateMdl) {
        model = topPanelStateMdl;
    }));

    it("should save to localStorage and than return the same value", function () {
        var data = {test: 1},
            receivedData;

        model.save(data);
        receivedData = model.get();

        expect(receivedData).toEqual(data);
    });
});