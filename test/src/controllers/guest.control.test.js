/** */
const mongooose = require('mongoose');
const assert = require('chai').assert;
const config = require('../../../config/config');
const guestController = require('../../../src/controllers/guest.control');

describe ("Guest Controller Tests:", () => { 
    let Guest;

    before( async () => {
        await config.setUpDatabase(mongooose, process.env.TEST_DB);
        Guest = new guestController;
    })

    it ("Sets and gets guest info", () => {
        let info = "test info";
        Guest.setInfo(info);
        assert.equal(Guest.getInfo(), info);
    })

    it ("Creates a new user", async () => {
        let newData = {
            firstName: "Nathan",
            lastName: "Oguntuberu",
            email: "nathanoguntuberu@gmail.com",
            password: "nate.test",
            gender: 'M',
            level: 2,
            isActive: true
        }

        Guest.setInfo(newData);
        const result = await Guest.register();
        assert.isObject(result);
    })
})