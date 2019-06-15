/** */
const commentController = require('../../../src/controllers/comment.control');
const assert = require('chai').assert;

describe ("Comment Controller Tests:", () => {
    let CommentController;

    before(() => {
        CommentController = new commentController;
    })

    after(() => {
        CommentController = null;
    })

    it ("sets and gets CommentController info", () => {
        let info = {}
        CommentController.setInfo(info);
        assert.equal(CommentController.getInfo(), info);
    })

    it ("Should fetch Comment info from database", async () => {
        let result = await CommentController.fetchInfoFromDatabase();
        assert.isObject(result);
    })

    it ("Saves info to database", async () => {
        let result = await CommentController.saveToDatabase();
        assert.isTrue(result);
    })
})