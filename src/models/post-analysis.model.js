/** */
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const postAnalysisSchema = new schema({
    postId: {type: String, required: true},
    negativeScore: {type: Number, required: true},
    positiveScore: {type: Number, required: true},
    resultantScore: {type: Number, required: true}
});

const PostAnalysis = module.exports = mongoose.model('PostAnalysis', postAnalysisSchema);

// MODEL ACTIONS
module.exports.createRecord = async data => {
    const newData = new PostAnalysis(data);
    return await newData.save();
}

module.exports.readRecord = async postId => {
    return await PostAnalysis.findOne({
        postId
    });
} 

module.exports.updateRecord = async data => {
    return await PostAnalysis.updateOne(
        {postId: data.postId},
        {...data}
    );
}