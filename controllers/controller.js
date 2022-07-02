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
        const posts = await Post.find({}).sort({ date: 'desc' })
        res.render('index' , {posts});
    },

    addPost: function (req, res) {
        res.render('addPost');
    },

    submitPost: async (req,res) => {
        const post = new Post({
            title: req.body.title,
            author: req.body.author,
            content: req.body.content
        })

        try{
            post = await post.save();
            alert("Post Submitted, you may submit more posts or return to home page");
        } catch (e) {
            res.render('addPost', {post: post});
        }
    },

    getProfile: function (req,res) {

    },

    userLogout: function (req,res) {

    },

    getID: (req,res) => {
        
        Post.findById(req.params.id).populate('comments').exec( function(err, post) {
            if(err){
                console.log(err);
            }
            else{
                res.render('content', { post : post });
            }
        });
        
        //res.send('id: ' + req.params.id);
        
        
    },
    
    addComment: async(req,res) => {
        const comm = new comment({
            commentAuthor: req.body.commentAuthor,
            content: req.body.content
        });
        comm.save((err, result) =>{
            if(err){
                console.log(err)
            }else{
                Post.findById(req.params.id, (err, post) => {
                    if(err){
                        console.log(err);
                    }else{
                        post.comments.push(result);
                        post.save();
                        console.log('comments: ');
                        console.log(post.comments);
                        res.redirect('/');
                    }
                })
                
  
            }
        });
    }
}

module.exports = controller;