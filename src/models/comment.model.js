/** */
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const commentSchema = new schema ({
    postId: {type: String, required: true},
    userId: {type: String, required: true},
    body: {type: String, required: true},
    dateCreated: {type: Number, required: true},
    score: {type: Number, required: true},
    isActive: {type: Boolean, required: true}
});

const Comment = module.exports = mongoose.model('Comment', commentSchema);

// MODEL ACTIONS
module.exports.createRecord = async data => {
    const newData = new Comment(data);
    return await newData.save();
}

module.exports.readRecordById = async _id => {
    return await Comment.findOne({
        _id,
        isActive: true
    });
}

module.exports.readRecordsByPost = async postId => {
    return await Comment.find({
        postId,
        isActive: true
    });
}

module.exports.updateRecord = async data => {
    return await Comment.updateOne(
        {_id: data._id},
        {...data}
    );
}

module.exports.deleteRecord = async _id => {
    return await Comment.updateOne(
        {_id},
        {isActive: false}
    );
}

