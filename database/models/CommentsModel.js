const mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
    commentAuthor: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date()
    }
})

module.exports = mongoose.model('Comment', CommentSchema);