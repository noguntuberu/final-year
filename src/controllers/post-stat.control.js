/** */
const modelImporter = require('../models/model-importer');
const postStatModel = modelImporter('PostStat', '../models/post-stat.model.js');

//
module.exports = class PostStatController {
    constructor() {
        this.info = {};
        this.postStatModel = postStatModel;
    }

    setInfo(info) {
        this.info = info;
    }

    getInfo() {
        return this.info;
    }

    async createDatabaseRecord(postId) {
        const result = await this.postStatModel.createRecord({
            postId: postId,
            viewCount: 0,
            commentCount: 0,
            likeCount: 0,
            dislikeCount: 0
        });

        if (result) {
            this.setInfo(JSON.parse(JSON.stringify(result)));
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
        return await this.postStatModel.readAllRecords();
    }

    async saveToDatabase() {
        const result = await this.postStatModel.updateRecord(this.info);
        if (result.ok) {
            return {
                success: true,
                payload: "Post Stat updated"
            }
        }

        return {
            success: false,
            payload: "Post Stat not updated"
        }
    }
}