const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    timeStamp: {
        type: Date,
        default: Date.now
    },
});
const User = mongoose.model('user', UserSchema);
// User.createIndexes(); // Commiting this because 2 indexes are formed
module.exports = User;