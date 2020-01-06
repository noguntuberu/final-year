/** */
const modelImporter = require('../models/model-importer');
const userModel = modelImporter('User', '../models/user.model.js');

class UserController {
    constructor(id) {
        this.id = id;
        this.info;
        this.userModel = userModel;
    }

    setInfo(info) {
        this.info = info;
    }

    getInfo() {
        return this.info;
    }

    async createDatabaseRecord(data) {
        const result = await this.userModel.createRecord({
            ...data,
            isActive: true
        });

        if (result) {
            return {
                success: true,
                payload: result
            }
        }

        return {
            success: false,
            payload: {}
        }
    }

    async fetchAll() {
        const result = await this.userModel.readAllRecords();
        if (result) {
            return {
                success: true,
                payload: result
            }
        }

        return {
            success: false,
            payload: []
        }
    }

    async fetchInfoFromDatabase() {
        let result = await this.userModel.readRecordById(this.id);
        if (result) {
            this.setInfo(JSON.stringify(result));
            return true;
        }
        return false;
    }

    async saveToDatabase() {
        let result = await this.userModel.updateRecord(JSON.parse(this.info));
        return result.ok;
    }
    

}

module.exports = UserController;