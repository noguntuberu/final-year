/** */
const mongoose = require('mongoose');
const config = require('../../../config/config');
const userController = require('../../../src/controllers/user.control');
const guestController = require('../../../src/controllers/guest.control');
const assert = require('chai').assert;


let UserController;

describe ("User Controller: ", () => {
    
    before( async () => {
        await config.setUpDatabase(mongoose, process.env.TEST_DB);

        Guest = new guestController;
        Guest.setInfo({
            firstName: "Nathan",
            lastName: "Oguntuberu",
            email: "nateoguns@work.com",
            password: "nate.test",
            gender: "M",
            level: 2,
            isActive: true,
        })
        await Guest.register();
        let data = JSON.stringify(Guest.getInfo());
        UserController = new userController(JSON.parse(data)._id);
    })

    after ( async () => {
        UserController = null;
        await mongoose.model('User').remove({});
    })

    it ("sets and gets the value of the info property", () => {
        let info = {};

        UserController.setInfo(info);
        assert.strictEqual(UserController.getInfo(), info);
    })
    
    it ("Should fetch user info from the database", async () => {
        let result = await UserController.fetchInfoFromDatabase();
        assert.isTrue(result);
    })

    it ("Should save user's information to database", async () => {
        let result = await UserController.saveToDatabase();
        assert.equal(result, 1);
    })
})