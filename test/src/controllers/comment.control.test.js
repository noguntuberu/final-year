/** */
const mongoose = require('mongoose');
const commentController = require('../../../src/controllers/comment.control');
const assert = require('chai').assert;

describe ("Comment Controller Tests:", () => {
    let CommentController;

    before(() => {
        CommentController = new commentController;
    })

    after(async () => {
        CommentController = null;
        await mongoose.model('Comment').remove({});
    })

    it ("sets and gets CommentController info", () => {
        let info = {}
        CommentController.setInfo(info);
        assert.equal(CommentController.getInfo(), info);
    })

    it ("Should add a comment to the database", async () => {
        const result = await CommentController.createDatabaseRecord({
            postId: "post1",
            userId: "user1",
            body: "This is my comment",
            dateCreated: 89786754234,
            score: -0.54,
        }); 

        assert.isTrue(result.success);
    })

    it ("Should fetch Comment info from database", async () => {
        let result = await CommentController.fetchInfoFromDatabase();
        assert.isObject(result);
    })

    it ("Saves info to database", async () => {
        let result = await CommentController.saveToDatabase();
        assert.isTrue(result.success);
    })
})