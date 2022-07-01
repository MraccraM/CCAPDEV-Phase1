const db = require("../database/db.js");
const Post = require("../database/models/PostModel.js");
const comment = require("../database/models/CommentsModel.js");
const card_post = require("../database/models/card_postModel.js");
const user = require ("../database/models/UserModel.js");

//Application stuff
const controller = {

    getFavicon: function (req, res) {
        res.status(204);
    },

    getIndex: async (req,res) => {
        const posts = await Post.find({})
        res.render('index' , {posts})
    },

    addPost: function (req, res) {
        
    },

    getProfile: function (req,res) {

    },

    userLogout: function (req,res) {

    },
    
}

module.exports = controller;