/** */
const userController = require('../../../src/controllers/user.control.js');
const assert = require('chai').assert;
const should = require('chai').should;

describe ("User Controller: ", () => {
    let UserController;
    before( () => {
        UserController = new userController;
    })

    after ( () => {
        UserController = null;
    })

    it ("sets and gets the value of the info property", () => {
        let info = {

        }

        UserController.setInfo(info);
        assert.strictEqual(UserController.getInfo(), info);
    })
    
    it ("Should fetch posts for a user from the database", async () => {
        let result = await UserController.fetchInfoFromDatabase();
        assert.isObject(result);
    })

    it ("Should save user's information to database", async () => {
        let result = await UserController.saveToDatabase();
        assert.isTrue(result.success);
    })
})