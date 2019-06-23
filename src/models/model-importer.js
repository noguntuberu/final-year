/** */
const mongoose = require('mongoose');

module.exports = (modelName, modelFileName = '') => {
    try {
        let model = mongoose.model(modelName);
        return model;
    } catch (err) {
        let model = require('./' + modelFileName);
        return model;
    }
}