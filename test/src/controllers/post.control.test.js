/** */
const assert = require('chai').assert;
const postController =  require('../../../src/controllers/post.control');

describe ("Post Controller Tests:", () => {
    let PostController;

    before (async () => {
        const testPost = {
            userId: 'user1',
            title: "First Post",
            body: "This is the body of the first post",
            mediaUri: 'ping.png',
            audience: 'all'
        }

        PostController = new postController();
        PostController.setInfo(testPost);
    })

    after (() => {
        PostController = null;
    })

    it ("Should create a new record", async () => {
        const result = await PostController.createNewRecord();
        assert.isTrue(result.success);
    })

    it ("Fetches info from the database", async () => {
        await PostController.fetchInfoFromDatabase();
        assert.isNotEmpty(PostController.getInfo());
    })
})