const mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profilePhoto: {
        type: String,
        default: "kittens.jpg"
    },
    bio: {
        type: String,
        default: "My Profile!"
    },
    posts: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('User', UserSchema);