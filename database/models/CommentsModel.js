const mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
    commentAuthor: {
        type: String,
        required: true
    },
    commentAuthorimg: {
        type: String,
        default: "kitten.jpg"
    },
    postAuthor: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    upvotes: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('Comment', CommentSchema);