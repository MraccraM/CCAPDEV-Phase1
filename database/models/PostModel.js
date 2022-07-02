const mongoose = require('mongoose');
const commentsmodel=require('./CommentsModel')

var PostSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: "kitten.jpg"
    },
    title: {
        type: String
    },
    content: {
        type: String,
        required: true
    },
    upvotes: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date()
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: commentsmodel
        }
    ]
})

module.exports = mongoose.model('Post', PostSchema);