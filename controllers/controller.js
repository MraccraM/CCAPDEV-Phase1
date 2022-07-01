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

<<<<<<< HEAD
    getIndex: async (req,res) => {
        const posts = await Post.find({})
        res.render('index' , {posts})
    },

    addPost: function (req, res) {
        
    },

    getProfile: function (req,res) {

=======
    getIndex: function (req,res) {
        db.findMany(card_post, {}, {_id: 0, name: 1, refno: 1, amount: 1}, (result) =>{
            console.log(result);
            res.render('index', {cardPosts:result});
        })
    },

    addPost: function (req,res) {
        res.render('addPost');
    },

    getProfile: function (req,res) {
        
>>>>>>> 329b9276dcf54f09051a96045181e33aba5348a8
    },

    userLogout: function (req,res) {

    },
<<<<<<< HEAD
    
=======

    submitPost: function (req,res) {
        let data = {
            title: req.query.title,
            content: req.query.content,
            upvotes: req.query.upvotes,
            author: req.query.author,
            image: req.query.image
        }

        db.insertOne(card_post, data, (result) => {
            res.render("partials\\card_post", data, function(error, html) {
                res.send(html);
            });
        });
    },
>>>>>>> 329b9276dcf54f09051a96045181e33aba5348a8
}

module.exports = controller;