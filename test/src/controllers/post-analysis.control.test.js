/** */
const mongoose = require('mongoose');
const postAnalysisController = require('../../../src/controllers/post-analysis.control');
const assert = require('chai').assert;

describe ("Post Analysis Controller Tests:", () => {
    let PostAnalysisController;
    before(() => {
        PostAnalysisController = new postAnalysisController('post1');
    })

    after(async () => {
        PostAnalysisController = null;
        await mongoose.model('PostAnalysis').remove({});
    })

    it ("sets and gets Post analysis info", () => {
        let info = {};
        PostAnalysisController.setInfo(info);
        assert.equal(PostAnalysisController.getInfo(), info);
    })

    it ("Creates a new post analysis record", async () => {
        let result = await PostAnalysisController.createDatabaseRecord();
        assert.isTrue(result.success);
    })

    it ("Saves post analysis info to database", async () => {
        let result = await PostAnalysisController.saveToDatabase();
        assert.isTrue(result.success);
    })
})