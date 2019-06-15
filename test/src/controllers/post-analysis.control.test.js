/** */
const postAnalysisController = require('../../../src/controllers/post-analysis.control');
const assert = require('chai').assert;

describe ("Post Analysis Controller Tests:", () => {
    let PostAnalysisController;
    before(() => {
        PostAnalysisController = new postAnalysisController;
    })

    after(() => {
        PostAnalysisController = null;
    })

    it ("sets and gets Post analysis info", () => {
        let info = {};
        PostAnalysisController.setInfo(info);
        assert.equal(PostAnalysisController.getInfo(), info);
    })

    it ("Saves post analysis info to database", async () => {
        let result = await PostAnalysisController.saveToDatabase();
        assert.isTrue(result.success);
    })
})