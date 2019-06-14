/** */
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const postStatSchema = new schema({
    postId: {type: String, required: true},
    viewCount: {type: Number, required: true},
    commentCount: {type: Number, required: true},
    likeCount: {type: Number, required: true},
    dislikeCount: {type: Number, required: true}
});

const PostStat = module.exports = mongoose.model('PostStat', postStatSchema);

// MODEL ACTIONS
module.exports.createRecord = async data => {
    const newData = new PostStat(data);
    return await newData.save();
}

module.exports.readRecord = async postId => {
    return await PostStat.findOne({
        postId
    });
}

module.exports.updateRecord = async data => {
    return await PostStat.updateOne(
        {_id: data._id},
        {...data}
    );
}