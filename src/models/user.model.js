/** */
const mongoose = require('mongoose');
const UserSchema = mongoose.Schema;

const userSchema = new UserSchema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    gender: {type: String, required: false},
    level: {type: String, required: true},
    isActive: {type: Boolean, required: true}
});

const User = module.exports = mongoose.model('User', userSchema);

module.exports.createRecord = async data => {
    data = new User(data);
    return await data.save();
}

module.exports.readRecordById = async _id => {
    return await User.findOne({
        isActive: true,
        _id
    })
}

module.exports.readRecordByLogin = async email => {
    return await User.findOne({
        isActive: true,
        email
    })
}

module.exports.readAllRecords = async () => {
    return await User.find({
        isActive: true
    })
}

module.exports.updateRecord = async data => {
    return await User.updateOne(
        {_id: data._id},
        {...data}
    )
}
module.exports.deleteRecord = async _id => {
    return await User.updateOne(
        {_id},
        {isActive: false}
    )
}