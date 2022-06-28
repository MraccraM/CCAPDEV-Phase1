const mongoose = require('mongoose');



var PostSchema_Test = new mongoose.Schema({
	title: {
        type: String
    },
    content: {
        type: String     
    },
    image: {
        type: String
    },
	upvotes: {
        type: Number
    },
    uploader: {
        type: String
    }
});

module.exports = mongoose.model('Post_Test', PostSchema_Test);
