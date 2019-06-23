/** */
const mongoose = require('mongoose');
const assert = require('chai').assert;
const groupAnalysisController = require('../../../src/controllers/group-analysis.control');

describe ("Group-Analysis Controller Tests:", () => {
    let GroupAnalysisController;

    before(() => {
        GroupAnalysisController = new groupAnalysisController;
    })

    after( async () => {
        mongoose.model('GroupAnalysis').remove({});
    })

    it ("Sets and Gets group analysis info", () => {
        let info = {};
        GroupAnalysisController.setInfo(info);
        assert.equal(GroupAnalysisController.getInfo(), info);
    })

    it ("Creates new group analysis", async () => {
        const result = await GroupAnalysisController.createDatabaseRecord({
            postId: 'post1',
            className: 'country',
            groupName: 'Nigeria',
            negativeScore: 0,
            positiveScore: 0,
            resultantScore: 0
        });

        assert.isTrue(result.success);
    })

    it ("Saves information to Database", async () => {
        let result = await GroupAnalysisController.saveToDatabase();
        assert.isTrue(result.success)
    })
})