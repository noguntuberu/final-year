/** */
const mongoose = require('mongoose');
const config = require('../../../config/config');
const assert = require('chai').assert;
const userActionController = require('../../../src/controllers/user-action.control');

describe ("UserAction Controller Test:", () => {
    let UserActionController;

    before(async () => {
        UserActionController = new userActionController;
        await config.setUpDatabase(mongoose);
    })

    after(async () => {
        UserActionController = null;
    })

    it ("Sets and Gets info", () => {
        let info = {
            userId: "xyz",
            postId: "uytcghj",
            like: true,
            dislike: false
        };

        UserActionController.setInfo(info);
        assert.equal(UserActionController.getInfo(), info);
    })

    it ('Adds a new record to database', async () => {
        let result = await UserActionController.createDatabaseRecord("user_id_1", "post_id_2", true, false);
        assert.isTrue(result.success);
    })

    it ("Saves info to database", async () => {
        UserActionController.setInfo({
            userId: "xyz",
            postId: "uytcghj",
            like: true,
            dislike: false
        })

        let result = await UserActionController.saveToDatabase();
        assert.isTrue(result.success);
    })
})