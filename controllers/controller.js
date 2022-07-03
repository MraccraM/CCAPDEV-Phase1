const db = require("../database/db.js");
const bcrypt = require('bcrypt');
const Post = require("../database/models/PostModel.js");
const comment = require("../database/models/CommentsModel.js");
const card_post = require("../database/models/card_postModel.js");
const user = require ("../database/models/UserModel.js");
const { validationResult } = require('express-validator');

//Application stuff
const controller = {

    getFavicon: function (req, res) {
        res.status(204);
    },

    getIndex: async (req,res) => {
        var activeuser = req.session.username;
        
        if(activeuser === undefined)
          activeuser = 'guest';
        const posts = await Post.find({}).sort({ date: 'desc' })
        res.render('index' , {posts , name: activeuser});
    },

    addPost: function (req, res) {
        res.render('addPost');
    },

    getRegister: function(req,res) {
        res.render('register', {
            pageTitle: 'Registration',
          });
    },

    getLogin: function(req,res) {
        res.render('login', {
            pageTitle: 'Login',
          });
    },
   
    registerUser: function(req,res){
        const errors = validationResult(req);

        if (errors.isEmpty()) {
            const { username, password } = req.body

            db.getOne(user, { username: username }, function(err, result){
                if (result) {
                  console.log(result);
                  // found a match, return to login with error
                  req.flash('error_msg', 'User already exists. Please login.');
                  res.redirect('/');
                } else {
                    const saltRounds = 10;

                    // Hash password
                    bcrypt.hash(password, saltRounds, (err, hashed) => {
                      const newUser = {
                        username: username,
                        password: hashed
                      };
                    
                      user.create(newUser, (err, user) => {
                        if (err) {
                          req.flash('error_msg', 'Could not create user. Please try again.');
                          res.redirect('/register');
                          // res.status(500).send({ message: "Could not create user"});
                        } else {
                            console.log(user);
                          req.flash('success_msg', 'You are now registered! Login below.');
                          res.redirect('/');
                        }
                      });
                    });
                }
              });

            } else {
                const messages = errors.array().map((item) => item.msg);

                req.flash('error_msg', messages.join(' ')); //this is a setter
                res.redirect('/register');
            }

       
    },

    loginUser: function(req, res){
        const errors = validationResult(req);
        
        if (errors.isEmpty()) {
            const {username, password} = req.body; 

            db.getOne(user, { username: username }, (err, user) => {
                if (err) {
                  // Database error occurred...
                  req.flash('error_msg', 'Something happened! Please try again.');
                  res.redirect('/login');
                } else {
                  // Successful query
                  if (user) {
                    bcrypt.compare(password, user.password, (err, result) => {
                        // passwords match (result == true)
                        if (result) {
                          // Update session object once matched!
                          console.log("setting session");
                          req.session.user = user._id;
                          req.session.username = user.username;
                            console.log("checking session");
                          console.log(req.session);
                      
                          res.redirect('/');
                        } else {
                          // passwords don't match
                          req.flash('error_msg', 'Incorrect password. Please try again.');
                          res.redirect('/login');
                        }
                      });
                  } else {
                    // No user found
                    req.flash('error_msg', 'No registered user with that email. Please register.');
                    res.redirect('/register');
                  }
                }
              });
        } else {
            const messages = errors.array().map((item) => item.msg);

            req.flash('error_msg', messages.join(' '));
            res.redirect('/login');
        }

    },

    logoutUser: function(req, res){

        if (req.session) {
            req.session.destroy(() => {
              res.clearCookie('connect.sid');
              res.redirect('/login');
            });
          }

          
    },

    submitPost: async (req,res) => {
        const post = new Post({
            title: req.body.title,
            author: req.session.username,
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
            commentAuthor: req.session.username,
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