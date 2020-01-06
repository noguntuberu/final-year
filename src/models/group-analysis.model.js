/** */
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const groupAnalysisSchema = new schema ( {
    postId: {type: String, required: true},
    className: {type: String, required: true},
    groupName: {type: String, required: true},
    negativeScore: {type: Number, required: true},
    positiveScore: {type: Number, required: true},
    resultantScore: {type: Number, required: true}
});

const GroupAnalysis = module.exports = mongoose.model('GroupAnalysis', groupAnalysisSchema);

// MODEL ACTIONS
module.exports.createRecord = async data => {
    const newData = new GroupAnalysis(data);
    return await newData.save();
}

module.exports.readRecord = async _id => {
    return await GroupAnalysis.findOne({
        _id
    }); 
}

module.exports.readRecordByPost = async postId => {
    return await GroupAnalysis.find({
        postId
    });
}

module.exports.updateRecord = async data => {
    return await GroupAnalysis.updateOne(
        {_id: data._id},
        {...data}
    );
}