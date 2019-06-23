/** */
const modelImporter = require('../models/model-importer');
const postModel = modelImporter('Post', '../models/post.model.js');

module.exports = class PostController {
    constructor() {
        this.info;
        this.postModel = postModel;
    }
    setId(id) {
        this.id = id;
    }

    getId() {
        return this.id;
    }

    setInfo(info) {
        this.info = info;
    }

    getInfo() {
        return this.info;
    }

    async createNewRecord() {
        const newPost = {
            ...this.info,
            dateCreated: Date.now(),
            isActive: true
        }
        const result = await this.postModel.createRecord(newPost);
        if (result) {
            let addedPost = JSON.parse(JSON.stringify(result));
            this.setInfo(addedPost);
            return {
                success: true,
                payload: {
                    ...addedPost
                }
            }
        }

        return {
            success: false,
            payload: {
                message: "Could not create new post"  
            } 
        }
    }

    async fetchInfoFromDatabase() {
        this.setInfo( await this.postModel.readRecordById(this.info._id));
    }

    async fetchAll() {
        return await this.postModel.readRecords();
    }

    async saveToDatabase() {
        
    }
} 