/** */
const modelImporter = require('../models/model-importer');
const postAnalysisModel = modelImporter('PostAnalysis', '../models/post-analysis.model.js');

//
module.exports = class PostAnalysisController {
    constructor(postId) {
        this.postId = postId;
        this.info = {};
        this.postAnalysisModel = postAnalysisModel;
    }

    setInfo(info) {
        this.info = info;
    }

    getInfo() {
        return this.info;
    }

    incrementPositveScore(score) {
        this.info = {
            ...this.info,
            positiveScore: this.info.positiveScore + score
        }
    }

    incrementNegativeScore(score) {
        this.info = {
            ...this.info,
            positiveScore: this.info.positiveScore + score
        }
    }

    async createDatabaseRecord() {
        const result = await this.postAnalysisModel.createRecord({
            postId: this.postId,
            negativeScore: 0,
            positiveScore: 0,
            resultantScore: 0
        });

        if (result) {
            this.setInfo(JSON.parse(JSON.stringify(result)));
            return {
                success: true,
                payload: "Post Analysis Added"
            }
        }

        return {
            success: false,
            payload: "Post Analysis not added"
        }
    }

    async saveToDatabase() {
        const result = await this.postAnalysisModel.updateRecord(this.info);

        if(result.ok) {
            return {
                success: true,
                payload: "Post Analysis Added"
            }
        }

        return {
            success: false,
            payload: "Post Analysis not added"
        }
    }
} 