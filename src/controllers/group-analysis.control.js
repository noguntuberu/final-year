/** */
const modelImporter = require('../models/model-importer');
const groupAnalysisModel = modelImporter('GroupAnalysis', '../models/group-analysis.model.js');

//
module.exports = class GroupAnalysisController {
    constructor() {
        this.id;
        this.info ={};
        this.groupAnalysisModel = groupAnalysisModel;
    }

    setInfo(info) {
        this.info = info;
    }

    getInfo() {
        return this.info;
    }

    setId(id) {
        this.id = id;
    }

    getId() {
        return this.id;
    }

    async createDatabaseRecord(data) {
        const result = await this.groupAnalysisModel.createRecord(data);

        if (result) {
            this.setInfo(JSON.parse(JSON.stringify(result)));
            return {
                success: true,
                payload: "Group Analysis added"
            }
        }

        return {
            success: false,
            payload: "Group Analysis not added"
        }
    }

    async saveToDatabase() {
        const result = await this.groupAnalysisModel.updateRecord(this.info);
        if (result.ok) {
            this.setInfo(JSON.parse(JSON.stringify(result)));
            return {
                success: true,
                payload: "Group Analysis added"
            }
        }

        return {
            success: false,
            payload: "Group Analysis not added"
        }
    }

} 