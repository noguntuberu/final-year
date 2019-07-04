/** */
const modelImporter = require('../models/model-importer');
const userActionModel = modelImporter('UserAction', '../models/user-action.model.js');

module.exports = class UserActionController {
     constructor() {
          this.info = {};
          this.userActionModel = userActionModel;
     }

     setInfo(info) {
          this.info = info;
     }

     getInfo() {
          return this.info;
     }

     async fetchRecordsForUser(userId) {
          return JSON.parse(JSON.stringify(
               await this.userActionModel.readAllRecordsForUser(userId)
          ));
     }

     async doesRecordExist(userId, postId) {
          const result = await this.userActionModel.readRecord(userId, postId);
          if (result) {
               return true;
          }
          return false;
     }

     async createDatabaseRecord(userId, postId, like = false, dislike = false) {
          const result = await this.userActionModel.createRecord({userId , postId, like, dislike});
          if (result) {
               this.setInfo(JSON.stringify(result));
               return {
                    success: true,
                    payload: "Action added"
               }
          }

          return {
               success: false,
               payload: "Action not added"
          }
     }

     async saveToDatabase(data) {
          const result = await this.userActionModel.updateRecord(data);
          if (result.ok) {
               return {
                    success: true,
                    payload: "Action updated"
               }
          }

          return {
               success: false,
               payload: "Action not updated"
          }
     }    
} 