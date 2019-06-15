/** */
const assert = require('chai').assert;
const groupAnalysisController = require('chai').assert;

describe ("Group-Analysis Controller Tests:", () => {
    let GroupAnalysisController;
    before(() => {
        GroupAnalysisController = new groupAnalysisController;
    })
    it ("Sets and Gets group analysis info", () => {
        let info = {};
        GroupAnalysisController.setInfo(info);
        assert.equal(GroupAnalysisController.getInfo(), info);
    })

    it ("Saves information to Database", async () => {
        let result = await GroupAnalysisController.saveToDatabase();
        assert.isTrue(result)
    })
})