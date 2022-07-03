const express = require(`express`);
const controller = require(`../controllers/controller.js`);const { registerValidation, loginValidation } = require('../validators.js');
const { isPublic, isPrivate } = require('../middlewares/checkAuth.js');

const app = express();
//new stuff

//end of new stuff
app.get('/favicon.ico', controller.getFavicon);

app.get('/', controller.getIndex);

app.get('/addPost', isPrivate, controller.addPost);
app.post('/addPost', isPrivate, controller.submitPost);

// GET register to display registration page
app.get('/register', isPublic, controller.getRegister);
app.get('/login', isPublic, controller.getLogin);

//POST methods for submissions
app.post('/register', isPublic, registerValidation, controller.registerUser);
app.post('/login', loginValidation, controller.loginUser);

app.get('/logout', isPrivate, controller.logoutUser);

app.get('/:id' , controller.getID);

app.post('/:id/comment' , controller.addComment);

app.get('/profile', isPrivate, controller.getProfile);

//app.get('/addProfile', controller.getRegister);

//app.get('/addelse', function(req,res){
//    res.render("register.hbs");
//});

module.exports = app;