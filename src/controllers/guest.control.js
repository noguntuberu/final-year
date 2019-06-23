/** */
const modelImporter = require('../models/model-importer');
const userModel = modelImporter('User', 'user.model.js');

module.exports = class GuestController {
    constructor() {
        this.info;
        this.userModel = userModel;
    }

    setInfo(info) {
        this.info = info;
    }

    getInfo() {
        return this.info;
    }
    async doesUserExist(email) {
        const result = await this.userModel.readRecordByLogin(email);
        return result ? true : false;
    }

    async fetchUserByEmail(email) {
        const result = await this.userModel.readRecordByLogin(email);
        if (result) {
            return JSON.parse(JSON.stringify(result));
        }
        return null;
    }

    async register() {
        // Check this.info for valid data
        if (await this.doesUserExist(this.info.email)) {
            return {
                success: false,
                payload: "User already exists"
            }
        }
        let result = await this.userModel.createRecord(this.info);
        if (result) {
            this.setInfo(result);
            return {
                success: true,
                payload: "User added successfully"
            }
        }

        return {
            success: false,
            payload: "User was not added"
        }
    }

    async login() {
        const userData = await this.fetchUserByEmail(this.info.email);
        if (userData) {
            if (userData.password !== this.info.password) {
                return {
                    success: false,
                    payload: "Username/Password incorrect"
                }
            } else {
                return {
                    success: true,
                    payload: {
                        userId: userData._id,
                        name: userData.firstName + " " + userData.lastName,
                        token: "unique token"
                    }
                }
            }
        }
        return {
            success: false,
            payload: "User does not exist"
        }
    }

}