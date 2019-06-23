/** */
const mongoose = require('mongoose');
const assert = require('chai').assert;
const postStatController = require('../../../src/controllers/post-stat.control');

describe ("Post Stat Controller Tests:", () => {
    let PostStatController;

    before (() => {

        PostStatController = new postStatController();
    })

    after ( async () => {
        PostStatController = null;
        await mongoose.model('PostStat').remove({});
    })

    it ("Sets and gets post stat info", () => {
        let info = {name: "ola"};
        PostStatController.setInfo(info);
        assert.equal(PostStatController.getInfo(), info);
    })

    it ("Creates a new post stat record", async () => {
        let result = await PostStatController.createDatabaseRecord('post1');
        assert.isTrue(result.success); 
    })

    it ("Save stat info to database", async () => {
        let result = await PostStatController.saveToDatabase();
        assert.isTrue(result.success);
    })
    
})