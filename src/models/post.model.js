/** */
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const postSchema = new schema({
    userId: {type: String, required: true},
    title: {type: String, required: true},
    body: {type: String, required: true},
    mediaUri: {type: String, required: false},
    dateCreated: {type: Number, required: true},
    audience: {type: String, required: true},
    isActive: {type: Boolean, required: true}
})

const Post = module.exports = mongoose.model('Post', postSchema);

// MODEL ACTIONS
module.exports.createRecord = async data => {
    const newData = new Post(data);
    return await newData.save();
}

module.exports.readRecordById = async _id => {
    return await Post.findOne({
        _id,
        isActive: true
    });
}

module.exports.readRecordsByAdmin = async userId => {
    return await Post.find({
        userId,
        isActive: true
    });
}

module.exports.readRecords = async () => {
    return await Post.find({
        isActive: true
    });
}

module.exports.updateRecord = async data => {
    return Post.updateOne(
        {_id: data._id},
        {...data}
    );
}