const db = require("../database/db.js");
const Post = require("../database/models/PostModel.js");
const comment = require("../database/models/CommentsModel.js");
const card_post = require("../database/models/card_postModel.js");
const user = require ("../database/models/UserModel.js");

const controller = {

    getFavicon: function (req, res) {
        res.status(204);
    },

    getIndex: function (req,res) {
        res.render('card_post.hbs');
    }
}

module.exports = controller;