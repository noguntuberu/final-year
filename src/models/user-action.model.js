/**
 * 
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userAction = new Schema({
    userId: {type: String, required: true},
    postId: {type: String, required: true},
    like: {type: Boolean, required: true},
    dislike: {type: Boolean, required: true}
});

const UserAction = module.exports = mongoose.model('UserAction', userAction);

// MODEL ACTIONS
module.exports.createRecord = async data => {
    const newData = new UserAction(data);
    return await newData.save();
}

module.exports.readRecord = async userId => {
    return await UserAction.findOne({
        userId
    })
}

module.exports.updateRecord = async data => {
    return await UserAction.updateOne(
        {_id: data._id},
        {...data}
    )
}