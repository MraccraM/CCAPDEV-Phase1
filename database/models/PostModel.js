const mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    authorimg: {
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
    comments: [mongoose.SchemaTypes.ObjectId]
})

module.exports = mongoose.model('Post', PostSchema);