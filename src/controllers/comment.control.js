/** */
const modelImporter = require('../models/model-importer');
const commentModel = modelImporter('Comment', '../models/comment.model.js');

//
module.exports = class CommentController {
    constructor() {
        this.id;
        this.info;
        this.commentModel = commentModel;
    }

    setId(id) {
        this.id = id;
    }

    getId(){
        return this.id;
    }

    setInfo(info) {
        this.info = info;
    }

    getInfo() {
        return this.info;
    }

    async fetchAll() {
        const result = await this.commentModel.readAllRecords();
        if (result) {
            return {
                success: true,
                payload: JSON.parse(JSON.stringify(result))
            }
        }

        return {
            success: false,
            payload: {}
        }
    }

    async createDatabaseRecord(data) {
        const result = await this.commentModel.createRecord({
            ...data,
            isActive: true
        });

        if (result) {
            this.setInfo(JSON.parse(JSON.stringify(result)));
            this.setId(this.info._id);
            return {
                success: true,
                payload: "Comment added"
            }
        }

        return {
            success: false,
            payload: "Comment not added"
        }
    }

    async fetchInfoFromDatabase() {
        const result = await this.commentModel.readRecordById(this.id);
        
        if (result) {
            this.setInfo(JSON.parse(JSON.stringify(result)));
            return {
                success: true,
                payload: "Comment added"
            }
        }

        return {
            success: false,
            payload: "Comment not added"
        }
    }

    async saveToDatabase() {
        const result = await this.commentModel.updateRecord(this.getInfo());

        if (result.ok) {
            this.setInfo(JSON.parse(JSON.stringify(result)));
            return {
                success: true,
                payload: "Comment added"
            }
        }

        return {
            success: false,
            payload: "Comment not added"
        }
    }
} 