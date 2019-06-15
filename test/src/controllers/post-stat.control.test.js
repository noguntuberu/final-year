/** */
const assert = require('chai').assert;
const postStatController = require('../../../src/controllers/post-stat.control');

describe ("Post Stat Controller Tests:", () => {
    let PostStatController;

    before (() => {
        PostStatController = new postStatController;
    })

    after (() => {
        PostStatController = null;
    })

    it ("Sets and gets post stat info", () => {
        let info = {};
        PostStatController.setInfo(info);
        assert.equal(PostStatController.getInfo(), info);
    })

    it ("Save stat info to database", async () => {
        let result = await PostStatController.saveToDatabase();
        assert.isTrue(result.success);
    })
    
})