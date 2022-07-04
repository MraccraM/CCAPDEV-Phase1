const mongoose = require('mongoose');

var card_postSchema = new mongoose.Schema({
	title: String,
    upvotes: Number,
    author:{
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('Card_Post', card_postSchema);