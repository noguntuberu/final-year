/** */
const assert = require('chai').assert;
const postController =  require('../../../src/controllers/post.control');

describe ("Post Controller Tests:", () => {
    let PostController;

    before (() => {
        PostController = new postController;
    })

    after (() => {
        PostController = null;
    })

    it ("Sets and gets Post info", () => {
        let info = 'test info';
        PostController.setInfo(info);
        assert.equal(PostController.getInfo(), info);
    })

    it ("Saves post info to database", async () => {
        let result = await PostController.saveToDatabase();
        assert.isTrue(result.success);
    })

    it ("removes a post from database", async () => {
        let result = await PostController.removeFromDatabase();
        assert.isTrue(result.success);
    })
})